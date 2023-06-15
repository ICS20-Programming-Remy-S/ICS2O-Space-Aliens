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

    this.winSceneBackgroundImage = null;
    this.startButton = null;
  }

  /**
   * Can be defined on the screen.
   * Uses the method named by the Scene Manager when this Scene Starts,
   * before preload() and create().
   * @param {object} data - Any data passed via ScenePlugin.add() or scenePlugin.start().
   */
  init(data) {
    this.cameras.main.setBackgroundColor('#ffffff');
  }

  /**
   * Can be defined on the screen.
   * Use it to load assets.
   */
  preload() {
    console.log('Win Scene');
    this.load.image('startBall', './assets/startImage.png');
    this.load.image('goldBallBackground', './assets/gold-Ball.jpg');
  }

  /**
   * Can be defined on the screen.
   * Use it to create the game objects you want.
   * @param {object} data - Any data passed via ScenePlugin.add() or scenePlugin.start().
   */
  create(data) {

  // Background image
  this.winSceneBackgroundImage = this.add.image(1920 / 2, 1080 / 2, 'goldBallBackground').setScale(1.5);

  // Start button
  this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startBall').setScale(3.0);
  this.startButton.setInteractive({ useHandCursor: true });
  this.startButton.on('pointerdown', () => this.clickButton());
}


  /**
   * This should be overridden by our other scenes.
   * This method is only called once per game step and only while the scene is running.
   * @param {number} time - The current time.
   * @param {number} delta - The delta time in ms since the last frame.
   */
  update(time, delta) {}

  clickButton() {
    this.scene.start('gameScene')
  }
}

export default WinScene;
