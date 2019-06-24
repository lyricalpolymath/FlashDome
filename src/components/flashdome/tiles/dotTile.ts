


const fn = "DotTile"
//log(fn + " called")


import { Tile } from "./tile"  //https://stackoverflow.com/questions/46558215/how-to-resolve-error-ts2351-cannot-use-new-with-an-expression-whose-type-la/46558897
let tileSettings = {
    position: new Vector3(1,0,1),    // initial position at zero
    scale: new Vector3(1, 0.02, 1),  // flatten the cilinder to a thin plane
    size: new Size(2,2),             // the primitive object has 1m x 1m but the Size object only has 2 variables TODO-maybe create your own
    radius: 1                        // the cilinder has a default radius of 1 - which makes its width=height=2m
};


// this is basically an Entity and has all of it's properties
export default class DotTile extends Tile {

    constructor(_name?:string) {
        super();
        this.name = _name || fn;
        //log(fn + ".constructor _name: "+ _name + " - this.name: " + this.name);
        this.size = tileSettings.size;
        //log(fn + ".constructor this: ", this);
        this.createTile();
    }

    public createTile(transform?:Transform){
        //log(fn + ".createTile this: ", this);
  
        // no need to create new Entity since this class is already one
        // set basic Transform if it's not passed as a parameter
        let t:Transform = transform || new Transform({
                position: tileSettings.position,
                scale: tileSettings.scale,
            })

        // add a transform to the entity    
        this.addComponent(new Transform( t ))  
        //log(fn + ".createTile position: ", this.getComponent(Transform).position);


        // add the material to color it - 
        // !!!!!!  NO! let the generator assign a common material otherwise you will incur in Unloading scene at 0,0 due to exceeded limits
        //this.addComponent(new Material());          
        //this.getComponent(Material).albedoColor = Color3.Blue();


        //Cilinder
        let cilShape = new CylinderShape()
        cilShape.radiusTop =  1
        cilShape.arc =  180             // ACHTUNG-BUG: this does not work
        this.addComponent(cilShape);    // add a shape to the entity
        

        /* BEHAVIOR
        // quick test to see duplicates... move this one
        this.addComponent(
            new OnClick(e => {
                log("Tile clicked e: ", e);
                log("Tile clicked Vector3: ", Vector3);
                log("Tile clicked Object.keys(Vector3): ", Object.keys(Vector3));
                log("Tile clicked Object.keys(position): ", Object.keys(this.getComponent(Transform).position));
                log("Tile clicked position.hasOwnProperty('add')): ", this.getComponent(Transform).position.hasOwnProperty('add'));
                log("Tile clicked position.hasOwnProperty('addInPlace')): ", this.getComponent(Transform).position.hasOwnProperty('addInPlace'));
                
                //tile.getComponent(Transform).position.set(1,2,1)                      // position set works
                //tile.getComponent(Transform).position.add(new Vector3(1,0, 1))        // position .add doesn't
                this.getComponent(Transform).position.addInPlace(new Vector3(1,0, 1))   // addInPlace works too

            })
        )*/

        engine.addEntity(this)   // add the entity to the engine
        return this
    }

}