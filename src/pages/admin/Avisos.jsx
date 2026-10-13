import { useState } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import { AZUL_ADMIN } from '../../components/cores';
import { CabecalhoPagina } from './componentes';
import { avisosEnviados } from './dados';

// Cor da etiqueta de público de cada aviso
const coresPublico = {
  'Responsáveis e Professores': { cor: '#15803D', fundo: '#DCFCE7' },
  Professores: { cor: '#0B6BC2', fundo: '#DBEAFE' },
  Responsáveis: { cor: '#A16207', fundo: '#FEF3C7' },
  Todos: { cor: '#15803D', fundo: '#DCFCE7' },
};

const formularioVazio = { titulo: '', professores: true, responsaveis: true, turma: 'Todas as turmas', mensagem: '' };

function Avisos() {
  const [avisos, setAvisos] = useState(avisosEnviados);
  const [formulario, setFormulario] = useState(formularioVazio);
  const [verTodos, setVerTodos] = useState(false);

  const alterar = (e) => setFormulario({ ...formulario, [e.target.name]: e.target.value });

  // "Todos" marca/desmarca professores e responsáveis juntos
  const todos = formulario.professores && formulario.responsaveis;
  const publico = todos ? 'Responsáveis e Professores' : formulario.professores ? 'Professores' : 'Responsáveis';

  const handleEnviar = (e) => {
    e.preventDefault();
    // Aqui você faria a chamada da API para enviar o aviso
    const agora = new Date();
    const novo = {
      id: Date.now(),
      titulo: formulario.titulo,
      descricao: formulario.mensagem,
      dataHora: `${agora.toLocaleDateString('pt-BR')} · ${agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
      publico,
      turma: formulario.turma,
    };
    setAvisos([novo, ...avisos]);
    setFormulario(formularioVazio);
  };

  const botaoPublico = (ativo) => ({
    fontSize: '0.7rem',
    border: `1px solid ${ativo ? AZUL_ADMIN : '#D1D5DB'}`,
    color: ativo ? AZUL_ADMIN : '#374151',
    backgroundColor: ativo ? '#DBEAFE' : '#FFFFFF',
  });

  return (
    <LayoutAdmin>
      <CabecalhoPagina titulo="Avisos" subtitulo="Envie comunicados para professores e responsáveis. Eles receberão os avisos no sistema." />

      <div className="row g-3 align-items-start">
        {/* Formulário de novo aviso */}
        <div className="col-12 col-lg-5">
          <form className="painel-card p-3" onSubmit={handleEnviar}>
            <h2 className="fw-semibold mb-3" style={{ color: '#111827', fontSize: '0.95rem' }}>
              <i className="bi bi-megaphone me-2" style={{ color: AZUL_ADMIN }}></i>Novo aviso
            </h2>

            <label className="admin-rotulo" htmlFor="titulo-aviso">Título</label>
            <input id="titulo-aviso" name="titulo" className="form-control form-control-sm mb-3" placeholder="Ex.: Treino cancelado por chuva" value={formulario.titulo} onChange={alterar} required />

            <span className="admin-rotulo">Enviar para</span>
            <div className="d-flex flex-wrap gap-2 mb-3">
              <button type="button" className="btn btn-sm rounded-pill" style={botaoPublico(todos)} onClick={() => setFormulario({ ...formulario, professores: true, responsaveis: true })}>
                Todos
              </button>
              <button
                type="button"
                className="btn btn-sm rounded-pill"
                style={botaoPublico(formulario.professores)}
                onClick={() => setFormulario({ ...formulario, professores: !formulario.professores || !formulario.responsaveis })}
              >
                {formulario.professores && <i className="bi bi-check-circle-fill me-1"></i>}Professores
              </button>
              <button
                type="button"
                className="btn btn-sm rounded-pill"
                style={botaoPublico(formulario.responsaveis)}
                onClick={() => setFormulario({ ...formulario, responsaveis: !formulario.responsaveis || !formulario.professores })}
              >
                {formulario.responsaveis && <i className="bi bi-check-circle-fill me-1"></i>}Responsáveis
              </button>
            </div>

            <label className="admin-rotulo" htmlFor="turma-aviso">Turma</label>
            <select id="turma-aviso" name="turma" className="form-select form-select-sm mb-3" value={formulario.turma} onChange={alterar}>
              <option>Todas as turmas</option>
              <option>Futebol – Turma F01</option>
              <option>Vôlei – Turma V001</option>
              <option>Ginástica Rítmica – Turma GR01</option>
            </select>

            <label className="admin-rotulo" htmlFor="mensagem-aviso">Mensagem</label>
            <textarea id="mensagem-aviso" name="mensagem" className="form-control form-control-sm mb-2" rows="4" placeholder="Escreva aqui o conteúdo do aviso..." value={formulario.mensagem} onChange={alterar} required></textarea>

            <label className="d-inline-block mb-3" style={{ color: AZUL_ADMIN, fontSize: '0.7rem', cursor: 'pointer' }}>
              <input type="file" className="d-none" />
              <i className="bi bi-paperclip me-1"></i>Anexar arquivo (opcional)
            </label>

            <button type="submit" className="admin-botao w-100"><i className="bi bi-send"></i> Enviar aviso</button>
          </form>
        </div>

        {/* Avisos já enviados */}
        <div className="col-12 col-lg-7">
          <div className="painel-card p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h2 className="fw-semibold m-0" style={{ color: '#111827', fontSize: '0.95rem' }}>Avisos enviados</h2>
              <button type="button" className="btn btn-link p-0 admin-link" onClick={() => setVerTodos(!verTodos)}>
                {verTodos ? 'Ver menos' : 'Ver todos'}
              </button>
            </div>

            {(verTodos ? avisos : avisos.slice(0, 4)).map((aviso) => {
              const cores = coresPublico[aviso.publico];
              return (
                <div key={aviso.id} className="py-2" style={{ borderTop: '1px solid #E5E7EB' }}>
                  <div className="d-flex justify-content-between gap-2">
                    <span className="fw-semibold" style={{ color: '#111827', fontSize: '0.8rem' }}>{aviso.titulo}</span>
                    <span style={{ color: '#6B7280', fontSize: '0.65rem', whiteSpace: 'nowrap' }}>{aviso.dataHora}</span>
                  </div>
                  <p className="mb-1" style={{ color: '#374151', fontSize: '0.72rem' }}>{aviso.descricao}</p>
                  <div className="d-flex gap-2" style={{ fontSize: '0.6rem' }}>
                    <span className="rounded-pill px-2" style={{ color: cores.cor, backgroundColor: cores.fundo }}>{aviso.publico}</span>
                    <span className="rounded-pill px-2" style={{ color: '#374151', backgroundColor: '#F3F4F6' }}>{aviso.turma}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default Avisos;
