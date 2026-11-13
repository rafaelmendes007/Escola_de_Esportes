import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { buscarUsuario, podeEntrar } from '../services/usuarios';

import { ContextoAutenticacao } from './contextoAutenticacao';

// Guarda quem está logado (e o perfil) para todas as telas
function ProvedorAutenticacao({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Monitorar mudanças de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Segura as rotas protegidas até o perfil chegar (evita voltar para o login)
        setCarregando(true);
        // Perfil (admin ou professor) e nome ficam no Firestore, em usuarios/{uid}
        let dados = null;
        try {
          dados = await buscarUsuario(user.uid);
        } catch (error) {
          console.error('Erro ao buscar o perfil do usuário:', error);
        }
        setUsuario({
          uid: user.uid,
          email: user.email,
          nome: dados?.nome || user.email,
          // Desativado fica sem perfil: as rotas protegidas mandam para o login
          perfil: podeEntrar(dados) ? dados.perfil : null,
        });
      } else {
        setUsuario(null);
      }
      setCarregando(false);
    });

    // Cleanup
    return () => unsubscribe();
  }, []);

  // Função para fazer logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUsuario(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const valor = {
    usuario,
    carregando,
    logout,
  };

  return (
    <ContextoAutenticacao.Provider value={valor}>
      {children}
    </ContextoAutenticacao.Provider>
  );
}

export default ProvedorAutenticacao;
