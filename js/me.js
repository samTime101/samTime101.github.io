document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const page = body.getAttribute('data-page');

    function showLoading(id, message) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = `<p>${message}</p>`;
    }

    function initChaos() {
        const asciiBg = document.getElementById('ascii-background');
        if (asciiBg && typeof ascii !== 'undefined') {
            for (let i = 0; i < 15; i++) {
                const div = document.createElement('div');
                div.className = 'ascii-item';
                div.textContent = ascii;
                div.style.left = `${Math.random() * 100}%`;
                div.style.top = `${Math.random() * 100}%`;
                div.style.animationDelay = `${Math.random() * -60}s`;
                div.style.fontSize = '8px';
                div.style.opacity = '0.02';
                asciiBg.appendChild(div);
            }
        }

        const dataStream = document.getElementById('data-stream');
        const fragments = [
            "RE_SYNCHRONIZING...", "NULL_POINTER_EXCEPTION", "VOID_DATA_LINK", 
            "FRAGMENT_ID: 0x8823", "MEMORY_LEAK_WARNING", "SHADOW_PROC_ACTIVE",
            "SYSTEM_COMPROMISED", "HE_WATCHES", "ACCESS_DENIED"
        ];

        function spawnFragment() {
            if (!dataStream) return;
            const fragment = document.createElement('div');
            fragment.className = 'data-fragment';
            fragment.textContent = fragments[Math.floor(Math.random() * fragments.length)];
            fragment.style.left = `${Math.random() * 100}vw`;
            fragment.style.animationDuration = `${8 + Math.random() * 12}s`;
            fragment.style.opacity = '0.2';
            dataStream.appendChild(fragment);
            setTimeout(() => fragment.remove(), 20000);
        }
        if (dataStream) setInterval(spawnFragment, 3000);

        function triggerGlitch() {
            const glitchType = Math.floor(Math.random() * 3);
            if (glitchType === 0) {
                body.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
                setTimeout(() => body.style.transform = '', 100);
            } else if (glitchType === 1) {
                body.style.filter = 'invert(0.1) contrast(1.1)';
                setTimeout(() => body.style.filter = '', 50);
            }
        }
        setInterval(() => {
            if (Math.random() > 0.98) triggerGlitch();
        }, 1000);

        const glitchChars = "¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿";
        function corruptText() {
            const elements = document.querySelectorAll('p, span, h2, h3, h4, li');
            const target = elements[Math.floor(Math.random() * elements.length)];
            if (!target || target.children.length > 0 || target.textContent.length < 5) return;

            const originalText = target.textContent;
            const textArray = originalText.split('');
            const glitchIndex = Math.floor(Math.random() * textArray.length);
            textArray[glitchIndex] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
            
            target.textContent = textArray.join('');
            setTimeout(() => target.textContent = originalText, 150);
        }
        setInterval(() => {
            if (Math.random() > 0.8) corruptText();
        }, 2000);

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

    if (page === 'movies') {
        renderMovies();
    } else if (page === 'poems') {
        renderPoems();
    } else if (page === 'gallery') {
        renderGallery();
    } else if (page === 'stories') {
        renderStories();
    } else if (page === 'cv') {
        renderCV();
    } else if (page === 'articles') {
        renderArticles();
    }

    function renderArticles() {
        const container = document.querySelector('.container');
        if (!container) return;
        
        showLoading('articles-loader', 'Scanning data fragments...');
        
        fetch('../contents/articles.md')
            .then(response => response.text())
            .then(text => {
                const loader = document.getElementById('articles-loader');
                if (loader) loader.style.display = 'none';

                container.querySelectorAll('.chaos-section.dynamic').forEach(s => s.remove());

                const sections = text.split(/^##\s+/gm);
                sections.shift(); 

                sections.forEach(section => {
                    const lines = section.split('\n');
                    const sectionTitle = lines[0].trim();
                    const sectionContent = lines.slice(1).join('\n').trim();
                    
                    if (!sectionTitle) return;

                    const chaosSection = document.createElement('section');
                    chaosSection.className = 'chaos-section dynamic';
                    
                    const h2 = document.createElement('h2');
                    h2.className = 'glitch';
                    const id = sectionTitle.toUpperCase().replace(/\s+/g, '_');
                    h2.setAttribute('data-text', id);
                    h2.innerText = id;
                    chaosSection.appendChild(h2);

                    // Split by ### to handle each article individually
                    const articles = sectionContent.split(/^###\s+/gm);
                    articles.shift(); // Remove content before first ###

                    articles.forEach(article => {
                        const articleLines = article.split('\n');
                        const articleTitle = articleLines[0].trim();
                        const articleBody = articleLines.slice(1).join('\n').trim();
                        
                        if (!articleTitle) return;

                        const workItem = document.createElement('div');
                        workItem.className = sectionTitle === 'SYSTEM_LOG' ? 'work-item story-item' : 'work-item';
                        
                        // Extract link if it exists in the pattern [text](url)
                        const linkMatch = articleBody.match(/\[(.*?)\]\((.*?)\)/);
                        let titleHtml = articleTitle;
                        let processedBody = articleBody;

                        if (linkMatch) {
                            const url = linkMatch[2];
                            titleHtml = `<a href="${url}" target="_blank" style="color: inherit; text-decoration: none;">${articleTitle}</a>`;
                            // If it's the standard [ACCESS_LINK] format, remove it from body as title is now the link
                            if (articleBody.startsWith('[ACCESS_LINK]')) {
                                processedBody = articleBody.replace(/\[ACCESS_LINK\]\(.*?\)/, '').trim();
                            }
                        }

                        const h4 = document.createElement('h4');
                        h4.className = 'glitch';
                        h4.setAttribute('data-text', articleTitle.toUpperCase());
                        h4.innerHTML = titleHtml;
                        workItem.appendChild(h4);

                        const contentDiv = document.createElement('div');
                        let html = processedBody
                            .replace(/^---\s*$/gm, '<hr class="schizo-hr">')
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
                            .replace(/^\*\s+(.*)/gm, '<li>$1</li>')
                            .replace(/\n/g, '<br>');
                        
                        html = html.replace(/(<li>.*<\/li>)+/g, match => `<ul>${match}</ul>`);
                        html = html.replace(/<\/ul><br>/g, '</ul>').replace(/<hr class="schizo-hr"><br>/g, '<hr class="schizo-hr">');
                        
                        contentDiv.innerHTML = html;
                        workItem.appendChild(contentDiv);
                        chaosSection.appendChild(workItem);
                    });

                    container.insertBefore(chaosSection, container.querySelector('footer'));
                });
            })
            .catch(err => {
                console.error(err);
                showLoading('articles-loader', 'Data stream corrupted.');
            });
    }

    function renderCV() {
        const container = document.querySelector('.cv-layout');
        if (!container) return;
        
        showLoading('cv-loader', 'Extracting personnel intel...');
        
        fetch('../contents/cv.md')
            .then(response => response.text())
            .then(text => {
                const loader = document.getElementById('cv-loader');
                if (loader) loader.style.display = 'none';
                
                container.innerHTML = '';
                
                const sections = text.split(/^##\s+/gm);
                sections.shift(); 
                
                sections.forEach(section => {
                    const lines = section.split('\n');
                    const title = lines[0].trim();
                    const rawContent = lines.slice(1).join('\n').trim();
                    
                    if (!title) return;

                    const block = document.createElement('section');
                    block.className = 'cv-block';
                    
                    const h2 = document.createElement('h2');
                    h2.className = 'glitch';
                    const id = title.toUpperCase().replace(/\s+/g, '_');
                    h2.setAttribute('data-text', id);
                    h2.innerText = id;
                    block.appendChild(h2);
                    
                    const workItem = document.createElement('div');
                    workItem.className = 'work-item';
                    
                    const contentLines = rawContent.split('\n');
                    let html = '';
                    let inList = false;
                    
                    contentLines.forEach(line => {
                        const trimmed = line.trim();
                        
                        if (trimmed.startsWith('###')) {
                            if (inList) { html += '</ul>'; inList = false; }
                            html += `<h4>${trimmed.replace(/^###\s+/, '')}</h4>`;
                        }
                        else if (trimmed.startsWith('*')) {
                            if (!inList) { html += '<ul>'; inList = true; }
                            html += `<li>${parseMarkdownInline(trimmed.replace(/^\*\s+/, ''))}</li>`;
                        }
                        else if (trimmed === '---') {
                            if (inList) { html += '</ul>'; inList = false; }
                            html += '<hr class="schizo-hr">';
                        }
                        else if (trimmed !== '') {
                            if (inList) { html += '</ul>'; inList = false; }
                            html += `<p>${parseMarkdownInline(trimmed)}</p>`;
                        }
                        else if (inList) {
                            html += '</ul>';
                            inList = false;
                        }
                    });
                    
                    if (inList) html += '</ul>';

                    workItem.innerHTML = html;
                    block.appendChild(workItem);
                    container.appendChild(block);
                });
            })
            .catch(err => {
                console.error(err);
                showLoading('cv-loader', 'Personnel record corrupted.');
            });
    }

    function parseMarkdownInline(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
    }

    function renderMovies() {
        showLoading('movie-list-container', 'Retrieving fragments...');
        fetch('../contents/movies.md')
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
        fetch('../contents/poems.md')
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
        fetch('../contents/drawings.md')
            .then(response => response.text())
            .then(text => {
                const container = document.getElementById('drawing-list');
                if (!container) return;
                container.innerHTML = '';
                text.split('\n').forEach(line => {
                    const trimmed = line.trim();
                    if (trimmed.startsWith('- http') || trimmed.startsWith('- ./')) {
                        let url = trimmed.replace('- ', '');
                        if (url.startsWith('./')) url = '../contents/' + url.slice(2);
                        renderImage(url, container);
                    }
                });
            });

        fetch('../contents/clicks.md')
            .then(response => response.text())
            .then(text => {
                const container = document.getElementById('click-list');
                if (!container) return;
                container.innerHTML = '';
                text.split('\n').forEach(line => {
                    const trimmed = line.trim();
                    if (trimmed.startsWith('- http') || trimmed.startsWith('- ./')) {
                        let url = trimmed.replace('- ', '');
                        if (url.startsWith('./')) url = '../contents/' + url.slice(2);
                        renderImage(url, container);
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
        
        fetch('../contents/stories.md')
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