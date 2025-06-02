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
  const params: string[] = [];

  if (queryObject.filters && queryObject.filters.length > 0) {
    const filters: any[] = [];

    // Các hàm chuyển đổi đặc biệt
    const specialFieldMappings = {
      isBlocked: (value: string) => (value === 'Active' ? false : true),
      isRootAdmin: (value: string) => value.toLowerCase() === 'yes'
    };

    queryObject.filters
      .filter((item) => {
        // Với price, nếu là mảng ["", ""] vẫn giữ lại để xử lý
        if (item.id === 'price') return true;
        // Các trường khác chỉ chấp nhận khi value là chuỗi không rỗng
        return (
          item.value &&
          typeof item.value === 'string' &&
          item.value.trim() !== ''
        );
      })
      .forEach((item) => {
        // 1. Nếu là price và value là mảng [min, max]
        if (
          item.id === 'price' &&
          Array.isArray(item.value) &&
          item.value.length === 2
        ) {
          const [from, to] = item.value as unknown as [string, string];
          // Nếu ít nhất một đầu có giá trị
          if ((from && from.trim() !== '') || (to && to.trim() !== '')) {
            filters.push({
              f: item.id,
              o: {
                r: {
                  vf: from.trim() !== '' ? Number(from) : null,
                  vt: to.trim() !== '' ? Number(to) : null
                }
              }
            });
          }
          return;
        }

        // 2. Nếu là field cần mapping đặc biệt (isBlocked, isRootAdmin)
        if (item.id in specialFieldMappings) {
          if (typeof item.value === 'string') {
            const mappedValue = specialFieldMappings[
              item.id as keyof typeof specialFieldMappings
            ](item.value);
            filters.push({
              f: item.id,
              o: {
                c: {
                  t: ECompare.Equal,
                  v: mappedValue
                }
              }
            });
          }
          return;
        }

        // 3. Nếu item.values là mảng không rỗng → IN
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
        }
        // 4. Nếu có valueFrom và valueTo → Range
        else if (
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
        }
        // 5. Trường hợp còn lại: có value là chuỗi → Equal
        else if (
          item.value &&
          typeof item.value === 'string' &&
          item.value.trim() !== ''
        ) {
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
      // Ở đây chỉ dùng JSON.stringify(filters) mà không encode URI
      params.push(`filters=${JSON.stringify(filters)}`);
    }
  }

  // Xử lý các trường khác (page, limit, sortBy, ...)
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
