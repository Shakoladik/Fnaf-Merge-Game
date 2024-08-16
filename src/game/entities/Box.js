import Phaser from 'phaser';

export default class Box extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y) {
    super(scene.matter.world, x, y, 'box', 0, {
      isStatic: true,
    });

    this.setOrigin(-0.5, 0); // For the sprite

    // Define the custom body with three rectangle colliders
    const { Bodies, Body } = Phaser.Physics.Matter.Matter;

    // Create three rectangles for the body
    const rect1 = Bodies.rectangle(this.width / 2, 510, this.width, 10, {
      isStatic: true,
    });
    const rect2 = Bodies.rectangle(this.width - 5, 300, 10, this.height - 115, {
      isStatic: true,
    });
    const rect3 = Bodies.rectangle(5, 300, 10, this.height - 115, {
      isStatic: true,
    });

    // Combine the rectangles into a single compound body
    const compoundBody = Body.create({
      parts: [rect1, rect2, rect3],
      isStatic: true,
    });

    // Set the custom body to the sprite
    this.setExistingBody(compoundBody);
    this.setPosition(x, y);

    scene.add.existing(this);
  }
}
