import { Link, useParams } from 'react-router-dom';
import LayoutProfessor from '../../components/LayoutProfessor';
import { TEXTO } from '../../components/cores';
import { Carregando, ErroCarga, Vazio } from '../../components/EstadoDados';
import { useCarregar } from '../../hooks/useCarregar';
import { calcularIdade } from '../../utils/datas';
import { carregarTurmaComAlunos, iniciais } from './dadosProfessor';

function AlunosTurma() {
  const { turmaId } = useParams();
  const { dados, carregando, erro, recarregar } = useCarregar(() => carregarTurmaComAlunos(turmaId), [turmaId]);

  if (carregando) return <LayoutProfessor><Carregando /></LayoutProfessor>;
  if (erro) return <LayoutProfessor><ErroCarga onTentarDeNovo={recarregar} /></LayoutProfessor>;
  if (!dados) {
    return (
      <LayoutProfessor>
        <Vazio texto="Turma não encontrada.">
          <Link to="/professor/turmas" className="painel-botao-contorno">Voltar para minhas turmas</Link>
        </Vazio>
      </LayoutProfessor>
    );
  }

  const { turma, alunos } = dados;

  return (
    <LayoutProfessor>
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-3">
        <div>
          <Link to="/professor/turmas" className="painel-voltar">
            <i className="bi bi-arrow-left"></i> Voltar para minhas turmas
          </Link>
          <h1 className="painel-titulo">Alunos da turma</h1>
          <p className="fw-medium mb-0" style={{ color: TEXTO, fontSize: '0.8rem' }}>
            {turma.modalidade} ({turma.faixaEtaria}) • {turma.nome}
          </p>
        </div>

        <Link to={`/professor/turmas/${turma.id}/chamada`} className="painel-botao-contorno">
          <i className="bi bi-calendar3"></i> Abrir frequência
        </Link>
      </div>

      <div className="painel-card">
        {alunos.length === 0 ? (
          <Vazio texto="Nenhum aluno matriculado nesta turma ainda." />
        ) : (
          <table className="painel-tabela">
            <thead>
              <tr>
                <th style={{ width: '48px' }}>#</th>
                <th>Nome do aluno</th>
                <th>Idade</th>
                <th className="d-none d-md-table-cell">Responsável</th>
                <th className="text-center" style={{ width: '170px' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno, indice) => (
                <tr key={aluno.id}>
                  <td>{indice + 1}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <span className="painel-avatar">{iniciais(aluno.nome)}</span>
                      {aluno.nome}
                    </div>
                  </td>
                  <td>{calcularIdade(aluno.nascimento) ?? '—'}</td>
                  <td className="d-none d-md-table-cell">{aluno.nomeResponsavel}</td>
                  <td className="text-center">
                    <Link
                      to={`/professor/turmas/${turma.id}/alunos/${aluno.id}/historico`}
                      className="text-decoration-none"
                      style={{ color: TEXTO, fontSize: '0.75rem' }}
                    >
                      <i className="bi bi-clock-history me-1"></i>Histórico
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </LayoutProfessor>
  );
}

export default AlunosTurma;
