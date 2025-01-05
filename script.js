const Products = [
  {id: 1, name: 'Product-1', price: 100},
  {id: 2, name: 'Product-2', price: 200},
  {id: 3, name: 'Product-3', price: 300},
];

let cart = {};

const renderCart = () =>{
  const cartContainer = document.querySelector("#cart");
  const itemsContainer = document.querySelector('.items');
  const totalAmt = document.getElementById('total-amt');

  itemsContainer.innerHTML = '';
  let total = 0;

  const cartItems = Object.keys(cart);
  if (cartItems.length === 0) {
    cartContainer.innerHTML = '<p>No Product added to the cart</p>';
    totalAmt.textContent = '0';
    return;
  }

  cartContainer.innerHTML = '';
  cartItems.forEach((id) => {
    const product = Products.find((p) => p.id === parseInt(id));
    const quantity = cart[id];
    const itemTotal = product.price * quantity;
    total += itemTotal;

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-items';
    cartItem.innerHTML = `
      <span>${product.name}</span>
      <span>${quantity} x ${product.price} = ${itemTotal}</span>
    `;

    itemsContainer.appendChild(cartItem);
  });
  totalAmt.textContent = total;
};

const renderProducts = () => {
  const productsContainer = document.getElementById('products');

  Products.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.id = `product-${product.id}`;
    productDiv.className = 'product';

    productDiv.innerHTML = `
      <span>${product.name}</span>
      <span>${product.price}</span>
      <div class="button">
        <button id="decrement-${product.id}" disabled>-</button>
        <span id="quantity-${product.id}">0</span>
        <button id="increment-${product.id}">+</button>
      </div>
    `;

    productsContainer.appendChild(productDiv);

    const incrementBtn = document.getElementById(`increment-${product.id}`);
    const decrementBtn = document.getElementById(`decrement-${product.id}`);
    const quantitySpan = document.getElementById(`quantity-${product.id}`);

    incrementBtn.addEventListener('click', () => {
      if (!cart[product.id]) cart[product.id] = 0;
      cart[product.id]++;
      quantitySpan.textContent = cart[product.id];
      decrementBtn.disabled = false;
      renderCart();
    });

    decrementBtn.addEventListener('click', () => {
      if (cart[product.id]) {
        cart[product.id]--;
        quantitySpan.textContent = cart[product.id];
        if (cart[product.id] === 0) {
          delete cart[product.id];
          decrementBtn.disabled = true; 
        }
        renderCart();
      }
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderCart();
});