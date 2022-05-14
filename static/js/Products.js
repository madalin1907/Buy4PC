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
