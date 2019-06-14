const fn = "domeSystem"
log(fn + " called")

/// animator of all the Dome Components
export class FlashDomeSystem implements ISystem {
    // syntax https://docs.decentraland.org/development-guide/systems/

    /* ISystems 
    constructor(){
        super();
        log(fn + ".constructor");
        
    }
    //*/

    // run once the system is activated - it´s the init if you need to do setup of components first
    activate(){}
        // Code to run once
    }

    ////////////////////////////////////  UPDATE
    // dt = delta time represents time that it took for the last frame to be processed, in milliseconds @30fps dt=30/1000 (0,03 /frame)

    update(dt: number) {   
        log(fn + " dt: " + dt)
        // ...
    }

    //////////////////////////////////// COMPONENT LIFECYCLE
    
    onAddEntity(entity: Entity){
        // Code to run once
    }

    onRemoveEntity(entity: Entity){}
        // Code to run once
    }


}