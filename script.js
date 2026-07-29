import * as THREE from "three";
import { Player } from "./player.js";
import { World } from "./world.js";
import { CameraController } from "./camera.js";

// Scene
const scene = new THREE.Scene();
const world = new World(scene);
world.buildGallery();

const canvas = document.createElement("canvas");
canvas.width = 1024;
canvas.height = 512;

const ctx = canvas.getContext("2d");

ctx.fillStyle = "white";
ctx.font = "bold 64px Georgia";
ctx.textAlign = "center";

ctx.fillText("Welcome to", 512, 120);
ctx.fillText("Bonsai's Museum", 512, 210);

const textTexture = new THREE.CanvasTexture(canvas);

const textBoard = new THREE.Mesh(

    new THREE.PlaneGeometry(8,4),

    new THREE.MeshBasicMaterial({

        map:textTexture,
        transparent:true

    })

);

textBoard.position.set(0,5,-75);

scene.add(textBoard)

scene.background = new THREE.Color(0x0a1020);
scene.fog = new THREE.Fog(0x0a1020, 20, 90);

// Camera
const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 6, 12);

const cameraController = new CameraController(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({

    canvas: document.querySelector("#game"),

    antialias: false,

    powerPreference: "high-performance"

});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(1);

renderer.outputColorSpace = THREE.SRGBColorSpace;

// Lights
const light = new THREE.DirectionalLight(0xbfd8ff, 1.8);
light.position.set(5, 10, 5);
scene.add(light);

scene.add(new THREE.AmbientLight(0x8fa4c7, 0.45));

// Ground
// Grass
const grass = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshStandardMaterial({
        color: 0x2f5d34
    })
);

grass.rotation.x = -Math.PI / 2;
scene.add(grass);

// Walkway
const path = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 140),
    new THREE.MeshStandardMaterial({
        color: 0x777777
    })
);

path.rotation.x = -Math.PI / 2;
path.position.set(0, 0.01, -40);

scene.add(path);

// Museum Placeholder
// ======================================
// MUSEUM WALLS
// ======================================

const wallMaterial = new THREE.MeshStandardMaterial({
    color:0xe9e2d0
});

// =====================================


const museumLight = new THREE.PointLight(

    0xffefc8,

    4,

    120

);

museumLight.position.set(0,8,-110);

scene.add(museumLight);


// Front Columns
for(let x=-6;x<=6;x+=4){

    const column = new THREE.Mesh(

        new THREE.CylinderGeometry(0.35,0.35,8,16),

        new THREE.MeshStandardMaterial({
            color:0xf5f0e6
        })

    );

    column.position.set(x,4,-82.8);

    scene.add(column);

}

const roof = new THREE.Mesh(

    new THREE.ConeGeometry(14,4,4),

    new THREE.MeshStandardMaterial({

        color:0x5d4037

    })

);

roof.rotation.y = Math.PI/4;

roof.position.set(0,12,-116.5);

scene.add(roof);

const stairs = new THREE.Mesh(

    new THREE.BoxGeometry(10,0.5,6),

    new THREE.MeshStandardMaterial({

        color:0x9d9d9d

    })

);

stairs.position.set(0,0.25,-82);

scene.add(stairs);

let leftDoor = new THREE.Mesh(

    new THREE.BoxGeometry(1.8,5,0.2),

    new THREE.MeshStandardMaterial({

        color:0x5d4037

    })

);

leftDoor.position.set(-1,2.5,-82.9);

scene.add(leftDoor);

let rightDoor = leftDoor.clone();

rightDoor.position.x = 1;

scene.add(rightDoor);

// =====================================
// ----------------------
// Street Lamp Function
// ----------------------

function createLamp(x, z){

    // Pole
    const pole = new THREE.Mesh(

        new THREE.CylinderGeometry(0.08,0.08,4),

        new THREE.MeshStandardMaterial({
            color:0x333333
        })

    );

    pole.position.set(x,2,z);

    scene.add(pole);

    // Lamp Head
    const head = new THREE.Mesh(

        new THREE.BoxGeometry(0.4,0.3,0.4),

        new THREE.MeshStandardMaterial({
            color:0xffddaa,
            emissive:0xffddaa,
            emissiveIntensity:1
        })

    );

    head.position.set(x,4.1,z);

    scene.add(head);

    // Light
    const light = new THREE.PointLight(

        0xffd27f,
        4,
        15

    );

    light.position.set(x,4,z);

    scene.add(light);

}

