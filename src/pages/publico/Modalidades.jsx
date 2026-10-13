import { Link } from 'react-router-dom';
import HeaderPublico from '../../components/HeaderPublico';

// Cores do protótipo
const AZUL = '#0047B8';
const AZUL_ESCURO = '#1F2A44';
const LARANJA_RODAPE = '#C5652E';

function Modalidades() {
  // Dados das modalidades
  const modalidades = [
    {
      turma: 'ATLETISMO MISTO 1',
      vagas: 28,
      faixaEtaria: '10 A 13',
      horario: '17h30 ÀS 18h30',
      local: 'PISTA DE ATLETISMO',
      professor: 'SÔNIA PICAÇABA',
      destaque: false,
    },
    {
      turma: 'ATLETISMO MISTO 2',
      vagas: 28,
      faixaEtaria: '14 A 17',
      horario: '17h30 ÀS 18h30',
      local: 'PISTA DE ATLETISMO',
      professor: 'MARCO DE LAZARI',
      destaque: true,
    },
    {
      turma: 'GINÁSTICA RÍTMICA',
      vagas: 20,
      faixaEtaria: '10 A 14',
      horario: '15H ÀS 16H',
      local: 'SALA MULTIFUNCIONAL',
      professor: 'KATILYNE',
      destaque: false,
    },
    {
      turma: 'LUTAS MISTO',
      vagas: 20,
      faixaEtaria: '10 A 17',
      horario: '17h30 ÀS 18h30',
      local: 'SALA MULTIFUNCIONAL',
      professor: 'RICARDO IGOR',
      destaque: true,
    },
    {
      turma: 'FUTSAL MASCULINO 1',
      vagas: 28,
      faixaEtaria: '10 A 13',
      horario: '17h30 ÀS 18h30',
      local: 'QUADRA "A"',
      professor: 'RICARDO BARATA',
      destaque: false,
    },
    {
      turma: 'FUTSAL MASCULINO 2',
      vagas: 28,
      faixaEtaria: '14 A 17',
      horario: '18h30 ÀS 19h30',
      local: 'QUADRA "A"',
      professor: 'VINICIUS AGUIAR',
      destaque: true,
    },
    {
      turma: 'FUTEBOL MASCULINO 1',
      vagas: 28,
      faixaEtaria: '10 A 13',
      horario: '17h30 ÀS 18h30',
      local: 'CAMPO SOCIETY',
      professor: 'MOZART NETO',
      destaque: false,
    },
    {
      turma: 'FUTEBOL MASCULINO 2',
      vagas: 28,
      faixaEtaria: '14 A 17',
      horario: '18h30 ÀS 19h30',
      local: 'CAMPO SOCIETY',
      professor: 'MOZART NETO',
      destaque: true,
    },
    {
      turma: 'BASQUETE MISTO 1',
      vagas: 28,
      faixaEtaria: '10 A 13',
      horario: '17h30 ÀS 18h30',
      local: 'QUADRA "B"',
      professor: 'GRADUAÇÃO',
      destaque: false,
    },
    {
      turma: 'BASQUETE MISTO 2',
      vagas: 28,
      faixaEtaria: '14 A 17',
      horario: '18h30 ÀS 19h30',
      local: 'QUADRA "B"',
      professor: 'TANCREDO',
      destaque: true,
    },
    {
      turma: 'VÔLEI MISTO 1',
      vagas: 28,
      faixaEtaria: '10 A 13',
      horario: '17h30 ÀS 18h30',
      local: 'QUADRA "C"',
      professor: 'GRADUAÇÃO',
      destaque: false,
    },
    {
      turma: 'VÔLEI MISTO 2',
      vagas: 28,
      faixaEtaria: '14 A 17',
      horario: '18h30 ÀS 19h30',
      local: 'QUADRA "C"',
      professor: 'LUIZ MARCELO',
      destaque: true,
    },
    {
      turma: 'FLAG MISTO',
      vagas: 28,
      faixaEtaria: '10 A 17',
      horario: '18H ÀS 17H',
      local: 'CAMPO SOCIETY',
      professor: 'TRITÕES',
      destaque: false,
    },
    {
      turma: 'VÔLEI 4X4 MISTO 1',
      vagas: 12,
      faixaEtaria: '10 A 13',
      horario: '17h30 ÀS 18h30',
      local: 'ARENA BEACH TENNIS',
      professor: 'GRADUAÇÃO',
      destaque: true,
    },
    {
      turma: 'VÔLEI 4X4 MISTO 2',
      vagas: 12,
      faixaEtaria: '14 A 17',
      horario: '18h30 ÀS 19h30',
      local: 'ARENA BEACH TENNIS',
      professor: 'GRADUAÇÃO',
      destaque: false,
    },
  ];

  // Calcular total de vagas
  const totalVagas = modalidades.reduce((acc, mod) => acc + mod.vagas, 0);

  return (
    <div
      className="min-vh-100 d-flex flex-column bg-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Estilos customizados */}
      <style>{`
        
        .tabela-modalidades {
          width: 100%;
          border-collapse: collapse;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          overflow: hidden;
          min-width: 100%;
        }
        
        .tabela-modalidades thead {
          background-color: ${AZUL_ESCURO};
        }
        
        .tabela-modalidades th {
          color: white;
          padding: 14px 10px;
          font-weight: 600;
          font-size: 0.75rem;
          text-align: center;
          border-right: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .tabela-modalidades th:last-child {
          border-right: none;
        }
        
        .tabela-modalidades tbody tr {
          border-bottom: 1px solid #E5E7EB;
        }
        
        .tabela-modalidades tbody tr.destaque {
          background-color: ${AZUL};
          color: white;
        }
        
        .tabela-modalidades tbody tr.destaque td {
          color: white;
          font-weight: 500;
        }
        
        .tabela-modalidades tbody tr:not(.destaque) {
          background-color: #F9FAFB;
        }
        
        .tabela-modalidades td {
          padding: 12px 8px;
          font-size: 0.75rem;
          text-align: center;
          color: ${AZUL_ESCURO};
          border-right: 1px solid #E5E7EB;
          white-space: nowrap;
        }
        
        .tabela-modalidades td:last-child {
          border-right: none;
        }
        
        .tabela-modalidades tbody tr:not(.destaque) td {
          color: ${AZUL_ESCURO};
        }
        
        .rodape-tabela {
          background-color: ${LARANJA_RODAPE};
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .rodape-tabela td {
          padding: 12px 8px;
          text-align: center;
          color: white;
          border-right: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .rodape-tabela td:last-child {
          border-right: none;
        }

        /* Responsividade */
        @media (max-width: 1200px) {
          .tabela-modalidades {
            font-size: 0.8rem;
          }
          .tabela-modalidades th,
          .tabela-modalidades td {
            padding: 10px 6px;
          }
        }

        @media (max-width: 768px) {
          .tabela-modalidades th,
          .tabela-modalidades td {
            font-size: 0.65rem;
            padding: 8px 4px;
          }
        }
      `}</style>

      <HeaderPublico />

      {/* Conteúdo Principal */}
      <main className="flex-grow-1 w-100 py-3 px-3 px-lg-4" style={{ maxWidth: '100%' }}>
        <div className="container-fluid" style={{ maxWidth: '100%', margin: '0 auto', padding: '0 20px', marginTop: '20px' }}>        
          {/* Tabela de modalidades */}
          <div className="table-responsive">
            <table className="tabela-modalidades">
              <thead>
                <tr>
                  <th>TURMA</th>
                  <th>VAGAS POR TURMA</th>
                  <th>FAIXA ETÁRIA</th>
                  <th>HORÁRIO</th>
                  <th>LOCAL</th>
                  <th>PROFESSOR</th>
                  <th>DIAS</th>
                </tr>
              </thead>
              <tbody>
                {modalidades.map((modalidade, index) => (
                  <tr key={index} className={modalidade.destaque ? 'destaque' : ''}>
                    <td style={{ fontWeight: modalidade.destaque ? '600' : '500' }}>
                      {modalidade.turma}
                    </td>
                    <td>{modalidade.vagas}</td>
                    <td>{modalidade.faixaEtaria}</td>
                    <td>{modalidade.horario}</td>
                    <td>{modalidade.local}</td>
                    <td>{modalidade.professor}</td>
                    <td>TERÇA/QUINTA</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="rodape-tabela">
                  <td colSpan="6">TOTAL DE VAGAS</td>
                  <td>{totalVagas}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Atalho para a inscrição na lista de espera */}
          <div className="d-flex justify-content-end mt-4 mb-3">
            <Link to="/inscricao/dados" className="btn text-white fw-semibold px-4" style={{ backgroundColor: '#0047B8' }}>
              Fazer inscrição na lista de espera
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Modalidades;