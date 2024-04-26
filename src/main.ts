import { AudioPlayer, GamaSource, GameObject } from "gamasource"
import Player from "./scripts/Player"
import Ball from "./scripts/Ball"
import Bar from "./scripts/Bar"
import Boote from "./scripts/Boote"
import { selectSkill } from "./ui/selectSkill"
import reborn from "./assets/audio/reborn.wav"

let start = false
let game:GamaSource

GamaSource.globalEnv.set("timeRunning", true)

GamaSource.loader(reborn)

/*window.addEventListener("keydown", k => {

    if (k.key == "Escape" && start) {

        const $escape = document.getElementById("escape-menu")!

        if ($escape.style.display == "none") {

            GamaSource.stop()

            open_escape_menu()

            return

        } 

        $escape.style.display = "none"

        GamaSource.resume()

    }
        

})*/

document.querySelectorAll<HTMLButtonElement>(".btn-option").forEach(b => b.addEventListener("click", async() => {

    let canvas = document.querySelector("canvas")

    if (canvas)
        canvas.remove()

    const res = b.getAttribute("res")!

    switch (res) {

        case "pvp":

            start = false

            GamaSource.globalEnv.set("player1_skill", await selectSkill(true))

            GamaSource.globalEnv.set("player2_skill", await selectSkill(false))

            document.getElementById("skill-select")!.style.display = "none"

            GamaSource.GameObjects = new Array<GameObject>()

            game = new GamaSource({
                background: "#000"
            })
            
            game.addScene("main", () => {
            
                start = true
            
                const background = new AudioPlayer("reborn.wav", 35)
            
                background.setEventEnd(() => {
            
                    background.playTo(11, 52)
            
                })
            
                background.playTo(0, 52)
            
                GameObject.create(Player)
                
                GameObject.create(Player)
            
                GameObject.create(Ball)
            
                for (let i = 0;i < 4;i++)
                    GameObject.create(Bar)
            
            })

            game.run()

            break;

        case "pia":

            GamaSource.globalEnv.set("player1_skill", await selectSkill(true))

            document.getElementById("skill-select")!.style.display = "none"

            GamaSource.GameObjects = new Array<GameObject>()

            game = new GamaSource({
                background: "#000"
            })
            
            game.addScene("main", () => {
            
                start = true
            
                const background = new AudioPlayer("reborn.wav", 35)
            
                background.setEventEnd(() => {
            
                    background.playTo(11, 52)
            
                })
            
                background.playTo(0, 52)
            
                GameObject.create(Player)
            
                GameObject.create(Boote)
            
                GameObject.create(Ball)
            
                for (let i = 0;i < 4;i++)
                    GameObject.create(Bar)
            
            })

            game.run()

            break;

    }

}))