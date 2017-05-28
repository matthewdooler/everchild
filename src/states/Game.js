/* globals __DEV__ */
import Phaser from 'phaser'
import Ghost from '../sprites/Ghost'

export default class extends Phaser.State {

  init () {}
  preload () {}

  create () {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    //game.physics.arcade.gravity.y = 10;

    game.add.sprite(0, 0, 'sky');

    var platforms = game.add.group();
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    game.physics.enable(ground, Phaser.Physics.ARCADE);
    ground.body.immovable = true;
    ground.body.gravityScale = 0;

    // var ledge = platforms.create(400, 400, 'ground');
    // game.physics.enable(ledge, Phaser.Physics.ARCADE);
    // ledge.body.immovable = true;
    // ledge.body.gravityScale = 0;

    // ledge = platforms.create(-150, 250, 'ground');
    // game.physics.enable(ledge, Phaser.Physics.ARCADE);
    // ledge.body.immovable = true;
    // ledge.body.gravityScale = 0;

    this.player = game.add.sprite(64, game.world.height - 300, 'ghost');
    game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.bounce = 0.5;
    this.player.body.friction = 0.5;
    this.player.body.collideWorldBounds = true;
    this.player.moveAcceleration = 500.0
    this.player.moveDeceleration = 0.85
    this.player.body.maxVelocity = 100.0
    //this.player.body.drag = 50.0
    //this.player.body.gravity = 5.0
    this.player.animations.add('left', [1], 10, true);
    this.player.animations.add('right', [0], 10, true);

    this.cursors = game.input.keyboard.createCursorKeys();

    // this.ghost = new Ghost({
    //   game: this,
    //   x: this.world.centerX,
    //   y: this.world.height - 43,
    //   asset: 'ghost'
    // })
    // this.game.add.existing(this.ghost)

  }

  render () {

  }

  update () {

    var moveAcceleration = this.player.moveAcceleration
    var moveDeceleration = this.player.moveDeceleration
    var gravity = 5.0

    var v = this.player.body.velocity
    if (isNaN(v.x)) v.x = 0.0
    if (isNaN(v.y)) v.y = 0.0
    var a = this.player.body.acceleration
    var ax = 0.0
    var ay = 0.0

    if (this.cursors.left.isDown && !this.cursors.right.isDown) {
        ax = -moveAcceleration
        this.player.animations.play('left')
    } else if (this.cursors.right.isDown && !this.cursors.left.isDown) {
        ax = moveAcceleration
        this.player.animations.play('right')
    } else {
        ax = 0.0
        v.x = v.x * moveDeceleration
    }

    if (this.cursors.up.isDown && !this.cursors.down.isDown) ay = -moveAcceleration
    else if (this.cursors.down.isDown && !this.cursors.up.isDown) ay = moveAcceleration
    else {
        ay = 0.0
        v.y = (v.y * moveDeceleration) + gravity
    }

    a.setTo(ax, ay)

    if (a.x > 0.01 && a.x < 0.01) a.x = 0.0
    if (a.y > 0.01 && a.y < 0.01) a.y = 0.0
    if (v.x > 0.01 && v.x < 0.01) v.x = 0.0
    if (v.y > 0.01 && v.y < 0.01) v.y = 0.0

    //console.log(a.x, a.y, v.x, v.y)

    // if (this.cursors.left.isDown) {
    //     this.player.body.moveTo(50, 5)
    //     //this.player.body.moveLeft(150);
    //     this.player.animations.play('left');
    // } else if (this.cursors.right.isDown) {
    //     this.player.body.moveTo(50, 5)
    //     //this.player.body.angularVelocity = 1.0
    //     //this.player.body.moveRight(150);
    //     this.player.animations.play('right');
    // } else {
    //     this.player.animations.stop();
    //     this.player.frame = 4;
    // }
    // if (this.cursors.up.isDown) {
    //     this.player.body.moveUp(350);
    // }
  }

  cap (v, lower, upper) {
      return Math.min(upper, Math.max(lower, v))
  }
}
