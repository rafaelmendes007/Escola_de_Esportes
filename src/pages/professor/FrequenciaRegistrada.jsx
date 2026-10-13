import { Link, useLocation, useParams } from 'react-router-dom';
import LayoutProfessor from '../../components/LayoutProfessor';
import { TEXTO, CINZA_TEXTO, AZUL, AZUL_CLARO, VERDE } from '../../components/cores';
import CardResumo from './CardResumo';
import { buscarTurma } from './dados';

const DIAS_SEMANA = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

function FrequenciaRegistrada() {
  const { turmaId } = useParams();
  const turma = buscarTurma(turmaId);

  // Resultado enviado pela tela de chamada (valores do protótipo se a tela for aberta direto)
  const resultado = useLocation().state || { data: '2026-04-15', presentes: 15, ausentes: 2, justificados: 1 };
  const [ano, mes, dia] = resultado.data.split('-');
  const diaSemana = DIAS_SEMANA[new Date(ano, mes - 1, dia).getDay()];

  return (
    <LayoutProfessor>
      <div className="painel-card mx-auto text-center px-3 px-sm-5 py-4 mt-lg-3" style={{ maxWidth: '520px' }}>
        <div
          className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
          style={{ width: '68px', height: '68px', backgroundColor: VERDE }}
        >
          <i className="bi bi-check-lg text-white" style={{ fontSize: '2.4rem' }}></i>
        </div>

        <h1 className="mb-1" style={{ color: TEXTO, fontSize: '1.5rem', fontWeight: 600 }}>Frequência registrada!</h1>
        <p style={{ color: CINZA_TEXTO, fontSize: '0.85rem' }}>A chamada da turma foi salva com sucesso.</p>

        {/* Turma e data da aula */}
        <div className="d-flex align-items-center text-start rounded px-3 py-2 mb-3" style={{ backgroundColor: '#F3F6FB' }}>
          <div className="rounded-circle bg-white d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
            <img src={turma.icone} alt="" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
          </div>
          <div className="flex-grow-1">
            <div className="fw-semibold" style={{ color: TEXTO, fontSize: '0.85rem' }}>{turma.modalidade} ({turma.faixaEtaria})</div>
            <div style={{ color: CINZA_TEXTO, fontSize: '0.7rem' }}>Turma {turma.id}</div>
          </div>
          <div className="ps-3" style={{ borderLeft: '1px solid #D1D5DB' }}>
            <div className="fw-semibold" style={{ color: TEXTO, fontSize: '0.8rem' }}>
              <i className="bi bi-calendar3 me-1"></i>{dia}/{mes}/{ano}
            </div>
            <div style={{ color: CINZA_TEXTO, fontSize: '0.7rem' }}>{diaSemana}</div>
          </div>
        </div>

        {/* Resumo da chamada */}
        <div className="row g-2 mb-3">
          <div className="col-4"><CardResumo tipo="presente" valor={resultado.presentes} legenda="Presentes" /></div>
          <div className="col-4"><CardResumo tipo="ausente" valor={resultado.ausentes} legenda="Ausentes" /></div>
          <div className="col-4"><CardResumo tipo="justificado" valor={resultado.justificados} legenda="Justificados" /></div>
        </div>

        <div className="d-flex align-items-start gap-2 text-start rounded px-3 py-2 mb-3" style={{ backgroundColor: AZUL_CLARO, color: TEXTO, fontSize: '0.75rem' }}>
          <i className="bi bi-info-circle" style={{ color: AZUL }}></i>
          Os registros de frequência ficam disponíveis no histórico da turma e podem ser consultados a qualquer momento.
        </div>

        <Link to={`/professor/turmas/${turma.id}/alunos`} className="painel-botao w-100 mb-2" style={{ maxWidth: '380px' }}>
          <i className="bi bi-arrow-left"></i> Voltar para a turma
        </Link>
        <div>
          <Link to="/professor/turmas" className="text-decoration-none" style={{ color: AZUL, fontSize: '0.8rem' }}>
            Ir para minhas turmas
          </Link>
        </div>
      </div>
    </LayoutProfessor>
  );
}

export default FrequenciaRegistrada;
