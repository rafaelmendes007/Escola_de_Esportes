import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

// avisos/{id}: { titulo, mensagem, paraProfessores, paraResponsaveis, turmaId, turmaNome, autor, criadoEm }

export async function listarAvisos() {
  const resultado = await getDocs(query(collection(db, 'avisos'), orderBy('criadoEm', 'desc')));
  return resultado.docs.map((documento) => ({ id: documento.id, ...documento.data() }));
}

export async function publicarAviso(aviso) {
  const novo = await addDoc(collection(db, 'avisos'), { ...aviso, criadoEm: serverTimestamp() });
  return novo.id;
}

// "Responsáveis e Professores", "Professores" ou "Responsáveis"
export function publicoDoAviso(aviso) {
  if (aviso.paraProfessores && aviso.paraResponsaveis) return 'Responsáveis e Professores';
  return aviso.paraProfessores ? 'Professores' : 'Responsáveis';
}
