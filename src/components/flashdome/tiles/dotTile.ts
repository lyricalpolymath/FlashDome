


const fn = "DotTile"
log(fn + " called")


import { Tile } from "./tile"  //https://stackoverflow.com/questions/46558215/how-to-resolve-error-ts2351-cannot-use-new-with-an-expression-whose-type-la/46558897
export const dotTileSettings = {};


// this is basically an Entity and has all of it's properties
export default class DotTile extends Tile {

    constructor() {
        super();
        log(fn + ".constructor this: ", this);
        log(fn + ".constructor Entity: ", Entity);
        this.name = fn;
        this.createTile();
    }

    public createTile(pos:Vector3 = Vector3.Up()){
        log(fn + ".createTile this: ", this);

        //const tile = new Entity()                                             // create the entity
        this.addComponent(new Transform({ position: pos, scale: new Vector3(1,0.01,1) }))  // add a transform to the entity

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
        )


        var cilShape = new CylinderShape()
        cilShape.radiusTop =  1
        cilShape.arc =  180
        this.addComponent(cilShape);                // add a shape to the entity
        
        this.addComponent(new Material());          // add the material to color it
        this.getComponent(Material).albedoColor = Color3.Blue();
        
        //this.setParent(this);                       // add to the list of childEntities to animate as a whole

        engine.addEntity(this)                      // add the entity to the engine

        return this
    }

}