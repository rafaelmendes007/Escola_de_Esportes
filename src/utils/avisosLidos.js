// Avisos que cada usuário já visualizou, guardados no navegador.
// O evento avisa o sino (LayoutProfessor) para apagar a bolinha na hora.
const EVENTO = 'avisos-lidos';
const chave = (uid) => `avisosLidos_${uid}`;

export function idsAvisosLidos(uid) {
  try {
    return JSON.parse(localStorage.getItem(chave(uid))) || [];
  } catch {
    return [];
  }
}

export function marcarAvisosComoLidos(uid, ids) {
  const lidos = [...new Set([...idsAvisosLidos(uid), ...ids])];
  try {
    localStorage.setItem(chave(uid), JSON.stringify(lidos));
  } catch {
    // Sem acesso ao armazenamento do navegador: vale só até recarregar a página
  }
  window.dispatchEvent(new CustomEvent(EVENTO, { detail: lidos }));
  return lidos;
}

export function aoMarcarAvisosComoLidos(callback) {
  const ouvir = (evento) => callback(evento.detail);
  window.addEventListener(EVENTO, ouvir);
  return () => window.removeEventListener(EVENTO, ouvir);
}
