import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Peças visuais repetidas nas telas do administrador

// Cores das etiquetas de status
const coresEtiqueta = {
  verde: { cor: '#15803D', fundo: '#DCFCE7', borda: '#86EFAC' },
  vermelho: { cor: '#B91C1C', fundo: '#FCA5A5', borda: '#F87171' },
  amarelo: { cor: '#A16207', fundo: '#FEF9C3', borda: '#FDE047' },
  azul: { cor: 'var(--azul)', fundo: '#DBEAFE', borda: '#93C5FD' },
  roxo: { cor: '#7E22CE', fundo: '#F3E8FF', borda: '#D8B4FE' },
};

// Cor de cada status usado no sistema (turmas, inscrições, alunos e usuários)
const corPorStatus = {
  Ativa: 'verde',
  Ativo: 'verde',
  Normal: 'verde',
  Convocado: 'verde',
  Lotada: 'vermelho',
  Desistente: 'vermelho',
  Desligado: 'vermelho',
  Desativado: 'vermelho',
  Cancelada: 'vermelho',
  'Aguardando vaga': 'amarelo',
  Atenção: 'amarelo',
  Matriculado: 'azul',
  Encerrada: 'azul',
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
  azul: { fundo: '#C9DDF0', icone: 'var(--azul)', circulo: '#A9C9EA' },
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

// Botões de página (‹ 1 2 3 ›).
// Com "pagina" e "onMudar" quem controla é a tela; sem eles, só marca a página clicada.
export function Paginacao({ total = 1, pagina: paginaControlada, onMudar }) {
  const [paginaInterna, setPaginaInterna] = useState(1);
  const pagina = paginaControlada ?? paginaInterna;
  const mudar = (numero) => (onMudar ? onMudar(numero) : setPaginaInterna(numero));

  const estiloBotao = (ativo, desativado) => ({
    width: '24px',
    height: '24px',
    fontSize: '0.7rem',
    border: '1px solid #D1D5DB',
    borderRadius: '4px',
    color: ativo ? '#FFFFFF' : '#374151',
    backgroundColor: ativo ? 'var(--azul)' : '#FFFFFF',
    opacity: desativado ? 0.4 : 1,
  });

  return (
    <div className="d-flex gap-1">
      <button type="button" style={estiloBotao(false, pagina === 1)} disabled={pagina === 1} onClick={() => mudar(pagina - 1)} aria-label="Página anterior">
        <i className="bi bi-chevron-left"></i>
      </button>
      {Array.from({ length: total }, (_, i) => i + 1).map((numero) => (
        <button key={numero} type="button" style={estiloBotao(numero === pagina)} onClick={() => mudar(numero)} aria-current={numero === pagina ? 'page' : undefined}>
          {numero}
        </button>
      ))}
      <button type="button" style={estiloBotao(false, pagina === total)} disabled={pagina === total} onClick={() => mudar(pagina + 1)} aria-label="Próxima página">
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  );
}

// Rodapé das listagens: itens por página + paginação (recebe o objeto de usePaginacao)
export function RodapeTabela({ paginacao }) {
  const { pagina, totalPaginas, setPagina, porPagina, setPorPagina, inicio, fim, totalItens } = paginacao;

  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-auto pt-4">
      <div className="d-flex align-items-center gap-2" style={{ fontSize: '0.65rem', color: '#374151' }}>
        Itens por página
        <select
          className="form-select form-select-sm py-0"
          style={{ width: '56px', fontSize: '0.7rem' }}
          value={porPagina}
          onChange={(e) => setPorPagina(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <span>{totalItens === 0 ? 'Nenhum resultado' : `${inicio + 1}–${fim} de ${totalItens}`}</span>
      </div>
      <Paginacao total={totalPaginas} pagina={pagina} onMudar={setPagina} />
    </div>
  );
}

// Janela por cima da tela. Fecha clicando fora, no Cancelar ou com a tecla Esc.
// Ao abrir, o foco vai para o primeiro campo; Tab circula só dentro da janela; ao fechar, o foco volta.
export function Modal({ aberto, onFechar, largura = '480px', children }) {
  const caixa = useRef(null);
  const fecharRef = useRef(onFechar);
  // Sempre a função de fechar mais recente, sem reiniciar o efeito do teclado
  useEffect(() => {
    fecharRef.current = onFechar;
  }, [onFechar]);

  useEffect(() => {
    if (!aberto) return undefined;
    const focoAnterior = document.activeElement;
    const focaveis = () => caixa.current?.querySelectorAll('input, select, textarea, button, a[href]') || [];

    // Primeiro campo do formulário (ou o primeiro botão)
    const primeiro = caixa.current?.querySelector('input, select, textarea') || focaveis()[0];
    primeiro?.focus();

    const aoTeclar = (e) => {
      if (e.key === 'Escape') fecharRef.current();
      if (e.key !== 'Tab') return;
      const lista = [...focaveis()].filter((el) => !el.disabled);
      if (!lista.length) return;
      const [inicio, fim] = [lista[0], lista[lista.length - 1]];
      if (e.shiftKey && document.activeElement === inicio) { e.preventDefault(); fim.focus(); }
      else if (!e.shiftKey && document.activeElement === fim) { e.preventDefault(); inicio.focus(); }
    };
    document.addEventListener('keydown', aoTeclar);
    return () => {
      document.removeEventListener('keydown', aoTeclar);
      focoAnterior?.focus?.();
    };
  }, [aberto]);

  if (!aberto) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 1050 }}
      onClick={onFechar}
    >
      <div
        ref={caixa}
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

// Cartão com ícone redondo e título (seções das telas de detalhes)
export function CardSecao({ icone, titulo, children }) {
  return (
    <div className="painel-card p-3 h-100">
      <div className="d-flex align-items-center gap-2 mb-3">
        <span className="rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', backgroundColor: '#C9DDF0', color: '#1B3A6B' }}>
          <i className={`bi ${icone}`}></i>
        </span>
        <h2 className="fw-semibold m-0" style={{ color: '#1B3A6B', fontSize: '0.95rem' }}>{titulo}</h2>
      </div>
      {children}
    </div>
  );
}

// Linha "rótulo  valor" dos cartões; valor vazio aparece como "—"
export function LinhaInfo({ rotulo, children }) {
  return (
    <div className="row mb-1" style={{ fontSize: '0.75rem' }}>
      <div className="col-5" style={{ color: '#4B5563', fontSize: '0.7rem' }}>{rotulo}</div>
      <div className="col-7" style={{ color: '#111827' }}>{children || '—'}</div>
    </div>
  );
}

// Ícone redondo + legenda + valor do painel lateral (datas, horário, local)
export function InfoLateral({ icone, rotulo, valor }) {
  return (
    <div className="d-flex align-items-center gap-2">
      <span className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '30px', height: '30px', backgroundColor: '#C9DDF0', color: '#1B3A6B' }}>
        <i className={`bi ${icone}`}></i>
      </span>
      <div>
        <div style={{ fontSize: '0.6rem', color: '#4B5563' }}>{rotulo}</div>
        <div className="fw-medium" style={{ fontSize: '0.8rem', color: '#1B3A6B' }}>{valor}</div>
      </div>
    </div>
  );
}

// "Ver detalhes ›" das tabelas
export function LinkDetalhes({ to }) {
  return (
    <Link to={to} className="admin-link">
      Ver detalhes <i className="bi bi-chevron-right"></i>
    </Link>
  );
}

// Campo de busca com lupa dos filtros das listagens
export function CampoBusca({ rotulo, nome = 'busca', valor, onChange, placeholder = 'Buscar por nome...' }) {
  return (
    <>
      <label className="admin-rotulo" htmlFor={`filtro-${nome}`}>{rotulo}</label>
      <div className="input-group input-group-sm">
        <span className="input-group-text bg-light"><i className="bi bi-search"></i></span>
        <input id={`filtro-${nome}`} name={nome} className="form-control admin-campo bg-light" placeholder={placeholder} value={valor} onChange={onChange} />
      </div>
    </>
  );
}
