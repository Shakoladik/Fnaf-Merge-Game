import Phaser from 'phaser';

export default class YandexSDK {
  _TIME_BETWEEN_ADS = 62000; // in milliseconds
  _timeUntilAdv = 2;
  constructor(scene) {
    this.scene = scene;
    YaGames.init().then((ysdk) => {
      console.log('Yandex SDK initialized');
      window.ysdk = ysdk;
    });
    YaGames.init().then((ysdk) =>
      ysdk.adv.showFullscreenAdv({
        callbacks: {
          onClose: () => {
            this.startTimer();
          },
          onError: (e) => {
            console.log('Error showing adv: ', e);
            this.startTimer();
          },
        },
      }),
    );
    }

  startTimer() {
    this.scene.time.addEvent({
      delay: this._TIME_BETWEEN_ADS,
      callback: this.showAdvFunc,
      callbackScope: this,
    });
    this.scene.time.addEvent({
      delay: this._TIME_BETWEEN_ADS - 2000,
      callback: this.timerUntilAdvCounter,
      callbackScope: this,
    });
  }

  showAdvFunc() {
    YaGames.init().then((ysdk) =>
      ysdk.adv.showFullscreenAdv({
        callbacks: {
          onClose: () => {
            this.startTimer();
          },
          onError: (e) => {
            console.log('Error showing adv: ', e);
            this.startTimer();
          },
        },
      }),
    );
  }
  timerUntilAdvCounter() {
    const block = this.scene.add.rectangle(
      this.scene.game.config.width / 2,
      this.scene.game.config.height / 2,
      this.scene.game.config.width,
      this.scene.game.config.height / 10,
      0,
      1,
    );
    this.scene.tweens.add({
      targets: this,
      alpha: { from: 1, to: 1 },
      duration: 2000,
      onComplete: () => {
        block.destroy();
        this._timeUntilAdv = 2;
      },
    });
    this.textFunc();
    this.scene.time.addEvent({
      delay: 1000,
      callback: this.textFunc,
      callbackScope: this,
    });
  }
  textFunc() {
    const text = this.scene.add.text(
      this.scene.game.config.width / 2,
      this.scene.game.config.height / 2,
      `Время до начала рекламы: ${this._timeUntilAdv}`,
    );
    this._timeUntilAdv -= 1;
    text.setOrigin(0.5, 0.5);
    this.scene.tweens.add({
      targets: this,
      alpha: { from: 1, to: 1 },
      duration: 1000,
      onComplete: () => {
        text.destroy();
      },
    });
  }
}