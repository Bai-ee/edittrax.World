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

        var ROSETTA_VERSION = "4.50";
        var context = String(ROSETTA_VERSION + "_"  + dmo.embedId).split("_").join(".");
        var parentDiv, stage, animate, timeoutTimer, startTimer, FOF_PIXEL_DENSITY;
        var evergreenImg = "evergreen.jpg";
        var CENTER_STAGE = false;

        function init(wrapperID) {
            var subdirectory = "149411_OPS_Monroe_FKT_Islamorada";
            var creativeName = "" || subdirectory;
            var companyID = "60655";
            var isSecure = (dmo.externalURL.indexOf("https:") > -1);



            var config = {
                context: context,
                waitSeconds: 5,
                paths: {},
                bundles: {
                    "Rosetta":["core.pack","ad.pack","cnvr.usweb.pack","cnvr.mojo.pack","filters.pack","hammer.pack","tweenmax.pack","thumbnails.pack","rotatorfade.pack","rotatorslide.pack"]
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
            config.paths["Rosetta"] = dmo.externalURL + "/atom/"+ROSETTA_VERSION+"/3.1.1/?scripts=" + "wrapper_start," + config.bundles.Rosetta.join(",") + ",wrapper_end" + dmo.atomSuffix;

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
                    placementWidth:Number(dmo.mediaWidth) || 160,
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
                        FOFVersion: R.create("var").set({name:"fof_version", dataType:"String", defaultValue:"4.0.2", exposed:false}).render().value(),
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
                l:R.create("div").set({width:"1px", height:height, backgroundColor:borderColor, left:0, top:0, zIndex:1346,  pointerEvents:"none", parentNode:stage}).render(),
                r:R.create("div").set({width:"1px", height:height, backgroundColor:borderColor, right:0, top:0, zIndex:1346, pointerEvents:"none",parentNode:stage}).render(),
                t:R.create("div").set({width:width, height:"1px", backgroundColor:borderColor, left:0, top:0, zIndex:1346, pointerEvents:"none", parentNode:stage}).render(),
                b:R.create("div").set({width:width, height:"1px", backgroundColor:borderColor, left:0, bottom:0, zIndex:1346, pointerEvents:"none", parentNode:stage}).render()
            };

            //apply CSS reset to stage class
            R.applyCSSReset(".stage");

            
			var bg_color = R.create("div").set({
				css:{
					left: 0,
					top: 0,
					zIndex: 3,
					width: 160,
					height: 600,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					backgroundColor: R.create("var").set({name:"bg_color", defaultValue:"#ffffff", dataType:"Color", required:false, exposed:true}).render().value(),
					borderRadius: R.create("var").set({name:"bg_border_radius", defaultValue:0, dataType:"Number", required:false, exposed:true}).render().value(),
					border: R.create("var").set({name:"bg_border", defaultValue:"0px solid #ffffff", dataType:"String", required:false, exposed:true}).render().value(),
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
					backgroundImage: R.create("var").set({name:"fg_img", defaultValue:"fg_img.png", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 0,
					top: 0,
					width: 160,
					height: 600,
					zIndex: 1336,
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
					backgroundImage: R.create("var").set({name:"style_img", defaultValue:"style_img.png", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 0,
					top: 0,
					width: 160,
					height: 600,
					zIndex: 1326,
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
					backgroundImage: R.create("var").set({name:"logo_img", defaultValue:"logo_img_Islamorado.png", dataType:"String", required:true, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 0,
					top: 0,
					width: 160,
					height: 600,
					zIndex: 515,
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

			var endcard_overlay_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"endcard_overlay_img", defaultValue:"endcard_overlay_img_2.png", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 0,
					top: 0,
					width: 160,
					height: 600,
					zIndex: 251,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"endcard_overlay_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "endcard_overlay_img"
				}
			}).render();

			var lifestyle_overlay_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"lifestyle_overlay_img", defaultValue:"lifestyle_overlay_img_2.png", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 0,
					top: 0,
					width: 160,
					height: 600,
					zIndex: 245,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"lifestyle_overlay_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "lifestyle_overlay_img"
				}
			}).render();

			var bg_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"bg_img", defaultValue:"bg_img.png", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 0,
					top: 0,
					width: 160,
					height: 600,
					zIndex: 14,
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
			var headline_textArr = [];
			var thumbNailsArr = [];
			var catImgVarsArr = [
					R.create("var").set({name:"cat_img1", defaultValue:"lifestyle_img1.jpg", dataType:"String", required:true, exposed:true}).render().value(),
					R.create("var").set({name:"cat_img2", defaultValue:"lifestyle_img2.jpg", dataType:"String", required:false, exposed:true}).render().value(),
					R.create("var").set({name:"cat_img3", defaultValue:"lifestyle_img3.jpg", dataType:"String", required:false, exposed:true}).render().value()
				];
				//CUSTOM
			var catTextVarsArr = [
					R.create("var").set({name:"headline_text1", defaultValue:"As far out to eat as you can go", dataType:"String", required:true, exposed:true}).render().value(),
					R.create("var").set({name:"headline_text2", defaultValue:"Balance your priorities", dataType:"String", required:true, exposed:true}).render().value(),
					R.create("var").set({name:"headline_text3", defaultValue:"Every Family tree needs roots", dataType:"String", required:true, exposed:true}).render().value()
			];
//
			var catImgsArr = [];
			var thumbNailsContainer = R.create("div").set({
				attr:{
					id: "thumbNailsContainer"
				},
				css:{
					name: "thumbNailsContainer",
					zIndex: 1039,
					left: 9,
					top: 595,
					width: 142,
					height: 5,
					pointerEvents: "none",
					visibility: "hidden"
				},
				rosetta:{
					parentNode: stage
				}
			}).render();

			var rotatorSlideContainer = R.create("div").set({
				attr:{
					id: "rotatorSlideContainer"
				},
				css:{
					name: "rotatorSlideContainer",
					zIndex: 61,
					left: 0,
					top: 0,
					width: 160,
					height: 600,
					pointerEvents: "none",
					visibility: "hidden",
					backgroundColor: R.create("var").set({name:"rotator_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				rosetta:{
					parentNode: stage
				}
			}).render();

			/* [THUMBNAILS_ACTIVE_STATES] */
			var thumbnails_active = R.create("style").set({
				className: "thumbnail-active-style",
				opacity: R.create("var").set({name:"tn_active_opacity", defaultValue:1, dataType:"Number", required:false, exposed:true}).render().value(),
				border: R.create("var").set({name:"tn_active_border", defaultValue:"5px solid #ff8332", dataType:"String", required:false, exposed:true}).render().value(),
					borderRadius: R.create("var").set({name:"tn_active_radius", defaultValue:"0px", dataType:"Number", required:false, exposed:true}).render().value(),
			backgroundColor: R.create("var").set({name:"tn_active_background_color", defaultValue:"#ff8332", dataType:"Color", required:false, exposed:true}).render().value(),
			});

			var thumbnails_inactive = R.create("style").set({
				className: "thumbnail-inactive-style",
				opacity: R.create("var").set({name:"tn_inactive_opacity", defaultValue:1, dataType:"Number", required:false, exposed:true}).render().value(),
				border: R.create("var").set({name:"tn_inactive_border", defaultValue:"5px solid #ffffff", dataType:"String", required:false, exposed:true}).render().value(),
					borderRadius: R.create("var").set({name:"tn_inactive_radius", defaultValue:"0px", dataType:"Number", required:false, exposed:true}).render().value(),
			backgroundColor: R.create("var").set({name:"tn_inactive_background_color", defaultValue:"#ffffff", dataType:"Color", required:false, exposed:true}).render().value(),
			});

			for (var i = 0; i < catImgVarsArr.length; i++) {
				var catImg = R.create("div").set({
					attr: {
						id: "cat_img" + (i + 1)
					},
					css: {
						name: "cat_img" + (i + 1),
						width: 160,
						height: 600,
						backgroundImage: catImgVarsArr[i],
						backgroundSize: "cover",
						backgroundPosition: "center center",
						backgroundColor: R.create("var").set({name:"cat_img_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
						border: R.create("var").set({name:"cat_img_border", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
						borderRadius: R.create("var").set({name:"cat_img_radius", defaultValue:0, dataType:"String", required:false, exposed:true}).render().value(),
						position: "absolute",
						visibility: "hidden",
						cursor: "pointer",
						pointerEvents: "auto"
					},
					rosetta: {
						parentNode: rotatorSlideContainer,
						data: {
							hitIndex: i + 1
						}
					}
				}).render().on("click", adHit);

				var thumbnail = R.create("div").set({
					attr: {
						id: "thumbnail" + (i + 1)
					},
					css: {
						width: 44,
						height: 5,
						backgroundSize: "contain",
						backgroundPosition: "center center",
						backgroundImage: catImgVarsArr[i]
					}
				}).render();

				var headline_text = R.create("div").set({
					css:{
						color: R.create("var").set({name:"headline_text_color", defaultValue:"#ffffff", dataType:"Color", required:false, exposed:true}).render().value(),
						fontSize: 20,
						fontFamily: 12018,
						fontStyle: "Bold",
						lineHeight: 1.2,
						letterSpacing: 0,
						textAlign: "center",
						verticalAlign: "middle",
						marginTop: 0,
						backgroundColor: R.create("var").set({name:"headline_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
						border: "",
						borderRadius: 0,
						padding: "",
						left: 21,
						top: 157,
						width: 118,
						height: 144,
						zIndex: 1157,
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
						id: "headline_text" + (i + 1),
						textContent: catTextVarsArr[i]
					},
					data:{
						hitIndex: i + 1
					}
				}).render().on("click", adHit);
				
				headline_textArr.push(headline_text);
				thumbNailsArr.push(thumbnail);
				catImgsArr.push(catImg);
			};

			var headlineTextRotator;
			var thumbNails;
			var rotatorSlide;
			
			function startRotator() {
				rotatorSlide = R.create("rotatorslide").set({
					id: "rotatorSlide",
					container: rotatorSlideContainer,
					direction: "horizontal",
					width: 160,
					height: 600,
					zIndex: 61,
					spacing: 0,
					autoPlay: true,
					clickIndexOffset: 0,
					elements: catImgsArr,
					endOnFirst: true,
					numLoops: 1,
					onDuration: 2,
					startIndex: 0,
					transitionDuration: 0.5,
					ease: "Power0.easeNone"
				}).render();

				headlineTextRotator = R.create("rotatorfade").set({
					elements: headline_textArr,
					transitionDuration:0.5,
					onDuration:2,
					autoPlay: false
				}).render();

				thumbNails = R.create("thumbnails").set({
					direction: "horizontal",
					elements: thumbNailsArr,
					textAlign: "center",
					marginHorizontal: 5,
					container: thumbNailsContainer,
					active: thumbnails_active,
					inactive: thumbnails_inactive
				}).render();

				if (rotatorSlide.elements.length <= 1){
					thumbNailsContainer.element.style.display = "none";
				}

				headlineTextRotator.controlledBy = [thumbNails, rotatorSlide];
				thumbNails.controlledBy = [headlineTextRotator, rotatorSlide];
				rotatorSlide.controlledBy = [headlineTextRotator, thumbNails];
			};

			/* [BATCH_LOADING] */
			var requiredArr = [logo_img];
			var allElementsArr = [fg_img, style_img, endcard_overlay_img, lifestyle_overlay_img, bg_img, bg_color, thumbNailsContainer, rotatorSlideContainer];
			
			function additionalSettings() {
				};
			
			var megaBatch = R.create("batch")
				.require(requiredArr)
				.add(headline_textArr)
				.require(thumbNailsArr, 1)
				.require(catImgsArr, 1)
				.add(allElementsArr)
				.render({
					success: function(){
						hideFailed(R.filter.removeParallel(headline_textArr,thumbNailsArr,catImgsArr,R.filter.parallel(catImgsArr)));
						displayLoaded([
							R.filter.success(requiredArr),
							R.filter.success(headline_textArr),
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
			var clickOut = R.create("var").set({name:"mplx_clickOut", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value();
			window.open(clickOut);
			
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