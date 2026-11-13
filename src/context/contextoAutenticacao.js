import { createContext } from 'react';

// Contexto com { usuario, carregando, logout }, preenchido pelo ProvedorAutenticacao
export const ContextoAutenticacao = createContext(null);
