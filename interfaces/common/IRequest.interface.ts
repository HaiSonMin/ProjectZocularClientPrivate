import { BoInterfaceApisCommon } from 'bodevops-be-common';

// Enum các kiểu so sánh cần định nghĩa riêng nếu chưa có
export enum ECompare {
  Equal = '=',
  NotEqual = '!=',
  Greater = '>',
  Less = '<',
  GreaterOrEqual = '>=',
  LessOrEqual = '<=',
  In = 'in'
}

// Interface IQueries chính xác
export interface IQueries<T = any> extends BoInterfaceApisCommon.IQueries<T> {}

export interface QueryFilter {
  id: string;
  value?: string;
  values?: any[];
  valueFrom?: any;
  valueTo?: any;
}

export interface QueryObject {
  filters?: QueryFilter[];
  [key: string]: any;
}
