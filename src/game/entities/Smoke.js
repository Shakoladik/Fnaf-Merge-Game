import Phaser from 'phaser';

export default class Smoke extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'smoke', 0);
    scene.tweens.add({
      targets: this,
      scale: { from: 1, to: 1.2 },
      duration: 200,
      onComplete: () => {
        this.destroy();
      },
    });

    scene.add.existing(this);
  }
}
