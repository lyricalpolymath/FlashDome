//console.clear()
let fname = "game.ts"
log("\n---- game.ts");

import { domeSettings as S } from "components/flashdome/domeSettings";
import { FlashDome } from "components/flashdome/dome";
import { Floor } from "components/various/floor";


// CREATE THE DOME Entity
const dome:FlashDome = new FlashDome();
log(fname + " flashDome imported : ", dome);

// create the floor
const floor = new Floor(S.parcel.w, S.parcel.h, Color3.FromHexString( S.colors.greyLight) )




