import Experience from './Experience/Experience'

// const canvas = document.querySelector('canvas.webgl') || new HTMLCanvasElement()

const experience = new Experience(document.getElementById('container') as HTMLElement)
const play = document.getElementById('play') as HTMLButtonElement
play.addEventListener('click', () => {
    experience.world.animationData.startAnimation()
})

// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
// import AdvancedEditor from './advancedEditor'
// import Axios from 'axios'
// import { CubeTextureLoader, Plane, Vector3 } from 'three'
// import { log } from 'console'
// import { gsap } from 'gsap'
// import GSDevTools from 'gsap/GSDevTools'

// import { json } from 'stream/consumers'
// type changedObjes = { [key: string]: any }
// const changedObjs: changedObjes = {}
// let model: any = null
// const loadingMan = new THREE.LoadingManager()
// const loader = new GLTFLoader(loadingMan)
// const scene = new THREE.Scene()
// let canvas = document.getElementById('container') as HTMLCanvasElement
// const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
// const geom1 = new THREE.BoxGeometry()
// const geom2 = new THREE.BoxGeometry()

// const mat1 = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide })
// const mat2 = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide })
// const cube1 = new THREE.Mesh(geom1, mat1)
// const cube2 = new THREE.Mesh(geom2, mat2)
// cube1.position.set(0, 0, 0)

// geom2.center()

// let group = new THREE.Group()
// let group2 = new THREE.Group()
// group.attach(cube1)
// group2.attach(cube2)
// group2.position.set(2, 0, 0)
// cube1.name = 'cube1'
// cube2.name = 'cube2'
// cube1.geometry.computeBoundingBox()
// let con1 = (cube1.geometry.boundingBox?.min.y as number) * 1.01
// const cube1LP = new THREE.Plane(new THREE.Vector3(0, -1, 0), con1)
// const cube2LP = new THREE.Plane(
//     new THREE.Vector3(0, 1, 0),
//     (cube2.geometry.boundingBox?.min.y as number) * 1.01
// )
// const myAnim = { data: [] as any[] }
// myAnim.data.push({
//     name: cube1.name,
//     localPlane: cube1LP,
//     duration: 2,
//     delay: 1,
//     constant: cube1.geometry.boundingBox?.min.y,
// })
// myAnim.data.push({
//     name: cube2.name,
//     localPlane: cube2LP,
//     duration: 2,
//     delay: 4,
//     constant: cube2.geometry.boundingBox?.min.y,
// })

// let box = new THREE.Box3(new THREE.Vector3(1, 1, 1))
// let box2 = new THREE.Box3()
// box.setFromObject(cube1)
// box2.setFromObject(cube2)
// // scene.add(viewCube3D)
// let min = box.min.y
// let max = box.max.y
// let tempAnimData = { min: min, max: max }
// let animateObjs = false
// scene.updateMatrixWorld(true)

// console.log(tempAnimData)

// scene.add(group)
// scene.add(group2)
// camera.position.z = 2
// camera.position.x = 2
// camera.position.y = 2
// const dirLight = new THREE.DirectionalLight()
// // loader.load('bridge.glb', (gltf) => {
// //     model = gltf
// //     scene.add(model.scene)
// //     gltf.scene.traverse(function (child) {
// //         if ((child as THREE.Mesh).isMesh) {
// //             const m = child as THREE.Mesh
// //             const g = new THREE.Group()
// //             scene.add(g)
// //             // g.attach(m)
// //             pickableObjects.push(m)
// //             originalMaterials[m.name] = (m as THREE.Mesh).material
// //         }
// //     })
// // })
// const renderer = new THREE.WebGLRenderer()
// renderer.shadowMap.enabled = true
// console.log(canvas.clientWidth, canvas.clientHeight)
// canvas.style.width = canvas.clientWidth + 'px'
// renderer.setSize(canvas.clientWidth, canvas.clientHeight)
// canvas?.appendChild(renderer.domElement)
// render()
// const orbitControls = new OrbitControls(camera, renderer.domElement)
// // controls.addEventListener('change', render)
// const geometry = new THREE.BoxGeometry()
// const material = new THREE.MeshBasicMaterial({
//     color: 0x00ff00,
//     wireframe: true,
// })
// const material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff })
// dirLight.position.z = 50
// var ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
// scene.add(dirLight)

// const transformControls = new TransformControls(camera, renderer.domElement)
// // transformControls.addEventListener('dragging-changed', function (event) {
// //     orbitControls.enabled = !event.value
// // })

// window.addEventListener('keydown', function (event) {
//     switch (event.key) {
//         case 'g':
//             transformControls.setMode('translate')
//             break
//         case 'r':
//             transformControls.setMode('rotate')
//             break
//         case 's':
//             transformControls.setMode('scale')
//             break
//         case 'q':
//             transformControls.setSpace(transformControls.space === 'local' ? 'world' : 'local')
//             break
//     }
// })

