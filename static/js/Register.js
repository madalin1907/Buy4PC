window.onload = function() {
    switchMode(localStorage.getItem("lightMode"));
};


//////////////////////////////   Dark Mode / Light Mode   //////////////////////////////
function switchMode(light){
    let switchButtons = document.getElementsByClassName("SwitchMode");

    let dropdown1 = document.getElementsByClassName("MobileDropdownContent")[0];
    let dropdown2 = document.getElementsByClassName("DropdownContent")[0];

    if (light === "true") {
        document.documentElement.style.setProperty('--bgcolor', 'rgb(247, 236, 214)');
        document.documentElement.style.setProperty('--gri', '#4e4e4e');
        document.documentElement.style.setProperty('--negru', '#333232');
        document.documentElement.style.setProperty('--galben', 'rgb(236, 179, 56)');
        
        switchButtons[0].textContent = "Switch to Dark Mode";
        switchButtons[1].textContent = "Switch to Dark Mode";

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
    if (e.key.toUpperCase() === "L" && (lightMode === "false" || !lightMode)) {
        localStorage.setItem("lightMode", "true");
        switchMode("true");
    }
});


form = document.getElementsByClassName("Formular")[0];
form.addEventListener("keydown", (e) =>{
    e.stopPropagation();
})
//////////////////////////////   Dark Mode / Light Mode   //////////////////////////////







////////////////////////// Register validation //////////////////////////

const content = document.getElementsByClassName("Content")[0];
const submitButton = document.getElementsByClassName("SubmitButton")[0];

submitButton.addEventListener("click", (e) =>{
    e.preventDefault();

    const firstName = document.getElementById("first_name").value; 
    if (!(/^[a-zA-Z]+([ -]?[a-zA-Z]+)$/.test(firstName)) && !document.getElementsByClassName("warning").length){
        const warning = document.createElement("div");
        warning.classList.add("warning");
        warning.textContent = "Invalid first name.";
        content.append(warning);
        
        setTimeout(() =>{
            warning.remove();
        }, 1200)

        return;
    }

    const lastName = document.getElementById("last_name").value; 
    if (!(/^[a-zA-Z]+([ -]?[a-zA-Z]+)$/.test(lastName)) && !document.getElementsByClassName("warning").length){
        const warning = document.createElement("div");
        warning.classList.add("warning");
        warning.textContent = "Invalid last name.";
        content.append(warning);
        
        setTimeout(() =>{
            warning.remove();
        }, 1200)

        return;
    } 
    
    const email = document.getElementById("email").value; 
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) && !document.getElementsByClassName("warning").length){
        const warning = document.createElement("div");
        warning.classList.add("warning");
        warning.textContent = "Invalid email.";
        content.append(warning);
        
        setTimeout(() =>{
            warning.remove();
        }, 1200)

        return;
    } 

    const password = document.getElementById("password").value; 
    if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,}$/.test(password)) && !document.getElementsByClassName("warning").length){
        const warning = document.createElement("div");
        warning.classList.add("warning");
        warning.style.animation = "swipe 5s";
        warning.style.padding = "15px";
        warning.style.margin = "0px 15px 0px 15px";
        warning.textContent = "The password must contain at least 7 characters, including 1 uppercase letter, 1 lowercase letter, and 1 digit.";
        content.append(warning);
        
        setTimeout(() =>{
            warning.remove();
        }, 4500)

        return;
    }

    const confirmPassword = document.getElementById("confirmPassword").value;
    if (password !== confirmPassword && !document.getElementsByClassName("warning").length) {
        const warning = document.createElement("div");
        warning.classList.add("warning");
        warning.textContent = "Passwords do not match.";
        content.append(warning);
        
        setTimeout(() =>{
            warning.remove();
        }, 1200)

        return;
    }
    
    let gender = document.querySelector('input[name="gender"]:checked');
    if (gender)
        gender = gender.value;
    else if (!gender && !document.getElementsByClassName("warning").length){
        const warning = document.createElement("div");
        warning.classList.add("warning");
        warning.textContent = "Select your gender.";
        content.append(warning);
        
        setTimeout(() =>{
            warning.remove();
        }, 1200)

        return;
    }
    

    
    if (!document.getElementsByClassName("warning").length && !document.getElementsByClassName("success").length) {
        const user = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password,
            "gender": gender,
            "admin": "no"
        }
        
        fetch("/users/add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        })
        .then(res => res.text())
        .then(data => addedUser = data)
        .then(() =>{
            if (addedUser === "true"){
                const warning = document.createElement("div");
                warning.classList.add("success");
                warning.textContent = "Account created successfully.";
                content.append(warning);
                
                setTimeout(() =>{
                    warning.remove();
                    window.location = "../login";
                }, 1000)
            }
            else{
                const warning = document.createElement("div");
                warning.classList.add("warning");
                warning.textContent = "This email is currently in use.";
                content.append(warning);
                
                setTimeout(() =>{
                    warning.remove();
                }, 1200)
            }
        })
    }
})





resetDefault = document.getElementsByClassName("resetDefault");

Array.from(resetDefault).forEach(resetButton => {
    resetButton.addEventListener("click", () =>{
        if (localStorage.length){
            localStorage.clear();
            document.location.reload(true);
        }
    })
});