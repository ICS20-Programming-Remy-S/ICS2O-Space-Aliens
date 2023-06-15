/* global phaser */

// Copyright (c) 2023 Remy Skelton All rights reserved
// 
// Created by: Remy Skelton
// Created on: May 2023
// This is the title scene for my game

/** 
 * This class is the Title Scene.
 */
class TitleScene extends Phaser.Scene {
  /** 
   * This method is the constructor.
   */
  constructor () {
    super({ key: 'titleScene' })

    this.titleSceneBackgroundImage = null
    this.titleSceneText = null
    this.titleSceneTextStyle = { font: '200px Times', fill: '#fde4b9', align: 'center' }
  }


  /** 
   * Can be defined on the screen.
   * Uses the method named by the Scene Manager when this Scene Starts,
   * before preload() and create().
   * @param {object} data - Any data passed via ScenePlugin.add() or scenePlugin.start().
   */
  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  /** 
   * Can be defined on the screen.
   * Use it to load assets.
   */
  preload () {
    console.log('Title Scene')
		this.load.image('ballonGoldTitle', 'assets/ballon_Gold_image.jpg')
  }

  /** 
   * Can be defined on the screen.
   * Use it to create the game object we want.
   * @param {object} data - Any data passed via ScenePlugin.add() or scenePlugin.start().
   */
  create (data) {
    this.titleSceneBackgroundImage = this.add.sprite(0, 0, 'ballonGoldTitle').setScale(2.75)
    this.titleSceneBackgroundImage.x = 1920 / 2
    this.titleSceneBackgroundImage.y = 1080 / 2

    this.titleSceneText = this.add.text(1920 / 2, (1080 / 2) + 350, "Ballon D'or", this.titleSceneTextStyle).setOrigin(0.5)
  }

  /** 
   * This should be overridden by our other scenes.
   * This method is only called once per game step and only while the scene is running.
   * @param {number} time - The current time.
   * @param {number} delta - The delta time in ms since the last frame.
   */
  update (time, delta) {
    if (time > 12000) {
      this.scene.switch('menuScene')
    }
  }
}

export default TitleScene
