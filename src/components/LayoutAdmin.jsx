import { useLocation } from 'react-router-dom';
import LayoutPainel from './LayoutPainel';
import { AZUL_ADMIN, AZUL_TITULO } from './cores';

const itensMenu = [
  { to: '/admin/turmas', texto: 'Turmas', icone: 'bi-people' },
  { to: '/admin/lista-espera', texto: 'Lista de espera', icone: 'bi-list-ul' },
  { to: '/admin/alunos', texto: 'Alunos', icone: 'bi-person' },
  { to: '/admin/frequencia', texto: 'Frequência', icone: 'bi-check-circle' },
  { to: '/admin/avisos', texto: 'Avisos', icone: 'bi-megaphone' },
  { to: '/admin/administradores', texto: 'Cadastrar administrador', icone: 'bi-person-plus' },
];

// Telas do administrador: menu completo e título da barra superior por tela
function LayoutAdmin({ titulo = 'Painel Administrativo', children }) {
  const { pathname } = useLocation();

  const menu = [
    { to: '/admin', texto: 'Painel', icone: 'bi-house', ativo: pathname === '/admin' },
    ...itensMenu.map((item) => ({ ...item, ativo: pathname.startsWith(item.to) })),
  ];

  return (
    <LayoutPainel titulo={titulo} menu={menu} usuario="Administrador" linkAvisos="/admin/avisos" temAvisoNovo={false}>
      <style>{`
        .admin-titulo { color: ${AZUL_TITULO}; font-size: 1.75rem; font-weight: 600; margin: 0; }
        .admin-subtitulo { color: #4B5563; font-size: 0.8rem; margin: 4px 0 0; }
        .admin-botao {
          border: none;
          border-radius: 6px;
          color: #FFFFFF;
          background-color: ${AZUL_ADMIN};
          font-size: 0.85rem;
          font-weight: 500;
          padding: 8px 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
        }
        .admin-botao:hover { background-color: #095AA3; color: #FFFFFF; }
        .admin-botao:disabled { opacity: 0.5; }
        .admin-botao-contorno {
          border: 1px solid ${AZUL_ADMIN};
          border-radius: 6px;
          color: ${AZUL_ADMIN};
          background-color: #FFFFFF;
          font-size: 0.85rem;
          font-weight: 500;
          padding: 7px 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
        }
        .admin-botao-contorno:hover { background-color: #EAF3FB; color: ${AZUL_ADMIN}; }
        .admin-botao-filtrar {
          border: 1px solid #93C5E8;
          border-radius: 6px;
          color: ${AZUL_ADMIN};
          background-color: #BFDDF3;
          font-size: 0.9rem;
          padding: 6px 0;
          width: 100%;
        }
        .admin-link { color: ${AZUL_ADMIN}; font-size: 0.75rem; text-decoration: none; white-space: nowrap; }
        .admin-link:hover { text-decoration: underline; }
        .admin-rotulo { color: #111827; font-size: 0.8rem; margin-bottom: 4px; display: block; }
        .admin-campo { font-size: 0.8rem; border-color: #9CA3AF; }
        .admin-tabela { width: 100%; font-size: 0.75rem; color: #111827; border-collapse: separate; border-spacing: 0; }
        .admin-tabela th { font-weight: 500; font-size: 0.7rem; padding: 8px 10px; background-color: #E5E7EB; white-space: nowrap; }
        .admin-tabela th:first-child { border-radius: 6px 0 0 6px; }
        .admin-tabela th:last-child { border-radius: 0 6px 6px 0; }
        .admin-tabela td { padding: 8px 10px; vertical-align: middle; white-space: nowrap; }
        .admin-aba {
          color: #374151;
          font-size: 0.85rem;
          padding: 8px 12px;
          text-decoration: none;
          border-bottom: 2px solid transparent;
          white-space: nowrap;
        }
        .admin-aba.ativa { color: ${AZUL_ADMIN}; font-weight: 600; border-bottom-color: ${AZUL_ADMIN}; }
      `}</style>
      {children}
    </LayoutPainel>
  );
}

export default LayoutAdmin;
