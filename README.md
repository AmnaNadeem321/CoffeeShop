# ☕ Coffee Shop - Frontend Application

A modern, fully functional coffee shop website built with HTML, CSS, and JavaScript.

## 🎯 Features

### 🏠 Homepage
- Attractive hero section
- Featured products display
- Why choose us section
- Responsive navigation

### 📋 Menu Page
- Complete coffee menu (14+ items)
- Filter by category (Hot, Cold, Specialties)
- Size selection (Small, Medium, Large)
- Quantity selector
- Add to cart functionality

### 🛒 Shopping Cart
- View all cart items
- Update quantities
- Remove items
- Real-time price calculation
- Tax and delivery fee calculation
- Free delivery on orders over Rs 1000

### 💳 Checkout
- Customer information form
- Delivery address details
- Multiple payment options (COD, Card, Bank Transfer)
- Order summary
- Form validation

### ✅ Order Confirmation
- Order ID generation
- Order details display
- Estimated delivery time
- Email confirmation notice

### ℹ️ About Page
- Company story
- Statistics and achievements
- Core values
- Team members

### 📞 Contact Page
- Contact information
- Contact form with validation
- Success message on submission
- Store location

## 🚀 Technologies Used

- **HTML5** - Structure and content
- **CSS3** - Styling and animations
- **JavaScript (ES6+)** - Functionality and interactivity
- **Font Awesome** - Icons
- **LocalStorage** - Data persistence

## 📁 Project Structure

```
Frontend/
├── index.html              # Homepage
├── menu.html              # Menu page
├── cart.html              # Shopping cart
├── checkout.html          # Checkout page
├── order-confirmation.html # Order confirmation
├── about.html             # About us page
├── contact.html           # Contact page
├── styles.css             # Main stylesheet
├── script.js              # Main JavaScript
├── menu.js               # Menu functionality
├── cart.js               # Cart functionality
├── checkout.js           # Checkout functionality
├── contact.js            # Contact form handling
└── README.md             # Documentation
```

## 🎨 Features Breakdown

### Responsive Design
- Mobile-first approach
- Hamburger menu for mobile
- Flexible grid layouts
- Touch-friendly interactions

### Shopping Features
- Product browsing
- Size customization
- Quantity management
- Cart persistence
- Order tracking

### User Experience
- Smooth animations
- Toast notifications
- Loading states
- Form validation
- Error handling

## 🔧 Setup Instructions

1. **Extract/Download** the Frontend folder

2. **Open with Live Server** (Recommended)
   - Install VS Code Live Server extension
   - Right-click on `index.html`
   - Select "Open with Live Server"

3. **Or open directly in browser**
   - Double-click `index.html`
   - Navigate through pages using the menu

## 📱 Pages Overview

| Page | File | Description |
|------|------|-------------|
| Home | index.html | Landing page with featured products |
| Menu | menu.html | Full product catalog with filters |
| Cart | cart.html | Shopping cart management |
| Checkout | checkout.html | Order placement form |
| Confirmation | order-confirmation.html | Order success page |
| About | about.html | Company information |
| Contact | contact.html | Contact form and info |

## 💾 LocalStorage Usage

The application uses browser LocalStorage for:
- **coffeeCart** - Shopping cart items
- **currentOrder** - Checkout order data
- **lastOrder** - Most recent completed order
- **orderHistory** - All past orders
- **contactMessages** - Contact form submissions

## 🎯 Key Functionalities

### Add to Cart
```javascript
// Products can be added with custom size and quantity
addToCartWithOptions(productId)
```

### Cart Management
```javascript
// Update item quantities
updateQuantity(index, change)

// Remove items
removeItem(index)
```

### Order Processing
```javascript
// Complete checkout process
proceedToCheckout()

// Generate unique order ID
generateOrderId()
```

## 🌟 Design Features

- **Color Scheme**: Brown coffee tones (#6f4e37, #c7a17a)
- **Typography**: Segoe UI for clean, modern look
- **Icons**: Font Awesome 6.4.0
- **Animations**: CSS transitions and keyframes
- **Shadows**: Subtle shadows for depth

## 📊 Product Categories

1. **Hot Coffee**
   - Espresso, Cappuccino, Latte
   - Americano, Macchiato

2. **Cold Coffee**
   - Iced Coffee, Cold Brew
   - Iced Latte, Frappuccino

3. **Specialties**
   - Mocha, Caramel Macchiato
   - Hazelnut Coffee, Vanilla Latte, Affogato

## 🔒 Features for Enhancement

- User authentication
- Backend integration
- Payment gateway
- Real-time order tracking
- User reviews and ratings
- Favorites/Wishlist
- Order history dashboard

## 📝 Browser Compatibility

- Chrome (Recommended)
- Firefox
- Safari
- Edge
- Opera

## 👨‍💻 Development

### To customize colors:
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6f4e37;
    --secondary-color: #c7a17a;
    --dark-color: #3e2723;
}
```

### To add new products:
Edit the `menuProducts` array in `menu.js`

### To modify layout:
Update grid templates in `styles.css`

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and use this project for learning purposes.

## 📧 Support

For questions or issues, use the contact form on the website.

---

**Made with ☕ and 💻**

*A complete coffee shop experience in your browser!*
