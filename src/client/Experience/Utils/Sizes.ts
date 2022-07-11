import { EventEmitter } from './EventEmitter'

export default class Sizes extends EventEmitter {
    width: number
    height: number
    pixelRatio: number

    constructor(container: HTMLElement) {
        super()

        // Setup
        // canvas.styles.width = "100%";
        // canvas.styles.height = "100%";
        // canvas.width = divEl.clientWidth;
        // canvas.height = divEl.clientHeight;
        this.width = container.clientWidth
        this.height = container.clientHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        // Resize event
        window.addEventListener('resize', () => {
            this.width = container.clientWidth
            this.height = container.clientHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)
            this.trigger('resize')
        })
    }
}
