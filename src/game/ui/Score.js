import Phaser from 'phaser';

export default class ScoreManager {
  constructor(scene) {
    this.currentScore = 0;
    this.text = null;
    this.createScore(scene);
  }

  createScore(scene) {
    const { width, height } = scene.game.config;
    this.text = scene.add.text(
      width / 3.75,
      height / 2.5,
      `Счёт: ${this.currentScore}`,
      { fontSize: 30, color: 'black' },
    );
  }

  updateScore(scene, currentAnimatronicIndex) {
    this.currentScore += 5 * 2 ** currentAnimatronicIndex;
    if (this.text) {
      this.text.destroy();
    }
    const { width, height } = scene.game.config;
    this.text = scene.add.text(
      width / 3.75,
      height / 2.5,
      `Счёт: ${this.currentScore}`,
      { fontSize: 30, color: 'black' },
    );
  }
}
