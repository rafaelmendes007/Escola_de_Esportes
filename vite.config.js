import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        // Bibliotecas grandes em arquivos separados: o navegador guarda em cache
        // e não baixa de novo quando só o código do app muda
        advancedChunks: {
          groups: [
            { name: 'firebase-firestore', test: /node_modules[\\/]@firebase[\\/](firestore|webchannel-wrapper)/ },
            { name: 'firebase-auth', test: /node_modules[\\/]@firebase[\\/]auth/ },
            { name: 'firebase', test: /node_modules[\\/](@firebase|firebase)/ },
            { name: 'react', test: /node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/ },
          ],
        },
      },
    },
  },
})
