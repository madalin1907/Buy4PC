const express = require("express");
const { appendFileSync } = require("fs");
const path = require("path");
const app = express();

app.set('view engine', 'ejs');
app.use("/static", express.static("./static"));


const hostname = '127.0.0.1';
const port = 3000;


app.get("/", (req,res) => {
    res.render("./pages/Home");
});

app.get("/products", (req,res) => {
  res.render("./pages/Products");
});

app.get("/wishlist", (req,res) => {
  res.render("./pages/Wishlist");
});

app.get("/cart", (req,res) => {
  res.render("./pages/Cart");
});

app.get("/login", (req,res) => {
  res.render("./pages/Login");
});

app.get("/register", (req,res) => {
  res.render("./pages/Register");
});



app.get("/products/read", (req,res) => {
  const data = require("./database.json");
  res.send(data);
});


app.get("/image", (req,res) => {
  res.send("../static/images");
});







app.get("*", (req, res) => {
  res.render("./pages/404Page");
});


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});