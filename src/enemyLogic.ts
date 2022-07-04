import { MainCharacter } from './characters'
import { movePlayerTo } from '@decentraland/RestrictedActions'
import * as utils from '@dcl/ecs-scene-utils'
import { createTriggerCube } from './game'
import {scene} from "./scene"
import { showDialogWithClose, changeSada } from "./testUI"
import { gotUSB, seeUSBTextShowing, setGotUSBTrue, setSeeUSBTrue, setTakeUSBTrue, spawnChar2, takeUSBTextShowing } from './scene2Logic'

let dinerOwnerRan = false
let gangDefeated = false
let getHostile = false
let scene2TriggerCreated = false
export let crouchMode = false
export let usbdiskModel25 = new Entity("USBdisk Model")
export let securityCollision = new Entity("securityCollision")

let dinerOwner = new Entity()

let securityGuyTextShowing = false

export let securityGuy

export function setDiner(dine: Entity) : void
{
  dinerOwner = dine
}

@Component("timeOut")
export class TimeOut {
    timeLeft: number
    constructor( time: number){
         this.timeLeft = time
    }
}

export const paused = engine.getComponentGroup(TimeOut)

export class WaitSystem {
  update(dt: number) {
    for (let ent of paused.entities){
      let time = ent.getComponentOrNull(TimeOut)
      if (time)
      {
        if (time.timeLeft > 0)
        {
          time.timeLeft -= dt
        }
        else
        {
          ent.removeComponent(TimeOut)
        }
      }
    }
  }
}

engine.addSystem(new WaitSystem())

