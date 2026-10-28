import { useState } from 'react';
import { Link } from 'react-router-dom';
import LayoutAdmin from '../../components/LayoutAdmin';
import { BORDA } from '../../components/cores';
import { CabecalhoPagina, Etiqueta, RodapeTabela } from './componentes';
import { alunos, modalidades, normalizar } from './dados';
import { usePaginacao } from './usePaginacao';

const filtrosVazios = { busca: '', modalidade: 'Todas', status: 'Todos' };

function Alunos() {
  const [filtros, setFiltros] = useState(filtrosVazios);
  const [aplicados, setAplicados] = useState(filtrosVazios);

  const alterar = (e) => setFiltros({ ...filtros, [e.target.name]: e.target.value });

  // Busca pelo nome ou pela matrícula (até a API ter o CPF)
  const alunosFiltrados = alunos.filter((aluno) =>
    (normalizar(aluno.nome).includes(normalizar(aplicados.busca)) || aluno.matricula.includes(aplicados.busca)) &&
    (aplicados.modalidade === 'Todas' || aluno.modalidade === aplicados.modalidade) &&
    (aplicados.status === 'Todos' || aluno.status === aplicados.status)
  );
  const { itensDaPagina, paginacao } = usePaginacao(alunosFiltrados);

  return (
    <LayoutAdmin titulo="Alunos">
      <CabecalhoPagina titulo="Alunos" subtitulo="Gerencie os alunos matriculados na escola de esportes" />

      {/* Filtros */}
      <form
        className="painel-card row g-3 align-items-end mx-0 px-2 pb-3 mb-4"
        onSubmit={(e) => { e.preventDefault(); setAplicados(filtros); }}
      >
        <div className="col-12 col-md-4">
          <label className="admin-rotulo">Buscar por nome ou CPF</label>
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-light"><i className="bi bi-search"></i></span>
            <input name="busca" className="form-control admin-campo bg-light" placeholder="Digite o nome ou CPF..." value={filtros.busca} onChange={alterar} />
          </div>
        </div>
        <div className="col-6 col-md-3">
          <label className="admin-rotulo">Modalidade</label>
          <select name="modalidade" className="form-select form-select-sm admin-campo" value={filtros.modalidade} onChange={alterar}>
            <option>Todas</option>
            {modalidades.map((modalidade) => <option key={modalidade}>{modalidade}</option>)}
          </select>
        </div>
        <div className="col-6 col-md-3">
          <label className="admin-rotulo">Status</label>
          <select name="status" className="form-select form-select-sm admin-campo" value={filtros.status} onChange={alterar}>
            <option>Todos</option>
            <option>Ativo</option>
            <option>Desistente</option>
          </select>
        </div>
        <div className="col-12 col-md-2">
          <button type="submit" className="admin-botao-filtrar">Filtrar</button>
        </div>
      </form>

      <div className="painel-card p-3 d-flex flex-column" style={{ minHeight: '360px' }}>
        <h2 className="fw-semibold mb-3" style={{ color: '#111827', fontSize: '0.95rem' }}>
          Total de {alunosFiltrados.length} alunos matriculados
        </h2>
        <div className="table-responsive">
          <table className="admin-tabela">
            <thead>
              <tr>
                <th>Nome do aluno</th>
                <th>Idade</th>
                <th>Modalidade</th>
                <th>Turma desejada</th>
                <th>Data de matrícula</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {itensDaPagina.map((aluno) => (
                <tr key={aluno.id} style={{ borderBottom: `1px solid ${BORDA}` }}>
                  <td>{aluno.nome}</td>
                  <td>{aluno.idade}</td>
                  <td>{aluno.modalidade}</td>
                  <td>{aluno.turma}</td>
                  <td>{aluno.dataMatricula}</td>
                  <td><Etiqueta texto={aluno.status} /></td>
                  <td>
                    <Link to={`/admin/alunos/${aluno.id}`} className="admin-link">
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
    </LayoutAdmin>
  );
}

export default Alunos;
