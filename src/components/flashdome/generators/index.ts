// index that exports all available generators in one single convenient file import
// syntax ref https://stackoverflow.com/questions/40702842/how-to-import-all-modules-from-a-directory-in-typescript

const fn = "generatorIndex"
//log(fn)

// for dev purposes - not very useful in the final product
export { Generator } from "./generator";
export { default as SingleEntityGen } from "./singleEntityGen";
export { default as DoubleEntityGen } from "./doubleEntityGen";

// the main one that is currently workign to generate a dome
export { default as Circles1Gen }    from "./circles1Gen"; 

// UNFINISHED - do not use yet
export { default as FibonacciGen }    from "./fibonacciGen"; 
