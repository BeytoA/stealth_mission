import * as utils from '@dcl/ecs-scene-utils'
import { crouchMode, TimeOut } from './enemyLogic'

let previousPosition
export let CharSpeed = 0

export let MainCharacter = new Entity()
MainCharacter.addComponent(new GLTFShape('models/MainChar.glb'))
MainCharacter.addComponent(new Animator())
MainCharacter.getComponent(Animator).addClip( new AnimationState('Running49', {looping: true}) )
MainCharacter.getComponent(Animator).addClip( new AnimationState('Walking60', {looping: true}) )
MainCharacter.getComponent(Animator).addClip( new AnimationState('CrouchWalking60', {looping: true}) )
MainCharacter.getComponent(Animator).addClip( new AnimationState('Idle100', {looping: true}) )
MainCharacter.getComponent(Animator).addClip( new AnimationState('PunchRight30', {looping: false}) )
engine.addEntity(MainCharacter)
MainCharacter.addComponent(new Transform(
    {
        position: new Vector3(0, -0.8, 0),
        scale: new Vector3(0, 0, 0)
    }))
MainCharacter.setParent(Attachable.AVATAR)

const hideAvatar = new Entity()
hideAvatar.addComponent(new AvatarModifierArea(
    {
        area: {box: new Vector3(64, 35, 64)},
        modifiers: [AvatarModifiers.HIDE_AVATARS]
    }))
hideAvatar.addComponent(new Transform({position: new Vector3(32, 8, 32)}))
hideAvatar.addComponent(new CameraModeArea(
    {
        area: {box: new Vector3(64, 35, 64)},
        cameraMode: CameraMode.ThirdPerson
    }
))
engine.addEntity(hideAvatar)

hideAvatar.addComponent(
    new utils.TriggerComponent(
        new utils.TriggerBoxShape(new Vector3(64, 35, 64), Vector3.Zero()),
        {
            onCameraEnter: () => {MainCharacter.getComponent(Transform).scale.setAll(1)},
            onCameraExit: () => {MainCharacter.getComponent(Transform).scale.setAll(0)}
        }
    )
)
export function distance(pos1: Vector3, pos2: Vector3): number
{
    const a = pos1.x - pos2.x
    const b = pos1.z - pos2.z
    return Math.sqrt(a * a + b * b)
}
const speedText = new UIText(new UICanvas())
speedText.value = "Close"
speedText.fontSize = 15
speedText.vAlign = "center"
speedText.hAlign = "right"
speedText.positionY = 0
speedText.paddingLeft = 0
speedText.isPointerBlocker = false
const currentPosition = new Vector3()

class CheckPlayerIsMovingSystem implements ISystem {
    update(dt: number) {
        previousPosition 
        if (!MainCharacter.hasComponent(TimeOut))
        {
            if (currentPosition.equals(Camera.instance.position))
            {
                MainCharacter.getComponent(Animator).getClip('Idle100').play()
            }
            else
            {
                let traveledDist = distance(currentPosition, Camera.instance.position)
                CharSpeed = (traveledDist / dt)
                currentPosition.copyFrom(Camera.instance.position)
                if (CharSpeed > 8)
                {
                    MainCharacter.getComponent(Animator).getClip('Running49').play()
                    speedText.value = "You're loud!"
                }
                else
                {
                    if (crouchMode == true)
                    {
                        MainCharacter.getComponent(Animator).getClip('CrouchWalking60').play()
                    }
                    else
                    {
                        MainCharacter.getComponent(Animator).getClip('Walking60').play()
                    }
                    speedText.value = "Quiet.."
                }
            }
        }
    }
}

engine.addSystem(new CheckPlayerIsMovingSystem())