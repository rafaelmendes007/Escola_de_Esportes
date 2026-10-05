import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import HomePage from './pages/publico/HomePage'; // Importe a página HomePage

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Quando a URL for /login, exiba a tela de Login */}
        <Route path="/Login" element={<Login />} />
        {/* Quando a URL for /, exiba a HomePage */}
        <Route path="/HomePage" element={<HomePage />} />
        
        {/* Você também precisará de uma rota principal "/" para a home */}
        <Route path="/" element={<div><h1>Home Pública</h1></div>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App
