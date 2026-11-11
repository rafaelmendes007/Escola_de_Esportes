import { useState } from 'react';
import { Modal } from './componentes';
import { criarUsuario, mensagemDeErro } from '../../services/usuarios';

const formularioVazio = { nome: '', email: '', senha: '', perfil: 'professor' };

// Cadastro de professor ou administrador no Firebase (conta + perfil)
function ModalNovoUsuario({ aberto, onFechar, onCriado }) {
  const [formulario, setFormulario] = useState(formularioVazio);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  const alterar = (e) => setFormulario({ ...formulario, [e.target.name]: e.target.value });

  const fechar = () => {
    setFormulario(formularioVazio);
    setErro('');
    onFechar();
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    setErro('');
    setSalvando(true);
    try {
      await criarUsuario({ ...formulario, nome: formulario.nome.trim(), email: formulario.email.trim() });
      onCriado();
      fechar();
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      setErro(mensagemDeErro(error));
    } finally {
      setSalvando(false);
    }
  };

  return (
    <Modal aberto={aberto} onFechar={fechar} largura="480px">
      <form onSubmit={handleSalvar}>
        <h2 className="fw-semibold mb-1" style={{ color: '#111827', fontSize: '1.1rem' }}>Novo usuário</h2>
        <p style={{ color: '#4B5563', fontSize: '0.8rem' }}>Cadastre um professor ou administrador com acesso ao sistema.</p>

        <label className="admin-rotulo" htmlFor="usuario-perfil" style={{ fontSize: '0.75rem' }}>Perfil <span style={{ color: '#DC2626' }}>*</span></label>
        <select id="usuario-perfil" name="perfil" className="form-select form-select-sm admin-campo mb-3" value={formulario.perfil} onChange={alterar}>
          <option value="professor">Professor</option>
          <option value="admin">Administrador</option>
        </select>

        <label className="admin-rotulo" htmlFor="usuario-nome" style={{ fontSize: '0.75rem' }}>Nome completo <span style={{ color: '#DC2626' }}>*</span></label>
        <input id="usuario-nome" name="nome" className="form-control form-control-sm admin-campo mb-3" value={formulario.nome} onChange={alterar} required />

        <label className="admin-rotulo" htmlFor="usuario-email" style={{ fontSize: '0.75rem' }}>E-mail <span style={{ color: '#DC2626' }}>*</span></label>
        <input id="usuario-email" name="email" type="email" className="form-control form-control-sm admin-campo mb-3" placeholder="Ex.: colaborador@unifor.br" value={formulario.email} onChange={alterar} required />

        <label className="admin-rotulo" htmlFor="usuario-senha" style={{ fontSize: '0.75rem' }}>Senha provisória <span style={{ color: '#DC2626' }}>*</span></label>
        <input id="usuario-senha" name="senha" type="text" minLength={6} className="form-control form-control-sm admin-campo" value={formulario.senha} onChange={alterar} required />
        <div className="mb-3" style={{ fontSize: '0.7rem', color: '#6B7280' }}>
          Mínimo de 6 caracteres. A pessoa pode trocar depois em "Esqueceu sua senha?" na tela de login.
        </div>

        {erro && (
          <div className="rounded px-3 py-2 mb-3" style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', fontSize: '0.8rem' }}>
            <i className="bi bi-exclamation-circle me-1"></i>{erro}
          </div>
        )}

        <div className="d-flex justify-content-end gap-3">
          <button type="button" className="admin-botao-contorno" onClick={fechar} disabled={salvando}>Cancelar</button>
          <button type="submit" className="admin-botao" disabled={salvando}>
            {salvando ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ModalNovoUsuario;
