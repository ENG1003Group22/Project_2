var user = "Abandon_Hope",
    pass = "All_Yee_Who_Enter";

function login() {

    if (document.getElementById("user").value == user & document.getElementById("pass").value == pass) {

        location.href = 'index.html'

    } else {

        document.getElementById("errorOutput").innerHTML = "Incorrect Login!";
        console.log("Wrong Login");
    }

}