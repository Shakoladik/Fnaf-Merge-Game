import Phaser from 'phaser';

import AnimatronicsNames from '../utils/AnimatronicsNames';

import Animatronic from '../entities/Animatronic';

export default class Game extends Phaser.Scene {
  constructor() {
    super('Game');

    // These variables are used for restricting player to spawn animatronics outside the box for them
    this.boxHeight = 300;
    // TODO: Add vars for X axis

    // This map is used to go through animatronics names and spawn animatronics
    // with names based on what names of two collided animatronics were
    this.animatronicsMap = new Map();

    // These properties are used for drawing a line below the mouse cursor or pointer touch coordinates
    this.isDrawingSpawnLine = false;
    this.spawnLineStartPoint = null;
    this.spawnLineGraphics = null;
    this.spawnLineLength = 400;
    this.spawnLineWidth = 5;
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0, 0);

    this.matter.world.setBounds(
      0,
      0,
      this.game.config.width,
      this.game.config.height,
      32,
      true,
      true,
      false,
      true,
    );

    // Add collision event listener
    this.matter.world.on('collisionstart', this.handleAnimatronicsCollision, this);

    // Add mouse/touch event listeners
    this.input.on('pointerdown', this.handlePointerDown, this);
    this.input.on('pointerup', this.handlePointerUp, this);
    this.input.on('pointermove', this.handlePointerMove, this);

    this.spawnLineGraphics = this.add.graphics();
  }

  handlePointerDown(pointer) {
    this.isDrawingSpawnLine = true;
    this.spawnLineStartPoint = { x: pointer.x, y: this.boxHeight };
    this.updateSpawnLine(pointer);
  }

  handlePointerMove(pointer) {
    if (this.isDrawingSpawnLine) {
      this.updateSpawnLine(pointer);
    }
  }

  handlePointerUp(pointer) {
    if (this.isDrawingSpawnLine) {
      this.isDrawingSpawnLine = false;
      this.spawnLineGraphics.clear();

      // Spawn an animatronic at the final mouse position
      const animatronic = new Animatronic(
        this,
        AnimatronicsNames.ENDO,
        pointer.x,
        this.boxHeight,
      );

      // Add the new animatronic to the scene and the map
      this.add.existing(animatronic);
      this.animatronicsMap.set(animatronic.name, animatronic);
    }
  }

  updateSpawnLine(pointer) {
    if (this.spawnLineGraphics && this.spawnLineStartPoint) {
      this.spawnLineGraphics.clear();
      this.spawnLineGraphics.lineStyle(this.spawnLineWidth, 0x0000ff);
      const endY = this.boxHeight + this.spawnLineLength;
      this.spawnLineGraphics.lineBetween(
        pointer.x,
        this.boxHeight,
        pointer.x,
        endY,
      );
      this.spawnLineGraphics.strokePath();
    }
  }

  handleAnimatronicsCollision(event) {
    const pairs = event.pairs;

    pairs.forEach((pair) => {
      const bodyA = pair.bodyA;
      const bodyB = pair.bodyB;

      const animatronicA = bodyA.gameObject;
      const animatronicB = bodyB.gameObject;

      if (
        animatronicA instanceof Animatronic &&
        animatronicB instanceof Animatronic &&
        animatronicA.name === animatronicB.name
      ) {
        if (animatronicA.name === AnimatronicsNames.PUPPET) {
          console.log('Player has won!');
          return;
        }

        const centerX = (animatronicA.x + animatronicB.x) / 2;
        const centerY = (animatronicA.y + animatronicB.y) / 2;

        const currentIndex = Object.values(AnimatronicsNames).indexOf(
          animatronicA.name,
        );
        const nextIndex =
          (currentIndex + 1) % Object.values(AnimatronicsNames).length;
        const nextName = Object.values(AnimatronicsNames)[nextIndex];

        const newAnimatronic = new Animatronic(
          this,
          nextName,
          centerX,
          centerY,
        );

        // Add the new animatronic to the scene and the map
        this.add.existing(newAnimatronic);
        this.animatronicsMap.set(nextName, newAnimatronic);

        // Destroy the colliding animatronics
        animatronicA.destroy();
        animatronicB.destroy();

        // Remove the destroyed animatronics from the map
        this.animatronicsMap.delete(animatronicA.name);
        this.animatronicsMap.delete(animatronicB.name);
      }
    });
  }
}
