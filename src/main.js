import Boot from './game/scenes/Boot';
import Preloader from './game/scenes/Preloader';
import Game from './game/scenes/Game';
import GameOver from './game/scenes/GameOver';

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  parent: 'game-container',
  backgroundColor: '#ffffff',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: 1 },
      debug: false,
    },
  },
  scene: [Boot, Preloader, Game, GameOver],
};

export default new Phaser.Game(config);
