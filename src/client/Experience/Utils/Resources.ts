import { EventEmitter } from './EventEmitter'

export default class Resources extends EventEmitter {
    items: any[]
    constructor() {
        super()
        this.items = []
    }

    addResource(type: string, url: string) {}
}
