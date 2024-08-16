import AnimatronicsNames from '../utils/AnimatronicsNames';

import Animatronic from '../entities/Animatronic';

export default class AnimatronicsSpawner {
  constructor(scene) {
    this.scene = scene;
    this.boxHeight = 280;
    this.boxWidth = 140;
    this.animatronicsMap = new Map();
    this.isDrawingSpawnLine = false;
    this.spawnLineStartPoint = null;
    this.spawnLineGraphics = this.scene.add.graphics();
    this.spawnLineLength = 500;
    this.spawnLineWidth = 2;
    this.lastSpawnTime = 0;
    this.spawnCooldown = 320;

    // Add mouse/touch event listeners
    this.scene.input.on('pointerdown', this.handlePointerDown, this);
    this.scene.input.on('pointerup', this.handlePointerUp, this);
    this.scene.input.on('pointermove', this.handlePointerMove, this);
  }

  handlePointerDown(pointer) {
    this.isDrawingSpawnLine = true;
    this.spawnLineStartPoint = { x: pointer.worldX, y: this.boxHeight };
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

      const currentTime = this.scene.time.now;
      if (currentTime - this.lastSpawnTime >= this.spawnCooldown) {
        const centerX = this.scene.game.config.width / 2;
        let adjustedX = pointer.worldX;
        if (Math.abs(pointer.worldX - centerX) > this.boxWidth) {
          adjustedX = centerX + Math.sign(pointer.worldX - centerX) * this.boxWidth;
        }

        const animatronic = new Animatronic(
          this.scene,
          AnimatronicsNames.ENDO,
          adjustedX,
          this.boxHeight,
        );

        this.scene.add.existing(animatronic);
        this.animatronicsMap.set(animatronic.name, animatronic);

        this.lastSpawnTime = currentTime;
      }
    }
  }

  updateSpawnLine(pointer) {
    if (this.spawnLineGraphics && this.spawnLineStartPoint) {
      this.spawnLineGraphics.clear();
      this.spawnLineGraphics.lineStyle(this.spawnLineWidth, 0xffffff);

      const centerX = this.scene.game.config.width / 2;
      let adjustedX = pointer.worldX;
      if (Math.abs(pointer.worldX - centerX) > this.boxWidth) {
        adjustedX = centerX + Math.sign(pointer.worldX - centerX) * this.boxWidth;
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
}
