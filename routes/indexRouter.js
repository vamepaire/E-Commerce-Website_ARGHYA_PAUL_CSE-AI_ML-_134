const express = require("express");
const route = express.Router();
const isLoggedIn = require("../middlewares/isLoggedin");
const productModel = require("../models/product_model");
const user_model = require("../models/user_model");
const { userLogin } = require("../controllers/authController");
const Order = require("../models/orders_model");

route.get("/", async (req, res) => {
  if (req.cookies.token) {
    res.redirect("/shopmate");
  } else {
    let message = req.flash("message");
    const allProduct = await productModel.find();
    res.render("shopmatePage", {
      cart: [],
      orders: [],
      wishlist: [],
      allProduct: allProduct,
      message: message,
      flag: true,
    });
  }
});
route.get("/loginpage", async (req, res) => {
  let message = req.flash("message");
  res.render("signUpPage", { message });
});

route.get("/registerpage", async (req, res) => {
  let message = req.flash("message");
  res.render("signUpPage", { message });
});

route.get("/shopmate", isLoggedIn, async function (req, res) {
  try {
    let user = await user_model.findOne({ email: req.user.email });
    let message = req.flash("message");
    let allProduct = await productModel.find();

    res.render("shopmatePage", {
      cart: user.cart,
      wishlist: user.wishlist,
      orders: user.orders,
      message: message,
      allProduct: allProduct,
      flag: false,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ message: "Error fetching products" });
  }
});

