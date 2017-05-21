// eslint-disable-next-line import/prefer-default-export
export function convertToCurrency(amount) {
  return Number(amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
