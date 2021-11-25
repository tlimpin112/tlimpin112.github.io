const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "user" && password === "admin1") {
        alert("You have successfully logged in.");
        location.replace("https://tlimpin112.github.io/search/");
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})