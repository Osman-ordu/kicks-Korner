
async function loadJSON() {
  try {
      const response = await axios.get('products.json');
      return response.data;
  } catch (error) {
      console.error(error);
  }
}

loadJSON()
  .then(data => {
      window.productsArray = data[0];
      displayProducts(window.productsArray)
  })
  .catch(error => console.error(error));
  const displayProducts = (products) => {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';
  
    const uniqueProducts = {};
  
    products.forEach((product) => {
      const productId = product.productId;
      // uniqueProducts nesnesinde aynı productId'e sahip ürünlerin kontrolü
      const key = `${productId}`;
      if (!uniqueProducts[key]) {
        uniqueProducts[key] = product; // Eğer ürün listede yoksa, uniqueProducts nesnesine ekle
      }
    });
  
    Object.values(uniqueProducts).forEach((product) => {
      const { image, title, description, price, oldPrice, newSeason, productId } = product;
      const badge = !newSeason ? `${((oldPrice - price) / oldPrice * 100).toFixed(2)}%` : 'New Season';
      const badgeClass = newSeason ? 'season' : 'oldSeason';
  
      const img = new Image();
      img.onload = function () {
        if (img.complete) {
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
          setTimeout(listedQuantity, 100);
          removeLoader();
        }
      };
      img.onerror = function () {
        const productItem = img.closest('.product-item');
        if (productItem) {
          productItem.parentNode.removeChild(productItem); // Hata durumunda ürünü kaldır
        }
        removeLoader();
      };
  
      img.src = image;
    });
  };
  

  const sortFunctions = {
    byPrice: () => {
      const sortedProducts = window.productsArray.slice().sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        return priceA - priceB;
      });
      displayProducts(sortedProducts);
    },
    byPriceReverse: () => {
      const sortedProducts = window.productsArray.slice().sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        return priceB - priceA;
      });
      displayProducts(sortedProducts);
    },
    season: () => {
      const filteredItems = window.productsArray.filter(item => item.newSeason);
      displayProducts(filteredItems);
    },
    oldSeason: () => {
      const filteredItems = window.productsArray.filter(item => !item.newSeason);
      displayProducts(filteredItems);
    }
  };
  


if (!window.cartItems) {
  window.cartItems = [];
}

const addToCart = (productId) => {
  const basketCounter = document.getElementById('basket-counter');
  const product = window.productsArray.find(item => item.productId === productId);
  
  if (product && !isProductInCart(product.productId)) {
    window.cartItems.push(product);
    basketCounter.innerHTML = window.cartItems.length; 
  }
};

const isProductInCart = (productId) => {
  return window.cartItems.some(item => item.productId === productId);
};


const sortButton = document.getElementById('sort-button');
const sortButtonReverse = document.getElementById('sort-button-reverse');
const sortSeason = document.getElementById('season');
const sortOldseason = document.getElementById('old-season');
const productPieces = document.getElementById('product-pieces');


sortButton.addEventListener('click', sortFunctions.byPrice);
sortButtonReverse.addEventListener('click', sortFunctions.byPriceReverse);
sortSeason.addEventListener('click',sortFunctions.season);
sortOldseason.addEventListener('click',sortFunctions.oldSeason)


const listedQuantity = () => {
    productPieces.innerHTML = document.querySelectorAll('.product-item').length;
}


const handleTabClick = () => {
    const tabs = document.querySelectorAll('.tab');
  
    for (const tab of tabs) {
      tab.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('tab')) {
          const that = target;
          if (!that.classList.contains('active')) {
            const activeTabs = document.querySelectorAll('.active');
            activeTabs.forEach((activeTab) => {
              activeTab.classList.remove('active');
            });
            that.classList.add('active');
          }
        }
      });
    }
  };
  handleTabClick();
  
  function removeLoader() {
    const loaders = document.getElementsByClassName('loader');
    
    setTimeout(() => {
      for (let i = 0; i < loaders.length; i++) {
        loaders[i].classList.remove('loader');
      }
    }, 1000);
  }


  const basketButton = document.querySelector('.fa-cart-shopping');

  const basketHandler = (cartItems) => {
    const storedCartItems = localStorage.getItem('cartItems');
    let updatedCartItems = cartItems;
  
    if (storedCartItems) {
      const parsedStoredCartItems = JSON.parse(storedCartItems);
      const existingItemIds = parsedStoredCartItems.map(item => item.id);
  
      cartItems.forEach(cartItem => {
        if (!existingItemIds.includes(cartItem.id)) {
          updatedCartItems.push(cartItem);
        }
      });
    }
  
    if (updatedCartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
  };
  
  basketButton.addEventListener('click', function() {
    basketHandler(window.cartItems);
  });
  


