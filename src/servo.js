'use strict'

const five = require('johnny-five');
const board = new five.Board();

board.on('ready', () => {
    const servo = new five.Servo({
        pin: 9,
        range: [45, 135],
        startAt: 45,
        debug: true,
        type: 'continuous',
    });

    servo.to(90, 1000);
    servo.to(135, 1000);
});