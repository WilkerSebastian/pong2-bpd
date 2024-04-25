import { GamaSource } from "gamasource";
import Player from "./Player";

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
        }

    }

    private break_time() {

        GamaSource.globalEnv.set("timeRunning", false)

        setTimeout(() => GamaSource.globalEnv.set("timeRunning", true), 2000)

    }

    public getType() {

        return this.type

    }


}

export type SkillTypes = "BREAK_TIME" | "RETICON" | "BIG_STICK" | "VECTOR_FREEDOM"