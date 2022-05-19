///////////////////////////   Dark Mode / Light Mode   ///////////////////////////////////
window.onload = function() {
    switchMode(localStorage.getItem("lightMode"));
};


function switchMode(light){
    let switchButtons = document.getElementsByClassName("SwitchMode");
    let h1 = document.getElementsByTagName("h1");
    let UnavailableMessage = document.getElementsByClassName("UnavailableMessage");

    let dropdown1 = document.getElementsByClassName("MobileDropdownContent")[0];
    let dropdown2 = document.getElementsByClassName("DropdownContent")[0];

    if (light === "true") {
        document.documentElement.style.setProperty('--bgcolor', 'rgb(247, 236, 214)');
        document.documentElement.style.setProperty('--gri', '#4e4e4e');
        document.documentElement.style.setProperty('--negru', '#333232');
        document.documentElement.style.setProperty('--galben', 'rgb(236, 179, 56)');
        
        switchButtons[0].textContent = "Switch to Dark Mode";
        switchButtons[1].textContent = "Switch to Dark Mode";
        
        for (let i = 0; i < h1.length; i++)
            h1[i].style.color = "var(--negru)";

        for (let i = 0; i < UnavailableMessage.length; i++)
            UnavailableMessage[i].style.color = "var(--negru)";

        dropdown1.style.boxShadow = "0px 0px 3px 3px var(--gri)";
        dropdown2.style.boxShadow = "0px 0px 3px 3px var(--gri)";
    }
    else {
        document.documentElement.style.setProperty('--bgcolor', 'rgb(20, 20, 20)');
        document.documentElement.style.setProperty('--gri', '#272727');
        document.documentElement.style.setProperty('--negru', '#1f1e1e');
        document.documentElement.style.setProperty('--galben', 'rgb(241, 200, 111)');
        
        switchButtons[0].textContent = "Switch to Light Mode";
        switchButtons[1].textContent = "Switch to Light Mode";
        
        for (let i = 0; i < h1.length; i++)
            h1[i].style.color = "var(--galben)";
        
        for (let i = 0; i < UnavailableMessage.length; i++)
            UnavailableMessage[i].style.color = "var(--galben)";

        dropdown1.style.boxShadow = "0px 0px 3px 3px rgba(252, 204, 100, 0.4)";
        dropdown2.style.boxShadow = "0px 0px 3px 3px rgba(252, 204, 100, 0.4)";
    }
}



modes = document.getElementsByClassName("SwitchMode");

Array.from(modes).forEach(mode => {
    mode.addEventListener("click", () =>{
        let lightMode = localStorage.getItem("lightMode");
        lightMode = lightMode === "true" ? "false" : "true";
        localStorage.setItem("lightMode", lightMode);
        switchMode(lightMode);
    })   
});



document.addEventListener("keydown", (e) =>{
    let lightMode = localStorage.getItem("lightMode");
    if (e.key.toUpperCase() === "D" && lightMode === "true") {   
        localStorage.setItem("lightMode", "false");
        switchMode("false");
    }
    if (e.key.toUpperCase() === "L" && lightMode === "false") {
        localStorage.setItem("lightMode", "true");
        switchMode("true");
    }
});
///////////////////////////   Dark Mode / Light Mode   ///////////////////////////////////





let allProducts;

