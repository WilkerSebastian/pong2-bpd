import { GamaSource } from "gamasource";

export function open_escape_menu() {

    const $escape = document.getElementById("escape-menu")!

    $escape.style.display = "block"

    document.getElementById("resume")!.addEventListener("click", () => {

        const eventEscapePress = new KeyboardEvent('keydown', {
            key: 'Escape', 
            bubbles: true,
            cancelable: true
        });

        window.dispatchEvent(eventEscapePress)

    })

    document.getElementById("back")!.addEventListener("click", () => {

        GamaSource.exit()
        
        $escape.style.display = "none"

        document.getElementById("main-menu")!.style.display = "block"

    })

} 