import Velocity from 'velocity-animate';

const body = document.querySelector('body');
const count = 1000;
const drops = [];
const stop = document.getElementById('stop_animation');
let start = [
    document.getElementById('start_1'),
    document.getElementById('start_2')
];

// randomize order of the start elements to have blind test
// users will not know what they are looking at
// current running animation is displayed in console
start = Math.random() < 0.5 ? start : start.reverse();

function createDrop() {
    const rain = document.createElement('div');
    const rainType = Math.random() < 0.2 ? 'rain' : 'rain-small';
    const delay = Math.round(Math.random() * 5000);

    rain.customAnimation = () => {
        Velocity(rain, {
            top: ['130%', '-5%'],
            translateZ: ['-200px', '0']
        },
        {
            easing: 'linear',
            delay: delay,
            duration: 5000,
            complete: rain.customAnimation,
            queue: 'rain'
        });
    }

    rain.classList.add(rainType);
    rain.style.left = (Math.random() * 100 ) + ((Math.random() * 30) * (Math.random() < 0.5 ? -1  : 1)) + '%';
    rain.style.animationDelay = delay + 'ms';
    body.appendChild(rain);
    drops.push(rain);
}

function resetDrops() {
    drops.forEach((drop) => {
        drop.style.top = '-5%';
        drop.style.transform = "translateZ(0)";
    });
    stop.style.opacity = '1';
    start.forEach((btn) => { btn.disabled = true; });
}

for (var i = 0; i < count; i++) {
    createDrop();
}

start[0].addEventListener('click', () => {
    body.classList.remove('animate'); // stop css animation
    resetDrops(); // reset all the drop tops to -5%
    drops.forEach((drop) => {
        drop.customAnimation();
    });
    Velocity.Utilities.dequeue(drops, 'rain');
    console.log('JS Animation')
});

start[1].addEventListener('click', () => {
    Velocity(drops, 'stop', true); // stop js animation
    resetDrops(); // reset all the drop tops to -5%
    body.classList.add('animate');
    body.classList.remove('pause');
    console.log('CSS Animation')
});

stop.addEventListener('click', () => {
    Velocity(drops, 'stop', true);
    body.classList.add('pause');
    stop.style.opacity = '0';
    start.forEach((btn) => { btn.disabled = false; });
});