createLamp(-3,-5);
createLamp(3,-5);

createLamp(-3,-25);
createLamp(3,-25);

createLamp(-3,-45);
createLamp(3,-45);

// ----------------------
// Rain
// ----------------------

const rainCount = 450;

const rainGeometry = new THREE.BufferGeometry();

const rainPositions = [];

for(let i=0;i<rainCount;i++){

    rainPositions.push(

        (Math.random()-0.5)*100,
        Math.random()*40,
        (Math.random()-0.5)*100

    );

}

rainGeometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(
        rainPositions,
        3
    )

);

const rainMaterial = new THREE.PointsMaterial({

    color:0x99bbff,
    size:0.12

});

const rain = new THREE.Points(
    rainGeometry,
    rainMaterial
);

scene.add(rain);

// =====================================
// PORTRAIT EXHIBIT
// =====================================

// Pedestal
const portraitBase = new THREE.Mesh(

    new THREE.BoxGeometry(3,1,2),

    new THREE.MeshStandardMaterial({

        color:0x5f4630

    })

);

portraitBase.position.set(-8,0.5,-98);

scene.add(portraitBase);


// Frame
const portraitFrame = new THREE.Mesh(

    new THREE.BoxGeometry(4.2,5.2,0.2),

    new THREE.MeshStandardMaterial({

        color:0x9a7a3f

    })

);

portraitFrame.position.set(-8,3.5,-98.8);

scene.add(portraitFrame);


// White Placeholder

const portraitTexture = new THREE.TextureLoader().load(
    "assets/photo1.jpeg"
);

portraitTexture.colorSpace = THREE.SRGBColorSpace;

portraitTexture.anisotropy =
renderer.capabilities.getMaxAnisotropy();

const portrait = new THREE.Mesh(

    new THREE.PlaneGeometry(3.6,4.6),

new THREE.MeshBasicMaterial({

    map: portraitTexture

})

);

portrait.position.set(-8,3.5,-98.68);

scene.add(portrait);

// =====================================
// AUDIO BOOTH
// =====================================

// Pedestal
const audioBase = new THREE.Mesh(

    new THREE.BoxGeometry(3,1,2),

    new THREE.MeshStandardMaterial({
        color:0x5f4630
    })

);

audioBase.position.set(6,0.5,-98);

scene.add(audioBase);


// Screen
const audioScreen = new THREE.Mesh(

    new THREE.BoxGeometry(3,2.5,0.2),

    new THREE.MeshStandardMaterial({
        color:0x222222
    })

);

audioScreen.position.set(6,3,-98.8);

scene.add(audioScreen);


// Headphones
const headphones = new THREE.Mesh(

    new THREE.TorusGeometry(0.6,0.08,16,40),

    new THREE.MeshStandardMaterial({
        color:0x111111
    })

);

headphones.rotation.x = Math.PI/2;

headphones.position.set(6,5,-98.5);

scene.add(headphones);

// =====================================
// POLAROID WALL
// =====================================

// Board
const photoBoard = new THREE.Mesh(

    new THREE.BoxGeometry(11,7,0.3),

    new THREE.MeshStandardMaterial({
        color:0x8b5a2b
    })

);

photoBoard.position.set(0,5,-129.6);

scene.add(photoBoard);

const loader = new THREE.TextureLoader();

const photoTextures = [

    loader.load("assets/photo2.jpeg"),

    loader.load("assets/photo3.jpeg"),

    loader.load("assets/photo4.jpeg"),

    loader.load("assets/photo5.jpeg"),

    loader.load("assets/photo6.jpeg")

];

photoTextures.forEach(texture => {

    texture.colorSpace = THREE.SRGBColorSpace;

    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

});

const polaroids = [];

const positions = [

    [-3.5,5.8],
    [3.5,5.8],

    [0,4],

    [-3.5,2.2],
    [3.5,2.2]

];

positions.forEach((p)=>{

    const photo = new THREE.Mesh(

        new THREE.PlaneGeometry(2.5,3),

new THREE.MeshBasicMaterial({
    map: photoTextures[polaroids.length]
})

    );

    photo.position.set(

        p[0],
        p[1],
        -129.3

    );

    scene.add(photo);

    polaroids.push(photo);

});

// =====================================
// BIRTHDAY CAKE
// =====================================

// Table
const cakeTable = new THREE.Mesh(

    new THREE.BoxGeometry(3,1.2,3),

    new THREE.MeshStandardMaterial({
        color:0x6d4c41
    })

);

