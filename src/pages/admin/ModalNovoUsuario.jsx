import { useState } from 'react';
import { Modal } from './componentes';
import { criarUsuario, mensagemDeErro } from '../../services/usuarios';

const formularioVazio = { nome: '', email: '', perfil: 'professor' };

// Cadastro de professor ou administrador. A pessoa recebe um e-mail para criar a própria senha.
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
      const email = formulario.email.trim();
      await criarUsuario({ ...formulario, nome: formulario.nome.trim(), email });
      onCriado(email);
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
        <input id="usuario-nome" name="nome" className="form-control form-control-sm admin-campo mb-3" value={formulario.nome} onChange={alterar} required maxLength={120} />

        <label className="admin-rotulo" htmlFor="usuario-email" style={{ fontSize: '0.75rem' }}>E-mail <span style={{ color: '#DC2626' }}>*</span></label>
        <input id="usuario-email" name="email" type="email" className="form-control form-control-sm admin-campo" placeholder="Ex.: colaborador@unifor.br" value={formulario.email} onChange={alterar} required />
        <div className="mb-3 mt-1" style={{ fontSize: '0.7rem', color: '#6B7280' }}>
          A pessoa recebe neste e-mail um link para criar a própria senha. Use um e-mail que ela acessa.
        </div>

        {erro && (
          <div className="rounded px-3 py-2 mb-3" role="alert" style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', fontSize: '0.8rem' }}>
            <i className="bi bi-exclamation-circle me-1"></i>{erro}
          </div>
        )}

        <div className="d-flex justify-content-end gap-3">
          <button type="button" className="admin-botao-contorno" onClick={fechar} disabled={salvando}>Cancelar</button>
          <button type="submit" className="admin-botao" disabled={salvando}>
            {salvando ? 'Cadastrando...' : 'Cadastrar e enviar convite'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ModalNovoUsuario;
