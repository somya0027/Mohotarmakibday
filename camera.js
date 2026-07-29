import * as THREE from "three";

export class CameraController {

    constructor(camera){

        this.camera = camera;

        this.mode = "follow";

        this.targetPosition = new THREE.Vector3();
        this.lookTarget = new THREE.Vector3();

    }

    follow(player){

        this.mode = "follow";
        this.player = player;

    }

    focus(position, lookAt){

        this.mode = "focus";

        this.targetPosition.copy(position);
        this.lookTarget.copy(lookAt);

    }

    update(){

        if(!this.player) return;

        if(this.mode === "follow"){

            const desired = new THREE.Vector3(

                this.player.model.position.x,
                this.player.model.position.y + 6,
                this.player.model.position.z + 12

            );

            this.camera.position.lerp(desired, 0.12);

            this.camera.lookAt(this.player.model.position);

        }

        if(this.mode === "focus"){

            this.camera.position.lerp(
                this.targetPosition,
                0.05
            );

            this.camera.lookAt(this.lookTarget);

        }

    }

}