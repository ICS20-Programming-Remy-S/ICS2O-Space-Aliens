/* global phaser */

/**
 * This class is the Menu Scene.
 */
class MenuScene extends Phaser.Scene {
  constructor () {
    super({ key: 'menuScene' })

		this.menuSceneBackgroundImage = null
    this.startButton = null
  }

  /**
   * Can be defined on the screen.
   * Uses the method named by the Scene Manager when this Scene Starts,
   * before preload() and create().
   * @param {object} data - Any data passed via ScenePlugin.add() or scenePlugin.start().
   */
  init (data) {
    this.cameras.main.setBackgroundColor('#808080')
  }

  /**
   * Can be defined on the screen.
   * Use it to load assets.
   */
  preload () {
    console.log('Menu Scene')
		this.load.image('startButton', './assets/startImage.png')
    this.load.image('menuSceneBackground', './assets/Gold-Ball.jpg')
  }

  /**
   * Can be defined on the screen.
   * Use it to create the game objects you want.
   * @param {object} data - Any data passed via ScenePlugin.add() or scenePlugin.start().
   */
  create (data) {
	  this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground').setScale(1.5)
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton').setScale(3.0)
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on('pointerdown', () => this.clickButton())
  }

  /**
   * This should be overridden by our other scenes.
   * This method is only called once per game step and only while the scene is running.
   * @param {number} time - The current time.
   * @param {number} delta - The delta time in ms since the last frame.
   */
  update (time, delta) {
  }

  clickButton () {
    this.scene.start('gameScene')
  }
}

export default MenuScene
