// Load cart on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

// Load and display cart
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('coffeeCart')) || [];
    const cartContent = document.getElementById('cartContent');
    
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h2>Your cart is empty</h2>
                <p>Add some delicious coffee to get started!</p>
                <a href="menu.html" class="btn btn-primary" style="margin-top: 2rem;">
                    <i class="fas fa-coffee"></i> Browse Menu
                </a>
            </div>
        `;
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05; // 5% tax
    const delivery = subtotal > 1000 ? 0 : 100;
    const total = subtotal + tax + delivery;
    
    cartContent.innerHTML = `
        <div class="cart-content">
            <div class="cart-items">
                <h2 style="margin-bottom: 1.5rem;">Cart Items (${cart.length})</h2>
                ${cart.map((item, index) => `
                    <div class="cart-item" data-index="${index}">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <h3>${item.name}</h3>
                            <p>${item.description || ''}</p>
                            <p><strong>Size:</strong> ${item.size || 'Regular'}</p>
                            <div class="cart-item-price">Rs ${item.price} each</div>
                        </div>
                        <div class="cart-item-actions">
                            <div class="item-quantity">
                                <button class="qty-btn" onclick="updateQuantity(${index}, -1)">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <span style="font-weight: bold; min-width: 30px; text-align: center;">
                                    ${item.quantity}
                                </span>
                                <button class="qty-btn" onclick="updateQuantity(${index}, 1)">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                            <div style="font-size: 1.2rem; font-weight: bold; color: var(--primary-color);">
                                Rs ${item.price * item.quantity}
                            </div>
                            <button class="remove-btn" onclick="removeItem(${index})">
                                <i class="fas fa-trash"></i> Remove
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="cart-summary">
                <h2>Order Summary</h2>
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>Rs ${subtotal.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Tax (5%):</span>
                    <span>Rs ${tax.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Delivery:</span>
                    <span>${delivery === 0 ? 'FREE' : 'Rs ' + delivery}</span>
                </div>
                ${delivery === 0 ? '' : `
                    <p style="font-size: 0.85rem; color: #666; margin-top: 0.5rem;">
                        <i class="fas fa-info-circle"></i> Free delivery on orders over Rs 1000
                    </p>
                `}
                <div class="summary-row summary-total">
                    <span>Total:</span>
                    <span>Rs ${total.toFixed(2)}</span>
                </div>
                <button class="checkout-btn" onclick="proceedToCheckout()">
                    <i class="fas fa-check-circle"></i> Proceed to Checkout
                </button>
                <a href="menu.html" class="btn btn-secondary" style="width: 100%; margin-top: 1rem; text-align: center;">
                    <i class="fas fa-plus"></i> Add More Items
                </a>
            </div>
        </div>
    `;
}

// Update item quantity
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('coffeeCart')) || [];
    
    if (cart[index]) {
        cart[index].quantity += change;
        
        if (cart[index].quantity < 1) {
            cart[index].quantity = 1;
        } else if (cart[index].quantity > 10) {
            cart[index].quantity = 10;
            showNotification('Maximum quantity is 10');
        }
        
        localStorage.setItem('coffeeCart', JSON.stringify(cart));
        loadCart();
        updateCartCount();
    }
}

// Remove item from cart
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('coffeeCart')) || [];
    
    if (confirm('Remove this item from cart?')) {
        const itemName = cart[index].name;
        cart.splice(index, 1);
        localStorage.setItem('coffeeCart', JSON.stringify(cart));
        loadCart();
        updateCartCount();
        showNotification(`${itemName} removed from cart`);
    }
}

// Proceed to checkout
function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('coffeeCart')) || [];
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Save order summary
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    const delivery = subtotal > 1000 ? 0 : 100;
    const total = subtotal + tax + delivery;
    
    const orderSummary = {
        items: cart,
        subtotal: subtotal,
        tax: tax,
        delivery: delivery,
        total: total,
        date: new Date().toISOString()
    };
    
    localStorage.setItem('currentOrder', JSON.stringify(orderSummary));
    
    // Redirect to checkout page
    window.location.href = 'checkout.html';
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('coffeeCart')) || [];
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #2196F3;
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
