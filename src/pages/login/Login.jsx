import { Link } from 'react-router-dom';
import logoEscolaDeEsportes from '../../assets/Escola_de_Esportes.png';
import imagemApito from '../../assets/apito.png';
import background_login from '../../assets/background_login.png';

// Cor principal do protótipo
const AZUL = '#1E5DB5';
const AZUL_CLARO = '#DCE8FA';

function Login() {
  return (
    // Fundo da página com altura mínima de 100vh (tela inteira)
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        backgroundImage: `url(${background_login})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Cabeçalho com a Logo */}
      <header className="bg-white py-2 d-flex justify-content-center align-items-center" style={{ minHeight: '72px' }}>
        <img src={logoEscolaDeEsportes} alt="Logo da Escola de Esporte" className="img-fluid" style={{ maxHeight: '50px' }} />
        <h5 style={{ fontSize: '1.25rem', fontWeight: '600', lineHeight: '1.2', marginLeft: '1.5rem', color: 'black', marginTop: '1rem' }}>
          Escola de Esportes<br/>
          UNIFOR</h5>
      </header>

      {/* Conteúdo Principal */}
      {/* Estilo só para telas grandes: afasta o texto do card (ajuste o valor de margin-left se quiser mais perto ou mais longe) */}
      <style>{`
        @media (min-width: 992px) {
          .login-texto { margin-left: clamp(2rem, 9vw, 10rem); }
        }
      `}</style>

      {/* Grid de 3 colunas iguais nas pontas: o card fica no centro exato da página (alinhado com a logo) */}
      <div
        className="container-fluid flex-grow-1 d-flex flex-column align-items-center d-lg-grid py-5 px-3 px-lg-5"
        style={{ gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)' }}
      >

        {/* Coluna da esquerda: vazia, serve só para equilibrar o grid */}
        <div className="d-none d-lg-block"></div>

        {/* Coluna central: O Cartão de Login */}
        <div className="mb-5 mb-lg-0" style={{ width: '460px', maxWidth: '100%' }}>
          <div
            className="card border-0 w-100"
            style={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
          >
            <div className="card-body px-4 px-sm-5 py-5 text-center">

              {/* Ícone de Formatura */}
              <div className="mb-2 d-flex justify-content-center">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '80px', height: '80px', backgroundColor: AZUL_CLARO, color: '#1B2A6B' }}
                >
                  <i className="bi bi-mortarboard fs-2"></i>
                </div>
              </div>

              <h4 className="fw-semibold mb-2" style={{ color: '#1F2A44' }}>Login</h4>
              <p className="small mb-4" style={{ color: '#6B7280', fontSize: '0.85rem' }}>
                Entre com suas credenciais para acessar o sistema da Escola de Esporte Unifor.
              </p>

              {/* Formulário */}
              <form className="text-start">

                {/* Campo de E-mail */}
                <div className="mb-3">
                  <label className="form-label small fw-medium" style={{ color: '#374151' }}>E-mail</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0" style={{ color: '#6B7280' }}>
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control border-start-0 ps-0"
                      placeholder="Ex.: colaborador@unifor.br"
                      style={{ fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                {/* Campo de Senha */}
                <div className="mb-3">
                  <label className="form-label small fw-medium" style={{ color: '#374151' }}>Senha</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0" style={{ color: '#6B7280' }}>
                      <i className="bi bi-lock"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control border-start-0 border-end-0 ps-0"
                      placeholder="Sua senha"
                      style={{ fontSize: '0.85rem' }}
                    />
                    <span className="input-group-text bg-white border-start-0" style={{ cursor: 'pointer', color: '#6B7280' }}>
                      <i className="bi bi-eye"></i>
                    </span>
                  </div>
                </div>

                {/* Esqueceu a senha */}
                <div className="text-center mb-3 mt-3">
                  <a href="#" className="text-decoration-none fw-medium" style={{ color: AZUL, fontSize: '0.8rem' }}>
                    Esqueceu sua senha?
                  </a>
                </div>

                {/* Botão Entrar */}
                <button
                  type="submit"
                  className="btn w-100 py-2 fw-semibold text-white border-0"
                  style={{ backgroundColor: AZUL, borderRadius: '6px' }}
                >
                  Entrar
                </button>

                {/* Divisor "ou" */}
                <div className="d-flex align-items-center my-3">
                  <hr className="flex-grow-1 m-0" style={{ opacity: 0.15 }} />
                  <span className="mx-3 small" style={{ color: '#6B7280', fontSize: '0.75rem' }}>ou</span>
                  <hr className="flex-grow-1 m-0" style={{ opacity: 0.15 }} />
                </div>

                {/* Botão Voltar */}
                <Link
                  to="/"
                  className="btn w-100 py-2 fw-semibold"
                  style={{
                    color: AZUL,
                    backgroundColor: '#F3F7FD',
                    border: '1px solid #B9CDEA',
                    borderRadius: '6px',
                  }}
                >
                  Voltar para a página inicial
                </Link>
              </form>

            </div>
          </div>
        </div>

        {/* Coluna da direita: Frase e Ilustração */}
        <div className="d-flex justify-content-center justify-content-lg-start">

          {/* A margem (classe login-texto) fica aqui dentro, então não desloca o card */}
          <div className="login-texto d-inline-block text-start">
            <h1
              className="fw-semibold"
              style={{ color: AZUL, fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: '1.2', letterSpacing: '-0.5px', marginLeft: '4rem' }}
            >
              Esporte<br />
              que forma<br />
              para a vida
            </h1>

            {/* Apito centralizado em relação ao texto */}
            <div className="mt-5 text-center">
              <img src={imagemApito} alt="Apito" className="img-fluid" style={{ maxHeight: '150px', marginLeft: '3rem' }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;