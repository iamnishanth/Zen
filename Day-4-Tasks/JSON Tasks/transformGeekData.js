// Write a function called "transformGeekData" that transforms some set of data from one format to another.

var array = [
  [
    ["firstName", "Vasanth"],
    ["lastName", "Raja"],
    ["age", 24],
    ["role", "JSWizard"],
  ],
  [
    ["firstName", "Sri"],
    ["lastName", "Devi"],
    ["age", 28],
    ["role", "Coder"],
  ],
];

function transformEmployeeData(arr) {
  let transformEmployeeList = [];
  for (let elm in arr) {
    transformEmployeeList.push(Object.fromEntries(arr[elm]));
  }
  return transformEmployeeList;
}

console.log(transformEmployeeData(array));
