import { somenteDigitos } from './validacao';

// Tira acentos e deixa minúsculo, para a busca por nome
export function normalizar(texto = '') {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

// Link de WhatsApp para um telefone no formato "(85) 98765-4321"
export function linkWhatsApp(telefone = '') {
  return `https://wa.me/55${somenteDigitos(telefone)}`;
}
