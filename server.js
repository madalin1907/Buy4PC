const express = require("express");
const fs = require("fs");
const path = require("path");
const { log } = require("util");
const app = express();

app.set('view engine', 'ejs');
app.use("/static", express.static("./static"));
app.use(express.json());

const hostname = '127.0.0.1';
const port = 3000;





// --------------- RUTE PENTRU PRODUSE ---------------

//Ruta care returneaza produsele din baza de date
app.get("/products/read", (req,res) => {
    let products = require("./database/products.json");
    res.send(products);
});






// --------------- RUTE PENTRU UTILIZATORI ---------------

app.post("/users/add", (req,res) => {
    let users = require("./database/users.json");
    
    const newUser = req.body;
    let added = true;

    for (let i = 0; i < users.length; i++)
        if (users[i].email === newUser.email){
            added = false;
            break;
        }
    
    if (added === true){
        users.push(newUser);

        fs.writeFileSync('./database/users.json', JSON.stringify(users, null, 4));
    }
    
    res.send(added);
});



app.get("/users/check/:email/:password", (req,res) => {
    const email = req.params.email;
    const password = req.params.password;

    const users = require("./database/users.json");
    
    let checkedUser = {
        loginStatus: "badEmail",
    }

    for (let i = 0; i < users.length; i++){
        if (users[i].email === email){
            if (users[i].password === password){
                checkedUser.loginStatus = "good";
                checkedUser.email = users[i].email;
            }
            else
                checkedUser.loginStatus = "badPassword";

            break;
        }
    }

    res.send(checkedUser);
});








// --------------- RUTE PENTRU PAGINILE WEB ---------------

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

app.get("*", (req, res) => {
    res.render("./pages/404");
});


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});