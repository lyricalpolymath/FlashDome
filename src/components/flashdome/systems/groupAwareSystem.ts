

/**
 * this class allows all custom systems that extend it, to be passed as a parameter either
 * 1 - a single Entity  object
 *
 * 2 - a group of entites produced by the dcl classic api   engine.getComponentGroup(TileGroup);
 *
 * or 3 - a string indicating the name of group of entities produced with my custom  EntityGroups class src/components/utils/EntityGroups.ts, 
 * and stored in EntityGroups.groups 
 */

import { default as Groups} from "../../utils/EntityGroups"

export abstract class GroupAwareSystem implements ISystem {
//export class GroupAwareSystem /*implements ISystem*/ {   

    public group = {}

    constructor (_group:string | {}) {

        if (typeof _group == "string") {
            // group created with EntityGroups
            this.group["entities"] =  Groups.getGroup(_group)

        } else if (!this.group.entities) {
            // Single Entity:  
            // if it's an object but doesn't have the entities property it's likely this is a single Entity
            this.group["entities"] = [_group]; 
        
        } else {
            // a group that has the entities object which means that it has been created
            // with the DCL api:   engine.getComponentGroup(TileGroup)
            this.group = _group;  
        } 
        
    }

    // force subclasses to implement update
    abstract update(dt:number)

}