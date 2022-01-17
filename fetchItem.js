const fetchItem = async (productId) => {
  try {
    const url = `https://api.mercadolibre.com/items/${productId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
