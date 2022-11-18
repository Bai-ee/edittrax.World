(function() {
    "use strict";
    var win = window;
    var creatives = (win._$OGO$_ || (win._$OGO$_ = {})) &&  (win._$OGO$_.Rosetta || (win._$OGO$_.Rosetta = {})) && (win._$OGO$_.Rosetta.creatives || (win._$OGO$_.Rosetta.creatives = []));
    var Rosetta = win._$OGO$_.Rosetta;
    var require =  Rosetta.requirejs || require;

    function Creative(dmo){
        /* [START_CUSTOM_VARIABLES] */
        /* [END_CUSTOM_VARIABLES] */

        var registeredCallbacks = [], environStatuses = [],environTotals = 2, isEnvironReady = false, isCreativeReady = false;
        var R, Platform, Settings, Analytics, AnalyticsContent, TweenMax, TweenLite, TimelineLite, TimelineMax, EventForwarding, Hammer;

        var ROSETTA_VERSION = "4.30";
        var context = String(ROSETTA_VERSION + "_"  + dmo.embedId).split("_").join(".");
        var parentDiv, stage, animate, timeoutTimer, startTimer, FOF_PIXEL_DENSITY;
        var evergreenImg = "evergreen.jpg";
        var CENTER_STAGE = false;

        function init(wrapperID) {
            var subdirectory = "1083CI_CNVR_Expandables";
            var creativeName = "" || subdirectory;
            var companyID = "2000";
            var isSecure = (dmo.externalURL.indexOf("https:") > -1);



            var config = {
                context: context,
                waitSeconds: 5,
                paths: {},
                bundles: {
                    "Rosetta":["core.pack","tweenmax.pack","ad.pack","alignmentgroup.pack","cnvr.usweb.pack","cnvr.mojo.pack","video.pack","hammer.pack"]
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
                    return compatible;
                }
                return bundles;
            })(config.bundles.Rosetta);


            dmo.atomSuffix = dmo.atomSuffix || "";
            config.paths["Rosetta"] = dmo.externalURL + "/atom/"+ROSETTA_VERSION+"/3.0.0/?scripts=" + "wrapper_start," + config.bundles.Rosetta.join(",") + ",wrapper_end" + dmo.atomSuffix;

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
                    placementWidth:Number(dmo.mediaWidth) || 728,
                    placementHeight:Number(dmo.mediaHeight) || 180,
                    clientID:dmo.companyId || companyID
                });
                R.setFallback(fallback);

                if (R.isCompatible === true) {
                    R.parseParameters(dmo.flashVars, 'flashvars');
                    Platform.overwrite({
                        clientID: R.create("var").set({name:"company_id", dataType:"String", defaultValue:Platform.fetch().clientID}).render().value(),
                        cacheBuster: R.create("var").set({name:"bypass_cache", dataType:"Boolean", defaultValue:false, exposed:false}).render().value(),
                        subdirectory:R.create("var").set({name:"subdirectory", dataType:"String", defaultValue:subdirectory}).render().value(),
                        FOFVersion: R.create("var").set({name:"fof_version", dataType:"String", defaultValue:"2.0.2", exposed:false}).render().value(),
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
            var borderColor = R.create("var").set({name: "border_color", dataType: "String", defaultValue: "#FFFFFF"}).render().value();

            stage = R.create("div").set({id:"stage", width: width, height: height, backgroundColor:"#FFFFFF", className: "stage"});
            parentDiv.appendChild(stage.element);
            Settings.overwrite({stage: stage});
            new EventForwarding().init({stage:stage});
            var borders = {
                l:R.create("div").set({width:"1px", height:height, backgroundColor:borderColor, left:0, top:0, zIndex:501,  pointerEvents:"none", parentNode:stage}).render(),
                r:R.create("div").set({width:"1px", height:height, backgroundColor:borderColor, right:0, top:0, zIndex:501, pointerEvents:"none",parentNode:stage}).render(),
                t:R.create("div").set({width:width, height:"1px", backgroundColor:borderColor, left:0, top:0, zIndex:501, pointerEvents:"none", parentNode:stage}).render(),
                b:R.create("div").set({width:width, height:"1px", backgroundColor:borderColor, left:0, bottom:0, zIndex:501, pointerEvents:"none", parentNode:stage}).render()
            };

            //apply CSS reset to stage class
            R.applyCSSReset(".stage");

            /* [START_CREATE_ELEMENTS] */
            // var hit_area = R.create("div").set({id:"ad_hit", width: width, height: height, pointerEvents: "auto", cursor: "pointer", zIndex:100, parentNode:stage});
            // hit_area.on("click", adHit);

            var stageBlock = R.create('div').set({
                css: {
                    width: 728,
                    height: 90,
                    cursor: 'pointer',
                    backgroundColor:"#FFFFFF",
                    top: 0,
                    zIndex:900,
                },
                rosetta: {
                    parentNode: stage,
                },
                attr:{
                    id:"stageBlock"
                },
            }).render();

            var stageBlockFade = R.create('div').set({
                css: {
                    width: 728,
                    height: 90,
                    cursor: 'pointer',
                    backgroundColor:"#FFFFFF",
                    top: 0,
                    zIndex:500,
                },
                rosetta: {
                    parentNode: stage,
                },
                attr:{
                    id:"stageBlock"
                },
            }).render();

//COLLAPSED STATE////////////////////////////////////

            var collapsedCont = R.create('div').set({
                css: {
                    width: 728,
                    height: 180,
                    backgroundImage: 'bg_img_728x180.jpg',
                    // backgroundColor:"#000000",
                    top: 0,
                    zIndex:100,
                    backgroundSize: "cover",
                    cursor: "pointer",
                    pointerEvents: "auto",

                },
                rosetta: {
                    parentNode: stage,
                },
                data: {
                    hitIndex: 1
                },
                attr:{
                    id:"collapsedCont"
                },
            }).render();


            var collapsedHit = R.create("div").set({
                css:{
                    width:728,
                    height:90,
                    // backgroundColor:"#000000.5",
                    top:0,
                    left:0,
                    zIndex:300,
                    cursor:"pointer",
                    pointerEvents:"auto"
                },
                attr:{
                    id:"collapsedHit",
                },
                data: {
                    hitIndex: 1
                },
                rosetta:{
                    parentNode:stage
                }
            }).render();

            var expandHit = R.create("div").set({
                css:{
                    width:109,
                    height:31,
                    // backgroundColor:"#000000.5",
                    top:29,
                    left:588,
                    zIndex:300,
                    cursor:"pointer",
                    pointerEvents:"auto"
                },
                attr:{
                    id:"expandHit",
                },
                rosetta:{
                    parentNode:stage
                }
            }).render();

            var logo = R.create('div').set({
                css: {
                    width: 728,
                    height: 90,
                    backgroundImage: 'logo_img_728x90.png',
                    // backgroundColor:"#00FF00",
                    top: 0,
                    zIndex:201,
                    backgroundSize: "cover",
                    pointerEvents: "none",
                    cursor: "pointer",
                },
                rosetta: {
                    parentNode: stage,
                },
                data: {
                    // hitIndex: 2
                },
                attr:{
                    id:"logo"
                },
            }).render();

            var cta_F1 = R.create('div').set({
                css: {
                    width: 728,
                    height: 90,
                    backgroundImage: 'CTA_728x90.png',
                    // backgroundColor:"#00FF00",
                    top: 0,
                    zIndex:201,
                    backgroundSize: "cover",
                    pointerEvents: "none",
                    cursor: "pointer",
                },
                rosetta: {
                    parentNode: stage,
                },
                data: {
                    // hitIndex: 2
                },
                attr:{
                    id:"cta_F1"
                },
            }).render();

//F1 COPY////////////////////////////////////

            var copy_1 = R.create('div').set({
                css: {
                    width: 728,
                    height: 90,
                    backgroundImage: 'Speak_728x90.png',
                    // backgroundColor:"#00FF00",
                    top: 0,
                    zIndex:201,
                    backgroundSize: "contain",
                    pointerEvents: "none",
                    cursor: "pointer",
                },
                rosetta: {
                    parentNode: stage,
                },
                data: {
                    // hitIndex: 2
                },
                attr:{
                    id:"copy_1"
                },
            }).render();

            var copy_2 = R.create('div').set({
                css: {
                    width: 728,
                    height: 90,
                    backgroundImage: 'to_728x90.png',
                    // backgroundColor:"#00FF00",
                    top: 0,
                    zIndex:201,
                    backgroundSize: "contain",
                    pointerEvents: "none",
                    cursor: "pointer",
                },
                rosetta: {
                    parentNode: stage,
                },
                data: {
                    // hitIndex: 2
                },
                attr:{
                    id:"copy_2"
                },
            }).render();

            var copy_3 = R.create('div').set({
                css: {
                    width: 728,
                    height: 90,
                    backgroundImage: 'them_728x90_1.png',
                    // backgroundColor:"#00FF00",
                    top: -25,
                    left:-58,
                    zIndex:201,
                    backgroundSize: "contain",
                    pointerEvents: "none",
                    cursor: "pointer",
                },
                rosetta: {
                    parentNode: stage,
                },
                data: {
                    // hitIndex: 2
                },
                attr:{
                    id:"copy_3"
                },
            }).render();

            var copy_4 = R.create('div').set({
                css: {
                    width: 728,
                    height: 90,
                    backgroundImage: 'like_728x90.png',
                    // backgroundColor:"#00FF00",
                    top: 0,
                    zIndex:201,
                    backgroundSize: "contain",
                    pointerEvents: "none",
                    cursor: "pointer",
                },
                rosetta: {
                    parentNode: stage,
                },
                data: {
                    // hitIndex: 2
                },
                attr:{
                    id:"copy_4"
                },
            }).render();

            var copy_5 = R.create('div').set({
                css: {
                    width: 728,
                    height: 90,
                    backgroundImage: 'you_728x90.png',
                    // backgroundColor:"#00FF00",
                    top: 0,
                    zIndex:201,
                    backgroundSize: "contain",
                    pointerEvents: "none",
                    cursor: "pointer",
                },
                rosetta: {
                    parentNode: stage,
                },
                data: {
                    // hitIndex: 2
                },
                attr:{
                    id:"copy_5"
                },
            }).render();

            var copy_6 = R.create('div').set({
                css: {
                    width: 728,
                    height: 90,
                    backgroundImage: 'know_728x90.png',
                    // backgroundColor:"#00FF00",
                    top: 0,
                    zIndex:201,
                    backgroundSize: "contain",
                    pointerEvents: "none",
                    cursor: "pointer",
                },
                rosetta: {
                    parentNode: stage,
                },
                data: {
                    // hitIndex: 2
                },
                attr:{
                    id:"copy_6"
                },
            }).render();

            var copy_7 = R.create('div').set({
                css: {
                    width: 728,
                    height: 90,
                    backgroundImage: 'them_728x90.png',
                    // backgroundColor:"#00FF00",
                    top: 0,
                    left:0,
                    zIndex:201,
                    backgroundSize: "contain",
                    pointerEvents: "none",
                    cursor: "pointer",
                },
                rosetta: {
                    parentNode: stage,
                },
                data: {
                    // hitIndex: 2
                },
                attr:{
                    id:"copy_7"
                },
            }).render();

//EXPANDED STATE////////////////////////////////////

            var cta_F2 = R.create('div').set({
                css: {
                    width: 728,
                    height: 180,
                    backgroundImage: 'CTA.png',
                    // backgroundColor:"#00FF00",
                    top: 0,
                    left:0,
                    zIndex:201,
                    backgroundSize: "cover",
                    pointerEvents: "none",
                    cursor: "pointer",
                },
                rosetta: {
                    parentNode: stage,
                },
                data: {
                    // hitIndex: 2
                },
                attr:{
                    id:"cta_F2"
                },
            }).render();

            var closeButton = R.create("div").set({
                css:{
                    width:728,
                    height:180,
                    // backgroundColor:"#000000.5",
                    backgroundImage:"Close_Button.png",
                    // color:"#000000",
                    // textAlign:"center",
                    // verticalAlign:"middle",
                    // fontSize:14,
                    // fontFamily:10746,
                    top:0,
                    left:0,
                    zIndex:300,
                    cursor:"pointer",
                    pointerEvents:"auto",
                    backgroundSize: "cover",
                },
                attr:{
                    id:"close_button",
                    // textContent:"CLOSE X",
                    resizeElement:false
                },
                rosetta:{
                    parentNode:stage
                }
            }).render();


            var closeHit = R.create("div").set({
                css:{
                    width:60,
                    height:30,
                    // backgroundColor:"#000000.5",
                    // backgroundImage:"Close_Button.png",
                    // color:"#000000",
                    // textAlign:"center",
                    // verticalAlign:"middle",
                    // fontSize:14,
                    // fontFamily:10746,
                    top:0,
                    left:665,
                    zIndex:500,
                    cursor:"pointer",
                    pointerEvents:"auto"
                },
                attr:{
                    id:"closeHit",
                    // textContent:"CLOSE X",
                    resizeElement:false
                },
                rosetta:{
                    parentNode:stage
                }
            }).render();

            var groupedHeadline = R.create("div").set({
                css:{
                    width:728,
                    height:180,
                    backgroundImage:"grouped_headline.png",
                    top:0,
                    left:0,
                    zIndex:200,
                    cursor:"pointer",
                    pointerEvents:"auto",
                    backgroundSize: "contain",
                },
                attr:{
                    id:"groupedHeadline",
                    resizeElement:false
                },
                rosetta:{
                    parentNode:stage
                }
            }).render();

            var expandedBgImage = R.create('div').set({
                css: {
                    width: 728,
                    height: 180,
                    // backgroundImage: 'CNVR_PersonalizedAds_FINAL_728x180_retina.jpg',
                    // backgroundColor:"#000000",
                    top: 0,
                    zIndex:350,
                    backgroundSize: "contain",
                    pointerEvents: "auto",
                    cursor: "pointer",
                },
                rosetta: {
                    parentNode: stage,
                },
                data: {
                    hitIndex: 2
                },
                attr:{
                    id:"url"
                },
            }).render();

            var videoPlayerCont = R.create('div').set({
                css: {
                    width:282,
                    height:160,
                    left:335,
                    top:10,
                    zIndex:400,
                    backgroundColor:"#FFFFFF"
                },
                rosetta: {
                    parentNode: stage,
                },
                attr:{
                    id:"videoPlayerCont"
                },
            }).render();

                        var vidPlayer = R.create("default_video_player").set({
                            videoWidth:282,
                            videoHeight:160,
                            top:0,
                            left:0,
                            videoSource: {
                                mp4:"Power_of_Conversant_30.mp4",
                                // ogg:""
                            },
                            posterImage: "1083CI_CNVR_expandable_poster_image.jpg",
                            videoZIndex:200,
                            playerID:"video_player",
                            overlayID:"video_overlay",
                            controlsID:"video_controls",
                            videoDirectoryType: "shared",
                            posterDirectoryType: "shared",
                            parentNode:videoPlayerCont,
                            analyticsName:"1083CI_CNVR_expandable_728x90"
                        }).render({
                            success:function(){
                                log("video loaded")
                                vidPlayer.player.mute();
                            },
                            fail:function(inst){
                                log("video failed")
                                log(inst.failReason);
                            }
                        });

            /* [END_CREATE_ELEMENTS] */
            creativeReady()

            // All Animation goes here
            function animateElements() {
                /* [START_ANIMATE_ELEMENTS] */

                console.log("updated 3:13");

//F1 OPEN SET POSITIONING/////////////////////////////////////////////////

                stageBlock.display = "none";

                setPositioning();

                function setPositioning(){

                    TweenMax.set(expandedBgImage.element,{autoAlpha:0});
                    TweenMax.set(collapsedCont.element,{height:90});
                    TweenMax.set(videoPlayerCont.element,{height:0});
                    // TweenMax.set(cta_F1.element,{width:0});
                    TweenMax.set(cta_F2.element,{width:0});
                    // TweenMax.set(f2_closeImage.element,{opacity:0});
                    TweenMax.set([closeHit.element,closeButton.element],{autoAlpha:0});
                    TweenMax.set(groupedHeadline.element,{autoAlpha:0});
                    TweenMax.set(expandHit.element,{autoAlpha:0});

                };


//F1 ANIMATION////////////////////////////////////////////////////////////

                var tlOpen = new TimelineMax();
                tlOpen.to(stageBlockFade.element,.5,{autoAlpha:0});
                tlOpen.from(logo.element,1,{x:-10, opacity:0, ease:"Power4.easeOut"},0);
                tlOpen.from(cta_F1.element,2,{opacity:0,  /*width: 400,*/ x:-15, ease:"Power4.easeOut"},1.1);
                tlOpen.set(expandHit.element,{autoAlpha:1},"-=1.7");

                var F1_copy = [
                    copy_1.element,
                    copy_2.element,
                    copy_3.element,
                ];

                var F1_copy2  = [
                    copy_4.element,
                    copy_5.element,
                    copy_6.element,
                    copy_7.element
                ];

                var tlF1Copy = new TimelineMax();
                tlF1Copy.set(F1_copy,{x:0});
                tlF1Copy.staggerFrom(F1_copy,.4,{opacity:0, x:-10, ease:"Power4.easeOut"},.2);
                tlF1Copy.staggerFrom(F1_copy2,.4,{opacity:0, x:-10, ease:"Power4.easeOut", delay:.3},0.2);

//EVENTS////////////////////////////////////////////////////////////////////

                //collapsed state clicks
                collapsedHit.on("click", clickOut);
                expandHit.on("click", expandCreative);

                //expanded state clicks
                closeHit.on("click", collapseCreative);
                expandedBgImage.on("click", clickOut);

                var tl;

//F1 EXPAND ANIMATION///////////////////////////////////////////////////////

                function expandCreative(){
                        mplx.expandAd();
                        tl = new TimelineMax();
                        tl.to(cta_F1.element, 0.5, {opacity: 0}, 0);
                        // tl.set([F1_copy2, F1_copy], {opacity: 0, x: -232, y: 20});
                        tl.to([F1_copy2, F1_copy], 0.5, {opacity: 0}, 0);
                        tl.to(collapsedCont.element, .5, {height: 180, ease: "Power4.easeInOut"}, 0);
                        tl.to(videoPlayerCont.element, .75, {height: 160, ease: "Power4.easeInOut"}, .5);
                        tl.to(logo.element, .5, {y: 100, ease: "Power4.easeInOut"}, 0);
                        tl.to(logo.element, .5, {x: 137, ease: "Power4.easeInOut"}, .5);
                        tl.to(cta_F2.element, .5, {width: 140, ease: "Power4.easeInOut"}, .5);
                        tl.to(groupedHeadline.element, 0.5, {autoAlpha: 1}, .5);
                        tl.to([closeHit.element, closeButton.element,expandedBgImage.element],.5,{autoAlpha:1});

                };

//F1 COLLAPSE ANIMATION///////////////////////////////////////////////////////

                function collapseCreative(){
                    tl.reverse(1);
                    vidPlayer.player.mute();
                    vidPlayer.player.pause();
                    setTimeout(function(){ mplx.contractAd(); console.log("contract");}, 1000);
                    
                };

                function clickOut(e){

                    adHit(e);
                    // mplx.contractAd();

                    vidPlayer.player.mute();
                    vidPlayer.player.pause();

                    TweenMax.set(collapsedCont.element, {height: 90});
                    TweenMax.set(logo.element,{opacity:1});
                    TweenMax.set(cta_F1.element,{opacity:1});
                    TweenMax.set(F1_copy,{opacity:1});
                    TweenMax.set(F1_copy2,{opacity:1});
                    TweenMax.set([closeHit.element, closeButton.element,expandedBgImage.element],{autoAlpha:0});
                    TweenMax.set(logo.element, {y:0, x:0});
                    TweenMax.set(groupedHeadline.element, {opacity: 0});
                    TweenMax.set(videoPlayerCont.element,{height: 0});
                    TweenMax.set(cta_F2.element, {width: 0});
                };

                /* [END_ANIMATE_ELEMENTS] */
            }
        }

        function adHit(e) {

            mplx.contractAd();
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
			window.open(mplx.mpck + "&ck=" + index);
			mplx.contractAd();
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