import { Link } from 'react-router-dom';
import { AZUL, AZUL_CLARO, TEXTO, CINZA_TEXTO } from '../../components/cores';

// Cartão de uma turma (usado no Painel e em Minhas turmas)
function CardTurma({ turma }) {
  return (
    <div className="painel-card d-flex flex-wrap align-items-center gap-3 px-3 py-3">
      {/* Ícone da modalidade */}
      <div
        className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
        style={{ width: '44px', height: '44px', backgroundColor: AZUL_CLARO }}
      >
        <img src={turma.icone} alt="" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
      </div>

      {/* Informações da turma */}
      <div className="flex-grow-1" style={{ minWidth: '220px' }}>
        <div style={{ color: TEXTO, fontSize: '0.95rem', fontWeight: 600 }}>
          {turma.modalidade}{' '}
          <span style={{ fontWeight: 400, fontSize: '0.75rem' }}>({turma.faixaEtaria})</span>
        </div>
        <div style={{ color: CINZA_TEXTO, fontSize: '0.7rem' }}>Turma {turma.id}</div>

        <div className="d-flex flex-wrap align-items-end mt-2" style={{ color: TEXTO, fontSize: '0.7rem', columnGap: '48px' }}>
          <div>
            <div><i className="bi bi-calendar3 me-2"></i>{turma.dias}</div>
            <div><i className="bi bi-clock me-2"></i>{turma.horario}</div>
          </div>
          <div><i className="bi bi-geo-alt me-1"></i>{turma.local}</div>
        </div>
      </div>

      {/* Quantidade de alunos e botão */}
      <div className="d-flex flex-column align-items-end gap-2 ms-auto">
        <span
          className="rounded-pill px-2 py-1"
          style={{ backgroundColor: AZUL_CLARO, color: AZUL, fontSize: '0.65rem', fontWeight: 500 }}
        >
          {turma.totalAlunos} alunos
        </span>
        <Link to={`/professor/turmas/${turma.id}/alunos`} className="painel-botao-contorno">
          Ver alunos <i className="bi bi-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
}

export default CardTurma;
