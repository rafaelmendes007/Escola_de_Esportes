import iconeVolei from '../../assets/modalidades/icone-voleibol.png';
import iconeGinastica from '../../assets/modalidades/icone-ginastica.png';
import iconeFutebol from '../../assets/modalidades/icone-futebol.png';

// Dados de exemplo da área do professor (até existir a API)

export const turmas = [
  {
    id: 'V001',
    modalidade: 'Vôlei',
    faixaEtaria: '14 – 17 anos',
    icone: iconeVolei,
    dias: 'Segundas e Quartas',
    horario: '14h00 – 15h30',
    local: 'Ginásio Principal',
    totalAlunos: 18,
  },
  {
    id: 'GR01',
    modalidade: 'Ginástica Rítmica',
    faixaEtaria: '10 – 13 anos',
    icone: iconeGinastica,
    dias: 'Terças e Quintas',
    horario: '15h30 – 17h00',
    local: 'Sala de Ginástica',
    totalAlunos: 15,
  },
  {
    id: 'F01',
    modalidade: 'Futebol',
    faixaEtaria: '12 – 15 anos',
    icone: iconeFutebol,
    dias: 'Segundas e Quartas',
    horario: '16h00 – 17h30',
    local: 'Campo 1',
    totalAlunos: 20,
  },
];

// Turmas que aparecem no painel em "Turmas de Hoje"
export const idsTurmasHoje = ['F01'];

export const alunos = [
  { id: 1, nome: 'Ana Silva', idade: 15, responsavel: 'Carlos Silva' },
  { id: 2, nome: 'Bruno Ribeiro', idade: 16, responsavel: 'Juliana Ribeiro' },
  { id: 3, nome: 'Carolina Lima', idade: 14, responsavel: 'Marcos Lima' },
  { id: 4, nome: 'Daniel Nunes', idade: 17, responsavel: 'Patrícia Nunes' },
  { id: 5, nome: 'Fernanda Souza', idade: 15, responsavel: 'Ricardo Souza' },
  { id: 6, nome: 'Gabriel Barbosa', idade: 16, responsavel: 'Aline Barbosa' },
  { id: 7, nome: 'Letícia Almeida', idade: 14, responsavel: 'Sérgio Almeida' },
  { id: 8, nome: 'Matheus Pereira', idade: 17, responsavel: 'Renata Pereira' },
];

export const historicoAulas = [
  { data: '15/04/2026', diaSemana: 'Quarta-feira', status: 'ausente', observacao: '–' },
  { data: '13/04/2026', diaSemana: 'Segunda-feira', status: 'presente', observacao: '–' },
  { data: '10/04/2026', diaSemana: 'Sexta-feira', status: 'presente', observacao: '–' },
  { data: '08/04/2026', diaSemana: 'Quarta-feira', status: 'justificado', observacao: 'Atestado médico' },
  { data: '06/04/2026', diaSemana: 'Segunda-feira', status: 'presente', observacao: '–' },
];

export const avisos = [
  {
    id: 1,
    titulo: 'Treino cancelado por chuva',
    descricao: 'Os treinos de futebol de hoje (16h) estão cancelados devido à chuva. As atividades serão repostas na próxima semana.',
    dataHora: 'Hoje · 10:32',
    destino: 'Futebol – Turma F01',
    novo: true,
  },
  {
    id: 2,
    titulo: 'Reunião de professores',
    descricao: 'Reunião geral na sexta-feira às 18h, na sala de coordenação. Presença obrigatória.',
    dataHora: 'Ontem · 09:10',
    destino: 'Todas as turmas',
    novo: true,
  },
  {
    id: 3,
    titulo: 'Feriado – sem aulas',
    descricao: 'Não haverá aulas no dia 21/04 (Tiradentes). As aulas retornam normalmente no dia 22/04.',
    dataHora: '08/04/2026 · 11:20',
    destino: 'Todas as turmas',
    novo: false,
  },
  {
    id: 4,
    titulo: 'Novo calendário do semestre',
    descricao: 'O calendário 2026.1 já está disponível na aba Calendário.',
    dataHora: '02/04/2026 · 14:05',
    destino: 'Todas as turmas',
    novo: false,
  },
];

export function buscarTurma(id) {
  return turmas.find((turma) => turma.id === id) || turmas[0];
}

export function buscarAluno(id) {
  return alunos.find((aluno) => aluno.id === Number(id)) || alunos[0];
}

// "Ana Silva" -> "AS"
export function iniciais(nome) {
  return nome.split(' ').map((parte) => parte[0]).slice(0, 2).join('').toUpperCase();
}
