import { useState } from 'react';
import { AZUL_TITULO } from '../../components/cores';
import { atualizarAluno, eventoHistorico } from '../../services/alunos';
import { diasEHorario } from '../../services/turmas';
import { calcularIdade, formatarData } from '../../utils/datas';
import { mascaraTelefone, telefoneValido } from '../../utils/validacao';
import DetalhesAlunoLayout from './DetalhesAlunoLayout';
import { Etiqueta, Modal } from './componentes';

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

// Linha "rótulo  valor"; campos vazios aparecem como "—"
function Linha({ rotulo, children }) {
  return (
    <div className="row mb-1" style={{ fontSize: '0.75rem' }}>
      <div className="col-5" style={{ color: '#4B5563', fontSize: '0.65rem' }}>{rotulo}</div>
      <div className="col-7" style={{ color: AZUL_TITULO }}>{children || '—'}</div>
    </div>
  );
}

const comDetalhe = (valor, detalhe) => (detalhe ? `${valor}: ${detalhe}` : valor);

// Tempo desde a matrícula ("1 ano e 3 meses", "5 meses")
function tempoNoProjeto(dataMatricula) {
  const inicio = dataMatricula?.toDate?.();
  if (!inicio) return '—';
  const meses = (new Date().getFullYear() - inicio.getFullYear()) * 12 + new Date().getMonth() - inicio.getMonth();
  if (meses < 1) return 'Menos de 1 mês';
  const anos = Math.floor(meses / 12);
  const resto = meses % 12;
  const partes = [anos && `${anos} ano${anos > 1 ? 's' : ''}`, resto && `${resto} ${resto > 1 ? 'meses' : 'mês'}`].filter(Boolean);
  return partes.join(' e ');
}

function DetalhesAlunoVisaoGeral() {
  const [editando, setEditando] = useState(false);

  return (
    <DetalhesAlunoLayout
      aba="Visão Geral"
      acoes={({ whatsapp, abrirObservacao, abrirDesligamento, aluno }) => [
        whatsapp && { texto: 'Abrir WhatsApp', icone: 'bi-whatsapp', estilo: 'whatsapp', href: whatsapp },
        { texto: 'Editar dados', icone: 'bi-pencil', estilo: 'primario', onClick: () => setEditando(true) },
        { texto: 'Registrar observação', icone: 'bi-file-earmark-text', estilo: 'secundario', onClick: abrirObservacao },
        aluno.status === 'Ativo' && { texto: 'Desligar aluno', icone: 'bi-trash', estilo: 'perigo', onClick: abrirDesligamento },
      ]}
      informacao="Mantenha os dados do aluno sempre atualizados para facilitar o contato com a família."
    >
      {({ aluno, turma, recarregar }) => (
        <>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <CardSecao icone="bi-person" titulo="Dados do aluno">
                <Linha rotulo="Nome completo">{aluno.nome}</Linha>
                <Linha rotulo="Nascimento">{`${formatarData(aluno.nascimento)} (${calcularIdade(aluno.nascimento)} anos)`}</Linha>
                <Linha rotulo="Gênero">{comDetalhe(aluno.genero, aluno.generoOutro)}</Linha>
                <Linha rotulo="CPF ou RG">{aluno.cpfAluno}</Linha>
                <Linha rotulo="Endereço">{[aluno.endereco, aluno.bairro].filter(Boolean).join(' – ')}</Linha>
                <Linha rotulo="Escola">{aluno.escola && `${aluno.escola} (${aluno.tipoEscola})`}</Linha>
                <Linha rotulo="Série">{aluno.serie}</Linha>
                <Linha rotulo="Uniforme">{aluno.tamanhoUniforme}</Linha>
              </CardSecao>
            </div>

            <div className="col-12 col-md-6">
              <CardSecao icone="bi-person" titulo="Responsável">
                <Linha rotulo="Nome">{aluno.nomeResponsavel}</Linha>
                <Linha rotulo="Parentesco">{comDetalhe(aluno.parentesco, aluno.parentescoOutro)}</Linha>
                <Linha rotulo="CPF">{aluno.cpfResponsavel}</Linha>
                <Linha rotulo="Telefone (WhatsApp)">{aluno.telefone}</Linha>
                <Linha rotulo="E-mail">{aluno.email}</Linha>
                <Linha rotulo="Emergência">{aluno.emergenciaNome && `${aluno.emergenciaNome} · ${aluno.emergenciaTelefone}`}</Linha>
              </CardSecao>
            </div>

            <div className="col-12 col-md-6">
              <CardSecao icone="bi-people" titulo="Informações da turma">
                <Linha rotulo="Turma">{aluno.turmaNome}</Linha>
                <Linha rotulo="Professor(a)">{turma?.professorNome}</Linha>
                <Linha rotulo="Dias e horários">{turma && diasEHorario(turma)}</Linha>
                <Linha rotulo="Local">{turma?.local}</Linha>
              </CardSecao>
            </div>

            <div className="col-12 col-md-6">
              <CardSecao icone="bi-heart-pulse" titulo="Saúde">
                <Linha rotulo="Plano de saúde">{comDetalhe(aluno.planoSaude, aluno.planoSaudeOutro)}</Linha>
                <Linha rotulo="Alergias">
                  {[
                    aluno.alergiaMedicamento === 'Sim' && `Medicamento: ${aluno.alergiaMedicamentoQual}`,
                    aluno.alergiaAlimento === 'Sim' && `Alimento: ${aluno.alergiaAlimentoQual}`,
                  ].filter(Boolean).join(' · ') || 'Nenhuma'}
                </Linha>
                <Linha rotulo="Medicamento controlado">{comDetalhe(aluno.medicamentoControlado, aluno.medicamentoControladoQual)}</Linha>
                <Linha rotulo="Problema de saúde">{comDetalhe(aluno.problemaSaude, aluno.problemaSaudeOutro)}</Linha>
                <Linha rotulo="Deficiência">{comDetalhe(aluno.deficiencia, aluno.deficienciaOutro)}</Linha>
                <Linha rotulo="Atenção especial">{comDetalhe(aluno.atencaoEspecial, aluno.atencaoEspecialQual)}</Linha>
              </CardSecao>
            </div>

            <div className="col-12 col-md-6">
              <CardSecao icone="bi-bar-chart-fill" titulo="Situação no projeto">
                <Linha rotulo="Data de matrícula">{formatarData(aluno.dataMatricula)}</Linha>
                <Linha rotulo="Tempo no projeto">{tempoNoProjeto(aluno.dataMatricula)}</Linha>
                <Linha rotulo="Situação"><Etiqueta texto={aluno.status} cor={aluno.status === 'Ativo' ? 'verde' : 'vermelho'} /></Linha>
              </CardSecao>
            </div>

            <div className="col-12 col-md-6">
              <CardSecao icone="bi-file-earmark-text" titulo="Observações">
                <div className="rounded px-3 py-2" style={{ border: '1px solid #D1D5DB', fontSize: '0.75rem', color: '#111827', minHeight: '48px' }}>
                  {aluno.observacoes || 'Nenhuma observação registrada.'}
                </div>
              </CardSecao>
            </div>
          </div>

          <ModalEditarAluno aberto={editando} onFechar={() => setEditando(false)} aluno={aluno} onSalvo={recarregar} />
        </>
      )}
    </DetalhesAlunoLayout>
  );
}

