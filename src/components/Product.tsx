import { useState } from 'react';
import { ProductType, CallbackType } from '../types.ts';
import EditForm from './EditForm.tsx';

interface ProductProps extends ProductType {
  onEdit: (updatedProduct: ProductType, callback?: CallbackType) => void,
  onDelete: (productId: string, callback?: CallbackType) => void,
  onAddCart: (productId: string, callback?: CallbackType) => void
}


const Product = (props: ProductProps) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleCancel = () => {
    setShowEdit(false);
  };

  const handleDelete = () => {
    props.onDelete(props._id);
  };

  const handleAdd = () => {
    if (props.quantity >= 1) props.onAddCart(props._id);
  };

  const buttonStyle = props.quantity <= 0
    ? { cursor: 'not-allowed' }
    : {}

  return (
    <>
      <li className="product">
        <div className="product-details">
          <h3>{props.title}</h3>
          <p className="price">${props.price}</p>
          <p className="quantity">{props.quantity} left in stock</p>
          <div className="actions product-actions">
            <button className="add-to-cart" onClick={handleAdd} style={buttonStyle}>Add to Cart</button>
            <button className="edit" onClick={() => {
              setShowEdit(prevState => !prevState)
            }}>Edit</button>
          </div>
          <button className="delete-button" onClick={handleDelete}><span>X</span></button>
        </div>
        {showEdit
          ? <EditForm
            {...props}
            onCancel={handleCancel}
            onEdit={props.onEdit}
          />
          : null}
      </li>
    </>
  );
};

export default Product;

