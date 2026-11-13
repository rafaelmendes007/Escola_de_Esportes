import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LimiteDeErro, TelaDeErro } from './components/TelaDeErro'

const raiz = createRoot(document.getElementById('root'))

// Sem as chaves do Firebase (.env.local), o app não funciona: avisa em vez de abrir em branco
const VARIAVEIS_FIREBASE = ['VITE_FIREBASE_API_KEY', 'VITE_FIREBASE_AUTH_DOMAIN', 'VITE_FIREBASE_PROJECT_ID', 'VITE_FIREBASE_APP_ID']
const faltando = VARIAVEIS_FIREBASE.filter((nome) => !import.meta.env[nome])

if (faltando.length) {
  raiz.render(
    <TelaDeErro
      titulo="Configuração do Firebase faltando"
      mensagem="Crie o arquivo .env.local na raiz do projeto a partir do .env.example e preencha as chaves do Firebase. Depois reinicie o npm run dev."
    >
      <code style={{ fontSize: '0.75rem' }}>Faltando: {faltando.join(', ')}</code>
    </TelaDeErro>,
  )
} else {
  // O App só é carregado com a configuração presente (ele inicia o Firebase ao ser importado)
  import('./App.jsx').then(({ default: App }) => {
    raiz.render(
      <StrictMode>
        <LimiteDeErro>
          <App />
        </LimiteDeErro>
      </StrictMode>,
    )
  })
}
