/* global phaser */

// Copyright (c) 2023 Remy Skelton All rights reserved
// 
// Created by: Remy Skelton
// Created on: May 2023
// This is the game scene for my game

class GameScene extends Phaser.Scene {

  //create an defender
  createAlien () {
    //random number generator for the defender location
    const alienXLocation = Math.floor(Math.random() * 1920) * 1
    // number generator between 1 and 50;
    let alienXVelocity = Math.floor(Math.random() * 50) + 1
    // this will change 50% of x positions of defenders to negetives
    alienXVelocity *= Math.round(Math.random()) ? 1 : -1
    
    const anAlien = this.physics.add.sprite(alienXLocation, -100, 'defender')
    anAlien.body.velocity.y = 200
    anAlien.body.velocity.x = alienXVelocity
    // Set the scale of the defender sprite, Adjust the scale value as needed
  anAlien.setScale(0.35);

    this.alienGroup.add(anAlien)
  }

  
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
    this.load.image('defender', './assets/defender.png')
    // sounds for scene
    this.load.audio('ballShot', './assets/ballKicked.wav')
  }

  create (data) {
    this.background = this.add.image(0, 0, 'soccerBackground').setScale(2.75)
    this.background.setOrigin(0, 0)

    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'soccerPlayer')

    // create a group for the soccer ball
    this.missileGroup = this.physics.add.group()

    // create a group for the defender
    this.alienGroup = this.add.group() 
    this.createAlien()
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
      if (item.y < 50) {
        item.destroy()
      }
    })
  }
}


export default GameScene
