//для описания типов состояния карточек
import type { EnumStatus } from '@/types/deals.types';
//карточка
export interface ICard {
  id: string,
  name: string,
  price: number,
  $createdAt: string,
  companyName: string,
  status: string
};

//колонки с карточками
export interface IColumn {
  id: EnumStatus,
  name: string,
  items: ICard[]
};

