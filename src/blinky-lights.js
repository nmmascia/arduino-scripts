const five = require('johnny-five');
const board = new five.Board();

board.on('ready', () => {
    const yels = [2,4,6,8].map(num => new five.Led(num));
    const reds = [3,5,7,9].map(num => new five.Led(num));

    yels.forEach(y => y.blink(1200));
    reds.forEach(r => r.blink(600));
});