fetch("../products/read")
.then(res => res.json())
.then(data => allProducts = data)
.then(() => {
    allProducts.forEach(category => {
        const categoryName = category["category"];
        const SubContainer = document.getElementById(categoryName);

        if (category["items"].length) {
            category["items"].forEach(product =>{
                //Product container (the class will be assigned later, depending on the product type)
                const element = document.createElement("div");
                
                //Product name
                const name = document.createElement("span");
                name.classList.add("Name");
                name.textContent = product["name"];
                element.append(name);

                //Product image (the class will be assigned later, depending on the product type)
                const image = document.createElement("img");
                image.src = `/static/images/Products/${product["image"]}`;
                image.alt = product["name"];

                if (categoryName === "Keyboards"){
                    element.classList.add("Keyboard");
                    image.classList.add("KeyboardIMG");
                }

                if (categoryName === "Mice"){
                    element.classList.add("Mouse");
                    image.classList.add("MouseIMG");
                }
                
                if (categoryName === "Headsets"){
                    element.classList.add("Headset");
                    image.classList.add("HeadsetIMG");
                }
                
                element.append(image);
            

                //Specification table
                const table = document.createElement("table");
                let th, tr, td;

                tr = document.createElement("tr");
                th = document.createElement("th");
                th.colSpan = "2";
                th.textContent = "Specification Table";
                tr.append(th);
                table.append(tr);

                for (let property in product["properties"]){
                    tr = document.createElement("tr");
                    th = document.createElement("th");
                    th.textContent = property;
                    tr.append(th);
                    td = document.createElement("td")
                    td.textContent = product["properties"][property];
                    tr.append(td);
                    table.append(tr)
                }

                element.append(table);

                //Product price
                const price = document.createElement("span");
                price.classList.add("Price");
                price.textContent = `€${product["price"]}`
                element.append(price);

                //Add to Cart / Wishlist buttons
                const buttons = document.createElement("div");
                buttons.classList.add("Buttons")

                const addCart = document.createElement("button");
                addCart.classList.add("AddCart")
                addCart.textContent = "Add to Cart";
                buttons.append(addCart);

                const addWishlist = document.createElement("button");
                addWishlist.classList.add("AddWishlist");
                addWishlist.textContent = "Add to Wishlist";
                buttons.append(addWishlist);

                element.append(buttons)


                SubContainer.append(element);
        })}

        else {
            let span = document.createElement("span");

            span.textContent = `${categoryName} category has no available products at this moment.`;
            span.classList.add("UnavailableMessage");

            SubContainer.append(span);
        }
    });
})





const specialists = ["Tom", "Andrew", "Emma", "Michael", "Robert", "Chris", "Kate"];

setTimeout(() => {
    helpButton = document.createElement("div");
    helpButton.classList.add("helpButton");
    helpButton.textContent = "Support";
    document.body.append(helpButton);

    helpButton.addEventListener("click", () =>{
        let testHelpBox = document.getElementsByClassName("helpBox")[0];
        if (testHelpBox)
            testHelpBox.style.display = "flex";
        else {
            helpButton.style.display = "none";
            
            let helpBox = document.createElement("div");
            helpBox.classList.add("helpBox");
            
            let closeButton = document.createElement("img");
            closeButton.src = "../../static/images/Icons/Close.png";
            closeButton.style.position = "absolute";
            closeButton.style.top = "5px";
            closeButton.style.right = "7px";
            closeButton.style.cursor = "pointer";
            closeButton.title = "Close";
            helpBox.append(closeButton);

            let minimizeButton = document.createElement("img");
            minimizeButton.src = "../../static/images/Icons/Minimize.png";
            minimizeButton.style.position = "absolute";
            minimizeButton.style.top = "-3px";
            minimizeButton.style.right = "45px";
            minimizeButton.style.cursor = "pointer";
            minimizeButton.title = "Minimize";
            helpBox.append(minimizeButton);

            let specialistMessage = document.createElement("span");
            let specialistIndex = Math.floor(Math.random() * specialists.length);
            specialistMessage.textContent = `Hello, here is Buy4PC specialist ${specialists[specialistIndex]}. How can I help you?`;
            specialistMessage.style.textAlign = "center";
            specialistMessage.style.cursor = "default";
            helpBox.append(specialistMessage);

            let userMessage = document.createElement("textarea");
            userMessage.classList.add("userMessage");
            userMessage.addEventListener("keydown", (e) =>{
                e.stopPropagation();
            })
            helpBox.append(userMessage);

            document.body.append(helpBox);

            closeButton.addEventListener("click", () =>{
                helpBox.remove();
                helpButton.style.display = "flex";
            })

            minimizeButton.addEventListener("click", () =>{
                helpBox.style.display = "none";
                helpButton.style.display = "flex";
            })
        }
    })  
}, 2500)