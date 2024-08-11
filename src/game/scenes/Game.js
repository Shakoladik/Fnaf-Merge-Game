import Phaser from 'phaser';

import AnimatronicsNames from '../utils/AnimatronicsNames';

import Animatronic from '../entities/Animatronic';

export default class Game extends Phaser.Scene {
  constructor() {
    super('Game');
    this.animatronicsMap = new Map();
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0, 0);

    this.matter.world.setBounds(
      0,
      0,
      this.game.config.width,
      this.game.config.height,
      32,
      true,
      true,
      false,
      true,
    );

    // Add mouse/touch click event listener
    this.input.on('pointerdown', this.handleClickOnScreen, this);

    // Add collision event listener
    this.matter.world.on(
      'collisionstart',
      this.handleAnimatronicsCollision,
      this,
    );
  }

  handleClickOnScreen(pointer) {
    const x = pointer.x;
    const y = pointer.y;

    // Create an animatronic at the click location
    const animatronic = new Animatronic(this, AnimatronicsNames.ENDO, x, y);

    // Add the new animatronic to the scene and the map
    this.add.existing(animatronic);
    this.animatronicsMap.set(animatronic.name, animatronic);
  }

  handleAnimatronicsCollision(event) {
    const pairs = event.pairs;

    pairs.forEach((pair) => {
      const bodyA = pair.bodyA;
      const bodyB = pair.bodyB;

      const animatronicA = bodyA.gameObject;
      const animatronicB = bodyB.gameObject;

      if (
        animatronicA instanceof Animatronic &&
        animatronicB instanceof Animatronic &&
        animatronicA.name === animatronicB.name
      ) {
        if (animatronicA.name === AnimatronicsNames.PUPPET) {
          console.log('Player has won!');
          return;
        }

        // Center point between animatronics that have collided
        const centerX = (animatronicA.x + animatronicB.x) / 2;
        const centerY = (animatronicA.y + animatronicB.y) / 2;

        const currentIndex = Object.values(AnimatronicsNames).indexOf(
          animatronicA.name,
        );
        const nextIndex =
          (currentIndex + 1) % Object.values(AnimatronicsNames).length;
        const nextName = Object.values(AnimatronicsNames)[nextIndex];

        // TODO: Add smoke here

        const newAnimatronic = new Animatronic(
          this,
          nextName,
          centerX,
          centerY,
        );

        // Add the new animatronic to the scene and the map
        this.add.existing(newAnimatronic);
        this.animatronicsMap.set(nextName, newAnimatronic);

        // Destroy the colliding animatronics
        animatronicA.destroy();
        animatronicB.destroy();

        // Remove the destroyed animatronics from the map
        this.animatronicsMap.delete(animatronicA.name);
        this.animatronicsMap.delete(animatronicB.name);
      }
    });
  }
}
