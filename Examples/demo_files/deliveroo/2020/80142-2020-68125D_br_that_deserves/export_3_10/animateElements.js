import globalDepsObj from './helpers/globalDeps.js';

export default function(elementDeps) {
  const { R, adHit, stage, stageWidth, stageHeight, borderZIndex, borders, FOF_PIXEL_DENSITY, FOF_RENDER_DENSITY, customBySize, TweenMax, TimelineMax, TweenLite, TimelineLite, Settings, Analytics, Platform, AnalyticsContent, ThrowProps } = globalDepsObj;

  // Declare elements that are being animated
  const [stageBlock, headline_vertical_text, cta_text, headline_horizontal_text, fg_img, style_img, logo_img, lifestyle_img, headline_text_bg_img1, headline_text_bg_img2, headline_text_bg_img3, headline_text_bg_img4, cta_text_bg_img1, default_img, bg_img, logo2_img, cta_text_bg_img2, cta_text_bg_img3, headline_text_bg_img5, headline_text_bg_img6, bg_color] = elementDeps.animatedElements;

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
          if (r.elements.length > 1 && r.startAutoPlay) {
            r.startAutoPlay();
          }
        }
      })
  }

  const all_frames = new TimelineMax();
  const main_timeline = new TimelineMax();
  const tl = new TimelineMax();

  const animate320x480 = () => {

    if (logo_img.element) {
      all_frames.from(logo_img.element, 2, { ease: 'Power4.easeOut', autoAlpha: 0 }, 0.25);
    }
    if (lifestyle_img.element) {
      all_frames.from(lifestyle_img.element, 1, { ease: 'Power4.easeOut', x: 239 }, 0);
    }
    if (headline_text_bg_img1.element) {
      all_frames.from(headline_text_bg_img1.element, 1, { ease: 'Power4.easeOut', x: -203 }, 0.5);
    }
    if (headline_text_bg_img2.element) {
      all_frames.from(headline_text_bg_img2.element, 1, { ease: 'Power4.easeOut', x: -221 }, 0.5);
    }
    if (headline_text_bg_img3.element) {
      all_frames.from(headline_text_bg_img3.element, 1, { ease: 'Power4.easeOut', x: -214 }, 0.5);
    }
    if (headline_text_bg_img4.element) {
      all_frames.from(headline_text_bg_img4.element, 1, { ease: 'Power4.easeOut', x: -210 }, 0.5);
    }
    if (cta_text_bg_img1.element) {
      all_frames.from(cta_text_bg_img1.element, 1, { ease: 'Power4.easeOut', x: 64 }, 3.5);
    }
    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  const animate300x600 = () => {

    if (logo_img.element) {
      all_frames.from(logo_img.element, 2, { ease: 'Power4.easeOut', autoAlpha: 0 }, 0.25);
    }
    if (lifestyle_img.element) {
      all_frames.from(lifestyle_img.element, 1, { ease: 'Power4.easeOut', x: 286 }, 0);
    }
    if (headline_text_bg_img1.element) {
      all_frames.from(headline_text_bg_img1.element, 1, { ease: 'Power4.easeOut', x: -214 }, 0.5);
    }
    if (headline_text_bg_img2.element) {
      all_frames.from(headline_text_bg_img2.element, 1, { ease: 'Power4.easeOut', x: -235 }, 0.5);
    }
    if (headline_text_bg_img3.element) {
      all_frames.from(headline_text_bg_img3.element, 1, { ease: 'Power4.easeOut', x: -226 }, 0.5);
    }
    if (headline_text_bg_img4.element) {
      all_frames.from(headline_text_bg_img4.element, 1, { ease: 'Power4.easeOut', x: -222 }, 0.5);
    }
    if (cta_text_bg_img1.element) {
      all_frames.from(cta_text_bg_img1.element, 1, { ease: 'Power4.easeOut', x: 56 }, 3.5);
    }
    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  const animate160x600 = () => {

    if (logo_img.element) {
      all_frames.from(logo_img.element, 2, { ease: 'Power4.easeOut', autoAlpha: 0 }, 0.25);
    }
    if (lifestyle_img.element) {
      all_frames.from(lifestyle_img.element, 1, { ease: 'Power4.easeOut', x: 151 }, 0);
    }
    if (headline_text_bg_img1.element) {
      all_frames.from(headline_text_bg_img1.element, 1, { ease: 'Power4.easeOut', x: -138 }, 0.5);
    }
    if (headline_text_bg_img2.element) {
      all_frames.from(headline_text_bg_img2.element, 1, { ease: 'Power4.easeOut', x: -152 }, 0.5);
    }
    if (headline_text_bg_img3.element) {
      all_frames.from(headline_text_bg_img3.element, 1, { ease: 'Power4.easeOut', x: -146 }, 0.5);
    }
    if (headline_text_bg_img4.element) {
      all_frames.from(headline_text_bg_img4.element, 1, { ease: 'Power4.easeOut', x: -144 }, 0.5);
    }
    if (cta_text_bg_img1.element) {
      all_frames.from(cta_text_bg_img1.element, 1, { ease: 'Power4.easeOut', x: 53 }, 3.5);
    }
    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  const animate300x250 = () => {

    if (lifestyle_img.element) {
      all_frames.from(lifestyle_img.element, 1, { ease: 'Power4.easeOut', x: 165 }, 0);
    }
    if (cta_text_bg_img2.element) {
      all_frames.from(cta_text_bg_img2.element, 1, { ease: 'Power4.easeOut', x: -115 }, 0.5);
    }
    if (cta_text_bg_img3.element) {
      all_frames.from(cta_text_bg_img3.element, 1, { ease: 'Power4.easeOut', x: -122 }, 0.5);
    }
    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  const animate180x150 = () => {

    if (lifestyle_img.element) {
      all_frames.from(lifestyle_img.element, 1, { ease: 'Power4.easeOut', x: 97 }, 0);
    }
    if (cta_text_bg_img2.element) {
      all_frames.from(cta_text_bg_img2.element, 1, { ease: 'Power4.easeOut', x: -69 }, 0.75);
    }
    if (cta_text_bg_img3.element) {
      all_frames.from(cta_text_bg_img3.element, 1, { ease: 'Power4.easeOut', x: -74 }, 0.75);
    }
    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  const animate728x90 = () => {

    if (headline_horizontal_text.element) {
      all_frames.from(headline_horizontal_text.element, 0.25, { ease: 'Power0.easeNone', autoAlpha: 0 }, 0.25);
    }
    if (logo_img.element) {
      all_frames.from(logo_img.element, 2, { ease: 'Power4.easeOut', autoAlpha: 0 }, 0);
    }
    if (lifestyle_img.element) {
      all_frames.from(lifestyle_img.element, 1, { ease: 'Power4.easeOut', y: 100 }, 0);
    }
    if (headline_text_bg_img5.element) {
      all_frames.from(headline_text_bg_img5.element, 0.25, { ease: 'Power0.easeNone', autoAlpha: 0 }, 0.25);
    }
    if (headline_text_bg_img6.element) {
      all_frames.from(headline_text_bg_img6.element, 0.25, { ease: 'Power0.easeNone', autoAlpha: 0 }, 0.25);
    }
    if (cta_text_bg_img1.element) {
      all_frames.from(cta_text_bg_img1.element, 1, { ease: 'Power4.easeOut', x: -67 }, 3.5);
    }
    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  const animate468x60 = () => {

    if (lifestyle_img.element) {
      all_frames.from(lifestyle_img.element, 1, { ease: 'Power4.easeOut', y: 66 }, 0);
    }
    if (cta_text_bg_img2.element) {
      all_frames.from(cta_text_bg_img2.element, 0.25, { ease: 'Power0.easeNone', autoAlpha: 0 }, 0.75);
    }
    if (cta_text_bg_img3.element) {
      all_frames.from(cta_text_bg_img3.element, 0.25, { ease: 'Power0.easeNone', autoAlpha: 0 }, 0.75);
    }
    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  const animate320x50 = () => {

    if (lifestyle_img.element) {
      all_frames.from(lifestyle_img.element, 1, { ease: 'Power4.easeOut', y: 52 }, 0);
    }
    if (cta_text_bg_img2.element) {
      all_frames.from(cta_text_bg_img2.element, 0.25, { ease: 'Power0.easeNone', autoAlpha: 0 }, 0.75);
    }
    if (cta_text_bg_img3.element) {
      all_frames.from(cta_text_bg_img3.element, 0.25, { ease: 'Power0.easeNone', autoAlpha: 0 }, 0.75);
    }
    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  const animate300x1050 = () => {

    if (logo_img.element) {
      all_frames.from(logo_img.element, 2, { ease: 'Power4.easeOut', autoAlpha: 0 }, 0.25);
    }
    if (lifestyle_img.element) {
      all_frames.from(lifestyle_img.element, 1, { ease: 'Power4.easeOut', x: 280 }, 0);
    }
    if (headline_text_bg_img1.element) {
      all_frames.from(headline_text_bg_img1.element, 1, { ease: 'Power4.easeOut', x: -254 }, 0.5);
    }
    if (headline_text_bg_img2.element) {
      all_frames.from(headline_text_bg_img2.element, 1, { ease: 'Power4.easeOut', x: -280 }, 0.5);
    }
    if (headline_text_bg_img3.element) {
      all_frames.from(headline_text_bg_img3.element, 1, { ease: 'Power4.easeOut', x: -270 }, 0.5);
    }
    if (headline_text_bg_img4.element) {
      all_frames.from(headline_text_bg_img4.element, 1, { ease: 'Power4.easeOut', x: -265 }, 0.5);
    }
    if (cta_text_bg_img1.element) {
      all_frames.from(cta_text_bg_img1.element, 1, { ease: 'Power4.easeOut', x: 81 }, 3.5);
    }
    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  const animate336x280 = () => {

    if (lifestyle_img.element) {
      all_frames.from(lifestyle_img.element, 1, { ease: 'Power4.easeOut', x: 184 }, 0);
    }
    if (cta_text_bg_img2.element) {
      all_frames.from(cta_text_bg_img2.element, 1, { ease: 'Power4.easeOut', x: -128 }, 0.75);
    }
    if (cta_text_bg_img3.element) {
      all_frames.from(cta_text_bg_img3.element, 1, { ease: 'Power4.easeOut', x: -137 }, 0.75);
    }
    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  const animate970x90 = () => {

    if (headline_horizontal_text.element) {
      all_frames.from(headline_horizontal_text.element, 0.25, { ease: 'Power0.easeNone', autoAlpha: 0 }, 0.25);
    }
    if (logo_img.element) {
      all_frames.from(logo_img.element, 2, { ease: 'Power4.easeOut', autoAlpha: 0 }, 0.25);
    }
    if (lifestyle_img.element) {
      all_frames.from(lifestyle_img.element, 1, { ease: 'Power4.easeOut', y: 99 }, 0);
    }
    if (headline_text_bg_img5.element) {
      all_frames.from(headline_text_bg_img5.element, 0.25, { ease: 'Power0.easeNone', autoAlpha: 0 }, 0.25);
    }
    if (headline_text_bg_img6.element) {
      all_frames.from(headline_text_bg_img6.element, 0.25, { ease: 'Power0.easeNone', autoAlpha: 0 }, 0.25);
    }
    if (cta_text_bg_img1.element) {
      all_frames.from(cta_text_bg_img1.element, 1, { ease: 'Power4.easeOut', x: -79 }, 3.5);
    }
    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  const animate970x250 = () => {

    if (logo_img.element) {
      all_frames.from(logo_img.element, 2, { ease: 'Power4.easeOut', autoAlpha: 0 }, 0);
    }
    if (lifestyle_img.element) {
      all_frames.from(lifestyle_img.element, 1, { ease: 'Power4.easeOut', y: 221 }, 0);
    }
    if (headline_text_bg_img1.element) {
      all_frames.from(headline_text_bg_img1.element, 1, { ease: 'Power4.easeOut', x: -270 }, 0.5);
    }
    if (headline_text_bg_img2.element) {
      all_frames.from(headline_text_bg_img2.element, 1, { ease: 'Power4.easeOut', x: -295 }, 0.5);
    }
    if (headline_text_bg_img3.element) {
      all_frames.from(headline_text_bg_img3.element, 1, { ease: 'Power4.easeOut', x: -285 }, 0.5);
    }
    if (headline_text_bg_img4.element) {
      all_frames.from(headline_text_bg_img4.element, 1, { ease: 'Power4.easeOut', x: -281 }, 0.5);
    }
    if (cta_text_bg_img1.element) {
      all_frames.from(cta_text_bg_img1.element, 1, { ease: 'Power4.easeOut', x: 80 }, 3.5);
    }
    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  const animate800x250 = () => {

    if (logo_img.element) {
      all_frames.from(logo_img.element, 2, { ease: 'Power4.easeOut', autoAlpha: 0 }, 0.25);
    }
    if (lifestyle_img.element) {
      all_frames.from(lifestyle_img.element, 1, { ease: 'Power4.easeOut', y: 214 }, 0);
    }
    if (headline_text_bg_img1.element) {
      all_frames.from(headline_text_bg_img1.element, 1, { ease: 'Power4.easeOut', x: -221 }, 0.5);
    }
    if (headline_text_bg_img2.element) {
      all_frames.from(headline_text_bg_img2.element, 1, { ease: 'Power4.easeOut', x: -241 }, 0.5);
    }
    if (headline_text_bg_img3.element) {
      all_frames.from(headline_text_bg_img3.element, 1, { ease: 'Power4.easeOut', x: -233 }, 0.5);
    }
    if (headline_text_bg_img4.element) {
      all_frames.from(headline_text_bg_img4.element, 1, { ease: 'Power4.easeOut', x: -229 }, 0.5);
    }
    if (cta_text_bg_img1.element) {
      all_frames.from(cta_text_bg_img1.element, 1, { ease: 'Power4.easeOut', x: 80 }, 3.5);
    }
    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  const animate320x100 = () => {

    if (lifestyle_img.element) {
      all_frames.from(lifestyle_img.element, 1, { ease: 'Power4.easeOut', y: 84 }, 0);
    }
    if (cta_text_bg_img2.element) {
      all_frames.from(cta_text_bg_img2.element, 1, { ease: 'Power4.easeOut', x: -84 }, 0.75);
    }
    if (cta_text_bg_img3.element) {
      all_frames.from(cta_text_bg_img3.element, 1, { ease: 'Power4.easeOut', x: -89 }, 0.75);
    }
    main_timeline.add(TweenMax.delayedCall(.25, startRotators))
  }

  customBySize(() => {}, {
    '320x480': animate320x480,
    '300x600': animate300x600,
    '160x600': animate160x600,
    '300x250': animate300x250,
    '180x150': animate180x150,
    '728x90': animate728x90,
    '468x60': animate468x60,
    '320x50': animate320x50,
    '300x1050': animate300x1050,
    '336x280': animate336x280,
    '970x90': animate970x90,
    '970x250': animate970x250,
    '800x250': animate800x250,
    '320x100': animate320x100
  })();

  tl.add(all_frames);
  tl.add(main_timeline);

  function mapElements(orig) {
    if (Array.isArray(orig) === false) {
      return orig.element
    }
    let arr = [];
    for (let i = 0; i < orig.length; i++) {
      if (orig[i].element) {
        arr.push(orig[i].element)
      }
    }
    return arr;
  }

}
