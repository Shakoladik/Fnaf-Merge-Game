import Phaser from 'phaser';

export default class Smoke extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'smoke', 0);

    // Time is in milliseconds
    this.growthSpeed = 150;
    this.vanishingSpeed = 300;

    // Set initial state that the smoke will start it's tween from
    this.initialScale = 0.5;

    this.setScale(this.initialScale);

    scene.tweens.add({
      targets: this,
      scale: { from: this.initialScale, to: 1.3 },
      duration: this.growthSpeed,
    });

    scene.tweens.add({
      targets: this,
      delay: this.growthSpeed + 20,
      alpha: { from: 1, to: 0 },
      duration: this.vanishingSpeed,
      onComplete: () => {
        this.destroy();
      },
    });
    scene.add.existing(this);
  }
}
