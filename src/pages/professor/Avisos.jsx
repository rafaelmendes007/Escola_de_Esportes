import { useState } from 'react';
import LayoutProfessor from '../../components/LayoutProfessor';
import { TEXTO, CINZA_TEXTO, AZUL, AZUL_CLARO, BORDA, VERMELHO } from '../../components/cores';
import { avisos, avisoNovo, idsAvisosLidos, marcarAvisosComoLidos } from './dados';

function Avisos() {
  // 'todos' ou 'naoLidos'
  const [filtro, setFiltro] = useState('todos');
  // Ids dos avisos que o professor já visualizou
  const [lidos, setLidos] = useState(idsAvisosLidos);

  const naoLidos = avisos.filter((aviso) => avisoNovo(aviso, lidos));
  const avisosVisiveis = filtro === 'todos' ? avisos : naoLidos;

  const marcarComoLidos = (ids) => setLidos(marcarAvisosComoLidos(ids));

  // Estilo do botão de filtro (selecionado ou não)
  const estiloFiltro = (ativo) => ({
    fontSize: '0.75rem',
    color: ativo ? AZUL : TEXTO,
    backgroundColor: ativo ? AZUL_CLARO : '#FFFFFF',
    border: `1px solid ${ativo ? AZUL : BORDA}`,
  });

  return (
    <LayoutProfessor avisosLidos={lidos} onAvisosLidos={setLidos}>
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-3">
        <div>
          <h1 className="painel-titulo">Avisos</h1>
          <p className="painel-subtitulo">Comunicados enviados pela administração da Escola de Esporte.</p>
        </div>

        <div className="d-flex flex-wrap gap-2">
          {naoLidos.length > 0 && (
            <button
              type="button"
              className="btn btn-sm rounded-pill"
              style={{ fontSize: '0.75rem', color: AZUL, border: 'none' }}
              onClick={() => marcarComoLidos(naoLidos.map((aviso) => aviso.id))}
            >
              <i className="bi bi-check2-all me-1"></i>Marcar todos como lidos
            </button>
          )}
          <button type="button" className="btn btn-sm rounded-pill" style={estiloFiltro(filtro === 'todos')} onClick={() => setFiltro('todos')}>
            {filtro === 'todos' && <i className="bi bi-check-circle-fill me-1"></i>}Todos
          </button>
          <button type="button" className="btn btn-sm rounded-pill" style={estiloFiltro(filtro === 'naoLidos')} onClick={() => setFiltro('naoLidos')}>
            {filtro === 'naoLidos' && <i className="bi bi-check-circle-fill me-1"></i>}Não lidos ({naoLidos.length})
          </button>
        </div>
      </div>

      <div className="d-flex flex-column gap-2">
        {avisosVisiveis.map((aviso) => {
          const novo = avisoNovo(aviso, lidos);
          return (
            <div
              key={aviso.id}
              className="painel-card d-flex gap-3 px-3 py-3"
              style={{ backgroundColor: novo ? '#F5F8FD' : '#FFFFFF' }}
            >
              {/* Ícone de alto-falante */}
              <div
                className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: '32px', height: '32px', backgroundColor: novo ? AZUL_CLARO : '#F3F4F6', color: novo ? AZUL : CINZA_TEXTO }}
              >
                <i className="bi bi-volume-up"></i>
              </div>

              <div className="flex-grow-1">
                <div className="d-flex flex-wrap justify-content-between gap-2">
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-semibold" style={{ color: TEXTO, fontSize: '0.85rem' }}>{aviso.titulo}</span>
                    {novo && (
                      <span className="rounded px-2 text-white" style={{ backgroundColor: VERMELHO, fontSize: '0.6rem', paddingTop: '2px', paddingBottom: '2px' }}>
                        Novo
                      </span>
                    )}
                  </div>
                  <span style={{ color: CINZA_TEXTO, fontSize: '0.7rem' }}>{aviso.dataHora}</span>
                </div>

                <p className="mb-2 mt-1" style={{ color: TEXTO, fontSize: '0.75rem' }}>{aviso.descricao}</p>

                <div className="d-flex flex-wrap align-items-center gap-2" style={{ fontSize: '0.65rem' }}>
                  <span style={{ color: CINZA_TEXTO }}>Enviado por Administração</span>
                  <span className="rounded px-2 py-1" style={{ backgroundColor: '#F3F4F6', color: TEXTO, fontWeight: 500 }}>{aviso.destino}</span>
                  {novo && (
                    <button
                      type="button"
                      className="btn btn-link p-0 ms-auto text-decoration-none"
                      style={{ color: AZUL, fontSize: '0.7rem' }}
                      onClick={() => marcarComoLidos([aviso.id])}
                    >
                      <i className="bi bi-check2 me-1"></i>Marcar como lido
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </LayoutProfessor>
  );
}

export default Avisos;
