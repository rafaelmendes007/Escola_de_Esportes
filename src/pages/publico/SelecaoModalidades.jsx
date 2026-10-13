import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderPublico from '../../components/HeaderPublico';

// Ícones das modalidades
import iconeAtletismo from '../../assets/modalidades/icone-atletismo.png';
import iconeGinastica from '../../assets/modalidades/icone-ginastica.png';
import iconeLutas from '../../assets/modalidades/icone-lutas.png';
import iconeFutsal from '../../assets/modalidades/icone futsal.png';
import iconeFutebol from '../../assets/modalidades/icone-futebol.png';
import iconeBasquete from '../../assets/modalidades/icone-basquete.png';
import iconeVoleibol from '../../assets/modalidades/icone-voleibol.png';
import iconeFlag from '../../assets/modalidades/icone-flag.png';
import iconeVolei4x4 from '../../assets/modalidades/icone-volei4x4.png';

// Cores do protótipo
const AZUL = '#0047B8';
const AZUL_ESCURO = '#1F2A44';
const CINZA_BORDA = '#D1D5DB';

function SelecaoModalidades() {
  const navigate = useNavigate();
  
  // Estado para armazenar modalidade selecionada
  const [modalidadeSelecionada, setModalidadeSelecionada] = useState(null);

  // Array com todas as modalidades
  const modalidades = [
    {
      id: 1,
      nome: 'Atletismo',
      icone: iconeAtletismo,
    },
    {
      id: 2,
      nome: 'Ginástica Rítmica',
      icone: iconeGinastica,
    },
    {
      id: 3,
      nome: 'Lutas',
      icone: iconeLutas,
    },
    {
      id: 4,
      nome: 'Futsal',
      icone: iconeFutsal,
    },
    {
      id: 5,
      nome: 'Futebol',
      icone: iconeFutebol,
    },
    {
      id: 6,
      nome: 'Basquete',
      icone: iconeBasquete,
    },
    {
      id: 7,
      nome: 'Vôleibol',
      icone: iconeVoleibol,
    },
    {
      id: 8,
      nome: 'Flag',
      icone: iconeFlag,
    },
    {
      id: 9,
      nome: 'Vôlei 4x4',
      icone: iconeVolei4x4,
    },
  ];

  // Manipular seleção de modalidade
  const handleSelecionarModalidade = (id) => {
    setModalidadeSelecionada(id);
  };

  // Manipular clique no botão Continuar
  const handleContinuar = () => {
    if (modalidadeSelecionada) {
      const modalidade = modalidades.find(m => m.id === modalidadeSelecionada);
      console.log('Modalidade selecionada:', modalidade);
      // Aqui você pode navegar para a próxima tela passando a modalidade selecionada
      navigate('/inscricao/dados', { state: { modalidade } });
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column bg-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        .botao-voltar {
          background: none;
          border: none;
          color: ${AZUL_ESCURO};
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .botao-voltar:hover {
          color: ${AZUL};
        }

        /* Usando Flexbox para centralizar os itens da última linha */
        .grid-modalidades {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.5rem;
          justify-content: center;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .card-modalidade {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background-color: #FFFFFF;
          border: 2px solid ${CINZA_BORDA};
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          color: inherit;
          width: 140px; /* Definindo largura fixa para o flex */
          aspect-ratio: 1 / 1;
        }

        .card-modalidade:hover {
          border-color: ${AZUL};
          box-shadow: 0 4px 12px rgba(0, 71, 184, 0.15);
          transform: translateY(-4px);
        }

        .card-modalidade.selecionado {
          border-color: ${AZUL};
          background-color: #EFF6FF;
          box-shadow: 0 4px 12px rgba(0, 71, 184, 0.15);
        }

        .card-icone {
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-icone img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .card-nome {
          display: none;
        }

        .botao-continuar {
          background-color: ${AZUL};
          color: white;
          border: none;
          padding: 14px 48px;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
          min-width: 200px;
          align-self: flex-end;
        }

        .botao-continuar:hover:not(:disabled) {
          background-color: #0039A0;
        }

        .botao-continuar:disabled {
          background-color: #9CA3AF;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .descricao-texto {
          color: ${AZUL_ESCURO};
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          max-width: 500px;
        }

        .titulo-modalidades {
          margin-bottom: 0.75rem;
        }

        @media (max-width: 1200px) {
          .grid-modalidades {
            gap: 0.9rem;
            max-width: 750px;
          }

          .card-modalidade {
            width: 130px;
            padding: 0.8rem;
          }

          .card-icone {
            width: 65px;
            height: 65px;
          }

          .descricao-texto {
            font-size: 0.85rem;
          }
        }

        @media (max-width: 768px) {
          .grid-modalidades {
            gap: 0.8rem;
            max-width: 500px;
          }

          .card-modalidade {
            width: 120px;
            padding: 0.7rem;
          }

          .card-icone {
            width: 60px;
            height: 60px;
          }

          .descricao-texto {
            font-size: 0.8rem;
            margin-bottom: 1rem;
          }

          .titulo-modalidades {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
          }

          .botao-continuar {
            padding: 10px 30px;
            font-size: 0.85rem;
            min-width: 150px;
          }
        }

        @media (max-width: 480px) {
          .grid-modalidades {
            gap: 0.7rem;
            max-width: 100%;
          }

          .card-modalidade {
            width: 45%; /* Ocupa quase metade da tela em celulares, garantindo 2 por linha */
            max-width: 150px;
            padding: 0.6rem;
          }

          .card-icone {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>

      <HeaderPublico />

      {/* Conteúdo Principal */}
      <main className="flex-grow-1 w-100" style={{ maxWidth: '100%', padding: '1.5rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
        <div className="container-fluid" style={{ maxWidth: '100%', margin: '0 auto', padding: '0', flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Botão Voltar */}
          <button
            onClick={() => navigate('/')}
            className="botao-voltar mb-4"
          >
            <span>←</span>
            Voltar
          </button>

          {/* Título e Descrição */}
          <div style={{ marginBottom: '1rem' }}>
            <h1
              className="titulo-modalidades"
              style={{
                color: AZUL_ESCURO,
                fontSize: '1.75rem',
                fontWeight: '600',
                lineHeight: '1.2',
              }}
            >
              Escolha a modalidade
            </h1>
            <p className="descricao-texto">
              A Escola de Esportes Unifor oferece modalidades esportivas para crianças e jovens, promovendo saúde, disciplina e inclusão.
            </p>
          </div>

          {/* Grid de Modalidades */}
          <div className="grid-modalidades">
            {modalidades.map((modalidade) => (
              <button
                key={modalidade.id}
                onClick={() => handleSelecionarModalidade(modalidade.id)}
                className={`card-modalidade ${modalidadeSelecionada === modalidade.id ? 'selecionado' : ''}`}
                type="button"
              >
                <div className="card-icone">
                  <img
                    src={modalidade.icone}
                    alt={modalidade.nome}
                  />
                </div>
                <div className="card-nome">
                  {modalidade.nome}
                </div>
              </button>
            ))}
          </div>

          {/* Botão Continuar */}
          <div className="d-flex justify-content-end" style={{ marginTop: 'auto', paddingTop: '1rem' }}>
            <button
              type="button"
              onClick={handleContinuar}
              disabled={!modalidadeSelecionada}
              className="botao-continuar"
            >
              Continuar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SelecaoModalidades;