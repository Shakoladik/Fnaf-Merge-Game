import Phaser from 'phaser';

import Box from '../entities/Box';
import AnimatronicsSpawner from '../entities/AnimatronicsSpawner';

export default class Game extends Phaser.Scene {
  constructor() {
    super('Game');

    this.animatronicsSpawner = null;
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0, 0);

    new Box(
      this,
      this.game.config.width / 2,
      this.game.config.height / 2 + 150,
    );

    this.animatronicsSpawner = new AnimatronicsSpawner(this);

    this.cameras.main.zoom = 1.7;
  }
}
