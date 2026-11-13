import { Link } from 'react-router-dom';
import { AZUL_TITULO, BORDA } from '../../components/cores';
import { Vazio } from '../../components/EstadoDados';
import { calcularIdade } from '../../utils/datas';
import { Etiqueta } from './componentes';
import DetalhesTurmaLayout from './DetalhesTurmaLayout';

function DetalhesTurmaAlunos() {
  return (
    <DetalhesTurmaLayout aba="Alunos matriculados">
      {({ alunos }) => (
        <>
          <h2 className="fw-semibold mb-2" style={{ color: AZUL_TITULO, fontSize: '0.9rem' }}>Alunos matriculados ({alunos.length})</h2>
          {alunos.length === 0 ? (
            <Vazio texto="Nenhum aluno matriculado nesta turma ainda. Matricule pela lista de espera." />
          ) : (
            <div className="table-responsive">
              <table className="admin-tabela">
                <thead>
                  <tr>
                    <th>Nome do aluno</th>
                    <th>Idade</th>
                    <th>Matrícula</th>
                    <th className="text-center">Faltas seguidas</th>
                    <th className="text-center">Frequência</th>
                    <th>Situação</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {alunos.map((aluno) => {
                    // 3 faltas seguidas sem justificativa pede atenção da administração
                    const atencao = aluno.frequencia.faltasSeguidas >= 3;
                    const situacao = aluno.status !== 'Ativo' ? aluno.status : atencao ? 'Atenção' : 'Ativo';
                    return (
                      <tr key={aluno.id} style={{ borderBottom: `1px solid ${BORDA}` }}>
                        <td>{aluno.nome}</td>
                        <td>{calcularIdade(aluno.nascimento) ?? '—'}</td>
                        <td>{aluno.matricula}</td>
                        <td className="text-center">{aluno.frequencia.faltasSeguidas}</td>
                        <td className="text-center">{aluno.frequencia.percentual === null ? '—' : `${aluno.frequencia.percentual}%`}</td>
                        <td><Etiqueta texto={situacao} cor={situacao === 'Ativo' ? 'verde' : 'vermelho'} /></td>
                        <td>
                          <Link to={`/admin/alunos/${aluno.id}`} className="btn btn-sm py-0 px-2" style={{ fontSize: '0.65rem', color: 'var(--azul)', backgroundColor: '#DBEAFE', border: '1px solid #93C5FD' }}>
                            <i className="bi bi-eye me-1"></i>Ver
                          </Link>
                        </td>
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

export default DetalhesTurmaAlunos;
