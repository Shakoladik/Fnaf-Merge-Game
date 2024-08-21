import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' });
  }

  create() {
    // Create the "Game over" text
    const gameOverText = this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY - 50,
        'Game Over',
        { fontFamily: 'Arial', fontSize: 48, color: '#000000' },
      )
      .setOrigin(0.5);

    // Create the "Click here to restart" text
    const restartText = this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY + 50,
        'Click here to restart',
        { fontFamily: 'Arial', fontSize: 24, color: '#000000' },
      )
      .setOrigin(0.5);

    // Make the entire scene interactive
    this.input.on('pointerdown', () => {
      // Restart the game or go back to the main game scene
      this.scene.start('Game');
    });
  }
}
