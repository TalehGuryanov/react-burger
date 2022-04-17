export type TSingleOrderData = {
  success: boolean;
  name: string;
  order: { number: number }
}

export type TOrder = {
  _id: string,
  ingredients: string[],
  status: 'created' | 'pending' | 'done',
  name: string,
  number: number,
  createdAt: string,
  updatedAt: string
};

export type TOrderData = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number
}