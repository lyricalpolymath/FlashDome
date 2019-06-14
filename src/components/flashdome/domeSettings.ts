const fn = "domeSettings"
log(fn + " called")


enum generatorTypes {
    SINGLE = 1,
    DOUBLE = 2,
    CIRCLE = 3,
    //SPIRAL = 4,
    //FIBONACCI = 5,
    //SCATTER = 6
}

export const domeSettings = {
    parcel: { 'w': 4, 'h': 4}, 
    height: 10,
    //center: this.centerPos(this.parcel),
    radius: 2,          
    createFromRadius: true,     // maybe have a switch between create from 
    tilesMin: 1,
    tilesMax: 1,

    generatorTypes: generatorTypes,
    generator: generatorTypes.DOUBLE,


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