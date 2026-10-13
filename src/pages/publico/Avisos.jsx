import HeaderPublico from '../../components/HeaderPublico';

// Cores do protótipo
const AZUL = '#0047B8';
const AZUL_ESCURO = '#1F2A44';
const AZUL_CLARO = '#EFF6FF';
const CINZA_TEXTO = '#6B7280';
const VERMELHO_BADGE = '#EF4444';

function Avisos() {
  // Array com os avisos
  const avisos = [
    {
      id: 1,
      titulo: 'Treino cancelado por chuva',
      descricao: 'Os treinos de futebol de hoje (16h) estão cancelados devido à chuva. As atividades serão repostas na próxima semana.',
      data: 'Hoje',
      hora: '10:32',
      novo: true,
      remetente: 'Administração',
    },
    {
      id: 3,
      titulo: 'Feriado – sem aulas',
      descricao: 'Não haverá aulas no dia 21/04 (Tiradentes). As aulas retornam normalmente no dia 22/04.',
      data: '08/04/2026',
      hora: '11:20',
      novo: false,
      remetente: 'Administração',
    },
    {
      id: 4,
      titulo: 'Entrega de uniformes',
      descricao: 'Os uniformes estarão disponíveis para retirada na secretaria a partir de segunda feira.',
      data: '10/04/2026',
      hora: '16:45',
      novo: false,
      remetente: 'Administração',
    },
  ];

  return (
    <div
      className="min-vh-100 d-flex flex-column bg-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`



        .badge-novo {
          display: inline-block;
          background-color: ${VERMELHO_BADGE};
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 600;
          margin-left: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .card-aviso {
          display: flex;
          gap: 1rem;
          padding: 1.25rem;
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }

        .card-aviso:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border-color: ${AZUL};
        }

        .icone-som {
          flex-shrink: 0;
          width: 50px;
          height: 50px;
          background-color: ${AZUL_CLARO};
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: ${AZUL};
        }

        .conteudo-aviso {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .header-aviso {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .titulo-aviso {
          color: ${AZUL_ESCURO};
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.3;
          margin: 0;
          display: inline-block;
        }

        .data-hora {
          color: ${CINZA_TEXTO};
          font-size: 0.85rem;
          white-space: nowrap;
          margin-left: auto;
          padding-left: 1rem;
        }

        .descricao-aviso {
          color: ${AZUL_ESCURO};
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0.5rem 0 0.75rem 0;
        }

        .remetente-aviso {
          color: ${CINZA_TEXTO};
          font-size: 0.8rem;
          line-height: 1.4;
        }

        .lista-avisos {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .subtitulo-pagina {
          color: ${CINZA_TEXTO};
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }

        @media (max-width: 768px) {
          .card-aviso {
            padding: 1rem;
            flex-direction: column;
          }

          .header-aviso {
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 0.75rem;
          }

          .data-hora {
            margin-left: 0;
            padding-left: 0;
            margin-top: 0.5rem;
          }

          .icone-som {
            width: 45px;
            height: 45px;
            font-size: 1.25rem;
          }

          .titulo-aviso {
            font-size: 0.95rem;
          }

          .descricao-aviso {
            font-size: 0.85rem;
          }
        }
      `}</style>

      <HeaderPublico />

      {/* Conteúdo Principal */}
      <main className="flex-grow-1 w-100 py-4 px-3 px-lg-5" style={{ maxWidth: '100%' }}>
        <div className="container-fluid" style={{ maxWidth: '900px', margin: '0 auto', padding: '0' }}>
          {/* Título da página */}
          <h1
            style={{
              color: AZUL_ESCURO,
              fontSize: '2rem',
              fontWeight: '600',
              lineHeight: '1.2',
              marginBottom: '0.5rem',
            }}
          >
            Avisos
          </h1>

          {/* Descrição */}
          <p className="subtitulo-pagina">
            Comunicados da Escola de Esporte.
          </p>

          {/* Lista de Avisos */}
          <div className="lista-avisos">
            {avisos.map((aviso) => (
              <div key={aviso.id} className="card-aviso">
                {/* Ícone de som */}
                <div className="icone-som">
                  🔊
                </div>

                {/* Conteúdo do aviso */}
                <div className="conteudo-aviso">
                  {/* Header: Título + Badge + Data */}
                  <div className="header-aviso">
                    <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      <h3 className="titulo-aviso">
                        {aviso.titulo}
                      </h3>
                      {aviso.novo && (
                        <span className="badge-novo">Novo</span>
                      )}
                    </div>
                    <div className="data-hora">
                      {aviso.data} · {aviso.hora}
                    </div>
                  </div>

                  {/* Descrição */}
                  <p className="descricao-aviso">
                    {aviso.descricao}
                  </p>

                  {/* Remetente */}
                  <p className="remetente-aviso">
                    Enviado por {aviso.remetente}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Avisos;