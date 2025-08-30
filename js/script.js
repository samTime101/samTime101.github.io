let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let commandInput = document.querySelector('#command');

const styles = {
    title: { font: "bold 24px 'Fira Code', monospace", color: "#00ffcc" },
    command: { font: "16px 'Fira Code', monospace", color: "#ffffff" },
    prompt: { font: "16px 'Fira Code', monospace", color: "#ffcc00" },
    info: { font: "16px 'Fira Code', monospace", color: "#aaaaaa" },
    error: { font: "16px 'Fira Code', monospace", color: "#ff4444" }
};

function setStyle(type) {
    ctx.font = styles[type].font;
    ctx.fillStyle = styles[type].color;
}

document.addEventListener('keydown', e => {
    if (e.key === '/') {
        e.preventDefault();
        commandInput.focus();
    }
});

commandInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        let command = commandInput.value.trim();
        processCommand(command);
        commandInput.value = '';
    }
});

function clear() {
    ctx.fillStyle = "#0d0d0d";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function help() {
    clear();
    setStyle('title');
    ctx.textAlign = 'center';
    ctx.fillText('AVAILABLE COMMANDS:', ctx.canvas.width / 2, 40);

    setStyle('command');
    ctx.fillText('help - SHOWS HELP MESSAGE', ctx.canvas.width / 2, 80);
    ctx.fillText('clear - CLEARS THE SCREEN', ctx.canvas.width / 2, 110);
    ctx.fillText('whoami - WHO AM I', ctx.canvas.width / 2, 140);
    ctx.fillText('github - MY GITHUB', ctx.canvas.width / 2, 170);
    ctx.fillText('license - LICENSE OF THIS PAGE', ctx.canvas.width / 2, 200);
    setStyle('info');
    ctx.fillText('TYPE THE COMMAND AND PRESS ENTER TO EXECUTE IT', ctx.canvas.width / 2, 250);
}

function whoami() {
    clear();
    setStyle('title');
    ctx.textAlign = 'center';
    ctx.fillText('HELLO I AM SAMIP REGMI (samTime101)', ctx.canvas.width / 2, 40);

    setStyle('command');
    ctx.fillText('I LOVE FIDDLING AROUND COMPUTERS', ctx.canvas.width / 2, 70);
    ctx.fillText('I LOVE COMPUTERS AND I LIKE DRAWING, PHOTOGRAPHY AND MUSIC', ctx.canvas.width / 2, 90);
    ctx.fillText('github.com/samTime101', ctx.canvas.width / 2, 120);
}

async function license() {
    const url = 'https://api.github.com/repos/samTime101/devsphere-bot/license';
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('FAILED TO FETCH');
        
        const data = await response.json();
        const licenseText = atob(data.content);
        console.log(licenseText);

        document.getElementById('license-content').textContent = licenseText;

        const licenseModal = new bootstrap.Modal(document.getElementById('licenseModal'));
        licenseModal.show();
    } catch (err) {
        console.error(err);
        alert('ERROR FETCHING LICENSE');
    }
}

function github(){
    window.location.href = "https://github.com/samTime101"
}

function processCommand(command) {
    switch(command) {
        case 'help': 
            help();
            break;
        case 'clear': 
            clear();
            break;
        case 'whoami': 
            whoami();
            break;
        case 'github':
            github();
            break;
        case 'license':
            license()
            break;
        default: 
            help();
            break;
    }
}


help();
commandInput.focus();
