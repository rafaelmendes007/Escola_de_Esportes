import { AZUL_TITULO } from '../../components/cores';
import { Vazio } from '../../components/EstadoDados';
import { diaDaSemana, formatarData } from '../../utils/datas';
import DetalhesTurmaLayout from './DetalhesTurmaLayout';

// Histórico da turma: cada chamada registrada, da mais recente para a mais antiga
function DetalhesTurmaHistorico() {
  return (
    <DetalhesTurmaLayout aba="Histórico">
      {({ chamadas }) => (
        <>
          <h2 className="fw-semibold mb-2" style={{ color: AZUL_TITULO, fontSize: '0.9rem' }}>Chamadas registradas ({chamadas.length})</h2>
          {chamadas.length === 0 ? (
            <Vazio texto="Nenhuma chamada registrada ainda. O professor registra a frequência pela área do professor." />
          ) : (
            <div className="rounded overflow-hidden" style={{ border: '1px solid #D1D5DB' }}>
              <table className="table table-bordered m-0" style={{ fontSize: '0.75rem' }}>
                <thead>
                  <tr>
                    {['Data', 'Dia', 'Presentes', 'Ausentes', 'Justificados'].map((titulo) => (
                      <th key={titulo} className="fw-medium" style={{ backgroundColor: '#E8F0FA', color: '#1B3A6B' }}>{titulo}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {chamadas.map((chamada) => {
                    const registros = Object.values(chamada.registros || {});
                    const presentes = registros.filter((r) => r.presente).length;
                    const justificados = registros.filter((r) => !r.presente && r.justificativa).length;
                    return (
                      <tr key={chamada.data}>
                        <td>{formatarData(chamada.data)}</td>
                        <td>{diaDaSemana(chamada.data)}</td>
                        <td>{presentes}</td>
                        <td>{registros.length - presentes - justificados}</td>
                        <td>{justificados}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </DetalhesTurmaLayout>
  );
}

export default DetalhesTurmaHistorico;
