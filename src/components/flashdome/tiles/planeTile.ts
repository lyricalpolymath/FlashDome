
const fn = "PlaneTile";
//log(fn + " called")


import { Tile } from "./tile" // https://stackoverflow.com/questions/46558215/how-to-resolve-error-ts2351-cannot-use-new-with-an-expression-whose-type-la/46558897
let tileSettings = {
    position: new Vector3(1,0,1),    // initial position at zero

    // These should be the real dimensions, but they cause a problem with circles1Gen so I cheated to have size that work
    // it's mainly the size that is causing problems... small size numbers < 1.7 will cause infinity
    //scale: new Vector3(1,0.03,1),    // flatten the box to a thin plane
    //size: new Size(1,1),             // the primitive object has 1m x 1m but the Size object only has 2 variables TODO-maybe create your own
    // these are the sizes that work
    scale: new Vector3(2,0.03,2),    // flatten the box to a thin plane
    size: new Size(1.8,1.8),             // the primitive object has 1m x 1m but the Size object only has 2 variables TODO-maybe create your own
    //radius: 1
};


// this is basically an Entity and has all of it's properties
export default class PlaneTile extends Tile {

    constructor(_name?:string) {
        super();
        //log(fn + ".constructor this: ", this);
        //log(fn + ".constructor Entity: ", Entity);
        this.name = _name || fn;
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
        
        //this.addComponent(new Material());      // add the material to color it
        //this.getComponent(Material).albedoColor = Color3.Red();

        engine.addEntity(this)                  // add the entity to the engine

        return this
    }    
}    