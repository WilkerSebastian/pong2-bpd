import {GamaSource, GameObject} from "gamasource"
import Player from "./scripts/Player"
import Ball from "./scripts/Ball"
import Bar from "./scripts/Bar"
import Boote from "./scripts/Boote"

const game = new GamaSource({
    background: "#000"
})

GamaSource.globalEnv.set("timeRunning", true)
GamaSource.globalEnv.set("boote", false)

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

document.querySelectorAll<HTMLButtonElement>(".btn-option").forEach(b => b.addEventListener("click", () => {

    const res = b.getAttribute("res")!

    switch (res) {

        case "pvp":

            document.getElementById("main-menu")!.style.display = "none"

            game.run()

            break;

        case "pia":

            document.getElementById("main-menu")!.style.display = "none"

            GamaSource.globalEnv.set("boote", true)

            game.run()

            break;

    }

}))