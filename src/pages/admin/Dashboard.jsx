import { useState } from 'react';
import { Link } from 'react-router-dom';
import LayoutAdmin from '../../components/LayoutAdmin';
import { AZUL_ADMIN, BORDA } from '../../components/cores';
import { Etiqueta } from './componentes';
import { resumo, turmas } from './dados';

// Cartão de resumo com link no rodapé
function CardResumo({ icone, cor, fundoIcone, rotulo, valor, link, textoLink }) {
  return (
    <div className="painel-card h-100 d-flex flex-column overflow-hidden">
      <div className="d-flex gap-3 p-3 flex-grow-1">
        <span
          className="rounded d-flex align-items-center justify-content-center flex-shrink-0"
          style={{ width: '48px', height: '48px', backgroundColor: fundoIcone, color: cor, fontSize: '1.5rem' }}
        >
          <i className={`bi ${icone}`}></i>
        </span>
        <div>
          <div style={{ color: '#111827', fontSize: '0.8rem', fontWeight: 500 }}>{rotulo}</div>
          <div className="fw-bold" style={{ color: '#111827', fontSize: '1.6rem' }}>{valor}</div>
        </div>
      </div>
      <Link
        to={link}
        className="d-flex justify-content-between align-items-center px-3 py-2 text-decoration-none"
        style={{ backgroundColor: '#C9DDF0', color: AZUL_ADMIN, fontSize: '0.7rem' }}
      >
        {textoLink} <i className="bi bi-chevron-right"></i>
      </Link>
    </div>
  );
}

function Dashboard() {
  const [semestre, setSemestre] = useState('2026.2');

  return (
    <LayoutAdmin>
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
        <div>
          <h1 className="fw-semibold m-0" style={{ color: '#111827', fontSize: '1.6rem' }}>Olá Administrador!</h1>
          <p className="admin-subtitulo">Veja o resumo atual da Escola de Esporte.</p>
        </div>

        {/* Seletor de semestre */}
        <label className="painel-card d-flex align-items-center gap-2 px-3 py-2 m-0">
          <i className="bi bi-calendar3"></i>
          <span>
            <span className="d-block" style={{ fontSize: '0.6rem', color: '#374151' }}>Semestre atual</span>
            <select
              className="border-0 p-0 bg-transparent fw-medium"
              style={{ fontSize: '0.75rem', outline: 'none' }}
              value={semestre}
              onChange={(e) => setSemestre(e.target.value)}
            >
              <option value="2026.2">2026.2</option>
              <option value="2026.1">2026.1</option>
            </select>
          </span>
        </label>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <CardResumo icone="bi-people" cor={AZUL_ADMIN} fundoIcone="#C9DDF0" rotulo="Turmas Ativas" valor={resumo.turmasAtivas} link="/admin/turmas" textoLink="Ver turmas" />
        </div>
        <div className="col-12 col-md-4">
          <CardResumo icone="bi-person" cor="#16A34A" fundoIcone="#D7F5D7" rotulo="Alunos matriculados" valor={resumo.alunosMatriculados} link="/admin/alunos" textoLink="Ver alunos" />
        </div>
        <div className="col-12 col-md-4">
          <CardResumo icone="bi-list-ul" cor="#CA8A04" fundoIcone="#FBF6C4" rotulo="Lista de espera" valor={resumo.listaEspera} link="/admin/lista-espera" textoLink="Ver lista de espera" />
        </div>
      </div>

      {/* Turmas em andamento */}
      <div className="painel-card p-3" style={{ minHeight: '300px' }}>
        <h2 className="fw-semibold mb-3" style={{ color: '#111827', fontSize: '1rem' }}>Turmas em andamento</h2>
        <div className="table-responsive">
          <table className="admin-tabela">
            <thead>
              <tr>
                <th>Modalidade</th>
                <th>Turma</th>
                <th>Faixa etária</th>
                <th className="text-center">Capacidade</th>
                <th className="text-center">Ocupadas</th>
                <th className="text-center">Disponíveis</th>
                <th className="text-center">Lista de espera</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {turmas.map((turma) => (
                <tr key={turma.id} style={{ borderBottom: `1px solid ${BORDA}` }}>
                  <td>{turma.modalidade}</td>
                  <td>{turma.nome}</td>
                  <td>{turma.faixaEtaria}</td>
                  <td className="text-center">{turma.capacidade}</td>
                  <td className="text-center">{turma.ocupadas}</td>
                  <td className="text-center">{turma.capacidade - turma.ocupadas}</td>
                  <td className="text-center">{turma.listaEspera}</td>
                  <td><Etiqueta texto={turma.status} /></td>
                  <td>
                    <Link to={`/admin/turmas/${turma.id}`} className="admin-link">
                      Ver detalhes <i className="bi bi-chevron-right"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default Dashboard;
