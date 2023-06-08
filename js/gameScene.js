/* global phaser */

// Copyright (c) 2023 Remy Skelton All rights reserved
// 
// Created by: Remy Skelton
// Created on: May 2023
// This is the game scene for my game

class GameScene extends Phaser.Scene {
  
  constructor () {
    super({ key: 'gameScene' })
    
    this.background = null
    this.ship = null
    this.fireMissile = false
  }

  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload () {
    console.log('Game Scene')

    // images for scene
    this.load.image('soccerBackground', './assets/stadium.png')
    this.load.image('soccerPlayer', './assets/player.png')
    this.load.image('soccerBall', './assets/soccerBall.png')
    // sounds for scene
    this.load.audio('ballShot', './assets/ballKicked.wav')
  }

  create (data) {
    this.background = this.add.image(0, 0, 'soccerBackground').setScale(2.75)
    this.background.setOrigin(0, 0)

    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'soccerPlayer')

    // create a group for the missiles
    this.missileGroup = this.physics.add.group()
    }
   
  update (time, delta) {
    // called 60 times a second, hopefully!
    const keyLeftObj = this.input.keyboard.addKey('LEFT')
    const keyRightObj = this.input.keyboard.addKey('RIGHT')
    const keySpaceObj = this.input.keyboard.addKey('SPACE')

    if (keyLeftObj.isDown === true) {
      this.ship.x -= 15
      if (this.ship.x < 0) {
        this.ship.x = 0
      }
    }

    if (keyRightObj.isDown === true) {
      this.ship.x += 15
      if (this.ship.x > 1920) {
        this.ship.x = 1920
      }
    }
    if (keySpaceObj.isDown === true) {
      if (this.fireMissile === false) {
        // fire missile
        this.fireMissile = true
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'soccerBall').setScale(0.2)
        this.missileGroup.add(aNewMissile)
        this.sound.play('ballShot')
      }
    }
  
    if (keySpaceObj.isUp === true) {
      this.fireMissile = false
    }
    this.missileGroup.children.each(function (item) {
      item.y = item.y - 15
      if (item.y < 0) {
        item.destroy()
      }
    })
  }
}

export default GameScene
