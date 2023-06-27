const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("product");

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
  const {image,title,description,price,oldPrice,productId} = product;
  if(product){
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
            <button type="submit" title="Sepete Ekle" class="add-to-cart" onclick="">
                <span>Sepete Ekle</span>
            </button>
                                    
        </div>
    </div>
  </div>
    `;
    container.innerHTML = productHtml;
  }    
 }

