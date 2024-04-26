import { AudioPlayer, GamaSource, GameObject } from "gamasource"
import Player from "./scripts/Player"
import Ball from "./scripts/Ball"
import Bar from "./scripts/Bar"
import Boote from "./scripts/Boote"
import { selectSkill } from "./ui/selectSkill"
import reborn from "./assets/audio/reborn.wav"
import { controls_view } from "./ui/controls"

let boote = false

GamaSource.globalEnv.set("timeRunning", true)

GamaSource.loader(reborn)

const game = new GamaSource({
    background: "#000"
})

game.addScene("main", () => {

    const background = new AudioPlayer("reborn.wav", 25)

    background.setEventEnd(() => {

        background.playTo(11, 52)

    })

    background.playTo(0, 52)

    GameObject.create(Player)
    
    GameObject.create(boote ? Boote : Player)

    GameObject.create(Ball)

    for (let i = 0;i < 4;i++)
        GameObject.create(Bar)

})

document.querySelectorAll<HTMLButtonElement>(".btn-option").forEach(b => b.addEventListener("click", async() => {

    const res = b.getAttribute("res")!

    if (res == "pvp") {

        GamaSource.globalEnv.set("player1_skill", await selectSkill(true))

        GamaSource.globalEnv.set("player2_skill", await selectSkill(false))

    } else {

        GamaSource.globalEnv.set("player1_skill", await selectSkill(true))

        boote = true

    }

    await controls_view()

    game.run()

}))