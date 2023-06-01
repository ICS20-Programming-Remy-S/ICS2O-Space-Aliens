/* global phaser */

// Copyright (c) 2023 Remy Skelton All rights reserved
// 
//Created by: Remy Skelton
//Created on: May 2023
//This is the Phaser3 configuration file 

import SplashScene from './splashScene.js'
import TitleScene from './titleScene.js'

//My game scenes
const SplashScene = new SplashScene()
const TitleScene = new TitleScene()

//* Game scene */
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    'arcade',
  arcade: {
    debug: true
  }
},
  //background color of program
  backgroundColor: 0x5f6e7a,
  scale: {
    mode: Phaser.Scale.FIT,
    //to center it in the middle of webpage
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

const game = new Phaser.Game(config)

//loading of scene
//any "key" is global and we can't reuse it
game.scene.add('splashScene', splashScene)
game.scene.add('titleScene', titleScene)


//Title for the start
game.scene.start('splashScene')
