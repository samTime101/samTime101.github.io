document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const page = body.getAttribute('data-page');

    // Helper to render fragments/loading state
    function showLoading(id, message) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = `<p>${message}</p>`;
    }

    // Shared Chaos Effect
    function initChaos() {
        setInterval(() => {
            const elements = document.querySelectorAll('h2, h3, h4, li, p, .chaos-img, .glitch');
            const randomEl = elements[Math.floor(Math.random() * elements.length)];
            if (randomEl) {
                if (randomEl.tagName === 'IMG') {
                    randomEl.style.filter = `hue-rotate(${Math.random() * 90}deg) brightness(${0.5 + Math.random()})`;
                    setTimeout(() => randomEl.style.filter = 'none', 150);
                } else {
                    randomEl.style.textShadow = `2px 2px ${Math.random() > 0.5 ? 'var(--glitch-color-1)' : 'var(--glitch-color-2)'}`;
                    setTimeout(() => randomEl.style.textShadow = 'none', 100);
                }
            }
        }, 2000);
    }

    // Page Specific Logic
    if (page === 'movies') {
        renderMovies();
    } else if (page === 'poems') {
        renderPoems();
    } else if (page === 'gallery') {
        renderGallery();
    } else if (page === 'stories') {
        renderStories();
    }

    function renderMovies() {
        showLoading('movie-list-container', 'Retrieving fragments...');
        fetch('movies.md')
            .then(response => response.text())
            .then(text => {
                const container = document.getElementById('movie-list-container');
                if (!container) return;
                container.innerHTML = '';
                const lines = text.split('\n');
                let currentList = null;
                lines.forEach(line => {
                    const trimmed = line.trim();
                    if (trimmed.startsWith('## ')) {
                        const h3 = document.createElement('h3');
                        h3.innerText = trimmed.replace('## ', '');
                        container.appendChild(h3);
                        currentList = document.createElement('ul');
                        container.appendChild(currentList);
                    } else if (trimmed.startsWith('- ') && currentList) {
                        const li = document.createElement('li');
                        li.innerText = trimmed.replace('- ', '');
                        currentList.appendChild(li);
                    }
                });
            })
            .catch(() => showLoading('movie-list-container', 'Failed to load list.'));
    }

    function renderPoems() {
        fetch('poems.md')
            .then(response => response.text())
            .then(text => {
                const lines = text.split('\n');
                let currentLang = '';
                let currentPoem = null;
                let poemContent = [];
                const enContainer = document.querySelector('#poems-en .work-container');
                const npContainer = document.querySelector('#poems-np .work-container');
                if (enContainer) enContainer.innerHTML = '';
                if (npContainer) npContainer.innerHTML = '';

                lines.forEach((line, index) => {
                    const trimmed = line.trim();
                    if (trimmed.startsWith('## ')) {
                        if (currentPoem) renderPoem(currentPoem, poemContent, currentLang === 'english' ? enContainer : npContainer);
                        currentLang = trimmed.replace('## ', '').toLowerCase();
                        currentPoem = null;
                    } else if (trimmed.startsWith('### ')) {
                        if (currentPoem) renderPoem(currentPoem, poemContent, currentLang === 'english' ? enContainer : npContainer);
                        currentPoem = trimmed.replace('### ', '');
                        poemContent = [];
                    } else if (currentPoem !== null) {
                        poemContent.push(line);
                    }
                    if (index === lines.length - 1 && currentPoem) {
                        renderPoem(currentPoem, poemContent, currentLang === 'english' ? enContainer : npContainer);
                    }
                });
            });
    }

    function renderPoem(title, content, container) {
        if (!container) return;
        const workItem = document.createElement('div');
        workItem.className = 'work-item';
        const h4 = document.createElement('h4');
        h4.className = 'glitch-text';
        h4.innerText = title;
        workItem.appendChild(h4);
        const p = document.createElement('p');
        p.style.whiteSpace = 'pre-wrap';
        p.style.fontFamily = 'var(--font-mono)';
        p.innerText = content.join('\n').trim();
        workItem.appendChild(p);
        container.appendChild(workItem);
    }

    function renderGallery() {
        // Drawings
        fetch('drawings.md')
            .then(response => response.text())
            .then(text => {
                const container = document.getElementById('drawing-list');
                if (!container) return;
                container.innerHTML = '';
                text.split('\n').forEach(line => {
                    if (line.trim().startsWith('- http')) {
                        renderImage(line.trim().replace('- ', ''), container);
                    }
                });
            });

        // Clicks
        fetch('clicks.md')
            .then(response => response.text())
            .then(text => {
                const container = document.getElementById('click-list');
                if (!container) return;
                container.innerHTML = '';
                text.split('\n').forEach(line => {
                    if (line.trim().startsWith('- http')) {
                        renderImage(line.trim().replace('- ', ''), container);
                    }
                });
            });
    }

    function renderImage(url, container) {
        const img = document.createElement('img');
        img.src = url;
        img.className = 'chaos-img';
        img.loading = 'lazy';
        const tilt = (Math.random() * 4 - 2).toFixed(2);
        img.style.transform = `rotate(${tilt}deg)`;
        container.appendChild(img);
    }

    function renderStories() {
        const container = document.getElementById('story-list-container');
        if (!container) return;
        
        showLoading('story-list-container', 'Connecting to narrative stream...');
        
        fetch('stories.md')
            .then(response => response.text())
            .then(text => {
                container.innerHTML = '';
                const lines = text.split('\n');
                let currentLang = '';
                let currentStory = null;
                let storyContent = [];

                lines.forEach((line, index) => {
                    const trimmed = line.trim();
                    if (trimmed.startsWith('## ')) {
                        if (currentStory) renderStory(currentStory, storyContent, container);
                        currentLang = trimmed.replace('## ', '').toLowerCase();
                        currentStory = null;
                    } else if (trimmed.startsWith('### ')) {
                        if (currentStory) renderStory(currentStory, storyContent, container);
                        currentStory = trimmed.replace('### ', '');
                        storyContent = [];
                    } else if (currentStory !== null) {
                        storyContent.push(line);
                    }
                    if (index === lines.length - 1 && currentStory) {
                        renderStory(currentStory, storyContent, container);
                    }
                });
            })
            .catch(() => showLoading('story-list-container', 'Narrative stream corrupted.'));
    }

    function renderStory(title, content, container) {
        if (!container) return;
        const workItem = document.createElement('div');
        workItem.className = 'work-item story-item';
        const h4 = document.createElement('h4');
        h4.className = 'glitch-text';
        h4.innerText = title;
        workItem.appendChild(h4);
        const p = document.createElement('p');
        p.style.whiteSpace = 'pre-wrap';
        p.style.fontFamily = 'var(--font-mono)';
        p.innerText = content.join('\n').trim();
        workItem.appendChild(p);
        container.appendChild(workItem);
    }

    initChaos();
});