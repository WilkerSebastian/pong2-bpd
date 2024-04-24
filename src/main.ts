import {GamaSource, GameObject} from "gamasource"
import Player from "./scripts/Player"
import Ball from "./scripts/Ball"
import Bar from "./scripts/Bar"

const game = new GamaSource({
    background: "#000"
})

GamaSource.globalEnv.set("timeRunning", true)

game.addScene("main", () => {

    GameObject.create(Player)

    GameObject.create(Player)

    GameObject.create(Ball)

    for (let i = 0;i < 4;i++)
        GameObject.create(Bar)
    
    console.log(GamaSource.GameObjects);
    

})

game.run()