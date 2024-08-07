import Phaser from 'phaser';

export default class Ball extends Phaser.GameObjects.Graphics {
  constructor(scene, radius, x, y) {
    super(scene);

    this.radius = radius;

    // Draw a light green circle
    this.fillStyle(0x90ee90, 1); // Light green color
    this.fillCircle(0, 0, this.radius);

    // Enable physics for the ball
    scene.physics.world.enable(this);

    // Set the ball's properties
    this.body.setCircle(this.radius, -this.radius, -this.radius);
    this.body.setBounce(0.6);
    this.body.setCollideWorldBounds(true);

    this.body.setVelocity(
      Phaser.Math.Between(-300, 300),
      Phaser.Math.Between(-300, 300),
    );

    // Position the ball in the middle of the screen
    this.setPosition(x, y); // Adjust the position to account for the radius

    // Add the ball to the scene
    scene.add.existing(this);
  }
}
