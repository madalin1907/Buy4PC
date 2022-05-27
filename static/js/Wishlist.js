window.onload = function() {
    switchMode(localStorage.getItem("lightMode"));
    checkConnectedUser();
};



///////////////////////////   Dark Mode / Light Mode   ///////////////////////////////////
function switchMode(light){
    let switchButtons = document.getElementsByClassName("SwitchMode");
    let message = document.getElementsByClassName("Message")[0];

    let dropdown1 = document.getElementsByClassName("MobileDropdownContent")[0];
    let dropdown2 = document.getElementsByClassName("DropdownContent")[0];

    if (light === "true") {
        document.documentElement.style.setProperty('--bgcolor', 'rgb(247, 236, 214)');
        document.documentElement.style.setProperty('--gri', '#4e4e4e');
        document.documentElement.style.setProperty('--negru', '#333232');
        document.documentElement.style.setProperty('--galben', 'rgb(236, 179, 56)');

        switchButtons[0].textContent = "Switch to Dark Mode";
        switchButtons[1].textContent = "Switch to Dark Mode";

        message.style.color = "var(--gri)";

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

        message.style.color = "var(--galben)";

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
///////////////////////////   Dark Mode / Light Mode   ///////////////////////////////////





function checkConnectedUser(){
    const user = localStorage.getItem("user");
    if (user){
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
}





resetDefault = document.getElementsByClassName("resetDefault");

Array.from(resetDefault).forEach(resetButton => {
    resetButton.addEventListener("click", () =>{
        if (localStorage.length)
            localStorage.clear();
        window.location = "/";
    })
});