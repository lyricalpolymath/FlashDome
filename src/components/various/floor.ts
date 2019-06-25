const fn = "Floor";
log(fn)

export class Floor extends Entity {

    public w:number
    public h:number
    public color:Color3
    private f:Entity

    constructor(w:number, h:number, color:Color3){
        //log(fn)
        super()
        this.w = w * 16  //parcels x parcelsize
        this.h = h * 16
        this.color = color;
        this.createFloor()
    }


    public createFloor() {

        let f = new Entity();
       
        f.addComponent( new Transform({
            position: new Vector3 ( this.w/2, 0, this.h/2),
            scale: new Vector3(this.w, 0.01, this.h),    // flatten the box to a thin plane and enlarge to the W and H
            })
        )

        var shape = new BoxShape()
        f.addComponent(shape);

        let m = new Material()
        m.albedoColor = this.color
        f.addComponent(m)
        
        f.setParent(this)

        this.f = f
        engine.addEntity(this)
    }
}