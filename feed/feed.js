export default function () {
    var feedButton = document.querySelector("#feedButton");
    var images = document.querySelector("#images");

    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    feedButton.addEventListener('click', function () {
        for (var i = 0; i < 3; i++) {
            var fragment = document.createDocumentFragment();
            var img = document.createElement("img");
            img.src = "https://source.unsplash.com/320x320/weekly?" + getRandomArbitrary(0, 200);
            img.className = 'feedImages';
            fragment.appendChild(img);
            images.appendChild(fragment);
        }
    });

    images.addEventListener("click", function (event) {
        if (event.target.style.width === "75%") {
            event.target.style.width = "425px";
            event.target.style.height = "400px";
        } else {
            event.target.style.display = "block";
            event.target.style.marginLeft = "auto";
            event.target.style.marginRight = "auto";
            event.target.style.width = "75%";
            event.target.style.height = "100%";
        }
    });
}