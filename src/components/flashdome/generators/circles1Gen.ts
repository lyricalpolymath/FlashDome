

import * as tileType from "../tiles/index"
import { Generator } from "./generator";
import { DCLUtils } from "../../utils/dclUtils"
//import log from "decentraland"

const fn = "Circles1Gen"
//log(fn)

// Generator Settings as a simple editable object
let S = {
    radius: 2,                      // initial radius in m
    tileDistance: 0.5,              // compactness of tiles (< 1 tiles overlap, >1 tiles are separated by space )
    circlesDistance: -1,            // compactness of each circle of tiles in m ( < 0 = overlap the tiles)
    domeRadiusMax: 8,               // maximum Radius (diameter = 2*radius) of the dome
    //circles: 3,                     // number of concentric circles

    heightMax: 15,                  // heighest point of the dome
    heightMin: 3,                   // lowest point of the dome

    tileScaleMin: 0.2,              // TODO
    tileScaleMax: 0.5,              // TODO

    // used by Fibo
    //G: goldenRatio,                 // Golden Ration 
    //GA: 360 - 360*goldenRatio,      // Golder Angle in degrees (needs to be assigned later as it requires G)
    //rgrowth: 1.005,                 // factor by which the radius will grow with each iteration
    //maxTiles: 30                    // Nr of iterations = Nr of Tiles that will be attached            
};

export default class Circles1Gen extends Generator {
        
        constructor(args: any){
            super(args);
            this.name = fn;
            log(fn + ".constructor")
        }


        generateCurve(tileObj:tileType.Tile) {
            this.tileType = tileObj;
            log(fn + ".generateCurve with tileObj: ", tileObj)

            // I need an instance of a tile to get it's size
            //TODO maybe delete this tile now that you don't need it anymore 
            // 'delete' cannot be called on an identifier in strict mode.ts(1102) The operand of a delete operator must be a property reference.
            let t0 = new tileObj();
            let tileSize = t0.size
            log(fn + ".generateCurve tileSize: ", tileSize)
            
            //V1 - set the number of circles vs setting domeRadius and diving by the width and distance
            //let circles = S.circles                       // number of concentric circles V1
            let circles = S.domeRadiusMax / (tileSize.width + S.circlesDistance)
            log(fn + ".generateCurve circles in dome :" + circles)

            let radius = S.radius || this.settings.radius // starting radius of the circle in m
            let startRadius = radius;
            let center = DCLUtils.getParcelCenter();
            let angleInc, circleH;

        
            //loop through the circles
            for (let c=0; c< circles; c++) {
                

                // TODO use the Angle class https://github.com/decentraland/ecs-reference/blob/master/docs-latest/decentraland-ecs.angle.md
                //Angle.FromDegrees(degreesHere).radians()
                //Angle.FromRadians(radiansHere).degrees()

                // finding the angle increment that will put each tile side by side without spacing between them nor overlap
                // this works for round tiles as I'm assuming that the distance between the center of 2 tiles is tileSize.width
                // it might not work for other tiles sizes, but it's a workable approximation
                // this distance on the circle, creates an isosceles triangle because two sides are the radius, 
                // and the angle between them can be solved with the cosine formula https://en.wikipedia.org/wiki/Law_of_cosines 
                // solving for the angle alpha as here https://math.stackexchange.com/questions/185829/how-do-you-find-an-angle-between-two-points-on-the-edge-of-a-circle
                let distance = tileSize.width + (tileSize.width * (S.tileDistance/2) )
                let distance2 = Math.pow(distance, 2)
                radius = startRadius + ((tileSize.width + S.circlesDistance) * c)     // adapt the radius to the given circle
                let r2 = Math.pow(2*radius, 2)            
                angleInc = Math.acos( (r2 - distance2) / r2 )            // the first angleInc is ideal but we want an int number of tiles in a circle, not a float
                let tilesPerCircle = Math.ceil((2*Math.PI)/angleInc)     // round to a full number of tile per circle
                angleInc = (2*Math.PI)/tilesPerCircle;                   // now find the angleInc to rounded number of dots per circle
                log("\n\n\n"+ fn + ".generateCurve Circle: " + c + " with Radius: " + radius + " - tile distance: " + distance)
                log(fn + ".generateCurve Circle: " + c + "  - angleInc 1: " + angleInc + " -  tilesPerCircle: " + tilesPerCircle)

                // circle height TODO FINISH and inverse the heights
                let circlePercentage = c / circles
                //let heightRange = (S.heightMax - S.heightMin)
                //circleH = ((heightRange / circles) * c) + S.heightMin
                circleH = 15

                // circle color - gradient from inner circle to bottom circle
                const gradient = this.settings.dclColors.gradients.redToYellow
                let circleColor = Color3.Lerp( Color3.FromHexString(gradient[0]), Color3.FromHexString(gradient[1]), circlePercentage);

                // assign a commong material to all tiles in a circle so that you don't exceed the limits
                let circleMaterial = new Material();
                circleMaterial.albedoColor = circleColor

                // loop through all the angles for this circle and position the tiles
                var a = 0
                var count = 1
                //while (a < 2*Math.PI) {       /// this works to clearly separate the angles
                 while (count <= tilesPerCircle) {   
                    
                    //log ("\n\n" + fn + "generateCurve a: " + a)
                    let x = (Math.cos(a) * radius) // + center.x  // offset to center not needed because I moved dome
                    let z = (Math.sin(a) * radius) // + center.z
                    let y = circleH                // 10                           
                    
                    let countStr = "tile_"+count.toString()
                    let t = new tileObj(countStr); //BB << maybe this is the one that is generating always the same?
                    //let t = new this.tileType(countStr);
                    
                    let tt = t.getComponent(Transform)
                    tt.position = new Vector3(x,y,z)

                    // the target position is not the center of the parcel only because every tile is a children of the dome Entity
                    // that has been moved to the center. TODO - find a universal way to do localToGlobal and GlobalToLocal
                    let targetPos = new Vector3(0,0,0)   // DCLUtils.getParcelCenter()
                    
                    // face the lower side to the target (center of the scene)
                    // Interweaver solution - if you only use lookAt it will always point the main forward vector to the target (the side of the cylinder or tile)
                    // in order to point the lower face of the tile, you need to also rotate the main face (in this case 90 degrees around either the X axis)
                    // but you need to do it after the lookAt transformation AND ADDING to it...not substituting it
                    // if you use rotation.setEuler it won't work because as Interweaver tought me
                    //  `setEuler` and `lookAt` are both 'overwrite' functions that ignore whatever's in there already.
                    tt.lookAt( targetPos, Vector3.Up());
                    tt.rotation = tt.rotation.multiply(Quaternion.Euler(-90, 0, 0));

                    
                    //log(fn + ".generateCurve - this.settings: ", this.settings)
                    // //this.settings.dclColors.gradients.purpleToRed;
                    // let percentage = (a/2*Math.PI) //(a / angles)
                    //t.getComponent(Material).albedoColor = Color3.Lerp( Color3.FromHexString(gradient[0]), Color3.FromHexString(gradient[1]), percentage);
                    //t.getComponent(Material).albedoColor = circleColor // Color3.FromHexString( this.settings.dclColors.red)
                    // to save space > otherwise I get "Unloading scene at 0,0 due to exceeded limits" >>  https://docs.decentraland.org/development-guide/materials/#reuse-materials
                    t.addComponent(circleMaterial) 

                    // useful for debugging - click on a tile to move it and see if there are others undeneath it
                    t.addComponent(
                        new OnClick(e => {
                            var ent = this.dome.children[e.entityId]
                            log("Tile clicked entity name: " + ent.name + " - position: ", ent.getComponent(Transform).position );
                            //console.log("Tile clicked e: ", e);
                            t.getComponent(Transform).position.addInPlace(new Vector3(1,0, 1)) 
                        })
                    )
                    

                    // set it to a child of the dome
                    t.setParent(this.dome);
                    //engine.addEntity(t); // this automatically done by the new tileObj()

                    // done - increment angle for the next round and tile
                    a += angleInc 
                    //log(fn + ".generateCurve angle:" + a +" - x: " + x + " - z: " + z );
                    
                    count++
                }
            
            }
            log(fn + ".generateCurve - DONE GENERATING CURVE this.dome: ", this.dome);
            //debugger
            
        }


