import { useState } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import { AZUL_ADMIN } from '../../components/cores';
import { Carregando, ErroCarga, Vazio } from '../../components/EstadoDados';
import { useAuth } from '../../context/AuthContext';
import { useCarregar } from '../../hooks/useCarregar';
import { listarAvisos, publicarAviso, publicoDoAviso } from '../../services/avisos';
import { listarTurmas, nomeDaTurma } from '../../services/turmas';
import { formatarDataHora } from '../../utils/datas';
import { CabecalhoPagina } from './componentes';

// Cor da etiqueta de público de cada aviso
const coresPublico = {
  'Responsáveis e Professores': { cor: '#15803D', fundo: '#DCFCE7' },
  Professores: { cor: '#0B6BC2', fundo: '#DBEAFE' },
  Responsáveis: { cor: '#A16207', fundo: '#FEF3C7' },
};

const formularioVazio = { titulo: '', paraProfessores: true, paraResponsaveis: true, turmaId: '', mensagem: '' };

function Avisos() {
  const { usuario } = useAuth();
  const { dados: avisos, carregando, erro, recarregar } = useCarregar(listarAvisos);
  const { dados: turmas } = useCarregar(listarTurmas);
  const [formulario, setFormulario] = useState(formularioVazio);
  const [verTodos, setVerTodos] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const alterar = (e) => setFormulario({ ...formulario, [e.target.name]: e.target.value });

  // "Todos" marca professores e responsáveis juntos; sempre fica pelo menos um marcado
  const todos = formulario.paraProfessores && formulario.paraResponsaveis;
  const alternarPublico = (campo) => {
    const outro = campo === 'paraProfessores' ? 'paraResponsaveis' : 'paraProfessores';
    if (formulario[campo] && !formulario[outro]) return;
    setFormulario({ ...formulario, [campo]: !formulario[campo] });
  };

  const handleEnviar = async (e) => {
    e.preventDefault();
    const turma = turmas?.find((item) => item.id === formulario.turmaId);
    setEnviando(true);
    setMensagem('');
    try {
      await publicarAviso({
        titulo: formulario.titulo.trim(),
        mensagem: formulario.mensagem.trim(),
        paraProfessores: formulario.paraProfessores,
        paraResponsaveis: formulario.paraResponsaveis,
        turmaId: formulario.turmaId,
        turmaNome: turma ? nomeDaTurma(turma) : 'Todas as turmas',
        autor: usuario.nome,
      });
      setFormulario(formularioVazio);
      setMensagem('Aviso enviado.');
      recarregar();
    } catch (error) {
      console.error('Erro ao enviar aviso:', error);
      setMensagem('Não foi possível enviar o aviso. Tente de novo.');
    } finally {
      setEnviando(false);
    }
  };

  const botaoPublico = (ativo) => ({
    fontSize: '0.7rem',
    border: `1px solid ${ativo ? AZUL_ADMIN : '#D1D5DB'}`,
    color: ativo ? AZUL_ADMIN : '#374151',
    backgroundColor: ativo ? '#DBEAFE' : '#FFFFFF',
  });

  const visiveis = verTodos ? avisos || [] : (avisos || []).slice(0, 5);

  return (
    <LayoutAdmin>
      <CabecalhoPagina titulo="Avisos" subtitulo="Envie comunicados para professores e responsáveis. Eles veem os avisos no sistema." />

      <div className="row g-3 align-items-start">
        {/* Formulário de novo aviso */}
        <div className="col-12 col-lg-5">
          <form className="painel-card p-3" onSubmit={handleEnviar}>
            <h2 className="fw-semibold mb-3" style={{ color: '#111827', fontSize: '0.95rem' }}>
              <i className="bi bi-megaphone me-2" style={{ color: AZUL_ADMIN }}></i>Novo aviso
            </h2>

            <label className="admin-rotulo" htmlFor="titulo-aviso">Título</label>
            <input id="titulo-aviso" name="titulo" className="form-control form-control-sm mb-3" placeholder="Ex.: Treino cancelado por chuva" value={formulario.titulo} onChange={alterar} required maxLength={120} />

            <span className="admin-rotulo">Enviar para</span>
            <div className="d-flex flex-wrap gap-2 mb-3">
              <button type="button" className="btn btn-sm rounded-pill" style={botaoPublico(todos)} onClick={() => setFormulario({ ...formulario, paraProfessores: true, paraResponsaveis: true })}>
                Todos
              </button>
              <button type="button" className="btn btn-sm rounded-pill" style={botaoPublico(formulario.paraProfessores)} onClick={() => alternarPublico('paraProfessores')}>
                {formulario.paraProfessores && <i className="bi bi-check-circle-fill me-1"></i>}Professores
              </button>
              <button type="button" className="btn btn-sm rounded-pill" style={botaoPublico(formulario.paraResponsaveis)} onClick={() => alternarPublico('paraResponsaveis')}>
                {formulario.paraResponsaveis && <i className="bi bi-check-circle-fill me-1"></i>}Responsáveis
              </button>
            </div>

            <label className="admin-rotulo" htmlFor="turma-aviso">Turma</label>
            <select id="turma-aviso" name="turmaId" className="form-select form-select-sm mb-3" value={formulario.turmaId} onChange={alterar}>
              <option value="">Todas as turmas</option>
              {(turmas || []).map((turma) => <option key={turma.id} value={turma.id}>{nomeDaTurma(turma)}</option>)}
            </select>

            <label className="admin-rotulo" htmlFor="mensagem-aviso">Mensagem</label>
            <textarea id="mensagem-aviso" name="mensagem" className="form-control form-control-sm mb-3" rows="4" placeholder="Escreva aqui o conteúdo do aviso..." value={formulario.mensagem} onChange={alterar} required maxLength={2000}></textarea>

            {mensagem && <div className="mb-2" style={{ fontSize: '0.75rem', color: mensagem.startsWith('Não') ? '#B91C1C' : '#15803D' }}>{mensagem}</div>}
            <button type="submit" className="admin-botao w-100" disabled={enviando}>
              <i className="bi bi-send"></i> {enviando ? 'Enviando...' : 'Enviar aviso'}
            </button>
          </form>
        </div>

        {/* Avisos já enviados */}
        <div className="col-12 col-lg-7">
          <div className="painel-card p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h2 className="fw-semibold m-0" style={{ color: '#111827', fontSize: '0.95rem' }}>Avisos enviados</h2>
              {avisos?.length > 5 && (
                <button type="button" className="btn btn-link p-0 admin-link" onClick={() => setVerTodos(!verTodos)}>
                  {verTodos ? 'Ver menos' : 'Ver todos'}
                </button>
              )}
            </div>

            {carregando && <Carregando />}
            {erro && <ErroCarga onTentarDeNovo={recarregar} />}
            {avisos?.length === 0 && <Vazio texto="Nenhum aviso enviado ainda." />}
            {visiveis.map((aviso) => {
              const publico = publicoDoAviso(aviso);
              const cores = coresPublico[publico];
              return (
                <div key={aviso.id} className="py-2" style={{ borderTop: '1px solid #E5E7EB' }}>
                  <div className="d-flex justify-content-between gap-2">
                    <span className="fw-semibold" style={{ color: '#111827', fontSize: '0.8rem' }}>{aviso.titulo}</span>
                    <span style={{ color: '#6B7280', fontSize: '0.65rem', whiteSpace: 'nowrap' }}>{formatarDataHora(aviso.criadoEm)}</span>
                  </div>
                  <p className="mb-1" style={{ color: '#374151', fontSize: '0.72rem', whiteSpace: 'pre-line' }}>{aviso.mensagem}</p>
                  <div className="d-flex flex-wrap gap-2" style={{ fontSize: '0.6rem' }}>
                    <span className="rounded-pill px-2" style={{ color: cores.cor, backgroundColor: cores.fundo }}>{publico}</span>
                    <span className="rounded-pill px-2" style={{ color: '#374151', backgroundColor: '#F3F4F6' }}>{aviso.turmaNome}</span>
                    {aviso.autor && <span style={{ color: '#6B7280' }}>por {aviso.autor}</span>}
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
