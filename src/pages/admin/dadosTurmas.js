import { listarAlunos, listarAlunosDaTurma } from '../../services/alunos';
import { listarChamadasDaTurma, resumoDoAluno } from '../../services/frequencias';
import { listarInscricoes } from '../../services/inscricoes';
import { buscarTurma, listarTurmas } from '../../services/turmas';
import { calcularIdade } from '../../utils/datas';

// Inscrição que serve para a turma: mesma modalidade e idade dentro da faixa
const serveParaTurma = (inscricao, turma) => {
  const idade = calcularIdade(inscricao.nascimento);
  return inscricao.modalidade === turma.modalidade && idade >= Number(turma.idadeMinima) && idade <= Number(turma.idadeMaxima);
};

// Completa a turma com ocupação, vagas e fila; "Lotada" quando não sobra vaga
function comContagens(turma, alunosDaTurma, inscricoes) {
  const ocupadas = alunosDaTurma.filter((aluno) => aluno.status === 'Ativo').length;
  const fila = inscricoes.filter((inscricao) => inscricao.status === 'Aguardando vaga' && serveParaTurma(inscricao, turma));
  const capacidade = Number(turma.capacidade) || 0;
  const status = turma.status === 'Ativa' && ocupadas >= capacidade ? 'Lotada' : turma.status;
  return { ...turma, ocupadas, disponiveis: Math.max(capacidade - ocupadas, 0), listaEspera: fila.length, fila, status };
}

// Todas as turmas com as contagens (tela Turmas e Dashboard)
export async function carregarTurmasComContagens() {
  const [turmas, alunos, inscricoes] = await Promise.all([listarTurmas(), listarAlunos(), listarInscricoes()]);
  return {
    turmas: turmas.map((turma) => comContagens(turma, alunos.filter((aluno) => aluno.turmaId === turma.id), inscricoes)),
    alunos,
    inscricoes,
  };
}

// Uma turma com alunos (e a frequência de cada um), fila de espera e chamadas
export async function carregarDetalhesTurma(turmaId) {
  const turma = await buscarTurma(turmaId);
  if (!turma) return null;

  const [alunos, inscricoes, chamadas] = await Promise.all([
    listarAlunosDaTurma(turmaId),
    listarInscricoes(),
    listarChamadasDaTurma(turmaId),
  ]);

  const alunosComFrequencia = alunos.map((aluno) => ({ ...aluno, frequencia: resumoDoAluno(chamadas, aluno.id) }));
  return {
    turma: comContagens(turma, alunos, inscricoes),
    alunos: alunosComFrequencia,
    chamadas,
    alertaFaltas: alunosComFrequencia.filter((aluno) => aluno.frequencia.faltasSeguidas >= 3).length,
  };
}
