// I Needed a way to create dynamic groups 
// to group entites created at each round of a for loop
// and since the default methods don't allow to intentionally create a group by filtering through certain of it's properties
// as illustrated here https://decentralandteam.slack.com/archives/CFK920GJZ/p1561399185149300
// and here https://decentralandteam.slack.com/archives/CFK920GJZ/p1561399297151400

// default group methods
// getComponentGroup https://github.com/decentraland/ecs-reference/blob/master/docs-latest/decentraland-ecs.engine.getcomponentgroup.md
// getEntitiesWithComponent //https://github.com/decentraland/ecs-reference/blob/master/docs-latest/decentraland-ecs.engine.getentitieswithcomponent.md
                
// usage example
// Groups.createGroupWithComponentsAndCondition("tileGroup", "groupN", "=="+c, "group"+c)

export default class EntityGroups {

    private static _groups = new Array()

    // simple getter - no setter (only createGroup)
    static get groups() {
        return EntityGroups._groups
    }

    public static createGroup (groupName:string, entities:[] ) {
        this._groups = (this.groups == undefined) ? new Array() : this.groups
        this._groups[groupName] = entities
        return this.getGroup(groupName)
        log("created group: " + groupName + " : ", this._groups[groupName])
    }

    public static getGroup (groupName:string) {
        return this._groups[groupName]
    }

    /**
     * a way to dinamically create groups of entities that meet certain criteria
     * example usage:
     * Groups.createGroupWithComponentsAndCondition("tileGroup", "groupN", "=="+c, "group"+c)
     * or 
     * Groups.createGroupWithComponentsAndCondition("Transform", "position.x", " > 10", "entitiesWithXGraterThan10") // Todo still to prove wither it needs a string "Transform" or "transform" 
     * @param componentName a string representing your custome component name (the one in lowercase created with the @Component eg "tileGroup")
     * @param property a string of the property that you want to filter for
     * @param condition a string of the condition that the property has to meet eg "== 1"  or  " < 10"
     * @param groupName a string to give this group a specific name that you can later retrieve with EntityGroups.getGroup(groupName)
     */
    public static createGroupWithComponentsAndCondition(componentName:string, property:string, condition:string, groupName:string) {
        //log("createGroupWithComponentsAndCondition componentName: " + componentName )
        let tempGroup = new Array()
        for (let entityId in engine.entityLists[componentName]) {
            //log("entityId: ", entityId) //entity = the id of the entity "Ed"
            let entity = engine.entities[entityId]
            let component = entity.getComponent(componentName)
            
            if ( eval(component[property] + condition) ) {
                tempGroup.push( entity ) 
            }   
        }
        
        // done looping add it to the groups
        this.createGroup(groupName, tempGroup)
        log("done creating group: ", tempGroup);
        return this.getGroup(groupName);
    }

}