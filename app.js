const express = require("express");
const app = express();
const path = require("path");
const cookiParser = require("cookie-parser");
const db = require("./config/mongoose_connect");
const indexRouter = require("./routes/indexRouter");
const ownersRouter = require("./routes/owner.routes")
const usersRouter = require("./routes/user.routes");
const productsRouter = require("./routes/productsRouter");
const config = require("config");
const flash = require("connect-flash");
const expressSession = require("express-session");
const categoriesRouter = require("./routes/categoriesRouter");
const bodyParser = require("body-parser");


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

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/category", categoriesRouter);

app.listen(`${config.get("PORT")}`, () => {
  console.log(`App listening on port ${config.get("PORT")}!`);
});
