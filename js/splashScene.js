// Copyright (c) 2023 Remy Skelton All rights reserved
// 
//Created by: Remy Skelton
//Created on: May 2023
//This is the splash scene for my game

/** 
* This class is the Splash Scene.
*/
class SplashScene extends Phaser.Scene {
  /** 
  * This method is the construtor.
  */
  constructor() {
    super({ key: "splashScene" })

    this.splashSceneBackgroundImage = null
  }
  
  /** 
  *Can be defined on the screen.
  *Uses the method named by the Scene Manager when this Scene Starts,
  * before preload() and create().
  *@param {object} data - Any data passed via ScenePlugin.add() or scenePlugin.start().
  */
  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  /** 
  *Can be defined on the screen.
  *use it so that is loads assets.
  */
  preload() {
    console.log("Splash Scene")
    this.load.image('splashSceneBackground', './assets/splashSceneImage.png')
  }

  
/** 
*Can be defined on the screen.
*we use to creat the game boject we want.
*@param {object} data - Any data passed via ScenePlugin.add() or scenePlugin.start().
*/
  create(data) {
    this.splashSceneBackgroundImage = this.add.sprite(0, 0, 'splashSceneBackground')
    this.splashSceneBackgroundImage.x = 1920 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2
    
  }


  /** 
  *This should be overridden by our other scenes.
  * This method only called once per game step and only while the scene is running.
  * @param {number} time - The current time.
  * @param {number} delta - The delta time in ms since the last frame.
  */
   update(time, delta) {
    if (time > 3000)
      this.scene.switch("titleScene")
     const container = document.getElementById("splash-alien");
    container.innerHTML = "";
  }
}

export default SplashScene
