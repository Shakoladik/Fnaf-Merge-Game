export default class ScoreManager {
  constructor(scene) {
    this.currentScore = 0;
    this.text = null;
    this.createScore(scene);
  }

  createScore(scene) {
    this.text = scene.add.text(430, 250, `Счёт: ${this.currentScore}`, {
      fontSize: 30,
      fontFamily: 'FNAFFont',
      color: 'black',
    });
  }

  updateScore(scene, currentAnimatronicIndex) {
    this.currentScore += 5 * 2 ** currentAnimatronicIndex;
    if (this.text) {
      this.text.destroy();
    }
    this.text = scene.add.text(430, 250, `Счёт: ${this.currentScore}`, {
      fontSize: 30,
      fontFamily: 'FNAFFont',
      color: 'black',
    });
  }
}
