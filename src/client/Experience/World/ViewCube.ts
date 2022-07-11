import gsap from 'gsap'
import './viewCubeStyles.css'
import { EventEmitter } from '../Utils/EventEmitter'
import Experience from '../Experience'

type Orientation = {
    offsetFactor: {
        x: number
        y: number
        z: number
    }
    axisAngle: {
        x: number
        y: number
        z: number
    }
}

const TOP: Orientation = {
    offsetFactor: {
        x: 0,
        y: 0,
        z: 1,
    },
    axisAngle: {
        x: 0,
        y: 0,
        z: 0,
    },
}

const BOTTOM: Orientation = {
    offsetFactor: {
        x: 0,
        y: 0,
        z: -1,
    },
    axisAngle: {
        x: Math.PI,
        y: 0,
        z: 0,
    },
}

const FRONT: Orientation = {
    offsetFactor: {
        x: 0,
        y: -1,
        z: 0,
    },
    axisAngle: {
        x: Math.PI / 2,
        y: 0,
        z: 0,
    },
}

const BACK: Orientation = {
    offsetFactor: {
        x: 0,
        y: 1,
        z: 0,
    },
    axisAngle: {
        x: -(Math.PI / 2),
        y: 0,
        z: Math.PI,
    },
}

const LEFT: Orientation = {
    offsetFactor: {
        x: -1,
        y: 0,
        z: 0,
    },
    axisAngle: {
        x: Math.PI / 2,
        y: -(Math.PI / 2),
        z: 0,
    },
}

const RIGHT: Orientation = {
    offsetFactor: {
        x: 1,
        y: 0,
        z: 0,
    },
    axisAngle: {
        x: Math.PI / 2,
        y: Math.PI / 2,
        z: 0,
    },
}

export class ViewCube extends EventEmitter {
    container: HTMLElement
    camera: THREE.Camera

    constructor(experience: Experience) {
        super()
        this.camera = experience.camera.instance
        this.container = document.getElementById('container') as HTMLElement
        this.createViewCube()
    }

    createViewCube() {
        const viewcubeContainer = document.createElement('div')
        viewcubeContainer.classList.add('viewCubeContainer')
        const front = document.createElement('div')
        front.classList.add('cube__face')
        front.classList.add('cube__face--front')
        front.innerHTML = '<p>Front</p>'
        front.addEventListener('click', () => {
            gsap.to(viewcubeContainer, FRONT)
        })
        const top = document.createElement('div')
        top.classList.add('cube__face')
        top.classList.add('cube__face--top')
        top.innerHTML = '<p>Top</p>'
        const back = document.createElement('div')
        back.classList.add('cube__face')
        back.classList.add('cube__face--back')
        back.innerHTML = '<p>Back</p>'
        back.addEventListener('click', () => {
            gsap.to(viewcubeContainer, BACK)
            console.log(back)
        })
        const bottom = document.createElement('div')
        bottom.classList.add('cube__face')
        bottom.classList.add('cube__face--bottom')
        bottom.innerHTML = '<p>BOTTOM</p>'
        bottom.addEventListener('click', () => {
            console.log('bottom')
            gsap.to(viewcubeContainer, BOTTOM)
        })
        const left = document.createElement('div')
        left.classList.add('cube__face')
        left.classList.add('cube__face--left')
        left.innerHTML = '<p>LEFT</p>'
        const right = document.createElement('div')
        right.classList.add('cube__face')
        right.classList.add('cube__face--right')
        right.innerHTML = '<p>RIGHT</p>'

        viewcubeContainer.appendChild(front)
        viewcubeContainer.appendChild(top)
        viewcubeContainer.appendChild(back)
        viewcubeContainer.appendChild(bottom)
        viewcubeContainer.appendChild(left)
        viewcubeContainer.appendChild(right)

        this.container.appendChild(viewcubeContainer)
    }

    // tweenCamera(orientation: Orientation) {
    //     const { offsetFactor, axisAngle } = orientation

    //     if (cameraRef.current && objectRef.current) {
    //         const offsetUnit = cameraRef.current.position.length()
    //         const offset = new THREE.Vector3(
    //             offsetUnit * offsetFactor.x,
    //             offsetUnit * offsetFactor.y,
    //             offsetUnit * offsetFactor.z
    //         )

    //         const center = new THREE.Vector3()
    //         const finishPosition = center.add(offset)

    //         const positionTween = new TWEEN.Tween(cameraRef.current.position)
    //             .to(finishPosition, 300)
    //             .easing(TWEEN.Easing.Circular.Out)

    //         const euler = new THREE.Euler(axisAngle.x, axisAngle.y, axisAngle.z)

    //         // rotate camera too!
    //         const finishQuaternion = new THREE.Quaternion()
    //             .copy(cameraRef.current.quaternion)
    //             .setFromEuler(euler)

    //         const quaternionTween = new TWEEN.Tween(cameraRef.current.quaternion)
    //             .to(finishQuaternion, 300)
    //             .easing(TWEEN.Easing.Circular.Out)

    //         positionTween.start()
    //         quaternionTween.start()
    //     }
    // }
}
