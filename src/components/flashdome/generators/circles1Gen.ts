
/**
 * Template of the basic things you need to use for creating a generator 
 * 
 * - duplicate this file, 
 * - change the fn string and class name
 * - create the code you want inside of generateCurve
 * 
 * xx 1- add to /src/flashdome/generators/index.ts this
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

const fn = "Circles1Gen"
//log(fn)

// Generator Settings as a simple editable object
let S = {
    radius: 2,                      // initial radius in m
    circles: 1,                     // number of concentric circles
    tileDistance: 1                 // compactness of tiles (< 1 tiles overlap, >1 tiles are separated by space )

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

            let circles = S.circles                       // number of concentric circles
            let radius = S.radius || this.settings.radius // starting radius of the circle in m
            let center = DCLUtils.getParcelCenter();
            let angles, angle, angleInc;
            //let t:tileType.Tile;

            // I need an instance of a tile to get it's size
            let t0 = new tileObj();
            let tileSize = t0.size
            log(fn + ".generateCurve tileSize: ", tileSize)
            //TODO maybe delete this tile now that you don't need it anymore 
            // 'delete' cannot be called on an identifier in strict mode.ts(1102) The operand of a delete operator must be a property reference.

            //loop through the circles
            for (let c=1; c<= circles; c++) {
                // TODO use the Angle class https://github.com/decentraland/ecs-reference/blob/master/docs-latest/decentraland-ecs.angle.md
                //Angle.FromDegrees(degreesHere).radians()
                //Angle.FromRadians(radiansHere).degrees()

                // finding the angle increment that will put each tile side by side without spacing between them nor overlap
                // this works for round tiles as I'm assuming that the distance between the center of 2 tiles is tileSize.width
                // it might not work for other tiles sizes, but it's a workable approximation
                // this distance on the circle, creates an isosceles triangle because two sides are the radius, 
                // and the angle between them can be solved with the cosine formula https://en.wikipedia.org/wiki/Law_of_cosines 
                // solving for the angle alpha as here https://math.stackexchange.com/questions/185829/how-do-you-find-an-angle-between-two-points-on-the-edge-of-a-circle
                angleInc = Math.acos( (Math.pow(2*radius, 2)-Math.pow(tileSize.width, 2)) / Math.pow(2*radius, 2) )
                log("\n\n"+fn + ".generateCurve Circle: " + c + " with Radius: " + radius + " - these are the angles")
                log(fn + ".generateCurve Circle: " + c + "  - num angleInc 1: " + angleInc)

                // now that we know the angle increment, correct it by the factor in S.tiledistance
                // < 1 will compact and overla elements,  and >1 will distance the elements
                angleInc *= S.tileDistance;
                log(fn + ".generateCurve Circle: " + c + "  - num angleInc 2: " + angleInc)

                // with the desired angleDistance calculate how many angles or iterations there will be in this circle
                //angles = (360 / tileSize.width) * S.tileDistance; //old and wrong
                // angleInc is in radians (returned by Math.acos) - convert it to degrees or divide by 2PI
                //>>>>>>>>  ACHTUNG TODO: if this comes as a float it doesn't work because we need an INT number of tiles
                //angles = ( (2*Math.PI) / angleInc);
                //log(fn + ".generateCurve Circle: " + c + "  - num angles (rad): " + angles + "  - angles (deg): " + (360/(angleInc*(180/Math.PI))) );

                // loop through all the angles for this circle and position the tiles
                //for (let a = 0; a <= angles; a++) { // a++ is wrong as I need to increment by angleInc
                var a = 0
                var count = 0
                while (a < 2*Math.PI) {
                    
                    log ("\n\n" + fn + "generateCurve a: " + a)
                    let x = (Math.cos(a) * radius) // + center.x  // offset to center not needed because I moved dome
                    let z = (Math.sin(a) * radius) // + center.z
                    let y = 0.5;//1.2 *a//0.1                           
                    //debugger

                    let countStr = "tile_"+count.toString()
                    //var t = new tileObj(countStr); //BB << maybe this is the one that is generating always the same?
                    let t = new this.tileType(countStr);
                    //t.getComponent(Transform).position.set(x,y,z) //is putting everything in the same xyz
                    t.getComponent(Transform).position = new Vector3(x,y,z)
                    //debugger

                    //log(fn + ".generateCurve - this.settings: ", this.settings)
                    const gradient = this.settings.dclColors.gradients.purpleToRed;
                    let percentage = (a / angles)
                    t.getComponent(Material).albedoColor = Color3.Lerp( Color3.FromHexString(gradient[0]), Color3.FromHexString(gradient[1]), percentage);
                    //t.getComponent(Material).albedoColor = Color3.FromHexString( this.settings.dclColors.red)
                    //t.getComponent(Material).albedoColor = Color3.Red()

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
                    log(fn + ".generateCurve angle:" + a +" - x: " + x + " - z: " + z );
                    
                    count++
                    //debugger
                }
            
            }
            log(fn + ".generateCurve - DONE GENERATING CURVE this.dome: ", this.dome);
            debugger
            
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