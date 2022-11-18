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
        var R, Platform, Settings, Analytics, AnalyticsContent, TweenMax, TweenLite, TimelineLite, TimelineMax, EventForwarding, Hammer/* [INSERT_PLUGIN_VARS] */;

        var ROSETTA_VERSION = "4.40";
        var context = String(ROSETTA_VERSION + "_"  + dmo.embedId).split("_").join(".");
        var parentDiv, stage, animate, timeoutTimer, startTimer, FOF_PIXEL_DENSITY;
        var evergreenImg = "evergreen.jpg";
        var CENTER_STAGE = false;

        function init(wrapperID) {
            var subdirectory = "47608_LCH_LS";
            var creativeName = "" || subdirectory;
            var companyID = "2114";
            var isSecure = (dmo.externalURL.indexOf("https:") > -1);



            var config = {
                context: context,
                waitSeconds: 5,
                paths: {},
                bundles: {
                    "Rosetta":["core.pack","ad.pack","cnvr.advantage.pack","cnvr.usweb.pack","filters.pack","alignmentgroup.pack","tweenmax.pack","xmlpush.pack","fontface.pack"]
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
                    placementWidth:Number(dmo.mediaWidth) || 300,
                    placementHeight:Number(dmo.mediaHeight) || 600,
                    clientID:dmo.companyId || companyID
                });
                R.setFallback(fallback);

                if (R.isCompatible === true) {
                    R.parseParameters(dmo.flashVars, 'flashvars');
                    Platform.overwrite({
                        clientID: R.create("var").set({name:"company_id", dataType:"String", defaultValue:Platform.fetch().clientID}).render().value(),
                        cacheBuster: R.create("var").set({name:"bypass_cache", dataType:"Boolean", defaultValue:false, exposed:false}).render().value(),
                        subdirectory:R.create("var").set({name:"subdirectory", dataType:"String", defaultValue:subdirectory}).render().value(),
                        FOFVersion: R.create("var").set({name:"fof_version", dataType:"String", defaultValue:"2.1.3", exposed:false}).render().value(),
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

            stage = R.create("div").set({id:"stage", width: width, height: height, backgroundColor:"#FFFFFF", className: "stage"});
            parentDiv.appendChild(stage.element);
            Settings.overwrite({stage: stage});
            new EventForwarding().init({stage:stage});
            var borders = {
                l:R.create("div").set({width:"1px", height:height, backgroundColor:borderColor, left:0, top:0, zIndex:764,  pointerEvents:"none", parentNode:stage}).render(),
                r:R.create("div").set({width:"1px", height:height, backgroundColor:borderColor, right:0, top:0, zIndex:764, pointerEvents:"none",parentNode:stage}).render(),
                t:R.create("div").set({width:width, height:"1px", backgroundColor:borderColor, left:0, top:0, zIndex:764, pointerEvents:"none", parentNode:stage}).render(),
                b:R.create("div").set({width:width, height:"1px", backgroundColor:borderColor, left:0, bottom:0, zIndex:764, pointerEvents:"none", parentNode:stage}).render()
            };

            //apply CSS reset to stage class
            R.applyCSSReset(".stage");

            var stageBlock = R.create("div").set({
				css:{
					backgroundColor:"#FFFFFF",
					left: 0,
					top: 0,
					width: 300,
					height: 600,
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

			var headline_text = R.create("div").set({
				css:{
					color: R.create("var").set({name:"headline_text_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
					fontSize: 33,
					fontFamily: 11534,
					fontStyle: "BookFamily",
					lineHeight: 1.21,
					letterSpacing: 0,
					textAlign: "left",
					verticalAlign: "middle",
					marginTop: 0,
					backgroundColor: R.create("var").set({name:"headline_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
					padding: R.create("var").set({name:"headline_text_padding", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					left: 24,
					top: 395,
					width: 252,
					height: 90,
					zIndex: 219,
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
					textContent: R.create("var").set({name:"headline_text", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value()
				}
			});

			var subhead_text = R.create("div").set({
				css:{
					color: R.create("var").set({name:"subhead_text_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
					fontSize: 14,
					fontFamily: 11910,
					fontStyle: "MediumFamily",
					lineHeight: 1.29,
					letterSpacing: 0,
					textAlign: "left",
					verticalAlign: "middle",
					marginTop: 8,
					backgroundColor: R.create("var").set({name:"subhead_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
					padding: R.create("var").set({name:"subhead_text_padding", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					left: 24,
					top: 493,
					width: 252,
					height: 43,
					zIndex: 218,
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



            //////////////////////////////////////////////////
            //////////////////////////////////////////////////

			var cta_text_cont = R.create("div").set({
				css:{
					marginTop: 19,
					left: 24,
					top: 555,
					width: 252,
					height: 28,
					zIndex: 217,
					pointerEvents: "auto",
					cursor: "pointer",
					position: "absolute",
					visibility: "hidden",
					overflow:"visible",
				},
				rosetta:{
					parentNode:stage,pixelDensity:FOF_PIXEL_DENSITY,forceLineHeight:false
				},
				attr:{
					id: "cta_text_cont",
					// textContent: R.create("var").set({name:"cta_text", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value()
				}
			});

				            var cta_text = R.create("div").set({
				                css:{
				                    color: R.create("var").set({name:"cta_text_color", defaultValue:"#FFFFFF", dataType:"Color", required:false, exposed:true}).render().value(),
				                    fontSize: 11,
				                    fontFamily: 10488,
				                    fontStyle: "RegularFamily",
				                    lineHeight: 1.3,
				                    letterSpacing: 1.65,
                                    textAlign: "left",
                                    verticalAlign: "top",
				                    marginTop: 0,
				                    backgroundColor: R.create("var").set({name:"cta_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
									padding: R.create("var").set({name:"cta_text_padding", defaultValue:"10", dataType:"String", required:false, exposed:true}).render().value(),
				                    left: 0,
				                    top:0,
				                    width: 160,
				                    height: 29,
				                    zIndex: 283,
				                    pointerEvents: "auto",
				                    cursor: "pointer",
				                    position: "absolute",
				                    visibility: "hidden",
				                    // borderRadius:12,
				                    // display:"none",
				                },
				                rosetta:{
				                    parentNode:cta_text_cont,pixelDensity:FOF_PIXEL_DENSITY,forceLineHeight:false
				                },
				                attr:{
				                    id: "cta_text",
				                    textContent: R.create("var").set({name:"cta_text", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value()
				                }
				            });

				            var cta_text_hover = R.create("div").set({
				                css:{
				                    color: R.create("var").set({name:"cta_text_hover_color", defaultValue:"#FFFFFF", dataType:"Color", required:false, exposed:true}).render().value(),
				                    fontSize: 11,
				                    fontFamily: 10488,
				                    fontStyle: "RegularFamily",
				                    lineHeight: 1.3,
				                    letterSpacing: 1.65,
                                    textAlign: "left",
                                    verticalAlign: "top",
				                    marginTop: 0,
									backgroundColor: R.create("var").set({name:"cta_text_hover_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
									padding: R.create("var").set({name:"cta_text_padding", defaultValue:"10", dataType:"String", required:false, exposed:true}).render().value(),
				                    left: 0,
				                    top: 0,
				                    width: 160,
				                    height: 29,
				                    zIndex: 293,
				                    pointerEvents: "auto",
				                    cursor: "pointer",
				                    position: "absolute",
				                    visibility: "hidden",
				                    // borderRadius:12,
				                    // display:"none",
				                },
				                rosetta:{
				                    parentNode:cta_text_cont,pixelDensity:FOF_PIXEL_DENSITY,forceLineHeight:false
				                },
				                attr:{
				                    id: "cta_text_hover",
				                    textContent: R.create("var").set({name:"cta_text", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value()
				                }
				            });

            //////////////////////////////////////////////////
            //////////////////////////////////////////////////
            var details_text = R.create("div").set({
      				css:{
      					color: R.create("var").set({name:"details_text_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
      					fontSize: 9,
      					fontFamily: 11534,
      					fontStyle: "BookFamily",
      					lineHeight: 1.2,
      					letterSpacing: 0,
      					textAlign: "right",
      					verticalAlign: "middle",
      					marginTop: 0,
      					backgroundColor: R.create("var").set({name:"details_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
      					padding: R.create("var").set({name:"details_text_padding", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
      					left: 136,
      					top: 583,
      					width: 160,
      					height: 15,
      					zIndex: 209,
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
      			}).render().on("click", displayLegal);
			var shape_overlay1_color = R.create("div").set({
				css:{
					left: 0,
					top: 99,
					zIndex: 202,
					width: 20,
					height: 244,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					backgroundColor: R.create("var").set({name:"shape_overlay1_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
					borderRadius: 0,
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage
				},
				attr:{
					id: "shape_overlay1_color"
				}
			}).render();

			var shape_overlay2_color = R.create("div").set({
				css:{
					left: 20,
					top: 99,
					zIndex: 199,
					width: 46,
					height: 244,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					backgroundColor: R.create("var").set({name:"shape_overlay2_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
					borderRadius: 0,
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage
				},
				attr:{
					id: "shape_overlay2_color"
				}
			}).render();

			var shape_overlay3_color = R.create("div").set({
				css:{
					left: 289,
					top: 99,
					zIndex: 191,
					width: 11,
					height: 244,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					backgroundColor: R.create("var").set({name:"shape_overlay3_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
					borderRadius: 0,
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage
				},
				attr:{
					id: "shape_overlay3_color"
				}
			}).render();

			var extended_shape_overlay1_color = R.create("div").set({
				css:{
					left: 0,
					top: 99,
					zIndex: 185,
					width: 20,
					height: 269,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					backgroundColor: R.create("var").set({name:"extended_shape_overlay1_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
					borderRadius: 0,
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage
				},
				attr:{
					id: "extended_shape_overlay1_color"
				}
			}).render();

			var extended_shape_overlay2_color = R.create("div").set({
				css:{
					left: 20,
					top: 99,
					zIndex: 182,
					width: 46,
					height: 269,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					backgroundColor: R.create("var").set({name:"extended_shape_overlay2_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
					borderRadius: 0,
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage
				},
				attr:{
					id: "extended_shape_overlay2_color"
				}
			}).render();

			var extended_shape_overlay3_color = R.create("div").set({
				css:{
					left: 289,
					top: 99,
					zIndex: 174,
					width: 11,
					height: 269,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					backgroundColor: R.create("var").set({name:"extended_shape_overlay3_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
					borderRadius: 0,
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage
				},
				attr:{
					id: "extended_shape_overlay3_color"
				}
			}).render();

			shape_overlay1_color.style.mixBlendMode = 'multiply';
			shape_overlay2_color.style.mixBlendMode = 'multiply';
			shape_overlay3_color.style.mixBlendMode = 'multiply';
			extended_shape_overlay1_color.style.mixBlendMode = 'multiply';
			extended_shape_overlay2_color.style.mixBlendMode = 'multiply';
			extended_shape_overlay3_color.style.mixBlendMode = 'multiply';

			var style_bar_color = R.create("div").set({
				css:{
					left: 0,
					top: 343,
					zIndex: 166,
					width: 300,
					height: 25,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					backgroundColor: R.create("var").set({name:"style_bar_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
					borderRadius: 0,
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage
				},
				attr:{
					id: "style_bar_color"
				}
			}).render();

			var bg_color = R.create("div").set({
				css:{
					left: 0,
					top: 0,
					zIndex: 1,
					width: 300,
					height: 600,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					backgroundColor: R.create("var").set({name:"bg_color", defaultValue:"#ffffff", dataType:"Color", required:false, exposed:true}).render().value(),
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
					height: 600,
					zIndex: 754,
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
					height: 600,
					zIndex: 743,
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
					left: 0,
					top: 0,
					width: 300,
					height: 600,
					zIndex: 304,
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

			var product_overlay_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"product_overlay_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 0,
					top: 0,
					width: 300,
					height: 600,
					zIndex: 240,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"product_overlay_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "product_overlay_img"
				}
			}).render();

			var lifestyle_img_cont = R.create("div").set({
				css:{
					// backgroundImage: R.create("var").set({name:"lifestyle_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 0,
					top: 99,
					width: 300,
					height: 269,
					zIndex: 105,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden",
					overflow:"hidden"
				},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"lifestyle_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "lifestyle_img"
				}
			}).render();

            var lifestyle_img = R.create("div").set({
                css:{
                    backgroundImage: R.create("var").set({name:"lifestyle_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
                    backgroundSize: "contain",
                    backgroundPosition: "center center",
                    left: 0,
                    top: 0,
                    width: 300,
                    height: 269,
                    zIndex: 105,
                    pointerEvents: "none",
                    cursor: "auto",
                    position: "absolute",
                    visibility: "hidden"
                },
                rosetta:{
                    parentNode:lifestyle_img_cont,
                    tint: R.create("var").set({name:"lifestyle_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
                },
                attr:{
                    id: "lifestyle_img"
                }
            }).render();

			var cropped_bg_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"cropped_bg_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 0,
					top: 0,
					width: 300,
					height: 600,
					zIndex: 83,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"cropped_bg_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "cropped_bg_img"
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
					height: 600,
					zIndex: 9,
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
					zIndex: 763,
					left: 0,
					top: 0,
					width: 300,
					height: 600,
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
					height: 565,
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
			}).render().on("click", displayLegal);

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
					height: 600,
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
                details_text.element.style.display = "none";
                // details_text.element.style.pointerEvents = "none";
            };

			function displayLegal(){
				if(legalTextContainer.element.style.visibility == "hidden"){
					TweenMax.to(legalTextContainer.element, .25, {autoAlpha: 1});
				}else{
					TweenMax.to(legalTextContainer.element, .25, {autoAlpha: 0});
				}
			}


			/* [BATCH_LOADING] */
			var requiredArr = [logo_img];
			var group1Array = [headline_text, subhead_text, cta_text_cont];
			var allElementsArr = [lifestyle_img_cont, cta_text_hover, cta_text, details_text, fg_img, style_img, product_overlay_img, lifestyle_img, cropped_bg_img, bg_img, shape_overlay1_color, shape_overlay2_color, shape_overlay3_color, extended_shape_overlay1_color, extended_shape_overlay2_color, extended_shape_overlay3_color, style_bar_color, bg_color];
			var group1 = R.create("AlignmentGroup").set({
				verticalAlign: "middle"
			}).add(group1Array).render();

			function additionalSettings() {
				};

			var megaBatch = R.create("batch")
				.require(requiredArr)
				.add(group1Array)
				.add(group1)
				.add(allElementsArr)
				.render({
					success: function(){
						displayLoaded([
							R.filter.success(requiredArr),
							R.filter.success(group1Array),
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

			var hit_area = R.create("div").set({id:"ad_hit", width: width, height: height, pointerEvents: "auto", cursor: "pointer", zIndex:100, parentNode:stage});
			hit_area.on("click", adHit);

			//ADDING CTT JUNK VARS
            /* var hit_area = R.create("div").set({id:"ad_hit", width: width, height: height, pointerEvents: "auto", cursor: "pointer", zIndex:100, parentNode:stage});
            hit_area.on("click", adHit); */

            /* [END_CREATE_ELEMENTS] */
            //creativeReady()

            // All Animation goes here
            function animateElements() {

            	cta_text_cont.on("click", adHit);

                var ctaTextHeight = cta_text.offsetHeight;
                var ctaTextWidth = cta_text.offsetWidth;

                cta_text_cont.set({
                    height: ctaTextHeight,
                    width: ctaTextWidth
                });

 				stageBlock.display = "none";
            	TweenMax.set(lifestyle_img.element,{scale:1.1, y:0});
            	TweenMax.set(product_overlay_img.element,{scale:.95, y:5});
            	TweenMax.set([headline_text.element,cta_text_cont.element,subhead_text.element, details_text.element],{autoAlpha:0, y:-10});
				TweenMax.set(cta_text_hover.element,{autoAlpha:0});

            	var tl = new TimelineMax()
            	tl.set(stageBlock.element, {display:"block", autoAlpha:1});
            	tl.to(stageBlock.element, 1,{autoAlpha:0});
            	tl.to(lifestyle_img.element, 1.5, {scale:1, ease:"power4.easeInOut",force3D:true},0);
            	tl.to(product_overlay_img.element, 1, {scale:1, y:0, ease:"power4.easeInOut",force3D:true},0);

            	TweenMax.staggerTo([headline_text.element,subhead_text.element,cta_text_cont.element,details_text.element], 1, {autoAlpha:1, y:3, delay:.2},.2);

              	stage.element.addEventListener("mouseover",function(){
            		TweenMax.to(lifestyle_img.element,.5,{scale:1.02,  ease:"power4.easeInOut",force3D:true, backfaceVisibility:"hidden" })
            		TweenMax.to(product_overlay_img.element, .75, {scale:1, y:-2, ease:"power4.easeInOut",force3D:true},0);
            		TweenMax.to(cta_text_cont.element,.5,{opacity:1})
            		TweenMax.to(cta_text_hover.element,.2,{autoAlpha:1})
            		TweenMax.to([headline_text.element,cta_text_cont.element,subhead_text.element],.5,{y:-2});

            	})

            	stage.element.addEventListener("mouseout",function(){
            		TweenMax.to(lifestyle_img.element,.5,{scale:1,  ease:"power4.easeInOut",force3D:true, backfaceVisibility:"hidden" })
             		TweenMax.to(product_overlay_img.element, .75, {scale:1, y:0, ease:"power4.easeInOut",force3D:true},0);
             		TweenMax.to(cta_text_hover.element,.5,{opacity:0})
             		TweenMax.to(cta_text_hover.element,.2,{autoAlpha:0});
             		TweenMax.to([headline_text.element,cta_text_cont.element,subhead_text.element],.5,{y:0});
            	})

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
