import { useCallback, useEffect, useState } from 'react';

// Busca dados assíncronos (ex.: Firestore) e devolve { dados, carregando, erro, recarregar }.
// "deps" funciona como no useEffect: quando muda, busca de novo.
export function useCarregar(buscar, deps = []) {
  const [estado, setEstado] = useState({ dados: null, carregando: true, erro: null });
  const [versao, setVersao] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const buscarMemo = useCallback(buscar, deps);

  useEffect(() => {
    let ativo = true;
    setEstado((anterior) => ({ ...anterior, carregando: true, erro: null }));
    buscarMemo()
      .then((dados) => ativo && setEstado({ dados, carregando: false, erro: null }))
      .catch((erro) => {
        console.error('Erro ao carregar dados:', erro);
        if (ativo) setEstado({ dados: null, carregando: false, erro });
      });
    return () => { ativo = false; };
  }, [buscarMemo, versao]);

  const recarregar = useCallback(() => setVersao((v) => v + 1), []);
  return { ...estado, recarregar };
}
