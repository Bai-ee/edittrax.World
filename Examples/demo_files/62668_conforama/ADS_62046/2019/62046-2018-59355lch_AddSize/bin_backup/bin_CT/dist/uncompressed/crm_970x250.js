
    (()=>{
      /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./boilerplate.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../animateElements.js":
/*!*****************************!*\
  !*** ../animateElements.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_globalDeps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/globalDeps.js */ "../helpers/globalDeps.js");


/* harmony default export */ __webpack_exports__["default"] = (function(elementDeps) {
  const { R, adHit, stage, width, height, borderZIndex, borders, FOF_PIXEL_DENSITY, customBySize, TweenMax, TimelineMax, TweenLite, TimelineLite, Settings, Analytics, Platform, AnalyticsContent, EventForwarding, ThrowProps } = _helpers_globalDeps_js__WEBPACK_IMPORTED_MODULE_0__["default"];

  // Declare elements that are being animated
  const [stageBlock, headline_text, subhead_text, cta_text, details_text, badge_text, fg_img, style_img, logo_img, card_small_img, frame_img, promo_style_img, card_large_img, lifestyle_img, bg_img, replay_img, badge_bg_color, logo_bg_color, frame_bg_color, overlay_color, bg_color, line_color, replayContainer, legal_text, legal_text_bg_color, legal_closeX, legal_close] = elementDeps.animatedElements;

  TweenMax.to(stageBlock.element, 0.5, { autoAlpha: 0, ease: 'Power1.easeOut' });

  const startRotators = () => {
    elementDeps.rotators
      .filter(r => r !== null)
      .filter(r => r.startAutoPlay)
      .forEach(r => {

        let shouldCallStartAutoPlay = true;

        r.controlledBy.forEach(rotator => {
          if (rotator.isAutoPlaying === true) {
            shouldCallStartAutoPlay = false;
          }
        })

        if (shouldCallStartAutoPlay) {
          r.startAutoPlay();
        }
      })
  }

  const frame_1_in = new TimelineMax();
  const frame_1_out = new TimelineMax();
  const frame_2_in = new TimelineMax();
  const frame_2_out = new TimelineMax();
  const frame_3_in = new TimelineMax();
  const main_timeline = new TimelineMax();
  const tl = new TimelineMax();

  const animate320x480 = () => {

    if (fg_img.element) {
      frame_1_in.from(fg_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (style_img.element) {
      frame_1_in.from(style_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (logo_img.element) {
      frame_1_in.from(logo_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (headline_text.element) {
      frame_1_in.from(headline_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1.5);

    }

    if (subhead_text.element) {
      frame_1_in.from(subhead_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2);

    }

    if (cta_text.element) {
      frame_1_in.from(cta_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (details_text.element) {
      frame_1_in.from(details_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (badge_text.element) {
      frame_1_in.from(badge_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 3);

    }

    if (badge_bg_color.element) {
      frame_1_in.from(badge_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 3);

    }

    if (card_small_img.element) {
      frame_1_in.from(card_small_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (frame_img.element) {
      frame_1_in.from(frame_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (card_large_img.element) {
      frame_1_in.from(card_large_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (lifestyle_img.element) {
      frame_1_in.from(lifestyle_img.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (logo_bg_color.element) {
      frame_1_in.from(logo_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (frame_bg_color.element) {
      frame_1_in.from(frame_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  const animate300x600 = () => {

    if (fg_img.element) {
      frame_1_in.from(fg_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (style_img.element) {
      frame_1_in.from(style_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (logo_img.element) {
      frame_1_in.from(logo_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (headline_text.element) {
      frame_1_in.from(headline_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1.5);

    }

    if (subhead_text.element) {
      frame_1_in.from(subhead_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2);

    }

    if (cta_text.element) {
      frame_1_in.from(cta_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (details_text.element) {
      frame_1_in.from(details_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (badge_text.element) {
      frame_1_in.from(badge_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 3);

    }

    if (badge_bg_color.element) {
      frame_1_in.from(badge_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 3);

    }

    if (card_small_img.element) {
      frame_1_in.from(card_small_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (frame_img.element) {
      frame_1_in.from(frame_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (card_large_img.element) {
      frame_1_in.from(card_large_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (lifestyle_img.element) {
      frame_1_in.from(lifestyle_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (logo_bg_color.element) {
      frame_1_in.from(logo_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (frame_bg_color.element) {
      frame_1_in.from(frame_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  const animate160x600 = () => {

    if (fg_img.element) {
      frame_1_in.from(fg_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (style_img.element) {
      frame_1_in.from(style_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (logo_img.element) {
      frame_1_in.from(logo_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (headline_text.element) {
      frame_1_in.from(headline_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1.5);

    }

    if (subhead_text.element) {
      frame_1_in.from(subhead_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2);

    }

    if (cta_text.element) {
      frame_1_in.from(cta_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (details_text.element) {
      frame_1_in.from(details_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (badge_text.element) {
      frame_1_in.from(badge_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 3);

    }

    if (badge_bg_color.element) {
      frame_1_in.from(badge_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 3);

    }

    if (card_small_img.element) {
      frame_1_in.from(card_small_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (frame_img.element) {
      frame_1_in.from(frame_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (card_large_img.element) {
      frame_1_in.from(card_large_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (lifestyle_img.element) {
      frame_1_in.from(lifestyle_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (logo_bg_color.element) {
      frame_1_in.from(logo_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (frame_bg_color.element) {
      frame_1_in.from(frame_bg_color.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  const animate300x250 = () => {

    if (fg_img.element) {
      frame_1_in.from(fg_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (style_img.element) {
      frame_1_in.from(style_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (replay_img.element) {
      frame_3_in.from(replay_img.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

      replay_img.on('click', () => {

        tl.restart();
      });

    }

    if (logo_img.element) {
      frame_1_in.from(logo_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (card_small_img.element) {
      frame_1_in.from(card_small_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (headline_text.element) {
      frame_1_in.from(headline_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1.5);
      frame_1_out.to(headline_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);
      frame_3_in.fromTo(headline_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (cta_text.element) {
      frame_1_in.from(cta_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (details_text.element) {
      frame_1_in.from(details_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (subhead_text.element) {
      frame_2_in.from(subhead_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);
      frame_2_out.to(subhead_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (badge_text.element) {
      frame_2_in.from(badge_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1);
      frame_2_out.to(badge_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (badge_bg_color.element) {
      frame_2_in.from(badge_bg_color.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1);
      frame_2_out.to(badge_bg_color.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (frame_img.element) {
      frame_1_in.from(frame_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (card_large_img.element) {
      frame_1_in.from(card_large_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (lifestyle_img.element) {
      frame_1_in.from(lifestyle_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (logo_bg_color.element) {
      frame_1_in.from(logo_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (frame_bg_color.element) {
      frame_1_in.from(frame_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  const animate180x150 = () => {

    if (fg_img.element) {
      frame_1_in.from(fg_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (style_img.element) {
      frame_1_in.from(style_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (replay_img.element) {
      frame_3_in.from(replay_img.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

      replay_img.on('click', () => {

        tl.restart();
      });

    }

    if (logo_img.element) {
      frame_1_in.from(logo_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (headline_text.element) {
      frame_1_in.from(headline_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1.5);
      frame_1_out.to(headline_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);
      frame_3_in.fromTo(headline_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (cta_text.element) {
      frame_1_in.from(cta_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (details_text.element) {
      frame_1_in.from(details_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (subhead_text.element) {
      frame_2_in.from(subhead_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);
      frame_2_out.to(subhead_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (badge_text.element) {
      frame_2_in.from(badge_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1);
      frame_2_out.to(badge_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (badge_bg_color.element) {
      frame_2_in.from(badge_bg_color.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1);
      frame_2_out.to(badge_bg_color.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (card_small_img.element) {
      frame_1_in.from(card_small_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (frame_img.element) {
      frame_1_in.from(frame_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (card_large_img.element) {
      frame_1_in.from(card_large_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (logo_bg_color.element) {
      frame_1_in.from(logo_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (frame_bg_color.element) {
      frame_1_in.from(frame_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  const animate728x90 = () => {

    if (fg_img.element) {
      frame_1_in.from(fg_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (style_img.element) {
      frame_1_in.from(style_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (replay_img.element) {
      frame_3_in.from(replay_img.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

      replay_img.on('click', () => {

        tl.restart();
      });

    }

    if (logo_img.element) {
      frame_1_in.from(logo_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (card_small_img.element) {
      frame_1_in.from(card_small_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (line_color.element) {
      frame_1_in.from(line_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.25);

    }

    if (cta_text.element) {
      frame_1_in.from(cta_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1);

    }

    if (details_text.element) {
      frame_1_in.from(details_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1.5);

    }

    if (headline_text.element) {
      frame_1_in.from(headline_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);
      frame_1_out.to(headline_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);
      frame_3_in.fromTo(headline_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (subhead_text.element) {
      frame_2_in.from(subhead_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);
      frame_2_out.to(subhead_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (badge_text.element) {
      frame_2_in.from(badge_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1);
      frame_2_out.to(badge_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (badge_bg_color.element) {
      frame_2_in.from(badge_bg_color.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1);
      frame_2_out.to(badge_bg_color.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (frame_img.element) {
      frame_1_in.from(frame_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (card_large_img.element) {
      frame_1_in.from(card_large_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (lifestyle_img.element) {
      frame_1_in.from(lifestyle_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (logo_bg_color.element) {
      frame_1_in.from(logo_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (frame_bg_color.element) {
      frame_1_in.from(frame_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  const animate468x60 = () => {

    if (fg_img.element) {
      frame_1_in.from(fg_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (style_img.element) {
      frame_1_in.from(style_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (replay_img.element) {
      frame_3_in.from(replay_img.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

      replay_img.on('click', () => {

        tl.restart();
      });

    }

    if (logo_img.element) {
      frame_1_in.from(logo_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (line_color.element) {
      frame_1_in.from(line_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.25);

    }

    if (cta_text.element) {
      frame_1_in.from(cta_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1);

    }

    if (details_text.element) {
      frame_1_in.from(details_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1.5);

    }

    if (headline_text.element) {
      frame_1_in.from(headline_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);
      frame_1_out.to(headline_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);
      frame_3_in.fromTo(headline_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (subhead_text.element) {
      frame_2_in.from(subhead_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);
      frame_2_out.to(subhead_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (badge_text.element) {
      frame_2_in.from(badge_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1);
      frame_2_out.to(badge_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (badge_bg_color.element) {
      frame_2_in.from(badge_bg_color.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1);
      frame_2_out.to(badge_bg_color.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (card_small_img.element) {
      frame_1_in.from(card_small_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (frame_img.element) {
      frame_1_in.from(frame_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (card_large_img.element) {
      frame_1_in.from(card_large_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (logo_bg_color.element) {
      frame_1_in.from(logo_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (frame_bg_color.element) {
      frame_1_in.from(frame_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  const animate320x50 = () => {

    if (fg_img.element) {
      frame_1_in.from(fg_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (style_img.element) {
      frame_1_in.from(style_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (replay_img.element) {
      frame_3_in.from(replay_img.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

      replay_img.on('click', () => {

        tl.restart();
      });

    }

    if (logo_img.element) {
      frame_1_in.from(logo_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (line_color.element) {
      frame_1_in.from(line_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.25);

    }

    if (cta_text.element) {
      frame_1_in.from(cta_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1);

    }

    if (details_text.element) {
      frame_1_in.from(details_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1.5);

    }

    if (headline_text.element) {
      frame_1_in.from(headline_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);
      frame_1_out.to(headline_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);
      frame_3_in.fromTo(headline_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (subhead_text.element) {
      frame_2_in.from(subhead_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);
      frame_2_out.to(subhead_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (badge_text.element) {
      frame_2_in.from(badge_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1);
      frame_2_out.to(badge_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (badge_bg_color.element) {
      frame_2_in.from(badge_bg_color.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1);
      frame_2_out.to(badge_bg_color.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (card_small_img.element) {
      frame_1_in.from(card_small_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (frame_img.element) {
      frame_1_in.from(frame_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (card_large_img.element) {
      frame_1_in.from(card_large_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (logo_bg_color.element) {
      frame_1_in.from(logo_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (frame_bg_color.element) {
      frame_1_in.from(frame_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  const animate300x1050 = () => {

    if (fg_img.element) {
      frame_1_in.from(fg_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (style_img.element) {
      frame_1_in.from(style_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (logo_img.element) {
      frame_1_in.from(logo_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (headline_text.element) {
      frame_1_in.from(headline_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1.5);

    }

    if (subhead_text.element) {
      frame_1_in.from(subhead_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2);

    }

    if (cta_text.element) {
      frame_1_in.from(cta_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (details_text.element) {
      frame_1_in.from(details_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (badge_text.element) {
      frame_1_in.from(badge_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 3);

    }

    if (badge_bg_color.element) {
      frame_1_in.from(badge_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 3);

    }

    if (card_small_img.element) {
      frame_1_in.from(card_small_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (frame_img.element) {
      frame_1_in.from(frame_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (card_large_img.element) {
      frame_1_in.from(card_large_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (lifestyle_img.element) {
      frame_1_in.from(lifestyle_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (logo_bg_color.element) {
      frame_1_in.from(logo_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (frame_bg_color.element) {
      frame_1_in.from(frame_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  const animate336x280 = () => {

    if (fg_img.element) {
      frame_1_in.from(fg_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (style_img.element) {
      frame_1_in.from(style_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (replay_img.element) {
      frame_3_in.from(replay_img.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

      replay_img.on('click', () => {

        tl.restart();
      });

    }

    if (logo_img.element) {
      frame_1_in.from(logo_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (card_small_img.element) {
      frame_1_in.from(card_small_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (headline_text.element) {
      frame_1_in.from(headline_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1.5);
      frame_1_out.to(headline_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);
      frame_3_in.fromTo(headline_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (cta_text.element) {
      frame_1_in.from(cta_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (details_text.element) {
      frame_1_in.from(details_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (subhead_text.element) {
      frame_2_in.from(subhead_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);
      frame_2_out.to(subhead_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (badge_text.element) {
      frame_2_in.from(badge_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1);
      frame_2_out.to(badge_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (badge_bg_color.element) {
      frame_2_in.from(badge_bg_color.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1);
      frame_2_out.to(badge_bg_color.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (frame_img.element) {
      frame_1_in.from(frame_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (card_large_img.element) {
      frame_1_in.from(card_large_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (lifestyle_img.element) {
      frame_1_in.from(lifestyle_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (logo_bg_color.element) {
      frame_1_in.from(logo_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (frame_bg_color.element) {
      frame_1_in.from(frame_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  const animate320x100 = () => {

    if (fg_img.element) {
      frame_1_in.from(fg_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (style_img.element) {
      frame_1_in.from(style_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (replay_img.element) {
      frame_3_in.from(replay_img.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

      replay_img.on('click', () => {

        tl.restart();
      });

    }

    if (logo_img.element) {
      frame_1_in.from(logo_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (line_color.element) {
      frame_1_in.from(line_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.25);

    }

    if (headline_text.element) {
      frame_1_in.from(headline_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);
      frame_1_out.to(headline_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);
      frame_3_in.fromTo(headline_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (details_text.element) {
      frame_1_in.from(details_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1);

    }

    if (cta_text.element) {
      frame_1_in.from(cta_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1);

    }

    if (subhead_text.element) {
      frame_2_in.from(subhead_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);
      frame_2_out.to(subhead_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (badge_text.element) {
      frame_2_in.from(badge_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1);
      frame_2_out.to(badge_text.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (badge_bg_color.element) {
      frame_2_in.from(badge_bg_color.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1);
      frame_2_out.to(badge_bg_color.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (card_small_img.element) {
      frame_1_in.from(card_small_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (frame_img.element) {
      frame_1_in.from(frame_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (card_large_img.element) {
      frame_1_in.from(card_large_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (logo_bg_color.element) {
      frame_1_in.from(logo_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (frame_bg_color.element) {
      frame_1_in.from(frame_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  const animate970x250 = () => {

    if (fg_img.element) {
      frame_1_in.from(fg_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (style_img.element) {
      frame_1_in.from(style_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (logo_img.element) {
      frame_1_in.from(logo_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (line_color.element) {
      frame_1_in.from(line_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.25);

    }

    if (headline_text.element) {
      frame_1_in.from(headline_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (subhead_text.element) {
      frame_1_in.from(subhead_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1);

    }

    if (cta_text.element) {
      frame_1_in.from(cta_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (details_text.element) {
      frame_1_in.from(details_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (badge_text.element) {
      frame_1_in.from(badge_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 3);

    }

    if (badge_bg_color.element) {
      frame_1_in.from(badge_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 3);

    }

    if (card_small_img.element) {
      frame_1_in.from(card_small_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2);

    }

    if (frame_img.element) {
      frame_1_in.from(frame_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (card_large_img.element) {
      frame_1_in.from(card_large_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (lifestyle_img.element) {
      frame_1_in.from(lifestyle_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (logo_bg_color.element) {
      frame_1_in.from(logo_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (frame_bg_color.element) {
      frame_1_in.from(frame_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  const animate800x250 = () => {

    if (fg_img.element) {
      frame_1_in.from(fg_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (style_img.element) {
      frame_1_in.from(style_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (logo_img.element) {
      frame_1_in.from(logo_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (line_color.element) {
      frame_1_in.from(line_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.25);

    }

    if (headline_text.element) {
      frame_1_in.from(headline_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (subhead_text.element) {
      frame_1_in.from(subhead_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 1);

    }

    if (cta_text.element) {
      frame_1_in.from(cta_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (details_text.element) {
      frame_1_in.from(details_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2.5);

    }

    if (badge_text.element) {
      frame_1_in.from(badge_text.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 3);

    }

    if (badge_bg_color.element) {
      frame_1_in.from(badge_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 3);

    }

    if (card_small_img.element) {
      frame_1_in.from(card_small_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 2);

    }

    if (frame_img.element) {
      frame_1_in.from(frame_img.element, 1, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (card_large_img.element) {
      frame_1_in.from(card_large_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (lifestyle_img.element) {
      frame_1_in.from(lifestyle_img.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0.5);

    }

    if (logo_bg_color.element) {
      frame_1_in.from(logo_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    if (frame_bg_color.element) {
      frame_1_in.from(frame_bg_color.element, 2, { ease: 'Power1.easeOut', autoAlpha: 0 }, 0);

    }

    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  animate970x250();

  tl.add(frame_1_in);
  tl.add(frame_1_out);
  tl.add(frame_2_in);
  tl.add(frame_2_out);
  tl.add(frame_3_in);
  tl.add(main_timeline);

});


/***/ }),

/***/ "../createElements.js":
/*!****************************!*\
  !*** ../createElements.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/helper.js */ "../helpers/helper.js");
/* harmony import */ var _helpers_additionalSettings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/additionalSettings.js */ "../helpers/additionalSettings.js");
/* harmony import */ var _helpers_beforeRenderSettings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/beforeRenderSettings.js */ "../helpers/beforeRenderSettings.js");
/* harmony import */ var _helpers_globalDeps_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/globalDeps.js */ "../helpers/globalDeps.js");





/* harmony default export */ __webpack_exports__["default"] = (function(packs, renderDone) {
  const { R, adHit, stage, width, height, borderZIndex, borders, FOF_PIXEL_DENSITY, customBySize, TweenMax, TimelineMax, TweenLite, TimelineLite, Settings, Analytics, Platform, AnalyticsContent, EventForwarding, ThrowProps } = _helpers_globalDeps_js__WEBPACK_IMPORTED_MODULE_3__["default"];
  const { Hammer } = packs;

  const stageBlock = R.create('div').set({
    css: {
      height: height,
      width: width,
      zIndex: borderZIndex - 1,
      backgroundColor: '#ffffff',
      pointerEvents: 'none',
      cursor: 'auto'
    },
    attr: {
      id: 'stage-block'
    },
    rosetta: {
      parentNode: stage
    }
  });

  const headline_text = R.create('div').set({
    css: {
      color: R.create('var').set({ name: 'headline_text_color', defaultValue: '#000000', dataType: 'Color', required: false, exposed: true }).render().value(),
      fontSize: 35,
      fontFamily: 10747,
      lineHeight: 1.06,
      letterSpacing: 0.875,
      textAlign: 'left',
      verticalAlign: 'middle',
      marginTop: 8,
      backgroundColor: R.create('var').set({ name: 'headline_text_background_color', defaultValue: '', dataType: 'Gradient', required: false, exposed: true }).render().value(),
      padding: '',
      left: 264,
      top: 25,
      width: 190,
      height: 128,
      zIndex: 393,
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      border: '',
      borderRadius: 0,
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage,
      pixelDensity: FOF_PIXEL_DENSITY,
      forceLineHeight: true
    },
    attr: {
      id: 'headline_text',
      textContent: R.create('var').set({ name: 'headline_text', defaultValue: '', dataType: 'String', required: true, exposed: true }).render().value()
    }
  })

  const subhead_text = R.create('div').set({
    css: {
      color: R.create('var').set({ name: 'subhead_text_color', defaultValue: '#000000', dataType: 'Color', required: false, exposed: true }).render().value(),
      fontSize: 15,
      fontFamily: 10755,
      lineHeight: 1.33,
      letterSpacing: 0.375,
      textAlign: 'left',
      verticalAlign: 'middle',
      marginTop: 6,
      backgroundColor: R.create('var').set({ name: 'subhead_text_background_color', defaultValue: '', dataType: 'Gradient', required: false, exposed: true }).render().value(),
      padding: '',
      left: 264,
      top: 159,
      width: 190,
      height: 66,
      zIndex: 392,
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      border: '',
      borderRadius: 0,
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage,
      pixelDensity: FOF_PIXEL_DENSITY,
      forceLineHeight: true
    },
    attr: {
      id: 'subhead_text',
      textContent: R.create('var').set({ name: 'subhead_text', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value()
    }
  })

  const cta_text = R.create('div').set({
    css: {
      color: R.create('var').set({ name: 'cta_text_color', defaultValue: '#ffffff', dataType: 'Color', required: false, exposed: true }).render().value(),
      fontSize: 16,
      fontFamily: 10747,
      lineHeight: 1,
      letterSpacing: 0.4,
      textAlign: 'center',
      verticalAlign: 'middle',
      marginTop: 0,
      backgroundColor: R.create('var').set({ name: 'cta_text_background_color', defaultValue: '#000000', dataType: 'Gradient', required: false, exposed: true }).render().value(),
      padding: '9px 13px 9px 13px',
      left: 762,
      top: 141,
      width: 176,
      height: 36,
      zIndex: 357,
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      border: '',
      borderRadius: 0,
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage,
      pixelDensity: FOF_PIXEL_DENSITY,
      forceLineHeight: false
    },
    attr: {
      id: 'cta_text',
      textContent: R.create('var').set({ name: 'cta_text', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value()
    }
  })

  const details_text = R.create('div').set({
    css: {
      color: R.create('var').set({ name: 'details_text_color', defaultValue: '#000000', dataType: 'Color', required: false, exposed: true }).render().value(),
      fontSize: 10,
      fontFamily: 10755,
      lineHeight: 1.2,
      letterSpacing: 0,
      textAlign: 'center',
      verticalAlign: 'middle',
      marginTop: 11,
      backgroundColor: R.create('var').set({ name: 'details_text_background_color', defaultValue: '', dataType: 'Gradient', required: false, exposed: true }).render().value(),
      padding: '',
      left: 762,
      top: 188,
      width: 176,
      height: 31,
      zIndex: 356,
      pointerEvents: 'auto',
      cursor: 'pointer',
      position: 'absolute',
      border: '',
      borderRadius: 0,
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage,
      pixelDensity: FOF_PIXEL_DENSITY,
      forceLineHeight: true
    },
    attr: {
      id: 'details_text',
      textContent: R.create('var').set({ name: 'details_text', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value()
    }
  })
  details_text.on('click', displayLegal);

  const badge_text = R.create('div').set({
    css: {
      color: R.create('var').set({ name: 'badge_text_color', defaultValue: '#ffffff', dataType: 'Color', required: false, exposed: true }).render().value(),
      fontSize: 13,
      fontFamily: 10747,
      lineHeight: 1.15,
      letterSpacing: 0,
      textAlign: 'center',
      verticalAlign: 'middle',
      marginTop: 0,
      backgroundColor: R.create('var').set({ name: 'badge_text_background_color', defaultValue: '', dataType: 'Gradient', required: false, exposed: true }).render().value(),
      padding: '',
      left: 490,
      top: 201,
      width: 234,
      height: 36,
      zIndex: 322,
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      border: '',
      borderRadius: 0,
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage,
      pixelDensity: FOF_PIXEL_DENSITY,
      forceLineHeight: false
    },
    attr: {
      id: 'badge_text',
      textContent: R.create('var').set({ name: 'badge_text', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value()
    }
  })

  const fg_img = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'fg_img', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'contain',
      backgroundPosition: 'center center',
      left: 0,
      top: 0,
      width: width,
      height: height,
      zIndex: 788,
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage,
      tint: R.create('var').set({ name: 'fg_img_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'fg_img' }
  })

  const style_img = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'style_img', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'contain',
      backgroundPosition: 'center center',
      left: 0,
      top: 0,
      width: width,
      height: height,
      zIndex: 783,
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage,
      tint: R.create('var').set({ name: 'style_img_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'style_img' }
  })

  const logo_img = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'logo_img', defaultValue: '', dataType: 'String', required: true, exposed: true }).render().value(),
      backgroundSize: 'contain',
      backgroundPosition: 'center center',
      left: 20,
      top: 30,
      width: 200,
      height: 190,
      zIndex: 447,
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage,
      tint: R.create('var').set({ name: 'logo_img_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'logo_img' }
  })

  const card_small_img = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'card_small_img', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'contain',
      backgroundPosition: 'center center',
      left: 783,
      top: 31,
      width: 134,
      height: 83,
      zIndex: 289,
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage,
      tint: R.create('var').set({ name: 'card_small_img_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: {
      id: 'card_small_img',
      directoryType: 'shared'
    }
  })

  const frame_img = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'frame_img', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'contain',
      backgroundPosition: 'center center',
      left: 0,
      top: 0,
      width: width,
      height: height,
      zIndex: 267,
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage,
      tint: R.create('var').set({ name: 'frame_img_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'frame_img' }
  })

  const promo_style_img = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'promo_style_img', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'contain',
      backgroundPosition: 'center center',
      left: 0,
      top: 0,
      width: width,
      height: height,
      zIndex: 255,
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage,
      tint: R.create('var').set({ name: 'promo_style_img_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'promo_style_img' }
  })

  const card_large_img = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'card_large_img', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'contain',
      backgroundPosition: 'center center',
      left: 500,
      top: 60,
      width: 209,
      height: 130,
      zIndex: 220,
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage,
      tint: R.create('var').set({ name: 'card_large_img_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: {
      id: 'card_large_img',
      directoryType: 'shared'
    }
  })

  const lifestyle_img = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'lifestyle_img', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'contain',
      backgroundPosition: 'center center',
      left: 478,
      top: 7,
      width: 258,
      height: 236,
      zIndex: 191,
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage,
      tint: R.create('var').set({ name: 'lifestyle_img_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'lifestyle_img' }
  })

  const bg_img = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'bg_img', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'contain',
      backgroundPosition: 'center center',
      left: 0,
      top: 0,
      width: width,
      height: height,
      zIndex: 43,
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage,
      tint: R.create('var').set({ name: 'bg_img_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'bg_img' }
  })

  const replay_img = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'replay_img', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'contain',
      backgroundPosition: 'center center',
      left: 0,
      top: 0,
      width: 21,
      height: 21,
      zIndex: null,
      pointerEvents: 'auto',
      cursor: 'pointer',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: '',
      tint: R.create('var').set({ name: 'replay_img_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: {
      id: 'replay_img',
      directoryType: 'shared'
    }
  })

  const badge_bg_color = R.create('div').set({
    css: {
      left: 478,
      top: 195,
      zIndex: 307,
      width: 258,
      height: 48,
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      backgroundColor: R.create('var').set({ name: 'badge_bg_color', defaultValue: '', dataType: 'Gradient', requiredType: "false", exposed: true }).render().value(),
      borderRadius: 0,
      border: R.create('var').set({ name: 'badge_bg_border', defaultValue: '', dataType: 'String', requiredType: "false", exposed: true }).render().value(),
      visibility: 'hidden'
    },
    rosetta: { parentNode: stage },
    attr: { id: 'badge_bg_color' }
  })

  const logo_bg_color = R.create('div').set({
    css: {
      left: 0,
      top: 0,
      zIndex: 168,
      width: 237,
      height: 250,
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      backgroundColor: R.create('var').set({ name: 'logo_bg_color', defaultValue: '', dataType: 'Gradient', requiredType: "false", exposed: true }).render().value(),
      borderRadius: 0,
      border: R.create('var').set({ name: 'logo_bg_border', defaultValue: '', dataType: 'String', requiredType: "false", exposed: true }).render().value(),
      visibility: 'hidden'
    },
    rosetta: { parentNode: stage },
    attr: { id: 'logo_bg_color' }
  })

  const frame_bg_color = R.create('div').set({
    css: {
      left: 7,
      top: 7,
      zIndex: 155,
      width: 956,
      height: 236,
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      backgroundColor: R.create('var').set({ name: 'frame_bg_color', defaultValue: '', dataType: 'Gradient', requiredType: "false", exposed: true }).render().value(),
      borderRadius: 0,
      border: R.create('var').set({ name: 'frame_bg_border', defaultValue: '', dataType: 'String', requiredType: "false", exposed: true }).render().value(),
      visibility: 'hidden'
    },
    rosetta: { parentNode: stage },
    attr: { id: 'frame_bg_color' }
  })

  const overlay_color = R.create('div').set({
    css: {
      left: 0,
      top: 0,
      zIndex: 140,
      width: 970,
      height: 250,
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      backgroundColor: R.create('var').set({ name: 'overlay_color', defaultValue: '', dataType: 'Gradient', requiredType: "false", exposed: true }).render().value(),
      borderRadius: 0,
      border: R.create('var').set({ name: 'overlay_border', defaultValue: '', dataType: 'String', requiredType: "false", exposed: true }).render().value(),
      visibility: 'hidden'
    },
    rosetta: { parentNode: stage },
    attr: { id: 'overlay_color' }
  })

  const bg_color = R.create('div').set({
    css: {
      left: 0,
      top: 0,
      zIndex: 2,
      width: 970,
      height: 250,
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      backgroundColor: R.create('var').set({ name: 'bg_color', defaultValue: '', dataType: 'Gradient', requiredType: "false", exposed: true }).render().value(),
      borderRadius: 0,
      border: R.create('var').set({ name: 'bg_border', defaultValue: '', dataType: 'String', requiredType: "false", exposed: true }).render().value(),
      visibility: 'hidden'
    },
    rosetta: { parentNode: stage },
    attr: { id: 'bg_color' }
  })

  const line_color = R.create('div').set({
    css: {
      left: 236,
      top: 30,
      zIndex: 408,
      width: 2,
      height: 190,
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      backgroundColor: R.create('var').set({ name: 'line_color', defaultValue: '', dataType: 'Gradient', requiredType: "false", exposed: true }).render().value(),
      borderRadius: 0,
      border: R.create('var').set({ name: 'line_border', defaultValue: '', dataType: 'String', requiredType: "false", exposed: true }).render().value(),
      visibility: 'hidden'
    },
    rosetta: { parentNode: stage },
    attr: { id: 'line_color' }
  })

  let catImgsArr = []

  const replayContainer = R.create('div').set({
    attr: { id: 'replayContainer' },
    css: {
      name: 'replayContainer',
      zIndex: null,
      left: 0,
      top: 0,
      width: 21,
      height: 21,
      pointerEvents: 'none',
      visibility: 'hidden'
    },
    rosetta: { parentNode: '' }
  })

  function displayLegal() {
    if (legalTextContainer.element.style.visibility === 'hidden') {
      TweenMax.to(legalTextContainer.element, .25, { autoAlpha: 1 });
    } else {
      TweenMax.to(legalTextContainer.element, .25, { autoAlpha: 0 });
    }
  }

  const legalTextContainer = R.create('div').set({
    css: {
      id: 'legalTextContainer',
      left: 0,
      top: 0,
      width: width,
      height: height,
      zIndex: 800,
      visibility: 'hidden',
      pointerEvents: 'auto',
      opacity: 0.5,
      cursor: 'pointer'
    },
    rosetta: {
      parentNode: stage,
      data: { hitIndex: 0 }
    }
  })

  const legal_close = R.create('div').set({
    attr: {
      id: 'legal_close',
      textContent: 'close'
    },
    css: {
      fontSize: 12,
      fontFamily: 'OpenSans, sans-serif',
      textType: 'fontFaceText',
      lineHeight: 1,
      letterSpacing: 0,
      left: 26,
      top: 10,
      width: 270,
      height: 14,
      zIndex: 1196,
      pointerEvents: 'auto',
      cursor: 'pointer',
      position: 'absolute',
      color: '#FFFFFF',
      textAlign: 'left'
    },
    rosetta: { parentNode: legalTextContainer }
  })
  legal_close.on('click', displayLegal);

  const legal_closeX = R.create('div').set({
    css: {
      fontSize: 12,
      fontFamily: 'OpenSans, sans-serif',
      textType: 'fontFaceText',
      lineHeight: 1,
      letterSpacing: 0,
      left: 10,
      top: 10,
      width: 13,
      height: 13,
      zIndex: 1196,
      pointerEvents: 'auto',
      cursor: 'pointer',
      position: 'absolute',
      borderRadius: '7px',
      backgroundColor: '#FFFFFF',
      color: R.create('var').set({ name: "legal_text_bg_color", defaultValue: '', dataType: 'Color', requiredType: '', exposed: true }).render().value(),
      textAlign: 'center'
    },
    rosetta: {
      parentNode: legalTextContainer,
      resizeElement: false
    },
    attr: {
      id: 'legal_closeX',
      textContent: 'x'
    }
  })
  legal_closeX.on('click', displayLegal);

  const legal_text = R.create('div').set({
    css: {
      name: 'legalText',
      left: 10,
      top: 25,
      width: 950,
      height: 215,
      color: R.create('var').set({ name: 'legal_text_color', defaultValue: '#ffffff', dataType: 'Color', requiredType: '', exposed: true }).render().value(),
      fontFamily: 'Arial, Verdana, Helvetica, Sans',
      zIndex: 1,
      visibility: 'hidden',
      pointerEvents: 'auto',
      cursor: 'pointer',
      fontSize: 12,
      minFontSize: 12,
      textType: 'fontFaceText',
      lineHeight: 1,
      letterSpacing: 0,
      position: 'absolute',
      textAlign: 'left',
      overflowY: 'auto',
      wordBreak: 'break-word',
      paddingRight: '5px'
    },
    rosetta: {
      parentNode: legalTextContainer,
      data: { hitIndex: 0 },
      resizeElement: false
    },
    attr: {
      id: 'legal_text',
      textContent: R.create('var').set({ name: 'legal_text', defaultValue: '', dataType: 'String', requiredType: '', exposed: true }).render().value()
    }
  })

  const legal_text_bg_color = R.create('div').set({
    css: {
      name: 'legal_text_bg_color',
      zIndex: 0,
      left: 0,
      top: 0,
      width: 970,
      height: 250,
      backgroundColor: R.create('var').set({ name: 'legal_text_bg_color', defaultValue: '#000000', dataType: 'Color', requiredType: '', exposed: true }).render().value(),
      opacity: 0.8,
      cursor: 'pointer'
    },
    rosetta: {
      parentNode: legalTextContainer,
      data: { hitIndex: 0 }
    },
    attr: { id: 'legal_text_bg_color' }
  })

  if (!legal_text.textContent) {
    details_text.pointerEvents = 'none';
  }

  const group1Array = null;
  const group1 = null;

  const group2Array = null;
  const group2 = null;

  const group3Array = [cta_text, details_text];
  const group3 = R.create('AlignmentGroup').set({ rosetta: { verticalAlign: 'middle' } }).add(group3Array);

  const group4Array = null;
  const group4 = null;

  const group5Array = [headline_text, subhead_text];
  const group5 = R.create('AlignmentGroup').set({ rosetta: { verticalAlign: 'top' } }).add(group5Array);

  const allElementsArr = [stageBlock, headline_text, subhead_text, cta_text, details_text, badge_text, fg_img, style_img, logo_img, card_small_img, frame_img, promo_style_img, card_large_img, lifestyle_img, bg_img, replay_img, badge_bg_color, logo_bg_color, frame_bg_color, overlay_color, bg_color, line_color, replayContainer, legal_text, legal_text_bg_color, legal_closeX, legal_close];

  let elementsToRender = allElementsArr.filter(el => el !== null && !!el.parentNode && !el.length && !el.elements);
  elementsToRender.forEach(element => element.render());

  const requiredArr = [logo_img, headline_text]
    .filter(el => el !== null && !!el.parentNode);

  const groupsArr = [group1, group2, group3, group4, group5]
    .filter(el => el !== null);

  elementsToRender = elementsToRender.filter(el => el.instanceType !== 'AlignmentGroup' && (requiredArr.indexOf(el) === -1));

  const displayLoaded = loaded => {
    loaded.forEach(loadedEl => {
      loadedEl.forEach(el => {
        if (el.element) {
          el.visibility = '';
        }
      })
    })
  };

  const beforeRenderElements = Object(_helpers_beforeRenderSettings_js__WEBPACK_IMPORTED_MODULE_2__["default"])(allElementsArr, _helpers_globalDeps_js__WEBPACK_IMPORTED_MODULE_3__["default"]);

  const megaBatch = R.create('batch')
    .require(requiredArr)
    .add(groupsArr)
    .add(elementsToRender)
    .lite([])

  if (catImgsArr.length) {
    megaBatch.require(catImgsArr, 1);
  }

  megaBatch.render({
    success: () => {

      displayLoaded([
        R.filter.success(requiredArr),
        R.filter.success(groupsArr),
        R.filter.success(elementsToRender)

      ]);

      Object(_helpers_additionalSettings_js__WEBPACK_IMPORTED_MODULE_1__["default"])(allElementsArr, _helpers_globalDeps_js__WEBPACK_IMPORTED_MODULE_3__["default"], beforeRenderElements);

      // Pass all element dependencies for animateElements here
      const elementDeps = {
        animatedElements: [stageBlock, headline_text, subhead_text, cta_text, details_text, badge_text, fg_img, style_img, logo_img, card_small_img, frame_img, promo_style_img, card_large_img, lifestyle_img, bg_img, replay_img, badge_bg_color, logo_bg_color, frame_bg_color, overlay_color, bg_color, line_color, replayContainer, legal_text, legal_text_bg_color, legal_closeX, legal_close],
        rotators: []
      };

      // Call creativeReady and start animation
      renderDone(elementDeps);
    },
    fail: (e) => {
      R.fallback(e);
    }
  });

  const hit_area = R.create('div').set({
    id: 'ad_hit',
    width,
    height,
    pointerEvents: 'auto',
    cursor: 'pointer',
    zIndex: 0,
    parentNode: stage
  });
  hit_area.on('click', adHit);

});


/***/ }),

/***/ "../helpers/additionalSettings.js":
/*!****************************************!*\
  !*** ../helpers/additionalSettings.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(elements, globalDepsObj, beforeRenderElements) {
  const { R, adHit, stage, width, height, borderZIndex, borders, FOF_PIXEL_DENSITY, customBySize, TweenMax, TimelineMax, TweenLite, TimelineLite, Settings, Analytics, Platform, AnalyticsContent, EventForwarding, ThrowProps } = globalDepsObj;

  const [stageBlock, headline_text, subhead_text, cta_text, details_text, badge_text, fg_img, style_img, logo_img, card_small_img, frame_img, promo_style_img, card_large_img, lifestyle_img, bg_img, replay_img, badge_bg_color, logo_bg_color, frame_bg_color, overlay_color, bg_color, line_color, replayContainer, legal_text, legal_text_bg_color, legal_closeX, legal_close] = elements;

  return;
});


/***/ }),

/***/ "../helpers/beforeRenderSettings.js":
/*!******************************************!*\
  !*** ../helpers/beforeRenderSettings.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(elements, globalDepsObj) {
  const { R, adHit, stage, width, height, borderZIndex, borders, FOF_PIXEL_DENSITY, customBySize, TweenMax, TimelineMax, TweenLite, TimelineLite, Settings, Analytics, Platform, AnalyticsContent, EventForwarding, ThrowProps } = globalDepsObj;

  const [stageBlock, headline_text, subhead_text, cta_text, details_text, badge_text, fg_img, style_img, logo_img, card_small_img, frame_img, promo_style_img, card_large_img, lifestyle_img, bg_img, replay_img, badge_bg_color, logo_bg_color, frame_bg_color, overlay_color, bg_color, line_color, replayContainer, legal_text, legal_text_bg_color, legal_closeX, legal_close] = elements;

  return {

  }
});


/***/ }),

/***/ "../helpers/globalDeps.js":
/*!********************************!*\
  !*** ../helpers/globalDeps.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// at the time rcli build is run, all global dependencies will be added to this object.
/* harmony default export */ __webpack_exports__["default"] = ({
  
});

/***/ }),

/***/ "../helpers/helper.js":
/*!****************************!*\
  !*** ../helpers/helper.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function() {

  return;
});


/***/ }),

/***/ "./boilerplate.js":
/*!************************!*\
  !*** ./boilerplate.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createElements_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createElements.js */ "../createElements.js");
/* harmony import */ var _animateElements_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../animateElements.js */ "../animateElements.js");
/* harmony import */ var _helpers_globalDeps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/globalDeps */ "../helpers/globalDeps.js");




(() => {
  "use strict";
  const win = window;
  const creatives = (win._$OGO$_ || (win._$OGO$_ = {})) && (win._$OGO$_.Rosetta || (win._$OGO$_.Rosetta = {})) && (win._$OGO$_.Rosetta.creatives || (win._$OGO$_.Rosetta.creatives = []));
  const Rosetta = win._$OGO$_.Rosetta;
  const require = Rosetta.requirejs || require;

  const ROSETTA_VERSION = '4.50';
  const FOF_VERSION = '4.0.2';
  const ATOM_VERSION = '3.1.1';
  let WIDTH = 970;
  let HEIGHT = 250;

  let globalDeps = {};
  let animateElementsDeps = {};
  let platformConfig;
  let defined;

  function Creative(dmo){

    let registeredCallbacks = [], environStatuses = [], environTotals = 3, isEnvironReady = false, isCreativeReady = false;
    let R, Platform, Settings, Analytics, AnalyticsContent, TweenMax, TweenLite, TimelineLite, TimelineMax, EventForwarding, Hammer, ThrowProps;

    const context = String(ROSETTA_VERSION + "_" + dmo.embedId).split("_").join(".");
    let parentDiv, stage, animate, timeoutTimer, startTimer, FOF_PIXEL_DENSITY;
    let evergreenImg = "evergreen.jpg";
    const CENTER_STAGE = false;

    if (isNaN(WIDTH) || isNaN(HEIGHT)){
      WIDTH = Number(dmo.mediaWidth);
      HEIGHT = Number(dmo.mediaHeight);
    }

    let init = wrapperID => {
      const subdirectory = '59355LCH_LS_13thAdSize';
      const creativeName =  false || subdirectory;
      const companyID = '62046';
      const isSecure = (dmo.externalURL.indexOf("https:") > -1);

      let config = {
        context,
        waitSeconds: 5,
        paths: {},
        bundles: {
          "Rosetta": ["core.pack","ad.pack","cnvr.advantage.pack","cnvr.usweb.pack","filters.pack","xmlpush.pack","tweenmax.pack","fontface.pack","alignmentgroup.pack"]
        },
        map: {
          "*": {
            
          }
        }
      };
      
      config.bundles.Rosetta = (bundles => {
        if (typeof Object.create !== 'function') {
          let compatible = ["static.pack"];
          for (let i = 0; i < bundles.length; i++) {
            if (bundles[i].indexOf("cnvr.") > -1) {
              compatible.push(bundles[i]);
            }
          }
          if (typeof dmo.rosettaBundles === "function") {
            compatible = dmo.rosettaBundles(compatible)
          }
          try {
            if (dmo && dmo.logEvent && typeof dmo.logEvent === "function"){
              dmo.logEvent.call(dmo, 210, 'Object.create');
            }
          } catch(e){}
          return compatible;
        }
        return bundles;
      })(config.bundles.Rosetta);

      dmo.atomSuffix = dmo.atomSuffix || "";
      config.paths.Rosetta = dmo.externalURL + "/atom/" + ROSETTA_VERSION + "/" + ATOM_VERSION + "/?scripts=" + "wrapper_start," + config.bundles.Rosetta.join(",") + ",wrapper_end" + dmo.atomSuffix;

      let req = require.config(config);
      req(['require'].concat(config.bundles.Rosetta), () => {
        let Core = req("core/Core");
        Platform = req("platform/Platform");
        Settings = req("display/settings/GlobalSettings");
        Analytics = req("core/analytics/Analytics");
        AnalyticsContent = req("core/analytics/AnalyticsContent");
        EventForwarding = req("core/eventforwarding/EventForwarding");
        R = new Core();
        if (typeof dmo.rosettaLoaded === "function") {
          dmo.rosettaLoaded(req, R)
        }
        if (wrapperID) {
          Settings.overwrite({prefix: wrapperID + "_"});
          parentDiv = document.getElementById(wrapperID);
        }
        parentDiv = parentDiv || document.body;
        platformConfig = {
          isSecure,
          rosettaVersion: ROSETTA_VERSION,
          placementWidth: Number(dmo.mediaWidth) || WIDTH,
          placementHeight: Number(dmo.mediaHeight) || HEIGHT,
          clientID: dmo.companyId || companyID
        };
        Platform.overwrite(platformConfig);
        R.setFallback(fallback);

        if (R.isCompatible) {
          R.parseParameters(dmo.flashVars, 'flashvars');
          Platform.overwrite({
            clientID: R.create("var").set({
              name: "company_id",
              dataType: "String",
              defaultValue: Platform.fetch().clientID
            }).render().value(),
            cacheBuster: R.create("var").set({
              name: "bypass_cache",
              dataType: "Boolean",
              defaultValue: false,
              exposed: false
            }).render().value(),
            subdirectory: R.create("var").set({
              name: "subdirectory",
              dataType: "String",
              defaultValue: subdirectory
            }).render().value(),
            FOFVersion: R.create("var").set({
              name: "fof_version",
              dataType: "String",
              defaultValue: FOF_VERSION,
              exposed: false
            }).render().value(),
            isSecure: R.create("var").set({
              name: "dtm_secure",
              dataType: "Boolean",
              defaultValue: Platform.fetch().isSecure,
              exposed: false
            }).render().value(),
            analytics: dmo.logEvent,
            analyticsScope: dmo
          });
          if (R.create("var").set({
            name: "disable_retina",
            dataType: "Boolean",
            defaultValue: false,
            exposed: false
          }).render().value() === false
            && (R.environment.isRetina || R.create("var").set({
              name: "force_retina",
              dataType: "Boolean",
              defaultValue: false,
              exposed: false
            }).render().value())) {
            Settings.overwrite({pixelDensity: 2})
          }
          FOF_PIXEL_DENSITY = (() => {
            let pxDensity = R.create("var").set({
              name: "fof_pixel_density",
              dataType: "Number",
              exposed: false,
              defaultValue: Settings.fetch().pixelDensity
            }).render().value();
            pxDensity = Math.round(pxDensity);
            if (pxDensity !== 1 && pxDensity !== 2) {
              pxDensity = Settings.fetch().pixelDensity;
            }
            return pxDensity;
          })();
          startTimer = () => {
            let timeout = R.create("var").set({
              name: "default_timeout",
              dataType: "Number",
              defaultValue: 5,
              exposed: false
            }).render().value();

            timeoutTimer = setTimeout(function(){
              let timeoutInstance = {
                event: AnalyticsContent.FALL_BACK,
                failReason: {
                  type: AnalyticsContent.TIMED_OUT,
                  details: timeout
                }
              };
              R.fallback(timeoutInstance)
            }, timeout*1000);
          };
          if (CENTER_STAGE) {
            Analytics.fire({
              event: AnalyticsContent.INIT,
              instance: reveal,
              details: creativeName
            });
            let pds = parentDiv.style;
            pds.marginTop = -(Number(Platform.fetch().placementHeight) * 0.5) + "px";
            pds.marginLeft = -(Number(Platform.fetch().placementWidth) * 0.5) + "px";
            pds.top = "50%";
            pds.left = "50%";
            pds.position = "absolute";
          }
          evergreenImg = R.create("var").set({
            name: "evergreen_img",
            dataType: "String",
            defaultValue: evergreenImg
          }).render().value();
          assignSelector();
          createElements();
        } else {
          logEnvironStatus("NOT_COMPATIBLE", true);
          try {
            if (dmo && dmo.logEvent && typeof dmo.logEvent === "function"){
              if (config.bundles.Rosetta.join(",").indexOf("static.pack") === -1){
                dmo.logEvent.call(dmo, 210, 'R.isCompatible');
              }
            }
          } catch (e){}
          R.fallback();
        }
      }, e => {
        log(e);
      });

      return reveal;
    };

    // TODO: Delete this customBySize function once the parsing is added in. In the final product, calls to customBySize in the creative file will get parsed out.
    const customBySize = (defaultVal, config) => {
      const widthHeightString = `${platformConfig.placementWidth}x${platformConfig.placementHeight}`;

      let sizeSpecificValue;
      Object.keys(config).forEach(key => {
        if (key.includes(widthHeightString)) {
          sizeSpecificValue = config[key];
        }
      })

      return sizeSpecificValue ? sizeSpecificValue : defaultVal;
    }

    let createElements = () => {
      animate = _animateElements_js__WEBPACK_IMPORTED_MODULE_1__["default"];
      logEnvironStatus("createElements", "start");
      let width = R.create("var").set({
        name: "width",
        dataType: "Number",
        defaultValue: Platform.fetch().placementWidth,
        exposed: false
      }).render().value();
      let height = R.create("var").set({
        name: "height",
        dataType: "Number",
        defaultValue: Platform.fetch().placementHeight,
        exposed: false
      }).render().value();
      let borderColor = R.create("var").set({
        name: "border_color",
        dataType: "String",
        defaultValue: "#CCCCCC"
      }).render().value();

      stage = R.create("div").set({
        id: "stage",
        width,
        height,
        backgroundColor: "#FFFFFF",
        className: "stage"
      });
      parentDiv.appendChild(stage.element);
      Settings.overwrite({stage});
      new EventForwarding().init({stage});
      let borders = {
        l: R.create("div").set({
          width: "1px",
          height,
          backgroundColor: borderColor,
          left: 0,
          top: 0,
          zIndex: 809,
          pointerEvents: "none",
          parentNode: stage
        }).render(),
        r: R.create("div").set({
          width: "1px",
          height,
          backgroundColor: borderColor,
          right: 0,
          top: 0,
          zIndex: 809,
          pointerEvents: "none",
          parentNode: stage
        }).render(),
        t: R.create("div").set({
          width,
          height: "1px",
          backgroundColor: borderColor,
          left: 0,
          top: 0,
          zIndex: 809,
          pointerEvents: "none",
          parentNode: stage
        }).render(),
        b: R.create("div").set({
          width,
          height: "1px",
          backgroundColor: borderColor,
          left: 0,
          bottom: 0,
          zIndex: 809,
          pointerEvents: "none",
          parentNode: stage
        }).render()
      };

      const borderZIndex = 809

      R.applyCSSReset(".stage");

      /* [START_CREATE_ELEMENTS] */
      globalDeps = {R, adHit, stage, width, height, borderZIndex, borders, FOF_PIXEL_DENSITY, customBySize, TweenMax, TimelineMax, TweenLite, TimelineLite, Settings, Analytics, Platform, AnalyticsContent, EventForwarding, ThrowProps};
      let packs = defined;

      const allowedPacks = [
        'Draggable',
        'Parallax',
        'Hammer'
      ];

      const includedPacks = {};

      for (const key in packs) {
        allowedPacks.forEach(pack => {
          if (pack === key) {
            includedPacks[key] = packs[key];
          }
        });
      }

      /* [INSERT_JUNK_VARS] */

      // add all globalDeps to the globalDeps obj, so that when it is imported by createElements.js, it's all in there.
      Object.keys(globalDeps).forEach(key => {
        _helpers_globalDeps__WEBPACK_IMPORTED_MODULE_2__["default"][key] = globalDeps[key];
      });

      Object(_createElements_js__WEBPACK_IMPORTED_MODULE_0__["default"])(includedPacks, (obj) => {
        animateElementsDeps = obj;
        creativeReady();
      });

      /* [END_CREATE_ELEMENTS] */
    };

    let adHit = (e) => {
      try{
        // prevent event bubbling
        e.stopPropagation();
      } catch(err){}
      
      e = e || window.event;
      let instance = R.get(e.target)
      Analytics.fire({event: "click", instance: instance,  currentInstance:instance, details:""});
      var index = 0;
      if (instance && instance.data && instance.data.hitIndex) {
        index = instance.data.hitIndex;
      }
      dmo.handleCommand.call(dmo, "click", [index]);
    };

    let fallback = () => {
      R.create("ImageIE7").set({
        src: evergreenImg,
        subdirectory: "",
        directoryType: "evergreen",
        width: Platform.fetch().placementWidth,
        height: Platform.fetch().placementHeight,
        maxWidth: Platform.fetch().placementWidth,
        maxHeight: Platform.fetch().placementHeight,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#CCCCCC",
        boxSizing: "border-box",
        position: "absolute",
        zIndex: 500,
        display: "block"
      }).complete(function (inst) {
        if (stage) {
          Settings.overwrite({display: "none"});
          let allElements = R.get("");
          let i = allElements.length;
          while (--i > -1) {
            if (allElements[i] !== stage && allElements[i].element) {
              allElements[i].display = "none";
            }
          }
          stage.appendChild(inst);
          stage.display = "block";
        } else {
          parentDiv.appendChild(inst.element);
        }
        inst.element.onclick = adHit;

        animate = null;

        creativeReady();
      }).render();
    };

    let assignSelector = () => {
      defined = require.s.contexts[context].defined;
      let registry = require.s.contexts[context].registry;

      let enableModule = (defined, registry, name) => {
        if (registry[name] && !defined[name]) {
          registry[name].enable();
        }
        if (defined[name]) {
          return defined[name];
        }
      };

      TweenMax = enableModule(defined, registry, "TweenMax");
      if (TweenMax) {
        TweenMax.selector = R.selector
      }
      TweenLite = enableModule(defined, registry, "TweenLite");
      if (TweenLite) {
        Settings.overwrite({GSAPSelector: TweenLite.selector});
        TweenLite.selector = R.selector;
      }
      TimelineLite = enableModule(defined, registry, "TimelineLite");
      TimelineMax = enableModule(defined, registry, "TimelineMax");
      Hammer = enableModule(defined, registry, "Hammer");

      
    };

    let log = msg => {
      if (window && window.console) {
        let c = "Creative: ";
        try {
          if (window.console.debug && typeof msg === "object") {
            console.debug(msg);
          } else if (window.console.log) {
            console.log(c + msg);
          }
        } catch (e) {
        }
      }
    };

    let registerCallback = (evt, callback, scope) => {
      registeredCallbacks.push({evt, callback, scope});
      return reveal;
    };

    let checkForCallback = (evt, params) => {
      if (!evt) {
        return;
      }
      let arr = registeredCallbacks;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].evt === evt) {
          if (arr[i].callback) {
            try {
              arr[i].callback.call(arr[i].scope, params);
            } catch (e) {
              log("Callback failed");
            }
          }
        }
      }
    };

    let isArray = val => {
      if (!Array.isArray) {
        Array.isArray = (vArg) => {
          return Object.prototype.toString.call(vArg) === "[object Array]";
        };
      }
      return Array.isArray(val);
    };

    let environReady = isReady => {
      if (!isEnvironReady) {
        isEnvironReady = isReady;
        if (isReady ) {
          logEnvironStatus("parentEnvironment", isEnvironReady);
        }
      }
      return reveal;
    };

    let creativeReady = () => {
      if (!isCreativeReady) {
        isCreativeReady = true;
        let xmlPush = require.s.contexts[context].defined['platform/advantage/XMLPush'];
        if (xmlPush) {
          xmlPush.init();
        }
        checkForCallback("creative_ready");
        logEnvironStatus("creative", isCreativeReady);
      }
    };

    let logEnvironStatus = (src, val) => {
      environStatuses.push({src, val});
      if (environStatuses.length !== environTotals && !!checkEnvironStatus("parentEnvironment")) {
        if (!timeoutTimer && startTimer) {
          startTimer();
        }
      }
      if (environStatuses.length === environTotals) {
        showCreative();
      }
    };

    let checkEnvironStatus = src => {
      for (let i = 0; i < environStatuses.length; i++) {
        if (environStatuses[i].src === src) {
          return environStatuses[i].val;
        }
      }
      return false;
    };

    let showCreative = () => {
      if (timeoutTimer) {
        clearTimeout(timeoutTimer);
      }
      checkForCallback("creative_shown");
      if (Analytics) {
        Analytics.fire({
          event: AnalyticsContent.CREATIVE_SHOWN,
          instance: reveal
        });
      }

      if (animate) {
        animate(animateElementsDeps);
      }
    };

    const reveal = {
      init,
      registerCallback,
      environmentReady: environReady,
      enviromentReady: environReady
    };
    return reveal;
  }

  creatives.push(Creative);
  return Creative;
})();


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
    })()