window.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('jsonString') != null) {
    generateProductListView(JSON.parse(localStorage.getItem('jsonString')));
  }
  else {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('jsonString', JSON.stringify(data));
      generateProductListView(data)
    });
  }
});

function generateProductListView(productList) {
  if(localStorage.getItem('cart') == null) {
    let cart = [];
    for(let i = 0; i < productList.length; i++) {
      cart.push(false);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  let productListElement = document.getElementById('product-list');

  productList.forEach(product => {
    let productElement = document.createElement('product-item');
    productElement.setAttribute('id', product.id);
    productElement.setAttribute('title', product.title);
    productElement.setAttribute('image', product.image);
    productElement.setAttribute('price', product.price);

    productListElement.appendChild(productElement);
  });
}