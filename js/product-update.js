let productIdCounter = 100;

import { readFileSync, writeFileSync } from 'fs';


const jsonData = readFileSync('products.json', 'utf8');


const products = JSON.parse(jsonData);

// Ürünleri temsil eden iç içe geçmiş diziyi düzelt
const flattenedProductsArray = products.flat();

function generateProductId() {
  const productId = productIdCounter.toString();
  productIdCounter++;
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
  writeFileSync('products.json', updatedJsonData, 'utf8');
} else {
  console.log("flattenedProductsArray değişkeni bir dizi değil.");
}
