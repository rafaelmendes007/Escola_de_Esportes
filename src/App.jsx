import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import EsqueciSenha from './pages/login/EsqueciSenha';

// Área pública (fluxo do responsável)
import HomePage from './pages/publico/HomePage';
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
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { Carregando } from './components/EstadoDados';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<Carregando />}>
        <Routes>
          {/* Área pública */}
          <Route path="/" element={<HomePage />} />
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
            <PrivateRoute perfil="professor">
              <Painel />
            </PrivateRoute>
          } />
          <Route path="/professor/turmas" element={
            <PrivateRoute perfil="professor">
              <Turmas />
            </PrivateRoute>
          } />
          <Route path="/professor/turmas/:turmaId/alunos" element={
            <PrivateRoute perfil="professor">
              <AlunosTurma />
            </PrivateRoute>
          } />
          <Route path="/professor/turmas/:turmaId/alunos/:alunoId/historico" element={
            <PrivateRoute perfil="professor">
              <HistoricoFrequencia />
            </PrivateRoute>
          } />
          <Route path="/professor/turmas/:turmaId/chamada" element={
            <PrivateRoute perfil="professor">
              <ChamadaFrequencia />
            </PrivateRoute>
          } />
          <Route path="/professor/turmas/:turmaId/frequencia-registrada" element={
            <PrivateRoute perfil="professor">
              <FrequenciaRegistrada />
            </PrivateRoute>
          } />
          <Route path="/professor/avisos" element={
            <PrivateRoute perfil="professor">
              <AvisosProfessor />
            </PrivateRoute>
          } />

          {/* ========== ÁREA DO ADMINISTRADOR (PROTEGIDA) ========== */}
          <Route path="/admin" element={
            <PrivateRoute perfil="admin">
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/admin/lista-espera" element={
            <PrivateRoute perfil="admin">
              <ListaEspera />
            </PrivateRoute>
          } />
          <Route path="/admin/lista-espera/:inscricaoId" element={
            <PrivateRoute perfil="admin">
              <DetalhesListaEspera />
            </PrivateRoute>
          } />
          <Route path="/admin/alunos" element={
            <PrivateRoute perfil="admin">
              <Alunos />
            </PrivateRoute>
          } />
          <Route path="/admin/alunos/:alunoId" element={
            <PrivateRoute perfil="admin">
              <DetalhesAlunoVisaoGeral />
            </PrivateRoute>
          } />
          <Route path="/admin/alunos/:alunoId/frequencia" element={
            <PrivateRoute perfil="admin">
              <DetalhesAlunoFrequencia />
            </PrivateRoute>
          } />
          <Route path="/admin/alunos/:alunoId/documentos" element={
            <PrivateRoute perfil="admin">
              <DetalhesAlunoDocumentos />
            </PrivateRoute>
          } />
          <Route path="/admin/alunos/:alunoId/historico" element={
            <PrivateRoute perfil="admin">
              <DetalhesAlunoHistorico />
            </PrivateRoute>
          } />
          <Route path="/admin/turmas" element={
            <PrivateRoute perfil="admin">
              <TurmasAdmin />
            </PrivateRoute>
          } />
          <Route path="/admin/turmas/:turmaId" element={
            <PrivateRoute perfil="admin">
              <DetalhesTurmaAlunos />
            </PrivateRoute>
          } />
          <Route path="/admin/turmas/:turmaId/lista-espera" element={
            <PrivateRoute perfil="admin">
              <DetalhesTurmaListaEspera />
            </PrivateRoute>
          } />
          <Route path="/admin/turmas/:turmaId/historico" element={
            <PrivateRoute perfil="admin">
              <DetalhesTurmaHistorico />
            </PrivateRoute>
          } />
          <Route path="/admin/frequencia" element={
            <PrivateRoute perfil="admin">
              <Frequencia />
            </PrivateRoute>
          } />
          <Route path="/admin/avisos" element={
            <PrivateRoute perfil="admin">
              <AvisosAdmin />
            </PrivateRoute>
          } />
          <Route path="/admin/usuarios" element={
            <PrivateRoute perfil="admin">
              <Usuarios />
            </PrivateRoute>
          } />

          {/* Qualquer URL desconhecida volta para a página inicial */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;