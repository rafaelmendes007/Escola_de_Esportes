// Dados de exemplo da área do administrador (até existir a API)

export const resumo = { turmasAtivas: 12, alunosMatriculados: 248, listaEspera: 36 };

export const modalidades = ['Atletismo', 'Futsal', 'Handebol', 'Lutas', 'Vôlei de praia', 'Voleibol'];

export const turmas = [
  { id: 1, modalidade: 'Atletismo Misto', nome: 'Turma 1', faixaEtaria: '10 a 13', capacidade: 26, ocupadas: 24, listaEspera: 8, status: 'Ativa' },
  { id: 2, modalidade: 'Futsal Masculino', nome: 'Turma 1', faixaEtaria: '12 a 16', capacidade: 24, ocupadas: 20, listaEspera: 10, status: 'Ativa' },
  { id: 3, modalidade: 'Futsal Masculino', nome: 'Turma 2', faixaEtaria: '10 a 15', capacidade: 30, ocupadas: 30, listaEspera: 12, status: 'Lotada' },
  { id: 4, modalidade: 'Lutas Misto', nome: 'Turma 3', faixaEtaria: '10 a 14', capacidade: 30, ocupadas: 24, listaEspera: 6, status: 'Ativa' },
  { id: 5, modalidade: 'Voleibol Misto', nome: 'Turma 2', faixaEtaria: '11 a 13', capacidade: 28, ocupadas: 26, listaEspera: 15, status: 'Ativa' },
  { id: 6, modalidade: 'Voleibol Feminino', nome: 'Turma 5', faixaEtaria: '12 a 15', capacidade: 26, ocupadas: 23, listaEspera: 2, status: 'Ativa' },
  { id: 7, modalidade: 'Futebol Masculino', nome: 'Turma 1', faixaEtaria: '10 a 13', capacidade: 28, ocupadas: 28, listaEspera: 9, status: 'Lotada' },
  { id: 8, modalidade: 'Futebol Masculino', nome: 'Turma 2', faixaEtaria: '14 a 17', capacidade: 28, ocupadas: 25, listaEspera: 4, status: 'Ativa' },
  { id: 9, modalidade: 'Basquete Misto', nome: 'Turma 1', faixaEtaria: '10 a 13', capacidade: 28, ocupadas: 22, listaEspera: 3, status: 'Ativa' },
  { id: 10, modalidade: 'Basquete Misto', nome: 'Turma 2', faixaEtaria: '14 a 17', capacidade: 28, ocupadas: 27, listaEspera: 5, status: 'Ativa' },
  { id: 11, modalidade: 'Flag Misto', nome: 'Turma 1', faixaEtaria: '10 a 17', capacidade: 28, ocupadas: 18, listaEspera: 0, status: 'Ativa' },
  { id: 12, modalidade: 'Vôlei 4x4 Misto', nome: 'Turma 1', faixaEtaria: '10 a 13', capacidade: 12, ocupadas: 12, listaEspera: 7, status: 'Lotada' },
];

// Informações extras mostradas em "Detalhes da turma"
export const detalhesTurma = {
  professor: 'Vinícius Aguiar',
  local: 'Quadra A',
  dias: 'Terça e Quinta',
  horario: '18:30 às 19:30',
  proximaAula: '01/10/2026',
  vagasDisponiveis: 2,
  alertaFaltas: 2,
};

export const alunos = [
  { id: 1, nome: 'Ana Clara', idade: 12, modalidade: 'Voleibol', turma: 'Turma 1', matricula: '2510001', dataMatricula: '12/08/2026', faltasConsecutivas: 1, status: 'Desistente' },
  { id: 2, nome: 'Ana Maria', idade: 15, modalidade: 'Futsal', turma: 'Turma 1', matricula: '2510002', dataMatricula: '12/08/2026', faltasConsecutivas: 1, status: 'Ativo' },
  { id: 3, nome: 'Carlos Antônio', idade: 10, modalidade: 'Atletismo', turma: 'Turma 1', matricula: '2510003', dataMatricula: '12/08/2026', faltasConsecutivas: 3, status: 'Desistente' },
  { id: 4, nome: 'Maria Clara', idade: 11, modalidade: 'Vôlei de praia', turma: 'Turma 1', matricula: '2510004', dataMatricula: '12/08/2026', faltasConsecutivas: 1, status: 'Ativo' },
  { id: 5, nome: 'João Pedro', idade: 13, modalidade: 'Voleibol', turma: 'Turma 1', matricula: '2510005', dataMatricula: '12/08/2026', faltasConsecutivas: 1, status: 'Ativo' },
  { id: 6, nome: 'Maria Fernanda', idade: 16, modalidade: 'Handebol', turma: 'Turma 1', matricula: '2510006', dataMatricula: '12/08/2026', faltasConsecutivas: 1, status: 'Ativo' },
];

// Informações extras mostradas em "Detalhes do aluno"
export const detalhesAluno = {
  dataNascimento: '12/02/2014',
  turmaAtual: 'Futsal Feminino 2',
  responsavel: 'Maria Silva',
  telefoneResponsavel: '(85) 98765-4321',
  cadastradoEm: '28/09/2026',
  atualizadoEm: '28/09/2026',
  contatadoEm: '28/09/2026',
  retornoAte: '30/09/2026',
};

