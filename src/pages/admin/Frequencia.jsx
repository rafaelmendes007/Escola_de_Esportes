import { useState } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import { BORDA } from '../../components/cores';
import { CabecalhoPagina, CardIndicador, Etiqueta } from './componentes';
import ModalJustificar from './ModalJustificar';
import { frequenciaTurma } from './dados';

function Frequencia() {
  const [registros, setRegistros] = useState(frequenciaTurma);
  const [modalAberto, setModalAberto] = useState(false);
  const [salvo, setSalvo] = useState(false);

  const presentes = registros.filter((registro) => registro.presente).length;
  // Quem chegou a 3 faltas seguidas sem justificativa
  const emAlerta = registros.filter((registro) => registro.faltasConsecutivas >= 3);

  const alternarPresenca = (id) => {
    setSalvo(false);
    setRegistros(registros.map((registro) => (registro.id === id ? { ...registro, presente: !registro.presente } : registro)));
  };

  return (
    <LayoutAdmin titulo="Frequência">
      <CabecalhoPagina titulo="Frequência" subtitulo="Registre e acompanhe a frequência das turmas" />

      {/* Filtros */}
      <form className="painel-card row g-3 align-items-end mx-0 px-2 pb-3 mb-3" onSubmit={(e) => e.preventDefault()}>
        <div className="col-12 col-md-3">
          <label className="admin-rotulo">Turma</label>
          <select className="form-select form-select-sm admin-campo" defaultValue="Futsal - Sub 15">
            <option>Futsal - Sub 15</option>
            <option>Voleibol Misto - Turma 2</option>
            <option>Atletismo Misto - Turma 1</option>
          </select>
        </div>
        <div className="col-6 col-md-3">
          <label className="admin-rotulo">Data</label>
          <input type="date" className="form-control form-control-sm admin-campo" defaultValue="2026-03-20" />
        </div>
        <div className="col-6 col-md-3">
          <label className="admin-rotulo">Semestre</label>
          <select className="form-select form-select-sm admin-campo" defaultValue="2026.1">
            <option>2026.1</option>
            <option>2026.2</option>
          </select>
        </div>
        <div className="col-12 col-md-2 ms-auto">
          <button type="submit" className="admin-botao w-100"><i className="bi bi-search"></i> Filtrar</button>
        </div>
      </form>

      <div className="row g-3 mb-3">
        <div className="col-6 col-md-3"><CardIndicador icone="bi-people" rotulo="Alunos" valor={registros.length} cor="azul" /></div>
        <div className="col-6 col-md-3"><CardIndicador icone="bi-check-circle-fill" rotulo="Presentes" valor={presentes} cor="verde" /></div>
        <div className="col-6 col-md-3"><CardIndicador icone="bi-x-circle-fill" rotulo="Ausentes" valor={registros.length - presentes} cor="vermelho" /></div>
        <div className="col-6 col-md-3"><CardIndicador icone="bi-exclamation-triangle" rotulo="Alertas de faltas" valor={emAlerta.length} cor="amarelo" /></div>
      </div>

      <div className="painel-card p-3">
        <h2 className="fw-semibold mb-1" style={{ color: '#111827', fontSize: '0.9rem' }}>Frequência da turma</h2>
        <p className="mb-2" style={{ fontSize: '0.65rem', color: '#4B5563' }}>
          <i className="bi bi-info-circle me-1"></i>
          O professor registra apenas Presente/Ausente. O Administrador/Estagiário pode justificar faltas e corrigir apenas o semestre atual.
        </p>

        <div className="table-responsive">
          <table className="admin-tabela">
            <thead>
              <tr>
                <th>Aluno</th>
                <th>Presença</th>
                <th className="text-center">Faltas consecutivas</th>
                <th>Situação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((registro) => {
                const atencao = registro.faltasConsecutivas >= 3;
                return (
                  <tr key={registro.id} style={{ borderBottom: `1px solid ${BORDA}` }}>
                    <td>{registro.nome}</td>
                    <td>
                      {/* Clique para corrigir a presença */}
                      <button
                        type="button"
                        onClick={() => alternarPresenca(registro.id)}
                        className="rounded px-2 d-inline-flex align-items-center gap-1"
                        style={{
                          fontSize: '0.65rem',
                          width: '84px',
                          border: `1px solid ${registro.presente ? '#86EFAC' : '#F87171'}`,
                          backgroundColor: registro.presente ? '#DCFCE7' : '#FCA5A5',
                          color: registro.presente ? '#15803D' : '#B91C1C',
                        }}
                      >
                        <i className="bi bi-circle-fill" style={{ fontSize: '0.45rem' }}></i>
                        {registro.presente ? 'Presente' : 'Ausente'}
                      </button>
                    </td>
                    <td className="text-center">{registro.faltasConsecutivas}</td>
                    <td><Etiqueta texto={atencao ? 'Atenção' : 'Normal'} /></td>
                    <td>
                      {atencao ? (
                        <button type="button" className="admin-botao-contorno py-0 px-2" style={{ fontSize: '0.65rem' }} onClick={() => setModalAberto(true)}>
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

        {emAlerta.map((registro) => (
          <div key={registro.id} className="d-flex align-items-center gap-2 rounded px-3 py-2 mt-3" style={{ backgroundColor: '#FECACA', border: '1px solid #F87171', color: '#B91C1C', fontSize: '0.7rem' }}>
            <i className="bi bi-exclamation-triangle"></i>
            {registro.nome} atingiu {registro.faltasConsecutivas} faltas consecutivas não justificadas.
          </div>
        ))}

        <div className="d-flex justify-content-end align-items-center gap-3 mt-3">
          {salvo && <span style={{ fontSize: '0.75rem', color: '#15803D' }}><i className="bi bi-check-circle-fill me-1"></i>Frequência salva</span>}
          {/* Aqui você faria a chamada da API para salvar a frequência */}
          <button type="button" className="admin-botao" onClick={() => setSalvo(true)}>
            <i className="bi bi-floppy"></i> Salvar frequência
          </button>
        </div>
      </div>

      <ModalJustificar aberto={modalAberto} onFechar={() => setModalAberto(false)} />
    </LayoutAdmin>
  );
}

export default Frequencia;
