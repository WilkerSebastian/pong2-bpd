export function controls_view() {

    const $controls = document.getElementById("controls-modal")!

    $controls.style.display = "block"

    return new Promise<void>(resolve => {

        document.querySelector<HTMLButtonElement>("#controls-close")!.addEventListener("click", e => {

            $controls.style.display = "none"

            resolve()

        }, {once:true})


    })

} 