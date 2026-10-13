import { useState } from 'react';
import { Modal } from './componentes';

// Rematrícula presencial do aluno (aberta em Detalhes do aluno > Documentos)
function ModalRematricular({ aberto, onFechar, aluno }) {
  const [mudarModalidade, setMudarModalidade] = useState('nao');

  const handleConfirmar = (e) => {
    e.preventDefault();
    // Aqui você faria a chamada da API para registrar a rematrícula
    onFechar();
  };

  return (
    <Modal aberto={aberto} onFechar={onFechar} largura="620px">
      <form onSubmit={handleConfirmar}>
        <h2 className="fw-semibold mb-1" style={{ color: '#111827', fontSize: '1.05rem' }}>Rematricular Aluno</h2>
        <p style={{ color: '#4B5563', fontSize: '0.75rem' }}>Confirme os dados e registre a matrícula presencial.</p>

        {/* Resumo do aluno */}
        <div className="row g-2 rounded p-3 mx-0 mb-3" style={{ backgroundColor: '#C9DDF0', fontSize: '0.75rem' }}>
          <div className="col-4">
            <div style={{ fontSize: '0.6rem', color: '#4B5563' }}>Aluno</div>
            <div className="fw-medium">{aluno}</div>
          </div>
          <div className="col-4">
            <div style={{ fontSize: '0.6rem', color: '#4B5563' }}>Turma atual</div>
            <div className="fw-medium">Voleibol Misto 1</div>
          </div>
          <div className="col-4">
            <div style={{ fontSize: '0.6rem', color: '#4B5563' }}>Situação de frequência</div>
            <span className="rounded px-2" style={{ backgroundColor: '#BBF7D0', color: '#15803D', fontSize: '0.65rem' }}>
              <i className="bi bi-check-circle-fill me-1"></i>Apto para rematrícula
            </span>
          </div>
        </div>

        <label className="admin-rotulo" style={{ fontSize: '0.75rem' }}>Idade atualizada <span style={{ color: '#DC2626' }}>*</span></label>
        <div className="d-flex align-items-center gap-2 mb-3">
          <input type="number" min="1" className="form-control form-control-sm admin-campo" style={{ width: '120px' }} defaultValue="13" required />
          <span style={{ fontSize: '0.7rem', color: '#4B5563' }}>Anos</span>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-12 col-sm-6">
            <label className="d-flex gap-2" style={{ fontSize: '0.75rem' }}>
              <input type="checkbox" className="form-check-input mt-0 flex-shrink-0" required />
              <span>
                <span className="fw-medium">Dados confirmados <span style={{ color: '#DC2626' }}>*</span></span>
                <span className="d-block" style={{ fontSize: '0.65rem', color: '#4B5563' }}>Confirme que os dados do aluno e responsável foram conferidos.</span>
              </span>
            </label>
          </div>
          <div className="col-12 col-sm-6">
            <label className="d-flex gap-2" style={{ fontSize: '0.75rem' }}>
              <input type="checkbox" className="form-check-input mt-0 flex-shrink-0" required />
              <span>
                <span className="fw-medium">Assinatura presencial coletada <span style={{ color: '#DC2626' }}>*</span></span>
                <span className="d-block" style={{ fontSize: '0.65rem', color: '#4B5563' }}>Declare que a assinatura do responsável foi coletada presencialmente.</span>
              </span>
            </label>
          </div>
        </div>

        <div className="admin-rotulo" style={{ fontSize: '0.75rem' }}>Solicitou mudança de modalidade? <span style={{ color: '#DC2626' }}>*</span></div>
        <div className="d-flex gap-4 mb-3" style={{ fontSize: '0.75rem' }}>
          <label className="d-flex align-items-center gap-1">
            <input type="radio" name="mudar" className="form-check-input mt-0" checked={mudarModalidade === 'nao'} onChange={() => setMudarModalidade('nao')} /> Não
          </label>
          <label className="d-flex align-items-center gap-1">
            <input type="radio" name="mudar" className="form-check-input mt-0" checked={mudarModalidade === 'sim'} onChange={() => setMudarModalidade('sim')} /> Sim
          </label>
        </div>

        {/* Só dá para escolher outra modalidade se o responsável pediu mudança */}
        <div className="row g-3 mb-3">
          <div className="col-12 col-sm-6">
            <label className="admin-rotulo" style={{ fontSize: '0.75rem' }}>Modalidade desejada</label>
            <select className="form-select form-select-sm admin-campo" defaultValue="Voleibol" disabled={mudarModalidade === 'nao'}>
              <option>Voleibol</option>
              <option>Futsal</option>
              <option>Atletismo</option>
            </select>
          </div>
          <div className="col-12 col-sm-6">
            <label className="admin-rotulo" style={{ fontSize: '0.75rem' }}>Turma desejada</label>
            <select className="form-select form-select-sm admin-campo" defaultValue="Voleibol Misto 2">
              <option>Voleibol Misto 1</option>
              <option>Voleibol Misto 2</option>
            </select>
            <div className="text-end mt-1">
              <span className="rounded px-2" style={{ backgroundColor: '#BBF7D0', color: '#15803D', fontSize: '0.65rem' }}>
                <i className="bi bi-check-circle-fill me-1"></i>Vaga disponível
              </span>
            </div>
          </div>
        </div>

        <div className="d-flex gap-3 rounded p-3 mb-4" style={{ backgroundColor: '#C9DDF0' }}>
          <i className="bi bi-file-earmark fs-4" style={{ color: '#0B6BC2' }}></i>
          <div>
            <div className="fw-semibold" style={{ color: '#0B6BC2', fontSize: '0.8rem' }}>Documentos já cadastrados reaproveitados</div>
            <div style={{ fontSize: '0.7rem', color: '#374151' }}>Os documentos do aluno permanecem válidos para a próxima matrícula.</div>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-3">
          <button type="button" className="admin-botao-contorno" onClick={onFechar}>Cancelar</button>
          <button type="submit" className="admin-botao">Confirmar matrícula</button>
        </div>
      </form>
    </Modal>
  );
}

export default ModalRematricular;
