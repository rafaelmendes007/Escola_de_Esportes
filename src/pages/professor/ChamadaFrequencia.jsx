import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LayoutProfessor from '../../components/LayoutProfessor';
import { TEXTO, BORDA, VERDE, VERMELHO } from '../../components/cores';
import { Carregando, ErroCarga, Vazio } from '../../components/EstadoDados';
import { useAutenticacao } from '../../hooks/useAutenticacao';
import { useCarregar } from '../../hooks/useCarregar';
import { buscarChamada, salvarChamada } from '../../services/frequencias';
import { ehDiaDeAula, ultimoDiaDeAula } from '../../utils/diasAula';
import { carregarTurmaComAlunos } from './dadosProfessor';

// Botão "Presente" ou "Ausente" de cada aluno
function BotaoChamada({ tipo, marcado, onClick }) {
  const presente = tipo === 'presente';
  const cor = presente ? VERDE : VERMELHO;

  return (
    <button
      type="button"
      onClick={onClick}
      className="btn btn-sm d-inline-flex align-items-center gap-2"
      aria-pressed={marcado}
      style={{
        width: '90px',
        fontSize: '0.7rem',
        fontWeight: marcado ? 600 : 400,
        color: marcado ? cor : presente ? '#6B7280' : '#DC2626',
        backgroundColor: marcado ? (presente ? '#DCFCE7' : '#FEE2E2') : '#FFFFFF',
        border: `1px solid ${marcado ? cor : presente ? BORDA : '#FCA5A5'}`,
      }}
    >
      <i className={`bi ${marcado ? (presente ? 'bi-check-circle-fill' : 'bi-x-circle-fill') : 'bi-circle'}`}></i>
      {presente ? 'Presente' : 'Ausente'}
    </button>
  );
}

