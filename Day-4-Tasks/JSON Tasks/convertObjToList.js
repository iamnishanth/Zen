// Write a function called “convertObjectToList” which converts an object literal into an array of arrays.

var obj = { name: "ISRO", age: 35, role: "Scientist" };

function convertObjectToList(obj) {
  return Object.entries(obj);
}

console.log(convertObjectToList(obj));
