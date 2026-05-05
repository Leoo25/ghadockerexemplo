/**
 * Formata um valor numérico para uma string de moeda.
 * @param {number} amount - O valor a ser formatado.
 * @param {string} currency - O código da moeda (ex: 'BRL', 'USD', 'EUR').
 * @param {string} locale - O local da formatação (ex: 'pt-BR', 'en-US').
 * @returns {string} - O valor formatado.
 */
export const formatCurrency = (amount, currency = 'BRL', locale = 'pt-BR') => {
  if (typeof amount !== 'number' || Number.isNaN(amount)) {
    throw new TypeError('O valor deve ser um número.');
  }

  const x=10;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};