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
    const delay = Math.random() * 5000;

    rain.customAnimation = () => {
        Velocity(rain, { top: ['105%', '-5%'] }, {
            easing: 'linear',
            duration: 5000,
            delay: delay,
            complete: rain.customAnimation
        });
    }
    rain.classList.add(rainType);
    rain.style.left = (Math.random() * 101) + '%';
    rain.style.animationDelay = delay + 'ms';
    body.appendChild(rain);
    drops.push(rain);
}

function resetDrops() {
    drops.forEach((drop) => {
        drop.style.top = '-5%';
    });
    stop.style.opacity = '1';
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
    console.log('JS Animation')
});

start[1].addEventListener('click', () => {
    Velocity(drops, 'stop'); // stop js animation
    resetDrops(); // reset all the drop tops to -5%
    body.classList.add('animate');
    body.classList.remove('pause');
    console.log('CSS Animation')
});

stop.addEventListener('click', () => {
    Velocity(drops, 'stop');
    body.classList.add('pause');
    stop.style.opacity = '0';
});