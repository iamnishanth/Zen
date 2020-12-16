// Write a function called “printAllValues” which returns an newArray of all the input object’s values.

var obj = { name: "RajiniKanth", age: 33, hasPets: false };

function printAllValues(obj) {
  let arr = [];
  for (let elm in obj) {
    arr.push(obj[elm]);
  }
  return arr;
}

console.log(printAllValues(obj));
