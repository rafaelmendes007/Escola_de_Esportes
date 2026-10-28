import { useState } from 'react';
import LayoutProfessor from '../../components/LayoutProfessor';
import { useAuth } from '../../context/AuthContext';
import { TEXTO } from '../../components/cores';
import CardTurma from './CardTurma';
import { turmas, temAulaNoDia } from './dados';

function Painel() {
  const { usuario } = useAuth();
  const [hoje] = useState(() => new Date());
  const turmasHoje = turmas.filter((turma) => temAulaNoDia(turma, hoje));

  return (
    <LayoutProfessor>
      <h1 className="mb-4" style={{ color: TEXTO, fontSize: '1.5rem', fontWeight: 600 }}>
        Olá, {usuario?.nome || 'Professor'}! 👋
      </h1>

      <h2 className="painel-titulo" style={{ fontSize: '1.5rem' }}>Turmas de Hoje</h2>
      <p className="painel-subtitulo mb-3">Veja abaixo a turma que você leciona hoje.</p>

      <div className="d-flex flex-column gap-3">
        {turmasHoje.map((turma) => (
          <CardTurma key={turma.id} turma={turma} />
        ))}
        {turmasHoje.length === 0 && (
          <div className="painel-card px-3 py-4 text-center" style={{ color: TEXTO, fontSize: '0.85rem' }}>
            Você não tem aula hoje.
          </div>
        )}
      </div>
    </LayoutProfessor>
  );
}

export default Painel;
