type Products= {
  id: number;
  product_name: string;
  product_price: string;
  product_image: string;
  added_to_cart: boolean;
}[]


type Product= {
  id: number;
  product_name: string;
  product_price: string;
  product_image: string;
  added_to_cart: boolean;
}

const products :Products = [
  {
    id:1,
    product_name: "Audio Cable",
    product_price: "9",
    product_image:
      "../images/cable.png",
    added_to_cart: false,
  },
  {
    id:2,
    product_name: "Smart Watch",
    product_price: "21.9",
    product_image:
      "../images/head-ohones.png",
    added_to_cart: false,
  },
  {
    id:3,
    product_name: "Headphones",
    product_price: "7.5",
    product_image:
      "https://firebasestorage.googleapis.com/v0/b/shopping-app-cd303.appspot.com/o/products%2Fb2c1d06c-8bad-4b4a-a575-fe4b0827259f?alt=media&token=5c79d96d-fd1d-48ea-9983-79d2e22c222a",
    added_to_cart: false,
  },
  {
    id:4,
    product_name: "Remote Control",
    product_price: "13",
    product_image:
      "https://firebasestorage.googleapis.com/v0/b/shopping-app-cd303.appspot.com/o/products%2F865a2589-baa1-4747-b842-9a782a46f611?alt=media&token=9439b86a-a9bd-4e2a-9aa9-a982ac60bc96",
    added_to_cart: false,
  },
  {
    id:5,
    product_name: "Reading Tablet",
    product_price: "46",
    product_image:
      "https://firebasestorage.googleapis.com/v0/b/shopping-app-cd303.appspot.com/o/products%2F6311d090-e723-421f-921c-6489b2a486a2?alt=media&token=1e3897f4-63e3-4b20-b618-cdd0162e33b3",
    added_to_cart: false,
  },
  {
    id:6,
    product_name: "HD TV",
    product_price: "975",
    product_image:
      "https://firebasestorage.googleapis.com/v0/b/shopping-app-cd303.appspot.com/o/products%2Fdf74b258-7a62-4555-a71e-3cd540e582ba?alt=media&token=29570444-89a7-45d8-b8ee-6282821b30a8",
    added_to_cart: false,
  },
];



// Getting some important elements from the DOM
const productsDiv = document.querySelector(".products-container") as HTMLDivElement,
      cartItemsDiv = document.querySelector(".cart-items") as HTMLDivElement,
      cartIcon = document.querySelector(".cart i") as HTMLButtonElement,
      cartDiv = document.querySelector(".cart") as HTMLDivElement,
      overlay = document.querySelector(".overlay") as HTMLDivElement;

// cart array
let cart:Products = JSON.parse(`${localStorage.getItem("CART")}`) || [];
// getting elements in cart ID's
let elementsInCart= cart.map((cartEl): Number => {
  return cartEl.id;
});

// show & hide cart dropdown
cartIcon.onclick = () => {
  cartItemsDiv.classList.toggle("hide");
  renderDropdown();
};

// *********************************************
// rendering products in the DOM {{{first method}}}
const renderProdcuts: () => void = () => {
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
    addBtn.id = `${product.id}`;
    showBtn.id = `${product.id}`;
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

  productsCount.innerText = `${cart.length}`;
  renderDropdown();
}
// products count span
let productsCount = document.createElement("span");
productsCount.innerText = `${cart.length}`;
cartDiv.appendChild(productsCount);

// ************************************************
type Item= {
  id: number;
  product_name: string;
  product_price: string;
  product_image: string;
  added_to_cart: boolean;
} 
// making changes to buttons and elements
const addBtn = document.querySelectorAll(".add") as NodeListOf <HTMLButtonElement>;
addBtn.forEach((btn) => {
  //1- choosing the element which adding actions to
  const item: Item = products.find((product) => product.id === +btn.id)!;
  btn.onclick = () => {
    //2- removing element from cart
    if (btn.innerHTML === "REMOVE") {
      btn.innerText = "ADD";
      item.added_to_cart = false;
      const removeItem: (id: number) => void = (id) => {
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
const renderDropdown = () => {
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
let modalDiv = document.getElementById("product") as HTMLDivElement,
    productName = document.querySelector(".name") as HTMLHeadingElement,
    productPrice = document.querySelector(".price")as HTMLHeadingElement,
    productImage = document.querySelector(".photo") as HTMLImageElement,
    modalBtn = document.querySelector(".modal-btn") as HTMLButtonElement,
    viewBtn = document.querySelectorAll(".show")as NodeListOf <HTMLButtonElement>,
    modalContainer = document.querySelector(".modal")as HTMLDivElement;

// 2- a function to render modal
const renderModal: (product: Product) => void = (product) => {
  modalBtn.id = `${product.id}`;
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
  const item:Item = products.find((product) => product.id === +btn.id)!;
  btn.onclick = () => {
    modalContainer.classList.toggle("hide");
    overlay.classList.toggle("hide");
    renderModal(item);
  };
});

//4- event click for close button
let closeBtn = document.querySelector(".x") as HTMLButtonElement;
closeBtn.onclick = () => {
  modalContainer.classList.toggle("hide");
  overlay.classList.toggle("hide");
};

//5- event click for adding product to cart or delete it
modalBtn.onclick = () => {
  //a- choosing the element to adding actions to
  const item:Item = products.find((product) => product.id === +modalBtn.id)!;
  //b- changing values and removing element from cart
  if (modalBtn.innerHTML === "REMOVE") {
    modalBtn.innerText = "ADD";
    item.added_to_cart = false;
    const removeItem: (id: number) => void = (id) => {
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
let toggleTheme = document.querySelector(".theme") as HTMLButtonElement,
  body = document.querySelector(".dark") as HTMLBodyElement,
  navBar = document.querySelector(".navbar") as HTMLDivElement;

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

