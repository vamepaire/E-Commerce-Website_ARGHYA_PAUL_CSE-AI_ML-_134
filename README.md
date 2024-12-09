ShopMate - E-commerce Platform
ShopMate is a robust full-stack e-commerce web application developed with Node.js, Express.js, MongoDB, and EJS templates. The platform delivers a smooth and responsive user experience powered by Tailwind CSS, offering intuitive navigation and interaction.

Features
User Features
Home Page: Welcoming interface with direct links to browse products.
Authentication:
Secure signup and login functionality.
Passwords are securely hashed for enhanced security.
Orders:
View a detailed list of past orders.
Includes order details, items, and shipping addresses.
Shopping Cart:
Add, remove, and update cart items dynamically.
Automatic price and discount calculations.
Responsive Design:
Optimized for both desktop and mobile devices.
Admin Features
Manage products, users, and orders.
Oversee system-wide operations efficiently.
Payment Integration
Support for multiple payment methods for seamless transactions.
Tech Stack
Backend
Node.js: High-performance server-side JavaScript runtime.
Express.js: Lightweight web framework for creating scalable APIs.
MongoDB: NoSQL database for storing users, products, and orders.
Frontend
EJS: Embedded JavaScript templates for dynamic HTML rendering.
Tailwind CSS: Utility-first CSS framework ensuring responsive design and aesthetic consistency.
API Routes
1. Homepage and Authentication
GET /:
Redirects logged-in users to /shopmate and renders the shopmate page for others, displaying available products and flash messages.
GET /loginpage:
Renders the login page with relevant flash messages.
GET /registerpage:
Renders the registration page with relevant flash messages.
2. Product and Cart Management
GET /shopmate:
Displays the shopmate page for logged-in users, showing their cart, wishlist, and orders.
GET /addtocart/:id & POST /addtocart/:id:
Adds a product to the cart, calculating any discounts and preventing duplicate entries.
GET /cart:
Fetches and displays cart details, including total and discounted prices.
GET /wishlist:
Fetches and displays the user's wishlist.
3. Order Management
GET /orders:
Retrieves and renders all user orders, populating related user and product data.
POST /place-order:
Validates input, calculates total prices, and processes the order, associating it with the user.
4. Checkout
GET /checkout/:id:
Fetches details for a specific product to prepare for checkout.
GET /checkout:
Fetches all cart items to process a bulk checkout.
5. Item Removal
GET /removeFromCart/:id:
Removes a specific item from the user's cart.
GET /removeFromWishList/:id:
Removes a specific item from the user's wishlist.
