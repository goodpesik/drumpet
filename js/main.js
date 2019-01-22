window.onload = function() {
    init();
}

function init() {
    instaFeed();
    getEvents();
}

function instaFeed() {
    let container = document.querySelector('.instaFeed');
    let loadClass = 'loading';
    container.classList.add(loadClass);
    httpGetAsync('http://localhost:8081/instaFeed').then(function(resp) {
        container.classList.remove(loadClass);
        let containerHtml = '';
        if (resp.length) {
            containerHtml = `
            ${resp.map(function(item){
                return `
                    <a class="post" href="https//${item.url}">
                        <img src="${item.scr}" alt="${item.text}">
                        <p>${item.text}</p>
                    </a>
                `
                }).join('')}
            `;
        }
        container.innerHTML = containerHtml;
    });
}

function getEvents() {
    httpGetAsync('http://localhost:8081/events').then(function(resp) {
        console.log(resp);
    });
}

function httpGetAsync(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    return new Promise(function(resolve, reject) {
        xmlHttp.onload = function(resp) {
            resolve(JSON.parse(resp.currentTarget.response));
        }

        xmlHttp.open("GET", theUrl, true);
        xmlHttp.send();
	});
}