    const buttons = document.querySelectorAll(".drum-pad");
    const displayScreen = document.getElementById("display");
    const volSlider = document.getElementById("volume");
    const audioElements = document.querySelectorAll(".clip");
    const powerButton = document.querySelector(".power");
    let powerState = true;
    const drumMachine = document.getElementById("drum-machine");


    // MOUSE PAD PRESS
    buttons.forEach((button) => {
        const sound = button.querySelector(".clip");
        
        button.addEventListener("click", () => {
            if (!powerState) return;
            sound.currentTime = 0;
            sound.play();
            displayScreen.innerText = button.id;
            button.classList.remove("active");
            void button.offsetWidth; // forcing a reflow - to avoid no changes when removing + adding = no change
            button.classList.add("active");
        })

        button.addEventListener("animationend", () => {
             button.classList.remove("active");
        });
    })

    // KEYBOARD PAD PRESS
    document.addEventListener("keydown", (event) => {
        if (!powerState) return;
        if (event.repeat) return;
        const letter = event.key.toUpperCase();
        const sound = document.getElementById(letter);
        if (!sound) return;
        sound.currentTime = 0;
        sound.play();
        displayScreen.innerText = sound.parentElement.id;
        sound.parentElement.classList.remove("active");
        void sound.parentElement.offsetWidth; // forcing a reflow - to avoid no changes when removing + adding = no change
        sound.parentElement.classList.add("active");
    });

    // VOLUME SLIDER CHANGE
    volSlider.addEventListener("input", () => {
        const volumeLevel = volSlider.value / 100;
        audioElements.forEach((audio) => {
            audio.volume = volumeLevel;
        })

    })

    // POWER BUTTON FUNCTIONS
    powerButton.addEventListener("click", () => {
        powerState = !powerState;
        volSlider.disabled = !powerState;
        drumMachine.classList.toggle("off");
        powerButton.classList.add("active");
        displayScreen.innerText = powerState ? "ON" : "OFF";
    })

    powerButton.addEventListener("animationend", () => {
        powerButton.classList.remove("active");
    })

    // MAKING THE INSTRUMENT OFF BY DEFAULT ON LOAD - make powerState = false
    displayScreen.innerText = powerState ? "ON" : "OFF";
    drumMachine.classList.toggle("off", !powerState);
    volSlider.disabled = !powerState;