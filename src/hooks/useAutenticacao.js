import { useContext } from 'react';
import { ContextoAutenticacao } from '../context/contextoAutenticacao';

// Usuário logado ({ uid, email, nome, perfil }), "carregando" e a função logout
export function useAutenticacao() {
  const contexto = useContext(ContextoAutenticacao);
  if (!contexto) {
    throw new Error('useAutenticacao deve ser usado dentro de ProvedorAutenticacao');
  }
  return contexto;
}
