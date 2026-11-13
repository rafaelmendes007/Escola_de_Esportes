import { Navigate } from 'react-router-dom';
import { useAutenticacao } from '../hooks/useAutenticacao';
import { AREA_DO_PERFIL } from '../services/usuarios';

// Protege rotas que precisam de login.
// perfil: 'admin' ou 'professor'. Quem tem outro perfil vai para a própria área.
function RotaProtegida({ perfil, children }) {
  const { usuario, carregando } = useAutenticacao();

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

  // Se não tem usuário logado (ou ele não tem perfil cadastrado), redirecionar para login
  if (!usuario || !usuario.perfil) {
    return <Navigate to="/login" replace />;
  }

  // Logado, mas na área de outro perfil
  if (perfil && usuario.perfil !== perfil) {
    return <Navigate to={AREA_DO_PERFIL[usuario.perfil]} replace />;
  }

  return children;
}

export default RotaProtegida;
