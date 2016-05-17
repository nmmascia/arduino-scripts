'use strict';

const five = require('johnny-five');
const sample = require('lodash.sample');

const board = new five.Board();

let lights = 0b11111111;

const pins = {
    0: {
        on: true,
        byte: 0b01111111,
    },
    1: {
        on: true,
        byte: 0b10111111,
    },
    2: {
        on: true,
        byte: 0b11011111,
    },
    3: {
        on: true,
        byte: 0b11101111,
    },
    4: {
        on: true,
        byte: 0b11110111,
    },
    5: {
        on: true,
        byte: 0b11111011
    },
    6: {
        on: true,
        byte: 0b11111101
    },
    7: {
        on: true,
        byte: 0b11111110
    },
};

board.on('ready', function() {
    const register = new five.ShiftRegister({
        pins: {
            data: 2,
            clock: 3,
            latch: 4
        }
    });

    register.send(lights);

    const interval = setInterval(() => {
        const keys = Object.keys(pins);
        const remaining = keys.filter(k => pins[k].on);
        const rand = sample(remaining);
        console.log(`Your selected number: ${rand}`);

        pins[rand].on = false;
        lights = lights & pins[rand].byte;
        register.send(lights);

        if (keys.every(k => !pins[k].on)) {
            clearInterval(interval)
            console.log('Every number has been selected.');
        } else {
            console.log('Your remaining numbers are', keys.filter(k => pins[k].on));
        }
    }, 2000);

    this.repl.inject({
        register,
    });
});

