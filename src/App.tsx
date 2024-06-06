import { useState, useEffect } from 'react';
import Product from './components/Product.tsx';
import './App.css';
import { mockCart } from './mockData.ts';
import { ProductType, NewProductType, CallbackType } from './types.ts';
import { getAllProducts, addProduct } from './service.ts';


import AddForm from './components/AddForm.tsx';
import Cart from './components/Cart.tsx';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const api = async () => {
      const p = await getAllProducts();
      setProducts(p);
    };
    api();
  }, []);


  const handleAdd = async (newProduct: NewProductType, callback: CallbackType = null) => {
    console.log('App handleAdd');
    try {
      const response = await addProduct(newProduct);
      setProducts(products.concat(response));
      if (callback) {
        callback();
      }
    } catch (e) {
      console.error('App handleAdd error: ', e);
    }
  };


  return (
    <div id="app">
      <header>
        <Cart items={mockCart} />
      </header>
      <main>
        <div className="product-listing">
          <h2>Products</h2>
          <ul className="product-list">
            {products.map((product: ProductType) => {
              return <Product key={product._id} {...product} />
            })}
          </ul>
        </div>
        <AddForm onAdd={handleAdd} />
      </main>
    </div>
  )
}

export default App;


