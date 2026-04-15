
function clearCommand() {
    terminalOutput.innerHTML = '';
}

function helpCommand() {
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

function whoamiCommand() {
    printOutput(`Time101 bash

Hello There, I am Samip Regmi
I love computers...
`);
}
function lsCommand() {
    if (currentDir === '~') {
        printOutput(`<span style="color:#729fcf;font-weight:bold;">projects</span>  <span style="color:#729fcf;font-weight:bold;">contacts</span>  <span style="color:#729fcf;font-weight:bold;">about</span>  <span style="color:#729fcf;font-weight:bold;">articles</span>`);
    } else if (currentDir === '~/contacts') {
        printOutput(`<span style="color:#8ae234;font-weight:bold;">email</span>  <span style="color:#8ae234;font-weight:bold;">linkedin</span>  <span style="color:#8ae234;font-weight:bold;">github</span>`);
    }
    else if (currentDir == '~/projects') {
        printOutput(`<span style="color:white;font-weight:bold;">Projects is currently in development</span>`);
    }
    else if (currentDir == '~/about') {
        printOutput(`<span style="color:white;font-weight:bold;">I am a 19 year old computer science student from Nepal. I like coding and learning new things :)</span>`);
    }
    else if (currentDir == '~/articles') {
        articleCommand();
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
        if (dir === 'contacts' || dir === 'projects' || dir === 'about' || dir === 'articles') {
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

function articleCommand() {
    const modalEl = document.getElementById('articleModal');

    if (!modalEl) {
        printOutput('article: modal element not found');
        return;
    }

    if (typeof bootstrap === 'undefined' || !bootstrap.Modal) {
        printOutput('article: bootstrap modal is not available');
        return;
    }

    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
}