window.onload = function() {
    switchMode(localStorage.getItem("lightMode"));
    checkConnectedUser();
};



///////////////////////////   Dark Mode / Light Mode   ///////////////////////////////////
function switchMode(light){
    let switchButtons = document.getElementsByClassName("SwitchMode");

    let dropdown1 = document.getElementsByClassName("MobileDropdownContent")[0];
    let dropdown2 = document.getElementsByClassName("DropdownContent")[0];
    let hello = document.getElementsByTagName("h1")[0];

    if (light === "true") {
        document.documentElement.style.setProperty('--bgcolor', 'rgb(247, 236, 214)');
        document.documentElement.style.setProperty('--gri', '#4e4e4e');
        document.documentElement.style.setProperty('--negru', '#333232');
        document.documentElement.style.setProperty('--galben', 'rgb(236, 179, 56)');

        switchButtons[0].textContent = "Switch to Dark Mode";
        switchButtons[1].textContent = "Switch to Dark Mode";

        dropdown1.style.boxShadow = "0px 0px 3px 3px var(--gri)";
        dropdown2.style.boxShadow = "0px 0px 3px 3px var(--gri)";

        hello.style.color = "var(--negru)";
    }
    else {
        document.documentElement.style.setProperty('--bgcolor', 'rgb(20, 20, 20)');
        document.documentElement.style.setProperty('--gri', '#272727');
        document.documentElement.style.setProperty('--negru', '#1f1e1e');
        document.documentElement.style.setProperty('--galben', 'rgb(241, 200, 111)');

        switchButtons[0].textContent = "Switch to Light Mode";
        switchButtons[1].textContent = "Switch to Light Mode";

        dropdown1.style.boxShadow = "0px 0px 3px 3px rgba(252, 204, 100, 0.4)";
        dropdown2.style.boxShadow = "0px 0px 3px 3px rgba(252, 204, 100, 0.4)";

        hello.style.color = "var(--galben)";
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
    if (e.key.toUpperCase() === "L" && (lightMode === "false" || !lightMode)) {
        localStorage.setItem("lightMode", "true");
        switchMode("true");
    }
});
///////////////////////////   Dark Mode / Light Mode   ///////////////////////////////////





function checkConnectedUser(){
    const h1 = document.getElementsByTagName("h1")[0];
    h1.textContent = `Hello ${JSON.parse(localStorage.getItem("user")).firstName}!`;

    const DropdownContent = document.getElementsByClassName("DropdownContent")[0];
    let links = DropdownContent.getElementsByTagName("a");

    links[0].href = "../account";
    links[0].textContent = "Your Account";
    links[0].style.padding = "20px 15px";
    links[0].style.fontSize = "22px";
    links[1].remove();


    const MobileDropdownContent = document.getElementsByClassName("MobileDropdownContent")[0];
    let mobileLinks = MobileDropdownContent.getElementsByTagName("a");
    
    mobileLinks[4].href = "../account";
    mobileLinks[4].textContent = "Your Account";
    mobileLinks[4].style.padding = "12px 0px";
    mobileLinks[5].remove();
}





