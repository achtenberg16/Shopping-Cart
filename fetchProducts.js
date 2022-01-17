/* eslint-disable no-unused-vars */
const fetchProducts = async (parameter) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${parameter}`;
    const response = await fetch(url);
    const dados = response.json();
    return dados;
  } catch (error) {
    return error;
  }
};

// module.exports = fetchProducts;
