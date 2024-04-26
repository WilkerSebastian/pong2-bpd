import { SkillTypes } from "../scripts/Skill"

export function selectSkill(player1:boolean) {

    return new Promise<SkillTypes>(resolve => {

        document.getElementById("main-menu")!.style.display = "none"
        document.getElementById("skill-select")!.style.display = "block"

        document.querySelector(".player-title")!.textContent = `Select the power of ${player1 ? "PLAYER 1" : "PLAYER 2"}`

        document.querySelectorAll<HTMLButtonElement>(".card")!.forEach(b => {

            b.addEventListener("click", e => {

                const skt = b.getAttribute("skill") as SkillTypes

                resolve(skt)

            }, {once:true})

        })

    })

}