import { Link, Navigate, useLocation } from 'react-router-dom';
import HeaderPublico from '../../components/HeaderPublico';

// Cores do protótipo
const AZUL = '#0047B8';
const AZUL_ESCURO = '#1F2A44';
const CINZA_TEXTO = '#6B7280';

// Ordem das etapas da inscrição. A etapa atual e as anteriores aparecem como feitas.
const ETAPAS = [
  { status: 'Aguardando vaga', titulo: 'Inscrição na lista de espera', descricao: 'Avisaremos quando surgir uma vaga.' },
  { status: 'Convocado', titulo: 'Convocado para realizar matrícula', descricao: 'Compareça à secretaria com os documentos.' },
  { status: 'Matriculado', titulo: 'Matrícula realizada' },
];

function Linha({ rotulo, children }) {
  return (
    <p className="mb-2" style={{ color: AZUL_ESCURO, fontSize: '0.9rem' }}>
      <strong>{rotulo}:</strong> {children}
    </p>
  );
}

function ResultadoConsulta() {
  // Resumo vindo da tela de consulta (protocolo + CPF já conferidos)
  const inscricao = useLocation().state?.inscricao;
  if (!inscricao) {
    return <Navigate to="/acompanhar-inscricao" replace />;
  }

  const cancelada = inscricao.status === 'Cancelada';
  const etapaAtual = ETAPAS.findIndex((etapa) => etapa.status === inscricao.status);
  const etapas = ETAPAS.map((etapa, indice) => ({ ...etapa, feita: !cancelada && indice <= etapaAtual }));
  const corStatus = cancelada ? '#DC2626' : '#16A34A';

  return (
    <div className="min-vh-100 d-flex flex-column bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <HeaderPublico />

      <main className="flex-grow-1 py-4 px-3 px-lg-5">
        <div className="mx-auto" style={{ maxWidth: '900px' }}>
          <Link to="/acompanhar-inscricao" className="text-decoration-none d-inline-block mb-2" style={{ color: AZUL, fontSize: '0.85rem' }}>
            <i className="bi bi-arrow-left me-1"></i>Nova consulta
          </Link>
          <h1 className="mb-3" style={{ color: AZUL_ESCURO, fontSize: '2rem', fontWeight: 600 }}>Detalhes da inscrição</h1>

          <div className="rounded overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
            <div className="row g-0">
              {/* Dados da inscrição */}
              <div className="col-12 col-md-6 p-4" style={{ backgroundColor: cancelada ? '#FEF2F2' : '#ECF8EF' }}>
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                  <h2 className="m-0 fw-bold" style={{ color: AZUL_ESCURO, fontSize: '1.3rem' }}>{inscricao.nomeAluno}</h2>
                  <span className="rounded px-2 py-1 text-white" style={{ backgroundColor: corStatus, fontSize: '0.75rem' }}>{inscricao.status}</span>
                </div>
                <Linha rotulo="Protocolo">{inscricao.protocolo}</Linha>
                <Linha rotulo="Modalidade">{inscricao.modalidade}</Linha>
                <Linha rotulo="Data da inscrição">{inscricao.dataInscricao}</Linha>
                {inscricao.status === 'Aguardando vaga' && (
                  <Linha rotulo="Posição na fila">
                    {inscricao.posicao
                      ? <span className="rounded px-2" style={{ border: `1px solid ${AZUL}`, color: AZUL, backgroundColor: '#EFF6FF' }}>{inscricao.posicao}º</span>
                      : 'em definição pela administração'}
                  </Linha>
                )}
              </div>

              {/* Linha do tempo */}
              <div className="col-12 col-md-6 p-4">
                {etapas.map((etapa, indice) => (
                  <div key={etapa.titulo} className="d-flex gap-3">
                    <div className="d-flex flex-column align-items-center">
                      <span className="rounded-circle flex-shrink-0" style={{ width: '12px', height: '12px', marginTop: '4px', backgroundColor: etapa.feita ? AZUL : '#D1D5DB' }}></span>
                      {indice < etapas.length - 1 && (
                        <span className="flex-grow-1" style={{ width: '2px', backgroundColor: etapas[indice + 1].feita ? AZUL : '#E5E7EB' }}></span>
                      )}
                    </div>
                    <div className="pb-3">
                      <div style={{ color: etapa.feita ? AZUL_ESCURO : CINZA_TEXTO, fontSize: '0.9rem', fontWeight: etapa.feita ? 600 : 400 }}>{etapa.titulo}</div>
                      {etapa.descricao && <div style={{ color: CINZA_TEXTO, fontSize: '0.75rem' }}>{etapa.descricao}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex align-items-center gap-2 px-4 py-3" style={{ backgroundColor: '#EFF6FF', borderTop: '1px solid #E5E7EB', color: AZUL_ESCURO, fontSize: '0.85rem' }}>
              <i className="bi bi-info-circle" style={{ color: AZUL }}></i>
              {cancelada
                ? 'Esta inscrição foi cancelada. Em caso de dúvida, fale com a secretaria da Escola de Esportes.'
                : 'Fique atento ao seu e-mail e telefone. Entraremos em contato quando houver uma vaga disponível.'}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ResultadoConsulta;
