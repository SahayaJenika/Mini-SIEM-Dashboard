const loginBtn=document.getElementById("loginBtn");
loginBtn.addEventListener("click", function(){
    const username=document.getElementById("username").value;
    const password=document.getElementById("password").value;
    if(username==="admin" && password==="jeni123"){
        localStorage.setItem("loggedIn","true");
        window.location.href="dashboard.html";
    }
else{
    document.getElementById("message").innerText="Invalid Username or Password";
}
});