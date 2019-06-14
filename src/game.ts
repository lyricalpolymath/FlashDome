console.clear()
let fname = "game.ts"
log("\n---- game.ts");

//import * as scene from  'scene_duplicate.json'
//import scene from './scene_duplicate.json';
//log("BB scene:", scene);

import { FlashDome } from "components/flashdome/dome";
import { spawnCube, createCubes } from "./components/cubeSpawner"



const dome:FlashDome = new FlashDome();
log(fname + " flashDome imported : ", dome);
//log(fname + " flashDome settings: ", dome.settings);

//createCubes();

/* this doesn´t seem to work
import { ws as wsDebug, ws } from "./tests/wsDebug"
log(fname + " ws: ",ws);
log(fname + " ws.readyState: ",ws.readyState);
debugger;
*/


/* --- Spawn a cube ---
const cube1 = spawnCube(0,1,0)//(5, 1, 5)
cube1.getComponent(Material).albedoColor = Color3.Blue()

const cube2 = spawnCube(0,1,16) 
cube2.getComponent(Material).albedoColor = Color3.Green()

const cube3 = spawnCube(0,1,32) 
cube3.getComponent(Material).albedoColor = Color3.Red();

log("BB cube2 xyz:", cube2.getComponent(Transform).data.position);
//debugger
//*/



