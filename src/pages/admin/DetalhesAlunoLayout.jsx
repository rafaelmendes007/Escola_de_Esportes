import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LayoutAdmin from '../../components/LayoutAdmin';
import { AZUL_TITULO } from '../../components/cores';
import { Carregando, ErroCarga, Vazio } from '../../components/EstadoDados';
import { useCarregar } from '../../hooks/useCarregar';
import { atualizarAluno, buscarAluno, eventoHistorico } from '../../services/alunos';
import { listarChamadasDaTurma, resumoDoAluno } from '../../services/frequencias';
import { buscarTurma } from '../../services/turmas';
import { calcularIdade, formatarData } from '../../utils/datas';
import { Etiqueta, Informacao, Modal } from './componentes';
import { linkWhatsApp } from '../../utils/texto';

// Estilos dos botões do painel "Ações e acompanhamento"
const estilosAcao = {
  whatsapp: { backgroundColor: '#4CD964', color: '#FFFFFF', border: 'none' },
  primario: { backgroundColor: 'var(--azul)', color: '#FFFFFF', border: 'none' },
  secundario: { backgroundColor: '#BFDDF3', color: 'var(--azul)', border: 'none' },
  perigo: { backgroundColor: '#FCA5A5', color: '#DC2626', border: 'none' },
  contorno: { backgroundColor: '#FFFFFF', color: 'var(--azul)', border: '1px solid var(--azul)' },
};

// Botão do painel lateral de ações
function BotaoAcao({ texto, icone, estilo, onClick, href }) {
  const props = {
    className: 'btn btn-sm w-100 d-flex align-items-center justify-content-center gap-2 py-2 fw-medium',
    style: { ...estilosAcao[estilo], fontSize: '0.8rem' },
  };
  const conteudo = (<><i className={`bi ${icone}`}></i>{texto}</>);

  if (href) {
    return <a href={href} target="_blank" rel="noreferrer" {...props}>{conteudo}</a>;
  }
  return <button type="button" onClick={onClick} {...props}>{conteudo}</button>;
}

// Linha com ícone de calendário, legenda e data
function LinhaData({ rotulo, valor }) {
  return (
    <div className="d-flex align-items-center gap-2">
      <span className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '30px', height: '30px', backgroundColor: '#C9DDF0', color: AZUL_TITULO }}>
        <i className="bi bi-calendar3"></i>
      </span>
      <div>
        <div style={{ fontSize: '0.6rem', color: '#4B5563' }}>{rotulo}</div>
        <div className="fw-medium" style={{ fontSize: '0.8rem', color: AZUL_TITULO }}>{valor}</div>
      </div>
    </div>
  );
}

const ABAS = [
  ['', 'Visão Geral'],
  ['/frequencia', 'Frequência'],
  ['/documentos', 'Documentos'],
  ['/historico', 'Histórico'],
];

// Aluno + turma + resumo de frequência
async function carregarDetalhesAluno(alunoId) {
  const aluno = await buscarAluno(alunoId);
  if (!aluno) return null;
  const [turma, chamadas] = aluno.turmaId
    ? await Promise.all([buscarTurma(aluno.turmaId), listarChamadasDaTurma(aluno.turmaId)])
    : [null, []];
  return { aluno, turma, chamadas, frequencia: resumoDoAluno(chamadas, alunoId) };
}

