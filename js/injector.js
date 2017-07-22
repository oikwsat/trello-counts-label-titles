var inject = function(file, node) {
  var th = document.getElementsByTagName(node)[0];
  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);
  return th.appendChild(s);
};

inject(chrome.extension.getURL('/js/embeded.js'), 'body');
