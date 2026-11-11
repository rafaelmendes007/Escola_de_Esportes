import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
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
    return id;
  }
  const novo = await addDoc(collection(db, 'turmas'), { ...dados, criadoEm: serverTimestamp() });
  return novo.id;
}

// "Futsal – Turma 1"
export const nomeDaTurma = (turma) => (turma ? `${turma.modalidade} – ${turma.nome}` : '—');

// "10 a 13"
export const faixaEtaria = (turma) => (turma ? `${turma.idadeMinima} a ${turma.idadeMaxima}` : '—');

// "Terça e Quinta, 18:30 às 19:30"
export const diasEHorario = (turma) =>
  turma ? `${(turma.dias || []).join(' e ')}, ${turma.horarioInicio} às ${turma.horarioFim}` : '—';
