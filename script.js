const container = document.querySelector('.container');

function addtoCart(id) {
  console.log(id);
}

function createCardItens({
  id, thumbnail, title, price,
}) {
  const div = `
  <div class="product-item"> 
  <img src=${thumbnail} class="product-img">
  <span class="product-text">${title}</span>
  <span class="product-price">${price}</span>
  <button class="addToCart" onclick="addtoCart(${id})">Adicionar ao carrinho</button>
 </div>
  `;
  container.insertAdjacentHTML('beforeend', div);
}

async function renderProducts() {
  // eslint-disable-next-line no-undef
  const dados = await fetchProducts('QUERY');
  dados.results.forEach((element) => {
    createCardItens(element);
  });
}
window.onload = renderProducts();
