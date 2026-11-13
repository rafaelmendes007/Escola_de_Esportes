import { Link } from 'react-router-dom';
import LayoutProfessor from '../../components/LayoutProfessor';
import { TEXTO } from '../../components/cores';
import { Carregando, ErroCarga, Vazio } from '../../components/EstadoDados';
import { useAutenticacao } from '../../hooks/useAutenticacao';
import { useCarregar } from '../../hooks/useCarregar';
import CardTurma from './CardTurma';
import { carregarTurmasDoProfessor, diaDeHoje } from './dadosProfessor';

function Painel() {
  const { usuario } = useAutenticacao();
  const { dados: turmas, carregando, erro, recarregar } = useCarregar(() => carregarTurmasDoProfessor(usuario.uid), [usuario.uid]);

  const hoje = diaDeHoje();
  const turmasHoje = (turmas || []).filter((turma) => (turma.dias || []).includes(hoje) && turma.status !== 'Encerrada');
  const primeiroNome = (usuario.nome || 'Professor').split(' ')[0];

  return (
    <LayoutProfessor>
      <h1 className="mb-4" style={{ color: TEXTO, fontSize: '1.5rem', fontWeight: 600 }}>
        Olá, {primeiroNome}! 👋
      </h1>

      <h2 className="painel-titulo" style={{ fontSize: '1.5rem' }}>Turmas de Hoje</h2>
      <p className="painel-subtitulo mb-3">Veja abaixo as turmas que você leciona hoje ({hoje.toLowerCase()}).</p>

      {carregando && <Carregando />}
      {erro && <ErroCarga onTentarDeNovo={recarregar} />}
      {turmas && (
        turmasHoje.length === 0 ? (
          <div className="painel-card">
            <Vazio texto="Você não tem aula hoje. As aulas acontecem às terças e quintas.">
              <Link to="/professor/turmas" className="painel-botao-contorno">Ver minhas turmas</Link>
            </Vazio>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {turmasHoje.map((turma) => <CardTurma key={turma.id} turma={turma} />)}
          </div>
        )
      )}
    </LayoutProfessor>
  );
}

export default Painel;
