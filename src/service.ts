import { NewProductType, ProductType } from './types.ts';

const baseURL = 'http://localhost:5001';


export const getAllProducts = async () => {
  const response = await fetch(`${baseURL}/api/products`);
  const data = await response.json();
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
  return data;
};


export const getCart = async () => {
  const response = await fetch(`${baseURL}/api/cart`);
  const data = await response.json();
  return data;
};


export const updateProduct = async (updatedProduct: ProductType) => {
  const response = await fetch(`${baseURL}/api/products/${updatedProduct._id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: updatedProduct.title,
      price: updatedProduct.price,
      quantity: updatedProduct.quantity,
    })
  });

  const data = await response.json();
  return data;
};


export const deleteProduct = async (productId: string) => {
  await fetch(`${baseURL}/api/products/${productId}`, {
    method: 'delete'
  });

  return true;
};

export const addCart = async (productId: string) => {
  const response = await fetch(`${baseURL}/api/add-to-cart`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productId: productId
    })
  });

  const data = await response.json();
  return data;
};

export const checkout = async () => {
  await fetch(`${baseURL}/api/checkout`, {
    method: 'post'
  });

  return true;
};


