import Phaser from 'phaser';

import Box from '../entities/Box';
import AnimatronicsSpawner from '../entities/AnimatronicsSpawner';
import ScoreManager from '../ui/Score';

export default class Game extends Phaser.Scene {
  constructor() {
    super('Game');

    this.animatronicsSpawner = null;
  }

  init(data) {
    this.yandexSDK = data.yandexSDK;
  }

  create() {
    this.yandexSDK.scene = this;
    this.yandexSDK.showFullscreenAd();

    this.add.image(0, 0, 'background').setOrigin(0, 0);

    const scoreManager = new ScoreManager(this);

    new Box(
      this,
      this.game.config.width / 2,
      this.game.config.height / 2 + 150,
    );

    this.animatronicsSpawner = new AnimatronicsSpawner(
      this,
      scoreManager,
      this.yandexSDK,
    );

    this.cameras.main.zoom = 1.7;
  }
}
