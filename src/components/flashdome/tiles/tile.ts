


const fn = "Tile Super"
//log(fn + " called")

export class Tile extends Entity {

    //as an Entity it should already have an EventManager
    //private events = new EventManager()  // so that I can subscribe to the global envets

    public name:string;         
    public id:number;       //holds the id of the tile for if we need to call 
    
    // Size holds only width(x) and height(z) and it would be missing the depth(y)
    // since there is currently no way to actually measure these properties, we store them in the tile
    public size:Size        

    //private _position:Vector3

    constructor() {
        super();
        //log(fn + ".constructor this: ", this);
        //log(fn + ".constructor Entity: ", Entity);
        //log(fn + ".constructor this.eventManager: ", this.eventManager);
    }


    get position():  Vector3  { return this.getComponent(Transform).position }
    set position(pos:Vector3) { this.getComponentOrCreate(Transform).position = pos;}


    /* need to understand Typescripts conditional types to allow for transofrm
    get transform():  Transform  { return this.getComponent(Transform) }
    set transform(transf:Transform) { 
        this.getComponentOrCreate(Transform) = transf;
    }
    */


}