
/// Fibonacci Generator - UNFINISHED do not use yet
//TODO - right now x is increasing by very little amounts and z is always 0


import * as tileType from "../tiles/index"
import { Generator } from "./generator";
import { DCLUtils } from "../../utils/dclUtils"

const fn = "FibonacciGenerator"
//log(fn)

// Generator Settings
let goldenRatio = (1/1.618033989)
let S = {
    G: goldenRatio,                 // Golden Ration 
    GA: 360 - 360*goldenRatio,      // Golder Angle in degrees (needs to be assigned later as it requires G)     
    radius: 2,                      // initial radius in m
    rgrowth: 1.005,                 // factor by which the radius will grow with each iteration
    maxTiles: 30                    // Nr of iterations = Nr of Tiles that will be attached            
};


export default class FibonacciGen extends Generator {
 
    constructor(args: any) {
        super(args);
        this.name = "FibonacciGen";
        log(fn + ".constructor S: ", S) // verifying I can read the settings
    }

    generateCurve(tileObj:tileType.Tile) {
        log(fn + ".generateCurve with tileObj: ", tileObj) 
        let rot = 0;    // the angle that the tile should be offset by. it is increased by S.GA every iteration
        let curN = S.maxTiles
        let rad = S.radius
        let x, y, z, percentage;
        let t:tileType.Tile;
        let gradientRY = this.settings.dclColors.gradients.redToYellow
        let gradientRP = this.settings.dclColors.gradients.purpleToRed


        //for (let i = curN; i > 0 ;i-- ) {
        while (curN > 0) {
            curN--;

            // increase rotation making sure it's in the 0-360 angle
            rot += S.GA
            rot -= (rot/360)*360
            //log("\n" + curN + " - rot: " + rot);

            //set the new radius
            rad *= S.rgrowth

            //calculate the new x and z positions
            x = Math.cos(rot*Math.PI/180)*rad
            z = Math.sin(rot*Math.PI/180)*rad
            y = 0.1                                //TODO - first do flat on the floor, then take care of elevation and tile rotation
            log("\n" + curN + " - rot: " + rot + " - x: " + x + " - z: " + z);

            // now we are ready to create the tile and position it
            t = new tileObj();   // Works even if Typescript complains :) yay!

            t.getComponent(Transform).position.set(x, y, z)

            // color it as a percentage of the distance from the end so that you know what you are looking at
            percentage = (curN/S.maxTiles);
            t.getComponent(Material).albedoColor = Color3.Lerp( Color3.FromHexString(gradientRY[0]), Color3.FromHexString(gradientRY[1]), percentage);
            
            // set the dome as parent
            t.setParent(this.dome);

        }
        console.log("this.dome: ", this.dome); // trace to see if it has all the childred

    }    
    
}    