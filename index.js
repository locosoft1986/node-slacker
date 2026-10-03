const robot = require("robotjs");
const process = require('node:process');

const MOUSE_POSITION_CHECK_INTERVAL = 30 * 1000;
const MOUSE_MOVE_DISTANCE = 100;
const MOUSE_MOVE_DELAY = 2 * 1000;

console.log('Slacking start...');
let previousMousePos = robot.getMousePos();
const intervalHandle = setInterval(() => {
    const currentMousePos = robot.getMousePos();
    if (currentMousePos.x === previousMousePos.x && currentMousePos.y === previousMousePos.y) {
        console.log(`Auto moving mouse from:${currentMousePos.x}, ${currentMousePos.y}`);
        robot.moveMouse(currentMousePos.x + MOUSE_MOVE_DISTANCE, currentMousePos.y + MOUSE_MOVE_DISTANCE);
        setTimeout(() => {
            robot.moveMouse(currentMousePos.x, currentMousePos.y);
        }, MOUSE_MOVE_DELAY);
    } else {
        console.log(`User has changed mouse position, skip.`);
        previousMousePos = currentMousePos;
    }
}, MOUSE_POSITION_CHECK_INTERVAL);



process.once('uncaughtException', () => {
    clearInterval(intervalHandle);
    console.log('\nSlacking terminated...');

    process.exit(0)
})

process.once('SIGINT', () => { throw new Error() })
