import { useState } from 'react';
import { diaDaSemana, formatarData } from '../../utils/datas';
import { Modal } from './componentes';

// Justificativa de falta (Frequência do admin e Detalhes do aluno).
// "faltas": datas ("AAAA-MM-DD") das faltas sem justificativa; "onSalvar(data, texto)" grava no banco.
function ModalJustificar({ aberto, onFechar, aluno, faltas = [], onSalvar }) {
  return (
    <Modal aberto={aberto} onFechar={onFechar} largura="440px">
      {aberto && <FormularioJustificativa aluno={aluno} faltas={faltas} onFechar={onFechar} onSalvar={onSalvar} />}
    </Modal>
  );
}

function FormularioJustificativa({ aluno, faltas, onFechar, onSalvar }) {
  const [data, setData] = useState(faltas[0] || '');
  const [texto, setTexto] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  const handleSalvar = async (e) => {
    e.preventDefault();
    setSalvando(true);
    setErro('');
    try {
      await onSalvar(data, texto.trim());
      onFechar();
    } catch (error) {
      console.error('Erro ao justificar falta:', error);
      setErro('Não foi possível salvar a justificativa. Tente de novo.');
      setSalvando(false);
    }
  };

  return (
    <form onSubmit={handleSalvar}>
      <h2 className="fw-semibold mb-1" style={{ color: '#1B3A6B', fontSize: '1.4rem' }}>Justificar falta</h2>
      <p style={{ color: '#4B5563', fontSize: '0.75rem' }}>{aluno ? `Falta de ${aluno}.` : 'Justifique a falta do aluno.'}</p>

      {faltas.length === 0 ? (
        <p style={{ fontSize: '0.85rem', color: '#374151' }}>Não há faltas sem justificativa.</p>
      ) : (
        <>
          <label className="admin-rotulo" htmlFor="data-falta" style={{ fontSize: '0.75rem', color: '#4B5563' }}>Data da falta</label>
          <select id="data-falta" className="form-select form-select-sm admin-campo mb-3" value={data} onChange={(e) => setData(e.target.value)}>
            {faltas.map((falta) => (
              <option key={falta} value={falta}>{formatarData(falta)} ({diaDaSemana(falta)})</option>
            ))}
          </select>

          <label className="admin-rotulo" htmlFor="justificativa" style={{ fontSize: '0.75rem', color: '#4B5563' }}>Justificativa</label>
          <textarea
            id="justificativa"
            className="form-control mb-3"
            rows="4"
            placeholder="Ex.: Atestado médico apresentado na secretaria."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            required
            maxLength={500}
          ></textarea>
        </>
      )}

      {erro && <div className="mb-2" style={{ color: '#B91C1C', fontSize: '0.8rem' }}>{erro}</div>}
      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="admin-botao-contorno" onClick={onFechar}>Cancelar</button>
        {faltas.length > 0 && (
          <button type="submit" className="admin-botao" disabled={salvando || !texto.trim()}>
            <i className="bi bi-floppy"></i> {salvando ? 'Salvando...' : 'Salvar'}
          </button>
        )}
      </div>
    </form>
  );
}

export default ModalJustificar;
