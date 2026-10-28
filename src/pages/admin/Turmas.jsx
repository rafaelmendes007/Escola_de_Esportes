import { useState } from 'react';
import { Link } from 'react-router-dom';
import LayoutAdmin from '../../components/LayoutAdmin';
import { BORDA } from '../../components/cores';
import { CabecalhoPagina, Etiqueta, RodapeTabela } from './componentes';
import ModalNovaTurma from './ModalNovaTurma';
import { turmas as turmasIniciais, adicionarTurma, normalizar } from './dados';
import { usePaginacao } from './usePaginacao';

const filtrosVazios = { busca: '', modalidade: 'Todas', faixa: 'Todas', status: 'Todos' };

function Turmas() {
  const [modalAberto, setModalAberto] = useState(false);
  const [turmas, setTurmas] = useState(() => [...turmasIniciais]);
  // Filtros digitados e filtros aplicados (só valem depois de clicar em Filtrar)
  const [filtros, setFiltros] = useState(filtrosVazios);
  const [aplicados, setAplicados] = useState(filtrosVazios);

  const alterar = (e) => setFiltros({ ...filtros, [e.target.name]: e.target.value });

  // Turma nova entra na tabela; os filtros são limpos para ela aparecer
  const salvarTurma = (turma) => {
    setTurmas([...turmas, adicionarTurma(turma)]);
    setFiltros(filtrosVazios);
    setAplicados(filtrosVazios);
  };

  const turmasFiltradas = turmas.filter((turma) =>
    normalizar(turma.modalidade + ' ' + turma.nome).includes(normalizar(aplicados.busca)) &&
    (aplicados.modalidade === 'Todas' || turma.modalidade.startsWith(aplicados.modalidade)) &&
    (aplicados.faixa === 'Todas' || turma.faixaEtaria === aplicados.faixa) &&
    (aplicados.status === 'Todos' || turma.status === aplicados.status)
  );
  const { itensDaPagina, paginacao } = usePaginacao(turmasFiltradas);

  return (
    <LayoutAdmin titulo="Turmas">
      <CabecalhoPagina titulo="Turmas" subtitulo="Visualize e gerencie todas as turmas da Escola de Esportes.">
        <button type="button" className="admin-botao" onClick={() => setModalAberto(true)}>
          <i className="bi bi-plus-lg"></i> Nova turma
        </button>
      </CabecalhoPagina>

      {/* Filtros */}
      <form
        className="painel-card row g-3 align-items-end mx-0 px-2 pb-3 mb-4"
        onSubmit={(e) => { e.preventDefault(); setAplicados(filtros); }}
      >
        <div className="col-12 col-md-3">
          <label className="admin-rotulo">Nome da turma</label>
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-light"><i className="bi bi-search"></i></span>
            <input name="busca" className="form-control admin-campo bg-light" placeholder="Buscar por nome..." value={filtros.busca} onChange={alterar} />
          </div>
        </div>
        <div className="col-6 col-md-2">
          <label className="admin-rotulo">Modalidade</label>
          <select name="modalidade" className="form-select form-select-sm admin-campo" value={filtros.modalidade} onChange={alterar}>
            <option>Todas</option>
            <option>Atletismo</option>
            <option>Futsal</option>
            <option>Lutas</option>
            <option>Voleibol</option>
          </select>
        </div>
        <div className="col-6 col-md-2">
          <label className="admin-rotulo">Faixa etária</label>
          <select name="faixa" className="form-select form-select-sm admin-campo" value={filtros.faixa} onChange={alterar}>
            <option>Todas</option>
            {[...new Set(turmas.map((t) => t.faixaEtaria))].map((faixa) => <option key={faixa}>{faixa}</option>)}
          </select>
        </div>
        <div className="col-6 col-md-2">
          <label className="admin-rotulo">Status</label>
          <select name="status" className="form-select form-select-sm admin-campo" value={filtros.status} onChange={alterar}>
            <option>Todos</option>
            <option>Ativa</option>
            <option>Lotada</option>
          </select>
        </div>
        <div className="col-6 col-md-2 ms-auto">
          <button type="submit" className="admin-botao-filtrar">Filtrar</button>
        </div>
      </form>

      <div className="painel-card p-3 d-flex flex-column" style={{ minHeight: '360px' }}>
        <h2 className="fw-semibold mb-3" style={{ color: '#111827', fontSize: '0.95rem' }}>Total de {turmasFiltradas.length} turmas</h2>
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
              {itensDaPagina.map((turma) => (
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
        <RodapeTabela {...paginacao} />
      </div>

      <ModalNovaTurma aberto={modalAberto} onFechar={() => setModalAberto(false)} onSalvar={salvarTurma} />
    </LayoutAdmin>
  );
}

export default Turmas;
