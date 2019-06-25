


import { default as Groups} from "../../utils/EntityGroups"
import { GroupAwareSystem } from "./groupAwareSystem"

const fn = "ProximityScaler"

export class ProximityScaler extends GroupAwareSystem implements ISystem {
    //public group = {}                                 // defined by super 
    public axis         : Vector3 = Vector3.Up()        // the axis to scale
    public scaleMin     : number  = 0.5                 // the default minimum scale
    public scaleMax     : number  = 2                   // the default maxium scale 
    private activationDistance: number = 5              // distance from camera position in m that will start to activate the effect 
    
    private camera: Camera;

    /**
     * 
     * @param _group either a string for a group name, a single Entity or a group of entities 
     * @param axis 
     * @param scaleMin
     * @param scaleMax
     */
    constructor (_group:string | {}, scaleMin?:number, scaleMax?:number, axis?:Vector3, activationDistance?:number ) {
        // the super class handles the first parameter either a string, a single Entity or a group of entities
        super(_group)
        log(fn + ". constructor this.group: ", this.group);
        this.scaleMin = scaleMin || this.scaleMin
        this.scaleMax = scaleMax || this.scaleMax
        this.axis = axis || this.axis
        this.activationDistance = activationDistance || this.activationDistance

        this.camera = Camera.instance;        
        log(fn + ".constructor   this.direction: ", this.direction)
    }

    /* to run once when you activate the system
    activate () {
        ///TODO possibly calculate the global position in relation to all parent tree
    }
    */

   
    
    update( dt: number ) {
       
        //let userPos = camera.position
        for (let entity of this.group.entities) { 
            const componentT = entity.getComponent(Transform)
            const parentT = entity.getParent().getComponent(Transform)

            // find the distance from the current position to the camera position
            // put int global coordinates by substracting the parent position
            // TODO: I'm calculating only one parent, but there could be many - todo implement a LocalToGlobal method
            let ttGlobalPos = componentT.position.subtract( parentT.position ) 
            let distance1 = Vector3.Distance( ttGlobalPos, this.camera.position) // gives the square rooted value       44
            let distance = this.distance( ttGlobalPos, this.camera.position)     // returns the non square rooted value 1955
            log(fn + " update ttGlobalPos: " + ttGlobalPos + " - camera.position: " + this.camera.position  + " - distance: " + distance + " - Vector3.distance: " + distance1)
            debugger
            // TODO - actvation distance not squared + aslo make it activate only if the camera pos is UNDER the dome == within it's radius
            if (distance < this.activationDistance) {
                // find the percentage of this distance based on the range scaleMin > scaleMax
                // TODO see if Scalar.PercentToRange, and Scalar.RangeToPercent can be helpful
                var posInDistanceRange = distance / this.activationDistance
                var scaleSize = this.valueToRange(posInDistanceRange, 0, this.activationDistance, this.scaleMin, this.scaleMax );
                log(fn + " update valueToRange: " + scaleSize)

                componentT.scale.scale(scaleSize) 

            }
            
            //log(fn + " update dt " + dt + " rotAmount: ", rotAmount)
            //debugger

            //transform.rotate(rotAxis, rotAmount)
            
          }
    }

    // Get distance

    /**
     * Get Distance
     * copied from here https://github.com/decentraland-scenes/Gnark-patrol/blob/ae2d12598e95369bab8eebf76de798feb989e193/src/game.ts#L155
     * optimized to avoid having to use th square root
     * - TODO compare with Vector3.Distance(pos1, pos2)
     * - TODO refactor into DCLUtils 
     * Note:
     * This function really returns distance squared, as it's a lot more efficient to calculate.
     * The square root operation is expensive and isn't really necessary if we compare the result to squared values.
     * We also use {x,z} not {x,y}. The y-coordinate is how high up it is.
     * @param pos1 Vector3 
     * @param pos2 Vector3 - usuall the camera.position
     */
    public distance(pos1: Vector3, pos2: Vector3): number {
        const a = pos1.x - pos2.x
        const b = pos1.z - pos2.z
        return a * a + b * b
    }
  
    /**
     * TODO see if there are API to get this already
     * eg in Scalar https://github.com/decentraland/ecs-reference/blob/master/docs-latest/decentraland-ecs.scalar.md
     * there are many possible useful functions   PercentToRange, RangeToPercent, Lerp, Denormalize, Clamp
     * @param posA 
     * @param Amin 
     * @param Amax 
     * @param Bmin 
     * @param Bmax 
     */
    private valueToRange (posA:number, Amin:number, Amax:number, Bmin:number, Bmax:number) {
        var newVal = (( (posA-Amin)*(Bmax-Bmin)) / (Amax-Amin) ) + Bmin;
        /* or more readable;
        var rangeA = (Amax - Amin);
        var rangeB = (Bmax - Bmin);
        var newVal = ( ((posA - Amin) * rangeB) / rangeA )) + Bmin;
        */
        return newVal	
    }


    /* INterweaver carriable component system
    public update(dt: number) {
        for (let entity of this.carryables.entities) {
          let carryable = entity.getComponent(Carryable);
          if (!carryable.beingCarried) {
            continue;
          }
          
          // Move object back to same relative position versus camera as when you clicked it.
          entity.getComponent(Transform).position = carryable.relativeTransform.position
            .clone()                            //duplicate the position vector 
            .rotate(this.camera.rotation)       //orient to the camera rotation
            .add(this.camera.position)          //position in the same position of the user camera
            .add(new Vector3(0, 2.42, 0))       //add a tiny offset so you see it in front and above of you
          ;
        }
      }
      */
    
}    