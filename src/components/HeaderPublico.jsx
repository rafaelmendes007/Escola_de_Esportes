import { Link, NavLink } from 'react-router-dom';
import logoEscolaDeEsportes from '../assets/Escola_de_Esportes.png';
import imagemSino from '../assets/sino.png';
import { AZUL_NAVBAR as AZUL, TEXTO } from './cores';

// Barra de navegação das telas públicas. Fica presa no topo ao rolar a página.
function HeaderPublico() {
  return (
    <header
      className="bg-white py-2 px-3 px-lg-5 d-flex justify-content-between align-items-center sticky-top"
      style={{ minHeight: '72px', borderBottom: '1px solid #E5E7EB', fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        .nav-publico {
          color: ${TEXTO};
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: none;
          padding-bottom: 4px;
          border-bottom: 2px solid transparent;
          transition: color 0.2s ease;
        }
        .nav-publico:hover { color: ${AZUL}; }
        .nav-publico.active {
          color: ${AZUL};
          font-weight: 600;
          border-bottom-color: ${AZUL};
        }
      `}</style>

      {/* Logo + nome da escola */}
      <Link to="/" className="d-flex align-items-center gap-3 text-decoration-none">
        <img src={logoEscolaDeEsportes} alt="Logo da Escola de Esporte" style={{ height: '48px' }} />
        <span className="d-none d-sm-block fw-semibold" style={{ fontSize: '1.15rem', lineHeight: 1.2, color: 'black' }}>
          Escola de Esportes
          <br />
          UNIFOR
        </span>
      </Link>

      {/* Links, sino de avisos e entrada dos colaboradores */}
      <nav className="d-flex align-items-center gap-3 gap-sm-4">
        <NavLink to="/" end className="nav-publico">Início</NavLink>
        <NavLink to="/modalidades" className="nav-publico">Modalidades</NavLink>
        <NavLink to="/avisos" aria-label="Avisos" className="d-flex">
          <img src={imagemSino} alt="" style={{ height: '26px' }} />
        </NavLink>
        <Link
          to="/login"
          className="btn btn-sm d-flex align-items-center gap-1"
          style={{ border: `1px solid ${AZUL}`, color: AZUL, fontSize: '0.8rem' }}
        >
          <i className="bi bi-box-arrow-in-right"></i>
          <span className="d-none d-md-inline">Área do colaborador</span>
        </Link>
      </nav>
    </header>
  );
}

export default HeaderPublico;
