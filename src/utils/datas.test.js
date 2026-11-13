import { describe, expect, it } from 'vitest';
import { calcularIdade, diaDaSemana, formatarData } from './datas';
import { ehDiaDeAula } from './diasAula';

describe('datas', () => {
  it('formata "AAAA-MM-DD" sem pular um dia por causa do fuso', () => {
    expect(formatarData('2026-04-16')).toBe('16/04/2026');
    expect(formatarData(null)).toBe('—');
  });

  it('diz o dia da semana', () => {
    expect(diaDaSemana('2026-04-14')).toBe('Terça-feira');
    expect(diaDaSemana('2026-04-16')).toBe('Quinta-feira');
  });

  it('calcula a idade considerando se já fez aniversário no ano', () => {
    const hoje = new Date();
    const ano = hoje.getFullYear() - 12;
    const ontem = new Date(hoje); ontem.setDate(hoje.getDate() - 1);
    const amanha = new Date(hoje); amanha.setDate(hoje.getDate() + 1);
    const iso = (d) => `${ano}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    expect(calcularIdade(iso(ontem))).toBe(12);
    expect(calcularIdade(iso(amanha))).toBe(11);
  });
});

describe('dias de aula', () => {
  it('aceita só terça e quinta', () => {
    expect(ehDiaDeAula('2026-04-14')).toBe(true); // terça
    expect(ehDiaDeAula('2026-04-16')).toBe(true); // quinta
    expect(ehDiaDeAula('2026-04-13')).toBe(false); // segunda
    expect(ehDiaDeAula('')).toBe(false);
  });
});
