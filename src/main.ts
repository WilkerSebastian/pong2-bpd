import {GamaSource, GameObject} from "gamasource"
import Player from "./scripts/Player"
import Ball from "./scripts/Ball"

const game = new GamaSource({
    background: "#000"
})

GamaSource.globalEnv.set("timeRunning", true)

game.addScene("main", () => {

    GameObject.create(Player)

    GameObject.create(Player)

    GameObject.create(Ball)
    
})

game.run()