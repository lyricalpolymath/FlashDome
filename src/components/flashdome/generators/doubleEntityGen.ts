
const fn = "DoubleEntityGen"
log(fn)


import { GeneratorBase } from "./generatorBase";

export default class DoubleEntityGen extends GeneratorBase {

        public name:String;

        constructor(_settings:any){
            log(fn + ".constructor 1")
            super(_settings);
            this.name = "DoubleEntityGen";
            //log(fn + ".constructor 2 this.settings: ", this.settings);
        }
}