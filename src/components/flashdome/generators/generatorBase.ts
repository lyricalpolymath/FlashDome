// this is the basic class that all generators should extend
// generators are the curves that change the overall shape of the dome

const fn = "GeneratorBase"
log(fn)

export class GeneratorBase {
    
    public settings:any;
    public name:String;

    constructor(settings:any = {} ) {
        this.settings = settings 
        log(fn + ".constructor");
    }

    //DEV simple function to verify which generator has been called
    public getName() { return this.name };
}