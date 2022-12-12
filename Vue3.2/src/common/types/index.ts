// 专辑
export interface albumArea {
  name: string;
  code: string;
}

// 请求传参
export interface paramsType {
  limit: number;
  order?: string;
  cat?: string;
  area?: string;
}
