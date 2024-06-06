import { useState } from 'react';
import { NewProductType, CallbackType } from '../types.ts';

interface AddFormProps {
  onAdd: (newProduct: NewProductType, callback: CallbackType) => Promise<void>;
}

const AddForm = ({ onAdd }: AddFormProps) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(0);

  const handleAdd = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onAdd({
      title: productName,
      price: parseFloat(price),
      quantity: quantity,
    }, resetForm);
  };

  const resetForm = () => {
    setProductName('');
    setPrice('');
    setQuantity(0);
  };

  return (
    <div className="add-form">
      <form>
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            value={productName}
            placeholder='Enter name'
            onChange={e => setProductName(e.target.value)}
            id="product-name"
            name="product-name"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-price">Price:</label>
          <input
            type="number"
            placeholder='Enter price'
            value={price}
            onChange={e => setPrice(e.target.value)}
            id="product-price"
            name="product-price"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={e => setQuantity(parseInt(e.target.value, 10))}
            id="product-quantity"
            name="product-quantity"
            min="0"
            required
          />
        </div>
        <div className="actions form-actions">
          <button type="submit" onClick={handleAdd}>Add</button>
          <button type="button" onClick={resetForm}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
