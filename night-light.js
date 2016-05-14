'use strict'

const five = require('johnny-five');
const board = new five.Board();

board.on('ready', () => {
    const led = new five.Led(13);

    const photoresistor = new five.Sensor({
        pin: 'A0',
        freq: 500,
    });

    photoresistor.on('data', val => {
        if (val >= 250) led.on();
        else led.off();
    });
});