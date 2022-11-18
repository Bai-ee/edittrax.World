(function() {
    "use strict";
    var win = window;
    var creatives = (win._$OGO$_ || (win._$OGO$_ = {})) &&  (win._$OGO$_.Rosetta || (win._$OGO$_.Rosetta = {})) && (win._$OGO$_.Rosetta.creatives || (win._$OGO$_.Rosetta.creatives = []));
    var Rosetta = win._$OGO$_.Rosetta;
    var require =  Rosetta.requirejs || require;

    function Creative(dmo){
        /* [START_CUSTOM_VARIABLES] */

//CUSTOM
      var clickTracker = window.conversant.mobile.clickTag;
      var landingPage = "https://ad.doubleclick.net/ddm/trackclk/N356801.2209901CONVERSANT/B22385522.241705770;dc_trk_aid=438366074;dc_trk_cid=113083121;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=" + Math.floor(Math.random() * 100000000000);
      var redirectUrl = (clickTracker) ? clickTracker + encodeURIComponent(landingPage) : landingPage;

      var clickTracker = window.conversant.mobile.clickTag;
      var landingPage2 = "https://ad.doubleclick.net/ddm/trackclk/N356801.2209901CONVERSANT/B22385522.241705770;dc_trk_aid=438366074;dc_trk_cid=113083121;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=" + Math.floor(Math.random() * 100000000000);
      var redirectUrl2 = (clickTracker) ? clickTracker + encodeURIComponent(landingPage2) : landingPage2;
      
      var clickTracker = window.conversant.mobile.clickTag;   
      var landingPage3 = "https://ad.doubleclick.net/ddm/trackclk/N356801.2209901CONVERSANT/B22385522.241705770;dc_trk_aid=438366074;dc_trk_cid=113083121;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=" + Math.floor(Math.random() * 100000000000);
      var redirectUrl3 = (clickTracker) ? clickTracker + encodeURIComponent(landingPage3) : landingPage3;
//

        /* Pick your treatment style by entering 'true' without quotes into only 1 of the 2 options below,
         entering 'false' without quotes for the other: */
        var isSmartPhoneGallery = true,
            isSmartPhoneGalleryPulldown = false,

        /* CTA Button Vars -- if no CTA buttton desired, leave 'textcontent' blank */
            ctaVar = {
                fontFamily: 10101,
                fontSize: 12,
                color: "#ffffff",
                textContent: "",
                backgroundColor: "#58595b",
                url:""
            },

        /* Border Radius Var -- Affects CTA button, Social media CTA button, and bottom corners of Pulldown Tab */
            borderRadiusVar = 5,

        /*
         Image Gallery Vars -- Min 2, Max 4. Comment out, delete, or leave the "image" value blank for whichever you don't use.
         */
            galleryImages = [
                {
                    analyticsName:"",
                    image:"cat_img1.jpg",
                    url:redirectUrl
                },
                {
                    analyticsName:"",
                    image:"cat_img2.jpg",
                    url:redirectUrl2
                },
                {
                    analyticsName:"",
                    image:"cat_img3.jpg",
                    url:redirectUrl3
                }
              
            ],

        /* Social Media Icon Vars -- Min 0, Max 4. Comment out, delete, or leave the "image" value blank for whichever you don't use.
         For each social media element you use, be sure to include its name in the "name" field.
         */
            socialMediaIcons = [
               
            ],

        /* Background Vars */
            backgroundColorVar = "#ffffff",
            backgroundImageVar = "bg.png",

        /* Headline/Subhead Text Vars: Leave "textContent" blank if you don't want them to appear */
            headlineTextVar = {
                fontFamily: 10746,
                fontSize: 16,
                lineHeight: 1,
                color: "#ffffff",
                textContent:""
            },
            subheadTextVar = {
                fontFamily: 10746,
                width:300,
                fontSize: 12,
                lineHeight: 1,
                marginTop: 6,
                color: "#ffffff",
                textContent:""
            },

        /* Pulldown Tab Vars */
            pulldownTabVar = {
                fontFamily:12617,
                fontSize:12,
                color:"",
                textContent:"VIDEO", /* Max character for the pulldown is 14 */
                backgroundColor:"#58595b",
            },

        /* Swipe Image Vars */
            swipeImageVar = {
                backgroundImage:"swiper.png",
                width:120,
                height:109,
                top: 200,
                left: 100
            },

        /* Social Media CTA Button Vars */
            socialMediaCTAVar = {
                fontFamily: 10746,
                fontSize: 12,
                color:"#ffffff",
                textContent: "Connect with us!",
            },

        /* NDot Vars */
            nDotVar = {
                activeBackgroundColor:"#bbbbbb",
                inactiveBackgroundColor:"#ffffff"
            };


        
        /* [END_CUSTOM_VARIABLES] */

        var registeredCallbacks = [], environStatuses = [],environTotals = 3, isEnvironReady = false, isCreativeReady = false;
        var R, Platform, Settings, Analytics, AnalyticsContent, TweenMax, TweenLite, TimelineLite, TimelineMax, EventForwarding, Hammer;

        var ROSETTA_VERSION = "4.40";
        var context = String(ROSETTA_VERSION + "_"  + dmo.embedId).split("_").join(".");
        var parentDiv, stage, animate, timeoutTimer, startTimer, FOF_PIXEL_DENSITY;
        var evergreenImg = "evergreen.jpg";
        var CENTER_STAGE = true;

        function init(wrapperID) {
            var subdirectory = "148194OPS_Filmstrip_gallery";
            var creativeName = "" || subdirectory;
            var companyID = "18675";
            var isSecure = (dmo.externalURL.indexOf("https:") > -1);



            var config = {
                context: context,
                waitSeconds: 5,
                paths: {},
                bundles: {
                    "Rosetta":["core.pack","tweenmax.pack","hammer.pack","filters.pack","ad.pack","alignmentgroup.pack","rotatorslide.pack","ndots.pack","cnvr.usweb.pack","cnvr.bolt.pack"]
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
                        FOFVersion: R.create("var").set({name:"fof_version", dataType:"String", defaultValue:"4.0.1", exposed:false}).render().value(),
                        isSecure: R.create("var").set({name:"dtm_secure", dataType:"Boolean", defaultValue:Platform.fetch().isSecure, exposed:false}).render().value(),
                        analytics: null,
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
                l:R.create("div").set({width:"1px", height:height, backgroundColor:borderColor, left:0, top:0, zIndex:501,  pointerEvents:"none", parentNode:stage}).render(),
                r:R.create("div").set({width:"1px", height:height, backgroundColor:borderColor, right:0, top:0, zIndex:501, pointerEvents:"none",parentNode:stage}).render(),
                t:R.create("div").set({width:width, height:"1px", backgroundColor:borderColor, left:0, top:0, zIndex:501, pointerEvents:"none", parentNode:stage}).render(),
                b:R.create("div").set({width:width, height:"1px", backgroundColor:borderColor, left:0, bottom:0, zIndex:501, pointerEvents:"none", parentNode:stage}).render()
            };

            //apply CSS reset to stage class
            R.applyCSSReset(".stage");

            /* [START_CREATE_ELEMENTS] */

            if(isSmartPhoneGalleryPulldown == true){

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

                /* Pulldown Tab */
                var pulldownTab = R.create("div").set({
                    css:{
                        backgroundColor:pulldownTabVar.backgroundColor,
                        width:140,
                        height:25,
                        fontSize:pulldownTabVar.fontSize,
                        color:pulldownTabVar.color,
                        fontFamily:pulldownTabVar.fontFamily,
                        top:0,
                        left:90,
                        textAlign:"center",
                        verticalAlign:"middle",
                        backgroundPosition:"50% 50%",
                        cursor:"pointer",
                        zIndex:25,
                        pointerEvents:"auto",
                        borderBottomLeftRadius: borderRadiusVar + "px",
                        borderBottomRightRadius: borderRadiusVar + "px"
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
                        width:10,
                        height:10,
                        backgroundImage: "caret.png",
                        backgroundSize:"contain",
                        left:120,
                        top:7
                    },
                    data:{
                        down: true
                    },
                    rosetta:{
                        parentNode: pulldownTab,
                        directoryType: "size"
                    }
                }).render();

                /* CTA Button */
                if (isSmartPhoneGalleryPulldown == true && ctaVar.textContent !== ""){
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
                            pointerEvents:"auto",
                            cursor:"pointer",
                            visibility: "hidden",
                            borderRadius:borderRadiusVar
                        },
                        attr:{
                            textContent: ctaVar.textContent,
                            id: "main_cta"
                        },
                        data:{
                            url: ctaVar.url
                        },
                        rosetta:{
                            resizeElement:false,
                            parentNode:stage
                        }
                    })
                }
            }

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

            /* Image Gallery Container */
            var galleryContainer = R.create("div").set({
                css:{
                    width: 320,
                    height:480,
                    top:-480
                },
                attr:{
                    id:"gallery_container"
                },
                rosetta:{
                    parentNode:stage
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
                autoPlay: true,
                analyticsName:"gallery_rotator"
            })

            /* NDot Section */
            var nDotContainer = R.create("div").set({
                css:{
                    height: 20,
                    top: 450,
                    zIndex: 12
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
                spacing: 4,
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

            if (socialMediaIconsArray.length > 0){
                var socialMediaCTAButton = R.create("div").set({
                    css:{
                        top:432,
                        height:40,
                        width: 120,
                        color:socialMediaCTAVar.color,
                        fontFamily:socialMediaCTAVar.fontFamily,
                        fontSize:socialMediaCTAVar.fontSize,
                        borderRadius:socialMediaCTAVar.borderRadius,
                        textAlign:"center",
                        verticalAlign:"middle",
                        backgroundPosition:"50% 50%",
                        cursor:"pointer",
                        pointerEvents:"auto",
                        padding:3,
                        zIndex: 7,
                        borderRadius:borderRadiusVar,
                        backgroundColor:"rgba(0,0,0,.5)"
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

            var MustLoadBatch = R.create("batch").add([galleryImagesArray, nDotContainer])
                .add(socialMediaIconsArray)
                .require(nDotContainer)
                .require(galleryImagesArray, 2)
                .render({
                    success: function(){
                        var galleryImagesSuccess = R.filter.success(galleryImagesArray);
                        console.log("Number of gallery images successfully loaded is: " + galleryImagesSuccess.length + " out of " + galleryImagesArray.length + ".");

                        galleryImgRotator.set({
                            elements:galleryImagesSuccess
                        }).render();

                        /* below calculations determine the relative widths and positions
                         of the CTA and social media CTA buttons */
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
                                        visibility: "visible",
                                        zIndex:6
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

                        nDots.set({
                            maxElements: galleryImagesSuccess.length
                        }).render();

                        console.log("All required elements loaded. Creative ready.")
                        creativeReady();
                    },
                    fail: function () {
                        R.fallback();
                        console.log("One or more required elements failed to load.");
                    }
                });

            function socialMediaToggle(){

                stage.off("click", socialMediaToggle);
                galleryImgRotator.off("change", socialMediaToggle);
                if(socialMediaCTAButton.data.visibleState == false){
                    Analytics.fire({event: "click", instance: socialMediaCTAButton, currentInstance:socialMediaCTAButton, details:""});
                    socialMediaCTAButton.data.visibleState = true;
                    TweenMax.set(socialMediaContainer.element, {scale:1});
                    TweenMax.to(socialMediaContainer.element, .3, {alpha:1, top:395, ease:"Sine.easeIn"});
                    stage.on("click", socialMediaToggle);
                    galleryImgRotator.on("change", socialMediaToggle);
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
                TweenMax.set(socialMediaContainer.element, {scale:0});
                if(isSmartPhoneGalleryPulldown == true){
                    pulldownTab.on("click", function(){
                        Analytics.fire({event: "click", instance: pulldownTab, currentInstance:pulldownTab, details:""});
                        if(caret.data.down == false){
                            caret.data.down = true;
                            TweenMax.set(caret.element, {rotation:0});
                            TweenMax.to(galleryContainer.element, .25, {top:-480, ease:"Sine.easeIn"});
                            if(ctaButton){
                                TweenMax.to(ctaButton.element, .25, {top:432, ease:"Sine.easeIn"});
                            }
                            TweenMax.to(bgImg.element, .25, {top:0, ease:"Sine.easeIn"});
                            TweenMax.to(textContainer.element, .25, {top:60, ease:"Sine.easeIn"});
                            TweenMax.to(swipeImage.element, .1, {opacity:0, ease:"Sine.easeIn"});
                            TweenMax.to(swipeImageBackground.element, .1, {opacity:0, zIndex:0, ease:"Sine.easeIn"});
                            if(socialMediaCTAButton){
                                TweenMax.to(socialMediaCTAButton.element, .1, {backgroundColor:"rgba(0,0,0,.5)", ease:"Sine.easeIn"});
                            }
                        } else {
                            caret.data.down = false;
                            TweenMax.set(caret.element, {rotation:180});
                            TweenMax.set(swipeImage.element, {opacity:1});
                            TweenMax.set(swipeImageBackground.element, {opacity:.8, zIndex:19});
                            TweenMax.to(swipeImage.element, .25, {opacity:0, delay:1, ease:"Sine.easeIn"});
                            TweenMax.to(swipeImageBackground.element, .25, {opacity:0, zIndex:0, delay:1, ease:"Sine.easeIn"});
                            if(socialMediaCTAButton){
                                TweenMax.to(socialMediaCTAButton.element, .25, {backgroundColor:"rgba(0,0,0,0)", ease:"Sine.easeIn"});
                                TweenMax.to(socialMediaCTAButton.element, .25, {backgroundColor:"rgba(0,0,0,.5)", delay:1, ease:"Sine.easeIn"});
                            }
                            TweenMax.to(galleryContainer.element, .25, {top:0, ease:"Sine.easeIn"});
                            if(ctaButton){
                                TweenMax.to(ctaButton.element, .25, {top:912, ease:"Sine.easeIn"});
                            }
                            TweenMax.to(bgImg.element, .25, {top:480, ease:"Sine.easeIn"});
                            TweenMax.to(textContainer.element, .25, {top:540, ease:"Sine.easeIn"});
                        }

                    });
                } else {
                    TweenMax.set(galleryContainer.element, {top:0, ease:"Sine.easeIn"});
                    TweenMax.to(swipeImage.element, .25, {opacity:0, delay:1, ease:"Sine.easeIn"});
                    TweenMax.to(swipeImageBackground.element, .25, {opacity:0, zIndex:0, delay:1, ease:"Sine.easeIn"});
                    if(socialMediaCTAButton){
                        TweenMax.to(socialMediaCTAButton.element, .25, {backgroundColor:"rgba(0,0,0,.5)", delay:1, ease:"Sine.easeIn"});
                    }
                }


                
                    
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