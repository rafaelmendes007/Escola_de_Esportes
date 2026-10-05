import { Link } from 'react-router-dom';
import logoEscolaDeEsportes from '../../assets/Escola_de_Esportes.png';
import imagemEsportes from '../../assets/esportes_tela_responsavel.png';
import imagemSino from '../../assets/sino.png';

// Cor principal do protótipo
const AZUL = '#0047B8';

function HomePage() {
  return (
    // Fundo branco com altura mínima de 100vh (tela inteira)
    <div
      className="min-vh-100 d-flex flex-column bg-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Estilo do link ativo da navbar (sublinhado azul) */}
      <style>{`
        .nav-link-home {
          color: #1F2A44;
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: none;
          padding-bottom: 4px;
          border-bottom: 2px solid transparent;
        }
        .nav-link-home.ativo {
          color: ${AZUL};
          font-weight: 600;
          border-bottom-color: ${AZUL};
        }
      `}</style>

      {/* Barra de navegação */}
      <header
        className="bg-white py-2 px-3 px-lg-5 d-flex justify-content-between align-items-center"
        style={{ minHeight: '72px', borderBottom: '1px solid #E5E7EB' }}
      >
        {/* Logo + nome da escola */}
        <Link to="/" className="d-flex align-items-center text-decoration-none">
          <img src={logoEscolaDeEsportes} alt="Logo da Escola de Esporte" className="img-fluid" style={{ maxHeight: '50px' }} />
          <h5 style={{ fontSize: '1.25rem', fontWeight: '600', lineHeight: '1.2', marginLeft: '1.5rem', color: 'black', marginTop: '1rem' }}>
          Escola de Esportes<br/>
          UNIFOR</h5>
        </Link>

        {/* Links e sino de notificações */}
        <nav className="d-flex align-items-center gap-3 gap-sm-4">
          <Link to="/" className="nav-link-home ativo">Início</Link>
          <Link to="/modalidades" className="nav-link-home">Modalidades</Link>
          <button type="button" className="btn p-0 border-0" aria-label="Notificações">
            <img src={imagemSino} alt="" style={{ height: '28px' }} />
          </button>
        </nav>
      </header>

      {/* Conteúdo Principal */}
      <main className="container-fluid flex-grow-1 d-flex align-items-center py-5 px-3 px-lg-5" style={{ maxWidth: '1540px' }}>
        <div className="row w-100 align-items-center g-5">

          {/* Coluna da esquerda: título, descrição e botões */}
          <div className="col-12 col-lg-6" >
            <h1
              
              style={{ color: 'black', fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', lineHeight: '1.15', letterSpacing: '-1px', fontStyle: 'bold' }}
            >
              Esporte que<br />
              forma para a vida
            </h1>

            <p className="mt-4 mb-5" style={{ color: 'black', fontSize: 'clamp(1.1rem, 1.8vw, 1.6rem)', lineHeight: '1.3', maxWidth: '640px' }}>
              A Escola de Esportes Unifor oferece modalidades esportivas para crianças e jovens, promovendo saúde, disciplina e inclusão.
            </p>

            {/* Botões empilhados */}
            <div className="d-grid gap-3" style={{ maxWidth: '632px' }}>
              <Link
                to="/lista-de-espera"
                className="btn py-3 fw-semibold text-white border-0"
                style={{ backgroundColor: AZUL, borderRadius: '6px', fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)' }}
              >
                Fazer inscrição na lista de espera
              </Link>

              <Link
                to="/acompanhar-inscricao"
                className="btn py-3 fw-semibold"
                style={{
                  color: AZUL,
                  backgroundColor: '#FFFFFF',
                  border: `2px solid ${AZUL}`,
                  borderRadius: '6px',
                  fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
                }}
              >
                Acompanhar Inscrição
              </Link>
            </div>
          </div>

          {/* Coluna da direita: ilustração */}
          <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end">
            <img
              src={imagemEsportes}
              alt="Ilustração de atletas praticando corrida, basquete, futebol e judô"
              className="img-fluid"
              style={{ maxHeight: '600px' }}
            />
          </div>

        </div>
      </main>
    </div>
  );
}

export default HomePage;