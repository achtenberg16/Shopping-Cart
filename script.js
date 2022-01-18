const container = document.querySelector('.container');
const cart = document.querySelector('.Cart-itens');
const input = document.querySelector('#search');
const empty = document.querySelector('.empty-cart');

const getSavedCartItems = () => localStorage.getItem('cartItems');
const saveCartItems = (item) => localStorage.setItem('cartItems', item);

const updateTotalPrice = () => {
  const pricesArr = Array.from(document.querySelectorAll('.cart-item-price'));
  const priceElement = document.querySelector('.total-price');

  const totalPrice = pricesArr.reduce((acc, { innerText }) => {
    const [, price] = innerText.split('$');
    return acc + Number(price);
  }, 0);

  priceElement.innerText = `R$${totalPrice.toFixed(2)}`;
};

const emptyCart = () => {
  console.log('clicked');
  cart.innerHTML = '';
  saveCartItems('');
  updateTotalPrice();
};
empty.addEventListener('click', emptyCart);

const removeCartItem = (event) => {
  event.target.parentNode.remove();
  saveCartItems(cart.innerHTML);
  updateTotalPrice();
};

function createCartItem({ title, price, thumbnail }) {
  const div = document.createElement('div');
  div.className = 'cart-item';
  div.innerHTML = `
  <div><img src=${thumbnail} class="cart-item-img">
  <span class="cart-item-text">${title}</span></div>
  <span class="cart-item-price">R$${price}</span>
  `;

  const removeButton = document.createElement('a');
  removeButton.className = 'remove-item';
  removeButton.innerText = 'Remover do carrinho';
  removeButton.addEventListener('click', removeCartItem);

  div.append(removeButton);
  cart.appendChild(div);
}

function loading (){
  const div1 = document.createElement('div')
  const div2 = document.createElement('div')
  div1.className = 'load'
  div2.className = 'load2'
  div1.appendChild(div2)
  container.appendChild(div1)
}

function removeLoad(){
  const loadRemove = document.querySelector('.load')
  loadRemove.remove()
}
async function addItemToCart(id) {
  // eslint-disable-next-line no-undef
  const item = await fetchItem(id);
  createCartItem(item);
  saveCartItems(cart.innerHTML);
  updateTotalPrice();
}

function createCardItens({ id, thumbnail, title, price }) {
  const div = document.createElement('div');
  div.className = 'product-item';
  div.innerHTML = `
    <div><img src=${thumbnail} class="product-img">
    <p class="product-text">${title}</p></div>
    <p class="product-price">R$${price}</p>
  `;

  const addButton = document.createElement('button');
  addButton.className = 'addToCart';
  addButton.innerText = 'Adicionar ao carrinho';
  addButton.addEventListener('click', () => addItemToCart(id));

  div.appendChild(addButton);
  container.appendChild(div);
  updateTotalPrice();
}

async function renderProducts(param) {
  loading();
  // eslint-disable-next-line no-undef
  const dados = await fetchProducts(param);
  removeLoad();
  dados.results.forEach((element) => {
    createCardItens(element);
  });
}

input.addEventListener('keyup', async (event) => {
  if (event.keyCode === 13) {
    container.innerHTML = '';
    await renderProducts(event.target.value);
    input.value = '';
  }
});

const getCartFromLocalStorage = () => {
  cart.innerHTML = getSavedCartItems();
  const removeBtnArr = Array.from(document.querySelectorAll('.remove-item'));

  removeBtnArr.forEach((btn) => {
    btn.addEventListener('click', removeCartItem);
  });
};

window.onload = () => {
  renderProducts()
  getCartFromLocalStorage();
  updateTotalPrice();
};
