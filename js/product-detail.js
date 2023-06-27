const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("product");
window.productsArray = [];
window.cartItems = [];
async function loadJSON() {
  try {
    const response = await axios.get('/mock/products.json');
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

loadJSON()
  .then(data => {
    const products = data[0];
    let foundProduct = null;
    for (let i = 0; i < products.length; i++) {
      if (products[i].productId === productId) {
        foundProduct = products[i];
        break;
      }
    }
    if (foundProduct) {
      displayProductDetails(foundProduct);
      window.productsArray.push(foundProduct);
    } else {
      console.error("Product not found!");
    }
  })
  .catch(error => {
    console.error("JSON Error:", error);
  });


function displayProductDetails(product) {
  const container = document.getElementById('product-area');
  container.innerHTML = '';
  const {
    image,
    title,
    description,
    price,
    oldPrice,
    productId
  } = product;
  if (product) {
    const productHtml = `
    <div class="product-details">
    <img class="product-image" src="${image}" alt="Product Image">
    <div>
        <div class="product-header">
            <h1 class="product-name">${title}</h1>
            <h1 id="productId">${productId}</h1>
        </div>
        <div class="product-content">
            <h2 class="product-description">${description}</h2>
            <span class="product-old-price" style="text-decoration:line-through;">${oldPrice ? oldPrice + 'TL' : ''}</span>
            <span class="product-price">${price +'TL'}</span>
        </div>
        <div class="actions">
            <button type="submit" title="Sepete Ekle" class="add-to-cart" onclick="addToCart('${productId}')">
                <span>Sepete Ekle</span>
            </button>
                                    
        </div>
    </div>
  </div>
    `;
    container.innerHTML = productHtml;
  }
}

const addToCart = (productId) => {

  const basketCounter = document.getElementById('basket-counter');
  const product = window.productsArray.find(item => item.productId === productId);
  const button = document.querySelector('.add-to-cart');

  if (product) {
    window.cartItems.push(product);
    basketCounter.innerHTML = window.cartItems.length;

    // Veri kaydetme işlemi
    const storedCartItems = localStorage.getItem('cartItems');
    let parsedCartItems = [];
    if (storedCartItems) {
      parsedCartItems = JSON.parse(storedCartItems);
    }
    parsedCartItems.push(product);
    const updatedCartItems = JSON.stringify(parsedCartItems);
    localStorage.setItem('cartItems', updatedCartItems);
    button.disabled = true;
    showPopup();
  }
};


const basketButton = document.querySelector('.fa-cart-shopping');
basketButton.addEventListener('click', function () {
  let basketCounter = document.getElementById('basket-counter').innerText;
 if(parseInt(basketCounter) > 0){
  window.open('/basket.html', '_blank');
 } 
})

function showPopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'block';
  setTimeout(function() {
    popup.style.display = 'none';
  }, 1000);
}
