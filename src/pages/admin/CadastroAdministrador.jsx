import { useState } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import { BORDA } from '../../components/cores';
import { CabecalhoPagina, RodapeTabela } from './componentes';
import { administradores as administradoresIniciais, adicionarAdministrador } from './dados';
import { usePaginacao } from './usePaginacao';

const formularioVazio = { nome: '', matricula: '', email: '', senha: '' };

// Mesmas regras de senha da tela de redefinir senha
function senhaForte(senha) {
  return /[A-Z]/.test(senha) && /[a-z]/.test(senha) && /[0-9]/.test(senha) && senha.length >= 8;
}

// Cadastro de administradores. A conta de login no Firebase será criada numa etapa futura.
function CadastroAdministrador() {
  const [administradores, setAdministradores] = useState(() => [...administradoresIniciais]);
  const [formulario, setFormulario] = useState(formularioVazio);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const { itensDaPagina, paginacao } = usePaginacao(administradores);

  const alterar = (e) => setFormulario({ ...formulario, [e.target.name]: e.target.value });

  const handleCadastrar = (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    const nome = formulario.nome.trim();
    const matricula = formulario.matricula.trim();
    const email = formulario.email.trim().toLowerCase();

    if (!/^\d+$/.test(matricula)) {
      setErro('A matrícula deve ter apenas números.');
      return;
    }
    if (administradores.some((admin) => admin.matricula === matricula)) {
      setErro('Já existe um administrador com essa matrícula.');
      return;
    }
    if (administradores.some((admin) => admin.email === email)) {
      setErro('Já existe um administrador com esse email.');
      return;
    }
    if (!senhaForte(formulario.senha)) {
      setErro('A senha precisa ter pelo menos 8 caracteres, com letra maiúscula, minúscula e número.');
      return;
    }

    setAdministradores([...administradores, adicionarAdministrador({ nome, matricula, email })]);
    setFormulario(formularioVazio);
    setSucesso(`Administrador cadastrado: ${nome}.`);
  };

  return (
    <LayoutAdmin titulo="Cadastrar administrador">
      <CabecalhoPagina titulo="Cadastrar administrador" subtitulo="Cadastre um novo administrador da Escola de Esportes." />

      <form className="painel-card p-3 mb-4" onSubmit={handleCadastrar}>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label className="admin-rotulo" htmlFor="nome">Nome completo</label>
            <input id="nome" name="nome" className="form-control form-control-sm admin-campo" value={formulario.nome} onChange={alterar} required />
          </div>
          <div className="col-12 col-md-6">
            <label className="admin-rotulo" htmlFor="matricula">Matrícula</label>
            <input id="matricula" name="matricula" inputMode="numeric" className="form-control form-control-sm admin-campo" value={formulario.matricula} onChange={alterar} required />
          </div>
          <div className="col-12 col-md-6">
            <label className="admin-rotulo" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" className="form-control form-control-sm admin-campo" value={formulario.email} onChange={alterar} required />
          </div>
          <div className="col-12 col-md-6">
            <label className="admin-rotulo" htmlFor="senha">Senha</label>
            <input id="senha" name="senha" type="password" autoComplete="new-password" className="form-control form-control-sm admin-campo" value={formulario.senha} onChange={alterar} required />
          </div>
        </div>

        {erro && (
          <div className="rounded px-3 py-2 mt-3" style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', fontSize: '0.75rem' }}>
            {erro}
          </div>
        )}
        {sucesso && (
          <div className="rounded px-3 py-2 mt-3" style={{ backgroundColor: '#DCFCE7', color: '#15803D', fontSize: '0.75rem' }}>
            {sucesso}
          </div>
        )}

        <div className="d-flex justify-content-end mt-3">
          <button type="submit" className="admin-botao">
            <i className="bi bi-person-plus"></i> Cadastrar administrador
          </button>
        </div>
      </form>

      <div className="painel-card p-3 d-flex flex-column">
        <h2 className="fw-semibold mb-3" style={{ color: '#111827', fontSize: '0.95rem' }}>
          Administradores cadastrados ({administradores.length})
        </h2>
        <div className="table-responsive">
          <table className="admin-tabela">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Matrícula</th>
                <th>Email</th>
                <th>Cadastrado em</th>
              </tr>
            </thead>
            <tbody>
              {itensDaPagina.map((admin) => (
                <tr key={admin.id} style={{ borderBottom: `1px solid ${BORDA}` }}>
                  <td>{admin.nome}</td>
                  <td>{admin.matricula}</td>
                  <td>{admin.email}</td>
                  <td>{admin.cadastradoEm}</td>
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

export default CadastroAdministrador;
