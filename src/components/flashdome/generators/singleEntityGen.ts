// this is a simple way to debug the shape
// it simply puts a single entity at the center of the plot, so that you can manipulate it as a single item without 

const fn = "singleEntityGen"
log(fn)


import { GeneratorBase } from "./generatorBase";

export default class singleEntityGen extends GeneratorBase {
        
        constructor(_settings:any){
            log(fn + ".constructor 1")
            super(_settings);
            log(fn + ".constructor 2 this.settings: ", this.settings);
        }
}