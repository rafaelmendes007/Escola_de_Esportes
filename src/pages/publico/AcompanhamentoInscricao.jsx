import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoEscolaDeEsportes from '../../assets/Escola_de_Esportes.png';
import imagemSino from '../../assets/sino.png';
import ilustracaoLupa from '../../assets/ilustracao-lupa.png';

// Cores do protótipo
const AZUL = '#0047B8';
const AZUL_ESCURO = '#1F2A44';
const CINZA_BORDA = '#D1D5DB';
const CINZA_TEXTO = '#6B7280';
const AZUL_CLARO = '#EFF6FF';

function AcompanhamentoInscricao() {
  // Estado do formulário
  const [formData, setFormData] = useState({
    cpf: '',
    dataNascimento: '',
  });

  // Manipular mudanças de input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manipular submit do formulário
  const handleConsultar = () => {
    console.log('Dados para consultar:', formData);
    // Aqui você implementaria a lógica de consulta
  };

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

        .label-campo {
          color: ${AZUL_ESCURO};
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          display: block;
        }

        .label-obrigatorio::after {
          content: ' *';
          color: #EF4444;
        }

        .campo-input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid ${CINZA_BORDA};
          border-radius: 6px;
          font-size: 0.9rem;
          font-family: 'Inter', sans-serif;
          color: ${AZUL_ESCURO};
          transition: border-color 0.3s ease;
          background-color: #FFFFFF;
        }

        .campo-input::placeholder {
          color: #9CA3AF;
        }

        .campo-input:focus {
          outline: none;
          border-color: ${AZUL};
          box-shadow: 0 0 0 3px rgba(0, 71, 184, 0.1);
        }

        .caixa-grupo-campos {
          margin-bottom: 1.5rem;
        }

        .botao-consultar {
          background-color: ${AZUL};
          color: white;
          border: none;
          padding: 12px 40px;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
          min-width: 200px;
          min-height: 48px;
        }

        .botao-consultar:hover {
          background-color: #0039A0;
        }

        .container-conteudo {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: center;
        }

        .coluna-formulario {
          display: flex;
          flex-direction: column;
        }

        .coluna-ilustracao {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ilustracao {
          width: 100%;
          max-width: 400px;
          height: auto;
        }

        .titulo-pagina {
          color: ${AZUL_ESCURO};
          font-size: 2rem;
          font-weight: 600;
          line-height: 1.2;
          margin-bottom: 0.5rem;
        }

        .descricao-pagina {
          color: ${CINZA_TEXTO};
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 2rem;
          max-width: 500px;
        }

        @media (max-width: 1024px) {
          .container-conteudo {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .coluna-ilustracao {
            display: none;
          }

          .titulo-pagina {
            font-size: 1.75rem;
          }

          .descricao-pagina {
            font-size: 0.9rem;
            margin-bottom: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .titulo-pagina {
            font-size: 1.5rem;
          }

          .descricao-pagina {
            font-size: 0.85rem;
          }

          .botao-consultar {
            min-width: 150px;
            padding: 10px 30px;
            font-size: 0.95rem;
            min-height: 44px;
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
          <Link to="/" className="nav-link-home ativo">
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
      <main className="flex-grow-1 w-100 py-4 px-3 px-lg-5" style={{ maxWidth: '100%' }}>
        <div className="container-fluid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0' }}>
          {/* Título e Descrição */}
          <div className="mb-4">
            <h1 className="titulo-pagina">
              Acompanhar inscrição
            </h1>
            <p className="descricao-pagina">
              Digite o CPF e a data de nascimento do responsável para consultar o status da inscrição.
            </p>
          </div>

          {/* Container com duas colunas */}
          <div className="container-conteudo">
            {/* Coluna do Formulário */}
            <div className="coluna-formulario">
              {/* CPF do Responsável */}
              <div className="caixa-grupo-campos">
                <label className="label-campo label-obrigatorio">CPF do responsável</label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  placeholder="000.000.000-00"
                  className="campo-input"
                />
              </div>

              {/* Data de Nascimento do Responsável */}
              <div className="caixa-grupo-campos">
                <label className="label-campo label-obrigatorio">Data de nascimento do responsável</label>
                <input
                  type="text"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleInputChange}
                  placeholder="dd/mm/aaaa"
                  className="campo-input"
                />
              </div>

              {/* Botão Consultar */}
              <button
                type="button"
                onClick={handleConsultar}
                className="botao-consultar"
              >
                Consultar
              </button>
            </div>

            {/* Coluna da Ilustração */}
            <div className="coluna-ilustracao">
              <img
                src={ilustracaoLupa}
                alt="Ilustração de acompanhamento de inscrição"
                className="ilustracao"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AcompanhamentoInscricao;