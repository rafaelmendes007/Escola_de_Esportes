import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import EsqueciSenha from './pages/login/EsqueciSenha';

// Área pública (fluxo do responsável)
import PaginaInicial from './pages/publico/PaginaInicial';
import Modalidades from './pages/publico/Modalidades';
import Avisos from './pages/publico/Avisos';
import SelecaoModalidades from './pages/publico/SelecaoModalidades';
import ConsentimentoInscricao from './pages/publico/ConsentimentoInscricao';
import PreenchimentoDados from './pages/publico/PreenchimentoDados';
import ConfirmacaoInscricao from './pages/publico/ConfirmacaoInscricao';
import AcompanhamentoInscricao from './pages/publico/AcompanhamentoInscricao';
import ResultadoConsulta from './pages/publico/ResultadoConsulta';

// Áreas do professor e do administrador: o código só é baixado quando alguém entra nelas
const Painel = lazy(() => import('./pages/professor/Painel'));
const Turmas = lazy(() => import('./pages/professor/Turmas'));
const ChamadaFrequencia = lazy(() => import('./pages/professor/ChamadaFrequencia'));
const FrequenciaRegistrada = lazy(() => import('./pages/professor/FrequenciaRegistrada'));
const HistoricoFrequencia = lazy(() => import('./pages/professor/HistoricoFrequencia'));
const AvisosProfessor = lazy(() => import('./pages/professor/Avisos'));
const AlunosTurma = lazy(() => import('./pages/professor/AlunosTurma'));

// Área do administrador
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ListaEspera = lazy(() => import('./pages/admin/ListaEspera'));
const DetalhesListaEspera = lazy(() => import('./pages/admin/DetalhesListaEspera'));
const Alunos = lazy(() => import('./pages/admin/Alunos'));
const DetalhesAlunoVisaoGeral = lazy(() => import('./pages/admin/DetalhesAlunoVisaoGeral'));
const DetalhesAlunoFrequencia = lazy(() => import('./pages/admin/DetalhesAlunoFrequencia'));
const DetalhesAlunoDocumentos = lazy(() => import('./pages/admin/DetalhesAlunoDocumentos'));
const DetalhesAlunoHistorico = lazy(() => import('./pages/admin/DetalhesAlunoHistorico'));
const TurmasAdmin = lazy(() => import('./pages/admin/Turmas'));
const DetalhesTurmaAlunos = lazy(() => import('./pages/admin/DetalhesTurmaAlunos'));
const DetalhesTurmaListaEspera = lazy(() => import('./pages/admin/DetalhesTurmaListaEspera'));
const DetalhesTurmaHistorico = lazy(() => import('./pages/admin/DetalhesTurmaHistorico'));
const Frequencia = lazy(() => import('./pages/admin/Frequencia'));
const AvisosAdmin = lazy(() => import('./pages/admin/Avisos'));
const Usuarios = lazy(() => import('./pages/admin/Usuarios'));
import ProvedorAutenticacao from './context/ProvedorAutenticacao';
import RotaProtegida from './components/RotaProtegida';
import { Carregando } from './components/EstadoDados';


