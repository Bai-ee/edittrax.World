(function() {
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

        var ROSETTA_VERSION = "4.40";
        var context = String(ROSETTA_VERSION + "_"  + dmo.embedId).split("_").join(".");
        var parentDiv, stage, animate, timeoutTimer, startTimer, FOF_PIXEL_DENSITY;
        var evergreenImg = "evergreen.jpg";
        var CENTER_STAGE = false;

        function init(wrapperID) {
            var subdirectory = "ADS_Global_HY_53562";
            var creativeName = "" || subdirectory;
            var companyID = "62046";
            var isSecure = (dmo.externalURL.indexOf("https:") > -1);



            var config = {
                context: context,
                waitSeconds: 5,
                paths: {},
                bundles: {
                    "Rosetta":["core.pack","ad.pack","cnvr.advantage.pack","cnvr.usweb.pack","filters.pack","tweenmax.pack","fontface.pack","alignmentgroup.pack"]
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
                    placementWidth:Number(dmo.mediaWidth) || 300,
                    placementHeight:Number(dmo.mediaHeight) || 1050,
                    clientID:dmo.companyId || companyID
                });
                R.setFallback(fallback);

                if (R.isCompatible === true) {
                    R.parseParameters(dmo.flashVars, 'flashvars');
                    Platform.overwrite({
                        clientID: R.create("var").set({name:"company_id", dataType:"String", defaultValue:Platform.fetch().clientID}).render().value(),
                        cacheBuster: R.create("var").set({name:"bypass_cache", dataType:"Boolean", defaultValue:false, exposed:false}).render().value(),
                        subdirectory:R.create("var").set({name:"subdirectory", dataType:"String", defaultValue:subdirectory}).render().value(),
                        FOFVersion: R.create("var").set({name:"fof_version", dataType:"String", defaultValue:"2.1.6", exposed:false}).render().value(),
                        isSecure: R.create("var").set({name:"dtm_secure", dataType:"Boolean", defaultValue:Platform.fetch().isSecure, exposed:false}).render().value(),
                        analytics: dmo.logEvent,
                        analyticsScope: dmo
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
                l:R.create("div").set({width:"1px", height:height, backgroundColor:borderColor, left:0, top:0, zIndex:749,  pointerEvents:"none", parentNode:stage}).render(),
                r:R.create("div").set({width:"1px", height:height, backgroundColor:borderColor, right:0, top:0, zIndex:749, pointerEvents:"none",parentNode:stage}).render(),
                t:R.create("div").set({width:width, height:"1px", backgroundColor:borderColor, left:0, top:0, zIndex:749, pointerEvents:"none", parentNode:stage}).render(),
                b:R.create("div").set({width:width, height:"1px", backgroundColor:borderColor, left:0, bottom:0, zIndex:749, pointerEvents:"none", parentNode:stage}).render()
            };

            //apply CSS reset to stage class
            R.applyCSSReset(".stage");

//STAGE BLOCK////////////////////////////////////////
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
///////////////////////////////////////////////////

            
			var headline_text = R.create("div").set({
				css:{
					color: R.create("var").set({name:"headline_text_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
					fontSize: R.create("var").set({name:"headline_text_font_size", defaultValue:"46", dataType:"String", required:false, exposed:true}).render().value(),
					fontFamily: R.create("var").set({name:"headline_text_font_id", defaultValue:"10747", dataType:"Number", required:false, exposed:true}).render().value(),
					fontStyle: "RomanFamily",
					lineHeight: R.create("var").set({name:"headline_text_line_height", defaultValue:"1.07", dataType:"String", required:false, exposed:true}).render().value(),
					letterSpacing: R.create("var").set({name:"headline_text_tracking", defaultValue:"1.15", dataType:"String", required:false, exposed:true}).render().value(),
					textAlign: "center",
					verticalAlign: "middle",
					marginTop: 10,
					backgroundColor: R.create("var").set({name:"headline_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
					padding: R.create("var").set({name:"headline_text_padding", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					left: 20,
					top: 549,
					width: 260,
					height: 198,
					zIndex: 331,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,pixelDensity:FOF_PIXEL_DENSITY,forceLineHeight:true
				},
				attr:{
					id: "headline_text",
					textContent: R.create("var").set({name:"headline_text", defaultValue:"", dataType:"String", required:true, exposed:true}).render().value()
				}
			});

			var subhead_text = R.create("div").set({
				css:{
					color: R.create("var").set({name:"subhead_text_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
					fontSize: R.create("var").set({name:"subhead_text_font_size", defaultValue:"20", dataType:"String", required:false, exposed:true}).render().value(),
					fontFamily: R.create("var").set({name:"subhead_text_font_id", defaultValue:"10755", dataType:"Number", required:false, exposed:true}).render().value(),
					fontStyle: "Light",
					lineHeight: R.create("var").set({name:"subhead_text_line_height", defaultValue:"1.25", dataType:"String", required:false, exposed:true}).render().value(),
					letterSpacing: R.create("var").set({name:"subhead_text_tracking", defaultValue:"0.5", dataType:"String", required:false, exposed:true}).render().value(),
					textAlign: "center",
					verticalAlign: "middle",
					marginTop: 8,
					backgroundColor: R.create("var").set({name:"subhead_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
					padding: R.create("var").set({name:"subhead_text_padding", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					left: 20,
					top: 755,
					width: 260,
					height: 83,
					zIndex: 330,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,pixelDensity:FOF_PIXEL_DENSITY,forceLineHeight:true
				},
				attr:{
					id: "subhead_text",
					textContent: R.create("var").set({name:"subhead_text", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value()
				}
			});

			var cta_text = R.create("div").set({
				css:{
					border: R.create("var").set({name:"cta_text_border", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					color: R.create("var").set({name:"cta_text_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
					fontSize: R.create("var").set({name:"cta_text_font_size", defaultValue:"20", dataType:"String", required:false, exposed:true}).render().value(),
					fontFamily: R.create("var").set({name:"cta_text_font_id", defaultValue:"10747", dataType:"Number", required:false, exposed:true}).render().value(),
					fontStyle: "RomanFamily",
					lineHeight: R.create("var").set({name:"cta_text_line_height", defaultValue:"1", dataType:"String", required:false, exposed:true}).render().value(),
					letterSpacing: R.create("var").set({name:"cta_text_tracking", defaultValue:"0.5", dataType:"String", required:false, exposed:true}).render().value(),
					textAlign: "center",
					verticalAlign: "middle",
					marginTop: 32,
					backgroundColor: R.create("var").set({name:"cta_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
					padding: R.create("var").set({name:"cta_text_padding", defaultValue:"11px 16px 11px 16px", dataType:"String", required:false, exposed:true}).render().value(),
					left: 20,
					top: 870,
					width: 260,
					height: 45,
					zIndex: 329,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden",
					borderRadius: R.create("var").set({name:"cta_border_corner_radius", defaultValue:"", dataType:"Number", required:false, exposed:true}).render().value(),
				},
				rosetta:{
					parentNode:stage,pixelDensity:FOF_PIXEL_DENSITY,forceLineHeight:false
				},
				attr:{
					id: "cta_text",
					textContent: R.create("var").set({name:"cta_text", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value()
				}
			});

			var details_text = R.create("div").set({
				css:{
					color: R.create("var").set({name:"details_text_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
					fontSize: R.create("var").set({name:"details_text_font_size", defaultValue:"14", dataType:"String", required:false, exposed:true}).render().value(),
					fontFamily: R.create("var").set({name:"details_text_font_id", defaultValue:"10755", dataType:"Number", required:false, exposed:true}).render().value(),
					fontStyle: "Light",
					lineHeight: R.create("var").set({name:"details_text_line_height", defaultValue:"1.21", dataType:"String", required:false, exposed:true}).render().value(),
					letterSpacing: R.create("var").set({name:"details_text_tracking", defaultValue:"0", dataType:"String", required:false, exposed:true}).render().value(),
					textAlign: "center",
					verticalAlign: "middle",
					marginTop: 16,
					backgroundColor: R.create("var").set({name:"details_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
					padding: R.create("var").set({name:"details_text_padding", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					left: 20,
					top: 931,
					width: 260,
					height: 40,
					zIndex: 328,
					pointerEvents: "auto",
					cursor: "pointer",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,pixelDensity:FOF_PIXEL_DENSITY,forceLineHeight:true
				},
				attr:{
					id: "details_text",
					textContent: R.create("var").set({name:"details_text", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value()
				}
			}).on("click", displayLegal);

			var badge_text = R.create("div").set({
				css:{
					color: R.create("var").set({name:"badge_text_color", defaultValue:"#FFFFFF", dataType:"Color", required:false, exposed:true}).render().value(),
					fontSize: R.create("var").set({name:"badge_text_font_size", defaultValue:"18", dataType:"String", required:false, exposed:true}).render().value(),
					fontFamily: R.create("var").set({name:"badge_text_font_id", defaultValue:"10747", dataType:"Number", required:false, exposed:true}).render().value(),
					fontStyle: "RomanFamily",
					lineHeight: R.create("var").set({name:"badge_text_line_height", defaultValue:"1.17", dataType:"String", required:false, exposed:true}).render().value(),
					letterSpacing: R.create("var").set({name:"badge_text_tracking", defaultValue:"0", dataType:"String", required:false, exposed:true}).render().value(),
					textAlign: "center",
					verticalAlign: "middle",
					marginTop: 0,
					backgroundColor: R.create("var").set({name:"badge_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
					padding: R.create("var").set({name:"badge_text_padding", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					left: 25,
					top: 981,
					width: 250,
					height: 56,
					zIndex: 288,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,pixelDensity:FOF_PIXEL_DENSITY,forceLineHeight:false
				},
				attr:{
					id: "badge_text",
					textContent: R.create("var").set({name:"badge_text", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value()
				}
			}).render();

			var badge_bg_color = R.create("div").set({
				css:{
					left: 7,
					top: 975,
					zIndex: 274,
					width: 286,
					height: 68,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					backgroundColor: R.create("var").set({name:"badge_bg_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
					borderRadius: 0,
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage
				},
				attr:{
					id: "badge_bg_color"
				}
			}).render();

			var logo_bg_color = R.create("div").set({
				css:{
					left: 0,
					top: 0,
					zIndex: 141,
					width: 300,
					height: 124,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					backgroundColor: R.create("var").set({name:"logo_bg_color", defaultValue:"#ffffff", dataType:"Color", required:false, exposed:true}).render().value(),
					borderRadius: 0,
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage
				},
				attr:{
					id: "logo_bg_color"
				}
			}).render();

			var frame_bg_color = R.create("div").set({
				css:{
					left: 7,
					top: 8,
					zIndex: 128,
					width: 286,
					height: 1034,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					backgroundColor: R.create("var").set({name:"frame_bg_color", defaultValue:"#ffffff", dataType:"Color", required:false, exposed:true}).render().value(),
					borderRadius: 0,
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage
				},
				attr:{
					id: "frame_bg_color"
				}
			}).render();

			var overlay_color = R.create("div").set({
				css:{
					left: 0,
					top: 1,
					zIndex: 115,
					width: 300,
					height: 1049,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					backgroundColor: R.create("var").set({name:"overlay_color", defaultValue:"rgba(255,255,255,0.95)", dataType:"Color", required:false, exposed:true}).render().value(),
					borderRadius: 0,
					border: R.create("var").set({name:"overlay_border", defaultValue:"0px solid rgba(undefined,0.95)", dataType:"String", required:false, exposed:true}).render().value(),
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage
				},
				attr:{
					id: "overlay_color"
				}
			}).render();

			var bg_color = R.create("div").set({
				css:{
					left: 0,
					top: 0,
					zIndex: 5,
					width: 300,
					height: 1050,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					backgroundColor: R.create("var").set({name:"bg_color", defaultValue:"#ffffff", dataType:"String", required:false, exposed:true}).render().value(),
					borderRadius: 0,
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage
				},
				attr:{
					id: "bg_color"
				}
			}).render();

			var fg_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"fg_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 0,
					top: 0,
					width: 300,
					height: 1050,
					zIndex: 739,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"fg_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "fg_img"
				}
			}).render();

			var style_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"style_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 0,
					top: 0,
					width: 300,
					height: 1050,
					zIndex: 729,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"style_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "style_img"
				}
			}).render();

			var logo_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"logo_img", defaultValue:"", dataType:"String", required:true, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 21,
					top: 22,
					width: 258,
					height: 90,
					zIndex: 387,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"logo_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "logo_img"
				}
			}).render();

			var card_small_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"card_small_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 74,
					top: 424,
					width: 151,
					height: 94,
					zIndex: 248,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,
					directoryType:"shared",
					tint: R.create("var").set({name:"card_small_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "card_small_img"
				}
			}).render();

			var frame_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"frame_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 0,
					top: 0,
					width: 300,
					height: 1050,
					zIndex: 232,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"frame_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "frame_img"
				}
			}).render();

			var promo_style_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"promo_style_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 0,
					top: 0,
					width: 300,
					height: 1050,
					zIndex: 224,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"promo_style_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "promo_style_img"
				}
			}).render();

			var card_large_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"card_large_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 21,
					top: 219,
					width: 258,
					height: 160,
					zIndex: 193,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,
					directoryType:"shared",
					tint: R.create("var").set({name:"card_large_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "card_large_img"
				}
			}).render();

			var lifestyle_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"lifestyle_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 7,
					top: 124,
					width: 286,
					height: 352,
					zIndex: 158,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"lifestyle_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "lifestyle_img"
				}
			}).render();

			var bg_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"bg_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 0,
					top: 0,
					width: 300,
					height: 1050,
					zIndex: 18,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"bg_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "bg_img"
				}
			}).render();

			
			/* [CREATING_COMPONENTS] */
			//LEGAL_TEXT
			var legalTextContainer = R.create("div").set({
				attr:{
					id: "legalTextContainer"
				},
				css:{
					name: "legalTextContainer",
					zIndex: 748,
					left: 0,
					top: 0,
					width: 300,
					height: 1050,
					visibility: "hidden",
					pointerEvents: "auto",
					opacity: 0.5,
					cursor: "pointer"
				},
				rosetta:{
					parentNode: stage,
					data: {
						hitIndex: 0
					}
				}
			}).render();

			var legal_closeX = R.create("div").set({
				attr: {
					id: "legal_closeX",
					textContent: "x"
				},
				css: {
					fontSize: 12,
					fontFamily: "OpenSans, sans-serif",
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
					borderRadius: "7px",
					backgroundColor: "#FFFFFF",
					color: R.create("var").set({name:"legal_text_bg_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
					textAlign: "center"
				},
				rosetta: {
					parentNode: legalTextContainer,
					resizeElement: false
				}
			}).render().on("click", displayLegal);

			var legal_close = R.create("div").set({
				attr: {
					id: "legal_close",
					textContent: "close"
				},
				css: {
					fontSize: 12,
					fontFamily: "OpenSans, sans-serif",
					textType: "fontFaceText",
					lineHeight: 1,
					letterSpacing: 0,
					left: 26,
					top: 10,
					width: 270,
					height: 14,
					zIndex: 1196,
					pointerEvents: "auto",
					cursor: "pointer",
					position: "absolute",
					color: "#FFFFFF",
					textAlign: "left"
				},
				rosetta: {
					parentNode: legalTextContainer
				}
			}).render().on("click", displayLegal);

			var legal_text = R.create("div").set({
				attr: {
					id: "legal_text",
					textContent: R.create("var").set({name:"legal_text", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value()
				},
				css: {
					fontSize: 12,
					minFontSize: 12,
					fontFamily: "Arial, Verdana, Helvetica, Sans",
					textType: "fontFaceText",
					lineHeight: 1,
					letterSpacing: 0,
					left: 10,
					top: 25,
					width: 280,
					height: 1015,
					zIndex: 1,
					pointerEvents: "auto",
					cursor: "pointer",
					position: "absolute",
					color: R.create("var").set({name:"legal_text_color", defaultValue:"#FFFFFF", dataType:"Color", required:false, exposed:true}).render().value(),
					textAlign: "left",
					overflowY: "auto",
					overflowWrap: "break-word",
					wordWrap: "break-word",
					wordBreak: "break-word"
				},
				rosetta: {
					parentNode: legalTextContainer,
					resizeElement: false
				}
			}).render();

			var legal_text_bg_color = R.create("div").set({
				attr: {
					id: "legal_text_bg_color"
				},
				css: {
					name: "legal_text_bg_color",
					zIndex: 0,
					left: 0,
					top: 0,
					width: 300,
					height: 1050,
					backgroundColor: R.create("var").set({name:"legal_text_bg_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
					opacity: 0.8,
					cursor: "pointer"
				},
				rosetta:{
					parentNode: legalTextContainer,
					data: {
						hitIndex: 0
					}
				}
			}).render();

			//IF THERE IS NO LEGAL TEXT DISABLE TRIGGER
			if(!legal_text.element.textContent){
				details_text.element.style.pointerEvents = "none";
			};

			function displayLegal(){
				if(legalTextContainer.element.style.visibility == "hidden"){
					TweenMax.to(legalTextContainer.element, .25, {autoAlpha: 1});
				}else{
					TweenMax.to(legalTextContainer.element, .25, {autoAlpha: 0});
				}
			}

			
			/* [BATCH_LOADING] */
			var requiredArr = [headline_text, logo_img];
			var group8Array = [headline_text, subhead_text, cta_text, details_text];
			var allElementsArr = [badge_text, fg_img, style_img, card_small_img, frame_img, promo_style_img, card_large_img, lifestyle_img, bg_img, badge_bg_color, logo_bg_color, frame_bg_color, overlay_color, bg_color];
			
			var group8 = R.create("AlignmentGroup").set({
				verticalAlign: "middle"
			}).add(group8Array).render();
			
			function additionalSettings() {
				};
			
			var megaBatch = R.create("batch")
				.require(requiredArr)
				.add(group8Array)
				.add(allElementsArr)
				.render({
					success: function(){
						displayLoaded([
							R.filter.success(requiredArr),
							R.filter.success(group8Array),
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
            //creativeReady()
            function animateElements(){

            var hover = false;
			var hoverTl;
            function hoverEffect(){
			  if(!hover){
			    hoverTl = new TimelineMax()
			    hover = true;
			  } else {
			    hoverTl.reverse();
			    hover = false;
			  }
			};
				hit_area.on("mouseover", hoverEffect);
				hit_area.on("mouseout", hoverEffect); 
            // All Animation goes here
            	if (lifestyle_img.backgroundImage){
            		TweenMax.set(card_large_img.element,{autoAlpha:0});
            	}
                var frame_1_in = new TimelineMax()
                	frame_1_in.set(stageBlock.element, {display:"block", autoAlpha:1});  
                	frame_1_in.to(stageBlock.element, .5, {autoAlpha:0});    
					if(fg_img.element){frame_1_in.from(fg_img.element, 2, {y:-20, autoAlpha: 0, ease: 'Power1.easeOut'}, 0)};
					if(style_img.element){frame_1_in.from(style_img.element, 2, {y:-20, autoAlpha: 0, ease: 'Power1.easeOut'}, 0)};
					if(logo_img.element){frame_1_in.from(logo_img.element, 2, {y:-20, autoAlpha: 0, ease: 'Power1.easeOut'}, 0)};
					if(headline_text.element){frame_1_in.from(headline_text.element, 2, {y:-20, autoAlpha: 0, ease: 'Power1.easeOut'}, 1.5)};
					if(subhead_text.element){frame_1_in.from(subhead_text.element, 2, {y:-20, autoAlpha: 0, ease: 'Power1.easeOut'}, 2)};
					if(cta_text.element){frame_1_in.from(cta_text.element, 2, {y:-20, autoAlpha: 0, ease: 'Power1.easeOut'}, 2.5)};
					if(details_text.element){frame_1_in.from(details_text.element, 2, {y:-20, autoAlpha: 0, ease: 'Power1.easeOut'}, 2.5)};
					if(badge_text.element){frame_1_in.from(badge_text.element, 2, {y:-20, autoAlpha: 0, ease: 'Power1.easeOut'}, 3)};
					if(badge_bg_color.element){frame_1_in.from(badge_bg_color.element, 2, {y:-20, autoAlpha: 0, ease: 'Power1.easeOut'}, 3)};
					if(card_small_img.element){frame_1_in.from(card_small_img.element, 2, {y:-20, autoAlpha: 0, ease: 'Power1.easeOut'}, 0.5)};
					if(frame_img.element){frame_1_in.from(frame_img.element, 2, {autoAlpha: 0, ease: 'Power1.easeOut'}, 0)};
					if(card_large_img.element){frame_1_in.from(card_large_img.element, 2, {y:-20, autoAlpha: 0, ease: 'Power1.easeOut'}, 0.5)};
                    if(lifestyle_img.element){frame_1_in.from(lifestyle_img.element, 2, {y:-20,autoAlpha: 0, ease: 'Power1.easeOut'}, 0.5)};
                    if(lifestyle_img.element){frame_1_in.from(promo_style_img.element, 2, {y:-20,autoAlpha: 0, ease: 'Power1.easeOut'}, 0.5)};
					if(logo_bg_color.element){frame_1_in.from(logo_bg_color.element, 2, {y:-20, autoAlpha: 0, ease: 'Power1.easeOut'}, 0)};
					if(frame_bg_color.element){frame_1_in.from(frame_bg_color.element, 2, {y:-20, autoAlpha: 0, ease: 'Power1.easeOut'}, 0)};
					
				var tl = new TimelineMax()
					.add(frame_1_in)

				var tlDuration = tl.duration();
				tl.duration(R.create("var").set({name:"duration", defaultValue:tlDuration, dataType: "Number", exposed:true}).render().value())
                    
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
			var index = 0;
			if (instance && instance.data && instance.data.hitIndex) {
				index = instance.data.hitIndex;
			}
			dmo.handleCommand.call(dmo, "click", [index]);
			
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