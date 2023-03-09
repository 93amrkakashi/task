// Getting some important elements from the DOM
const productsDiv = document.querySelector(".products-container"),
      cartItemsDiv = document.querySelector(".cart-items"),
      cartIcon = document.querySelector(".cart i"),
      cartDiv = document.querySelector(".cart"),
      overlay = document.querySelector(".overlay");

// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
// getting elements in cart ID's
let elementsInCart = cart.map((cartEl) => {
  return cartEl.id;
});

// show & hide cart dropdown
cartIcon.onclick = () => {
  cartItemsDiv.classList.toggle("hide");
  renderDropdown();
};

// *********************************************
// rendering products in the DOM {{{first method}}}
renderProdcuts = () => {
  productsDiv.innerHTML = "";
  products.forEach((product) => {
    //1- creating elements
    let card = document.createElement("div");
    let image = document.createElement("img");
    let imageDiv = document.createElement("div");
    let detailsDiv = document.createElement("div");
    let actionsDiv = document.createElement("div");
    let prodcutName = document.createElement("h4");
    let prodcutPrice = document.createElement("p");
    let addBtn = document.createElement("button");
    let showBtn = document.createElement("button");
    //2- setting elements attrbuites
    image.src = product.product_image;
    image.alt = product.product_name;
    prodcutName.innerHTML = product.product_name;
    prodcutPrice.innerHTML = `Price: ${product.product_price} $`;
    addBtn.id = product.id;
    showBtn.id = product.id;
    addBtn.className = "add";
    showBtn.innerText = "SHOW";
    showBtn.className = "show";
    imageDiv.className = "img";
    card.className = "card glass";

    //3- chick if the element already in cart to set button inner text
    if (elementsInCart.includes(product.id)) {
      addBtn.innerText = "REMOVE";
    } else {
      addBtn.innerText = "ADD";
    }
    //4- appending elements to parents
    actionsDiv.appendChild(addBtn);
    actionsDiv.appendChild(showBtn);
    detailsDiv.appendChild(prodcutName);
    detailsDiv.appendChild(prodcutPrice);
    imageDiv.appendChild(image);
    card.appendChild(imageDiv);
    card.appendChild(detailsDiv);
    card.appendChild(actionsDiv);
    productsDiv.appendChild(card);
  });
};
renderProdcuts();
// *********************************************

// the function that updates cart after actions
function updateCart() {
  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));

  productsCount.innerText = cart.length;
  renderDropdown();
}
// products count span
let productsCount = document.createElement("span");
productsCount.innerText = cart.length;
cartDiv.appendChild(productsCount);

// ************************************************
// making changes to buttons and elements
const addBtn = document.querySelectorAll(".add");
addBtn.forEach((btn) => {
  //1- choosing the element which adding actions to
  const item = products.find((product) => product.id === +btn.id);
  btn.onclick = () => {
    //2- removing element from cart
    if (btn.innerHTML === "REMOVE") {
      btn.innerText = "ADD";
      item.added_to_cart = false;
      removeItem = (id) => {
        cart = cart.filter((item) => item.id !== id);
      };
      removeItem(+btn.id);
      updateCart();
    }
    //9- adding element from cart
    else {
      btn.innerHTML = "REMOVE";
      item.added_to_cart = true;
      cart.push(item);
    }
    updateCart();
  };
});
// ******************************************************

// *******************************************************
// rendering the Drobdown menu in the DOM with {{{another method}}}
renderDropdown = () => {
  // 1- reset container div inner html
  cartItemsDiv.innerHTML = "";
  // check if there is elements in cart
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "No Items In The Cart";
  }
  // 3- rendering elements in cart
  cart.forEach((product) => {
    let cardss = `
    <div class="card">
      <div class="img">
        <img src="${product.product_image}" alt="${product.product_name}">
      </div>
      <div>
        <h4>${product.product_name}</h4>
        <p>price : ${product.product_price}$</p>
      </div>
    </div>
    `;
    cartItemsDiv.innerHTML += cardss;
  });
};
// *******************************************************

// *******************************************************
// rendering and making changes to elements with {{{another method}}}
// 1- getting elements from the DOM
let modalDiv = document.getElementById("product"),
    productName = document.querySelector(".name"),
    productPrice = document.querySelector(".price"),
    productImage = document.querySelector(".photo"),
    modalBtn = document.querySelector(".modal-btn"),
    viewBtn = document.querySelectorAll(".show"),
    modalContainer = document.querySelector(".modal");

// 2- a function to render modal
const renderModal = (product) => {
  modalBtn.id = product.id;
  productName.innerText = product.product_name;
  productPrice.innerText = product.product_price;
  productImage.src = product.product_image;
  productImage.alt = product.product_name;
  if (product.added_to_cart == true) {
    modalBtn.innerText = "REMOVE";
  } else {
    modalBtn.innerText = "ADD";
  }
};
//3- event click for view button
viewBtn.forEach((btn) => {
  const item = products.find((product) => product.id === +btn.id);
  btn.onclick = () => {
    modalContainer.classList.toggle("hide");
    overlay.classList.toggle("hide");
    renderModal(item);
  };
});

//4- event click for close button
let closeBtn = document.querySelector(".x");
closeBtn.onclick = () => {
  modalContainer.classList.toggle("hide");
  overlay.classList.toggle("hide");
};

//5- event click for adding product to cart or delete it
modalBtn.onclick = () => {
  //a- choosing the element to adding actions to
  const item = products.find((product) => product.id === +modalBtn.id);
  //b- changing values and removing element from cart
  if (modalBtn.innerHTML === "REMOVE") {
    modalBtn.innerText = "ADD";
    item.added_to_cart = false;
    removeItem = (id) => {
      cart = cart.filter((item) => item.id !== id);
    };
    removeItem(+modalBtn.id);
    updateCart();
    //c- changing values and adding element from cart
  } else {
    modalBtn.innerHTML = "REMOVE";
    item.added_to_cart = true;
    cart.push(item);
  }
  updateCart();
};
// *******************************************************

// dark & light theme toggle
let toggleTheme = document.querySelector(".theme"),
  body = document.querySelector(".dark"),
  navBar = document.querySelector(".navbar");

toggleTheme.innerHTML = "🌞";
toggleTheme.onclick = () => {
  if (body.className === "body dark") {
    toggleTheme.innerHTML = "🌙";
  } else {
    toggleTheme.innerHTML = "🌞";
  }
  body.classList.toggle("light");
  navBar.classList.toggle("light");
};

