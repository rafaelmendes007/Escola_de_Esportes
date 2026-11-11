// Guarda, só nesta aba do navegador, que o responsável aceitou os termos antes de preencher a inscrição.
const CHAVE = 'consentimentoInscricao';

export function registrarConsentimento() {
  try {
    sessionStorage.setItem(CHAVE, 'aceito');
  } catch {
    // Navegador sem sessionStorage (ex.: modo privado restrito): segue sem guardar
  }
}

export function temConsentimento() {
  try {
    return sessionStorage.getItem(CHAVE) === 'aceito';
  } catch {
    return false;
  }
}
