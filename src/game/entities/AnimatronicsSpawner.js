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
    this.isPointerDown = false;
    this.lastPointerPosition = null;

    // Add mouse/touch event listeners
    this.scene.input.on('pointerdown', this.handlePointerDown, this);
    this.scene.input.on('pointerup', this.handlePointerUp, this);
    this.scene.input.on('pointermove', this.handlePointerMove, this);

    // Set up a timer to check for spawning conditions periodically
    this.scene.time.addEvent({
      delay: 10,
      callback: this.checkAndSpawnAnimatronic,
      callbackScope: this,
      loop: true,
    });
  }

  handlePointerDown(pointer) {
    this.isPointerDown = true;
    this.lastPointerPosition = { x: pointer.worldX, y: pointer.worldY };

    if (
      this.lastSpawnedAnimatronic &&
      this.lastSpawnedAnimatronic.body.isStatic
    ) {
      this.isDrawingSpawnLine = true;
      this.spawnLineStartPoint = { x: pointer.worldX, y: this.boxHeight };
      this.updateSpawnLine(pointer);

      // Update the animatronic's position to the starting point of the spawn line
      const clampedX = this.clampX(pointer.worldX);
      this.lastSpawnedAnimatronic.updatePosition(clampedX, this.boxHeight);
    }
  }

  handlePointerMove(pointer) {
    this.lastPointerPosition = { x: pointer.worldX, y: pointer.worldY };

    if (this.isDrawingSpawnLine) {
      this.updateSpawnLine(pointer);

      // Move the last spawned animatronic if it has no physics
      if (
        this.lastSpawnedAnimatronic &&
        this.lastSpawnedAnimatronic.body.isStatic
      ) {
        const clampedX = this.clampX(pointer.worldX);
        this.lastSpawnedAnimatronic.updatePosition(clampedX, this.boxHeight);
      }
    }
  }

  handlePointerUp(pointer) {
    this.isPointerDown = false;

    if (this.isDrawingSpawnLine) {
      this.isDrawingSpawnLine = false;
      this.spawnLineGraphics.clear();

      // Enable physics for the last spawned animatronic
      if (this.lastSpawnedAnimatronic) {
        this.lastSpawnedAnimatronic.enablePhysics();
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
    } catch {
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
        adjustedX =
          centerX + Math.sign(pointer.worldX - centerX) * this.boxWidth;
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

  checkAndSpawnAnimatronic() {
    if (this.canSpawnNewAnimatronic()) {
      const centerX = this.scene.game.config.width / 2;

      const animatronic = new Animatronic(
        this.scene,
        AnimatronicsNames.ENDO,
        centerX,
        this.boxHeight,
        false,
      );

      this.scene.add.existing(animatronic);
      this.animatronicsMap.set(animatronic.name, animatronic);
      this.lastSpawnedAnimatronic = animatronic;

      // If the pointer is still down, start drawing the spawn line
      if (this.isPointerDown && this.lastPointerPosition) {
        this.isDrawingSpawnLine = true;
        this.spawnLineStartPoint = {
          x: this.lastPointerPosition.x,
          y: this.boxHeight,
        };
        this.updateSpawnLine(this.lastPointerPosition);

        // Update the animatronic's position to the starting point of the spawn line
        const clampedX = this.clampX(this.lastPointerPosition.x);
        this.lastSpawnedAnimatronic.updatePosition(clampedX, this.boxHeight);
      }
    }
  }

  clampX(x) {
    const centerX = this.scene.game.config.width / 2;
    const minX = centerX - this.boxWidth;
    const maxX = centerX + this.boxWidth;
    return Math.max(minX, Math.min(x, maxX));
  }
}
