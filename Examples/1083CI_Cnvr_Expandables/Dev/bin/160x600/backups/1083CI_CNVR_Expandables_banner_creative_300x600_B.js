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
        var CENTER_STAGE = false

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
                    "Rosetta":["core.pack","tweenmax.pack","ad.pack","alignmentgroup.pack","cnvr.usweb.pack","cnvr.mojo.pack","video.pack","hammer.pack","fontface.pack"]
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
                    placementWidth:Number(dmo.mediaWidth) || 300,
                    placementHeight:Number(dmo.mediaHeight) || 600,
                    clientID:dmo.companyId || companyID
                });
                R.setFallback(fallback);

                if (R.isCompatible == true) {
                    R.parseParameters(dmo.flashVars, 'flashvars');
                    Platform.overwrite({
                        clientID: R.create("var").set({name:"company_id", dataType:"String", defaultValue:Platform.fetch().clientID}).render().value(),
                        cacheBuster: R.create("var").set({name:"bypass_cache", dataType:"Boolean", defaultValue:false, exposed:false}).render().value(),
                        subdirectory:R.create("var").set({name:"subdirectory", dataType:"String", defaultValue:subdirectory}).render().value(),
                        FOFVersion: R.create("var").set({name:"fof_version", dataType:"String", defaultValue:"", exposed:false}).render().value(),
                        isSecure: R.create("var").set({name:"dtm_secure", dataType:"Boolean", defaultValue:Platform.fetch().isSecure, exposed:false}).render().value(),
                        analytics: (window["mplx"] && window["mplx"].SVEvent),
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

            stage = R.create("div").set({id:"stage", width: width, height: height, backgroundColor:"#FFFFFF", right:0});
            parentDiv.appendChild(stage.element);
            Settings.overwrite({stage: stage});
            new EventForwarding().init({stage:stage});
            var borders = {
                l:R.create("div").set({width:"0px", height:height, backgroundColor:borderColor, left:0, top:0, zIndex:501,  pointerEvents:"none", parentNode:stage}).render(),
                r:R.create("div").set({width:"0px", height:height, backgroundColor:borderColor, right:0, top:0, zIndex:501, pointerEvents:"none",parentNode:stage}).render(),
                t:R.create("div").set({width:width, height:"0px", backgroundColor:borderColor, left:0, top:0, zIndex:501, pointerEvents:"none", parentNode:stage}).render(),
                b:R.create("div").set({width:width, height:"0px", backgroundColor:borderColor, left:0, bottom:0, zIndex:501, pointerEvents:"none", parentNode:stage}).render()
            };

            R.applyCSSReset("stage");

            /* [START_CREATE_ELEMENTS] */
            /* var hit_area = R.create("div").set({id:"ad_hit", width: width, height: height, pointerEvents: "auto", cursor: "pointer", zIndex:100, parentNode:stage});
            hit_area.on("click", adHit); */
         var stageBlock = R.create('div').set({
                css: {
                    width: 160,
                    height: 600,
                    cursor: 'pointer',
                    backgroundColor:"#FFFFFF",
                    top: 0,
                    left:140,
                    zIndex:560,
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
                    width: 160,
                    height: 600,
                    cursor: 'pointer',
                    backgroundColor:"#FFFFFF",
                    top: 0,
                    left:140,
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
                    width: 160,
                    height: 600,
                    // backgroundImage: 'bg_img.png',
                    // backgroundColor:"#000000",
                    top: 0,
                    right:0,
                    zIndex:100,
                    backgroundSize: "cover",
                    cursor: "pointer",
                    pointerEvents: "auto",
                    position:"absolute",

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

            var bg_F1 = R.create('div').set({
                css: {
                    width: 560,
                    height: 600,
                    backgroundImage: 'bg_img.png',
                    // backgroundColor:"#000000",
                    top: 0,
                    right:0,
                    zIndex:100,
                    backgroundSize: "cover",
                },
                rosetta: {
                    parentNode: collapsedCont,
                },
                data: {
                },
                attr:{
                    id:"collapsedCont"
                },
            }).render();

            var collapsedHit = R.create("div").set({
                css:{
                    width:300,
                    height:600,
                    // backgroundColor:"#000000.5",
                    top: 0,
                    right:0,
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
                    top:304,
                    right:0,
                    zIndex:5600,
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
                    width: 300,
                    height: 600,
                    backgroundImage: 'logo_img_expanded_3.png',
                    // backgroundColor:"#00FF00",
                    top: 93,
                    left:78,
                    zIndex:201,
                    backgroundSize: "cover",
                    pointerEvents: "none",
                    cursor: "pointer",
                    overflow:"visible",
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

//F1_CTA/////////////////////////////////////////////////

            //IMAGE//////////////////////////////////////
            // var cta_F1 = R.create('div').set({
            //     css: {
            //         width: 560,
            //         height: 560,
            //         backgroundImage: 'CTA_560x600.png',
            //         // backgroundColor:"#00FF00",
            //         top: 0,
            //         zIndex:201,
            //         backgroundSize: "cover",
            //         pointerEvents: "none",
            //         cursor: "pointer",
            //     },
            //     rosetta: {
            //         parentNode: stage,
            //     },
            //     data: {
            //         // hitIndex: 2
            //     },
            //     attr:{
            //         id:"cta_F1"
            //     },
            // }).render();

            //FOF//////////////////////////////////////
            // var cta_F1 = R.create("div").set({
            //     css:{
            //         borderColor:"#000000",
            //         borderStyle: "solid",
            //         borderRadius:3,
            //         borderWidth:1,
            //         width:179,
            //         height:40,
            //         backgroundColor:"#e94f3d",
            //         backgroundImage:"Close_Button.png",
            //         color:"#FFFFFF",
            //         textAlign:"center",
            //         verticalAlign:"middle",
            //         fontSize:12,
            //         fontFamily:10746,
            //         top:26,
            //         left:553,
            //         zIndex:300,
            //         cursor:"pointer",
            //         pointerEvents:"auto",
            //         padding: 10
            //     },
            //     attr:{
            //         id:"cta_F1",
            //         textContent:"Click to Expand",
            //         // resizeElement:false
            //     },
            //     rosetta:{
            //         parentNode:stage
            //     }
            // }).render();

            //WEB FONT///////////////////////////////////
            var cta_F1 = R.create("div").set({
                css:{
                    borderColor:"#FFFFFF",
                    // backgroundColor:"#FFFFFF",
                    color:"#FFFFFF",
                    borderStyle: "solid",
                    borderRadius:3,
                    borderWidth:1,
                    width:109,
                    // height:2,
                    // backgroundImage:"Close_Button.png",
                    textAlign:"center",
                    // verticalAlign:"middle",
                    fontSize:12,
                    // fontFamily:10746,
                    fontFamily:"Helvetica",
                    top:304,
                    left:160,
                    zIndex:100,
                    cursor:"pointer",
                    pointerEvents:"auto",
                    padding: 6,
                    textContent:"Click to Expand",
                    // paddingTop:9,
                    // paddingBottom:9,
                    // paddingLeft:10,
                    // paddingRight:10,

                },
                attr:{
                    id:"cta_F1",
                    // resizeElement:false
                    textType:"NoFormatText"
                },
                rosetta:{
                    parentNode:stage
                }
            }).render();

            var cta_F1_hover_cont = R.create("div").set({
                css:{
                    // backgroundColor:"#000000",
                    bottom:268,
                    width:116,
                    height:0,
                    // top:300,
                    left:160,
                    zIndex:510,
                    cursor:"pointer",
                    pointerEvents:"auto",
                    overflow:"hidden",
                    position:"absolute",
                },
                attr:{
                    id:"cta_F1_hover_cont",
                },
                rosetta:{
                    parentNode:stage
                }
            }).render();

                    var cta_F1_after = R.create("div").set({
                        css:{
                            borderColor:"#FFFFFF",
                            backgroundColor:"#FFFFFF",
                            color:"#3170b7",
                            borderStyle: "solid",
                            borderRadius:3,
                            borderWidth:1,
                            width:109,
                            textAlign:"center",
                            fontSize:12,
                            fontFamily:"Helvetica",
                            bottom:0,
                            left:0,
                            zIndex:100,
                            cursor:"pointer",
                            pointerEvents:"auto",
                            padding: 6,
                            textContent:"Click to Expand",
                            opacity:1,
                            position:"absolute",
                            // backgroundSize:"109 0",


                        },
                        attr:{
                            id:"cta_F1_after",
                            // resizeElement:false
                            textType:"NoFormatText"
                        },
                        rosetta:{
                            parentNode:cta_F1_hover_cont
                        }
                    }).render();

//F1 COPY////////////////////////////////////

            var copy_1 = R.create('div').set({
                css: {
                    width: 160,
                    height: 600,
                    backgroundImage: 'Speak.png',
                    // backgroundColor:"#00FF00",
                    top: 0,
                    left:140,
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
                    width: 160,
                    height: 600,
                    backgroundImage: 'to.png',
                    // backgroundColor:"#00FF00",
                    top: 0,
                    left:140,
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
                    width: 160,
                    height: 600,
                    backgroundImage: 'them_v2.png',
                    // backgroundColor:"#00FF00",
                    top: -48,
                    left:77,
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
                    width: 160,
                    height: 600,
                    backgroundImage: 'like.png',
                    // backgroundColor:"#00FF00",
                    top: 0,
                    left:140,
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
                    width: 160,
                    height: 600,
                    backgroundImage: 'you.png',
                    // backgroundColor:"#00FF00",
                    top: 0,
                    left:140,
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
                    width: 160,
                    height: 600,
                    backgroundImage: 'know.png',
                    // backgroundColor:"#00FF00",
                    top: 0,
                    left:140,
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
                    width: 160,
                    height: 600,
                    backgroundImage: 'them.png',
                    // backgroundColor:"#00FF00",
                    top: 0,
                    left:140,
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

            var cta_F2_Hit = R.create("div").set({
                css:{
                    width:109,
                    height:32,
                    // backgroundColor:"#000000.5",
                    top:410,
                    left:30,
                    zIndex:900,
                    cursor:"pointer",
                    pointerEvents:"auto"
                },
                attr:{
                    id:"cta_F2_Hit",
                },
                data: {
                    hitIndex: 2
                },
                rosetta:{
                    parentNode:stage
                }
            }).render();

            //F2 FONT CONTAINER GREEN
            var cta_F2 = R.create('div').set({
                css: {
                    width: 300,
                    height: 600,
                    // backgroundImage: 'CTA.png',
                    // backgroundColor:"#00FF00",
                    top: 0,
                    left:0,
                    zIndex:401,
                    // backgroundSize: "cover",
                    pointerEvents: "none",
                    cursor: "pointer",
                },
                rosetta: {
                    parentNode: stage,
                },
                data: {
                    hitIndex: 2
                },
                attr:{
                    id:"cta_F2"
                },
            }).render();

                    //web font
                    var cta_F2_text = R.create("div").set({
                        css:{
                            borderColor:"#FFFFFF",
                            // backgroundColor:"#FFFFFF",
                            color:"#FFFFFF",
                            borderStyle: "solid",
                            borderRadius:3,
                            borderWidth:1,
                            width:109,
                            textAlign:"center",
                            fontSize:12,
                            fontFamily:"Helvetica",
                            top:390,
                            left:-105,
                            zIndex:100,
                            cursor:"pointer",
                            pointerEvents:"auto",
                            padding: 5,
                            textContent:"Find Out How",
                            position:"absolute",
                        },
                        attr:{
                            id:"cta_F2_text",
                            // resizeElement:false
                            textType:"NoFormatText"
                        },
                        rosetta:{
                            parentNode:cta_F2
                        }
                    }).render();

                                var cta_F2_hover_cont = R.create("div").set({
                                css:{
                                    // backgroundColor:"#000000.5",
                                    bottom:0,
                                    width:116,
                                    height:0,
                                    // top:28,
                                    left:0,
                                    zIndex:510,
                                    cursor:"pointer",
                                    pointerEvents:"auto",
                                    overflow:"hidden",
                                    position:"absolute",
                                    opacit:.5
                                },
                                attr:{
                                    id:"cta_F2_hover_cont",
                                },
                                rosetta:{
                                    parentNode:cta_F2_text
                                }
                            }).render();

                                    var cta_F2_after = R.create("div").set({
                                        css:{
                                            borderColor:"#FFFFFF",
                                            backgroundColor:"#FFFFFF",
                                            color:"#3170b7",
                                            borderStyle: "solid",
                                            borderRadius:3,
                                            borderWidth:1,
                                            width:109,
                                            textAlign:"center",
                                            fontSize:12,
                                            fontFamily:"Helvetica",
                                            bottom:-1,
                                            left:-1,
                                            zIndex:100,
                                            cursor:"pointer",
                                            pointerEvents:"auto",
                                            padding: 5,
                                            textContent:"Find Out How",
                                            opacity:1,
                                            position:"absolute",
                                            // backgroundSize:"109 0",
                                        },
                                        attr:{
                                            id:"cta_F2_after",
                                            // resizeElement:false
                                            textType:"NoFormatText"
                                        },
                                        rosetta:{
                                            parentNode:cta_F2_hover_cont
                                        }
                                    }).render();


                        //                                     //web font
                        // var cta_F2_text_cont = R.create("div").set({
                        //     css:{
                        //         backgroundColor:"#FFFFFF",
                        //         width:109,
                        //         bottom:0,
                        //         height:0,
                        //         // top:0,
                        //         left:0,
                        //         zIndex:100,
                        //     },
                        //     attr:{
                        //         id:"cta_F2_text_cont",
                        //     },
                        //     rosetta:{
                        //         parentNode:cta_F2
                        //     }
                        // }).render();

            var closeButton = R.create("div").set({
                css:{
                    width:300,
                    height:600,
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
                    right:0,
                    zIndex:550,
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
                    width:300,
                    height:600,
                    backgroundImage:"grouped_headline_300x600.png",
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

    //         top: -49px;
    // left: -246px;

            var expandedBgImage = R.create('div').set({
                css: {
                    width: 560,
                    height: 600,
                    // backgroundImage: 'CNVR_PersonalizedAds_FINAL_560x600_retina.jpg',
                    // backgroundColor:"#000000",
                    top: 0,
                    zIndex:450,
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
                    id:"expandedBgImage"
                },
            }).render();

            var videoPlayerCont = R.create('div').set({
                css: {
                    width:277,
                    height:158,
                    right:10,
                    top:42,
                    zIndex:500,
                    backgroundColor:"#FFFFFF",
                    position:"absolute",
                    overflow:"hidden",
                },
                rosetta: {
                    parentNode: stage,
                },
                attr:{
                    id:"videoPlayerCont"
                },
            }).render();

                        var vidPlayer = R.create("default_video_player").set({
                            videoWidth:277,
                            videoHeight:158,
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
                            analyticsName:"1083CI_CNVR_expandable_560x600",
                            position:"absolute",
                            // display:"none",

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
                             var largeRequiredBatch = R.create("batch")
                                .require(
                                    bg_F1,
                                    copy_1, 
                                    copy_2, 
                                    copy_3, 
                                    copy_4, 
                                    copy_5, 
                                    copy_6, 
                                    copy_7,
                                    stageBlock,
                                    stageBlockFade,
                                    collapsedCont,
                                    collapsedHit,
                                    expandHit,
                                    logo,
                                    cta_F1,
                                    cta_F1_hover_cont,
                                    cta_F1_after,
                                    cta_F2_Hit,
                                    cta_F2,
                                    cta_F2_text,
                                    cta_F2_hover_cont,
                                    cta_F2_after,
                                    closeButton,
                                    closeHit,
                                    groupedHeadline,
                                    expandedBgImage,
                                    videoPlayerCont,
                                    vidPlayer)
                                .add()
                                .success(function() {
                                    creativeReady()
                                    console.log("mega batch success");
                                    // do something ONLY if headline_text has loaded
                                    // AND AFTER subhead_text and bg_img are finished loading
                                })
                                .fail(function() {
                                    console.log("mega batch fail");
                                    R.fallback();
                            }).render();                       

            /* [END_CREATE_ELEMENTS] */
            // creativeReady()

            // All Animation goes here
            function animateElements() {
                /* [START_ANIMATE_ELEMENTS] */

                console.log("updated 112 12:06");

//F1 OPEN SET POSITIONING/////////////////////////////////////////////////

                stageBlock.display = "none";

                setPositioning();

                function setPositioning(){

                    TweenMax.set(expandedBgImage.element,{autoAlpha:0});
                    TweenMax.set(collapsedCont.element,{height:600, pointerEvents:"none"});
                    TweenMax.set(videoPlayerCont.element,{width:0});
                    // TweenMax.set(cta_F1.element,{width:0});
                    TweenMax.set(cta_F2.element,{height:0});
                    // TweenMax.set(f2_closeImage.element,{opacity:0});
                    TweenMax.set([closeHit.element,closeButton.element],{autoAlpha:0});
                    TweenMax.set(groupedHeadline.element,{autoAlpha:0});
                    TweenMax.set(expandHit.element,{autoAlpha:0});

                    TweenMax.set(cta_F2_text.element, {x: 135, y:22});

                    TweenMax.set(logo.element, {scale:.65});


                };

//EVENTS////////////////////////////////////////////////////////////////////

                //collapsed state clicks
                collapsedHit.on("click", clickOut);
                expandHit.on("click", expandCreative);

                //expanded state clicks
                closeHit.on("click", collapseCreative);
                expandedBgImage.on("click", clickOut);
                cta_F2_Hit.on("click", clickOut);

                //hover effects////////////////////////
                expandHit.on("mouseover", hoverOnF1);
                expandHit.on("mouseout", hoverOffF1);
                cta_F2_Hit.on("mouseover", hoverOnF2);
                cta_F2_Hit.on("mouseout", hoverOffF2);

                function hoverOnF1(){
                    console.log("hover on");
                    TweenMax.to(cta_F1_hover_cont.element,.1,{css:{height:40}});
                }
                function hoverOffF1(){
                    // console.log("hover off");
                    // cta_F1.color = "#3170b7";
                    // cta_F1.color = "#3170b7";
                    // cta_F1.backgroundColor="#FFFFFF";
                     TweenMax.to(cta_F1_hover_cont.element,.1,{css:{height:0}});
                }

                function hoverOnF2(){
                    console.log("hover on");
                    // cta_F1.color = "#e94f3d";
                    // cta_F2_text.color = "#FFFFFF";
                    // cta_F2_text.backgroundColor="#3170b7";

                     TweenMax.to(cta_F2_hover_cont.element,.1,{css:{height:40}});

                    
                }
                function hoverOffF2(){
                    // console.log("hover off");
                    // cta_F1.color = "#3170b7";
                    // cta_F2_text.color = "#3170b7";
                    // cta_F2_text.backgroundColor="#FFFFFF";
                      TweenMax.to(cta_F2_hover_cont.element,.1,{css:{height:0}});
                }

//F1 ANIMATION////////////////////////////////////////////////////////////

                var speed = 1.1;

                var tlOpen = new TimelineMax();
                tlOpen.timeScale(speed);
                tlOpen.to(stageBlockFade.element,.5,{autoAlpha:0});
                tlOpen.from(logo.element,1.2,{x:-15, opacity:0, ease:"Power2.easeOut"},0);
                tlOpen.from(cta_F1.element,1.2,{opacity:0,  /*width: 400,*/ x:-15, ease:"Power2.easeOut"},2.8);
                tlOpen.set(expandHit.element,{autoAlpha:1});

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

                var blurElement = {a:1.5};

                var tlF1Copy = new TimelineMax();
                tlF1Copy.set(F1_copy,{x:0});
                tlF1Copy.timeScale(speed);
                tlF1Copy.staggerFrom(F1_copy,1,{opacity:0, x:-5, /*webkitFilter:"blur(" + blurElement.a + "px)"*/},.2);
                tlF1Copy.staggerFrom(F1_copy2,1,{opacity:0, x:-5, ease:"Power2.easeInOut", delay:.1},0.2);

//F1 EXPAND ANIMATION///////////////////////////////////////////////////////

                var tl;

                function expandCreative(){
                        mplx.expandAd();

                        cta_F1.pointerEvents = "none";

                        expandHit.pointerEvents = "none";

                        TweenMax.to(cta_F1_hover_cont.element,.1,{css:{height:0}});

                        tl = new TimelineMax({onReverseComplete:contractOnReverseComplete});
                        tl.timeScale(speed);
                        tl.to([closeHit.element,closeButton.element],.2,{autoAlpha:1},.6);
                        tl.to(cta_F1.element, 0.3, {autoAlpha: 0}, 0);
                        // tl.set([F1_copy2, F1_copy], {opacity: 0, x: -232, y: 20});
                        tl.to([F1_copy2, F1_copy], 0.6, {opacity: 0}, .2);


                        tl.to(collapsedCont.element, .6, {width: 300, ease: "Power2.easeInOut"}, .4);

                        tl.to(videoPlayerCont.element, .85, {width:277, ease: "Power1.easeInOut"}, .5);

                        tl.to(logo.element, .6, {x: -100, y:-13, ease: "Power2.easeInOut"}, .4);
                        tl.to(logo.element, .6, {scale:0.8, ease: "Power1.easeInOut"}, .4);
                        // tl.to(cta_F2_text.element, .6, {y:0, ease: "Power2.easeInOut"}, .4);
                        // tl.to(cta_F2_text.element, .6, {x: 135, y:22,  ease: "Power1.easeInOut"}, .6);

                        tl.to(groupedHeadline.element, 0.7, {autoAlpha: 1}, .9);
                        tl.to(expandedBgImage.element,.2,{autoAlpha:1},.4);

                         tl.to(cta_F2.element,2, {height: 600},0);


                        function contractOnReverseComplete(){
                            mplx.contractAd();
                        };

                };

//F1 COLLAPSE ANIMATION///////////////////////////////////////////////////////

                function collapseCreative(){

                    cta_F1.pointerEvents = "auto";

                    expandHit.pointerEvents = "auto";

                    tl.reverse();
                    vidPlayer.player.mute();
                    vidPlayer.player.pause();
                };

                function clickOut(e){

                    adHit(e);

                    tl.pause(0);

                    vidPlayer.player.mute();
                    vidPlayer.player.pause();

                    cta_F1.pointerEvents = "auto";

                    expandHit.pointerEvents = "auto";

                };

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