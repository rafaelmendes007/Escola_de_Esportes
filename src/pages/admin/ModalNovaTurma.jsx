import { useState } from 'react';
import { useCarregar } from '../../hooks/useCarregar';
import { MODALIDADES, STATUS_TURMA, salvarTurma } from '../../services/turmas';
import { listarUsuarios } from '../../services/usuarios';
import { Modal } from './componentes';

// As aulas da Escola de Esportes acontecem só às terças e quintas
const DIAS = ['Terça', 'Quinta'];

const turmaVazia = {
  modalidade: '', nome: '', sexo: 'Misto', capacidade: '', idadeMinima: '', idadeMaxima: '',
  professorId: '', dias: ['Terça', 'Quinta'], horarioInicio: '', horarioFim: '', local: '', status: 'Ativa',
};

// Campos calculados na tela que não são gravados no banco
const CAMPOS_CALCULADOS = ['id', 'ocupadas', 'disponiveis', 'listaEspera', 'fila', 'criadoEm', 'atualizadoEm'];

// Campo com rótulo e asterisco de obrigatório
function Campo({ rotulo, children }) {
  return (
    <div className="col-12 col-sm-6">
      <label className="admin-rotulo" style={{ fontSize: '0.75rem' }}>
        {rotulo} <span style={{ color: '#DC2626' }}>*</span>
      </label>
      {children}
    </div>
  );
}

