/**
 * Template of the basic things you need to use for creating a generator 
 * 
 * - duplicate this file, 
 * - change the fn string and class name
 * - create the code you want inside of generateCurve
 * 
 * - add to /src/flashdome/generators/index.ts this
 * export { default as TemplateGen }    from "./generator_template";  // change appropriate class name and file
 * 
 * - in /src/flashdome/domeSettings.ts add it to the generatorTypes enum
 * generatorTypes {  TEMPLATE = "Template"  }  //change with appropriate name
 * 
 * - remember to activate it in 
 * domeSettings.generator:  generatorTypes.TEMPLATE,
 * 
 * - in /src/flashdome/dome.ts setGeneratorFromSettings() add a case for this generator
 * case genTypes.TEMPLATE:
 *      this.generator = new generators.TemplateGen(args);      //change with appropriate names
 *      break; 
 */


import * as tileType from "../tiles/index"
import { Generator } from "./generator";
import { DCLUtils } from "../../utils/dclUtils"

const fn = "TemplateGen" //"Circles1Gen"
//log(fn)

// Generator Settings as a simple editable object
let S = {
    radius: 2,                      // initial radius in m 
    maxTiles: 30                    // Nr of iterations = Nr of Tiles that will be attached            
};

export default class TemplateGen extends Generator {
        
        constructor(args: any){
            super(args);
            this.name = fn;
            log(fn + ".constructor")
        }

        generateCurve(tileObj:tileType.Tile) {
            this.tileType = tileObj;
            log(fn + ".generateCurve with tileObj: ", tileObj)

            // parse the global settings to see if it has variables
            //let radius = this.settings.radius || S.radius  // precedence to the global settings
            let radius = S.radius || this.settings.radius  // predecence to local settings

            // instantiate the tile
            let t = new tileObj();

            // set it to a child of the dome
            t.setParent(this.dome)
        }
}            