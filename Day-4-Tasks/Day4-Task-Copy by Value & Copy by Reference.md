# Copy by Value & Copy by Reference

## Primitive Data types

Primitive Data types are data that are copied by **value**. There are 5 data types that are copied by value in JavaScript. They are,

- Number
- String
- Boolean
- undefined
- null

When we assign a primitive value to a variable, that variable actually holds the **value** itself. 

### Copy by value

```jsx
let x = 7; // Here variable "x" holds the value of 7
let y = x; // Here variable "y" holds the value of x which is 7
console.log(x, y); // Outputs 7 7
x = 10; // This changes the value stored in "x" variable only
console.log(x, y); // Outputs 10 7
```

Here changing the value of x didn't affect the value of y variable. These are called **Copy by Value.**

## Composite Data types

Composite data types are data that are not copied by value instead copied by **reference**. There are 3 data types that are copied by reference in JavaScript. They are,

- Array
- Object
- Function

When we assign a composite value to a variable, that variable holds the **memory address of the value** rather than the value itself.

### Copy by reference

```jsx
let arr1 = [1,2,3,4,5]; // Assigning Composite Data (Array) to a variable "arr1"
let arr2 = arr1; // Assigning arr1 to arr2 variable
arr1[0] = 77; // Changing the first value of arr1 variable
console.log(arr1); // Outputs [77, 2, 3, 4, 5]
console.log(arr2); // Outputs [77, 2, 3, 4, 5]
```

Notice that we only changed the value of `arr1` variable but changes affected both `arr1` and `arr2` variable. This is because `arr1` does not hold the value instead it holds the memory address of that value thereby `arr2` also holds the same memory address. Therefore, changing the value of one variable will affect another.