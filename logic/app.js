// Getting important elements from the DOM
const productsDiv = document.querySelector(".products-container");
const cartItemsDiv = document.querySelector(".cart-items");
const cartIcon = document.querySelector(".cart i");
const cartDiv = document.querySelector(".cart");
const addBtn = document.querySelectorAll(".add");

// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
// getting elements in cart ID's
let elementsInCart = cart.map((cartEl) => {
  return cartEl.id;
});

// show or hide cart dropdown
cartIcon.onclick = () => {
  cartItemsDiv.classList.toggle("hide");
  renderDropdown();
};

// *********************************************
// the function that renders products in the DOM
renderProdcuts = () => {
  products.forEach((product) => {
    // creating elements
    let card = document.createElement("div");
    let image = document.createElement("img");
    let detailsDiv = document.createElement("div");
    let actionsDiv = document.createElement("div");
    let prodcutName = document.createElement("h3");
    let prodcutPrice = document.createElement("p");
    let addBtn = document.createElement("button");
    let showBtn = document.createElement("button");
    // setting elements attrbuites
    image.src = product.product_image;
    prodcutName.innerHTML = product.product_name;
    prodcutPrice.innerHTML = `Price: ${product.product_price} $`;
    addBtn.id = product.id;
    showBtn.id = product.id;
    addBtn.className = "add";
    showBtn.innerText = "Show Details";
    showBtn.className = "show";
    card.className = "card";

    // chick if the element already in cart to set button inner text
    if (elementsInCart.includes(product.id)) {
      addBtn.innerText = "Remove From Cart";
    } else {
      addBtn.innerText = "Add To Cart";
    }
    // appending elements to parents
    actionsDiv.appendChild(addBtn);
    actionsDiv.appendChild(showBtn);
    detailsDiv.appendChild(prodcutName);
    detailsDiv.appendChild(prodcutPrice);
    card.appendChild(image);
    card.appendChild(detailsDiv);
    card.appendChild(actionsDiv);
    productsDiv.appendChild(card);
  });
};
renderProdcuts();
// *********************************************



// the function that updates cart after some actions
function updateCart() {
  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));

  productsCount.innerText = cart.length;
  renderDropdown();
}

let productsCount = document.createElement("span");
productsCount.innerText = cart.length;
cartDiv.appendChild(productsCount);

// ******************************************************
// making changes to buttons and elements
addBtn.forEach((btn) => {
  //1- choosing the element to adding actions to
  const item = products.find((product) => product.id === +btn.id);
  btn.onclick = () => {
    //2- changing values and removing element from cart
    if (btn.innerHTML === "Remove From Cart") {
      btn.innerText = "Add To Cart";
      item.added_to_cart = false;
      removeItem = (id) => {
        cart = cart.filter((item) => item.id !== id);
      };
      removeItem(+btn.id);
      updateCart();
    }
    //9- changing values and adding element from cart
    else {
      btn.innerHTML = "Remove From Cart";
      item.added_to_cart = true;
      cart.push(item);
    }
    updateCart();
  };
});
// ******************************************************



// *******************************************************
// the function that renders the Drobdown menue in the DOM
renderDropdown = () => {
  // 1- prevent element from repeating
  cartItemsDiv.innerHTML = "";
  cart.forEach((product) => {
    // 2- creating elements
    let card = document.createElement("div");
    let image = document.createElement("img");
    let detailsDiv = document.createElement("div");
    let prodcutName = document.createElement("h3");
    let prodcutPrice = document.createElement("p");
    //3- setting elements attrbuites
    image.src = product.product_image;
    prodcutName.innerHTML = product.product_name;
    prodcutPrice.innerHTML = `Price: ${product.product_price} $`;
    card.className = "card";
    //4- appending elements to parents

    detailsDiv.appendChild(prodcutName);
    detailsDiv.appendChild(prodcutPrice);
    card.appendChild(image);
    card.appendChild(detailsDiv);
    cartItemsDiv.appendChild(card);
  });
};
// *******************************************************




// *******************************************************
// rendering and make changes to elements with another method
// 1- getting elements from the DOM
let modalDiv = document.getElementById("product");
let productName = document.querySelector(".name");
let productPrice = document.querySelector(".price");
let productImage = document.querySelector(".img");
let modalBtn = document.querySelector(".modal-btn");
let viewBtn = document.querySelectorAll(".show");
let modalContainer = document.querySelector(".modal");
//2- event click to of view button
viewBtn.forEach((btn) => {
  const item = products.find((product) => product.id === +btn.id);
  btn.onclick = () => {
    modalContainer.classList.toggle("hide");
    renderModal(item);
  };
});

// 3- a function to render modal
const renderModal = (product) => {
  modalBtn.id = product.id;
  productName.innerText = product.product_name;
  productPrice.innerText = product.product_price;
  productImage.src = product.product_image;
  if (product.added_to_cart == true) {
    modalBtn.innerText = "Remove From Cart";
  } else {
    modalBtn.innerText = "Add To Cart";
  }
};

//4- event click to of close button
let closeBtn = document.querySelector(".x");
closeBtn.onclick = () => {
  modalContainer.classList.toggle("hide");
};

//5- event click for adding product to cart or delete
modalBtn.onclick = () => {
  //a- choosing the element to adding actions to
  const item = products.find((product) => product.id === +modalBtn.id);
  //b- changing values and removing element from cart
  if (modalBtn.innerHTML === "Remove From Cart") {
    modalBtn.innerText = "Add To Cart";
    item.added_to_cart = false;
    removeItem = (id) => {
      cart = cart.filter((item) => item.id !== id);
    };
    removeItem(+modalBtn.id);
    updateCart();
  //c- changing values and adding element from cart
  } else {
    modalBtn.innerHTML = "Remove From Cart";
    item.added_to_cart = true;
    cart.push(item);
  }
  updateCart();
};
// *******************************************************
