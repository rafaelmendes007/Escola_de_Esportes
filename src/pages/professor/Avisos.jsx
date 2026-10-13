import { useState } from 'react';
import LayoutProfessor from '../../components/LayoutProfessor';
import { TEXTO, CINZA_TEXTO, AZUL, AZUL_CLARO, BORDA, VERMELHO } from '../../components/cores';
import { avisos } from './dados';

function Avisos() {
  // 'todos' ou 'naoLidos'
  const [filtro, setFiltro] = useState('todos');

  const naoLidos = avisos.filter((aviso) => aviso.novo);
  const avisosVisiveis = filtro === 'todos' ? avisos : naoLidos;

  // Estilo do botão de filtro (selecionado ou não)
  const estiloFiltro = (ativo) => ({
    fontSize: '0.75rem',
    color: ativo ? AZUL : TEXTO,
    backgroundColor: ativo ? AZUL_CLARO : '#FFFFFF',
    border: `1px solid ${ativo ? AZUL : BORDA}`,
  });

  return (
    <LayoutProfessor>
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-3">
        <div>
          <h1 className="painel-titulo">Avisos</h1>
          <p className="painel-subtitulo">Comunicados enviados pela administração da Escola de Esporte.</p>
        </div>

        <div className="d-flex gap-2">
          <button type="button" className="btn btn-sm rounded-pill" style={estiloFiltro(filtro === 'todos')} onClick={() => setFiltro('todos')}>
            {filtro === 'todos' && <i className="bi bi-check-circle-fill me-1"></i>}Todos
          </button>
          <button type="button" className="btn btn-sm rounded-pill" style={estiloFiltro(filtro === 'naoLidos')} onClick={() => setFiltro('naoLidos')}>
            {filtro === 'naoLidos' && <i className="bi bi-check-circle-fill me-1"></i>}Não lidos ({naoLidos.length})
          </button>
        </div>
      </div>

      <div className="d-flex flex-column gap-2">
        {avisosVisiveis.map((aviso) => (
          <div
            key={aviso.id}
            className="painel-card d-flex gap-3 px-3 py-3"
            style={{ backgroundColor: aviso.novo ? '#F5F8FD' : '#FFFFFF' }}
          >
            {/* Ícone de alto-falante */}
            <div
              className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
              style={{ width: '32px', height: '32px', backgroundColor: aviso.novo ? AZUL_CLARO : '#F3F4F6', color: aviso.novo ? AZUL : CINZA_TEXTO }}
            >
              <i className="bi bi-volume-up"></i>
            </div>

            <div className="flex-grow-1">
              <div className="d-flex flex-wrap justify-content-between gap-2">
                <div className="d-flex align-items-center gap-2">
                  <span className="fw-semibold" style={{ color: TEXTO, fontSize: '0.85rem' }}>{aviso.titulo}</span>
                  {aviso.novo && (
                    <span className="rounded px-2 text-white" style={{ backgroundColor: VERMELHO, fontSize: '0.6rem', paddingTop: '2px', paddingBottom: '2px' }}>
                      Novo
                    </span>
                  )}
                </div>
                <span style={{ color: CINZA_TEXTO, fontSize: '0.7rem' }}>{aviso.dataHora}</span>
              </div>

              <p className="mb-2 mt-1" style={{ color: TEXTO, fontSize: '0.75rem' }}>{aviso.descricao}</p>

              <div className="d-flex align-items-center gap-2" style={{ fontSize: '0.65rem' }}>
                <span style={{ color: CINZA_TEXTO }}>Enviado por Administração</span>
                <span className="rounded px-2 py-1" style={{ backgroundColor: '#F3F4F6', color: TEXTO, fontWeight: 500 }}>{aviso.destino}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </LayoutProfessor>
  );
}

export default Avisos;