const buttons = document.getElementsByClassName("Button");
const content = document.getElementsByClassName("Content")[0];
Array.from(buttons).forEach(button =>{
    button.addEventListener("click", () =>{
        const box = document.createElement("div");
        box.classList.add("Box");

        let closeButton = document.createElement("img");
        closeButton.src = "../../static/images/Icons/Close.png";
        closeButton.style.position = "absolute";
        closeButton.style.top = "7px";
        closeButton.style.right = "7px";
        closeButton.style.cursor = "pointer";
        closeButton.title = "Close";
        box.append(closeButton);

        closeButton.addEventListener("click", () =>{
            box.remove(); 
        })


        if (button.id === "orderHistory"){
            h2 = document.createElement("h2");
            h2.style.cursor = "default";
            h2.textContent = "You didn't place any orders yet.";
            box.append(h2);
        }


        if (button.id === "editAccount"){
            box.addEventListener("keydown", (e) =>{
                e.stopPropagation();
            })


            const user = JSON.parse(localStorage.getItem("user"));
            


            let field = document.createElement("div");
            field.classList.add("userField");

            let label = document.createElement("label");
            label.setAttribute("for", "first_name");
            label.textContent = "First name";
            field.append(label);

            
            let inputDiv = document.createElement("div");
            inputDiv.classList.add("inputDiv");

            let input = document.createElement("input");
            input.classList.add("input");
            input.type = "text";
            input.id = "first_name";
            input.name = "first_name";
            input.value = user.firstName;
            input.placeholder = "Enter your first name here.";
            inputDiv.append(input);

            let editFirstName = document.createElement("button");
            editFirstName.classList.add("MoveButton");
            editFirstName.textContent = "Edit";
            inputDiv.append(editFirstName);

            field.append(inputDiv);
            box.append(field);

            editFirstName.addEventListener("click", () =>{
                const firstName = document.getElementById("first_name").value;
                if (!(/^[a-zA-Z]+([ -]?[a-zA-Z]+)$/.test(firstName)) && !document.getElementsByClassName("warning").length){
                    const warning = document.createElement("div");
                    warning.classList.add("warning");
                    warning.textContent = "Invalid first name.";
                    content.append(warning);
                    
                    setTimeout(() =>{
                        warning.remove();
                    }, 1000)

                     return;
                }

                if (user["firstName"] === firstName){
                    if (!document.getElementsByClassName("warning").length && !document.getElementsByClassName("success").length) {
                        const warning = document.createElement("div");
                        warning.classList.add("warning");
                        warning.textContent = "First name is not modified.";
                        content.append(warning);
                        
                        setTimeout(() =>{
                            warning.remove();
                        }, 1000)

                        return;
                    }
                }

                if (!document.getElementsByClassName("warning").length && !document.getElementsByClassName("success").length) {
                    user["firstName"] = firstName;
                    localStorage.setItem("user", JSON.stringify(user));

                    fetch(`/users/edit/firstName/${user.email}/${firstName}`, {
                        method: "PUT"
                    })
                    .then(() => {
                        const warning = document.createElement("div");
                        warning.classList.add("success");
                        warning.textContent = "First name edited.";
                        content.append(warning);
                        
                        setTimeout(() =>{
                            warning.remove();
                        }, 1000)
                    })
                }
            })

            



            field = document.createElement("div");
            field.classList.add("userField");

            label = document.createElement("label");
            label.setAttribute("for", "last_name");
            label.textContent = "Last name";
            field.append(label);

            inputDiv = document.createElement("div");
            inputDiv.classList.add("inputDiv");

            input = document.createElement("input");
            input.classList.add("input");
            input.type = "text";
            input.id = "last_name";
            input.name = "last_name";
            input.value = user.lastName;
            input.placeholder = "Enter your last name here.";
            inputDiv.append(input);
            
            let editLastName = document.createElement("button");
            editLastName.classList.add("MoveButton");
            editLastName.textContent = "Edit";
            inputDiv.append(editLastName);

            field.append(inputDiv);
            box.append(field);
            
            editLastName.addEventListener("click", () =>{
                const lastName = document.getElementById("last_name").value;
                if (!(/^[a-zA-Z]+([ -]?[a-zA-Z]+)$/.test(lastName)) && !document.getElementsByClassName("warning").length){
                    const warning = document.createElement("div");
                    warning.classList.add("warning");
                    warning.textContent = "Invalid last name.";
                    content.append(warning);
                    
                    setTimeout(() =>{
                        warning.remove();
                    }, 1000)

                     return;
                }

                if (user["lastName"] === lastName){
                    if (!document.getElementsByClassName("warning").length && !document.getElementsByClassName("success").length) {
                        const warning = document.createElement("div");
                        warning.classList.add("warning");
                        warning.textContent = "Last name is not modified.";
                        content.append(warning);
                        
                        setTimeout(() =>{
                            warning.remove();
                        }, 1000)

                        return;
                    }
                }

                if (!document.getElementsByClassName("warning").length && !document.getElementsByClassName("success").length) {
                    user["lastName"] = lastName;
                    localStorage.setItem("user", JSON.stringify(user));

                    fetch(`/users/edit/lastName/${user.email}/${lastName}`, {
                        method: "PUT"
                    })
                    .then(() => {
                        const warning = document.createElement("div");
                        warning.classList.add("success");
                        warning.textContent = "Last name edited.";
                        content.append(warning);
                        
                        setTimeout(() =>{
                            warning.remove();
                        }, 1000)
                    })
                }
            })




            field = document.createElement("div");
            field.classList.add("userField");

            label = document.createElement("label");
            label.setAttribute("for", "gender");
            label.textContent = "Gender";
            field.append(label);


            inputDiv = document.createElement("div");
            inputDiv.classList.add("inputDiv");

            input = document.createElement("input");
            input.type = "radio";
            input.id = "male";
            input.name = "gender";
            input.value = "male";
            if (user.gender === "male")
                input.checked = true;
            inputDiv.append(input);

            label = document.createElement("label");
            label.setAttribute("for", "male");
            label.textContent = "Male";
            inputDiv.append(label);

            input = document.createElement("input");
            input.type = "radio";
            input.id = "female";
            input.name = "gender";
            input.value = "female";
            if (user.gender === "female")
                input.checked = true;
            inputDiv.append(input);

            label = document.createElement("label");
            label.setAttribute("for", "female");
            label.textContent = "Female";
            inputDiv.append(label);

            let editGender = document.createElement("button");
            editGender.classList.add("MoveButton");
            editGender.textContent = "Edit";
            inputDiv.append(editGender);

            field.append(inputDiv);
            box.append(field);

            editGender.addEventListener("click", () =>{
                const gender = document.querySelector('input[name="gender"]:checked').value;
                
                if (user["gender"] === gender){
                    if (!document.getElementsByClassName("warning").length && !document.getElementsByClassName("success").length) {
                        const warning = document.createElement("div");
                        warning.classList.add("warning");
                        warning.textContent = "Gender is not modified.";
                        content.append(warning);
                        
                        setTimeout(() =>{
                            warning.remove();
                        }, 1000)

                        return;
                    }
                }

                if (!document.getElementsByClassName("warning").length && !document.getElementsByClassName("success").length) {
                    user["gender"] = gender;
                    localStorage.setItem("user", JSON.stringify(user));

                    fetch(`/users/edit/gender/${user.email}/${gender}`, {
                        method: "PUT"
                    })
                    .then(() => {
                        const warning = document.createElement("div");
                        warning.classList.add("success");
                        warning.textContent = "Gender edited.";
                        content.append(warning);
                        
                        setTimeout(() =>{
                            warning.remove();
                        }, 1000)
                    })
                }
            })

        }


        if (button.id === "disconnect"){
            h2 = document.createElement("h2");
            h2.style.cursor = "default";
            h2.textContent = "Are you sure you want to disconnect?";
            box.append(h2);

            const div = document.createElement("div");
            div.style.display = "flex";
            div.style.width = "100%";
            div.style.justifyContent = "space-around";

            const yes = document.createElement("button");
            yes.classList.add("ConfirmButton");
            yes.textContent = "Yes";
            yes.addEventListener("click", () =>{
                localStorage.removeItem("user");
                window.location = "../";
            })
            div.append(yes);

            const no = document.createElement("button");
            no.classList.add("ConfirmButton");
            no.textContent = "No";
            no.addEventListener("click", () =>{
                box.remove();
            })
            div.append(no);

            box.append(div);            
        }


        if (button.id === "deleteAccount"){
            h2 = document.createElement("h2");
            h2.style.cursor = "default";
            h2.textContent = "Are you sure you want to delete your account? It will be permanently erased from our database.";
            box.append(h2);

            const div = document.createElement("div");
            div.style.display = "flex";
            div.style.width = "100%";
            div.style.justifyContent = "space-around";

            const yes = document.createElement("button");
            yes.classList.add("ConfirmButton");
            yes.textContent = "Yes";

            div.append(yes);


            const no = document.createElement("button");
            no.classList.add("ConfirmButton");
            no.textContent = "No";

            no.addEventListener("click", () =>{
                box.remove();
            })

            div.append(no);

            box.append(div);
            
            

            yes.addEventListener("click", () =>{
                h2.remove();
                div.remove();

                const h3 = document.createElement("h3");
                h3.style.cursor = "default";
                h3.textContent = "Prove you are not a robot. Use the buttons / arrow keys to put the image into the box.";
                box.append(h3);
                
                const captchaBox = document.createElement("div");
                captchaBox.classList.add("captchaBox");
                
                const captchaImage = document.createElement("img");
                captchaImage.classList.add("captchaImage");
                captchaImage.src = "../../static/images/Logos/TabLogo.png";
                captchaBox.append(captchaImage);
                
                const captchaDestination = document.createElement("div");
                captchaDestination.classList.add("captchaDestination");
                captchaBox.append(captchaDestination);

                box.append(captchaBox);


            

                const moveButtons = document.createElement("div");
                moveButtons.classList.add("MoveButtonsDiv");

                const left = document.createElement("button");
                left.classList.add("MoveButton");
                left.textContent = "Left";
                moveButtons.append(left);

                const up = document.createElement("button");
                up.classList.add("MoveButton");
                up.textContent = "Up";
                moveButtons.append(up);

                const down = document.createElement("button");
                down.classList.add("MoveButton");
                down.textContent = "Down";
                moveButtons.append(down);

                const right = document.createElement("button");
                right.classList.add("MoveButton");
                right.textContent = "Right";
                moveButtons.append(right);

                box.append(moveButtons);



                captchaBoxMaxHeight = parseInt(window.getComputedStyle(captchaBox).getPropertyValue("height")) - parseInt(window.getComputedStyle(captchaImage).getPropertyValue("height")) -2;
                captchaBoxMaxWidth = parseInt(window.getComputedStyle(captchaBox).getPropertyValue("width")) - parseInt(window.getComputedStyle(captchaImage).getPropertyValue("width")) -2;


                document.addEventListener("keydown", (e) => {
                    e.preventDefault();
                    if (e.key === "ArrowLeft") {
                        captchaImage.style.left = Math.max(0, parseInt(window.getComputedStyle(captchaImage).getPropertyValue("left")) - 20) + "px";
                    }
                    if (e.key === "ArrowRight") {
                        captchaImage.style.left = Math.min(captchaBoxMaxWidth, parseInt(window.getComputedStyle(captchaImage).getPropertyValue("left")) + 20) + "px";
                    }
                    if (e.key === "ArrowUp") {
                        captchaImage.style.top = Math.max(0, parseInt(window.getComputedStyle(captchaImage).getPropertyValue("top")) - 20) + "px";
                    }
                    if (e.key === "ArrowDown") {
                        captchaImage.style.top = Math.min(captchaBoxMaxHeight, parseInt(window.getComputedStyle(captchaImage).getPropertyValue("top")) + 20) + "px";
                    }
                })

                left.addEventListener("click", () =>{
                    captchaImage.style.left = Math.max(0, parseInt(window.getComputedStyle(captchaImage).getPropertyValue("left")) - 20) + "px";
                })
                right.addEventListener("click", () =>{
                    captchaImage.style.left = Math.min(captchaBoxMaxWidth, parseInt(window.getComputedStyle(captchaImage).getPropertyValue("left")) + 20) + "px";
                })
                up.addEventListener("click", () =>{
                    captchaImage.style.top = Math.max(0, parseInt(window.getComputedStyle(captchaImage).getPropertyValue("top")) - 20) + "px";
                })
                down.addEventListener("click", () =>{
                    captchaImage.style.top = Math.min(captchaBoxMaxHeight, parseInt(window.getComputedStyle(captchaImage).getPropertyValue("top")) + 20) + "px";
                })


                const checkCaptcha = document.createElement("button");
                checkCaptcha.classList.add("ConfirmButton");
                checkCaptcha.textContent = "Proceed";
                


                destinationLeft = parseInt(window.getComputedStyle(captchaDestination).getPropertyValue("left"));
                destinationTop = parseInt(window.getComputedStyle(captchaDestination).getPropertyValue("top"));
            
                checkCaptcha.addEventListener("click", () =>{
                    imageLeft = parseInt(window.getComputedStyle(captchaImage).getPropertyValue("left"));
                    imageTop = parseInt(window.getComputedStyle(captchaImage).getPropertyValue("top"));

                    if (imageLeft === destinationLeft && imageTop === destinationTop){
                        fetch(`/users/delete/${JSON.parse(localStorage.getItem("user")).email}`, {
                            method: "DELETE"
                        })
                        .then(() => {
                            localStorage.removeItem("user");
                            
                            const warning = document.createElement("div");
                            warning.classList.add("warning");
                            warning.textContent = "User account deleted.";
                            content.append(warning);
                            
                            setTimeout(() =>{
                                warning.remove();
                                window.location = "../";
                            }, 1300)
                        })
                    }
                    else{
                        if (!document.getElementsByClassName("warning").length){
                            const warning = document.createElement("div");
                            warning.classList.add("warning");
                            warning.textContent = "Invalid Captcha.";
                            content.append(warning);
                            
                            setTimeout(() =>{
                                warning.remove();
                            }, 1300)
                        }
                    }
                })

                box.append(checkCaptcha);
            })
        }

        content.append(box);
    })
})





resetDefault = document.getElementsByClassName("resetDefault");

Array.from(resetDefault).forEach(resetButton => {
    resetButton.addEventListener("click", () =>{
        if (localStorage.length){
            localStorage.clear();
            window.location = "../";
        }
    })
});