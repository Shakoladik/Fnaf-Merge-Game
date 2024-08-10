import Phaser from 'phaser';

import AnimatronicsNames from '../utils/AnimatronicsNames';

export default class Preloader extends Phaser.Scene {
  // Preloader is basically a loading screen for the game

  constructor() {
    super('Preloader');
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    //this.add.image(512, 384, 'background');

    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on('progress', (progress) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath('assets');

    this.load.image(
      AnimatronicsNames.ENDO,
      `images/heads/${AnimatronicsNames.ENDO}.png`,
    );
    this.load.image(
      AnimatronicsNames.BB,
      `images/heads/${AnimatronicsNames.BB}.png`,
    );
    this.load.image(
      AnimatronicsNames.BONNIE,
      `images/heads/${AnimatronicsNames.BONNIE}.png`,
    );
    this.load.image(
      AnimatronicsNames.TOY_BONNIE,
      `images/heads/${AnimatronicsNames.TOY_BONNIE}.png`,
    );
    this.load.image(
      AnimatronicsNames.CHIKA,
      `images/heads/${AnimatronicsNames.CHIKA}.png`,
    );
    this.load.image(
      AnimatronicsNames.TOY_CHIKA,
      `images/heads/${AnimatronicsNames.TOY_CHIKA}.png`,
    );
    this.load.image(
      AnimatronicsNames.FREDDY,
      `images/heads/${AnimatronicsNames.FREDDY}.png`,
    );
    this.load.image(
      AnimatronicsNames.TOY_FREDDY,
      `images/heads/${AnimatronicsNames.TOY_FREDDY}.png`,
    );
    this.load.image(
      AnimatronicsNames.FOXY,
      `images/heads/${AnimatronicsNames.FOXY}.png`,
    );
    this.load.image(
      AnimatronicsNames.MANGLE,
      `images/heads/${AnimatronicsNames.MANGLE}.png`,
    );
    this.load.image(
      AnimatronicsNames.GOLDEN_FREDDY,
      `images/heads/${AnimatronicsNames.GOLDEN_FREDDY}.png`,
    );
    this.load.image(
      AnimatronicsNames.PUPPET,
      `images/heads/${AnimatronicsNames.PUPPET}.png`,
    );
    this.load.image('plank', 'images/other/plank.png');
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start('Game');
  }
}
