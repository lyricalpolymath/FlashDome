// this is a simple way to debug the shape
// it simply puts a single entity at the center of the plot, so that you can manipulate it as a single item without 

// exporting the Tile Class as default allows to import it like this 
// and solves problems that the object could not be referenced
// https://stackoverflow.com/questions/46558215/how-to-resolve-error-ts2351-cannot-use-new-with-an-expression-whose-type-la/46558897
//import Tile from "../tiles/tile";
import * as tileType from "../tiles/index"

const fn = "SingleEntityGen"
log(fn)


import { Generator } from "./generator";

export default class SingleEntityGen extends Generator {
        
        constructor(_settings:any){
            log(fn + ".constructor")
            super(_settings);
            this.name = "SingleEntityGen";
            //log(fn + ".constructor 2 this.settings: ", this.settings);
        }

        generateCurve(tileObj:tileType.Tile) {
            log(fn + ".generateCurve with tileObj: ", tileObj) 
            log(fn + ".generateCurve with this.tileType: ", this.tileType) 
            
            //var t = new tileObj(); // can't create // Cannot use 'new' with an expression whose type lacks a call or construct signature.

            //var t = new this.tileType() // Cannot use 'new' with an expression whose type lacks a call or construct signature.

        }
}