import globalDepsObj from './helpers/globalDeps.js';

export default function(elementDeps) {
  const { R, adHit, stage, width, height, borderZIndex, borders, FOF_PIXEL_DENSITY, customBySize, TweenMax, TimelineMax, TweenLite, TimelineLite, Settings, Analytics, Platform, AnalyticsContent, EventForwarding, ThrowProps } = globalDepsObj;

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
    '320x100': animate320x100,
    '970x250': animate970x250,
    '800x250': animate800x250
  })();

  tl.add(frame_1_in);
  tl.add(frame_1_out);
  tl.add(frame_2_in);
  tl.add(frame_2_out);
  tl.add(frame_3_in);
  tl.add(main_timeline);

}
