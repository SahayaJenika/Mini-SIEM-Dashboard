const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
loginBtn.addEventListener("click", function(){
    const username = usernameInput.value;
    const password = passwordInput.value;
    if(username === "admin" && password === "jeni123"){
        localStorage.setItem("loggedIn","true");
        window.location.href = "dashboard.html";
    }
    else{
        document.getElementById("message").innerText = "Invalid Username or Password";
    }
});
function loginWithEnter(event){
    if(event.key === "Enter"){
        loginBtn.click();
    }
}
usernameInput.addEventListener("keypress", loginWithEnter);
passwordInput.addEventListener("keypress", loginWithEnter);