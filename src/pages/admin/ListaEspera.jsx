import { useState } from 'react';
import { Link } from 'react-router-dom';
import LayoutAdmin from '../../components/LayoutAdmin';
import { BORDA } from '../../components/cores';
import { CabecalhoPagina, Etiqueta, RodapeTabela } from './componentes';
import { listaEspera, modalidades, normalizar } from './dados';

const filtrosVazios = { busca: '', modalidade: 'Todas', faixa: 'Todas', status: 'Todos' };

// Faixas etárias do filtro: [rótulo, idade mínima, idade máxima]
const FAIXAS = [['6 a 9 anos', 6, 9], ['10 a 13 anos', 10, 13], ['14 a 17 anos', 14, 17]];

function ListaEspera() {
  const [filtros, setFiltros] = useState(filtrosVazios);
  const [aplicados, setAplicados] = useState(filtrosVazios);

  const alterar = (e) => setFiltros({ ...filtros, [e.target.name]: e.target.value });
  const faixa = FAIXAS.find(([rotulo]) => rotulo === aplicados.faixa);

  const inscricoes = listaEspera.filter((inscricao) =>
    normalizar(inscricao.nome).includes(normalizar(aplicados.busca)) &&
    (aplicados.modalidade === 'Todas' || inscricao.modalidade === aplicados.modalidade) &&
    (!faixa || (inscricao.idade >= faixa[1] && inscricao.idade <= faixa[2])) &&
    (aplicados.status === 'Todos' || inscricao.status === aplicados.status)
  );

  return (
    <LayoutAdmin titulo="Lista de espera">
      <CabecalhoPagina titulo="Lista de espera" subtitulo="Confira os alunos que aguardam vagas nas turmas." />

      {/* Filtros */}
      <form
        className="painel-card row g-3 align-items-end mx-0 px-2 pb-3 mb-4"
        onSubmit={(e) => { e.preventDefault(); setAplicados(filtros); }}
      >
        <div className="col-12 col-md-3">
          <label className="admin-rotulo">Nome do aluno</label>
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-light"><i className="bi bi-search"></i></span>
            <input name="busca" className="form-control admin-campo bg-light" placeholder="Buscar por nome..." value={filtros.busca} onChange={alterar} />
          </div>
        </div>
        <div className="col-6 col-md-2">
          <label className="admin-rotulo">Modalidade</label>
          <select name="modalidade" className="form-select form-select-sm admin-campo" value={filtros.modalidade} onChange={alterar}>
            <option>Todas</option>
            {modalidades.map((modalidade) => <option key={modalidade}>{modalidade}</option>)}
          </select>
        </div>
        <div className="col-6 col-md-2">
          <label className="admin-rotulo">Faixa etária</label>
          <select name="faixa" className="form-select form-select-sm admin-campo" value={filtros.faixa} onChange={alterar}>
            <option>Todas</option>
            {FAIXAS.map(([rotulo]) => <option key={rotulo}>{rotulo}</option>)}
          </select>
        </div>
        <div className="col-6 col-md-2">
          <label className="admin-rotulo">Status</label>
          <select name="status" className="form-select form-select-sm admin-campo" value={filtros.status} onChange={alterar}>
            <option>Todos</option>
            <option>Aguardando vaga</option>
            <option>Convocado</option>
          </select>
        </div>
        <div className="col-6 col-md-2 ms-auto">
          <button type="submit" className="admin-botao-filtrar">Filtrar</button>
        </div>
      </form>

      <div className="painel-card p-3 d-flex flex-column" style={{ minHeight: '360px' }}>
        <h2 className="fw-semibold mb-3" style={{ color: '#111827', fontSize: '0.95rem' }}>
          Total de {inscricoes.length} alunos na lista de espera
        </h2>
        <div className="table-responsive">
          <table className="admin-tabela">
            <thead>
              <tr>
                <th>Nome do aluno</th>
                <th>Idade</th>
                <th>Modalidade</th>
                <th>Turma desejada</th>
                <th>Data de inscrição</th>
                <th className="text-center">Posição</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {inscricoes.map((inscricao) => (
                <tr key={inscricao.id} style={{ borderBottom: `1px solid ${BORDA}` }}>
                  <td>{inscricao.nome}</td>
                  <td>{inscricao.idade}</td>
                  <td>{inscricao.modalidade}</td>
                  <td>{inscricao.turma}</td>
                  <td>{inscricao.dataInscricao}</td>
                  <td className="text-center">{inscricao.posicao}</td>
                  <td><Etiqueta texto={inscricao.status} /></td>
                  <td>
                    <Link to={`/admin/lista-espera/${inscricao.id}`} className="admin-link">
                      Ver detalhes <i className="bi bi-chevron-right"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <RodapeTabela paginas={4} />
      </div>
    </LayoutAdmin>
  );
}

export default ListaEspera;
