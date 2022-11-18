(function() {
    "use strict";
    var win = window;
    var creatives = (win._$OGO$_ || (win._$OGO$_ = {})) &&  (win._$OGO$_.Rosetta || (win._$OGO$_.Rosetta = {})) && (win._$OGO$_.Rosetta.creatives || (win._$OGO$_.Rosetta.creatives = []));
    var Rosetta = win._$OGO$_.Rosetta;
    var require =  Rosetta.requirejs || require;

    function Creative(dmo){
        /* [START_CUSTOM_VARIABLES] */
        var createPosterFrame, createProductFrame, createVideoFrame, createNarrativeFrame;

        /* ------------------------------- */
        /* --- START CUSTOMIZABLE VARS --- */
        /* ------------------------------- */

        //CUSTOM

        //poster Frame
              var clickTracker = window.conversant.mobile.clickTag;
              var landingPage1 = "https://ad.doubleclick.net/ddm/trackclk/N46002.2209901CONVERSANT1/B22078106.242653703;dc_trk_aid=439472795;dc_trk_cid=113108104;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=";
              var redirectUrl1 = (clickTracker) ? clickTracker + encodeURIComponent(landingPage1) : landingPage1;
              //cat img 1
              var clickTracker = window.conversant.mobile.clickTag;
              var landingPage2 = "https://ad.doubleclick.net/ddm/clk/440196865;242653703;k";
              var redirectUrl2 = (clickTracker) ? clickTracker + encodeURIComponent(landingPage2) : landingPage2;
              //cat img 2
              var clickTracker = window.conversant.mobile.clickTag;
              var landingPage3 = "https://ad.doubleclick.net/ddm/clk/440195927;242653703;i";
              var redirectUrl3 = (clickTracker) ? clickTracker + encodeURIComponent(landingPage3) : landingPage3;
              //cat img 3
              var clickTracker = window.conversant.mobile.clickTag;
              var landingPage4 = "https://ad.doubleclick.net/ddm/clk/440106549;242653703;a";
              var redirectUrl4 = (clickTracker) ? clickTracker + encodeURIComponent(landingPage4) : landingPage4;
              //cat img 4
              var clickTracker = window.conversant.mobile.clickTag;
              var landingPage5 = "https://ad.doubleclick.net/ddm/clk/440109849;242653703;g";
              var redirectUrl5 = (clickTracker) ? clickTracker + encodeURIComponent(landingPage5) : landingPage5;

              //cat img 5
              var clickTracker = window.conversant.mobile.clickTag;
              var landingPage6 = "https://ad.doubleclick.net/ddm/clk/440109063;242653703;u";
              var redirectUrl6 = (clickTracker) ? clickTracker + encodeURIComponent(landingPage5) : landingPage6;
        //

        //text content of the legal text/disclaimer link
        var legalTextLinkText = {
            font: 11032,
            color: "#ffffff",
            size: 14
        };

        //text content of the legal text/disclaimer overlay
        var legalText = ""
        var frames = [];

        // VARS USED ON ALL FRAMES
        var allFrames = {
            arrow_up_img: "arrow.png",
            arrow_down_img: "arrow.png",
            loading_frame_img: "arrow.png",
            arrow_restart: "arrow.png",
            arrow_back: "arrow_back.png",
            btns: {
                font:12618,
                size:15
            }
        }

        function createFrames() {

            // CREATE THE FRAMES
            // Options: createPosterFrame(), createProductFrame(), createVideoFrame(), createNarrativeFrame()
            // Notes:
            //   • The order of your frames here is the order they will be in the unit
            //   • You can create as many of the same frame as you need, just duplicate the entire chunk
            //   • Remove any frames you're not using

            // CREATE A POSTER FRAME
            createPosterFrame(
                {
                    poster_img_urls:[
                        "F1.jpg",
                     
                    ],
                    btn_text:"",
                    btn_top: {
                        color:"#FFFFFF",
                        bg_color:"linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,0.6))",
                        arrow_tint:"#FFFFFF",
                        analytics_name:"btnTop-posterFrame"
                    },
                    btn_bottom: {
                        color:"#FFFFFF",
                        bg_color:"linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.6))",
                        arrow_tint:"#FFFFFF",
                        analytics_name:"btnBottom-posterFrame"
                    },
                    url:redirectUrl1,
                    analytics_name:"posterFrame"
                }
            );



            // VARS FOR THE NARRATIVE FRAME
            createNarrativeFrame(
                {
                    cat_imgs: [
                        {
                            src:"F2_Home_Heating.jpg",
                            url:redirectUrl2,
                            analytics_name:"slide1-narrativeFrame"
                        },
                        {
                            src:"F3_Water_Heating.jpg",
                            url:redirectUrl3,
                            analytics_name:"slide2-narrativeFrame"
                        },
                        {
                            src:"F4_Cooking_2.jpg",
                            url:redirectUrl4,
                            analytics_name:"slide3-narrativeFrame"
                        },
                        {
                            src:"F5_Backup_Power.jpg",
                            url:redirectUrl5,
                            analytics_name:"slide3-narrativeFrame"
                        },
                        {
                            src:"F6_Grilling.jpg",
                            url:redirectUrl6,
                            analytics_name:"slide3-narrativeFrame"
                        }
                    ],
                    rotator: {
                        analytics_name:"rotator-narrativeFrame"
                    },
                    nav:{
                        active:{
                            bg_color:"rgb(255, 255, 255)"
                        },
                        inactive:{
                            bg_color:"#7d7979"
                        },
                        bg_color:"#000000 .5"
                    },
                    btn_text:"BACK TO TOP",
                    btn_top: {
                        color:"#FFFFFF",
                        bg_color:"linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,0.75))",
                        arrow_tint:"#FFFFFF",
                        analytics_name:"btnTop-narrativeFrame"
                    },
                    btn_bottom: {
                        color:"#FFFFFF",
                        bg_color:"linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.6))",
                        arrow_tint:"#FFFFFF",
                        analytics_name:"btnBottom-narrativeFrame"
                    },
                    analytics_name:"narrativeFrame"
                }
            );



        // VARS FOR THE VIDEO FRAME
        createVideoFrame(
            {
                bg: {
                    src:"F7_EndFrame.jpg"
                },
                logo: {
                    src:""
                },
                headline: {
                    text:"",
                    color:"",
                    font:11059,
                    size:18
                },
                video: {
                    mp4:"",
                    poster:""
                },
                youtube: {
                    src:"",
                    analytics_name:""
                },
                btn_text:"BACK TO TOP",
                btn_top: {
                    color:"",
                    bg_color:"",
                    arrow_tint:"",
                    analytics_name:""
                    // color:"",
                    // bg_color:"linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,0.6))",
                    // arrow_tint:"#FFFFFF",
                    // analytics_name:"btnTop-videoFrame"
                },
                btn_bottom: {
                    color:"",
                    bg_color:"",
                    arrow_tint:"",
                    analytics_name:""
                    // color:"",
                    // bg_color:"linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.6))",
                    // arrow_tint:"#FFFFFF",
                    // analytics_name:"btnBottom-videoFrame"
                },
                url:"https://ad.doubleclick.net/ddm/clk/440199638;242653703;l",
                analytics_name:"videoFrame"
            }
        );


        }

        /* ------------------------------- */
        /* --- END CUSTOMIZABLE VARS --- */
        /* ------------------------------- */

        
        /* [END_CUSTOM_VARIABLES] */

        var registeredCallbacks = [], environStatuses = [],environTotals = 2, isEnvironReady = false, isCreativeReady = false;
        var R, Platform, Settings, Analytics, AnalyticsContent, TweenMax, TweenLite, TimelineLite, TimelineMax, EventForwarding, Hammer;

        var ROSETTA_VERSION = "4.30";
        var context = String(ROSETTA_VERSION + "_"  + dmo.embedId).split("_").join(".");
        var parentDiv, stage, animate, timeoutTimer, startTimer, FOF_PIXEL_DENSITY;
        var evergreenImg = "evergreen.jpg";
        var CENTER_STAGE = true

        function init(wrapperID) {
            var subdirectory = "149179OPS_Custom_Filmstrip";
            var creativeName = "" || subdirectory;
            var companyID = "61677";
            var isSecure = (dmo.externalURL.indexOf("https:") > -1);



            var config = {
                context: context,
                waitSeconds: 5,
                paths: {},
                bundles: {
                    "Rosetta":["core.pack","tweenmax.pack","hammer.pack","filters.pack","ad.pack","fontface.pack","alignmentgroup.pack","rotatorslide.pack","rotatorfade.pack","rotatormultiview.pack","ndots.pack","video.pack","cnvr.usweb.pack","cnvr.bolt.pack"]
                }
            };

            config.bundles.Rosetta = (function(bundles){
                if (typeof Object.create != 'function'){
                    var compatible = ["static.pack"];
                    for (var i=0; i<bundles.length; i++){
                        if (bundles[i].indexOf("cnvr.") > -1){
                            compatible.push(bundles[i]);
                        }
                    }
                    if (typeof dmo.rosettaBundles == "function"){compatible = dmo.rosettaBundles(compatible)}
                    return compatible;
                }
                return bundles;
            })(config.bundles.Rosetta);


            dmo.atomSuffix = dmo.atomSuffix || "";
            config.paths["Rosetta"] = dmo.externalURL + "/atom/"+ROSETTA_VERSION+"/2.1.0/?scripts=" + "wrapper_start," + config.bundles.Rosetta.join(",") + ",wrapper_end" + dmo.atomSuffix;

            var req = require.config(config);
            req( ['require'].concat(config.bundles.Rosetta), function() {
                var Core = req("core/Core");
                Platform = req("platform/Platform");
                Settings = req("display/settings/GlobalSettings");
                Analytics = req("core/analytics/Analytics");
                AnalyticsContent = req("core/analytics/AnalyticsContent");
                EventForwarding = req("core/eventforwarding/EventForwarding");
                R = new Core();
                if (typeof dmo.rosettaLoaded == "function"){dmo.rosettaLoaded(req, R)}
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

                if (R.isCompatible == true) {
                    R.parseParameters(dmo.flashVars, 'flashvars');
                    Platform.overwrite({
                        clientID: R.create("var").set({name:"company_id", dataType:"String", defaultValue:Platform.fetch().clientID}).render().value(),
                        cacheBuster: R.create("var").set({name:"bypass_cache", dataType:"Boolean", defaultValue:false, exposed:false}).render().value(),
                        subdirectory:R.create("var").set({name:"subdirectory", dataType:"String", defaultValue:subdirectory}).render().value(),
                        FOFVersion: R.create("var").set({name:"fof_version", dataType:"String", defaultValue:"4.0.2", exposed:false}).render().value(),
                        isSecure: R.create("var").set({name:"dtm_secure", dataType:"Boolean", defaultValue:Platform.fetch().isSecure, exposed:false}).render().value(),
                        analytics: null,
                        analyticsScope: null
                    });
                    if (R.create("var").set({name:"disable_retina", dataType:"Boolean", defaultValue:false, exposed:false}).render().value() == false
                        && (R.environment.isRetina == true || R.create("var").set({name:"force_retina", dataType:"Boolean", defaultValue:false, exposed:false}).render().value())) {
                        Settings.overwrite({pixelDensity: 2})
                    };
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
                        timeoutTimer = setTimeout(R.fallback, timeout*1000);
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
                    R.fallback();
                }
            }, function(e){
                log(e);
            });

            return reveal;
        }

        function createElements(){
            animate = animateElements;
            var width = R.create("var").set({name:"width", dataType:"Number", defaultValue:Platform.fetch().placementWidth, exposed:false}).render().value();
            var height = R.create("var").set({name:"height", dataType:"Number", defaultValue:Platform.fetch().placementHeight, exposed:false}).render().value();
            var borderColor = R.create("var").set({name: "border_color", dataType: "String", defaultValue: "#CCCCCC"}).render().value();

            stage = R.create("div").set({id:"stage", width: width, height: height, backgroundColor:"#FFFFFF"});
            parentDiv.appendChild(stage.element);
            Settings.overwrite({stage: stage});
            new EventForwarding().init({stage:stage});
            var borders = {
                l:R.create("div").set({width:"1px", height:height, backgroundColor:borderColor, left:0, top:0, zIndex:501,  pointerEvents:"none", parentNode:stage}).render(),
                r:R.create("div").set({width:"1px", height:height, backgroundColor:borderColor, right:0, top:0, zIndex:501, pointerEvents:"none",parentNode:stage}).render(),
                t:R.create("div").set({width:width, height:"1px", backgroundColor:borderColor, left:0, top:0, zIndex:501, pointerEvents:"none", parentNode:stage}).render(),
                b:R.create("div").set({width:width, height:"1px", backgroundColor:borderColor, left:0, bottom:0, zIndex:501, pointerEvents:"none", parentNode:stage}).render()
            };

            R.applyCSSReset("stage");

            /* [START_CREATE_ELEMENTS] */

            //CUSTOM
          var stageBlock = R.create("div").set({
            css:{
              backgroundColor:"#FFFFFF",
              left: 0,
              top: 0,
              width: 320,
              height: 480,
              pointerEvents: "none",
              cursor: "auto",
              position: "absolute",
              visibility: "visible",
              zIndex:5000
            },
            rosetta:{
              parentNode:stage,
            },
            attr:{
              id: "stageBlock"
            }
          }).render();
//

            var interactionType = ('ontouchend' in document) ? 'touchend' : 'click';
            
            var currentFrame, previousFrame,
                loadedFrames = [],
                i, tmp;

            var frameContainer = R.create("div").set({
                attr: {
                    id:"frame-container"
                },
                css: {
                    top:0,
                    left:0,
                    width:320,
                    height:480
                },
                rosetta: {
                    parent:stage
                }
            }).render();

            if (legalText && legalText !== null && legalText !== ""){
                var legal_text_bg = R.create("div").set({
                    css:{
                        width:320,
                        height:480,
                        backgroundColor:"rgba(0,0,0,0.7)",
                    },
                    attr:{
                        id:"legal-text-bg"
                    },
                    rosetta:{
                        parent:stage
                    }
                }).render({
                    complete: function(){
                        TweenMax.set(legal_text_bg.element, {opacity:0, zIndex:1});
                    }
                });

                var legal_closeX = R.create("div").set({
                    css: {
                        fontSize: 12,
                        fontFamily: "Arial, Verdana, Helvetica, Sans",
                        textType: "fontFaceText",
                        lineHeight: 1,
                        letterSpacing: 0,
                        left: 10,
                        top: 10,
                        width: 13,
                        height: 13,
                        zIndex: 1196,
                        pointerEvents: "auto",
                        cursor: "pointer",
                        position: "absolute",
                        borderRadius: "5px",
                        backgroundColor: "#FFFFFF",
                        color: "#000000",
                        textAlign: "center"
                    },
                    rosetta: {
                        parentNode: legal_text_bg
                    },
                    attr: {
                        id: "legal_closeX",
                        textContent: "x"
                    }
                }).render().on("click", displayLegal);

                var legal_close = R.create("div").set({
                    css:{
                        color: "#FFFFFF",
                        fontSize:12,
                        fontFamily:"Arial, Verdana, Helvetica, Sans",
                        textType:"fontFaceText",
                        lineHeight:1,
                        letterSpacing:0,
                        textAlign:"left",
                        left:26,
                        top: 10,
                        width: 280,
                        height:14,
                        zIndex:1196,
                        pointerEvents:"auto",
                        cursor:"pointer",
                        position:"absolute"
                    },
                    rosetta:{
                        parentNode: legal_text_bg
                    },
                    attr:{
                        id: "legal_close",
                        textContent:"close"
                    }
                }).render().on("click", displayLegal);

                var legal_text_container = R.create("div").set({
                    css:{
                        top: 30,
                        left: 10,
                        overflowY:"auto",
                        width:"95%",
                        height:430,
                        zIndex:105
                    },
                    attr:{
                        id:"legal-text-container"
                    },
                    rosetta:{
                        parent: legal_text_bg
                    }
                }).render();

                R.create("@fontface").set({provider:"cnvr"}).add("OpenSans").render({
                    complete:function() {
                        var legal_text = R.create("div").set({
                            css:{
                                width:"100%",
                                padding: 12,
                                color: "#ffffff",
                                fontFamily: "OpenSans, sans-serif",
                                fontSize: 11,
                                lineHeight: 1.19,
                                letterSpacing: 0,
                            },
                            rosetta:{
                                parent: legal_text_container,
                                textType:"fontFaceText",
                                resizeElement:false,
                                repositionElement:false,
                                forceLineHeight: true
                            },
                            attr:{
                                id:"legal-text",
                                textContent: legalText
                            }
                        }).render();
                    }
                });
            }

            function createTopBtn(frameObj, text, bgColor, arrowColor, analyticsName) {
                frameObj.topBtn = R.create("div").set({
                    attr: {
                        id:"topBtn_" + frameObj.container.id
                    },
                    css: {
                        top:0,
                        left:0,
                        width:320,
                        height:35,
                        zIndex:101,
                        backgroundColor:bgColor,
                        cursor:"pointer",
                        pointerEvents:"auto"
                    },
                    rosetta: {
                        analyticsName: analyticsName
                    }
                });
                frameObj.topBtnText = R.create("div").set({
                    attr: {
                        id:"topBtnText_" + frameObj.container.id
                    },
                    css: {
                        width:320,
                        height:35,
                        textContent:text,
                        color:"#FFFFFF",
                        fontFamily:12618,
                        fontSize:allFrames.btns.size,
                        textAlign:"center",
                        verticalAlign:"middle"
                    },
                    rosetta: {
                        parent:frameObj.topBtn
                    }
                }).complete(function() {
                    frameObj.topBtnArrow1 = R.create("div").set({
                        attr: {
                            id:"topBtnArrow1_" + frameObj.container.id
                        },
                        css: {
                            width:15,
                            height:7,
                            // backgroundImage:allFrames.arrow_up_img,
                            backgroundSize:"contain",
                            top:400,
                            opacity:0.3,
                            tint:arrowColor
                        },
                        rosetta: {
                            parent:stage
                        }
                    }).render();
                    frameObj.topBtnArrow2 = R.create("div").set({
                        attr: {
                            id:"topBtnArrow1_" + frameObj.container.id
                        },
                        css: {
                            width:15,
                            height:7,
                            // backgroundImage:allFrames.arrow_up_img,
                            backgroundSize:"contain",
                            top:13,
                            opacity:0.3,
                            tint:arrowColor
                        },
                        rosetta: {
                            parent:frameObj.topBtn
                        }
                    }).render();
                    frameObj.topBtnArrow3 = R.create("div").set({
                        attr: {
                            id:"topBtnArrow3_" + frameObj.container.id
                        },
                        css: {
                            width:15,
                            height:7,
                            backgroundImage:allFrames.arrow_up_img,
                            backgroundSize:"contain",
                            top:17,
                            opacity:0.3,
                            tint:arrowColor
                        },
                        rosetta: {
                            parent:frameObj.topBtn
                        }
                    }).render();

                    var arrowBatch = R.create("batch")
                        .add(frameObj.topBtnArrow1)
                        .add(frameObj.topBtnArrow2)
                        .add(frameObj.topBtnArrow3)
                        .render({
                            complete:function() {
                                var arrowWidth = parseFloat(frameObj.topBtnArrow1.width);
                                if (parseFloat(frameObj.topBtnArrow2.width) > arrowWidth) {
                                    arrowWidth = parseFloat(frameObj.topBtnArrow2.width);
                                }
                                if (parseFloat(frameObj.topBtnArrow3.width) > arrowWidth) {
                                    arrowWidth = parseFloat(frameObj.topBtnArrow3.width);
                                }

                                var totalWidth = parseFloat(frameObj.topBtnText.width) + 15 + arrowWidth;
                                
                                frameObj.topBtnText.left = ((parseFloat(frameObj.topBtn.width) - totalWidth) / 2) + (arrowWidth/2);// + 15;
                                frameObj.topBtnArrow1.left = parseFloat(frameObj.topBtnText.left) + parseFloat(frameObj.topBtnText.width) + 15;
                                frameObj.topBtnArrow2.left = parseFloat(frameObj.topBtnText.left) + parseFloat(frameObj.topBtnText.width) + 15;
                                frameObj.topBtnArrow3.left = parseFloat(frameObj.topBtnText.left) + parseFloat(frameObj.topBtnText.width) + 15;
                            }
                        });
                });

                frameObj.topBtn.data.animate = function() {

                    // animate arrows
                    var a1 = frameObj.topBtnArrow1.element,
                        a2 = frameObj.topBtnArrow2.element,
                        a3 = frameObj.topBtnArrow3.element;

                    var tweenSpeed = 0.08;

                    var tl1 = new TimelineMax();
                    tl1.to(a1, tweenSpeed, {opacity:0.3}, 0);
                    tl1.to(a2, tweenSpeed, {opacity:0.3}, 0);
                    tl1.to(a3, tweenSpeed, {opacity:1}, 0);

                    var tl2 = new TimelineMax();
                    tl2.to(a1, tweenSpeed, {opacity:0.3}, 0);
                    tl2.to(a2, tweenSpeed, {opacity:1}, 0);
                    tl2.to(a3, tweenSpeed, {opacity:0.6}, 0);

                    var tl3 = new TimelineMax();
                    tl3.to(a1, tweenSpeed, {opacity:1}, 0);
                    tl3.to(a2, tweenSpeed, {opacity:0.6}, 0);
                    tl3.to(a3, tweenSpeed, {opacity:0.3}, 0);

                    var tl4 = new TimelineMax();
                    tl4.to(a1, tweenSpeed, {opacity:0.6}, 0);
                    tl4.to(a2, tweenSpeed, {opacity:0.3}, 0);
                    tl4.to(a3, tweenSpeed, {opacity:0.3}, 0);

                    var tl5 = new TimelineMax();
                    tl5.to(a1, tweenSpeed, {opacity:0.3}, 0);
                    tl5.to(a2, tweenSpeed, {opacity:0.3}, 0);
                    tl5.to(a3, tweenSpeed, {opacity:0.3}, 0);

                    var timeline1 = new TimelineMax({repeat:1, repeatDelay:tweenSpeed, onComplete:finishAnim});
                    timeline1.add([tl1, tl2, tl3, tl4, tl5], 0, "sequence", tweenSpeed);

                    function finishAnim() {
                        
                        var timeline2 = new TimelineMax({delay:tweenSpeed});
                        timeline2.add([tl1, tl2, tl3], 0, "sequence", tweenSpeed);

                    }
                };

                return frameObj.topBtn;
            }

            function createBottomBtn(frameObj, text, bgColor, arrowColor, analyticsName) {

                console.log(frameObj);
                frameObj.bottomBtn = R.create("div").set({
                    attr: {
                        id:"bottomBtn_" + frameObj.container.id
                    },
                    css: {
                        top:415,
                        left:0,
                        width:320,
                        height:70,
                        zIndex:100,
                        backgroundColor:bgColor,
                        cursor:"pointer",
                        pointerEvents:"auto",
                        visibility:"hidden"
                    },
                    rosetta: {
                        analyticsName: analyticsName
                    }
                });
                frameObj.bottomBtnText = R.create("div").set({
                    attr: {
                        id:"bottomBtnText_" + frameObj.container.id
                    },
                    css: {
                        width:320,
                        height:35,
                        textContent:text,
                        color:"#FFFFFF",
                        fontFamily:allFrames.btns.font,
                        fontSize:allFrames.btns.size,
                        textAlign:"center",
                        verticalAlign:"middle",
                        opacity:0.4
                    },
                    rosetta: {
                        parent:frameObj.bottomBtn
                    }                    
                }).complete(function() {
                    frameObj.bottomBtnArrow1 = R.create("div").set({
                        attr: {
                            id:"bottomBtnArrow1_" + frameObj.container.id
                        },
                        css: {
                            left:200,
                            width:24,
                            height:14,
                            backgroundImage:allFrames.arrow_down_img,
                            backgroundSize:"contain",
                            top:30,
                            opacity:1,
                            tint:arrowColor,
                            visibility:"hidden"
                        },
                        rosetta: {
                            parent:frameObj.bottomBtn
                        }                        
                    }).render();
                    frameObj.bottomBtnArrow2 = R.create("div").set({
                        attr: {
                            id:"bottomBtnArrow2_" + frameObj.container.id
                        },
                        css: {
                            width:15,
                            height:7,
                            // backgroundImage:allFrames.arrow_down_img,
                            backgroundSize:"contain",
                            top:14,
                            opacity:0.3,
                            tint:arrowColor,
                            visibility:"hidden"
                        },
                        rosetta: {
                            parent:frameObj.bottomBtn
                        }
                    }).render();
                    frameObj.bottomBtnArrow3 = R.create("div").set({
                        attr: {
                            id:"bottomBtnArrow3_" + frameObj.container.id
                        },
                        css: {
                            width:15,
                            height:7,
                            // backgroundImage:allFrames.arrow_down_img,
                            backgroundSize:"contain",
                            top:18,
                            opacity:0.3,
                            tint:arrowColor,
                            visibility:"hidden"
                        },
                        rosetta: {
                            parent:frameObj.bottomBtn
                        }                        
                    }).render();
                    frameObj.bottomBtnLoading = R.create("div").set({
                        attr: {
                            id:"bottomBtnLoading_" + frameObj.container.id
                        },
                        css: {
                            width:15,
                            height:15,
                            backgroundImage:allFrames.loading_frame_img,
                            backgroundSize:"contain",
                            top:10
                        },
                        rosetta: {
                            parent:frameObj.bottomBtn
                        }                        
                    }).render();

                    frameObj.bottomBtnBatch = R.create("batch")
                        .add(frameObj.bottomBtnText)
                        .add(frameObj.bottomBtnArrow1)
                        .add(frameObj.bottomBtnArrow2)
                        .add(frameObj.bottomBtnArrow3)
                        .add(frameObj.bottomBtnLoading)
                        .render({
                            complete: function() {
                                frameObj.bottomBtnAlign();
                                frameObj.bottomBtn.visibility = "visible";
                            }
                        });

                    frameObj.bottomBtnAlign = function() {
                        var arrowWidth = parseFloat(frameObj.bottomBtnArrow1.width);
                        if (parseFloat(frameObj.bottomBtnArrow2.width) > arrowWidth) {
                            arrowWidth = parseFloat(frameObj.bottomBtnArrow2.width);
                        }
                        if (parseFloat(frameObj.bottomBtnArrow3.width) > arrowWidth) {
                            arrowWidth = parseFloat(frameObj.bottomBtnArrow3.width);
                        }
                        
                        var totalWidth = arrowWidth + 15 + parseFloat(frameObj.bottomBtnText.width);
 
//left of bottom frame 1                        
                        frameObj.bottomBtnText.left = 138;
                        frameObj.bottomBtnArrow1.left = 149;
                        frameObj.bottomBtnArrow2.left = 149;
                        frameObj.bottomBtnArrow3.left = 149;
                        frameObj.bottomBtnLoading.left = 149;
                    }
                });

                frameObj.bottomBtn.data.animate = function() {

                    // show arrows and hide load gif
                    frameObj.bottomBtnLoading.visibility = "hidden";
                    frameObj.bottomBtnArrow1.visibility = frameObj.bottomBtnArrow2.visibility = frameObj.bottomBtnArrow3.visibility = "visible";
                    TweenMax.to(frameObj.bottomBtnText.element, 0.2, {opacity:1});

                    // animate arrows
                    var a1 = frameObj.bottomBtnArrow1.element,
                        a2 = frameObj.bottomBtnArrow2.element,
                        a3 = frameObj.bottomBtnArrow3.element;

                    var tweenSpeed = 0.08;

                    var tl1 = new TimelineMax();
                    // tl1.to(a1, tweenSpeed, {opacity:1}, 0);
                    // tl1.to(a2, tweenSpeed, {opacity:0.3}, 0);
                    // tl1.to(a3, tweenSpeed, {opacity:0.3}, 0);

                    var tl2 = new TimelineMax();
                    // tl2.to(a1, tweenSpeed, {opacity:0.6}, 0);
                    // tl2.to(a2, tweenSpeed, {opacity:1}, 0);
                    // tl2.to(a3, tweenSpeed, {opacity:0.3}, 0);

                    var tl3 = new TimelineMax();
                    // tl3.to(a1, tweenSpeed, {opacity:0.3}, 0);
                    // tl3.to(a2, tweenSpeed, {opacity:0.6}, 0);
                    // tl3.to(a3, tweenSpeed, {opacity:1}, 0);

                    var tl4 = new TimelineMax();
                    // tl4.to(a1, tweenSpeed, {opacity:0.3}, 0);
                    // tl4.to(a2, tweenSpeed, {opacity:0.3}, 0);
                    // tl4.to(a3, tweenSpeed, {opacity:0.6}, 0);

                    var tl5 = new TimelineMax();
                    // tl5.to(a1, tweenSpeed, {opacity:0.3}, 0);
                    // tl5.to(a2, tweenSpeed, {opacity:0.3}, 0);
                    // tl5.to(a3, tweenSpeed, {opacity:0.3}, 0);

                    var timeline1 = new TimelineMax({repeat:1, repeatDelay:tweenSpeed, onComplete:finishAnim});
                    timeline1.add([tl1, tl2, tl3, tl4, tl5], 0, "sequence", tweenSpeed);

                    function finishAnim() {
                        
                        var timeline2 = new TimelineMax({delay:tweenSpeed});
                        timeline2.add([tl1, tl2, tl3], 0, "sequence", tweenSpeed);

                    }
                };

                return frameObj.bottomBtn;
            }

            function createTerminalButton(frameObj, bgColor, arrowColor, analyticsName) {
                frameObj.bottomBtn = R.create("div").set({
                    attr: {
                        id:"bottomBtn_" + frameObj.container.id
                    },
                    css: {
                        top:405,
                        left:0,
                        width:320,
                        height:35,
                        zIndex:100,
                        cursor:"pointer",
                        pointerEvents:"auto",
                        backgroundColor: bgColor,
                        overflow:"visible"
                    },
                    rosetta: {
                        parent:frameObj.container,
                        analyticsName:analyticsName
                    }
                })
                frameObj.bottomBtn.element.addEventListener(interactionType, function(e) {
                    e.stopPropagation();
                    gotoFrame(0, frameObj.bottomBtn);
                });
                frameObj.bottomBtnText = R.create("div").set({
                    attr: {
                        id:"bottomBtn_" + frameObj.container.id
                    },
                    css: {
                        width:320,
//effecting bottom button
                        height:55,
                        textContent:"LAST FRAME UP REPLACE",
                        color:"#FFFFFF",
                        fontFamily:allFrames.btns.font,
                        fontSize:allFrames.btns.size,
                        textAlign:"center",
                        verticalAlign:"middle"
                    },
                    rosetta: {
                        parent:frameObj.bottomBtn,
                        data: {
                            excludeFromRender:true
                        }
                    }
                }).complete(function() {
                    frameObj.bottomBtnArrow = R.create("div").set({
                        attr: {
                            id:"bottomBtnArrow_" + frameObj.container.id
                        },
                        css: {
 //effecting btm arrow                           
                            width:24,
                            height:14,
                            backgroundImage:allFrames.arrow_back,
                            backgroundSize:"contain",
 //narrative frame arrow top
                            top:42,
                            left:parseFloat(frameObj.bottomBtnText.left) - 30,
                            tint:arrowColor
                        },
                        rosetta: {
                            parent:frameObj.bottomBtn
                        }
                    }).render();
                });

                frameObj.bottomBtnBatch = R.create("batch")
                    .add(frameObj.bottomBtnText)
                    .add(frameObj.bottomBtnArrow)
                    .render({
                        complete: frameObj.bottomBtnAlign
                    });

                frameObj.bottomBtnAlign = function() {
                    var arrowWidth = parseFloat(frameObj.bottomBtnArrow.width);
                            
                    var totalWidth = arrowWidth + 15 + parseFloat(frameObj.bottomBtnText.width);
                    
                    frameObj.bottomBtnText.left = 139;
                    // frameObj.bottomBtnArrow.left = ((parseFloat(frameObj.bottomBtn.width) - totalWidth) / 2);
//move arrow left 
                    frameObj.bottomBtnArrow.left = 153;

                    // TweenMax.set(frameObj.bottomBtnArrow.left.element, {rotatoe:90});
                    // frameObj.bottomBtnArrow.top = 162;
                }

                return frameObj.bottomBtn;
            }

            /* DISPLAYS LEGAL TEXT OVERLAY */
            function displayLegal(frame){
                if(legal_text_bg){
                    if (legal_text_bg.zIndex == 1001){
                        TweenMax.to(legal_text_bg.element, 0.2, {opacity:0, zIndex:1});
                    } else {
                        if (legal_text_container !== undefined){
                            legal_text_container.element.scrollTop = 0;
                        }
                        TweenMax.to(legal_text_bg.element, 0.2, {opacity:1, zIndex:1001});
                    }
                }
                if(frame.rotator){
                    frame.rotator.cancelAutoPlay();
                }
                if(frame.video && frame.video.player){
                    frame.video.player.pause();
                }
            }

            /* CREATES A POSTER FRAME */
            createPosterFrame = function(vars) {
                var posterFrame = {
                    name:"posterFrame",
                    vars:vars
                };

                // container holds everything for poster frame
                posterFrame.container = R.create("div").set({
                    attr: {
                        id:"posterFrame-container"
                    },
                    css: {
                        top:0,
                        left:0,
                        width:320,
                        height:480,
                        pointerEvents:"none"
                    },
                    rosetta: {
                        analyticsName:vars.analytics_name
                    }
                });

                // legal text link that triggers overlay on click
                posterFrame.legalTextLink = R.create("div").set({
                    rosetta: {
                        parent: posterFrame.container
                    },
                    css: {
                        top: 420,
                        left: 270,
                        color: legalTextLinkText.color,
                        fontFamily: legalTextLinkText.font,
                        fontSize: legalTextLinkText.size,
                        width:32,
                        height: 18,
                        zIndex: 21,
                        cursor:"pointer",
                        pointerEvents: "auto"
                    },
                    attr:{
                        id: "poster-legal-text-link",
                        textContent: legalTextLinkText.text
                    }
                }).on("click", function(){
                    displayLegal(posterFrame);
                });

                // hit area covers entire frame
                posterFrame.hitArea = R.create("div").set({
                    attr: {
                        id:"posterFrame-hitArea"
                    },
                    css: {
                        width:320,
                        height:480,
                        zIndex:20,
                        cursor:"pointer",
                        pointerEvents:"auto"
                    },
                    rosetta: {
                        parent:posterFrame.container,
                        analyticsName:vars.analytics_name,
                        data:{
                            url:vars.url
                        }
                    }                
                }).on("click", adHit);

                // create cat images that get used in rotator
                posterFrame.cat_imgs = [];
                for (i = 0; i < vars.poster_img_urls.length; i++) {
                    tmp = R.create("div").set({
                        attr: {
                            id:"posterFrame-cat_img" + (i+1)
                        },
                        css: {
                            width:320,
                            height:480,
                            backgroundImage:vars.poster_img_urls[i],
                            backgroundSize:"cover",
                            pointerEvents:"none"
                        },
                        rosetta: {
                            parent:posterFrame.container
                        }
                    });
                    posterFrame.cat_imgs.push(tmp);
                }

                // create rotator
                posterFrame.cat_img_batch = R.create("batch")
                    .require(posterFrame.cat_imgs, 1)
                    .complete(function() {

                        posterFrame.rotator = R.create("rotatorfade").set({
                            elements:R.filter.success(posterFrame.cat_imgs),
                            transitionDuration:0,
                            autoPlay:false,
                            onDuration:2,
                            endOnFirst:false
                        }).render();

                    });
                posterFrame.cat_img_batch.data = {
                    required: true
                };

                posterFrame.animate = function() {
                    if (!posterFrame.autoplayed) {
                        posterFrame.autoplayed = true;
                        posterFrame.rotator.startAutoPlay();
                    }
                };

                posterFrame.reset = function() {
                    // productFrame.rotator.reset();
                    // posterFrame.rotator.cancelAutoPlay();
                };

                // create top nav btn
                posterFrame.createBtns = function() {
                    if (frames.indexOf(posterFrame) != 0) {
                        createTopBtn(posterFrame, frames[frames.indexOf(posterFrame)-1].vars.btn_text, vars.btn_top.bg_color, vars.btn_top.arrow_tint, vars.btn_top.analytics_name).set({
                            css: {
                                zIndex:21
                            },
                            rosetta: {
                                parent:posterFrame.container
                            }                    
                        });
                        posterFrame.topBtnText.color = vars.btn_top.color;
                    }

                    // create bottom nav button
                    if (frames.indexOf(posterFrame) == frames.length - 1) {
                        createTerminalButton(posterFrame, vars.btn_bottom.bg_color, vars.btn_bottom.arrow_tint, vars.btn_bottom.analytics_name);
                    } else {
                        console.log("creating bottom")
                        createBottomBtn(posterFrame, frames[frames.indexOf(posterFrame)+1].vars.btn_text, vars.btn_bottom.bg_color, vars.btn_bottom.arrow_tint, vars.btn_bottom.analytics_name);
                    }
                    posterFrame.bottomBtn.parent = posterFrame.container;
                    posterFrame.bottomBtnText.color = vars.btn_bottom.color;
                }

                frames.push(posterFrame);
            }
            /* END POSTER FRAME */

            /* START PRODUCT FRAME */
            createProductFrame = function(vars) {

                var productFrame = {
                    name:"productFrame",
                    vars:vars
                };

                // container holds everything for product frame
                productFrame.container = R.create("div").set({
                    attr: {
                        id:"productFrame-container"
                    },
                    css: {
                        top:0,
                        width:320,
                        height:480,
                        pointerEvents:"none"
                    },
                    rosetta: {
                        analyticsName:vars.analytics_name
                    }
                });

                // legal text link that triggers overlay on click
                productFrame.legalTextLink = R.create("div").set({
                    rosetta: {
                        parent: productFrame.container
                    },
                    css: {
                        top: 420,
                        left: 270,
                        color: legalTextLinkText.color,
                        fontFamily: legalTextLinkText.font,
                        fontSize: legalTextLinkText.size,
                        width:32,
                        height: 18,
                        zIndex: 21,
                        cursor:"pointer",
                        pointerEvents: "auto"
                    },
                    attr:{
                        id: "product-legal-text-link",
                        textContent: legalTextLinkText.text
                    }
                }).on("click", function(){
                    displayLegal(productFrame)
                });

                // hit area covers entire frame
                productFrame.hitArea = R.create("div").set({
                    attr: {
                        id:"productFrame-hitArea"
                    },
                    css: {
                        width:320,
                        height:480,
                        zIndex:20,
                        cursor:"pointer",
                        pointerEvents:"auto"
                    },
                    rosetta: {
                        parent:productFrame.container,
                        analyticsName:vars.analytics_name,
                        data:{
                            url:vars.url
                        }
                    }
                    
                }).on("click", adHit);

                // background behind entire frame
                productFrame.bg = R.create("div").set({
                    attr: {
                        id:"productFrame-bg"
                    },
                    css: {
                        width:320,
                        height:480,
                        backgroundColor:vars.bg.color,
                        backgroundImage:vars.bg.src,
                        backgroundSize:"cover",
                        pointerEvents:"none",
                        zIndex:1
                    },
                    rosetta: {
                        parent:productFrame.container
                    }
                });

                // logo
                productFrame.logo_img = R.create("div").set({
                    attr: {
                        id:"productFrame-logo_img"
                    },
                    css: {
                        width:320,
                        height:480,
                        backgroundImage:vars.logo.src,
                        backgroundSize:"contain",
                        pointerEvents:"none",
                        zIndex:2
                    },
                    rosetta: {
                        parent:productFrame.container
                    }
                });

                // headline
                productFrame.headline = R.create("div").set({
                    attr: {
                        id:"productFrame-headline_text"
                    },
                    css: {
                        top:120,
                        left:20,
                        width:280,
                        height:20,
                        textContent:vars.headline.text,
                        color:vars.headline.color,
                        fontFamily:vars.headline.font,
                        fontSize:vars.headline.size,
                        textAlign:"center",
                        verticalAlign:"middle",
                        pointerEvents:"none",
                        zIndex:3
                    },
                    rosetta: {
                        parent:productFrame.container
                    }
                });

                // subhead
                productFrame.subhead = R.create("div").set({
                    attr: {
                        id:"productFrame-subhead_text"
                    },
                    css: {
                        top:140,
                        left:20,
                        width:280,
                        height:20,
                        textContent:vars.subhead.text,
                        color:vars.subhead.color,
                        fontFamily:vars.subhead.font,
                        fontSize:vars.subhead.size,
                        textAlign:"center",
                        verticalAlign:"middle",
                        marginTop:2,
                        pointerEvents:"none",
                        zIndex:4
                    },
                    rosetta: {
                        parent:productFrame.container
                    }
                });

                // headline and subhead are grouped
                productFrame.headsubGroup = R.create("alignmentgroup").set({
                    verticalAlign: "middle"
                })
                .add(productFrame.headline)
                .add(productFrame.subhead);

                // cta text and background
                productFrame.cta = R.create("div").set({
                    attr: {
                        id:"productFrame-cta"
                    },
                    css: {
                        top:385,
                        left:60,
                        width:200,
                        height:35,
                        zIndex:100,
                        textContent:vars.cta.text,
                        color:vars.cta.color,
                        fontFamily:vars.cta.font,
                        fontSize:vars.cta.size,
                        textAlign:"center",
                        verticalAlign:"middle",
                        cursor:"pointer",
                        pointerEvents:"auto",
                        backgroundColor:vars.cta_bg.color,
                        borderRadius:vars.cta_bg.borderRadius
                    },
                    rosetta: {
                        resizeElement:false,
                        parent:productFrame.container,
                        analyticsName:vars.cta.analytics_name,
                        data: {
                            url:vars.url
                        }                        
                    }
                }).on("click", adHit);

                // create cat images that get used in rotator
                productFrame.catImgInsts = [];
                for (i = 0; i < vars.cat_imgs.length; i++) {
                    tmp = R.create("div").set({
                        attr: {
                            id:"productFrame-cat_img" + (i+1)
                        },
                        css: {
                            width:200,
                            height:180,
                            backgroundImage:vars.cat_imgs[i].src,
                            backgroundSize:"contain",
                            backgroundPosition: "center center",
                            zIndex:30 + (i+1),
                            cursor:"pointer",
                            pointerEvents:"auto"
                        },
                        rosetta: {
                            analyticsName:vars.cat_imgs[i].analytics_name,
                            data: {
                                url:vars.cat_imgs[i].url
                            }
                        }
                    }).on("click", adHit);
                    productFrame.catImgInsts.push(tmp);
                }

                // create rotator
                productFrame.catImgBatch = R.create("batch")
                    .require(productFrame.catImgInsts, 3)
                    .success(function() {

                        productFrame.rotatorContainer = R.create("div").set({
                            attr: {
                                id:"productFrame-rotatorContainer"
                            },
                            css: {
                                width: 320,
                                height: 180,
                                left: 0,
                                top: 160,
                                zIndex:25,
                                pointerEvents:"none"
                            },
                            rosetta: {
                                parentNode: productFrame.container
                            }
                        }).render();
         
                        // clean the rotator array of indexes that did not load
                        productFrame.catImgInsts = R.filter.success(productFrame.catImgInsts);
             
                        productFrame.rotator = R.create("rotatormultiview").set({
                            elements: productFrame.catImgInsts,
                            container: productFrame.rotatorContainer,
                            spacing:5,
                            autoPlay:false,
                            analyticsName:vars.rotator.analytics_name
                        }).render();

                        // create ndots
                        productFrame.nDotContainer = R.create("div").set({
                            attr: {
                                id:"productFrame-nDotContainer"
                            },
                            css: {
                                left: 20,
                                top: 327,
                                width: 280,
                                height: 20,
                                zIndex:29
                            },
                            rosetta: {
                                parentNode: stage
                            }
                        }).render();
                         
                        productFrame.nDotActive = R.create("div").set({
                           
                            css: {
                                width: 6,
                                height: 6,
                                backgroundColor: vars.nav.active.bg_color,
                                borderSize: 1,
                                borderRadius: 2.5
                            },
                            rosetta: {
                                parentNode: productFrame.nDotContainer
                            }
                        }).render();
                         
                        productFrame.nDotInactive = R.create("div").set({
                            css: {
                                width: 6,
                                height: 6,
                                backgroundColor: vars.nav.inactive.bg_color,
                                borderSize: 1,
                                borderRadius: 2.5
                            },
                            rosetta: {
                                parentNode: productFrame.nDotContainer
                            }
                        }).render();
                         
                        productFrame.nDots = R.create("ndots").set({
                            activeElement: productFrame.nDotActive,
                            inactiveElement: productFrame.nDotInactive,
                            container: productFrame.nDotContainer,
                            spacing: 16,
                            direction: "horizontal",
                            alignment: "center",
                            maxElements: productFrame.rotator.numElements,
                            startIndex: productFrame.rotator.startIndex
                        }).complete(function(inst) {

                            // create ndots background shape
                            var bgWidth = ((inst.maxElements-1)*parseFloat(inst.spacing))+(parseFloat(inst.activeElement.width)*inst.maxElements) + 8;
                            productFrame.nDotBg = R.create("div").set({
                                attr: {
                                    id:"productFrame-nDotBg"
                                },
                                css: {
                                    top: 344,
                                    width: bgWidth,
                                    height: 12,
                                    // backgroundColor: vars.nav.bg_color,
                                    borderRadius: 8,
                                    zIndex: 3
                                },
                                rosetta: {
                                    parent:productFrame.container
                                }
                            }).complete(function(inst) {
                                inst.left = (320-parseFloat(inst.width))/2;
                            }).render();

                        }).render();
                         
                        productFrame.rotator.controlledBy = productFrame.nDots;
                        productFrame.nDots.controlledBy = productFrame.rotator;

                        productFrame.reset = function() {
                            // productFrame.rotator.reset();
                            productFrame.rotator.cancelAutoPlay();
                        };

                        productFrame.animate = function() {
                            if (!productFrame.autoplayed) {
                                productFrame.autoplayed = true;
                                productFrame.rotator.startAutoPlay();
                            }
                        };
                });
                productFrame.catImgBatch.data = {
                    required: true
                };

                productFrame.createBtns = function() {
                    // create top nav btn
                    if (frames.indexOf(productFrame) != 0) {
                        createTopBtn(productFrame, frames[frames.indexOf(productFrame)-1].vars.btn_text, vars.btn_top.bg_color, vars.btn_top.arrow_tint, vars.btn_top.analytics_name).set({
                            css: {
                                zIndex:30
                            },
                            rosetta: {
                                parent:productFrame.container
                            }                    
                        });
                        productFrame.topBtnText.color = vars.btn_top.color;
                    }

                    // create bottom nav button
                    if (frames.indexOf(productFrame) == frames.length - 1) {
                        createTerminalButton(productFrame, vars.btn_bottom.bg_color, vars.btn_bottom.arrow_tint, vars.btn_bottom.analytics_name);
                    } else {
                        createBottomBtn(productFrame, frames[frames.indexOf(productFrame)+1].vars.btn_text, vars.btn_bottom.bg_color, vars.btn_bottom.arrow_tint, vars.btn_bottom.analytics_name);
                    }
                    productFrame.bottomBtn.parent = productFrame.container;
                    productFrame.bottomBtnText.color = vars.btn_bottom.color;
                }

                frames.push(productFrame);
            }
            /* END PRODUCT FRAME */

            /* START VIDEO FRAME */
            createVideoFrame = function(vars) {

                var videoFrame = {
                    name:"videoFrame",
                    vars:vars
                };

                // container holds everything for video frame
                videoFrame.container = R.create("div").set({
                    attr: {
                        id:"videoFrame-container"
                    },
                    css: {
                        top:0,
                        width:320,
                        height:480,
                        pointerEvents:"none"
                    },
                    rosetta: {
                        analyticsName:vars.analytics_name
                    }
                });

                // legal text link that triggers overlay on click
                videoFrame.legalTextLink = R.create("div").set({
                    rosetta: {
                        parent: videoFrame.container
                    },
                    css: {
                        top: 420,
                        left: 270,
                        color: legalTextLinkText.color,
                        fontFamily: legalTextLinkText.font,
                        fontSize: legalTextLinkText.size,
                        width:32,
                        height: 18,
                        zIndex: 21,
                        cursor:"pointer",
                        pointerEvents: "auto"
                    },
                    attr:{
                        id: "video-legal-text-link",
                        textContent: legalTextLinkText.text
                    }
                }).on("click", function(){
                    displayLegal(videoFrame)
                });

                // hit area covers entire frame
                videoFrame.hitArea = R.create("div").set({
                    attr: {
                        id:"videoFrame-hitArea"
                    },
                    css: {
                        width:320,
                        height:480,
                        zIndex:20,
                        cursor:"pointer",
                        pointerEvents:"auto"
                    },
                    rosetta: {
                        parent:videoFrame.container,
                        analyticsName:vars.analytics_name,
                        data:{
                            url:vars.url
                        }
                    }
                }).on("click", adHit);

                // background behind entire frame
                videoFrame.bg = R.create("div").set({
                    attr: {
                        id:"videoFrame-bg"
                    },
                    css: {
                        width:320,
                        height:480,
                        backgroundImage:vars.bg.src,
                        backgroundSize:"cover",
                        pointerEvents:"none"
                    },
                    rosetta: {
                        parent:videoFrame.container
                    }
                });

                // logo
                videoFrame.logo_img = R.create("div").set({
                    attr: {
                        id:"videoFrame-logo_img"
                    },
                    css: {
                        width:320,
                        height:480,
                        backgroundImage:vars.logo.src,
                        backgroundSize:"cover",
                        pointerEvents:"none"
                    },
                    rosetta: {
                        parent:videoFrame.container
                    }
                });

                // headline
                videoFrame.headline = R.create("div").set({
                    attr: {
                        id:"videoFrame-headline"
                    },
                    css: {
                        top:120,
                        left:20,
                        width:280,
                        height:20,
                        textContent:vars.headline.text,
                        color:vars.headline.color,
                        fontFamily:vars.headline.font,
                        fontSize:vars.headline.size,
                        textAlign:"center",
                        verticalAlign:"middle",
                        pointerEvents:"none"
                    },
                    rosetta: {
                        parent:videoFrame.container
                    }    
                });

                // social icon
                videoFrame.youtube_img = R.create("div").set({
                    attr: {
                        id:"videoFrame-youtube"
                    },
                    css: {
                        bottom:40,
                        right:5,
                        width:35,
                        height:35,
                        zIndex:100,
                        backgroundImage:vars.youtube.src,
                        backgroundSize:"contain",
                        cursor:"pointer",
                        pointerEvents:"auto"
                    },
                    rosetta: {
                        parent:videoFrame.container,
                        analyticsName:vars.youtube.analytics_name,
                        data:{
                            url:vars.youtube.url
                        }
                    }
                }).on("click", adHit);

                // create video player
                videoFrame.videoContainer = R.create("div").set({
                    attr: {
                        id:"videoFrame-videoContainer"
                    },
                    css: {
                        top:150,
                        left:10,
                        width:300,
                        height:169,
                        zIndex:22
                    },
                    rosetta: {
                        parent:videoFrame.container
                    }                
                });

                videoFrame.video = R.create("default_video_player").set({
                    videoWidth: 300,
                    videoHeight: 169,
                    videoSource: {
                        mp4:vars.video.mp4,
                        ogg:""
                    },
                    posterImage:vars.video.poster,
                    playerID:"video_player",
                    overlayID:"video_overlay",
                    controlsID:"video_controls",
                    parentNode:videoFrame.videoContainer,
                    data:{
                        excludeFromRender:true
                    }
                }).success(function(){
                    console.log("video loaded");
                }).fail(function(inst){
                    console.log("video failed");
                    console.debug(inst.failReason);
                });

                // only load the video once the user navigates to this frame
                videoFrame.animate = function() {
                    if (!videoFrame.autoplayed) {
                        videoFrame.autoplayed = true;
                        videoFrame.video.render();
                    }
                };

                // make sure video isn't playing if the user isn't on this frame
                videoFrame.reset = function() {
                    videoFrame.video.player.pause();
                }

                videoFrame.createBtns = function() {
                    // create top nav btn
                    if (frames.indexOf(videoFrame) != 0) {
                        createTopBtn(videoFrame, frames[frames.indexOf(videoFrame)-1].vars.btn_text, vars.btn_top.bg_color, vars.btn_top.arrow_tint, vars.btn_top.analytics_name).set({
                            css: {
                                zIndex:30
                            },
                            rosetta: {
                                // parent:videoFrame.container
                            }                    
                        });
                        // videoFrame.topBtnText.color = vars.btn_top.color;
                    }

                    // create bottom nav button
                    if (frames.indexOf(videoFrame) == frames.length - 1) {

    // console.log("hitting");
                        // btn_bottom.display = "none";
                        createTerminalButton(videoFrame, vars.btn_bottom.arrow_tint, vars.btn_bottom.analytics_name);
                                                // createBottomBtn(videoFrame, frames[frames.indexOf(videoFrame)+1].vars.btn_text, vars.btn_bottom.bg_color, vars.btn_bottom.arrow_tint, vars.btn_bottom.analytics_name);



                    } else {
                        // createBottomBtn(videoFrame, frames[frames.indexOf(videoFrame)+1].vars.btn_text, vars.btn_bottom.bg_color, vars.btn_bottom.arrow_tint, vars.btn_bottom.analytics_name);
                        // createBottomBtn(videoFrame);

                    }
                    // videoFrame.bottomBtn.parent = videoFrame.container;
                    // videoFrame.bottomBtnText.color = vars.btn_bottom.color;
                }

                frames.push(videoFrame);
            }
            /* END VIDEO FRAME */

            /* START NARRATIVE FRAME */
            createNarrativeFrame = function(vars) {
                var narrativeFrame = {
                    name:"narrativeFrame",
                    vars:vars
                };

                // container holds everytning for narrative frame
                narrativeFrame.container = R.create("div").set({
                    attr: {
                        id:"narrativeFrame-container"
                    },
                    css: {
                        top:0,
                        width:320,
                        height:480,
                        pointerEvents:"none"
                    },
                    rosetta: {
                        analyticsName:vars.analytics_name
                    }
                });

                // legal text link that triggers overlay on click


                // create cat images that get used in rotator
                narrativeFrame.catImgInsts = [];
                for (i = 0; i < vars.cat_imgs.length; i++) {
                    tmp = R.create("div").set({
                        attr: {
                            id:"narrativeFrame-cat_img" + (i+i)
                        },
                        css: {
                            width:320,
                            height:480,
                            backgroundImage:vars.cat_imgs[i].src,
                            backgroundSize:"cover",
                            cursor:"pointer",
                            pointerEvents:"auto"
                        },
                        rosetta: {
                            analyticsName:vars.cat_imgs[i].analytics_name,
                            data:{
                                url:vars.cat_imgs[i].url
                            }
                        }
                    }).on("click", adHit);
                    narrativeFrame.catImgInsts.push(tmp);
                }

                //create rotator
                narrativeFrame.catImgBatch = R.create("batch")
                    .require(narrativeFrame.catImgInsts, 1)
                    .complete(function() {
                        narrativeFrame.rotatorContainer = R.create("div").set({
                            attr: {
                                id:"narrativeFrame-rotatorContainer"
                            },
                            css: {
                                width: 320,
                                height: 480,
                                left: 0,
                                top: 0
                            },
                            rosetta: {
                                parentNode: narrativeFrame.container
                            }
                        }).render();
         
                        // clean the rotator arrays of incomplete indexes
                        narrativeFrame.catImgInsts = R.filter.success(narrativeFrame.catImgInsts);
             
                        narrativeFrame.rotator = R.create("rotatorslide").set({
                            elements: narrativeFrame.catImgInsts,
                            container: narrativeFrame.rotatorContainer,
                            onDuration:3,
                            spacing:0,
                            autoPlay:false,
                            analyticsName:vars.rotator.analytics_name
                        }).render();

                        // create ndots
                        narrativeFrame.nDotContainer = R.create("div").set({
                            attr: {
                                id:"narrativeFrame-nDotContainer"
                            },
                            css: {
                                left: 20,
                                top: 399,
                                width: 280,
                                height: 20,
                                zIndex:4
                            },
                            rosetta: {
                                parentNode: narrativeFrame.container
                            }
                        }).render();
                         
                        narrativeFrame.nDotActive = R.create("div").set({
                            css: {
                                width: 6,
                                height: 6,
                                backgroundColor: vars.nav.active.bg_color,
                                borderSize: 1,
                                borderRadius: 2.5
                            },
                            rosetta: {
                                parentNode: narrativeFrame.nDotContainer
                            }
                        }).render();
                         
                        narrativeFrame.nDotInactive = R.create("div").set({
                            css: {
                                width: 6,
                                height: 6,
                                backgroundColor: vars.nav.inactive.bg_color,
                                borderSize: 1,
                                borderRadius: 2.5
                            },
                            rosetta: {
                                parentNode: narrativeFrame.nDotContainer
                            }
                        }).render();
                         
                        narrativeFrame.nDots = R.create("ndots").set({
                            activeElement: narrativeFrame.nDotActive,
                            inactiveElement: narrativeFrame.nDotInactive,
                            container: narrativeFrame.nDotContainer,
                            spacing: 8,
                            direction: "horizontal",
                            alignment: "center",
                            maxElements: narrativeFrame.rotator.numElements
                        }).complete(function(inst) {

                                // create ndots background shape
                                var bgWidth = ((inst.maxElements-1)*parseFloat(inst.spacing))+(parseFloat(inst.activeElement.width)*inst.maxElements) + 10;
                                narrativeFrame.nDotBg = R.create("div").set({
                                    attr: {
                                        id:"narrativeFrame-nDotBg"
                                    },
                                    css: {
                                        top:427,
                                        width:bgWidth,
                                        height:12,
                                        // backgroundColor: vars.nav.bg_color,
                                        borderRadius:8,
                                        zIndex:3
                                    },
                                    rosetta: {
                                        parent:narrativeFrame.container
                                    }
                                }).complete(function(inst) {
                                    inst.left = (320-parseFloat(inst.width))/2;
                                }).render();
                            }
                        ).render();
                         
                        narrativeFrame.rotator.controlledBy = narrativeFrame.nDots;
                        narrativeFrame.nDots.controlledBy = narrativeFrame.rotator;

                        narrativeFrame.reset = function() {
                            // narrativeFrame.rotator.reset();
                            narrativeFrame.rotator.cancelAutoPlay();
                        };

                        narrativeFrame.animate = function() {
                            if (!narrativeFrame.autoplayed) {
                                narrativeFrame.autoplayed = true;
                                narrativeFrame.rotator.startAutoPlay();
                            }
                        };

                });
                narrativeFrame.catImgBatch.data = {
                    required:true
                };
                
                narrativeFrame.createBtns = function() {
                    // create top nav btn
                    if (frames.indexOf(narrativeFrame) != 0) {
                        createTopBtn(narrativeFrame, frames[frames.indexOf(narrativeFrame)-1].vars.btn_text, vars.btn_top.bg_color, vars.btn_top.arrow_tint, vars.btn_top.analytics_name).set({
                            css: {
                                zIndex:11                        
                            },
                            rosetta: {
                                parent:narrativeFrame.container
                            }                    
                        })
                        narrativeFrame.topBtnText.color = vars.btn_top.color;
                    }

                    // create bottom nav button
                    if (frames.indexOf(narrativeFrame) == frames.length - 1) {
                        // createTerminalButton(narrativeFrame, vars.btn_bottom.bg_color, vars.btn_bottom.arrow_tint, vars.btn_bottom.analytics_name);
                    } else {
                        createBottomBtn(narrativeFrame, frames[frames.indexOf(narrativeFrame)+1].vars.btn_text, vars.btn_bottom.bg_color, vars.btn_bottom.arrow_tint, vars.btn_bottom.analytics_name)
                    }
                    narrativeFrame.bottomBtn.parent = narrativeFrame.container;
                    narrativeFrame.bottomBtnText.color = vars.btn_bottom.color;
                    narrativeFrame.bottomBtnText.left = 0;
                }

                frames.push(narrativeFrame);
            }
            /* END NARRATIVE FRAME */

            // create the frames set up at the top of the file
            createFrames();

            // start frame loading
            loadFrame(0);

            // loads the frame in frames at the specified index
            function loadFrame(frame) {

                if (frames[frame]) {
                    frames[frame].loaded = false;

                    console.log("load frame " + frame);
                    var frameBatch = R.create("batch");

                    if (frames[frame].createBtns) {
                        frames[frame].createBtns();
                    }

                    // add all of the instances that are stored on the frame's object to the batch
                    for (var inst in frames[frame]) {
                        if (isObject(frames[frame][inst]) && frames[frame][inst].instanceType) {

                            // don't render anything that has been intentionally excluded
                            // this would be things that should only load when the user goes to that frame
                            // or interacts in a specific way
                            if (!frames[frame][inst].data.excludeFromRender) {
                                if (frames[frame][inst].data.required == true) {
                                    frameBatch.require(frames[frame][inst]);
                                } else {
                                    frameBatch.add(frames[frame][inst]);
                                }                                
                            }
                        }
                    }

                    frameBatch.success(function() {
                        
                        frames[frame].loaded = true;
                        loadedFrames.push(frames[frame])
                        console.log("frame " + frame + " is loaded");

                        var batchGet = frameBatch.get();                        
                        for (var i = 0; i < batchGet.length; i++) {
                            console.log(batchGet[i].id + " loaded = " + batchGet[i].isSuccess);
                        }
                        
                        if (loadedFrames.length === 1) {
                            // hide top button if there is one
                            if (frames[frame].topBtn) {
                                frames[frame].topBtn.display = "none";
                            }

                            // animate the first frame once it loads
                            if (frames[frame].animate) {
                                frames[frame].animate();
                            }
                        } else {
                            // position the frame in the right relative position
                            // according to it's index in frames
                            frames[frame].container.top = (parseFloat(loadedFrames[loadedFrames.length-2].container.top) + parseFloat(loadedFrames[loadedFrames.length-2].container.height));
                            frameContainer.height = parseFloat(frameContainer.height) + parseFloat(frames[frame].container.height);

                            // emable top button
                            frames[frame].topBtn.element.addEventListener(interactionType, function(e) {
                                e.stopPropagation();
                                gotoFrame(loadedFrames.indexOf(frames[frame]) - 1, frames[frame].topBtn);
                            });

                            // hide the loading gif and animate the arrows
                            if (loadedFrames[loadedFrames.length-2].bottomBtn && loadedFrames[loadedFrames.length-2].bottomBtn.data && loadedFrames[loadedFrames.length-2].bottomBtn.data.animate) {
                                loadedFrames[loadedFrames.length-2].bottomBtn.data.animate();
                            }
                        }

                        // enable bottom button
                        if (frames.indexOf(frames[frame]) != frames.length - 1) {
                            frames[frame].bottomBtn.element.addEventListener(interactionType, function(e) {
                                e.stopPropagation();
                                gotoFrame(loadedFrames.indexOf(frames[frame]) + 1, frames[frame].bottomBtn);
                            });
                        } else {
                            for (var i = 0; i < loadedFrames.length; i++) {
                                loadedFrames[i].bottomBtn.visibility = "hidden";
                                if (i < loadedFrames.length - 1) {
                                    loadedFrames[i].bottomBtnText.textContent = "SEE MORE";
                                } else {
                                    loadedFrames[i].bottomBtnText.textContent = "BACK TO TOP";
                                }
                                (function(frame) {
                                    loadedFrames[i].bottomBtnText.render({
                                        complete: function(inst) {
                                            frame.bottomBtnAlign();
                                            frame.bottomBtnText.parentNode.visibility = "";
                                        }
                                    });    
                                })(loadedFrames[i]);
                            }
                        }

                        // add the frame to the frameContainer
                        frameContainer.appendChild(frames[frame].container);
                        
                        // load the next frame in frames
                        loadFrame(frame+1);
                    })
                    .fail(function(inst) {
                        console.log("Frame FAILED");
                        console.debug(inst.failReason);

                        if (frames.indexOf(frames[frame]) == frames.length - 1) {

                            for (var i = 0; i < loadedFrames.length; i++) {
                                loadedFrames[i].bottomBtn.visibility = "hidden";
                                if (i < loadedFrames.length - 1) {
                                    loadedFrames[i].bottomBtnText.textContent = vars[loadedFrames[i+1].name].btn_text + "&nbsp;&nbsp;&nbsp; " + (i+1) + "/" + loadedFrames.length;
                                } else {
                                    loadedFrames[loadedFrames.length - 1].container.removeChild(loadedFrames[loadedFrames.length - 1].bottomBtn);
                                    loadedFrames[loadedFrames.length - 1].bottomBtn.data.animate = null;
                                    createTerminalButton(
                                            loadedFrames[loadedFrames.length - 1], 
                                            vars[loadedFrames[loadedFrames.length - 1].name].btn_bottom.bg_color, 
                                            vars[loadedFrames[loadedFrames.length - 1].name].btn_bottom.arrow_tint
                                        );
                                        loadedFrames[loadedFrames.length - 1].bottomBtnText.textContent = "VOLVER AL INICIO" + "&nbsp;&nbsp;&nbsp; " + (i+1) + "/" + loadedFrames.length;
                                        loadedFrames[loadedFrames.length - 1].bottomBtnText.color = vars[loadedFrames[loadedFrames.length - 1].name].btn_bottom.color;
                                        loadedFrames[loadedFrames.length - 1].container.appendChild(loadedFrames[loadedFrames.length - 1].bottomBtn);
                                }
                                console.log("replace button text with " + loadedFrames[i].bottomBtnText.textContent)
                                (function(frame) {
                                    loadedFrames[i].bottomBtnText.render({
                                        complete: function(inst) {
                                            frame.bottomBtnAlign();
                                            frame.bottomBtnText.parentNode.visibility = "";
                                        }
                                    });    
                                })(loadedFrames[i]);
                            }
                        } else {
                            // if frame fails, load the next frame
                            loadFrame(frame + 1);
                        }
                    })
                    .render();
                }

                // utils for determining if something is a Rosetta instance
                function isObject(val) {
                    return (typeof val === 'object' && isArray(val) === false && val !== null);
                }

                function isArray(val) {
                    if (!Array.isArray) {
                        Array.isArray = function (vArg) {
                            return Object.prototype.toString.call(vArg) === "[object Array]";
                        };
                    }
                    return Array.isArray(val);
                }
            }

            // navigate to a frame in frames at the specified index
            function gotoFrame(frame, inst) {

                // only navigate if the frame is loaded
                if (loadedFrames[frame]) {
                    
                    Analytics.fire({event: "tap", instance: inst, currentInstance:inst, details:""});

                    console.log("gotoFrame " + frame);

                    TweenMax.to(frameContainer.element, 0.5, {top:-frame*480, onComplete:function() {

                        previousFrame = currentFrame;

                        // animate the frame once you're on it
                        if (loadedFrames[frame].animate) {
                            loadedFrames[frame].animate();
                        }
                        // animate top button's arrows
                        if (loadedFrames[frame].topBtn && loadedFrames[frame].topBtn.data && loadedFrames[frame].topBtn.data.animate) {
                            TweenMax.delayedCall(0.5, loadedFrames[frame].topBtn.data.animate);
                        }
                        // animate bottom button's arrows
                        if (loadedFrames[frame].bottomBtn && loadedFrames[frame].bottomBtn.data && loadedFrames[frame].bottomBtn.data.animate) {
                            TweenMax.delayedCall(0.5, loadedFrames[frame].bottomBtn.data.animate);
                        }
                        // reset the frame you came from
                        if (previousFrame && loadedFrames[previousFrame].reset) {
                            loadedFrames[previousFrame].reset();
                        }
                        currentFrame = frame;
                    }});
                }
            }

            creativeReady();

            
            /* var hit_area = R.create("div").set({id:"ad_hit", width: width, height: height, pointerEvents: "auto", cursor: "pointer", zIndex:100, parentNode:stage});
            hit_area.on("click", adHit); */

            /* [END_CREATE_ELEMENTS] */
            //creativeReady()

            // All Animation goes here
            function animateElements() {
                /* [START_ANIMATE_ELEMENTS] */

                TweenMax.to(stageBlock.element,1,{autoAlpha:0});
                    
                /* [END_ANIMATE_ELEMENTS] */
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
			Analytics.fire({event: "click", instance: instance,  currentInstance:instance, details:""});
			var url;
			if (instance && instance.data && instance.data.url) {
				url = instance.data.url;
				}
			if (window["mraid"] && window["mraid"].open) {
				window["mraid"].open(url);
			} else {
				window.open(url, "_blank");
			}
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

            // TweenMax
            if (registry.TweenMax && !defined.TweenMax) {registry.TweenMax.enable();}
            if (defined.TweenMax) {
                TweenMax = defined.TweenMax;
                TweenMax.selector = R.selector;
            }
            // TweenLite
            if (registry.TweenLite && !defined.TweenLite) {registry.TweenLite.enable();}
            if (defined.TweenLite) {
                TweenLite = defined.TweenLite;
                Settings.overwrite({GSAPSelector: TweenLite.selector});
                TweenLite.selector = R.selector;
                
            }
            // TimelineLite
            if (registry.TimelineLite && !defined.TimelineLite) {registry.TimelineLite.enable();}
            if (defined.TimelineLite) {TimelineLite = defined.TimelineLite;}

            //TimelineMax
            if (registry.TimelineMax && !defined.TimelineMax) {registry.TimelineMax.enable();}
            if (defined.TimelineMax) {TimelineMax = defined.TimelineMax;}
            //Hammer
            if (defined.Hammer) { Hammer = defined.Hammer;}
        }

        function log(msg) {
            if (window && window.console){
                var c = "Creative: ";
                try {
                    if (window.console.debug && typeof msg == "object"){
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

        function checkForCallback(evt) {
            if (!evt){return;}
            var arr = registeredCallbacks;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].evt == evt) {
                    if (arr[i].callback) {
                        try{ arr[i].callback.call(arr[i].scope); } catch(e) { log("Callback failed"); }
                    }
                }
            }
        }

        function environReady(isReady) {
            if (isEnvironReady == false){
                isEnvironReady = isReady;
                if (isReady == true) {
                    logEnvironStatus("parentEnvironment", isEnvironReady);
                }
            }
            return reveal;
        }

        function creativeReady() {
            if (isCreativeReady == false) {
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
            if (environStatuses.length == environTotals) {
                showCreative();
            }
        }

        function checkEnvironStatus(src) {
            for (var i=0; i<environStatuses.length; i++){
                if (environStatuses[i].src == src) {
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
    };
    creatives.push(Creative);
    return Creative;
}());