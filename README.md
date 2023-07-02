# E-Commerce Project

This is an e-commerce project with different pages and features. Below is an overview of the functionalities present in each page.

## Category Page

The Category Page displays product cards with specific attributes. It includes the following features:

- Product Cards: Each product is represented by a card displaying relevant information.
- New Season Badges: Products labeled with "New Season" badges to highlight fresh arrivals.
- Discount Badges: Products on sale are marked with "Discount" badges.
- Add to Cart: Clicking on the "+" button adds the product to the shopping cart.
- Product Details: A button redirects users to the product detail page for more information.

## Basket Page

The Basket Page showcases the items added to the shopping cart. It includes the following features:

- Product Removal: Users can remove products from the cart by clicking on the "Remove" button.
- Dynamic Total Price: The page dynamically calculates and displays the total price of all items in the cart.

## Product Detail Page

The Product Detail Page shows detailed information about a specific product. It includes the following features:

- Product Identification: The product is identified based on the ID provided in the URL.
- Product Data: Product details are fetched from a JSON file using Axios.
- Add to Cart: Users can add the product to their cart using the designated button.

## Additional Functionality

- **product.json**: A JSON file containing product data that is fetched using Axios.
- **product-update.js**: A Node.js script for dynamically adding an ID to the JSON file.
