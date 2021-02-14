// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    this.attachShadow({mode: 'open'});

    // Create wrapper for product attributes
    const wrapper = document.createElement('li');
    wrapper.setAttribute('class', 'product');

    const style = document.createElement('style');
    style.textContent = `
      .price {
        color: green;
        font-size: 1.8em;
        font-weight: bold;
        margin: 0;
      }
      
      .product {
        align-items: center;
        background-color: white;
        border-radius: 5px;
        display: grid;
        grid-template-areas: 
        'image'
        'title'
        'price'
        'add';
        grid-template-rows: 67% 11% 11% 11%;
        height: 450px;
        filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
        margin: 0 30px 30px 0;
        padding: 10px 20px;
        width: 200px;
      }
      
      .product > button {
        background-color: rgb(255, 208, 0);
        border: none;
        border-radius: 5px;
        color: black;
        justify-self: center;
        max-height: 35px;
        padding: 8px 20px;
        transition: 0.1s ease all;
      }
      
      .product > button:hover {
        background-color: rgb(255, 166, 0);
        cursor: pointer;
        transition: 0.1s ease all;
      }
      
      .product > img {
        align-self: center;
        justify-self: center;
        width: 100%;
      }
      
      .title {
        font-size: 1.1em;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .title:hover {
        font-size: 1.1em;
        margin: 0;
        white-space: wrap;
        overflow: auto;
        text-overflow: unset;
      }
    `;

    this.shadowRoot.append(style, wrapper);
  }

  connectedCallback() {
    const wrapper = this.shadowRoot.querySelector('li');

    const image = wrapper.appendChild(document.createElement('img'));
    image.setAttribute('src', this.getAttribute('image'));
    image.setAttribute('alt', this.getAttribute('title'));
    image.setAttribute('width', '200');

    const title = wrapper.appendChild(document.createElement('p'));
    title.setAttribute('class', 'title');
    title.textContent = this.getAttribute('title');

    const price = wrapper.appendChild(document.createElement('p'));
    price.setAttribute('class', 'price');
    price.textContent = '$' + this.getAttribute('price');

    const button = wrapper.appendChild(document.createElement('button'));
    let addButton;
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(!cart[this.getAttribute('id')]) {
      addButton = true;
      button.textContent = 'Add to Cart';
    }
    else {
      addButton = false;
      button.textContent = 'Remove from Cart';
      document.getElementById('cart-count').textContent++;
    }
    button.addEventListener('click', () => {
      if(addButton) {
        alert('Added to Cart!');
        button.textContent = 'Remove from Cart';
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart[parseInt(this.getAttribute('id'), 10)] = true;
        localStorage.setItem('cart', JSON.stringify(cart));
        document.getElementById('cart-count').textContent++;
        addButton = false;
      }
      else {
        button.textContent = 'Add to Cart';
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart[parseInt(this.getAttribute('id'), 10)] = false;
        localStorage.setItem('cart', JSON.stringify(cart));
        document.getElementById('cart-count').textContent--;
        addButton = true;
      }
    });
  }
}

customElements.define('product-item', ProductItem);