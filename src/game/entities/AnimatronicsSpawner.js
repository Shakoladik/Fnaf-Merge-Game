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
    this.lastSpawnedAnimatronic = null;

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

      const centerX = this.scene.game.config.width / 2;
      let adjustedX = pointer.worldX;
      if (Math.abs(pointer.worldX - centerX) > this.boxWidth) {
        adjustedX = centerX + Math.sign(pointer.worldX - centerX) * this.boxWidth;
      }

      if (this.canSpawnNewAnimatronic()) {
        const animatronic = new Animatronic(
          this.scene,
          AnimatronicsNames.ENDO,
          adjustedX,
          this.boxHeight,
        );

        this.scene.add.existing(animatronic);
        this.animatronicsMap.set(animatronic.name, animatronic);
        this.lastSpawnedAnimatronic = animatronic;
      }
    }
  }

  canSpawnNewAnimatronic() {
    if (!this.lastSpawnedAnimatronic) {
      return true;
    }

    let animatronicHeight;
    let animatronicY;

    // The previous animatronic may be merged with another one and destroyed
    // In that case we cannot get its height and y coordinate, but we don't actually need them
    try {
      animatronicHeight = this.lastSpawnedAnimatronic.height;
      animatronicY = this.lastSpawnedAnimatronic.y;
    }
    catch {
      // In that case we simply say that we can spawn the next animatronic
      return true;
    }

    const spawnY = this.boxHeight;

    return animatronicY >= spawnY + animatronicHeight;
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