// Formulário da turma. Recebe "turma" para editar; sem ela, cadastra uma nova.
function FormularioTurma({ turma, onFechar, onSalvo }) {
  const [dados, setDados] = useState(() => ({ ...turmaVazia, ...turma }));
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');
  const { dados: usuarios } = useCarregar(listarUsuarios);
  const professores = (usuarios || []).filter((usuario) => usuario.perfil === 'professor');

  const alterar = (e) => setDados({ ...dados, [e.target.name]: e.target.value });
  const alternarDia = (dia) => {
    setDados({ ...dados, dias: dados.dias.includes(dia) ? dados.dias.filter((d) => d !== dia) : [...dados.dias, dia] });
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    if (dados.dias.length === 0) return setErro('Escolha pelo menos um dia da semana.');
    if (Number(dados.idadeMinima) > Number(dados.idadeMaxima)) return setErro('A idade mínima não pode ser maior que a máxima.');
    if (dados.horarioInicio >= dados.horarioFim) return setErro('O horário de término precisa ser depois do início.');

    const professor = professores.find((p) => p.uid === dados.professorId);
    const campos = Object.fromEntries(Object.entries(dados).filter(([campo]) => !CAMPOS_CALCULADOS.includes(campo)));

    setSalvando(true);
    setErro('');
    try {
      await salvarTurma({
        ...campos,
        capacidade: Number(dados.capacidade),
        idadeMinima: Number(dados.idadeMinima),
        idadeMaxima: Number(dados.idadeMaxima),
        professorNome: professor?.nome || '',
        // "Lotada" é calculado pela ocupação; no banco fica "Ativa"
        status: dados.status === 'Lotada' ? 'Ativa' : dados.status,
      }, turma?.id);
      onSalvo();
    } catch (error) {
      console.error('Erro ao salvar turma:', error);
      setErro('Não foi possível salvar a turma. Tente de novo.');
      setSalvando(false);
    }
  };

  return (
    <form onSubmit={handleSalvar}>
      <h2 className="fw-semibold mb-1" style={{ color: '#111827', fontSize: '1.1rem' }}>{turma ? 'Editar turma' : 'Nova turma'}</h2>
      <p style={{ color: '#4B5563', fontSize: '0.8rem' }}>
        {turma ? 'Altere os dados da turma.' : 'Cadastre uma nova turma para a Escola de Esportes.'}
      </p>

      <div className="row g-3">
        <Campo rotulo="Modalidade">
          <select name="modalidade" className="form-select form-select-sm admin-campo" value={dados.modalidade} onChange={alterar} required>
            <option value="">Selecione</option>
            {MODALIDADES.map((modalidade) => <option key={modalidade}>{modalidade}</option>)}
          </select>
        </Campo>
        <Campo rotulo="Nome da turma">
          <input name="nome" className="form-control form-control-sm admin-campo" placeholder="Ex.: Turma 1" value={dados.nome} onChange={alterar} required />
        </Campo>
        <Campo rotulo="Sexo da turma">
          <select name="sexo" className="form-select form-select-sm admin-campo" value={dados.sexo} onChange={alterar}>
            <option>Misto</option>
            <option>Masculino</option>
            <option>Feminino</option>
          </select>
        </Campo>
        <Campo rotulo="Capacidade">
          <input name="capacidade" type="number" min="1" className="form-control form-control-sm admin-campo" value={dados.capacidade} onChange={alterar} required />
        </Campo>
        <Campo rotulo="Idade mínima">
          <input name="idadeMinima" type="number" min="3" max="20" className="form-control form-control-sm admin-campo" value={dados.idadeMinima} onChange={alterar} required />
        </Campo>
        <Campo rotulo="Idade máxima">
          <input name="idadeMaxima" type="number" min="3" max="20" className="form-control form-control-sm admin-campo" value={dados.idadeMaxima} onChange={alterar} required />
        </Campo>
        <Campo rotulo="Professor responsável">
          <select name="professorId" className="form-select form-select-sm admin-campo" value={dados.professorId} onChange={alterar} required>
            <option value="">{usuarios ? 'Selecione' : 'Carregando...'}</option>
            {professores.map((professor) => <option key={professor.uid} value={professor.uid}>{professor.nome}</option>)}
          </select>
          {usuarios && professores.length === 0 && (
            <div style={{ fontSize: '0.7rem', color: '#A16207' }}>Cadastre um professor em Usuários primeiro.</div>
          )}
        </Campo>
        <Campo rotulo="Dias da semana">
          <div className="d-flex gap-3 pt-1">
            {DIAS.map((dia) => (
              <label key={dia} className="d-flex align-items-center gap-1" style={{ fontSize: '0.8rem' }}>
                <input type="checkbox" className="form-check-input mt-0" checked={dados.dias.includes(dia)} onChange={() => alternarDia(dia)} />
                {dia}
              </label>
            ))}
          </div>
        </Campo>
        <Campo rotulo="Horário de início">
          <input name="horarioInicio" type="time" className="form-control form-control-sm admin-campo" value={dados.horarioInicio} onChange={alterar} required />
        </Campo>
        <Campo rotulo="Horário de término">
          <input name="horarioFim" type="time" className="form-control form-control-sm admin-campo" value={dados.horarioFim} onChange={alterar} required />
        </Campo>
        <Campo rotulo="Local">
          <input name="local" className="form-control form-control-sm admin-campo" placeholder="Ex.: Quadra A" value={dados.local} onChange={alterar} required />
        </Campo>
        <Campo rotulo="Status da turma">
          <select name="status" className="form-select form-select-sm admin-campo" value={dados.status === 'Lotada' ? 'Ativa' : dados.status} onChange={alterar}>
            {STATUS_TURMA.filter((status) => status !== 'Lotada').map((status) => <option key={status}>{status}</option>)}
          </select>
        </Campo>
      </div>

      {erro && <div className="mt-3" style={{ color: '#B91C1C', fontSize: '0.8rem' }}>{erro}</div>}
      <hr className="my-4" />
      <div className="d-flex justify-content-end gap-3">
        <button type="button" className="admin-botao-contorno" onClick={onFechar} disabled={salvando}>Cancelar</button>
        <button type="submit" className="admin-botao" disabled={salvando}>{salvando ? 'Salvando...' : 'Salvar turma'}</button>
      </div>
    </form>
  );
}

// O formulário só monta quando o modal abre, então sempre começa com os dados atuais da turma
function ModalNovaTurma({ aberto, onFechar, onSalvo, turma }) {
  return (
    <Modal aberto={aberto} onFechar={onFechar} largura="560px">
      {aberto && <FormularioTurma turma={turma} onFechar={onFechar} onSalvo={() => { onSalvo?.(); onFechar(); }} />}
    </Modal>
  );
}

export default ModalNovaTurma;
