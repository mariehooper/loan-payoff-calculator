export default function convertToCurrency(amount) {
  return Number(amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}
