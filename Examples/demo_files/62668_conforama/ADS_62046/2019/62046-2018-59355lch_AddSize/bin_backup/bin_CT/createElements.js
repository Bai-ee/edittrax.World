import helper from './helpers/helper.js';
import additionalSettings from './helpers/additionalSettings.js';
import beforeRenderSettings from './helpers/beforeRenderSettings.js';
import globalDepsObj from './helpers/globalDeps.js';

export default function(packs, renderDone) {
  const { R, adHit, stage, width, height, borderZIndex, borders, FOF_PIXEL_DENSITY, customBySize, TweenMax, TimelineMax, TweenLite, TimelineLite, Settings, Analytics, Platform, AnalyticsContent, EventForwarding, ThrowProps } = globalDepsObj;
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
      fontSize: customBySize(17, {
        '160x600': 25,
        '180x150': 15,
        '300x1050': 46,
        '300x250__728x90': 24,
        '300x600': 33,
        '320x480': 32,
        '320x50': 12,
        '336x280': 30,
        '800x250__970x250': 35
      }),
      fontFamily: 10747,
      lineHeight: customBySize(1.06, {
        '160x600__300x250__320x50__728x90': 1.08,
        '180x150': 1.13,
        '300x1050__336x280': 1.07,
        '320x100__468x60': 1.12
      }),
      letterSpacing: customBySize(0.6, {
        '160x600': 0.625,
        '180x150': 0.375,
        '300x1050': 1.15,
        '300x600': 0.825,
        '320x100__468x60': 0.425,
        '320x480': 0.8,
        '320x50': 0.3,
        '336x280': 0.75,
        '800x250__970x250': 0.875
      }),
      textAlign: customBySize('center', { '320x100__320x50__468x60__728x90__800x250__970x250': 'left' }),
      verticalAlign: 'middle',
      marginTop: customBySize(0, {
        '160x600__300x1050': 10,
        '300x250__336x280': 6,
        '300x600__800x250__970x250': 8
      }),
      backgroundColor: R.create('var').set({ name: 'headline_text_background_color', defaultValue: '', dataType: 'Gradient', required: false, exposed: true }).render().value(),
      padding: '',
      left: customBySize(null, {
        '160x600': 10,
        '180x150': 9,
        '300x1050': 20,
        '300x250': 21,
        '300x600': 31,
        '320x100': 107,
        '320x480': 41,
        '320x50': 99,
        '336x280': 28,
        '468x60': 124,
        '728x90': 185,
        '800x250': 230,
        '970x250': 264
      }),
      top: customBySize(7, {
        '160x600': 326,
        '180x150': 69,
        '300x1050': 549,
        '300x250': 131,
        '300x600': 334,
        '320x480': 277,
        '320x50': 6,
        '336x280': 142,
        '728x90': 13,
        '800x250__970x250': 25
      }),
      width: customBySize(238, {
        '160x600': 140,
        '180x150': 162,
        '300x1050': 260,
        '300x250': 258,
        '320x100': 98,
        '320x50': 88,
        '336x280': 280,
        '468x60': 124,
        '728x90': 196,
        '800x250': 186,
        '970x250': 190
      }),
      height: customBySize(128, {
        '160x600': 109,
        '180x150': 37,
        '300x1050': 198,
        '300x250': 57,
        '300x600': 106,
        '320x100': 61,
        '320x480': 58,
        '320x50': 38,
        '336x280': 66,
        '468x60': 46,
        '728x90': 63
      }),
      zIndex: customBySize(null, {
        '160x600': 374,
        '180x150': 397,
        '300x1050': 365,
        '300x250': 369,
        '300x600': 384,
        '320x100': 387,
        '320x480': 379,
        '320x50': 344,
        '336x280': 401,
        '468x60': 343,
        '728x90': 342,
        '800x250': 390,
        '970x250': 393
      }),
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
      fontSize: customBySize(12, {
        '180x150': 10,
        '300x1050': 20,
        '300x250__728x90': 16,
        '300x600': 14,
        '320x100': 11,
        '320x480': 13,
        '320x50': 9,
        '336x280': 18,
        '800x250__970x250': 15
      }),
      fontFamily: 10755,
      lineHeight: customBySize(1.33, {
        '180x150': 1.3,
        '300x1050__300x250__468x60__728x90': 1.25,
        '300x600': 1.29,
        '320x100': 1.36,
        '320x480': 1.31,
        '336x280': 1.22
      }),
      letterSpacing: customBySize(0.3, {
        '180x150': 0.25,
        '300x1050': 0.5,
        '300x250__728x90': 0.4,
        '300x600': 0.35,
        '320x100': 0.275,
        '320x480': 0.325,
        '320x50': 0.225,
        '336x280': 0.45,
        '800x250__970x250': 0.375
      }),
      textAlign: customBySize('center', { '320x100__320x50__468x60__728x90__800x250__970x250': 'left' }),
      verticalAlign: 'middle',
      marginTop: customBySize(0, {
        '160x600': 4,
        '300x1050': 8,
        '300x600': 3,
        '320x480__800x250__970x250': 6
      }),
      backgroundColor: R.create('var').set({ name: 'subhead_text_background_color', defaultValue: '', dataType: 'Gradient', required: false, exposed: true }).render().value(),
      padding: '',
      left: customBySize(null, {
        '160x600': 10,
        '180x150': 9,
        '300x1050': 20,
        '300x250': 21,
        '300x600': 31,
        '320x100': 107,
        '320x480': 41,
        '320x50': 99,
        '336x280': 28,
        '468x60': 124,
        '728x90': 185,
        '800x250': 230,
        '970x250': 264
      }),
      top: customBySize(7, {
        '160x600': 439,
        '180x150': 69,
        '300x1050': 755,
        '300x250': 131,
        '300x600': 443,
        '320x480': 341,
        '320x50': 6,
        '336x280': 142,
        '728x90': 13,
        '800x250__970x250': 159
      }),
      width: customBySize(238, {
        '160x600': 140,
        '180x150': 162,
        '300x1050': 260,
        '300x250': 258,
        '320x100': 98,
        '320x50': 88,
        '336x280': 280,
        '468x60': 124,
        '728x90': 196,
        '800x250': 186,
        '970x250': 190
      }),
      height: customBySize(66, {
        '160x600': 50,
        '180x150': 37,
        '300x1050': 83,
        '300x250': 57,
        '300x600': 40,
        '320x100': 61,
        '320x480': 29,
        '320x50': 38,
        '468x60': 46,
        '728x90': 63
      }),
      zIndex: customBySize(null, {
        '160x600': 373,
        '180x150': 339,
        '300x1050': 364,
        '300x250': 338,
        '300x600': 383,
        '320x100': 335,
        '320x480': 378,
        '320x50': 337,
        '336x280': 336,
        '468x60': 340,
        '728x90': 334,
        '800x250': 389,
        '970x250': 392
      }),
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
      fontSize: customBySize(12, {
        '180x150': 8,
        '300x1050': 20,
        '300x600__336x280': 13,
        '320x100__468x60': 9,
        '320x50': 7,
        '728x90': 11,
        '800x250__970x250': 16
      }),
      fontFamily: 10747,
      lineHeight: 1,
      letterSpacing: customBySize(0.3, {
        '180x150': 0.2,
        '300x1050': 0.5,
        '300x600__336x280': 0.325,
        '320x100__468x60': 0.225,
        '320x50': 0.175,
        '728x90': 0.275,
        '800x250__970x250': 0.4
      }),
      textAlign: 'center',
      verticalAlign: 'middle',
      marginTop: customBySize(0, {
        '160x600': 14,
        '180x150': 4,
        '300x1050': 32,
        '300x250': 7,
        '300x600': 19,
        '320x480': 16,
        '336x280': 8
      }),
      backgroundColor: R.create('var').set({ name: 'cta_text_background_color', defaultValue: '#000000', dataType: 'Gradient', required: false, exposed: true }).render().value(),
      padding: customBySize('8px 10px 8px 10px', {
        '160x600__300x250__728x90': '7px 9px 7px 9px',
        '180x150': '5px 7px 5px 7px',
        '300x1050': '11px 16px 11px 16px',
        '320x100__468x60': '6px 8px 6px 8px',
        '320x50': '4px 6px 4px 6px',
        '800x250__970x250': '9px 13px 9px 13px'
      }),
      left: customBySize(null, {
        '160x600': 10,
        '180x150': 9,
        '300x1050': 20,
        '300x250': 21,
        '300x600': 31,
        '320x100': 220,
        '320x480': 41,
        '320x50': 242,
        '336x280': 28,
        '468x60': 339,
        '728x90': 579,
        '800x250': 605,
        '970x250': 762
      }),
      top: customBySize(141, {
        '160x600': 503,
        '180x150': 110,
        '300x1050': 870,
        '300x250': 195,
        '300x600': 502,
        '320x100': 64,
        '320x480': 386,
        '320x50': 4,
        '336x280': 216,
        '468x60': 7,
        '728x90': 16
      }),
      width: customBySize(238, {
        '160x600': 140,
        '180x150': 162,
        '300x1050': 260,
        '300x250': 258,
        '320x100': 86,
        '320x50': 70,
        '336x280': 280,
        '468x60': 117,
        '728x90': 128,
        '800x250': 172,
        '970x250': 176
      }),
      height: customBySize(36, {
        '160x600': 26,
        '180x150__468x60': 20,
        '300x1050': 45,
        '300x250__728x90': 27,
        '300x600': 29,
        '320x100': 23,
        '320x50': 16,
        '336x280': 31
      }),
      zIndex: customBySize(null, {
        '160x600': 372,
        '180x150': 396,
        '300x1050': 363,
        '300x250': 368,
        '300x600': 382,
        '320x100': 355,
        '320x480': 377,
        '320x50': 353,
        '336x280': 400,
        '468x60': 350,
        '728x90': 347,
        '800x250': 360,
        '970x250': 357
      }),
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
      fontSize: customBySize(6, {
        '160x600__300x250__728x90': 8,
        '300x1050': 14,
        '300x600__320x480__336x280': 9,
        '468x60': 7,
        '800x250__970x250': 10
      }),
      fontFamily: 10755,
      lineHeight: customBySize(1.22, {
        '160x600__300x250__728x90': 1.25,
        '180x150__320x50': 1.17,
        '300x1050': 1.21,
        '320x100': 1.33,
        '468x60': 1.29,
        '800x250__970x250': 1.2
      }),
      letterSpacing: 0,
      textAlign: customBySize('center', { '320x100': 'left' }),
      verticalAlign: 'middle',
      marginTop: customBySize(11, {
        '160x600': 9,
        '180x150__468x60': 6,
        '300x1050': 16,
        '300x250__728x90': 8,
        '320x100': 5,
        '320x50': 4,
        '336x280': 10
      }),
      backgroundColor: R.create('var').set({ name: 'details_text_background_color', defaultValue: '', dataType: 'Gradient', required: false, exposed: true }).render().value(),
      padding: '',
      left: customBySize(null, {
        '160x600': 10,
        '180x150': 9,
        '300x1050': 20,
        '300x250': 21,
        '300x600': 31,
        '320x100': 107,
        '320x480': 41,
        '320x50': 242,
        '336x280': 28,
        '468x60': 339,
        '728x90': 579,
        '800x250': 605,
        '970x250': 762
      }),
      top: customBySize(188, {
        '160x600': 538,
        '180x150': 136,
        '300x1050': 931,
        '300x250': 230,
        '300x600': 542,
        '320x100': 73,
        '320x480': 433,
        '320x50': 24,
        '336x280': 257,
        '468x60': 33,
        '728x90': 51
      }),
      width: customBySize(238, {
        '160x600': 140,
        '180x150': 162,
        '300x1050': 260,
        '300x250': 258,
        '320x100': 98,
        '320x50': 70,
        '336x280': 280,
        '468x60': 117,
        '728x90': 128,
        '800x250': 172,
        '970x250': 176
      }),
      height: customBySize(20, {
        '160x600__320x50': 22,
        '180x150': 8,
        '300x1050': 40,
        '300x250': 11,
        '300x600': 26,
        '320x480': 21,
        '336x280': 12,
        '728x90': 23,
        '800x250__970x250': 31
      }),
      zIndex: customBySize(null, {
        '160x600': 371,
        '180x150': 395,
        '300x1050': 362,
        '300x250': 367,
        '300x600': 381,
        '320x100': 386,
        '320x480': 376,
        '320x50': 352,
        '336x280': 399,
        '468x60': 349,
        '728x90': 346,
        '800x250': 359,
        '970x250': 356
      }),
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
      fontSize: customBySize(12, {
        '160x600': 10,
        '180x150__320x100': 9,
        '300x1050': 18,
        '300x250': 11,
        '320x50': 7,
        '468x60': 8,
        '970x250': 13
      }),
      fontFamily: 10747,
      lineHeight: customBySize(1.17, {
        '160x600': 1.2,
        '180x150__320x100': 1.22,
        '300x250': 1.18,
        '320x480': 1,
        '320x50': 1.29,
        '468x60': 1.25,
        '970x250': 1.15
      }),
      letterSpacing: 0,
      textAlign: 'center',
      verticalAlign: 'middle',
      marginTop: 0,
      backgroundColor: R.create('var').set({ name: 'badge_text_background_color', defaultValue: '', dataType: 'Gradient', required: false, exposed: true }).render().value(),
      padding: '',
      left: customBySize(10, {
        '300x1050': 25,
        '300x250': 21,
        '300x600': 13,
        '320x100': 224,
        '320x480': 19,
        '320x50': 193,
        '336x280': 28,
        '468x60': 263,
        '728x90': 467,
        '800x250': 435,
        '970x250': 490
      }),
      top: customBySize(null, {
        '160x600': 565,
        '180x150': 37,
        '300x1050': 981,
        '300x250': 62,
        '300x600': 574,
        '320x100': 16,
        '320x480': 454,
        '320x50': 4,
        '336x280': 64,
        '468x60': 7,
        '728x90': 10,
        '800x250': 208,
        '970x250': 201
      }),
      width: customBySize(null, {
        '160x600': 140,
        '180x150': 160,
        '300x1050': 250,
        '300x250': 258,
        '300x600': 275,
        '320x100': 78,
        '320x480': 282,
        '320x50': 42,
        '336x280': 280,
        '468x60': 61,
        '728x90': 70,
        '800x250': 146,
        '970x250': 234
      }),
      height: customBySize(17, {
        '160x600': 28,
        '180x150': 27,
        '300x1050': 56,
        '300x250': 15,
        '320x100__970x250': 36,
        '320x50': 42,
        '468x60': 46,
        '728x90': 70,
        '800x250': 32
      }),
      zIndex: customBySize(null, {
        '160x600': 325,
        '180x150': 324,
        '300x1050': 321,
        '300x250': 329,
        '300x600': 320,
        '320x100': 331,
        '320x480': 332,
        '320x50': 328,
        '336x280': 330,
        '468x60': 327,
        '728x90': 326,
        '800x250': 323,
        '970x250': 322
      }),
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
      forceLineHeight: customBySize(false, { '320x480': true })
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
      zIndex: customBySize(null, {
        '160x600': 797,
        '180x150': 795,
        '300x1050': 791,
        '300x250': 796,
        '300x600': 798,
        '320x100': 789,
        '320x480': 799,
        '320x50': 792,
        '336x280': 790,
        '468x60': 793,
        '728x90': 794,
        '800x250': 787,
        '970x250': 788
      }),
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
      zIndex: customBySize(null, {
        '160x600': 774,
        '180x150': 776,
        '300x1050': 780,
        '300x250': 775,
        '300x600': 773,
        '320x100': 782,
        '320x480': 785,
        '320x50': 779,
        '336x280': 781,
        '468x60': 778,
        '728x90': 777,
        '800x250': 784,
        '970x250': 783
      }),
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
      left: customBySize(20, {
        '160x600__468x60': 10,
        '300x1050__300x600': 21,
        '300x250__336x280': 28,
        '320x100': 9,
        '320x480': 42,
        '320x50': 7,
        '728x90': 14
      }),
      top: customBySize(11, {
        '160x600__300x600': 16,
        '180x150': 7,
        '300x1050': 22,
        '300x250': 12,
        '320x480': 13,
        '320x50': 8,
        '336x280__728x90': 14,
        '800x250__970x250': 30
      }),
      width: customBySize(140, {
        '300x1050__300x600': 258,
        '300x250': 244,
        '320x100': 84,
        '320x480': 236,
        '320x50': 82,
        '336x280': 280,
        '468x60': 98,
        '728x90': 150,
        '800x250': 165,
        '970x250': 200
      }),
      height: customBySize(190, {
        '160x600': 44,
        '180x150': 21,
        '300x1050': 90,
        '300x250': 40,
        '300x600': 46,
        '320x100': 78,
        '320x480': 42,
        '320x50': 34,
        '336x280': 39,
        '468x60': 38,
        '728x90': 62
      }),
      zIndex: customBySize(null, {
        '160x600': 432,
        '180x150': 453,
        '300x1050': 426,
        '300x250': 429,
        '300x600': 423,
        '320x100': 444,
        '320x480': 459,
        '320x50': 441,
        '336x280': 456,
        '468x60': 438,
        '728x90': 435,
        '800x250': 450,
        '970x250': 447
      }),
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
      left: customBySize(null, {
        '160x600': 30,
        '180x150': 64,
        '300x1050': 74,
        '300x250': 113,
        '300x600': 100,
        '320x100': 229,
        '320x480': 110,
        '320x50': 191,
        '336x280': 127,
        '468x60': 260,
        '728x90': 389,
        '800x250': 624,
        '970x250': 783
      }),
      top: customBySize(31, {
        '160x600': 254,
        '180x150': 34,
        '300x1050': 424,
        '300x250': 83,
        '300x600': 269,
        '320x100': 13,
        '320x480': 215,
        '320x50': 11,
        '336x280': 88,
        '468x60': 9,
        '728x90': 22
      }),
      width: customBySize(100, {
        '180x150': 52,
        '300x1050': 151,
        '300x250__728x90': 74,
        '320x100__468x60': 68,
        '320x50': 45,
        '336x280': 83,
        '800x250__970x250': 134
      }),
      height: customBySize(62, {
        '180x150': 32,
        '300x1050': 94,
        '300x250__728x90': 46,
        '320x100__468x60': 42,
        '320x50': 28,
        '336x280': 51,
        '800x250__970x250': 83
      }),
      zIndex: customBySize(null, {
        '160x600': 280,
        '180x150': 298,
        '300x1050': 277,
        '300x250': 413,
        '300x600': 274,
        '320x100': 286,
        '320x480': 301,
        '320x50': 283,
        '336x280': 419,
        '468x60': 295,
        '728x90': 416,
        '800x250': 292,
        '970x250': 289
      }),
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
      zIndex: customBySize(null, {
        '160x600': 262,
        '180x150': 269,
        '300x1050': 260,
        '300x250': 261,
        '300x600': 259,
        '320x100': 266,
        '320x480': 271,
        '320x50': 265,
        '336x280': 270,
        '468x60': 264,
        '728x90': 263,
        '800x250': 268,
        '970x250': 267
      }),
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
      zIndex: customBySize(null, {
        '160x600': 246,
        '180x150': 248,
        '300x1050': 252,
        '300x250': 247,
        '300x600': 244,
        '320x100': 254,
        '320x480': 245,
        '320x50': 251,
        '336x280': 253,
        '468x60': 250,
        '728x90': 249,
        '800x250': 256,
        '970x250': 255
      }),
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
      left: customBySize(null, {
        '160x600': 14,
        '180x150': 64,
        '300x1050': 21,
        '300x250': 103,
        '300x600': 26,
        '320x100': 229,
        '320x480': 36,
        '320x50': 191,
        '336x280': 117,
        '468x60': 260,
        '728x90': 447,
        '800x250': 428,
        '970x250': 500
      }),
      top: customBySize(9, {
        '160x600': 141,
        '180x150': 34,
        '300x1050': 219,
        '300x250': 58,
        '300x600': 108,
        '320x100': 13,
        '320x480': 82,
        '320x50': 11,
        '336x280__970x250': 60,
        '800x250': 75
      }),
      width: customBySize(68, {
        '160x600': 132,
        '180x150': 52,
        '300x1050': 258,
        '300x250': 93,
        '300x600__320x480': 248,
        '320x50': 45,
        '336x280': 103,
        '728x90': 110,
        '800x250': 161,
        '970x250': 209
      }),
      height: customBySize(42, {
        '160x600': 86,
        '180x150': 32,
        '300x1050': 160,
        '300x250': 58,
        '300x600__320x480': 162,
        '320x50': 28,
        '336x280': 64,
        '728x90': 72,
        '800x250': 100,
        '970x250': 130
      }),
      zIndex: customBySize(null, {
        '160x600': 208,
        '180x150': 232,
        '300x1050': 217,
        '300x250': 229,
        '300x600': 205,
        '320x100': 238,
        '320x480': 241,
        '320x50': 226,
        '336x280': 235,
        '468x60': 214,
        '728x90': 211,
        '800x250': 223,
        '970x250': 220
      }),
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
      left: customBySize(7, {
        '160x600': 6,
        '336x280': 8,
        '728x90': 442,
        '800x250': 427,
        '970x250': 478
      }),
      top: customBySize(7, {
        '160x600__300x600': 70,
        '300x1050': 124,
        '300x250': 56,
        '320x480': 62,
        '336x280': 58,
        '728x90': 5
      }),
      width: customBySize(286, {
        '160x600': 148,
        '320x480': 306,
        '336x280': 320,
        '728x90': 120,
        '800x250': 162,
        '970x250': 258
      }),
      height: customBySize(236, {
        '160x600': 220,
        '300x1050': 352,
        '300x250': 60,
        '300x600': 238,
        '320x480': 192,
        '336x280': 66,
        '728x90': 80
      }),
      zIndex: customBySize(null, {
        '160x600': 185,
        '300x1050': 179,
        '300x250': 182,
        '300x600': 176,
        '320x480': 201,
        '336x280': 197,
        '728x90': 188,
        '800x250': 194,
        '970x250': 191
      }),
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: customBySize(stage, { '180x150__320x100__320x50__468x60': '' }),
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
      zIndex: customBySize(null, {
        '160x600': 28,
        '180x150': 49,
        '300x1050': 22,
        '300x250': 25,
        '300x600': 16,
        '320x100': 40,
        '320x480': 19,
        '320x50': 37,
        '336x280': 52,
        '468x60': 34,
        '728x90': 31,
        '800x250': 46,
        '970x250': 43
      }),
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
      left: customBySize(0, {
        '180x150': 2,
        '300x250': 4,
        '336x280': 6,
        '468x60': 1,
        '728x90': 3
      }),
      top: customBySize(0, {
        '180x150': 2,
        '300x250': 4,
        '336x280': 6,
        '468x60': 1,
        '728x90': 3
      }),
      width: customBySize(21, { '300x250': 24 }),
      height: customBySize(21, { '300x250': 24 }),
      zIndex: customBySize(null, {
        '180x150': 549,
        '300x250': 543,
        '320x100': 561,
        '320x50': 537,
        '336x280': 555,
        '468x60': 531,
        '728x90': 525
      }),
      pointerEvents: 'auto',
      cursor: 'pointer',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: customBySize(stage, { '160x600__300x1050__300x600__320x480__800x250__970x250': '' }),
      tint: R.create('var').set({ name: 'replay_img_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: {
      id: 'replay_img',
      directoryType: 'shared'
    }
  })

  const badge_bg_color = R.create('div').set({
    css: {
      left: customBySize(7, {
        '160x600': 6,
        '180x150': 4,
        '320x100': 221,
        '320x50': 191,
        '336x280': 8,
        '468x60': 258,
        '728x90': 442,
        '800x250': 427,
        '970x250': 478
      }),
      top: customBySize(3, {
        '160x600': 563,
        '180x150': 33,
        '300x1050': 975,
        '300x250': 56,
        '300x600': 571,
        '320x100': 13,
        '320x480': 451,
        '336x280': 58,
        '728x90': 5,
        '800x250': 205,
        '970x250': 195
      }),
      zIndex: customBySize(null, {
        '160x600': 310,
        '180x150': 309,
        '300x1050': 306,
        '300x250': 312,
        '300x600': 305,
        '320x100': 314,
        '320x480': 317,
        '320x50': 316,
        '336x280': 313,
        '468x60': 315,
        '728x90': 311,
        '800x250': 308,
        '970x250': 307
      }),
      width: customBySize(286, {
        '160x600': 148,
        '180x150': 172,
        '320x100': 84,
        '320x480': 306,
        '320x50': 46,
        '336x280': 320,
        '468x60': 72,
        '728x90': 120,
        '800x250': 162,
        '970x250': 258
      }),
      height: customBySize(22, {
        '160x600': 32,
        '180x150': 34,
        '300x1050': 68,
        '300x250': 60,
        '320x100': 42,
        '320x50': 44,
        '336x280': 66,
        '468x60': 54,
        '728x90': 80,
        '800x250': 38,
        '970x250': 48
      }),
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
      zIndex: customBySize(null, {
        '160x600': 163,
        '180x150': 170,
        '300x1050': 161,
        '300x250': 162,
        '300x600': 160,
        '320x100': 167,
        '320x480': 172,
        '320x50': 166,
        '336x280': 171,
        '468x60': 165,
        '728x90': 164,
        '800x250': 169,
        '970x250': 168
      }),
      width: customBySize(300, {
        '160x600': 160,
        '180x150': 179,
        '320x100': 100,
        '320x50': 94,
        '336x280': 336,
        '468x60': 116,
        '728x90': 174,
        '800x250': 203,
        '970x250': 237
      }),
      height: customBySize(70, {
        '180x150': 31,
        '300x1050': 124,
        '300x250': 56,
        '320x100': 100,
        '320x50': 49,
        '336x280': 58,
        '468x60': 60,
        '728x90': 90,
        '800x250': 248,
        '970x250': 250
      }),
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
      left: customBySize(7, {
        '160x600__320x480': 6,
        '180x150': 4,
        '320x100__320x50__468x60': 3,
        '336x280': 8,
        '728x90': 5
      }),
      top: customBySize(7, {
        '160x600__728x90': 5,
        '180x150': 4,
        '300x1050__336x280': 8,
        '320x100__320x50__468x60': 3,
        '320x480': 6
      }),
      zIndex: customBySize(null, {
        '160x600': 150,
        '180x150': 157,
        '300x1050': 148,
        '300x250': 149,
        '300x600': 146,
        '320x100': 154,
        '320x480': 147,
        '320x50': 153,
        '336x280': 158,
        '468x60': 152,
        '728x90': 151,
        '800x250': 156,
        '970x250': 155
      }),
      width: customBySize(286, {
        '160x600': 148,
        '180x150': 172,
        '320x100__320x50': 314,
        '320x480': 307,
        '336x280': 320,
        '468x60': 462,
        '728x90': 718,
        '800x250': 786,
        '970x250': 956
      }),
      height: customBySize(236, {
        '160x600': 590,
        '180x150': 142,
        '300x1050': 1034,
        '300x600': 586,
        '320x100': 94,
        '320x480': 468,
        '320x50': 44,
        '336x280': 264,
        '468x60': 54,
        '728x90': 80
      }),
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
      left: customBySize(0, { '468x60': 1 }),
      top: customBySize(0, { '300x1050': 1 }),
      zIndex: customBySize(null, {
        '160x600': 135,
        '180x150': 142,
        '300x1050': 133,
        '300x250': 134,
        '300x600': 132,
        '320x100': 139,
        '320x480': 144,
        '320x50': 138,
        '336x280': 143,
        '468x60': 137,
        '728x90': 136,
        '800x250': 141,
        '970x250': 140
      }),
      width: customBySize(300, {
        '160x600': 160,
        '180x150': 180,
        '320x100__320x480__320x50': 320,
        '336x280': 336,
        '468x60': 467,
        '728x90': 728,
        '800x250': 800,
        '970x250': 970
      }),
      height: customBySize(250, {
        '160x600__300x600': 600,
        '180x150': 150,
        '300x1050': 1049,
        '320x100': 100,
        '320x480': 480,
        '320x50': 50,
        '336x280': 280,
        '468x60': 60,
        '728x90': 90
      }),
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
      zIndex: customBySize(null, {
        '160x600': 11,
        '180x150': 9,
        '300x1050': 5,
        '300x250': 10,
        '300x600': 12,
        '320x100': 3,
        '320x480': 13,
        '320x50': 6,
        '336x280': 4,
        '468x60': 7,
        '728x90': 8,
        '800x250': 1,
        '970x250': 2
      }),
      width: customBySize(300, {
        '160x600': 160,
        '180x150': 180,
        '320x100__320x480__320x50': 320,
        '336x280': 336,
        '468x60': 468,
        '728x90': 728,
        '800x250': 800,
        '970x250': 970
      }),
      height: customBySize(250, {
        '160x600__300x600': 600,
        '180x150': 150,
        '300x1050': 1050,
        '320x100': 100,
        '320x480': 480,
        '320x50': 50,
        '336x280': 280,
        '468x60': 60,
        '728x90': 90
      }),
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
      left: customBySize(null, {
        '320x100': 100,
        '320x50': 94,
        '468x60': 116,
        '728x90': 174,
        '800x250': 202,
        '970x250': 236
      }),
      top: customBySize(30, {
        '320x100': 8,
        '320x50': 7,
        '468x60': 9,
        '728x90': 13
      }),
      zIndex: customBySize(null, {
        '320x100': 407,
        '320x50': 406,
        '468x60': 405,
        '728x90': 404,
        '800x250': 409,
        '970x250': 408
      }),
      width: customBySize(1, { '800x250__970x250': 2 }),
      height: customBySize(190, {
        '320x100': 84,
        '320x50': 36,
        '468x60': 42,
        '728x90': 64
      }),
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      backgroundColor: R.create('var').set({ name: 'line_color', defaultValue: '', dataType: 'Gradient', requiredType: "false", exposed: true }).render().value(),
      borderRadius: 0,
      border: R.create('var').set({ name: 'line_border', defaultValue: '', dataType: 'String', requiredType: "false", exposed: true }).render().value(),
      visibility: 'hidden'
    },
    rosetta: { parentNode: customBySize('', { '320x100__320x50__468x60__728x90__800x250__970x250': stage }) },
    attr: { id: 'line_color' }
  })

  let catImgsArr = []

  const replayContainer = R.create('div').set({
    attr: { id: 'replayContainer' },
    css: {
      name: 'replayContainer',
      zIndex: customBySize(null, {
        '180x150': 550,
        '300x250': 544,
        '320x100': 562,
        '320x50': 538,
        '336x280': 556,
        '468x60': 532,
        '728x90': 526
      }),
      left: customBySize(0, {
        '180x150': 2,
        '300x250': 4,
        '336x280': 6,
        '468x60': 1,
        '728x90': 3
      }),
      top: customBySize(0, {
        '180x150': 2,
        '300x250': 4,
        '336x280': 6,
        '468x60': 1,
        '728x90': 3
      }),
      width: customBySize(21, { '300x250': 24 }),
      height: customBySize(21, { '300x250': 24 }),
      pointerEvents: 'none',
      visibility: 'hidden'
    },
    rosetta: { parentNode: customBySize(stage, { '160x600__300x1050__300x600__320x480__800x250__970x250': '' }) }
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
      width: customBySize(280, {
        '160x600': 140,
        '180x150': 160,
        '320x100__320x480__320x50': 300,
        '336x280': 316,
        '468x60': 448,
        '728x90': 708,
        '800x250': 780,
        '970x250': 950
      }),
      height: customBySize(215, {
        '160x600__300x600': 565,
        '180x150': 115,
        '300x1050': 1015,
        '320x100': 65,
        '320x480': 445,
        '320x50': 15,
        '336x280': 245,
        '468x60': 25,
        '728x90': 55
      }),
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
      width: customBySize(300, {
        '160x600': 160,
        '180x150': 180,
        '320x100__320x480__320x50': 320,
        '336x280': 336,
        '468x60': 468,
        '728x90': 728,
        '800x250': 800,
        '970x250': 970
      }),
      height: customBySize(250, {
        '160x600__300x600': 600,
        '180x150': 150,
        '300x1050': 1050,
        '320x100': 100,
        '320x480': 480,
        '320x50': 50,
        '336x280': 280,
        '468x60': 60,
        '728x90': 90
      }),
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

  const group1Array = customBySize(null, {
    '320x480__300x600__160x600__300x1050': [headline_text, subhead_text, cta_text, details_text]
  });
  const group1 = customBySize(null, {
    '320x480__300x600__160x600__300x1050': R.create('AlignmentGroup').set({ rosetta: { verticalAlign: 'middle' } }).add(group1Array)
  });

  const group2Array = customBySize(null, {
    '300x250__180x150__336x280': [headline_text, cta_text, details_text]
  });
  const group2 = customBySize(null, {
    '300x250__180x150__336x280': R.create('AlignmentGroup').set({ rosetta: { verticalAlign: 'middle' } }).add(group2Array)
  });

  const group3Array = customBySize(null, {
    '728x90__468x60__320x50__970x250__800x250': [cta_text, details_text]
  });
  const group3 = customBySize(null, {
    '728x90__468x60__320x50__970x250__800x250': R.create('AlignmentGroup').set({ rosetta: { verticalAlign: 'middle' } }).add(group3Array)
  });

  const group4Array = customBySize(null, {
    '320x100': [headline_text, details_text]
  });
  const group4 = customBySize(null, {
    '320x100': R.create('AlignmentGroup').set({ rosetta: { verticalAlign: 'middle' } }).add(group4Array)
  });

  const group5Array = customBySize(null, {
    '970x250__800x250': [headline_text, subhead_text]
  });
  const group5 = customBySize(null, {
    '970x250__800x250': R.create('AlignmentGroup').set({ rosetta: { verticalAlign: 'top' } }).add(group5Array)
  });

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

  const beforeRenderElements = beforeRenderSettings(allElementsArr, globalDepsObj);

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

      additionalSettings(allElementsArr, globalDepsObj, beforeRenderElements);

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

}
