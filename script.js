const container = document.querySelector('.container');
const cart = document.querySelector('.Cart-itens');
const input = document.querySelector('#search');

function createCartItem({ title, price, thumbnail }) {
  const div = document.createElement('div');
  div.className = 'cart-item';
  div.innerHTML = `
  <img src=${thumbnail} class="cart-item-img">
  <span class="cart-item-text">${title}</span>
  <span class="cart-item-price">${price}</span>
  `;

  const removeButton = document.createElement('a');
  removeButton.className = 'remove-item';
  removeButton.innerText = 'Remover do carrinho';
  removeButton.addEventListener('click', (event) =>
    event.target.parentNode.remove()
  );

  div.append(removeButton);
  cart.appendChild(div);
}

async function addItemToCart(id) {
  // eslint-disable-next-line no-undef
  const item = await fetchItem(id);
  createCartItem(item);
}

function createCardItens({ id, thumbnail, title, price }) {
  const div = document.createElement('div');
  div.className = 'product-item';
  div.innerHTML = `
    <img src=${thumbnail} class="product-img">
    <span class="product-text">${title}</span>
    <span class="product-price">${price}</span>
    <button class="addToCart" onclick="addItemToCart(${id})">Adicionar ao carrinho</button>
  `;

  const addButton = document.createElement('button');
  addButton.className = 'addToCart';
  addButton.innerText = 'Adicionar ao carrinho';
  addButton.addEventListener('click', () => addItemToCart(id));

  div.appendChild(addButton);
  container.appendChild(div);
}

async function renderProducts(param) {
  // eslint-disable-next-line no-undef
  const dados = await fetchProducts(param);
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

window.onload = renderProducts('QUERY');
