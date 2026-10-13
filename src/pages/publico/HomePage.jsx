import { Link } from 'react-router-dom';
import HeaderPublico from '../../components/HeaderPublico';
import imagemEsportes from '../../assets/esportes_tela_responsavel.png';

// Cor principal do protótipo
const AZUL = '#0047B8';

function HomePage() {
  return (
    // Fundo branco com altura mínima de 100vh (tela inteira)
    <div
      className="min-vh-100 d-flex flex-column bg-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >

      <HeaderPublico />

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
                to="/inscricao/dados"
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