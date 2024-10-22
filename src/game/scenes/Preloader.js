import Phaser from 'phaser';

import AnimatronicsNames from '../utils/AnimatronicsNames';
import YandexSDK from '../utils/YandexSDK';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    // Screen dimensions
    const screenWidth = 1920;
    const screenHeight = 1080;

    // Loading bar dimensions
    const barWidth = screenWidth / 3;
    const barHeight = 50;
    const barX = screenWidth / 2;
    const barY = screenHeight / 2;

    // Create the outline of the loading bar
    this.add
      .rectangle(barX, barY, barWidth, barHeight)
      .setStrokeStyle(2, 0x000000)
      .setOrigin(0.5, 0.5);

    // Create the progress bar itself
    const progressBar = this.add
      .rectangle(barX - barWidth / 2, barY, 0, barHeight, 0x00ff00)
      .setOrigin(0, 0.5);

    // Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on('progress', (progress) => {
      // Update the progress bar width based on the progress
      progressBar.width = barWidth * progress;
    });
  }

  async preload() {
    // Load the assets for the game - Replace with your own assets
    this.load.setPath('assets');

    this.load.image('background', 'images/backgrounds/background.png');

    this.load.image('box', 'images/props/empty-box.png');

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

    this.load.image('smoke', 'images/particles/smoke.png');

    this.load.audio('merge', 'audio/merge_sound.wav');

    // Initialize YandexSDK
    const yandexSDK = new YandexSDK(this);
    await yandexSDK.initializeYandexSDK();
    await yandexSDK.getPlayerData();

    // Pass the YandexSDK instance to the Game scene
    this.scene.start('Game', { yandexSDK });
  }

  create() {
    // This method is empty because the scene transition happens in preload
  }
}
