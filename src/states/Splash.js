import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.spritesheet('ghost', 'assets/images/ghost.png', 74, 86)
    this.load.image('sky', 'assets/images/sky1.png')
    this.load.image('platform', 'assets/images/platform.png')
    this.load.image('ground', 'assets/images/ground.png')
  }

  create () {
    this.state.start('Game')
  }
}
