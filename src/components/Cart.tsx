import CartItem from './CartItem.tsx';
import { ProductType } from '../types.ts';

interface CartProps {
  items: ProductType[],
}

const Cart = ({ items }: CartProps) => {

  const calcTotal = () => {
    return items.reduce((acc, obj) => acc + (obj.quantity * obj.price), 0);
  };

  return (
    <>
      <h1>The Shop!</h1>
      <div className="cart">
        <h2>Your Cart</h2>
        <table className="cart-items">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => {
              return <CartItem key={item._id} {...item} />
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="total">Total: ${calcTotal()}</td>
            </tr>
          </tfoot>
        </table>
        <div className="checkout-button">
          <button className="checkout">Checkout</button>
        </div>
      </div>
    </>
  );
};

export default Cart;
