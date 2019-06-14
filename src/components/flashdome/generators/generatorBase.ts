// this is the basic class that all generators should extend
// generators are the curves that change the overall shape of the dome

const fn = "GeneratorBase"
log(fn)

export class GeneratorBase {
    
    public settings:any;

    constructor(settings:any = {} ) {
        this.settings = settings 
        log(fn + ".constructor");
    }
}