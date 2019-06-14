// index that exports all available generators in one single convenient file import
// syntax ref https://stackoverflow.com/questions/40702842/how-to-import-all-modules-from-a-directory-in-typescript

const fn = "singleEntityGen"
log(fn)

import { singleEntityGen } from "./singleEntityGen" // do I need to export? possibly not
export { default as singleEntityGen } from "./singleEntityGen";

