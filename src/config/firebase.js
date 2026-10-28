import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";

// Usar variáveis de ambiente do Vite (import.meta.env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Segunda instância só para cadastrar usuários pelo painel do admin.
// Criar a conta pela instância principal trocaria o login do admin pelo do usuário novo.
const authCadastro = getAuth(initializeApp(firebaseConfig, "cadastro"));

export async function cadastrarUsuario(nome, email, senha) {
  const { user } = await createUserWithEmailAndPassword(authCadastro, email, senha);
  await updateProfile(user, { displayName: nome });
  await signOut(authCadastro);
  return user.uid;
}

export default app;