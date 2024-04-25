import { GamaSource, GameObject } from "gamasource";
import Player from "./Player";
import Ball from "./Ball";

export default class Skill {

    private type:SkillTypes
    private player:Player
    private MAX_TIME_SKILL:number
    private time_load:number
    private used = false

    constructor(nameSkill:SkillTypes, reference:Player) {

        this.type = nameSkill
        this.player = reference        
        this.MAX_TIME_SKILL = this.getMaxTime()
        this.time_load = 0

    }

    public use() {

        if (this.used || this.time_load != this.MAX_TIME_SKILL)
            return

        switch (this.type) {
            case "BREAK_TIME":
                
                this.break_time()
                break;
            case "ZAAS":
                
                this.zaas()
                break;
            case "BIG_STICK":
                this.big_stick()

                break;
             case "VECTOR_FREEDOM":
                    this.vector_freedom()
    
                    break;
        }

        this.used = true

    }

    private break_time() {

        GamaSource.globalEnv.set("timeRunning", false)

        setTimeout(() => {
            
            GamaSource.globalEnv.set("timeRunning", true)
            this.time_load = 0
            this.used = false
            
        }, 2000)

    }

    private zaas() {

        const ball = GameObject.getElementByTag<Ball>("BALL")!

        const boost = 1.75

        this.player.speed *= boost
        ball.velocity.x *= boost
        ball.velocity.y *= boost
        

        setTimeout(() => {

            this.player.speed /= boost
            ball.velocity.x /= boost
            ball.velocity.y /= boost
            this.time_load = 0
            this.used = false

        }, 7500)

    }

    private big_stick() {

        this.player.sprite.height *= 2

        this.player.speed /= 1.1

        setTimeout(() => {
            
            this.player.sprite.height /= 2
            this.player.speed *= 1.1
            this.time_load = 0
            this.used = false
            
        }, 10000)

    }

    private vector_freedom() {

        this.player.horizontal_move = true

        setTimeout(() => {
            
            this.player.horizontal_move = false
            this.time_load = 0
            this.used = false
            
        }, 7000)

    }

    public addTime(time:number) {

        if (this.time_load + time > this.MAX_TIME_SKILL) {

            this.time_load = this.MAX_TIME_SKILL
            return
        
        }

        this.time_load += time

    }

    public setSkill(skill:SkillTypes) {

        this.type = skill

    }

    public getPorcentSkill() {

        return this.time_load / this.MAX_TIME_SKILL

    }

    private getMaxTime() {

        switch (this.type) {
            case "BREAK_TIME":
                return 8000

            case "ZAAS":
                return 10000    
            
            case "BIG_STICK":
                return 6000

             case "VECTOR_FREEDOM":
                return 10000
        }

    }

    public getType() {

        return this.type

    }

}

export type SkillTypes = "BREAK_TIME" | "ZAAS" | "BIG_STICK" | "VECTOR_FREEDOM"