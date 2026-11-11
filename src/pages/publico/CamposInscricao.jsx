// Campos reaproveitados no formulário de inscrição.
// Todos recebem os dados do formulário (dados) e o handleInputChange da tela (onChange).

// Rótulo com asterisco vermelho quando o campo é obrigatório
function Rotulo({ texto, obrigatorio, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className={`label-campo ${obrigatorio ? 'label-obrigatorio' : ''}`}>
      {texto}
    </label>
  );
}

// Campo extra que aparece quando a resposta pede detalhe ("Outro" ou "Sim")
function CampoDetalhe({ nome, dados, onChange, placeholder }) {
  return (
    <input
      type="text"
      name={nome}
      value={dados[nome] || ''}
      onChange={onChange}
      placeholder={placeholder}
      className="campo-input mt-2"
    />
  );
}

// Campo de texto simples. "dica" aparece em cinza embaixo do campo.
export function CampoTexto({ rotulo, obrigatorio, nome, dados, onChange, placeholder, tipo = 'text', dica, inteiro }) {
  return (
    <div className={`caixa-grupo-campos ${inteiro ? 'campo-inteiro' : ''}`}>
      <Rotulo texto={rotulo} obrigatorio={obrigatorio} htmlFor={nome} />
      <input
        id={nome}
        type={tipo}
        name={nome}
        value={dados[nome]}
        onChange={onChange}
        placeholder={placeholder}
        className="campo-input"
      />
      {dica && <div className="dica-campo">{dica}</div>}
    </div>
  );
}

// Lista suspensa com "Selecione" no começo. Se a opção "Outro" for escolhida, abre um campo para escrever.
export function CampoSelect({ rotulo, obrigatorio, nome, opcoes, dados, onChange, placeholderOutro = 'Qual?' }) {
  return (
    <div className="caixa-grupo-campos">
      <Rotulo texto={rotulo} obrigatorio={obrigatorio} htmlFor={nome} />
      <select id={nome} name={nome} value={dados[nome]} onChange={onChange} className="campo-select">
        <option value="">Selecione</option>
        {opcoes.map((opcao) => (
          <option key={opcao} value={opcao}>{opcao}</option>
        ))}
      </select>
      {dados[nome] === 'Outro' && (
        <CampoDetalhe nome={`${nome}Outro`} dados={dados} onChange={onChange} placeholder={placeholderOutro} />
      )}
    </div>
  );
}

// Pergunta de Sim/Não. Se a resposta for "Sim", abre o campo "Qual?".
export function CampoSimNao({ rotulo, nome, dados, onChange, rotuloQual = 'Qual?' }) {
  return (
    <div className="caixa-grupo-campos">
      <Rotulo texto={rotulo} obrigatorio htmlFor={nome} />
      <select id={nome} name={nome} value={dados[nome]} onChange={onChange} className="campo-select">
        <option value="">Selecione</option>
        <option value="Não">Não</option>
        <option value="Sim">Sim</option>
      </select>
      {dados[nome] === 'Sim' && (
        <CampoDetalhe nome={`${nome}Qual`} dados={dados} onChange={onChange} placeholder={rotuloQual} />
      )}
    </div>
  );
}
