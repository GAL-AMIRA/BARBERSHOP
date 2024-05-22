// Initialize cartItems as an array
let cartItems = [];
document.addEventListener("DOMContentLoaded", () => {
  const readMoreButtons = document.querySelectorAll(".read-more");
  const closeButtons = document.querySelectorAll(".close");
  const menuIcon = document.querySelector(".menu-icon");
  const navLinks = document.querySelector(".nav-links");
  const searchIcon = document.querySelector(".search-icon");
  const searchBar = document.querySelector(".search-bar");
  const cartCount = document.querySelector(".cart-count");

  readMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.parentElement.nextElementSibling.style.display = "block";
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeModal(button.closest(".modal").id);
    });
  });

  menuIcon.addEventListener("click", () => {
    if (
      navLinks.style.display === "flex" ||
      navLinks.style.display === "block"
    ) {
      navLinks.style.display = "none";
    } else {
      navLinks.style.display = "flex";
      navLinks.style.flexDirection = "column";
    }
  });

  searchIcon.addEventListener("click", () => {
    if (searchBar.style.display === "block") {
      searchBar.style.display = "none";
    } else {
      searchBar.style.display = "block";
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navLinks.style.display = "flex";
      navLinks.style.flexDirection = "row";
      searchBar.style.display = "none"; // hide search bar on resize
    } else {
      navLinks.style.display = "none";
    }
  });

  // Initial check
  if (window.innerWidth > 768) {
    navLinks.style.display = "flex";
    navLinks.style.flexDirection = "row";
  } else {
    navLinks.style.display = "none";
  }

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        navLinks.style.display = "none";
      }
    });
  });

  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  const productsScroll = document.querySelector(".products-scroll");
  const scrollButtons = document.querySelectorAll(".scroll-button");

  scrollButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const direction = e.target.classList.contains("left") ? "left" : "right";
      const scrollAmount = productsScroll.clientWidth;
      if (direction === "left") {
        productsScroll.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        productsScroll.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    });
  });
});

function searchProduct() {
  const input = document.getElementById("search-input").value.toLowerCase();
  const products = document.querySelectorAll(".product");
  products.forEach((product) => {
    const productName = product.querySelector("h3").textContent.toLowerCase();
    if (productName.includes(input)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

function addToCart(event, productName, productPrice) {
  event.stopPropagation();
  const cartCount = document.querySelector(".cart-count");
  let count = parseInt(cartCount.textContent);
  cartCount.textContent = count + 1;

  // Add item to cart
  const itemIndex = cartItems.findIndex((item) => item.name === productName);
  if (itemIndex > -1) {
    cartItems[itemIndex].quantity += 1;
  } else {
    cartItems.push({ name: productName, price: productPrice, quantity: 1 });
  }

  updateCartModal();
}

function openProductModal(
  productName,
  productImage,
  productDescription,
  productPrice
) {
  const modal = document.getElementById("productModal");
  document.getElementById("productModalTitle").textContent = productName;
  document.getElementById("productModalImage").src = productImage;
  document.getElementById("productModalDescription").textContent =
    productDescription;
  document.querySelector("#productModal .add-to-cart").onclick = function () {
    addToCart(event, productName, productPrice);
    closeModal("productModal");
  };
  modal.style.display = "block";
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "none";
}

function openCartModal() {
  console.log("Opening cart modal"); // הוסף הודעה זו כדי לוודא שהפונקציה מתבצעת
  updateCartModal(); // Ensure the cart is updated when opening
  const modal = document.getElementById("cartModal");
  modal.style.display = "block";
}

function updateCartModal() {
  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = "";

  cartItems.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <p>${item.name}</p>
      <p>כמות: ${item.quantity}</p>
      <p>מחיר: ₪${item.price * item.quantity}</p>
      <button onclick="removeFromCart(${index})">הסר</button>
      <button onclick="decreaseQuantity(${index})">-</button>
      <button onclick="increaseQuantity(${index})">+</button>
    `;

    cartItemsContainer.appendChild(itemDiv);
  });
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCartModal();
  updateCartCount();
}

function decreaseQuantity(index) {
  if (cartItems[index].quantity > 1) {
    cartItems[index].quantity -= 1;
  } else {
    removeFromCart(index);
  }
  updateCartModal();
  updateCartCount();
}

function increaseQuantity(index) {
  cartItems[index].quantity += 1;
  updateCartModal();
  updateCartCount();
}

function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  let count = 0;
  cartItems.forEach((item) => {
    count += item.quantity;
  });
  cartCount.textContent = count;
}

function checkout() {
  alert("ביצוע תשלום");
  // Here you can add functionality to handle the checkout process
}
