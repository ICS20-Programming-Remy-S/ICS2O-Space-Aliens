/* global phaser */

// Copyright (c) 2023 Remy Skelton All rights reserved
// 
// Created by: Remy Skelton
// Created on: May 2023
// This is the game scene for my game

class GameScene extends Phaser.Scene {

  //create an defender
  createDefender () {
    //random number generator for the defender location
    const defenderXLocation = Math.floor(Math.random() * 1920) * 1
    // number generator between 1 and 50
    let defenderXVelocity = Math.floor(Math.random() * 50) + 1
    // this will change 50% of x positions of defenders to negetives
    defenderXVelocity *= Math.round(Math.random()) ? 1 : -1
    
    const anDefender = this.physics.add.sprite(defenderXLocation, -100, 'defender')
    anDefender.body.velocity.y = 200
    anDefender.body.velocity.x = defenderXVelocity
    // Set the scale of the defender sprite, Adjust the scale value as needed
  anDefender.setScale(0.35)

     // Enable physics for the defender
    this.physics.world.enable(anDefender)

    // Adjust the hitbox size of the defender sprite
    anDefender.body.setSize(anDefender.width * anDefender.scaleX, anDefender.height * anDefender.scaleY)
    // Adjust the hitbox offset if needed
    anDefender.body.setOffset(50, 10)


    this.defenderGroup.add(anDefender)
  }

  
  constructor() {
    super({ key: 'gameScene' });

    // Initialize variables
    this.player = null
    this.fireBall = false
    this.score = 0
    this.scoreText = null
    this.scoreTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center' }
    this.gameOverTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center' }
    this.highScore = 0
    this.highScoreText = null
    this.SONG = null
  }

  // Initialize scene
  init(data) {
    this.cameras.main.setBackgroundColor('#0x5f6e7a')

    // Retrieve high score from local storage
    const storedHighScore = localStorage.getItem('highScore')
    if (storedHighScore) {
      this.highScore = parseInt(storedHighScore)
    }
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

  // Create scene
  create(data) {
    // Soundtrack
    this.SONG = this.sound.add('music')
    this.SONG.loop = true
    this.SONG.play()

    // Background image
    this.background = this.add.image(0, 0, 'soccerBackground').setScale(2.75)
    this.background.setOrigin(0, 0)

    // Score text
    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)

    // High score text
    this.highScore = 0
    this.highScoreText = this.add.text(
      10,
      70,
      'High Score: ' + this.highScore.toString(),
      this.scoreTextStyle
    )

    // Create player sprite
    this.player = this.physics.add.sprite(1920 / 2, 1080 - 100, 'soccerPlayer')

    // Game Over sound
    const gameOverSound = this.sound.add('overSound')

    // Create groups for ball and defender sprites
    this.ballGroup = this.physics.add.group()
    this.defenderGroup = this.add.group()
    this.createDefender()

    // Function to create a defender
    const createDefender = () => {
      const defenderXLocation = Math.floor(Math.random() * 1920) * 1;
      let defenderXVelocity = Math.floor(Math.random() * 50) + 1;
      defenderXVelocity *= Math.round(Math.random()) ? 1 : -1;

      const anDefender = this.physics.add.sprite(defenderXLocation, -100, 'defender')
      anDefender.body.velocity.y = 200
      anDefender.body.velocity.x = defenderXVelocity
      anDefender.setScale(0.35)

      this.defenderGroup.add(anDefender)
    }

  // Create a timer event to call createDefender every 2 seconds
  const defenderTimer = this.time.addEvent({
    delay: 2000,
    callback: createDefender,
    callbackScope: this,
    loop: true
  })

  //collisions between ball and defender
    this.physics.add.collider(this.ballGroup, this.defenderGroup, function (ballCollide, defenderCollide) {
      defenderCollide.destroy()
      ballCollide.destroy()
      this.sound.play('defenderPassed')
      this.score = this.score + 1
      this.scoreText.setText('Score: ' + this.score.toString())
      this.createDefender()
      this.createDefender()
    }.bind(this))

  // Collisions between player and defenders
  this.physics.add.collider(this.player, this.defenderGroup, function (playerCollide, defenderCollide) {
    gameOverSound.play()
    // Disable the space bar
    const keySpaceObj =                                  this.input.keyboard.addKey('SPACE')
    keySpaceObj.enabled = false
    this.SONG.pause('music')
    this.physics.pause()
    defenderCollide.destroy()
    playerCollide.destroy()
    this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
    this.gameOverText.setInteractive({ useHandCursor: true })
    this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
    this.score = 0
  }.bind(this));
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
      // Flip the image horizontally
      this.player.setFlipX(true)
      this.player.x -= 15
      if (this.player.x < 0) {
        this.player.x = 1920
      }
    }

    if (keyRightObj.isDown === true) {
      // Reset the image's orientation
      this.player.setFlipX(false)
      this.player.x += 15
      if (this.player.x > 1920) {
        this.player.x = 0
      }
    }
    
    if (keyUpObj.isDown === true) {
      this.player.y -= 15
      if (this.player.y < 0) {
        this.player.y = 0
      }
    }

    if (keyDownObj.isDown === true) {
      this.player.y += 15
      if (this.player.y > 1080) {
        this.player.y = 1080
      }
    }

      if (keyAObj.isDown === true) {
      // Flip the image horizontally
      this.player.setFlipX(true)
      this.player.x -= 15
      if (this.player.x < 0) {
        this.player.x = 1920
      }
    }

    if (keyDObj.isDown === true) {
      // Reset the image's orientation
      this.player.setFlipX(false)
      this.player.x += 15
      if (this.player.x > 1920) {
        this.player.x = 0
      }
    }
    
    if (keyWObj.isDown === true) {
      this.player.y -= 15
      if (this.player.y < 0) {
        this.player.y = 0
      }
    }

    if (keySObj.isDown === true) {
      this.player.y += 15
      if (this.player.y > 1080) {
        this.player.y = 1080
      }
    }
    
    if (keySpaceObj.isDown === true) {
      if (this.fireBall === false) {
        // fire ball
        this.fireBall = true
        const aNewBall = this.physics.add.sprite(this.player.x, this.player.y, 'soccerBall').setScale(0.2)
        this.ballGroup.add(aNewBall)
        this.sound.play('ballShot')
      }
    }
  
    if (keySpaceObj.isUp === true) {
      this.fireBall = false
    }
    this.ballGroup.children.each(function (item) {
      item.y = item.y - 15
      if (item.y < 50) {
        item.destroy()
      }
    })
     if (this.score > this.highScore) {
      this.highScore = this.score
      this.highScoreText.setText('High Score: ' + this.highScore.toString())
    }
   if (this.score === 5) {
   this.scene.start('winScene')
   this.score = 0
  this.highScore = 0
    this.SONG.stop()
}
  }
}


export default GameScene

    