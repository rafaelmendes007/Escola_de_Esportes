import { useState } from 'react';
import { AZUL_TITULO } from '../../components/cores';
import { atualizarAluno, DOCUMENTOS_ALUNO, eventoHistorico } from '../../services/alunos';
import { CardIndicador } from './componentes';
import DetalhesAlunoLayout from './DetalhesAlunoLayout';
import ModalRematricular from './ModalRematricular';

// Os documentos são entregues na secretaria; aqui o admin marca o que já recebeu
function DetalhesAlunoDocumentos() {
  const [rematriculando, setRematriculando] = useState(false);
  const [salvando, setSalvando] = useState(null); // documento sendo salvo

  return (
    <DetalhesAlunoLayout
      aba="Documentos"
      acoes={({ whatsapp }) => [
        whatsapp && { texto: 'Abrir WhatsApp', icone: 'bi-whatsapp', estilo: 'whatsapp', href: whatsapp },
        { texto: 'Rematricular aluno', icone: 'bi-file-earmark', estilo: 'contorno', onClick: () => setRematriculando(true) },
      ]}
      informacao="Os documentos são entregues na secretaria. Marque cada um assim que for conferido."
    >
      {({ aluno, recarregar }) => {
        const documentos = aluno.documentos || {};
        const recebidos = DOCUMENTOS_ALUNO.filter(([chave]) => documentos[chave]).length;

        const alternar = async (chave, rotulo) => {
          const recebido = !documentos[chave];
          setSalvando(chave);
          try {
            await atualizarAluno(
              aluno.id,
              { [`documentos.${chave}`]: recebido },
              eventoHistorico(recebido ? 'Documento recebido' : 'Documento marcado como pendente', rotulo, 'Documentos'),
            );
            recarregar();
          } finally {
            setSalvando(null);
          }
        };

        return (
          <div className="painel-card p-3">
            <h2 className="fw-semibold m-0" style={{ color: AZUL_TITULO, fontSize: '0.95rem' }}>Documentos do aluno</h2>
            <p style={{ color: '#4B5563', fontSize: '0.7rem' }}>Documentos obrigatórios para a matrícula e a permanência.</p>

            <div className="row g-3 mb-3">
              <div className="col-6"><CardIndicador icone="bi-file-earmark-check" rotulo="Recebidos" valor={recebidos} cor="verde" /></div>
              <div className="col-6"><CardIndicador icone="bi-file-earmark-x" rotulo="Pendentes" valor={DOCUMENTOS_ALUNO.length - recebidos} cor="vermelho" /></div>
            </div>

            <div className="d-flex flex-column gap-2">
              {DOCUMENTOS_ALUNO.map(([chave, rotulo]) => {
                const recebido = Boolean(documentos[chave]);
                return (
                  <label
                    key={chave}
                    className="d-flex align-items-center gap-3 rounded px-3 py-2"
                    style={{ border: `1px solid ${recebido ? '#86EFAC' : '#D1D5DB'}`, backgroundColor: recebido ? '#F0FDF4' : '#FFFFFF', cursor: 'pointer' }}
                  >
                    <input
                      type="checkbox"
                      className="form-check-input mt-0"
                      checked={recebido}
                      disabled={salvando === chave}
                      onChange={() => alternar(chave, rotulo)}
                    />
                    <span className="flex-grow-1" style={{ fontSize: '0.8rem', color: '#111827' }}>{rotulo}</span>
                    <span style={{ fontSize: '0.7rem', color: recebido ? '#15803D' : '#DC2626' }}>{recebido ? 'Recebido' : 'Pendente'}</span>
                  </label>
                );
              })}
            </div>

            <ModalRematricular aberto={rematriculando} onFechar={() => setRematriculando(false)} aluno={aluno} onSalvo={recarregar} />
          </div>
        );
      }}
    </DetalhesAlunoLayout>
  );
}

export default DetalhesAlunoDocumentos;
