export interface ProductType {
  _id: string,
  title: string,
  price: number,
  quantity: number
}

export interface NewProductType extends Omit<ProductType, '_id'> { }

export type CallbackType = Function | null;


