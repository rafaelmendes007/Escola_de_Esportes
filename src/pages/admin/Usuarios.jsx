import { useEffect, useState } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import { BORDA } from '../../components/cores';
import { CabecalhoPagina, Etiqueta } from './componentes';
import ModalNovoUsuario from './ModalNovoUsuario';
import { listarUsuarios, mensagemDeErro, PERFIS } from '../../services/usuarios';

// Professores e administradores com acesso ao sistema (coleção "usuarios" do Firestore)
function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [filtro, setFiltro] = useState('todos');
  const [modalAberto, setModalAberto] = useState(false);
  const [aviso, setAviso] = useState('');
  // Muda a cada cadastro para buscar a lista de novo
  const [versao, setVersao] = useState(0);

  useEffect(() => {
    let ativo = true;
    listarUsuarios()
      .then((lista) => ativo && setUsuarios(lista))
      .catch((error) => {
        console.error('Erro ao listar usuários:', error);
        if (ativo) setErro(mensagemDeErro(error));
      })
      .finally(() => ativo && setCarregando(false));
    return () => { ativo = false; };
  }, [versao]);

  const usuariosVisiveis = filtro === 'todos' ? usuarios : usuarios.filter((usuario) => usuario.perfil === filtro);

  const handleCriado = () => {
    setAviso('Usuário cadastrado com sucesso.');
    setVersao(versao + 1);
  };

  const estiloFiltro = (ativo) => ({
    fontSize: '0.75rem',
    border: `1px solid ${ativo ? '#0B6BC2' : '#D1D5DB'}`,
    color: ativo ? '#0B6BC2' : '#374151',
    backgroundColor: ativo ? '#DBEAFE' : '#FFFFFF',
  });

  return (
    <LayoutAdmin titulo="Usuários">
      <CabecalhoPagina titulo="Usuários" subtitulo="Professores e administradores com acesso ao sistema.">
        <button type="button" className="admin-botao" onClick={() => { setAviso(''); setModalAberto(true); }}>
          <i className="bi bi-person-plus"></i> Novo usuário
        </button>
      </CabecalhoPagina>

      {aviso && (
        <div className="rounded px-3 py-2 mb-3" style={{ backgroundColor: '#DCFCE7', color: '#15803D', fontSize: '0.85rem' }}>
          <i className="bi bi-check-circle-fill me-2"></i>{aviso}
        </div>
      )}

      <div className="painel-card p-3">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
          <h2 className="fw-semibold m-0" style={{ color: '#111827', fontSize: '0.95rem' }}>
            Total de {usuariosVisiveis.length} usuários
          </h2>
          <div className="d-flex gap-2">
            {[['todos', 'Todos'], ['professor', 'Professores'], ['admin', 'Administradores']].map(([valor, texto]) => (
              <button key={valor} type="button" className="btn btn-sm rounded-pill" style={estiloFiltro(filtro === valor)} onClick={() => setFiltro(valor)}>
                {texto}
              </button>
            ))}
          </div>
        </div>

        {carregando && <div className="text-center py-4"><div className="spinner-border spinner-border-sm" role="status"></div></div>}

        {!carregando && erro && (
          <div className="rounded px-3 py-2" style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', fontSize: '0.8rem' }}>{erro}</div>
        )}

        {!carregando && !erro && (
          <div className="table-responsive">
            <table className="admin-tabela">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Perfil</th>
                </tr>
              </thead>
              <tbody>
                {usuariosVisiveis.map((usuario) => (
                  <tr key={usuario.uid} style={{ borderBottom: `1px solid ${BORDA}` }}>
                    <td>{usuario.nome}</td>
                    <td>{usuario.email}</td>
                    <td><Etiqueta texto={PERFIS[usuario.perfil] || usuario.perfil} cor={usuario.perfil === 'admin' ? 'roxo' : 'azul'} /></td>
                  </tr>
                ))}
                {usuariosVisiveis.length === 0 && (
                  <tr><td colSpan="3" className="text-center py-4" style={{ color: '#6B7280' }}>Nenhum usuário cadastrado.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ModalNovoUsuario aberto={modalAberto} onFechar={() => setModalAberto(false)} onCriado={handleCriado} />
    </LayoutAdmin>
  );
}

export default Usuarios;
