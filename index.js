var login = document.querySelector("#login");
var dialog = document.querySelector("dialog");
var close = document.querySelector("#close");
var save = document.querySelector("#loginButton");
var search = document.querySelector("#search");
var post = document.querySelector("#postsButton");
var tagged = document.querySelector("#taggedButton");
var oldImage = document.getElementsByClassName("img");
var images = document.querySelector("#images");

var userLogin = document.querySelector("#userLogin");
var userPassword = document.querySelector("#userPassword");

var myLogin = "skilful522@gmail.com";
var myPassword = "uoLzwL";
var authorized = false;

var infoBlock = document.querySelector(".infoBlock");
var res = [];

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

res[0] = "320x320";
res[1] = "640x640";
res[2] = "800x800";
res[3] = "900x900";
res[4] = "360x360";
res[5] = "340x340";

search.style.visibility = "hidden";
infoBlock.style.display = "none";

images.addEventListener("click", function (event) {
    if (event.target.style.width === "75%") {
        event.target.style.width = "425px";
        event.target.style.height = "400px";
        if (authorized == true) {
            infoBlock.style.display = "block";
        }
    } else {
        event.target.style.display = "block";
        event.target.style.marginLeft = "auto";
        event.target.style.marginRight = "auto";
        event.target.style.width = "75%";
        infoBlock.style.display = "none";
        event.target.style.height = "75%";
    }
});

search.addEventListener("click", function () {
    infoBlock.style.display = "block";
    document.getElementById("search").value = null;
});

search.onkeypress = function (event) {
    var searchText = document.getElementById("search").value;
    infoBlock.style.display = "none";
    if (event.keyCode == 13) {
        for (let i = 0; i < res.length; i++) {
            oldImage[i].style.visibility = "visible";
            image = "https://source.unsplash.com/" + res[i] + "/weekly?" + searchText;
            oldImage[i].src = image;
        }
    }
};

tagged.addEventListener("click", function () {
    for (let i = 1; i < res.length; i++) {
        oldImage[0].src = "https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
        oldImage[i].style.visibility = "hidden";
    }
});

post.addEventListener("click", function () {
    for (let i = 0; i < res.length; i++) {
        image = "https://source.unsplash.com/320x320/weekly?" + getRandomArbitrary(0,200);
        oldImage[i].style.visibility = "visible";
        oldImage[i].src = image;
    }
});

login.addEventListener("click", function () {
    if (login.innerHTML === "Log out") {
        authorized = false;
        infoBlock.style.display = "none";
        login.innerHTML = "Log in";
        search.style.visibility = "hidden";
    } else {
        dialog.showModal();
    }
});

close.addEventListener("click", function () {
    dialog.close();
    userLogin.value = "";
    userPassword.value = "";
});

save.addEventListener("click", function () {

    if (userLogin.value == myLogin && userPassword.value == myPassword) {
        var singInReq = {email: userLogin.value, password: userPassword.value};
        doRequest(singInReq);
        authorized = true;
        infoBlock.style.display = "block";
        login.innerHTML = "Log out";
        search.style.visibility = "visible";
    }
    dialog.close();
    userLogin.value = "";
    userPassword.value = "";
});

function doRequest(data) {
    fetch('https://intern-staging.herokuapp.com/api/identification/sign_in', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(
        resp => resp.json()
    ).then(
        json => console.log(json)
    );
}
