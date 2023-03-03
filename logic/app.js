// Getting important elements from the DOM
const productsDiv = document.querySelector(".products");
const cartItemsDiv = document.querySelector(".cart-items");
const cartImage = document.querySelector(".cart img");
const cartDiv = document.querySelector(".cart");

let cart = JSON.parse(localStorage.getItem("CART")) || [];

let elementsInCart = cart.map((cartEl) => {
  return cartEl.id;
});
console.log(elementsInCart);

cartImage.onclick = () => {
  cartItemsDiv.classList.toggle("hide");
  renderCart();
};

renderProdcuts = () => {
  // productsDiv.innerHTML = "";

  products.forEach((product) => {
    let card = document.createElement("div");
    let image = document.createElement("img");
    let detailsDiv = document.createElement("div");
    let actionsDiv = document.createElement("div");
    let prodcutName = document.createElement("h3");
    let prodcutPrice = document.createElement("p");
    let addBtn = document.createElement("button");
    let showBtn = document.createElement("button");
    image.src = product.product_image;
    prodcutName.innerHTML = product.product_name;
    prodcutPrice.innerHTML = `Price: ${product.product_price} $`;
    addBtn.id = product.id;
    showBtn.id = product.id;
    addBtn.className = "add";
    showBtn.innerText = "Show Details";
    showBtn.className = "show";
    card.className = "card";
    if (elementsInCart.includes(product.id)) {
      addBtn.innerText = "Remove From Cart";
    } else {
      addBtn.innerText = "Add To Cart";
    }

    actionsDiv.appendChild(addBtn);
    actionsDiv.appendChild(showBtn);
    detailsDiv.appendChild(prodcutName);
    detailsDiv.appendChild(prodcutPrice);
    card.appendChild(image);
    card.appendChild(detailsDiv);
    card.appendChild(actionsDiv);
    productsDiv.appendChild(card);

    // productsDiv.innerHTML += `
    // <div class="card">
    //   <div class="photo"><img src="${product.product_image}" alt="${product.product_name}" /></div>
    //   <div class="details">
    //     <h3 class="product-name">${product.product_name}</h3>
    //     <p class="product-price">${product.product_price} $</p>
    //   </div>
    //   <div class="actions">
    //     <button class="add" onclick="addToCart(${product.id})" >Add To Cart</button>
    //     <button class="details">Show Details</button>
    //     <button class="remove hide">Remove From Cart</button>
    //   </div>
    // </div>
    // `;
  });
};
renderProdcuts(productsDiv, products);

function updateCart() {
  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));

  renderCart();
  // renderProdcuts()
  productsCount.innerText = cart.length;
}

// cart array
let productsCount = document.createElement("span");
productsCount.innerText = cart.length;
cartDiv.appendChild(productsCount);

// *******************
// actions
// const addAndRemove =

// *******************
const addBtn = document.querySelectorAll(".add");
// console.log(addBtn);
addBtn.forEach((btn) => {
  const item = products.find((product) => product.id === +btn.id);
  btn.onclick = () => {
    if (btn.innerHTML === "Remove From Cart") {
      btn.innerText = "Add To Cart";
      item.added_to_cart = false;
      removeItem = (id) => {
        cart = cart.filter((item) => item.id !== id);
      };
      removeItem(+btn.id);
      updateCart();
    } else {
      btn.innerHTML = "Remove From Cart";
      item.added_to_cart = true;
      cart.push(item);
    }
    updateCart();

    console.log(cart);
  };
});

renderCart = (element, content) => {
  cartItemsDiv.innerHTML = "";
  cart.forEach((product) => {
    let card = document.createElement("div");
    let image = document.createElement("img");
    let detailsDiv = document.createElement("div");
    let prodcutName = document.createElement("h3");
    let prodcutPrice = document.createElement("p");

    image.src = product.product_image;
    prodcutName.innerHTML = product.product_name;
    prodcutPrice.innerHTML = `Price: ${product.product_price} $`;

    card.className = "card";

    detailsDiv.appendChild(prodcutName);
    detailsDiv.appendChild(prodcutPrice);
    card.appendChild(image);
    card.appendChild(detailsDiv);
    cartItemsDiv.appendChild(card);
  });
};
const modalDiv = document.getElementById("product");

let productName = document.querySelector('.name');
let productPrice = document.querySelector('.price');
let productImage = document.querySelector('.img');
let modalBtn = document.querySelector('.modal-btn');
const renderModal = (product) => {
  modalBtn.id=product.id
  productName.innerText = product.product_name;
  productPrice.innerText = product.product_price;
  productImage.src = product.product_image;
  if (product.added_to_cart == true) {
    modalBtn.innerText = 'Remove From Cart'
  } else{
    modalBtn.innerText= 'Add To Cart'
  }
  
  console.log(+modalBtn.id)

  // modalDiv.innerHTML = "";

  // let card = document.createElement("div");
  // let image = document.createElement("img");
  // let detailsDiv = document.createElement("div");
  // let actionsDiv = document.createElement("div");
  // let prodcutName = document.createElement("h3");
  // let prodcutPrice = document.createElement("p");
  // let addBtn = document.createElement("button");
  // let closeBtn = document.createElement("button");
  // image.src = product.product_image;

  // prodcutName.innerHTML = product.product_name;
  // prodcutPrice.innerHTML = `Price: ${product.product_price} $`;
  // addBtn.id = product.id;
  // // showBtn.id = product.id;
  // addBtn.className = "add";
  // closeBtn.innerText = "x";
  // closeBtn.className = "x";
  // // showBtn.className = "show"
  // card.className = "card";
  // if (elementsInCart.includes(product.id)) {
  //   addBtn.innerText = "Remove From Cart";
  // } else {
  //   addBtn.innerText = "Add To Cart";
  // }

  // actionsDiv.appendChild(addBtn);
  // actionsDiv.appendChild(closeBtn);
  // detailsDiv.appendChild(prodcutName);
  // detailsDiv.appendChild(prodcutPrice);
  // card.appendChild(image);
  // card.appendChild(detailsDiv);
  // card.appendChild(actionsDiv);
  // modalDiv.appendChild(card);


};


// console.log(modalDiv)
const viewBtn = document.querySelectorAll(".show");
const modalContainer = document.querySelector('.modal')
console.log(modalContainer)
// console.log(viewBtn)
viewBtn.forEach((btn) => {
  const item = products.find((product) => product.id === +btn.id);
  btn.onclick = () => {
    console.log(addBtn);
    // console.log(item)
    modalContainer.classList.toggle("hide")
    // modalDiv.innerHTML='';
    renderModal(item);
    // console.log(closeBtn)
  };
});

let closeBtn = document.querySelector(".x");
closeBtn.onclick = () => {
  console.log('jgjgjhgjh')
  modalContainer.classList.toggle("hide")
};




modalBtn.onclick = () => {
    const item = products.find((product) => product.id === +modalBtn.id);
    if (modalBtn.innerHTML === "Remove From Cart") {
    console.log(item)
    modalBtn.innerText = "Add To Cart";
    item.added_to_cart = false;
    removeItem = (id) => {
      cart = cart.filter((item) => item.id !== id);
    };
    removeItem(+modalBtn.id);
    updateCart();
  } else {
    modalBtn.innerHTML = "Remove From Cart";
    item.added_to_cart = true;
    cart.push(item);
  }
  updateCart();

  console.log(cart);
};
// console.log(closeBtn)
// closeBtn.forEach((btn) => {
  
// });
