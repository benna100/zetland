import confetti from "./confetti";
import popSoundEffect from "./assets/pop-sound-effect.mp3";

const $confettiPrompt = document.querySelector(".confetti");
const $$confettiPrompts = document.querySelectorAll(".confetti ul li");
const $confettiButton = document.querySelector(".confetti button");

const $body = document.querySelector("body");

const popSound = new Audio(popSoundEffect);

function init() {
    let promptIndex = 1;
    let promptIntervalTimerId;
    // milliseconds to wait before showing the confetti prompt
    const showConfettiPromptAfter = 6000;
    const confettiPromptInterval = 5000;

    setTimeout(() => {
        $confettiPrompt.classList.add("visible");

        promptIntervalTimerId = setInterval(() => {
            const isShowingLastPrompt =
                promptIndex > $$confettiPrompts.length - 1;
            if (isShowingLastPrompt) {
                $body.classList.add("crazy");

                clearInterval(promptIntervalTimerId);
            } else {
                $$confettiPrompts[promptIndex].classList.add("visible");

                promptIndex++;
            }
        }, confettiPromptInterval);
    }, showConfettiPromptAfter);

    $confettiButton.addEventListener("click", () => {
        $confettiPrompt.classList.remove("visible");
        clearInterval(promptIntervalTimerId);

        document.body.addEventListener("click", ({ x, y }) => {
            confetti.showConfettiAtPosition(x, y);

            popSound.play();
        });
    });
}

export default {
    init
};
