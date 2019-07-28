var login = document.querySelector("#login");
var signIn = document.querySelector("#sign-in");

var loginDialog = document.querySelector("#loginDialog");
var signInDialog = document.querySelector("#signInDialog");

var closeLoginDialog = document.querySelector("#closeLoginDialog");
var closeSingInDialog = document.querySelector("#closeSingInDialog");

var ok = document.querySelector("#ok");

var userFirstNameElement = document.querySelector('#userFirstName');
var userLastNameElement = document.querySelector('#userLastName');
var userEmailElement = document.querySelector("#userEmail");

var token;
var API = "https://intern-staging.herokuapp.com/api";

var userNameElement = document.getElementById("userName");
var registration = document.querySelector("#registration");

var save = document.querySelector("#loginButton");
var search = document.querySelector("#search");
var post = document.querySelector("#postsButton");
var tagged = document.querySelector("#taggedButton");
var oldImage = document.getElementsByClassName("img");
var images = document.querySelector("#images");
var edit = document.querySelector("#editButton");
var feedButton = document.querySelector("#feedButton");

var choosePhotoForm = document.forms.namedItem("choosePhotoForm");

var userLogin = document.querySelector("#userLogin");
var userPassword = document.querySelector("#userPassword");

var myLogin = "skilful522@gmail.com";
var myPassword = "uoLzwL";
var authorized = false;

var infoBlock = document.querySelector(".infoBlock");
var res = [];

var userName;
var usersNames = [];
var usersEmails = [];

var fragment = document.createDocumentFragment();

var routes = {
    "login": {
        html: "login/login.html",
    }
};

var requestTemplate = (function () {
    var cache = {};
    return function (url) {
        if (cache.hasOwnProperty(url)) {
            return Promise.resolve(cache[url]);
        } else {
            return fetch(url).then(function (res) {
                return res.text();
            }).then(function (html) {
                cache[url] = html;
                return html;
            })
        }
    }
})();

var runScript = (function () {
    var cache = {};
    return function (src) {
        if (cache.hasOwnProperty(src)) {
            cache[src]();
        } else {
            import(src).then(function (module) {
                cache[src] = module.default;
                cache[src]();
            }).catch(function (err) {
                console.error(err)
            });
        }
    }
})();


var render = (function () {
    var content = document.getElementsByClassName('infoBlock');
    return function (html) {
        content.innerHTML = html;
    }
})();

var handleRouting = (function () {
    var previousHash;
    return function () {
        var hash = window.location.hash.split('#/')[1] || '';
        if (previousHash === hash) {
            return;
        }
        if (routes.hasOwnProperty(hash)) {
            previousHash = hash;
            var urls = routes[hash];
            requestTemplate(urls.html).then(function (html) {
                render(html);
                if (urls.hasOwnProperty('src')) {
                    runScript(urls.src);
                }
            })
        }
    }
})();

window.addEventListener('DOMContentLoaded', handleRouting);
window.addEventListener('hashchange', handleRouting);

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
feedButton.style.display = "none";
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
            var image = "https://source.unsplash.com/" + res[i] + "/weekly?" + searchText;
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
        var image = "https://source.unsplash.com/320x320/weekly?" + getRandomArbitrary(0, 200);
        oldImage[i].style.visibility = "visible";
        oldImage[i].src = image;
    }
});

login.addEventListener("click", function () {
    if (login.innerHTML === "Log out") {
        authorized = false;
        feedButton.style.display = "none";
        infoBlock.style.display = "none";
        signIn.style.display = "block";
        login.innerHTML = "Log in";
        search.style.visibility = "hidden";
    } else {
        loginDialog.showModal();
    }
});

function getUserName() {
    return userNameElement.innerText = userFirstNameElement.value + " " + userLastNameElement.value;
}

function setUsersNamesInBase() {
    userName = getUserName();
    usersNames.push(userName + " " + getUserEmail());
}

function getUserEmail() {
    usersEmails = userEmailElement.innerText;
    usersEmails = usersEmails.split(" ");
    return userEmailElement.innerText = userEmailElement.value;
}

var click = 0;

ok.addEventListener('click', function () {
    registration.innerHTML = "Registration";
    click += 1;
    if (click === 1) {
        getUserName();
        setUsersNamesInBase();
        userFirstNameElement.style.display = "none";
        userLastNameElement.style.display = "none";
        userEmailElement.style.display = "none";
        registration.innerHTML = "Check your email";
    }
    if (click === 2) {
        click = 0;
        userFirstNameElement.style.display = "block";
        userLastNameElement.style.display = "block";
        userEmailElement.style.display = "block";
        var signInReq = {email: getUserEmail()};
        doSignInRequest(signInReq);
        signInDialog.close();
        images.style.visibility = "visible";
    }
});



closeLoginDialog.addEventListener("click", function () {
    loginDialog.close();
    userLogin.value = "";
    userPassword.value = "";
});

closeSingInDialog.addEventListener("click", function () {
    signInDialog.close();
});

save.addEventListener("click", function () {
    if (userLogin.value == myLogin && userPassword.value == myPassword) {
        var logInReq = {email: userLogin.value, password: userPassword.value};
        doLogInRequest(logInReq);
        authorized = true;
        signIn.style.display = "none";
        feedButton.style.display = "block";
        infoBlock.style.display = "block";
        login.innerHTML = "Log out";
        search.style.visibility = "visible";
        loginDialog.close();
        userLogin.value = "";
        userPassword.value = "";
    }
});

feedButton.addEventListener('click', function () {
    for (var i = 0; i < 3; i++) {
        var img = document.createElement("img");
        img.src = "https://source.unsplash.com/320x320/weekly?" + getRandomArbitrary(0, 200);
        img.className = 'feedImages';
        fragment.appendChild(img);
        images.appendChild(fragment);
    }
});

/*edit.addEventListener('click', function () {
    const elements = document.getElementsByClassName("feedImages");
    while (elements.length > 0) elements[0].remove();
    console.log(usersNames.length);
    console.log(images);
}); */

signIn.addEventListener('click', function () {
    signInDialog.showModal();
});

function doLogInRequest(data) {
    fetch('https://intern-staging.herokuapp.com/api/identification/sign_in', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(
        resp => resp.json()
    ).then(
        json => token = json
    );
}

function doSignInRequest(data) {
    fetch('https://intern-staging.herokuapp.com/api/identification', {
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
function doImageRequest(url, method, data, headers) {
    fetch("${API}${url}", {
        method: method,
        body: data,
        headers: headers,
    }).then(
        resp => resp.json()
    ).then(
        json => console.log(json)
    );
}

doImageRequest('/identification','GET',null)

choosePhotoForm.addEventListener('submit', function (event) {
    var formD = new FormData(this);
    console.log(token);
    formD.append('parentEntityId', '1');
    doImageRequest("/file",'POST', formD, {"token": token});
    event.preventDefault();
});



