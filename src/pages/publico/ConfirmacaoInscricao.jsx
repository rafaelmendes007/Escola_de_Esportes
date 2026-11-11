import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import HeaderPublico from '../../components/HeaderPublico';

// Cores do protótipo
const AZUL = '#0047B8';
const AZUL_ESCURO = '#1F2A44';
const AZUL_CLARO = '#EFF6FF';
const CINZA_TEXTO = '#6B7280';
const VERDE_SUCESSO = '#10B981';

function ConfirmacaoInscricao() {
  // Protocolo gerado no envio da inscrição (tela de modalidade)
  const { protocolo, modalidade } = useLocation().state || {};
  const [copiado, setCopiado] = useState(false);

  // Sem inscrição enviada, não há o que confirmar
  if (!protocolo) {
    return <Navigate to="/" replace />;
  }

  const copiarProtocolo = async () => {
    try {
      await navigator.clipboard.writeText(protocolo);
      setCopiado(true);
    } catch {
      // Sem permissão para copiar: a pessoa ainda pode anotar o código
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column bg-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`



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

        .caixa-protocolo {
          border: 2px dashed ${AZUL};
          background-color: ${AZUL_CLARO};
          border-radius: 10px;
          padding: 1rem 1.5rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }
        .rotulo-protocolo {
          color: ${CINZA_TEXTO};
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .codigo-protocolo {
          color: ${AZUL_ESCURO};
          font-size: 1.6rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          margin: 0.25rem 0 0.5rem;
          font-family: ui-monospace, 'Consolas', monospace;
        }
        .botao-copiar {
          border: 1px solid ${AZUL};
          background-color: #FFFFFF;
          color: ${AZUL};
          border-radius: 6px;
          padding: 4px 12px;
          font-size: 0.85rem;
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

      <HeaderPublico />

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
            A inscrição em <strong>{modalidade}</strong> entrou na lista de espera. Avisaremos pelo telefone ou e-mail quando surgir uma vaga.
          </p>

          {/* Protocolo para acompanhar a inscrição */}
          <div className="caixa-protocolo">
            <div className="rotulo-protocolo">Seu protocolo</div>
            <div className="codigo-protocolo">{protocolo}</div>
            <button type="button" className="botao-copiar" onClick={copiarProtocolo}>
              <i className={`bi ${copiado ? 'bi-check2' : 'bi-copy'} me-1`}></i>
              {copiado ? 'Copiado' : 'Copiar código'}
            </button>
          </div>

          {/* Aviso Informativo */}
          <div className="aviso-info">
            <div className="aviso-icone">i</div>
            <p className="aviso-texto">
              Guarde este código. Para acompanhar a inscrição, use o protocolo e o CPF do responsável na opção "Acompanhar inscrição".
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