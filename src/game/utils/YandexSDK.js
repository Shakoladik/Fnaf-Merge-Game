import Phaser from 'phaser';

export default class YandexSDK {
  static TIME_BETWEEN_ADS = 62000; // in milliseconds
  static TIME_UNTIL_AD_COUNTDOWN = 2;

  constructor(scene) {
    this.scene = scene;
    this.timeUntilAdv = YandexSDK.TIME_UNTIL_AD_COUNTDOWN;
    this.ysdk = null;

    this.initializeYandexSDK();
  }

  async initializeYandexSDK() {
    try {
      this.ysdk = await YaGames.init();
      console.log('Yandex SDK initialized');

      this.ysdk.features.LoadingAPI.ready();
      console.log('Game is ready to play');

      this.showFullscreenAd();
    } catch (error) {
      console.error('Error initializing Yandex SDK:', error);
    }
  }

  showFullscreenAd() {
    this.ysdk.adv.showFullscreenAdv({
      callbacks: {
        onClose: () => this.startTimer(),
        onError: (e) => {
          console.log('Error showing adv:', e);
          this.startTimer();
        },
      },
    });
  }

  startTimer() {
    this.scene.input.enable(this.scene); //Enabling inputs and physics
    this.scene.matter.resume();

    this.scene.time.addEvent({
      delay: YandexSDK.TIME_BETWEEN_ADS,
      callback: this.showFullscreenAd,
      callbackScope: this,
    });

    this.scene.time.addEvent({
      delay: YandexSDK.TIME_BETWEEN_ADS - 2000,
      callback: this.startAdCountdown,
      callbackScope: this,
    });
  }

  startAdCountdown() {
    this.scene.input.disable(this.scene); //Disabling inputs and physics
    this.scene.matter.pause();

    const block = this.createCountdownBlock();
    this.scene.tweens.add({
      targets: block,
      alpha: { from: 1, to: 1 },
      duration: 2000,
      onComplete: () => {
        block.destroy();
        this.timeUntilAdv = YandexSDK.TIME_UNTIL_AD_COUNTDOWN;
      },
    });

    this.updateCountdownText();
    this.scheduleTextUpdate();
  }

  createCountdownBlock() {
    const { width, height } = this.scene.game.config;
    return this.scene.add.rectangle(
      width / 2,
      height / 2,
      width,
      height / 10,
      0,
      1,
    );
  }

  updateCountdownText() {
    const { width, height } = this.scene.game.config;
    const text = this.scene.add.text(
      width / 2,
      height / 2,
      `Время до начала рекламы: ${this.timeUntilAdv}`,
    );
    text.setOrigin(0.5, 0.5);
    this.timeUntilAdv -= 1;
    this.scene.tweens.add({
      targets: text,
      alpha: { from: 1, to: 1 },
      duration: 1000,
      onComplete: () => {
        text.destroy();
      },
    });
  }

  scheduleTextUpdate() {
    this.scene.time.addEvent({
      delay: 1000,
      callback: this.updateCountdownText,
      callbackScope: this,
    });
  }
}
