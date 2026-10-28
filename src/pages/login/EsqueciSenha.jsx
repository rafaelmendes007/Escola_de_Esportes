import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail, confirmPasswordReset } from 'firebase/auth';
import { auth } from '../../config/firebase';
import HeaderPublico from '../../components/HeaderPublico';
import imagemApito from '../../assets/apito.png';
import background_login from '../../assets/background_login.png';

// Cor principal do protótipo
const AZUL = '#1E5DB5';
const AZUL_CLARO = '#DCE8FA';
const VERDE = '#10B981';

function EsqueciSenha() {
  const navigate = useNavigate();

  // Estados
  const [etapa, setEtapa] = useState(1); // 1: email | 2: código e nova senha
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [codigoResetado, setCodigoResetado] = useState('');
  const [mostraSenha, setMostraSenha] = useState(false);
  const [mostraConfirmar, setMostraConfirmar] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Validar senha forte
  const validarSenhaForte = (senha) => {
    const temMaiuscula = /[A-Z]/.test(senha);
    const temMinuscula = /[a-z]/.test(senha);
    const temNumero = /[0-9]/.test(senha);
    const temComprimentoMinimo = senha.length >= 8;

    return temMaiuscula && temMinuscula && temNumero && temComprimentoMinimo;
  };

  // Etapa 1: Enviar email de recuperação
  const handleEnviarEmail = async (e) => {
    e.preventDefault();
    setErro('');
    setMensagem('');
    setCarregando(true);

    try {
      // Enviar email de reset com Firebase
      await sendPasswordResetEmail(auth, email);

      setMensagem('Email de recuperação enviado! Verifique sua caixa de entrada ou spam.');
      
      // Avançar para etapa 2 após 2 segundos
      setTimeout(() => {
        setEtapa(2);
        setMensagem('');
      }, 2000);
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

  // Etapa 2: Resetar senha com código
  const handleResetarSenha = async (e) => {
    e.preventDefault();
    setErro('');
    setMensagem('');

    // Validações
    if (!codigoResetado.trim()) {
      setErro('Por favor, insira o código de reset.');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    if (!validarSenhaForte(novaSenha)) {
      setErro('Senha fraca. Use pelo menos 8 caracteres, maiúsculas, minúsculas e números.');
      return;
    }

    setCarregando(true);

    try {
      // Confirmar password reset com Firebase
      await confirmPasswordReset(auth, codigoResetado, novaSenha);

      setMensagem('Senha alterada com sucesso! Redirecionando...');

      // Redirecionar para login após 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      let mensagemErro = 'Erro ao resetar senha. Tente novamente.';

      if (error.code === 'auth/expired-action-code') {
        mensagemErro = 'Código de reset expirado. Solicite um novo email.';
      } else if (error.code === 'auth/invalid-action-code') {
        mensagemErro = 'Código inválido. Verifique o email recebido.';
      } else if (error.code === 'auth/weak-password') {
        mensagemErro = 'Senha muito fraca. Use uma senha mais forte.';
      }

      setErro(mensagemErro);
      console.error('Erro ao resetar senha:', error.message);
    } finally {
      setCarregando(false);
    }
  };

  // Alternar visualização de senhas
  const toggleMostraSenha = () => {
    setMostraSenha(!mostraSenha);
  };

  const toggleMostraConfirmar = () => {
    setMostraConfirmar(!mostraConfirmar);
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

        .mensagem-sucesso {
          color: #059669;
          font-size: 0.85rem;
          background-color: #ECFDF5;
          border: 1px solid #6EE7B7;
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

        .indicador-senha {
          font-size: 0.75rem;
          margin-top: 0.5rem;
          padding: 0.5rem;
          border-radius: 4px;
          background-color: #F3F4F6;
        }

        .requisito-senha {
          display: flex;
          align-items: center;
          margin: 0.25rem 0;
          font-size: 0.8rem;
        }

        .icon-requisito {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 0.5rem;
          font-size: 0.6rem;
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
                  <i className={`bi ${etapa === 1 ? 'bi-envelope' : 'bi-check-circle'} fs-2`}></i>
                </div>
              </div>

              <h4 className="fw-semibold mb-2" style={{ color: '#1F2A44' }}>
                {etapa === 1 ? 'Recuperar Senha' : 'Criar Nova Senha'}
              </h4>
              <p className="small mb-4" style={{ color: '#6B7280', fontSize: '0.85rem' }}>
                {etapa === 1
                  ? 'Digite seu email para receber um código de recuperação.'
                  : 'Insira o código recebido e crie uma nova senha.'}
              </p>

              {/* Mensagem de Erro */}
              {erro && (
                <div className="mensagem-erro">
                  {erro}
                </div>
              )}

              {/* Mensagem de Sucesso */}
              {mensagem && (
                <div className="mensagem-sucesso">
                  {mensagem}
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
                    {carregando ? 'Enviando...' : 'Enviar Código'}
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

              {/* ETAPA 2: Código e Nova Senha */}
              {etapa === 2 && (
                <form className="text-start" onSubmit={handleResetarSenha}>

                  {/* Campo de Código */}
                  <div className="mb-3">
                    <label className="form-label small fw-medium" style={{ color: '#374151' }}>
                      Código de Reset <span className="campo-obrigatorio">*</span>
                    </label>
                    <p className="small" style={{ color: '#6B7280', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                      Verifique o email enviado para <strong>{email}</strong>
                    </p>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0" style={{ color: '#6B7280' }}>
                        <i className="bi bi-key"></i>
                      </span>
                      <input
                        type="text"
                        value={codigoResetado}
                        onChange={(e) => setCodigoResetado(e.target.value)}
                        className="form-control border-start-0 ps-0"
                        placeholder="Cole o código aqui"
                        style={{ fontSize: '0.85rem' }}
                        disabled={carregando}
                        required
                      />
                    </div>
                  </div>

                  {/* Campo de Nova Senha */}
                  <div className="mb-3">
                    <label className="form-label small fw-medium" style={{ color: '#374151' }}>
                      Nova Senha <span className="campo-obrigatorio">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0" style={{ color: '#6B7280' }}>
                        <i className="bi bi-lock"></i>
                      </span>
                      <input
                        type={mostraSenha ? 'text' : 'password'}
                        value={novaSenha}
                        onChange={(e) => setNovaSenha(e.target.value)}
                        className="form-control border-start-0 border-end-0 ps-0"
                        placeholder="Mínimo 8 caracteres"
                        style={{ fontSize: '0.85rem' }}
                        disabled={carregando}
                        required
                      />
                      <span
                        className="input-group-text bg-white border-start-0"
                        style={{ cursor: 'pointer', color: '#6B7280' }}
                        onClick={toggleMostraSenha}
                      >
                        <i className={`bi ${mostraSenha ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                      </span>
                    </div>
                    
                    {/* Indicador de força da senha */}
                    {novaSenha && (
                      <div className="indicador-senha">
                        <div className="requisito-senha">
                          <span className="icon-requisito" style={{ backgroundColor: novaSenha.length >= 8 ? VERDE : '#D1D5DB', color: 'white' }}>
                            {novaSenha.length >= 8 ? '✓' : '✗'}
                          </span>
                          <span style={{ color: novaSenha.length >= 8 ? VERDE : '#6B7280' }}>Mínimo 8 caracteres</span>
                        </div>
                        <div className="requisito-senha">
                          <span className="icon-requisito" style={{ backgroundColor: /[A-Z]/.test(novaSenha) ? VERDE : '#D1D5DB', color: 'white' }}>
                            {/[A-Z]/.test(novaSenha) ? '✓' : '✗'}
                          </span>
                          <span style={{ color: /[A-Z]/.test(novaSenha) ? VERDE : '#6B7280' }}>Contém maiúscula</span>
                        </div>
                        <div className="requisito-senha">
                          <span className="icon-requisito" style={{ backgroundColor: /[a-z]/.test(novaSenha) ? VERDE : '#D1D5DB', color: 'white' }}>
                            {/[a-z]/.test(novaSenha) ? '✓' : '✗'}
                          </span>
                          <span style={{ color: /[a-z]/.test(novaSenha) ? VERDE : '#6B7280' }}>Contém minúscula</span>
                        </div>
                        <div className="requisito-senha">
                          <span className="icon-requisito" style={{ backgroundColor: /[0-9]/.test(novaSenha) ? VERDE : '#D1D5DB', color: 'white' }}>
                            {/[0-9]/.test(novaSenha) ? '✓' : '✗'}
                          </span>
                          <span style={{ color: /[0-9]/.test(novaSenha) ? VERDE : '#6B7280' }}>Contém número</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Campo de Confirmar Senha */}
                  <div className="mb-3">
                    <label className="form-label small fw-medium" style={{ color: '#374151' }}>
                      Confirmar Senha <span className="campo-obrigatorio">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0" style={{ color: '#6B7280' }}>
                        <i className="bi bi-lock-fill"></i>
                      </span>
                      <input
                        type={mostraConfirmar ? 'text' : 'password'}
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        className="form-control border-start-0 border-end-0 ps-0"
                        placeholder="Confirme sua nova senha"
                        style={{ fontSize: '0.85rem' }}
                        disabled={carregando}
                        required
                      />
                      <span
                        className="input-group-text bg-white border-start-0"
                        style={{ cursor: 'pointer', color: '#6B7280' }}
                        onClick={toggleMostraConfirmar}
                      >
                        <i className={`bi ${mostraConfirmar ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`btn w-100 py-2 fw-semibold text-white border-0 ${carregando ? 'botao-carregando' : ''}`}
                    style={{ backgroundColor: AZUL, borderRadius: '6px' }}
                    disabled={carregando || !validarSenhaForte(novaSenha)}
                  >
                    {carregando ? 'Alterando...' : 'Alterar Senha'}
                  </button>

                  <div className="text-center mt-3">
                    <button
                      type="button"
                      onClick={() => setEtapa(1)}
                      className="btn btn-link text-decoration-none fw-medium p-0"
                      style={{ color: AZUL, fontSize: '0.8rem' }}
                    >
                      Voltar
                    </button>
                  </div>
                </form>
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