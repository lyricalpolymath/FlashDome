// this is a simple way to debug the shape
// it simply puts a single entity at the center of the plot, so that you can manipulate it as a single item without 

// exporting the Tile Class as default allows to import it like this 
// and solves problems that the object could not be referenced
// https://stackoverflow.com/questions/46558215/how-to-resolve-error-ts2351-cannot-use-new-with-an-expression-whose-type-la/46558897
//import Tile from "../tiles/tile";
import * as tileType from "../tiles/index"
import { Generator } from "./generator";
import { DCLUtils } from "../../utils/dclUtils"

const fn = "SingleEntityGen"
//log(fn)


export default class SingleEntityGen extends Generator {
        
        
        constructor(args: any){
            log(fn + ".constructor")
            super(args);
            this.name = "SingleEntityGen";
            //log(fn + ".constructor 2 this.settings: ", this.settings);
        }

        generateCurve(tileObj:tileType.Tile) {
            log(fn + ".generateCurve with tileObj: ", tileObj) 
            log(fn + ".generateCurve with this.tileType: ", this.tileType) 
            
            // set it at the center of the parcels
            const pos = DCLUtils.getParcelCenter(this.settings.parcel.w, this.settings.parcel.h);
            //log(fn + ".generateCurve position from DCLUtils.getParcelCenter(): ", pos)

            // 1 - Create the tile(s)
            this.tileType = tileObj;
            let t1:tileType.Tile = new this.tileType();   // Works even if Typescript complains :) yay!
            
            // add it as a children of dome
            t1.setParent(this.dome);
            log(fn + ".generateCurve added tile as a children of dome - verifying dome.children: ", this.dome.children)  

            // modify it's properties
            t1.getComponent(Transform).position = pos;
            t1.getComponent(Material).albedoColor = Color3.Red()

            // set a sample behavior - simply moves on click
            t1.addComponent(
                new OnClick(e => {
                    log("Tile clicked e: ", e);
                    log("Tile clicked Vector3: ", Vector3);
                    log("Tile clicked Object.keys(Vector3): ", Object.keys(Vector3));
                    log("Tile clicked Object.keys(position): ", Object.keys(t1.getComponent(Transform).position));
                    log("Tile clicked position.hasOwnProperty('add')): ", t1.getComponent(Transform).position.hasOwnProperty('add'));
                    log("Tile clicked position.hasOwnProperty('addInPlace')): ", t1.getComponent(Transform).position.hasOwnProperty('addInPlace'));
                    
                    //tile.getComponent(Transform).position.set(1,2,1)                      // position set works
                    //tile.getComponent(Transform).position.add(new Vector3(1,0, 1))        // position .add doesn't
                    t1.getComponent(Transform).position.addInPlace(new Vector3(1,0, 1))   // addInPlace works too

                })
            )
            
        }

}