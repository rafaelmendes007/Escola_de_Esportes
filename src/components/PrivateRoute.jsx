import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Componente que protege rotas que precisam de autenticação
function PrivateRoute({ children }) {
  const { usuario, carregando } = useAuth();

  // Se está carregando, mostrar um loader
  if (carregando) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  // Se não tem usuário logado, redirecionar para login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Se tem usuário, renderizar o componente
  return children;
}

export default PrivateRoute;