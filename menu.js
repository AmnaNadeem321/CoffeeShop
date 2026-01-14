// Extended Menu Products
const menuProducts = [
    // Hot Coffee
    {
        id: 1,
        name: "Espresso",
        description: "Strong and bold espresso shot",
        price: 299,
        category: "hot",
        image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400",
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: 2,
        name: "Cappuccino",
        description: "Classic cappuccino with foam art",
        price: 399,
        category: "hot",
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400",
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: 3,
        name: "Latte",
        description: "Smooth and creamy latte",
        price: 449,
        category: "hot",
        image: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400",
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: 4,
        name: "Americano",
        description: "Espresso with hot water",
        price: 349,
        category: "hot",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: 5,
        name: "Macchiato",
        description: "Espresso with a dollop of foam",
        price: 379,
        category: "hot",
        image: "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=400",
        sizes: ["Small", "Medium", "Large"]
    },
    // Cold Coffee
    {
        id: 6,
        name: "Iced Coffee",
        description: "Chilled coffee over ice",
        price: 399,
        category: "cold",
        image: "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=400",
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: 7,
        name: "Cold Brew",
        description: "Smooth cold-brewed coffee",
        price: 449,
        category: "cold",
        image: "https://images.unsplash.com/photo-1517959105821-eaf2591984ca?w=400",
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: 8,
        name: "Iced Latte",
        description: "Cold latte with milk and ice",
        price: 479,
        category: "cold",
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400",
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: 9,
        name: "Frappuccino",
        description: "Blended ice coffee drink",
        price: 549,
        category: "cold",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400",
        sizes: ["Small", "Medium", "Large"]
    },
    // Specialties
    {
        id: 10,
        name: "Mocha",
        description: "Rich chocolate coffee blend",
        price: 499,
        category: "special",
        image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400",
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: 11,
        name: "Caramel Macchiato",
        description: "Espresso with vanilla and caramel",
        price: 529,
        category: "special",
        image: "https://images.unsplash.com/photo-1557006021-b85faa2bc5e2?w=400",
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: 12,
        name: "Hazelnut Coffee",
        description: "Coffee with hazelnut flavor",
        price: 479,
        category: "special",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: 13,
        name: "Vanilla Latte",
        description: "Latte with vanilla syrup",
        price: 499,
        category: "special",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: 14,
        name: "Affogato",
        description: "Espresso over vanilla ice cream",
        price: 599,
        category: "special",
        image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=400",
        sizes: ["Regular"]
    },
    // Bakery Items
    {
        id: 15,
        name: "Muffin",
        description: "Soft, fluffy, and lightly sweet baked delight",
        price: 300,
        category: "bakery",
        image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400",
        sizes: ["Regular"]
    },
    {
        id: 16,
        name: "Croissant",
        description: "Buttery, flaky, and golden-baked pastry",
        price: 350,
        category: "bakery",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400",
        sizes: ["Regular"]
    },
    // Sandwiches
    {
        id: 17,
        name: "Sandwich",
        description: "Freshly made, layered with tasty fillings",
        price: 500,
        category: "food",
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400",
        sizes: ["Regular"]
    },
    {
        id: 18,
        name: "Chicken Cheese Sandwich",
        description: "Warm, cheesy, and loaded with tender chicken",
        price: 850,
        category: "food",
        image: "https://images.unsplash.com/photo-1606502281004-f86cf1282af5?w=400",
        sizes: ["Regular"]
    },
    {
        id: 19,
        name: "Bacon Bologna Sandwich",
        description: "Savory layers of bacon, egg, and cheese in a roll",
        price: 950,
        category: "food",
        image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400",
        sizes: ["Regular"]
    },
    {
        id: 20,
        name: "Croque-Monsieur",
        description: "Classic French toasted sandwich with ham and melted cheese",
        price: 1100,
        category: "food",
        image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400",
        sizes: ["Regular"]
    },
    {
        id: 21,
        name: "Egg Cheese Sandwich",
        description: "Soft, fresh bread filled with creamy egg and perfectly rich cheese",
        price: 750,
        category: "food",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400",
        sizes: ["Regular"]
    }
];

let currentFilter = 'all';

// Initialize Menu Page
document.addEventListener('DOMContentLoaded', () => {
    loadMenuProducts(currentFilter);
    initializeFilters();
});

// Initialize Filter Buttons
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter products
            currentFilter = btn.dataset.filter;
            loadMenuProducts(currentFilter);
        });
    });
}

