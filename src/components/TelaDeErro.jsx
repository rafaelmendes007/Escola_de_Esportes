import { Component } from 'react';

// Tela mostrada quando algo dá muito errado (no lugar da tela em branco)
export function TelaDeErro({ titulo, mensagem, children }) {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-4" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#F7F8FA' }}>
      <div className="bg-white rounded-3 p-4 text-center" style={{ maxWidth: '480px', border: '1px solid #E5E7EB' }} role="alert">
        <i className="bi bi-exclamation-triangle d-block mb-2" style={{ fontSize: '2.5rem', color: '#DC2626' }}></i>
        <h1 className="fw-semibold mb-2" style={{ fontSize: '1.3rem', color: '#1F2A44' }}>{titulo}</h1>
        <p style={{ color: '#4B5563', fontSize: '0.9rem' }}>{mensagem}</p>
        {children}
      </div>
    </div>
  );
}

// Captura erros de qualquer tela e mostra a TelaDeErro com opção de recarregar
export class LimiteDeErro extends Component {
  constructor(props) {
    super(props);
    this.state = { temErro: false };
  }

  static getDerivedStateFromError() {
    return { temErro: true };
  }

  componentDidCatch(erro, info) {
    console.error('Erro na tela:', erro, info.componentStack);
  }

  render() {
    if (!this.state.temErro) return this.props.children;
    return (
      <TelaDeErro titulo="Algo deu errado" mensagem="Não foi possível mostrar esta página. Tente recarregar; se continuar, fale com a administração.">
        <div className="d-flex justify-content-center gap-2">
          <button type="button" className="btn btn-primary btn-sm" onClick={() => window.location.reload()}>Recarregar</button>
          <a href="/" className="btn btn-outline-secondary btn-sm">Página inicial</a>
        </div>
      </TelaDeErro>
    );
  }
}
