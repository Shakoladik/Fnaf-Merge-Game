import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' });
  }

  init(data) {
    this.localizationManager = data.localizationManager;
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0, 0);

    this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY - 30,
        this.localizationManager.getText('gameOverText1'),
        { fontFamily: 'FNAFFont', fontSize: 100, color: '#000000' },
      )
      .setOrigin(0.5);

    this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY + 60,
        this.localizationManager.getText('gameOverText2'),
        { fontFamily: 'FNAFFont', fontSize: 35, color: '#000000' },
      )
      .setOrigin(0.5);

    // Make the entire scene interactive
    this.input.on('pointerdown', () => {
      // Restart the game or go back to the main game scene
      this.scene.start('Preloader');
    });
  }
}
