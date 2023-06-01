/* global phaser */

// Copyright (c) 2023 Remy Skelton All rights reserved
// 
//Created by: Remy Skelton
//Created on: May 2023
//This is the Phaser3 configuration file 

//* Game scene */

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: 'arcade',
  arcade: {
    debug: true
  }
},
  //background color of program
  backgrondColor: 0x5f6e7a,
  scale: {
    mode: Phaser.Scale.FIT,
    //to center it in the middle of webpage
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

const game = new Phaser.Game(config)
console.log(game)