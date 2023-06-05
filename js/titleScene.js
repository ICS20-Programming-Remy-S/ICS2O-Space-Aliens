/* global phaser */

// Copyright (c) 2023 Remy Skelton All rights reserved
// 
//Created by: Remy Skelton
//Created on: May 2023
//This is the title scene for my game

/** 
* This class is the Splash Scene.
*/
class TitleScene extends Phaser.Scene {

    /** 
  * This method is the construtor.
  */
  constructor() {
    super({ key: 'titleScene' })
    this.titleSceneBackgroundImage = null
    this.titleSceneText = null
    this.titleSceneTextStyle = { font: '200px Times', fill: '#fde4b9', align: 'center' }
  }

    /** 
  *Can be defined on the screen.
  *Uses the method named by the Scene Manager when this Scene Starts,
  * before preload() and create().
  *@param {object} data - Any data passed via ScenePlugin.add() or scenePlugin.start().
  */
  init(data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

    /** 
  *Can be defined on the screen.
  *use it so that is loads assets.
  */
  preload() {
    console.log('Title Scene')
    // Load the image
    this.load.image('alienImage', 'Alien.jpg');
  }

  /** 
*Can be defined on the screen.
*we use to creat the game boject we want.
*@param {object} data - Any data passed via ScenePlugin.add() or scenePlugin.start().
*/
  create(data) {
    // Display the image
    this.add.image(400, 300, 'alienImage');

    this.titleSceneText = this.add.text(1920 / 2, 1080 / 2 + 350, 'Space Alien', this.titleSceneTextStyle).setOrigin(0.5)
  }

    /** 
  *This should be overridden by our other scenes.
  * This method only called once per game step and only while the scene is running.
  * @param {number} time - The current time.
  * @param {number} delta - The delta time in ms since the last frame.
  */
  update(time, delta) {
    if (time > 6000) {
      this.scene.switch('menuScene')
    }
  }
}

export default TitleScene
