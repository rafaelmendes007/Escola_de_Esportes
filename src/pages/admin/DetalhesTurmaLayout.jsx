import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LayoutAdmin from '../../components/LayoutAdmin';
import { AZUL_TITULO } from '../../components/cores';
import { CardIndicador, Etiqueta, Informacao, Paginacao } from './componentes';
import ModalNovaTurma from './ModalNovaTurma';
import { buscarPorId, detalhesTurma, turmas } from './dados';

// Bloco "ícone + legenda + valor" do cabeçalho da turma
function InfoCabecalho({ icone, rotulo, valor }) {
  return (
    <div className="d-flex align-items-center gap-2 ps-3" style={{ borderLeft: '1px solid #D1D5DB' }}>
      <i className={`bi ${icone} fs-5`} style={{ color: AZUL_TITULO }}></i>
      <div>
        <div style={{ fontSize: '0.55rem', color: '#4B5563' }}>{rotulo}</div>
        <div style={{ fontSize: '0.7rem', color: AZUL_TITULO }}>{valor}</div>
      </div>
    </div>
  );
}

// Linha do painel lateral (próxima aula, horário, local)
function InfoLateral({ icone, rotulo, valor }) {
  return (
    <div className="d-flex align-items-center gap-2">
      <span className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '30px', height: '30px', backgroundColor: '#C9DDF0', color: AZUL_TITULO }}>
        <i className={`bi ${icone}`}></i>
      </span>
      <div>
        <div style={{ fontSize: '0.6rem', color: '#4B5563' }}>{rotulo}</div>
        <div className="fw-medium" style={{ fontSize: '0.8rem', color: AZUL_TITULO }}>{valor}</div>
      </div>
    </div>
  );
}

const ABAS = [
  ['', 'Alunos matriculados'],
  ['/lista-espera', 'Lista de espera'],
  ['/historico', 'Histórico'],
];

// Estrutura comum das 3 abas de "Detalhes da turma"
function DetalhesTurmaLayout({ aba, tituloTabela, rodape, children }) {
  const { turmaId } = useParams();
  const turma = buscarPorId(turmas, turmaId);
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <LayoutAdmin titulo="Detalhes da turma">
      <div className="mb-1" style={{ fontSize: '0.7rem', color: '#4B5563' }}>
        <Link to="/admin/turmas" className="text-decoration-none" style={{ color: '#4B5563' }}>Turmas</Link> / Detalhes
      </div>
      <h1 className="admin-titulo mb-3" style={{ fontSize: '1.5rem' }}>Detalhes da turma</h1>

      {/* Cabeçalho da turma */}
      <div className="painel-card d-flex flex-wrap align-items-center gap-3 p-3 mb-3">
        <div className="d-flex align-items-center gap-3 flex-grow-1">
          <span className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '68px', height: '68px', backgroundColor: '#C9DDF0', color: AZUL_TITULO, fontSize: '1.8rem' }}>
            <i className="bi bi-people"></i>
          </span>
          <div>
            <div className="fw-semibold" style={{ color: AZUL_TITULO, fontSize: '1.1rem' }}>{turma.modalidade} – {turma.nome}</div>
            <div className="mb-1" style={{ color: '#4B5563', fontSize: '0.7rem' }}>{turma.faixaEtaria} anos</div>
            <Etiqueta texto={turma.status} />
          </div>
        </div>
        <InfoCabecalho icone="bi-person" rotulo="Professor" valor={detalhesTurma.professor} />
        <InfoCabecalho icone="bi-geo-alt" rotulo="Local" valor={detalhesTurma.local} />
        <InfoCabecalho icone="bi-calendar3" rotulo="Dias e horários" valor={<>{detalhesTurma.dias}<br />{detalhesTurma.horario}</>} />
        <InfoCabecalho icone="bi-people" rotulo="Capacidade" valor={`${turma.capacidade} alunos`} />
      </div>

      {/* Abas */}
      <nav className="d-flex gap-4 mb-3 overflow-auto" style={{ borderBottom: '1px solid #D1D5DB' }}>
        {ABAS.map(([caminho, texto]) => (
          <Link key={texto} to={`/admin/turmas/${turma.id}${caminho}`} className={`admin-aba ${aba === texto ? 'ativa' : ''}`}>
            {texto}
          </Link>
        ))}
      </nav>

      <div className="row g-3">
        <div className="col-12 col-xl-9">
          <div className="painel-card p-3 h-100 d-flex flex-column">
            <div className="row g-3 mb-3">
              <div className="col-6 col-md-3"><CardIndicador icone="bi-people" rotulo="Matriculados" valor={turma.ocupadas} cor="verde" /></div>
              <div className="col-6 col-md-3"><CardIndicador icone="bi-person" rotulo="Vagas disponíveis" valor={turma.capacidade - turma.ocupadas} cor="azul" /></div>
              <div className="col-6 col-md-3"><CardIndicador icone="bi-clock" rotulo="Lista de espera" valor={turma.listaEspera} cor="amarelo" /></div>
              <div className="col-6 col-md-3"><CardIndicador icone="bi-exclamation-triangle" rotulo="Alerta de faltas" valor={detalhesTurma.alertaFaltas} cor="vermelho" /></div>
            </div>

            <h2 className="fw-semibold mb-2" style={{ color: AZUL_TITULO, fontSize: '0.9rem' }}>{tituloTabela}</h2>
            <div className="table-responsive">{children}</div>

            {/* Rodapé com total e paginação */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 rounded px-3 py-2 mt-auto" style={{ border: '1px solid #D1D5DB', marginTop: '24px' }}>
              <span style={{ fontSize: '0.7rem', color: '#374151' }}><i className="bi bi-book me-2"></i>{rodape}</span>
              <Paginacao total={2} />
            </div>
          </div>
        </div>

        {/* Painel lateral */}
        <div className="col-12 col-xl-3">
          <div className="painel-card p-3 h-100 d-flex flex-column gap-2">
            <h2 className="fw-semibold mb-1" style={{ color: '#111827', fontSize: '0.9rem' }}>Ações da turma</h2>
            <button type="button" className="admin-botao w-100" onClick={() => setModalAberto(true)}>
              <i className="bi bi-pencil"></i> Editar turma
            </button>

            <div className="d-flex flex-column gap-3 mt-auto pt-4">
              <InfoLateral icone="bi-calendar3" rotulo="Próxima aula:" valor={detalhesTurma.proximaAula} />
              <InfoLateral icone="bi-clock" rotulo="Horário:" valor={detalhesTurma.horario} />
              <InfoLateral icone="bi-geo-alt" rotulo="Local:" valor={detalhesTurma.local} />
              <Informacao>Alunos com 3 faltas seguidas não justificadas devem ser acompanhados pela Administração/Estagiário.</Informacao>
            </div>
          </div>
        </div>
      </div>

      <ModalNovaTurma aberto={modalAberto} onFechar={() => setModalAberto(false)} editar />
    </LayoutAdmin>
  );
}

export default DetalhesTurmaLayout;