// // const axh1 = new THREE.AxesHelper(1)
// // axh1.position.x = 1
// scene.add(ambientLight)
// window.addEventListener('resize', onWindowResize, false)
// function onWindowResize() {
//     camera.aspect = canvas.clientWidth / canvas.clientHeight
//     camera.updateProjectionMatrix()
//     renderer.setSize(window.innerWidth, window.innerHeight)
//     render()
// }

// const pickableObjects: THREE.Mesh[] = []
// let intersectedObject: THREE.Object3D | null
// const originalMaterials: { [id: string]: THREE.Material | THREE.Material[] } = {}
// const highlightedMaterial = new THREE.MeshBasicMaterial({
//     color: 0x00ff00,
// })

// const raycaster = new THREE.Raycaster()
// let intersects: THREE.Intersection[]
// let canvasBounds = canvas.getBoundingClientRect()
// document.addEventListener('mousemove', onDocumentMouseMove, false)
// function onDocumentMouseMove(event: MouseEvent) {
//     raycaster.setFromCamera(
//         {
//             x: ((event.clientX - canvasBounds.left) / renderer.domElement.clientWidth) * 2 - 1,
//             y: -((event.clientY - canvasBounds.top) / renderer.domElement.clientHeight) * 2 + 1,
//         },
//         camera
//     )
//     intersects = raycaster.intersectObjects(pickableObjects, false)
//     if (intersects.length > 0) {
//         intersectedObject = intersects[0].object
//     } else {
//         intersectedObject = null
//     }
//     pickableObjects.forEach((o: THREE.Mesh, i) => {
//         if (intersectedObject && intersectedObject.name === o.name) {
//             pickableObjects[i].material = highlightedMaterial
//         } else {
//             pickableObjects[i].material = originalMaterials[o.name]
//         }
//     })
// }

// // scene.add(axh1)
// console.log(scene)
// scene.traverse(function (child) {
//     if ((child as THREE.Mesh).isMesh) {
//         console.log(child)

//         const m = child as THREE.Mesh
//         pickableObjects.push(m)
//         originalMaterials[m.name] = (m as THREE.Mesh).material
//     }
// })
// transformControls.addEventListener('dragging-changed', function (event) {
//     console.log('Dragging Event')
//     let pos = new THREE.Vector3()
//     let quar = new THREE.Quaternion()
//     transformControls.object?.getWorldPosition(pos)
//     transformControls.object?.getWorldQuaternion(quar)
//     var rotation = new THREE.Euler().setFromQuaternion(quar)
//     console.log('pos', pos, quar, rotation)

//     orbitControls.enabled = !event.value
//     if (transformControls.object !== undefined) {
//         box = new THREE.Box3().setFromObject(transformControls.object)
//         min = box.min.y
//         max = box.max.y
//         tempAnimData = { min: min, max: max }
//         // console.log(tempAnimData)
//         localPlane.constant = box.max.y
//         // console.log('Change Event 1')
//     }
//     render()
// })
// transformControls.addEventListener('change', (e) => {
//     let name = transformControls.object?.uuid
//     changedObjs[name as string] = transformControls.object as THREE.Object3D
//     if (transformControls.object !== undefined) {
//         box = new THREE.Box3().setFromObject(transformControls.object)
//         min = box.min.y
//         max = box.max.y
//         // tempAnimData = { min: min, max: max }
//         localPlane.constant = box.max.y
//         // console.log(tempAnimData)
//         // console.log('Change Event')
//     }
//     render()
// })
// document.addEventListener('click', onDocumentMouseClick, false)
// function onDocumentMouseClick(event: MouseEvent) {
//     raycaster.setFromCamera(
//         {
//             x: ((event.clientX - canvasBounds.left) / renderer.domElement.clientWidth) * 2 - 1,
//             y: -((event.clientY - canvasBounds.top) / renderer.domElement.clientHeight) * 2 + 1,
//         },
//         camera
//     )
//     intersects = raycaster.intersectObjects(pickableObjects, false)

//     if (intersects.length > 0) {
//         intersectedObject = intersects[0].object
//     } else {
//         intersectedObject = null
//         // transformControls.detach()
//     }
//     pickableObjects.forEach((o: THREE.Mesh, i) => {
//         if (intersectedObject && intersectedObject.name === o.name) {
//             console.log(intersectedObject)
//             // o.matrixAutoUpdate = false
//             // const boxH = new THREE.BoxHelper(intersectedObject, 0xffff00)
//             // scene.add(boxH)
//             // console.log(boxH)

