//сделки типы
//базовые поля
export interface IBaseField {
  $createdAt: string,
  $id: string
}
//клиент компания
export interface ICustomer extends IBaseField {
  name: string,
  email: string,
  avatar_url: string,
  from_source?: string
}
//комментарии
export interface IComment extends IBaseField {
  text: string
}
//статусы канборд полей enum зарезервированные строки которые есть и в bd
export enum EnumStatus {
  'todo' = 'todo',
  'to-be-agreed' = 'to-be-agreed',
  'in-progress' = 'in-progress',
  'produced' = 'produced',
  'done' = 'done'
}

export interface IDeal extends IBaseField {
  comments: IComment[],
  customer: ICustomer,
  name: string,
  price: number,
  status: EnumStatus
}