/* global phaser */

// Copyright (c) 2023 Remy Skelton All rights reserved
// 
//Created by: Remy Skelton
//Created on: May 2023
//This is the title scene for my game

class TitleScene extends Phaser.Scene {
  constructor () {
    super({ key: 'titleScene'})
  }
  
  innit (data) {
    this.cameras.main.setbackgrondColor('#ffffff')
  }

  preload () {
    console.log('Title Scene')
  }

  create (data) {
  }

  update (time,delta) {
  }
}

export default TitleScene