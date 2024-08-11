import Phaser from 'phaser';

import AnimatronicsNames from '../utils/AnimatronicsNames';

import Animatronic from '../entities/Animatronic';

export default class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  async create() {
    this.matter.world.setBounds(
      0,
      0,
      this.game.config.width,
      this.game.config.height,
      32,
      true,
      true,
      false,
      true,
    );

    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    const customObject = new Animatronic(
      this,
      AnimatronicsNames.ENDO,
      centerX,
      centerY,
    );
  }
}
