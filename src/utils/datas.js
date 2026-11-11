// Ajudantes de data usados nas telas do admin e do professor

const DIAS_SEMANA = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

// Aceita Timestamp do Firestore, Date ou "AAAA-MM-DD"
export function paraDate(valor) {
  if (!valor) return null;
  if (typeof valor.toDate === 'function') return valor.toDate();
  if (valor instanceof Date) return valor;
  if (/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
    const [ano, mes, dia] = valor.split('-').map(Number);
    return new Date(ano, mes - 1, dia);
  }
  return new Date(valor);
}

// "dd/mm/aaaa" (ou "—" se não houver data)
export function formatarData(valor) {
  const data = paraDate(valor);
  return data ? data.toLocaleDateString('pt-BR') : '—';
}

// "dd/mm/aaaa às hh:mm"
export function formatarDataHora(valor) {
  const data = paraDate(valor);
  if (!data) return '—';
  return `${data.toLocaleDateString('pt-BR')} às ${data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
}

export function diaDaSemana(valor) {
  const data = paraDate(valor);
  return data ? DIAS_SEMANA[data.getDay()] : '';
}

// Idade em anos completos na data de hoje
export function calcularIdade(nascimento) {
  const data = paraDate(nascimento);
  if (!data) return null;
  const hoje = new Date();
  let idade = hoje.getFullYear() - data.getFullYear();
  if (hoje.getMonth() < data.getMonth() || (hoje.getMonth() === data.getMonth() && hoje.getDate() < data.getDate())) {
    idade -= 1;
  }
  return idade;
}

// Data de hoje em "AAAA-MM-DD"
export function hojeISO() {
  const hoje = new Date();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  return `${hoje.getFullYear()}-${mes}-${dia}`;
}
