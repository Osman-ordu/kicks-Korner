async function loadJSON() {
    try {
        const response = await fetch('product.json');
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('JSON dosyası yüklenirken bir hata oluştu.');
        }
    } catch (error) {
        console.error(error);
    }
}
loadJSON()
    .then(data => {
        window.productsArray = data.products;
        displayProducts(window.productsArray);
    })
    .catch(error => console.error(error));

const displayProducts = (products) => {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; 

    products.forEach(product => {
        const image = product.image,
              title = product.title,
              description = product.description,
              price = product.price,
              oldPrice = product.oldPrice ?  product.oldPrice : '',
              season = product.newSeason == true ? 'New Season' : '';
        const img = new Image();
        img.onload = function () {

            if (img.width > 300) {
                const cartHtml =
                    `<div class="product-item">
                            <div class="image-wrapper">
                                <img class="cart-image" src="${image}" alt="${title}">
                            </div>
                            <div class ="cart-content">
                            <div class="cart-title">${title}
                            <span class="season-content">${season}</span>
                            </div>
                            <div class="cart-description">${description}</div>
                            <div ${oldPrice ? `class="cart-old-price" ` : `class="cart-old-price hidden"`} > ${oldPrice} TL</div>
                            <div class="cart-price" ${oldPrice ? 'style="color:red;"' : 'style="color:#000;"'}>${price} TL</div>
                            </div>
                        </div>`;
                productContainer.innerHTML += cartHtml;
            }
            
        };
        img.src = image;
        // Listelenen ürün adeti
        setTimeout(listedQuantity,100)
        
    });
};



const productPieces = document.getElementById('product-pieces');

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
  
  // Fonksiyonu çağırarak tab tıklama olaylarını dinleyebilirsiniz
  handleTabClick();
  


