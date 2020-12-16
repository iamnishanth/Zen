// Write a function “fromListToObject” which takes in an array of arrays, and returns an object with each pair of elements in the array as a key-value pair.

var arr = [
  ["make", "ford"],
  ["model", "Mustang"],
  ["year", "1964"],
];

function fromListToObject(arr) {
  return Object.fromEntries(arr);
}

console.log(fromListToObject(arr));
