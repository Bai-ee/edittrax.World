(function() {
    /* [INSERT_BUILD_STAMP] */
    "use strict";
    var win = window;
    var creatives = (win._$OGO$_ || (win._$OGO$_ = {})) &&  (win._$OGO$_.Rosetta || (win._$OGO$_.Rosetta = {})) && (win._$OGO$_.Rosetta.creatives || (win._$OGO$_.Rosetta.creatives = []));
    var Rosetta = win._$OGO$_.Rosetta;
    var require =  Rosetta.requirejs || require;

    function Creative(dmo){
        /* [START_CUSTOM_VARIABLES] */
        /* [END_CUSTOM_VARIABLES] */

        var registeredCallbacks = [], environStatuses = [],environTotals = 3, isEnvironReady = false, isCreativeReady = false;
        var R, Platform, Settings, Analytics, AnalyticsContent, TweenMax, TweenLite, TimelineLite, TimelineMax, EventForwarding, Hammer/* [INSERT_PLUGIN_VARS] */;

        var ROSETTA_VERSION = "4.60";
        var context = String(ROSETTA_VERSION + "_"  + dmo.embedId).split("_").join(".");
        var parentDiv, stage, animate, timeoutTimer, startTimer, FOF_PIXEL_DENSITY;
        var evergreenImg = "evergreen.jpg";
        var CENTER_STAGE = false;

        function init(wrapperID) {
            var subdirectory = "68125D_BR_Cuisine";
            var creativeName = "" || subdirectory;
            var companyID = "80142";
            var isSecure = (dmo.externalURL.indexOf("https:") > -1);



            var config = {
                context: context,
                waitSeconds: 5,
                paths: {},
                bundles: {
                    "Rosetta":["core.pack","ad.pack","cnvr.usweb.pack","cnvr.mojo.pack","filters.pack","tweenmax.pack"]
                }
            };

            config.bundles.Rosetta = (function(bundles){
                if (typeof Object.create !== 'function'){
                    var compatible = ["static.pack"];
                    for (var i=0; i<bundles.length; i++){
                        if (bundles[i].indexOf("cnvr.") > -1){
                            compatible.push(bundles[i]);
                        }
                    }
                    if (typeof dmo.rosettaBundles === "function"){compatible = dmo.rosettaBundles(compatible)} //jshint:ignore
                    try {
                        if (dmo && dmo.logEvent && typeof dmo.logEvent === "function"){
                            dmo.logEvent.call(dmo, 210, 'Object.create');
                        }
                    } catch(e){};
                    return compatible;
                }
                return bundles;
            })(config.bundles.Rosetta);


            dmo.atomSuffix = dmo.atomSuffix || "";
            config.paths["Rosetta"] = dmo.externalURL + "/atom/"+ROSETTA_VERSION+"/3.1.1/?scripts=" + "wrapper_start," + config.bundles.Rosetta.join(",") + ",wrapper_end" + dmo.atomSuffix;

            var req = require.config(config);
            req( ['require'].concat(config.bundles.Rosetta), function() {
                var Core = req("core/Core");
                Platform = req("platform/Platform");
                Settings = req("display/settings/GlobalSettings");
                Analytics = req("core/analytics/Analytics");
                AnalyticsContent = req("core/analytics/AnalyticsContent");
                EventForwarding = req("core/eventforwarding/EventForwarding");
                R = new Core();
                if (typeof dmo.rosettaLoaded === "function"){dmo.rosettaLoaded(req, R)}
                if (wrapperID){
                    Settings.overwrite({prefix: wrapperID + "_"});
                    parentDiv = document.getElementById(wrapperID);
                }
                parentDiv = parentDiv || document.body;
                Platform.overwrite({
                    isSecure:isSecure,
                    rosettaVersion:ROSETTA_VERSION,
                    placementWidth:Number(dmo.mediaWidth) || 320,
                    placementHeight:Number(dmo.mediaHeight) || 480,
                    clientID:dmo.companyId || companyID
                });
                R.setFallback(fallback);

                if (R.isCompatible === true) {
                    R.parseParameters(dmo.flashVars, 'flashvars');
                    Platform.overwrite({
                        clientID: R.create("var").set({name:"company_id", dataType:"String", defaultValue:Platform.fetch().clientID}).render().value(),
                        cacheBuster: R.create("var").set({name:"bypass_cache", dataType:"Boolean", defaultValue:false, exposed:false}).render().value(),
                        subdirectory:R.create("var").set({name:"subdirectory", dataType:"String", defaultValue:subdirectory}).render().value(),
                        FOFVersion: R.create("var").set({name:"fof_version", dataType:"String", defaultValue:"4.0.2", exposed:false}).render().value(),
                        isSecure: R.create("var").set({name:"dtm_secure", dataType:"Boolean", defaultValue:Platform.fetch().isSecure, exposed:false}).render().value(),
                        analytics: (window["mplx"] && window["mplx"].SVEvent),
                        analyticsScope: null
                    });
                    if (R.create("var").set({name:"disable_retina", dataType:"Boolean", defaultValue:false, exposed:false}).render().value() === false
                        && (R.environment.isRetina === true || R.create("var").set({name:"force_retina", dataType:"Boolean", defaultValue:false, exposed:false}).render().value())) {
                        Settings.overwrite({pixelDensity: 2})
                    }
                    FOF_PIXEL_DENSITY =  (function(){
                        var pxDensity = R.create("var").set({name:"fof_pixel_density", dataType:"Number", exposed:false, defaultValue:Settings.fetch().pixelDensity}).render().value();
                        pxDensity = Math.round(pxDensity);
                        if (pxDensity !== 1 && pxDensity !== 2){
                            pxDensity = Settings.fetch().pixelDensity;
                        }
                        return pxDensity;
                    })();
                    startTimer = function(){
                        var timeout = R.create("var").set({name:"default_timeout", dataType:"Number", defaultValue:5, exposed:false}).render().value();
                        timeoutTimer = setTimeout(function(){
                            var timeoutInstance = {
                                event:AnalyticsContent.FALL_BACK,
                                failReason: {
                                    type:AnalyticsContent.TIMED_OUT,
                                    details: timeout
                                }
                            };
                            R.fallback(timeoutInstance)
                        }, timeout*1000);
                    };
                    if (CENTER_STAGE){
                        Analytics.fire({
                            event: AnalyticsContent.INIT,
                            instance: reveal,
                            details:creativeName
                        });
                        var pds = parentDiv.style;
                        pds.marginTop = -(Number(Platform.fetch().placementHeight) * .5) + "px";
                        pds.marginLeft = -(Number(Platform.fetch().placementWidth) * .5) + "px";
                        pds.top = "50%";
                        pds.left = "50%";
                        pds.position = "absolute";
                    }
                    evergreenImg = R.create("var").set({name:"evergreen_img", dataType:"String", defaultValue:evergreenImg}).render().value();
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
            }, function(e){
                log(e);
            });

            return reveal;
        }

        function createElements(){
            animate = animateElements;
            logEnvironStatus("createElements", "start");

            var width = R.create("var").set({name:"width", dataType:"Number", defaultValue:Platform.fetch().placementWidth, exposed:false}).render().value();
            var height = R.create("var").set({name:"height", dataType:"Number", defaultValue:Platform.fetch().placementHeight, exposed:false}).render().value();
            var borderColor = R.create("var").set({name: "border_color", dataType: "String", defaultValue: "#CCCCCC"}).render().value();

            stage = R.create("div").set({id:"stage", width: width, height: height, backgroundColor:"#FFFFFF", className: "stage"});
            parentDiv.appendChild(stage.element);
            Settings.overwrite({stage: stage});
            new EventForwarding().init({stage:stage});
            var borders = {
                l:R.create("div").set({width:"1px", height:height, backgroundColor:borderColor, left:0, top:0, zIndex:475,  pointerEvents:"none", parentNode:stage}).render(),
                r:R.create("div").set({width:"1px", height:height, backgroundColor:borderColor, right:0, top:0, zIndex:475, pointerEvents:"none",parentNode:stage}).render(),
                t:R.create("div").set({width:width, height:"1px", backgroundColor:borderColor, left:0, top:0, zIndex:475, pointerEvents:"none", parentNode:stage}).render(),
                b:R.create("div").set({width:width, height:"1px", backgroundColor:borderColor, left:0, bottom:0, zIndex:475, pointerEvents:"none", parentNode:stage}).render()
            };

            //apply CSS reset to stage class
            R.applyCSSReset(".stage");

            let stageHeight = height;
            let stageWidth = width;
            
  const stageBlock = R.create('div').set({
    css: {
      height: stageHeight,
      width: stageWidth,
      zIndex: 9999999,
      pointerEvents: 'none',
      cursor: 'auto',
      backgroundColor: '#ffffff'
    },
    attr: {
      id: 'stage-block'
    },
    rosetta: {
      parentNode: stage
    }
  });

  let lineHeightVert = 1.23;

  const headline_vertical_text = R.create('div').set({
    css: {
      color: '#ffffff',
      fontSize: 22,
      fontFamily: 12983,
      lineHeight: R.create('var').set({ name: 'headline_vertical_text_lineheight', defaultValue: lineHeightVert, dataType: 'number', required: false, exposed: true }).render().value(),
      letterSpacing: 0,
      textAlign: 'center',
      verticalAlign: 'top',
      marginTop: 0,
      backgroundColor: R.create('var').set({ name: 'headline_vertical_text_bg_color', defaultValue: '#', dataType: 'Gradient', required: false, exposed: true }).render().value(),
      padding: '',
      left: 48,
      top: 36,
      width: 162,
      height: 111,
      zIndex: 461,
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
      id: 'headline_vertical_text',
      textContent: R.create('var').set({ name: 'headline_vertical_text', defaultValue: 'your favourite<br>&nbsp;&nbsp;food&nbsp;delivered<br>to your door', dataType: 'String', required: true, exposed: true }).render().value()
    }
  })

  let ctaTextLineHeight = 1.08;

  let cta_text = R.create('div').set({
    css: {
      color: '#ffffff',
      fontSize: 13,
      fontFamily: 12983,
      lineHeight: R.create('var').set({ name: 'cta_text_lineheight', defaultValue: ctaTextLineHeight, dataType: 'number', required: false, exposed: true }).render().value(),
      letterSpacing: 0,
      textAlign: 'left',
      verticalAlign: 'top',
      marginTop: 0,
      backgroundColor: R.create('var').set({ name: 'cta_text_bg_color', defaultValue: '', dataType: 'Gradient', required: false, exposed: true }).render().value(),
      padding: '',
      left: 263,
      top: 15,
      width: 64,
      height: 32,
      zIndex: 444,
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
      // renderDensity: FOF_RENDER_DENSITY,
      forceLineHeight: true
    },
    attr: {
      id: 'cta_text',
      textContent: R.create('var').set({ name: 'cta_text', defaultValue: 'get the app now', dataType: 'String', required: true, exposed: true }).render().value()
    }
  })

  let lineHeightVHoriz = null;

  const headline_horizontal_text = R.create('div').set({
    css: {
      color: R.create('var').set({ name: 'headline_horizontal_text_color', defaultValue: '#000000', dataType: 'Color', required: false, exposed: true }).render().value(),
      // fontSize: customBySize(null, {
      //   '728x90': 21,
      //   '970x90': 23
      // }, "fontSize"),
      fontFamily: 12983,
      lineHeight: R.create('var').set({ name: 'headline_horizontal_text_lineheight', defaultValue: lineHeightVHoriz, dataType: 'number', required: false, exposed: true }).render().value(),
      letterSpacing: 0,
      textAlign: 'center',
      verticalAlign: 'top',
      marginTop: 0,
      backgroundColor: R.create('var').set({ name: 'headline_horizontal_text_bg_color', defaultValue: '', dataType: 'Gradient', required: false, exposed: true }).render().value(),
      padding: '',
      // left: customBySize(null, {
      //   '728x90': 93,
      //   '970x90': 120
      // }, "left"),
      // top: customBySize(null, {
      //   '728x90': 24,
      //   '970x90': 23
      // }, "top"),
      // width: customBySize(null, {
      //   '728x90': 275,
      //   '970x90': 294
      // }, "width"),
      // height: customBySize(null, {
      //   '728x90': 53,
      //   '970x90': 59
      // }, "height"),
      // zIndex: customBySize(null, {
      //   '728x90': 455,
      //   '970x90': 456
      // }),
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
      // renderDensity: FOF_RENDER_DENSITY,
      forceLineHeight: true
    },
    attr: {
      id: 'headline_horizontal_text',
      textContent: R.create('var').set({ name: 'headline_horizontal_text', defaultValue: '', dataType: 'String', required: true, exposed: true }).render().value()
    }
  })

  const fg_img = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'fg_img', defaultValue: 'fg_img.png', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: 0,
      top: 0,
      width: stageWidth,
      height: stageHeight,
      zIndex: 588,
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
      zIndex: 572,
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
      backgroundImage: R.create('var').set({ name: 'logo_img', defaultValue: 'logo_img_teal_Matte2.gif', dataType: 'String', required: true, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: 182,
      top: 354,
      width: 126,
      height: 126,
      zIndex: 270,
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage,
      tint: R.create('var').set({ name: 'logo_img_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: {
      id: 'logo_img',
      directoryType: 'shared'
    }
  })

  const lifestyle_img = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'lifestyle_img', defaultValue: 'lifestyle_italian_img.png', dataType: 'String', required: true, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: 81,
      top: 136,
      width: 366,
      height: 341,
      zIndex: 245,
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
      backgroundImage: R.create('var').set({ name: 'headline_text_bg_img1', defaultValue: 'headline_text_bg_img1.png', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: 37,
      top: 19,
      width: 166,
      height: 52,
      zIndex: 221,
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage,
      tint: R.create('var').set({ name: 'headline_text_bg_img1_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'headline_text_bg_img1' }
  })

  const headline_text_bg_img2 = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'headline_text_bg_img2', defaultValue: 'headline_text_bg_img2.png', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: 49,
      top: 44,
      width: 172,
      height: 54,
      zIndex: 209,
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage,
      tint: R.create('var').set({ name: 'headline_text_bg_img2_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'headline_text_bg_img2' }
  })

  const headline_text_bg_img3 = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'headline_text_bg_img3', defaultValue: 'headline_text_bg_img3.png', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: 47,
      top: 78,
      width: 167,
      height: 45,
      zIndex: 202,
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage,
      tint: R.create('var').set({ name: 'headline_text_bg_img3_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'headline_text_bg_img3' }
  })

  const headline_text_bg_img4 = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'headline_text_bg_img4', defaultValue: '', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: 39,
      top: 105,
      width: 171,
      height: 47,
      zIndex: 196,
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage,
      tint: R.create('var').set({ name: 'headline_text_bg_img4_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'headline_text_bg_img4' }
  })

  const cta_text_bg_img1 = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'cta_text_bg_img1', defaultValue: 'cta_text_bg_img1.png', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: 256,
      top: 10,
      width: 64,
      height: 39,
      zIndex: 180,
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage,
      tint: R.create('var').set({ name: 'cta_text_bg_img1_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'cta_text_bg_img1' }
  })

  const default_img = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'default_img', defaultValue: '', dataType: 'String', required: true, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: 0,
      top: 0,
      width: stageWidth,
      height: stageHeight,
      zIndex: 161,
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
      backgroundImage: R.create('var').set({ name: 'bg_img', defaultValue: 'bg_img.png', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: 0,
      top: 0,
      width: stageWidth,
      height: stageHeight,
      zIndex: 69,
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
      backgroundImage: R.create('var').set({ name: 'logo2_img', defaultValue: 'logo2_img.png', dataType: 'String', required: true, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      left: 0,
      top: 0,
      width: stageWidth,
      height: stageHeight,
      // zIndex: customBySize(null, {
      //   '180x150': 381,
      //   '300x250': 300,
      //   '320x100': 435,
      //   '320x50': 354,
      //   '336x280': 408,
      //   '468x60': 327
      // }),
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage ,
      tint: R.create('var').set({ name: 'logo2_img_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'logo2_img' }
  })

  const cta_text_bg_img2 = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'cta_text_bg_img2', defaultValue: 'cta_text_bg_img2.png', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      // left: customBySize(null, {
      //   '180x150': 7,
      //   '300x250': 12,
      //   '320x100': 9,
      //   '320x50': 153,
      //   '336x280': 13,
      //   '468x60': 268
      // }, "left"),
      top: 5,
      width: 75,
      height: 23,
      // zIndex: customBySize(null, {
      //   '180x150': 176,
      //   '300x250': 175,
      //   '320x100': 178,
      //   '320x50': 173,
      //   '336x280': 177,
      //   '468x60': 174
      // }),
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage,
      tint: R.create('var').set({ name: 'cta_text_bg_img2_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'cta_text_bg_img2' }
  })

  const cta_text_bg_img3 = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'cta_text_bg_img3', defaultValue: 'cta_text_bg_img3.png', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      // left: customBySize(null, {
      //   '180x150': 11,
      //   '300x250': 18,
      //   '320x100': 13,
      //   '320x50': 157,
      //   '336x280': 20,
      //   '468x60': 273
      // }, "left"),
      top: 26,
      width: 72,
      height: 24,
      // zIndex: customBySize(null, {
      //   '180x150': 169,
      //   '300x250': 168,
      //   '320x100': 171,
      //   '320x50': 166,
      //   '336x280': 170,
      //   '468x60': 167
      // }),
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage ,
      tint: R.create('var').set({ name: 'cta_text_bg_img3_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'cta_text_bg_img3' }
  })

  const headline_text_bg_img5 = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'headline_text_bg_img5', defaultValue: 'headline_text_bg_img5.png', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      // left: customBySize(null, {
      //   '728x90': 82,
      //   '970x90': 108
      // }, "left"),
      // top: customBySize(null, {
      //   '728x90': 12,
      //   '970x90': 9
      // }, "top"),
      // width: customBySize(null, {
      //   '728x90': 283,
      //   '970x90': 307
      // }, "width"),
      // height: customBySize(null, {
      //   '728x90': 42,
      //   '970x90': 45
      // }, "height"),
      // zIndex: customBySize(null, {
      //   '728x90': 192,
      //   '970x90': 193
      // }),
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage ,
      tint: R.create('var').set({ name: 'headline_text_bg_img5_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'headline_text_bg_img5' }
  })

  const headline_text_bg_img6 = R.create('div').set({
    css: {
      backgroundImage: R.create('var').set({ name: 'headline_text_bg_img6', defaultValue: 'headline_text_bg_img6.png', dataType: 'String', required: false, exposed: true }).render().value(),
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      // left: customBySize(null, {
      //   '728x90': 89,
      //   '970x90': 116
      // }, "left"),
      // top: customBySize(null, {
      //   '728x90': 37,
      //   '970x90': 36
      // }, "top"),
      // width: customBySize(null, {
      //   '728x90': 284,
      //   '970x90': 308
      // }, "width"),
      // height: customBySize(null, {
      //   '728x90': 43,
      //   '970x90': 46
      // }, "height"),
      // zIndex: customBySize(null, {
      //   '728x90': 189,
      //   '970x90': 190
      // }),
      pointerEvents: 'none',
      cursor: 'auto',
      position: 'absolute',
      visibility: 'hidden'
    },
    rosetta: {
      parentNode: stage ,
      tint: R.create('var').set({ name: 'headline_text_bg_img6_tint', defaultValue: '', dataType: 'Color', required: false, exposed: true }).render().value()
    },
    attr: { id: 'headline_text_bg_img6' }
  })

  const bg_color = R.create('div').set({
    css: {
      left: 0,
      top: 0,
      zIndex: 14,
      width: 320,
      height: 480,
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

			/* [BATCH_LOADING] */
			var requiredArr = [];
			// var allElementsArr = [fg_img, style_img, subhead_img, headline_img, walmart_logos_img, cta_img, gradient_img, mountain1_img, mountain2_img, bg_img, bg_color,headline_img_shadow_text,subhead_cont,subhead_img_shadow, stageBlock];
			
////////////////////

			// if(headlinePosition){
			// 	headline_text.top = 310;
			// 	headline_color_shadow_text.top = parseInt(headline_text.top) + 3;
			// 	headline_color_shadow_text.left = parseInt(headline_text.left) + 3;
			// }

////////////////////

			function additionalSettings() {
				};
			
			var megaBatch = R.create("batch")
				.require(requiredArr)
				.add(allElementsArr)
				.render({
					success: function(){
                        console.log("hit")
						displayLoaded([
							R.filter.success(requiredArr),
							R.filter.success(allElementsArr)
							]);
						creativeReady();
					},
					fail: function(e){
						R.fallback(e);
					}
				});
				
			function displayLoaded(loaded){
				for(var i = 0; i < loaded.length; i++){
					for(var j = 0;  j < loaded[i].length; j++){
						if(loaded[i][j] && loaded[i][j].element){
							loaded[i][j].visibility = "";
						}
					}
				}
			};
			
			var hit_area = R.create("div").set({id:"ad_hit", width: width, height: height, pointerEvents: "auto", cursor: "pointer", zIndex:0, parentNode:stage});
			hit_area.on("click", adHit);
				
			//ADDING CTT JUNK VARS
            /* var hit_area = R.create("div").set({id:"ad_hit", width: width, height: height, pointerEvents: "auto", cursor: "pointer", zIndex:100, parentNode:stage});
            hit_area.on("click", adHit); */

            /* [END_CREATE_ELEMENTS] */
            creativeReady()

            // All Animation goes here
            function animateElements() {
                console.log("hit an")


// TweenMax.to(stageBlock.element, 0.5, { autoAlpha: 0, ease: 'Power1.easeOut' });

  lifestyle_img.visibility = "visible";
  default_img.backgroundImage == "" ? lifestyle_img.visibility = "visible" : lifestyle_img.visibility = "hidden";

  //taken from createElements, this is adjusting the ls image from its original GH position
  TweenMax.set(lifestyle_img.element, {left:81});

  //called on hover
  const hoverEffect = (boolean) => {
    boolean ? TweenMax.to(lifestyle_img.element, 1, {ease: 'Power4.easeOut', rotation:1.5}) : TweenMax.to(lifestyle_img.element, 1, {ease: 'Power4.easeOut', rotation:0})
  }; 

  const all_frames = new TimelineMax();
  const main_timeline = new TimelineMax();
  const tl = new TimelineMax();  

  //kill animaton and start hover effect
  const killTween = () => {
      //kill animation
      all_frames.kill();

      let isMobileDevice;
      //CHECK IF MOBILE
      const checkIfMobileDevice = () => {
          if ("maxTouchPoints" in navigator) { 
          isMobileDevice = navigator.maxTouchPoints > 0;
          } else if ("msMaxTouchPoints" in navigator) {
              isMobileDevice = navigator.msMaxTouchPoints > 0; 
          } else {
              var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
              if (mQ && mQ.media === "(pointer:coarse)") {
                  isMobileDevice = !!mQ.matches;
              } else if ('orientation' in window) {
                  isMobileDevice = true; // deprecated, but good fallback
              } else {
                  // Only as a last resort, fall back to user agent sniffing
                  var UA = navigator.userAgent;
                  isMobileDevice = (
                      /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                      /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
                  );
              }
          }
      } 

      checkIfMobileDevice(); 

      if(!isMobileDevice){
          //activate hover effects
          hit_area.on("mouseover", function(){
            // console.log("mouseover")
            hoverEffect(true);    
          })
          //hover off
          hit_area.on("mouseout", function(){
            // console.log("mouseout")
            hoverEffect(false); 

          })  
        } else {
        // console.log("no hover")
      }    
  }
  //kill animaton
  const delay = 14;
  TweenMax.delayedCall(delay, killTween);

  //set blur amount
  var blurElement = {a:0,b:0};
  TweenMax.set(lifestyle_img.element,{webkitFilter:"blur(" + blurElement.a + "px)",opacity:1});  

  const bezierValues =              
      [{x: 10, y: 0},
      {x: -10, y: 0},
      {x: 0, y: 0},
      {x: 5, y: 0},
      {x: 5, y: 0}];    

    /* [END_ANIMATE_ELEMENTS] */

    //CUSTOM TEXT EFFECT////////////////////

	//set how long the shadow should be

    TweenMax.set(stageBlock.element, {autoAlpha:1});
    TweenMax.to(stageBlock.element, 1, {autoAlpha:0, delay:0.5});

    all_frames.timeScale(1.25);
    TweenMax.set(headline_vertical_text.element, {rotation:-5.5});
    TweenMax.set(cta_text.element, {rotation:-4.25});

    if (bg_img.element) {

      // all_frames.from(bg_img.element, 0.45, { scale:1.05, ease: 'Power2.easeOut' }, 0);
    }
    if (lifestyle_img.element) {
      // all_frames.to(lifestyle_img.element, 0.25, { webkitFilter:"blur(" + blurElement.b + "px)"},0.75);
    }
    if (logo_img.element) {
      all_frames.from(logo_img.element, 1.25, { ease: 'Power4.easeOut', autoAlpha: 0 }, 0.25);
    }
    if (lifestyle_img.element) {
      all_frames.from(lifestyle_img.element, 1, { ease: 'Power4.easeOut', easeParams:[1.5], rotation:45, y:200, x: 286,/* onComplete:startAni */delay:0.5}, 0.25);
      all_frames.to(lifestyle_img.element, 2, { ease: 'Power2.easeOut', x:15, y:10 },1.2);
      all_frames.to(lifestyle_img.element, 50, {  ease:'Power4.easeOut', bezier: {timeResolution:6, type:"soft", curviness:2, autoRotate:false, values:bezierValues}},2.6)

    }
    if (headline_text_bg_img1.element) {
      all_frames.from([ headline_vertical_text.element, headline_text_bg_img1.element,headline_text_bg_img2.element,headline_text_bg_img3.element,headline_text_bg_img4.element], 0.75, { ease: 'Power4.easeOut', x: -300, y:+20 }, 1.2);
    }
    if (cta_text_bg_img1.element) {
      all_frames.from([cta_text.element,  cta_text_bg_img1.element], .35, { ease: 'Power4.easeOut', x:90, y:"-10" }, 5);
    }


		        }
        	}

        function adHit(e) {
            //console.log("adHit");
            try{
                // prevent event bubbling
                e.stopPropagation();
            } catch(err){}

            e = e || window.event;
			var instance = R.get(e.target);
			var index = 0;
			Analytics.fire({event: "click", instance: instance,  currentInstance:instance, details:""});
				if (instance && instance.data && instance.data.hitIndex) {
					index = instance.data.hitIndex;
				}
			var clickOut = R.create("var").set({name:"mplx_clickOut", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value();
			window.open(clickOut);
			
        }

        function fallback(){

            R.create("ImageIE7").set({
                src: evergreenImg,
                subdirectory: "",
                directoryType: "evergreen",
                width: Platform.fetch().placementWidth,
                height: Platform.fetch().placementHeight,
                maxWidth: Platform.fetch().placementWidth,
                maxHeight: Platform.fetch().placementHeight,
                borderWidth:1,
                borderStyle:"solid",
                borderColor:"#CCCCCC",
                boxSizing:"border-box",
                position:"absolute",
                zIndex:500,
                display:"block"
            }).complete(function (inst) {
                if (stage) {
                    // hide all elements that get created from here out
                    Settings.overwrite({display: "none"});
                    // hide all existing elements (ImageIE7 is not logged in SelectorEngine)
                    var allElements = R.get("");
                    var i = allElements.length;
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
        }

        function assignSelector() {
            var defined = require.s.contexts[context].defined;
            var registry = require.s.contexts[context].registry;

            TweenMax = enableModule(defined,registry, "TweenMax");
            if(TweenMax){TweenMax.selector = R.selector}
            TweenLite = enableModule(defined,registry, "TweenLite");
            if (TweenLite){ Settings.overwrite({GSAPSelector: TweenLite.selector});TweenLite.selector = R.selector;}
            TimelineLite = enableModule(defined,registry, "TimelineLite");
            TimelineMax = enableModule(defined,registry, "TimelineMax");
            Hammer = enableModule(defined, registry, "Hammer");

            function enableModule(defined, registry, name){
                if (registry[name] && !defined[name]){
                    registry[name].enable();
                }
                if (defined[name]) {
                    return defined[name];
                }
            }
        }

        function log(msg) {
            if (window && window.console){
                var c = "Creative: ";
                try {
                    if (window.console.debug && typeof msg === "object"){
                        console.debug(msg);
                    } else if (window.console.log){
                        console.log(c + msg);
                    }
                } catch(e){}
            }
        }

        function registerCallback(evt, callback, scope) {
            registeredCallbacks.push({evt:evt, callback:callback, scope:scope});
            return reveal;
        }

        function checkForCallback(evt, params) {
            if (!evt){return;}
            var arr = registeredCallbacks;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].evt === evt) {
                    if (arr[i].callback) {
                        try{
                            arr[i].callback.call(arr[i].scope, params);
                        } catch(e) { log("Callback failed"); }
                    }
                }
            }
        }

        function isArray(val) {
            if (!Array.isArray) {
                Array.isArray = function (vArg) {
                    return Object.prototype.toString.call(vArg) === "[object Array]";
                };
            }
            return Array.isArray(val);
        }

        function environReady(isReady) {
            if (isEnvironReady === false){
                isEnvironReady = isReady;
                if (isReady === true) {
                    logEnvironStatus("parentEnvironment", isEnvironReady);
                }
            }
            return reveal;
        }

        function creativeReady() {
            if (isCreativeReady === false) {
                isCreativeReady = true;
                var xmlPush = require.s.contexts[context].defined['platform/advantage/XMLPush'];
                if (xmlPush) { xmlPush.init(); }
                checkForCallback("creative_ready");
                logEnvironStatus("creative", isCreativeReady);
            }
        }

        function logEnvironStatus(src, val) {
            environStatuses.push({src: src, val: val});
            if (environStatuses.length !== environTotals && !!checkEnvironStatus("parentEnvironment")){
                //Create Timer
                if (!timeoutTimer && startTimer){
                    startTimer();
                }
            }
            if (environStatuses.length === environTotals) {
                showCreative();
            }
        }

        function checkEnvironStatus(src) {
            for (var i=0; i<environStatuses.length; i++){
                if (environStatuses[i].src === src) {
                    return environStatuses[i].val;
                }
            }
            return false;
        }

        function showCreative() {
            if (timeoutTimer) {
                clearTimeout(timeoutTimer);
            }
            checkForCallback("creative_shown");
            if (Analytics){
                Analytics.fire({
                    event: AnalyticsContent.CREATIVE_SHOWN,
                    instance: reveal
                });
            }

            // animate the correct orientation
            if (animate) {
                animate();
            }
        }

        var reveal = {
            init: init,
            registerCallback:registerCallback,
            environmentReady:environReady,
            enviromentReady:environReady
        };
        return reveal;
    }
    creatives.push(Creative);
    return Creative;
}());