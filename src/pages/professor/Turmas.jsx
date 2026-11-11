import LayoutProfessor from '../../components/LayoutProfessor';
import { Carregando, ErroCarga, Vazio } from '../../components/EstadoDados';
import { useAuth } from '../../context/AuthContext';
import { useCarregar } from '../../hooks/useCarregar';
import CardTurma from './CardTurma';
import { carregarTurmasDoProfessor } from './dadosProfessor';

function Turmas() {
  const { usuario } = useAuth();
  const { dados: turmas, carregando, erro, recarregar } = useCarregar(() => carregarTurmasDoProfessor(usuario.uid), [usuario.uid]);

  return (
    <LayoutProfessor>
      <div className="mb-3">
        <h1 className="painel-titulo">Minhas turmas</h1>
        <p className="painel-subtitulo">Veja abaixo as turmas que você leciona e acesse as informações.</p>
      </div>

      {carregando && <Carregando />}
      {erro && <ErroCarga onTentarDeNovo={recarregar} />}
      {turmas && (
        turmas.length === 0 ? (
          <div className="painel-card">
            <Vazio texto="Nenhuma turma vinculada a você ainda. A administração define o professor de cada turma." />
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {turmas.map((turma) => <CardTurma key={turma.id} turma={turma} />)}
          </div>
        )
      )}
    </LayoutProfessor>
  );
}

export default Turmas;
