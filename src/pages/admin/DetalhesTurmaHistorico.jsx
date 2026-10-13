import DetalhesTurmaLayout from './DetalhesTurmaLayout';

// Acontecimentos da turma (mais recente primeiro)
const historico = [
  { data: '20/03/2026', hora: '14:32', evento: 'Rematrícula aberta', descricao: 'Período de rematrícula foi aberto para a turma atual.', responsavel: 'Administrador' },
  { data: '15/03/2026', hora: '10:21', evento: 'Atualização de calendário', descricao: 'Calendário da turma atualizado para o mês de março/2026.', responsavel: 'Administrador' },
  { data: '10/03/2026', hora: '09:15', evento: 'Novo aluno matriculado', descricao: 'Lucas Martins foi matriculado na turma.', responsavel: 'Administrador' },
  { data: '05/03/2026', hora: '15:27', evento: 'Registro de falta', descricao: 'Matheus Lima registrou 3 faltas consecutivas.', responsavel: 'Vinícius Aguiar' },
  { data: '23/02/2026', hora: '11:45', evento: 'Convocação da lista de espera', descricao: 'Isabela Teixeira foi convocada da lista de espera e matriculada.', responsavel: 'Administrador' },
  { data: '18/02/2026', hora: '08:35', evento: 'Novo aluno matriculado', descricao: 'Lucas Martins foi convocado da lista de espera e matriculado.', responsavel: 'Administrador' },
];

function DetalhesTurmaHistorico() {
  return (
    <DetalhesTurmaLayout aba="Histórico" tituloTabela="Histórico da turma" rodape="Total de 10 registros">
      <div className="rounded overflow-hidden" style={{ border: '1px solid #D1D5DB' }}>
        <table className="table table-bordered m-0" style={{ fontSize: '0.7rem' }}>
          <thead>
            <tr>
              <th className="fw-medium" style={{ backgroundColor: '#E8F0FA', color: '#1B3A6B' }}>Data</th>
              <th className="fw-medium" style={{ backgroundColor: '#E8F0FA', color: '#1B3A6B' }}>Evento</th>
              <th className="fw-medium" style={{ backgroundColor: '#E8F0FA', color: '#1B3A6B' }}>Descrição</th>
              <th className="fw-medium" style={{ backgroundColor: '#E8F0FA', color: '#1B3A6B' }}>Responsável</th>
            </tr>
          </thead>
          <tbody>
            {historico.map((registro) => (
              <tr key={registro.data + registro.evento}>
                <td style={{ whiteSpace: 'nowrap' }}>{registro.data}<br />{registro.hora}</td>
                <td>{registro.evento}</td>
                <td>{registro.descricao}</td>
                <td>{registro.responsavel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DetalhesTurmaLayout>
  );
}

export default DetalhesTurmaHistorico;
