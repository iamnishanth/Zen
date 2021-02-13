class Movie {
  title: string;
  studio: string;
  rating: string;
  constructor(title: string, studio: string, rating: string = "PG13") {
    this.title = title;
    this.studio = studio;
    this.rating = rating;
  }
}
const getPG = (movieList: Movie[]) => {
  return movieList.filter((x) => x.rating === "PG13");
};

let obj1 = new Movie("Casino Royale", "Eon Productions");
let obj2 = new Movie("Avatar", "Paramount Studios", "PG13");
let obj3 = new Movie("Joker", "WarnerBros Studios", "R");
let obj4 = new Movie("Avengers", "Marvel Studios", "PG13");
let obj5 = new Movie("Dawn of Justice", "WarnerBros Studios", "R");

console.log(getPG([obj1, obj2, obj3, obj4, obj5]));