route.get("/addtocart/:id", isLoggedIn, async (req, res) => {
  try {
    // Fetch all products to check for discount prices
    let allProduct = await productModel.find();
    let productToAdd = await productModel.findById(req.params.id); // Find the specific product to be added
    let user = await user_model.findOne({ email: req.user.email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (!productToAdd) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Check if the product is already in the cart
    if (user.cart.includes(req.params.id)) {
      req.flash("message", "Product already in cart");
      return res.redirect(`/products/${req.params.id}`);
    }

    // Add the product to the cart
    user.cart.push(req.params.id);

    // Calculate the discounted price (if any) and total price
    let discountedPrice =
      productToAdd.price - productToAdd.price * (productToAdd.discount / 100);
    user.totalPrice = user.totalPrice
      ? user.totalPrice + discountedPrice
      : discountedPrice;

    await user.save();

    req.flash("message", "Product added to cart");
    let message = req.flash("message");

    // Send updated data back to the frontend
    res.redirect(`/products/${req.params.id}`);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).send({ message: "Error adding product to cart" });
  }
});
route.post("/addtocart/:id", isLoggedIn, async (req, res) => {
  try {
    // Fetch all products to check for discount prices
    let allProduct = await productModel.find();
    let productToAdd = await productModel.findById(req.params.id); // Find the specific product to be added
    let user = await user_model.findOne({ email: req.user.email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (!productToAdd) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Check if the product is already in the cart
    if (user.cart.includes(req.params.id)) {
      req.flash("message", "Product already in cart");
      return res.render("shopmatePage", {
        cart: user.cart,
        wishlist: user.wishlist,
        orders: user.orders,
        allProduct: allProduct,
        message: req.flash("message"),
        flag: false,
      });
    }

    // Add the product to the cart
    user.cart.push(req.params.id);

    // Calculate the discounted price (if any) and total price
    let discountedPrice =
      productToAdd.price - productToAdd.price * (productToAdd.discount / 100); // Assuming discount is a percentage
    user.totalPrice = user.totalPrice
      ? user.totalPrice + discountedPrice
      : discountedPrice;

    await user.save();

    req.flash("message", "Product added to cart");
    let message = req.flash("message");

    // Send updated data back to the frontend
    res.render("shopmatePage", {
      cart: user.cart,
      wishlist: user.wishlist,
      orders: user.orders,
      allProduct: allProduct,
      message: message,
      flag: false,
      totalPrice: user.totalPrice, // Send the updated total price to the frontend
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).send({ message: "Error adding product to cart" });
  }
});

route.get("/cart", isLoggedIn, async (req, res) => {
  try {
    let user = await user_model
      .findOne({ email: req.user.email })
      .populate("cart");

    if (!user || !user.cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    let cartItems = user.cart;
    let totalPrice = 0;
    let totalDiscount = 0;

    cartItems.forEach((item) => {
      let itemPrice = item.price || 0;
      let itemDiscount = (item.discount || 0) / 100; // Assuming `discount` is a percentage
      let discountedPrice = itemPrice - itemPrice * itemDiscount;

      totalPrice += itemPrice; // Sum original prices
      totalDiscount += itemPrice * itemDiscount; // Sum total discount
    });
    let finalTotal = totalPrice - totalDiscount;

    res.render("cartPage", {
      cartItems: cartItems,
      total: totalPrice,
      user,
      discount: totalDiscount,
      discountedPirce: finalTotal,
    });

    // res.status(200).send({ message:"Cart successfully Fetched" });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).send({ message: "Error fetching cart" });
  }
});

route.get("/wishlist", isLoggedIn, async (req, res) => {
  try {
    let user = await user_model
      .findOne({ email: req.user.email })
      .populate("wishlist");

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const wishlistItems = user.wishlist;
    res.render("wishListPage", { wishlistItems, user });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).send({ message: "Error fetching wishlist" });
  }
});

// Orders Route
route.get("/orders", isLoggedIn, async (req, res) => {
  try {
    // Fetch orders from the database (you can also filter by user, etc.)
    const orders = await Order.find({ user: req.user.id });
    res.render("ordersPage", { orders });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

route.get("/removeFromCart/:id", isLoggedIn, async function (req, res) {
  try {
    const user = await user_model.findOne({ email: req.user.email });
    const cart = user.cart;
    const itemId = req.params.id;

    const updatedCart = cart.filter((item) => item._id.toString() !== itemId);

    user.cart = updatedCart;

    await user.save();
    res.redirect("/cart");
  } catch (error) {}
});
route.get("/removeFromWishList/:id", isLoggedIn, async function (req, res) {
  try {
    const user = await user_model.findOne({ email: req.user.email });
    const wishList = user.wishlist;
    const itemId = req.params.id;

    const updatedWishList = wishList.filter(
      (item) => item._id.toString() !== itemId
    );

    user.wishlist = updatedWishList;

    await user.save();
    res.redirect("/wishlist");
  } catch (error) {
    console.error("Error removing item:", error);
    res.status(500).send("Failed to remove item from cart");
  }
});

route.get("/checkout/:id", isLoggedIn, async (req, res) => {
  try {
    const product = await productModel.find({ _id: req.params.id });

    const user = await user_model.findOne({ email: req.user.email });

    res.render("checkOutPage", { cartItems: product, user: user });
  } catch (error) {
    console.error("Error loading checkout page:", error);
    res.status(500).send({ message: "Error loading checkout page" });
  }
});

route.get("/checkout", isLoggedIn, async function (req, res) {
  const user = await user_model
    .findOne({ email: req.user.email })
    .populate("cart");
  let userCart = user.cart;

  res.render("checkOutPage", {
    cartItems: userCart,
    user: user,
    message: req.flash.message,
  });
});

route.post("/place-order", isLoggedIn, async (req, res) => {
  try {
    let { orderItems, shippingAddress, paymentMethod, selectedPaymentMethod } =
      req.body;

    // Parse `orderItems` elements if they are strings
    if (Array.isArray(orderItems)) {
      orderItems = orderItems.map((item) => {
        try {
          return JSON.parse(item); // Parse each stringified item
        } catch (err) {
          console.error("Invalid JSON format in order item:", item);
          throw new Error("Invalid order item format.");
        }
      });
    } else {
      return res.status(400).json({ message: "Order items must be an array." });
    }

    // Validate parsed orderItems
    if (!orderItems.length || !shippingAddress || !paymentMethod) {
      req.flash("message", "All fields are required.");
      return res.redirect("/orders");
    }

    // Validate each product in `orderItems`
    for (const item of orderItems) {
      const product = await productModel.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${item.product} not found.` });
      }
    }

    // Calculate total price
    const totalPrice = orderItems.reduce(
      (sum, item) => sum + (item.price || 0), // Ensure price is defined
      0
    );

    // Create the order
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      selectedPaymentMethod,
      user: req.user.id, // Add user association
    });

    const savedOrder = await order.save();

    // Associate the order with the user
    const user = await user_model.findById(req.user.id);
    if (user) {
      user.orders = user.orders || [];
      user.orders.push(savedOrder._id);
      await user.save();
    }

    // Flash success message and redirect
    req.flash("message", "Order placed successfully!");
    res.redirect("/orders");
  } catch (error) {
    console.error("Error:", error);
    req.flash("message", "Something went wrong. Please try again.");
    res.status(500).redirect("/checkout");
  }
});

route.post("/deleteFromOrders/:id", isLoggedIn, async function (req, res) {
  try {
    // Step 1: Delete the order from the Order collection
    const deletedProduct = await Order.findOneAndDelete({
      _id: req.params.id,
    });

    // Step 2: Find the logged-in user
    const user = await user_model.findById(req.user.id);

    // Step 3: Remove the order ID from the user's orders array
    user.orders = user.orders.filter(
      (orderId) => orderId.toString() !== req.params.id
    );

    // Step 4: Save the updated user document
    await user.save();

    // Step 5: Redirect to the orders page
    res.redirect("/orders");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

route.get("/privacy-policy", function (req, res) {
  res.render("privacyPolicy");
});

route.get("/terms", function (req, res) {
  res.render("termsPage");
});

module.exports = route;
