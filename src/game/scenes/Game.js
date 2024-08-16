import Phaser from 'phaser';

import AnimatronicsNames from '../utils/AnimatronicsNames';

import Box from '../entities/Box';
import Animatronic from '../entities/Animatronic';
import AnimatronicsSpawner from '../entities/AnimatronicsSpawner';
import Smoke from '../entities/Smoke';

export default class Game extends Phaser.Scene {
  constructor() {
    super('Game');

    this.animatronicsSpawner = null;
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0, 0);

    const box = new Box(
      this,
      this.game.config.width / 2,
      this.game.config.height / 2 + 180,
    );

    this.animatronicsSpawner = new AnimatronicsSpawner(this);

    // Add collision event listener
    this.matter.world.on(
      'collisionstart',
      this.handleAnimatronicsCollision,
      this,
    );

    this.cameras.main.zoom = 1.3;
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

        const centerX = (animatronicA.x + animatronicB.x) / 2;
        const centerY = (animatronicA.y + animatronicB.y) / 2;

        const currentIndex = Object.values(AnimatronicsNames).indexOf(
          animatronicA.name,
        );
        const nextIndex =
          (currentIndex + 1) % Object.values(AnimatronicsNames).length;
        const nextName = Object.values(AnimatronicsNames)[nextIndex];

        const newAnimatronic = new Animatronic(
          this,
          nextName,
          centerX,
          centerY,
        );

        // Add Smoke
        const smoke = new Smoke(this, centerX, centerY);

        // Add the new animatronic to the scene and the map
        this.add.existing(newAnimatronic);
        this.animatronicsSpawner.animatronicsMap.set(nextName, newAnimatronic);

        // Destroy the colliding animatronics
        animatronicA.destroy();
        animatronicB.destroy();

        // Remove the destroyed animatronics from the map
        this.animatronicsSpawner.animatronicsMap.delete(animatronicA.name);
        this.animatronicsSpawner.animatronicsMap.delete(animatronicB.name);
      }
    });
  }
}
