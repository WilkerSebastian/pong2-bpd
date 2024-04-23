import { GamaSource, GameObject, KeyBoard, SquareSprite, Vector2 } from "gamasource";
import isNotExitWorld from "./isNotExitWorld";

export default class Player extends GameObject {

    private player1 = false
    private speed = 5 * GamaSource.window.getScale();
    private sprite = new SquareSprite(50, 100, "#fff")

    start() {

        if (!GamaSource.globalEnv.get("createP1")) {
            
            this.player1 = true
            GamaSource.globalEnv.set("createP1", true)

        }
            

        this.transform.set(this.player1 ? GamaSource.window.WIDTH * 0.1 : GamaSource.window.WIDTH * 0.9, GamaSource.window.HEIGHT / 2)
        
        this.setComponent("Rendering", this.sprite)

    }

    update() {

        if (GamaSource.globalEnv.get("timeRunning"))
            this.movement()
        
    }

    movement() {

        const direction = new Vector2(0, 0)

        if (this.player1) {

            if (KeyBoard.getKeyDown("w") || KeyBoard.getKeyDown("W"))
                direction.y -= this.speed

            if (KeyBoard.getKeyDown("s") || KeyBoard.getKeyDown("S"))
                direction.y += this.speed

        } else {

            if (KeyBoard.getKeyDown("ArrowUp"))
                direction.y -= this.speed

            if (KeyBoard.getKeyDown("ArrowDown"))
                direction.y += this.speed

        }
    
        if (isNotExitWorld(this.transform.add(direction), this.sprite)) {

            this.transform.x += direction.x
            this.transform.y += direction.y

        }

    }

}