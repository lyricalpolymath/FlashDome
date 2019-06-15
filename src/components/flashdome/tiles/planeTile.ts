
const fn = "PlaneTile";
//log(fn + " called")


import { Tile } from "./tile" // https://stackoverflow.com/questions/46558215/how-to-resolve-error-ts2351-cannot-use-new-with-an-expression-whose-type-la/46558897
export const dotTileSettings = {};


// this is basically an Entity and has all of it's properties
export default class PlaneTile extends Tile {

    constructor() {
        super();
        //log(fn + ".constructor this: ", this);
        //log(fn + ".constructor Entity: ", Entity);
        this.name = fn;
        this.createTile();
    }

    public createTile(pos:Vector3 = Vector3.Up()){
        this.addComponent(new Transform({ position: pos, scale: new Vector3(1,0.01,1) }))  // add a transform to the entity

        var shape = new BoxShape()
        this.addComponent(shape);                // add a shape to the entity
        
        this.addComponent(new Material());          // add the material to color it
        this.getComponent(Material).albedoColor = Color3.Red();
        
        //this.setParent(this);                       // add to the list of childEntities to animate as a whole

        engine.addEntity(this)                      // add the entity to the engine

        return this
    }    
}    