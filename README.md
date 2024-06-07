# Shopping cart app (James)

## Issues / Questions
- `App.test.tsx`:
  - testing the addition of a new product
  - the new product should appear on the screen, but the test is failing since that product does not seem to be rendered to 'screen'
  - invoking `render(<App />)` again after clicking the button does not seem to help

- `App.test.tsx`:
  - when running the test, a new item is actually added to the db
  - is there a way to prevent that?  (I assume mocking, is the key)
