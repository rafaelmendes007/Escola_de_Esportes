import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AZUL_TITULO } from '../../components/cores';
import { CardIndicador } from './componentes';
import DetalhesAlunoLayout from './DetalhesAlunoLayout';
import ModalRematricular from './ModalRematricular';
import { alunos, buscarPorId, detalhesAluno, linkWhatsApp } from './dados';

// Aparência de cada status de documento
const statusDocumento = {
  Recebido: { icone: 'bi-check-circle-fill', cor: '#16A34A' },
  Pendente: { icone: 'bi-exclamation-circle-fill', cor: '#DC2626', fundo: '#FECACA' },
  Atualizar: { icone: 'bi-exclamation-triangle', cor: '#CA8A04', fundo: '#FEF9C3' },
};

const documentosIniciais = [
  { id: 1, nome: 'Certidão/RG', descricao: 'Cópia da certidão de nascimento ou RG do aluno', status: 'Recebido', detalhe: 'em 12/03/2026', arquivo: 'certidao_ana.pdf', tamanho: '1,2 MB' },
  { id: 2, nome: 'Comprovante de residência', descricao: 'Conta recente em nome do responsável', status: 'Pendente', arquivo: null },
  { id: 3, nome: 'Foto 3x4', descricao: 'Foto atualizada do aluno', status: 'Atualizar', arquivo: 'foto_3x4.jpg', tamanho: '320 KB' },
];

function DetalhesAlunoDocumentos() {
  const { alunoId } = useParams();
  const aluno = buscarPorId(alunos, alunoId);
  const [documentos, setDocumentos] = useState(documentosIniciais);
  const [modalAberto, setModalAberto] = useState(false);
  // Documento que vai receber o arquivo escolhido no seletor
  const [documentoAlvo, setDocumentoAlvo] = useState(null);
  const inputArquivo = useRef(null);

  const escolherArquivo = (idDocumento) => {
    setDocumentoAlvo(idDocumento);
    inputArquivo.current.click();
  };

  const handleArquivo = (e) => {
    const arquivo = e.target.files[0];
    if (!arquivo) return;
    setDocumentos(documentos.map((doc) =>
      doc.id === documentoAlvo ? { ...doc, arquivo: arquivo.name, tamanho: `${Math.ceil(arquivo.size / 1024)} KB`, status: 'Recebido', detalhe: 'agora' } : doc
    ));
    e.target.value = '';
  };

  const marcarComoRecebido = () => {
    setDocumentos(documentos.map((doc) => (doc.arquivo ? { ...doc, status: 'Recebido', detalhe: doc.detalhe || 'agora' } : doc)));
  };

  const recebidos = documentos.filter((doc) => doc.status === 'Recebido').length;

  return (
    <DetalhesAlunoLayout
      aba="Documentos"
      acoes={[
        { texto: 'Abrir WhatsApp', icone: 'bi-whatsapp', estilo: 'whatsapp', href: linkWhatsApp(detalhesAluno.telefoneResponsavel) },
        { texto: 'Adicionar documento', icone: 'bi-file-earmark-plus', estilo: 'primario', onClick: () => escolherArquivo(documentos.find((d) => !d.arquivo)?.id) },
        { texto: 'Marcar como recebido', icone: 'bi-check-circle', estilo: 'secundario', onClick: marcarComoRecebido },
        { texto: 'Rematricular Aluno', icone: 'bi-file-earmark', estilo: 'contorno', onClick: () => setModalAberto(true) },
      ]}
      datas={[['Contatado em:', detalhesAluno.contatadoEm], ['Retorno até:', detalhesAluno.retornoAte]]}
      informacao="Mantenha os documentos do aluno sempre atualizados para garantir sua permanência nas atividades."
    >
      <input ref={inputArquivo} type="file" className="d-none" onChange={handleArquivo} />

      <div className="painel-card p-3">
        <h2 className="fw-semibold m-0" style={{ color: AZUL_TITULO, fontSize: '0.95rem' }}>Documentos do aluno</h2>
        <p style={{ color: '#4B5563', fontSize: '0.7rem' }}>Gerencie os documentos obrigatórios para a matrícula e permanência.</p>

        <div className="row g-3 mb-3">
          <div className="col-6"><CardIndicador icone="bi-file-earmark-check" rotulo="Recebidos" valor={recebidos} cor="verde" /></div>
          <div className="col-6"><CardIndicador icone="bi-file-earmark-x" rotulo="Pendentes" valor={documentos.length - recebidos} cor="vermelho" /></div>
        </div>

        <div className="table-responsive rounded mb-3" style={{ border: '1px solid #D1D5DB' }}>
          <table className="table m-0 align-middle" style={{ fontSize: '0.7rem' }}>
            <thead>
              <tr>
                <th className="fw-medium" style={{ backgroundColor: '#E8F0FA' }}>Documento</th>
                <th className="fw-medium" style={{ backgroundColor: '#E8F0FA' }}>Status</th>
                <th className="fw-medium" style={{ backgroundColor: '#E8F0FA' }}>Arquivo</th>
                <th className="fw-medium" style={{ backgroundColor: '#E8F0FA' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {documentos.map((doc) => {
                const status = statusDocumento[doc.status];
                return (
                  <tr key={doc.id}>
                    <td>
                      <div className="d-flex gap-2">
                        <span className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '28px', height: '28px', backgroundColor: '#C9DDF0', color: '#0B6BC2' }}>
                          <i className="bi bi-file-earmark-text"></i>
                        </span>
                        <div>
                          <div className="fw-medium" style={{ color: AZUL_TITULO }}>{doc.nome}</div>
                          <div style={{ fontSize: '0.6rem', color: '#6B7280' }}>{doc.descricao}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="d-inline-flex align-items-center gap-1 rounded px-2 py-1" style={{ color: status.cor, backgroundColor: status.fundo || 'transparent' }}>
                        <i className={`bi ${status.icone}`}></i>{doc.status}
                      </span>
                      {doc.detalhe && <div style={{ fontSize: '0.6rem', color: '#6B7280' }}>{doc.detalhe}</div>}
                    </td>
                    <td>
                      {doc.arquivo ? (
                        <div className="d-flex gap-1">
                          <i className="bi bi-file-earmark"></i>
                          <div>
                            <div>{doc.arquivo}</div>
                            <div style={{ fontSize: '0.6rem', color: '#6B7280' }}>{doc.tamanho}</div>
                          </div>
                        </div>
                      ) : '—'}
                    </td>
                    <td>
                      {doc.arquivo ? (
                        <button type="button" className="btn btn-sm" style={{ backgroundColor: '#BFDDF3', color: '#0B6BC2', fontSize: '0.7rem', border: '1px solid #93C5E8' }}>
                          <i className="bi bi-eye me-1"></i>Visualizar
                        </button>
                      ) : (
                        <button type="button" className="admin-botao py-1 px-2" style={{ fontSize: '0.7rem' }} onClick={() => escolherArquivo(doc.id)}>
                          Adicionar arquivo
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="d-flex gap-2 rounded p-2" style={{ border: '1px solid #D1D5DB', fontSize: '0.65rem', color: '#374151' }}>
          <i className="bi bi-info-circle"></i>
          Todos os documentos são obrigatórios para matrícula e devem estar atualizados. Em caso de dúvidas entre em contato com a secretaria.
        </div>
      </div>

      <ModalRematricular aberto={modalAberto} onFechar={() => setModalAberto(false)} aluno={aluno.nome} />
    </DetalhesAlunoLayout>
  );
}

export default DetalhesAlunoDocumentos;
