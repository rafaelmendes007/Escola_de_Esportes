# Escola de Esportes UNIFOR

Sistema web da Escola de Esportes da Unifor: inscrição na lista de espera pelos responsáveis,
área do professor (turmas e chamada) e área do administrador (lista de espera, turmas, alunos,
frequência, avisos e usuários).

Feito com **React 19 + Vite**, **Bootstrap 5** e **Firebase** (Authentication e Firestore).

## Como rodar

Pré-requisito: Node.js 20 ou mais novo.

```bash
npm install
cp .env.example .env.local   # depois preencha as chaves (veja abaixo)
npm run dev
```

Abra http://localhost:5173.

| Comando | O que faz |
|---|---|
| `npm run dev` | Sobe o app em modo de desenvolvimento |
| `npm run build` | Gera a versão final em `dist/` |
| `npm run preview` | Abre a versão de `dist/` para conferir |
| `npm run lint` | Procura erros no código (oxlint) |
| `npm test` | Roda os testes automáticos (Vitest) |

## Configuração do Firebase

1. No [Console do Firebase](https://console.firebase.google.com), abra o projeto e vá em
   **Configurações do projeto > Geral > Seus apps > Configuração do SDK**.
2. Copie os valores para o `.env.local` (nomes em `.env.example`). Esse arquivo não vai para o Git.
3. Em **Authentication > Método de login**, deixe **E-mail/senha** ativado.
4. Em **Firestore Database > Regras**, cole o conteúdo de [`firestore.rules`](firestore.rules) e publique.
   Sempre que esse arquivo mudar, publique de novo.

Sem o `.env.local`, o app mostra a tela "Configuração do Firebase faltando".

### Primeiro administrador

Sem nenhum admin, ninguém consegue cadastrar os outros. Crie o primeiro à mão:

1. **Authentication > Usuários > Adicionar usuário** (e-mail e senha) e copie o **UID**.
2. **Firestore > Dados**: crie a coleção `usuarios` com um documento cujo **ID é o UID** e os campos:
   `nome` (string), `email` (string), `perfil` (string, valor `admin`).

Depois disso, os demais professores e administradores são cadastrados pelo próprio app,
em **Admin > Usuários**. A pessoa recebe um e-mail para criar a própria senha.

## Estrutura

```
src/
  components/   Layouts (público, professor, admin), rota protegida, telas de erro e carregamento
  context/      AuthContext: usuário logado e perfil
  hooks/        useCarregar: busca dados com estados de carregando/erro
  services/     Acesso ao Firestore (inscrições, turmas, alunos, frequências, avisos, usuários)
  utils/        Validações, máscaras, datas, dias de aula, termos e rascunho da inscrição
  pages/
    publico/    Home, modalidades, avisos, inscrição (termos > dados > modalidade > confirmação), consulta
    login/      Login e recuperação de senha
    professor/  Painel, turmas, alunos da turma, chamada, histórico e avisos
    admin/      Dashboard, lista de espera, turmas, alunos, frequência, avisos e usuários
```

## Banco de dados (Firestore)

| Coleção | Conteúdo | Quem acessa |
|---|---|---|
| `usuarios/{uid}` | nome, e-mail, perfil (`admin`/`professor`), ativo | o próprio usuário lê; admin gerencia |
| `inscricoes/{id}` | inscrição completa da lista de espera, com o aceite dos termos | qualquer pessoa cria; só o admin lê |
| `consultasInscricao/{protocolo}` | resumo que o responsável consulta com protocolo + CPF | leitura só com o protocolo |
| `turmas/{id}` | modalidade, faixa etária, professor, dias, horário, local | equipe lê; admin gerencia |
| `alunos/{id}` | aluno matriculado (dados da inscrição + turma e histórico) | equipe lê; admin gerencia |
| `frequencias/{turmaId_data}` | chamada de uma turma em um dia | equipe registra; admin justifica |
| `avisos/{id}` | comunicados para professores e/ou responsáveis | todos leem; admin publica |

## Regras de negócio importantes

- As aulas acontecem só às **terças e quintas**; a chamada só pode ser feita nesses dias.
- O responsável precisa aceitar a Política de Privacidade e os Termos de Uso antes de se inscrever.
- Cada inscrição gera um **protocolo** (`ESP-XXXX-XXXX`) usado para acompanhar a inscrição.
- A posição na fila é a ordem de chegada entre as inscrições que aguardam vaga na mesma modalidade.
- Três faltas seguidas sem justificativa geram alerta para a administração.
