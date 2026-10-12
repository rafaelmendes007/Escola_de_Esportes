import { Link } from 'react-router-dom';
import logoEscolaDeEsportes from '../../assets/Escola_de_Esportes.png';
import imagemSino from '../../assets/sino.png';

// Cores do protótipo
const AZUL = '#0047B8';
const AZUL_ESCURO = '#1F2A44';
const AZUL_CLARO = '#EFF6FF';
const CINZA_TEXTO = '#6B7280';
const VERDE_SUCESSO = '#10B981';

function ConfirmacaoInscricao() {
  return (
    <div
      className="min-vh-100 d-flex flex-column bg-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        .nav-link-home {
          color: ${AZUL_ESCURO};
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: none;
          padding-bottom: 4px;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-link-home:hover {
          color: ${AZUL};
        }

        .nav-link-home.ativo {
          color: ${AZUL};
          font-weight: 600;
          border-bottom-color: ${AZUL};
        }

        .container-confirmacao {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 2rem;
          padding: 3rem 1.5rem;
        }

        .icone-sucesso {
          width: 120px;
          height: 120px;
          background-color: ${VERDE_SUCESSO};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          color: white;
          animation: fadeInScale 0.6s ease-out;
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .titulo-confirmacao {
          color: ${AZUL_ESCURO};
          font-size: 2rem;
          font-weight: 600;
          line-height: 1.2;
          margin: 0;
          margin-top: 1rem;
          max-width: 600px;
        }

        .descricao-confirmacao {
          color: ${CINZA_TEXTO};
          font-size: 1rem;
          line-height: 1.6;
          margin: 0;
          max-width: 600px;
        }

        .aviso-info {
          width: 100%;
          max-width: 600px;
          background-color: ${AZUL_CLARO};
          border-left: 4px solid ${AZUL};
          padding: 1rem;
          border-radius: 6px;
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .aviso-icone {
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          background-color: ${AZUL};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.85rem;
          font-weight: bold;
          margin-top: 2px;
        }

        .aviso-texto {
          text-align: left;
          color: ${AZUL_ESCURO};
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0;
        }

        .grupo-botoes {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
          max-width: 400px;
          margin-top: 1rem;
        }

        .botao-primario {
          background-color: white;
          color: ${AZUL};
          border: 2px solid ${AZUL};
          padding: 14px 32px;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          min-height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .botao-primario:hover {
          background-color: ${AZUL_CLARO};
        }

        .link-secundario {
          color: ${AZUL};
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.3s ease;
          padding: 0.5rem;
        }

        .link-secundario:hover {
          color: ${AZUL_ESCURO};
        }

        @media (max-width: 768px) {
          .container-confirmacao {
            padding: 2rem 1.5rem;
            gap: 1.5rem;
          }

          .icone-sucesso {
            width: 100px;
            height: 100px;
            font-size: 2.5rem;
          }

          .titulo-confirmacao {
            font-size: 1.75rem;
          }

          .descricao-confirmacao {
            font-size: 0.95rem;
          }

          .aviso-texto {
            font-size: 0.85rem;
          }

          .botao-primario {
            padding: 12px 24px;
            font-size: 0.95rem;
            min-height: 44px;
          }

          .link-secundario {
            font-size: 0.9rem;
          }
        }
      `}</style>

      {/* Barra de navegação */}
      <header
        className="bg-white py-2 px-3 px-lg-5 d-flex justify-content-between align-items-center"
        style={{ minHeight: '72px', borderBottom: '1px solid #E5E7EB' }}
      >
        {/* Logo + nome da escola */}
        <Link to="/" className="d-flex align-items-center text-decoration-none">
          <img
            src={logoEscolaDeEsportes}
            alt="Logo da Escola de Esporte"
            className="img-fluid"
            style={{ maxHeight: '50px' }}
          />
          <h5
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              lineHeight: '1.2',
              marginLeft: '1.5rem',
              color: 'black',
              marginTop: '1rem',
              marginBottom: 0,
            }}
          >
            Escola de Esportes
            <br />
            UNIFOR
          </h5>
        </Link>

        {/* Links e sino de notificações */}
        <nav className="d-flex align-items-center gap-3 gap-sm-4">
          <Link to="/" className="nav-link-home">
            Início
          </Link>
          <Link to="/modalidades" className="nav-link-home">
            Modalidades
          </Link>
          <button type="button" className="btn p-0 border-0" aria-label="Notificações">
            <img src={imagemSino} alt="" style={{ height: '28px' }} />
          </button>
        </nav>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-grow-1 w-100 d-flex align-items-center justify-content-center" style={{ maxWidth: '100%' }}>
        <div className="container-confirmacao">
          {/* Ícone de Sucesso */}
          <div className="icone-sucesso">
            ✓
          </div>

          {/* Título */}
          <h1 className="titulo-confirmacao">
            Inscrição realizada com sucesso!
          </h1>

          {/* Descrição */}
          <p className="descricao-confirmacao">
            A inscrição foi enviada e os documentos serão analisados pela administração.
          </p>

          {/* Aviso Informativo */}
          <div className="aviso-info">
            <div className="aviso-icone">i</div>
            <p className="aviso-texto">
              Para acompanhar a inscrição, use o CPF e a data de nascimento do responsável na opção "Acompanhar inscrição".
            </p>
          </div>

          {/* Grupo de Botões */}
          <div className="grupo-botoes">
            <Link
              to="/acompanhar-inscricao"
              className="botao-primario"
            >
              Acompanhar minha inscrição
            </Link>
          </div>

          {/* Link Secundário */}
          <Link
            to="/"
            className="link-secundario"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </main>
    </div>
  );
}

export default ConfirmacaoInscricao;