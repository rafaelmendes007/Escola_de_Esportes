import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import EsqueciSenha from './pages/login/EsqueciSenha';

// Área pública (fluxo do responsável)
import HomePage from './pages/publico/HomePage';
import Modalidades from './pages/publico/Modalidades';
import Avisos from './pages/publico/Avisos';
import SelecaoModalidades from './pages/publico/SelecaoModalidades';
import PreenchimentoDados from './pages/publico/PreenchimentoDados';
import ConfirmacaoInscricao from './pages/publico/ConfirmacaoInscricao';
import AcompanhamentoInscricao from './pages/publico/AcompanhamentoInscricao';
import ResultadoConsulta from './pages/publico/ResultadoConsulta';

// Área do professor
import Painel from './pages/professor/Painel';
import Turmas from './pages/professor/Turmas';
import ChamadaFrequencia from './pages/professor/ChamadaFrequencia';
import FrequenciaRegistrada from './pages/professor/FrequenciaRegistrada';
import HistoricoFrequencia from './pages/professor/HistoricoFrequencia';
import AvisosProfessor from './pages/professor/Avisos';
import AlunosTurma from './pages/professor/AlunosTurma';

// Área do administrador
import Dashboard from './pages/admin/Dashboard';
import ListaEspera from './pages/admin/ListaEspera';
import DetalhesListaEspera from './pages/admin/DetalhesListaEspera';
import Alunos from './pages/admin/Alunos';
import DetalhesAlunoVisaoGeral from './pages/admin/DetalhesAlunoVisaoGeral';
import DetalhesAlunoFrequencia from './pages/admin/DetalhesAlunoFrequencia';
import DetalhesAlunoDocumentos from './pages/admin/DetalhesAlunoDocumentos';
import DetalhesAlunoHistorico from './pages/admin/DetalhesAlunoHistorico';
import TurmasAdmin from './pages/admin/Turmas';
import DetalhesTurmaAlunos from './pages/admin/DetalhesTurmaAlunos';
import DetalhesTurmaListaEspera from './pages/admin/DetalhesTurmaListaEspera';
import DetalhesTurmaHistorico from './pages/admin/DetalhesTurmaHistorico';
import Frequencia from './pages/admin/Frequencia';
import AvisosAdmin from './pages/admin/Avisos';
import Usuarios from './pages/admin/Usuarios';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Área pública */}
          <Route path="/" element={<HomePage />} />
          <Route path="/modalidades" element={<Modalidades />} />
          <Route path="/avisos" element={<Avisos />} />

          {/* Inscrição na lista de espera: modalidade -> dados -> confirmação */}
          <Route path="/inscricao" element={<SelecaoModalidades />} />
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
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;