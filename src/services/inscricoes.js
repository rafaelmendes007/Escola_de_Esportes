import { collection, doc, getDoc, serverTimestamp, Timestamp, writeBatch } from 'firebase/firestore';
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
