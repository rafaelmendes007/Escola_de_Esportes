import { useState } from 'react';

// Divide a lista em páginas e guarda a página atual e os itens por página
export function usePaginacao(itens, porPaginaInicial = 10) {
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(porPaginaInicial);

  const totalPaginas = Math.max(1, Math.ceil(itens.length / porPagina));
  // Se a lista diminuir (ex.: depois de filtrar), volta para a última página que existe
  const paginaAtual = Math.min(pagina, totalPaginas);
  const inicio = (paginaAtual - 1) * porPagina;

  return {
    itensDaPagina: itens.slice(inicio, inicio + porPagina),
    paginacao: {
      pagina: paginaAtual,
      totalPaginas,
      porPagina,
      mudarPagina: setPagina,
      mudarPorPagina: (quantidade) => {
        setPorPagina(quantidade);
        setPagina(1);
      },
    },
  };
}
