window.onload = function() {
    switchMode(localStorage.getItem("lightMode"));
};



///////////////////////////   Dark Mode / Light Mode   ///////////////////////////////////
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
///////////////////////////   Dark Mode / Light Mode   ///////////////////////////////////





const content = document.getElementsByClassName("Content")[0];
const submitButton = document.getElementsByClassName("SubmitButton")[0];

submitButton.addEventListener("click", (e) =>{
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    if (email && password){
        fetch(`/users/check/${email}`)
        .then(res => res.json())
        .then(data => checkedUser = data)
        .then(() => {
            if (checkedUser.email === "notFound" && !document.getElementsByClassName("warning").length){
                const warning = document.createElement("div");
                warning.classList.add("warning");
                warning.style.animation = "swipe 3s";
                warning.textContent = "There is no account with that email adress.";
                content.append(warning);
                
                setTimeout(() =>{
                    warning.remove();
                }, 3000)

                return;
            }

            if (checkedUser.password !== password && !document.getElementsByClassName("warning").length){
                const warning = document.createElement("div");
                warning.classList.add("warning");
                warning.textContent = "Incorrect password.";
                content.append(warning);
                
                setTimeout(() =>{
                    warning.remove();
                }, 1200)

                return;
            }
            
            if (!document.getElementsByClassName("warning").length){
                delete checkedUser["password"];

                checkedUser["connectedSince"] = new Date();

                localStorage.setItem("user", JSON.stringify(checkedUser));
                window.location = "../";
            }
        }
    )}
    else{
        if (!document.getElementsByClassName("warning").length){
            const warning = document.createElement("div");
            warning.classList.add("warning");
            warning.style.animation = "swipe 2s";
            warning.textContent = "Complete both fields.";
            content.append(warning);
            
            setTimeout(() =>{
                warning.remove();
            }, 2000)
        }
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