// Estrutura comum das 4 abas de "Detalhes do aluno".
// "acoes" e "children" são funções que recebem { aluno, turma, chamadas, frequencia, recarregar, abrirObservacao }.
function DetalhesAlunoLayout({ aba, acoes, informacao, children }) {
  const { alunoId } = useParams();
  const { dados, carregando, erro, recarregar } = useCarregar(() => carregarDetalhesAluno(alunoId), [alunoId]);
  const [modal, setModal] = useState(null); // 'observacao' | 'desligar'

  if (carregando) return <LayoutAdmin titulo="Detalhes do aluno"><Carregando /></LayoutAdmin>;
  if (erro) return <LayoutAdmin titulo="Detalhes do aluno"><ErroCarga onTentarDeNovo={recarregar} /></LayoutAdmin>;
  if (!dados) {
    return (
      <LayoutAdmin titulo="Detalhes do aluno">
        <Vazio texto="Aluno não encontrado.">
          <Link to="/admin/alunos" className="admin-botao-contorno">Voltar para alunos</Link>
        </Vazio>
      </LayoutAdmin>
    );
  }

  const { aluno } = dados;
  const iniciais = aluno.nome.split(' ').map((parte) => parte[0]).slice(0, 2).join('').toUpperCase();
  const contexto = {
    ...dados,
    recarregar,
    abrirObservacao: () => setModal('observacao'),
    abrirDesligamento: () => setModal('desligar'),
    whatsapp: aluno.telefone ? linkWhatsApp(aluno.telefone) : null,
  };

  return (
    <LayoutAdmin titulo="Detalhes do aluno">
      <div className="mb-2" style={{ fontSize: '0.7rem', color: '#4B5563' }}>
        <Link to="/admin/alunos" className="text-decoration-none" style={{ color: '#4B5563' }}>Alunos</Link> / Detalhes
      </div>

      {/* Cabeçalho com dados principais */}
      <div className="painel-card d-flex flex-wrap align-items-center gap-4 p-3 mb-3">
        <div className="d-flex align-items-center gap-3 flex-grow-1">
          <span className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0" style={{ width: '72px', height: '72px', backgroundColor: '#C4C8F5', fontSize: '1.6rem' }}>
            {iniciais}
          </span>
          <div>
            <div className="fw-semibold" style={{ color: AZUL_TITULO, fontSize: '1.3rem' }}>{aluno.nome}</div>
            <div className="mb-1" style={{ color: '#4B5563', fontSize: '0.7rem' }}>Matrícula {aluno.matricula} | {calcularIdade(aluno.nascimento)} anos</div>
            <Etiqueta texto={aluno.status} cor={aluno.status === 'Ativo' ? 'verde' : 'vermelho'} />
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 ps-md-4" style={{ borderLeft: '1px solid #D1D5DB' }}>
          <i className="bi bi-people fs-4" style={{ color: AZUL_TITULO }}></i>
          <div>
            <div style={{ fontSize: '0.6rem', color: '#4B5563' }}>Turma atual</div>
            {aluno.turmaId
              ? <Link to={`/admin/turmas/${aluno.turmaId}`} style={{ fontSize: '0.75rem', color: AZUL_TITULO }}>{aluno.turmaNome}</Link>
              : <div style={{ fontSize: '0.75rem', color: AZUL_TITULO }}>—</div>}
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 ps-md-4" style={{ borderLeft: '1px solid #D1D5DB' }}>
          <i className="bi bi-person fs-4" style={{ color: AZUL_TITULO }}></i>
          <div>
            <div style={{ fontSize: '0.6rem', color: '#4B5563' }}>Responsável</div>
            <div style={{ fontSize: '0.75rem', color: AZUL_TITULO }}>{aluno.nomeResponsavel}</div>
            {contexto.whatsapp && (
              <a href={contexto.whatsapp} target="_blank" rel="noreferrer" className="text-decoration-none" style={{ fontSize: '0.7rem', color: '#374151' }}>
                <i className="bi bi-whatsapp me-1" style={{ color: '#22C55E' }}></i>{aluno.telefone}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Abas */}
      <nav className="d-flex gap-4 mb-3 overflow-auto" style={{ borderBottom: '1px solid #D1D5DB' }}>
        {ABAS.map(([caminho, texto]) => (
          <Link key={texto} to={`/admin/alunos/${aluno.id}${caminho}`} className={`admin-aba ${aba === texto ? 'ativa' : ''}`}>
            {texto}
          </Link>
        ))}
      </nav>

      <div className="row g-3">
        <div className="col-12 col-xl-9">{children(contexto)}</div>

        {/* Painel lateral de ações */}
        <div className="col-12 col-xl-3">
          <div className="painel-card p-3 h-100 d-flex flex-column gap-2">
            <h2 className="fw-semibold mb-1" style={{ color: '#111827', fontSize: '0.9rem' }}>Ações e acompanhamento</h2>
            {acoes(contexto).filter(Boolean).map((acao) => <BotaoAcao key={acao.texto} {...acao} />)}

            <div className="d-flex flex-column gap-3 mt-auto pt-4">
              <LinhaData rotulo="Matriculado em:" valor={formatarData(aluno.dataMatricula)} />
              <LinhaData rotulo="Última atualização:" valor={formatarData(aluno.atualizadoEm || aluno.dataMatricula)} />
              <Informacao>{informacao}</Informacao>
            </div>
          </div>
        </div>
      </div>

      <ModalObservacao aberto={modal === 'observacao'} onFechar={() => setModal(null)} aluno={aluno} onSalvo={recarregar} />
      <ModalDesligar aberto={modal === 'desligar'} onFechar={() => setModal(null)} aluno={aluno} onSalvo={recarregar} />
    </LayoutAdmin>
  );
}

// Observação livre que vai para o histórico (e fica como observação atual do aluno)
function ModalObservacao({ aberto, onFechar, aluno, onSalvo }) {
  const [texto, setTexto] = useState('');
  const [salvando, setSalvando] = useState(false);

  const salvar = async (e) => {
    e.preventDefault();
    setSalvando(true);
    try {
      await atualizarAluno(aluno.id, { observacoes: texto.trim() }, eventoHistorico('Observação registrada', texto.trim(), 'Observação'));
      setTexto('');
      onFechar();
      onSalvo();
    } finally {
      setSalvando(false);
    }
  };

  return (
    <Modal aberto={aberto} onFechar={onFechar} largura="460px">
      <form onSubmit={salvar}>
        <h2 className="fw-semibold mb-1" style={{ fontSize: '1.05rem' }}>Registrar observação</h2>
        <p style={{ fontSize: '0.8rem', color: '#4B5563' }}>Contatos com a família, comportamento, desempenho ou qualquer informação importante.</p>
        <textarea className="form-control mb-3" rows="4" value={texto} onChange={(e) => setTexto(e.target.value)} required maxLength={1000}></textarea>
        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="admin-botao-contorno" onClick={onFechar}>Cancelar</button>
          <button type="submit" className="admin-botao" disabled={salvando || !texto.trim()}>{salvando ? 'Salvando...' : 'Salvar'}</button>
        </div>
      </form>
    </Modal>
  );
}

// Desligamento: o aluno sai da turma e libera a vaga
function ModalDesligar({ aberto, onFechar, aluno, onSalvo }) {
  const [motivo, setMotivo] = useState('');
  const [salvando, setSalvando] = useState(false);

  const confirmar = async (e) => {
    e.preventDefault();
    setSalvando(true);
    try {
      await atualizarAluno(
        aluno.id,
        { status: 'Desligado' },
        eventoHistorico('Aluno desligado', motivo.trim() || 'Sem motivo informado.', 'Desligamento'),
      );
      setMotivo('');
      onFechar();
      onSalvo();
    } finally {
      setSalvando(false);
    }
  };

  return (
    <Modal aberto={aberto} onFechar={onFechar} largura="440px">
      <form onSubmit={confirmar}>
        <h2 className="fw-semibold mb-1" style={{ fontSize: '1.05rem' }}>Desligar aluno?</h2>
        <p style={{ fontSize: '0.8rem', color: '#4B5563' }}>
          <strong>{aluno.nome}</strong> deixa de contar na turma e a vaga fica livre. Dá para voltar com a rematrícula.
        </p>
        <label className="admin-rotulo" htmlFor="motivo-desligamento">Motivo</label>
        <textarea id="motivo-desligamento" className="form-control mb-3" rows="3" value={motivo} onChange={(e) => setMotivo(e.target.value)} maxLength={500}></textarea>
        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="admin-botao-contorno" onClick={onFechar}>Voltar</button>
          <button type="submit" className="admin-botao" style={{ backgroundColor: '#DC2626' }} disabled={salvando}>
            {salvando ? 'Salvando...' : 'Desligar aluno'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default DetalhesAlunoLayout;
