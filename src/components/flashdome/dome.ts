const fn = "flashDome"
log(fn + " called")


import { domeSettings } from "domeSettings";
//import { singleEntityGen /*, simpleCircleGen*/ } from "./generators/"
import * as generators from "./generators/generatorIndex";  // import all generators
log(fn + " imported generators: ", generators)
log(fn + " imported generators.keys: ", Object.keys(generators))
log(fn + " imported generators.singleEntityGen: ", generators.singleEntityGen) //


// Dome extends Entity so that it can have it´s own children 
export class FlashDome extends Entity {

    public settings = domeSettings;             // no need to go through the constructor
    public parcelCenter:Vector3;                // = this.getCenter();
    //public eventManager = new EventManager()    // to signal it´s state changes
    //public tileGroup;

    public generator;                           // testing multiple generators

    constructor(){
        super();
        log(fn + ".constructor called this.settings: ", this.settings);
        
        //log(fn + ".constructor engine: ", Object.keys(engine));  // is engine global? yes ["eventManager", "systems", "entityLists", "addedSystems", "_entities", "_disposableComponents", "_componentGroups", "simpleSystems", "rootEntity"]
        this.parcelCenter = this.getParcelCenter()
        log(fn + ".constructor called this.center: ", this.parcelCenter);

        engine.addEntity(this); // add the dome as an entity
        this.generateDome();
    }



///////////////////////////////////////  CREATE THE DOME

    private generateDome(){
        log(fn + ".generateDome");

        // WIP-START_FROM_HERE - choose dome shape generator (swappable)
            // single, simple circles fibonacci etc
        // get the selected generator from the settings
        this.getGeneratorFromSettings() ;    
        //log(fn + ".generateDome - generators.keys.context       : " + Object.keys(generators)) // singleEntityGen,dclamd,context
        log(fn + ".generateDome - this.generator: ", this.generator); 
        log(fn + ".generateDome - this.generator.settings: ", this.generator.settings); 
        //this.generato


        // TODO - choose tile shape
            // dot (flat cilinder)
            // cube
            // cone

        // TODO 3 - generate the dome with the given tyle 
            // questions - can it generate without importing the specific tile?
        

        // quick test - position 1 tile at the center
        // lesson learned Tyle object need to provide a shape and a transform as for example the cilinder needs to be scaled down
        //  possibly here in flashDome we simply have a new Tile(type), and every tile implements the spawnTile or does all the setup in their constructor
        var t1 = this.spawnTile(this.parcelCenter);
        //t1.getComponentOrNull(Transform).scale = new Vector3(0,2,0); 
        //log(fn + ".generateDome t1.getComponentOrNull(shape): ", t1.getComponentOrNull(shape));
        log(fn + ".generateDome t1: ", t1);

        

        // var tilesN = this.settings.tilesMax;
        // for (let i=0; i < tilesN; i++) {}

    }


    private spawnTile(pos:Vector3) {
        log(fn + ".spawnTile pos: ", pos);
        const tile = new Entity()                                             // create the entity
        tile.addComponent(new Transform({ position: pos, scale: new Vector3(1,0.01,1) }))  // add a transform to the entity

        // quick test to see duplicates... move this one
        tile.addComponent(
            new OnClick(e => {
                log("Tile clicked e: ", e);
                //log("Tile clicked this, " + this);      // [object Object] - not available in console
                //log("Tile clicked tile, ", tile);       // [object Object] - not available in console
                log("Tile clicked Object.keys(tile), ", Object.keys(tile));
                log("Tile clicked tile.name, ", tile.name);
                log("Tile clicked tile.getComponent(Transform), ", tile.getComponent(Transform));
                //this.getComponent(Transform).position.add(new Vector3(1,1,1)) //Error: Can not get component "engine.transform" from entity "Ei"
                //tile.getComponent(Transform).position.add(new Vector3(1,1,1)) //TypeError: tile.getComponent(...).position.add is not a function
                //tile.getComponent(Transform).position.set(1,1,1)
                //tile.getComponent(Transform).position = 
                tile.getComponent(Transform).position.addInPlace(new Vector3(1,0, 1)) // tile.getComponent(...).position.set is not a function
            })
        )


        var cilShape = new CylinderShape()
        cilShape.radiusTop =  1
        cilShape.arc =  180
        tile.addComponent(cilShape);                // add a shape to the entity
        
        tile.addComponent(new Material());          // add the material to color it
        tile.getComponent(Material).albedoColor = Color3.Blue();

        tile.setParent(this);                       // add to the list of childEntities to animate as a whole

        engine.addEntity(tile)                      // add the entity to the engine

        return tile
    }




///////////////////////////////////////  UTITLITIES

    //TODO put this in a generic DCL utils, other objects will need to know their center
    public getParcelCenter(){
        log(fn + ".getParcelCenter - this.parcelCenter1: ", this.parcelCenter);
        if (!this.parcelCenter) {
            log(fn + ".getParcelCenter - generating ParcelCenter: ", this.parcelCenter);
            const parcelSize = 16 //meters per parcel
            const cx = (this.settings.parcel.w/2) * parcelSize;
            const cz = (this.settings.parcel.h/2) * parcelSize;
            this.parcelCenter = <Vector3>{x: cx, y:0, z: cz}
        }
        log(fn + ".getParcelCenter - this.parcelCenter1: ", this.parcelCenter);
        //return {x: cx, y:0, z: cz}
        //return [cx,0,cz]
        //return <Vector3>{x: cx, y:0, z: cz}
        return this.parcelCenter;
    }


    // helps retrieve the generator from the settings object (1,2,3,4)
    private getGeneratorFromSettings() {
        //let gen = this.generator
        switch (this.settings.generateWith) {
            case 1:
                this.generator = new generators.singleEntityGen(this.settings);
                break;
            //case 2:
            //    gen = generators.circleGen;
            //    break;
            default:
                this.generator = new generators.singleEntityGen(this.settings);
        }
        log(fn + ".getGeneratorFromSettings generators: ", generators);
        log(fn + ".getGeneratorFromSettings this.generator: ", this.generator);
    }



}