
/**
 *  GROUP ROTATOR
 * 
 *  a simple System that rotates an entity or group of entites 
 *  you can customize 
 *  - the rotation axis, 
 *  - the rotation direction (clockwise or counterclockwise)
 *  - the rotation speed  
 * 
 * ///// TODO - improvements
 * - define rotation speed in second per rotation
 * - define number of max rotations to take before it should be stopped
 * - fire events at the end of each rotation and at the end of the given rotation numbers
 */


import { default as Groups} from "../../utils/EntityGroups"
import { GroupAwareSystem } from "./groupAwareSystem"

const fn = "GroupRotator"

export class GroupRotator extends GroupAwareSystem implements ISystem {
    //public group = {}                                 // defined by super
    private direction   : number                        // either 1 or -1  set by the clockwise parameter in the constructor
    public speed        : number = 200                  // rotation multiplier 
    public axis         : Vector3 = Vector3.Forward()   // the axis arount which to rotate the entities or entity

    /**
     * 
     * @param _group either a string, a single Entity or a group of entities
     * @param clockwise 
     * @param _speed 
     * @param _axis 
     */
    constructor (_group:string | {} , clockwise?:boolean, _speed?:number, _axis?:Vector3 ) {
        // the super class handles the first parameter either a string, a single Entity or a group of entities
        super(_group)
        log(fn + ". constructor this.group: ", this.group);

        if (_speed) this.speed = _speed
        if (_axis)  this.axis  = _axis
        this.direction = ( !clockwise ) ? -1 : 1;
    }

    
    update( dt: number ) {
        //log(fn + " update dt " + dt + " this.group: ", this.group)
        
        for (let entity of this.group.entities) { 
            const transform = entity.getComponent(Transform)
            let rotAmount = dt * this.speed * this.direction
            
            let axisVector = Vector3.Forward() // flip the tile 

            transform.rotate(axisVector, rotAmount)
            
          }
    }
    
}    