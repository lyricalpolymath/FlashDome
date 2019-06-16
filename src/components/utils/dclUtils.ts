import { convertMessageToObject } from "@decentraland/EthereumController";

// a series of utilites for decentraland

const fn = "DCLUtils"
//log(fn + " called")

export class DCLUtils {

    private parcelCenter:Vector2

    /**
     * vert simple wrapper that returns the parcels center
     * TODO make it so that it detects the real underlying parcel size...for now there is no way of importing the scene.json file
     * @param parcelsW 
     * @param parcelsH 
     */
    public static getParcelCenter(parcelsW:number, parcelsH:number): Vector3 {
        const parcelSize = 16                               //meters per parcel
        const cx = (parcelsW/2) * parcelSize;
        const cz = (parcelsH/2) * parcelSize;
        let parcelCenter = new Vector3(cx,0,cz)     //<Vector3>{x: cx, y:0, z: cz}
        log(fn + ".getParcelCenter: ", parcelCenter);
        return parcelCenter;
    }


    /**
     * debugging DCL is very slow and log doesn't allow to always read the properties of an object
     * this utility function traces out all the relevant keys 
     */
    public static traceKeys() {
        log(fn + ".traceKeys")
        //log("engine: ", engine)  //[object object]
        //log("engine: " + engine)  //[object object]
        console.log("engine: ", engine) // outputs the object before everything else
        log("engine.keys: ", Object.keys(engine))
        /* outputs a lot of info - objects are read as [object] and functions are traced as text
        for (let k in engine){
            log("k:" + k + " - " + engine[k])
        }
        */
       log("Tile clicked Object.keys(Vector3): ", Object.keys(Vector3));
       log("Tile clicked Object.keys(Color3): ", Object.keys(Color3));
       //console.log("Vector3: ", Vector3) // not very useful spits out the function code
    }
    



}

