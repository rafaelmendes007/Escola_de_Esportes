// Mensagens padrão enquanto os dados carregam, quando dá erro ou quando a lista está vazia

export function Carregando({ texto = 'Carregando...' }) {
  return (
    <div className="d-flex align-items-center justify-content-center gap-2 py-5" style={{ color: '#6B7280', fontSize: '0.9rem' }}>
      <span className="spinner-border spinner-border-sm" role="status"></span>
      {texto}
    </div>
  );
}

export function ErroCarga({ onTentarDeNovo }) {
  return (
    <div className="text-center py-5" style={{ color: '#B91C1C', fontSize: '0.9rem' }} role="alert">
      <i className="bi bi-exclamation-circle me-2"></i>
      Não foi possível carregar os dados.
      {onTentarDeNovo && (
        <button type="button" className="btn btn-link btn-sm" onClick={onTentarDeNovo}>Tentar de novo</button>
      )}
    </div>
  );
}

export function Vazio({ texto, children }) {
  return (
    <div className="text-center py-5" style={{ color: '#6B7280', fontSize: '0.9rem' }}>
      <i className="bi bi-inbox d-block fs-3 mb-2"></i>
      {texto}
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