// Load Menu Products
function loadMenuProducts(filter) {
    const container = document.getElementById('menuProducts');
    if (!container) return;

    const filteredProducts = filter === 'all' 
        ? menuProducts 
        : menuProducts.filter(p => p.category === filter);

    container.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price" id="price-${product.id}" data-base-price="${product.price}">Rs ${product.price}</div>
                
                <!-- Size Selector -->
                <div class="size-selector" id="size-${product.id}">
                    ${product.sizes.map((size, index) => {
                        // Default select Medium, or middle option if available
                        const isSelected = product.sizes.length > 1 ? size === 'Medium' : index === 0;
                        return `
                        <button class="size-option ${isSelected ? 'selected' : ''}" 
                                data-size="${size}"
                                onclick="updatePrice(${product.id}, '${size}')">
                            ${size}
                        </button>
                    `}).join('')}
                </div>
                
                <!-- Quantity Selector -->
                <div class="quantity-selector">
                    <button class="quantity-btn" onclick="changeQuantity(${product.id}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-display" id="qty-${product.id}">1</span>
                    <button class="quantity-btn" onclick="changeQuantity(${product.id}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                
                <button class="btn btn-add-cart" onclick="addToCartWithOptions(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');

    // Add size selector event listeners
    initializeSizeSelectors();
}

// Initialize Size Selectors
function initializeSizeSelectors() {
    document.querySelectorAll('.size-option').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove selected from siblings
            this.parentElement.querySelectorAll('.size-option').forEach(b => {
                b.classList.remove('selected');
            });
            // Add selected to clicked button
            this.classList.add('selected');
        });
    });
}

// Update Price Based on Size
function updatePrice(productId, size) {
    const priceElement = document.getElementById(`price-${productId}`);
    const basePrice = parseInt(priceElement.dataset.basePrice);
    let finalPrice = basePrice;
    
    if (size === 'Small') finalPrice = basePrice - 50;
    if (size === 'Large') finalPrice = basePrice + 50;
    
    priceElement.textContent = `Rs ${finalPrice}`;
}

// Change Quantity
function changeQuantity(productId, change) {
    const qtyDisplay = document.getElementById(`qty-${productId}`);
    let currentQty = parseInt(qtyDisplay.textContent);
    let newQty = currentQty + change;
    
    if (newQty < 1) newQty = 1;
    if (newQty > 10) newQty = 10;
    
    qtyDisplay.textContent = newQty;
}

// Add to Cart with Options
function addToCartWithOptions(productId) {
    const product = menuProducts.find(p => p.id === productId);
    if (!product) return;

    // Get selected size
    const sizeContainer = document.getElementById(`size-${productId}`);
    const selectedSize = sizeContainer?.querySelector('.size-option.selected')?.dataset.size || 'Medium';
    
    // Get quantity with validation
    let quantity = parseInt(document.getElementById(`qty-${productId}`).textContent);
    
    // Validate quantity (max 10)
    if (quantity > 10) {
        showNotification('Maximum 10 items can be added at once!');
        quantity = 10;
        document.getElementById(`qty-${productId}`).textContent = '10';
    }
    
    if (quantity < 1) {
        showNotification('Quantity must be at least 1!');
        return;
    }
    
    // Calculate price based on size
    let finalPrice = product.price;
    if (selectedSize === 'Small') finalPrice = product.price - 50;
    if (selectedSize === 'Large') finalPrice = product.price + 50;
    
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('coffeeCart')) || [];
    
    // Check if item with same size exists
    const existingIndex = cart.findIndex(item => 
        item.id === productId && item.size === selectedSize
    );
    
    if (existingIndex > -1) {
        // Check total quantity doesn't exceed limit
        const newTotal = cart[existingIndex].quantity + quantity;
        if (newTotal > 10) {
            showNotification(`Cannot add more! Maximum 10 of same item allowed. Current: ${cart[existingIndex].quantity}`);
            return;
        }
        cart[existingIndex].quantity = newTotal;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            description: product.description,
            price: finalPrice,
            image: product.image,
            size: selectedSize,
            quantity: quantity
        });
    }
    
    // Save cart
    localStorage.setItem('coffeeCart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show notification
    showNotification(`${quantity}x ${product.name} (${selectedSize}) added to cart!`);
    
    // Reset quantity to 1
    document.getElementById(`qty-${productId}`).textContent = '1';
}

// Update Cart Count (from script.js)
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('coffeeCart')) || [];
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Show Notification (from script.js)
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
