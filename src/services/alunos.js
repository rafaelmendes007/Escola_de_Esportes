import {
  addDoc, arrayUnion, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, Timestamp, updateDoc, where, writeBatch,
} from 'firebase/firestore';
import { db } from '../config/firebase';

// alunos/{id}: dados vindos da inscrição + { turmaId, turmaNome, modalidade, matricula, status, dataMatricula,
//              inscricaoId, observacoes, documentos: { certidao, documentoResponsavel, comprovante, foto, declaracaoMatricula },
//              historico: [{ data, titulo, descricao, tipo }] }

export const DOCUMENTOS_ALUNO = [
  ['certidao', 'Certidão de nascimento ou RG do aluno'],
  ['documentoResponsavel', 'Documento do responsável'],
  ['comprovante', 'Comprovante de residência'],
  ['declaracaoMatricula', 'Declaração de matrícula escolar'],
  ['foto', 'Foto 3x4'],
];

const paraObjeto = (documento) => ({ id: documento.id, ...documento.data() });

// Registro para a linha do tempo do aluno (serverTimestamp não funciona dentro de listas)
export const eventoHistorico = (titulo, descricao, tipo) => ({ data: Timestamp.now(), titulo, descricao, tipo });

export async function listarAlunos() {
  const resultado = await getDocs(query(collection(db, 'alunos'), orderBy('nome')));
  return resultado.docs.map(paraObjeto);
}

export async function listarAlunosDaTurma(turmaId) {
  const resultado = await getDocs(query(collection(db, 'alunos'), where('turmaId', '==', turmaId)));
  return resultado.docs.map(paraObjeto).sort((a, b) => a.nome.localeCompare(b.nome));
}

export async function buscarAluno(id) {
  const documento = await getDoc(doc(db, 'alunos', id));
  return documento.exists() ? paraObjeto(documento) : null;
}

// Atualiza campos do aluno e, se vier, acrescenta um registro no histórico
export async function atualizarAluno(id, dados, evento) {
  await updateDoc(doc(db, 'alunos', id), {
    ...dados,
    ...(evento ? { historico: arrayUnion(evento) } : {}),
    atualizadoEm: serverTimestamp(),
  });
}

// Matrícula a partir de uma inscrição da lista de espera: cria o aluno e marca a inscrição como matriculada
export async function matricularDaInscricao(inscricao, turma) {
  const { id: inscricaoId, protocolo, consentimento, nomeAluno, modalidade } = inscricao;
  // Campos que são só da inscrição e não vão para o cadastro do aluno
  const CAMPOS_DA_INSCRICAO = ['id', 'protocolo', 'status', 'posicao', 'posicaoCalculada', 'consentimento', 'criadoEm', 'atualizadoEm', 'nomeAluno', 'modalidade', 'alunoId'];
  const dadosDaInscricao = Object.fromEntries(Object.entries(inscricao).filter(([campo]) => !CAMPOS_DA_INSCRICAO.includes(campo)));

  const refAluno = doc(collection(db, 'alunos'));
  const matricula = `${new Date().getFullYear()}${String(Date.now()).slice(-6)}`;

  const lote = writeBatch(db);
  lote.set(refAluno, {
    ...dadosDaInscricao,
    nome: nomeAluno,
    modalidade,
    turmaId: turma.id,
    turmaNome: `${turma.modalidade} – ${turma.nome}`,
    matricula,
    status: 'Ativo',
    inscricaoId,
    protocolo,
    consentimento,
    observacoes: '',
    documentos: {},
    historico: [
      eventoHistorico('Entrada na lista de espera', `Inscrição ${protocolo} em ${modalidade}.`, 'Lista de espera'),
      eventoHistorico('Matrícula confirmada', `Matriculado na turma ${turma.modalidade} – ${turma.nome}.`, 'Matrícula'),
    ],
    dataMatricula: serverTimestamp(),
  });
  lote.update(doc(db, 'inscricoes', inscricaoId), { status: 'Matriculado', posicao: null, alunoId: refAluno.id, atualizadoEm: serverTimestamp() });
  lote.update(doc(db, 'consultasInscricao', protocolo), { status: 'Matriculado', posicao: null });
  await lote.commit();

  return refAluno.id;
}

// Cadastro direto de aluno (sem passar pela lista de espera)
export async function criarAluno(dados) {
  const novo = await addDoc(collection(db, 'alunos'), { ...dados, dataMatricula: serverTimestamp() });
  return novo.id;
}
