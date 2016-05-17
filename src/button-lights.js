'use strict'

const five = require('johnny-five');
const board = new five.Board();

board.on('ready', () => {
    const firstLed = new five.Led(13);
    const secondLed = new five.Led(12);

    const firstButton = new five.Button(2);
    let firstOn = false;

    const secondButton = new five.Button(3);
    let secondOn = false;

    firstButton.on('press', () => {
        firstOn = !firstOn;

        if (firstOn) firstLed.on();
        else firstLed.off();
    });

    secondButton.on('press', () => {
        secondOn = !secondOn;

        if (secondOn) secondLed.on();
        else secondLed.off();
    });

    /*

    board.loop(500, () => {
        if (firstOn) firstLed.on();
        else firstLed.off();

        if (secondOn) secondLed.on();
        else secondLed.off();
    });

    */
});