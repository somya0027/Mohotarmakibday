import * as THREE from "three";

export class World {

    constructor(scene){

        this.scene = scene;

        this.colliders = [];

        this.wallMaterial = new THREE.MeshStandardMaterial({
            color: 0xe9e2d0
        });

    }

    add(mesh, collider = false){

        this.scene.add(mesh);

        if(collider){
            const box = new THREE.Box3().setFromObject(mesh);

this.colliders.push(box);
        }

    }

    createBox(width, height, depth, x, y, z, material = this.wallMaterial, collider = true){

        const mesh = new THREE.Mesh(

            new THREE.BoxGeometry(width, height, depth),

            material

        );

        mesh.position.set(x, y, z);

        this.add(mesh, collider);

        return mesh;

    }

    buildGallery(){

        // ===== FLOOR =====

        this.createBox(

            30,
            0.3,
            50,

            0,
            0.15,
            -105,

            new THREE.MeshStandardMaterial({
                color:0x7b5b3a
            }),

            false

        );

        // ===== CEILING =====

        this.createBox(

            30,
            0.3,
            50,

            0,
            10,
            -105,
    

            new THREE.MeshStandardMaterial({
                color:0xf5f2ea
            }),

            false

        );

        // ===== LEFT WALL =====

        this.createBox(

            0.5,
            10,
            50,

            -15,
            5,
            -105

        );

        // ===== RIGHT WALL =====

        this.createBox(

            0.5,
            10,
            50,

            15,
            5,
            -105,

        );

        // ===== BACK WALL =====

        this.createBox(

            30,
            10,
            0.5,

            0,
            5,
            -130

        );

    this.createBox(
    13,
    10,
    0.5,
    -8.5,
    5,
    -82.9
); 

this.createBox(
    13,
    10,
    0.5,
    8.5,
    5,
    -82.9
); }

checkCollision(playerBox){

    for(const box of this.colliders){

        if(playerBox.intersectsBox(box)){

            return true;

        }

    }

    return false;}
}