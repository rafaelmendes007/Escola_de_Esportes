import LayoutProfessor from '../../components/LayoutProfessor';
import { TEXTO } from '../../components/cores';
import CardTurma from './CardTurma';
import { turmas, idsTurmasHoje } from './dados';

function Painel() {
  const turmasHoje = turmas.filter((turma) => idsTurmasHoje.includes(turma.id));

  return (
    <LayoutProfessor>
      <h1 className="mb-4" style={{ color: TEXTO, fontSize: '1.5rem', fontWeight: 600 }}>
        Olá, Professor! 👋
      </h1>

      <h2 className="painel-titulo" style={{ fontSize: '1.5rem' }}>Turmas de Hoje</h2>
      <p className="painel-subtitulo mb-3">Veja abaixo a turma que você leciona hoje.</p>

      <div className="d-flex flex-column gap-3">
        {turmasHoje.map((turma) => (
          <CardTurma key={turma.id} turma={turma} />
        ))}
      </div>
    </LayoutProfessor>
  );
}

export default Painel;
