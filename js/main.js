window.onload = function() {
    init();
}

function init() {
    facebookIframe();
    langSelect();
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