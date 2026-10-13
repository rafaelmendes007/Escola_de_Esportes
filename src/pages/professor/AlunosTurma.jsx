import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LayoutProfessor from '../../components/LayoutProfessor';
import { TEXTO, BORDA } from '../../components/cores';
import { alunos, buscarTurma, iniciais } from './dados';

function AlunosTurma() {
  const { turmaId } = useParams();
  const turma = buscarTurma(turmaId);
  // Id do aluno com o menu de ações aberto
  const [menuAberto, setMenuAberto] = useState(null);

  return (
    <LayoutProfessor>
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-3">
        <div>
          <Link to="/professor/turmas" className="painel-voltar">
            <i className="bi bi-arrow-left"></i> Voltar para minhas turmas
          </Link>
          <h1 className="painel-titulo">Alunos da turma</h1>
          <p className="fw-medium mb-0" style={{ color: TEXTO, fontSize: '0.8rem' }}>
            {turma.modalidade} ({turma.faixaEtaria}) • Turma {turma.id}
          </p>
        </div>

        <Link to={`/professor/turmas/${turma.id}/chamada`} className="painel-botao-contorno">
          <i className="bi bi-calendar3"></i> Abrir frequência
        </Link>
      </div>

      <div className="painel-card">
        <table className="painel-tabela">
          <thead>
            <tr>
              <th style={{ width: '48px' }}>#</th>
              <th>Nome do aluno</th>
              <th>Idade</th>
              <th className="d-none d-md-table-cell">Responsável</th>
              <th className="text-center" style={{ width: '80px' }}>Ações</th>
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
                <td>{aluno.idade}</td>
                <td className="d-none d-md-table-cell">{aluno.responsavel}</td>
                <td className="text-center position-relative">
                  <button
                    type="button"
                    className="btn btn-sm bg-white px-2 py-0"
                    style={{ border: `1px solid ${BORDA}` }}
                    aria-label={`Ações de ${aluno.nome}`}
                    onClick={() => setMenuAberto(menuAberto === aluno.id ? null : aluno.id)}
                  >
                    <i className="bi bi-three-dots"></i>
                  </button>

                  {/* Menu de ações do aluno */}
                  {menuAberto === aluno.id && (
                    <div className="painel-card position-absolute end-0 py-1 shadow-sm text-start" style={{ zIndex: 10, minWidth: '210px' }}>
                      <Link
                        to={`/professor/turmas/${turma.id}/alunos/${aluno.id}/historico`}
                        className="d-block px-3 py-2 text-decoration-none"
                        style={{ color: TEXTO, fontSize: '0.8rem' }}
                      >
                        <i className="bi bi-clock-history me-2"></i>Histórico de frequência
                      </Link>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </LayoutProfessor>
  );
}

export default AlunosTurma;
