let productItem;
let basketCounter;
const storedCartItems = localStorage.getItem('cartItems');

const renderCartItem = (cartItem) => {
  const { image, title, description, price, productId } = cartItem;

  return `
    <div class="product-item">
      <div class="image-wrapper">
        <img class="cart-image" src="${image}" alt="${title}">
      </div>
      <div class="cart-content">
        <div class="cart-title">${title} ${productId}</div>
        <div class="cart-description">${description}</div>
        <div class="cart-footer">
        <span class="cart-price">${price} TL</span>
          <button class="btn-delete" onclick="removeItem('${productId}')" type="button"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    </div>`;
};

const renderCartItems = () => {
  const productContainer = document.getElementById('product-container');
  productContainer.innerHTML = '';

  if (storedCartItems) {
    const parsedCartItems = JSON.parse(storedCartItems);

    const uniqueProductIds = [...new Set(parsedCartItems.map(cartItem => cartItem.productId))];
    const uniqueCartItems = uniqueProductIds.map(productId => parsedCartItems.find(cartItem => cartItem.productId === productId));

    uniqueCartItems.forEach(cartItem => {
      const cartHtml = renderCartItem(cartItem);
      productContainer.innerHTML += cartHtml;
    });
  }

  counterUpdate();
};

const removeItem = (itemId) => {
  let storedCartItems = localStorage.getItem('cartItems');
  const parsedCartItems = JSON.parse(storedCartItems);
  const updatedCartItems = parsedCartItems.filter(cartItem => cartItem.productId !== itemId);
  
  for (let i = 0; i < productItem.length; i++) {
    const productIdElement = productItem[i].querySelector('.cart-title').textContent.split(' ').pop();
    if (productIdElement === itemId) {
      productItem[i].remove();
      break;
    }
  }

  storedCartItems = JSON.stringify(updatedCartItems);
  localStorage.setItem('cartItems', storedCartItems);

  counterUpdate();
  updateTotalPrice()
  return updatedCartItems;
};

const counterUpdate = () => {
  productItem = document.getElementsByClassName('product-item');
  basketCounter = document.getElementById('basket-counter');
  basketCounter.innerHTML = productItem.length.toString();
};

renderCartItems();

let totalPrice = 0;

const updateTotalPrice = () => {
 
  const elements = document.getElementsByClassName('cart-price');
  let newTotal = 0;

  for (const element of elements) {
    const priceText = element.textContent;
    const price = parseFloat(priceText.replace('TL', '').trim());

    if (!isNaN(price)) {
      newTotal += price;
    }
  }

  totalPrice = newTotal;
  const totalPriceElement = document.getElementById('total-price');
  totalPriceElement.textContent = `Toplam fiyat: ${totalPrice}`;
};

updateTotalPrice()