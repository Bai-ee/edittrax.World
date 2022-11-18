const load = function() {
  if (window.location.pathname !== '/') {
    // code to hide the top & bottom safari bars on home page
    const safariTopBar = document.getElementsByClassName('safari-top-bar')[0];
    const safariBottomBar = document.getElementsByClassName('safari-bottom-bar')[0];
    const innerContainer = document.getElementsByClassName('inner-container')[0];
    const iframe = document.querySelector("iframe");

    // applying styles
    safariTopBar.style.display = 'flex';
    safariBottomBar.style.display = 'flex';
    iframe.classList.add('display-ad');
  }

  function startTime() {
    const now = new Date();
    const formattedNow = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    document.getElementsByClassName('safari-time')[0].innerHTML = formattedNow;
    t = setTimeout(function () {
        startTime()
    }, 60000);
  }
  startTime();

  /**
   * On window resize, hide display of dropdown menus
   */
  const shareSMS = document.querySelector('.dropdown-sms-menu');
  const shareEmail = document.querySelector('.dropdown-email-menu');

  let resizeTimer;
  function resize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      shareSMS.classList.remove('show');
      shareEmail.classList.remove('show');
    }, 250);
  };

  window.addEventListener('resize', resize, false);
}

window.addEventListener("load", load);