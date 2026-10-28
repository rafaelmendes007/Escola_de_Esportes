import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LayoutPainel from './LayoutPainel';
import { avisos, avisoNovo, idsAvisosLidos, marcarAvisosComoLidos } from '../pages/professor/dados';

// Telas do professor: menu com Painel e Turmas
// avisosLidos / onAvisosLidos: a tela de Avisos compartilha a lista de lidos com o sino
function LayoutProfessor({ avisosLidos, onAvisosLidos, children }) {
  const { pathname } = useLocation();
  const [lidos, setLidos] = useState(idsAvisosLidos);
  const lidosAtuais = avisosLidos ?? lidos;

  // Clicar no sino marca todos os avisos como lidos
  const abrirAvisos = () => {
    const atualizados = marcarAvisosComoLidos(avisos.map((aviso) => aviso.id));
    setLidos(atualizados);
    onAvisosLidos?.(atualizados);
  };
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
      temAvisoNovo={avisos.some((aviso) => avisoNovo(aviso, lidosAtuais))}
      onAbrirAvisos={abrirAvisos}
    >
      {children}
    </LayoutPainel>
  );
}

export default LayoutProfessor;
