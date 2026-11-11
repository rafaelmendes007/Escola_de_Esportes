import { Link } from 'react-router-dom';
import { AZUL_TITULO, BORDA } from '../../components/cores';
import { Vazio } from '../../components/EstadoDados';
import { calcularIdade, formatarData } from '../../utils/datas';
import DetalhesTurmaLayout from './DetalhesTurmaLayout';
import { linkWhatsApp } from '../../utils/texto';

// Inscrições que aguardam vaga nesta modalidade e na faixa de idade da turma, em ordem de chegada
function DetalhesTurmaListaEspera() {
  return (
    <DetalhesTurmaLayout aba="Lista de espera">
      {({ turma }) => (
        <>
          <h2 className="fw-semibold mb-2" style={{ color: AZUL_TITULO, fontSize: '0.9rem' }}>
            Alunos na lista de espera ({turma.fila.length})
          </h2>
          {turma.fila.length === 0 ? (
            <Vazio texto={`Ninguém aguardando vaga em ${turma.modalidade} para ${turma.idadeMinima} a ${turma.idadeMaxima} anos.`} />
          ) : (
            <div className="table-responsive">
              <table className="admin-tabela">
                <thead>
                  <tr>
                    <th className="text-center">Posição</th>
                    <th>Aluno</th>
                    <th>Idade</th>
                    <th>Responsável</th>
                    <th>Data de inscrição</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {turma.fila.map((inscricao, indice) => (
                    <tr key={inscricao.id} style={{ borderBottom: `1px solid ${BORDA}` }}>
                      <td className="text-center">{indice + 1}</td>
                      <td>{inscricao.nomeAluno}</td>
                      <td>{calcularIdade(inscricao.nascimento)}</td>
                      <td>{inscricao.nomeResponsavel}</td>
                      <td>{formatarData(inscricao.criadoEm)}</td>
                      <td className="d-flex gap-1">
                        <Link to={`/admin/lista-espera/${inscricao.id}`} className="btn btn-sm py-0 px-2" style={{ fontSize: '0.65rem', color: '#0B6BC2', backgroundColor: '#DBEAFE', border: '1px solid #93C5FD' }}>
                          <i className="bi bi-eye me-1"></i>Ver
                        </Link>
                        {inscricao.telefone && (
                          <a href={linkWhatsApp(inscricao.telefone)} target="_blank" rel="noreferrer" className="btn btn-sm py-0 px-2 text-white" style={{ fontSize: '0.65rem', backgroundColor: '#4CD964', border: 'none', whiteSpace: 'nowrap' }}>
                            <i className="bi bi-whatsapp me-1"></i>WhatsApp
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </DetalhesTurmaLayout>
  );
}

export default DetalhesTurmaListaEspera;
