# Shopping cart app (James)

## Issue
- We discussed "add to cart button spamming" - I've left the code as it was when we discussed it (with the `console.log` statements still included)
- Related to this issue:  I noticed in `App.tsx` on lines 99/99/100 that I perhaps should also use `Promise.all` since I want to BOTH add a cart item AND reduce the product quantity before anything else happens
  - I belive this would fix the issue of adding more items to the cart (when spamming the button) than actual quantities available


- `App.tsx` `addCartHelper` : within this helper when should dispatch functions be used?
  - initially, I used a dispatch function for both updating quantities AND just adding a new item
  - however, it seemed like when I used the dispatch function for adding a new item, multiple versions of the product were added (I suspect this has something to do with when the state is being updated?)




## Questions
- `App.tsx`:  Should I have put all of the handlers into a `helper.tsx` file? (i.e., `handleAddProduct`, `handleEdit`, `handleDelete`, etc.)
  - The trade-off is that this would definitely have made things messier if I wanted to create on-screen error messages

- `App.tsx`:  Should I try to reduce the repetition within all of the handlers? (e.g., using partial function application and another callback function parameter?)
  - this would shorten `App.tsx` if I wanted to keep all of the handlers with `App.tsx`

- `App.tsx' `addCartHelper` : should this also be in a separate helper file?
  - to do that, I'd have to pass into the function the `setCart` state setter:  Is that an anti-pattern?
  - again, I'm asking since `App.tsx` is becoming quite large....


