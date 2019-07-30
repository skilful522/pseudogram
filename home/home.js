export default function () {
    var post = document.querySelector("#postsButton");
    var tagged = document.querySelector("#taggedButton");
    var oldImage = document.getElementsByClassName("img");

    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    var res = [];
    res[0] = "320x320";
    res[1] = "640x640";
    res[2] = "800x800";
    res[3] = "900x900";
    res[4] = "360x360";
    res[5] = "340x340";


    tagged.addEventListener("click", function () {
        console.log("tagged");
        for (let i = 1; i < res.length; i++) {
            oldImage[0].src = "https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
            oldImage[i].style.visibility = "hidden";
        }
    });

    post.addEventListener("click", function () {
        console.log("post");
        for (let i = 0; i < res.length; i++) {
            var image = "https://source.unsplash.com/320x320/weekly?" + getRandomArbitrary(0, 200);
            oldImage[i].style.visibility = "visible";
            oldImage[i].src = image;
        }
    });


   /* function doImageRequest(url, method, data, headers) {
        fetch('${API}${url}', {
            method: method,
            body: data,
            headers: headers,
        }).then(
            resp => resp.json()
        ).then(
            json => console.log(json)
        );
    }

    doImageRequest('/identification', 'GET', null);

    choosePhotoForm.addEventListener('submit', function (event) {
        var formD = new FormData(this);
        console.log(token);
        formD.append('parentEntityId', '1');
        doImageRequest("/file", 'POST', formD, {"token": token});
        event.preventDefault();
    }); */

    /*edit.addEventListener('click', function () {
     const elements = document.getElementsByClassName("feedImages");
     while (elements.length > 0) elements[0].remove();
     console.log(usersNames.length);
     console.log(images); */
}


