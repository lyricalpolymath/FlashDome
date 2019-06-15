const fn = "domeSettings"
log(fn + " called")


enum generatorTypes {
    SINGLE,
    DOUBLE,
    CIRCLE,
    //SPIRAL = 4,
    //FIBONACCI = 5,
    //SCATTER = 6
}

enum tileTypes { 
    DOT,      // TODO = maybe put the name of the object here    DOT = "tileDot";
    PLANE,
    CUBE }

export const domeSettings = {
    parcel: { 'w': 4, 'h': 4}, 
    height: 10,
    //center: this.centerPos(this.parcel),
    radius: 2,          
    createFromRadius: true,     // maybe have a switch between create from 
    
    tilesMin: 1,
    tilesMax: 1,


    // change these
    generator:  generatorTypes.SINGLE,
    tile:       tileTypes.DOT,

    generatorTypes: generatorTypes,
    tileTypes: tileTypes,

}


/* trying with a class that has static public and private methods
export class domeSettings2 {
    static parcel:object = { 'w': 4, 'h': 4}
    static height:number = 10
    static radius:number = 2
}
*/


function centerPos(obj) {
    log("domeSettings.centerPos ");
    return { x: (obj.w/2), z: (obj.h/2) }
}