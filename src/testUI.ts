import * as utils from '@dcl/ecs-scene-utils'
import {scene} from "./scene"

let sada = new Function()

let canvas = new UICanvas()

export function showDialogWithClose(messg: string, heig: string)
{
    const blocker2 = new UIContainerRect(canvas)
    blocker2.height = heig
    blocker2.width = "80%"
    blocker2.color = Color4.FromHexString("#FFFFFFBF")
    blocker2.positionY = 80
    blocker2.opacity = 0.9

    const message2 = new UIText(blocker2)
    message2.value = messg
    message2.fontSize = 15
    message2.color = Color4.FromHexString("#0000FFFF")
    message2.width = "100%"
    message2.paddingLeft = 10
    message2.paddingRight = 10
    message2.textWrapping = true
    message2.vAlign = "center"

    const closeButtonBG2 = new UIContainerRect(blocker2)
    closeButtonBG2.height = 30
    closeButtonBG2.width = 100
    closeButtonBG2.color = Color4.FromHexString("#de3737FF")
    closeButtonBG2.vAlign = "bottom"
    closeButtonBG2.isPointerBlocker = true

    const clickClose2 = new UIImage(closeButtonBG2, new Texture(""))
    clickClose2.name = "clickClose"
    clickClose2.width = 100
    clickClose2.height = 30
    clickClose2.opacity = 0.1
    clickClose2.isPointerBlocker = true
    clickClose2.onClick = new OnPointerDown(() => {
        sada()
        blocker2.visible = false
    })

    const closeText2 = new UIText(closeButtonBG2)
    closeText2.value = "Close"
    closeText2.fontSize = 15
    closeText2.vAlign = "center"
    closeText2.hAlign = "center"
    closeText2.positionY = 15
    closeText2.paddingLeft = 25
    closeText2.isPointerBlocker = false
}

export function changeSada(newFunc: Function): void
{
    sada = newFunc
}

export function scene2GetBusted(heig: string)
{
    const blocker2 = new UIContainerRect(canvas)
    blocker2.height = heig
    blocker2.width = "80%"
    blocker2.color = Color4.FromHexString("#FFFFFFBF")
    blocker2.positionY = 80
    blocker2.opacity = 0.9

    const message2 = new UIText(blocker2)
    message2.value = "You have alerted the guards!\n\nRestart and try to be quieter."
    message2.fontSize = 15
    message2.color = Color4.FromHexString("#0000FFFF")
    message2.width = "100%"
    message2.paddingLeft = 10
    message2.paddingRight = 10
    message2.textWrapping = true
    message2.vAlign = "center"

    const closeButtonBG2 = new UIContainerRect(blocker2)
    closeButtonBG2.height = 30
    closeButtonBG2.width = 100
    closeButtonBG2.color = Color4.FromHexString("#42adf5FF")
    closeButtonBG2.vAlign = "bottom"
    closeButtonBG2.isPointerBlocker = true

    const clickClose2 = new UIImage(closeButtonBG2, new Texture(""))
    clickClose2.name = "clickClose"
    clickClose2.width = 100
    clickClose2.height = 30
    clickClose2.opacity = 0.1
    clickClose2.isPointerBlocker = true
    clickClose2.onClick = new OnPointerDown(() => {
        sada()
        blocker2.visible = false
    })

    const closeText2 = new UIText(closeButtonBG2)
    closeText2.value = "Restart"
    closeText2.fontSize = 15
    closeText2.vAlign = "center"
    closeText2.hAlign = "center"
    closeText2.positionY = 15
    closeText2.paddingLeft = 25
    closeText2.isPointerBlocker = false
}