import { useState } from 'react';
import LayoutProfessor from '../../components/LayoutProfessor';
import { TEXTO, BORDA } from '../../components/cores';
import CardTurma from './CardTurma';
import { turmas } from './dados';

function Turmas() {
  const [semestre, setSemestre] = useState('2026.1');

  return (
    <LayoutProfessor>
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-3">
        <div>
          <h1 className="painel-titulo">Minhas turmas</h1>
          <p className="painel-subtitulo">Veja abaixo as turmas que você leciona e acesse as informações.</p>
        </div>

        {/* Filtro de semestre */}
        <div>
          <label htmlFor="semestre" className="d-block mb-1" style={{ color: TEXTO, fontSize: '0.65rem' }}>Semestre</label>
          <select
            id="semestre"
            className="form-select form-select-sm"
            style={{ width: '180px', fontSize: '0.75rem', borderColor: BORDA }}
            value={semestre}
            onChange={(e) => setSemestre(e.target.value)}
          >
            <option value="2026.1">2026.1</option>
            <option value="2025.2">2025.2</option>
          </select>
        </div>
      </div>

      <div className="d-flex flex-column gap-3">
        {turmas.map((turma) => (
          <CardTurma key={turma.id} turma={turma} />
        ))}
      </div>
    </LayoutProfessor>
  );
}

export default Turmas;
