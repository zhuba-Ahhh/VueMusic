// 专辑
export interface albumArea {
  name: string;
  code: string;
}

export interface paramsType {
  limit: number;
  order?: string;
  cat?: string;
  area?: string;
}
