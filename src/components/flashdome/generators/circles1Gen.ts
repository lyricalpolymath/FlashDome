
//TODO clean all the algorithms and convert to a geodesic dome rather than hacking together all the positions of the tiles with the double for loop

import * as tileType from "../tiles/index"
import { Generator } from "./generator";
import { DCLUtils } from "../../utils/dclUtils"
import { TileGroup } from "../customCoponents"
import { default as Groups} from "../../utils/EntityGroups"
import * as systems from "../systems/index";

const fn = "Circles1Gen"
//log(fn)

// Generator Settings as a simple editable object
let S = {
    radius: 2,                      // initial radius in m
    tileDistance: 0.5,              // compactness of tiles (< 1 tiles overlap, >1 tiles are separated by space )
    circlesDistance: -1,            // compactness of each circle of tiles in m ( < 0 = overlap the tiles)
    domeRadiusMax: 16,               // maximum Radius (diameter = 2*radius) of the dome
    //circles: 3,                     // number of concentric circles

    heightMax: 15,                  // heighest point of the dome
    heightMin: 3,                   // lowest point of the dome
    heightOffset: -5,               // horrible hack to lower the whole dome - TODO change the height algorithm
    lookAtCenter: new Vector3 (0,-2,0),    // all tiles are childs of the dome that is moved at the center...this is for smoothing the dome curve so that tiles look below the ground

    // System parameters
    rotSpeedDome: 5,                // speed of rotation of the whole dome
    rotSpeedTile: 50               // speed of rotation of each single tile


    tileScaleMin: 0.2,              // TODO
    tileScaleMax: 0.5,              // TODO

    // used by Fibo
    //G: goldenRatio,                 // Golden Ration 
    //GA: 360 - 360*goldenRatio,      // Golder Angle in degrees (needs to be assigned later as it requires G)
    //rgrowth: 1.005,                 // factor by which the radius will grow with each iteration
    //maxTiles: 30                    // Nr of iterations = Nr of Tiles that will be attached            
};

export default class Circles1Gen extends Generator {
        
        public circles: number         

        constructor(args: any){
            super(args);
            this.name = fn;
            log(fn + ".constructor")
        }


