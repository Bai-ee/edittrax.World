(function() {
    "use strict";
    var win = window;
    var creatives = (win._$OGO$_ || (win._$OGO$_ = {})) &&  (win._$OGO$_.Rosetta || (win._$OGO$_.Rosetta = {})) && (win._$OGO$_.Rosetta.creatives || (win._$OGO$_.Rosetta.creatives = []));
    var Rosetta = win._$OGO$_.Rosetta;
    var require =  Rosetta.requirejs || require;

    function Creative(dmo){
        /* [START_CUSTOM_VARIABLES] */

        // General Screen - First Frame https://ad.doubleclick.net/ddm/trackclk/N46002.1870853CONVERSANTINC7/B22369018.243655323;dc_trk_aid=440136329;dc_trk_cid=112662041;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=

// Irrigation - Second Frame   https://ad.doubleclick.net/ddm/clk/440135105;243655323;r
// Grain Dryers - Third Frame  https://ad.doubleclick.net/ddm/clk/440043069;243655323;y
// Building Heat - Fourth Frame    https://ad.doubleclick.net/ddm/clk/440134163;243655323;u
// General Ag - Fifth Frame(screen where you have to scroll down to watch video)   https://ad.doubleclick.net/ddm/clk/440043078;243655323;y

//CUSTOM
      var clickTracker = window.conversant.mobile.clickTag;
      var landingPage1 = "https://ad.doubleclick.net/ddm/trackclk/N46002.1870853CONVERSANTINC7/B22369018.243655323;dc_trk_aid=440136329;dc_trk_cid=112662041;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=";
      var redirectUrl1 = (clickTracker) ? clickTracker + encodeURIComponent(landingPage1) : landingPage1;

      var clickTracker = window.conversant.mobile.clickTag;
      var landingPage2 = "https://ad.doubleclick.net/ddm/clk/440135105;243655323;r";
      var redirectUrl2 = (clickTracker) ? clickTracker + encodeURIComponent(landingPage2) : landingPage2;
      
      var clickTracker = window.conversant.mobile.clickTag;   
      var landingPage3 = "https://ad.doubleclick.net/ddm/clk/440043069;243655323;y";
      var redirectUrl3 = (clickTracker) ? clickTracker + encodeURIComponent(landingPage3) : landingPage3;

      var clickTracker = window.conversant.mobile.clickTag;   
      var landingPage4 = "https://ad.doubleclick.net/ddm/clk/440134163;243655323;u";
      var redirectUrl4 = (clickTracker) ? clickTracker + encodeURIComponent(landingPage4) : landingPage4;

      var clickTracker = window.conversant.mobile.clickTag;   
      var landingPage5 = "https://ad.doubleclick.net/ddm/clk/440043078;243655323;y";
      var redirectUrl5 = (clickTracker) ? clickTracker + encodeURIComponent(landingPage5) : landingPage5;
//

        /* Pick your treatment style by entering 'true' without quotes into only 1 of the 3 options below,
         and enter 'false' without quotes for the others: */
        var isSmartPhoneTrailer = false,
            isSmartPhoneTrailerPulldown = false,
            isSmartPhoneTrailerGalleryCombo = true,

        /* CTA button vars */
            ctaVar = {
                fontFamily: 10101,
                fontSize: 12,
                color: "#ffffff",
                textContent: "",
                backgroundColor: "",
                url:""
            },

        /* Video Player Vars */
            videoPlayerVar = {
                source: "57045Overview30sec1080p.mp4",
                posterImage: "Video_Poster.jpg",
                analyticsName:""

                // autoPlay: false
            },

        /* Border Radius Var -- Affects CTA button, Social media CTA button, and bottom corners of Pulldown Tab */
            borderRadiusVar = 5,

        /*
         Image Gallery Vars -- Min 2, Max 4. Comment out, delete, or leave the "image" value blank for whichever you don't use.
         */
            galleryImages = [
                {
                    analyticsName:"Poster",
                    image:"Poster.jpg",
                    url:redirectUrl1
                },
                {
                    analyticsName:"Narrative 1",
                    image:"Narrative_01.jpg",
                    url:redirectUrl2
                },
                {
                    analyticsName:"Narrative 2",
                    image:"Narrative_02.jpg",
                    url:redirectUrl3
                },
                {
                    analyticsName:"Narrative 3",
                    image:"Narrative_03.jpg",
                    url:redirectUrl4
                },


            ],

        /* Social Media Icon Vars -- Min 0, Max 4. Comment out, delete, or leave the "image" value blank for whichever you don't use.
         For each social media element you use, be sure to include its name in the "name" field.
         */
            socialMediaIcons = [
                {
                    analyticsName:"twitter",
                    image:"",
                    url:""
                },
                {
                    analyticsName:"youtube",
                    image:"",
                    url:""
                },
                {
                    analyticsName:"instagram",
                    image:"",
                    url:""
                },
                {
                    analyticsName:"facebook",
                    image:"",
                    url:""
                }
            ],
            

        /* Background Vars */
            backgroundColorVar = "#ffffff",
            backgroundImageVar = "",

        /* Headline/Subhead Text Vars: Leave "textContent" blank if you don't want either element to appear */
            headlineTextVar = {
                fontFamily: 10746,
                fontSize: 16,
                lineHeight: 1,
                color: "#ffffff",
                textContent:""
            },
            subheadTextVar = {
                fontFamily: 10746,
                fontSize: 12,
                lineHeight: 1,
                marginTop: 6,
                color: "#ffffff",
                textContent:""
            },

        /* Video Text Vars: Leave "textContent" blank if you don't want this element to appear */
            videoTextVar = {
                fontFamily: 12618,
                fontSize: 16,
                lineHeight: 1,
                color: "#ffffff",
                textContent:""
            },

        /* Pulldown Tab Vars */
            pulldownTabVar = {
                fontFamily:12618,
                fontSize:12,
                color:"#ffffff",
                textContent:"WATCH THE VIDEO", /* Max character for the pulldown is 14 */
                backgroundColor:""
            },

        /* Social Media CTA Button Vars */
            socialMediaCTAVar = {
                fontFamily: 10101,
                fontSize: 12,
                color:"#ffffff",
                textContent: ""
            },

        /* Swipe Image Vars */
            swipeImageVar = {
                backgroundImage:"swiper.png",
                width:120,
                height:109,
                top: 200,
                left: 100
            },

        /* NDot Vars */
            nDotVar = {
                activeBackgroundColor:"#ffffff",
                inactiveBackgroundColor:"#afaaaa"
            };


        
        /* [END_CUSTOM_VARIABLES] */

        var registeredCallbacks = [], environStatuses = [],environTotals = 2, isEnvironReady = false, isCreativeReady = false;
        var R, Platform, Settings, Analytics, AnalyticsContent, TweenMax, TweenLite, TimelineLite, TimelineMax, EventForwarding, Hammer;

        var context = String("4.20_" +  dmo.embedId).split("_").join(".");
        var parentDiv, stage, animate, timeoutTimer, startTimer, FOF_PIXEL_DENSITY;
        var evergreenImg = "evergreen.jpg";
        var CENTER_STAGE = true

        function init(wrapperID) {
            var subdirectory = "146368OPS_Mobile_FilmStrip";
            var creativeName = "" || subdirectory;
            var companyID = "61677";
            var isSecure = (dmo.externalURL.indexOf("https:") > -1);

            var config = {
                context: context,
                waitSeconds: 5,
                paths: {},
                bundles: {
                    "Rosetta":["core.pack","tweenmax.pack","hammer.pack","filters.pack","ad.pack","alignmentgroup.pack","dataloader.pack","rotatorslide.pack","ndots.pack","spritesheet.pack","video.pack","cnvr.usweb.pack","cnvr.bolt.pack"]
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
            config.paths["Rosetta"] = dmo.externalURL + "/atom/4.20/2.1.0/?scripts=" + "wrapper_start," + config.bundles.Rosetta.join(",") + ",wrapper_end" + dmo.atomSuffix;

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
                        FOFVersion: R.create("var").set({name:"fof_version", dataType:"String", defaultValue:"2.1.6", exposed:false}).render().value(),
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

            var stageBlock = R.create("div").set({
                css:{
                    backgroundColor:"#FFFFFF",
                    left: 0,
                    top: 0,
                    width: width,
                    height: height,
                    zIndex: borders.l.zIndex-1,
                    pointerEvents: "none",
                    cursor: "auto",
                    position: "absolute",
                    visibility: "visible",
                },
                rosetta:{
                    parentNode:stage,
                },
                attr:{
                    id: "stageBlock"
                }
            }).render();

            /* Background Image */
            var bgImg = R.create("div").set({
                css:{
                    width:320,
                    height:480,
                    backgroundImage:backgroundImageVar,
                    backgroundSize:"contain"
                },
                attr:{
                    id: "bg_img"
                },
                rosetta:{
                    parentNode:stage,
                    directoryType: "size"
                }
            }).render();

            /* Video Container */
            var videoContainer = R.create("div").set({
                css:{
                    width: 320,
                    height:480,
                },
                rosetta:{
                    parentNode:stage
                }
            }).render();

            /* Text Container */
            var textContainer = R.create("div").set({
                css:{
                    width:300,
                    left:10,
                    top:60,
                    height:200
                },
                attr:{
                    id:"text_container"
                },
                rosetta:{
                    parentNode: stage
                }
            }).render();


            /* Headline Text (if it exists) */
            var headlineText = R.create("div").set({
                css:{
                    fontSize:headlineTextVar.fontSize,
                    color:headlineTextVar.color,
                    fontFamily:headlineTextVar.fontFamily,
                    textAlign:"center",
                    lineHeight: headlineTextVar.lineHeight,
                    zIndex: 4,
                    width:300,
                    height:100
                },
                attr:{
                    textContent: headlineTextVar.textContent,
                    id: "headline_text"
                },
                rosetta:{
                    parentNode:textContainer
                }
            });

            /* Subhead Text (if it exists) */
            var subheadText = R.create("div").set({
                css:{
                    fontSize:subheadTextVar.fontSize,
                    color:subheadTextVar.color,
                    fontFamily:subheadTextVar.fontFamily,
                    textAlign:"center",
                    marginTop:subheadTextVar.marginTop,
                    width: 300,
                    lineHeight: subheadTextVar.lineHeight,
                    marginTop: subheadTextVar.marginTop,
                    zIndex: 4,
                    height:100
                },
                attr:{
                    textContent: subheadTextVar.textContent,
                    id: "subhead_text"
                },
                rosetta:{
                    parentNode:textContainer
                }
            });

            var textGroup = R.create("AlignmentGroup").set({
                css:{
                    verticalAlign: "top"
                }
            }).add(headlineText)
                .add(subheadText).render();

            /* CTA Button */
            if (ctaVar.textContent !== ""){
                var ctaButton = R.create("div").set({
                    css:{
                        left:5,
                        top:432,
                        width:300,
                        height:40,
                        color:ctaVar.color,
                        backgroundColor:ctaVar.backgroundColor,
                        fontFamily:ctaVar.fontFamily,
                        fontSize:ctaVar.fontSize,
                        textAlign:"center",
                        verticalAlign:"middle",
                        backgroundPosition:"50% 50%",
                        borderRadius: borderRadiusVar,
                        pointerEvents:"auto",
                        cursor:"pointer",
                        zIndex: 13
                    },
                    attr:{
                        textContent: ctaVar.textContent,
                        id: "main_cta"
                    },
                    data:{
                        url: ctaVar.url
                    },
                    rosetta:{
                        resizeElement:false
                    }
                })
            }

            if (isSmartPhoneTrailer == true){
                videoContainer.top = 0;
            } else {

                /* Video Pulldown Background Overlay */
                var pulldownBG = R.create("div").set({
                    css:{
                        //backgroundColor:"rgba(0,0,0,.8)",
                        backgroundImage: "Video_v2.jpg",
                        width:320,
                        height:480,
                        zIndex:25,
                        backgroundSize:"contain",
                        pointerEvents:"auto",
                        cursor:"pointer"            
                    },
                    attr:{
                        id:"pulldown_bg"
                    },
                    rosetta: { parentNode:videoContainer },
                    data: { url: redirectUrl5 }
                }).render().on("click", adHit);

                console.log(pulldownBG.data.hitIndex)



                /* Video Text (if it exists) */
                if(videoTextVar.textContent !== ""){
                    var videoText = R.create("div").set({
                        css:{
                            fontFamily: videoTextVar.fontFamily,
                            fontSize: videoTextVar.fontSize,
                            color:videoTextVar.color,
                            textAlign: "center",
                            width: 300,
                            height:100,
                            top:80,
                            zIndex:7,
                            lineHeight: videoTextVar.lineHeight,
                        },
                        attr:{
                            id:"video_text",
                            textContent:"VIDEO TEXT"
                        },
                        rosetta:{
                            parentNode:videoContainer
                        }
                    });
                    videoText.set({
                        css:{
                            left: (320 - parseFloat(videoText.width) ) / 2
                        }
                    }).render();
                }

                videoContainer.top = -480;

                /* Pulldown Tab */
                var pulldownTab = R.create("div").set({
                    css:{
                        backgroundColor:pulldownTabVar.backgroundColor,
                        width:140,
                        height:25,
                        fontSize:pulldownTabVar.fontSize,
                        color:pulldownTabVar.color,
                        fontFamily:pulldownTabVar.fontFamily,
                        top:433,
                        left:90,
                        textAlign:"center",
                        verticalAlign:"middle",
                        backgroundPosition:"50% 50%",
                        cursor:"pointer",
                        zIndex:220,
                        pointerEvents:"auto",
                        borderBottomLeftRadius: borderRadiusVar + "px",
                        borderBottomRightRadius: borderRadiusVar + "px",
                        overflow:"visible"
                    },
                    attr:{
                        textContent:pulldownTabVar.textContent,
                        id:"pulldown_tab"
                    },
                    rosetta:{
                        resizeElement:false,
                        parentNode:stage
                    }
                }).render();

                /* Pulldown Tab Caret */
                var caret = R.create("div").set({
                    css:{
                        width:24,
                        height:14,
                        backgroundImage: "arrow.png",
                        backgroundSize:"contain",
                        left:60,
                        top:21
                    },
                    attr:{
                        id: "caret",
                        className: ""
                    },
                    data:{
                        down: true
                    },
                    rosetta:{
                        parentNode: pulldownTab,
                        directoryType: "size"
                    }
                }).render();
            }

            if(isSmartPhoneTrailerGalleryCombo == true) {

                /* Image Gallery Container */
                var galleryContainer = R.create("div").set({
                    css:{
                        width: 320,
                        height:480,
                        top:0
                    },
                    rosetta:{
                        parentNode:stage,
                        id:"gallery_container"
                    }
                }).render();

                var galleryImagesArray= [];
                for (var i = 0; i < galleryImages.length; i++) {
                    if(galleryImages[i].image !== ""){
                        if (galleryImages[i].analyticsName.split(" ").join("").length == 0){
                            galleryImages[i].analyticsName = null;
                        }
                        var temp = R.create("div").set({
                            css:{
                                width:320,
                                height:480,
                                backgroundImage:galleryImages[i].image,
                                pointerEvents:"auto",
                                backgroundSize:"cover",
                                analyticsName:galleryImages[i].analyticsName
                            },
                            attr:{
                                id: "gallery_img_" + i
                            },
                            data: {
                                url:  galleryImages[i].url
                            },
                            rosetta:{
                                parentNode:galleryContainer,
                                directoryType: "size"
                            }
                        })
                        galleryImagesArray.push(temp);
                        if (temp.data.url !== ""){
                            temp.on("click", adHit).set({css:{cursor:"pointer"}}).render();
                        }
                    }
                }

                var galleryImgRotator = R.create("rotatorslide").set({
                    transitionDuration: 1,
                    onDuration: 1,
                    container:galleryContainer,
                    autoPlay: false,
                    analyticsName:"gallery_rotator"
                })

                /* NDot Section */
                var nDotContainer = R.create("div").set({
                    css:{
                        height: 20,
                        top: 423,
                        zIndex: 12,
                        overflow:"visible"
                    },
                    attr:{
                        id: "nDotContainer"
                    },
                    rosetta:{
                        parentNode: galleryContainer
                    }
                }).render();

                nDotContainer.set({
                    width: (10 * galleryImagesArray.length)
                }).render();

                nDotContainer.set({
                    left: (320 - parseFloat(nDotContainer.width) )/2
                }).render();

                var nDotBackground = R.create("div").set({
                    css:{
                        width: parseFloat(nDotContainer.width) + 5,
                        height: parseFloat(nDotContainer.height) -6,
                        backgroundColor: "rgba(0,0,0,.5)",
                        top:parseFloat(nDotContainer.top) -4,
                        left:parseFloat(nDotContainer.left) -3,
                        zIndex: 2,
                        borderRadius:8
                    },
                    attr:{
                        id:"n_dot_background"
                    },
                    rosetta:{
                        parentNode:galleryContainer
                    }
                }).render();

                var nDotActive = R.create("div").set({
                    css:{
                        backgroundColor:nDotVar.activeBackgroundColor,
                        borderColor:nDotVar.activeBackgroundColor,
                        pointerEvents:"auto",
                        borderSize:1,
                        borderRadius:3,
                        width:6,
                        height:6
                    },
                    rosetta:{
                        parentNode: nDotContainer
                    }
                }).render();

                var nDotInactive = R.create("div").set({
                    css:{
                        backgroundColor:nDotVar.inactiveBackgroundColor,
                        borderColor:nDotVar.inactiveBackgroundColor,
                        pointerEvents:"auto",
                        borderSize:1,
                        borderRadius:3,
                        width:6,
                        height:6
                    },
                    rosetta:{
                        parentNode: nDotContainer
                    }
                }).render();

                var nDots = R.create("NDots").set({
                    activeElement: nDotActive,
                    inactiveElement: nDotInactive,
                    container: nDotContainer,
                    spacing: 8,
                    direction: "horizontal",
                    alignment: "middle"
                })


                nDots.controlledBy = [galleryImgRotator];
                galleryImgRotator.controlledBy = [nDots];

                /* Swipe Image Section */
                var swipeImage = R.create("div").set({
                    css:{
                        top: swipeImageVar.top,
                        left: swipeImageVar.left,
                        width:swipeImageVar.width,
                        height:swipeImageVar.height,
                        opacity:1,
                        backgroundImage: swipeImageVar.backgroundImage,
                        backgroundSize:"cover",
                        zIndex: 20,
                        pointerEvents:"none"
                    },
                    attr:{
                        id: "swipe_img"
                    },
                    rosetta:{
                        parentNode:galleryContainer,
                        directoryType:"size"
                    }
                }).render();

                var swipeImageBackground = R.create("div").set({
                    css:{
                        width:320,
                        height:480,
                        backgroundColor:"rgba(0,0,0,.8)",
                        zIndex:19
                    },
                    attr:{
                        id:"swipe_img_bg"
                    },
                    rosetta:{
                        parentNode:galleryContainer
                    }
                }).render();
            }

            /* Video Player Configuration */

            var videoObject = R.create("default_video_player").set({
                videoWidth: 302,
                videoHeight: 168,
                videoLeft: 8,
                videoTop: 12,
                videoSource: {
                    mp4:videoPlayerVar.source,
                    ogg:""
                },
                // autoPlay: videoPlayerVar.autoPlay,
                posterImage: videoPlayerVar.posterImage,
                videoZIndex:200,
                playerID:"video_player",
                overlayID:"video_overlay",
                controlsID:"video_controls",
                videoDirectoryType: "size",
                posterDirectoryType: "size",
                analyticsName: videoPlayerVar.analyticsName,
                parentNode:videoContainer
            }).render({
                success:function(){
                    console.log("Video loaded.")
                },
                fail:function(inst){
                    console.log("Video failed.")
                    console.debug(inst.failReason);
                }
            });
            // console.log("videoObject: " + videoObject)

            /* Social Media Section */
            var socialMediaContainer = R.create("div").set({
                css:{
                    opacity:0,
                    top:430,
                    right: 5,
                    zIndex:5
                },
                attr:{
                    id:"socialMediaContainer"
                },
                rosetta:{
                    parentNode:stage
                }
            });

            var socialMediaIconsArray= [];
            for (var i = 0; i < socialMediaIcons.length; i++) {
                if(socialMediaIcons[i].image !== ""){
                    if (socialMediaIcons[i].analyticsName.split(" ").join("").length == 0){
                        socialMediaIcons[i].analyticsName = null;
                    }
                    var temp = R.create("div").set({
                        css:{
                            width:30,
                            height:30,
                            pointerEvents:"auto",
                            backgroundImage:socialMediaIcons[i].image,
                            backgroundSize:"contain",
                            backgroundPosition: "50% 50%",
                            cursor:"pointer",
                            analyticsName:socialMediaIcons[i].analyticsName
                        },
                        attr:{
                            id: socialMediaIcons[i].analyticsName + "_icon"
                        },
                        data: {
                            url:  socialMediaIcons[i].url
                        },
                        rosetta:{
                            directoryType: "size",
                            parentNode: socialMediaContainer
                        }
                    }).render().on("click", adHit);
                    socialMediaIconsArray.push(temp);
                }
            }

            if(socialMediaIconsArray.length > 0){
                var socialMediaCTAButton = R.create("div").set({
                    css:{
                        top:432,
                        height:40,
                        width: 120,
                        color:socialMediaCTAVar.color,
                        fontFamily:socialMediaCTAVar.fontFamily,
                        fontSize:socialMediaCTAVar.fontSize,
                        textAlign:"center",
                        verticalAlign:"middle",
                        backgroundPosition:"50% 50%",
                        cursor:"pointer",
                        pointerEvents:"auto",
                        padding:3,
                        zIndex: 7,
                        borderRadius:borderRadiusVar,
                        //backgroundColor:"rgba(0,0,0,.5)"
                    },
                    attr:{
                        textContent: socialMediaCTAVar.textContent,
                        id: "social_media_cta"
                    },
                    data:{
                        hitIndex:0,
                        visibleState: false
                    },
                    rosetta:{
                        resizeElement:false,
                        parentNode:stage
                    }
                }).render().on("click", socialMediaToggle);
                socialMediaContainer.set({
                    css:{
                        width:250,
                        height:30
                    }
                }).render().on("click", adHit);
            }


            var oneFrameArray = [videoContainer];
            var twoFrameArray = [videoContainer, pulldownTab];
            var TrailerGalleryArray = [stageBlock, videoContainer, pulldownTab, galleryContainer];

            function batchMaker(theArray){
                var MustLoadBatch = R.create("batch")
                    .add(theArray)
                    .add(socialMediaIconsArray)
                    .add(galleryImagesArray)
                    .require(theArray)
                    .render({
                        success: function(){
                            if (isSmartPhoneTrailerGalleryCombo == true){
                                var galleryImagesSuccess = R.filter.success(galleryImagesArray);
                                console.log("Number of gallery images successfully loaded is: " + galleryImagesSuccess.length + " out of " + galleryImagesArray.length + ".");
                                galleryImgRotator.set({
                                    elements:galleryImagesSuccess
                                }).render();
                                nDots.set({
                                    maxElements: galleryImagesSuccess.length
                                }).render();
                                if(ctaButton){
                                    ctaButton.set({
                                        rosetta:{
                                            parentNode:videoContainer
                                        }
                                    });
                                }
                            } else{
                                if(ctaButton){
                                    ctaButton.set({
                                        rosetta:{
                                            parentNode:stage
                                        }
                                    })
                                }
                            }
                            var socialMediaIconsSuccess = R.filter.success(socialMediaIconsArray);
                            console.log("Number of social media icons successfully loaded is: " + socialMediaIconsSuccess.length + " out of " + socialMediaIconsArray.length + ".");
                            for (var i = 0; i<socialMediaIconsSuccess.length; i++){
                                var val = 40 * i;
                                socialMediaIconsSuccess[i].set({
                                    css:{
                                        right: val
                                    }
                                }).render();
                            }
                            /* below calculations determine the relative widths and positions
                             of the CTA and social media CTA buttons */
                            var buttonDiff = 30 / socialMediaIconsSuccess.length;
                            if(ctaButton){
                                if (socialMediaIconsArray.length == 0){
                                    ctaButton.set({
                                        css:{
                                            width:310,
                                            visibility: "visible"
                                        }
                                    }).render().on("click", adHit);
                                } else {
                                    ctaButton.set({
                                        css:{
                                            width: 185,
                                            visibility: "visible",
                                            zIndex: 150
                                        }
                                    }).render().on("click", adHit);
                                }
                            }
                            if(socialMediaCTAButton){
                                socialMediaCTAButton.set({
                                    css:{
                                        right:5
                                    }
                                })
                            }

                            console.log("All required elements loaded. Creative ready.")
                            creativeReady();
                        },
                        fail: function () {
                            R.fallback();
                            console.log("One or more required elements failed to load.");
                        }
                    });
            }

            if (isSmartPhoneTrailer == true){
                batchMaker(oneFrameArray);
            } else if (isSmartPhoneTrailerPulldown == true) {
                batchMaker(twoFrameArray);
            } else if (isSmartPhoneTrailerGalleryCombo == true) {
                batchMaker(TrailerGalleryArray);
            }

            function socialMediaToggle(){
                stage.off("click", socialMediaToggle);
                if(galleryImgRotator){
                    galleryImgRotator.off("change", socialMediaToggle);
                }
                if(socialMediaCTAButton.data.visibleState == false){
                    Analytics.fire({event: "click", instance:socialMediaCTAButton, currentInstance:socialMediaCTAButton, details:""});
                    socialMediaCTAButton.data.visibleState = true;
                    TweenMax.set(socialMediaContainer.element, {scale:1});
                    TweenMax.to(socialMediaContainer.element, .3, {alpha:1, top:395, ease:"Sine.easeIn"});
                    stage.on("click", socialMediaToggle);
                    if(galleryImgRotator){
                        galleryImgRotator.on("change", socialMediaToggle);
                    }
                } else {
                    socialMediaCTAButton.data.visibleState = false;
                    TweenMax.to(socialMediaContainer.element, .3, {alpha:0, top:430, ease:"Sine.easeIn"});
                    TweenMax.to(socialMediaContainer.element, .1, {scale:0, delay: .4});
                }
            };


            /* var hit_area = R.create("div").set({id:"ad_hit", width: width, height: height, pointerEvents: "auto", cursor: "pointer", zIndex:100, parentNode:stage});
             hit_area.on("click", adHit); */

            
            /* var hit_area = R.create("div").set({id:"ad_hit", width: width, height: height, pointerEvents: "auto", cursor: "pointer", zIndex:100, parentNode:stage});
            hit_area.on("click", adHit); */

            /* [END_CREATE_ELEMENTS] */
            //creativeReady()

            // All Animation goes here
            function animateElements() {
                /* [START_ANIMATE_ELEMENTS] */

                TweenMax.to(stageBlock.element, 1, {autoAlpha: 0, ease: 'Power1.easeInOut'});
                
                TweenMax.set(socialMediaContainer.element, {scale:0});
                if(pulldownTab){
                    if(isSmartPhoneTrailerGalleryCombo == true){
                        TweenMax.to(swipeImage.element, .25, {opacity:0, delay:1, ease:"Sine.easeIn"});
                        TweenMax.to(swipeImageBackground.element, .25, {opacity:0, zIndex:0, delay:1, ease:"Sine.easeIn"});
                        if(socialMediaCTAButton){
                            TweenMax.set(socialMediaCTAButton.element, {backgroundColor:"rgba(0,0,0,0)", delay:0});
                            TweenMax.set(socialMediaCTAButton.element, {backgroundColor:"rgba(0,0,0,0)", delay:1});
                        }
                        TweenMax.set(nDotBackground.element, {backgroundColor:"rgba(0,0,0,0)", delay:0});
                        TweenMax.set(nDotBackground.element, {backgroundColor:"rgba(0,0,0,0)", delay:1});
                    }
                    pulldownTab.on("click", function(){
                        Analytics.fire({event: "click", instance: pulldownTab, currentInstance:pulldownTab, details:""});
                        if(caret.data.down == false){
                            caret.data.down = true;
                            TweenMax.set(caret.element, {rotation:0});
                            TweenMax.to(videoContainer.element, .25, {top:-480, ease:"Power3.easeInOut"});
                            if(socialMediaCTAButton){
                                TweenMax.to(socialMediaCTAButton.element, .1, {backgroundColor:"rgba(0,0,0,0)"});
                            }
                            TweenMax.to(nDotBackground.element, .1, {backgroundColor:"rgba(0,0,0,0)"});
                            videoObject.player.pause();
                        } else {
                            caret.data.down = false;
                            TweenMax.set(caret.element, {rotation:180});
                            TweenMax.to(videoContainer.element, .75, {top:0, ease:"Power3.easeOut"});
                            if(socialMediaCTAButton){
                                TweenMax.to(socialMediaCTAButton.element, .1, {backgroundColor:"rgba(0,0,0,0)", delay:.24});
                            }
                            TweenMax.to(nDotBackground.element, .1, {backgroundColor:"rgba(0,0,0,0)", delay:.24});
                        }
                    });
                }


                
                    
                /* [END_ANIMATE_ELEMENTS] */
            }
        }

        function adHit(e) {
            console.log("adHit");
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
                borderThickness:1,
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