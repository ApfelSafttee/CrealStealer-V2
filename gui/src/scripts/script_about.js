// ## IMPORTS ## //
const { shell } = require('electron')

// ## SIDEBAR SELECTOR ## //
const sidebar = document.querySelector('.sidebar'); //setup sidebar
const togglebtn = document.querySelector('.toggle-btn'); //setup toggle-btn

togglebtn.addEventListener('click', () => { //defining a page's active status (active or not)
    sidebar.classList.toggle('active'); //set active
});


// ## GITHUB BUTTON ## //
const githubLink = 'https://skids.rip/discord';
document.getElementById('github-link').addEventListener('click', () => {
    shell.openExternal(githubLink);
});

// ## TELEGRAM BUTTON ## //
const telegramLink = 'https://t.me/crealstealerr';
document.getElementById('telegram-link').addEventListener('click', () => {
    shell.openExternal(telegramLink);
});

document.addEventListener('DOMContentLoaded', () => {
    const url = 'https://rentry.co/crealinfo/raw';
    const aboutTextElement = document.getElementById('about-text');
    
    // Ajouter un paramètre de cache busting avec un timestamp
    const cacheBustingUrl = `${url}?t=${new Date().getTime()}`;

    fetch(cacheBustingUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            aboutTextElement.innerHTML = data;
        })
        .catch(error => {
            console.error('Error fetching the about text:', error);
            aboutTextElement.innerHTML = '<p>Failed to load content. Please try again later.</p>';
        });
});
