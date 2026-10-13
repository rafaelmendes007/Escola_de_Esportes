import { Link, useParams } from 'react-router-dom';
import LayoutProfessor from '../../components/LayoutProfessor';
import { TEXTO, CINZA_TEXTO, AZUL, AZUL_CLARO, BORDA } from '../../components/cores';
import CardResumo from './CardResumo';
import { buscarAluno, buscarTurma, historicoAulas, iniciais } from './dados';

// Etiqueta colorida do status de cada aula
const etiquetas = {
  presente: { texto: 'Presente', icone: 'bi-check-circle-fill', cor: '#15803D', fundo: '#DCFCE7' },
  ausente: { texto: 'Ausente', icone: 'bi-circle', cor: '#DC2626', fundo: '#FEE2E2' },
  justificado: { texto: 'Justificado', icone: 'bi-file-earmark-text-fill', cor: AZUL, fundo: AZUL_CLARO },
};

function HistoricoFrequencia() {
  const { turmaId, alunoId } = useParams();
  const turma = buscarTurma(turmaId);
  const aluno = buscarAluno(alunoId);

  return (
    <LayoutProfessor>
      <Link to={`/professor/turmas/${turma.id}/alunos`} className="painel-voltar">
        <i className="bi bi-arrow-left"></i> Voltar para a turma
      </Link>
      <h1 className="painel-titulo">Histórico de frequência</h1>
      <p className="painel-subtitulo mb-3">Veja abaixo o histórico de um aluno na turma.</p>

      {/* Dados do aluno e do responsável */}
      <div className="painel-card d-flex flex-wrap align-items-center gap-3 px-3 py-3 mb-3">
        <span className="painel-avatar" style={{ width: '48px', height: '48px', fontSize: '1rem' }}>{iniciais(aluno.nome)}</span>
        <div className="flex-grow-1">
          <div className="fw-semibold" style={{ color: TEXTO, fontSize: '1rem' }}>{aluno.nome}</div>
          <div style={{ color: CINZA_TEXTO, fontSize: '0.7rem' }}>{aluno.idade} anos</div>
          <div style={{ color: CINZA_TEXTO, fontSize: '0.7rem' }}>
            Turma {turma.id} – {turma.modalidade} ({turma.faixaEtaria})
          </div>
        </div>
        <div className="ps-3" style={{ borderLeft: `1px solid ${BORDA}`, minWidth: '190px' }}>
          <div style={{ color: CINZA_TEXTO, fontSize: '0.65rem' }}>Responsável</div>
          <div style={{ color: TEXTO, fontSize: '0.8rem' }}>{aluno.responsavel}</div>
          <div style={{ color: TEXTO, fontSize: '0.75rem' }}>
            <i className="bi bi-telephone me-1" style={{ color: AZUL }}></i>(85) 99999-9999
          </div>
        </div>
      </div>

      {/* Resumo */}
      <div className="row g-2 g-md-3 mb-3">
        <div className="col-6 col-md-3"><CardResumo tipo="presente" valor={12} legenda="Presenças" /></div>
        <div className="col-6 col-md-3"><CardResumo tipo="ausente" valor={3} legenda="Ausências" /></div>
        <div className="col-6 col-md-3"><CardResumo tipo="justificado" valor={1} legenda="Justificadas" /></div>
        <div className="col-6 col-md-3"><CardResumo tipo="frequencia" valor="75%" legenda="Frequência" /></div>
      </div>

      <h2 className="fw-semibold mb-2" style={{ color: TEXTO, fontSize: '0.95rem' }}>Últimas aulas</h2>
      <div className="painel-card table-responsive">
        <table className="painel-tabela">
          <thead>
            <tr>
              <th>Data</th>
              <th>Dia da semana</th>
              <th>Status</th>
              <th>Observação</th>
            </tr>
          </thead>
          <tbody>
            {historicoAulas.map((aula) => {
              const etiqueta = etiquetas[aula.status];
              return (
                <tr key={aula.data}>
                  <td>{aula.data}</td>
                  <td>{aula.diaSemana}</td>
                  <td>
                    <span
                      className="d-inline-flex align-items-center gap-1 rounded px-2 py-1"
                      style={{ color: etiqueta.cor, backgroundColor: etiqueta.fundo, fontSize: '0.7rem' }}
                    >
                      <i className={`bi ${etiqueta.icone}`}></i>
                      {etiqueta.texto}
                    </span>
                  </td>
                  <td>{aula.observacao}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </LayoutProfessor>
  );
}

export default HistoricoFrequencia;
