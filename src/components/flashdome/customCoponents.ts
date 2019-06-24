
/**
 * simple custom component to flag and group together a series of tiles of the dome
 */
@Component ('tileGroup')
export class TileGroup {
    groupN: number
    groupName: string
    groupColor: Color3  // consider if you want to store the Material instead
    spinning: boolean = true
    constructor(groupN:number, groupName?:string, groupColor?:Color3) {
        this.groupN = groupN;
        this.groupName = groupName;
        this.groupColor = groupColor;
    }
}