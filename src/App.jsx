import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import HomePage from './pages/publico/HomePage'; // Importe a página HomePage
import Modalidades from './pages/publico/Modalidades'; // Importe a página Modalidades

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Quando a URL for /login, exiba a tela de Login */}
        <Route path="/Login" element={<Login />} />
        {/* Quando a URL for /, exiba a HomePage */}
        <Route path="/HomePage" element={<HomePage />} />
        {/* Quando a URL for /modalidades, exiba a página de Modalidades */}
        <Route path="/Modalidades" element={<Modalidades />} />
        
        {/* Você também precisará de uma rota principal "/" para a home */}
        <Route path="/" element={<div><h1>Home Pública</h1></div>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App
