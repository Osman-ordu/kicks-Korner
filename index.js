
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
    console.log(window.productsArray);
    displayProducts(window.productsArray);
  })
  .catch(error => console.error(error));


const displayProducts = (products) => {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; 

    products.forEach(product => {
      
        const image = product.image;
        const title = product.title;
        const description = product.description;
        const price = product.price;
        const oldPrice = product.oldPrice ?  product.oldPrice : '';
        const season = product.newSeason == true ? 'New Season' : '';
        const productId = product.productId;
        const badge = !season ? ((oldPrice - price) / oldPrice * 100).toFixed(2)+'%' : season;
        const badgeClass = season ? 'season' : 'oldSeason'; 
      
 
        const img = new Image();
        img.onload = function () {
            if (img.complete) {
              
                const cartHtml =
                    `<div class="product-item">
                            <div class="image-wrapper">
                                <img class="cart-image" src="${image}" alt="${title}">
                                <div class="loader" ></div>
                            </div>
                            <span class="badge ${badgeClass}">${badge}</span>
                            <div class ="cart-content">
                            <div class="cart-title">${title + ' ' + `${productId}`}
                            
                            </div>
                            <div class="cart-description">${description}</div>
                            <span ${oldPrice ? `class="cart-old-price" ` : `class="cart-old-price hidden"`} > ${oldPrice} TL</span>
                            <span class="cart-price" ${oldPrice ? 'style="color:red;"' : 'style="color:#000;"'}>${price} TL</span>
                            </div>
                        </div>`;
                 productContainer.innerHTML += cartHtml;
                 setTimeout(listedQuantity,100)
                 removeLoader();

            } 
        };
        img.src = image;
    });
};

const sortFunctions = {
    byPrice: () => {
      window.productsArray.sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        return priceA - priceB;
      });
      displayProducts(window.productsArray);
    },
    byPriceReverse: () => {
      window.productsArray.sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        return priceB - priceA;
      });
      displayProducts(window.productsArray);
    
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

    
