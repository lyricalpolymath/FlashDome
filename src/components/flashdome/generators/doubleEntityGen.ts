
const fn = "DoubleEntityGen"
log(fn)


import { Generator } from "./generator"

export default class DoubleEntityGen extends Generator {

        public name:String;

        constructor(_settings:any){
            log(fn + ".constructor 1")
            super(_settings);
            this.name = "DoubleEntityGen";
            //log(fn + ".constructor 2 this.settings: ", this.settings);
        }
}