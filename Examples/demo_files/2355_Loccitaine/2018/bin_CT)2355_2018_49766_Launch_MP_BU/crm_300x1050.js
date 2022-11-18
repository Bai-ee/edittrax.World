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
            var subdirectory = "49776_LCH_MP";
            var creativeName = "" || subdirectory;
            var companyID = "2355";
            var isSecure = (dmo.externalURL.indexOf("https:") > -1);



            var config = {
                context: context,
                waitSeconds: 5,
                paths: {},
                bundles: {
                    "Rosetta":["core.pack","ad.pack","cnvr.advantage.pack","cnvr.usweb.pack","filters.pack","alignmentgroup.pack","hammer.pack","tweenmax.pack","rotatorfade.pack"]
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
                l:R.create("div").set({width:"1px", height:height, backgroundColor:borderColor, left:0, top:0, zIndex:1405,  pointerEvents:"none", parentNode:stage}).render(),
                r:R.create("div").set({width:"1px", height:height, backgroundColor:borderColor, right:0, top:0, zIndex:1405, pointerEvents:"none",parentNode:stage}).render(),
                t:R.create("div").set({width:width, height:"1px", backgroundColor:borderColor, left:0, top:0, zIndex:1405, pointerEvents:"none", parentNode:stage}).render(),
                b:R.create("div").set({width:width, height:"1px", backgroundColor:borderColor, left:0, bottom:0, zIndex:1405, pointerEvents:"none", parentNode:stage}).render()
            };

            //apply CSS reset to stage class
            R.applyCSSReset(".stage");

//CUSTOM

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

          var catCont = R.create("div").set({
            css:{
              backgroundSize: "contain",
              backgroundPosition: "center center",
              left: 0,
              top: 0,
              width: width,
              height: height,
              zIndex: 300,
              pointerEvents: "none",
              cursor: "auto",
              position: "absolute",
              visibility: "hidden",
              overflow:"visible",
            },
            rosetta:{
              parentNode:stage,
              tint: R.create("var").set({name:"bg_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
            },
            attr:{
              id: "catCont"
            }
          }).render();
//

			var headline_text = R.create("div").set({
				css:{
					color: R.create("var").set({name:"headline_text_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
					fontSize: 32,
					fontFamily: 10971,
					fontStyle: "RegularFamily",
					lineHeight: 1.06,
					letterSpacing: 0,
					textAlign: "left",
					verticalAlign: "middle",
					marginTop: 0,
					backgroundColor: R.create("var").set({name:"headline_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
					padding: R.create("var").set({name:"headline_text_padding", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					left: 39,
					top: 356,
					width: 229,
					height: 101,
					zIndex: 465,
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
					fontSize: 18,
					fontFamily: 10971,
					fontStyle: "RegularFamily",
					lineHeight: 1.17,
					letterSpacing: 0,
					textAlign: "left",
					verticalAlign: "middle",
					marginTop: 5,
					backgroundColor: R.create("var").set({name:"subhead_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
					padding: R.create("var").set({name:"subhead_text_padding", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					left: 39,
					top: 462,
					width: 229,
					height: 66,
					zIndex: 464,
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
					color: R.create("var").set({name:"cta_text_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
					fontSize: 11,
					fontFamily: 11700,
					fontStyle: "SemiBold",
					lineHeight: 1.18,
					letterSpacing: 0,
					textAlign: "left",
					verticalAlign: "middle",
					marginTop: 18,
					backgroundColor: R.create("var").set({name:"cta_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
          border: R.create("var").set({name:"cta_text_border_color", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
          padding: R.create("var").set({name:"cta_text_padding", defaultValue:"8px 13px 8px 13px", dataType:"String", required:false, exposed:true}).render().value(),
					left: 39,
					top: 546,
					width: 229,
					height: 29,
					zIndex: 463,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,pixelDensity:FOF_PIXEL_DENSITY,forceLineHeight:false
				},
				attr:{
					id: "cta_text",
					textContent: R.create("var").set({name:"cta_text", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value()
				}
			});

			var style_bar_color = R.create("div").set({
				css:{
					left: 0,
					top: 0,
					zIndex: 1074,
					width: 300,
					height: 9,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					backgroundColor: R.create("var").set({name:"style_bar_color", defaultValue:"#f7b800", dataType:"Color", required:false, exposed:true}).render().value(),
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

			var logo_bg_color = R.create("div").set({
				css:{
					left: 0,
					top: 0,
					zIndex: 492,
					width: 300,
					height: 108,
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

			var text_frame_color = R.create("div").set({
				css:{
					left: 20,
					top: 295,
					zIndex: 438,
					width: 289,
					height: 288,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					backgroundColor: R.create("var").set({name:"text_frame_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
					borderRadius: 0,
					border: R.create("var").set({name:"text_frame_border", defaultValue:"2px solid #f7b800", dataType:"String", required:false, exposed:true}).render().value(),
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage
				},
				attr:{
					id: "text_frame_color"
				}
			}).render();

			var cat_text_line1_color = R.create("div").set({
				css:{
          left: 45,
          top: 924,
//CUSTOM
					zIndex: 299,
//
					width: 214,
					height: 1,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					backgroundColor: R.create("var").set({name:"cat_text_line1_color", defaultValue:"#f7b800", dataType:"Color", required:false, exposed:true}).render().value(),
					borderRadius: 0,
					visibility: "hidden"
				},
				rosetta:{
					parentNode:catCont
				},
				attr:{
					id: "cat_text_line1_color"
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
					height: 1050,
					zIndex: 1395,
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
					zIndex: 1382,
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

			var nav_prev_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"nav_prev_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 5,
					top: 751,
					width: 25,
					height: 25,
					zIndex: 1144,
					pointerEvents: "auto",
					cursor: "pointer",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"nav_prev_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "nav_prev_img"
				}
			}).render();

			var nav_next_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"nav_next_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 271,
					top: 751,
					width: 25,
					height: 25,
					zIndex: 1141,
					pointerEvents: "auto",
					cursor: "pointer",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"nav_next_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "nav_next_img"
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
					height: 1050,
					zIndex: 784,
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

//CUSTOM
          var lifestyle_img_cont = R.create("div").set({
            css:{
              left: 0,
              top: 98,
              width: 300,
              height: 242,
              zIndex: 411,
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
              id: "lifestyle_img_cont"
            }
          }).render();
//
			var lifestyle_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"lifestyle_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
          left: -11,
          top: 0,
          width: 321,
          height: 259,
					zIndex: 411,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
//CUSTOM
					parentNode:lifestyle_img_cont,
//
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

//CUSTOM
          var cat_textArr = [];
          var catTextArr = [
            R.create("var").set({name:"cat_text1", defaultValue:"", required:false, exposed:true}).render().value(),
            R.create("var").set({name:"cat_text2", defaultValue:"", required:false, exposed:true}).render().value(),
            R.create("var").set({name:"cat_text3", defaultValue:"", required:false, exposed:true}).render().value(),
          ];

          var price_textArr = [];
          var priceTextArr = [
            R.create("var").set({name:"price_text1", defaultValue:"", required:false, exposed:true}).render().value(),
            R.create("var").set({name:"price_text2", defaultValue:"", required:false, exposed:true}).render().value(),
            R.create("var").set({name:"price_text3", defaultValue:"", required:false, exposed:true}).render().value(),
          ];
//
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
					zIndex: 277,
					left: 29,
					top: 642,
					width: 242,
					height: 242,
					pointerEvents: "none",
					visibility: "hidden",
					backgroundColor: R.create("var").set({name:"rotator_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				rosetta:{
					parentNode: stage
				}
			}).render();

          for (var i = 0; i < catImgVarsArr.length; i++) {

				  var catImg = R.create("div").set({
					attr: {
						id: "cat_img" + (i + 1)
					},
					css: {
						name: "cat_img" + (i + 1),
						width: 242,
						height: 242,
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

//CUSTOM
        var cat_text_val = catTextArr[i];
//
				var cat_text = R.create("div").set({
					css:{
						color: R.create("var").set({name:"cat_text_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
						fontSize: 14,
						fontFamily: 10971,
						fontStyle: "RegularFamily",
						lineHeight: 1.07,
						letterSpacing: 0,
						textAlign: "center",
						verticalAlign: "middle",
						marginTop: 0,
						backgroundColor: R.create("var").set({name:"cat_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
						padding: R.create("var").set({name:"cat_text_padding", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
						left: 46,
						top: 957,
						width: 208,
						height: 32,
						zIndex: 353,
						pointerEvents: "auto",
						cursor: "pointer",
						position: "absolute",
						visibility: "hidden"
					},
					rosetta:{
//CUSTOM
						parentNode: catCont,
//
						pixelDensity: FOF_PIXEL_DENSITY,
						forceLineHeight: true
					},
					attr:{
						id: "cat_text" + (i + 1),
            textContent: cat_text_val
					},
					data:{
						hitIndex: i + 1
					}
				}).on("click", adHit);

//CUSTOM
        var price_text_val = priceTextArr[i];
//

				var price_text = R.create("div").set({
					css:{
						color: R.create("var").set({name:"price_text_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
						fontSize: 13,
						fontFamily: 11700,
						fontStyle: "SemiBold",
						lineHeight: 1.08,
						letterSpacing: 0,
						textAlign: "center",
						verticalAlign: "middle",
						marginTop: 7,
						backgroundColor: R.create("var").set({name:"price_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
						padding: R.create("var").set({name:"price_text_padding", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
						left: 46,
						top: 996,
						width: 208,
						height: 18,
						zIndex: 352,
						pointerEvents: "auto",
						cursor: "pointer",
						position: "absolute",
						visibility: "hidden"
					},
					rosetta:{
						parentNode: catCont,
						pixelDensity: FOF_PIXEL_DENSITY,
						forceLineHeight: true
					},
					attr:{
						id: "price_text" + (i + 1),
            textContent: price_text_val
					},
					data:{
						hitIndex: i + 1
					}
				}).on("click", adHit);

				R.create("AlignmentGroup").set({
					verticalAlign: "middle"
				}).add([cat_text,price_text]).render();

				cat_textArr.push(cat_text);
				price_textArr.push(price_text);
				catImgsArr.push(catImg);
			};

			var catTextRotator;
			var priceTextRotator;
			var rotatorFade;
			
			function startRotator() {
				rotatorFade = R.create("rotatorfade").set({
					id: "rotatorFade",
					container: rotatorFadeContainer,
					crossFade: true,
					width: 242,
					height: 242,
					zIndex: 277,
					spacing: 0,
//CUSTOM
					autoPlay: false,
//
					clickIndexOffset: 0,
					elements: catImgsArr,
					endOnFirst: true,
					numLoops: 1,
					onDuration: 1.75,
					startIndex: 0,
					transitionDuration: 1,
					ease: "Power4.easeOut"
				}).render();

				nav_next_img.on("click", rotatorFade.showNext);
				nav_prev_img.on("click", rotatorFade.showPrevious);

				catTextRotator = R.create("rotatorfade").set({
					elements: cat_textArr,
					transitionDuration:1,
					onDuration:1.75,
					autoPlay: false,
//CUSTOM
          crossFade:false
//
				}).render();

				priceTextRotator = R.create("rotatorfade").set({
					elements: price_textArr,
					transitionDuration:1,
					onDuration:1.75,
					autoPlay: false,
//CUSTOM
          crossFade:false
//
				}).render();

				if (rotatorFade.elements.length <= 1){
					TweenMax.set([nav_next_img.element, nav_prev_img.element], {autoAlpha: 0});
				}
				catTextRotator.controlledBy = [priceTextRotator, rotatorFade];
				priceTextRotator.controlledBy = [catTextRotator, rotatorFade];
				rotatorFade.controlledBy = [catTextRotator, priceTextRotator];
			};

			/* [BATCH_LOADING] */
			var requiredArr = [logo_img, headline_text];
			var group11Array = [headline_text, subhead_text, cta_text];
			var allElementsArr = [

//CUSTOM
        stageBlock,
			  lifestyle_img_cont,
        catCont,
//
        fg_img, style_img, nav_prev_img, nav_next_img, lifestyle_img, bg_img, style_bar_color, logo_bg_color, text_frame_color, cat_text_line1_color, bg_color, rotatorFadeContainer];
			
			var group11 = R.create("AlignmentGroup").set({
				verticalAlign: "middle"
			}).add(group11Array).render();
			
			function additionalSettings() {
				};
			
			var megaBatch = R.create("batch")
				.require(requiredArr)
				.add(cat_textArr)
				.add(price_textArr)
				.add(group11Array)
				.require(catImgsArr, 1)
				.add(allElementsArr)
				.render({
					success: function(){
						hideFailed(R.filter.removeParallel(cat_textArr,price_textArr,catImgsArr,R.filter.parallel(catImgsArr)));
						displayLoaded([
							R.filter.success(requiredArr),
							R.filter.success(cat_textArr),
							R.filter.success(price_textArr),
							R.filter.success(group11Array),
							R.filter.success(catImgsArr),
							R.filter.success(allElementsArr)
							]);
						startRotator();
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
			
			var hit_area = R.create("div").set({id:"ad_hit", width: width, height: height, pointerEvents: "auto", cursor: "pointer", zIndex:0, parentNode:stage});
			hit_area.on("click", adHit);
				
			//ADDING CTT JUNK VARS
            /* var hit_area = R.create("div").set({id:"ad_hit", width: width, height: height, pointerEvents: "auto", cursor: "pointer", zIndex:100, parentNode:stage});
            hit_area.on("click", adHit); */

            /* [END_CREATE_ELEMENTS] */
            //creativeReady()

            // All Animation goes here
            function animateElements() {

              var easeType = "Power1.easeInOut";
              var hoverOn = 0;
              hit_area.pointerEvents = "none";

              function pointerEventsOn(){
                hit_area.pointerEvents = "auto";
              }

                stageBlock.display = "none";

              TweenMax.set(stageBlock.element,{autoAlpha:1})
              TweenMax.set(style_bar_color.element,{autoAlpha:0})
              TweenMax.fromTo(lifestyle_img.element,3.5,{force3D:true, preserve3D:true, autoAlpha:0, scale:1.1},{force3D:true, preserve3D:true, scale:1,  x:0, delay:0, autoAlpha:1,ease:easeType,});

                var min = Math.ceil(-5);
                var max = Math.floor(5);
                var xLeft = Math.random() * (max - min + 1) + min;
                var yTop = Math.random() * (max - min + 1) + min;

                var tl = new TimelineMax()
                tl.to(style_bar_color.element, 1, {autoAlpha:1})
                tl.from(logo_img.element, 2, {autoAlpha:0},"-=.8")
                tl.from(headline_text.element, 3, {autoAlpha:0,x:-5, ease:easeType},1)
                tl.from(subhead_text.element, 3, {autoAlpha:0,x:5, ease:easeType},1)
                tl.from(cta_text.element, 3, {autoAlpha:0,x:5, ease:easeType},1)
                tl.from(text_frame_color.element, 3, {autoAlpha:0, ease:easeType},1.4)
                tl.from(rotatorFadeContainer.element, 3, {autoAlpha:0},1.4)
                tl.from(catCont.element, 2, {autoAlpha:0},1.4)
                tl.from(nav_next_img.element, 2, {autoAlpha:0,x:10 },1.4)
                tl.from(nav_prev_img.element, 2, {autoAlpha:0,x:-10, onComplete:pointerEventsOn},1.4)




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