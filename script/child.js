const params = new URLSearchParams(location.search)
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
window.onload = function() {
    webView.setAttribute('src', 'https://' + res)
    var url = webView.src;
    title.innerHTML = url
}
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
