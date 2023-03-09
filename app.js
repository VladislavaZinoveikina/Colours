const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', event => {
    event.preventDefault();
    if (event.code.toLowerCase() === 'space') {
        setRandomColours()
    };
});

document.addEventListener('click', (event) => {
    const type = event.target.dataset.type;

    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i'
        ? event.target
        : event.target.children[0]

        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    } else if (type === 'copy') {
        copyToClickBoard(event.target.textContent);
    };       
});

// My interpretation of chroma's random method
/* function generateRandomColour() {
    const hexCodes = '0123456789ABCDEF';
    
    let colour = '';

    for (let i = 0; i < 6; i++) {
    colour += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    };

    return '#' + colour
}; */

function copyToClickBoard(text) {
    return navigator.clipboard.writeText(text);
}

function setRandomColours(isInitial) {
    const colours = isInitial ? getColoursFromHash() : [];

    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock');
        const text = col.querySelector('h2');
        const button = col.querySelector('button');

        if (isLocked) {
            colours.push(text.textContent);
            return;
        };

        const colour = isInitial 
            ? colours[index] 
                ? colours[index]
                : chroma.random()
            : chroma.random();

        if (!isInitial) {
            colours.push(colour);
        }

        text.textContent = colour;
        col.style.background = colour;

        setTextColour(text, colour);
        setTextColour(button, colour);

        updateColoursHash(colours);
    });
};

function setTextColour(text, colour) {
    const luminance = chroma(colour).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white';
};

function updateColoursHash(colours = []) {
    document.location.hash = colours.map((col) => col.toString().substring(1)).join('-');
};

function getColoursFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash
            .substring(1)
            .split('-')
            .map(colour => '#' + colour);
    };
    return []
};

setRandomColours(true);