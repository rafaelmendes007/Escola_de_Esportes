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

// Mensagem vermelha embaixo do campo com erro
function MensagemErro({ erros, nome }) {
  return erros?.[nome] ? <div className="erro-campo" role="alert">{erros[nome]}</div> : null;
}

// Classe do campo: borda vermelha quando há erro
const classeCampo = (base, erros, nome) => `${base} ${erros?.[nome] ? 'campo-com-erro' : ''}`;

// Campo extra que aparece quando a resposta pede detalhe ("Outro" ou "Sim")
function CampoDetalhe({ nome, dados, onChange, placeholder, erros }) {
  return (
    <>
      <input
        type="text"
        name={nome}
        value={dados[nome] || ''}
        onChange={onChange}
        placeholder={placeholder}
        className={classeCampo('campo-input mt-2', erros, nome)}
      />
      <MensagemErro erros={erros} nome={nome} />
    </>
  );
}

// Campo de texto simples. "dica" aparece em cinza embaixo do campo.
// "mascara" formata o valor enquanto a pessoa digita (ex.: CPF, telefone).
export function CampoTexto({ rotulo, obrigatorio, nome, dados, onChange, placeholder, tipo = 'text', dica, inteiro, erros, mascara }) {
  const handleChange = mascara
    ? (e) => onChange({ target: { name: nome, value: mascara(e.target.value) } })
    : onChange;

  return (
    <div className={`caixa-grupo-campos ${inteiro ? 'campo-inteiro' : ''}`}>
      <Rotulo texto={rotulo} obrigatorio={obrigatorio} htmlFor={nome} />
      <input
        id={nome}
        type={tipo}
        name={nome}
        value={dados[nome]}
        onChange={handleChange}
        placeholder={placeholder}
        inputMode={mascara ? 'numeric' : undefined}
        className={classeCampo('campo-input', erros, nome)}
        aria-invalid={Boolean(erros?.[nome])}
      />
      {dica && !erros?.[nome] && <div className="dica-campo">{dica}</div>}
      <MensagemErro erros={erros} nome={nome} />
    </div>
  );
}

// Lista suspensa com "Selecione" no começo. Se a opção "Outro" for escolhida, abre um campo para escrever.
export function CampoSelect({ rotulo, obrigatorio, nome, opcoes, dados, onChange, placeholderOutro = 'Qual?', erros }) {
  return (
    <div className="caixa-grupo-campos">
      <Rotulo texto={rotulo} obrigatorio={obrigatorio} htmlFor={nome} />
      <select id={nome} name={nome} value={dados[nome]} onChange={onChange} className={classeCampo('campo-select', erros, nome)} aria-invalid={Boolean(erros?.[nome])}>
        <option value="">Selecione</option>
        {opcoes.map((opcao) => (
          <option key={opcao} value={opcao}>{opcao}</option>
        ))}
      </select>
      <MensagemErro erros={erros} nome={nome} />
      {dados[nome] === 'Outro' && (
        <CampoDetalhe nome={`${nome}Outro`} dados={dados} onChange={onChange} placeholder={placeholderOutro} erros={erros} />
      )}
    </div>
  );
}

// Pergunta de Sim/Não. Se a resposta for "Sim", abre o campo "Qual?".
export function CampoSimNao({ rotulo, nome, dados, onChange, rotuloQual = 'Qual?', erros }) {
  return (
    <div className="caixa-grupo-campos">
      <Rotulo texto={rotulo} obrigatorio htmlFor={nome} />
      <select id={nome} name={nome} value={dados[nome]} onChange={onChange} className={classeCampo('campo-select', erros, nome)} aria-invalid={Boolean(erros?.[nome])}>
        <option value="">Selecione</option>
        <option value="Não">Não</option>
        <option value="Sim">Sim</option>
      </select>
      <MensagemErro erros={erros} nome={nome} />
      {dados[nome] === 'Sim' && (
        <CampoDetalhe nome={`${nome}Qual`} dados={dados} onChange={onChange} placeholder={rotuloQual} erros={erros} />
      )}
    </div>
  );
}
