import Phaser from 'phaser';

import AnimatronicsNames from '../utils/AnimatronicsNames';

export default class Animatronic extends Phaser.Physics.Matter.Sprite {
    constructor(scene, name, x, y) {
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
                    { x: 5, y: 57 },
                    { x: 32, y: 52 },
                    { x: 47, y: 56 },
                    { x: 52, y: 100 },
                    { x: 45, y: 120 },
                    { x: 25, y: 128 },
                    { x: 7, y: 120 },
                    { x: 0, y: 100 },
                ];
                break;
            case AnimatronicsNames.BONNIE:
                colliderPoints = [
                    { x: -11, y: 18 },
                    { x: 10, y: 10 },
                    { x: 40, y: 10 },
                    { x: 61, y: 18 },
                    { x: 47, y: 93 },
                    { x: 3, y: 93 },
                ];
                break;
            case AnimatronicsNames.TOY_BONNIE:
                colliderPoints = [
                    { x: -13, y: 54 },
                    { x: 6, y: 58 },
                    { x: 25, y: 100 },
                    { x: 44, y: 58 },
                    { x: 63, y: 54 },
                    { x: 45, y: 157 },
                    { x: 25, y: 163 },
                    { x: 5, y: 157 },
                ];
                break;
            case AnimatronicsNames.CHIKA:
                colliderPoints = [
                    { x: 0, y: 70 },
                    { x: 15, y: 48 },
                    { x: 35, y: 48 },
                    { x: 50, y: 70 },
                    { x: 52, y: 85 },
                    { x: 48, y: 100 },
                    { x: 38, y: 109 },
                    { x: 25, y: 110 },
                    { x: 12, y: 109 },
                    { x: 2, y: 100 },
                    { x: -2, y: 85 },
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

        // Create the Animatronic with custom polygon collider
        super(scene.matter.world, x, y, name, 0, {
            vertices: colliderPoints,
            isStatic: false,
        });

        // Ensure the sprite is centered correctly
        this.setOrigin(0.5, 0.5);

        scene.add.existing(this);
    }
}
