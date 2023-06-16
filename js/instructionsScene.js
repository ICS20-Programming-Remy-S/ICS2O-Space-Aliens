/* global Phaser */

// Copyright (c) 2023 Remy Skelton All rights reserved
// 
// Created by: Remy Skelton
// Created on: May 2023
// This is the menu scene for my game

/**
 * This class is the Menu Scene.
 */
class InstructionsScene extends Phaser.Scene {
  
  // this is the constructor
  constructor() {
    super({ key: 'instructionsScene' });

    this.background = null
    this.menuButton = null
  }

  /**
   * Can be defined on the screen.
   * Uses the method named by the Scene Manager when this Scene Starts,
   * before preload() and create().
   * @param {object} data - Any data passed via ScenePlugin.add() or scenePlugin.start().
   */
  init(data) {
    this.cameras.main.setBackgroundColor('#000000')
  }


  /**
   * Can be defined on the screen.
   * Use it to load assets.
   */
 preload() {
    this.load.image('background', './assets/instructionsBackground.png')
    this.load.image('menuButton', './assets/menuButton.png')
   this.load.audio('instructionsMusic', './assets/intructionsMusic.wav')
  }


  /**
   * Can be defined on the screen.
   * Use it to create the game objects you want.
   * @param {object} data - Any data passed via ScenePlugin.add() or scenePlugin.start().
   */
  create(data) {
   
    //Sound track
    const song = this.sound.add('instructionsMusic');
    song.loop = true
    song.play()

    this.background = this.add.image(1920 / 2, 1080 / 2, 'background');
    this.background.setOrigin(0.5).setScale(0.75);

     this.menuButton = this.add.sprite(200, 75, 'menuButton'); 
  this.menuButton.setScale(3);
  this.menuButton.setInteractive({ useHandCursor: true });
  this.menuButton.on('pointerdown', () => this.clickBack());

   const instructionsText = this.add.text(1920 / 2, (1080 / 2) + 200, "Instructions:\n\nUse the arrow keys or WASD to move the player around. Shoot balls at the defender to injure them, so you can get around them. There is a highscore to see how far you have gotten or if you reach 100 goals you will win the game and get the ballon d'or. To become the best player in history get 8 ballon d'ors", {
    fontFamily: 'Arial',
    fontSize: 40,
    color: '#00FFFF',
    align: 'center',
    wordWrap: { width: 800, useAdvancedWrap: true }
  });
  instructionsText.setOrigin(0.5);
}

  /**
   * This should be overridden by our other scenes.
   * This method is only called once per game step and only while the scene is running.
   * @param {number} time - The current time.
   * @param {number} delta - The delta time in ms since the last frame.
   */
  //Go back to menuScene
 clickBack() {
   // Stop all sounds
  this.scene.start('menuScene')
   this.sound.stopAll()
  }
}

export default InstructionsScene;
