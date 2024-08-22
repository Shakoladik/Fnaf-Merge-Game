import AnimatronicsNames from '../utils/AnimatronicsNames';

import Animatronic from '../entities/Animatronic';

export default class AnimatronicsSpawner {
  constructor(scene, scoreManager, yandexSDK) {
    this.scene = scene;
    this.scoreManager = scoreManager;
    this.yandexSDK = yandexSDK;

    this.boxHeight = 280;
    this.boxWidth = 125;

    this.animatronicsMap = new Map();

    this.isDrawingSpawnLine = false;
    this.spawnLineStartPoint = null;
    this.spawnLineGraphics = this.scene.add.graphics();
    this.spawnLineLength = 500;
    this.spawnLineWidth = 2;
    this.lastSpawnedAnimatronic = null;
    this.isPointerDown = false;
    this.lastPointerPosition = null;

    console.log('[SAVED PLAYER DATA]');
    console.log(yandexSDK.savedPlayerDataOnYandex);

    this.loadPlayerData(yandexSDK.savedPlayerDataOnYandex);

    this.scene.input.on('pointerdown', this.handlePointerDown, this);
    this.scene.input.on('pointerup', this.handlePointerUp, this);
    this.scene.input.on('pointermove', this.handlePointerMove, this);

    this.scene.time.addEvent({
      delay: 10,
      callback: this.checkAndSpawnAnimatronic,
      callbackScope: this,
      loop: true,
    });

    this.saveInterval = 5000; // In milliseconds
    this.startSaveTimer();
  }

  startSaveTimer() {
    this.scene.time.addEvent({
      delay: this.saveInterval,
      callback: this.saveData,
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

      const clampedX = this.clampX(pointer.worldX);
      this.lastSpawnedAnimatronic.updatePosition(clampedX, this.boxHeight);
    }
  }

  handlePointerMove(pointer) {
    this.lastPointerPosition = { x: pointer.worldX, y: pointer.worldY };

    if (this.isDrawingSpawnLine) {
      this.updateSpawnLine(pointer);

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

    try {
      animatronicHeight = this.lastSpawnedAnimatronic.height;
      animatronicY = this.lastSpawnedAnimatronic.y;
    } catch {
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

      const possibleAnimatronics = [
        AnimatronicsNames.ENDO,
        AnimatronicsNames.BB,
        AnimatronicsNames.BONNIE,
      ];

      const randomAnimatronicName =
        possibleAnimatronics[
          Math.floor(Math.random() * possibleAnimatronics.length)
        ];

      const animatronic = new Animatronic(
        this.scene,
        randomAnimatronicName,
        centerX,
        this.boxHeight,
        false,
        this.scoreManager,
      );

      this.scene.add.existing(animatronic);
      this.animatronicsMap.set(animatronic.name, animatronic);
      this.lastSpawnedAnimatronic = animatronic;

      if (this.isPointerDown && this.lastPointerPosition) {
        this.isDrawingSpawnLine = true;
        this.spawnLineStartPoint = {
          x: this.lastPointerPosition.x,
          y: this.boxHeight,
        };
        this.updateSpawnLine(this.lastPointerPosition);

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

  saveData() {
    const saveData = this.getCurrentGameState();
    this.yandexSDK.savePlayerData(saveData);
  }

  getCurrentGameState() {
    const animatronics = [];
    this.scene.children.each((child) => {
      if (child instanceof Animatronic && child.y !== this.boxHeight) {
        animatronics.push({
          name: child.name,
          x: child.x,
          y: child.y,
          rotation: child.rotation,
        });
      }
    });

    return {
      score: this.scoreManager.currentScore,
      animatronics: animatronics,
    };
  }

  loadPlayerData(savedData) {
    if (savedData && savedData.animatronics) {
      savedData.animatronics.forEach((animatronicData) => {
        const animatronic = new Animatronic(
          this.scene,
          animatronicData.name,
          animatronicData.x,
          animatronicData.y,
          true,
          this.scoreManager,
        );

        animatronic.setRotation(animatronicData.rotation);
        this.scene.add.existing(animatronic);
        this.animatronicsMap.set(animatronic.name, animatronic);
      });
    }

    if (savedData && savedData.score !== undefined) {
      this.scoreManager.currentScore = savedData.score;
    }
  }
}
