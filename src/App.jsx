import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';

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

function App() {
  return (
    <BrowserRouter>
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

        {/* Área do professor */}
        <Route path="/professor" element={<Painel />} />
        <Route path="/professor/turmas" element={<Turmas />} />
        <Route path="/professor/turmas/:turmaId/alunos" element={<AlunosTurma />} />
        <Route path="/professor/turmas/:turmaId/alunos/:alunoId/historico" element={<HistoricoFrequencia />} />
        <Route path="/professor/turmas/:turmaId/chamada" element={<ChamadaFrequencia />} />
        <Route path="/professor/turmas/:turmaId/frequencia-registrada" element={<FrequenciaRegistrada />} />
        <Route path="/professor/avisos" element={<AvisosProfessor />} />

        {/* Área do administrador */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/lista-espera" element={<ListaEspera />} />
        <Route path="/admin/lista-espera/:inscricaoId" element={<DetalhesListaEspera />} />
        <Route path="/admin/alunos" element={<Alunos />} />
        <Route path="/admin/alunos/:alunoId" element={<DetalhesAlunoVisaoGeral />} />
        <Route path="/admin/alunos/:alunoId/frequencia" element={<DetalhesAlunoFrequencia />} />
        <Route path="/admin/alunos/:alunoId/documentos" element={<DetalhesAlunoDocumentos />} />
        <Route path="/admin/alunos/:alunoId/historico" element={<DetalhesAlunoHistorico />} />
        <Route path="/admin/turmas" element={<TurmasAdmin />} />
        <Route path="/admin/turmas/:turmaId" element={<DetalhesTurmaAlunos />} />
        <Route path="/admin/turmas/:turmaId/lista-espera" element={<DetalhesTurmaListaEspera />} />
        <Route path="/admin/turmas/:turmaId/historico" element={<DetalhesTurmaHistorico />} />
        <Route path="/admin/frequencia" element={<Frequencia />} />
        <Route path="/admin/avisos" element={<AvisosAdmin />} />

        {/* Qualquer URL desconhecida volta para a página inicial */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
