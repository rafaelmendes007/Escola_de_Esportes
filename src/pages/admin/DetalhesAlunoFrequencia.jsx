import { useState } from 'react';
import { CardIndicador } from './componentes';
import DetalhesAlunoLayout from './DetalhesAlunoLayout';
import ModalJustificar from './ModalJustificar';
import { detalhesAluno, linkWhatsApp } from './dados';

// Situação de cada aula no histórico
const situacoes = {
  Ausente: { icone: 'bi-x-circle-fill', cor: '#DC2626' },
  Presente: { icone: 'bi-check-circle-fill', cor: '#16A34A' },
  Justificado: { icone: 'bi-file-earmark-text', cor: '#0B6BC2' },
};

const historico = [
  { data: '28/09/2026 (Seg)', situacao: 'Ausente', justificativa: '—', observacao: '—' },
  { data: '23/09/2026 (Qua)', situacao: 'Presente', justificativa: '—', observacao: '—' },
  { data: '21/09/2026 (Seg)', situacao: 'Justificado', justificativa: 'Atestado médico', observacao: 'Consulta médica' },
  { data: '16/09/2026 (Qua)', situacao: 'Presente', justificativa: '—', observacao: '—' },
];

function DetalhesAlunoFrequencia() {
  const [modalAberto, setModalAberto] = useState(false);
  const [mostrarAnteriores, setMostrarAnteriores] = useState(false);

  return (
    <DetalhesAlunoLayout
      aba="Frequência"
      acoes={[
        { texto: 'Abrir WhatsApp', icone: 'bi-whatsapp', estilo: 'whatsapp', href: linkWhatsApp(detalhesAluno.telefoneResponsavel) },
        { texto: 'Registrar justificativa', icone: 'bi-file-earmark-text', estilo: 'primario', onClick: () => setModalAberto(true) },
        { texto: 'Desligar aluno', icone: 'bi-trash', estilo: 'perigo' },
      ]}
      datas={[['Contatado em:', detalhesAluno.contatadoEm], ['Retorno até:', detalhesAluno.retornoAte]]}
      informacao="Apenas Administrador/Estagiário pode justificar faltas e corrigir o semestre atual."
    >
      <div className="painel-card p-3">
        <label className="admin-rotulo" style={{ fontSize: '0.7rem' }}>Semestre</label>
        <select className="form-select form-select-sm admin-campo mb-3" style={{ maxWidth: '180px' }} defaultValue="2026.2">
          <option>2026.2</option>
          <option>2026.1</option>
        </select>

        <div className="row g-3 mb-3">
          <div className="col-6 col-md-3"><CardIndicador icone="bi-calendar3" rotulo="Presenças" valor={18} cor="verde" /></div>
          <div className="col-6 col-md-3"><CardIndicador icone="bi-file-earmark-text" rotulo="Faltas justificadas" valor={1} cor="azul" /></div>
          <div className="col-6 col-md-3"><CardIndicador icone="bi-x-lg" rotulo="Faltas não justificadas" valor={2} cor="vermelho" /></div>
          <div className="col-6 col-md-3"><CardIndicador icone="bi-exclamation-triangle" rotulo="Faltas consecutivas não justificadas" valor="2/3" cor="amarelo" /></div>
        </div>

        <div className="d-flex align-items-center gap-2 rounded px-3 py-2 mb-3" style={{ backgroundColor: '#FBF2C0', color: '#A16207', fontSize: '0.7rem' }}>
          <i className="bi bi-exclamation-triangle"></i>
          Ao atingir 3/3 faltas consecutivas não justificadas, contatar responsável.
        </div>

        <h2 className="fw-semibold mb-2" style={{ color: '#1B3A6B', fontSize: '0.9rem' }}>Histórico de frequência</h2>
        <div className="table-responsive rounded mb-3" style={{ border: '1px solid #D1D5DB' }}>
          <table className="table table-bordered m-0" style={{ fontSize: '0.7rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#E8F0FA' }}>
                <th className="fw-medium" style={{ backgroundColor: 'inherit' }}>Data</th>
                <th className="fw-medium" style={{ backgroundColor: 'inherit' }}>Situação</th>
                <th className="fw-medium" style={{ backgroundColor: 'inherit' }}>Justificativa</th>
                <th className="fw-medium" style={{ backgroundColor: 'inherit' }}>Observação</th>
              </tr>
            </thead>
            <tbody>
              {historico.map((aula) => (
                <tr key={aula.data}>
                  <td>{aula.data}</td>
                  <td style={{ color: situacoes[aula.situacao].cor }}>
                    <i className={`bi ${situacoes[aula.situacao].icone} me-1`}></i>{aula.situacao}
                  </td>
                  <td>{aula.justificativa}</td>
                  <td>{aula.observacao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Semestres anteriores ficam fechados e só podem ser lidos */}
        <button
          type="button"
          className="btn btn-sm w-100 d-flex align-items-center gap-2 bg-white"
          style={{ border: '1px solid #D1D5DB', fontSize: '0.7rem' }}
          onClick={() => setMostrarAnteriores(!mostrarAnteriores)}
        >
          <i className="bi bi-book"></i> Semestres anteriores - somente leitura
          <i className={`bi bi-chevron-${mostrarAnteriores ? 'up' : 'down'} ms-auto`}></i>
        </button>
        {mostrarAnteriores && (
          <div className="p-2" style={{ fontSize: '0.7rem', color: '#4B5563' }}>
            2026.1 — 22 presenças, 1 falta justificada, 0 faltas não justificadas.
          </div>
        )}
      </div>

      <ModalJustificar aberto={modalAberto} onFechar={() => setModalAberto(false)} />
    </DetalhesAlunoLayout>
  );
}

export default DetalhesAlunoFrequencia;
