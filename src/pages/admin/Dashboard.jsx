import { Link } from 'react-router-dom';
import LayoutAdmin from '../../components/LayoutAdmin';
import { AZUL_ADMIN, BORDA } from '../../components/cores';
import { Carregando, ErroCarga, Vazio } from '../../components/EstadoDados';
import { useAuth } from '../../context/AuthContext';
import { useCarregar } from '../../hooks/useCarregar';
import { faixaEtaria } from '../../services/turmas';
import { Etiqueta } from './componentes';
import { carregarTurmasComContagens } from './dadosTurmas';

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

const corDoStatus = { Ativa: 'verde', Lotada: 'vermelho', Encerrada: 'azul' };

function Dashboard() {
  const { usuario } = useAuth();
  const { dados, carregando, erro, recarregar } = useCarregar(carregarTurmasComContagens);

  const emAndamento = (dados?.turmas || []).filter((turma) => turma.status !== 'Encerrada');
  const alunosAtivos = (dados?.alunos || []).filter((aluno) => aluno.status === 'Ativo').length;
  const naFila = (dados?.inscricoes || []).filter((inscricao) => inscricao.status === 'Aguardando vaga').length;

  return (
    <LayoutAdmin>
      <div className="mb-4">
        <h1 className="fw-semibold m-0" style={{ color: '#111827', fontSize: '1.6rem' }}>Olá, {(usuario.nome || 'Administrador').split(' ')[0]}!</h1>
        <p className="admin-subtitulo">Veja o resumo atual da Escola de Esporte.</p>
      </div>

      {carregando && <Carregando />}
      {erro && <ErroCarga onTentarDeNovo={recarregar} />}
      {dados && (
        <>
          <div className="row g-3 mb-4">
            <div className="col-12 col-md-4">
              <CardResumo icone="bi-people" cor={AZUL_ADMIN} fundoIcone="#C9DDF0" rotulo="Turmas em andamento" valor={emAndamento.length} link="/admin/turmas" textoLink="Ver turmas" />
            </div>
            <div className="col-12 col-md-4">
              <CardResumo icone="bi-person" cor="#16A34A" fundoIcone="#D7F5D7" rotulo="Alunos ativos" valor={alunosAtivos} link="/admin/alunos" textoLink="Ver alunos" />
            </div>
            <div className="col-12 col-md-4">
              <CardResumo icone="bi-list-ul" cor="#CA8A04" fundoIcone="#FBF6C4" rotulo="Aguardando vaga" valor={naFila} link="/admin/lista-espera" textoLink="Ver lista de espera" />
            </div>
          </div>

          <div className="painel-card p-3" style={{ minHeight: '300px' }}>
            <h2 className="fw-semibold mb-3" style={{ color: '#111827', fontSize: '1rem' }}>Turmas em andamento</h2>
            {emAndamento.length === 0 ? (
              <Vazio texto="Nenhuma turma cadastrada ainda.">
                <Link to="/admin/turmas" className="admin-botao">Cadastrar turma</Link>
              </Vazio>
            ) : (
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
                    {emAndamento.map((turma) => (
                      <tr key={turma.id} style={{ borderBottom: `1px solid ${BORDA}` }}>
                        <td>{turma.modalidade}</td>
                        <td>{turma.nome}</td>
                        <td>{faixaEtaria(turma)}</td>
                        <td className="text-center">{turma.capacidade}</td>
                        <td className="text-center">{turma.ocupadas}</td>
                        <td className="text-center">{turma.disponiveis}</td>
                        <td className="text-center">{turma.listaEspera}</td>
                        <td><Etiqueta texto={turma.status} cor={corDoStatus[turma.status]} /></td>
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
            )}
          </div>
        </>
      )}
    </LayoutAdmin>
  );
}

export default Dashboard;
