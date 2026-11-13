import { deleteApp, initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db, firebaseConfig } from '../config/firebase';

// Cada usuário do sistema tem um documento em "usuarios/{uid}" com
// { nome, email, perfil: 'admin' | 'professor', ativo, criadoEm }

export const PERFIS = { admin: 'Administrador', professor: 'Professor' };

// Página inicial de cada perfil
export const AREA_DO_PERFIL = { admin: '/admin', professor: '/professor' };

// Dados do usuário logado (null se ele não tiver documento no Firestore)
export async function buscarUsuario(uid) {
  const documento = await getDoc(doc(db, 'usuarios', uid));
  return documento.exists() ? { uid, ...documento.data() } : null;
}

export async function listarUsuarios() {
  const resultado = await getDocs(query(collection(db, 'usuarios'), orderBy('nome')));
  return resultado.docs.map((documento) => ({ uid: documento.id, ...documento.data() }));
}

// Senha aleatória que ninguém vê: a pessoa cria a própria senha pelo e-mail que recebe
function senhaAleatoria() {
  const valores = crypto.getRandomValues(new Uint32Array(4));
  return `${Array.from(valores, (n) => n.toString(36)).join('')}Aa1!`;
}

// Cria a conta no Firebase Auth, o documento com o perfil e envia o e-mail "crie sua senha".
// Usa uma segunda instância do Firebase para o admin não ser deslogado:
// createUserWithEmailAndPassword sempre loga a conta recém-criada.
export async function criarUsuario({ nome, email, perfil }) {
  const appSecundario = initializeApp(firebaseConfig, `cadastro-${Date.now()}`);
  const authSecundario = getAuth(appSecundario);

  try {
    const { user } = await createUserWithEmailAndPassword(authSecundario, email, senhaAleatoria());
    // Gravado com a conexão principal, que está logada como admin (exigido pelas regras)
    await setDoc(doc(db, 'usuarios', user.uid), { nome, email, perfil, ativo: true, criadoEm: serverTimestamp() });
    await signOut(authSecundario);
    await enviarEmailDeSenha(email);
    return user.uid;
  } finally {
    await deleteApp(appSecundario);
  }
}

// E-mail com o link para criar (ou trocar) a senha; o link volta para o login do app
export async function enviarEmailDeSenha(email) {
  await sendPasswordResetEmail(auth, email, { url: `${window.location.origin}/login` });
}

// Troca perfil ou ativa/desativa o acesso
export async function atualizarUsuario(uid, dados) {
  await updateDoc(doc(db, 'usuarios', uid), { ...dados, atualizadoEm: serverTimestamp() });
}

// Remove o acesso ao sistema. A conta continua no Firebase Authentication,
// mas sem o documento de perfil ela não entra mais em nenhuma área.
export async function removerAcesso(uid) {
  await deleteDoc(doc(db, 'usuarios', uid));
}

// Usuário sem perfil ou desativado não pode entrar
export const podeEntrar = (dados) => Boolean(dados?.perfil) && dados.ativo !== false;

// Mensagens em português para os erros mais comuns do Firebase Auth
export function mensagemDeErro(erro) {
  const mensagens = {
    'auth/email-already-in-use': 'Já existe uma conta com este e-mail.',
    'auth/invalid-email': 'E-mail inválido.',
    'auth/weak-password': 'A senha precisa ter pelo menos 6 caracteres.',
    'auth/invalid-credential': 'E-mail ou senha incorretos.',
    'auth/user-not-found': 'Usuário não encontrado.',
    'auth/wrong-password': 'Senha incorreta.',
    'auth/user-disabled': 'Usuário desativado.',
    'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
    'auth/network-request-failed': 'Sem conexão com a internet.',
    'permission-denied': 'Você não tem permissão para esta ação.',
  };
  return mensagens[erro?.code] || 'Algo deu errado. Tente novamente.';
}
