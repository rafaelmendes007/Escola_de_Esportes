import { deleteApp, initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signOut } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db, firebaseConfig } from '../config/firebase';

// Cada usuário do sistema tem um documento em "usuarios/{uid}" com
// { nome, email, perfil: 'admin' | 'professor', criadoEm }

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

// Cria a conta no Firebase Auth e o documento com o perfil.
// Usa uma segunda instância do Firebase para o admin não ser deslogado:
// createUserWithEmailAndPassword sempre loga a conta recém-criada.
export async function criarUsuario({ nome, email, senha, perfil }) {
  const appSecundario = initializeApp(firebaseConfig, `cadastro-${Date.now()}`);
  const authSecundario = getAuth(appSecundario);

  try {
    const { user } = await createUserWithEmailAndPassword(authSecundario, email, senha);
    // Gravado com a conexão principal, que está logada como admin (exigido pelas regras)
    await setDoc(doc(db, 'usuarios', user.uid), { nome, email, perfil, criadoEm: serverTimestamp() });
    await signOut(authSecundario);
    return user.uid;
  } finally {
    await deleteApp(appSecundario);
  }
}

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
