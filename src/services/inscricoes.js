import { collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, Timestamp, writeBatch } from 'firebase/firestore';
import { db } from '../config/firebase';
import { somenteDigitos } from '../utils/validacao';

// A inscrição fica em dois lugares:
// - inscricoes/{id}: todos os dados (só o admin lê)
// - consultasInscricao/{protocolo}: resumo para o responsável acompanhar.
//   Qualquer pessoa só consegue abrir esse resumo se souber o protocolo (código aleatório)
//   e o CPF do responsável. Ninguém consegue listar os protocolos.

// Sem letras e números parecidos (O/0, I/1) para facilitar a leitura do código
const ALFABETO = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

// Ex.: "ESP-7KQ2-M9XA"
function gerarProtocolo() {
  const valores = crypto.getRandomValues(new Uint32Array(8));
  const letras = Array.from(valores, (n) => ALFABETO[n % ALFABETO.length]).join('');
  return `ESP-${letras.slice(0, 4)}-${letras.slice(4)}`;
}

// "esp 7kq2m9xa" -> "ESP-7KQ2-M9XA"
export function normalizarProtocolo(texto) {
  const limpo = texto.toUpperCase().replace(/[^A-Z0-9]/g, '').replace(/^ESP/, '');
  return `ESP-${limpo.slice(0, 4)}-${limpo.slice(4, 8)}`;
}

// O CPF não fica aberto no resumo: guardamos um hash dele junto com o protocolo
async function hashCpf(protocolo, cpf) {
  const bytes = new TextEncoder().encode(`${protocolo}:${somenteDigitos(cpf)}`);
  const hash = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, '0')).join('');
}

// Salva a inscrição e o resumo de consulta de uma vez só. Devolve o protocolo.
export async function enviarInscricao({ dados, modalidade, consentimento }) {
  const protocolo = gerarProtocolo();
  const refInscricao = doc(collection(db, 'inscricoes'));
  const refConsulta = doc(db, 'consultasInscricao', protocolo);
  const status = 'Aguardando vaga';

  const lote = writeBatch(db);
  lote.set(refInscricao, {
    ...dados,
    modalidade,
    status,
    protocolo,
    consentimento: {
      ...consentimento,
      aceitoEm: Timestamp.fromDate(new Date(consentimento.aceitoEm)),
    },
    criadoEm: serverTimestamp(),
  });
  lote.set(refConsulta, {
    inscricaoId: refInscricao.id,
    cpfHash: await hashCpf(protocolo, dados.cpfResponsavel),
    nomeAluno: dados.nomeAluno,
    modalidade,
    status,
    posicao: null,
    criadoEm: serverTimestamp(),
  });
  await lote.commit();

  return protocolo;
}

// Resumo da inscrição, ou null se o protocolo não existir ou o CPF não bater
export async function consultarInscricao(protocoloDigitado, cpf) {
  const protocolo = normalizarProtocolo(protocoloDigitado);
  const documento = await getDoc(doc(db, 'consultasInscricao', protocolo));
  if (!documento.exists()) return null;

  const resumo = documento.data();
  if (resumo.cpfHash !== (await hashCpf(protocolo, cpf))) return null;

  return {
    protocolo,
    nomeAluno: resumo.nomeAluno,
    modalidade: resumo.modalidade,
    status: resumo.status,
    posicao: resumo.posicao,
    dataInscricao: resumo.criadoEm?.toDate().toLocaleDateString('pt-BR') || '',
  };
}

// ---------- Área do administrador ----------

const STATUS_COM_FILA = 'Aguardando vaga';

// Todas as inscrições, da mais antiga para a mais nova, com a posição na fila calculada
export async function listarInscricoes() {
  const resultado = await getDocs(query(collection(db, 'inscricoes'), orderBy('criadoEm')));
  const lista = resultado.docs.map((documento) => ({ id: documento.id, ...documento.data() }));
  return calcularPosicoes(lista);
}

// Posição = ordem de chegada entre as inscrições que ainda aguardam vaga na mesma modalidade
function calcularPosicoes(lista) {
  const contadorPorModalidade = {};
  return lista.map((inscricao) => {
    if (inscricao.status !== STATUS_COM_FILA) return { ...inscricao, posicaoCalculada: null };
    contadorPorModalidade[inscricao.modalidade] = (contadorPorModalidade[inscricao.modalidade] || 0) + 1;
    return { ...inscricao, posicaoCalculada: contadorPorModalidade[inscricao.modalidade] };
  });
}

// Grava a posição nova onde ela mudou, para o responsável ver a posição certa na consulta
export async function sincronizarPosicoes(lista) {
  const mudaram = lista.filter((inscricao) => (inscricao.posicao ?? null) !== inscricao.posicaoCalculada);
  if (mudaram.length === 0) return;

  // Um lote aceita até 500 escritas (2 por inscrição)
  for (let i = 0; i < mudaram.length; i += 200) {
    const lote = writeBatch(db);
    mudaram.slice(i, i + 200).forEach((inscricao) => {
      lote.update(doc(db, 'inscricoes', inscricao.id), { posicao: inscricao.posicaoCalculada });
      lote.update(doc(db, 'consultasInscricao', inscricao.protocolo), { posicao: inscricao.posicaoCalculada });
    });
    await lote.commit();
  }
}

export async function buscarInscricao(id) {
  const documento = await getDoc(doc(db, 'inscricoes', id));
  return documento.exists() ? { id: documento.id, ...documento.data() } : null;
}

// Muda o status na inscrição e no resumo que o responsável consulta
export async function atualizarStatusInscricao(inscricao, status, extras = {}) {
  const lote = writeBatch(db);
  const posicao = status === STATUS_COM_FILA ? inscricao.posicao ?? null : null;
  lote.update(doc(db, 'inscricoes', inscricao.id), { status, posicao, atualizadoEm: serverTimestamp(), ...extras });
  lote.update(doc(db, 'consultasInscricao', inscricao.protocolo), { status, posicao });
  await lote.commit();
}
