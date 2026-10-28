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

export const listaEspera = [
  { id: 1, nome: 'Ana Clara', idade: 12, modalidade: 'Voleibol', turma: 'Turma 1', dataInscricao: '12/08/2026', posicao: 12, status: 'Aguardando vaga' },
  { id: 2, nome: 'Ana Maria', idade: 15, modalidade: 'Futsal', turma: 'Turma 1', dataInscricao: '11/08/2026', posicao: 0, status: 'Convocado' },
  { id: 3, nome: 'Carlos Antônio', idade: 10, modalidade: 'Atletismo', turma: 'Turma 1', dataInscricao: '12/08/2026', posicao: 0, status: 'Convocado' },
  { id: 4, nome: 'Maria Clara', idade: 11, modalidade: 'Vôlei de praia', turma: 'Turma 1', dataInscricao: '10/08/2026', posicao: 23, status: 'Aguardando vaga' },
  { id: 5, nome: 'João Pedro', idade: 13, modalidade: 'Voleibol', turma: 'Turma 1', dataInscricao: '12/08/2026', posicao: 8, status: 'Aguardando vaga' },
  { id: 6, nome: 'Maria Fernanda', idade: 16, modalidade: 'Handebol', turma: 'Turma 1', dataInscricao: '17/08/2026', posicao: 16, status: 'Aguardando vaga' },
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

// Usuários que acessam o sistema (administradores e professores)
export const usuarios = [
  { id: 1, nome: 'Administrador', email: 'admin@unifor.br', perfil: 'Administrador', cadastradoEm: '01/08/2026' },
  { id: 2, nome: 'Vinícius Aguiar', email: 'vinicius.aguiar@unifor.br', perfil: 'Professor', cadastradoEm: '05/08/2026' },
  { id: 3, nome: 'Luís Marcelo', email: 'luis.marcelo@unifor.br', perfil: 'Professor', cadastradoEm: '05/08/2026' },
];

export function adicionarUsuario(usuario) {
  const novoUsuario = {
    id: Math.max(0, ...usuarios.map((u) => u.id)) + 1,
    cadastradoEm: new Date().toLocaleDateString('pt-BR'),
    ...usuario,
  };
  usuarios.push(novoUsuario);
  return novoUsuario;
}

// Inclui uma turma nova na lista (enquanto não há API) e devolve a turma criada
export function adicionarTurma(turma) {
  const novaTurma = { id: Math.max(0, ...turmas.map((t) => t.id)) + 1, ocupadas: 0, listaEspera: 0, ...turma };
  turmas.push(novaTurma);
  return novaTurma;
}

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
