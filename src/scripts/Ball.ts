import { BoxCollider2D, GamaSource, GameMath, GameObject, SquareSprite, Vector2 } from "gamasource";

export default class Ball extends GameObject {

    private sprite = new SquareSprite(50, 50, "#fff")
    private collider = new BoxCollider2D()
    private velocity = new Vector2(0, 0)

    start(): void {

        this.transform.set(GamaSource.window.WIDTH / 2, GamaSource.window.HEIGHT / 2)

        this.velocity.set(GameMath.randomInteger(-5, 5), GameMath.randomInteger(-5, 5))
        
        this.setComponent("Rendering", this.sprite)
        this.setComponent("Collision", this.collider)

    }

    protected onCollisionBetween(gameObject: GameObject): void {
        


    }


    update(): void {

        this.applyVelocity()
        
        

    }

    applyVelocity() {

        this.transform.x += this.velocity.x
        this.transform.y += this.velocity.y

    }

}