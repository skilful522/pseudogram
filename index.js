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

export var token;
var API = "https://intern-staging.herokuapp.com/api";

var userNameElement = document.getElementById("userName");
var registration = document.querySelector("#registration");

var save = document.querySelector("#loginButton");
var search = document.querySelector("#search");
var images = document.querySelector("#images");
var edit = document.querySelector("#editButton");

export var choosePhotoForm = document.forms.namedItem("choosePhotoForm");

var userLogin = document.querySelector("#userLogin");
var userPassword = document.querySelector("#userPassword");

var myLogin = "skilful522@gmail.com";
var myPassword = "uoLzwL";
var authorized = false;

var linkBlock = document.querySelector("#linkBlock");
var homeLink = document.querySelector("#homeLink");
var feedLink = document.querySelector("#feedLink");


var infoBlock = document.querySelector(".infoBlock");
var oldImage = document.getElementsByClassName("img");

var res = [];
res[0] = "320x320";
res[1] = "640x640";
res[2] = "800x800";
res[3] = "900x900";
res[4] = "360x360";
res[5] = "340x340";

var userName;
var usersNames = [];
var usersEmails = [];

var routes = {
    '': {
        html: 'home/home.html',
        src: './home/home.js'
    },
    'feed': {
        html: 'feed/feed.html',
        src: './feed/feed.js'
    }
};

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

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
    return function (html) {
        infoBlock.innerHTML = html;
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

search.style.visibility = "hidden";
infoBlock.style.display = "none";
linkBlock.style.display = "none";

search.addEventListener("click", function () {
    infoBlock.style.display = "block";
    document.getElementById("search").value = null;
});

feedLink.addEventListener('click', function () {
    search.style.visibility = "hidden";
    images.style.display = "none";
    document.querySelector("footer").style.display = "none";
});

homeLink.addEventListener('click', function () {
    search.style.visibility = "visible";
    images.style.display = "flex";
    document.querySelector("footer").style.display = "none";
});

search.onkeypress = function (event) {
    var searchText = document.getElementById("search").value;
    infoBlock.style.display = "none";
    console.log(token);
    if (event.keyCode == 13) {
        for (let i = 0; i < res.length; i++) {
            oldImage[i].style.visibility = "visible";
            var image = "https://source.unsplash.com/" + res[i] + "/weekly?" + searchText;
            oldImage[i].src = image;
        }
    }
};

login.addEventListener("click", function () {
    if (login.innerHTML === "Log out") {
        authorized = false;
        infoBlock.style.display = "none";
        linkBlock.style.display = "none";
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
    infoBlock.style.display = "block";
    linkBlock.style.display = "inline-flex";
    login.innerHTML = "Log out";
    search.style.visibility = "visible";
    loginDialog.close();
    userLogin.value = "";
    userPassword.value = "";
    }
});

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





