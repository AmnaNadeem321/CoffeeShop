// Coffee Products Data
const coffeeProducts = [
    {
        id: 1,
        name: "Espresso",
        description: "Strong and bold espresso shot",
        price: 299,
        image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400"
    },
    {
        id: 2,
        name: "Cappuccino",
        description: "Classic cappuccino with foam art",
        price: 399,
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400"
    },
    {
        id: 3,
        name: "Latte",
        description: "Smooth and creamy latte",
        price: 449,
        image: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400"
    },
    {
        id: 4,
        name: "Mocha",
        description: "Rich chocolate coffee blend",
        price: 499,
        image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400"
    }
];

// Cart Management
let cart = JSON.parse(localStorage.getItem('coffeeCart')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    loadPopularProducts();
    updateCartCount();
    updateAuthDisplay(); // Check authentication status
});

// Navigation
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu?.classList.remove('active');
            hamburger?.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu?.classList.remove('active');
            hamburger?.classList.remove('active');
        });
    });
}

// Update Authentication Display
function updateAuthDisplay() {
    const currentUser = localStorage.getItem('currentUser');
    const authLinks = document.querySelectorAll('.auth-links');
    const profileLinks = document.querySelectorAll('.profile-link');
    
    if (currentUser) {
        // User is logged in - show profile, hide auth buttons
        authLinks.forEach(link => {
            link.classList.remove('show');
        });
        profileLinks.forEach(link => {
            link.classList.add('show');
        });
    } else {
        // User is NOT logged in - show auth buttons, hide profile
        profileLinks.forEach(link => {
            link.classList.remove('show');
        });
        authLinks.forEach(link => {
            link.classList.add('show');
        });
    }
}

// Load Products
function loadPopularProducts() {
    const container = document.getElementById('popularProducts');
    if (!container) return;

    container.innerHTML = coffeeProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">Rs ${product.price}</div>
                <button class="btn btn-add-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(productId) {
    const product = coffeeProducts.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

// Save Cart
function saveCart() {
    localStorage.setItem('coffeeCart', JSON.stringify(cart));
}

// Update Cart Count
function updateCartCount() {
    const cartCounts = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCounts.forEach(cartCount => {
        if (cartCount) {
            cartCount.textContent = totalItems;
        }
    });
}

// Show Notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add styles
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

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export for other pages
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { coffeeProducts, cart, addToCart, updateCartCount };
}
