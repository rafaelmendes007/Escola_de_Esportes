// Guarda, só nesta aba do navegador, os dados preenchidos entre as telas da inscrição
// (dados -> modalidade -> confirmação). É apagado quando a inscrição é enviada.
const CHAVE = 'rascunhoInscricao';

export function salvarRascunho(dados) {
  try {
    sessionStorage.setItem(CHAVE, JSON.stringify(dados));
  } catch {
    // Sem sessionStorage: os dados seguem só na memória da tela
  }
}

export function lerRascunho() {
  try {
    const texto = sessionStorage.getItem(CHAVE);
    return texto ? JSON.parse(texto) : null;
  } catch {
    return null;
  }
}

export function apagarRascunho() {
  try {
    sessionStorage.removeItem(CHAVE);
  } catch {
    // nada a fazer
  }
}
