import { describe, expect, it } from 'vitest';
import { validarInscricao } from './validarInscricao';

// Inscrição completa e válida; cada teste muda só o que precisa
const anoAtual = new Date().getFullYear();
const inscricaoValida = {
  nomeResponsavel: 'Maria Silva', cpfResponsavel: '529.982.247-25', telefone: '(85) 99999-8888', email: '',
  parentesco: 'Mãe', escolaridade: 'Ensino médio completo', pessoasResidencia: '', rendaFamiliar: 'Entre 01 e 02 salários',
  emergenciaNome: 'José Silva', emergenciaTelefone: '(85) 3222-3333', emergenciaParentesco: 'Pai',
  nomeAluno: 'João Silva', nascimento: `${anoAtual - 12}-05-10`, genero: '', endereco: 'Rua A, 1', bairro: 'Centro',
  tipoEscola: 'Pública', escola: 'Escola X', serie: '6º ano', tamanhoUniforme: 'M',
  planoSaude: 'Não possui', planoOdonto: 'Não possui',
  alergiaMedicamento: 'Não', medicamentoControlado: 'Não', alergiaAlimento: 'Não', atencaoEspecial: 'Não',
  problemaSaude: 'Nenhum', deficiencia: 'Não possui',
};

describe('validarInscricao', () => {
  it('não acusa erro numa inscrição completa', () => {
    expect(validarInscricao(inscricaoValida)).toEqual({});
  });

  it('marca os campos obrigatórios vazios', () => {
    const erros = validarInscricao({ ...inscricaoValida, nomeAluno: '  ', bairro: '' });
    expect(Object.keys(erros).sort()).toEqual(['bairro', 'nomeAluno']);
  });

  it('confere CPF, telefones, e-mail e nascimento', () => {
    const erros = validarInscricao({
      ...inscricaoValida,
      cpfResponsavel: '111.111.111-11',
      telefone: '9999',
      emergenciaTelefone: '123',
      email: 'sem-arroba',
      nascimento: `${anoAtual + 1}-01-01`,
    });
    expect(erros).toMatchObject({
      cpfResponsavel: 'CPF inválido.',
      telefone: expect.stringContaining('Telefone inválido'),
      emergenciaTelefone: expect.stringContaining('Telefone inválido'),
      email: 'E-mail inválido.',
      nascimento: 'Data de nascimento inválida.',
    });
  });

  it('exige o detalhe quando a resposta é "Outro" ou "Sim"', () => {
    const erros = validarInscricao({ ...inscricaoValida, parentesco: 'Outro', alergiaMedicamento: 'Sim' });
    expect(Object.keys(erros).sort()).toEqual(['alergiaMedicamentoQual', 'parentescoOutro']);

    const preenchido = validarInscricao({
      ...inscricaoValida, parentesco: 'Outro', parentescoOutro: 'Avó paterna', alergiaMedicamento: 'Sim', alergiaMedicamentoQual: 'Dipirona',
    });
    expect(preenchido).toEqual({});
  });
});
