import { AZUL_TITULO } from '../../components/cores';
import { Vazio } from '../../components/EstadoDados';
import { formatarData, paraDate } from '../../utils/datas';
import { Etiqueta } from './componentes';
import DetalhesAlunoLayout from './DetalhesAlunoLayout';

// Ícone e cor de cada tipo de registro
const tipos = {
  'Lista de espera': { icone: 'bi-hourglass-split', cor: 'roxo' },
  Matrícula: { icone: 'bi-check-circle-fill', cor: 'verde' },
  Rematrícula: { icone: 'bi-arrow-repeat', cor: 'verde' },
  Observação: { icone: 'bi-chat-left-text', cor: 'azul' },
  Documentos: { icone: 'bi-file-earmark', cor: 'azul' },
  Cadastro: { icone: 'bi-pencil', cor: 'azul' },
  Desligamento: { icone: 'bi-person-x', cor: 'vermelho' },
};

function DetalhesAlunoHistorico() {
  return (
    <DetalhesAlunoLayout
      aba="Histórico"
      acoes={({ whatsapp, abrirObservacao, abrirDesligamento, aluno }) => [
        whatsapp && { texto: 'Abrir WhatsApp', icone: 'bi-whatsapp', estilo: 'whatsapp', href: whatsapp },
        { texto: 'Adicionar registro', icone: 'bi-file-earmark-plus', estilo: 'primario', onClick: abrirObservacao },
        aluno.status === 'Ativo' && { texto: 'Desligar aluno', icone: 'bi-trash', estilo: 'perigo', onClick: abrirDesligamento },
      ]}
      informacao="Adicione registros importantes sobre o aluno, como contatos, observações e outras informações relevantes."
    >
      {({ aluno }) => {
        // Mais recente primeiro
        const eventos = [...(aluno.historico || [])].sort((a, b) => paraDate(b.data) - paraDate(a.data));

        return (
          <div className="painel-card p-3">
            <h2 className="fw-semibold mb-3" style={{ color: AZUL_TITULO, fontSize: '0.95rem' }}>Linha do tempo</h2>
            {eventos.length === 0 ? (
              <Vazio texto="Nenhum registro ainda." />
            ) : eventos.map((evento, indice) => {
              const tipo = tipos[evento.tipo] || { icone: 'bi-circle', cor: 'azul' };
              const data = paraDate(evento.data);
              return (
                <div key={indice} className="d-flex align-items-center gap-3 py-2" style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <div style={{ width: '70px', fontSize: '0.65rem', color: AZUL_TITULO }} className="flex-shrink-0">
                    {formatarData(data)}<br />{data?.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <span className="rounded d-inline-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '28px', height: '28px', backgroundColor: '#E0EEFA', color: '#0B6BC2' }}>
                    <i className={`bi ${tipo.icone}`}></i>
                  </span>
                  <div className="flex-grow-1">
                    <div className="fw-medium" style={{ color: AZUL_TITULO, fontSize: '0.75rem' }}>{evento.titulo}</div>
                    <div style={{ color: '#6B7280', fontSize: '0.65rem' }}>{evento.descricao}</div>
                  </div>
                  <Etiqueta texto={evento.tipo} cor={tipo.cor} />
                </div>
              );
            })}
          </div>
        );
      }}
    </DetalhesAlunoLayout>
  );
}

export default DetalhesAlunoHistorico;
