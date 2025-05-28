import { QueryObject } from '@/interfaces/common/IRequest.interface';

const ECompare = {
  Equal: '=',
  Like: 'like',
  NotEqual: '!=',
  GreaterThan: '>',
  LessThan: '<',
  GreaterThanOrEqual: '>=',
  LessThanOrEqual: '<=',
  In: 'in'
};

export const buildQueryString = (queryObject: QueryObject) => {
  const params: any = [];

  if (queryObject.filters && queryObject.filters.length > 0) {
    const filters: any[] = [];

    const specialFieldMappings = {
      isBlocked: (value: string) => (value === 'Active' ? false : true),
      isRootAdmin: (value: string) => value.toLowerCase() === 'yes'
    };

    queryObject.filters
      .filter((item) => item.value && item.value.trim() !== '')
      .forEach((item) => {
        if (item.id in specialFieldMappings) {
          if (typeof item.value === 'string') {
            const mappedValue = specialFieldMappings[
              item.id as keyof typeof specialFieldMappings
            ](item.value);
            filters.push({
              f: item.id,
              o: { c: { t: ECompare.Equal, v: mappedValue } }
            });
          }
          return;
        }

        // Ưu tiên IN > RANGE > COMPARE
        if (
          item.values &&
          Array.isArray(item.values) &&
          item.values.length > 0
        ) {
          filters.push({
            f: item.id,
            o: {
              in: {
                t: ECompare.In,
                v: item.values
              }
            }
          });
        } else if (
          item.valueFrom !== undefined &&
          item.valueFrom !== null &&
          item.valueTo !== undefined &&
          item.valueTo !== null
        ) {
          filters.push({
            f: item.id,
            o: {
              r: {
                vf: item.valueFrom,
                vt: item.valueTo
              }
            }
          });
        } else if (item.value && item.value.trim() !== '') {
          filters.push({
            f: item.id,
            o: {
              c: {
                t: ECompare.Equal,
                v: item.value
              }
            }
          });
        }
      });

    if (filters.length > 0) {
      params.push(`filters=${JSON.stringify(filters)}`);
    }
  }

  // Xử lý các param khác
  Object.keys(queryObject).forEach((key) => {
    if (key !== 'filters') {
      params.push(`${key}=${queryObject[key]}`);
    }
  });

  const queryString = params.join('&');
  return queryString ? `?${queryString}` : '';
};

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
