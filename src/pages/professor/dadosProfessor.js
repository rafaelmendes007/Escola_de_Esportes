import iconeAtletismo from '../../assets/modalidades/icone-atletismo.png';
import iconeBasquete from '../../assets/modalidades/icone-basquete.png';
import iconeFlag from '../../assets/modalidades/icone-flag.png';
import iconeFutebol from '../../assets/modalidades/icone-futebol.png';
import iconeFutsal from '../../assets/modalidades/icone futsal.png';
import iconeGinastica from '../../assets/modalidades/icone-ginastica.png';
import iconeLutas from '../../assets/modalidades/icone-lutas.png';
import iconeVolei4x4 from '../../assets/modalidades/icone-volei4x4.png';
import iconeVoleibol from '../../assets/modalidades/icone-voleibol.png';
import { listarAlunosDaTurma } from '../../services/alunos';
import { buscarTurma, listarTurmasDoProfessor } from '../../services/turmas';

const ICONES = {
  Atletismo: iconeAtletismo,
  Basquete: iconeBasquete,
  Flag: iconeFlag,
  Futebol: iconeFutebol,
  Futsal: iconeFutsal,
  'Ginástica Rítmica': iconeGinastica,
  Lutas: iconeLutas,
  Voleibol: iconeVoleibol,
  'Vôlei 4x4': iconeVolei4x4,
};

// Dia da semana de hoje com o mesmo nome usado nas turmas ("Terça", "Quinta"...)
const NOMES_DIAS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
export const diaDeHoje = () => NOMES_DIAS[new Date().getDay()];

// Turma no formato que os cartões e as telas do professor usam
export function paraTela(turma, alunos = []) {
  return {
    ...turma,
    icone: ICONES[turma.modalidade] || iconeFutebol,
    faixaEtaria: `${turma.idadeMinima} – ${turma.idadeMaxima} anos`,
    diasTexto: (turma.dias || []).join(' e '),
    horario: `${turma.horarioInicio} – ${turma.horarioFim}`,
    totalAlunos: alunos.filter((aluno) => aluno.status === 'Ativo').length,
  };
}

// Turmas do professor logado, com a quantidade de alunos ativos
export async function carregarTurmasDoProfessor(professorId) {
  const turmas = await listarTurmasDoProfessor(professorId);
  const alunosPorTurma = await Promise.all(turmas.map((turma) => listarAlunosDaTurma(turma.id)));
  return turmas.map((turma, indice) => paraTela(turma, alunosPorTurma[indice]));
}

// Uma turma com os alunos ativos (chamada, lista de alunos)
export async function carregarTurmaComAlunos(turmaId) {
  const [turma, alunos] = await Promise.all([buscarTurma(turmaId), listarAlunosDaTurma(turmaId)]);
  if (!turma) return null;
  const ativos = alunos.filter((aluno) => aluno.status === 'Ativo');
  return { turma: paraTela(turma, alunos), alunos: ativos };
}

// "Ana Silva" -> "AS"
export function iniciais(nome = '') {
  return nome.split(' ').map((parte) => parte[0]).slice(0, 2).join('').toUpperCase();
}
