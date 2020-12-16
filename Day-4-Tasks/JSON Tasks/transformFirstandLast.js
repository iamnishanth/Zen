// Write a function ‘transformFirstAndLast’ that takes in an array, and returns an object with: 1) the first element of the array as the object’s key, and 2) the last element of the array as that key’s value.

var arr = ["GUVI", "I", "am", "Geek"];

function transformFirstAndLast(arr) {
  let obj = {};
  obj[arr[0]] = arr[arr.length - 1];
  return obj;
}

console.log(transformFirstAndLast(arr));
