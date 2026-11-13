import { describe, expect, it } from 'vitest';
import { cpfValido, emailValido, mascaraCpf, mascaraTelefone, nascimentoValido, telefoneValido } from './validacao';

describe('CPF', () => {
  it('aceita CPF com dígitos verificadores certos, com ou sem máscara', () => {
    expect(cpfValido('529.982.247-25')).toBe(true);
    expect(cpfValido('52998224725')).toBe(true);
  });

  it('recusa dígito errado, números repetidos e tamanho errado', () => {
    expect(cpfValido('529.982.247-24')).toBe(false);
    expect(cpfValido('111.111.111-11')).toBe(false);
    expect(cpfValido('5299822472')).toBe(false);
  });

  it('formata enquanto a pessoa digita', () => {
    expect(mascaraCpf('5299')).toBe('529.9');
    expect(mascaraCpf('52998224725')).toBe('529.982.247-25');
    expect(mascaraCpf('529982247259999')).toBe('529.982.247-25');
  });
});

describe('Telefone', () => {
  it('formata celular e fixo', () => {
    expect(mascaraTelefone('85999998888')).toBe('(85) 99999-8888');
    expect(mascaraTelefone('8532223333')).toBe('(85) 3222-3333');
  });

  it('aceita DDD + 8 ou 9 dígitos', () => {
    expect(telefoneValido('(85) 99999-8888')).toBe(true);
    expect(telefoneValido('(85) 3222-3333')).toBe(true);
    expect(telefoneValido('9999-8888')).toBe(false);
  });
});

describe('E-mail e nascimento', () => {
  it('confere o formato do e-mail', () => {
    expect(emailValido('maria@email.com')).toBe(true);
    expect(emailValido('maria.email.com')).toBe(false);
  });

  it('aceita só idades entre 3 e 20 anos e datas que já passaram', () => {
    const anoAtual = new Date().getFullYear();
    expect(nascimentoValido(`${anoAtual - 12}-01-01`)).toBe(true);
    expect(nascimentoValido(`${anoAtual + 1}-01-01`)).toBe(false);
    expect(nascimentoValido(`${anoAtual - 40}-01-01`)).toBe(false);
    expect(nascimentoValido('10/05/2014')).toBe(false);
  });
});
