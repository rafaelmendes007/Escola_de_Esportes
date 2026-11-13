import { useState } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import { BORDA } from '../../components/cores';
import { Carregando, ErroCarga, Vazio } from '../../components/EstadoDados';
import { useAutenticacao } from '../../hooks/useAutenticacao';
import { useCarregar } from '../../hooks/useCarregar';
import {
  atualizarUsuario, enviarEmailDeSenha, listarUsuarios, mensagemDeErro, PERFIS, removerAcesso,
} from '../../services/usuarios';
import { CabecalhoPagina, Etiqueta, Modal } from './componentes';
import ModalNovoUsuario from './ModalNovoUsuario';

// Professores e administradores com acesso ao sistema (coleção "usuarios" do Firestore)
function Usuarios() {
  const { usuario: logado } = useAutenticacao();
  const { dados: usuarios, carregando, erro, recarregar } = useCarregar(listarUsuarios);
  const [filtro, setFiltro] = useState('todos');
  const [modalAberto, setModalAberto] = useState(false);
  const [aviso, setAviso] = useState(null); // { tipo: 'sucesso' | 'erro', texto }
  const [ocupado, setOcupado] = useState(null); // uid em ação
  const [removendo, setRemovendo] = useState(null); // usuário a remover

  const usuariosVisiveis = (usuarios || []).filter((usuario) =>
    filtro === 'todos' || (filtro === 'desativados' ? usuario.ativo === false : usuario.perfil === filtro && usuario.ativo !== false)
  );

  // Roda uma ação na linha do usuário mostrando o resultado no topo
  const executar = async (uid, acao, sucesso) => {
    setOcupado(uid);
    setAviso(null);
    try {
      await acao();
      setAviso({ tipo: 'sucesso', texto: sucesso });
      recarregar();
    } catch (error) {
      console.error('Erro na ação do usuário:', error);
      setAviso({ tipo: 'erro', texto: mensagemDeErro(error) });
    } finally {
      setOcupado(null);
    }
  };

  const estiloFiltro = (ativo) => ({
    fontSize: '0.75rem',
    border: `1px solid ${ativo ? 'var(--azul)' : '#D1D5DB'}`,
    color: ativo ? 'var(--azul)' : '#374151',
    backgroundColor: ativo ? '#DBEAFE' : '#FFFFFF',
  });

  return (
    <LayoutAdmin titulo="Usuários">
      <CabecalhoPagina titulo="Usuários" subtitulo="Professores e administradores com acesso ao sistema.">
        <button type="button" className="admin-botao" onClick={() => { setAviso(null); setModalAberto(true); }}>
          <i className="bi bi-person-plus"></i> Novo usuário
        </button>
      </CabecalhoPagina>

      {aviso && (
        <div
          role="status"
          className="rounded px-3 py-2 mb-3"
          style={{ backgroundColor: aviso.tipo === 'erro' ? '#FEE2E2' : '#DCFCE7', color: aviso.tipo === 'erro' ? '#B91C1C' : '#15803D', fontSize: '0.85rem' }}
        >
          <i className={`bi ${aviso.tipo === 'erro' ? 'bi-exclamation-circle' : 'bi-check-circle-fill'} me-2`}></i>{aviso.texto}
        </div>
      )}

      <div className="painel-card p-3">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
          <h2 className="fw-semibold m-0" style={{ color: '#111827', fontSize: '0.95rem' }}>
            Total de {usuariosVisiveis.length} usuários
          </h2>
          <div className="d-flex flex-wrap gap-2">
            {[['todos', 'Todos'], ['professor', 'Professores'], ['admin', 'Administradores'], ['desativados', 'Desativados']].map(([valor, texto]) => (
              <button key={valor} type="button" className="btn btn-sm rounded-pill" style={estiloFiltro(filtro === valor)} onClick={() => setFiltro(valor)}>
                {texto}
              </button>
            ))}
          </div>
        </div>

        {carregando && <Carregando />}
        {erro && <ErroCarga onTentarDeNovo={recarregar} />}
        {usuarios && usuariosVisiveis.length === 0 && <Vazio texto="Nenhum usuário neste filtro." />}
        {usuarios && usuariosVisiveis.length > 0 && (
          <div className="table-responsive">
            <table className="admin-tabela">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Perfil</th>
                  <th>Situação</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuariosVisiveis.map((usuario) => {
                  const ehVoce = usuario.uid === logado.uid;
                  const ativo = usuario.ativo !== false;
                  const bloqueado = ehVoce || ocupado === usuario.uid;
                  return (
                    <tr key={usuario.uid} style={{ borderBottom: `1px solid ${BORDA}` }}>
                      <td>{usuario.nome}{ehVoce && <span style={{ color: '#6B7280' }}> (você)</span>}</td>
                      <td>{usuario.email}</td>
                      <td>
                        {/* Trocar o perfil; ninguém altera o próprio perfil */}
                        <select
                          className="form-select form-select-sm py-0"
                          style={{ fontSize: '0.7rem', width: '130px' }}
                          value={usuario.perfil}
                          disabled={bloqueado}
                          aria-label={`Perfil de ${usuario.nome}`}
                          onChange={(e) => executar(usuario.uid, () => atualizarUsuario(usuario.uid, { perfil: e.target.value }), `Perfil de ${usuario.nome} alterado para ${PERFIS[e.target.value]}.`)}
                        >
                          {Object.entries(PERFIS).map(([valor, texto]) => <option key={valor} value={valor}>{texto}</option>)}
                        </select>
                      </td>
                      <td><Etiqueta texto={ativo ? 'Ativo' : 'Desativado'} cor={ativo ? 'verde' : 'vermelho'} /></td>
                      <td>
                        <div className="d-flex flex-wrap gap-1">
                          <button
                            type="button"
                            className="admin-botao-contorno py-0 px-2"
                            style={{ fontSize: '0.65rem' }}
                            disabled={ocupado === usuario.uid}
                            onClick={() => executar(usuario.uid, () => enviarEmailDeSenha(usuario.email), `E-mail para criar senha enviado a ${usuario.email}.`)}
                          >
                            <i className="bi bi-envelope me-1"></i>Enviar link de senha
                          </button>
                          {!ehVoce && (
                            <button
                              type="button"
                              className="admin-botao-contorno py-0 px-2"
                              style={{ fontSize: '0.65rem', color: ativo ? '#B45309' : '#15803D', borderColor: ativo ? '#F59E0B' : '#86EFAC' }}
                              disabled={bloqueado}
                              onClick={() => executar(usuario.uid, () => atualizarUsuario(usuario.uid, { ativo: !ativo }), ativo ? `${usuario.nome} foi desativado.` : `${usuario.nome} foi reativado.`)}
                            >
                              {ativo ? 'Desativar' : 'Reativar'}
                            </button>
                          )}
                          {!ehVoce && (
                            <button
                              type="button"
                              className="admin-botao-contorno py-0 px-2"
                              style={{ fontSize: '0.65rem', color: '#DC2626', borderColor: '#F87171' }}
                              disabled={bloqueado}
                              onClick={() => setRemovendo(usuario)}
                            >
                              Remover acesso
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ModalNovoUsuario
        aberto={modalAberto}
        onFechar={() => setModalAberto(false)}
        onCriado={(email) => { setAviso({ tipo: 'sucesso', texto: `Usuário cadastrado. Enviamos para ${email} o link para criar a senha.` }); recarregar(); }}
      />

      {/* Confirmação antes de remover o acesso */}
      <Modal aberto={Boolean(removendo)} onFechar={() => setRemovendo(null)} largura="420px">
        <h2 className="fw-semibold mb-2" style={{ fontSize: '1.05rem' }}>Remover acesso?</h2>
        <p style={{ fontSize: '0.85rem', color: '#4B5563' }}>
          <strong>{removendo?.nome}</strong> deixa de entrar no sistema. Para voltar, será preciso cadastrar de novo.
          Se for só por um tempo, use <strong>Desativar</strong>.
        </p>
        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="admin-botao-contorno" onClick={() => setRemovendo(null)}>Voltar</button>
          <button
            type="button"
            className="admin-botao"
            style={{ backgroundColor: '#DC2626' }}
            onClick={() => {
              const alvo = removendo;
              setRemovendo(null);
              executar(alvo.uid, () => removerAcesso(alvo.uid), `Acesso de ${alvo.nome} removido.`);
            }}
          >
            Remover acesso
          </button>
        </div>
      </Modal>
    </LayoutAdmin>
  );
}

export default Usuarios;
