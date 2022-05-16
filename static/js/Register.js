///////////////////////////   Dark Mode / Light Mode   ///////////////////////////////////
window.onload = function() {
    switchMode(localStorage.getItem("lightMode"));
};


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

        if (lightMode === "true"){
            localStorage.setItem("lightMode", "false");
            lightMode = "false";
        }
        else{
            localStorage.setItem("lightMode", "true");
            lightMode = "true";
        }
        switchMode(lightMode);
    })   
});
///////////////////////////   Dark Mode / Light Mode   ///////////////////////////////////