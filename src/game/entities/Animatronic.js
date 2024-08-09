import Phaser from 'phaser';
import AnimatronicsNames from '../utils/AnimatronicsNames';

export default class Animatronic extends Phaser.Physics.Matter.Sprite {
    constructor(scene, name, x, y) {
        const texture = scene.textures.get(name);
        const frame = texture.get();
        const imageWidth = frame.width;
        const imageHeight = frame.height;

        let colliderPoints = null;

        switch(name) {
            case AnimatronicsNames.ENDO:
                colliderPoints = [
                    { x: 145, y: 120 },
                    { x: 190, y: 120 },
                    { x: 190, y: 145 },
                    { x: 180, y: 175 },
                    { x: 155, y: 175 },
                    { x: 145, y: 145 },
                ];
                break;
            case AnimatronicsNames.BB:
                colliderPoints = [
                    { x: 0, y: 50 },
                    { x: 50, y: 50 },
                    { x: 50, y: 100 },
                    { x: 0, y: 100 },
                ];
                break;
            case AnimatronicsNames.BONNIE:
                colliderPoints = [
                    { x: 0, y: 50 },
                    { x: 50, y: 50 },
                    { x: 50, y: 100 },
                    { x: 0, y: 100 },
                ];
                break;
            case AnimatronicsNames.TOY_BONNIE:
                colliderPoints = [
                    { x: 0, y: 50 },
                    { x: 50, y: 50 },
                    { x: 50, y: 100 },
                    { x: 0, y: 100 },
                ];
                break;
            case AnimatronicsNames.CHIKA:
                colliderPoints = [
                    { x: 0, y: 50 },
                    { x: 50, y: 50 },
                    { x: 50, y: 100 },
                    { x: 0, y: 100 },
                ];
                break;
            case AnimatronicsNames.TOY_CHIKA:
                colliderPoints = [
                    { x: 0, y: 50 },
                    { x: 50, y: 50 },
                    { x: 50, y: 100 },
                    { x: 0, y: 100 },
                ];
                break;
            case AnimatronicsNames.FREDDY:
                colliderPoints = [
                    { x: 0, y: 50 },
                    { x: 50, y: 50 },
                    { x: 50, y: 100 },
                    { x: 0, y: 100 },
                ];
                break;
            case AnimatronicsNames.TOY_FREDDY:
                colliderPoints = [
                    { x: 0, y: 50 },
                    { x: 50, y: 50 },
                    { x: 50, y: 100 },
                    { x: 0, y: 100 },
                ];
                break;
            case AnimatronicsNames.FOXY:
                colliderPoints = [
                    { x: 0, y: 50 },
                    { x: 50, y: 50 },
                    { x: 50, y: 100 },
                    { x: 0, y: 100 },
                ];
                break;
            case AnimatronicsNames.MANGLE:
                colliderPoints = [
                    { x: 0, y: 50 },
                    { x: 50, y: 50 },
                    { x: 50, y: 100 },
                    { x: 0, y: 100 },
                ];
                break;
            case AnimatronicsNames.GOLDEN_FREDDY:
                colliderPoints = [
                    { x: 0, y: 50 },
                    { x: 50, y: 50 },
                    { x: 50, y: 100 },
                    { x: 0, y: 100 },
                ];
                break;
            case AnimatronicsNames.PUPPET:
                colliderPoints = [
                    { x: 0, y: 50 },
                    { x: 50, y: 50 },
                    { x: 50, y: 100 },
                    { x: 0, y: 100 },
                ];
                break;
        }

        // Calculate the center of the image
        const centerX = imageWidth / 2;
        const centerY = imageHeight / 2;

        // Adjust the collider points to be relative to the center of the image
        const adjustedColliderPoints = colliderPoints.map(point => {
            return {
                x: point.x - centerX,
                y: point.y - centerY
            };
        });

        // Create the Animatronic with custom polygon collider
        super(scene.matter.world, x, y, name, 0, {
            vertices: adjustedColliderPoints,
            isStatic: true,
            //label: 'Animatronic Collider'
        });

        // Ensure the sprite is centered correctly
        this.setOrigin(0.5, 0.5);

        scene.add.existing(this);
    }
}
