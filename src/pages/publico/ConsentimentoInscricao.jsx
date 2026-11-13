import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderPublico from '../../components/HeaderPublico';
import BotaoVoltar from '../../components/BotaoVoltar';
import { registrarConsentimento } from '../../utils/consentimento';

// Cores do protótipo
const AZUL = 'var(--azul)';
const AZUL_ESCURO = '#1F2A44';

const LINK_POLITICA = 'https://www.unifor.br/politica-de-privacidade';
const LINK_TERMOS = 'https://www.unifor.br/termos-de-uso';

// Primeira etapa da inscrição: o responsável precisa aceitar os dois termos para continuar
function ConsentimentoInscricao() {
  const navigate = useNavigate();
  const [aceitouPolitica, setAceitouPolitica] = useState(false);
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const podeContinuar = aceitouPolitica && aceitouTermos;

  const handleContinuar = (e) => {
    e.preventDefault();
    if (!podeContinuar) return;
    registrarConsentimento();
    navigate('/inscricao/dados');
  };

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#F7F8FA' }}>
      <style>{`
        .caixa-aceite {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          cursor: pointer;
          transition: border-color 0.2s ease, background-color 0.2s ease;
          color: ${AZUL_ESCURO};
          font-size: 0.95rem;
        }
        .caixa-aceite:hover { border-color: ${AZUL}; }
        .caixa-aceite.marcada { border-color: ${AZUL}; background-color: #EFF6FF; }
        .caixa-aceite input {
          width: 18px;
          height: 18px;
          margin-top: 2px;
          accent-color: ${AZUL};
          flex-shrink: 0;
          cursor: pointer;
        }
        .caixa-aceite a { color: ${AZUL}; font-weight: 500; }

        .botao-continuar {
          background-color: ${AZUL};
          color: white;
          border: none;
          padding: 14px 32px;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          min-width: 220px;
          transition: background-color 0.3s ease, opacity 0.3s ease;
        }
        .botao-continuar:hover:not(:disabled) { background-color: var(--azul-escuro); }
        .botao-continuar:disabled { opacity: 0.45; cursor: not-allowed; }
      `}</style>

      <HeaderPublico />

      <main className="flex-grow-1 w-100 py-4 px-3">
        <form className="mx-auto" style={{ maxWidth: '760px' }} onSubmit={handleContinuar}>
          <BotaoVoltar para="/" />

          <h1 style={{ color: AZUL_ESCURO, fontSize: '2rem', fontWeight: 600, lineHeight: 1.2, marginBottom: '0.3rem' }}>
            Antes de começar
          </h1>
          <p style={{ color: '#6B7280', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Leia o aviso abaixo e marque as duas opções para continuar com a inscrição.
          </p>

          <section className="bg-white rounded-3 p-4 mb-4" style={{ border: '1px solid #E5E7EB' }}>
            <h2 className="d-flex align-items-center gap-2 mb-3" style={{ color: AZUL_ESCURO, fontSize: '1.1rem', fontWeight: 600 }}>
              <i className="bi bi-shield-check" style={{ color: AZUL }}></i>
              Uso dos dados pessoais
            </h2>
            <p style={{ color: '#374151', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Os dados pessoais coletados a seguir serão tratados pela Universidade de Fortaleza para fins de
              processamento da sua inscrição, bem como para o envio de nossas campanhas publicitárias, o que será
              feito com base no seu consentimento. Para obter informações sobre o modo como tratamos dados pessoais,
              recomendamos que você leia nossa{' '}
              <a href={LINK_POLITICA} target="_blank" rel="noreferrer" style={{ color: AZUL }}>Política de Privacidade</a>,
              bem como os{' '}
              <a href={LINK_TERMOS} target="_blank" rel="noreferrer" style={{ color: AZUL }}>Termos de Uso</a>{' '}
              dos nossos sites.
            </p>

            <div className="d-flex flex-column gap-3 mt-4">
              <label className={`caixa-aceite ${aceitouPolitica ? 'marcada' : ''}`}>
                <input type="checkbox" checked={aceitouPolitica} onChange={(e) => setAceitouPolitica(e.target.checked)} />
                <span>
                  Li e concordo com a{' '}
                  <a href={LINK_POLITICA} target="_blank" rel="noreferrer">Política de Privacidade da Unifor</a>{' '}
                  e autorizo o tratamento dos meus dados e dos dados do aluno.
                </span>
              </label>

              <label className={`caixa-aceite ${aceitouTermos ? 'marcada' : ''}`}>
                <input type="checkbox" checked={aceitouTermos} onChange={(e) => setAceitouTermos(e.target.checked)} />
                <span>
                  Li e concordo com os{' '}
                  <a href={LINK_TERMOS} target="_blank" rel="noreferrer">Termos de Uso da Unifor</a>.
                </span>
              </label>
            </div>
          </section>

          <div className="d-flex justify-content-end mb-5">
            <button type="submit" className="botao-continuar" disabled={!podeContinuar}>
              Continuar →
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ConsentimentoInscricao;
