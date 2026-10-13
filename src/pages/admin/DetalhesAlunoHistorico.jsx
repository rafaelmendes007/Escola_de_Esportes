import { AZUL_TITULO } from '../../components/cores';
import { Etiqueta } from './componentes';
import DetalhesAlunoLayout from './DetalhesAlunoLayout';
import { detalhesAluno, linkWhatsApp } from './dados';

// Linha do tempo do aluno (mais recente primeiro)
const eventos = [
  { data: '28/09/2026', hora: '14:32', titulo: 'Apto à rematrícula', descricao: 'Aluno considerado apto para o próximo semestre.', icone: 'bi-file-earmark', tipo: 'Rematrícula', cor: 'verde' },
  { data: '31/08/2026', hora: '16:20', titulo: 'Contato realizado com responsável', descricao: 'Contato via WhatsApp para alinhamento sobre frequência e desempenho do aluno.', icone: 'bi-telephone', tipo: 'Comunicação', cor: 'azul' },
  { data: '28/08/2026', hora: '10:14', titulo: 'Justificativa registrada', descricao: 'Falta justificada em 31/08/2026.', icone: 'bi-file-earmark', tipo: 'Frequência', cor: 'azul' },
  { data: '10/08/2026', hora: '09:18', titulo: 'Frequência acompanhada', descricao: 'Frequência do aluno vem sendo acompanhada regularmente pela equipe.', icone: 'bi-bar-chart-fill', tipo: 'Frequência', cor: 'azul' },
  { data: '07/08/2026', hora: '11:03', titulo: 'Matrícula confirmada', descricao: 'Matrícula confirmada para o semestre 2026.2 na turma Futsal Feminino 2.', icone: 'bi-check-circle-fill', tipo: 'Matrícula', cor: 'verde' },
  { data: '24/07/2026', hora: '15:27', titulo: 'Pré-inscrição concluída', descricao: 'Pré-inscrição finalizada com envio de documentos.', icone: 'bi-file-earmark', tipo: 'Pré-inscrição', cor: 'azul' },
  { data: '19/07/2026', hora: '08:12', titulo: 'Convocação para vaga', descricao: 'Aluno convocado da lista de espera para preenchimento de vaga na turma Futsal Feminino 2.', icone: 'bi-person', tipo: 'Lista de espera', cor: 'roxo' },
  { data: '01/07/2026', hora: '08:45', titulo: 'Entrada na lista de espera', descricao: 'Aluno cadastrado na lista de espera para turma Futsal Feminino 2.', icone: 'bi-hourglass-split', tipo: 'Lista de espera', cor: 'roxo' },
];

function DetalhesAlunoHistorico() {
  return (
    <DetalhesAlunoLayout
      aba="Histórico"
      acoes={[
        { texto: 'Abrir WhatsApp', icone: 'bi-whatsapp', estilo: 'whatsapp', href: linkWhatsApp(detalhesAluno.telefoneResponsavel) },
        { texto: 'Adicionar registro', icone: 'bi-file-earmark-plus', estilo: 'primario' },
        { texto: 'Desligar aluno', icone: 'bi-trash', estilo: 'perigo' },
      ]}
      datas={[['Contatado em:', detalhesAluno.contatadoEm], ['Retorno até:', detalhesAluno.retornoAte]]}
      informacao="Adicione registros importantes sobre o aluno, como contatos, observações, documentos e outras informações relevantes."
    >
      <div className="painel-card p-3">
        <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
          <div>
            <label className="admin-rotulo" style={{ fontSize: '0.7rem' }}>Semestre</label>
            <select className="form-select form-select-sm admin-campo" style={{ width: '180px' }} defaultValue="2026.2">
              <option>2026.2</option>
              <option>2026.1</option>
            </select>
          </div>
          <div className="d-flex gap-2 rounded px-2 py-1" style={{ border: '1px solid #D1D5DB', backgroundColor: '#F3F8FD', fontSize: '0.65rem', color: '#374151' }}>
            <i className="bi bi-info-circle"></i>
            <div>Última atualização<br />{detalhesAluno.atualizadoEm}<br />por Administrador/Estagiário</div>
          </div>
        </div>

        {/* Linha do tempo */}
        {eventos.map((evento) => (
          <div key={evento.data + evento.titulo} className="d-flex align-items-center gap-3 py-2" style={{ borderBottom: '1px solid #E5E7EB' }}>
            <div style={{ width: '70px', fontSize: '0.65rem', color: AZUL_TITULO }} className="flex-shrink-0">
              {evento.data}<br />{evento.hora}
            </div>
            <span className="rounded-circle flex-shrink-0" style={{ width: '7px', height: '7px', backgroundColor: '#0B6BC2' }}></span>
            <span className="rounded d-inline-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '28px', height: '28px', backgroundColor: '#E0EEFA', color: '#0B6BC2' }}>
              <i className={`bi ${evento.icone}`}></i>
            </span>
            <div className="flex-grow-1">
              <div className="fw-medium" style={{ color: AZUL_TITULO, fontSize: '0.75rem' }}>{evento.titulo}</div>
              <div style={{ color: '#6B7280', fontSize: '0.6rem' }}>{evento.descricao}</div>
            </div>
            <Etiqueta texto={evento.tipo} cor={evento.cor} />
          </div>
        ))}
      </div>
    </DetalhesAlunoLayout>
  );
}

export default DetalhesAlunoHistorico;
