import { Link } from 'react-router-dom';
import { BORDA } from '../../components/cores';
import DetalhesTurmaLayout from './DetalhesTurmaLayout';
import { linkWhatsApp } from './dados';

// Fila de espera desta turma (em ordem de posição)
const fila = [
  { id: 1, nome: 'Ana Clara', idade: 12, responsavel: 'Mariana Sousa', dataEntrada: '12/07/2026' },
  { id: 2, nome: 'Ana Maria', idade: 15, responsavel: 'Mariana Sousa', dataEntrada: '12/07/2026' },
  { id: 3, nome: 'Carlos Antônio', idade: 10, responsavel: 'Mariana Sousa', dataEntrada: '12/07/2026' },
  { id: 4, nome: 'Maria Clara', idade: 11, responsavel: 'Mariana Sousa', dataEntrada: '13/07/2026' },
  { id: 5, nome: 'João Pedro', idade: 13, responsavel: 'Mariana Sousa', dataEntrada: '13/07/2026' },
  { id: 6, nome: 'Maria Fernanda', idade: 13, responsavel: 'Mariana Sousa', dataEntrada: '14/07/2026' },
  { id: 7, nome: 'Marcos Antônio', idade: 12, responsavel: 'Mariana Sousa', dataEntrada: '14/07/2026' },
];

function DetalhesTurmaListaEspera() {
  return (
    <DetalhesTurmaLayout aba="Lista de espera" tituloTabela="Alunos na lista de espera" rodape={`Total de ${fila.length} alunos na lista de espera`}>
      <table className="admin-tabela">
        <thead>
          <tr>
            <th className="text-center">Posição</th>
            <th>Aluno</th>
            <th>Idade</th>
            <th>Responsável</th>
            <th>Data de entrada</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fila.map((inscricao, indice) => (
            <tr key={inscricao.id} style={{ borderBottom: `1px solid ${BORDA}` }}>
              <td className="text-center">{indice + 1}</td>
              <td>{inscricao.nome}</td>
              <td>{inscricao.idade}</td>
              <td>{inscricao.responsavel}</td>
              <td>{inscricao.dataEntrada}</td>
              <td className="d-flex gap-1">
                <Link to={`/admin/lista-espera/${inscricao.id}`} className="btn btn-sm py-0 px-2" style={{ fontSize: '0.65rem', color: '#0B6BC2', backgroundColor: '#DBEAFE', border: '1px solid #93C5FD' }}>
                  <i className="bi bi-eye me-1"></i>Ver
                </Link>
                <a href={linkWhatsApp('(85) 98765-4321')} target="_blank" rel="noreferrer" className="btn btn-sm py-0 px-2 text-white" style={{ fontSize: '0.65rem', backgroundColor: '#4CD964', border: 'none', whiteSpace: 'nowrap' }}>
                  <i className="bi bi-whatsapp me-1"></i>Abrir WhatsApp
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DetalhesTurmaLayout>
  );
}

export default DetalhesTurmaListaEspera;
