import { useState } from 'react';
import { ProductType } from '../types.ts';
import EditForm from './EditForm.tsx';

interface ProductProps extends ProductType { }

const Product = (props: ProductProps) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleCancel = () => {
    setShowEdit(false);
  };

  const handleDelete = () => {
    console.log('Product handleDelete', props._id);
  };

  const handleAdd = () => {
    console.log('Product AddtoCart', props._id);
  };

  return (
    <>
      <li className="product">
        <div className="product-details">
          <h3>{props.title}</h3>
          <p className="price">${props.price}</p>
          <p className="quantity">{props.quantity} left in stock</p>
          <div className="actions product-actions">
            <button className="add-to-cart" onClick={handleAdd}>Add to Cart</button>
            <button className="edit" onClick={() => {
              setShowEdit(prevState => !prevState)
            }}>Edit</button>
          </div>
          <button className="delete-button" onClick={handleDelete}><span>X</span></button>
        </div>
        {showEdit ? <EditForm {...props} onCancel={handleCancel} /> : null}
      </li>
    </>
  );
};

export default Product;

