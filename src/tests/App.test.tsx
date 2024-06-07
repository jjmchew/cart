import App from '../App.tsx';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


it('contains form inputs to add products at bottom of page', () => {
  render(<App />);
  const productInput = screen.getByRole('textbox', { name: 'Product Name:' });
  const priceInput = screen.getByRole('spinbutton', { name: 'Price:' });
  const quantityInput = screen.getByRole('spinbutton', { name: 'Quantity:' });
  expect(productInput).toBeInTheDocument();
  expect(priceInput).toBeInTheDocument();
  expect(quantityInput).toBeInTheDocument();
});



it('can input text to product name', async () => {
  const user = userEvent.setup();
  render(<App />);

  const inputName = screen.getByRole('textbox', { name: 'Product Name:' });
  await user.type(inputName, 'new product');
  expect(inputName).toHaveValue('new product');
});



it('cannot input text to price', async () => {
  const user = userEvent.setup();
  render(<App />);

  const inputPrice = screen.getByRole('spinbutton', { name: 'Price:' });
  await user.type(inputPrice, 'new');
  expect(inputPrice).toHaveValue(null);
});



it('test adding new product', async () => {
  const user = userEvent.setup();
  render(<App />);

  const inputName = screen.getByRole('textbox', { name: 'Product Name:' });
  await user.type(inputName, 'unique product');
  const inputPrice = screen.getByRole('spinbutton', { name: 'Price:' });
  await user.type(inputPrice, '13');
  const inputQuantity = screen.getByRole('spinbutton', { name: 'Quantity:' });
  await user.type(inputQuantity, '240');

  await user.click(screen.getByRole('button', { name: 'Add' }));

  const heading = screen.getAllByRole('heading', { level: 3 });
  const price = screen.getByDisplayValue(/13/);
  const quantity = screen.getByDisplayValue(/240/);
  expect(heading[heading.length - 1]).toHaveTextContent('unique product');
  expect(price).toBeInTheDocument();
  expect(quantity).toBeInTheDocument();

})