function ChamadaFrequencia() {
  const { turmaId } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAutenticacao();
  const { dados, carregando, erro, recarregar } = useCarregar(() => carregarTurmaComAlunos(turmaId), [turmaId]);

  const [data, setData] = useState(ultimoDiaDeAula());
  // { idDoAluno: { presente: true|false, justificativa? } }
  const [registros, setRegistros] = useState({});
  const [jaRegistrada, setJaRegistrada] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erroSalvar, setErroSalvar] = useState('');

  // Se a chamada desse dia já existe, carrega para o professor revisar
  useEffect(() => {
    let ativo = true;
    if (!ehDiaDeAula(data)) return undefined;
    buscarChamada(turmaId, data)
      .then((chamada) => {
        if (!ativo) return;
        setRegistros(chamada?.registros || {});
        setJaRegistrada(Boolean(chamada));
      })
      .catch((e) => console.error('Erro ao buscar chamada:', e));
    return () => { ativo = false; };
  }, [turmaId, data]);

  const marcar = (alunoId, presente) => {
    setRegistros((anterior) => ({ ...anterior, [alunoId]: { ...anterior[alunoId], presente } }));
  };

  if (carregando) return <LayoutProfessor><Carregando /></LayoutProfessor>;
  if (erro) return <LayoutProfessor><ErroCarga onTentarDeNovo={recarregar} /></LayoutProfessor>;
  if (!dados) return <LayoutProfessor><Vazio texto="Turma não encontrada." /></LayoutProfessor>;

  const { turma, alunos } = dados;
  const faltamMarcar = alunos.filter((aluno) => registros[aluno.id]?.presente === undefined).length;

  const marcarTodosPresentes = () => {
    setRegistros((anterior) => Object.fromEntries(alunos.map((aluno) => [aluno.id, { ...anterior[aluno.id], presente: true }])));
  };

  const handleSalvar = async () => {
    setSalvando(true);
    setErroSalvar('');
    // Só grava os alunos ativos da turma
    const chamada = Object.fromEntries(alunos.map((aluno) => [aluno.id, registros[aluno.id]]));
    try {
      await salvarChamada(turma.id, data, chamada, usuario.uid);
      const valores = Object.values(chamada);
      navigate(`/professor/turmas/${turma.id}/frequencia-registrada`, {
        state: {
          data,
          presentes: valores.filter((r) => r.presente).length,
          ausentes: valores.filter((r) => !r.presente && !r.justificativa).length,
          justificados: valores.filter((r) => !r.presente && r.justificativa).length,
        },
      });
    } catch (error) {
      console.error('Erro ao salvar chamada:', error);
      setErroSalvar('Não foi possível salvar a frequência. Tente de novo.');
      setSalvando(false);
    }
  };

  return (
    <LayoutProfessor>
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-3">
        <div>
          <Link to={`/professor/turmas/${turma.id}/alunos`} className="painel-voltar">
            <i className="bi bi-arrow-left"></i> Voltar para a turma
          </Link>
          <h1 className="painel-titulo">Chamada / Frequência</h1>
          <p className="fw-medium mb-0" style={{ color: TEXTO, fontSize: '0.8rem' }}>
            {turma.modalidade} ({turma.faixaEtaria}) • {turma.nome}
          </p>
        </div>

        <div>
          <label htmlFor="data-aula" className="d-block mb-1" style={{ color: TEXTO, fontSize: '0.65rem' }}>Data da aula</label>
          <input
            id="data-aula"
            type="date"
            className="form-control form-control-sm"
            style={{ width: '180px', fontSize: '0.75rem', borderColor: BORDA }}
            value={data}
            max={ultimoDiaDeAula()}
            onChange={(e) => { setData(e.target.value); setRegistros({}); setJaRegistrada(false); }}
          />
          {!ehDiaDeAula(data) && (
            <div className="mt-1" style={{ color: VERMELHO, fontSize: '0.65rem' }}>As aulas são só às terças e quintas.</div>
          )}
        </div>
      </div>

      {jaRegistrada && (
        <div className="rounded px-3 py-2 mb-3" style={{ backgroundColor: '#EAF1FB', color: TEXTO, fontSize: '0.75rem' }}>
          <i className="bi bi-info-circle me-1"></i>A chamada deste dia já foi registrada. Você pode corrigir e salvar de novo.
        </div>
      )}

      {alunos.length === 0 ? (
        <div className="painel-card"><Vazio texto="Nenhum aluno matriculado nesta turma." /></div>
      ) : (
        <>
          <div className="d-flex justify-content-end mb-2">
            <button type="button" className="btn btn-link btn-sm p-0" style={{ fontSize: '0.75rem' }} onClick={marcarTodosPresentes}>
              Marcar todos como presentes
            </button>
          </div>
          <div className="painel-card table-responsive">
            <table className="painel-tabela">
              <thead>
                <tr>
                  <th style={{ width: '48px' }}>#</th>
                  <th>Nome do aluno</th>
                  <th className="text-center" style={{ width: '130px' }}>Presente</th>
                  <th className="text-center" style={{ width: '130px' }}>Ausente</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map((aluno, indice) => (
                  <tr key={aluno.id}>
                    <td>{indice + 1}</td>
                    <td>{aluno.nome}</td>
                    <td className="text-center">
                      <BotaoChamada tipo="presente" marcado={registros[aluno.id]?.presente === true} onClick={() => marcar(aluno.id, true)} />
                    </td>
                    <td className="text-center">
                      <BotaoChamada tipo="ausente" marcado={registros[aluno.id]?.presente === false} onClick={() => marcar(aluno.id, false)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {erroSalvar && <div className="mt-3" style={{ color: VERMELHO, fontSize: '0.8rem' }}>{erroSalvar}</div>}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-3">
        <Link to={`/professor/turmas/${turma.id}/alunos`} className="painel-botao-contorno">
          Cancelar
        </Link>
        <div className="d-flex align-items-center gap-3">
          {faltamMarcar > 0 && alunos.length > 0 && (
            <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>Falta marcar {faltamMarcar} aluno{faltamMarcar > 1 ? 's' : ''}</span>
          )}
          <button
            type="button"
            className="painel-botao"
            onClick={handleSalvar}
            disabled={!ehDiaDeAula(data) || faltamMarcar > 0 || alunos.length === 0 || salvando}
          >
            {salvando ? 'Salvando...' : 'Salvar frequência'}
          </button>
        </div>
      </div>
    </LayoutProfessor>
  );
}

export default ChamadaFrequencia;
