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
    
    this.ship = null
    this.fireMissile = false
    this.score = 0
    this.scoreText = null
    this.scoreTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center'}
    this.gameOverTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center'}
  }

  init (data) {
    this.cameras.main.setBackgroundColor('#0x5f6e7a')
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
    this.load.audio('defenderPassed', './assets/defenderPassed.wav')
    this.load.audio('overSound', './assets/gameOver.wav')
    this.load.audio('music', './assets/brazilSong.wav')
  }

  create (data) {

    // Soundtrack
    const song = this.sound.add('music');
  song.loop = true;
  song.play();
    
    this.background = this.add.image(0, 0, 'soccerBackground').setScale(2.75)
    this.background.setOrigin(0, 0)

    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)

    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'soccerPlayer')

      // Create the Game Over sound
  const gameOverSound = this.sound.add('overSound');

    // create a group for the soccer ball
    this.missileGroup = this.physics.add.group()

    // create a group for the defender
    this.alienGroup = this.add.group()
    this.createAlien()
    this.createAlien()
    this.createAlien()
    this.createAlien()
    this.createAlien()

    //collisions between ball and defender
    this.physics.add.collider(this.missileGroup, this.alienGroup, function (missileCollide, alienCollide) {
      alienCollide.destroy()
      missileCollide.destroy()
      this.sound.play('defenderPassed')
      this.score = this.score + 1
      this.scoreText.setText('Score: ' + this.score.toString())
      this.createAlien()
      this.createAlien()
    }.bind(this))

      // Collisions between ship and aliens
      this.physics.add.collider(this.ship, this.alienGroup, function (shipCollide, alienCollide) {
      gameOverSound.play();
      song.pause('music')
      this.physics.pause()
      alienCollide.destroy()
      shipCollide.destroy()
      this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
      this.gameOverText.setInteractive({ useHandCursor: true })
      this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
      this.score = 0
        if (song.isPlaying) {
          gameOverSound.pause('overSound')
        }
  }.bind(this))
    
    
}
    

    update (time, delta) {
    // called 60 times a second, hopefully!
    const keyLeftObj = this.input.keyboard.addKey('LEFT')
    const keyRightObj = this.input.keyboard.addKey('RIGHT')
    const keyUpObj = this.input.keyboard.addKey('UP')
    const keyDownObj = this.input.keyboard.addKey('DOWN')
    const keyAObj = this.input.keyboard.addKey('A')
    const keyDObj = this.input.keyboard.addKey('D')
    const keyWObj = this.input.keyboard.addKey('W')
    const keySObj = this.input.keyboard.addKey('S')
    const keySpaceObj = this.input.keyboard.addKey('SPACE')

    if (keyLeftObj.isDown === true) {
      this.ship.x -= 15
      if (this.ship.x < 0) {
        this.ship.x = 1920
      }
    }

    if (keyRightObj.isDown === true) {
      this.ship.x += 15
      if (this.ship.x > 1920) {
        this.ship.x = 0
      }
    }
    
    if (keyUpObj.isDown === true) {
      this.ship.y -= 15
      if (this.ship.y < 0) {
        this.ship.y = 0
      }
    }

    if (keyDownObj.isDown === true) {
      this.ship.y += 15
      if (this.ship.y > 1080) {
        this.ship.y = 1080
      }
    }

      if (keyAObj.isDown === true) {
      this.ship.x -= 15
      if (this.ship.x < 0) {
        this.ship.x = 1920
      }
    }

    if (keyDObj.isDown === true) {
      this.ship.x += 15
      if (this.ship.x > 1920) {
        this.ship.x = 0
      }
    }
    
    if (keyWObj.isDown === true) {
      this.ship.y -= 15
      if (this.ship.y < 0) {
        this.ship.y = 0
      }
    }

    if (keySObj.isDown === true) {
      this.ship.y += 15
      if (this.ship.y > 1080) {
        this.ship.y = 1080
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

    