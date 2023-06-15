/* global phaser */

// Copyright (c) 2023 Remy Skelton All rights reserved
// 
// Created by: Remy Skelton
// Created on: May 2023
// This is the splash scene for my game

/** 
 * This class is the Splash Scene.
 */
class SplashScene extends Phaser.Scene {
  /** 
   * This method is the constructor.
   */
  constructor () {
    super({ key: 'splashScene' })

    this.macSceneBackgroundImage = null
  }

  /** 
   * Can be defined on the screen.
   * Uses the method named by the Scene Manager when this Scene Starts,
   * before preload() and create().
   * @param {object} data - Any data passed via ScenePlugin.add() or scenePlugin.start().
   */
  init(data) {
  this.cameras.main.setBackgroundColor('#704F00');
}
  /** 
   * Can be defined on the screen.
   * Use it to load assets.
   */
  preload () {
    console.log('Splash Scene')
		this.load.image('macSplash', './assets/mac-Image.png')
  }

  /** 
   * Can be defined on the screen.
   * Use it to create the game object we want.
   * @param {object} data - Any data passed via ScenePlugin.add() or scenePlugin.start().
   */
  create (data) {
    this.macSceneBackgroundImage = this.add.sprite(0, 0, 'macSplash')
    this.macSceneBackgroundImage.x = 1920 / 2
    this.macSceneBackgroundImage.y = 1080 / 2

     // Set the initial alpha to 0 (fully transparent)
  this.macSceneBackgroundImage.alpha = 0

  // Create a fade-in tween
  this.tweens.add({
    targets: this.macSceneBackgroundImage,
    // fully opaque
    alpha: 1,  
    // Duration of the fade-in effect, 2 seconds
    duration: 2000,  
    ease: 'Linear',
    // No repeat
    repeat: 0  
  })

  // Make mac logo fade-out with a delay of 2 seconds after the fade-in effect
  this.tweens.add({
    targets: this.macSceneBackgroundImage,
    // fully transparent
    alpha: 0,  
    // Duration of the fade-out effect in milliseconds (2 seconds)
    duration: 2000, 
    ease: 'Linear',
    // No repeat
    repeat: 0, 
    // Delay of 2000 milliseconds
    delay: 2000  
  })
  }

  /** 
   * This should be overridden by our other scenes.
   * This method is only called once per game step and only while the scene is running.
   * @param {number} time - The current time.
   * @param {number} delta - The delta time in ms since the last frame.
   */
  update (time, delta) {
    if (time > 6000) {
      this.scene.switch('titleScene')
    }
  }
}

export default SplashScene
