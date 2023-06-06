/* global phaser */

// Copyright (c) 2023 Remy Skelton All rights reserved
// 
//Created by: Remy Skelton
//Created on: May 2023
//This is the Phaser3 configuration file 

/** 
* This class is the Splash Scene.
*/

class MenuScene extends Phaser.Scene {
  constructor () {
    super({ key: 'menuScene' })
    /** 
  * This method is the construtor.
  */

    this.menuSceneBackgroundImage = null
    this.startButton = null
  }
  
 /** 
  *Can be defined on the screen.
  *Uses the method named by the Scene Manager when this Scene Starts,
  * before preload() and create().
  *@param {object} data - Any data passed via ScenePlugin.add() or scenePlugin.start().
  */
  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

   /** 
  *Can be defined on the screen.
  *use it so that is loads assets.
  */
  preload () {
    console.log('Menu Scene')

    this.load.image('menuSceneBackground', 'assets/aliens_screen_image2.jpg')
    this.load.image('startButton', 'assets/start.png')
  }
  
  /** 
*Can be defined on the screen.
*we use to creat the game boject we want.
*@param {object} data - Any data passed via ScenePlugin.add() or scenePlugin.start().
*/
  create (data) {
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground')
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton')
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on('pointerdown', () => this.clickButton())
  }
 /** 
  *This should be overridden by our other scenes.
  * This method only called once per game step and only while the scene is running.
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