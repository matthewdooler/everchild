/* globals __DEV__ */
import Phaser from 'phaser'
import Ghost from '../sprites/Ghost'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    const bannerText = 'EverChild'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)

    this.ghost = new Ghost({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'ghost'
    })

    this.game.add.existing(this.ghost)
  }

  render () {

  }
}
