import { GamaSource, GameMath } from "gamasource";
import Player from "./Player";

export default class Boote extends Player {

    private timeDecision = 0
    private direction = 0

    start(): void {
        super.start()

        this.skill.setSkill("BIG_STICK")

    }

    update(): void {

        super.update()

        this.timeDecision++

        if (this.timeDecision >= 50) {

            const rand = GameMath.randomInteger(0, 100)

            if (rand > 50)
                this.skill.use()
    
            if (rand <= 40)
                this.direction = 1

            else if (rand <= 80)
                this.direction = -1

            else
                this.direction = 0

            this.timeDecision = 0

        }

        if (GamaSource.globalEnv.get("timeRunning"))
            this.transform.y += this.direction * this.speed

    }

    movement(): void {
        
    }

}