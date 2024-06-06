import { useState } from 'react';
import { ProductType } from '../types.ts';

interface EditFormProps extends ProductType {
  onCancel: () => void;
}

const EditForm = ({ title, price, quantity, onCancel }: EditFormProps) => {
  const [formTitle, setFormTitle] = useState(title);
  const [formPrice, setFormPrice] = useState(price.toString());
  const [formQuantity, setFormQuantity] = useState(quantity.toString());

  const handleUpdate = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (formTitle === title && formPrice === price.toString() && formQuantity === quantity.toString()) return;

    console.log('EditForm handleUpdate: ', formTitle, formPrice, formQuantity);
  };

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form>
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            value={formTitle}
            onChange={e => setFormTitle(e.target.value)}
            aria-label="Product Name"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            type="number"
            id="product-price"
            value={formPrice}
            onChange={e => setFormPrice(e.target.value)}
            aria-label="Product Price"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            type="number"
            id="product-quantity"
            value={formQuantity}
            onChange={e => setFormQuantity(e.target.value)}
            aria-label="Product Quantity"
          />
        </div>

        <div className="actions form-actions">
          <button type="submit" onClick={handleUpdate}>Update</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
