import { GamaSource, GameMath, GameObject } from "gamasource";
import Player from "./Player";
import { SkillTypes } from "./Skill";
import Ball from "./Ball";

export default class Boote extends Player {

    private timeDecision = 0
    private direction = 0
    private skillType:SkillTypes

    constructor() {
        super()

        const rand = GameMath.randomInteger(0, 100)

        if (rand <= 25)
            this.skillType = "BIG_STICK"

        else if (rand <= 50)
            this.skillType = "BREAK_TIME"
        
        else if (rand <= 75)
            this.skillType = "VECTOR_FREEDOM"
            
        else 
            this.skillType = "ZAAS"

    }

    start(): void {
        
        super.start()

        this.skill.setSkill(this.skillType)

    }

    update(): void {

        super.update()

        this.timeDecision++

        if (this.timeDecision >= 250) {

            const correct = GameMath.randomInteger(0, 100) % 5 == 0

            const ball = GameObject.getElementByTag<Ball>("BALL")!

            if (correct) {

                if (this.skill.getPorcentSkill() == 1)
                    this.skill.use() 

                if (this.transform.y > ball.transform.y)
                    this.direction = -1
                
                else if (this.transform.y < ball.transform.y)
                    this.direction = 1

                else
                    this.direction = 0

            }

        }

        if (GamaSource.globalEnv.get("timeRunning"))
            this.transform.y += this.direction * this.speed

    }

    movement(): void {
        
    }

}