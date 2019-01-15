window.onload = function() {
    init();
}

function init() {
    facebookIframe();
    langSelect();
    instaFeed();
    getEvents();
}

function facebookIframe() {
    let frame = document.querySelector('.facebook-frame');
    let srcFrame = "https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fpg%2Fdrumpetduo&tabs=events&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false&appId=172930186099062"
    let descktopWidth = '&width=500';
    frame.src = screen.width > 767 ? srcFrame+descktopWidth : srcFrame;
}

function langSelect() {
    let wrapper = document.querySelector('#wrapper');
    let select = document.querySelector('#lang-select');
    let className = null;

    toggleLang();
    
    function toggleLang() {
        if(className) {
            toggleClass(wrapper,className);
        } 
        toggleClass(wrapper,select.value);
        className = select.value;
    }


    select.addEventListener('change', toggleLang);
}

function toggleClass(element, className) {
    element.classList.toggle(className);
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