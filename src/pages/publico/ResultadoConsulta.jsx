import { Link } from 'react-router-dom';
import HeaderPublico from '../../components/HeaderPublico';

// Cores do protótipo
const AZUL = '#0047B8';
const AZUL_ESCURO = '#1F2A44';
const CINZA_TEXTO = '#6B7280';

// Dados de exemplo até existir a API de consulta
const inscricao = {
  aluno: 'Carolina Lima',
  cpf: '123.456.789-00',
  modalidade: 'Futebol',
  turma: 'Futebol – Turma F01',
  dataInscricao: '15/04/2026',
  posicao: 12,
  status: 'Aguardando vaga',
  documentos: 'Em análise',
};

// Etapas da inscrição; "feita" marca as que já aconteceram
const etapas = [
  { titulo: 'Inscrição realizada', descricao: '15/04/2026', feita: true },
  { titulo: 'Aguardando vaga', descricao: 'Você está na lista de espera. Avisaremos quando surgir uma vaga.', feita: true },
  { titulo: 'Convocado para realizar matrícula', feita: false },
  { titulo: 'Matrícula realizada', feita: false },
  { titulo: 'Matrícula confirmada', feita: false },
];

function Linha({ rotulo, children }) {
  return (
    <p className="mb-2" style={{ color: AZUL_ESCURO, fontSize: '0.9rem' }}>
      <strong>{rotulo}:</strong> {children}
    </p>
  );
}

function ResultadoConsulta() {
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
              <div className="col-12 col-md-6 p-4" style={{ backgroundColor: '#ECF8EF' }}>
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                  <h2 className="m-0 fw-bold" style={{ color: AZUL_ESCURO, fontSize: '1.3rem' }}>{inscricao.aluno}</h2>
                  <span className="rounded px-2 py-1 text-white" style={{ backgroundColor: '#16A34A', fontSize: '0.75rem' }}>{inscricao.status}</span>
                </div>
                <Linha rotulo="CPF do aluno">{inscricao.cpf}</Linha>
                <Linha rotulo="Modalidade">{inscricao.modalidade}</Linha>
                <Linha rotulo="Turma">{inscricao.turma}</Linha>
                <Linha rotulo="Data da inscrição">{inscricao.dataInscricao}</Linha>
                <Linha rotulo="Posição na fila">
                  <span className="rounded px-2" style={{ border: `1px solid ${AZUL}`, color: AZUL, backgroundColor: '#EFF6FF' }}>{inscricao.posicao}º</span>
                </Linha>
                <Linha rotulo="Documentos">
                  <span className="rounded px-2" style={{ color: '#B45309', backgroundColor: '#FEF3C7' }}>{inscricao.documentos}</span>
                </Linha>
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
              Fique atento ao seu e-mail e telefone. Entraremos em contato quando houver uma vaga disponível.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ResultadoConsulta;
