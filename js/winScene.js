/* global Phaser */

// Copyright (c) 2023 Remy Skelton All rights reserved
// 
// Created by: Remy Skelton
// Created on: May 2023
// This is the win scene for my game

/**
 * This class is the Win Scene.
 */
class WinScene extends Phaser.Scene {
  constructor() {
    super({ key: 'winScene' });

    this.winSceneBackgroundImage = null
    this.restartButton = null
    // Declare the WINMUSIC property
    this.WINMUSIC = null
    this.titleSceneText = null
    this.titleSceneTextStyle = { font: '200px Times', fill: '#fde4b9', align: 'center' }
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
    console.log('Win Scene')
    this.load.image('restartButton', './assets/restart.png')
    this.load.image('ballonBackground', './assets/ballonGoldWin.png')
    //sound
    this.load.audio('winMusic', './assets/winSound.wav')
  }

  /**
   * Can be defined on the screen.
   * Use it to create the game objects you want.
   * @param {object} data - Any data passed via ScenePlugin.add() or scenePlugin.start().
   */
  create(data) {
    // Soundtrack
    this.WINMUSIC = this.sound.add('winMusic')
    this.WINMUSIC.loop = true
    this.WINMUSIC.play()

  // Background image
  this.winSceneBackgroundImage = this.add.image(1920 / 2, 1080 / 2, 'ballonBackground').setScale(1.5)

  // restart button
  this.restartButton = this.add.sprite(1920 / 2, (1200 / 2) + 100, 'restartButton').setScale(3.0)
  this.restartButton.setInteractive({ useHandCursor: true })
  this.restartButton.on('pointerdown', () => this.clickButton())
    this.titleSceneText = this.add.text(1920 / 2, (1080 / 2) + 350, "You Win", this.titleSceneTextStyle).setOrigin(0.5)
}


  /**
   * This should be overridden by our other scenes.
   * This method is only called once per game step and only while the scene is running.
   * @param {number} time - The current time.
   * @param {number} delta - The delta time in ms since the last frame.
   */
  update(time, delta) {}

  clickButton() {
    this.WINMUSIC.stop()
    this.scene.start('gameScene')
  }
}

export default WinScene
