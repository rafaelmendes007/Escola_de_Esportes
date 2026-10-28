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
    diasSemana: [1, 3],
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
    diasSemana: [2, 4],
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
    diasSemana: [1, 3],
    horario: '16h00 – 17h30',
    local: 'Campo 1',
    totalAlunos: 20,
  },
];

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

// Avisos já vistos pelo professor ficam salvos no navegador (até existir a API)
const CHAVE_AVISOS_LIDOS = 'avisosLidosProfessor';

export function idsAvisosLidos() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_AVISOS_LIDOS)) || [];
  } catch {
    return [];
  }
}

export function marcarAvisosComoLidos(ids) {
  const lidos = [...new Set([...idsAvisosLidos(), ...ids])];
  try {
    localStorage.setItem(CHAVE_AVISOS_LIDOS, JSON.stringify(lidos));
  } catch {
    // Sem acesso ao armazenamento do navegador: vale só até recarregar a página
  }
  return lidos;
}

// Aviso novo = marcado como novo e ainda não visto
export function avisoNovo(aviso, lidos = idsAvisosLidos()) {
  return aviso.novo && !lidos.includes(aviso.id);
}

export function buscarTurma(id) {
  return turmas.find((turma) => turma.id === id) || turmas[0];
}

// diasSemana usa a numeração do Date: 0 = domingo, 1 = segunda ... 6 = sábado
export function temAulaNoDia(turma, data) {
  return turma.diasSemana.includes(data.getDay());
}

// Data no formato do input date (AAAA-MM-DD), sem problema de fuso horário
export function dataISO(data) {
  const copia = new Date(data);
  copia.setMinutes(copia.getMinutes() - copia.getTimezoneOffset());
  return copia.toISOString().slice(0, 10);
}

// "2026-04-15" -> Date no horário local (new Date("2026-04-15") seria UTC e poderia cair no dia anterior)
export function lerDataISO(texto) {
  const [ano, mes, dia] = texto.split('-').map(Number);
  return new Date(ano, mes - 1, dia);
}

// Último dia com aula até hoje (para a chamada já abrir numa data válida)
export function ultimoDiaDeAula(turma, hoje = new Date()) {
  const data = new Date(hoje);
  for (let i = 0; i < 7 && !temAulaNoDia(turma, data); i++) {
    data.setDate(data.getDate() - 1);
  }
  return data;
}

export function buscarAluno(id) {
  return alunos.find((aluno) => aluno.id === Number(id)) || alunos[0];
}

// "Ana Silva" -> "AS"
export function iniciais(nome) {
  return nome.split(' ').map((parte) => parte[0]).slice(0, 2).join('').toUpperCase();
}