cakeTable.position.set(-9,0.6,-122);

scene.add(cakeTable);

const cake = new THREE.Mesh(

    new THREE.CylinderGeometry(
        1,
        1,
        1,
        32
    ),

    new THREE.MeshStandardMaterial({

        color:0xffd6e7

    })

);

cake.position.set(-9,1.7,-122);

scene.add(cake);

const candleFlames = [];

for(let i=-2;i<=2;i++){

    const candle = new THREE.Mesh(

        new THREE.CylinderGeometry(
            0.05,
            0.05,
            0.5,
            12
        ),

        new THREE.MeshStandardMaterial({
            color:0xffffff
        })

    );

    candle.position.set(

        -9 + i*0.25,
        2.15,
        -122

    );

    scene.add(candle);

    const flame = new THREE.Mesh(

        new THREE.SphereGeometry(
            0.08,
            10,
            10
        ),

        new THREE.MeshBasicMaterial({
            color:0xffaa00
        })

    );

    flame.position.set(

        -9 + i*0.25,
        2.45,
        -122

    );

    scene.add(flame);

    candleFlames.push(flame);

}

// =====================================
// LANTERN EXHIBIT
// =====================================

const lanternBase = new THREE.Mesh(

    new THREE.BoxGeometry(2.5,1.2,2.5),

    new THREE.MeshStandardMaterial({
        color:0x6d4c41
    })

);

lanternBase.position.set(9,0.6,-122);

scene.add(lanternBase);

const lanternGroup = new THREE.Group();

const lanternBody = new THREE.Mesh(

    new THREE.SphereGeometry(0.6,20,20),

    new THREE.MeshStandardMaterial({

        color:0xffe082,

        emissive:0xffc107,

        emissiveIntensity:1

    })

);

lanternGroup.add(lanternBody);

const handle = new THREE.Mesh(

    new THREE.TorusGeometry(
        0.35,
        0.03,
        10,
        30
    ),

    new THREE.MeshStandardMaterial({

        color:0x444444

    })

);

handle.rotation.x = Math.PI/2;

handle.position.y = 0.65;

lanternGroup.add(handle);

lanternGroup.position.set(

    9,
    2,
    -122

);

scene.add(lanternGroup);

const lanternLight = new THREE.PointLight(
    0xffd27f,
    3,
    8
);

lanternLight.position.copy(lanternGroup.position);

scene.add(lanternLight);
const lanternParticles = [];

// Player
const player = new Player(scene, world);

await player.load();

// Mobile joystick
const joystick = nipplejs.create({
    zone: document.getElementById("joystick"),
    mode: "static",
    position: { left: "70px", bottom: "70px" },
    color: "white",
    size: 120
});

joystick.on("move", (evt, data) => {

    if (!data.vector) return;

    player.joyX = data.vector.x;
    player.joyY = -data.vector.y;

});

joystick.on("end", () => {

    player.joyX = 0;
    player.joyY = 0;

});

const playAudioButton =
document.getElementById("playAudioButton");

const lanternButton =
document.getElementById("lanternButton");

const letterButton =
document.getElementById("letterButton");

const cakeButton =
document.getElementById("cakeButton");

const letterOverlay =
document.getElementById("letterOverlay");

const closeLetter =
document.getElementById("closeLetter");

let cakeDone = false;

const cakePosition = new THREE.Vector3(
    -9,
    0,
    -122
);

let lanternReleased = false;

playAudioButton.onclick = ()=>{

    if(audioPlaying) return;

    audioPlaying = true;

    audio.play();

};
let audioPlaying = false;

const audio = new Audio("assets/audio.mp3");

audio.onended = () => {

    audioPlaying = false;

    if(
        player.model.position.distanceTo(
            new THREE.Vector3(6,0,-98)
        ) < 3
    ){

        playAudioButton.style.display = "block";

    }

};



cameraController.follow(player);

// Resize
window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});

let ePressed = false;

window.addEventListener("keydown",(e)=>{

    if(e.key.toLowerCase()=="e")
        ePressed = true;

});

window.addEventListener("keyup",(e)=>{

    if(e.key.toLowerCase()=="e")
        ePressed = false;

});

lanternButton.onclick = () => {

    lanternReleased = true;

    lanternButton.style.display = "none";

    lanternBody.material.emissiveIntensity = 4;

    lanternLight.intensity = 0;

};

let openLetter = false;

letterButton.onclick = ()=>{

    letterOverlay.style.display = "flex";

    letterButton.style.display = "none";

    player.canMove = false;

};

