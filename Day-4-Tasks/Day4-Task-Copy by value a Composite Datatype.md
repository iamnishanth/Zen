# Copy by value a Composite Datatype

In JavaScript, Primitive data types such as **Numbers, Strings, Boolean, undefined, null** are copied by value and composite data types such as **Arrays and Objects** are copied by reference. So, How do we copy a composite data type by its value? The following are the most used methods to clone a composite data type.

## For loop

This is the least preferred way in modern ES6 JavaScript, but it gets the job done.

```jsx
let arr1 = [1, 2, 3, 4, 5];
let arr2 =[];
for(let i = 0; i < arr1.length; i++) {
	arr2[i] = arr1[i];
}
console.log(arr1); // Outputs [1, 2, 3, 4, 5]
console.log(arr2); // Outputs [1, 2, 3, 4, 5]
arr1[0] = 77;
console.log(arr1); // Outputs [77, 2, 3, 4, 5] arr1 Value Changed
console.log(arr2); // Outputs [1, 2, 3, 4, 5] arr2 Unaffected
```

## Slice

The `slice()` method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified.

```jsx
let arr1 = [1, 2, 3, 4, 5];
let arr2 = arr1.slice();
console.log(arr1); // Outputs [1, 2, 3, 4, 5]
console.log(arr2); // Outputs [1, 2, 3, 4, 5]
arr1[0] = 77;
console.log(arr1); // Outputs [77, 2, 3, 4, 5] arr1 Value Changed
console.log(arr2); // Outputs [1, 2, 3, 4, 5] arr2 Unaffected

```

`slice()` effectively goes one level deep while copying an array. Therefore, it may be unsuitable for copying multidimensional arrays.

## Array.from()

`Array.from()` can turn any iterable object into an array. Giving an array returns a shallow copy.

```jsx
let arr1 = [1, 2, 3, 4, 5];
let arr2 = Array.from(arr1);
console.log(arr1); // Outputs [1, 2, 3, 4, 5]
console.log(arr2); // Outputs [1, 2, 3, 4, 5]
arr1[0] = 77;
console.log(arr1); // Outputs [77, 2, 3, 4, 5] arr1 Value Changed
console.log(arr2); // Outputs [1, 2, 3, 4, 5] arr2 Unaffected
```

## Spread Operator

Spread syntax `(...)` allows an iterable such as an array expression or string to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected.

```jsx
let arr1 = [1, 2, 3, 4, 5];
let arr2 = [...arr1];
console.log(arr1); // Outputs [1, 2, 3, 4, 5]
console.log(arr2); // Outputs [1, 2, 3, 4, 5]
arr1[0] = 77;
console.log(arr1); // Outputs [77, 2, 3, 4, 5] arr1 Value Changed
console.log(arr2); // Outputs [1, 2, 3, 4, 5] arr2 Unaffected
let obj1 = {one: "1", two: "2", three: "3"};
let obj2 = {...obj1};
console.log(obj1); // Outputs {one: "1", two: "2", three: "3"}
console.log(obj2); // Outputs {one: "1", two: "2", three: "3"}
obj1["one"] = "77";
console.log(obj1); //Outputs {one: "77", two: "2", three: "3"}
console.log(obj2); // Outputs {one: "1", two: "2", three: "3"}
```

Spread syntax effectively goes one level deep while copying an array. Therefore, it may be unsuitable for copying multidimensional arrays.

## JSON.parse and JSON.stringify

`JSON.stringify` turns an object into a string.

`JSON.parse` turns a string into an object.

Combining them can turn an object into a string, and then reverse the process to create a brand new data structure.

This method goes deep copy i.e. it copies multidimensional arrays and objects.

```jsx
let arr1 = [1, 2, 3, 4, 5];
let arr2 = JSON.parse(JSON.stringify(arr1));
arr1[0] = 77;
console.log(arr1); // Outputs [77, 2, 3, 4, 5] arr1 Value Changed
console.log(arr2); // Outputs [1, 2, 3, 4, 5] arr2 Unaffected
let obj1 = {one: "1", two: "2", three: "3"};
let obj2 = JSON.parse(JSON.stringify(obj1));
console.log(obj1); // Outputs {one: "1", two: "2", three: "3"}
console.log(obj2); // Outputs {one: "1", two: "2", three: "3"}
obj1["one"] = "77";
console.log(obj1); //Outputs {one: "77", two: "2", three: "3"}
console.log(obj2); // Outputs {one: "1", two: "2", three: "3"}
```