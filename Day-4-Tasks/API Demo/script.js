let request = new XMLHttpRequest();

request.open("GET", "https://restcountries.eu/rest/v2/all", true);

request.send();

request.onload = function () {
    let data = JSON.parse(this.response);
    for(let elm of data) {
        console.log(elm.name);
    }
}
