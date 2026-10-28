# Escola de Esportes UNIFOR

Sistema web da Escola de Esportes da UNIFOR. Tem três áreas:

- **Responsável (pública):** ver modalidades e avisos, fazer a inscrição na lista de espera e acompanhar a inscrição.
- **Professor:** ver as turmas, fazer a chamada, ver o histórico de frequência dos alunos e os avisos.
- **Administrador:** gerenciar turmas, lista de espera, alunos, frequência, avisos e usuários do sistema.

## Tecnologias

- React 19 + Vite
- React Router
- Bootstrap 5 e Bootstrap Icons
- Firebase Authentication (login dos colaboradores)

## Como rodar

Precisa ter o [Node.js](https://nodejs.org) instalado (versão 20 ou mais nova).

```bash
npm install
npm run dev
```

Depois é só abrir o endereço que aparecer no terminal (normalmente http://localhost:5173).

### Variáveis de ambiente

O login usa o Firebase. Crie um arquivo `.env` na raiz do projeto com as chaves do projeto no Firebase:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

O `.env` já está no `.gitignore`, então ele não vai para o GitHub. Peça as chaves para alguém do grupo.

## Comandos

| Comando           | O que faz                                  |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Roda o projeto em modo de desenvolvimento  |
| `npm run build`   | Gera a versão final na pasta `dist`        |
| `npm run preview` | Roda localmente a versão gerada no `build` |
| `npm run lint`    | Procura problemas no código (oxlint)       |

## Estrutura

```
src/
  components/   layouts e barras de navegação usados em várias telas
  config/       configuração do Firebase
  context/      login (AuthContext)
  pages/
    publico/    telas do responsável
    login/      login e recuperação de senha
    professor/  telas do professor
    admin/      telas do administrador
  assets/       imagens e ícones
```

Por enquanto as telas do professor e do administrador usam dados de exemplo (`pages/admin/dados.js` e `pages/professor/dados.js`), até o banco de dados ser ligado.
