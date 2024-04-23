import { GamaSource, Sprite, Vector2 } from "gamasource";

export default function isNotExitWorld(obj:Vector2, sprite:Sprite) {

    let width = 0
    let height = 0

    if (sprite) {

        width = sprite.width
        height = sprite.height

    }

    return (
        obj.x + width < GamaSource.window.WIDTH &&
        obj.x > 0 &&
        obj.y + height < GamaSource.window.HEIGHT &&
        obj.y > 0
    )

}