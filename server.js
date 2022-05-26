const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.set('view engine', 'ejs');
app.use("/static", express.static("./static"));
app.use(express.json());

const hostname = '127.0.0.1';
const port = 3000;





// --------------- RUTE PENTRU PRODUSE ---------------

// Ruta care returneaza produsele din baza de date
app.get("/products/read", (req,res) => {
    let products = require("./database/products.json");
    res.send(products);
});






// --------------- RUTE PENTRU UTILIZATORI ---------------

// Ruta care adauga un utilizator nou in baza de date
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


// Ruta care returneaza un utilizator dupa email
app.get("/users/check/:email", (req,res) => {
    const email = req.params.email;

    const users = require("./database/users.json");
    
    let user, ok = false;

    for (let i = 0; i < users.length; i++){
        if (users[i].email === email){
            ok = true;
            user = users[i];
            break;
        }
    }
    
    if (!ok){
    user = {
        email: "notFound"
    }}
    
    res.send(user);
});


// Ruta care sterge un utilizator din baza de date
app.delete("/users/delete/:email", (req,res) => {
    const email = req.params.email;
    const users = require("./database/users.json");
    
    for (let i = 0; i < users.length; i++){
        if (users[i].email === email){
            users.splice(i, 1);
            fs.writeFileSync('./database/users.json', JSON.stringify(users, null, 4));
            res.send();
        }
    }
});


// Ruta care modifica campul firstName al unui utilizator
app.put("/users/edit/firstName/:email/:firstName", (req, res) => {
    const email = req.params.email;
    const firstName = req.params.firstName;

    let users = require("./database/users.json");

    for (let i = 0; i < users.length; i++){
        if (users[i].email === email){
            users[i].firstName = firstName;
            fs.writeFileSync('./database/users.json', JSON.stringify(users, null, 4));
            res.send();
        }
    }
})


// Ruta care modifica campul lastName al unui utilizator
app.put("/users/edit/lastName/:email/:lastName", (req, res) => {
    const email = req.params.email;
    const lastName = req.params.lastName;

    let users = require("./database/users.json");

    for (let i = 0; i < users.length; i++){
        if (users[i].email === email){
            users[i].lastName = lastName;
            fs.writeFileSync('./database/users.json', JSON.stringify(users, null, 4));
            res.send();
        }
    }
})


// Ruta care modifica campul gender al unui utilizator
app.put("/users/edit/gender/:email/:gender", (req, res) => {
    const email = req.params.email;
    const gender = req.params.gender;

    let users = require("./database/users.json");

    for (let i = 0; i < users.length; i++){
        if (users[i].email === email){
            users[i].gender = gender;
            fs.writeFileSync('./database/users.json', JSON.stringify(users, null, 4));
            res.send();
        }
    }
})


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

app.get("/account", (req,res) => {
    res.render("./pages/Account");
});

app.get("*", (req, res) => {
    res.render("./pages/404");
});


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});