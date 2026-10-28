import { useLocation } from 'react-router-dom';
import LayoutPainel from './LayoutPainel';
import { avisos, avisoNovo } from '../pages/professor/dados';

// Telas do professor: menu com Painel e Turmas
// avisosLidos: a tela de Avisos passa a lista atualizada para o sino mudar na hora
function LayoutProfessor({ avisosLidos, children }) {
  const { pathname } = useLocation();
  // Avisos ficam "dentro" do Painel no protótipo
  const emTurmas = pathname.startsWith('/professor/turmas');

  const menu = [
    { to: '/professor', texto: 'Painel', icone: 'bi-house', ativo: !emTurmas },
    { to: '/professor/turmas', texto: 'Turmas', icone: 'bi-people', ativo: emTurmas },
  ];

  return (
    <LayoutPainel
      titulo="Painel do Professor"
      menu={menu}
      usuario="Professor"
      linkAvisos="/professor/avisos"
      temAvisoNovo={avisos.some((aviso) => avisoNovo(aviso, avisosLidos))}
    >
      {children}
    </LayoutPainel>
  );
}

export default LayoutProfessor;
