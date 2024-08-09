import Boot from './game/scenes/Boot';
import Preloader from './game/scenes/Preloader';
import Game from './game/scenes/Game';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
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
      debug: true,
    },
  },
  scene: [Boot, Preloader, Game],
};

export default new Phaser.Game(config);
