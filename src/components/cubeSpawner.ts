log("\ncubeSpawner.ts - loaded")


/* --- Set up a system ---
class RotatorSystem {
  group = engine.getComponentGroup(Transform)         // this group will contain every entity that has a Transform component

  update(dt: number) {
    for (let entity of this.group.entities) {           // iterate over the entities of the group
      const transform = entity.getComponent(Transform)  // get the Transform component of the entity
      transform.rotate(Vector3.Up(), dt * 10)           // mutate the rotation
    }
  }
}
//*/

// Add a new instance of the system to the engine
//engine.addSystem(new RotatorSystem())

/// --- Spawner function ---//
export function spawnCube(x: number, y: number, z: number) {
    const cube = new Entity()                                             // create the entity
    cube.addComponent(new Transform({ position: new Vector3(x, y, z) }))  // add a transform to the entity
    cube.addComponent(new BoxShape())                                     // add a shape to the entity
    cube.addComponent(new Material());                                    // add the material to color it
    log("cube x, z, y: " + x + ", " + z + ", "+ y);
    engine.addEntity(cube)                                                // add the entity to the engine
    return cube
  }
  

  export function createCubes() {
    const cube1 = spawnCube(0,1,0)//(5, 1, 5)
    cube1.getComponent(Material).albedoColor = Color3.Green()
    
    
    const cube2 = spawnCube(0,1,16) 
    cube2.getComponent(Material).albedoColor = Color3.Blue()
    
    const cube3 = spawnCube(0,1,32) 
    cube3.getComponent(Material).albedoColor = Color3.Red();
    
    log("BB cube2 xyz:", cube2.getComponent(Transform).data.position);
    return [cube1,cube2,cube3]
  }

  createCubes()
  /*// --- Spawn a cube ---
  const cube1 = spawnCube(0,1,0)//(5, 1, 5)
  cube1.getComponent(Material).albedoColor = Color3.Green()
  
  
  const cube2 = spawnCube(0,1,16) 
  cube2.getComponent(Material).albedoColor = Color3.Blue()
  
  const cube3 = spawnCube(0,1,32) 
  cube3.getComponent(Material).albedoColor = Color3.Red();
  
  log("BB cube2 xyz:", cube2.getComponent(Transform).data.position);
  */

  /*
  cube.addComponent(
    new OnClick(() => {
      cube.getComponent(Transform).scale.z *= 1.1
      cube.getComponent(Transform).scale.x *= 0.9
  
      spawnCube(Math.random() * 8 + 1, Math.random() * 8, Math.random() * 8 + 1)
    })
  )
  //*/