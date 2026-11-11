import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderPublico from '../../components/HeaderPublico';
import { consultarInscricao } from '../../services/inscricoes';
import { cpfValido, mascaraCpf } from '../../utils/validacao';
import ilustracaoLupa from '../../assets/ilustracao-lupa.png';

// Cores do protótipo
const AZUL = '#0047B8';
const AZUL_ESCURO = '#1F2A44';
const CINZA_BORDA = '#D1D5DB';
const CINZA_TEXTO = '#6B7280';

function AcompanhamentoInscricao() {
  const navigate = useNavigate();

  // Estado do formulário
  const [formData, setFormData] = useState({
    cpf: '',
    protocolo: '',
  });
  const [consultando, setConsultando] = useState(false);
  const [erro, setErro] = useState('');

  // Manipular mudanças de input (CPF com máscara, protocolo em maiúsculas)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const valor = name === 'cpf' ? mascaraCpf(value) : value.toUpperCase();
    setFormData((prev) => ({ ...prev, [name]: valor }));
    setErro('');
  };

  // Busca o resumo da inscrição pelo protocolo + CPF do responsável
  const handleConsultar = async (e) => {
    e.preventDefault();
    if (!cpfValido(formData.cpf)) {
      setErro('Digite um CPF válido.');
      return;
    }
    if (formData.protocolo.replace(/[^A-Z0-9]/gi, '').length < 8) {
      setErro('Digite o protocolo completo (ex.: ESP-7KQ2-M9XA).');
      return;
    }

    setConsultando(true);
    try {
      const inscricao = await consultarInscricao(formData.protocolo, formData.cpf);
      if (!inscricao) {
        // Mesma mensagem nos dois casos para não revelar se o protocolo existe
        setErro('Não encontramos uma inscrição com este protocolo e CPF. Confira os dados.');
        return;
      }
      navigate('/acompanhar-inscricao/resultado', { state: { inscricao } });
    } catch (error) {
      console.error('Erro ao consultar inscrição:', error);
      setErro('Não foi possível consultar agora. Verifique sua internet e tente de novo.');
    } finally {
      setConsultando(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column bg-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`



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

      <HeaderPublico />

      {/* Conteúdo Principal */}
      <main className="flex-grow-1 w-100 py-4 px-3 px-lg-5" style={{ maxWidth: '100%' }}>
        <div className="container-fluid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0' }}>
          {/* Título e Descrição */}
          <div className="mb-4">
            <h1 className="titulo-pagina">
              Acompanhar inscrição
            </h1>
            <p className="descricao-pagina">
              Digite o CPF do responsável e o protocolo recebido ao final da inscrição.
            </p>
          </div>

          {/* Container com duas colunas */}
          <div className="container-conteudo">
            {/* Coluna do Formulário */}
            <form className="coluna-formulario" onSubmit={handleConsultar} noValidate>
              {/* CPF do Responsável */}
              <div className="caixa-grupo-campos">
                <label className="label-campo label-obrigatorio">CPF do responsável</label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  placeholder="000.000.000-00"
                  inputMode="numeric"
                  className="campo-input"
                />
              </div>

              {/* Protocolo da inscrição */}
              <div className="caixa-grupo-campos">
                <label className="label-campo label-obrigatorio">Protocolo da inscrição</label>
                <input
                  type="text"
                  name="protocolo"
                  value={formData.protocolo}
                  onChange={handleInputChange}
                  placeholder="ESP-XXXX-XXXX"
                  autoComplete="off"
                  className="campo-input"
                />
              </div>

              {erro && (
                <div role="alert" className="mb-3" style={{ color: '#B91C1C', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', padding: '0.6rem 1rem', fontSize: '0.9rem' }}>
                  {erro}
                </div>
              )}

              {/* Botão Consultar */}
              <button
                type="submit"
                className="botao-consultar"
                disabled={consultando}
              >
                {consultando ? 'Consultando...' : 'Consultar'}
              </button>
            </form>

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