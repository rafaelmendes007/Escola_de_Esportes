// Guarda, só nesta aba do navegador, que o responsável aceitou os termos antes de preencher a inscrição.
// Quando a inscrição é enviada, esse registro vai junto para o Firestore (exigência da LGPD).
const CHAVE = 'consentimentoInscricao';

// Mude a versão sempre que o texto do aviso ou dos termos mudar
export const VERSAO_TERMOS = '2026.2';

export function registrarConsentimento() {
  try {
    sessionStorage.setItem(CHAVE, JSON.stringify({
      aceitoEm: new Date().toISOString(),
      versaoTermos: VERSAO_TERMOS,
      politicaPrivacidade: true,
      termosDeUso: true,
    }));
  } catch {
    // Navegador sem sessionStorage (ex.: modo privado restrito): segue sem guardar
  }
}

// Devolve o registro do aceite, ou null se ainda não aceitou nesta aba
export function lerConsentimento() {
  try {
    const texto = sessionStorage.getItem(CHAVE);
    return texto ? JSON.parse(texto) : null;
  } catch {
    return null;
  }
}

export function temConsentimento() {
  return lerConsentimento()?.versaoTermos === VERSAO_TERMOS;
}

export function apagarConsentimento() {
  try {
    sessionStorage.removeItem(CHAVE);
  } catch {
    // nada a fazer
  }
}
