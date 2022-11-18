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
            var subdirectory = "50237_LCH_MP";
            var creativeName = "" || subdirectory;
            var companyID = "61685";
            var isSecure = (dmo.externalURL.indexOf("https:") > -1);



            var config = {
                context: context,
                waitSeconds: 5,
                paths: {},
                bundles: {
                    "Rosetta":["core.pack","ad.pack","cnvr.advantage.pack","cnvr.usweb.pack","filters.pack","tweenmax.pack"]
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
                    placementHeight:Number(dmo.mediaHeight) || 50,
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
                l:R.create("div").set({width:"1px", height:height, backgroundColor:borderColor, left:0, top:0, zIndex:1045,  pointerEvents:"none", parentNode:stage}).render(),
                r:R.create("div").set({width:"1px", height:height, backgroundColor:borderColor, right:0, top:0, zIndex:1045, pointerEvents:"none",parentNode:stage}).render(),
                t:R.create("div").set({width:width, height:"1px", backgroundColor:borderColor, left:0, top:0, zIndex:1045, pointerEvents:"none", parentNode:stage}).render(),
                b:R.create("div").set({width:width, height:"1px", backgroundColor:borderColor, left:0, bottom:0, zIndex:1045, pointerEvents:"none", parentNode:stage}).render()
            };

            //apply CSS reset to stage class
            R.applyCSSReset(".stage");

          //CUSTOM
          var stageBlock = R.create("div").set({
            css:{
              backgroundColor:"#FFFFFF",
              left: 0,
              top: 0,
              width: width,
              height: height,
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
			var f1_headline_text = R.create("div").set({
				css:{
					color: R.create("var").set({name:"f1_headline_text_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
					fontSize: 13,
					fontFamily: 11845,
					fontStyle: "Family",
					lineHeight: 1.15,
					letterSpacing: 0,
					textAlign: "center",
					verticalAlign: "middle",
					marginTop: 0,
					backgroundColor: R.create("var").set({name:"f1_headline_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
					padding: R.create("var").set({name:"f1_headline_text_padding", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					left: 155,
					top: 7,
					width: 78,
					height: 40,
					zIndex: 89,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,pixelDensity:FOF_PIXEL_DENSITY,forceLineHeight:true
				},
				attr:{
					id: "f1_headline_text",
					textContent: R.create("var").set({name:"f1_headline", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value()
				}
			}).render();

			var f2_headline_text = R.create("div").set({
				css:{
					color: R.create("var").set({name:"f2_headline_text_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
					fontSize: 13,
					fontFamily: 11845,
					fontStyle: "Family",
					lineHeight: 1.15,
					letterSpacing: 0,
					textAlign: "center",
					verticalAlign: "middle",
					marginTop: 0,
					backgroundColor: R.create("var").set({name:"f2_headline_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
					padding: R.create("var").set({name:"f2_headline_text_padding", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					left: 155,
					top: 6,
					width: 78,
					height: 40,
					zIndex: 79,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,pixelDensity:FOF_PIXEL_DENSITY,forceLineHeight:true
				},
				attr:{
					id: "f2_headline_text",
					textContent: R.create("var").set({name:"f2_headline", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value()
				}
			}).render();

			var text_bg_color = R.create("div").set({
				css:{
					left: 148,
					top: 0,
					zIndex: 54,
					width: 172,
					height: 50,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					backgroundColor: R.create("var").set({name:"text_bg_color", defaultValue:"#f7f6f6", dataType:"Color", required:false, exposed:true}).render().value(),
					borderRadius: 0,
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage
				},
				attr:{
					id: "text_bg_color"
				}
			}).render();

			var bg_color = R.create("div").set({
				css:{
					left: 0,
					top: 0,
					zIndex: 7,
					width: 320,
					height: 50,
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
					width: 320,
					height: 50,
					zIndex: 1035,
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
					width: 320,
					height: 50,
					zIndex: 1022,
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
					width: 320,
					height: 50,
					zIndex: 350,
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

			var lifestyle_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"lifestyle_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 0,
					top: 0,
					width: 150,
					height: 50,
					zIndex: 230,
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

			var cat1_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"cat1_img", defaultValue:"", dataType:"String", required:true, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 2,
					top: 14,
					width: 47,
					height: 21,
					zIndex: 214,
					pointerEvents: "none",
					cursor: "pointer",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"cat1_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "cat1_img"
				}
			}).render();

			var cat2_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"cat2_img", defaultValue:"", dataType:"String", required:true, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 51,
					top: 14,
					width: 47,
					height: 21,
					zIndex: 177,
					pointerEvents: "none",
					cursor: "pointer",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"cat2_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "cat2_img"
				}
			}).render();

			var cat3_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"cat3_img", defaultValue:"", dataType:"String", required:true, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 100,
					top: 14,
					width: 47,
					height: 21,
					zIndex: 140,
					pointerEvents: "none",
					cursor: "pointer",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"cat3_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "cat3_img"
				}
			}).render();

			var badge_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"badge_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 0,
					top: 0,
					width: 320,
					height: 50,
					zIndex: 112,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"badge_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "badge_img"
				}
			}).render();

			var bg_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"bg_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 0,
					top: 0,
					width: 320,
					height: 50,
					zIndex: 20,
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

			/* [BATCH_LOADING] */
			var requiredArr = [logo_img, cat1_img, cat2_img, cat3_img];
			var allElementsArr = [stageBlock, f1_headline_text, f2_headline_text, fg_img, style_img, lifestyle_img, badge_img, bg_img, text_bg_color, bg_color];
			
			function additionalSettings() {
				};
			
			var megaBatch = R.create("batch")
				.require(requiredArr)
				.add(allElementsArr)
				.render({
					success: function(){
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
            //creativeReady()

            // All Animation goes here
            function animateElements() {
//CUSTOM
              var transfrom = 'bottom center';
              var blurLifestyleStrt = {a:5};
              var blurLifestyleStop = {a:0};
              var prodArr = [cat1_img, cat2_img, cat3_img, hit_area];
              var hovering = false;

              //ANIMATION
              var frame_1_in = new TimelineMax()
              if (stageBlock.element) {frame_1_in.set(stageBlock.element, {autoAlpha: 0}, 0)};
              if (lifestyle_img.element) {frame_1_in.fromTo(f1_headline_text.element,.5,
                {webkitFilter:"blur(" + blurLifestyleStrt.a + "px)",autoAlpha:0, ease: 'Sine.easeInOut', scale: 1.025, y: 0, transformOrigin: transfrom},
                {webkitFilter:"blur(" + blurLifestyleStop.a + "px)",autoAlpha:1, ease: 'Sine.easeInOut', scale: 1, y: 0, transformOrigin: transfrom},.25);
              };
              if (lifestyle_img.element) {frame_1_in.fromTo(text_bg_color.element,.5,
                {webkitFilter:"blur(" + blurLifestyleStrt.a + "px)",autoAlpha:0, ease: 'Sine.easeInOut', scale: 1.025, y: 0, transformOrigin: transfrom},
                {webkitFilter:"blur(" + blurLifestyleStop.a + "px)",autoAlpha:1, ease: 'Sine.easeInOut', scale: 1, y: 0, transformOrigin: transfrom},.5);
              };
              if (lifestyle_img.element) {frame_1_in.fromTo(badge_img.element,.5,
                {webkitFilter:"blur(" + blurLifestyleStrt.a + "px)",autoAlpha:0, ease: 'Sine.easeInOut', scale: 1, transformOrigin: transfrom},
                {webkitFilter:"blur(" + blurLifestyleStop.a + "px)",autoAlpha:1, ease: 'Sine.easeInOut', scale: 1, transformOrigin: transfrom},.75);
              };
              if (lifestyle_img.element) {frame_1_in.fromTo(logo_img.element,.5,
                {webkitFilter:"blur(" + blurLifestyleStrt.a + "px)",autoAlpha:0, ease: 'Sine.easeInOut', scale: 1, transformOrigin: transfrom},
                {webkitFilter:"blur(" + blurLifestyleStop.a + "px)",autoAlpha:1, ease: 'Sine.easeInOut', scale: 1, transformOrigin: transfrom},1);
              };
              if (lifestyle_img.element) {frame_1_in.fromTo(lifestyle_img.element,1,
                {webkitFilter:"blur(" + blurLifestyleStrt.a + "px)",autoAlpha:0, ease: 'Sine.easeInOut', scale: 1.025, y: 0, transformOrigin: transfrom},
                {webkitFilter:"blur(" + blurLifestyleStop.a + "px)",autoAlpha:1, ease: 'Sine.easeInOut', scale: 1, y: 0, transformOrigin: transfrom},0);
              };
              var frame_1_out = new TimelineMax()
              if (lifestyle_img.element) {frame_1_out.to(lifestyle_img.element, 1, {webkitFilter:"blur(" + blurLifestyleStrt.a + "px)", y:340, ease: 'Sine.easeInOut',}, 1.5)};
              if (f1_headline_text.element) {frame_1_out.to(f1_headline_text.element, .8, {autoAlpha: 0, ease: 'Sine.easeInOut',webkitFilter:"blur(" + blurLifestyleStrt.a + "px)"}, 1.3)};
              if (cat1_img.element) {frame_1_out.from(cat1_img.element, 1.3, {autoAlpha: 0, y:-284, ease: 'Sine.easeInOut',}, 2)};
              if (cat2_img.element) {frame_1_out.from(cat2_img.element, 1.3, {autoAlpha: 0, y:-314, ease: 'Sine.easeInOut',},1.75)};
              if (cat3_img.element) {frame_1_out.from(cat3_img.element, 1.3, {autoAlpha: 0, y:-344, ease: 'Sine.easeInOut',},1.5)};
              if (f2_headline_text.element) {frame_1_out.from(f2_headline_text.element, 1.3, {autoAlpha: 0,ease: 'Sine.easeInOut',onComplete:activateClick}, 2)};

              var tl = new TimelineMax()
                .add(frame_1_in)
                .add(frame_1_out)

              var tlDuration = tl.duration();
              tl.duration(R.create("var").set({
                name: "duration",
                defaultValue: tlDuration,
                dataType: "Number",
                exposed: true
              }).render().value())

              //INTERACTION
              hit_area.on("click", adHit);
              hit_area.on("mouseenter", function() {hoverTextOn();});
              hit_area.on("mouseleave", function() {hoverTextOff();});
              cat1_img.on("click", adHit);
              cat2_img.on("click", adHit);
              cat3_img.on("click", adHit);

              function deactivateClicks() {
                
                prodArr.forEach(function (prod, i) {
                  TweenMax.set(prod.element, {pointerEvents: "none"});
                })
              };

              deactivateClicks();

              function activateClick() {
                
                var arr = [cat1_img, cat2_img, cat3_img, hit_area]
                var arrNone = [];
                for (var i = 0; i < arr.length; i++) {
                  arrNone.push(arr[i].style.pointerEvents = "auto");
                }
              }

              function hoverTextOff(){

              };

              function hoverTextOn(){

              };

              prodArr.forEach(function(prod, i){
                prod.on("mouseenter", function() {
                  handleHoverProd(prod, i);
                });
                prod.on("mouseleave", function(){
                  handleHoverProd(prod, i);
                });
              });

              function handleHoverProd (prod, i) {
                if (hovering === false) {
                  var blurElement = {a:0};
                  TweenMax.to(prodArr[i].element, .5, {transformOrigin:transfrom, scale:1.1,webkitFilter:"blur(" + blurElement.a + "px)",autoAlpha:1})
                  hoverTextOn();
                  hovering = true;
                } else {
                  var blurElement2 = {a:0};
                  TweenMax.to(prodArr[i].element, .5, {transformOrigin:transfrom, scale:1,webkitFilter:"blur(" + blurElement2.a + "px)",autoAlpha:1})
                  hoverTextOff();
                  hovering = false;
                }
              }
//
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