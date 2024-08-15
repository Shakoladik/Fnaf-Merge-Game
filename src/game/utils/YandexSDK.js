import Phaser from 'phaser';

export default class YandexSDK {
    _TIME_BETWEEN_ADS = 62000; // in milliseconds
    constructor(scene) {
        YaGames.init().then(ysdk => {
        console.log('Yandex SDK initialized');
        window.ysdk = ysdk;
        });
        YaGames.init().then(ysdk => ysdk.adv.showFullscreenAdv({
            callbacks: {
                onClose: () => {
                    this.startTimer(scene);
                },
                onError: (e) => {
                    console.log('Error showing adv: ', e);
                    this.startTimer(scene);
                },
            }
        }));
        
    };

    startTimer(scene) {
        scene.time.addEvent({
            delay: this._TIME_BETWEEN_ADS,
            callback: this.showAdvFunc,
            callbackScope: this,
        });
        scene.time.addEvent({
            delay: this._TIME_BETWEEN_ADS - 2000,
            callback: this.timerUntilAdvCounter(scene),
            callbackScope: this,
        });
        };

    showAdvFunc(scene) {
        YaGames.init().then(ysdk => ysdk.adv.showFullscreenAdv({
            callbacks: {
                onClose: () => {
                    this.startTimer(scene);
                },
                onError: (e) => {
                    console.log('Error showing adv: ', e);
                    this.startTimer(scene);
                },
            },
        }));
    };
    timerUntilAdvCounter(scene) {
        const block = scene.add.rectangle(scene.game.config.width / 2, scene.game.config.height / 2, scene.game.config.width, scene.game.config.height / 10, 0, 1);
        scene.tweens.add({
            targets: this,
            alpha: { from: 1, to: 1 },
            duration: 2000,
            onComplete: () => {
              block.destroy();
            },
          });
        
    }
    
}
   