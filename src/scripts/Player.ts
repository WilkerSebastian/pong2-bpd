import { BoxCollider2D, GamaSource, GameObject, KeyBoard, SquareSprite, Vector2 } from "gamasource";
import Bar from "./Bar";
import Skill from "./Skill";

export default class Player extends GameObject {

    private player1 = false
    private collider = new BoxCollider2D()
    private skill = new Skill("VECTOR_FREEDOM", this)
    public sprite = new SquareSprite(50, 100, "#fff")
    public speed = 5 * GamaSource.window.getScale();
    public points = 0
    public horizontal_move = false

    start() {

        if (!GamaSource.globalEnv.get("createP1")) {
            
            this.player1 = true
            GamaSource.globalEnv.set("createP1", true)

        }
            
        this.transform.set(this.player1 ? GamaSource.window.WIDTH * 0.1 : GamaSource.window.WIDTH * 0.9, GamaSource.window.HEIGHT / 2)
        this.tag = this.player1 ? "player1" : "player2"

        this.setComponent("Rendering", this.sprite)
        this.setComponent("Collision", this.collider)

    }

    update() {

        if (GamaSource.globalEnv.get("timeRunning") || this.skill.getType() == "BREAK_TIME") {
            
            this.movement()

            this.skillAction()

        }
        
    }

    skillAction() {

        if (this.player1) {

            if(KeyBoard.getKeyDown("g") || KeyBoard.getKeyDown("G")) 
                this.skill.use()

            return

        }

        if(KeyBoard.getKeyDown("k") || KeyBoard.getKeyDown("K")) 
            this.skill.use()

    }

    movement() {

        const direction = new Vector2(0, 0)

        if (this.player1) {

            if (KeyBoard.getKeyDown("w") || KeyBoard.getKeyDown("W"))
                direction.y -= this.speed

            if (KeyBoard.getKeyDown("s") || KeyBoard.getKeyDown("S"))
                direction.y += this.speed

            if (this.horizontal_move) {

                if (KeyBoard.getKeyDown("a") || KeyBoard.getKeyDown("A"))
                    direction.x -= this.speed

                if (KeyBoard.getKeyDown("d") || KeyBoard.getKeyDown("D"))
                    direction.x += this.speed

            }

        } else {

            if (KeyBoard.getKeyDown("ArrowUp"))
                direction.y -= this.speed

            if (KeyBoard.getKeyDown("ArrowDown"))
                direction.y += this.speed

            if (this.horizontal_move) {

                if (KeyBoard.getKeyDown("ArrowLeft"))
                    direction.x -= this.speed

                if (KeyBoard.getKeyDown("ArrowRight"))
                    direction.x += this.speed

            }

        }

        this.transform.y += direction.y
        this.transform.x += direction.x

    } 

    protected onCollisionBetween(gameObject: GameObject): void {
        
        if (gameObject instanceof Bar) {

            const top = 50
            const down = gameObject.transform.y - this.sprite.height

            this.transform.y = gameObject.transform.y == 0 ? top : down

        }

    }

    render() {
        super.render()

        GamaSource.ctx.font = "40px ARIAL"
        GamaSource.ctx.fillText(this.player1 ? `${this.points} |` : this.points.toString(), 
        this.player1 ? (GamaSource.window.WIDTH / 2) - 40 : (GamaSource.window.WIDTH / 2) + 20, 
        100)

    }

}