function validate()
{
    var username=document.getElementById("userame").value;
    var password=document.getElementById("password").value;
    if (username=="admin"&&password=="user")
    {
        alert("login successful");
        return false;
    }
    else{
        alert("login failed");
    }
}