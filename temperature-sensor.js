'use strict'

const five = require('johnny-five');
const board = new five.Board();

board.on('ready', () => {
    const temp = new five.Thermometer({
        pin: 'A0',
        freq: 1000,
        toCelsius: function(raw) { // optional
          return (raw / sensivity) + offset;
        }
    });

    temp.on('data', val => {
        console.log(val);
    });
});