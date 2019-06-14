// this is a simple way to debug the shape
// it simply puts a single entity at the center of the plot, so that you can manipulate it as a single item without 

const fn = "SingleEntityGen"
log(fn)


import { GeneratorBase } from "./generatorBase";

export default class SingleEntityGen extends GeneratorBase {
        
        constructor(_settings:any){
            log(fn + ".constructor 1")
            super(_settings);
            this.name = "SingleEntityGen";
            //log(fn + ".constructor 2 this.settings: ", this.settings);
        }
}