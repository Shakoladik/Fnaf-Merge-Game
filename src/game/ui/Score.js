export default class ScoreManager {
  constructor(scene, localizationManager) {
    this.currentScore = 0;
    this.text = null;
    this.hasSlidIn = false;
    this.localizationManager = localizationManager;
    this.createScore(scene);
  }

  createScore(scene) {
    // Initialize the text off-screen
    this.text = scene.add.text(
      430,
      -50,
      `${this.localizationManager.getText('scoreText')}: ${this.currentScore}`,
      {
        fontSize: 30,
        fontFamily: 'FNAFFont',
        color: 'black',
      },
    );
  }

  updateScore(scene, currentAnimatronicIndex) {
    this.currentScore += 5 * 2 ** currentAnimatronicIndex;

    if (this.text) {
      this.text.destroy();
    }

    // Create the new text off-screen
    this.text = scene.add.text(
      430,
      -50,
      `${this.localizationManager.getText('scoreText')}: ${this.currentScore}`,
      {
        fontSize: 30,
        fontFamily: 'FNAFFont',
        color: 'black',
      },
    );

    if (!this.hasSlidIn) {
      // Slide the text into position
      scene.tweens.add({
        targets: this.text,
        y: 250,
        duration: 300, // Duration of the slide-in animation in milliseconds
        ease: 'Power2',
        onComplete: () => {
          this.hasSlidIn = true;
        },
      });
    } else {
      // If the text has already slid in, just set its position directly
      this.text.setPosition(430, 250);
    }
  }
}
