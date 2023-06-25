const storedCartItems = localStorage.getItem('cartItems');

if (storedCartItems) {
const productContainer = document.getElementById('product-container');
const parsedCartItems = JSON.parse(storedCartItems);

parsedCartItems.forEach(cartItem => {
const { image, title, description, price, oldPrice, newSeason, productId } = cartItem;
const badge = !newSeason ? `${((oldPrice - price) / oldPrice * 100).toFixed(2)}%` : 'New Season';
const badgeClass = newSeason ? 'season' : 'oldSeason';

const cartHtml = `
  <div class="product-item">
    <div class="image-wrapper">
      <img class="cart-image" src="${image}" alt="${title}">
      <div class="loader"></div>
    </div>
    <span class="badge ${badgeClass}" style="${badgeClass !== 'season' ? 'border:none !important;' : 'border: 3px solid green;'}">${badge}</span>
    <div class="cart-content">
      <div class="cart-title">${title} ${productId}</div>
      <div class="cart-description">${description}</div>
      <span ${oldPrice ? 'class="cart-old-price"' : 'class="cart-old-price hidden"'}>${oldPrice} TL</span>
      <span class="cart-price" ${oldPrice ? 'style="color:red;"' : 'style="color:#000;"'}>${price} TL</span>
    </div>
    <div class="cart-actions">
      <button class="add-to-cart" onclick="addToCart('${productId}')"><i class="fa-solid fa-square-plus"></i></button>
    </div>
  </div>`;

productContainer.innerHTML += cartHtml;
});
}

function removeLoader() {
const loaders = document.getElementsByClassName('loader');

setTimeout(() => {
  for (let i = 0; i < loaders.length; i++) {
    loaders[i].classList.remove('loader');
  }
}, 1000);
}

removeLoader();
