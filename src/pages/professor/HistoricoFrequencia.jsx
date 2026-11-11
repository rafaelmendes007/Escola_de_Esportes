import { Link, useParams } from 'react-router-dom';
import LayoutProfessor from '../../components/LayoutProfessor';
import { TEXTO, CINZA_TEXTO, AZUL, AZUL_CLARO, BORDA } from '../../components/cores';
import { Carregando, ErroCarga, Vazio } from '../../components/EstadoDados';
import { useCarregar } from '../../hooks/useCarregar';
import { buscarAluno } from '../../services/alunos';
import { listarChamadasDaTurma, resumoDoAluno } from '../../services/frequencias';
import { buscarTurma } from '../../services/turmas';
import { calcularIdade, diaDaSemana, formatarData } from '../../utils/datas';
import CardResumo from './CardResumo';
import { iniciais, paraTela } from './dadosProfessor';

// Etiqueta colorida da situação de cada aula
const etiquetas = {
  Presente: { icone: 'bi-check-circle-fill', cor: '#15803D', fundo: '#DCFCE7' },
  Ausente: { icone: 'bi-circle', cor: '#DC2626', fundo: '#FEE2E2' },
  Justificado: { icone: 'bi-file-earmark-text-fill', cor: AZUL, fundo: AZUL_CLARO },
};

async function carregarHistorico(turmaId, alunoId) {
  const [turma, aluno, chamadas] = await Promise.all([buscarTurma(turmaId), buscarAluno(alunoId), listarChamadasDaTurma(turmaId)]);
  if (!turma || !aluno) return null;
  return { turma: paraTela(turma), aluno, resumo: resumoDoAluno(chamadas, alunoId) };
}

function HistoricoFrequencia() {
  const { turmaId, alunoId } = useParams();
  const { dados, carregando, erro, recarregar } = useCarregar(() => carregarHistorico(turmaId, alunoId), [turmaId, alunoId]);

  if (carregando) return <LayoutProfessor><Carregando /></LayoutProfessor>;
  if (erro) return <LayoutProfessor><ErroCarga onTentarDeNovo={recarregar} /></LayoutProfessor>;
  if (!dados) return <LayoutProfessor><Vazio texto="Aluno ou turma não encontrados." /></LayoutProfessor>;

  const { turma, aluno, resumo } = dados;

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
          <div style={{ color: CINZA_TEXTO, fontSize: '0.7rem' }}>{calcularIdade(aluno.nascimento)} anos</div>
          <div style={{ color: CINZA_TEXTO, fontSize: '0.7rem' }}>{turma.modalidade} – {turma.nome} ({turma.faixaEtaria})</div>
        </div>
        <div className="ps-3" style={{ borderLeft: `1px solid ${BORDA}`, minWidth: '190px' }}>
          <div style={{ color: CINZA_TEXTO, fontSize: '0.65rem' }}>Responsável</div>
          <div style={{ color: TEXTO, fontSize: '0.8rem' }}>{aluno.nomeResponsavel}</div>
          <div style={{ color: TEXTO, fontSize: '0.75rem' }}>
            <i className="bi bi-telephone me-1" style={{ color: AZUL }}></i>{aluno.telefone}
          </div>
        </div>
      </div>

      {/* Resumo */}
      <div className="row g-2 g-md-3 mb-3">
        <div className="col-6 col-md-3"><CardResumo tipo="presente" valor={resumo.presencas} legenda="Presenças" /></div>
        <div className="col-6 col-md-3"><CardResumo tipo="ausente" valor={resumo.ausencias} legenda="Ausências" /></div>
        <div className="col-6 col-md-3"><CardResumo tipo="justificado" valor={resumo.justificadas} legenda="Justificadas" /></div>
        <div className="col-6 col-md-3">
          <CardResumo tipo="frequencia" valor={resumo.percentual === null ? '—' : `${resumo.percentual}%`} legenda="Frequência" />
        </div>
      </div>

      <h2 className="fw-semibold mb-2" style={{ color: TEXTO, fontSize: '0.95rem' }}>Últimas aulas</h2>
      <div className="painel-card table-responsive">
        {resumo.aulas.length === 0 ? (
          <Vazio texto="Nenhuma chamada registrada para este aluno ainda." />
        ) : (
          <table className="painel-tabela">
            <thead>
              <tr>
                <th>Data</th>
                <th>Dia da semana</th>
                <th>Situação</th>
                <th>Justificativa</th>
              </tr>
            </thead>
            <tbody>
              {resumo.aulas.map((aula) => {
                const etiqueta = etiquetas[aula.situacao];
                return (
                  <tr key={aula.data}>
                    <td>{formatarData(aula.data)}</td>
                    <td>{diaDaSemana(aula.data)}</td>
                    <td>
                      <span className="d-inline-flex align-items-center gap-1 rounded px-2 py-1" style={{ color: etiqueta.cor, backgroundColor: etiqueta.fundo, fontSize: '0.7rem' }}>
                        <i className={`bi ${etiqueta.icone}`}></i>
                        {aula.situacao}
                      </span>
                    </td>
                    <td>{aula.justificativa || '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </LayoutProfessor>
  );
}

export default HistoricoFrequencia;
