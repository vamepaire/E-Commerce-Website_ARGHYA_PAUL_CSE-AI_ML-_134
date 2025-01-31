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



## API Routes

### 1. Homepage and Authentication

- **GET /**: 
  - Redirects logged-in users to `/shopmate` and renders the shopmate page for others with available products and flash messages.

- **GET /loginpage**: 
  - Renders the login page with relevant flash messages.

- **GET /registerpage**: 
  - Renders the registration page with relevant flash messages.

### 2. Product and Cart Management

- **GET /shopmate**: 
  - Displays the shopmate page for logged-in users, showing their cart, wishlist, and orders.

- **GET /addtocart/:id**: 
  - Adds a product to the cart, calculating any discounts and preventing duplicate entries.

- **POST /addtocart/:id**: 
  - Adds a product to the cart via POST request, processing any discounts and handling duplicates.

- **GET /cart**: 
  - Fetches and displays the user's cart details, including total and discounted prices.

- **GET /wishlist**: 
  - Fetches and displays the user's wishlist.

### 3. Order Management

- **GET /orders**: 
  - Retrieves and renders all user orders, populating related user and product data.

- **POST /place-order**: 
  - Validates input, calculates total prices, and processes the order, associating it with the user.

### 4. Checkout

- **GET /checkout/:id**: 
  - Fetches details for a specific product to prepare for checkout.

- **GET /checkout**: 
  - Fetches all cart items to process a bulk checkout.

### 5. Item Removal

- **GET /removeFromCart/:id**: 
  - Removes a specific item from the user's cart.

- **GET /removeFromWishList/:id**: 
  - Removes a specific item from the user's wishlist.


