import Phaser from 'phaser';

import AnimatronicsNames from '../utils/AnimatronicsNames';

import Box from '../entities/Box';
import Animatronic from '../entities/Animatronic';
import Smoke from '../entities/Smoke';
import YandexSDK from '../utils/YandexSDK';

export default class Game extends Phaser.Scene {
  constructor() {
    super('Game');

    // These variables are used for restricting player to spawn animatronics outside the box for them
    this.boxHeight = 250;
    this.boxWidth = 160; // The allowed spawning range along the X-axis from the center

    // This map is used to go through animatronics names and spawn animatronics
    // with names based on what names of two collided animatronics were
    this.animatronicsMap = new Map();

    // These properties are used for drawing a line below the mouse cursor or pointer touch coordinates
    this.isDrawingSpawnLine = false;
    this.spawnLineStartPoint = null;
    this.spawnLineGraphics = null;
    this.spawnLineLength = 600;
    this.spawnLineWidth = 2;

    // Timer-related properties
    this.lastSpawnTime = 0;
    this.spawnCooldown = 320; // Cooldown time in milliseconds
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0, 0);

    const box = new Box(
      this,
      this.game.config.width / 2,
      this.game.config.height / 2 + 180,
    );

    // Add collision event listener
    this.matter.world.on(
      'collisionstart',
      this.handleAnimatronicsCollision,
      this,
    );

    // Add mouse/touch event listeners
    this.input.on('pointerdown', this.handlePointerDown, this);
    this.input.on('pointerup', this.handlePointerUp, this);
    this.input.on('pointermove', this.handlePointerMove, this);

    this.spawnLineGraphics = this.add.graphics();

    this.cameras.main.zoom = 1.3;
    const yandex = new YandexSDK(this);
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

      // Check if the cooldown period has passed
      const currentTime = this.time.now;
      if (currentTime - this.lastSpawnTime >= this.spawnCooldown) {
        // Adjust the pointer X position if it is outside the allowed spawning range
        const centerX = this.game.config.width / 2;
        let adjustedX = pointer.x;
        if (Math.abs(pointer.x - centerX) > this.boxWidth) {
          adjustedX = centerX + Math.sign(pointer.x - centerX) * this.boxWidth;
        }

        // Spawn an animatronic at the adjusted mouse position
        const animatronic = new Animatronic(
          this,
          AnimatronicsNames.ENDO,
          adjustedX,
          this.boxHeight,
        );

        // Add the new animatronic to the scene and the map
        this.add.existing(animatronic);
        this.animatronicsMap.set(animatronic.name, animatronic);

        // Update the last spawn time
        this.lastSpawnTime = currentTime;
      }
    }
  }

  updateSpawnLine(pointer) {
    if (this.spawnLineGraphics && this.spawnLineStartPoint) {
      this.spawnLineGraphics.clear();
      this.spawnLineGraphics.lineStyle(this.spawnLineWidth, 0xffffff);

      // Adjust the pointer X position if it is outside the allowed spawning range
      const centerX = this.game.config.width / 2;
      let adjustedX = pointer.x;
      if (Math.abs(pointer.x - centerX) > this.boxWidth) {
        adjustedX = centerX + Math.sign(pointer.x - centerX) * this.boxWidth;
      }

      const endY = this.boxHeight + this.spawnLineLength;
      this.spawnLineGraphics.lineBetween(
        adjustedX,
        this.boxHeight,
        adjustedX,
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

        // Add Smoke
        const smoke = new Smoke(this, centerX, centerY);

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