closeLetter.onclick = ()=>{

    letterOverlay.style.display = "none";

    player.canMove = true;

};

cakeButton.onclick = ()=>{

    cakeDone = true;

    cakeButton.style.display = "none";

    candleFlames.forEach(flame=>{

        flame.visible = false;

    });

    confetti({

        particleCount:150,

        spread:80,

        origin:{
            y:0.7
        }

    });

};

    // ============================
// MEMORY BOX
// ============================

const memoryBox = new THREE.Group();

const wood = new THREE.MeshStandardMaterial({

    color:0x5b3a1a

});

// Bottom
const boxBase = new THREE.Mesh(

    new THREE.BoxGeometry(3,0.3,2),

    wood

);

boxBase.position.y = 0.15;

memoryBox.add(boxBase);

// Left wall
const leftWall = new THREE.Mesh(

    new THREE.BoxGeometry(0.2,1,2),

    wood

);

leftWall.position.set(-1.4,0.65,0);

memoryBox.add(leftWall);

// Right wall
const rightWall = leftWall.clone();

rightWall.position.x = 1.4;

memoryBox.add(rightWall);

// Back wall
const backWall = new THREE.Mesh(

    new THREE.BoxGeometry(3,1,0.2),

    wood

);

backWall.position.set(0,0.65,-0.9);

memoryBox.add(backWall);

// Front wall
const frontWall = backWall.clone();

frontWall.position.z = 0.9;

memoryBox.add(frontWall);

const lidPivot = new THREE.Group();

lidPivot.position.set(0,1,-0.9);

memoryBox.add(lidPivot);

const lid = new THREE.Mesh(

    new THREE.BoxGeometry(3,0.2,2),

    wood

);

lid.position.z = 1;

lidPivot.add(lid);

memoryBox.position.set(

    0,

    0,

    -120

);

scene.add(memoryBox);



// Animation
function animate() {

    requestAnimationFrame(animate);

    player.update();

    const letterDistance =
player.model.position.distanceTo(

    new THREE.Vector3(
        0,
        0,
        -120
    )

);

const cakeDistance =
player.model.position.distanceTo(cakePosition);

if(cakeDistance < 3 && !cakeDone){

    cakeButton.style.display = "block";

}else{

    cakeButton.style.display = "none";

}

const audioDistance =
player.model.position.distanceTo(

    new THREE.Vector3(
        6,
        0,
        -98
    )

);

if(audioDistance < 3 && !audioPlaying){

    playAudioButton.style.display = "block";

}else{

    playAudioButton.style.display = "none";

}

if(letterDistance < 3){

    letterButton.style.display = "block";

}else{

    letterButton.style.display = "none";

}

const lanternDistance =
player.model.position.distanceTo(

    new THREE.Vector3(
        9,
        0,
        -122
    )

);

if(lanternDistance < 3){

    lanternButton.style.display = "block";

}else{

    lanternButton.style.display = "none";

}

// Automatic Doors
// ----------------------

const dx = player.model.position.x;
const dz = player.model.position.z;

const distance = Math.sqrt(

    (dx * dx) +

    ((dz + 82) * (dz + 82))

);

if(distance < 12){

    leftDoor.position.x = Math.max(

        leftDoor.position.x - 0.05,

        -2.5

    );

    rightDoor.position.x = Math.min(

        rightDoor.position.x + 0.05,

        2.5

    );

}
else{

    leftDoor.position.x = Math.min(

        leftDoor.position.x + 0.05,

        -1

    );

    rightDoor.position.x = Math.max(

        rightDoor.position.x - 0.05,

        1

    );

}

    const positions =
rain.geometry.attributes.position.array;

for(let i=1;i<positions.length;i+=3){

    positions[i]-=0.45;

    if(positions[i]<0){

        positions[i]=40;

    }

}

rain.geometry.attributes.position.needsUpdate=true;

cameraController.update();

if(lanternReleased){

    lanternGroup.position.y += 0.08;
    lanternGroup.position.z -= 0.04;

    lanternLight.position.copy(
        lanternGroup.position
    );

if(Math.random() < 0.12){

    lanternParticles.push({

        mesh:particle,

        life:60,

        vx:(Math.random()-0.5)*0.008,

        vz:(Math.random()-0.5)*0.008

    });

}

}

if(openLetter){

    if(lidPivot.rotation.x > -2){

        lidPivot.rotation.x -= 0.02;

    }

}

    renderer.render(scene, camera);

}

animate();