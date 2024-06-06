import { ProductType } from '../types.tsx';

interface CartItemProps extends ProductType { }

const CartItem = ({ title, quantity, price }: CartItemProps) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{quantity}</td>
      <td>${price}</td>
    </tr>
  );
};

export default CartItem;