function App() {
  return (
    <BrowserRouter>
      <ProvedorAutenticacao>
        <Suspense fallback={<Carregando />}>
        <Routes>
          {/* Área pública */}
          <Route path="/" element={<PaginaInicial />} />
          <Route path="/modalidades" element={<Modalidades />} />
          <Route path="/avisos" element={<Avisos />} />

          {/* Inscrição na lista de espera: modalidade -> dados -> confirmação */}
          <Route path="/inscricao" element={<SelecaoModalidades />} />
          <Route path="/inscricao/consentimento" element={<ConsentimentoInscricao />} />
          <Route path="/inscricao/dados" element={<PreenchimentoDados />} />
          <Route path="/inscricao/confirmacao" element={<ConfirmacaoInscricao />} />

          {/* Acompanhamento da inscrição: consulta -> resultado */}
          <Route path="/acompanhar-inscricao" element={<AcompanhamentoInscricao />} />
          <Route path="/acompanhar-inscricao/resultado" element={<ResultadoConsulta />} />

          {/* Login dos colaboradores */}
          <Route path="/login" element={<Login />} />
          <Route path="/esqueci-senha" element={<EsqueciSenha />} />

          {/* ========== ÁREA DO PROFESSOR (PROTEGIDA) ========== */}
          <Route path="/professor" element={
            <RotaProtegida perfil="professor">
              <Painel />
            </RotaProtegida>
          } />
          <Route path="/professor/turmas" element={
            <RotaProtegida perfil="professor">
              <Turmas />
            </RotaProtegida>
          } />
          <Route path="/professor/turmas/:turmaId/alunos" element={
            <RotaProtegida perfil="professor">
              <AlunosTurma />
            </RotaProtegida>
          } />
          <Route path="/professor/turmas/:turmaId/alunos/:alunoId/historico" element={
            <RotaProtegida perfil="professor">
              <HistoricoFrequencia />
            </RotaProtegida>
          } />
          <Route path="/professor/turmas/:turmaId/chamada" element={
            <RotaProtegida perfil="professor">
              <ChamadaFrequencia />
            </RotaProtegida>
          } />
          <Route path="/professor/turmas/:turmaId/frequencia-registrada" element={
            <RotaProtegida perfil="professor">
              <FrequenciaRegistrada />
            </RotaProtegida>
          } />
          <Route path="/professor/avisos" element={
            <RotaProtegida perfil="professor">
              <AvisosProfessor />
            </RotaProtegida>
          } />

          {/* ========== ÁREA DO ADMINISTRADOR (PROTEGIDA) ========== */}
          <Route path="/admin" element={
            <RotaProtegida perfil="admin">
              <Dashboard />
            </RotaProtegida>
          } />
          <Route path="/admin/lista-espera" element={
            <RotaProtegida perfil="admin">
              <ListaEspera />
            </RotaProtegida>
          } />
          <Route path="/admin/lista-espera/:inscricaoId" element={
            <RotaProtegida perfil="admin">
              <DetalhesListaEspera />
            </RotaProtegida>
          } />
          <Route path="/admin/alunos" element={
            <RotaProtegida perfil="admin">
              <Alunos />
            </RotaProtegida>
          } />
          <Route path="/admin/alunos/:alunoId" element={
            <RotaProtegida perfil="admin">
              <DetalhesAlunoVisaoGeral />
            </RotaProtegida>
          } />
          <Route path="/admin/alunos/:alunoId/frequencia" element={
            <RotaProtegida perfil="admin">
              <DetalhesAlunoFrequencia />
            </RotaProtegida>
          } />
          <Route path="/admin/alunos/:alunoId/documentos" element={
            <RotaProtegida perfil="admin">
              <DetalhesAlunoDocumentos />
            </RotaProtegida>
          } />
          <Route path="/admin/alunos/:alunoId/historico" element={
            <RotaProtegida perfil="admin">
              <DetalhesAlunoHistorico />
            </RotaProtegida>
          } />
          <Route path="/admin/turmas" element={
            <RotaProtegida perfil="admin">
              <TurmasAdmin />
            </RotaProtegida>
          } />
          <Route path="/admin/turmas/:turmaId" element={
            <RotaProtegida perfil="admin">
              <DetalhesTurmaAlunos />
            </RotaProtegida>
          } />
          <Route path="/admin/turmas/:turmaId/lista-espera" element={
            <RotaProtegida perfil="admin">
              <DetalhesTurmaListaEspera />
            </RotaProtegida>
          } />
          <Route path="/admin/turmas/:turmaId/historico" element={
            <RotaProtegida perfil="admin">
              <DetalhesTurmaHistorico />
            </RotaProtegida>
          } />
          <Route path="/admin/frequencia" element={
            <RotaProtegida perfil="admin">
              <Frequencia />
            </RotaProtegida>
          } />
          <Route path="/admin/avisos" element={
            <RotaProtegida perfil="admin">
              <AvisosAdmin />
            </RotaProtegida>
          } />
          <Route path="/admin/usuarios" element={
            <RotaProtegida perfil="admin">
              <Usuarios />
            </RotaProtegida>
          } />

          {/* Qualquer URL desconhecida volta para a página inicial */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Suspense>
      </ProvedorAutenticacao>
    </BrowserRouter>
  );
}

export default App;