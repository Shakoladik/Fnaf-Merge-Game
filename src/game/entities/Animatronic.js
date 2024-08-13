import Phaser from 'phaser';

import AnimatronicsNames from '../utils/AnimatronicsNames';

export default class Animatronic extends Phaser.Physics.Matter.Sprite {
  constructor(scene, name, x, y) {
    let colliderPoints = null;

    switch (name) {
      case AnimatronicsNames.ENDO:
        colliderPoints = [
          { x: 145, y: 115 },
          { x: 187, y: 115 },
          { x: 188, y: 140 },
          { x: 180, y: 148 },
          { x: 178, y: 169 },
          { x: 166, y: 170 },
          { x: 153, y: 169 },
          { x: 150, y: 148 },
          { x: 143, y: 140 },
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
          { x: -12, y: 10 },
          { x: 10, y: 5 },
          { x: 25, y: 35 },
          { x: 40, y: 5 },
          { x: 62, y: 10 },
          { x: 45, y: 38 },
          { x: 53, y: 62 },
          { x: 48, y: 88 },
          { x: 25, y: 93 },
          { x: 2, y: 88 },
          { x: -3, y: 62 },
          { x: 5, y: 38 },
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
          { x: 12, y: 73 },
          { x: 38, y: 73 },
          { x: 44, y: 87 },
          { x: 52, y: 108 },
          { x: 49, y: 128 },
          { x: 44, y: 135 },
          { x: 25, y: 140 },
          { x: 5, y: 135 },
          { x: 0, y: 128 },
          { x: -2, y: 108 },
          { x: 6, y: 87 },
        ];
        break;
      case AnimatronicsNames.FREDDY:
        colliderPoints = [
          { x: -10, y: 38 },
          { x: 15, y: 28 },
          { x: 25, y: 24 },
          { x: 35, y: 28 },
          { x: 60, y: 38 },
          { x: 45, y: 98 },
          { x: 5, y: 98 },
        ];
        break;
      case AnimatronicsNames.TOY_FREDDY:
        colliderPoints = [
          { x: 0, y: 50 },
          { x: 50, y: 50 },
          { x: 50, y: 100 },
          { x: 0, y: 100 },
          { x: -6, y: 32 },
        ];
        break;
      case AnimatronicsNames.FOXY:
        colliderPoints = [
          { x: 0, y: 50 },
          { x: 50, y: 100 },
          { x: 0, y: 100 },
          { x: -14, y: 23 },
          { x: -10, y: 16 },
          { x: 25, y: 32 },
          { x: 60, y: 16 },
          { x: 64, y: 23 },
          { x: 47, y: 53 },
          { x: 60, y: 65 },
          { x: 25, y: 92 },
          { x: -10, y: 65 },
          { x: 3, y: 53 },
        ];
        break;
      case AnimatronicsNames.MANGLE:
        colliderPoints = [
          { x: -14, y: 23 },
          { x: -10, y: 14 },
          { x: 25, y: 32 },
          { x: 60, y: 14 },
          { x: 64, y: 23 },
          { x: 47, y: 53 },
          { x: 60, y: 65 },
          { x: 25, y: 92 },
          { x: -10, y: 65 },
          { x: 3, y: 53 },
        ];
        break;
      case AnimatronicsNames.GOLDEN_FREDDY:
        colliderPoints = [
          { x: -10, y: 27 },
          { x: 25, y: 10 },
          { x: 60, y: 27 },
          { x: 42, y: 92 },
          { x: 8, y: 92 },
        ];
        break;
      case AnimatronicsNames.PUPPET:
        colliderPoints = [
          { x: 9, y: 60 },
          { x: 41, y: 60 },
          { x: 51, y: 70 },
          { x: 56, y: 100 },
          { x: 49, y: 115 },
          { x: 25, y: 128 },
          { x: 2, y: 115 },
          { x: -4, y: 100 },
          { x: 0, y: 70 },
        ];
        break;
    }

    // Create the Animatronic with custom polygon collider
    super(scene.matter.world, x, y, name, 0, {
      vertices: colliderPoints,
    });

    this.name = name;

    // Ensure the sprite is centered correctly
    this.setOrigin(0.5, 0.5);

    scene.add.existing(this);
  }
}
