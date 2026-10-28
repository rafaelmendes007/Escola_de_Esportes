// Peças visuais repetidas nas telas do administrador

// Cores das etiquetas de status
const coresEtiqueta = {
  verde: { cor: '#15803D', fundo: '#DCFCE7', borda: '#86EFAC' },
  vermelho: { cor: '#B91C1C', fundo: '#FCA5A5', borda: '#F87171' },
  amarelo: { cor: '#A16207', fundo: '#FEF9C3', borda: '#FDE047' },
  azul: { cor: '#0B6BC2', fundo: '#DBEAFE', borda: '#93C5FD' },
  roxo: { cor: '#7E22CE', fundo: '#F3E8FF', borda: '#D8B4FE' },
};

const corPorStatus = {
  Ativa: 'verde',
  Ativo: 'verde',
  Normal: 'verde',
  Convocado: 'verde',
  Lotada: 'vermelho',
  Desistente: 'vermelho',
  'Aguardando vaga': 'amarelo',
  Atenção: 'amarelo',
};

export function Etiqueta({ texto, cor }) {
  const estilo = coresEtiqueta[cor || corPorStatus[texto] || 'azul'];
  return (
    <span
      className="d-inline-block rounded px-2"
      style={{
        color: estilo.cor,
        backgroundColor: estilo.fundo,
        border: `1px solid ${estilo.borda}`,
        fontSize: '0.65rem',
        paddingTop: '1px',
        paddingBottom: '1px',
        whiteSpace: 'nowrap',
      }}
    >
      {texto}
    </span>
  );
}

// Cores pastel dos cartões de indicador
const coresIndicador = {
  azul: { fundo: '#C9DDF0', icone: '#0B6BC2', circulo: '#A9C9EA' },
  verde: { fundo: '#D7F5D7', icone: '#16A34A', circulo: '#B6EBB6' },
  amarelo: { fundo: '#FBF6C4', icone: '#CA8A04', circulo: '#F5EB8C' },
  vermelho: { fundo: '#F8D0D0', icone: '#DC2626', circulo: '#F4A9A9' },
};

// Cartão colorido com ícone, legenda e número (ex.: "Matriculados 24")
export function CardIndicador({ icone, rotulo, valor, cor }) {
  const estilo = coresIndicador[cor];
  return (
    <div className="d-flex align-items-start gap-2 rounded h-100 px-3 py-2" style={{ backgroundColor: estilo.fundo }}>
      <span
        className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0 mt-1"
        style={{ width: '26px', height: '26px', backgroundColor: estilo.circulo, color: estilo.icone, fontSize: '0.8rem' }}
      >
        <i className={`bi ${icone}`}></i>
      </span>
      <div>
        <div style={{ color: '#374151', fontSize: '0.65rem', lineHeight: 1.2 }}>{rotulo}</div>
        <div className="fw-bold" style={{ color: '#111827', fontSize: '1.5rem', lineHeight: 1.2 }}>{valor}</div>
      </div>
    </div>
  );
}

// Título e subtítulo da página, com espaço à direita para botões
export function CabecalhoPagina({ titulo, subtitulo, children }) {
  return (
    <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
      <div>
        <h1 className="admin-titulo">{titulo}</h1>
        {subtitulo && <p className="admin-subtitulo">{subtitulo}</p>}
      </div>
      {children}
    </div>
  );
}

// Botões de página (‹ 1 2 3 4 ›)
export function Paginacao({ total = 1, pagina = 1, onMudar: setPagina = () => {} }) {
  const estiloBotao = (ativo) => ({
    width: '24px',
    height: '24px',
    fontSize: '0.7rem',
    border: '1px solid #D1D5DB',
    borderRadius: '4px',
    color: ativo ? '#FFFFFF' : '#374151',
    backgroundColor: ativo ? '#0B6BC2' : '#FFFFFF',
  });

  return (
    <div className="d-flex gap-1">
      <button type="button" style={estiloBotao(false)} onClick={() => setPagina(Math.max(1, pagina - 1))} aria-label="Página anterior">
        <i className="bi bi-chevron-left"></i>
      </button>
      {Array.from({ length: total }, (_, i) => i + 1).map((numero) => (
        <button key={numero} type="button" style={estiloBotao(numero === pagina)} onClick={() => setPagina(numero)}>
          {numero}
        </button>
      ))}
      <button type="button" style={estiloBotao(false)} onClick={() => setPagina(Math.min(total, pagina + 1))} aria-label="Próxima página">
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  );
}

// Rodapé das listagens: itens por página + paginação (dados vêm do usePaginacao)
export function RodapeTabela({ pagina, totalPaginas, porPagina, mudarPagina, mudarPorPagina }) {
  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-auto pt-4">
      <div className="d-flex align-items-center gap-2" style={{ fontSize: '0.65rem', color: '#374151' }}>
        Itens por página
        <select
          className="form-select form-select-sm py-0"
          style={{ width: '56px', fontSize: '0.7rem' }}
          value={porPagina}
          onChange={(e) => mudarPorPagina(Number(e.target.value))}
        >
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>
      </div>
      <Paginacao total={totalPaginas} pagina={pagina} onMudar={mudarPagina} />
    </div>
  );
}

// Janela por cima da tela (fecha clicando fora ou no Cancelar)
export function Modal({ aberto, onFechar, largura = '480px', children }) {
  if (!aberto) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 1050 }}
      onClick={onFechar}
    >
      <div
        className="bg-white rounded-3 shadow p-4 w-100"
        style={{ maxWidth: largura, maxHeight: '100%', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
}

// Caixa azul clara com ícone de informação
export function Informacao({ children }) {
  return (
    <div className="d-flex gap-2 rounded p-2" style={{ backgroundColor: '#C9DDF0', color: '#1F2937', fontSize: '0.7rem' }}>
      <i className="bi bi-info-circle"></i>
      <span>{children}</span>
    </div>
  );
}
