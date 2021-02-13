var Movie = /** @class */ (function () {
    function Movie(title, studio, rating) {
        if (rating === void 0) { rating = "PG13"; }
        this.title = title;
        this.studio = studio;
        this.rating = rating;
    }
    return Movie;
}());
var getPG = function (movieList) {
    return movieList.filter(function (x) { return x.rating === "PG13"; });
};
var obj1 = new Movie("Casino Royale", "Eon Productions");
var obj2 = new Movie("Avatar", "Paramount Studios", "PG13");
var obj3 = new Movie("Joker", "WarnerBros Studios", "R");
var obj4 = new Movie("Avengers", "Marvel Studios", "PG13");
var obj5 = new Movie("Dawn of Justice", "WarnerBros Studios", "R");
console.log(getPG([obj1, obj2, obj3, obj4, obj5]));
