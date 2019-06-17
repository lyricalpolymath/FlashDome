
const fn = "DoubleEntityGen"
//log(fn)


import { Generator } from "./generator"
import { DCLUtils } from "../../utils/dclUtils"


// Generator Settings as a simple editable object
let S = {
    maxTiles: 4
}    

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

        // V2 in a for loop
        generateCurve(tileObj:tileType.Tile) {
            log(fn + ".generateCurve with tileObj: ", tileObj) 
            // Create the tile(s)
            this.tileType = tileObj;
            
            var t=0 // important declare it outside of the scope otherwise it will be undefined
            for (t=0; t <= S.maxTiles; t++) {
                log(fn + ".generateCurve t: " + t);

                // create the tile
                let tile:tileType.Tile = new this.tileType(String("tile_"+t));   // Works even if Typescript complains :) yay!
                
                // change it's position
                let position = new Vector3(1,1, 1*t); // every tile put it 1m apart in the z axis


                tile.setParent(this.dome);
                tile.getComponent(Transform).position = position
                tile.getComponent(Material).albedoColor = Color3.Random()      // Green()

                // set a sample behavior - simply moves on click
                tile.addComponent(
                    new OnClick(e => {
                        log("Tile clicked e: ", e);
                        log(fn + " - tile clicked name: " + tile.name + " - z: " + tile.getComponent(Transform).position.z );
                        tile.getComponent(Transform).position.addInPlace(new Vector3(1,0,0))   
                    })
                )

            }
            debugger

            
        }



        /* V1 - ENTITIES GENERATED BY HAND
        generateCurve(tileObj:tileType.Tile) {
            log(fn + ".generateCurve with tileObj: ", tileObj) 

            // Create the tile(s)
            this.tileType = tileObj;

            let t:tileType.Tile = new this.tileType();   // Works even if Typescript complains :) yay!
            t.setParent(this.dome);
            t.getComponent(Transform).position = new Vector3(1,1,1);
            t.getComponent(Material).albedoColor = Color3.Green()

            // set a sample behavior - simply moves on click
            t.addComponent(
                new OnClick(e => {
                    log("Tile clicked e: ", e);
                    log(fn + " - tile 1 clicked");
                    t.getComponent(Transform).position.addInPlace(new Vector3(0,1,0))   // addInPlace works too
                })
            )

            /// second Tile
            let t2:tileType.Tile = new this.tileType();   // Works even if Typescript complains :) yay!
            t2.setParent(this.dome);
            t2.getComponent(Transform).position = new Vector3(2,1,2);
            t2.getComponent(Material).albedoColor = Color3.Blue()

            // set a sample behavior - simply moves on click
            t2.addComponent(
                new OnClick(e => {
                    log(fn + " - tile clicked e: " + e); //,e = undefined
                    log(fn + " - tile 1 clicked Object.Keys(e): ", Object.keys(e));
                    t2.getComponent(Transform).position.addInPlace(new Vector3(0,1,0))   // addInPlace works too
                })
            )
        }
        */

}