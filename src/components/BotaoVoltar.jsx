import { useNavigate } from 'react-router-dom';

// "← Voltar" das telas públicas. "para" é a rota de destino (fixa, para não sair do site).
function BotaoVoltar({ para, texto = 'Voltar' }) {
  const navigate = useNavigate();
  return (
    <button type="button" onClick={() => navigate(para)} className="botao-voltar mb-4">
      <span aria-hidden="true">←</span>
      {texto}
    </button>
  );
}

export default BotaoVoltar;
