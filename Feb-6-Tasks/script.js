// Major ES6 Features

// Constants - Varibale cannot be changed after declaration
const PI = 3.141593;

// Block scoped variables
// In this example the variable i can only be used inside the for loop block
for (let i = 0; i < 10; i++) {
  console.log(i);
}

// Arrow Function
const foo = () => {
  console.log("foobar");
};

// for one liner function we con do something like this...
const square = (i) => i * i;

// Default parameters - ES6 introduced default parameters for functions
const depoist = (cash = 500) => {
  if (cash >= 500) {
    console.log("deposited");
  }
};

// Rest Parameter - When no of parameters is unknown
const f = (x, y, ...a) => (x + y) * a.length;

// Spread Operator - converts iterable elements into literal elements
let arr = [1, 2, 3, 4, 5];
let arrCopy = [...arr];

// String Interpolation
console.log(`Your test score is ${100 / PI}`);

// Property Shorthand
let x = 1;
let y = 1;
let objXY = { x, y };

// Computed Property Names
let obj = { a: "x", ["y" + "heheh"]: y };

// Destructuring Assignment
let { a } = obj;

// Class
class Shape {
  constructor(id, x, y) {
    this.id = id;
    this.move(x, y);
  }
  move(x, y) {
    this.x = x;
    this.y = y;
  }
}

// Inheritance
class Rectangle extends Shape {
  constructor(id, x, y, width, height) {
    super(id, x, y);
    this.width = width;
    this.height = height;
  }
}
class Circle extends Shape {
  constructor(id, x, y, radius) {
    super(id, x, y);
    this.radius = radius;
  }
}

// For of loop - Traverses element instead of index
for (let elm of obj) {
  console.log(elm);
}

// Promises
const msgAfterTimeout = (msg, who, timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${msg} Hello ${who}!`), timeout);
  });
};
msgAfterTimeout("", "Foo", 100)
  .then((msg) => msgAfterTimeout(msg, "Bar", 200))
  .then((msg) => {
    console.log(`done after 300ms:${msg}`);
  });
