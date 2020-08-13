export const currencyFormat = (num) => {
  if (!num) {
    return '';
  }
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const formatDate = (str) => {
  var options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(str).toLocaleDateString([], options);
};
