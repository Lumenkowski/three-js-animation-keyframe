import "./main.css"
import {
	Clock,
	BoxGeometry,
	MeshBasicMaterial,
	Mesh,
	NumberKeyframeTrack,
	AnimationClip,
	AnimationMixer,
} from "three"
import { setupScene } from "./setup-scene"

// Canvas

const canvas = document.createElementNS( "http://www.w3.org/1999/xhtml", "canvas" )
document.body.insertBefore( canvas, document.body.firstElementChild )

// Basic setup

const { scene } = setupScene( { canvas } )

//

const clock = new Clock()

const geometry = new BoxGeometry( 2, 2, 2 )
const material = new MeshBasicMaterial( { color: 0xffffff, transparent: true, wireframe: true } )
const mesh = new Mesh( geometry, material )
scene.add( mesh )

// position
const opacityKF = new NumberKeyframeTrack( ".material.opacity", [ 0, 1, 2 ], [ 1, 0, 1 ] )
const clip = new AnimationClip( "Action", 1, [ opacityKF ] )
const mixer = new AnimationMixer( mesh )

const clipAction = mixer.clipAction( clip )
clipAction.play()

const update = () => {

	const delta = clock.getDelta()

	if ( mixer ) {

		mixer.update( delta )
	}

	window.requestAnimationFrame( update )
}

window.requestAnimationFrame( update )
