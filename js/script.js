
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

function clear() {
    terminalOutput.innerHTML = '';
}

function help() {
    printOutput(`Time101 bash
Updated on 13/04/2026

Available Commands:
clear                                              
help                                          
whoami                                             
cd                                                 
ls
neofetch
`);
}

function whoami() {
    printOutput(`Time101 bash

Hello There, I am Samip Regmi
I love computers...
`);
}
function lsCommand() {
    if (currentDir === '~') {
        printOutput(`<span style="color:#729fcf;font-weight:bold;">projects</span>  <span style="color:#729fcf;font-weight:bold;">contacts</span>  <span style="color:#729fcf;font-weight:bold;">about</span>`);
    } else if (currentDir === '~/contacts') {
        printOutput(`<span style="color:#8ae234;font-weight:bold;">email</span>  <span style="color:#8ae234;font-weight:bold;">linkedin</span>  <span style="color:#8ae234;font-weight:bold;">github</span>`);
    }
    else if (currentDir == '~/projects') {
        printOutput(`<span style="color:white;font-weight:bold;">Currently in development</span>`);
    }
    else if (currentDir == '~/about') {
        printOutput(`<span style="color:white;font-weight:bold;">I am a 19 year old computer science student from Nepal. I like coding and learning new things :)</span>`);
    }
}

function cdCommand(dir) {
    if (!dir || dir === '~') {
        currentDir = '~';
    } else if (dir === '..') {
        if (currentDir !== '~') {
            let parts = currentDir.split('/');
            parts.pop();
            currentDir = parts.join('/') || '~';
        }
    } else if (currentDir === '~') {
        if (dir === 'contacts' || dir === 'projects' || dir === 'about') {
            currentDir = `~/${dir === 'about' ? 'about' : dir}`;
        } else {
            printOutput(`time101: cd: ${dir}: No such file or directory`);
        }
    } else {
        printOutput(`time101: cd: ${dir}: No such file or directory`);
    }
    localStorage.setItem('termCurrentDir', currentDir);
    updateInputPrompt();
}

function neofetchCommand() {
    printOutput(`
${ascii}
System uptime: 19 Years
OS: Time101 LTS
Shell: Time101 shell
Terminal: Time101
Memory: 1Mib/1Mib                             
        `)
}

function openLink(message, url, openInNewTab = false) {
    printOutput(message);
    setTimeout(() => {
        if (openInNewTab) {
            window.open(url, "_blank");
        } else {
            window.location.href = url;
        }
    }, 500);
}

function emailCommand() {
    openLink(`Opening mail client...`, "mailto:samipregmi123456@gmail.com");
}

function linkedinCommand() {
    openLink(`Opening LinkedIn...`, "https://www.linkedin.com/in/samip-regmi-670a76248/", true);
}

function githubCommand() {
    openLink(`Opening github...`, "https://github.com/samTime101", true);
}

function processCommand(input) {
    let args = input.trim().split(/\s+/);
    let cmd = args[0];
    let arg1 = args[1];

    if (!cmd) return;

    if (cmd === 'help') help();
    else if (cmd === 'clear') clear();
    else if (cmd === 'whoami') whoami();
    else if (cmd === 'ls') lsCommand();
    else if (cmd === 'cd') cdCommand(arg1);
    else if (cmd === 'neofetch') neofetchCommand();
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
