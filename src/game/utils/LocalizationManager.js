export default class LocalizationManager {
  _gameLang = 'ru';
  _gameTexts = {
    ru: {
      scoreText: 'Счёт',
      gameOverText1: 'ИГРА ОКОНЧЕНА',
      gameOverText2: 'Нажмите сюда, чтобы начать заново',
      advText: 'Время до рекламы',
    },
    en: {
      scoreText: 'Score',
      gameOverText1: 'GAME OVER',
      gameOverText2: 'Click here to start over',
      advText: 'Time until ad',
    },
    tr: {
      scoreText: 'Puan',
      gameOverText1: 'Oyun bitti',
      gameOverText2: 'Baştan başlamak için buraya tıklayın',
      advText: 'Reklama kadar zaman',
    },
  };

  constructor(lang) {
    this._gameLang = lang;
  }

  getText(text) {
    return this._gameTexts[this._gameLang][text];
  }
}
