const confetti = require("canvas-confetti");

const $canvas = document.createElement("canvas");
document.querySelector("main").appendChild($canvas);

const vw = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
);
const vh = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
);

const confettiController = confetti.create($canvas, {
    resize: true,
    useWorker: true
});

function showConfettiAtPosition(x, y) {
    const xViewportPercentage = x / vw;
    const yViewportPercentage = y / vh;

    confettiController({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        origin: {
            x: xViewportPercentage,
            // since they fall down, start a bit higher than random
            y: yViewportPercentage
        }
    });
}

export default {
    showConfettiAtPosition
};
