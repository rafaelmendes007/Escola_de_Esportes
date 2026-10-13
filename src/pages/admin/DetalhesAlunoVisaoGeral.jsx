import { useParams } from 'react-router-dom';
import { AZUL_TITULO } from '../../components/cores';
import DetalhesAlunoLayout from './DetalhesAlunoLayout';
import { Etiqueta } from './componentes';
import { alunos, buscarPorId, detalhesAluno, linkWhatsApp } from './dados';

// Cartão com ícone redondo e título
function CardSecao({ icone, titulo, children }) {
  return (
    <div className="painel-card p-3 h-100">
      <div className="d-flex align-items-center gap-2 mb-3">
        <span className="rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', backgroundColor: '#C9DDF0', color: AZUL_TITULO }}>
          <i className={`bi ${icone}`}></i>
        </span>
        <h2 className="fw-semibold m-0" style={{ color: AZUL_TITULO, fontSize: '0.95rem' }}>{titulo}</h2>
      </div>
      {children}
    </div>
  );
}

// Linha "rótulo  valor" dos cartões
function Linha({ rotulo, children }) {
  return (
    <div className="row mb-1" style={{ fontSize: '0.75rem' }}>
      <div className="col-5" style={{ color: '#4B5563', fontSize: '0.65rem' }}>{rotulo}</div>
      <div className="col-7" style={{ color: AZUL_TITULO }}>{children}</div>
    </div>
  );
}

function DetalhesAlunoVisaoGeral() {
  const { alunoId } = useParams();
  const aluno = buscarPorId(alunos, alunoId);

  return (
    <DetalhesAlunoLayout
      aba="Visão Geral"
      acoes={[
        { texto: 'Abrir WhatsApp', icone: 'bi-whatsapp', estilo: 'whatsapp', href: linkWhatsApp(detalhesAluno.telefoneResponsavel) },
        { texto: 'Editar dados', icone: 'bi-pencil', estilo: 'primario' },
        { texto: 'Registrar observação', icone: 'bi-file-earmark-text', estilo: 'secundario' },
        { texto: 'Desligar aluno', icone: 'bi-trash', estilo: 'perigo' },
      ]}
      datas={[['Cadastrado em:', detalhesAluno.cadastradoEm], ['Última atualização:', detalhesAluno.atualizadoEm]]}
      informacao="Mantenha os dados do aluno sempre atualizados para facilitar o contato com a família."
    >
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <CardSecao icone="bi-person" titulo="Dados do aluno">
            <div className="row g-2" style={{ fontSize: '0.75rem' }}>
              <div className="col-6">
                <div style={{ color: '#4B5563', fontSize: '0.6rem' }}>Nome completo</div>
                <div style={{ color: AZUL_TITULO }}>{aluno.nome}</div>
              </div>
              <div className="col-6">
                <div style={{ color: '#4B5563', fontSize: '0.6rem' }}>Status</div>
                <Etiqueta texto={aluno.status} />
              </div>
              <div className="col-6">
                <div style={{ color: '#4B5563', fontSize: '0.6rem' }}>Data de nascimento</div>
                <div style={{ color: AZUL_TITULO }}>{detalhesAluno.dataNascimento}</div>
              </div>
              <div className="col-6">
                <div style={{ color: '#4B5563', fontSize: '0.6rem' }}>Idade</div>
                <div style={{ color: AZUL_TITULO }}>{aluno.idade} anos</div>
              </div>
            </div>
          </CardSecao>
        </div>

        <div className="col-12 col-md-6">
          <CardSecao icone="bi-person" titulo="Responsável">
            <Linha rotulo="Nome do responsável">Carlos Antônio</Linha>
            <Linha rotulo="Telefone">(85) 91234-5678</Linha>
            <Linha rotulo="WhatsApp">
              <i className="bi bi-whatsapp me-1" style={{ color: '#22C55E' }}></i>(85) 91234-5678
            </Linha>
            <Linha rotulo="Endereço">Rua das Flores, 123 Eusébio - CE</Linha>
          </CardSecao>
        </div>

        <div className="col-12 col-md-6">
          <CardSecao icone="bi-people" titulo="Informações da turma">
            <Linha rotulo="Modalidade">{aluno.modalidade}</Linha>
            <Linha rotulo="Turma">{aluno.turma}</Linha>
            <Linha rotulo="Professor(a)">Claudia</Linha>
            <Linha rotulo="Dias e horários">Segunda e quarta, 17h às 18h</Linha>
            <Linha rotulo="Local">Ginásio principal - Unifor</Linha>
          </CardSecao>
        </div>

        <div className="col-12 col-md-6">
          <CardSecao icone="bi-bar-chart-fill" titulo="Situação no projeto">
            <Linha rotulo="Data de matrícula">{aluno.dataMatricula}</Linha>
            <Linha rotulo="Tempo no projeto">1 ano e 7 meses</Linha>
            <Linha rotulo="Situação"><Etiqueta texto={aluno.status} /></Linha>
          </CardSecao>
        </div>

        <div className="col-12">
          <CardSecao icone="bi-file-earmark-text" titulo="Observações">
            <div className="rounded px-3 py-2" style={{ border: '1px solid #D1D5DB', fontSize: '0.75rem', color: '#111827' }}>
              Aluna apresenta bom desempenho e ótima participação nas atividades.
            </div>
          </CardSecao>
        </div>
      </div>
    </DetalhesAlunoLayout>
  );
}

export default DetalhesAlunoVisaoGeral;
