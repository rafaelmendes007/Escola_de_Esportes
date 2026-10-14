import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

// Criar o contexto de autenticação
const AuthContext = createContext();

// Provider do contexto
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Monitorar mudanças de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
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

  const value = {
    usuario,
    carregando,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}