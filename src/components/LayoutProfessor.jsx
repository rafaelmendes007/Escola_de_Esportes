import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LayoutPainel from './LayoutPainel';
import { useAutenticacao } from '../hooks/useAutenticacao';
import { useCarregar } from '../hooks/useCarregar';
import { carregarAvisosDoProfessor } from '../pages/professor/dadosProfessor';
import { aoMarcarAvisosComoLidos, idsAvisosLidos, marcarAvisosComoLidos } from '../utils/avisosLidos';

// Telas do professor: menu com Painel e Turmas
function LayoutProfessor({ children }) {
  const { pathname } = useLocation();
  const { usuario } = useAutenticacao();
  // Bolinha vermelha no sino quando há aviso novo que o professor ainda não viu
  const { dados: avisos } = useCarregar(() => carregarAvisosDoProfessor(usuario.uid), [usuario.uid]);
  const [lidos, setLidos] = useState(() => idsAvisosLidos(usuario.uid));
  useEffect(() => aoMarcarAvisosComoLidos(setLidos), []);

  const naoVistos = (avisos || []).filter((aviso) => aviso.novo && !lidos.includes(aviso.id));
  // Clicar no sino marca os avisos como visualizados
  const abrirAvisos = () => marcarAvisosComoLidos(usuario.uid, (avisos || []).map((aviso) => aviso.id));

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
      temAvisoNovo={naoVistos.length > 0}
      onAbrirAvisos={abrirAvisos}
    >
      {children}
    </LayoutPainel>
  );
}

export default LayoutProfessor;
