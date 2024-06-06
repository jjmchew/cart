import { NewProductType } from './types.ts';

const baseURL = 'http://localhost:5001';

export const getAllProducts = async () => {
  const response = await fetch(`${baseURL}/api/products`);
  const data = await response.json();
  console.log('getAllProducts: ', data);
  return data;
};

export const addProduct = async (newProduct: NewProductType) => {
  const response = await fetch(`${baseURL}/api/products`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProduct),
  });
  const data = await response.json();
  console.log('addProduct', data);
  return data;
};



