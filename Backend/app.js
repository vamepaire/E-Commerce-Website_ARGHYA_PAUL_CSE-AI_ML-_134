const express = require("express");
const app = express();
const path = require("path");
const cookiParser = require("cookie-parser");
const db = require("./config/mongoose_connect");
const indexRouter = require("./routes/index.routes");
const ownersRouter = require("./routes/owner.routes");
const usersRouter = require("./routes/user.routes");
const productsRouter = require("./routes/products.routes");
const viewcartRouter = require("./routes/viewcart.routes");
const config = require("config");
const flash = require("connect-flash");
const expressSession = require("express-session");
const categoriesRouter = require("./routes/category.routes");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();

app.set("view engine", "ejs");
app.use(cookiParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "150mb" }));
app.use(bodyParser.urlencoded({ limit: "150mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
  })
);
app.use(flash());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true,
  })
);
app.use(helmet());

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/category", categoriesRouter);
app.use("/find", productsRouter);
app.use("/viewcart", viewcartRouter);

app.listen(`${config.get("PORT")}`, () => {
  console.log(`App listening on port ${config.get("PORT")}!`);
});
