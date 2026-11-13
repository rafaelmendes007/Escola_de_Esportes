import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LayoutAdmin from '../../components/LayoutAdmin';
import { Carregando, ErroCarga, Vazio } from '../../components/EstadoDados';
import { useCarregar } from '../../hooks/useCarregar';
import { atualizarStatusInscricao, buscarInscricao, listarInscricoes } from '../../services/inscricoes';
import { matricularDaInscricao } from '../../services/alunos';
import { listarTurmas, nomeDaTurma } from '../../services/turmas';
import { calcularIdade, formatarData, formatarDataHora } from '../../utils/datas';
import { CardSecao, Etiqueta, LinhaInfo, Modal } from './componentes';
import { linkWhatsApp } from '../../utils/texto';



// Junta a resposta com o detalhe ("Outro: avó paterna", "Sim: dipirona")
const comDetalhe = (valor, detalhe) => (detalhe ? `${valor}: ${detalhe}` : valor);

const ETAPAS = ['Aguardando vaga', 'Convocado', 'Matriculado'];

// Busca a inscrição e a posição dela na fila
async function carregarInscricao(id) {
  const [inscricao, todas] = await Promise.all([buscarInscricao(id), listarInscricoes()]);
  if (!inscricao) return null;
  const naFila = todas.find((item) => item.id === id);
  return { ...inscricao, posicaoCalculada: naFila?.posicaoCalculada ?? null };
}

