import GamaSource, { BoxCollider2D, GameObject, Sprite, SquareSprite, Vector2 } from "gamasource";

export default class Bar extends GameObject {

    private static index = 0
    private sprite: Sprite | null = null
    private collider = new BoxCollider2D()
    public indentifier = 0

    start(): void {

        const {x, y, width, height} = this.getIndexPostion(Bar.index)

        this.tag = "BAR"

        this.transform = new Vector2(x, y)

        this.sprite = new SquareSprite(width, height, "#fff", this)

        this.setComponent("Rendering", this.sprite)
        this.setComponent("Collision", this.collider)

        Bar.index++
        this.indentifier = Bar.index

    }

    private getIndexPostion(index:number) {

        const sizeBar = GamaSource.window.WIDTH * 0.01

        const yindex = [
            0,
            sizeBar,
            sizeBar,
            GamaSource.window.HEIGHT - sizeBar
        ]

        return {
            x: index == 2 ? GamaSource.window.WIDTH - sizeBar : 0,
            y: yindex[index],
            width: index == 0 || index == 3 ? GamaSource.window.WIDTH : sizeBar,
            height: index == 0 || index == 3 ? sizeBar : GamaSource.window.HEIGHT - sizeBar
        }

    }

}