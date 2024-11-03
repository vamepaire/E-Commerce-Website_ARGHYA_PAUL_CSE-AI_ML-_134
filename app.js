const express = require("express");
const app = express();
const path = require("path");
const cookiParser = require("cookie-parser");
const db = require("./config/mongoose_connect");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");

require("dotenv").config();

app.set("view engine", "ejs");
app.use(cookiParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);


app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}!`);
});
