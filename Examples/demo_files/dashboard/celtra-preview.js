window.addEventListener('message', function(e){
  if (e.data.name == 'openBrowser') {
    window.open(e.data.url, '_blank')
  }
});


window.onload = function() {
  const iframe = document.getElementById('ad-preview-container');
  const iframeWindow = iframe.contentWindow;

  iframeWindow.addEventListener('message', function(e){
    if (e.data.name == 'openBrowser') {
      window.open(e.data.url, '_blank');
    }
  });
}
