import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc, where, writeBatch } from 'firebase/firestore';
import { db } from '../config/firebase';

// turmas/{id}: { modalidade, nome, sexo, capacidade, idadeMinima, idadeMaxima, professorId, professorNome,
//               dias: ['Terça', 'Quinta'], horarioInicio, horarioFim, local, status, criadoEm }

// Mesmos nomes da tela de escolha de modalidade da inscrição, para as inscrições caírem na turma certa
export const MODALIDADES = ['Atletismo', 'Basquete', 'Flag', 'Futebol', 'Futsal', 'Ginástica Rítmica', 'Lutas', 'Voleibol', 'Vôlei 4x4'];

export const STATUS_TURMA = ['Ativa', 'Lotada', 'Encerrada'];

const paraObjeto = (documento) => ({ id: documento.id, ...documento.data() });

export async function listarTurmas() {
  const resultado = await getDocs(query(collection(db, 'turmas'), orderBy('modalidade')));
  return resultado.docs.map(paraObjeto);
}

// Turmas em que o professor é o responsável
export async function listarTurmasDoProfessor(professorId) {
  const resultado = await getDocs(query(collection(db, 'turmas'), where('professorId', '==', professorId)));
  return resultado.docs.map(paraObjeto).sort((a, b) => a.modalidade.localeCompare(b.modalidade));
}

export async function buscarTurma(id) {
  const documento = await getDoc(doc(db, 'turmas', id));
  return documento.exists() ? paraObjeto(documento) : null;
}

// Cria (sem id) ou atualiza (com id) a turma. Devolve o id.
export async function salvarTurma(dados, id) {
  if (id) {
    await updateDoc(doc(db, 'turmas', id), { ...dados, atualizadoEm: serverTimestamp() });
    // Se o professor mudou, os alunos passam a ser visíveis para o novo professor
    await sincronizarProfessorDosAlunos(id, dados.professorId || '');
    return id;
  }
  const novo = await addDoc(collection(db, 'turmas'), { ...dados, criadoEm: serverTimestamp() });
  return novo.id;
}

// Copia o professor da turma para os alunos dela (é por esse campo que o professor ganha acesso aos dados)
export async function sincronizarProfessorDosAlunos(turmaId, professorId) {
  const resultado = await getDocs(query(collection(db, 'alunos'), where('turmaId', '==', turmaId)));
  const desatualizados = resultado.docs.filter((documento) => documento.data().professorId !== professorId);
  for (let i = 0; i < desatualizados.length; i += 400) {
    const lote = writeBatch(db);
    desatualizados.slice(i, i + 400).forEach((documento) => lote.update(documento.ref, { professorId }));
    await lote.commit();
  }
}

// "Futsal – Turma 1"
export const nomeDaTurma = (turma) => (turma ? `${turma.modalidade} – ${turma.nome}` : '—');

// "10 a 13"
export const faixaEtaria = (turma) => (turma ? `${turma.idadeMinima} a ${turma.idadeMaxima}` : '—');

// "Terça e Quinta, 18:30 às 19:30"
export const diasEHorario = (turma) =>
  turma ? `${(turma.dias || []).join(' e ')}, ${turma.horarioInicio} às ${turma.horarioFim}` : '—';
