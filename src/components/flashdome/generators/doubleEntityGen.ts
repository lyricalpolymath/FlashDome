
const fn = "DoubleEntityGen"
log(fn)


import { Generator } from "./generator"

export default class DoubleEntityGen extends Generator {

        public name:String;

        //constructor(_settings:any, _domeEntity:Entity){
        //constructor(...args: any[]){    // unsolved how to access the iterator withour Array.from
        constructor(args: any){
            log(fn + ".constructor 1")
            super(args);
            this.name = "DoubleEntityGen";
            //log(fn + ".constructor 2 this.settings: ", this.settings);
        }
}