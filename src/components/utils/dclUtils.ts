import { domeSettings } from "../flashdome/domeSettings"


// a series of utilites for decentraland

const fn = "DCLUtils"
//log(fn + " called")

export class DCLUtils {

    private parcelCenter:Vector2

    /**
     * vert simple wrapper that returns the parcels center
     * TODO make it so that it detects the real underlying parcel size...for now there is no way of importing the scene.json file
     * @param parcelsW? optional
     * @param parcelsH? optiona
     */
    public static getParcelCenter(parcelsW?:number, parcelsH?:number): Vector3 {
        // if no parameters are passed automatically retrieve it from domeSettings
        if (!parcelsW || !parcelsH) {
            parcelsW = domeSettings.parcel.w
            parcelsH = domeSettings.parcel.h
        } 
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

    /* not needed you have the Angle Class
    https://github.com/decentraland/ecs-reference/blob/master/docs-latest/decentraland-ecs.angle.md
    Angle.FromDegrees(degreesHere).radians()
    Angle.FromRadians(radiansHere).degrees()

    public static radiansToDegrees(radians:number) {
        return radians * (180/ Math.PI);
    }

    public static degreesToRadians(degrees:number) {
        return degrees * ( Math.PI / 180);
    }
    */




}

