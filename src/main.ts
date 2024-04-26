import {GamaSource, GameObject} from "gamasource"
import Player from "./scripts/Player"
import Ball from "./scripts/Ball"
import Bar from "./scripts/Bar"
import Boote from "./scripts/Boote"
import { selectSkill } from "./ui/selectSkill"

const game = new GamaSource({
    background: "#000"
})

GamaSource.globalEnv.set("timeRunning", true)

game.addScene("main", () => {

    GameObject.create(Player)

    if (GamaSource.globalEnv.get("boote"))
        GameObject.create(Boote)
    
    else
        GameObject.create(Player)

    GameObject.create(Ball)

    for (let i = 0;i < 4;i++)
        GameObject.create(Bar)

})

document.querySelectorAll<HTMLButtonElement>(".btn-option").forEach(b => b.addEventListener("click", async() => {

    const res = b.getAttribute("res")!

    switch (res) {

        case "pvp":

            GamaSource.globalEnv.set("player1_skill", await selectSkill(true))

            GamaSource.globalEnv.set("player2_skill", await selectSkill(false))

            document.getElementById("skill-select")!.style.display = "none"

            GamaSource.globalEnv.set("boote", false)

            game.run()

            break;

        case "pia":

            GamaSource.globalEnv.set("player1_skill", await selectSkill(true))

            document.getElementById("skill-select")!.style.display = "none"

            GamaSource.globalEnv.set("boote", true)

            game.run()

            break;

    }

}))