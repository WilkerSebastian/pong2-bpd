import { BoxCollider2D, GamaSource, GameMath, GameObject, KeyBoard, SquareSprite, Vector2 } from "gamasource";
import Bar from "./Bar";
import Skill from "./Skill";

export default class Player extends GameObject {

    private player1 = false
    private collider = new BoxCollider2D()
    protected skill = new Skill("BIG_STICK", this)
    private points = 0
    public sprite = new SquareSprite(GamaSource.window.WIDTH  * 0.04, GamaSource.window.HEIGHT * 0.18, "#fff")
    public speed = GamaSource.window.HEIGHT / 120;
    public horizontal_move = false

    start() {

        if (!GamaSource.globalEnv.get("createP1")) {
            
            this.player1 = true
            GamaSource.globalEnv.set("createP1", true)

        }
            
        this.transform.set(this.player1 ? 150 : GamaSource.window.WIDTH - 150, GamaSource.window.HEIGHT / 2)
        this.tag = this.player1 ? "player1" : "player2"

        this.skill.setSkill(this.player1 ? GamaSource.globalEnv.get("player1_skill") : GamaSource.globalEnv.get("player2_skill"))

        this.setComponent("Rendering", this.sprite)
        this.setComponent("Collision", this.collider)

    }

    update() {

        if (GamaSource.globalEnv.get("timeRunning") || this.skill.getType() == "BREAK_TIME") {
            
            this.movement()

            this.skillAction()

        }

        this.collisionWall()

        this.skillUpdate(10)
        
    }

    public skillUpdate(time:number) {

        this.skill.addTime(time)

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

    private collisionWall() {

        const side = GamaSource.window.WIDTH  * 0.04

        if (this.player1) {

            if (this.transform.x + this.sprite.width >= GamaSource.window.WIDTH / 2)
                this.transform.x = (GamaSource.window.WIDTH / 2) - this.sprite.width

            else if (this.transform.x < side)
                this.transform.x = side

        } else {

            if (this.transform.x <= GamaSource.window.WIDTH / 2)
                this.transform.x = (GamaSource.window.WIDTH / 2) + this.sprite.width

            else if (this.transform.x + this.sprite.width > GamaSource.window.WIDTH - side)
                this.transform.x = GamaSource.window.WIDTH - side - this.sprite.width

        }

    }

    protected onCollisionBetween(gameObject: GameObject): void {

        
        if (gameObject instanceof Bar) {

            const top = GamaSource.window.WIDTH * 0.01
            const down = gameObject.transform.y - this.sprite.height

            this.transform.y = gameObject.transform.y == 0 ? top : down

        }

    }

    render() {
        super.render()

        const sizeBar = GamaSource.window.WIDTH * 0.01

        const p1 = GameObject.getElementByTag<Player>("player1")!.points
        const p2 = GameObject.getElementByTag<Player>("player2")!.points

        GamaSource.ctx.font = `${sizeBar * 3}px pixel`
        GamaSource.ctx.fillText(`${p1} | ${p2}`, 
        (GamaSource.window.WIDTH / 2) - sizeBar * 5, 
        sizeBar * 5)

        const xBar = this.player1 ? sizeBar : GamaSource.window.WIDTH - sizeBar - (GamaSource.window.WIDTH * 0.2) 
        const yBar = GamaSource.window.WIDTH * 0.01

        GamaSource.ctx.fillStyle = "#404040"
        GamaSource.ctx.fillRect(xBar, yBar, (GamaSource.window.WIDTH * 0.2), 25)

        if (this.skill.getUsed())
            GamaSource.ctx.fillStyle = GameMath.randomInteger(0,100) % 2 == 0 ? "#FFD830" : "#F4F279"

        else
            GamaSource.ctx.fillStyle = "#FFD830"

        GamaSource.ctx.fillRect(xBar, yBar, (GamaSource.window.WIDTH * 0.2) * this.skill.getPorcentSkill(), 25)

    }

    public addPoints() {

        this.points++
        this.skillUpdate(1000)

    }

}