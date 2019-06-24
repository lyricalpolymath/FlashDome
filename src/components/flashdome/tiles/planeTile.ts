
const fn = "PlaneTile";
//log(fn + " called")


import { Tile } from "./tile" // https://stackoverflow.com/questions/46558215/how-to-resolve-error-ts2351-cannot-use-new-with-an-expression-whose-type-la/46558897
let tileSettings = {
    position: new Vector3(1,0,1),    // initial position at zero
    scale: new Vector3(1,0.01,1),    // flatten the cilinder to a thin plane
    size: new Size(1,1)              // the primitive object has 1m x 1m but the Size object only has 2 variables TODO-maybe create your own
};


// this is basically an Entity and has all of it's properties
export default class PlaneTile extends Tile {

    constructor() {
        super();
        //log(fn + ".constructor this: ", this);
        //log(fn + ".constructor Entity: ", Entity);
        this.name = fn;
        this.size = tileSettings.size;
        this.createTile();
    }

    public createTile(transform?:Transform ){

        let t:Transform = transform || new Transform({
            position: tileSettings.position,
            scale: tileSettings.scale,
        })

        this.addComponent( t )                  // add a transform to the entity

        var shape = new BoxShape()
        this.addComponent(shape);               // add a shape to the entity
        
        this.addComponent(new Material());      // add the material to color it
        //this.getComponent(Material).albedoColor = Color3.Red();

        engine.addEntity(this)                  // add the entity to the engine

        return this
    }    
}    