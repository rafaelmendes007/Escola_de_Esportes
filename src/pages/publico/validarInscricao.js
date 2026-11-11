import { cpfValido, emailValido, nascimentoValido, telefoneValido } from '../../utils/validacao';

const OBRIGATORIO = 'Campo obrigatório.';

// Campos obrigatórios simples (só não podem ficar vazios)
const OBRIGATORIOS = [
  'nomeResponsavel', 'parentesco', 'escolaridade', 'rendaFamiliar',
  'emergenciaNome', 'emergenciaParentesco',
  'nomeAluno', 'endereco', 'bairro',
  'tipoEscola', 'escola', 'serie', 'tamanhoUniforme',
  'planoSaude', 'planoOdonto',
  'alergiaMedicamento', 'medicamentoControlado', 'alergiaAlimento', 'atencaoEspecial',
  'problemaSaude', 'deficiencia',
];

// Perguntas que abrem um campo de detalhe: [campo, resposta que exige detalhe, nome do detalhe]
const DETALHES = [
  ['parentesco', 'Outro', 'parentescoOutro'],
  ['escolaridade', 'Outro', 'escolaridadeOutro'],
  ['pessoasResidencia', 'Outro', 'pessoasResidenciaOutro'],
  ['emergenciaParentesco', 'Outro', 'emergenciaParentescoOutro'],
  ['genero', 'Outro', 'generoOutro'],
  ['planoSaude', 'Outro', 'planoSaudeOutro'],
  ['planoOdonto', 'Outro', 'planoOdontoOutro'],
  ['problemaSaude', 'Outro', 'problemaSaudeOutro'],
  ['deficiencia', 'Outro', 'deficienciaOutro'],
  ['alergiaMedicamento', 'Sim', 'alergiaMedicamentoQual'],
  ['medicamentoControlado', 'Sim', 'medicamentoControladoQual'],
  ['alergiaAlimento', 'Sim', 'alergiaAlimentoQual'],
  ['atencaoEspecial', 'Sim', 'atencaoEspecialQual'],
];

const vazio = (valor) => !String(valor ?? '').trim();

// Devolve { nomeDoCampo: 'mensagem' } só com os campos que têm problema
export function validarInscricao(dados) {
  const erros = {};

  OBRIGATORIOS.forEach((campo) => {
    if (vazio(dados[campo])) erros[campo] = OBRIGATORIO;
  });

  DETALHES.forEach(([campo, resposta, detalhe]) => {
    if (dados[campo] === resposta && vazio(dados[detalhe])) erros[detalhe] = 'Descreva a resposta.';
  });

  if (vazio(dados.cpfResponsavel)) erros.cpfResponsavel = OBRIGATORIO;
  else if (!cpfValido(dados.cpfResponsavel)) erros.cpfResponsavel = 'CPF inválido.';

  if (vazio(dados.telefone)) erros.telefone = OBRIGATORIO;
  else if (!telefoneValido(dados.telefone)) erros.telefone = 'Telefone inválido. Use DDD + número.';

  if (vazio(dados.emergenciaTelefone)) erros.emergenciaTelefone = OBRIGATORIO;
  else if (!telefoneValido(dados.emergenciaTelefone)) erros.emergenciaTelefone = 'Telefone inválido. Use DDD + número.';

  if (!vazio(dados.email) && !emailValido(dados.email)) erros.email = 'E-mail inválido.';

  if (vazio(dados.nascimento)) erros.nascimento = OBRIGATORIO;
  else if (!nascimentoValido(dados.nascimento)) erros.nascimento = 'Data de nascimento inválida.';

  return erros;
}
