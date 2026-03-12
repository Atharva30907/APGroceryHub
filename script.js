// SAMPLE PRODUCTS
const PRODUCTS = [
  {
    id: 1,
    name: "Organic Tomatoes",
    price: 45,
    img: "image/organic-tomatoes.png"
  },
  {
    id: 2,
    name: "Fresh Carrots",
    price: 30,
    img: "image/freshcarrots.png"
  },
  {
    id: 3,
    name: "Red Apples",
    price: 80,
    img: "image/redapples.png"
  },
  {
    id: 4,
    name: "Bananas",
    price: 25,
    img: "image/banana.png"
  },
  {
    id: 5,
    name: "Onions",
    price: 20,
    img: "image/onions.png"
  },
  {
    id: 6,
    name: "Milk 1L",
    price: 55,
    img: "image/milk.png"
  },
];

// CART (simulate localStorage)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const countEl = document.getElementById("cartCount");
  if (countEl) {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    countEl.textContent = totalQty;
  }
}

function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(p => `
  <div class="product-card">
    <div class="product-img">
      <img src="${p.img}" alt="${p.name}" width="120">
    </div>
    <div class="product-info">
      <div class="product-title">${p.name}</div>
      <div class="product-price">₹${p.price}</div>
      <div class="product-controls">
        <input type="number" id="qty-${p.id}" value="1" min="1" max="20" />
        <button class="product-btn btn-add" onclick="addToCart(${p.id})">
          Add to Cart
        </button>
        <button class="product-btn btn-buy" onclick="buyNow(${p.id})">
          Buy Now
        </button>
      </div>
    </div>
  </div>
`).join("");
}

// ADD TO CART
function addToCart(productId) {
  const qtyEl = document.getElementById(`qty-${productId}`);
  const qty = qtyEl ? parseInt(qtyEl.value) || 1 : 1;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (prod) {
      cart.push({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        img: prod.img,
        qty: qty
      });
    }
  }
  saveCart();
  alert(`${qty} item(s) added to cart!`);
}

// SEARCH FUNCTION
function searchProducts() {
  const term = document.getElementById("searchInput").value.toLowerCase().trim();
  if (!term) return renderProducts();

  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  const filtered = PRODUCTS.filter(p => p.name.toLowerCase().includes(term));

  grid.innerHTML = filtered.length
    ? filtered.map(p => `
      <div class="product-card">
        <div class="product-img">${p.img}</div>
        <div class="product-info">
          <div class="product-title">${p.name}</div>
          <div class="product-price">₹${p.price}</div>
          <div class="product-controls">
            <input type="number" id="qty-${p.id}" value="1" min="1" max="20" />
            <button class="product-btn btn-add" onclick="addToCart(${p.id})">
              Add to Cart
            </button>
            <button class="product-btn btn-buy" onclick="buyNow(${p.id})">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    `).join("")
    : `<p style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #777;">
        No products found for "${term}"
      </p>`;
}

// BUY NOW (add + go to cart)
function buyNow(productId) {
  addToCart(productId);
  window.location.href = "cart.html";
}

// LOAD PAGE
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderProducts();
});
