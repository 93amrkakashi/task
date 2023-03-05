// Getting some important elements from the DOM
const productsDiv = document.querySelector(".products-container");
const cartItemsDiv = document.querySelector(".cart-items");
const cartIcon = document.querySelector(".cart i");
const cartDiv = document.querySelector(".cart");
const overlay = document.querySelector(".overlay");

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
// the function that renders products in the DOM
renderProdcuts = () => {
  products.forEach((product) => {
    //1- creating elements
    let card = document.createElement("div");
    let image = document.createElement("img");
    let imageDiv = document.createElement("div");
    let detailsDiv = document.createElement("div");
    let actionsDiv = document.createElement("div");
    let prodcutName = document.createElement("h3");
    let prodcutPrice = document.createElement("p");
    let addBtn = document.createElement("button");
    let showBtn = document.createElement("button");
    //2- setting elements attrbuites
    image.src = product.product_image;
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
// the function that renders the Drobdown menu in the DOM
renderDropdown = () => {
  // 1- prevent element from repeating
  cartItemsDiv.innerHTML = "";
  cart.forEach((product) => {
    // 2- creating elements
    let card = document.createElement("div");
    let imageDiv = document.createElement("div");
    let image = document.createElement("img");
    let detailsDiv = document.createElement("div");
    let prodcutName = document.createElement("h3");
    let prodcutPrice = document.createElement("p");
    //3- setting elements attrbuites
    image.src = product.product_image;
    prodcutName.innerHTML = product.product_name;
    prodcutPrice.innerHTML = `Price: ${product.product_price} $`;
    card.className = "card";
    imageDiv.className = "img";
    //4- appending elements to parents
    detailsDiv.appendChild(prodcutName);
    detailsDiv.appendChild(prodcutPrice);
    imageDiv.appendChild(image);
    card.appendChild(imageDiv);
    card.appendChild(detailsDiv);
    cartItemsDiv.appendChild(card);
  });
};
// *******************************************************

// *******************************************************
// rendering and making changes to elements with "another method"
// 1- getting elements from the DOM
let modalDiv = document.getElementById("product");
let productName = document.querySelector(".name");
let productPrice = document.querySelector(".price");
let productImage = document.querySelector(".photo");
let modalBtn = document.querySelector(".modal-btn");
let viewBtn = document.querySelectorAll(".show");
let modalContainer = document.querySelector(".modal");

// 2- a function to render modal
const renderModal = (product) => {
  modalBtn.id = product.id;
  productName.innerText = product.product_name;
  productPrice.innerText = product.product_price;
  productImage.src = product.product_image;
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


// let navbar = document.querySelector('.navbar')
// // function hi (){
// //   if (window.scrollY >= navOffset+40) {
// //     console.log("hiiiiiiiii");
// //     navBar.classList.add("mini");
// //     navBar.classList.remove("glass");
// //   } else{
// //     navBar.classList.remove("mini")
// //     navBar.classList.add("glass");
// //   }
// // }
// window.addEventListener("scroll",() =>{
//   if (window.scrollY >= navbar.offsetTop+5) {
//     console.log("hiiiiiiiii");
//     navbar.classList.toggle("mini");
//     navbar.classList.remove("glass");
//   } else{
//     navbar.classList.remove("mini")
//     navbar.classList.add("glass");
//   }
// });