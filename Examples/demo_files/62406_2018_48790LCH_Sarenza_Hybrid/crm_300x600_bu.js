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
            var subdirectory = "48790_LCH_HY";
            var creativeName = "" || subdirectory;
            var companyID = "62406";
            var isSecure = (dmo.externalURL.indexOf("https:") > -1);



            var config = {
                context: context,
                waitSeconds: 5,
                paths: {},
                bundles: {
                    "Rosetta":["core.pack","ad.pack","cnvr.advantage.pack","cnvr.usweb.pack","filters.pack","xmlpush.pack","alignmentgroup.pack","hammer.pack","tweenmax.pack","rotatorfade.pack","ndots.pack"]
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
                l:R.create("div").set({width:"1px", height:height, backgroundColor:borderColor, left:0, top:0, zIndex:817,  pointerEvents:"none", parentNode:stage}).render(),
                r:R.create("div").set({width:"1px", height:height, backgroundColor:borderColor, right:0, top:0, zIndex:817, pointerEvents:"none",parentNode:stage}).render(),
                t:R.create("div").set({width:width, height:"1px", backgroundColor:borderColor, left:0, top:0, zIndex:817, pointerEvents:"none", parentNode:stage}).render(),
                b:R.create("div").set({width:width, height:"1px", backgroundColor:borderColor, left:0, bottom:0, zIndex:817, pointerEvents:"none", parentNode:stage}).render()
            };

            //apply CSS reset to stage class
            R.applyCSSReset(".stage");

          var stageBlock = R.create("div").set({
            css:{
              backgroundColor: "#FFFFFF",
              left: 0,
              top: 0,
              width: width,
              height: height,
              zIndex: 10000,
              position: "absolute",
              visibility: "hidden"
            },
            rosetta:{
              parentNode:stage,
            },
            attr:{
              id: "stageBlock"
            }
          }).render();

          var bgColor = R.create("div").set({
            css:{
              backgroundColor: "#000000",
              left: 0,
              top: 0,
              width: width,
              height: height,
              zIndex: 10,
              position: "absolute",
              visibility: "hidden"
            },
            rosetta:{
              parentNode:stage,
            },
            attr:{
              id: "bgColor"
            }
          }).render();

			var headline_text = R.create("div").set({
				css:{
					color: R.create("var").set({name:"headline_text_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
					fontSize: 42,
					fontFamily: 12249,
					fontStyle: "Bold",
					lineHeight: .95,
					letterSpacing: 0,
					textAlign: "center",
					verticalAlign: "middle",
					marginTop: 0,
					backgroundColor: R.create("var").set({name:"headline_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
					padding: R.create("var").set({name:"headline_text_padding", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					left: 18,
					top: 152,
					width: 264,
					height: 192,
					zIndex: 375,
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
			}).render();

			var cta_text = R.create("div").set({
				css:{
					color: R.create("var").set({name:"cta_text_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
					fontSize: 14,
					fontFamily: 12249,
					fontStyle: "Bold",
					lineHeight: 1.14,
					letterSpacing: -0.14,
					textAlign: "left",
					verticalAlign: "middle",
					marginTop: 12,
					backgroundColor: R.create("var").set({name:"cta_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
					padding: R.create("var").set({name:"cta_text_padding", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					left: 171,
					top: 551,
					width: 118,
					height: 18,
					zIndex: 369,
					pointerEvents: "auto",
					cursor: "pointer",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,pixelDensity:FOF_PIXEL_DENSITY,forceLineHeight:true
				},
				attr:{
					id: "cta_text",
					textContent: R.create("var").set({name:"cta_text", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value()
				}
      }).render().on("click", adHit);

			var promo_text = R.create("div").set({
				css:{
					color: R.create("var").set({name:"promo_text_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
					fontSize: 12,
					fontFamily: 10950,
					fontStyle: "Regular",
					lineHeight: 1.17,
					letterSpacing: 0,
					textAlign: "center",
					verticalAlign: "middle",
					marginTop: 0,
					backgroundColor: R.create("var").set({name:"promo_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
					padding: R.create("var").set({name:"promo_text_padding", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					left: 8,
					top: 425,
					width: 283,
					height: 15,
					zIndex: 355,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,pixelDensity:FOF_PIXEL_DENSITY,forceLineHeight:true
				},
				attr:{
					id: "promo_text",
					textContent: R.create("var").set({name:"promo_text", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value()
				}
			}).render();

			var logo_bg_color = R.create("div").set({
				css:{
					left: 1,
					top: 1,
					zIndex: 100,
					width: 300,
					height: 70,
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

			var prod_overlay_color = R.create("div").set({
				css:{
					left: 0,
					top: 447,
					zIndex: 94,
					width: 301,
					height: 153,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					backgroundColor: R.create("var").set({name:"prod_overlay_color", defaultValue:"#ffffff", dataType:"Color", required:false, exposed:true}).render().value(),
					borderRadius: 0,
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage
				},
				attr:{
					id: "prod_overlay_color"
				}
			}).render();

			var promo_badge_color = R.create("div").set({
				css:{
					left: 0,
					top: 418,
					zIndex: 87,
					width: 300,
					height: 29,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					backgroundColor: R.create("var").set({name:"promo_badge_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
					borderRadius: 0,
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage
				},
				attr:{
					id: "promo_badge_color"
				}
			}).render();

			var headline_overlay_color = R.create("div").set({
				css:{
					left: 0,
					top: 0,
					zIndex: 81,
					width: 301,
					height: 600,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					backgroundColor: R.create("var").set({name:"headline_overlay_color", defaultValue:"rgba(0,0,0,0.3)", dataType:"Color", required:false, exposed:true}).render().value(),
					borderRadius: 0,
					border: R.create("var").set({name:"headline_overlay_border", defaultValue:"0px solid rgba(undefined,0.3)", dataType:"String", required:false, exposed:true}).render().value(),
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage
				},
				attr:{
					id: "headline_overlay_color"
				}
			}).render();

			var bg_color = R.create("div").set({
				css:{
					left: 0,
					top: 0,
					zIndex: 2,
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
					zIndex: 807,
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
					zIndex: 794,
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

			var line_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"line_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 169,
					top: 543,
					width: 101,
					height: 1,
					zIndex: 587,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden",
					marginTop:12
				},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"line_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "line_img"
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
					zIndex: 441,
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

			var arrow_left_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"arrow_left_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
          left: 275,
          top: 515,
					width: 9,
					height: 18,
					zIndex: 9999,
					pointerEvents: "auto",
					cursor: "pointer",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"arrow_left_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "arrow_left_img"
				}
			}).render();

			var arrow_right_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"arrow_right_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
          left: 280,
          top: 575,
					width: 9,
					height: 18,
					zIndex: 9999,
					pointerEvents: "auto",
					cursor: "pointer",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"arrow_right_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "arrow_right_img"
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
					height: 600,
					zIndex: 49,
					pointerEvents: "auto",
					cursor: "pointer",
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
      }).render().on("click", adHit);

			var bg_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"bg_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 0,
					top: 0,
					width: 300,
					height: 600,
					zIndex: 15,
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
			var brand_textArr = [];
			var sale_price_textArr = [];
			var price_textArr = [];
			var catImgVarsArr = [
					R.create("var").set({name:"cat_img1", defaultValue:"", dataType:"String", required:true, exposed:true}).render().value(),
					R.create("var").set({name:"cat_img2", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					R.create("var").set({name:"cat_img3", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value()
				];
			var catImgsArr = [];

			var rotatorFadeContainer = R.create("div").set({
				attr:{
					id: "rotatorFadeContainer"
				},
				css:{
					name: "rotatorFadeContainer",
					zIndex: 223,
					left: 11,
					top: 461,
					width: 149,
					height: 100,
					pointerEvents: "none",
					visibility: "hidden",
					backgroundColor: R.create("var").set({name:"rotator_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				rosetta:{
					parentNode: stage
				}
			}).render();

			var nDotsContainer = R.create("div").set({
				attr:{
					id: "nDotsContainer"
				},
				css:{
					name: "nDotsContainer",
					zIndex: 115,
					left: 57,
					top: 574,
					width: 56,
					height: 6,
					pointerEvents: "none",
					visibility: "hidden"
				},
				rosetta:{
					parentNode: stage
				}
			}).render();


			/* [NDOTS_ACTIVE_STATES] */
			var nDotActive = R.create("div").set({
				css: {
					backgroundColor: R.create("var").set({name:"ndot_on_color", defaultValue:"rgba(151,151,151,1)", dataType:"Color", required:false, exposed:true}).render().value(),
					boxShadow: R.create("var").set({name:"ndot_on_shadow_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
					border: R.create("var").set({name:"ndot_on_border", defaultValue:"0px solid rgba(255,255,255,1)", dataType:"String", required:false, exposed:true}).render().value(),
					borderRadius: 3,
					width: 6,
					height: 6,
					visibility: "hidden"
				},
				rosetta: {
					id: "nDotActive",
					parentNode: nDotsContainer
				}
			}).render();

			var nDotInactive = R.create("div").set({
				css: {
					backgroundColor: R.create("var").set({name:"ndot_off_color", defaultValue:"rgba(202,202,202,1)", dataType:"Color", required:false, exposed:true}).render().value(),
					boxShadow: R.create("var").set({name:"ndot_off_shadow_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
					border: R.create("var").set({name:"ndot_off_border", defaultValue:"0px solid rgba(255,255,255,1)", dataType:"String", required:false, exposed:true}).render().value(),
					borderRadius: 3,
					width: 6,
					height: 6,
					visibility: "hidden"
				},
				rosetta: {
					id: "nDotInactive",
					parentNode: nDotsContainer
				}
			}).render();

			for (var i = 0; i < catImgVarsArr.length; i++) {
				var catImg = R.create("div").set({
					attr: {
						id: "cat_img" + (i + 1)
					},
					css: {
						name: "cat_img" + (i + 1),
						width: 149,
						height: 100,
						backgroundImage: catImgVarsArr[i],
						backgroundSize: "contain",
						backgroundPosition: "center center",
						backgroundColor: R.create("var").set({name:"cat_img_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
						border: R.create("var").set({name:"cat_img_border", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
						borderRadius: R.create("var").set({name:"cat_img_radius", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
						position: "absolute",
						visibility: "hidden",
						cursor: "pointer",
						pointerEvents: "auto"
					},
					rosetta: {
						parentNode: rotatorFadeContainer,
						data: {
							hitIndex: i + 1
						}
					}
				}).render().on("click", adHit);

				var brand_text = R.create("div").set({
					css:{
						color: R.create("var").set({name:"brand_text_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
						fontSize: 14,
						fontFamily: 12249,
						fontStyle: "Bold",
						lineHeight: 1.21,
						letterSpacing: 0,
						textAlign: "left",
						verticalAlign: "middle",
						marginTop: 0,
						backgroundColor: R.create("var").set({name:"brand_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
						padding: R.create("var").set({name:"brand_text_padding", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
						left: 171,
						top: 457,
						width: 118,
						height: 37,
						zIndex: 352,
						pointerEvents: "auto",
						cursor: "pointer",
						position: "absolute",
						visibility: "hidden"
					},
					rosetta:{
						parentNode: stage,
						pixelDensity: FOF_PIXEL_DENSITY,
						forceLineHeight: true
					},
					attr:{
						id: "brand_text" + (i + 1),
						textContent: R.create("var").set({name:"brand_text" + (i + 1), defaultValue:"Brand Text", required:false, exposed:true}).render().value()
					},
					data:{
						hitIndex: i + 1
					}
				}).on("click", adHit);

				var sale_price_text = R.create("div").set({
					css:{
						color: R.create("var").set({name:"sale_price_text_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
						fontSize: 12,
						fontFamily: 12249,
						fontStyle: "Bold",
						lineHeight: 1.2,
						letterSpacing: 0,
						textAlign: "left",
						verticalAlign: "middle",
						marginTop: 1,
						backgroundColor: R.create("var").set({name:"sale_price_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
						padding: R.create("var").set({name:"sale_price_text_padding", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
						left: 171,
						top: 518,
						width: 118,
						height: 17,
						zIndex: 351,
						pointerEvents: "auto",
						cursor: "pointer",
						position: "absolute",
						visibility: "hidden",
					},
					rosetta:{
						parentNode: stage,
						pixelDensity: FOF_PIXEL_DENSITY,
						forceLineHeight: true
					},
					attr:{
						id: "sale_price_text" + (i + 1),
						textContent: R.create("var").set({name:"sale_price_text" + (i + 1), defaultValue:"", required:false, exposed:true}).render().value()
					},
					data:{
						hitIndex: i + 1
					}
				}).on("click", adHit);

				var price_text = R.create("div").set({
					css:{
						color: R.create("var").set({name:"price_text_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
						fontSize: 12,
						fontFamily: 12251,
						fontStyle: "Regular",
						lineHeight: 1.17,
						letterSpacing: 0,
						textAlign: "left",
						verticalAlign: "middle",
						marginTop: 6,
						backgroundColor: R.create("var").set({name:"price_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
						padding: R.create("var").set({name:"price_text_padding", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
						left: 171,
						top: 500,
						width: 118,
						height: 17,
						zIndex: 350,
						pointerEvents: "auto",
						cursor: "pointer",
						position: "absolute",
						visibility: "hidden"
					},
					rosetta:{
						parentNode: stage,
						pixelDensity: FOF_PIXEL_DENSITY,
						forceLineHeight: true
					},
					attr:{
						id: "price_text" + (i + 1),
						textContent: R.create("var").set({name:"price_text" + (i + 1), defaultValue:"", required:false, exposed:true}).render().value()
					},
					data:{
						hitIndex: i + 1
					}
				}).on("click", adHit);

				R.create("AlignmentGroup").set({
					verticalAlign: "middle"
				}).add([brand_text,price_text,sale_price_text,line_img,cta_text]).render();

				brand_textArr.push(brand_text);
				sale_price_textArr.push(sale_price_text);
				price_textArr.push(price_text);
				catImgsArr.push(catImg);
			};

			var brandTextRotator;
			var salePriceTextRotator;
			var priceTextRotator;
			var rotatorFade;
			var nDots;


			function startRotator() {
				rotatorFade = R.create("rotatorfade").set({
					id: "rotatorFade",
					container: rotatorFadeContainer,
					crossFade: true,
					width: 149,
					height: 100,
					zIndex: 223,
					spacing: 0,
					autoPlay: false,
					clickIndexOffset: 0,
					elements: catImgsArr,
					endOnFirst: true,
					numLoops: 1,
					onDuration: 1,
					startIndex: 0,
					transitionDuration: 0.5,
					ease: "Power0.easeNone"
				}).render(function(e){
							setTimeout(function(){rotatorFade.startAutoPlay();}, 10000);
									// playVideo(e);
								// console.log(rotatorFade);
				});

				brandTextRotator = R.create("rotatorfade").set({
					elements: brand_textArr,
					transitionDuration:0.5,
					onDuration:1,
					autoPlay: false
				}).render();

				salePriceTextRotator = R.create("rotatorfade").set({
					elements: sale_price_textArr,
					transitionDuration:0.5,
					onDuration:1,
					autoPlay: false
				}).render();

				priceTextRotator = R.create("rotatorfade").set({
					elements: price_textArr,
					transitionDuration:0.5,
					onDuration:1,
					autoPlay: false
				}).render();

				nDots = R.create("ndots").set({
					id: "nDots",
					container: nDotsContainer,
					activeElement: nDotActive,
					inactiveElement: nDotInactive,
					spacing: 4,
					direction: "horizontal",
					alignment: "center",
					maxElements: rotatorFade.numElements
				}).render();

				brandTextRotator.controlledBy = [salePriceTextRotator, priceTextRotator, rotatorFade, nDots];
				salePriceTextRotator.controlledBy = [brandTextRotator, priceTextRotator, rotatorFade, nDots];
				priceTextRotator.controlledBy = [brandTextRotator, salePriceTextRotator, rotatorFade, nDots];
				rotatorFade.controlledBy = [brandTextRotator, salePriceTextRotator, priceTextRotator, nDots];
				nDots.controlledBy = [brandTextRotator, salePriceTextRotator, priceTextRotator, rotatorFade];
			};

			/* [BATCH_LOADING] */
			var requiredArr = [logo_img];
			var nDotsArr = [nDotActive, nDotInactive];
			var allElementsArr = [bgColor,stageBlock,headline_text, cta_text, promo_text, fg_img, style_img, line_img, arrow_left_img, arrow_right_img, lifestyle_img, bg_img, logo_bg_color, prod_overlay_color, promo_badge_color, headline_overlay_color, bg_color, rotatorFadeContainer, nDotsContainer];

			function additionalSettings() {
				nDotsContainer.element.style.overflow = "";
				for (var i = 0; i < nDotsContainer.element.getElementsByTagName("*").length; i++) {
					nDotsContainer.element.getElementsByTagName("*")[i].style.overflow = "";
				}

			};

			var megaBatch = R.create("batch")
				.require(requiredArr)
				.add(brand_textArr)
				.add(sale_price_textArr)
				.add(price_textArr)
				.require(catImgsArr, 1)
				.add(nDotsArr)
				.add(allElementsArr)
				.render({
					success: function(){
						hideFailed(R.filter.removeParallel(brand_textArr,sale_price_textArr,price_textArr,catImgsArr,R.filter.parallel(catImgsArr)));
						displayLoaded([
							R.filter.success(requiredArr),
							R.filter.success(brand_textArr),
							R.filter.success(sale_price_textArr),
							R.filter.success(price_textArr),
							R.filter.success(catImgsArr),
							R.filter.success(nDotsArr),
							R.filter.success(allElementsArr)
							]);
						startRotator();
						additionalSettings();
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

			function hideFailed(removed){
				for(var i = 0; i < removed.length; i++){
					if(removed[i] && removed[i].element){
						removed[i].display = "none";
						removed[i].parentNode = "";
					}
				}
			};


			var hit_area = R.create("div").set({id:"ad_hit", width: width, height:447, /*backgroundColor:"#000000"*/ pointerEvents: "auto", cursor: "pointer", zIndex:8999, parentNode:stage});
			hit_area.on("click", adHit);

			//ADDING CTT JUNK VARS

            /* [END_CREATE_ELEMENTS] */
            //creativeReady()

          //////////////////////////////////////////////////////////////////////////////////
          function playVideo(e){
            // rotatorFade.cancelAutoPlay()
          }

            // All Animation goes here
            function animateElements() {

              //CUSTOM WORK/////////////////////////////////////////////////////////////////////

							//hide promo text bg if no promo textContent//////////////////////////////////////
            	if(!promo_text.element.textContent){TweenMax.set(promo_badge_color.element,{autoAlpha:0});}

              //////////////////////////////////////////////////////////////////////////////////
              var canvas = stage.element.getBoundingClientRect();
              var left = canvas.width;
							var hovered = false;
              var userExpanded = false;
              var autoOpen = true;
              var center = 'center top';
              var tlExpandRotator;

              //////////////////////////////////////////////////////////////////////////////////
							TweenMax.set(arrow_left_img.element,{autoAlpha:1});
              TweenMax.set(
                [
                  prod_overlay_color.element,
                  salePriceTextRotator.element,
                  priceTextRotator.element,
                  rotatorFade.element,
                  nDots.element,
                  arrow_right_img.element,
                  line_img.element,
                  cta_text.element,
                  sale_price_text.element,
                  promo_text.element,
                  promo_badge_color.element,
                  price_textArr[0].element,price_textArr[1].element,price_textArr[2].element,
                  sale_price_textArr[0].element,sale_price_textArr[1].element,sale_price_textArr[2].element,
                  brand_textArr[0].element,brand_textArr[1].element,brand_textArr[2].element
                ],{x:left});

							//////////////////////////////////////////////////////////////////////////////////
							function deactivateClicks(){
              	TweenMax.set([lifestyle_img.element,hit_area.element, arrow_right_img.element],{pointerEvents:"none"});
              };

              //////////////////////////////////////////////////////////////////////////////////
              deactivateClicks();

              //////////////////////////////////////////////////////////////////////////////////
              function activateClick(){
                var arr = [lifestyle_img.element,arrow_right_img.element, hit_area.element]
                var arrNone = [];
                for (var i=0; i<arr.length; i++) {arrNone.push(arr[i].style.pointerEvents="auto");}
              }

              //opening animation///////////////////////////////////////////////////////////////
              var tl = new TimelineMax()
              tl.to(stageBlock.element,.5,{autoAlpha:0, onComplete:expandRotator},0)
              tl.from([lifestyle_img.element, headline_text.element],1,{scale:1.05,transformOrigin:center, ease:"Power2.easeOut"},0)

              //////////////////////////////////////////////////////////////////////////////////
              function expandRotator(){
                console.log(hovered);
                if(!hovered) {
                  console.log("expanded from if");
                  tlExpandRotator = new TimelineMax()
                  tlExpandRotator.staggerTo([prod_overlay_color.element, rotatorFade.element, [promo_text.element, promo_badge_color.element]], .5, {x: 0, ease: "Power1.easeInOut"}, .2);
                  tlExpandRotator.to([cta_text.element, line_img.element, arrow_right_img.element, nDots.element,
                    price_textArr[0].element, price_textArr[1].element, price_textArr[2].element,
                    sale_price_textArr[0].element, sale_price_textArr[1].element, sale_price_textArr[2].element,
                    brand_textArr[0].element, brand_textArr[1].element, brand_textArr[2].element
                  ], .5, {x: 0, ease: "Power1.easeOut", delay: .3, onComplete: bounceArrow}, .4);
                  tlExpandRotator.to(arrow_left_img.element, .5, {x: -300, ease: "Power1.easeInOut"}, 0);
                  // console.log(hovered);
                } else {
                  // console.log("else from expand rotator");
              		console.log("expanded from else");
                  tlExpandRotator = new TimelineMax({onComplete:bounceArrow})
                  tlExpandRotator.staggerTo([prod_overlay_color.element, rotatorFade.element, [promo_text.element, promo_badge_color.element]], .5, {x: 0, ease: "Power1.easeInOut"}, .2);
                  tlExpandRotator.to([cta_text.element, line_img.element, arrow_right_img.element, nDots.element,
                    price_textArr[0].element, price_textArr[1].element, price_textArr[2].element,
                    sale_price_textArr[0].element, sale_price_textArr[1].element, sale_price_textArr[2].element,
                    brand_textArr[0].element, brand_textArr[1].element, brand_textArr[2].element
                  ], .5, {x: 0, ease: "Power1.easeOut", delay: .3,/* onComplete: bounceArrow*/}, .4);
                  tlExpandRotator.to(arrow_left_img.element, .5, {x: -300, ease: "Power1.easeInOut"}, 0);
                  TweenMax.set(arrow_left_img.element, {autoAlpha:1});
								}
                TweenMax.to(lifestyle_img.element,duration,{scale:1,opacity:1,transformOrigin:center});
							}
							//////////////////////////////////////////////////////////////////////////////////
              var duration = .5;
							var bounceArrowTl;

              function bounceArrow(){

              	// console.log(hovered);
                // activateClick();
								if (!hovered == autoOpen) {
                  // console.log("if from activateClick");
                  // console.log(hovered);
                  TweenMax.set(arrow_right_img.element,{autoAlpha:1});


                  bounceArrowTl = new TimelineMax({repeat: 0, delay:0, onComplete:complete});
                  bounceArrowTl.to([arrow_right_img.element,prod_overlay_color.element, rotatorFade.element, [promo_text.element, promo_badge_color.element],cta_text.element, line_img.element, arrow_right_img.element, nDots.element,
                    price_textArr[0].element, price_textArr[1].element, price_textArr[2].element,
                    sale_price_textArr[0].element, sale_price_textArr[1].element, sale_price_textArr[2].element,
                    brand_textArr[0].element, brand_textArr[1].element, brand_textArr[2].element], duration, {x: 5, ease: "Power2.easeOut", delay: duration});
                  bounceArrowTl.to([arrow_right_img.element,prod_overlay_color.element, rotatorFade.element, [promo_text.element, promo_badge_color.element],cta_text.element, line_img.element, arrow_right_img.element, nDots.element,
                    price_textArr[0].element, price_textArr[1].element, price_textArr[2].element,
                    sale_price_textArr[0].element, sale_price_textArr[1].element, sale_price_textArr[2].element,
                    brand_textArr[0].element, brand_textArr[1].element, brand_textArr[2].element], duration, {x: 0, ease: "Bounce.easeOut", delay: duration});
                  function complete(){hovered = true;activateClick();/*console.log("on complete function from activate click")*//*console.log(hovered);*/;}

                  // TweenMax.to(arrow_right_img.element,duration / 4,{autoAlpha:1, delay:1});
                  // bounceArrowTl = new TimelineMax({repeat: 5, onComplete:complete});
                  // bounceArrowTl.to(arrow_right_img.element,duration, {x: 5, ease: "Power2.easeOut", delay: duration});
                  // bounceArrowTl.to(arrow_right_img.element,duration, {x: 0, ease: "Bounce.easeOut", delay: duration});
                  // function complete(){hovered = true;console.log("else");}

								} else {
                  // console.log("else from activate click")
                  bounceLeftArrow();

								}
              }

              //////////////////////////////////////////////////////////////////////////////////
              var bounceLeftArrowTl;
              function bounceLeftArrow(){
                // console.log("bouncing");
                // console.log(hovered);
                // bounceLeftArrowTl = new TimelineMax({repeat:5});
                // bounceLeftArrowTl.to([arrow_left_img.element,prod_overlay_color.element], duration / 4, {x:"+=0", delay:2});
                // bounceLeftArrowTl.to([arrow_left_img.element,prod_overlay_color.element], duration / 4, {x:"-=20", ease:"Power2.easeOut",});
                // bounceLeftArrowTl.to([arrow_left_img.element,prod_overlay_color.element,], duration / 2, {x:"-=0", ease:"Bounce.easeIn", delay:duration / 4});

                // TweenMax.to(arrow_right_img.element,duration / 4,{autoAlpha:1, delay:1});
                bounceLeftArrowTl = new TimelineMax({repeat: 0, delay:1, onComplete:activateClick()});
                // bounceLeftArrowTl.to([arrow_left_img.element,prod_overlay_color.element], duration, {left: 280, ease: "Power2.easeOut", delay: duration});
                // bounceLeftArrowTl.to([arrow_left_img.element,prod_overlay_color.element], duration, {left: 200, ease: "Power2.easeOut", delay: duration});
                // bounceLeftArrowTl.to([arrow_left_img.element,prod_overlay_color.element], duration, {left: 280, ease: "Bounce.easeOut", delay: duration});
                // bounceLeftArrowTl.to([arrow_left_img.element,prod_overlay_color.element], duration, {x:"-=10", ease: "Power2.easeOut", delay: duration});
                bounceLeftArrowTl.to([arrow_left_img.element,prod_overlay_color.element], duration, {x:"-=10", ease: "Power2.easeOut", delay: duration});
                bounceLeftArrowTl.to([arrow_left_img.element,prod_overlay_color.element], duration, {x:"+=10", ease: "Bounce.easeOut", delay: duration});
                // bounceLeftArrowTl.to([arrow_left_img.element,prod_overlay_color.element], duration, {x:"-=10", ease: "Bounce.easeOut", delay: duration});
                // function complete(){hovered = true;console.log("else");}

              }
              var leftArrowPosition;
              //////////////////////////////////////////////////////////////////////////////////
              function hovering(){
              	TweenMax.to(lifestyle_img.element,duration,{scale:1.03,opacity:.7,transformOrigin:center,})

                hovered = true;
                var currentTimeline = bounceArrowTl.time()

                console.log(hovered)

                leftArrowPosition = arrow_left_img.element.getBoundingClientRect();
                // console.log(leftArrowPosition.left);

                // console.log(hovered)

								if (leftArrowPosition.left < 0){
                  // console.log("less tthan hovering")
                  // bounceArrowTl.pause();

								} else {
                  // console.log("more tthan hovering")
                  // bounceLeftArrowTl.pause();
								}


              };
              function notHovering(){TweenMax.to(lifestyle_img.element,duration,{scale:1,opacity:1,transformOrigin:center,})

                // console.log(hovered);
                //
                // var currentTimeline = bounceArrowTl.time()
                //
                // console.log(currentTimeline)

								// if(!hovered){
              	// bounceArrowTl.resume();

              	// console.log("notHovering if and hovered = false")
              // } else {
                  // bounceArrowTl.resume();
                  // bounceArrowTl.resume();
                  // hovered = false;
									// bounceArrow();
                  // console.log("notHovering else")
								// }


                if (leftArrowPosition.left < 0){
                  // bounceArrowTl.resume();

                  // console.log("success");



                } else {

                  // bounceLeftArrowTl.resume();
                  // console.log("more tthan hover off")
                }
							};

							//mouse events call above hover functions/////////////////////////////////////////
              hit_area.element.addEventListener("mouseover", function(){hovering();})
              hit_area.element.addEventListener("mouseout", function(){notHovering();})
              // lifestyle_img.element.addEventListener("mouseout", function(){notHovering();})
              // lifestyle_img.element.addEventListener("mouseover", function(){hovering();})
              arrow_right_img.element.addEventListener("mouseover", function(){hovering();})
              arrow_right_img.element.addEventListener("mouseout", function(){notHovering();})
              arrow_right_img.element.addEventListener("click", function(){
                // hovered = true;
                userExpanded = true;
                tlExpandRotator.reverse();
                // console.log(hovered)
                // console.log("from right arrow click");
                // console.log(hovered)
              	bounceArrowTl.pause();
                bounceArrowTl.kill();
                bounceArrow();
                // TweenMax.to(arrow_right_img.element,duration / 4,{autoAlpha:0});
                TweenMax.set(arrow_left_img.element,{autoAlpha:1});

                console.log("expanded from if");
                // console.log("if from expand rotator");
                // console.log(hovered);

                // console.log(hovered);



              })

              arrow_left_img.element.addEventListener("click", function(){
              	hovered = false;
              	expandRotator();
              	bounceArrowTl.pause();
              	bounceLeftArrowTl.pause();
              })

							arrow_left_img.element.addEventListener("mouseover", function(){
								hovering();
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