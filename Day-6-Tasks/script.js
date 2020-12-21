let request = new XMLHttpRequest();

request.open("GET", "https://restcountries.eu/rest/v2/all", true);

request.send();

request.onload = function () {
    let data = JSON.parse(this.response);
    console.log("Asia Countries =>", getAsiaCountries(data));
    console.log("Popluation less than 2 lakh =>", getPopulation(data));
    console.log("Name, Capital, Flag of Countries =>", printDetails(data));
    console.log("Total Population of all countries =>",getTotalPoplulation(data));
    console.log("Countries with US Dollar =>", getUSDollarCountries(data));
};

const getAsiaCountries = (arr) => {
    return arr.filter((x) => x.region === "Asia");
};

const getPopulation = (arr) => {
    return arr.filter((x) => x.population < 200000);
};

const printDetails = (arr) => {
    let details = [];
    arr.forEach((element) => {
        details.push({
            Name: element.name,
            Capital: element.capital,
            Flag: element.flag,
        });
    });
    return details;
};

const getTotalPoplulation = (arr) => {
    const sum = arr.reduce((count, item) => count + item.population, 0);
    return sum;
};

const getUSDollarCountries = (arr) => {
    return arr.filter((x) => {
        for (let elm of x.currencies) {
            if (elm.code === "USD") {
                return true;
            }
        }
    });
};
