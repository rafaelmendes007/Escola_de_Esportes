import { useState } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import { BORDA } from '../../components/cores';
import { CabecalhoPagina, Etiqueta, RodapeTabela } from './componentes';
import ModalNovoUsuario from './ModalNovoUsuario';
import { usuarios as usuariosIniciais, adicionarUsuario, normalizar } from './dados';
import { usePaginacao } from './usePaginacao';

function Usuarios() {
  const [modalAberto, setModalAberto] = useState(false);
  const [usuarios, setUsuarios] = useState(() => [...usuariosIniciais]);
  const [busca, setBusca] = useState('');
  const [perfil, setPerfil] = useState('Todos');

  const usuariosFiltrados = usuarios.filter((usuario) =>
    normalizar(usuario.nome + ' ' + usuario.email).includes(normalizar(busca)) &&
    (perfil === 'Todos' || usuario.perfil === perfil)
  );
  const { itensDaPagina, paginacao } = usePaginacao(usuariosFiltrados);

  const salvarUsuario = (usuario) => setUsuarios([...usuarios, adicionarUsuario(usuario)]);

  return (
    <LayoutAdmin titulo="Usuários">
      <CabecalhoPagina titulo="Usuários" subtitulo="Cadastre e veja os administradores e professores que acessam o sistema.">
        <button type="button" className="admin-botao" onClick={() => setModalAberto(true)}>
          <i className="bi bi-person-plus"></i> Novo usuário
        </button>
      </CabecalhoPagina>

      {/* Filtros */}
      <div className="painel-card row g-3 align-items-end mx-0 px-2 pb-3 mb-4">
        <div className="col-12 col-md-6">
          <label className="admin-rotulo">Nome ou email</label>
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-light"><i className="bi bi-search"></i></span>
            <input className="form-control admin-campo bg-light" placeholder="Buscar..." value={busca} onChange={(e) => setBusca(e.target.value)} />
          </div>
        </div>
        <div className="col-12 col-md-3">
          <label className="admin-rotulo">Perfil</label>
          <select className="form-select form-select-sm admin-campo" value={perfil} onChange={(e) => setPerfil(e.target.value)}>
            <option>Todos</option>
            <option>Administrador</option>
            <option>Professor</option>
          </select>
        </div>
      </div>

      <div className="painel-card p-3 d-flex flex-column" style={{ minHeight: '360px' }}>
        <h2 className="fw-semibold mb-3" style={{ color: '#111827', fontSize: '0.95rem' }}>Total de {usuariosFiltrados.length} usuários</h2>
        <div className="table-responsive">
          <table className="admin-tabela">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Perfil</th>
                <th>Cadastrado em</th>
              </tr>
            </thead>
            <tbody>
              {itensDaPagina.map((usuario) => (
                <tr key={usuario.id} style={{ borderBottom: `1px solid ${BORDA}` }}>
                  <td>{usuario.nome}</td>
                  <td>{usuario.email}</td>
                  <td><Etiqueta texto={usuario.perfil} cor={usuario.perfil === 'Administrador' ? 'roxo' : 'azul'} /></td>
                  <td>{usuario.cadastradoEm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <RodapeTabela {...paginacao} />
      </div>

      <ModalNovoUsuario aberto={modalAberto} onFechar={() => setModalAberto(false)} onSalvar={salvarUsuario} />
    </LayoutAdmin>
  );
}

export default Usuarios;
