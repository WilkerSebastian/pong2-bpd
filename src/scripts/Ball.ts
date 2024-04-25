import { BoxCollider2D, GamaSource, GameMath, GameObject, SquareSprite, Vector2 } from "gamasource";
import Bar from "./Bar";
import Player from "./Player";

export default class Ball extends GameObject {

    private sprite = new SquareSprite(50, 50, "#fff")
    private collider = new BoxCollider2D()
    private direction = new Vector2(0, 0)
    private lastCollision:GameObject | null = null
    public velocity = new Vector2(5, 5)

    start(): void {

        this.tag = "BALL"

        this.transform.set(GamaSource.window.WIDTH / 2, GamaSource.window.HEIGHT / 2)

        this.direction.set(
            GameMath.randomInteger(0, 100) % 2 == 0  ? 1 : -1,
            GameMath.randomInteger(0, 100) % 2 == 0 ? 1 : -1
        )
        
        this.setComponent("Rendering", this.sprite)
        this.setComponent("Collision", this.collider)

    }

    protected onCollisionBetween(gameObject: GameObject): void {

        if (this.lastCollision) 
            if (this.lastCollision == gameObject)
                return

        if (gameObject instanceof Bar) {

            if (gameObject.indentifier == 1 || gameObject.indentifier == 4)
                this.direction.y *= -1

            else {

                const player1 = GameObject.getElementByTag<Player>("player1")!
                const player2 = GameObject.getElementByTag<Player>("player2")!

                if (gameObject.indentifier == 2) 
                    player1.addPoints();

                else
                    player2.addPoints();

                player1.start()
                player2.start()
                this.start()

            }

        } else if (gameObject instanceof Player) {

            const { width, height } = gameObject.getComponent("Rendering") as SquareSprite

            const radius = this.sprite.width 

            if (this.transform.x + radius >= gameObject.transform.x && this.transform.x <= gameObject.transform.x + width) {

                const overX = Math.min(this.transform.x + radius - gameObject.transform.x, gameObject.transform.x + width - this.transform.x)

                this.direction.x *= -1

                if (this.transform.x < gameObject.transform.x)
                    this.transform.x -= overX

                else
                    this.transform.x += overX

            }

            if (this.transform.y + radius >= gameObject.transform.y && this.transform.y <= gameObject.transform.y + height) {

                const overY = Math.min(this.transform.y + radius - gameObject.transform.y, gameObject.transform.y + height - this.transform.y)

                if (this.transform.y < gameObject.transform.y)
                    this.transform.x -= overY

                else
                    this.transform.x += overY

            }

        }

        this.lastCollision = gameObject

    }


    update(): void {

        if (GamaSource.globalEnv.get("timeRunning"))
            this.applyVelocity()
        
    }

    applyVelocity() {

        this.transform.x += (this.velocity.x * this.direction.x)
        this.transform.y += (this.velocity.y * this.direction.y)

    }

}