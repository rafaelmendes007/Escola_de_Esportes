import { useState } from 'react';
import { Vazio } from '../../components/EstadoDados';
import { justificarFalta } from '../../services/frequencias';
import { diaDaSemana, formatarData } from '../../utils/datas';
import { CardIndicador } from './componentes';
import DetalhesAlunoLayout from './DetalhesAlunoLayout';
import ModalJustificar from './ModalJustificar';

// Aparência de cada situação no histórico
const situacoes = {
  Ausente: { icone: 'bi-x-circle-fill', cor: '#DC2626' },
  Presente: { icone: 'bi-check-circle-fill', cor: '#16A34A' },
  Justificado: { icone: 'bi-file-earmark-text', cor: '#0B6BC2' },
};

function DetalhesAlunoFrequencia() {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <DetalhesAlunoLayout
      aba="Frequência"
      acoes={({ whatsapp, abrirDesligamento, aluno }) => [
        whatsapp && { texto: 'Abrir WhatsApp', icone: 'bi-whatsapp', estilo: 'whatsapp', href: whatsapp },
        { texto: 'Registrar justificativa', icone: 'bi-file-earmark-text', estilo: 'primario', onClick: () => setModalAberto(true) },
        aluno.status === 'Ativo' && { texto: 'Desligar aluno', icone: 'bi-trash', estilo: 'perigo', onClick: abrirDesligamento },
      ]}
      informacao="Apenas Administrador/Estagiário pode justificar faltas. O professor registra só presente ou ausente."
    >
      {({ aluno, frequencia, recarregar }) => {
        const faltasSemJustificativa = frequencia.aulas.filter((aula) => aula.situacao === 'Ausente').map((aula) => aula.data);

        return (
          <div className="painel-card p-3">
            <div className="row g-3 mb-3">
              <div className="col-6 col-md-3"><CardIndicador icone="bi-calendar3" rotulo="Presenças" valor={frequencia.presencas} cor="verde" /></div>
              <div className="col-6 col-md-3"><CardIndicador icone="bi-file-earmark-text" rotulo="Faltas justificadas" valor={frequencia.justificadas} cor="azul" /></div>
              <div className="col-6 col-md-3"><CardIndicador icone="bi-x-lg" rotulo="Faltas não justificadas" valor={frequencia.ausencias} cor="vermelho" /></div>
              <div className="col-6 col-md-3"><CardIndicador icone="bi-exclamation-triangle" rotulo="Faltas seguidas sem justificativa" valor={`${frequencia.faltasSeguidas}/3`} cor="amarelo" /></div>
            </div>

            {frequencia.faltasSeguidas >= 3 && (
              <div className="d-flex align-items-center gap-2 rounded px-3 py-2 mb-3" style={{ backgroundColor: '#FECACA', color: '#B91C1C', fontSize: '0.75rem' }}>
                <i className="bi bi-exclamation-triangle"></i>
                {aluno.nome} atingiu {frequencia.faltasSeguidas} faltas seguidas sem justificativa. Contate o responsável.
              </div>
            )}

            <h2 className="fw-semibold mb-2" style={{ color: '#1B3A6B', fontSize: '0.9rem' }}>
              Histórico de frequência {frequencia.percentual !== null && <span style={{ fontWeight: 400 }}>· {frequencia.percentual}% de frequência</span>}
            </h2>
            {frequencia.aulas.length === 0 ? (
              <Vazio texto="Nenhuma chamada registrada para este aluno ainda." />
            ) : (
              <div className="table-responsive rounded" style={{ border: '1px solid #D1D5DB' }}>
                <table className="table table-bordered m-0" style={{ fontSize: '0.75rem' }}>
                  <thead>
                    <tr>
                      {['Data', 'Situação', 'Justificativa'].map((titulo) => (
                        <th key={titulo} className="fw-medium" style={{ backgroundColor: '#E8F0FA' }}>{titulo}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {frequencia.aulas.map((aula) => (
                      <tr key={aula.data}>
                        <td>{formatarData(aula.data)} ({diaDaSemana(aula.data).slice(0, 3)})</td>
                        <td style={{ color: situacoes[aula.situacao].cor }}>
                          <i className={`bi ${situacoes[aula.situacao].icone} me-1`}></i>{aula.situacao}
                        </td>
                        <td>{aula.justificativa || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <ModalJustificar
              aberto={modalAberto}
              onFechar={() => setModalAberto(false)}
              aluno={aluno.nome}
              faltas={faltasSemJustificativa}
              onSalvar={async (data, texto) => {
                await justificarFalta(aluno.turmaId, data, aluno.id, texto);
                recarregar();
              }}
            />
          </div>
        );
      }}
    </DetalhesAlunoLayout>
  );
}

export default DetalhesAlunoFrequencia;
