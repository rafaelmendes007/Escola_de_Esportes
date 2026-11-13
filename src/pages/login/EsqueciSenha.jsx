import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';
import HeaderPublico from '../../components/HeaderPublico';
import imagemApito from '../../assets/apito.png';
import background_login from '../../assets/background_login.png';

// Cor principal do protótipo
const AZUL = 'var(--azul)';
const AZUL_CLARO = '#DCE8FA';

function EsqueciSenha() {
  // Estados
  const [etapa, setEtapa] = useState(1); // 1: digitar o e-mail | 2: e-mail enviado
  const [email, setEmail] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  // Etapa 1: Enviar email de recuperação
  const handleEnviarEmail = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      // O e-mail traz um link para uma página do Firebase onde a pessoa cria a nova senha.
      // Depois de trocar, o botão "Continuar" dessa página volta para o login do app.
      await sendPasswordResetEmail(auth, email, { url: `${window.location.origin}/login` });
      setEtapa(2);
    } catch (error) {
      let mensagemErro = 'Erro ao enviar email. Tente novamente.';

      if (error.code === 'auth/user-not-found') {
        mensagemErro = 'Email não encontrado no sistema.';
      } else if (error.code === 'auth/invalid-email') {
        mensagemErro = 'Email inválido.';
      } else if (error.code === 'auth/too-many-requests') {
        mensagemErro = 'Muitas tentativas. Tente novamente mais tarde.';
      }

      setErro(mensagemErro);
      console.error('Erro ao enviar email:', error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        backgroundImage: `url(${background_login})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <HeaderPublico />

      <style>{`
        @media (min-width: 992px) {
          .esqueci-texto { margin-left: clamp(2rem, 9vw, 10rem); }
        }

        .mensagem-erro {
          color: #DC2626;
          font-size: 0.85rem;
          background-color: #FEE2E2;
          border: 1px solid #FCA5A5;
          padding: 0.75rem;
          border-radius: 6px;
          margin-bottom: 1rem;
        }

        .botao-carregando {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .campo-obrigatorio {
          color: #DC2626;
          margin-left: 2px;
        }
      `}</style>

      <div
        className="container-fluid flex-grow-1 d-flex flex-column align-items-center d-lg-grid py-5 px-3 px-lg-5"
        style={{ gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)' }}
      >

        <div className="d-none d-lg-block"></div>

        {/* Card Principal */}
        <div className="mb-5 mb-lg-0" style={{ width: '460px', maxWidth: '100%' }}>
          <div
            className="card border-0 w-100"
            style={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
          >
            <div className="card-body px-4 px-sm-5 py-5 text-center">

              {/* Ícone */}
              <div className="mb-2 d-flex justify-content-center">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '80px', height: '80px', backgroundColor: AZUL_CLARO, color: '#1B2A6B' }}
                >
                  <i className={`bi ${etapa === 1 ? 'bi-envelope' : 'bi-envelope-check'} fs-2`}></i>
                </div>
              </div>

              <h4 className="fw-semibold mb-2" style={{ color: '#1F2A44' }}>
                {etapa === 1 ? 'Recuperar Senha' : 'Verifique seu e-mail'}
              </h4>
              <p className="small mb-4" style={{ color: '#6B7280', fontSize: '0.85rem' }}>
                {etapa === 1
                  ? 'Digite seu e-mail para receber um link de recuperação de senha.'
                  : 'Se o e-mail estiver cadastrado, você vai receber um link para criar uma nova senha.'}
              </p>

              {/* Mensagem de Erro */}
              {erro && (
                <div className="mensagem-erro">
                  {erro}
                </div>
              )}

              {/* ETAPA 1: Email */}
              {etapa === 1 && (
                <form className="text-start" onSubmit={handleEnviarEmail}>
                  <div className="mb-3">
                    <label className="form-label small fw-medium" style={{ color: '#374151' }}>
                      E-mail <span className="campo-obrigatorio">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0" style={{ color: '#6B7280' }}>
                        <i className="bi bi-envelope"></i>
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control border-start-0 ps-0"
                        placeholder="Ex.: colaborador@unifor.br"
                        style={{ fontSize: '0.85rem' }}
                        disabled={carregando}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`btn w-100 py-2 fw-semibold text-white border-0 ${carregando ? 'botao-carregando' : ''}`}
                    style={{ backgroundColor: AZUL, borderRadius: '6px' }}
                    disabled={carregando}
                  >
                    {carregando ? 'Enviando...' : 'Enviar link'}
                  </button>

                  <div className="d-flex align-items-center my-3">
                    <hr className="flex-grow-1 m-0" style={{ opacity: 0.15 }} />
                    <span className="mx-3 small" style={{ color: '#6B7280', fontSize: '0.75rem' }}>ou</span>
                    <hr className="flex-grow-1 m-0" style={{ opacity: 0.15 }} />
                  </div>

                  <Link
                    to="/login"
                    className="btn w-100 py-2 fw-semibold"
                    style={{
                      color: AZUL,
                      backgroundColor: '#F3F7FD',
                      border: '1px solid #B9CDEA',
                      borderRadius: '6px',
                    }}
                  >
                    Voltar para Login
                  </Link>
                </form>
              )}

              {/* ETAPA 2: E-mail enviado */}
              {etapa === 2 && (
                <div className="text-start">
                  <div className="rounded p-3 mb-3" style={{ backgroundColor: '#F3F7FD', border: '1px solid #B9CDEA', fontSize: '0.85rem', color: '#374151' }}>
                    <p className="mb-2">Enviamos o link para <strong>{email}</strong>.</p>
                    <ol className="mb-0 ps-3">
                      <li>Abra o e-mail (confira também a caixa de spam).</li>
                      <li>Clique no link e crie a nova senha.</li>
                      <li>Volte aqui e entre com a senha nova.</li>
                    </ol>
                  </div>

                  <Link
                    to="/login"
                    className="btn w-100 py-2 fw-semibold text-white border-0"
                    style={{ backgroundColor: AZUL, borderRadius: '6px' }}
                  >
                    Voltar para Login
                  </Link>

                  <div className="text-center mt-3">
                    <button
                      type="button"
                      onClick={() => setEtapa(1)}
                      className="btn btn-link text-decoration-none fw-medium p-0"
                      style={{ color: AZUL, fontSize: '0.8rem' }}
                    >
                      Não recebeu? Enviar de novo
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Coluna da direita: Frase e Ilustração */}
        <div className="d-flex justify-content-center justify-content-lg-start">
          <div className="esqueci-texto d-inline-block text-start">
            <h1
              className="fw-semibold"
              style={{ color: AZUL, fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: '1.2', letterSpacing: '-0.5px', marginLeft: '4rem' }}
            >
              Esporte<br />
              que forma<br />
              para a vida
            </h1>

            <div className="mt-5 text-center">
              <img src={imagemApito} alt="Apito" className="img-fluid" style={{ maxHeight: '150px', marginLeft: '3rem' }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default EsqueciSenha;