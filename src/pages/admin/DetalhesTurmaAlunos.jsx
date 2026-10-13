import { Link } from 'react-router-dom';
import { BORDA } from '../../components/cores';
import { Etiqueta } from './componentes';
import DetalhesTurmaLayout from './DetalhesTurmaLayout';
import { alunos } from './dados';

function DetalhesTurmaAlunos() {
  return (
    <DetalhesTurmaLayout aba="Alunos matriculados" tituloTabela="Alunos matriculados" rodape="Total de 24 alunos matriculados">
      <table className="admin-tabela">
        <thead>
          <tr>
            <th>Nome do aluno</th>
            <th>Idade</th>
            <th>Matrícula</th>
            <th className="text-center">Faltas consecutivas</th>
            <th>Situação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => {
            // 3 faltas seguidas pede atenção da administração
            const atencao = aluno.faltasConsecutivas >= 3;
            return (
              <tr key={aluno.id} style={{ borderBottom: `1px solid ${BORDA}` }}>
                <td>{aluno.nome}</td>
                <td>{aluno.idade}</td>
                <td>{aluno.matricula}</td>
                <td className="text-center">{aluno.faltasConsecutivas}</td>
                <td><Etiqueta texto={atencao ? 'Atenção' : 'Ativo'} cor={atencao ? 'vermelho' : 'verde'} /></td>
                <td>
                  <Link to={`/admin/alunos/${aluno.id}`} className="btn btn-sm py-0 px-2" style={{ fontSize: '0.65rem', color: '#0B6BC2', backgroundColor: '#DBEAFE', border: '1px solid #93C5FD' }}>
                    <i className="bi bi-eye me-1"></i>Ver
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </DetalhesTurmaLayout>
  );
}

export default DetalhesTurmaAlunos;