        public generateCurve(tileObj:tileType.Tile) {
            this.tileType = tileObj;
            log(fn + ".generateCurve with tileObj: ", tileObj)

            // I need an instance of a tile to get it's size
            // but immediateley delete it since you don't need it anymore 
            let t0 = new tileObj();
            let tileSize = t0.size
            engine.removeEntity (t0)
            log(fn + ".generateCurve tileSize: ", tileSize)
            
            //V1 - set the number of circles vs setting domeRadius and diving by the width and distance
            //let circles = S.circles                       // number of concentric circles V1
            let circles = S.domeRadiusMax / (tileSize.width + S.circlesDistance)
            this.circles = circles;
            log(fn + ".generateCurve circles in dome :" + circles)

            let radius = S.radius || this.settings.radius // starting radius of the circle in m
            let startRadius = radius;
            let center = DCLUtils.getParcelCenter();
            let angleInc, circleH;
            let lastTile  // horrible hack to get the last children's height

        
            //loop through the circles
            for (let c=0; c< circles; c++) {
                
                ////////////////////////////    TILE POSITIONS

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

                // circle height TODO FINISH and clean the algorithm (maybe even changing x and z of a sphere rather than calculating circles and heights)
                //let heightRange = (S.heightMax - S.heightMin)           // 15-3 = 12
                //circleH = 15                                          // V1 - fixed height
                //circleH = S.heightMax - ((heightRange / circles) * c) // V2 - this creates a linear height variation - not right
                //circleH = Math.sqrt( Math.pow(S.domeRadiusMax + S.heightMin, 2) - Math.pow(radius, 2) ) - S.heightMin // V3   if you put -8 positions it to zero >> make it dependent on C
                circleH = Math.sqrt( Math.pow(S.domeRadiusMax + S.heightMin, 2) - Math.pow(radius, 2) ) + S.heightOffset  //V4 works with a hack
                

                ////////////////////////////   MATERIAL 

                // unfinished material exploration
                // circle color - gradient from inner circle to bottom circle
                const gradient = this.settings.dclColors.gradients.redToYellow
                let circlePercentage = c / circles
                let circleColor = Color3.Lerp( Color3.FromHexString(gradient[0]), Color3.FromHexString(gradient[1]), circlePercentage);
                //let circleColor = Color3.FromHexString(this.settings.dclColors.red)
                log(fn + ".generateCurve Circle: " + c + "/" + circles + " = circlePercentage: " + circlePercentage + " - circleColor: " + circleColor)

                // assign a commong material to all tiles in a circle so that you don't exceed the limits
                let circleMaterial = new Material();
                circleMaterial.albedoColor = circleColor
                circleMaterial.metallic = 1;
                circleMaterial.ambientColor = Color3.FromHexString( this.settings.dclColors.yellowSun )
                //circleMaterial.directIntensity = 1 //default 1
                //circleMaterial.disableLighting = true;
                circleMaterial.environmentIntensity = 0.5

                circleMaterial.emissiveColor = Color3.FromHexString( this.settings.dclColors.yellowSun )    // not very emissive
                circleMaterial.emissiveIntensity = 0.1                                                      // not very emissive
                //circleMaterial.emissiveTexture = new Texture("materials/dcl_logo.svg")  //doesn´t work
                //circleMaterial.alpha = 0.5;
                //const logoTexture = new Texture("materials/dcl_logo.svg")
                //circleMaterial.albedoTexture = logoTexture
                


                // loop through all the angles for this circle and position the tiles
                var a = 0
                var count = 1
                //while (a < 2*Math.PI) {       /// this works to clearly separate the angles
                 while (count <= tilesPerCircle) {   
                    
                    //log ("\n\n" + fn + "generateCurve a: " + a)
                    let x = (Math.cos(a) * radius) // + center.x  // offset to center not needed because I moved dome
                    let z = (Math.sin(a) * radius) // + center.z
                    let y = circleH                // all tiles inside of a circle will have the same height                           
                    
                    let countStr = "tile_c"+ c + "_" +count.toString()
                    let t = new tileObj(countStr); //BB << maybe this is the one that is generating always the same?
                    //let t = new this.tileType(countStr);
                    
                    let tt = t.getComponent(Transform)
                    tt.position = new Vector3(x,y,z)

                    // the target position is not the center of the parcel only because every tile is a children of the dome Entity
                    // that has been moved to the center. TODO - find a universal way to do localToGlobal and GlobalToLocal
                    let targetPos = S.lookAtCenter || new Vector3(0,0,0)   // DCLUtils.getParcelCenter()
                    
                    // face the lower side to the target (center of the scene)
                    // Interweaver solution - if you only use lookAt it will always point the main forward vector to the target (the side of the cylinder or tile)
                    // in order to point the lower face of the tile, you need to also rotate the main face (in this case 90 degrees around either the X axis)
                    // but you need to do it after the lookAt transformation AND ADDING to it...not substituting it
                    // if you use rotation.setEuler it won't work because as Interweaver tought me
                    //  `setEuler` and `lookAt` are both 'overwrite' functions that ignore whatever's in there already.
                    tt.lookAt( targetPos, Vector3.Up());
                    tt.rotation = tt.rotation.multiply(Quaternion.Euler(90, 0, 0));

                    // assign one unique material per circle in order to save space > otherwise I get "Unloading scene at 0,0 due to exceeded limits" >>  https://docs.decentraland.org/development-guide/materials/#reuse-materials
                    t.addComponent(circleMaterial) 

                    // add customComponent to group them by circle
                    t.addComponent(new TileGroup(c, "circle_"+c, circleMaterial.albedoColor) )

                    /* useful for debugging - click on a tile to move it and see if there are others undeneath it
                    t.addComponent(
                        new OnClick(e => {
                            var ent = this.dome.children[e.entityId]
                            log("Tile clicked entity name: " + ent.name + " - position: ", ent.getComponent(Transform).position );
                            //console.log("Tile clicked e: ", e);
                            t.getComponent(Transform).position.addInPlace(new Vector3(1,0, 1)) 
                        })
                    )
                    */
                    
                    // set it to a child of the dome
                    t.setParent(this.dome);
                    //engine.addEntity(t); // this automatically done by the new tileObj()

                    // done - increment angle for the next round and tile
                    a += angleInc 
                    //log(fn + ".generateCurve angle:" + a +" - x: " + x + " - z: " + z );
                    
                    count++
                }

                // finished creating one of the circles - add these tiles to a group
                // I need a custom dynamic group class because the current methods don't allow me to create a group for components whose tileGroup.groupN == 0 (or 1, or the circleNumber)
                // getComponentGroup https://github.com/decentraland/ecs-reference/blob/master/docs-latest/decentraland-ecs.engine.getcomponentgroup.md
                // getEntitiesWithComponent //https://github.com/decentraland/ecs-reference/blob/master/docs-latest/decentraland-ecs.engine.getentitieswithcomponent.md
                //this.groups["circle_" + c] = engine.getEntitiesWithComponent("TileGroup.groupN") 
                let groupName = "group"+c
                this.groups[groupName] = Groups.createGroupWithComponentsAndCondition("tileGroup", "groupN", "=="+c, groupName )
            
            }
            // done creating all tiles, create a group with ALL tiles
            this.groups["allTiles"] = engine.getComponentGroup(TileGroup);

            log(fn + ".generateCurve - DONE GENERATING CURVE this.dome: ", this.dome.children);
            log(fn + ".generateCurve this.groups: ", this.groups)
            this.addSystems()
            
        }


        //TODO find a way to do this dynamically and activate or disable certain systems through the settings
        public addSystems() {
            log(fn + ".addSystems params rotSpeedDome: " + S.rotSpeedDome + " \t - rotSpeedTile: " + S.rotSpeedTile)
            
            // rotate the whole dome super slow S.rotSpeedDome
            engine.addSystem ( new systems.GroupRotator( this.dome , true, S.rotSpeedDome , Vector3.Up()) )

            /* experiment rotate each circle in different directions
            let dir:boolean = false
            for (let c = 0; c < this.circles; c++ ) {
                let g = "group"+c       //use the group Name rather than the group object     //this.groups["group"+c];
                dir = !dir              //at each circle rotate in a different direction
                let priority = 1 * c;
                engine.addSystem ( new systems.GroupRotator( g, dir, S.rotSpeedTile, new Vector3(1,0,1)),  ) //Vector3.Forward() ) ) // this works to flip all tiles  
            }
            //*/
            
            // tests
            //engine.addSystem ( new systems.GroupRotator( this.groups["allTiles"], false ) ) // this works to flip all tiles
            //engine.addSystem ( new systems.GroupRotator("group0", true) )                   //  this works to flip a single circle
            //engine.addSystem ( new systems.GroupRotator("group12", false, S.rotSpeedTile, Vector3.Forward()) )
            //engine.addSystem ( new systems.GroupRotator("group13", true, S.rotSpeedTile, Vector3.Forward()) )
            //engine.addSystem ( new systems.GroupRotator("group14", true, S.rotSpeedTile, Vector3.Forward()) )
            //engine.addSystem ( new systems.GroupRotator("group15", false, 150, Vector3.Forward() )//new Vector3(1,0,1)) )
            
            //*/
        }


}            