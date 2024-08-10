import Phaser from 'phaser';

import AnimatronicsNames from '../utils/AnimatronicsNames';

import Animatronic from '../entities/Animatronic';

import Cup from '../entities/Cup';

export default class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  async create() {
    this.matter.world.setBounds(0, 0, this.game.config.width, this.game.config.height, 32, true, true, false, true);

    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    const customObject = new Animatronic(this, AnimatronicsNames.BB, centerX, centerY);
    const cupPart1 = new Cup(this, this.scale.width, this.scale.height, 3, 2, Math.PI/2);
    const cupPart2 = new Cup(this, this.scale.width, this.scale.height, 2, 1.365, 0);
    const cupPart3 = new Cup(this, this.scale.width, this.scale.height, 1.5, 2, Math.PI/2*3);

    
   

    // TODO: Delete when I'm done with setting colliders up
    // this.cameras.main.zoom = 4;
  }
}