// this is the basic class that all generators should extend
// generators are the curves that change the overall shape of the dome

import { Tile } from "../tiles/tile";
import { domeSettings } from "../domeSettings"
import { DCLUtils } from "../../utils/dclUtils"
import * as systems from "../systems/index";

const fn = "Generator"
//log(fn)

//Abstract classes allow to force subclasses to implement a certain method
export abstract class Generator {
    
    public settings     :any;
    public name         :String;
    protected dome      :Entity;
    public tileType     :Tile;
    public groups       :any;

    /**
     * requires different arguments but I'm using the compact version to simplify adding them
     * read in the constructor the order of the parameters
     * @param args _settings:any, _domeEntity:Entity
     */

     constructor(args: any) {
        this.settings = args.settings || domeSettings
        this.dome = args.dome
        this.groups = new Array()
        log(fn + ".constructor this dome: ", this.dome);
     }

     /* UNSOLVED how to access the iterator ...args  in typescript so I turned it into an object
    constructor(...args: any ) {
        //let args = Array.values(_args)//arguments //Array.from(_args)
        this.settings = args[0] // settings 
        this.dome     = args[1]  // dome Entity
        //this.settings = args.next()
        //this.settings = args.next()
        debugger

        [this.settings, this.dome] = args
        log(fn + ".constructor")
        log(fn + ".constructor this dome: ", this.dome);
        
        //this.tileType = this.setTileType();
    }
    */


    //DEV simple function to verify which generator has been called
    public getName() { return this.name };


    // abstract methods must be implemented in derived classes - https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Classes.md#abstract-classes
    abstract generateCurve(tile:Tile): void;        
}