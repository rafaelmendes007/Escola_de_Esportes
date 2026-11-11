import { useState } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import { BORDA } from '../../components/cores';
import { Carregando, ErroCarga, Vazio } from '../../components/EstadoDados';
import { useAuth } from '../../context/AuthContext';
import { useCarregar } from '../../hooks/useCarregar';
import { listarAlunosDaTurma } from '../../services/alunos';
import { justificarFalta, listarChamadasDaTurma, resumoDoAluno, salvarChamada } from '../../services/frequencias';
import { listarTurmas, nomeDaTurma } from '../../services/turmas';
import { ehDiaDeAula, ultimoDiaDeAula } from '../../utils/diasAula';
import { CabecalhoPagina, CardIndicador, Etiqueta } from './componentes';
import ModalJustificar from './ModalJustificar';

// Alunos ativos da turma + todas as chamadas dela
async function carregarFrequenciaDaTurma(turmaId) {
  if (!turmaId) return null;
  const [alunos, chamadas] = await Promise.all([listarAlunosDaTurma(turmaId), listarChamadasDaTurma(turmaId)]);
  return { alunos: alunos.filter((aluno) => aluno.status === 'Ativo'), chamadas };
}

function Frequencia() {
  const { usuario } = useAuth();
  const { dados: turmas, carregando: carregandoTurmas } = useCarregar(listarTurmas);
  const [turmaEscolhida, setTurmaEscolhida] = useState('');
  const [data, setData] = useState(ultimoDiaDeAula());
  // Sem escolha, fica a primeira turma da lista
  const turmaId = turmaEscolhida || turmas?.[0]?.id || '';
  const { dados, carregando, erro, recarregar } = useCarregar(() => carregarFrequenciaDaTurma(turmaId), [turmaId]);

  // Correções feitas na tela, guardadas junto com a turma e o dia a que pertencem
  const [edicao, setEdicao] = useState({ chave: '', registros: {} });
  const [salvando, setSalvando] = useState(false);
  const [aviso, setAviso] = useState('');
  const [justificando, setJustificando] = useState(null); // aluno

  const chave = `${turmaId}_${data}`;
  const chamadaSalva = dados?.chamadas.find((item) => item.data === data);
  const chamadaExiste = Boolean(chamadaSalva);
  const alterado = edicao.chave === chave;
  // { alunoId: { presente, justificativa? } } mostrados na tela
  const registros = alterado ? edicao.registros : chamadaSalva?.registros || {};
  const alunos = dados?.alunos || [];
  const presentes = alunos.filter((aluno) => registros[aluno.id]?.presente).length;
  const resumos = Object.fromEntries(alunos.map((aluno) => [aluno.id, resumoDoAluno(dados?.chamadas || [], aluno.id)]));
  const emAlerta = alunos.filter((aluno) => resumos[aluno.id].faltasSeguidas >= 3);

  const alternarPresenca = (alunoId) => {
    setEdicao({ chave, registros: { ...registros, [alunoId]: { ...registros[alunoId], presente: !registros[alunoId]?.presente } } });
    setAviso('');
  };

  const salvar = async () => {
    setSalvando(true);
    try {
      const chamada = Object.fromEntries(alunos.map((aluno) => [aluno.id, { presente: false, ...registros[aluno.id] }]));
      await salvarChamada(turmaId, data, chamada, usuario.uid);
      setEdicao({ chave: '', registros: {} });
      setAviso('Frequência salva.');
      recarregar();
    } catch (error) {
      console.error('Erro ao salvar frequência:', error);
      setAviso('Não foi possível salvar. Tente de novo.');
    } finally {
      setSalvando(false);
    }
  };

  const turmaAtual = turmas?.find((turma) => turma.id === turmaId);

  return (
    <LayoutAdmin titulo="Frequência">
      <CabecalhoPagina titulo="Frequência" subtitulo="Registre, corrija e justifique a frequência das turmas." />

      {/* Turma e data */}
      <div className="painel-card row g-3 align-items-end mx-0 px-2 pb-3 mb-3">
        <div className="col-12 col-md-6">
          <label className="admin-rotulo" htmlFor="turma-frequencia">Turma</label>
          <select id="turma-frequencia" className="form-select form-select-sm admin-campo" value={turmaId} onChange={(e) => { setTurmaEscolhida(e.target.value); setAviso(''); }} disabled={carregandoTurmas}>
            {carregandoTurmas && <option>Carregando...</option>}
            {turmas?.length === 0 && <option value="">Nenhuma turma cadastrada</option>}
            {(turmas || []).map((turma) => <option key={turma.id} value={turma.id}>{nomeDaTurma(turma)}</option>)}
          </select>
        </div>
        <div className="col-12 col-md-4">
          <label className="admin-rotulo" htmlFor="data-frequencia">Data da aula</label>
          <input id="data-frequencia" type="date" className="form-control form-control-sm admin-campo" value={data} max={ultimoDiaDeAula()} onChange={(e) => { setData(e.target.value); setAviso(''); }} />
          {!ehDiaDeAula(data) && (
            <div className="mt-1" style={{ color: '#DC2626', fontSize: '0.65rem' }}>As aulas são só às terças e quintas.</div>
          )}
        </div>
      </div>

      {carregando && <Carregando />}
      {erro && <ErroCarga onTentarDeNovo={recarregar} />}
      {turmas?.length === 0 && <div className="painel-card"><Vazio texto="Cadastre uma turma para registrar frequência." /></div>}

      {dados && (
        <>
          <div className="row g-3 mb-3">
            <div className="col-6 col-md-3"><CardIndicador icone="bi-people" rotulo="Alunos" valor={alunos.length} cor="azul" /></div>
            <div className="col-6 col-md-3"><CardIndicador icone="bi-check-circle-fill" rotulo="Presentes" valor={chamadaExiste || alterado ? presentes : '—'} cor="verde" /></div>
            <div className="col-6 col-md-3"><CardIndicador icone="bi-x-circle-fill" rotulo="Ausentes" valor={chamadaExiste || alterado ? alunos.length - presentes : '—'} cor="vermelho" /></div>
            <div className="col-6 col-md-3"><CardIndicador icone="bi-exclamation-triangle" rotulo="Alertas de faltas" valor={emAlerta.length} cor="amarelo" /></div>
          </div>

          <div className="painel-card p-3">
            <h2 className="fw-semibold mb-1" style={{ color: '#111827', fontSize: '0.9rem' }}>{nomeDaTurma(turmaAtual)}</h2>
            <p className="mb-2" style={{ fontSize: '0.7rem', color: '#4B5563' }}>
              <i className="bi bi-info-circle me-1"></i>
              {chamadaExiste
                ? 'Chamada registrada neste dia. Clique na presença para corrigir.'
                : 'Ainda não há chamada neste dia. Marque quem está presente e salve.'}
            </p>

            {alunos.length === 0 ? (
              <Vazio texto="Nenhum aluno ativo nesta turma." />
            ) : (
              <div className="table-responsive">
                <table className="admin-tabela">
                  <thead>
                    <tr>
                      <th>Aluno</th>
                      <th>Presença</th>
                      <th className="text-center">Faltas seguidas</th>
                      <th>Situação</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alunos.map((aluno) => {
                      const registro = registros[aluno.id];
                      const presente = Boolean(registro?.presente);
                      const atencao = resumos[aluno.id].faltasSeguidas >= 3;
                      const podeJustificar = chamadaExiste && !alterado && registro && !registro.presente && !registro.justificativa;
                      return (
                        <tr key={aluno.id} style={{ borderBottom: `1px solid ${BORDA}` }}>
                          <td>{aluno.nome}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => alternarPresenca(aluno.id)}
                              disabled={!ehDiaDeAula(data)}
                              className="rounded px-2 d-inline-flex align-items-center gap-1"
                              aria-pressed={presente}
                              style={{
                                fontSize: '0.65rem',
                                width: '92px',
                                border: `1px solid ${presente ? '#86EFAC' : '#F87171'}`,
                                backgroundColor: presente ? '#DCFCE7' : '#FEE2E2',
                                color: presente ? '#15803D' : '#B91C1C',
                              }}
                            >
                              <i className="bi bi-circle-fill" style={{ fontSize: '0.45rem' }}></i>
                              {presente ? 'Presente' : registro?.justificativa ? 'Justificado' : 'Ausente'}
                            </button>
                          </td>
                          <td className="text-center">{resumos[aluno.id].faltasSeguidas}</td>
                          <td><Etiqueta texto={atencao ? 'Atenção' : 'Normal'} /></td>
                          <td>
                            {podeJustificar ? (
                              <button type="button" className="admin-botao-contorno py-0 px-2" style={{ fontSize: '0.65rem' }} onClick={() => setJustificando(aluno)}>
                                Justificar
                              </button>
                            ) : '—'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {emAlerta.map((aluno) => (
              <div key={aluno.id} className="d-flex align-items-center gap-2 rounded px-3 py-2 mt-3" style={{ backgroundColor: '#FECACA', border: '1px solid #F87171', color: '#B91C1C', fontSize: '0.7rem' }}>
                <i className="bi bi-exclamation-triangle"></i>
                {aluno.nome} atingiu {resumos[aluno.id].faltasSeguidas} faltas seguidas sem justificativa.
              </div>
            ))}

            <div className="d-flex justify-content-end align-items-center gap-3 mt-3">
              {aviso && <span style={{ fontSize: '0.75rem', color: aviso.startsWith('Não') ? '#B91C1C' : '#15803D' }}>{aviso}</span>}
              <button type="button" className="admin-botao" onClick={salvar} disabled={!ehDiaDeAula(data) || !alunos.length || !alterado || salvando}>
                <i className="bi bi-floppy"></i> {salvando ? 'Salvando...' : 'Salvar frequência'}
              </button>
            </div>
          </div>
        </>
      )}

      <ModalJustificar
        aberto={Boolean(justificando)}
        onFechar={() => setJustificando(null)}
        aluno={justificando?.nome}
        faltas={justificando ? [data] : []}
        onSalvar={async (dataFalta, texto) => {
          await justificarFalta(turmaId, dataFalta, justificando.id, texto);
          recarregar();
        }}
      />
    </LayoutAdmin>
  );
}

export default Frequencia;