        /* V1 incomplete
        generateCurve(tileObj:tileType.Tile) {
            this.tileType = tileObj;
            log(fn + ".generateCurve with tileObj: ", tileObj)

            let circles = S.circles                       // number of concentric circles
            let radius = S.radius || this.settings.radius // starting radius of the circle in m
            let center = DCLUtils.getParcelCenter();
            let angles, angle, x,y,z;
            let t:tileType.Tile;

            // I need an instance of a tile to get it's size
            t = new tileObj();
            let tileSize = t.size
            log(fn + ".generateCurve tileSize: ", tileSize)
            //TODO maybe delete this tile now that you don't need it anymore 
            // 'delete' cannot be called on an identifier in strict mode.ts(1102) The operand of a delete operator must be a property reference.

            //loop through the circles
            for (let c=1; c<= circles; c++) {

                //divide the circle in N angles based on compactness
                //Achtung: this works for round tiles whose width == heigt - TODO rethink for non symmetric tiles
                angles = (360 / tileSize.width) * S.tileDistance;
                log(fn + ".generateCurve Circle: " + c + "  - num angles: " + angles)

                // loop through all the angles for this circle and position the tiles
                for (let a = 0; a <= angles; a++) {
                    //TODO - offset it around the center of the parcel
                    x = (Math.cos(angle) * radius) + center.x
                    z = (Math.sin(angle) * radius) + center.z
                    y = 0.1                           
                    debugger
                    t = new tileObj();
                    t.getComponent(Transform).position.set(x,y,z)

                    //t.getComponent(Material).albedoColor = Color3.Lerp( Color3.FromHexString(gradientRY[0]), Color3.FromHexString(gradientRY[1]), percentage);
                    //t.getComponent(Material).albedoColor = Color3.FromHexString( this.settings.dclColors.red)

                    // set it to a child of the dome
                    t.setParent(this.dome);
                    //engine.addEntity(t); // this automatically done by the new tileObj()

                    // done - increment angle for the next round and tile
                    a += angles 
                    log(fn + ".generateCurve angle:" + a +" - x: " + x + " - z: " + z );
                }
            
            }
            log(fn + ".generateCurve - DONE GENERATING CURVE");
            
        }
        */
}            