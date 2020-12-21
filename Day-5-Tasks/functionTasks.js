// Print odd numbers in an array
const arr = [1, 2, 3, 4, 5, 6, 7];

const odd = (arr) => {
    const oddArr = arr.filter((elm) => elm % 2 !== 0);
    console.log("Odd Array =>", oddArr);
};

odd(arr);

// Convert all the strings to title caps in a string array
const strArr = ["hello", "this", "is", "a", "test"];
const title = (arr) => {
    let titlecasedArr = arr.map((elm) => {
        return elm.replace(elm[0], elm[0].toUpperCase());
    });
    console.log("Title Cased Array =>", titlecasedArr);
};
title(strArr);

// Print sum of all numbers
(function (arr) {
    const sum = arr.reduce((prevSum, item) => prevSum + item);
    console.log("Sum of all element =>", sum);
})(arr);

// Return all the prime numbers in an array
const checkPrime = (num) => {
    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return num > 1;
};

(function (arr) {
    const primeArr = arr.filter((item) => checkPrime(item));
    console.log("Prime Number array =>", primeArr);
})(arr);

// Return all the palindromes in an array
const wordArr = ["malayalam", "random", "racecar", "tenet", "word", "hello"];
const checkPalindrome = (word) => {
    const revStr = [...word].reverse().join("");
    if (word === revStr) {
        return true;
    } else {
        return false;
    }
};

(function (arr) {
    const palindromeArr = arr.filter((word) => checkPalindrome(word));
    console.log("Palindrome Array =>", palindromeArr);
})(wordArr);

// Return median of two sorted arrays of same size
const findMedian = (arr1, arr2, arrlen) => {
    let i = 0;
    let j = 0;

    let m1 = -1;
    let m2 = -1;

    let count = 0;
    while (count < arrlen + 1) {
        count += 1;

        if (i === arrlen) {
            m1 = m2;
            m2 = arr2[0];
            break;
        } else if (j == arrlen) {
            m1 = m2;
            m2 = arr1[0];
            break;
        }
        if (arr1[i] <= arr2[j]) {
            m1 = m2;
            m2 = arr1[i];
            i += 1;
        } else {
            m1 = m2;
            m2 = arr2[j];
            j += 1;
        }
    }
    return (m1 + m2) / 2;
};
(function () {
    let arr1 = [1, 2, 3, 4, 5];
    let arr2 = [6, 7, 8, 9, 10];
    let arrlen = arr1.length;
    console.log("Median is ", findMedian(arr1, arr2, arrlen));
})();


//  Remove duplicates from an array
const arrWithDuplicates = [1, 2, 3, 2, 4, 4, 5, 1, 3];
const filterDuplicates = (arr) => {
    return [...new Set(arr)];
};
(function (arr) {
    console.log("Array with unique elements =>", filterDuplicates(arr));
})(arrWithDuplicates);

// Rotate an array by k times and return the rotated array
const arrayRotate = (arr, count) => {
    count -= arr.length * Math.floor(count / arr.length);
    arr.push.apply(arr, arr.splice(0, count));
    return arr;
};
(function (arr) {
    console.log("Array rotated 4 times =>", arrayRotate(arr, 4));
})(arr);
