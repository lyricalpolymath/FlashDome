// this is the basic class that all generators should extend
// generators are the curves that change the overall shape of the dome

import { Tile } from "../tiles/tile";

const fn = "Generator"
log(fn)

//BBNOTE I've added the abstract idea to force subclasses to implement it
export abstract class Generator {
    
    public settings:any;
    public name:String;
    public tileType:Tile;

    constructor(settings:any = {} ) {
        this.settings = settings 
        log(fn + ".constructor")
        //this.tileType = this.setTileType();
    }

    //DEV simple function to verify which generator has been called
    public getName() { return this.name };


    /* sets the tile type either from the settings or by passing it as a variable
    private setTileType(){
        var tileTypes = this.settings.tileTypes
        var tt:any;
        switch (this.settings.tile) {
            case tileTypes.DOT:
                tt = tileTypes.DOT  // pass only the object not the instance of a new DotTile
                break;
            case tileTypes.PLANE:
                tt = tileTypes.PLANE
                break;
            default:
                tt = tileTypes.DOT 
        }
        //log(fn + ".setTileType this.tile: ", this.tile); 
        return tt
    }
    */


    abstract generateCurve(tile:Tile): void;        // must be implemented in derived classes - https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Classes.md#abstract-classes
}