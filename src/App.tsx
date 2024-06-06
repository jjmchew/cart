import { useState, useEffect } from 'react';
import Product from './components/Product.tsx';
import './App.css';
import { ProductType, NewProductType, CallbackType, CartType } from './types.ts';
import {
  getAllProducts,
  addProduct,
  getCart,
  updateProduct,
  deleteProduct,
  addCart,
  checkout
} from './service.ts';


import AddForm from './components/AddForm.tsx';
import Cart from './components/Cart.tsx';

function App() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cart, setCart] = useState<CartType[]>([]);

  useEffect(() => {
    const api = async () => {
      const p = await getAllProducts();
      setProducts(p);
    };
    try {
      api();
    } catch (e) {
      console.error('Product useEffect error: ', e);
    }
  }, []);

  useEffect(() => {
    const api = async () => {
      const c = await getCart();
      setCart(c);
    };
    try {
      api();
    } catch (e) {
      console.error('Cart useEffect error: ', e);
    }
  }, []);


  const addCartHelper = (newItem: ProductType) => {
    console.log(newItem, cart);
    if (cart.filter((item: ProductType) => item._id === newItem._id).length === 1) {
      console.log('2');
      setCart(prevCart => prevCart.map((item: ProductType) => {
        if (item._id === newItem._id) {
          return { ...item, quantity: item.quantity + 1 };
        } else return item;
      }));
    } else {
      console.log('1');
      setCart(prevCart => prevCart.concat(newItem));
    }
  };

  const handleAddProduct = async (newProduct: NewProductType, callback: CallbackType = null) => {
    try {
      const response = await addProduct(newProduct);
      setProducts(products.concat(response));
      if (callback) callback();
    } catch (e) {
      console.error('App handleAdd error: ', e);
    }
  };

  const handleEdit = async (updatedProduct: ProductType, callback: CallbackType = null) => {
    try {
      const response = await updateProduct(updatedProduct);
      setProducts(prevProducts => prevProducts.map((product: ProductType) => {
        if (product._id === response._id) return response;
        return product;
      }));
      if (callback) callback();
    } catch (e) {
      console.error('App handleEdit error: ', e);
    }
  };

  const handleDelete = async (productId: string, callback: CallbackType = null) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter((product: ProductType) => product._id !== productId));
      if (callback) callback();
    } catch (e) {
      console.error('App handleDelete error: ', e);
    }
  }

  const handleAddCart = async (productId: string, callback: CallbackType = null) => {
    try {
      const response = await addCart(productId);
      addCartHelper(response.item);
      handleEdit(response.product);
      if (callback) callback();
    } catch (e) {
      console.error('App handleAddCart ', e);
    }
  };

  const handleCheckout = async () => {
    try {
      await checkout();
      setCart([]);
    } catch (e) {
      console.error('App handleCheckout ', e);
    }
  }


  return (
    <div id="app">
      <header>
        <Cart items={cart} onCheckout={handleCheckout} />
      </header>
      <main>
        <div className="product-listing">
          <h2>Products</h2>
          <ul className="product-list">
            {products.map((product: ProductType) => {
              return <Product
                key={product._id}
                {...product}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAddCart={handleAddCart}
              />
            })}
          </ul>
        </div>
        <AddForm onAdd={handleAddProduct} />
      </main>
    </div>
  )
}

export default App;


