import { GamaSource, GameObject } from "gamasource";
import Player from "./Player";
import Ball from "./Ball";

export default class Skill {

    private type:SkillTypes
    private player:Player

    constructor(nameSkill:SkillTypes, reference:Player) {

        this.type = nameSkill
        this.player = reference        

    }

    public use() {

        switch (this.type) {
            case "BREAK_TIME":
                
                this.break_time()
                break;
            case "ZAAS":
                
                this.zaas()
                break;
        }

    }

    private break_time() {

        GamaSource.globalEnv.set("timeRunning", false)

        setTimeout(() => GamaSource.globalEnv.set("timeRunning", true), 2000)

    }

    private zaas() {

        const ball = GameObject.getElementByTag<Ball>("BALL")!

        this.player.speed *= 1.1
        ball.velocity.x *= 1.1
        ball.velocity.y *= 1.1
        

        setTimeout(() => {

            this.player.speed /= 1.1
            ball.velocity.x /= 1.1
            ball.velocity.y /= 1.1

        }, 7500)

    }

    public getType() {

        return this.type

    }


}

export type SkillTypes = "BREAK_TIME" | "ZAAS" | "BIG_STICK" | "VECTOR_FREEDOM"