//             transformControls.attach(intersectedObject)
//             let position = new THREE.Vector3()
//             // intersectedObject.getWorldPosition(position)
//             ;(intersectedObject as THREE.Mesh).geometry.computeBoundingBox()
//             let max: THREE.Vector3 =
//                 (intersectedObject as THREE.Mesh).geometry.boundingBox?.max.clone() ||
//                 new THREE.Vector3()
//             let min: THREE.Vector3 =
//                 (intersectedObject as THREE.Mesh).geometry.boundingBox?.min.clone() ||
//                 new THREE.Vector3()
//             let mid = new THREE.Vector3()
//             mid.addVectors(max, min).divideScalar(2)
//             position = mid
//             // mid.applyMatrix4(transformControls.object?.matrixWorld || new THREE.Matrix4())
//             // position = mid
//             // ;(intersectedObject as THREE.Mesh).geometry.computeBoundingBox()
//             // ;(intersectedObject as THREE.Mesh).geometry.center()
//             // ;(intersectedObject as THREE.Mesh).position.copy(position)
//             transformControls.position.set(position.x, position.y, position.z)
//             console.log(min, max, mid, position)
//             console.log(transformControls.object)
//             // console.log(transformControls)
//             scene.add(transformControls)
//             render()
//         } else {
//             pickableObjects[i].material = originalMaterials[o.name]
//         }
//     })
// }
// let localPlane = new THREE.Plane(new Vector3(0, -1, 0), Math.round(box.min.y * 100) / 100)
// let localPlane2 = new THREE.Plane(new Vector3(0, 1, 0), Math.round(box2.min.y * 100) / 100)

// console.log(localPlane.constant, localPlane2.constant)
// let origColor = cube1.material.clone()
// let origColor2 = cube2.material.clone()

// function animate() {
//     requestAnimationFrame(animate)
//     if (animateObjs) {
//         // if (localPlane.constant < box.max.y || localPlane2.constant < box2.max.y) {
//         //     console.log(localPlane.constant, localPlane2.constant)
//         //     // localPlane.constant += 0.01
//         //     mat1.clippingPlanes = [localPlane]
//         //     mat2.clippingPlanes = [localPlane2]
//         //     cube1.material.color.set(0x008e00)
//         //     cube2.material.color.set(0x008e00)
//         //     // cube1.material.wireframe = true
//         //     cube1.material = mat1
//         // } else {
//         //     cube1.material = origColor
//         //     cube2.material = origColor2
//         //     const boxL = new THREE.Box3().setFromObject(cube1)
//         //     const box2L = new THREE.Box3().setFromObject(cube2)
//         //     localPlane.constant = boxL.max.y
//         //     localPlane2.constant = box2L.max.y
//         //     animateObjs = false
//         // }
//     }
//     // cube1.rotation.x += 0.01
//     // cube1.rotation.y += 0.01
//     orbitControls.update()
//     render()
// }

// let s1 = document.getElementById('keyframe')
// s1?.addEventListener('click', (e) => {
//     animateObjs = !animateObjs
//     for (let i: number = 0; i < myAnim.data.length; i++) {
//         // console.log(JSON.stringify(myAnim.data[i]) as string)
//         let ob: THREE.Mesh = scene.getObjectByName(myAnim.data[i].name) as THREE.Mesh
//         let lp = myAnim.data[i].localPlane
//         let dur = myAnim.data[i].duration
//         let dela = myAnim.data[i].delay
//         console.log('s1 clicked', lp.constant, dur, dela)
//         console.log(cube1.geometry.boundingBox?.min.y)
//         let mat = ob.material as THREE.MeshBasicMaterial
//         mat.clippingPlanes = [lp]
//         gsap.to(lp, {
//             duration: dur,
//             delay: dela,
//             constant: ob.geometry.boundingBox?.max.y,
//         })
//         console.log('s1 clicked', lp.constant, dur, dela)
//         // GSDevTools.create()
//         // console.log(JSON.stringify(myAnim))
//     }
//     // if (animateObjs) {
//     //     if (localPlane.constant >= box.max.y && localPlane2.constant >= box.max.y) {
//     //         localPlane.constant = box.min.y - (box.max.y - box.min.y) / 10
//     //         localPlane2.constant = box2.min.y - (box2.max.y - box2.min.y)
//     //         console.log('box2', box2)

//     //         gsap.to(localPlane, { duration: 2, delay: 0, constant: box.max.y })
//     //         gsap.to(localPlane2, { duration: 1, delay: 2, constant: box2.max.y })
//     //     } else {
//     //         localPlane.constant = box.min.y - (box.max.y - box.min.y) / 10
//     //         localPlane2.constant = box2.min.y - (box2.max.y - box2.min.y)
//     //         gsap.to(localPlane, { duration: 2, constant: box.max.y })
//     //         gsap.to(localPlane2, { duration: 1, delay: 2, constant: box2.max.y })
//     //         console.log(localPlane, localPlane2)
//     //         console.log('Continue')
//     //     }
//     // }
// })

// let s2 = document.getElementById('trans')
// s2?.addEventListener('click', (e) => {
//     console.log(changedObjs)
//     // console.log(e)

//     for (let obj in changedObjs) {
//         if (obj !== undefined) {
//             let cur = changedObjs[obj]
//             console.log(cur)
//         }
//     }
//     // cube1.position.set(1.07, 1.2, 1.1)
//     gsap.to(cube1.position, { duration: 2, x: -1.07, y: 1.2, z: -1.1 })
//     gsap.to(cube1.rotation, { duration: 2, x: 0.6363785122569393 })

//     let ae = new AdvancedEditor()

//     transformControls.detach()
//     transformControls.attach(group)
//     console.log(ae.rotation, ae.translation)
//     render()
// })

// renderer.localClippingEnabled = true

// function render() {
//     renderer.render(scene, camera)
// }

// render()
// animate()
