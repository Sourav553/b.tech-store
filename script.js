// ================= PRODUCT DATA (50 T-Shirts) =================
const colors = [
  { name: "Black", hex: "111827" },
  { name: "White", hex: "F9FAFB" },
  { name: "Blue", hex: "2563EB" },
  { name: "Red", hex: "DC2626" },
  { name: "Green", hex: "16A34A" },
  { name: "Yellow", hex: "FACC15" },
  { name: "Purple", hex: "7C3AED" },
  { name: "Orange", hex: "F97316" },
  { name: "Pink", hex: "EC4899" },
  { name: "Gray", hex: "6B7280" },
];

// Generate 50 products
let products = [];
for (let i = 1; i <= 50; i++) {
  products.push({
    id: i,
    name: `T-Shirt ${i}`,
    price: 399 + (i % 5) * 50,
    img: `image/photo${i}.jpg` // make sure images exist
  });
}

// ================= CART DATA =================
let cart = [];

// ================= RENDER PRODUCTS =================
function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("product");

    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}"/>
      <div class="wrap">
        <h3>${p.name}</h3>
        <p class="price">₹${p.price}</p>
        <p class="muted">Premium cotton, free shipping</p>
        <button class="btn primary add" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;

    productList.appendChild(card);
  });
}

// ================= ADD TO CART =================
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const item = cart.find((c) => c.id === id);

  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
}

// ================= UPDATE CART =================
function updateCart() {
  const cartContainer = document.getElementById("cart-container");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.qty;

    const row = document.createElement("div");
    row.classList.add("cart-item");

    row.innerHTML = `
      <img src="${item.img}" alt="${item.name}"/>
      <div>
        <strong>${item.name}</strong>
        <div class="cart-actions">
          <button onclick="changeQty(${item.id}, -1)">➖</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${item.id}, 1)">➕</button>
        </div>
      </div>
      <span>₹${item.price * item.qty}</span>
    `;

    cartContainer.appendChild(row);
  });

  cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
  cartTotal.textContent = total;
}

// ================= CHANGE QUANTITY =================
function changeQty(id, delta) {
  const item = cart.find((c) => c.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter((c) => c.id !== id);
  }
  updateCart();
}

// ================= CLEAR CART =================
function clearCart() {
  cart = [];
  updateCart();
}

// ================= CONTACT FORM =================
function submitForm(event) {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name && email && message) {
    alert(`Thanks, ${name}! We will contact you soon.`);
    document.getElementById("contact-form").reset();
  }
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCart();

  // ===== PURCHASE BUTTON HANDLER =====
  const purchaseBtn = document.getElementById("purchaseBtn");
  if (purchaseBtn) {
    purchaseBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      // Save cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Redirect to payment page
      window.location.href = "payment.htm";
    });
  }
});
