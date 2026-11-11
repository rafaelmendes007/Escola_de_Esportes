import { useState } from 'react';
import { Carregando } from '../../components/EstadoDados';
import { useCarregar } from '../../hooks/useCarregar';
import { atualizarAluno, eventoHistorico } from '../../services/alunos';
import { listarTurmas, nomeDaTurma } from '../../services/turmas';
import { Modal } from './componentes';

// Rematrícula presencial: confirma os dados, a assinatura e a turma do próximo período
function ModalRematricular({ aberto, onFechar, aluno, onSalvo }) {
  return (
    <Modal aberto={aberto} onFechar={onFechar} largura="560px">
      {aberto && <FormularioRematricula aluno={aluno} onFechar={onFechar} onSalvo={onSalvo} />}
    </Modal>
  );
}

function FormularioRematricula({ aluno, onFechar, onSalvo }) {
  const { dados: turmas, carregando } = useCarregar(listarTurmas);
  const [turmaId, setTurmaId] = useState(aluno.turmaId || '');
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  const abertas = (turmas || []).filter((turma) => turma.status !== 'Encerrada');

  const confirmar = async (e) => {
    e.preventDefault();
    const turma = abertas.find((item) => item.id === turmaId);
    if (!turma) return;
    setSalvando(true);
    setErro('');
    try {
      const mudouDeTurma = turma.id !== aluno.turmaId;
      await atualizarAluno(
        aluno.id,
        { status: 'Ativo', turmaId: turma.id, turmaNome: nomeDaTurma(turma), modalidade: turma.modalidade },
        eventoHistorico(
          'Rematrícula confirmada',
          mudouDeTurma ? `Rematriculado na turma ${nomeDaTurma(turma)} (antes: ${aluno.turmaNome || '—'}).` : `Rematriculado na turma ${nomeDaTurma(turma)}.`,
          'Rematrícula',
        ),
      );
      onFechar();
      onSalvo();
    } catch (error) {
      console.error('Erro na rematrícula:', error);
      setErro('Não foi possível confirmar a rematrícula. Tente de novo.');
      setSalvando(false);
    }
  };

  return (
    <form onSubmit={confirmar}>
      <h2 className="fw-semibold mb-1" style={{ color: '#111827', fontSize: '1.05rem' }}>Rematricular aluno</h2>
      <p style={{ color: '#4B5563', fontSize: '0.75rem' }}>Confirme os dados e registre a matrícula presencial de <strong>{aluno.nome}</strong>.</p>

      <div className="row g-3 mb-3">
        <div className="col-12 col-sm-6">
          <label className="d-flex gap-2" style={{ fontSize: '0.75rem' }}>
            <input type="checkbox" className="form-check-input mt-0 flex-shrink-0" required />
            <span>
              <span className="fw-medium">Dados confirmados <span style={{ color: '#DC2626' }}>*</span></span>
              <span className="d-block" style={{ fontSize: '0.65rem', color: '#4B5563' }}>Os dados do aluno e do responsável foram conferidos.</span>
            </span>
          </label>
        </div>
        <div className="col-12 col-sm-6">
          <label className="d-flex gap-2" style={{ fontSize: '0.75rem' }}>
            <input type="checkbox" className="form-check-input mt-0 flex-shrink-0" required />
            <span>
              <span className="fw-medium">Assinatura presencial coletada <span style={{ color: '#DC2626' }}>*</span></span>
              <span className="d-block" style={{ fontSize: '0.65rem', color: '#4B5563' }}>A assinatura do responsável foi coletada presencialmente.</span>
            </span>
          </label>
        </div>
      </div>

      <label className="admin-rotulo" htmlFor="turma-rematricula" style={{ fontSize: '0.75rem' }}>Turma <span style={{ color: '#DC2626' }}>*</span></label>
      {carregando ? <Carregando /> : (
        <select id="turma-rematricula" className="form-select form-select-sm admin-campo mb-3" value={turmaId} onChange={(e) => setTurmaId(e.target.value)} required>
          <option value="">Selecione</option>
          {abertas.map((turma) => (
            <option key={turma.id} value={turma.id}>{nomeDaTurma(turma)} ({turma.idadeMinima} a {turma.idadeMaxima} anos)</option>
          ))}
        </select>
      )}

      <div className="d-flex gap-3 rounded p-3 mb-4" style={{ backgroundColor: '#C9DDF0' }}>
        <i className="bi bi-file-earmark fs-4" style={{ color: '#0B6BC2' }}></i>
        <div style={{ fontSize: '0.7rem', color: '#374151' }}>Os documentos já entregues continuam valendo para a nova matrícula.</div>
      </div>

      {erro && <div className="mb-2" style={{ color: '#B91C1C', fontSize: '0.8rem' }}>{erro}</div>}
      <div className="d-flex justify-content-end gap-3">
        <button type="button" className="admin-botao-contorno" onClick={onFechar} disabled={salvando}>Cancelar</button>
        <button type="submit" className="admin-botao" disabled={salvando || !turmaId}>{salvando ? 'Salvando...' : 'Confirmar matrícula'}</button>
      </div>
    </form>
  );
}

export default ModalRematricular;
