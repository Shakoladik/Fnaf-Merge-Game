import Phaser from 'phaser';

import Ball from '../entities/Ball';

export default class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    const ball = new Ball(this, 80, centerY, centerY);
  }
}
