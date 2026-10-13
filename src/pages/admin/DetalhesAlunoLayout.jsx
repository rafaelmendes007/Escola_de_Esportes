import { Link, useParams } from 'react-router-dom';
import LayoutAdmin from '../../components/LayoutAdmin';
import { AZUL_TITULO } from '../../components/cores';
import { Etiqueta, Informacao } from './componentes';
import { alunos, buscarPorId, detalhesAluno, linkWhatsApp } from './dados';

// Estilos dos botões do painel "Ações e acompanhamento"
const estilosAcao = {
  whatsapp: { backgroundColor: '#4CD964', color: '#FFFFFF', border: 'none' },
  primario: { backgroundColor: '#0B6BC2', color: '#FFFFFF', border: 'none' },
  secundario: { backgroundColor: '#BFDDF3', color: '#0B6BC2', border: 'none' },
  perigo: { backgroundColor: '#FCA5A5', color: '#DC2626', border: 'none' },
  contorno: { backgroundColor: '#FFFFFF', color: '#0B6BC2', border: '1px solid #0B6BC2' },
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

// Linha com ícone de calendário, legenda e data (ex.: "Contatado em 28/09/2026")
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

// Estrutura comum das 4 abas de "Detalhes do aluno"
function DetalhesAlunoLayout({ aba, acoes, datas, informacao, children }) {
  const { alunoId } = useParams();
  const aluno = buscarPorId(alunos, alunoId);
  const iniciais = aluno.nome.split(' ').map((parte) => parte[0]).slice(0, 2).join('');

  return (
    <LayoutAdmin titulo="Detalhes do aluno">
      <div className="mb-2" style={{ fontSize: '0.7rem', color: '#4B5563' }}>
        <Link to="/admin/alunos" className="text-decoration-none" style={{ color: '#4B5563' }}>Alunos</Link> / Detalhes
      </div>

      {/* Cabeçalho com dados principais */}
      <div className="painel-card d-flex flex-wrap align-items-center gap-4 p-3 mb-3">
        <div className="d-flex align-items-center gap-3 flex-grow-1">
          <span
            className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0"
            style={{ width: '72px', height: '72px', backgroundColor: '#C4C8F5', fontSize: '1.6rem' }}
          >
            {iniciais}
          </span>
          <div>
            <div className="fw-semibold" style={{ color: AZUL_TITULO, fontSize: '1.3rem' }}>{aluno.nome}</div>
            <div className="mb-1" style={{ color: '#4B5563', fontSize: '0.7rem' }}>{aluno.matricula} | {aluno.idade} anos</div>
            <Etiqueta texto={aluno.status} />
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 ps-md-4" style={{ borderLeft: '1px solid #D1D5DB' }}>
          <i className="bi bi-people fs-4" style={{ color: AZUL_TITULO }}></i>
          <div>
            <div style={{ fontSize: '0.6rem', color: '#4B5563' }}>Turma atual</div>
            <div style={{ fontSize: '0.75rem', color: AZUL_TITULO }}>{detalhesAluno.turmaAtual}</div>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 ps-md-4" style={{ borderLeft: '1px solid #D1D5DB' }}>
          <i className="bi bi-person fs-4" style={{ color: AZUL_TITULO }}></i>
          <div>
            <div style={{ fontSize: '0.6rem', color: '#4B5563' }}>Responsável</div>
            <div style={{ fontSize: '0.75rem', color: AZUL_TITULO }}>{detalhesAluno.responsavel}</div>
            <a href={linkWhatsApp(detalhesAluno.telefoneResponsavel)} target="_blank" rel="noreferrer" className="text-decoration-none" style={{ fontSize: '0.7rem', color: '#374151' }}>
              <i className="bi bi-whatsapp me-1" style={{ color: '#22C55E' }}></i>{detalhesAluno.telefoneResponsavel}
            </a>
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
        <div className="col-12 col-xl-9">{children}</div>

        {/* Painel lateral de ações */}
        <div className="col-12 col-xl-3">
          <div className="painel-card p-3 h-100 d-flex flex-column gap-2">
            <h2 className="fw-semibold mb-1" style={{ color: '#111827', fontSize: '0.9rem' }}>Ações e acompanhamento</h2>
            {acoes.map((acao) => <BotaoAcao key={acao.texto} {...acao} />)}

            <div className="d-flex flex-column gap-3 mt-auto pt-4">
              {datas.map(([rotulo, valor]) => <LinhaData key={rotulo} rotulo={rotulo} valor={valor} />)}
              <Informacao>{informacao}</Informacao>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default DetalhesAlunoLayout;
