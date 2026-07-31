import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { AnimationMixer } from "three";

export class Player {

    constructor(scene, world){

        this.scene = scene;
        this.world = world;

        this.model = null;

        this.mixer = null;

this.actions = {};

this.currentAction = null;

        this.speed = 0.8;

        this.canMove = true;

        this.keys = {};

        this.joyX = 0;
this.joyY = 0;

        window.addEventListener("keydown",(e)=>{

            this.keys[e.key.toLowerCase()] = true;

        });

        window.addEventListener("keyup",(e)=>{

            this.keys[e.key.toLowerCase()] = false;

        });

    }

    load(){

        return new Promise((resolve,reject)=>{

            const loader = new GLTFLoader();

            loader.load(

                "assets/player.glb",

                (gltf)=>{

                    this.model = gltf.scene;

this.model.scale.set(0.8,0.8,0.8);

this.model.position.set(0,0,0);

this.scene.add(this.model);

// Animations
this.mixer = new AnimationMixer(this.model);

gltf.animations.forEach((clip)=>{

    this.actions[clip.name] =
    this.mixer.clipAction(clip);

});

Object.values(this.actions).forEach(action => {

    action.enabled = true;
    action.clampWhenFinished = false;
    action.setLoop(THREE.LoopRepeat);

});

console.log(gltf.animations.map(a=>a.name));

resolve(this.model);

                },

                undefined,

                reject

            );

        });

    }

update(){

    if(!this.model) return;

    if(this.mixer){

        this.mixer.update(1/60);

    }

    if(!this.canMove) return;

let moveX = 0;
let moveZ = 0;

// Keyboard
if(this.keys["w"]) moveZ -= this.speed;
if(this.keys["s"]) moveZ += this.speed;
if(this.keys["a"]) moveX -= this.speed;
if(this.keys["d"]) moveX += this.speed;

// Joystick
const joystickMultiplier = 0.12;

moveX += this.joyX * this.speed * joystickMultiplier;
moveZ += this.joyY * this.speed * joystickMultiplier;

    const oldX = this.model.position.x;
    const oldZ = this.model.position.z;

    this.model.position.x += moveX;
    this.model.position.z += moveZ;

    const playerPos = this.model.position;

    const playerBox = new THREE.Box3(

        new THREE.Vector3(
            playerPos.x - 0.35,
            0,
            playerPos.z - 0.35
        ),

        new THREE.Vector3(
            playerPos.x + 0.35,
            2,
            playerPos.z + 0.35
        )

    );

if(this.world.checkCollision(playerBox, this.model.position)){
    
        this.model.position.x = oldX;
        this.model.position.z = oldZ;

    }

    this.model.position.x = Math.max(
        -18,
        Math.min(18,this.model.position.x)
    );

    this.model.position.z = Math.max(
        -128,
        Math.min(10,this.model.position.z)
    );

    if(moveX !== 0 || moveZ !== 0){

        this.model.rotation.y =
            Math.atan2(moveX,moveZ);

    }

    const nextAction =
        (moveX !== 0 || moveZ !== 0)
        ? this.actions["Walking"]
        : this.actions["Idle"];

    if(nextAction && nextAction !== this.currentAction){

        if(this.currentAction){

            this.currentAction.fadeOut(0.2);

        }

        nextAction
            .reset()
            .fadeIn(0.2)
            .play();

        this.currentAction = nextAction;

    }

}
}