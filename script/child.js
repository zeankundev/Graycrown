const params = new URLSearchParams(location.search)
const res = params.get('uri');
const ref = document.getElementById('ref')
const webView = document.getElementById('webview');
const title = document.getElementById('title');
const close = document.getElementById('close');
const minimize = document.getElementById('min');
const maximize = document.getElementById('maximize');
const back = document.getElementById('back');
const forward = document.getElementById('forward');
const refresh = document.getElementById('refresh');
const downloads = document.getElementById('downloads');
const titleText = document.getElementById('title-text')
const imageToggle = document.getElementById('img-toggle');
var logic = 0;
console.log(res)
webView.setAttribute('src', res)

var url = webView.src;
title.innerHTML = url;

back.addEventListener('click', function(e) {
    e.preventDefault();
    webView.goBack();
});
forward.addEventListener('click', function(e) {
    e.preventDefault();
    webView.goForward();
});
refresh.addEventListener('click', function(e) {
    e.preventDefault();
    webView.src = webView.src
})
webView.addEventListener('did-start-loading', () => {
    ref.setAttribute('src', '../assets/new_icons/ic_fluent_dismiss_24_regular.svg')
})
webview.addEventListener('did-stop-loading', () => {
    title.innerHTML = webView.src;
    ref.setAttribute('src' , '../assets/new_icons/ic_fluent_arrow_clockwise_24_regular.svg')
});