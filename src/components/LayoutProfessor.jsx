import { useLocation } from 'react-router-dom';
import LayoutPainel from './LayoutPainel';
import { useAutenticacao } from '../hooks/useAutenticacao';
import { useCarregar } from '../hooks/useCarregar';
import { carregarAvisosDoProfessor } from '../pages/professor/dadosProfessor';

// Telas do professor: menu com Painel e Turmas
function LayoutProfessor({ children }) {
  const { pathname } = useLocation();
  const { usuario } = useAutenticacao();
  // Bolinha vermelha no sino quando há aviso dos últimos 3 dias
  const { dados: avisos } = useCarregar(() => carregarAvisosDoProfessor(usuario.uid), [usuario.uid]);

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
      perfil="Professor"
      linkAvisos="/professor/avisos"
      temAvisoNovo={Boolean(avisos?.some((aviso) => aviso.novo))}
    >
      {children}
    </LayoutPainel>
  );
}

export default LayoutProfessor;
