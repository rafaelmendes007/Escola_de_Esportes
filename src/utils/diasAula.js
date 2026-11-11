// As aulas da Escola de Esportes acontecem só às terças e quintas.
// Números do Date.getDay(): 0 = domingo, 2 = terça, 4 = quinta.
export const DIAS_DE_AULA = [2, 4];

// Converte "AAAA-MM-DD" em Date no fuso local (sem pular um dia por causa do UTC)
function paraData(iso) {
  const [ano, mes, dia] = iso.split('-').map(Number);
  return new Date(ano, mes - 1, dia);
}

export function ehDiaDeAula(iso) {
  return Boolean(iso) && DIAS_DE_AULA.includes(paraData(iso).getDay());
}

// Última terça ou quinta até hoje, no formato do input date (AAAA-MM-DD)
export function ultimoDiaDeAula() {
  const data = new Date();
  while (!DIAS_DE_AULA.includes(data.getDay())) {
    data.setDate(data.getDate() - 1);
  }
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${data.getFullYear()}-${mes}-${dia}`;
}
