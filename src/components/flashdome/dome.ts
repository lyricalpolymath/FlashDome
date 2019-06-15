const fn = "flashDome"
log(fn + " called")


import { domeSettings } from "domeSettings";
//import { singleEntityGen /*, simpleCircleGen*/ } from "./generators/"

//import "./generators/index";
import * as generators from "./generators/index";           // import all generators
import * as tileTypes from "./tiles/index";                 // import all tiles
//import { Tile } from "./tiles/tile";

//import { GeneratorBase } from "./generators/generatorBase"; // for typing the 
    
//log(fn + " imported generators: ", generators)                                   // {dclamd: 2}   why?
log(fn + " imported generators.keys: ", Object.keys(generators))                 //["Generator", "SingleEntityGen", "DoubleEntityGen", "dclamd", "context"]
//log(fn + " imported generators.singleEntityGen: ", generators.SingleEntityGen) //undefined > why?

//log(fn + " imported tileTypes: ", tileTypes)                                     //{dclamd: 2}   why?
//log(fn + " imported tileTypes.dclamd: ", tileTypes.dclamd)                       // 2        
log(fn + " imported tileTypes.keys: ", Object.keys(tileTypes))                   //["Tile", "DotTile", "PlaneTile", "dclamd", "context"]
//log(fn + " imported tileTypes.DotTile: ", tileTypes.DotTile)                   //undefined > why?



// Dome extends Entity so that it can have it´s own children 
export class FlashDome extends Entity {

    public settings = domeSettings;             // no need to go through the constructor
    public parcelCenter:Vector3;                // = this.getCenter();
    public generator:generators.Generator;      // holds the selected generator - set it in the domeSettings
    public tileObj:tileTypes.Tile;                 //

    //public eventManager = new EventManager()    // to signal it´s state changes
    //public tileGroup;
    
    constructor(){
        super();
        log(fn + ".constructor called this.settings: ", this.settings);
        
        //log(fn + ".constructor engine: ", Object.keys(engine));  // is engine global? yes ["eventManager", "systems", "entityLists", "addedSystems", "_entities", "_disposableComponents", "_componentGroups", "simpleSystems", "rootEntity"]
        this.parcelCenter = this.getParcelCenter()
        log(fn + ".constructor called this.center: ", this.parcelCenter);

        engine.addEntity(this); // add the dome as an entity

        this.settings.dome = this
        
        this.generateDome();
    }



///////////////////////////////////////  CREATE THE DOME

    private generateDome(){
        log(fn + ".generateDome");

        // 1 - choose dome shape generator (swappable) eg: single, simple circles fibonacci etc
        // get the selected generator from the settings > assigns it to this.generator
        this.setGeneratorFromSettings();  
        log(fn + ".generateDome this.generator: ", this.generator);
        log(fn + ".generateDome Chosen Generator: " + this.generator.name);


        // 2 - choose tile shape - eg dot (flat cilinder, cube, cone) etc
        this.tileObj = this.setTileType();
        //log(fn + ".generateDome1 - log - this.tileObj: ", this.tileObj);                    // it appears undefined in the log although it is not in the console
        //console.log(fn + ".generateDome2 - console.log - this.tileObj: ", this.tileObj)   // shows as a string the code in the function constructor
        //console.dir(fn + ".generateDome3 - console.dir - this.tileObj: ", this.tileObj)   // empty
        //var t1 = new this.tileObj(); // Works even if Typescript complains :) yay!


        // 3 - generate the dome with the given tyle 
        this.generator.generateCurve(this.tileObj);

        // TODO 4 - get returned that it's done, listen to an event?
        // TODO 5 - attach all systems and animations

    }

///////////////////////////////////////  UTITLITIES

    //TODO put this in a generic DCL utils, other objects will need to know their center
    public getParcelCenter(){
        //log(fn + ".getParcelCenter - this.parcelCenter1: ", this.parcelCenter);
        if (!this.parcelCenter) {
            //log(fn + ".getParcelCenter - generating ParcelCenter: ", this.parcelCenter);
            const parcelSize = 16                               //meters per parcel
            const cx = (this.settings.parcel.w/2) * parcelSize;
            const cz = (this.settings.parcel.h/2) * parcelSize;
            this.parcelCenter = new Vector3(cx,0,cz)            //<Vector3>{x: cx, y:0, z: cz}
        }
        log(fn + ".getParcelCenter - this.parcelCenter2: ", this.parcelCenter);
        return this.parcelCenter;
    }


    // sets the tile type either from the settings or by passing it as a variable
    private setTileType(){
        const tileTypesSetting = this.settings.tileTypes
        switch (this.settings.tile) {
            case tileTypesSetting.DOT:
                this.tileObj = tileTypes.DotTile  // pass only the object not the instance of a new DotTile
                break;
            case tileTypesSetting.PLANE:
                this.tileObj = tileTypes.PlaneTile
                break;
            default:
                this.tileObj = tileTypes.DotTile 
        }
        log(fn + ".setTileType this.tileObj: ", this.tileObj); 
        return this.tileObj
    }


    // helps retrieve the generator from the settings object (1,2,3,4)
    // better to get it from the settings so that if you change them you can relaunch the dome another time
    private setGeneratorFromSettings() {
        const genTypes = this.settings.generatorTypes

        // all parameters to pass to the generators
        let args = { settings: this.settings, dome: this}

        switch (this.settings.generator) {
            case genTypes.SINGLE:
                this.generator = new generators.SingleEntityGen(args);
                break;
                case genTypes.DOUBLE:
                this.generator = new generators.DoubleEntityGen(args);
                break;
            default:
                this.generator = new generators.SingleEntityGen(args);
        }
        //log(fn + ".setGeneratorFromSettings generators: ", generators); // useless holds only this object   {dclamd: 2}
        //log(fn + ".setGeneratorFromSettings this.generator: ", this.generator); 
        //log(fn + ".setGeneratorFromSettings - this.generator.settings: ", this.generator.settings); 
        //log(fn + ".setGeneratorFromSettings - this.generator.getName(): ", this.generator.getName());
    }



}