const listaEsperaBase = [
  { id: 1, nome: 'Ana Clara', idade: 12, modalidade: 'Voleibol', turma: 'Turma 1', dataInscricao: '12/08/2026', posicao: 12, status: 'Aguardando vaga' },
  { id: 2, nome: 'Ana Maria', idade: 15, modalidade: 'Futsal', turma: 'Turma 1', dataInscricao: '11/08/2026', posicao: 0, status: 'Convocado' },
  { id: 3, nome: 'Carlos Antônio', idade: 10, modalidade: 'Atletismo', turma: 'Turma 1', dataInscricao: '12/08/2026', posicao: 0, status: 'Convocado' },
  { id: 4, nome: 'Maria Clara', idade: 11, modalidade: 'Vôlei de praia', turma: 'Turma 1', dataInscricao: '10/08/2026', posicao: 23, status: 'Aguardando vaga' },
  { id: 5, nome: 'João Pedro', idade: 13, modalidade: 'Voleibol', turma: 'Turma 1', dataInscricao: '12/08/2026', posicao: 8, status: 'Aguardando vaga' },
  { id: 6, nome: 'Maria Fernanda', idade: 16, modalidade: 'Handebol', turma: 'Turma 1', dataInscricao: '17/08/2026', posicao: 16, status: 'Aguardando vaga' },
];

// Mais inscrições de exemplo para a lista ter várias páginas (36 no total, como no protótipo)
const NOMES_EXTRAS = ['Lucas Martins', 'Isabela Teixeira', 'Pedro Henrique', 'Beatriz Rocha', 'Rafael Gomes', 'Sofia Cardoso',
  'Gustavo Lima', 'Larissa Melo', 'Enzo Ribeiro', 'Valentina Dias', 'Miguel Araújo', 'Helena Castro', 'Arthur Freitas',
  'Laura Mendes', 'Davi Moreira', 'Alice Pinto', 'Heitor Barros', 'Manuela Ramos', 'Bernardo Nunes', 'Júlia Vieira',
  'Théo Correia', 'Lívia Monteiro', 'Samuel Rezende', 'Cecília Duarte', 'Benjamin Farias', 'Lorena Campos',
  'Nicolas Batista', 'Yasmin Lopes', 'Joaquim Sales', 'Clara Fonseca'];
const MODALIDADES_EXTRAS = ['Voleibol', 'Futsal', 'Atletismo', 'Handebol', 'Lutas', 'Vôlei de praia'];

export const listaEspera = [
  ...listaEsperaBase,
  ...NOMES_EXTRAS.map((nome, i) => ({
    id: listaEsperaBase.length + i + 1,
    nome,
    idade: 10 + (i % 8),
    modalidade: MODALIDADES_EXTRAS[i % MODALIDADES_EXTRAS.length],
    turma: `Turma ${(i % 3) + 1}`,
    dataInscricao: `${String((i % 28) + 1).padStart(2, '0')}/08/2026`,
    posicao: i + 1,
    status: i % 5 === 0 ? 'Convocado' : 'Aguardando vaga',
  })),
];

export const frequenciaTurma = [
  { id: 1, nome: 'Ana Clara', presente: true, faltasConsecutivas: 0 },
  { id: 5, nome: 'João Pedro', presente: false, faltasConsecutivas: 3 },
  { id: 4, nome: 'Maria Clara', presente: true, faltasConsecutivas: 0 },
  { id: 7, nome: 'Fernanda da Silva', presente: true, faltasConsecutivas: 2 },
  { id: 3, nome: 'Carlos Antônio', presente: true, faltasConsecutivas: 1 },
];

export const avisosEnviados = [
  { id: 1, titulo: 'Treino cancelado por chuva', descricao: 'Os treinos de futebol de hoje (16h) estão cancelados devido à chuva.', dataHora: '15/04/2026 · 10:32', publico: 'Responsáveis e Professores', turma: 'Futebol – Turma F01' },
  { id: 2, titulo: 'Reunião de professores', descricao: 'Reunião geral na sexta-feira às 18h, na sala de coordenação.', dataHora: '14/04/2026 · 09:10', publico: 'Professores', turma: 'Todas as turmas' },
  { id: 3, titulo: 'Entrega de uniformes', descricao: 'Os uniformes estarão disponíveis para retirada a partir de segunda-feira.', dataHora: '10/04/2026 · 16:45', publico: 'Responsáveis', turma: 'Todas as turmas' },
  { id: 4, titulo: 'Feriado – sem aulas', descricao: 'Não haverá aulas no dia 21/04 (Tiradentes). As aulas retornam dia 22/04.', dataHora: '08/04/2026 · 11:20', publico: 'Todos', turma: 'Todas as turmas' },
];

export function buscarPorId(lista, id) {
  return lista.find((item) => item.id === Number(id)) || lista[0];
}

// Tira acentos e deixa minúsculo, para a busca por nome
export function normalizar(texto) {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

// Link de WhatsApp para um telefone no formato "(85) 98765-4321"
export function linkWhatsApp(telefone) {
  return `https://wa.me/55${telefone.replace(/\D/g, '')}`;
}
