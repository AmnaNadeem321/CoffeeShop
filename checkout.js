// Load checkout page
document.addEventListener('DOMContentLoaded', () => {
    loadOrderSummary();
    initializePaymentOptions();
    initializeCheckoutForm();
});

// Load order summary
function loadOrderSummary() {
    const order = JSON.parse(localStorage.getItem('currentOrder'));
    
    if (!order || !order.items || order.items.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    const orderItemsContainer = document.getElementById('orderItems');
    const summaryTotalsContainer = document.getElementById('summaryTotals');

    // Display order items
    orderItemsContainer.innerHTML = order.items.map(item => `
        <div class="order-item">
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-meta">
                    ${item.size ? `Size: ${item.size} | ` : ''}Qty: ${item.quantity}
                </div>
            </div>
            <div style="font-weight: bold; color: var(--primary-color);">
                Rs ${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    `).join('');

    // Display totals
    summaryTotalsContainer.innerHTML = `
        <div class="summary-row">
            <span>Subtotal:</span>
            <span>Rs ${order.subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span>Tax (5%):</span>
            <span>Rs ${order.tax.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span>Delivery:</span>
            <span>${order.delivery === 0 ? 'FREE' : 'Rs ' + order.delivery}</span>
        </div>
        <div class="summary-row summary-total">
            <span>Total:</span>
            <span>Rs ${order.total.toFixed(2)}</span>
        </div>
    `;
}

// Initialize payment options
function initializePaymentOptions() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            paymentOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            this.querySelector('input[type="radio"]').checked = true;
        });
    });
}

// Initialize checkout form
function initializeCheckoutForm() {
    const checkoutForm = document.getElementById('checkoutForm');
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
}

// Handle checkout
function handleCheckout(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        zipCode: document.getElementById('zipCode').value,
        instructions: document.getElementById('instructions').value,
        paymentMethod: document.querySelector('input[name="payment"]:checked').value
    };
    
    // Get order data
    const order = JSON.parse(localStorage.getItem('currentOrder'));
    
    // Create final order
    const finalOrder = {
        id: generateOrderId(),
        date: new Date().toISOString(),
        status: 'Pending',
        items: order.items,
        subtotal: order.subtotal,
        tax: order.tax,
        delivery: order.delivery,
        total: order.total,
        payment: formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                 formData.paymentMethod === 'card' ? 'Credit/Debit Card' : 'Bank Transfer',
        deliveryAddress: {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            zipCode: formData.zipCode,
            instructions: formData.instructions
        }
    };
    
    // Save order to orders history
    const orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    orders.push(finalOrder);
    localStorage.setItem('orderHistory', JSON.stringify(orders));
    
    // Clear cart and current order
    localStorage.removeItem('coffeeCart');
    localStorage.removeItem('currentOrder');
    
    // Save current order for confirmation page
    localStorage.setItem('lastOrder', JSON.stringify(finalOrder));
    
    // Redirect to confirmation page
    window.location.href = 'order-confirmation.html';
}

// Generate order ID
function generateOrderId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('coffeeCart')) || [];
    const cartCounts = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCounts.forEach(cartCount => {
        if (cartCount) {
            cartCount.textContent = totalItems;
        }
    });
}
