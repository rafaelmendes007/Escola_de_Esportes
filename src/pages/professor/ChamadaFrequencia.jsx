import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LayoutProfessor from '../../components/LayoutProfessor';
import { TEXTO, BORDA, VERDE, VERMELHO } from '../../components/cores';
import { alunos, buscarTurma } from './dados';

// Data de hoje no formato do input date (AAAA-MM-DD)
function hojeISO() {
  const hoje = new Date();
  hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset());
  return hoje.toISOString().slice(0, 10);
}

// Botão "Presente" ou "Ausente" de cada aluno
function BotaoChamada({ tipo, marcado, onClick }) {
  const presente = tipo === 'presente';
  const cor = presente ? VERDE : VERMELHO;

  return (
    <button
      type="button"
      onClick={onClick}
      className="btn btn-sm d-inline-flex align-items-center gap-2"
      style={{
        width: '90px',
        fontSize: '0.7rem',
        fontWeight: marcado ? 600 : 400,
        color: marcado ? cor : presente ? '#9CA3AF' : '#F87171',
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
  const turma = buscarTurma(turmaId);

  const [data, setData] = useState(hojeISO());
  // { idDoAluno: 'presente' | 'ausente' }
  const [chamada, setChamada] = useState({});

  const marcar = (idAluno, status) => {
    setChamada((anterior) => ({ ...anterior, [idAluno]: status }));
  };

  const handleSalvar = () => {
    // Aqui você faria a chamada da API para salvar a frequência
    const status = Object.values(chamada);
    navigate(`/professor/turmas/${turma.id}/frequencia-registrada`, {
      state: {
        data,
        presentes: status.filter((s) => s === 'presente').length,
        ausentes: status.filter((s) => s === 'ausente').length,
        justificados: 0,
      },
    });
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
            {turma.modalidade} ({turma.faixaEtaria}) • Turma {turma.id}
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
            onChange={(e) => setData(e.target.value)}
          />
        </div>
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
                  <BotaoChamada tipo="presente" marcado={chamada[aluno.id] === 'presente'} onClick={() => marcar(aluno.id, 'presente')} />
                </td>
                <td className="text-center">
                  <BotaoChamada tipo="ausente" marcado={chamada[aluno.id] === 'ausente'} onClick={() => marcar(aluno.id, 'ausente')} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between mt-3">
        <Link to={`/professor/turmas/${turma.id}/alunos`} className="painel-botao-contorno">
          Cancelar
        </Link>
        <button type="button" className="painel-botao" onClick={handleSalvar}>
          Salvar frequência
        </button>
      </div>
    </LayoutProfessor>
  );
}

export default ChamadaFrequencia;
