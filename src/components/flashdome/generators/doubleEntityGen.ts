
const fn = "DoubleEntityGen"
//log(fn)


import { Generator } from "./generator"
import { DCLUtils } from "../../utils/dclUtils"


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

        generateCurve(tileObj:tileType.Tile) {
            log(fn + ".generateCurve with tileObj: ", tileObj) 

            // Create the tile(s)
            this.tileType = tileObj;

            let t1:tileType.Tile = new this.tileType();   // Works even if Typescript complains :) yay!
            t1.setParent(this.dome);
            t1.getComponent(Transform).position = new Vector3(1,1,1);
            t1.getComponent(Material).albedoColor = Color3.Green()

            // set a sample behavior - simply moves on click
            t1.addComponent(
                new OnClick(e => {
                    log("Tile clicked e: ", e);
                    log(fn + " - tile 1 clicked");
                    t1.getComponent(Transform).position.addInPlace(new Vector3(0,1,0))   // addInPlace works too
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

}