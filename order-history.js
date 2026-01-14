// Load order history on page load
document.addEventListener('DOMContentLoaded', () => {
    loadOrders('all');
    setupFilters();
    updateCartCount();
});

// Setup filter tabs
function setupFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            // Load orders with filter
            loadOrders(tab.dataset.filter);
        });
    });
}

// Load and display orders
function loadOrders(filter = 'all') {
    const orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    const ordersList = document.getElementById('ordersList');
    
    if (orders.length === 0) {
        ordersList.innerHTML = `
            <div class="empty-history">
                <i class="fas fa-clipboard-list"></i>
                <h2>No Orders Yet</h2>
                <p>Start ordering your favorite coffee!</p>
                <a href="menu.html" class="btn btn-primary" style="margin-top: 2rem;">
                    <i class="fas fa-coffee"></i> Browse Menu
                </a>
            </div>
        `;
        return;
    }
    
    // Filter orders
    let filteredOrders = orders;
    if (filter !== 'all') {
        filteredOrders = orders.filter(order => order.status.toLowerCase() === filter);
    }
    
    if (filteredOrders.length === 0) {
        ordersList.innerHTML = `
            <div class="empty-history">
                <i class="fas fa-search"></i>
                <h2>No ${filter.charAt(0).toUpperCase() + filter.slice(1)} Orders</h2>
                <p>You don't have any ${filter} orders.</p>
            </div>
        `;
        return;
    }
    
    // Sort orders by date (newest first)
    filteredOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    ordersList.innerHTML = filteredOrders.map(order => `
        <div class="order-card" data-order-id="${order.id}">
            <div class="order-header">
                <div>
                    <div class="order-id">Order #${order.id}</div>
                    <div class="order-date">${formatDate(order.date)}</div>
                </div>
                <div class="order-status status-${order.status.toLowerCase()}">
                    ${order.status}
                </div>
            </div>
            
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <div class="item-info">
                            <div class="item-name">${item.name}</div>
                            <div class="item-details">
                                Size: ${item.size || 'Medium'} | Quantity: ${item.quantity}
                            </div>
                        </div>
                        <div class="item-price">Rs ${item.price * item.quantity}</div>
                    </div>
                `).join('')}
            </div>
            
            ${order.deliveryAddress ? `
                <div class="delivery-address">
                    <h4><i class="fas fa-map-marker-alt"></i> Delivery Address</h4>
                    <p>
                        ${order.deliveryAddress.name}<br>
                        ${order.deliveryAddress.address}, ${order.deliveryAddress.city}<br>
                        Phone: ${order.deliveryAddress.phone}
                    </p>
                </div>
            ` : ''}
            
            <div class="order-footer">
                <div class="order-total">
                    Total: <span>Rs ${order.total.toFixed(2)}</span>
                </div>
                <div class="order-actions">
                    <button class="btn-view-details" onclick="viewOrderDetails('${order.id}')">
                        <i class="fas fa-eye"></i> Details
                    </button>
                    <button class="btn-reorder" onclick="reorder('${order.id}')">
                        <i class="fas fa-redo"></i> Reorder
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    };
    return date.toLocaleDateString('en-US', options);
}

// View order details
function viewOrderDetails(orderId) {
    const orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
        alert('Order not found!');
        return;
    }
    
    const itemsList = order.items.map(item => 
        `${item.quantity}x ${item.name} (${item.size || 'Medium'}) - Rs ${item.price * item.quantity}`
    ).join('\n');
    
    alert(`Order Details #${order.id}\n\nDate: ${formatDate(order.date)}\nStatus: ${order.status}\n\nItems:\n${itemsList}\n\nSubtotal: Rs ${order.subtotal}\nTax: Rs ${order.tax}\nDelivery: Rs ${order.delivery}\n\nTotal: Rs ${order.total.toFixed(2)}\n\nPayment: ${order.payment || 'Cash on Delivery'}`);
}

// Reorder function
function reorder(orderId) {
    const orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
        alert('Order not found!');
        return;
    }
    
    if (confirm('Add all items from this order to your cart?')) {
        // Get current cart
        let cart = JSON.parse(localStorage.getItem('coffeeCart')) || [];
        
        // Add items from order to cart
        order.items.forEach(item => {
            const existingItem = cart.find(cartItem => 
                cartItem.id === item.id && cartItem.size === item.size
            );
            
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                cart.push({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    size: item.size || 'Medium',
                    quantity: item.quantity,
                    image: item.image,
                    description: item.description
                });
            }
        });
        
        // Save cart
        localStorage.setItem('coffeeCart', JSON.stringify(cart));
        
        // Show notification
        showNotification(`${order.items.length} items added to cart!`);
        
        // Update cart count
        updateCartCount();
        
        // Redirect to cart after 1 second
        setTimeout(() => {
            window.location.href = 'cart.html';
        }, 1000);
    }
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

// Show notification
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
