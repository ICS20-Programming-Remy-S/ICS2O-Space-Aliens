// Copyright (c) 2023 Remy Skelton All rights reserved
// 
// Created by: Remy Skelton
// Created on: May 2023
// This is the game scene for my game

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'gameScene' });

    this.background = null;
    this.ship = null;
    this.fireMissile = false;
    this.missileGroup = null;
  }

  init(data) {
    this.cameras.main.setBackgroundColor('#ffffff');
  }

  preload() {
    console.log('Game Scene');

    // Images
    this.load.image('starBackground', './assets/starBackground.png');
    this.load.image('ship', './assets/spaceShip.png');
    this.load.image('missile', './assets/missile.png');
  }

  create(data) {
    this.background = this.add.image(0, 0, 'starBackground').setScale(2.0);
    this.background.setOrigin(0, 0);

    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship');

    // Create a group for the missiles
    this.missileGroup = this.physics.add.group();
  }

  update(time, delta) {
    // Called 60 times a second

    const keyLeftObj = this.input.keyboard.addKey('LEFT');
    const keyRightObj = this.input.keyboard.addKey('RIGHT');
    const keySpaceObj = this.input.keyboard.addKey('SPACE');

    if (keyLeftObj.isDown === true) {
      this.ship.x -= 15;
      if (this.ship.x < 0) {
        this.ship.x = 0;
      }
    } else if (keyRightObj.isDown === true) {
      this.ship.x += 15;
      if (this.ship.x > 1920) {
        this.ship.x = 1920;
      }
    }

    if (keySpaceObj.isDown === true) {
      if (this.fireMissile === false) {
        // Fire missile
        this.fireMissile = true;
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile');
        this.missileGroup.add(aNewMissile);
      }
    } else if (keySpaceObj.isUp === true) {
      this.fireMissile = false;
    }
  }
}

export default GameScene;