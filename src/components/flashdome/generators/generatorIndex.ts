// index that exports all available generators in one single convenient file import
// syntax ref https://stackoverflow.com/questions/40702842/how-to-import-all-modules-from-a-directory-in-typescript

const fn = "singleEntityGen"
log(fn)

// there is no need to import them first
export { default as SingleEntityGen } from "./singleEntityGen";
export { default as DoubleEntityGen } from "./doubleEntityGen";
