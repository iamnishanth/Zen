var expected = { foo: 6, bar: 5 };
var actual = { foo: 5, bar: 6 };

function assertObjectsEqual(actual, expected, testName) {
  let act = JSON.stringify(actual);
  let exp = JSON.stringify(expected);
  if (act === exp) {
    return "Passed";
  } else {
    return `FAILED ${testName} Expected ${exp}, but got ${act}`;
  }
}

console.log(assertObjectsEqual(actual, expected, "test"));
