/* global Phaser */

// Copyright (c) 2023 Remy Skelton All rights reserved
// 
// Created by: Remy Skelton
// Created on: May 2023
// This is the menu scene for my game

/**
 * This class is the Menu Scene.
 */
class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'menuScene' })

    this.menuSceneBackgroundImage = null
    this.startButton = null
    // Declare the INTROSONG property
    this.INTROSONG = null
    this.retroInstructionsButton = null
  }

  /**
   * Can be defined on the screen.
   * Uses the method named by the Scene Manager when this Scene Starts,
   * before preload() and create().
   * @param {object} data - Any data passed via ScenePlugin.add() or scenePlugin.start().
   */
  init(data) {
    this.cameras.main.setBackgroundColor('#808080')
  }

  /**
   * Can be defined on the screen.
   * Use it to load assets.
   */
  preload() {
    console.log('Menu Scene')
    this.load.image('startBall', './assets/startImage.png')
    this.load.image('goldBallBackground', './assets/gold-Ball.jpg')
    this.load.image('instructionsButton', './assets/instructionButton.png')
    //sounds
    this.load.audio('menuSong', './assets/sirusMenuSound.wav')
  }

  /**
   * Can be defined on the screen.
   * Use it to create the game objects you want.
   * @param {object} data - Any data passed via ScenePlugin.add() or scenePlugin.start().
   */
  create(data) {
    // Soundtrack
    this.INTROSONG = this.sound.add('menuSong')
    this.INTROSONG.loop = true
    this.INTROSONG.play()

    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'goldBallBackground').setScale(1.5)
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startBall').setScale(3.0)
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on('pointerdown', () => this.clickButton())

    this.retroInstructionsButton = this.add.sprite(1920 / 2, 100, 'instructionsButton'); 
    this.retroInstructionsButton.setScale(3.5); 
    this.retroInstructionsButton.setInteractive({ useHandCursor: true });
    this.retroInstructionsButton.on('pointerdown', () => this.clickInstructions());
  }

  /**
   * This should be overridden by our other scenes.
   * This method is only called once per game step and only while the scene is running.
   * @param {number} time - The current time.
   * @param {number} delta - The delta time in ms since the last frame.
   */
  update(time, delta) {
  }

  clickButton() {
    // Stop the menu music
    this.INTROSONG.stop()
    this.scene.start('gameScene')
  }
  clickInstructions() {
    this.scene.start('instructionsScene')
    this.INTROSONG.stop()
  }
}

export default MenuScene
