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
    setCart(prevCart => {
      const isExistingItem = () => prevCart.find(item => item._id === newItem._id);
      if (isExistingItem()) {
        return prevCart.map((item: ProductType) => {
          if (item._id === newItem._id) {
            return { ...item, quantity: item.quantity + 1 };
          } else return item;
        });
      } else {
        return prevCart.concat(newItem);
      }
    });
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
    const product = products.find(product => product._id === productId);
    if (!product || product.quantity === 0) return;

    // Note optimistic update of products state (before confirmation of successful db request)
    // - since the back end db does not implement 'transactions' to ensure that a product cannot be added to the cart
    //   independently of removing that quantity, it is possible for product quantities and cart quantities to get
    //   "out-of-sync" and for more products to be added to the cart than exist
    // - optimistic updates use the fast nature of the client-side to prevent more requests being submitted
    //   to the back-end than should be possible

    setProducts(prevProducts => prevProducts.map((oldProduct: ProductType) => {
      if (oldProduct._id === productId) {
        return { ...oldProduct, quantity: oldProduct.quantity - 1};
      } else return oldProduct;
    }));

    try {
      const response = await addCart(productId);
      addCartHelper(response.item);
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


