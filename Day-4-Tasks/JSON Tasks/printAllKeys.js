// Write a function called “printAllKeys” which returns an newArray of all the input object’s keys.

var obj = { name: "RajiniKanth", age: 33, hasPets: false };

function printAllKeys(obj) {
  let arr = [];
  for (let elm in obj) {
    arr.push(elm);
  }
  return arr;
}

console.log(printAllKeys(obj));
