import additionalSettings from './helpers/additionalSettings.js';
import beforeRenderSettings from './helpers/beforeRenderSettings.js';
import globalDepsObj from './helpers/globalDeps.js';

export default function(packs, renderDone) {
  const { R, adHit, stage, stageWidth, stageHeight, borderZIndex, borders, FOF_PIXEL_DENSITY, FOF_RENDER_DENSITY, customBySize, TweenMax, TimelineMax, TweenLite, TimelineLite, Settings, Analytics, Platform, AnalyticsContent, ThrowProps } = globalDepsObj;
  const { Hammer } = packs;

  const stageBlock = R.create('div').set({
    css: {
      height: stageHeight,
      width: stageWidth,
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

  const headline_vertical_text = R.create('div').set({
    css: {
      color: R.create('var').set({ name: 'headline_vertical_text_color', defaultValue: '#000000', dataType: 'Color', required: false, exposed: true }).render().value(),
      fontSize: customBySize(null, {
        '160x600': 17,
        '300x1050': 32,
        '300x600': 27,
        '320x480': 22,
        '800x250': 25,
        '970x250': 30
      }, "fontSize"),
      fontFamily: 12983,
      lineHeight: customBySize(1.23, {
        '160x600': 1.24,
        '300x1050__300x600': 1.22,
        '800x250': 1.2
      }),
      letterSpacing: 0,
      textAlign: 'center',
      verticalAlign: 'top',
      marginTop: 0,
      backgroundColor: R.create('var').set({ name: 'headline_vertical_text_bg_color', defaultValue: '', dataType: 'Gradient', required: false, exposed: true }).render().value(),
      padding: '',
      left: customBySize(null, {
        '160x600': 24,
        '300x1050': 42,
        '300x600': 30,
        '320x480': 48,
        '800x250': 56,
        '970x250': 68
      }, "left"),
      top: customBySize(null, {
        '160x600': 98,
        '300x1050': 142,
        '300x600': 47,
        '320x480': 36,
        '800x250': 39,
        '970x250': 38
      }, "top"),
      width: customBySize(null, {
        '160x600': 119,
        '300x1050': 217,
        '300x600': 187,
        '320x480': 162,
        '800x250': 165,
        '970x250': 202
      }, "width"),
      height: customBySize(null, {
        '160x600': 88,
        '300x1050': 165,
        '300x600': 133,
        '320x480': 111,
        '800x250': 122,
        '970x250': 150
      }, "height"),
      zIndex: customBySize(null, {
        '160x600': 459,
        '300x1050': 462,
        '300x600': 460,
        '320x480': 461,
        '800x250': 464,
        '970x250': 463
      }),
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      border: '',
      borderRadius: 0,
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: customBySize('', { '160x600__300x1050__300x600__320x480__800x250__970x250': stage }),
      pixelDensity: FOF_PIXEL_DENSITY,
      renderDensity: FOF_RENDER_DENSITY,
      forceLineHeight: true
    },
    attr: {
      id: 'headline_vertical_text',
      textContent: R.create('var').set({ name: 'headline_vertical_text', defaultValue: '', dataType: 'String', required: true, exposed: true }).render().value()
    }
  })

  const cta_text = R.create('div').set({
    css: {
      color: R.create('var').set({ name: 'cta_text_color', defaultValue: '#000000', dataType: 'Color', required: false, exposed: true }).render().value(),
      fontSize: customBySize(14, {
        '160x600': 10,
        '180x150__728x90': 12,
        '300x1050__800x250__970x250': 16,
        '300x250': 19,
        '300x600': 11,
        '320x480': 13,
        '336x280': 21,
        '468x60': 17
      }, "fontSize"),
      fontFamily: 12983,
      lineHeight: customBySize(1.29, {
        '160x600': 1.1,
        '180x150': 1.17,
        '300x1050': 1.13,
        '300x250': 1.26,
        '300x600': 1.09,
        '320x480__728x90': 1.08,
        '800x250__970x250': 1.06,
        '970x90': 1.14
      }),
      letterSpacing: 0,
      textAlign: customBySize('left', { '180x150__300x250__320x100__320x50__336x280__468x60': 'center' }),
      verticalAlign: customBySize('middle', { '180x150__300x250__320x100__320x50__336x280__468x60': 'top' }),
      marginTop: 0,
      backgroundColor: R.create('var').set({ name: 'cta_text_bg_color', defaultValue: '', dataType: 'Gradient', required: false, exposed: true }).render().value(),
      padding: '',
      left: customBySize(8, {
        '160x600': 115,
        '180x150': 15,
        '300x1050': 230,
        '300x250': 24,
        '300x600': 251,
        '320x100': 17,
        '320x480': 263,
        '320x50': 161,
        '336x280': 30,
        '468x60': 280,
        '800x250': 731,
        '970x250': 900
      }, "left"),
      top: customBySize(13, {
        '160x600__970x250': 29,
        '180x150__800x250': 30,
        '300x1050': 41,
        '300x250': 49,
        '300x600': 40,
        '320x50': 8,
        '336x280': 56,
        '468x60': 12,
        '728x90': 32,
        '970x90': 28
      }, "top"),
      width: customBySize(64, {
        '160x600': 42,
        '180x150__320x480': 53,
        '300x250': 84,
        '300x600': 45,
        '320x100': 61,
        '336x280': 92,
        '468x60': 76,
        '728x90': 50,
        '970x90': 60
      }, "width"),
      height: customBySize(29, {
        '160x600': 26,
        '300x1050': 39,
        '300x250': 51,
        '320x100__320x50': 37,
        '320x480': 32,
        '336x280': 57,
        '468x60': 45,
        '728x90': 30,
        '800x250__970x250': 38,
        '970x90': 35
      }, "height"),
      zIndex: customBySize(null, {
        '160x600': 441,
        '180x150': 442,
        '300x1050': 449,
        '300x250': 446,
        '300x600': 443,
        '320x100': 452,
        '320x480': 444,
        '320x50': 445,
        '336x280': 450,
        '468x60': 447,
        '728x90': 448,
        '800x250': 454,
        '970x250': 453,
        '970x90': 451
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
      renderDensity: FOF_RENDER_DENSITY,
      forceLineHeight: true
    },
    attr: {
      id: 'cta_text',
      textContent: R.create('var').set({ name: 'cta_text', defaultValue: '', dataType: 'String', required: true, exposed: true }).render().value()
    }
  })

  const headline_horizontal_text = R.create('div').set({
    css: {
      color: R.create('var').set({ name: 'headline_horizontal_text_color', defaultValue: '#000000', dataType: 'Color', required: false, exposed: true }).render().value(),
      fontSize: customBySize(null, {
        '728x90': 21,
        '970x90': 23
      }, "fontSize"),
      fontFamily: 12983,
      lineHeight: customBySize(null, {
        '728x90': 1.24,
        '970x90': 1.22
      }),
      letterSpacing: 0,
      textAlign: 'center',
      verticalAlign: 'top',
      marginTop: 0,
      backgroundColor: R.create('var').set({ name: 'headline_horizontal_text_bg_color', defaultValue: '', dataType: 'Gradient', required: false, exposed: true }).render().value(),
      padding: '',
      left: customBySize(null, {
        '728x90': 93,
        '970x90': 120
      }, "left"),
      top: customBySize(null, {
        '728x90': 24,
        '970x90': 23
      }, "top"),
      width: customBySize(null, {
        '728x90': 275,
        '970x90': 294
      }, "width"),
      height: customBySize(null, {
        '728x90': 53,
        '970x90': 59
      }, "height"),
      zIndex: customBySize(null, {
        '728x90': 456,
        '970x90': 457
      }),
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      border: '',
      borderRadius: 0,
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: customBySize('', { '728x90__970x90': stage }),
      pixelDensity: FOF_PIXEL_DENSITY,
      renderDensity: FOF_RENDER_DENSITY,
      forceLineHeight: true
    },
    attr: {
      id: 'headline_horizontal_text',
      textContent: R.create('var').set({ name: 'headline_horizontal_text', defaultValue: '', dataType: 'String', required: true, exposed: true }).render().value()
    }
  })

  const fg_img = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'fg_img', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: 0,
      top: 0,
      width: stageWidth,
      height: stageHeight,
      zIndex: customBySize(null, {
        '160x600': 587,
        '180x150': 586,
        '300x1050': 582,
        '300x250': 590,
        '300x600': 589,
        '320x100': 580,
        '320x480': 588,
        '320x50': 583,
        '336x280': 581,
        '468x60': 584,
        '728x90': 585,
        '800x250': 578,
        '970x250': 579,
        '970x90': 577
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
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: 0,
      top: 0,
      width: stageWidth,
      height: stageHeight,
      zIndex: customBySize(null, {
        '160x600': 571,
        '180x150': 570,
        '300x1050': 566,
        '300x250': 575,
        '300x600': 573,
        '320x100': 564,
        '320x480': 572,
        '320x50': 567,
        '336x280': 565,
        '468x60': 568,
        '728x90': 569,
        '800x250': 562,
        '970x250': 563,
        '970x90': 561
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
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: customBySize(null, {
        '160x600': 16,
        '300x1050': 48,
        '300x600': 134,
        '320x480': 182,
        '728x90': 614,
        '800x250': 675,
        '970x250': 811,
        '970x90': 856
      }, "left"),
      top: customBySize(null, {
        '160x600': 468,
        '300x1050': 834,
        '300x600': 442,
        '320x480': 354,
        '728x90': -4,
        '800x250': 129,
        '970x250': 101,
        '970x90': -3
      }, "top"),
      width: customBySize(null, {
        '160x600': 128,
        '300x1050': 207,
        '300x600': 159,
        '320x480': 126,
        '728x90': 97,
        '800x250': 121,
        '970x250': 148,
        '970x90': 95
      }, "width"),
      height: customBySize(null, {
        '160x600': 128,
        '300x1050': 207,
        '300x600': 159,
        '320x480': 126,
        '728x90': 97,
        '800x250': 121,
        '970x250': 148,
        '970x90': 95
      }, "height"),
      zIndex: customBySize(null, {
        '160x600': 272,
        '300x1050': 269,
        '300x600': 271,
        '320x480': 270,
        '728x90': 273,
        '800x250': 267,
        '970x250': 266,
        '970x90': 268
      }),
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: customBySize(stage, { '180x150__300x250__320x100__320x50__336x280__468x60': '' }),
      tint: R.create('var').set({ name: 'logo_img_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: {
      id: 'logo_img',
      directoryType: 'shared'
    }
  })

  const lifestyle_img = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'lifestyle_img', defaultValue: '', dataType: 'String', required: true, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: customBySize(null, {
        '160x600': 9,
        '180x150': 83,
        '300x1050': 20,
        '300x250': 135,
        '300x600': 14,
        '320x100': 98,
        '320x480': 81,
        '320x50': 47,
        '336x280': 152,
        '468x60': 134,
        '728x90': 411,
        '800x250': 284,
        '970x250': 404,
        '970x90': 633
      }, "left"),
      top: customBySize(null, {
        '160x600': 230,
        '180x150': 13,
        '300x1050': 400,
        '300x250': 17,
        '300x600': 193,
        '320x100': 16,
        '320x480': 153,
        '320x50': -2,
        '336x280': 21,
        '468x60': -6,
        '728x90': -10,
        '800x250': 36,
        '970x250': 29,
        '970x90': -9
      }, "top"),
      width: customBySize(211, {
        '160x600': 265,
        '180x150': 133,
        '300x1050': 500,
        '300x250': 225,
        '300x600': 436,
        '320x100': 142,
        '320x480': 366,
        '320x50': 107,
        '336x280': 258,
        '468x60': 138,
        '800x250': 400,
        '970x250': 410
      }, "width"),
      height: customBySize(197, {
        '160x600': 246,
        '180x150': 124,
        '300x1050': 465,
        '300x250': 210,
        '300x600': 406,
        '320x100': 132,
        '320x480': 341,
        '320x50': 100,
        '336x280': 240,
        '468x60': 129,
        '800x250': 372,
        '970x250': 382
      }, "height"),
      zIndex: customBySize(null, {
        '160x600': 251,
        '180x150': 260,
        '300x1050': 224,
        '300x250': 254,
        '300x600': 248,
        '320x100': 233,
        '320x480': 245,
        '320x50': 242,
        '336x280': 257,
        '468x60': 239,
        '728x90': 236,
        '800x250': 230,
        '970x250': 227,
        '970x90': 263
      }),
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage,
      tint: R.create('var').set({ name: 'lifestyle_img_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: {
      id: 'lifestyle_img',
      directoryType: 'shared'
    }
  })

  const headline_text_bg_img1 = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'headline_text_bg_img1', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: customBySize(null, {
        '160x600': 12,
        '300x1050': 21,
        '300x600': 15,
        '320x480': 37,
        '800x250': 39,
        '970x250': 48
      }, "left"),
      top: customBySize(null, {
        '160x600': 86,
        '300x1050': 119,
        '300x600': 25,
        '320x480': 19,
        '800x250': 18,
        '970x250': 15
      }, "top"),
      width: customBySize(null, {
        '160x600': 126,
        '300x1050': 233,
        '300x600': 199,
        '320x480': 166,
        '800x250': 182,
        '970x250': 222
      }, "width"),
      height: customBySize(null, {
        '160x600': 40,
        '300x1050': 73,
        '300x600': 62,
        '320x480': 52,
        '800x250': 57,
        '970x250': 70
      }, "height"),
      zIndex: customBySize(null, {
        '160x600': 219,
        '300x1050': 216,
        '300x600': 220,
        '320x480': 221,
        '800x250': 217,
        '970x250': 218
      }),
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: customBySize('', { '160x600__300x1050__300x600__320x480__800x250__970x250': stage }),
      tint: R.create('var').set({ name: 'headline_text_bg_img1_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'headline_text_bg_img1' }
  })

  const headline_text_bg_img2 = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'headline_text_bg_img2', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: customBySize(null, {
        '160x600': 21,
        '300x1050': 38,
        '300x600': 29,
        '320x480': 49,
        '800x250': 52,
        '970x250': 64
      }, "left"),
      top: customBySize(null, {
        '160x600': 105,
        '300x1050': 154,
        '300x600': 55,
        '320x480': 44,
        '800x250': 46,
        '970x250': 48
      }, "top"),
      width: customBySize(null, {
        '160x600': 131,
        '300x1050': 242,
        '300x600': 206,
        '320x480': 172,
        '800x250': 189,
        '970x250': 231
      }, "width"),
      height: customBySize(null, {
        '160x600': 41,
        '300x1050': 75,
        '300x600': 64,
        '320x480': 54,
        '800x250': 59,
        '970x250': 72
      }, "height"),
      zIndex: customBySize(null, {
        '160x600': 213,
        '300x1050': 210,
        '300x600': 214,
        '320x480': 209,
        '800x250': 211,
        '970x250': 212
      }),
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: customBySize('', { '160x600__300x1050__300x600__320x480__800x250__970x250': stage }),
      tint: R.create('var').set({ name: 'headline_text_bg_img2_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'headline_text_bg_img2' }
  })

  const headline_text_bg_img3 = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'headline_text_bg_img3', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: customBySize(null, {
        '160x600': 19,
        '300x1050': 35,
        '300x600': 26,
        '320x480': 47,
        '800x250': 50,
        '970x250': 61
      }, "left"),
      top: customBySize(null, {
        '160x600': 131,
        '300x1050': 203,
        '300x600': 96,
        '320x480': 78,
        '800x250': 84,
        '970x250': 95
      }, "top"),
      width: customBySize(null, {
        '160x600': 127,
        '300x1050': 235,
        '300x600': 200,
        '320x480': 167,
        '800x250': 183,
        '970x250': 224
      }, "width"),
      height: customBySize(null, {
        '160x600': 34,
        '300x1050': 62,
        '300x600': 53,
        '320x480': 45,
        '800x250': 49,
        '970x250': 60
      }, "height"),
      zIndex: customBySize(null, {
        '160x600': 206,
        '300x1050': 203,
        '300x600': 207,
        '320x480': 202,
        '800x250': 204,
        '970x250': 205
      }),
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: customBySize('', { '160x600__300x1050__300x600__320x480__800x250__970x250': stage }),
      tint: R.create('var').set({ name: 'headline_text_bg_img3_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'headline_text_bg_img3' }
  })

  const headline_text_bg_img4 = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'headline_text_bg_img4', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: customBySize(null, {
        '160x600': 14,
        '300x1050': 25,
        '300x600': 18,
        '320x480': 39,
        '800x250': 42,
        '970x250': 52
      }, "left"),
      top: customBySize(null, {
        '160x600': 151,
        '300x1050': 240,
        '300x600': 128,
        '320x480': 105,
        '800x250': 113,
        '970x250': 130
      }, "top"),
      width: customBySize(null, {
        '160x600': 130,
        '300x1050': 240,
        '300x600': 204,
        '320x480': 171,
        '800x250': 187,
        '970x250': 229
      }, "width"),
      height: customBySize(null, {
        '160x600': 36,
        '300x1050': 66,
        '300x600': 56,
        '320x480': 47,
        '800x250': 51,
        '970x250': 63
      }, "height"),
      zIndex: customBySize(null, {
        '160x600': 200,
        '300x1050': 197,
        '300x600': 195,
        '320x480': 196,
        '800x250': 198,
        '970x250': 199
      }),
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: customBySize('', { '160x600__300x1050__300x600__320x480__800x250__970x250': stage }),
      tint: R.create('var').set({ name: 'headline_text_bg_img4_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'headline_text_bg_img4' }
  })

  const cta_text_bg_img1 = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'cta_text_bg_img1', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: customBySize(0, {
        '160x600': 107,
        '300x1050': 219,
        '300x600': 244,
        '320x480': 256,
        '800x250': 720,
        '970x250': 890
      }, "left"),
      top: customBySize(25, {
        '300x1050': 34,
        '300x600': 37,
        '320x480': 10,
        '728x90': 27,
        '970x250': 24,
        '970x90': 23
      }, "top"),
      width: customBySize(80, {
        '160x600': 53,
        '300x1050': 81,
        '300x600': 56,
        '320x480': 64,
        '728x90': 67,
        '970x90': 79
      }, "width"),
      height: customBySize(49, {
        '160x600': 32,
        '300x600': 34,
        '320x480': 39,
        '728x90': 40,
        '970x90': 47
      }, "height"),
      zIndex: customBySize(null, {
        '160x600': 185,
        '300x1050': 181,
        '300x600': 187,
        '320x480': 180,
        '728x90': 186,
        '800x250': 183,
        '970x250': 182,
        '970x90': 184
      }),
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: customBySize(stage, { '180x150__300x250__320x100__320x50__336x280__468x60': '' }),
      tint: R.create('var').set({ name: 'cta_text_bg_img1_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'cta_text_bg_img1' }
  })

  const default_img = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'default_img', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: 0,
      top: 0,
      width: customBySize(320, {
        '160x600': 160,
        '180x150': 180,
        '300x1050__300x600': 300,
        '300x250': width,
        '336x280': 336,
        '468x60': 468,
        '728x90': 728,
        '800x250': 800,
        '970x250__970x90': 970
      }, "width"),
      height: customBySize(90, {
        '160x600__300x600': 600,
        '180x150': 150,
        '300x1050': 1050,
        '300x250': height,
        '320x100': 100,
        '320x480': 480,
        '320x50': 50,
        '336x280': 280,
        '468x60': 60,
        '800x250__970x250': 250
      }, "height"),
      zIndex: customBySize(null, {
        '160x600': 160,
        '180x150': 159,
        '300x1050': 155,
        '300x250': 164,
        '300x600': 162,
        '320x100': 153,
        '320x480': 161,
        '320x50': 156,
        '336x280': 154,
        '468x60': 157,
        '728x90': 158,
        '800x250': 151,
        '970x250': 152,
        '970x90': 150
      }),
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage,
      tint: R.create('var').set({ name: 'default_img_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'default_img' }
  })

  const bg_img = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'bg_img', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: 0,
      top: 0,
      width: stageWidth,
      height: stageHeight,
      zIndex: customBySize(null, {
        '160x600': 63,
        '180x150': 86,
        '300x1050': 43,
        '300x250': 80,
        '300x600': 74,
        '320x100': 38,
        '320x480': 69,
        '320x50': 48,
        '336x280': 92,
        '468x60': 54,
        '728x90': 58,
        '800x250': 26,
        '970x250': 32,
        '970x90': 20
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

  const logo2_img = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'logo2_img', defaultValue: '', dataType: 'String', required: true, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: 0,
      top: 0,
      width: stageWidth,
      height: stageHeight,
      zIndex: customBySize(null, {
        '180x150': 381,
        '300x250': 300,
        '320x100': 435,
        '320x50': 354,
        '336x280': 408,
        '468x60': 327
      }),
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: customBySize('', { '180x150__300x250__320x100__320x50__336x280__468x60': stage }),
      tint: R.create('var').set({ name: 'logo2_img_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'logo2_img' }
  })

  const cta_text_bg_img2 = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'cta_text_bg_img2', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: customBySize(null, {
        '180x150': 7,
        '300x250': 12,
        '320x100': 9,
        '320x50': 153,
        '336x280': 13,
        '468x60': 268
      }, "left"),
      top: customBySize(5, {
        '180x150': 25,
        '300x250': 42,
        '320x100': 10,
        '336x280': 47
      }, "top"),
      width: customBySize(75, {
        '180x150': 62,
        '300x250': 103,
        '336x280': 115,
        '468x60': 93
      }, "width"),
      height: customBySize(23, {
        '180x150': 19,
        '300x250': 32,
        '336x280': 36,
        '468x60': 29
      }, "height"),
      zIndex: customBySize(null, {
        '180x150': 176,
        '300x250': 175,
        '320x100': 178,
        '320x50': 173,
        '336x280': 177,
        '468x60': 174
      }),
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: customBySize('', { '180x150__300x250__320x100__320x50__336x280__468x60': stage }),
      tint: R.create('var').set({ name: 'cta_text_bg_img2_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'cta_text_bg_img2' }
  })

  const cta_text_bg_img3 = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'cta_text_bg_img3', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: customBySize(null, {
        '180x150': 11,
        '300x250': 18,
        '320x100': 13,
        '320x50': 157,
        '336x280': 20,
        '468x60': 273
      }, "left"),
      top: customBySize(26, {
        '180x150': 39,
        '300x250': 65,
        '320x50': 21,
        '336x280': 73
      }, "top"),
      width: customBySize(76, {
        '180x150': 63,
        '300x250': 104,
        '336x280': 117,
        '468x60': 94
      }, "width"),
      height: customBySize(24, {
        '180x150': 20,
        '300x250': 33,
        '336x280': 37,
        '468x60': 30
      }, "height"),
      zIndex: customBySize(null, {
        '180x150': 169,
        '300x250': 168,
        '320x100': 171,
        '320x50': 166,
        '336x280': 170,
        '468x60': 167
      }),
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: customBySize('', { '180x150__300x250__320x100__320x50__336x280__468x60': stage }),
      tint: R.create('var').set({ name: 'cta_text_bg_img3_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'cta_text_bg_img3' }
  })

  const headline_text_bg_img5 = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'headline_text_bg_img5', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: customBySize(null, {
        '728x90': 82,
        '970x90': 108
      }, "left"),
      top: customBySize(null, {
        '728x90': 12,
        '970x90': 9
      }, "top"),
      width: customBySize(null, {
        '728x90': 283,
        '970x90': 307
      }, "width"),
      height: customBySize(null, {
        '728x90': 42,
        '970x90': 45
      }, "height"),
      zIndex: customBySize(null, {
        '728x90': 192,
        '970x90': 193
      }),
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: customBySize('', { '728x90__970x90': stage }),
      tint: R.create('var').set({ name: 'headline_text_bg_img5_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'headline_text_bg_img5' }
  })

  const headline_text_bg_img6 = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'headline_text_bg_img6', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: customBySize(null, {
        '728x90': 89,
        '970x90': 116
      }, "left"),
      top: customBySize(null, {
        '728x90': 37,
        '970x90': 36
      }, "top"),
      width: customBySize(null, {
        '728x90': 284,
        '970x90': 308
      }, "width"),
      height: customBySize(null, {
        '728x90': 43,
        '970x90': 46
      }, "height"),
      zIndex: customBySize(null, {
        '728x90': 189,
        '970x90': 190
      }),
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: customBySize('', { '728x90__970x90': stage }),
      tint: R.create('var').set({ name: 'headline_text_bg_img6_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'headline_text_bg_img6' }
  })

  const bg_color = R.create('div').set({
    css: {
      left: 0,
      top: 0,
      zIndex: customBySize(null, {
        '160x600': 11,
        '180x150': 10,
        '300x1050': 6,
        '300x250': 15,
        '300x600': 12,
        '320x100': 4,
        '320x480': 14,
        '320x50': 7,
        '336x280': 5,
        '468x60': 8,
        '728x90': 9,
        '800x250': 2,
        '970x250': 3,
        '970x90': 1
      }),
      width: customBySize(300, {
        '160x600': 160,
        '180x150': 180,
        '320x100__320x480__320x50': 320,
        '336x280': 336,
        '468x60': 468,
        '728x90': 728,
        '800x250': 800,
        '970x250__970x90': 970
      }, "width"),
      height: customBySize(250, {
        '160x600__300x600': 600,
        '180x150': 150,
        '300x1050': 1050,
        '320x100': 100,
        '320x480': 480,
        '320x50': 50,
        '336x280': 280,
        '468x60': 60,
        '728x90__970x90': 90
      }, "height"),
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

  let catImgsArr = []

  const allElementsArr = [stageBlock, headline_vertical_text, cta_text, headline_horizontal_text, fg_img, style_img, logo_img, lifestyle_img, headline_text_bg_img1, headline_text_bg_img2, headline_text_bg_img3, headline_text_bg_img4, cta_text_bg_img1, default_img, bg_img, logo2_img, cta_text_bg_img2, cta_text_bg_img3, headline_text_bg_img5, headline_text_bg_img6, bg_color];
  const navArrowsArr = [];

  let elementsToRender = allElementsArr.filter(el => el !== null && !!el.parentNode && !el.length && !el.elements);

  const requiredArr = customBySize([headline_vertical_text, cta_text, logo_img, lifestyle_img], {
      '180x150__300x250__320x100__320x50__336x280__468x60': [cta_text, logo2_img, lifestyle_img],
      '728x90__970x90': [headline_horizontal_text, cta_text, logo_img, lifestyle_img]
    })
    .filter(el => el !== null && !!el.parentNode);

  const groupsArr = []
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

      if (catImgsArr.length < 2 && navArrowsArr.length) {
        navArrowsArr.forEach(element => {
          element.display = "none";
          element.visibility = "hidden";
        })
      }

      displayLoaded([
        R.filter.success(requiredArr),
        R.filter.success(groupsArr),
        R.filter.success(elementsToRender)

      ]);

      additionalSettings(allElementsArr, globalDepsObj, beforeRenderElements);

      // Pass all element dependencies for animateElements here
      const elementDeps = {
        animatedElements: [stageBlock, headline_vertical_text, cta_text, headline_horizontal_text, fg_img, style_img, logo_img, lifestyle_img, headline_text_bg_img1, headline_text_bg_img2, headline_text_bg_img3, headline_text_bg_img4, cta_text_bg_img1, default_img, bg_img, logo2_img, cta_text_bg_img2, cta_text_bg_img3, headline_text_bg_img5, headline_text_bg_img6, bg_color],
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
    width: stageWidth,
    height: stageHeight,
    pointerEvents: 'auto',
    cursor: 'pointer',
    zIndex: 0,
    parentNode: stage
  });
  hit_area.on('click', adHit);

}
