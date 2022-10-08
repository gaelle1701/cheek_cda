import { Observable } from 'rxjs';

export interface ICrud<T> {
  baseUrl: string;
  findAll: () => Observable<T[]>;
  findOne: (id: number) => Observable<T>;
  create: (data: T) => Observable<T>;
  update: (id: number, data: Partial<T>) => Observable<T>;
  delete: (id: number) => Observable<T>;
}
