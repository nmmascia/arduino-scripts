'use strict';

const five = require('johnny-five');
const sample = require('lodash.sample');

const board = new five.Board();

const allLights = 0b11111111;
let lights = allLights;

const pins = {
    0: {
        on: true,
        byte: 0b01111111,
        selected: false
    },
    1: {
        on: true,
        byte: 0b10111111,
        selected: false
    },
    2: {
        on: true,
        byte: 0b11011111,
        selected: false
    },
    3: {
        on: true,
        byte: 0b11101111,
        selected: true
    },
    4: {
        on: true,
        byte: 0b11110111,
        selected: false
    },
    5: {
        on: true,
        byte: 0b11111011,
        selected: false
    },
    6: {
        on: true,
        byte: 0b11111101,
        selected: false
    },
    7: {
        on: true,
        byte: 0b11111110,
        selected: false
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

    const piezo = new five.Piezo(7);

    register.send(lights);

    const interval = setInterval(() => {
        const keys = Object.keys(pins);
        const remaining = keys.filter(k => pins[k].on);
        const rand = sample(remaining);
        const selected = keys.filter(k => pins[k].selected);

        console.log(`Your selected numbers: ${selected}`)
        console.log(`Your current number: ${rand}`);

        if (selected.includes(rand)) {
            piezo.play({
              song: 'C - C - C - C - C - C - C - C - C - C',
              beats: 1,
              tempo: 100
            });

            console.log('You win!!!!!!!!!!!!');
            register.send(allLights);
            clearInterval(interval);
        } else {
            pins[rand].on = false;
            lights = lights & pins[rand].byte;
            register.send(lights);

            if (keys.every(k => !pins[k].on)) {
                clearInterval(interval)
                console.log('Every number has been picked.');
            } else {
                console.log('Your remaining numbers are', keys.filter(k => pins[k].on));
            }
        }
    }, 2000);

    this.repl.inject({
        register,
    });
});

