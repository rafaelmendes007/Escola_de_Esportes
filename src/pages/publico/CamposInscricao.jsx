// Campos reaproveitados no formulário de inscrição.
// Todos recebem os dados do formulário e o handleInputChange da tela.

// Grupo de opções de escolha única. Se a opção "Outro" for marcada, abre um campo para escrever.
export function CampoOpcoes({ rotulo, obrigatorio, nome, opcoes, dados, onChange, emLinha, placeholderOutro = 'Qual?' }) {
  const nomeOutro = `${nome}Outro`;

  return (
    <div className="caixa-grupo-campos">
      <label className={`label-campo ${obrigatorio ? 'label-obrigatorio' : ''}`}>{rotulo}</label>
      <div className={emLinha ? 'grupo-opcoes' : 'd-flex flex-column gap-2'}>
        {opcoes.map((opcao) => (
          <label key={opcao} className="opcao">
            <input type="radio" name={nome} value={opcao} checked={dados[nome] === opcao} onChange={onChange} />
            {opcao}
          </label>
        ))}
      </div>
      {dados[nome] === 'Outro' && (
        <input
          type="text"
          name={nomeOutro}
          value={dados[nomeOutro] || ''}
          onChange={onChange}
          placeholder={placeholderOutro}
          className="campo-input mt-2"
        />
      )}
    </div>
  );
}

// Pergunta de Sim/Não. Se a resposta for "Sim", abre o campo "Qual?".
export function CampoSimNao({ rotulo, nome, dados, onChange, rotuloQual = 'Qual?' }) {
  const nomeQual = `${nome}Qual`;

  return (
    <div className="caixa-grupo-campos">
      <label className="label-campo label-obrigatorio">{rotulo}</label>
      <div className="grupo-opcoes">
        {['Sim', 'Não'].map((opcao) => (
          <label key={opcao} className="opcao">
            <input type="radio" name={nome} value={opcao} checked={dados[nome] === opcao} onChange={onChange} />
            {opcao}
          </label>
        ))}
      </div>
      {dados[nome] === 'Sim' && (
        <input
          type="text"
          name={nomeQual}
          value={dados[nomeQual] || ''}
          onChange={onChange}
          placeholder={rotuloQual}
          className="campo-input mt-2"
        />
      )}
    </div>
  );
}

// Lista suspensa com "Selecione" no começo
export function CampoSelect({ rotulo, obrigatorio, nome, opcoes, dados, onChange }) {
  return (
    <div className="caixa-grupo-campos">
      <label className={`label-campo ${obrigatorio ? 'label-obrigatorio' : ''}`}>{rotulo}</label>
      <select name={nome} value={dados[nome]} onChange={onChange} className="campo-select">
        <option value="">Selecione</option>
        {opcoes.map((opcao) => (
          <option key={opcao} value={opcao}>{opcao}</option>
        ))}
      </select>
    </div>
  );
}
