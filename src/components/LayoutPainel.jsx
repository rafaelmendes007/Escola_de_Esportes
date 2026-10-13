import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AZUL, AZUL_ESCURO, AZUL_MENU_ATIVO, AZUL_CLARO, FUNDO, TEXTO, CINZA_TEXTO, BORDA, VERMELHO } from './cores';

// Estrutura comum das telas logadas: menu lateral + barra superior.
// menu: [{ to, texto, icone, ativo }]
function LayoutPainel({ titulo, menu, usuario, linkAvisos, temAvisoNovo, children }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [perfilAberto, setPerfilAberto] = useState(false);

  return (
    <div className="d-flex min-vh-100" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: FUNDO }}>
      <style>{`
        .painel-sidebar {
          width: 240px;
          flex-shrink: 0;
          background-color: ${AZUL_ESCURO};
          color: #FFFFFF;
          display: flex;
          flex-direction: column;
          padding: 20px 16px;
          /* Menu lateral fica parado enquanto o conteúdo rola */
          position: sticky;
          top: 0;
          align-self: flex-start;
          height: 100vh;
          overflow-y: auto;
        }
        .painel-menu-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 6px;
          color: #FFFFFF;
          text-decoration: none;
          font-size: 0.9rem;
        }
        .painel-menu-item:hover { background-color: rgba(255, 255, 255, 0.08); color: #FFFFFF; }
        .painel-menu-item.ativo { background-color: ${AZUL_MENU_ATIVO}; }
        .painel-topbar {
          height: 72px;
          background-color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          /* Barra superior presa no topo */
          position: sticky;
          top: 0;
          z-index: 1020;
          border-bottom: 1px solid ${BORDA};
        }
        .painel-card {
          background-color: #FFFFFF;
          border: 1px solid ${BORDA};
          border-radius: 8px;
        }
        .painel-titulo { color: ${TEXTO}; font-size: 1.75rem; font-weight: 600; margin: 0; }
        .painel-subtitulo { color: ${CINZA_TEXTO}; font-size: 0.8rem; margin: 2px 0 0; }
        .painel-voltar {
          color: ${AZUL};
          font-size: 0.75rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 4px;
        }
        .painel-botao-contorno {
          border: 1px solid ${AZUL};
          color: ${AZUL};
          background-color: #FFFFFF;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
          padding: 6px 14px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .painel-botao-contorno:hover { background-color: ${AZUL_CLARO}; color: ${AZUL}; }
        .painel-botao {
          border: none;
          color: #FFFFFF;
          background-color: ${AZUL};
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 500;
          padding: 8px 18px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .painel-botao:hover { background-color: #184E9A; color: #FFFFFF; }
        .painel-tabela { width: 100%; font-size: 0.8rem; color: ${TEXTO}; border-collapse: collapse; }
        .painel-tabela th {
          font-weight: 500;
          font-size: 0.75rem;
          padding: 12px 16px;
          background-color: #F9FAFB;
          border-bottom: 1px solid ${BORDA};
        }
        .painel-tabela td { padding: 10px 16px; border-bottom: 1px solid ${BORDA}; vertical-align: middle; }
        .painel-tabela tr:last-child td { border-bottom: none; }
        .painel-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: ${AZUL_CLARO};
          color: ${AZUL};
          font-size: 0.65rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Em telas pequenas o menu lateral vira uma gaveta aberta pelo botão ≡ */
        @media (max-width: 991px) {
          .painel-sidebar {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 1040;
            transform: translateX(-100%);
            transition: transform 0.2s ease;
          }
          .painel-sidebar.aberto { transform: translateX(0); }
          .painel-topbar { padding: 0 16px; }
        }
      `}</style>

      {/* Menu lateral */}
      <aside className={`painel-sidebar ${menuAberto ? 'aberto' : ''}`}>
        <div className="fw-semibold mb-4" style={{ fontSize: '1.05rem', lineHeight: 1.2 }}>
          Escola de Esporte
          <br />
          UNIFOR
        </div>

        <nav className="d-flex flex-column gap-1">
          {menu.map((item) => (
            <Link key={item.to} to={item.to} className={`painel-menu-item ${item.ativo ? 'ativo' : ''}`}>
              <i className={`bi ${item.icone}`}></i> {item.texto}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-3" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.5)' }}>
          <Link to="/login" className="painel-menu-item">
            <i className="bi bi-box-arrow-right"></i> Sair
          </Link>
        </div>
      </aside>

      {/* Fundo escuro atrás da gaveta no celular */}
      {menuAberto && (
        <div
          className="d-lg-none position-fixed top-0 start-0 w-100 h-100"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 1030 }}
          onClick={() => setMenuAberto(false)}
        ></div>
      )}

      <div className="flex-grow-1 d-flex flex-column" style={{ minWidth: 0 }}>
        {/* Barra superior */}
        <header className="painel-topbar">
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn p-0 border-0"
              aria-label="Abrir menu"
              onClick={() => setMenuAberto(!menuAberto)}
            >
              <i className="bi bi-list fs-5" style={{ color: TEXTO }}></i>
            </button>
            <span className="fw-semibold" style={{ color: TEXTO, fontSize: '0.95rem' }}>{titulo}</span>
          </div>

          <div className="d-flex align-items-center gap-4">
            <Link to={linkAvisos} className="position-relative" aria-label="Avisos" style={{ color: TEXTO }}>
              <i className="bi bi-bell fs-5"></i>
              {temAvisoNovo && (
                <span
                  className="position-absolute rounded-circle"
                  style={{ width: '7px', height: '7px', backgroundColor: VERMELHO, top: '2px', right: '-1px' }}
                ></span>
              )}
            </Link>

            {/* Perfil com menu para sair */}
            <div className="position-relative">
              <button
                type="button"
                className="btn p-0 border-0 d-flex align-items-center gap-2"
                onClick={() => setPerfilAberto(!perfilAberto)}
              >
                <span
                  className="rounded-circle d-inline-flex align-items-center justify-content-center text-white"
                  style={{ width: '28px', height: '28px', backgroundColor: AZUL, fontSize: '0.8rem' }}
                >
                  A
                </span>
                <span className="d-none d-sm-inline" style={{ color: TEXTO, fontSize: '0.9rem' }}>{usuario}</span>
                <i className="bi bi-chevron-down ms-sm-3" style={{ color: TEXTO, fontSize: '0.8rem' }}></i>
              </button>
              {perfilAberto && (
                <div className="painel-card position-absolute end-0 mt-2 py-1 shadow-sm" style={{ zIndex: 1020, minWidth: '140px' }}>
                  <Link to="/login" className="d-block px-3 py-2 text-decoration-none small" style={{ color: TEXTO }}>
                    <i className="bi bi-box-arrow-right me-2"></i>Sair
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Conteúdo da tela */}
        <main className="flex-grow-1 p-3 p-lg-4">{children}</main>
      </div>
    </div>
  );
}

export default LayoutPainel;
