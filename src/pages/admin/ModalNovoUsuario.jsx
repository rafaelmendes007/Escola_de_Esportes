import { useState } from 'react';
import { Modal } from './componentes';
import { cadastrarUsuario } from '../../config/firebase';

const formularioVazio = { nome: '', email: '', perfil: 'Professor', senha: '', confirmarSenha: '' };

// Mesmas regras de senha da tela de redefinir senha
function senhaForte(senha) {
  return /[A-Z]/.test(senha) && /[a-z]/.test(senha) && /[0-9]/.test(senha) && senha.length >= 8;
}

const mensagensErro = {
  'auth/email-already-in-use': 'Já existe um usuário com esse email.',
  'auth/invalid-email': 'Email inválido.',
  'auth/weak-password': 'Senha muito fraca.',
  'auth/network-request-failed': 'Sem conexão. Verifique a internet e tente de novo.',
};

// Cadastro de administrador ou professor. A conta de login é criada na hora.
function ModalNovoUsuario({ aberto, onFechar, onSalvar }) {
  const [formulario, setFormulario] = useState(formularioVazio);
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  const alterar = (e) => setFormulario({ ...formulario, [e.target.name]: e.target.value });

  const fechar = () => {
    setFormulario(formularioVazio);
    setErro('');
    onFechar();
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    setErro('');

    if (!senhaForte(formulario.senha)) {
      setErro('A senha precisa ter pelo menos 8 caracteres, com letra maiúscula, minúscula e número.');
      return;
    }
    if (formulario.senha !== formulario.confirmarSenha) {
      setErro('As senhas não são iguais.');
      return;
    }

    setSalvando(true);
    try {
      const nome = formulario.nome.trim();
      const email = formulario.email.trim();
      await cadastrarUsuario(nome, email, formulario.senha);
      onSalvar({ nome, email, perfil: formulario.perfil });
      fechar();
    } catch (error) {
      setErro(mensagensErro[error.code] || 'Não foi possível cadastrar o usuário. Tente novamente.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <Modal aberto={aberto} onFechar={fechar} largura="480px">
      <form onSubmit={handleSalvar}>
        <h2 className="fw-semibold mb-1" style={{ color: '#111827', fontSize: '1.1rem' }}>Novo usuário</h2>
        <p style={{ color: '#4B5563', fontSize: '0.8rem' }}>
          Cadastre um administrador ou professor. Ele já poderá entrar no sistema com o email e a senha informados.
        </p>

        <div className="row g-3">
          <div className="col-12">
            <label className="admin-rotulo" style={{ fontSize: '0.75rem' }}>Nome completo</label>
            <input name="nome" className="form-control form-control-sm admin-campo" value={formulario.nome} onChange={alterar} required />
          </div>
          <div className="col-12 col-sm-8">
            <label className="admin-rotulo" style={{ fontSize: '0.75rem' }}>Email</label>
            <input name="email" type="email" className="form-control form-control-sm admin-campo" value={formulario.email} onChange={alterar} required />
          </div>
          <div className="col-12 col-sm-4">
            <label className="admin-rotulo" style={{ fontSize: '0.75rem' }}>Perfil</label>
            <select name="perfil" className="form-select form-select-sm admin-campo" value={formulario.perfil} onChange={alterar}>
              <option>Professor</option>
              <option>Administrador</option>
            </select>
          </div>
          <div className="col-12 col-sm-6">
            <label className="admin-rotulo" style={{ fontSize: '0.75rem' }}>Senha</label>
            <input name="senha" type="password" className="form-control form-control-sm admin-campo" value={formulario.senha} onChange={alterar} autoComplete="new-password" required />
          </div>
          <div className="col-12 col-sm-6">
            <label className="admin-rotulo" style={{ fontSize: '0.75rem' }}>Confirmar senha</label>
            <input name="confirmarSenha" type="password" className="form-control form-control-sm admin-campo" value={formulario.confirmarSenha} onChange={alterar} autoComplete="new-password" required />
          </div>
        </div>

        {erro && (
          <div className="rounded px-3 py-2 mt-3" style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', fontSize: '0.75rem' }}>
            {erro}
          </div>
        )}

        <hr className="my-4" />
        <div className="d-flex justify-content-end gap-3">
          <button type="button" className="admin-botao-contorno" onClick={fechar}>Cancelar</button>
          <button type="submit" className="admin-botao" disabled={salvando}>
            {salvando ? 'Cadastrando...' : 'Cadastrar usuário'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ModalNovoUsuario;
