/* global phaser */

// Copyright (c) 2023 Remy Skelton All rights reserved
// 
//Created by: Remy Skelton
//Created on: May 2023
//This is the splash scene for my game

class SplashScene extends Phaser.Scene {
  constructor () {
    super({ key: 'splashScene'})
  }
  
  innit (data) {
    this.cameras.main.setbackgrondColor('#ffffff')
  }

  preload () {
    console.log('Splash Scene')
  }

  create (data) {
  }

  update (time,delta) {
    this.scene.switch('titleScene')
  }
}

export default SplashScene