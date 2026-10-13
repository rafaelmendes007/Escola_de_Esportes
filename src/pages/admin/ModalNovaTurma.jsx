import { useState } from 'react';
import { Modal } from './componentes';

const DIAS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

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

// Cadastro (ou edição) de turma. Usado em Turmas e em Detalhes da turma.
function ModalNovaTurma({ aberto, onFechar, editar = false }) {
  const [dias, setDias] = useState(['Terça', 'Quinta']);

  const alternarDia = (dia) => {
    setDias(dias.includes(dia) ? dias.filter((d) => d !== dia) : [...dias, dia]);
  };

  const handleSalvar = (e) => {
    e.preventDefault();
    // Aqui você faria a chamada da API para salvar a turma
    onFechar();
  };

  return (
    <Modal aberto={aberto} onFechar={onFechar} largura="560px">
      <form onSubmit={handleSalvar}>
        <h2 className="fw-semibold mb-1" style={{ color: '#111827', fontSize: '1.1rem' }}>{editar ? 'Editar turma' : 'Nova turma'}</h2>
        <p style={{ color: '#4B5563', fontSize: '0.8rem' }}>
          {editar ? 'Altere os dados da turma.' : 'Cadastre uma nova turma para a Escola de Esportes.'}
        </p>

        <div className="row g-3">
          <Campo rotulo="Modalidade">
            <select className="form-select form-select-sm admin-campo" defaultValue="Voleibol">
              <option>Voleibol</option>
              <option>Futsal</option>
              <option>Atletismo</option>
              <option>Lutas</option>
              <option>Handebol</option>
            </select>
          </Campo>
          <Campo rotulo="Nome da turma">
            <input className="form-control form-control-sm admin-campo" defaultValue="Turma 3" required />
          </Campo>
          <Campo rotulo="Sexo da turma">
            <select className="form-select form-select-sm admin-campo" defaultValue="Misto">
              <option>Misto</option>
              <option>Masculino</option>
              <option>Feminino</option>
            </select>
          </Campo>
          <Campo rotulo="Capacidade">
            <input type="number" min="1" className="form-control form-control-sm admin-campo" defaultValue="26" required />
          </Campo>
          <Campo rotulo="Faixa etária máxima">
            <input type="number" min="1" className="form-control form-control-sm admin-campo" defaultValue="13" required />
          </Campo>
          <Campo rotulo="Faixa etária mínima">
            <input type="number" min="1" className="form-control form-control-sm admin-campo" defaultValue="10" required />
          </Campo>
          <Campo rotulo="Professor responsável">
            <select className="form-select form-select-sm admin-campo" defaultValue="Luís Marcelo">
              <option>Luís Marcelo</option>
              <option>Vinícius Aguiar</option>
              <option>Claudia</option>
              <option>Karine</option>
            </select>
          </Campo>
          <Campo rotulo="Dias da semana">
            {/* Dias escolhidos aparecem como etiquetas; clique para marcar/desmarcar */}
            <div className="d-flex flex-wrap gap-1">
              {DIAS.map((dia) => (
                <button
                  key={dia}
                  type="button"
                  onClick={() => alternarDia(dia)}
                  className="rounded-pill px-2"
                  style={{
                    fontSize: '0.7rem',
                    border: '1px solid #D1D5DB',
                    color: dias.includes(dia) ? '#FFFFFF' : '#374151',
                    backgroundColor: dias.includes(dia) ? '#0B6BC2' : '#F3F4F6',
                  }}
                >
                  {dia}
                </button>
              ))}
            </div>
          </Campo>
          <Campo rotulo="Horário de início">
            <input type="time" className="form-control form-control-sm admin-campo" defaultValue="17:30" required />
          </Campo>
          <Campo rotulo="Horário de término">
            <input type="time" className="form-control form-control-sm admin-campo" defaultValue="18:30" required />
          </Campo>
          <Campo rotulo="Local">
            <select className="form-select form-select-sm admin-campo" defaultValue="Quadra C">
              <option>Quadra A</option>
              <option>Quadra B</option>
              <option>Quadra C</option>
              <option>Ginásio principal</option>
            </select>
          </Campo>
          <Campo rotulo="Status da turma">
            <select className="form-select form-select-sm admin-campo" defaultValue="Ativa">
              <option>Ativa</option>
              <option>Lotada</option>
              <option>Encerrada</option>
            </select>
          </Campo>
        </div>

        <hr className="my-4" />
        <div className="d-flex justify-content-end gap-3">
          <button type="button" className="admin-botao-contorno" onClick={onFechar}>Cancelar</button>
          <button type="submit" className="admin-botao">Salvar turma</button>
        </div>
      </form>
    </Modal>
  );
}

export default ModalNovaTurma;
