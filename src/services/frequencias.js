import { doc, getDoc, getDocs, collection, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../config/firebase';

// frequencias/{turmaId_AAAA-MM-DD}: chamada de uma turma em um dia
// { turmaId, data: 'AAAA-MM-DD', registros: { alunoId: { presente: true|false, justificativa?: '...' } },
//   registradoPor, atualizadoEm }

const idDaChamada = (turmaId, data) => `${turmaId}_${data}`;

export async function buscarChamada(turmaId, data) {
  const documento = await getDoc(doc(db, 'frequencias', idDaChamada(turmaId, data)));
  return documento.exists() ? documento.data() : null;
}

// Salva a chamada inteira do dia (substitui a anterior do mesmo dia)
export async function salvarChamada(turmaId, data, registros, registradoPor) {
  await setDoc(doc(db, 'frequencias', idDaChamada(turmaId, data)), {
    turmaId,
    data,
    registros,
    registradoPor,
    atualizadoEm: serverTimestamp(),
  });
}

// Grava a justificativa de uma falta já registrada na chamada
export async function justificarFalta(turmaId, data, alunoId, justificativa) {
  await updateDoc(doc(db, 'frequencias', idDaChamada(turmaId, data)), {
    [`registros.${alunoId}.justificativa`]: justificativa,
    atualizadoEm: serverTimestamp(),
  });
}

// Todas as chamadas de uma turma, da mais recente para a mais antiga
export async function listarChamadasDaTurma(turmaId) {
  const resultado = await getDocs(query(collection(db, 'frequencias'), where('turmaId', '==', turmaId)));
  return resultado.docs.map((documento) => documento.data()).sort((a, b) => b.data.localeCompare(a.data));
}

// Resumo de um aluno a partir das chamadas da turma (mais recente primeiro)
export function resumoDoAluno(chamadas, alunoId) {
  const aulas = chamadas
    .filter((chamada) => chamada.registros?.[alunoId])
    .map((chamada) => {
      const registro = chamada.registros[alunoId];
      const situacao = registro.presente ? 'Presente' : registro.justificativa ? 'Justificado' : 'Ausente';
      return { data: chamada.data, situacao, justificativa: registro.justificativa || '' };
    });

  const presencas = aulas.filter((aula) => aula.situacao === 'Presente').length;
  const justificadas = aulas.filter((aula) => aula.situacao === 'Justificado').length;
  const ausencias = aulas.filter((aula) => aula.situacao === 'Ausente').length;

  // Faltas sem justificativa seguidas, contando da aula mais recente para trás
  let faltasSeguidas = 0;
  for (const aula of aulas) {
    if (aula.situacao !== 'Ausente') break;
    faltasSeguidas += 1;
  }

  const total = aulas.length;
  const percentual = total ? Math.round(((presencas + justificadas) / total) * 100) : null;

  return { aulas, presencas, justificadas, ausencias, faltasSeguidas, percentual };
}
