export type TWebSocketEvent = { isTrusted: boolean }

export type TOrder = {
  _id: string,
  ingredients: string[],
  status: 'created' | 'pending' | 'done',
  name: string,
  number: number,
  createdAt: string,
  updatedAt: string
};

export type TAllOrders = {
  "success": boolean,
  "orders": TOrder
  "total": number,
  "totalToday": number
}