

const fn = "basictile"
console.log(fn + " called")

export class BasicTile implements Entity {

    private events = new EventManager()  // so that I can subscribe to the global envets

    constructor() {
        console.log(fn + ".constructor this: ", this);
        console.log(fn + ".constructor Entity: ", Entity);
        super();
    }

}