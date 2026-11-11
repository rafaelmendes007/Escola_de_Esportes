import { useState } from 'react';

// Divide uma lista em páginas. Mudar o tamanho da página volta para a página 1.
export function usePaginacao(itens, porPaginaInicial = 10) {
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPaginaEstado] = useState(porPaginaInicial);

  const totalPaginas = Math.max(1, Math.ceil(itens.length / porPagina));
  // Se a lista diminuiu (ex.: filtro), não deixa ficar numa página que não existe
  const paginaAtual = Math.min(pagina, totalPaginas);
  const inicio = (paginaAtual - 1) * porPagina;
  const fim = Math.min(inicio + porPagina, itens.length);

  const setPorPagina = (valor) => {
    setPorPaginaEstado(valor);
    setPagina(1);
  };

  return {
    itensDaPagina: itens.slice(inicio, fim),
    pagina: paginaAtual,
    setPagina,
    porPagina,
    setPorPagina,
    totalPaginas,
    totalItens: itens.length,
    inicio,
    fim,
  };
}
