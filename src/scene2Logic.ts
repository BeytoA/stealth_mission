import { CharSpeed, distance, MainCharacter } from './characters'
import { movePlayerTo } from '@decentraland/RestrictedActions'
import * as utils from '@dcl/ecs-scene-utils'
import {scene} from "./scene"
import { changeSada, scene2GetBusted } from './testUI'
import { crouchMode, securityCollision, securityGuy, usbdiskModel25 } from './enemyLogic'

export let gameOver = false
export let seeUSBTextShowing = false
export let takeUSBTextShowing = false

export let gotUSB = false
const movementBlocker = new Entity("Movement Blocker")
engine.addEntity(movementBlocker)
const arrow2mWide8transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0.7071068, 0, -0.7071068),
  scale: new Vector3(0, 0, 0)
})
movementBlocker.addComponentOrReplace(arrow2mWide8transform)
const arrow2mWide8GLTFShape = new GLTFShape("models/TransparentBox.glb")
arrow2mWide8GLTFShape.withCollisions = true
arrow2mWide8GLTFShape.isPointerBlocker = true
arrow2mWide8GLTFShape.visible = true
movementBlocker.addComponentOrReplace(arrow2mWide8GLTFShape)
let transparantMaterial = new Material()
transparantMaterial.albedoColor = new Color4(0, 0, 0, 0)
movementBlocker.addComponent(transparantMaterial)

@Component("timeOut")
export class TimeOut {
    timeLeft: number
    constructor( time: number){
         this.timeLeft = time
    }
}

export function setSeeUSBTrue() : void
{
  seeUSBTextShowing = true
}
export function setTakeUSBTrue() : void
{
  takeUSBTextShowing = true
}
export function setGotUSBTrue() : void
{
  gotUSB = true
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

function RestartGame() : Function
{
  movePlayerTo({ x: 4, y: 0.2, z: 32 }, { x: 38, y: 0.2, z: 32 })
  movementBlocker.getComponent(Transform).scale = new Vector3(0, 0, 0)
  movementBlocker.getComponent(Transform).position = new Vector3(0, -2, 0)
  gameOver = false
  seeUSBTextShowing = false
  takeUSBTextShowing = false
  usbdiskModel25.getComponent(Transform).scale = new Vector3(1, 1, 1)
  securityGuy.getComponent(Transform).scale = new Vector3(1, 1, 1)
  securityCollision.getComponent(Transform).scale = new Vector3(1, 1, 1)
  gotUSB = false
  return
}

export function spawnChar2(pathArray: Vector3[], spawnRotation: Quaternion, modelPath: string, defaultAnimation: string, moveOnce: boolean, canGethit: boolean, speed, patrolling: boolean) : Entity
{
  @Component('charStats')
  class CharStats
  {
      attackUser: boolean = false
      health: number = 40
      moving: boolean = patrolling
      lerpPath: Vector3[] = pathArray
      lerpOrigin: number = 0
      lerpTarget: number = 1
      lerpFraction: number = 0
      speed: number = 4
      movingOnce: boolean = moveOnce
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
        if (gMember.getComponent(CharStats).moving)
        {
          if (!gMember.hasComponent(TimeOut))
          {
            let transform = gMember.getComponent(Transform)
            walking.playing = true
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
                gMember.addComponent(new TimeOut(0.3))
              }
            }
          }
        }
        else if (!gMember.hasComponent(TimeOut)) { idle.playing = true }
      }
  }

  //Click Actions
  gMember.addComponent(
      new OnPointerDown(e =>
        {
          let charstats = gMember.getComponent(CharStats)
          if (charstats.health > 0)
          {
            if (!gMember.hasComponent(TimeOut))
            {
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
            //gMember.getComponent(Transform).lookAt(charstats.lerpPath[charstats.lerpTarget])
          }
        }, { showFeedback: false, distance: 4.0})
  )

  //Scene 2 Logic
  class Detection {
    update() {
      let transform = gMember.getComponent(Transform)
      let dist = distance(transform.position, Camera.instance.position)
      if ( dist < (CharSpeed / 2) && !gameOver && crouchMode == true)
      {
        if (gMember.getComponent(CharStats).movingOnce == false){
          //GameOver
          changeSada(RestartGame)
          scene2GetBusted("50%")
          movementBlocker.getComponent(Transform).scale = new Vector3(1, 1, 1)
          movementBlocker.getComponent(Transform).position = new Vector3(Camera.instance.position.x, Camera.instance.position.y, Camera.instance.position.z)
          gameOver = true
        }
      }
    }
  }
  
  engine.addSystem(new Detection())

  gMember.addComponent(new CharStats())
  engine.addSystem(new charMovement())
  
  engine.addEntity(gMember)
  return gMember
}