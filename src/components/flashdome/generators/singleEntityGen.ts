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
        
        public tile:tileType.Tile
        
        constructor(args: any){
            super(args);
            this.name = "SingleEntityGen";
            log(fn + ".constructor")
            //log(fn + ".constructor 2 this.settings: ", this.settings);
        }

        generateCurve(tileObj:tileType.Tile) {
            this.tileType = tileObj;
            log(fn + ".generateCurve with tileObj: ", tileObj) 
            log(fn + ".generateCurve with this.tileType: ", this.tileType) 
            
            // 1 - Create the tile(s)
            let t1:tileType.Tile = new this.tileType();   // Works even if Typescript complains :) yay!
            this.tile = t1;

            // add it as a children of dome
            t1.setParent(this.dome);
            log(fn + ".generateCurve added tile as a children of dome - verifying dome.children: ", this.dome.children)  

            
            // POSITION - use default tile position
            //let pos = DCLUtils.getParcelCenter(this.settings.parcel.w, this.settings.parcel.h);   // center
            //let pos = new Vector3(0.5, 0, 0.5)                                                    // to visually measure it's size
            //log(fn + ".generateCurve position from DCLUtils.getParcelCenter(): ", pos)
            //t1.getComponent(Transform).position = pos;
            

            // MATERIAL
            t1.getComponent(Material).albedoColor = Color3.FromHexString(this.settings.dclColors.red)
            //let gradientRY = this.settings.dclColors.gradients.redToYellow  
            //let gradientRP = this.settings.dclColors.gradients.purpleToRed
            //t1.getComponent(Material).albedoColor = Color3.Lerp( Color3.FromHexString(gradientRY[0]), Color3.FromHexString(gradientRY[1]), 0.5);

            
            let clickCount = 0
            // set a sample behavior - simply moves on click
            t1.addComponent(
                new OnClick(e => {
                    //log("Tile clicked Size: ", t1.size)
                    this.clickHandler()
                    //tile.getComponent(Transform).position.set(1,2,1)                      // position set works
                    //tile.getComponent(Transform).position.add(new Vector3(1,0, 1))        // position .add doesn't
                    //t1.getComponent(Transform).position.addInPlace(new Vector3(1,0, 1))   // addInPlace works too
                    
                })
            )
            
        }

        // utility function to rotate trough different code settings by clicking on the tile
        // TODO convert into an iterator and have this.clickHandler.next()
        private clickCount = 0;
        public clickHandler() {
            log(fn + "clickHandler clickCount 1: " + this.clickCount);
            let c = this.clickCount 
            let t = this.tile;
            let tc;

            let gradientRY = this.settings.dclColors.gradients.redToYellow  
            let gradientRP = this.settings.dclColors.gradients.purpleToRed
            log("Color3.Yellow(): ", Color3.Yellow())
            log("Color3.FromHexString(gradientRY[0]): ", Color3.FromHexString(gradientRY[0]))
            
            // experiments - if else more compact
            let maxC = 6    //number of click experiments after which cycle through
            if (c == 0)      tc = Color3.FromHexString( this.settings.dclColors.orange );
            else if (c == 1) tc = Color3.FromHexString( this.settings.dclColors.red );
            else if (c == 2) tc = Color3.FromHexString( this.settings.dclColors.yellow );
            else if (c == 3) tc = Color3.FromHexString( this.settings.dclColors.yellowSun );
            else if (c == 4) tc = Color3.FromHexString( this.settings.dclColors.purple );
            else if (c == 5) tc = Color3.Lerp( Color3.FromHexString(gradientRY[0]), Color3.FromHexString(gradientRY[1]), 0.5) ;
            else if (c == 6) tc = Color3.Lerp( Color3.FromHexString(gradientRP[0]), Color3.FromHexString(gradientRP[1]), 0.5) ;

            // assign it at the end
            this.tile.getComponent(Material).albedoColor = tc

            // cycle through experiments
            this.clickCount = (c > maxC) ? 0 : (c+1)
            log(fn + "clickHandler clickCount2: " + this.clickCount);
        }

}