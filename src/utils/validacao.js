// Máscaras e validações dos formulários públicos

export const somenteDigitos = (texto = '') => texto.replace(/\D/g, '');

// "12345678901" -> "123.456.789-01"
export function mascaraCpf(valor) {
  const d = somenteDigitos(valor).slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d{1,2})$/, '.$1-$2');
}

// "85999998888" -> "(85) 99999-8888"; aceita fixo com 8 dígitos
export function mascaraTelefone(valor) {
  const d = somenteDigitos(valor).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

// Confere os dois dígitos verificadores do CPF
export function cpfValido(valor) {
  const cpf = somenteDigitos(valor);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  const digito = (quantidade) => {
    let soma = 0;
    for (let i = 0; i < quantidade; i += 1) {
      soma += Number(cpf[i]) * (quantidade + 1 - i);
    }
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  return digito(9) === Number(cpf[9]) && digito(10) === Number(cpf[10]);
}

export function telefoneValido(valor) {
  const d = somenteDigitos(valor);
  return d.length === 10 || d.length === 11;
}

export function emailValido(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());
}

// Data "AAAA-MM-DD" de alguém com idade entre os limites (inclusive)
export function nascimentoValido(iso, idadeMinima = 3, idadeMaxima = 20) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
  const [ano, mes, dia] = iso.split('-').map(Number);
  const nascimento = new Date(ano, mes - 1, dia);
  const hoje = new Date();
  if (nascimento > hoje) return false;

  let idade = hoje.getFullYear() - ano;
  const aindaNaoFezAniversario = hoje.getMonth() < mes - 1 || (hoje.getMonth() === mes - 1 && hoje.getDate() < dia);
  if (aindaNaoFezAniversario) idade -= 1;
  return idade >= idadeMinima && idade <= idadeMaxima;
}
