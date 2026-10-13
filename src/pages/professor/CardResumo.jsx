import { TEXTO, VERDE, VERMELHO, AZUL } from '../../components/cores';

// Estilo de cada tipo de número do resumo de frequência
const tipos = {
  presente: { cor: VERDE, icone: 'bi-check-circle-fill' },
  ausente: { cor: VERMELHO, icone: 'bi-x-circle-fill', fundo: '#FEF2F2', borda: '#FECACA' },
  justificado: { cor: AZUL, icone: 'bi-file-earmark-text-fill' },
  frequencia: { cor: AZUL, icone: 'bi-bar-chart-fill' },
};

// Cartão com ícone, número grande e legenda (Frequência registrada e Histórico)
function CardResumo({ tipo, valor, legenda }) {
  const estilo = tipos[tipo];

  return (
    <div
      className="text-center py-3 px-2 h-100"
      style={{
        backgroundColor: estilo.fundo || '#FFFFFF',
        border: `1px solid ${estilo.borda || '#E5E7EB'}`,
        borderRadius: '8px',
      }}
    >
      <i className={`bi ${estilo.icone}`} style={{ color: estilo.cor, fontSize: '1.1rem' }}></i>
      <div style={{ color: estilo.cor, fontSize: '1.6rem', fontWeight: 600, lineHeight: 1.2 }}>{valor}</div>
      <div style={{ color: tipo === 'ausente' ? VERMELHO : TEXTO, fontSize: '0.75rem' }}>{legenda}</div>
    </div>
  );
}

export default CardResumo;
