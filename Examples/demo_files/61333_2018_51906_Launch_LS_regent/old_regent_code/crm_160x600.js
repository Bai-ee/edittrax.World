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

        var ROSETTA_VERSION = "4.30";
        var context = String(ROSETTA_VERSION + "_"  + dmo.embedId).split("_").join(".");
        var parentDiv, stage, animate, timeoutTimer, startTimer, FOF_PIXEL_DENSITY;
        var evergreenImg = "evergreen.jpg";
        var CENTER_STAGE = false

        function init(wrapperID) {
            var subdirectory = "31581_LCH_rssc";
            var creativeName = "" || subdirectory;
            var companyID = "61333";
            var isSecure = (dmo.externalURL.indexOf("https:") > -1);



            var config = {
                context: context,
                waitSeconds: 5,
                paths: {},
                bundles: {
                    "Rosetta":["core.pack","ad.pack","cnvr.advantage.pack","cnvr.usweb.pack","filters.pack","alignmentgroup.pack","tweenmax.pack","fontface.pack"]
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
                    placementWidth:Number(dmo.mediaWidth) || 160,
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
                        FOFVersion: R.create("var").set({name:"fof_version", dataType:"String", defaultValue:"1.8.1", exposed:false}).render().value(),
                        isSecure: R.create("var").set({name:"dtm_secure", dataType:"Boolean", defaultValue:Platform.fetch().isSecure, exposed:false}).render().value(),
                        analytics: dmo.logEvent,
                        analyticsScope: dmo
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
                l:R.create("div").set({width:"1px", height:height, backgroundColor:borderColor, left:0, top:0, zIndex:512,  pointerEvents:"none", parentNode:stage}).render(),
                r:R.create("div").set({width:"1px", height:height, backgroundColor:borderColor, right:0, top:0, zIndex:512, pointerEvents:"none",parentNode:stage}).render(),
                t:R.create("div").set({width:width, height:"1px", backgroundColor:borderColor, left:0, top:0, zIndex:512, pointerEvents:"none", parentNode:stage}).render(),
                b:R.create("div").set({width:width, height:"1px", backgroundColor:borderColor, left:0, bottom:0, zIndex:512, pointerEvents:"none", parentNode:stage}).render()
            };

            R.applyCSSReset("stage");

            
			var details_text = R.create("div").set({
				css:{color:R.create("var").set({name:"details_text_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),fontSize:8,fontFamily:10039,fontStyle:"Medium",lineHeight:1.23,letterSpacing:0,textAlign:"left",verticalAlign:"middle",marginTop:0,backgroundColor:R.create("var").set({name:"details_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),padding:R.create("var").set({name:"details_text_padding", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),left:6,top:584,width:49,height:12,zIndex:294,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},
				rosetta:{
					parentNode:stage,pixelDensity:FOF_PIXEL_DENSITY,forceLineHeight:true
				},
				attr:{
					id: "details_text",
					textContent: R.create("var").set({name:"details_text", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value()
				}
			}).render();


            var destination_text_val = R.create("var").set({name:"destination_text", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value();
			var destination_text = R.create("div").set({
				css:{color:R.create("var").set({name:"destination_text_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),fontSize:12,fontFamily:11534,fontStyle:"BookFamily",lineHeight:1.15,letterSpacing:1,textAlign:"center",verticalAlign:"middle",marginTop:0,backgroundColor:R.create("var").set({name:"destination_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),padding:R.create("var").set({name:"destination_text_padding", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),left:6,top:381,width:149,height:35,zIndex:284,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},
				rosetta:{
					parentNode:stage,pixelDensity:FOF_PIXEL_DENSITY,forceLineHeight:true
				},
				attr:{
					id: "destination_text",
					textContent: destination_text_val
				}
			}).render();

			var cta_text = R.create("div").set({
				css:{color:R.create("var").set({name:"cta_text_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
                fontSize:11,fontFamily:11534,fontStyle:"BookFamily",lineHeight:1.2,letterSpacing:0,textAlign:"center",verticalAlign:"middle",marginTop:0,
                // backgroundColor:R.create("var").set({name:"cta_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
                // padding:R.create("var").set({name:"cta_text_padding", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
                left:18,top:548,width:124,height:21,zIndex:280,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},
				rosetta:{
					parentNode:stage,pixelDensity:FOF_PIXEL_DENSITY,forceLineHeight:true
				},
				attr:{
					id: "cta_text",
					textContent: R.create("var").set({name:"cta_text", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value()
				}
			}).render();

            var cta_text_shape = R.create("div").set({
                css:{left:18,top:546,width:124,height:21,zIndex:278,pointerEvents:"none",cursor:"auto",position:"absolute",backgroundColor:R.create("var").set({name:"cta_text_shape_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),borderRadius:0,visibility:"hidden"},
                rosetta:{
                    parentNode:stage
                },
                attr:{
                    id: "cta_text_shape"
                }
            }).render();

            var text_container = R.create("div").set({
                css:{
                marginTop: 379,left:0,top:0,width:160,height:166,zIndex:265,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},
                rosetta:{
                    parentNode:stage,pixelDensity:FOF_PIXEL_DENSITY,forceLineHeight:true
                },
                attr:{
                    id: "text_container"
                }
            });


			var headline_text = R.create("div").set({
				css:{color:R.create("var").set({name:"headline_text_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
                fontSize:16,fontFamily:11534,fontStyle:"BookFamily",lineHeight:1.01,letterSpacing:1,textAlign:"center",verticalAlign:"middle",marginTop:0,
                backgroundColor:R.create("var").set({name:"headline_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
                padding:R.create("var").set({name:"headline_text_padding", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
                left:5,top:42,width:150,height:65,zIndex:271,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},
				rosetta:{
					parentNode:text_container,pixelDensity:FOF_PIXEL_DENSITY,forceLineHeight:true
				},
				attr:{
					id: "headline_text",
					textContent: R.create("var").set({name:"headline_text", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value()
				}
			});

			var subhead_text = R.create("div").set({
				css:{color:R.create("var").set({name:"subhead_text_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
                fontSize:9,fontFamily:10039,fontStyle:"Medium",lineHeight:1.22,letterSpacing:1,textAlign:"center",verticalAlign:"middle",marginTop:5,
                backgroundColor:R.create("var").set({name:"subhead_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
                padding:R.create("var").set({name:"subhead_text_padding", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
                left:7,top:112,width:145,height:44,zIndex:270,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},
				rosetta:{
					parentNode:text_container,pixelDensity:FOF_PIXEL_DENSITY,forceLineHeight:true
				},
				attr:{
					id: "subhead_text",
					textContent: R.create("var").set({name:"subhead_text", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value()
				}
			});

			var bg_color = R.create("div").set({
				css:{left:0,top:0,zIndex:4,width:160,height:600,pointerEvents:"none",cursor:"auto",position:"absolute",backgroundColor:R.create("var").set({name:"bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),borderRadius:0,visibility:"hidden"},
				rosetta:{
					parentNode:stage
				},
				attr:{
					id: "bg_color"
				}
			}).render();

			var fg_img = R.create("div").set({
				css:{backgroundImage:R.create("var").set({name:"fg_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),backgroundSize:"contain",backgroundPosition:"center center",left:0,top:0,width:160,height:600,zIndex:502,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"fg_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "fg_img"
				}
			}).render();

			var style_img = R.create("div").set({
				css:{backgroundImage:R.create("var").set({name:"style_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),backgroundSize:"contain",backgroundPosition:"center center",left:0,top:0,width:160,height:600,zIndex:494,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"style_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "style_img"
				}
			}).render();

			var logo_img = R.create("div").set({
				css:{backgroundImage:R.create("var").set({name:"logo_img", defaultValue:"", dataType:"String", required:true, exposed:true}).render().value(),backgroundSize:"contain",backgroundPosition:"center center",left:0,top:0,width:160,height:600,zIndex:165,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"logo_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "logo_img"
				}
			}).render();

			var gradient_img_color = R.create("div").set({
				css:{backgroundImage:R.create("var").set({name:"gradient_img_color", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),backgroundSize:"contain",backgroundPosition:"center center",left:0,top:0,width:160,height:600,zIndex:121,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"gradient_img_color_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "gradient_img_color"
				}
			}).render();

			// var cta_img = R.create("div").set({
			// 	css:{backgroundImage:R.create("var").set({name:"cta_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),backgroundSize:"contain",backgroundPosition:"center center",left:0,top:0,width:160,height:600,zIndex:117,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},
			// 	rosetta:{
			// 		parentNode:stage,
			// 		tint: R.create("var").set({name:"cta_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
			// 	},
			// 	attr:{
			// 		id: "cta_img"
			// 	}
			// }).render();

            var badge_img_val = R.create("var").set({name:"badge_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value();
			var badge_img = R.create("div").set({
				css:{backgroundImage:badge_img_val,backgroundSize:"contain",backgroundPosition:"center center",left:0,top:0,width:160,height:600,zIndex:111,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"badge_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "badge_img"
				}
			}).render();

			var lifestyle_img = R.create("div").set({
				css:{backgroundImage:R.create("var").set({name:"lifestyle_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
                backgroundSize:"contain",backgroundPosition:"center top",left:0,top:4,width:160,height:378,zIndex:86,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"lifestyle_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "lifestyle_img"
				}
			}).render();

			var panning_lifestyle_img = R.create("div").set({
				css:{backgroundImage:R.create("var").set({name:"panning_lifestyle_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),
                backgroundSize:"contain",backgroundPosition:"center top",left:0,top:0,width:220,height:378,zIndex:57,pointerEvents:"none",cursor:"auto",position:"absolute",
                visibility:"hidden"},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"panning_lifestyle_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "panning_lifestyle_img"
				}
			}).render();

			var text_box_img = R.create("div").set({
				css:{backgroundImage:R.create("var").set({name:"text_box_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),backgroundSize:"contain",backgroundPosition:"center center",left:0,top:0,width:160,height:600,zIndex:44,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"text_box_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "text_box_img"
				}
			}).render();

			var bg_img = R.create("div").set({
				css:{backgroundImage:R.create("var").set({name:"bg_img", defaultValue:"", dataType:"String", required:false, exposed:true}).render().value(),backgroundSize:"contain",backgroundPosition:"center center",left:0,top:0,width:160,height:600,zIndex:12,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"bg_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "bg_img"
				}
			}).render();

             // /custom vars    
            var panning_start_position = R.create('var').set({name:'panning_start_position', defaultValue:"", required:false, exposed:true}).render().value();
            var panning_duration = R.create('var').set({name:'panning_duration', defaultValue:"", required:false, exposed:true}).render().value(); 
            var panning_delay = R.create('var').set({name:'panning_delay', defaultValue:"", required:false, exposed:true}).render().value(); 
            var panning_ease = R.create('var').set({name:'panning_ease', defaultValue:"", required:false, exposed:true}).render().value(); 
			
			/* CREATING COMPONENTS */
			
			/* BATCH LOADING */
			var requiredArr = [logo_img];
			var Group4Array = [headline_text,subhead_text];
			var allElementsArr = [details_text,destination_text,text_container,cta_text,cta_text_shape,fg_img,style_img,gradient_img_color,/*cta_img,*/badge_img,lifestyle_img,panning_lifestyle_img,text_box_img,bg_img,bg_color];
			
			var Group4 = R.create("AlignmentGroup").set({
				verticalAlign: "middle"
			}).add(Group4Array).render();
			
			function additionalSettings() {
				}
			
			var megaBatch = R.create("batch")
				.require(requiredArr)
				.add(Group4Array)
				.add(Group4)
				.add(allElementsArr)
				.render({
					success: function(){
						displayLoaded([
							R.filter.success(requiredArr),
							R.filter.success(Group4Array),
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
			}
			
			var hit_area = R.create("div").set({id:"ad_hit", width: width, height: height, pointerEvents: "auto", cursor: "pointer", zIndex:0, parentNode:stage});
			hit_area.on("click", adHit);
				
            /* var hit_area = R.create("div").set({id:"ad_hit", width: width, height: height, pointerEvents: "auto", cursor: "pointer", zIndex:100, parentNode:stage});
            hit_area.on("click", adHit); */

            /* [END_CREATE_ELEMENTS] */
            //creativeReady()

            // All Animation goes here
            function animateElements() {
                var has_destination_text_val = (destination_text_val != "") && (destination_text_val != undefined);
                var has_badge_img_val = badge_img_val  != "" && badge_img_val != undefined;

                if(has_destination_text_val && has_badge_img_val){
                    lifestyle_img.style.display = 'none';
                    // TweenMax.to(panning_lifestyle_img.element,6,{x: -60, ease: "Power1.easeInOut", delay:1.2, force3D:true});

                     // PANNING POSITION CUSTOM
                    var viewport_width = 160;
                    var viewport_height = 300;
                    TweenMax.set(lifestyle_img.element, {left:0, x:0, y:0});
                    if (panning_lifestyle_img != undefined) {
                        if (panning_duration == undefined || panning_duration == ""){
                            panning_duration = 6;
                        }

                        if(panning_delay == undefined || panning_delay == ""){
                            panning_delay = 1.5;
                        }

                        if(panning_ease == undefined || panning_ease == "" || panning_ease.indexOf(".") == -1){
                            panning_ease = "Quart.easeOut";
                        }

                        if(panning_start_position == undefined || panning_start_position == ""){
                            panning_start_position = "topleft";
                        }else{
                            panning_start_position = panning_start_position.toLowerCase();
                        }   
                    }

                    
                    var style_left = parseInt(panning_lifestyle_img.style.width) - viewport_width;
                    var style_top = parseInt(panning_lifestyle_img.style.height) - viewport_height;
                    var panning_lifestyle_img_width = parseInt(panning_lifestyle_img.style.width);
                    console.log("style_left " + style_left);
                    console.log("panning_lifestyle_img.style.width " + panning_lifestyle_img.style.width);
                    if(parseInt(panning_lifestyle_img.style.width) > viewport_width){
                        var tl = new TimelineMax();
                        if(panning_start_position.indexOf("left") > -1){
                            console.log("going to the left!")
                            tl.to(panning_lifestyle_img.element,Number(panning_duration), {x:-style_left, y:0, ease:panning_ease, delay:panning_delay, force3D:true});
                        }else if(panning_start_position.indexOf("right") > -1){
                            console.log("going to the right!")
                            tl.set(panning_lifestyle_img.element, {x:-style_left, y:0});
                            tl.to(panning_lifestyle_img.element,Number(panning_duration), {x:0, y:0, ease:panning_ease, delay:panning_delay, force3D:true});
                        }
                    }

                    // END PANNING POSITION CUSTOM //

                }else{
                    var headline_text_height = parseInt(headline_text.height);
                    var subhead_text_height = parseInt(subhead_text.height);
                    var ref_box_height = parseInt(text_container.height);
                    var offset = (ref_box_height - (headline_text_height + subhead_text_height))/2;
                    // console.log(offset);
                    // console.log(offset + subhead_text_height);
                    TweenMax.set(headline_text.element,{top:offset});
                    TweenMax.set(subhead_text.element,{top:offset + headline_text_height});
                }// END HAS DESTINATIONVAL LOGIC
                    
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
                /* [INSERT_PLUGIN_DEFS] */
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