//Scene2 Creation----------/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
const secondTrigger = new utils.TriggerBoxShape(
  new Vector3(10, 3, 1),
  new Vector3(0, 0, 0)
)
export function createTriggerCube2(transform: Transform, triggerShape: utils.TriggerBoxShape, triggeredText: string, closeAction: Function, autoRemove: boolean): Entity
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
          if (securityGuyTextShowing == false)
          {
            changeSada(closeAction)
            showDialogWithClose(triggeredText, "50%")
            securityGuyTextShowing = true
          }
        }, 
        onCameraExit: () =>
        {
          if (autoRemove == true) { engine.removeEntity(entity) }
        },
      }
    )
  )
  return entity
}
const propertyTrigger = new utils.TriggerBoxShape(
  new Vector3(6, 3, 1),
  new Vector3(0, 0, 0)
)
const gameEndingTrigger = new utils.TriggerBoxShape(
  new Vector3(8, 3, 60),
  new Vector3(0, 0, 0)
)
const seeUSBTrigger = new utils.TriggerBoxShape(
  new Vector3(6, 3, 1),
  new Vector3(0, 0, 0)
)
const takeUSBTrigger = new utils.TriggerBoxShape(
  new Vector3(1, 3, 1),
  new Vector3(0, 0, 0)
)
const scene2Ground = new Entity("Scene2 Ground")
engine.addEntity(scene2Ground)
const scene2Groundtransform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(0, 0, 0)
})
scene2Ground.addComponentOrReplace(scene2Groundtransform)
const scene2GroundGLTFShape = new GLTFShape("models/Scene2Model.glb")
scene2GroundGLTFShape.withCollisions = true
scene2GroundGLTFShape.isPointerBlocker = true
scene2GroundGLTFShape.visible = true
scene2Ground.addComponentOrReplace(scene2GroundGLTFShape)
function enableCrouchMode() : Function
{
  crouchMode = true
  securityGuyTextShowing = false
  return
}
function securityGuyTextFunc() : Function
{
  securityGuyTextShowing = false
  return
}
function seeUSBTextFunc() : Function
{
  //To do: Remove house entry collider
  return
}
function takeUSBTextFunc() : Function
{
  //To do: Remove house exit collider
  return
}
function endScene1() : Function
{
  gangDefeated = false
  getHostile = false
  engine.removeEntity(scene.sceneGround.entity)
  scene.arrow2mWide.transform.position = new Vector3(3, 2.5, 13.5)
  scene.arrow2mWide.transform.rotation = new Quaternion(-0.5, 0.5, -0.5, -0.5)
  scene.arrow2mWide2.transform.position = new Vector3(13.25, 22.5, 28.5)
  scene.arrow2mWide2.transform.rotation = new Quaternion(1.928352E-08, 0.9659259, -0.258819, -7.19671E-08)
  scene.arrow2mWide3.transform.position = new Vector3(13.25, 22.5, 32.75),
  scene.arrow2mWide3.transform.rotation = new Quaternion(-2.185569E-08, 0.9659259, 0.2588189, -3.785518E-08)
  scene.arrow2mWide4.transform.position = new Vector3(42, 14, 13)
  scene.arrow2mWide4.transform.rotation = new Quaternion(0.5, -0.5000001, -0.5000001, -0.5),
  scene.arrow2mWide5.transform.position = new Vector3(42, 9, 13)
  scene.arrow2mWide5.transform.rotation = new Quaternion(0.5, -0.5000001, -0.5000001, -0.5),
  engine.removeEntity(scene.firstdialoguecollision.entity)
  engine.removeEntity(scene.seconddialoguecollision.entity)
  engine.removeEntity(scene.thirdcollision.entity)
  engine.removeEntity(dinerOwner)
  //Spawn Desk, Chair
  const deskAndChair24 = new Entity("Desk And Chair")
  engine.addEntity(deskAndChair24)
  const deskAndChair24transform = new Transform({
    position: new Vector3(47, 0.2, 5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(2, 2, 2)
  })
  deskAndChair24.addComponentOrReplace(deskAndChair24transform)
  const deskAndChair24GLTFShape = new GLTFShape("models/DeskAndChair.glb")
  deskAndChair24GLTFShape.withCollisions = true
  deskAndChair24GLTFShape.isPointerBlocker = true
  deskAndChair24GLTFShape.visible = true
  deskAndChair24.addComponentOrReplace(deskAndChair24GLTFShape)
  //Spawn USB
  engine.addEntity(usbdiskModel25)
  const usbdiskModel25transform = new Transform({
    position: new Vector3(47, 2, 5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  usbdiskModel25.addComponentOrReplace(usbdiskModel25transform)
  const usbdiskModel25GLTFShape = new GLTFShape("models/USBdiskModel.glb")
  usbdiskModel25GLTFShape.withCollisions = true
  usbdiskModel25GLTFShape.isPointerBlocker = true
  usbdiskModel25GLTFShape.visible = true
  usbdiskModel25.addComponentOrReplace(usbdiskModel25GLTFShape)
  //Entering House trigger
  createTriggerCubeUSB(new Transform({ position: new Vector3(42, 1.5, 10) }), seeUSBTrigger, "Look, main computer! Copy files to your USB disc.", seeUSBTextFunc, false)
  //Take USB trigger
  createTriggerCubeUSBtaken(new Transform({ position: new Vector3(46.5, 2, 4.5) }), takeUSBTrigger, "Now you have files to support the police. Find the way out!", takeUSBTextFunc, false)
  //Entering Scene2 trigger
  createTriggerCube2(new Transform({ position: new Vector3(4, 1.5, 32) }), propertyTrigger, "You have found the hideout of the gang. Your plan is to get intel and bring down the business!\n\n-Get into the hideout without alerting the guards. Use SHIFT to make less footstep noise.", enableCrouchMode, true)
  //Game Ending Trigger
  createTriggerCubeGameEnding(new Transform({ position: new Vector3(4, 1.5, 32) }), gameEndingTrigger, "Congratulations, the game is complete! Thanks for playing!", new Function, false)
  //SECURITY GUY
  securityGuy = spawnChar2([new Vector3(21, 0.2, 32), new Vector3(20, 0.2, 32)], new Quaternion(0, 0.7071068, 0, -0.7071068), "models/GangGuard.glb", "Idle100", true, false, 4, false)
  createTriggerCubeSecurity(new Transform({ position: new Vector3(20, 1.5, 32) }), propertyTrigger, "Security guy: This is a private property, BACK OFF!\n\n(Find another way to go in)", securityGuyTextFunc, false)
  //SECURITY GUY
  engine.addEntity(securityCollision)
  const securityCollisiontransform = new Transform({
    position: new Vector3(19, 1.5, 32),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 3, 10)
  })
  securityCollision.addComponentOrReplace(securityCollisiontransform)
  const securityCollisionboxShape = new BoxShape()
  securityCollision.addComponentOrReplace(securityCollisionboxShape)
  let transparantMaterial = new Material()
  transparantMaterial.albedoColor = new Color4(0, 0, 0, 0)
  securityCollision.addComponent(transparantMaterial)

  scene2Ground.getComponent(Transform).scale = new Vector3(1, 1, 1)
  //Guards
  spawnChar2([new Vector3(34, 0.2, 61), new Vector3(61, 0.2, 61), new Vector3(61, 0.2, 48), new Vector3(61, 0.2, 61)], new Quaternion(0, 0.7071068, 0, -0.7071068), "models/GangGuard.glb", "Idle100", false, false, 8, true)
  spawnChar2([new Vector3(32.5, 0.2, 57), new Vector3(32.5, 0.2, 45), new Vector3(47, 0.2, 45), new Vector3(32.5, 0.2, 45)], new Quaternion(0, 0.7071068, 0, -0.7071068), "models/GangGuard.glb", "Idle100", false, false, 8, true)
  spawnChar2([new Vector3(61, 0.2, 37), new Vector3(61, 0.2, 7), new Vector3(54, 0.2, 7), new Vector3(54, 0.2, 37)], new Quaternion(0, 0.7071068, 0, -0.7071068), "models/GangGuard.glb", "Idle100", false, false, 8, true)
  spawnChar2([new Vector3(31, 0.2, 25), new Vector3(47, 0.2, 25), new Vector3(47, 0.2, 19), new Vector3(31, 0.2, 19)], new Quaternion(0, 0.7071068, 0, -0.7071068), "models/GangGuard.glb", "Idle100", false, false, 8, true)
  movePlayerTo({ x: 4, y: 0.2, z: 32 }, { x: 38, y: 0.2, z: 32 })
  return
}
//Scene2 Creation----------/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/

export function spawnChar(pathArray: Vector3[], spawnRotation: Quaternion, modelPath: string, defaultAnimation: string, moveOnce: boolean, canGethit: boolean, speed) : Entity
{
  @Component('charStats')
  class CharStats
  {
      attackUser: boolean = false
      health: number = 40
      moving: boolean = false
      lerpPath: Vector3[] = pathArray
      lerpOrigin: number = 0
      lerpTarget: number = 1
      lerpFraction: number = 0
      speed: number = 4
      movingOnce: boolean = moveOnce
      canGetHit: boolean = canGethit
  }
  let gMember = new Entity()
  gMember.addComponent(new GLTFShape(modelPath))
  gMember.addComponent(new Transform( { position: pathArray[0], rotation: spawnRotation, scale: new Vector3(1, 1, 1) } ) )

  //Animations
  let enemyAnimation = new Animator()

  const idle = new AnimationState('Idle100', {looping: true})
  const walking = new AnimationState('Walking60', {looping: true})
  const running = new AnimationState('Running49', {looping: true})
  const threat = new AnimationState('Threatening488', {looping: true})
  const threatSupport = new AnimationState('ThreatSupport100', {looping: true})
  const frightened = new AnimationState('Frightened488', {looping: true})
  const knockedOut = new AnimationState('KnockedOut60', {looping: false})
  const takepunch = new AnimationState('TakePunch30', {looping: false})

  enemyAnimation.addClip(walking)
  enemyAnimation.addClip(running)
  enemyAnimation.addClip(idle)
  enemyAnimation.addClip(threat)
  enemyAnimation.addClip(threatSupport)
  enemyAnimation.addClip(frightened)
  enemyAnimation.addClip(knockedOut)
  enemyAnimation.addClip(takepunch)
  gMember.addComponent(enemyAnimation)

  //defaultAnimation.play()
  gMember.getComponent(Animator).getClip(defaultAnimation).play()

  //Movement
  class charMovement {
      update(dt: number) {
        let path = gMember.getComponent(CharStats)
        if(gMember.getComponent(GLTFShape).src == "models/DinerOwner.glb")
        {
          if (dinerOwnerRan == true)
          {
            gMember.getComponent(CharStats).moving = true
            running.playing = true
            gMember.getComponent(Transform).lookAt(path.lerpPath[path.lerpTarget])
          }
        }
        else if (gangDefeated == true)
        {
          gMember.getComponent(CharStats).moving = true
          running.playing = true
          gMember.getComponent(Transform).lookAt(path.lerpPath[path.lerpTarget])
        }
        else if (getHostile == true)
        {
          gMember.getComponent(CharStats).moving = true
          gMember.getComponent(Transform).lookAt(path.lerpPath[path.lerpTarget])
        }
        if (gMember.getComponent(CharStats).moving == true)
        {
          if (getHostile == true && gMember.getComponent(GLTFShape).src != "models/DinerOwner.glb")
          {
            let transform = gMember.getComponent(Transform)
            //running.playing = true
            if (path.lerpFraction < 1) {
              let target = new Vector3(Camera.instance.position.x - 1, Camera.instance.position.y - 1.75, Camera.instance.position.z)
              transform.position = Vector3.Lerp(
                gMember.getComponent(Transform).position,
                target,
                0.1
              )
              if (gMember.getComponent(GLTFShape).src != "models/SecondGangMember.glb")
              {
                target = new Vector3(Camera.instance.position.x - 1, Camera.instance.position.y - 1.75, Camera.instance.position.z + 1)
                transform.position = Vector3.Lerp(
                gMember.getComponent(Transform).position,
                target,
                0.1
                )
              }
              transform.lookAt(new Vector3(Camera.instance.position.x, Camera.instance.position.y - 1.75, Camera.instance.position.z))
            }
          }
          else if (!gMember.hasComponent(TimeOut)){
            let transform = gMember.getComponent(Transform)
            running.playing = true
            if (path.lerpFraction < 1) {
              path.lerpFraction += dt/speed
              transform.position = Vector3.Lerp(
                path.lerpPath[path.lerpOrigin],
                path.lerpPath[path.lerpTarget],
                path.lerpFraction
              )
            }
            else
            {
              if (scene2TriggerCreated == false)
              {
                //Scene2 Creation----------
                const scene1EndingTrigger = new utils.TriggerBoxShape(
                  new Vector3(10, 3, 1),
                  new Vector3(0, 0, 0)
                )
                createTriggerCube(new Transform({ position: new Vector3(35, 1.5, 2.25) }), secondTrigger, "Follow the gang members to their base!", endScene1)
                //Scene2 Creation----------
                scene2TriggerCreated = true
              }
              if (path.movingOnce == false)
              {
                path.lerpOrigin = path.lerpTarget
                path.lerpTarget += 1
                if (path.lerpTarget >= path.lerpPath.length) {
                  path.lerpTarget = 0
                }
                path.lerpFraction = 0
                transform.lookAt(path.lerpPath[path.lerpTarget])
                running.pause()
                walking.play()
                gMember.addComponent(new TimeOut(0))
              }
            }
          }
        }
        else if (!gMember.hasComponent(TimeOut) && path.canGetHit == true) { idle.playing = true }
      }
  }

  //Click Actions
  gMember.addComponent(
      new OnPointerDown(e =>
        {
          let charstats = gMember.getComponent(CharStats)
          if (charstats.canGetHit == true)
          {
            if (charstats.health > 0)
            {
              if (!gMember.hasComponent(TimeOut))
              {
                if (dinerOwnerRan == false) { dinerOwnerRan = true }
                if (getHostile == false)
                {
                  getHostile = true
                }
                charstats.health -= 10
                takepunch.play()
                MainCharacter.getComponent(Animator).getClip('PunchRight30').play()
                MainCharacter.addComponent(new TimeOut(0.5))
                //MainCharacter.getComponent(Transform).lookAt(charstats.lerpPath[0])
                gMember.addComponent(new TimeOut(0.5))
              }
            }
            else
            {
              getHostile = false
              if (gangDefeated == false){gangDefeated = true}
              gMember.getComponent(Transform).lookAt(charstats.lerpPath[charstats.lerpTarget])
            }
          }
      }, { showFeedback: false, distance: 4.0})
  )

  gMember.addComponent(new CharStats())
  engine.addSystem(new charMovement())
  
  engine.addEntity(gMember)
  return gMember
}

export function createTriggerCubeUSB(transform: Transform, triggerShape: utils.TriggerBoxShape, triggeredText: string, closeAction: Function, autoRemove: boolean): Entity
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
          if (seeUSBTextShowing == false)
          {
            changeSada(closeAction)
            showDialogWithClose(triggeredText, "50%")
            setSeeUSBTrue()
          }
        }, 
        onCameraExit: () =>
        {
          if (autoRemove == true) { engine.removeEntity(entity) }
        },
      }
    )
  )
  return entity
}
export function createTriggerCubeUSBtaken(transform: Transform, triggerShape: utils.TriggerBoxShape, triggeredText: string, closeAction: Function, autoRemove: boolean): Entity
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
          if (takeUSBTextShowing == false)
          {
            changeSada(closeAction)
            showDialogWithClose(triggeredText, "50%")
            usbdiskModel25.getComponent(Transform).scale = new Vector3(0, 0, 0)
            setTakeUSBTrue()
            securityGuy.getComponent(Transform).scale = new Vector3(0, 0, 0)
            securityCollision.getComponent(Transform).scale = new Vector3(0, 0, 0)
            setGotUSBTrue()
          }
        }, 
        onCameraExit: () =>
        {
          if (autoRemove == true) { engine.removeEntity(entity) }
        },
      }
    )
  )
  return entity
}
export function createTriggerCubeGameEnding(transform: Transform, triggerShape: utils.TriggerBoxShape, triggeredText: string, closeAction: Function, autoRemove: boolean): Entity
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
          if (gotUSB == true)
          {
            changeSada(closeAction)
            showDialogWithClose(triggeredText, "50%")
            //setSeeUSBTrue()
          }
        }, 
        onCameraExit: () =>
        {
          if (autoRemove == true) { engine.removeEntity(entity) }
        },
      }
    )
  )
  return entity
}
export function createTriggerCubeSecurity(transform: Transform, triggerShape: utils.TriggerBoxShape, triggeredText: string, closeAction: Function, autoRemove: boolean): Entity
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
          if (securityGuyTextShowing == false && gotUSB == false)
          {
            changeSada(closeAction)
            showDialogWithClose(triggeredText, "50%")
            securityGuyTextShowing = true
          }
        }, 
        onCameraExit: () =>
        {
          if (autoRemove == true) { engine.removeEntity(entity) }
        },
      }
    )
  )
  return entity
}