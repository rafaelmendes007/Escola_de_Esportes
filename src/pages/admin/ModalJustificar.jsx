import { useState } from 'react';
import { Modal } from './componentes';

// Justificativa de falta com observação e anexo (Frequência e Detalhes do aluno)
function ModalJustificar({ aberto, onFechar }) {
  const [arquivo, setArquivo] = useState(null);
  const [arrastando, setArrastando] = useState(false);

  const handleSalvar = (e) => {
    e.preventDefault();
    // Aqui você faria a chamada da API para salvar a justificativa
    setArquivo(null);
    onFechar();
  };

  return (
    <Modal aberto={aberto} onFechar={onFechar} largura="440px">
      <form onSubmit={handleSalvar}>
        <h2 className="fw-semibold mb-1" style={{ color: '#1B3A6B', fontSize: '1.4rem' }}>Justificar falta</h2>
        <p style={{ color: '#4B5563', fontSize: '0.75rem' }}>Justifique a falta do aluno.</p>

        <label className="admin-rotulo" htmlFor="observacoes" style={{ fontSize: '0.75rem', color: '#4B5563' }}>Observações:</label>
        <textarea id="observacoes" className="form-control mb-3" rows="4" required></textarea>

        {/* Área para arrastar ou escolher o arquivo */}
        <label
          className="d-block text-center rounded p-3 mb-4"
          style={{ border: '2px dashed #93C5E8', backgroundColor: arrastando ? '#E0EEFA' : '#F3F8FD', cursor: 'pointer' }}
          onDragOver={(e) => { e.preventDefault(); setArrastando(true); }}
          onDragLeave={() => setArrastando(false)}
          onDrop={(e) => { e.preventDefault(); setArrastando(false); setArquivo(e.dataTransfer.files[0]); }}
        >
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="d-none" onChange={(e) => setArquivo(e.target.files[0])} />
          <i className="bi bi-cloud-arrow-up fs-4" style={{ color: '#0B6BC2' }}></i>
          <div style={{ fontSize: '0.85rem', color: '#374151' }}>
            {arquivo ? arquivo.name : <>Arraste aqui ou <span className="fw-semibold" style={{ color: '#0B6BC2' }}>clique para anexar</span></>}
          </div>
          <div style={{ fontSize: '0.7rem', color: '#6B7280' }}>PDF, JPG ou PNG · até 5 MB</div>
        </label>

        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="admin-botao-contorno" onClick={onFechar}>Cancelar</button>
          <button type="submit" className="admin-botao"><i className="bi bi-floppy"></i> Salvar</button>
        </div>
      </form>
    </Modal>
  );
}

export default ModalJustificar;
