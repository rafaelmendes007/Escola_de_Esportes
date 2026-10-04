import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Quando a URL for /login, exiba a tela de Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Você também precisará de uma rota principal "/" para a home */}
        <Route path="/" element={<div><h1>Home Pública</h1></div>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App
