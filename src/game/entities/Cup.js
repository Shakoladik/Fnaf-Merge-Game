import Phaser from 'phaser';

export default class Cup extends Phaser.Physics.Matter.Sprite {
  constructor(
    scene,
    widthOfScreen,
    heightOfScreen,
    exactPositionX,
    exactPositionY,
    rotation,
  ) {
    const colliderPoints = [
      { x: -960, y: -120 },
      { x: 960, y: -120 },
      { x: 960, y: 120 },
      { x: -960, y: 120 },
    ];
    super(
      scene.matter.world,
      widthOfScreen / exactPositionX,
      heightOfScreen / exactPositionY,
      'plank',
      0,
      {
        vertices: colliderPoints,
        isStatic: true,
      },
    );

    this.setScale(0.3);
    this.setRotation(rotation);
    this.setOrigin(0.5, 0.5);

    scene.add.existing(this);
  }
}
