export const convertOjbToString = (obj: any): string => {
  let stringQuery = '?';
  for (var key in obj) {
    let val = obj[key];
    if (typeof val == 'object') {
      val = JSON.stringify(val);
    }
    stringQuery += `${key}=${val}&`;
  }
  return stringQuery.slice(0, -1);
};

export const formatCurrency = (number: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(number);
};
