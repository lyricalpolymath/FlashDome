const fn = "domeSettings"
//log(fn + " called")

//import { DCLUtils } from "../utils/dclUtils"


enum generatorTypes {
    SINGLE = "Single",          // 4DEV - for testing tile parameters
    DOUBLE = "Double",          // 4Dev - just to test dynamic generator imports
    FIBONACCI = "Fibonacci",    // first real dome function
    CIRCLE = "Circle",          // simple circle Circle1Gen
    //SPIRAL = 4,
    //SCATTER = 6
}

enum tileTypes { 
    DOT     = "DotTile",
    PLANE   = "PlaneTile",
    //CUBE    = "CubeTile"
    //... import GLTB and use it as a tile
}


export const domeSettings = {
    parcel: { 'w': 4, 'h': 4}, 
    height: 10,
    //center: this.centerPos(this.parcel),

    // Still unused...each generator has it's own settings
    //TODO - hook some of the generators parameters to global dome settings - if radius is set here, use this one
    //radius: 2,          
    //createFromRadius: true,     // maybe have a switch between create from 
    //tilesMin: 1,
    //tilesMax: 1,


    // >>>>>>  change these  <<<<<<<< 
    generator:  generatorTypes.CIRCLE,
    tile:       tileTypes.DOT,

    // don't touch these 2
    generatorTypes: generatorTypes,
    tileTypes: tileTypes,

    // default DCL logo colors - taken from here https://decentraland.org/images/logo.svg
    dclColors: {
        red:    "#FF2D55",
        orange: "#FC9965",
        yellow: "#FFBC5B",
        yellowSun: "#FFC95B",
        purple: "#A524B3",
        gradients: {
            purpleToRed: ["#A524B3", "#FF2D55"],
            redToYellow: ["#FF2D55", "#FFBC5B"],
        }

    }

}



function centerPos(obj) {
    log("domeSettings.centerPos ");
    return { x: (obj.w/2), z: (obj.h/2) }
}