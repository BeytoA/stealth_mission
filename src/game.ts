import { createMovingPlatform } from './movingPlatform'
import { createTriggeredPlatform } from './triggeredPlatform'
import { createPathedPlatform } from './pathedPlatform'
import * as utils from '@dcl/ecs-scene-utils'
import { createCoin } from './coin'
import {scene} from "./scene"
import { showDialogWithClose, changeSada } from "./testUI"
import * as enemyLogic from './enemyLogic'

let transparantMaterial = new Material()
transparantMaterial.albedoColor = new Color4(0, 0, 0, 0)
scene.firstdialoguecollision.entity.addComponent(transparantMaterial)
scene.seconddialoguecollision.entity.addComponent(transparantMaterial)
scene.thirdcollision.entity.addComponent(transparantMaterial)
function removeCollision1() : Function
{
    scene.firstdialoguecollision.entity.removeComponent(BoxShape)
    return
}
changeSada(removeCollision1)
showDialogWithClose("Welcome to the Stealth Mission!\n\nIt was a busy day and you are coming back home from work. \n\n-Follow the arrows until you reach home.", "50%")
function removeCollision2andAdd1() : Function
{
  scene.seconddialoguecollision.entity.removeComponent(BoxShape)
  scene.firstdialoguecollision.entity.addComponent(new BoxShape())
  return
}
export function createTriggerCube(transform: Transform, triggerShape: utils.TriggerBoxShape, triggeredText: string, closeAction: Function): Entity
{
  const entity = new Entity()
  engine.addEntity(entity)
  //entity.addComponent(new GLTFShape('.glb'))
  entity.addComponent(transform)

  entity.addComponent(
    new utils.TriggerComponent(triggerShape, 
      { 
        onCameraEnter: () => 
        {
          //show UI
          changeSada(closeAction)
          showDialogWithClose(triggeredText, "50%")
        }, 
        onCameraExit: () =>
        {
            engine.removeEntity(entity)
        },
      }
    )
  )
  return entity
}

//Diner encounter----------
const secondTrigger = new utils.TriggerBoxShape(
  new Vector3(10, 3, 1),
  new Vector3(0, 0, 0)
)
createTriggerCube(new Transform({ position: new Vector3(35, 1.5, 48.5) }), secondTrigger, "2 gang members are threatening neighbourhood's diner owner!\n\n-Save the man! (Use LEFT CLICK to hit the enemy)", removeCollision2andAdd1)
//Diner encounter----------

//Scene 1 FirstGangMember
enemyLogic.spawnChar([new Vector3(31, 0.2, 40.5), new Vector3(35, 0.2, 0.5)], new Quaternion(0, 0.7071068, 0, -0.7071068), "models/FirstGangMember.glb", "Threatening488", true, true, 4)

//Scene 1 Diner Owner
enemyLogic.setDiner(enemyLogic.spawnChar([new Vector3(29.5, 1, 40.5), new Vector3(27.5, 1, 40.5)], new Quaternion(0, 0.7071068, 0, 0.7071068), "models/DinerOwner.glb", "Frightened488", true, false, 0.5))

//Scene 1 SecondGangMember
enemyLogic.spawnChar([new Vector3(31, 0.2, 39), new Vector3(35, 0.2, 0.5)], new Quaternion(0, 0.3826835, 0, -0.9238796), "models/SecondGangMember.glb", "ThreatSupport100", true, true, 4)
