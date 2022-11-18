window.onload = function() {
    const mainSelector = document.body;
    const subNavWrapper = mainSelector.querySelector('.sub-nav-wrapper');
    const navElements = mainSelector.querySelectorAll('.nav .channel > a');

    // Set the default history push state onload
    const stateObject = { slide_menu: "menu" };
    history.pushState(stateObject, "menu", "#menu");

    // set nav item event listeners
    for (var i = 0; i < navElements.length; i++) {
        if (navElements[i].classList.contains('politics')) {
          return;
        } else if (navElements[i].classList.contains('ent')) {
          return;
        } else if (navElements[i].classList.contains('target')) {
          return;
        }
        navElements[i].addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            cloneSubNav(this.nextSibling);

            // Set the history push state
            const stateObject = { slide_menu: "sub_menu" };
            history.pushState(stateObject, "menu", "#sub_menu");
            hashHandler();

            // Set sub nav scroll area height
            if (window.matchMedia("(orientation: portrait)").matches) {
                const scrollArea = mainSelector.querySelector('.sub-nav-wrapper .scroll-area');
                const getHeight = (window.innerHeight - 80) + 'px';
                scrollArea.style.height = getHeight;
            }
        });
    }

    function cloneSubNav(subNav) {
        const innerNavWrapper = subNavWrapper.querySelector('.inner-nav-wrapper');
        const clonedNav = subNav.cloneNode(true);
        innerNavWrapper.innerHTML = "";
        innerNavWrapper.appendChild(clonedNav);
        setBackArrow();
    }

    // set back arrow event listeners
    function setBackArrow() {
        const navBackArrow = subNavWrapper.querySelector('.header-link');
        navBackArrow.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Set the history push state
            const stateObject = { slide_menu: "menu" };
            history.pushState(stateObject, "menu", "#menu");
            hashHandler();
        });
    }

    function hashHandler() {
        this.oldHash = window.location.hash;

        const that = this;
        if (!!history.state) {
            if (history.state.slide_menu === 'sub_menu') {
                const innerNav = subNavWrapper.querySelector('.inner-nav-wrapper .inner-nav');
                if (!!innerNav) {
                    mainSelector.classList.add('slide-nav');
                } else {
                    // Set the history push state
                    const stateObject = { slide_menu: "menu" };
                    history.pushState(stateObject, "menu", "#menu");
                }
            } else {
                mainSelector.classList.remove('slide-nav');
            }

            that.oldHash = window.location.hash;
        }
    }

    hashHandler();
    window.addEventListener("hashchange", hashHandler, false);

    function onOrientationChange() {
        setTimeout(function() {
            // Set sub nav scroll area height
            const scrollArea = mainSelector.querySelector('.sub-nav-wrapper .scroll-area');
            if (!!scrollArea) {
                const getHeight = (window.innerHeight - 80) + 'px';
                scrollArea.style.height = getHeight;
            }
        }, 300);
    }

    window.addEventListener('orientationchange', onOrientationChange);
}