// Campos que o admin pode corrigir depois da matrícula
const CAMPOS_EDITAVEIS = [
  ['telefone', 'Telefone do responsável (WhatsApp)', mascaraTelefone],
  ['email', 'E-mail do responsável'],
  ['endereco', 'Endereço (rua e número)'],
  ['bairro', 'Bairro'],
  ['escola', 'Nome da escola'],
  ['serie', 'Série'],
  ['emergenciaNome', 'Contato de emergência – nome'],
  ['emergenciaTelefone', 'Contato de emergência – telefone', mascaraTelefone],
];

function ModalEditarAluno({ aberto, onFechar, aluno, onSalvo }) {
  return (
    <Modal aberto={aberto} onFechar={onFechar} largura="560px">
      {aberto && <FormularioEditarAluno aluno={aluno} onFechar={onFechar} onSalvo={onSalvo} />}
    </Modal>
  );
}

function FormularioEditarAluno({ aluno, onFechar, onSalvo }) {
  const [dados, setDados] = useState(() => Object.fromEntries(CAMPOS_EDITAVEIS.map(([campo]) => [campo, aluno[campo] || ''])));
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  const salvar = async (e) => {
    e.preventDefault();
    if (!telefoneValido(dados.telefone) || (dados.emergenciaTelefone && !telefoneValido(dados.emergenciaTelefone))) {
      return setErro('Confira os telefones (DDD + número).');
    }
    setSalvando(true);
    setErro('');
    try {
      await atualizarAluno(aluno.id, dados, eventoHistorico('Dados atualizados', 'Cadastro do aluno atualizado pela administração.', 'Cadastro'));
      onFechar();
      onSalvo();
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
      setErro('Não foi possível salvar. Tente de novo.');
      setSalvando(false);
    }
  };

  return (
    <form onSubmit={salvar}>
      <h2 className="fw-semibold mb-3" style={{ fontSize: '1.05rem' }}>Editar dados de {aluno.nome}</h2>
      <div className="row g-3">
        {CAMPOS_EDITAVEIS.map(([campo, rotulo, mascara]) => (
          <div key={campo} className="col-12 col-sm-6">
            <label className="admin-rotulo" htmlFor={`editar-${campo}`} style={{ fontSize: '0.75rem' }}>{rotulo}</label>
            <input
              id={`editar-${campo}`}
              className="form-control form-control-sm admin-campo"
              value={dados[campo]}
              onChange={(e) => setDados({ ...dados, [campo]: mascara ? mascara(e.target.value) : e.target.value })}
            />
          </div>
        ))}
      </div>
      {erro && <div className="mt-3" style={{ color: '#B91C1C', fontSize: '0.8rem' }}>{erro}</div>}
      <div className="d-flex justify-content-end gap-2 mt-4">
        <button type="button" className="admin-botao-contorno" onClick={onFechar} disabled={salvando}>Cancelar</button>
        <button type="submit" className="admin-botao" disabled={salvando}>{salvando ? 'Salvando...' : 'Salvar'}</button>
      </div>
    </form>
  );
}

export default DetalhesAlunoVisaoGeral;
