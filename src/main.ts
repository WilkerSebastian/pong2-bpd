import {GamaSource, GameObject} from "gamasource"
import Player from "./scripts/Player"

const game = new GamaSource({
    background: "#000"
})

GamaSource.globalEnv.set("timeRunning", true)

game.addScene("main", () => {

    GameObject.create(Player)

    GameObject.create(Player)
    
})

game.run()