function DetalhesListaEspera() {
  const { inscricaoId } = useParams();
  const navigate = useNavigate();
  const { dados: inscricao, carregando, erro, recarregar } = useCarregar(() => carregarInscricao(inscricaoId), [inscricaoId]);

  const [salvando, setSalvando] = useState(false);
  const [erroAcao, setErroAcao] = useState('');
  const [confirmarCancelamento, setConfirmarCancelamento] = useState(false);
  const [modalMatricula, setModalMatricula] = useState(false);

  // Roda uma ação no banco mostrando "salvando" e o erro, se houver
  const executar = async (acao) => {
    setErroAcao('');
    setSalvando(true);
    try {
      await acao();
      recarregar();
    } catch (error) {
      console.error('Erro na ação da inscrição:', error);
      setErroAcao('Não foi possível salvar. Tente de novo.');
    } finally {
      setSalvando(false);
    }
  };

  const mudarStatus = (status) => executar(() => atualizarStatusInscricao(inscricao, status));

  if (carregando) return <LayoutAdmin titulo="Lista de espera"><Carregando /></LayoutAdmin>;
  if (erro) return <LayoutAdmin titulo="Lista de espera"><ErroCarga onTentarDeNovo={recarregar} /></LayoutAdmin>;
  if (!inscricao) {
    return (
      <LayoutAdmin titulo="Lista de espera">
        <Vazio texto="Inscrição não encontrada.">
          <Link to="/admin/lista-espera" className="admin-botao-contorno">Voltar para a lista de espera</Link>
        </Vazio>
      </LayoutAdmin>
    );
  }

  const etapaAtual = ETAPAS.indexOf(inscricao.status);
  const encerrada = inscricao.status === 'Matriculado' || inscricao.status === 'Cancelada';

  return (
    <LayoutAdmin titulo="Lista de espera">
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
        <div>
          <Link to="/admin/lista-espera" className="text-decoration-none" style={{ color: 'var(--azul)', fontSize: '0.7rem' }}>
            <i className="bi bi-arrow-left me-1"></i>Voltar para a lista de espera
          </Link>
          <h1 className="admin-titulo" style={{ fontSize: '1.5rem' }}>Detalhes da inscrição</h1>
          <div style={{ color: '#4B5563', fontSize: '0.8rem' }}>Protocolo {inscricao.protocolo}</div>
        </div>

        <div className="d-flex flex-wrap align-items-center gap-2">
          <Etiqueta texto={inscricao.status} />
          {inscricao.status === 'Aguardando vaga' && (
            <span style={{ fontSize: '0.8rem', color: '#374151' }}>Posição na fila: <strong>{inscricao.posicaoCalculada}</strong></span>
          )}
          {inscricao.status === 'Aguardando vaga' && (
            <button type="button" className="admin-botao" disabled={salvando} onClick={() => mudarStatus('Convocado')}>
              <i className="bi bi-megaphone"></i> Convocar responsável
            </button>
          )}
          {inscricao.status === 'Convocado' && (
            <button type="button" className="admin-botao-contorno" disabled={salvando} onClick={() => mudarStatus('Aguardando vaga')}>
              Voltar para a fila
            </button>
          )}
        </div>
      </div>

      {erroAcao && <div className="rounded px-3 py-2 mb-3" style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', fontSize: '0.85rem' }}>{erroAcao}</div>}

      <div className="row g-3 mb-3">
        <div className="col-12 col-lg-6">
          <CardSecao icone="bi-person" titulo="Dados do responsável">
            <LinhaInfo rotulo="Nome completo">{inscricao.nomeResponsavel}</LinhaInfo>
            <LinhaInfo rotulo="CPF">{inscricao.cpfResponsavel}</LinhaInfo>
            <LinhaInfo rotulo="Telefone (WhatsApp)">{inscricao.telefone}</LinhaInfo>
            <LinhaInfo rotulo="E-mail">{inscricao.email}</LinhaInfo>
            <LinhaInfo rotulo="Parentesco">{comDetalhe(inscricao.parentesco, inscricao.parentescoOutro)}</LinhaInfo>
            <LinhaInfo rotulo="Escolaridade">{comDetalhe(inscricao.escolaridade, inscricao.escolaridadeOutro)}</LinhaInfo>
            <LinhaInfo rotulo="Pessoas na residência">{comDetalhe(inscricao.pessoasResidencia, inscricao.pessoasResidenciaOutro)}</LinhaInfo>
            <LinhaInfo rotulo="Renda familiar">{inscricao.rendaFamiliar}</LinhaInfo>
          </CardSecao>
        </div>
        <div className="col-12 col-lg-6">
          <CardSecao icone="bi-person-vcard" titulo="Dados do aluno">
            <LinhaInfo rotulo="Nome completo">{inscricao.nomeAluno}</LinhaInfo>
            <LinhaInfo rotulo="Nascimento">{`${formatarData(inscricao.nascimento)} (${calcularIdade(inscricao.nascimento)} anos)`}</LinhaInfo>
            <LinhaInfo rotulo="Gênero">{comDetalhe(inscricao.genero, inscricao.generoOutro)}</LinhaInfo>
            <LinhaInfo rotulo="CPF ou RG">{inscricao.cpfAluno}</LinhaInfo>
            <LinhaInfo rotulo="Endereço">{inscricao.endereco}</LinhaInfo>
            <LinhaInfo rotulo="Bairro">{inscricao.bairro}</LinhaInfo>
            <LinhaInfo rotulo="Escola">{inscricao.escola && `${inscricao.escola} (${inscricao.tipoEscola})`}</LinhaInfo>
            <LinhaInfo rotulo="Série">{inscricao.serie}</LinhaInfo>
            <LinhaInfo rotulo="Altura / Peso">{[inscricao.altura, inscricao.peso].filter(Boolean).join(' / ')}</LinhaInfo>
            <LinhaInfo rotulo="Uniforme">{inscricao.tamanhoUniforme}</LinhaInfo>
          </CardSecao>
        </div>
        <div className="col-12 col-lg-6">
          <CardSecao icone="bi-heart-pulse" titulo="Saúde do aluno">
            <LinhaInfo rotulo="Plano de saúde">{comDetalhe(inscricao.planoSaude, inscricao.planoSaudeOutro)}</LinhaInfo>
            <LinhaInfo rotulo="Plano odontológico">{comDetalhe(inscricao.planoOdonto, inscricao.planoOdontoOutro)}</LinhaInfo>
            <LinhaInfo rotulo="Tipo sanguíneo">{[inscricao.tipoSanguineo, inscricao.fatorSanguineo].filter(Boolean).join(' ')}</LinhaInfo>
            <LinhaInfo rotulo="Alergia a medicamento">{comDetalhe(inscricao.alergiaMedicamento, inscricao.alergiaMedicamentoQual)}</LinhaInfo>
            <LinhaInfo rotulo="Medicamento controlado">{comDetalhe(inscricao.medicamentoControlado, inscricao.medicamentoControladoQual)}</LinhaInfo>
            <LinhaInfo rotulo="Alergia a alimento">{comDetalhe(inscricao.alergiaAlimento, inscricao.alergiaAlimentoQual)}</LinhaInfo>
            <LinhaInfo rotulo="Problema de saúde">{comDetalhe(inscricao.problemaSaude, inscricao.problemaSaudeOutro)}</LinhaInfo>
            <LinhaInfo rotulo="Deficiência">{comDetalhe(inscricao.deficiencia, inscricao.deficienciaOutro)}</LinhaInfo>
            <LinhaInfo rotulo="Atenção especial">{comDetalhe(inscricao.atencaoEspecial, inscricao.atencaoEspecialQual)}</LinhaInfo>
          </CardSecao>
        </div>
        <div className="col-12 col-lg-6 d-flex flex-column gap-3">
          <CardSecao icone="bi-telephone" titulo="Contato de emergência">
            <LinhaInfo rotulo="Nome">{inscricao.emergenciaNome}</LinhaInfo>
            <LinhaInfo rotulo="Telefone">{inscricao.emergenciaTelefone}</LinhaInfo>
            <LinhaInfo rotulo="Parentesco">{comDetalhe(inscricao.emergenciaParentesco, inscricao.emergenciaParentescoOutro)}</LinhaInfo>
          </CardSecao>
          <CardSecao icone="bi-file-earmark-text" titulo="Informações da inscrição">
            <LinhaInfo rotulo="Modalidade">{inscricao.modalidade}</LinhaInfo>
            <LinhaInfo rotulo="Data da inscrição">{formatarDataHora(inscricao.criadoEm)}</LinhaInfo>
            <LinhaInfo rotulo="Termos aceitos em">
              {inscricao.consentimento && `${formatarDataHora(inscricao.consentimento.aceitoEm)} (versão ${inscricao.consentimento.versaoTermos})`}
            </LinhaInfo>
            {/* Linha do tempo */}
            <div className="d-flex gap-3 mt-3">
              {ETAPAS.map((etapa, indice) => (
                <div key={etapa} className="d-flex align-items-center gap-1" style={{ fontSize: '0.7rem', color: indice <= etapaAtual ? 'var(--azul)' : '#9CA3AF' }}>
                  <i className={`bi ${indice <= etapaAtual ? 'bi-check-circle-fill' : 'bi-circle'}`}></i>{etapa}
                </div>
              ))}
            </div>
          </CardSecao>
        </div>
      </div>

      {/* Ações */}
      <div className="d-flex flex-wrap justify-content-between gap-3">
        {!encerrada ? (
          <button
            type="button"
            className="btn d-flex align-items-center gap-2"
            style={{ border: '1px solid #F87171', color: '#DC2626', backgroundColor: '#FFFFFF', fontSize: '0.8rem' }}
            onClick={() => setConfirmarCancelamento(true)}
            disabled={salvando}
          >
            <i className="bi bi-trash"></i> Cancelar inscrição
          </button>
        ) : <span></span>}
        <div className="d-flex gap-3">
          {inscricao.telefone && (
            <a href={linkWhatsApp(inscricao.telefone)} target="_blank" rel="noreferrer" className="admin-botao" style={{ backgroundColor: '#4CD964' }}>
              <i className="bi bi-whatsapp"></i> Abrir WhatsApp
            </a>
          )}
          {inscricao.status === 'Matriculado' && inscricao.alunoId && (
            <Link to={`/admin/alunos/${inscricao.alunoId}`} className="admin-botao">Ver aluno</Link>
          )}
          {!encerrada && (
            <button type="button" className="admin-botao" disabled={salvando} onClick={() => setModalMatricula(true)}>
              <i className="bi bi-check-lg"></i> Finalizar matrícula
            </button>
          )}
        </div>
      </div>

      {/* Confirmação do cancelamento */}
      <Modal aberto={confirmarCancelamento} onFechar={() => setConfirmarCancelamento(false)} largura="420px">
        <h2 className="fw-semibold mb-2" style={{ fontSize: '1.05rem' }}>Cancelar inscrição?</h2>
        <p style={{ fontSize: '0.85rem', color: '#4B5563' }}>
          A inscrição de <strong>{inscricao.nomeAluno}</strong> sai da lista de espera. O responsável verá o status "Cancelada" na consulta.
        </p>
        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="admin-botao-contorno" onClick={() => setConfirmarCancelamento(false)}>Voltar</button>
          <button
            type="button"
            className="admin-botao"
            style={{ backgroundColor: '#DC2626' }}
            onClick={() => { setConfirmarCancelamento(false); mudarStatus('Cancelada'); }}
          >
            Cancelar inscrição
          </button>
        </div>
      </Modal>

      <ModalMatricula
        aberto={modalMatricula}
        onFechar={() => setModalMatricula(false)}
        inscricao={inscricao}
        onMatriculado={(alunoId) => navigate(`/admin/alunos/${alunoId}`)}
      />
    </LayoutAdmin>
  );
}

// Escolha da turma para matricular o aluno
function ModalMatricula({ aberto, onFechar, inscricao, onMatriculado }) {
  const { dados: turmas, carregando } = useCarregar(() => (aberto ? listarTurmas() : Promise.resolve(null)), [aberto]);
  const [turmaId, setTurmaId] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  const daModalidade = (turmas || []).filter((turma) => turma.modalidade === inscricao.modalidade && turma.status !== 'Encerrada');
  const opcoes = daModalidade.length ? daModalidade : (turmas || []).filter((turma) => turma.status !== 'Encerrada');

  const confirmar = async () => {
    const turma = opcoes.find((item) => item.id === turmaId);
    if (!turma) return;
    setSalvando(true);
    setErro('');
    try {
      const alunoId = await matricularDaInscricao(inscricao, turma);
      onMatriculado(alunoId);
    } catch (error) {
      console.error('Erro ao matricular:', error);
      setErro('Não foi possível matricular. Tente de novo.');
      setSalvando(false);
    }
  };

  return (
    <Modal aberto={aberto} onFechar={onFechar} largura="460px">
      <h2 className="fw-semibold mb-1" style={{ fontSize: '1.05rem' }}>Finalizar matrícula</h2>
      <p style={{ fontSize: '0.8rem', color: '#4B5563' }}>
        Escolha a turma de <strong>{inscricao.nomeAluno}</strong> ({inscricao.modalidade}).
      </p>

      {carregando && <Carregando />}
      {turmas && opcoes.length === 0 && (
        <Vazio texto="Nenhuma turma cadastrada ainda.">
          <Link to="/admin/turmas" className="admin-botao-contorno">Cadastrar turma</Link>
        </Vazio>
      )}
      {opcoes.length > 0 && (
        <>
          {!daModalidade.length && (
            <div className="mb-2" style={{ fontSize: '0.75rem', color: '#A16207' }}>
              Não há turma de {inscricao.modalidade}. Mostrando todas as turmas.
            </div>
          )}
          <select className="form-select form-select-sm admin-campo mb-3" value={turmaId} onChange={(e) => setTurmaId(e.target.value)}>
            <option value="">Selecione a turma</option>
            {opcoes.map((turma) => (
              <option key={turma.id} value={turma.id}>{nomeDaTurma(turma)} ({turma.idadeMinima} a {turma.idadeMaxima} anos)</option>
            ))}
          </select>
        </>
      )}

      {erro && <div className="mb-2" style={{ color: '#B91C1C', fontSize: '0.8rem' }}>{erro}</div>}
      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="admin-botao-contorno" onClick={onFechar} disabled={salvando}>Cancelar</button>
        <button type="button" className="admin-botao" onClick={confirmar} disabled={!turmaId || salvando}>
          {salvando ? 'Matriculando...' : 'Confirmar matrícula'}
        </button>
      </div>
    </Modal>
  );
}

export default DetalhesListaEspera;
