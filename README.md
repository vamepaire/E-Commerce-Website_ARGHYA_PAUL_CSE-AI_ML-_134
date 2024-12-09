# ShopMate - E-commerce Platform

ShopMate is a full-stack e-commerce web application built using **Node.js**, **Express.js**, **MongoDB**, and **EJS templates**. It features a responsive and user-friendly interface powered by **Tailwind CSS**, providing seamless navigation and interaction.

## Features

- **Home Page**: A welcoming interface with links to browse products.
- **User Authentication**:
  - Signup and Login functionalities.
  - Secure authentication using hashed passwords.
- **Orders Management**:
  - View a detailed list of past orders.
  - See order details, items, and shipping address.
- **Shopping Cart**:
  - Add, remove, and update items in the cart.
  - Dynamic price calculation.
- **Responsive Design**:
  - Optimized for desktop and mobile users.
- **Admin Features**:
  - Manage products, users, and orders.
- **Payment Integration**:
  - Support for multiple payment methods.

## Tech Stack

### Backend
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web application framework.
- **MongoDB**: NoSQL database for storing user, order, and product information.

### Frontend
- **EJS**: Embedded JavaScript templates for dynamic HTML rendering.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.

  ###Api Routes
  **1. Homepage and Authentication**:
GET /: Redirects logged-in users to /shopmate and renders the shopmate page for others with available products and a flash message.
GET /loginpage & GET /registerpage: Render login and registration pages, respectively, with flash messages.
**2. Product and Cart Management**:
GET /shopmate: Renders the shopmate page for logged-in users, showing their cart, wishlist, and orders.
GET /addtocart/:id & POST /addtocart/:id: Adds a product to the user's cart, calculating discounted prices where applicable. Handles duplicate items gracefully.
GET /cart: Fetches and renders the user's cart details, including total and discounted prices.
GET /wishlist: Fetches and renders the user's wishlist.
**3. Order Management**:
GET /orders: Retrieves all orders, populating related user and product data for rendering.
POST /place-order: Processes order placement, ensuring input validation, calculates the total price, and associates the order with the user.
**4. Checkout**:
GET /checkout/:id: Fetches a specific product for checkout.
GET /checkout: Fetches all cart items for checkout.
**5. Item Removal**:
GET /removeFromCart/:id: Removes an item from the user's cart.
GET /removeFromWishList/:id: Removes an item from the user's wishlist.
