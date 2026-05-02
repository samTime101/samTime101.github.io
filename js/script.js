
let terminalOutput = document.querySelector('#terminal-output');
let commandInput = document.querySelector('#command');
let terminalContainer = document.querySelector('#terminal-container');
let terminalInputDir = document.querySelector('#terminal-input-line .dir');

let currentDir = localStorage.getItem('termCurrentDir') || '~';

terminalContainer.addEventListener('click', () => {
    commandInput.focus();
});

document.addEventListener('keydown', e => {
    if (e.key === '/') {
        e.preventDefault();
        commandInput.focus();
    }
});

commandInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        let command = commandInput.value.trim();
        printPromptLine(command);
        if (command) {
            processCommand(command.toLowerCase());
        }
        commandInput.value = '';
        scrollToBottom();
    }
});

function printPromptLine(command) {
    let line = document.createElement('div');
    line.innerHTML = `<span class="prompt"><span class="user">samipregmi@time101</span>:<span class="dir">${currentDir}</span>$</span> <span class="cmd-text">${command}</span>`;
    terminalOutput.appendChild(line);
}

function updateInputPrompt() {
    if (terminalInputDir) {
        terminalInputDir.textContent = currentDir;
    }
}

function printOutput(htmlStr) {
    let line = document.createElement('div');
    line.style.whiteSpace = "pre-wrap";
    line.innerHTML = htmlStr;
    terminalOutput.appendChild(line);
}

function scrollToBottom() {
    terminalContainer.scrollTop = terminalContainer.scrollHeight;
}

function processCommand(input) {
    let args = input.trim().split(/\s+/);
    let cmd = args[0];
    let arg1 = args[1];

    if (!cmd) return;

    if (cmd === 'help') helpCommand();
    else if (cmd === 'clear') clearCommand();
    else if (cmd === 'whoami') whoamiCommand();
    else if (cmd === 'ls') lsCommand();
    else if (cmd === 'cd') cdCommand(arg1);
    else if (cmd === 'neofetch') neofetchCommand();
    else if (cmd === 'life' || cmd === 'me') lifeCommand();
    else if (cmd === 'clicks') clicksCommand();
    else if (cmd === 'email') {
        if (currentDir === '~/contacts') emailCommand();
        else printOutput(`${cmd}: command not found`);
    }
    else if (cmd === 'linkedin') {
        if (currentDir === '~/contacts') linkedinCommand();
        else printOutput(`${cmd}: command not found`);
    }
    else if (cmd === 'github') {
        if (currentDir === '~/contacts') githubCommand();
        else printOutput(`${cmd}: command not found`);
    }
    else printOutput(`${cmd}: command not found`);
}

updateInputPrompt();
commandInput.focus();

// Random chaos effect for terminal
setInterval(() => {
    const elements = document.querySelectorAll('.cmd-text, .prompt, #terminal-output div');
    const randomEl = elements[Math.floor(Math.random() * elements.length)];
    if (randomEl) {
        randomEl.style.textShadow = `1px 1px ${Math.random() > 0.5 ? '#00f2ff' : '#ff00ff'}`;
        setTimeout(() => {
            randomEl.style.textShadow = 'none';
        }, 100);
    }
}, 3000);
