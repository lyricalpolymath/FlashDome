const fn = "domeSettings"
//log(fn + " called")

//import { DCLUtils } from "../utils/dclUtils"


enum generatorTypes {
    SINGLE = "Single",
    DOUBLE = "Double",
    CIRCLE = "Circle",
    //SPIRAL = 4,
    //FIBONACCI = 5,
    //SCATTER = 6
}

enum tileTypes { 
    DOT     = "DotTile",
    PLANE   = "PlaneTile",
    //CUBE    = "CubeTile"
}


export const domeSettings = {
    parcel: { 'w': 4, 'h': 4}, 
    height: 10,
    //center: this.centerPos(this.parcel),
    radius: 2,          
    createFromRadius: true,     // maybe have a switch between create from 
    
    tilesMin: 1,
    tilesMax: 1,


    // change these
    generator:  generatorTypes.DOUBLE,
    tile:       tileTypes.PLANE,

    generatorTypes: generatorTypes,
    tileTypes: tileTypes,

}



function centerPos(obj) {
    log("domeSettings.centerPos ");
    return { x: (obj.w/2), z: (obj.h/2) }
}