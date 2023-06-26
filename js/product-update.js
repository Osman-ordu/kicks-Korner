let productIdCounter = 100; // Başlangıç değeri

const fs = require('fs');

// product.json dosyasını oku
const jsonData = fs.readFileSync('products.json', 'utf8');

// JSON verisini JavaScript nesnesine dönüştür
const products = JSON.parse(jsonData);

// Ürünleri temsil eden iç içe geçmiş diziyi düzelt
const flattenedProductsArray = products.flat();

function generateProductId() {
  const productId = productIdCounter.toString(); // productIdCounter'ı stringe çeviriyoruz
  productIdCounter++; // productIdCounter'ı 1 artırıyoruz
  return productId;
}

if (Array.isArray(flattenedProductsArray)) {
  // Her ürüne productId ekleyen döngü
  flattenedProductsArray.forEach((product) => {
    product.productId = generateProductId();
  });

  // Güncellenmiş products nesnesini JSON formatına dönüştür
  const updatedJsonData = JSON.stringify(products);

  // product.json dosyasına güncellenmiş veriyi yaz
  fs.writeFileSync('products.json', updatedJsonData, 'utf8');
} else {
  console.log("flattenedProductsArray değişkeni bir dizi değil.");
}
