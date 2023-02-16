const cols = document.querySelectorAll('.col');

function generateRandomColour() {
    const hexCodes = '0123456789ABCDEF';
    
    let colour = '';

    for (let i = 0; i < 6; i++) {
    colour += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    };

    return '#' + colour
};

function setRandomColours() {
    cols.forEach((col) => {
        const text = col.querySelector('h2');
        const colour = generateRandomColour();

        text.textContent = colour;
        col.style.background = generateRandomColour();
    });
};

setRandomColours();