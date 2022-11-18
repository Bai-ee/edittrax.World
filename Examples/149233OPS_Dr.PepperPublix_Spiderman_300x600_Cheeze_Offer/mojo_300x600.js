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
        var R, Platform, Settings, Analytics, AnalyticsContent, TweenMax, TweenLite, TimelineLite, TimelineMax, EventForwarding, Hammer,/* [INSERT_PLUGIN_VARS] */

//CUSTOM PARALLAX STEP 1/6 DC//////////////////////////////////////////////////////////   
            // Add Parallax var      
            Parallax;
///////////////////////////////////////////////////////////////////////////////////////

        var ROSETTA_VERSION = "4.50";
        var context = String(ROSETTA_VERSION + "_"  + dmo.embedId).split("_").join(".");
        var parentDiv, stage, animate, timeoutTimer, startTimer, FOF_PIXEL_DENSITY;
        var evergreenImg = "evergreen.jpg";
        var CENTER_STAGE = false;

        function init(wrapperID) {
            var subdirectory = "149233_OPS_DrPepper";
            var creativeName = "" || subdirectory;
            var companyID = "62932";
            var isSecure = (dmo.externalURL.indexOf("https:") > -1);



            var config = {
                context: context,
                waitSeconds: 5,
                paths: {},
                bundles: {
                    "Rosetta":["core.pack","ad.pack","cnvr.usweb.pack","cnvr.mojo.pack","filters.pack","tweenmax.pack","fontface.pack",
//CUSTOM PARALLAX STEP 2/6 DC//////////////////////////////////////////////////////////
              //Add parallax.pack
              	"parallax.pack"] 
///////////////////////////////////////////////////////////////////////////////////////
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
                l:R.create("div").set({width:"1px", height:height, backgroundColor:borderColor, left:0, top:0, zIndex:965,  pointerEvents:"none", parentNode:stage}).render(),
                r:R.create("div").set({width:"1px", height:height, backgroundColor:borderColor, right:0, top:0, zIndex:965, pointerEvents:"none",parentNode:stage}).render(),
                t:R.create("div").set({width:width, height:"1px", backgroundColor:borderColor, left:0, top:0, zIndex:965, pointerEvents:"none", parentNode:stage}).render(),
                b:R.create("div").set({width:width, height:"1px", backgroundColor:borderColor, left:0, bottom:0, zIndex:965, pointerEvents:"none", parentNode:stage}).render()
            };

            //apply CSS reset to stage class
            R.applyCSSReset(".stage");
            
			var details_text = R.create("div").set({
				css:{
					color: R.create("var").set({name:"details_text_color", defaultValue:"#ffffff", dataType:"Color", required:false, exposed:true}).render().value(),
					fontSize: 8,
					fontFamily: 12090,
					fontStyle: "MediumFamily",
					lineHeight: 1,
					letterSpacing: 0,
					textAlign: "left",
					verticalAlign: "middle",
					marginTop: 0,
					backgroundColor: R.create("var").set({name:"details_text_bg_color", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value(),
					border: "",
					borderRadius: 0,
					padding: "",
					left: 256,
					top: 586,
					width: 40,
					height: 9,
					zIndex: 793,
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
					textContent: R.create("var").set({name:"details_text", defaultValue:"<b><u>*DETAILS</u></b>", dataType:"String", required:false, exposed:true}).render().value()
				}
			}).render().on("click", displayLegal);

			var bg_color = R.create("div").set({
				css:{
					left: 0,
					top: 0,
					zIndex: 5,
					width: 300,
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
                 }).render().setAttribute("data-depth", "0.5"); 
          
//////////////////////////////////////////////////////////////////////////

//CUSTOM PARALLAX STEP 4/6////////////////////////////////////////////////                 
                //Assign classname "layer" to each element. Note: The classname "layer" can not be changed.  
                bg_color.element.className = "layer"; 
          
//////////////////////////////////////////////////////////////////////////

			var fg_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"fg_img", defaultValue:"fg_img.png", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 0,
					top: 0,
					width: 300,
					height: 600,
					zIndex: 955,
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
					width: 300,
					height: 600,
					zIndex: 947,
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
                 }).render().setAttribute("data-depth", "0.05"); 
          
//////////////////////////////////////////////////////////////////////////

//CUSTOM PARALLAX STEP 4/6////////////////////////////////////////////////                 
                //Assign classname "layer" to each element. Note: The classname "layer" can not be changed.  
                style_img.element.className = "layer"; 
          
//////////////////////////////////////////////////////////////////////////

//CUSTOM/////////////////////////////////////////////////////////////////////////

var cheezeIt = true;

if(cheezeIt){

									var cheezit_flavorlabel_img = R.create("div").set({
										css:{
											backgroundImage: R.create("var").set({name:"cheezit_flavorlabel_img", defaultValue:"cheezit_flavorlabel_img.png", dataType:"String", required:false, exposed:true}).render().value(),
											backgroundSize: "contain",
											backgroundPosition: "center center",
											left: 0,
											top: 0,
											width: 300,
											height: 600,
											zIndex: 745,
											pointerEvents: "none",
											cursor: "auto",
											position: "absolute",
											visibility: "hidden"
										},
										rosetta:{
											parentNode:stage,
											tint: R.create("var").set({name:"cheezit_flavorlabel_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
										},
										attr:{
											id: "cheezit_flavorlabel_img"
										}
						                 }).render().setAttribute("data-depth", "0.04"); 
						          
						//////////////////////////////////////////////////////////////////////////

						//CUSTOM PARALLAX STEP 4/6////////////////////////////////////////////////                 
						                //Assign classname "layer" to each element. Note: The classname "layer" can not be changed.  
						                cheezit_flavorlabel_img.element.className = "layer"; 
						          
						//////////////////////////////////////////////////////////////////////////

										var cheezit_drpepper_limitedpack_img = R.create("div").set({
											css:{
												backgroundImage: R.create("var").set({name:"cheezit_drpepper_limitedpack_img", defaultValue:"cheezit_drpepper_limitedpack_img.png", dataType:"String", required:false, exposed:true}).render().value(),
												backgroundSize: "contain",
												backgroundPosition: "center center",
												left: 0,
												top: 0,
												width: 300,
												height: 600,
												zIndex: 733,
												pointerEvents: "auto",
												cursor: "auto",
												position: "absolute",
												visibility: "hidden"
											},
											rosetta:{
												parentNode:stage,
												tint: R.create("var").set({name:"cheezit_drpepper_limitedpack_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
											},
											attr:{
												id: "cheezit_drpepper_limitedpack_img"
											}
							                 }).render().setAttribute("data-depth", "0.05"); 
							          
							//////////////////////////////////////////////////////////////////////////

							//CUSTOM PARALLAX STEP 4/6////////////////////////////////////////////////                 
							                //Assign classname "layer" to each element. Note: The classname "layer" can not be changed.  
							                cheezit_drpepper_limitedpack_img.element.className = "layer"; 
							          
							//////////////////////////////////////////////////////////////////////////

										var cheezit_drpepper_regualarpack_img = R.create("div").set({
											css:{
												backgroundImage: R.create("var").set({name:"cheezit_drpepper_regualarpack_img", defaultValue:"cheezit_drpepper_regualarpack_img.png", dataType:"String", required:false, exposed:true}).render().value(),
												backgroundSize: "contain",
												backgroundPosition: "center center",
												left: 0,
												top: 0,
												width: 300,
												height: 600,
												zIndex: 726,
												pointerEvents: "none",
												cursor: "auto",
												position: "absolute",
												visibility: "hidden"
											},
											rosetta:{
												parentNode:stage,
												tint: R.create("var").set({name:"cheezit_drpepper_regualarpack_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
											},
											attr:{
												id: "cheezit_drpepper_regualarpack_img"
											}
							                 }).render().setAttribute("data-depth", "0.02"); 
							          
							//////////////////////////////////////////////////////////////////////////

							//CUSTOM PARALLAX STEP 4/6////////////////////////////////////////////////                 
							                //Assign classname "layer" to each element. Note: The classname "layer" can not be changed.  
							                cheezit_drpepper_regualarpack_img.element.className = "layer"; 
							          
							//////////////////////////////////////////////////////////////////////////

										var cheezit_img = R.create("div").set({
											css:{
												backgroundImage: R.create("var").set({name:"cheezit_img", defaultValue:"cheezit_img.png", dataType:"String", required:false, exposed:true}).render().value(),
												backgroundSize: "contain",
												backgroundPosition: "center center",
												left: 0,
												top: 0,
												width: 300,
												height: 600,
												zIndex: 719,
												pointerEvents: "none",
												cursor: "auto",
												position: "absolute",
												visibility: "hidden"
											},
											rosetta:{
												parentNode:stage,
												tint: R.create("var").set({name:"cheezit_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
											},
											attr:{
												id: "cheezit_img"
											}
							                 }).render().setAttribute("data-depth", "0.06"); 
							          
							//////////////////////////////////////////////////////////////////////////

							//CUSTOM PARALLAX STEP 4/6////////////////////////////////////////////////                 
							                //Assign classname "layer" to each element. Note: The classname "layer" can not be changed.  
							                cheezit_img.element.className = "layer"; 
							          
							//////////////////////////////////////////////////////////////////////////

										var cheezit_cta_img = R.create("div").set({
											css:{
												backgroundImage: R.create("var").set({name:"cheezit_cta_img", defaultValue:"cheezit_cta_img.png", dataType:"String", required:false, exposed:true}).render().value(),
												backgroundSize: "contain",
												backgroundPosition: "center center",
												left: 0,
												top: 0,
												width: 300,
												height: 600,
												zIndex: 597,
												pointerEvents: "none",
												cursor: "auto",
												position: "absolute",
												visibility: "hidden"
											},
											rosetta:{
												parentNode:stage,
												tint: R.create("var").set({name:"cheezit_cta_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
											},
											attr:{
												id: "cheezit_cta_img"
											}
							                 }).render().setAttribute("data-depth", "0.05"); 
							          
							//////////////////////////////////////////////////////////////////////////

							//CUSTOM PARALLAX STEP 4/6////////////////////////////////////////////////                 
							                //Assign classname "layer" to each element. Note: The classname "layer" can not be changed.  
							                cheezit_cta_img.element.className = "layer"; 
							          
							//////////////////////////////////////////////////////////////////////////

										var cheezit_headline_img = R.create("div").set({
											css:{
												backgroundImage: R.create("var").set({name:"cheezit_headline_img", defaultValue:"cheezit_headline_img.png", dataType:"String", required:false, exposed:true}).render().value(),
												backgroundSize: "contain",
												backgroundPosition: "center center",
												left: 0,
												top: 0,
												width: 300,
												height: 600,
												zIndex: 503,
												pointerEvents: "none",
												cursor: "auto",
												position: "absolute",
												visibility: "hidden"
											},
											rosetta:{
												parentNode:stage,
												tint: R.create("var").set({name:"cheezit_headline_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
											},
											attr:{
												id: "cheezit_headline_img"
											}
							                 }).render().setAttribute("data-depth", "0.08"); 
							          
							//////////////////////////////////////////////////////////////////////////

							//CUSTOM PARALLAX STEP 4/6////////////////////////////////////////////////                 
							                //Assign classname "layer" to each element. Note: The classname "layer" can not be changed.  
							                cheezit_headline_img.element.className = "layer"; 
							          
							//////////////////////////////////////////////////////////////////////////

} else {

											var flavorlabel_img = R.create("div").set({
												css:{
													backgroundImage: R.create("var").set({name:"flavorlabel_img", defaultValue:"flavorlabel_img.png", dataType:"String", required:false, exposed:true}).render().value(),
													backgroundSize: "contain",
													backgroundPosition: "center center",
													left: 0,
													top: 0,
													width: 300,
													height: 600,
													zIndex: 488,
													pointerEvents: "none",
													cursor: "auto",
													position: "absolute",
													visibility: "hidden"
												},
												rosetta:{
													parentNode:stage,
													tint: R.create("var").set({name:"flavorlabel_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
												},
												attr:{
													id: "flavorlabel_img"
												}
								                 }).render().setAttribute("data-depth", "0.04"); 
								          
								//////////////////////////////////////////////////////////////////////////

								//CUSTOM PARALLAX STEP 4/6////////////////////////////////////////////////                 
								                //Assign classname "layer" to each element. Note: The classname "layer" can not be changed.  
								                flavorlabel_img.element.className = "layer"; 
								          
								//////////////////////////////////////////////////////////////////////////

											var bottle_img = R.create("div").set({
												css:{
													backgroundImage: R.create("var").set({name:"bottle_img", defaultValue:"bottle_img.png", dataType:"String", required:false, exposed:true}).render().value(),
													backgroundSize: "contain",
													backgroundPosition: "center center",
													left: 0,
													top: 0,
													width: 300,
													height: 600,
													zIndex: 483,
													pointerEvents: "none",
													cursor: "auto",
													position: "absolute",
													visibility: "hidden"
												},
												rosetta:{
													parentNode:stage,
													tint: R.create("var").set({name:"bottle_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
												},
												attr:{
													id: "bottle_img"
												}
								                 }).render().setAttribute("data-depth", "0.06"); 
								          
								//////////////////////////////////////////////////////////////////////////

								//CUSTOM PARALLAX STEP 4/6////////////////////////////////////////////////                 
								                //Assign classname "layer" to each element. Note: The classname "layer" can not be changed.  
								                bottle_img.element.className = "layer"; 
								          
								//////////////////////////////////////////////////////////////////////////

											var pack_img = R.create("div").set({
												css:{
													backgroundImage: R.create("var").set({name:"pack_img", defaultValue:"pack_img.png", dataType:"String", required:false, exposed:true}).render().value(),
													backgroundSize: "contain",
													backgroundPosition: "center center",
													left: 0,
													top: 0,
													width: 300,
													height: 600,
													zIndex: 476,
													pointerEvents: "none",
													cursor: "auto",
													position: "absolute",
													visibility: "hidden"
												},
												rosetta:{
													parentNode:stage,
													tint: R.create("var").set({name:"pack_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
												},
												attr:{
													id: "pack_img"
												}
								                 }).render().setAttribute("data-depth", "0.02"); 
								          
								//////////////////////////////////////////////////////////////////////////

								//CUSTOM PARALLAX STEP 4/6////////////////////////////////////////////////                 
								                //Assign classname "layer" to each element. Note: The classname "layer" can not be changed.  
								                pack_img.element.className = "layer"; 
								          
								//////////////////////////////////////////////////////////////////////////

											var cta_img = R.create("div").set({
												css:{
													backgroundImage: R.create("var").set({name:"cta_img", defaultValue:"cta_img.png", dataType:"String", required:false, exposed:true}).render().value(),
													backgroundSize: "contain",
													backgroundPosition: "center center",
													left: 0,
													top: 0,
													width: 300,
													height: 600,
													zIndex: 423,
													pointerEvents: "none",
													cursor: "auto",
													position: "absolute",
													visibility: "hidden"
												},
												rosetta:{
													parentNode:stage,
													tint: R.create("var").set({name:"cta_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
												},
												attr:{
													id: "cta_img"
												}
											}).render();

											var headline_copy_img = R.create("div").set({
												css:{
													backgroundImage: R.create("var").set({name:"headline_copy_img", defaultValue:"headline_copy_img.png", dataType:"String", required:true, exposed:true}).render().value(),
													backgroundSize: "contain",
													backgroundPosition: "center center",
													left: 0,
													top: 0,
													width: 300,
													height: 600,
													zIndex: 164,
													pointerEvents: "none",
													cursor: "auto",
													position: "absolute",
													visibility: "hidden"
												},
												rosetta:{
													parentNode:stage,
													tint: R.create("var").set({name:"headline_copy_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
												},
												attr:{
													id: "headline_copy_img"
												}
								                 }).render().setAttribute("data-depth", "0.08"); 
								          
								//////////////////////////////////////////////////////////////////////////

								//CUSTOM PARALLAX STEP 4/6////////////////////////////////////////////////                 
								                //Assign classname "layer" to each element. Note: The classname "layer" can not be changed.  
								                headline_copy_img.element.className = "layer"; 
								          
								//////////////////////////////////////////////////////////////////////////

}

			var spiderman_logo_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"spiderman_logo_img", defaultValue:"spiderman_logo_img.png", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 0,
					top: 0,
					width: 300,
					height: 600,
					zIndex: 102,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"spiderman_logo_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "spiderman_logo_img"
				}
                 }).render().setAttribute("data-depth", "0.09"); 
          
//////////////////////////////////////////////////////////////////////////

//CUSTOM PARALLAX STEP 4/6////////////////////////////////////////////////                 
                //Assign classname "layer" to each element. Note: The classname "layer" can not be changed.  
                spiderman_logo_img.element.className = "layer"; 
          
//////////////////////////////////////////////////////////////////////////

			var spiderman_web_arm_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"spiderman_web_arm_img", defaultValue:"spiderman_web_arm_img.png", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 0,
					top: 0,
					width: width,
					height: height,
					zIndex: 88,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"spiderman_web_arm_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "spiderman_web_arm_img"
				}
                 }).render().setAttribute("data-depth", "0.05"); 
          
//////////////////////////////////////////////////////////////////////////

//CUSTOM PARALLAX STEP 4/6////////////////////////////////////////////////                 
                //Assign classname "layer" to each element. Note: The classname "layer" can not be changed.  
                spiderman_web_arm_img.element.className = "layer"; 
          
//////////////////////////////////////////////////////////////////////////

			var spidermanarm_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"spidermanarm_img", defaultValue:"spidermanarm_img.png", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 0,
					top: 0,
					width: width,
					height: height,
					zIndex: 81,
					pointerEvents: "none",
					cursor: "auto",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"spidermanarm_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "spidermanarm_img"
				}
                 }).render().setAttribute("data-depth", "0.05"); 
          
//////////////////////////////////////////////////////////////////////////

//CUSTOM PARALLAX STEP 4/6////////////////////////////////////////////////                 
                //Assign classname "layer" to each element. Note: The classname "layer" can not be changed.  
                spidermanarm_img.element.className = "layer"; 
          
//////////////////////////////////////////////////////////////////////////

			var spiderman_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"spiderman_img", defaultValue:"spiderman_img.png", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 0,
					top: 0,
					width: width,
					height: height,
					zIndex: 62,
					pointerEvents: "auto",
					cursor: "pointer",
					position: "absolute",
					visibility: "hidden"
				},
				rosetta:{
					parentNode:stage,
					tint: R.create("var").set({name:"spiderman_img_tint", defaultValue:"", dataType:"Color", required:false, exposed:true}).render().value()
				},
				attr:{
					id: "spiderman_img"
				}
                 }).render().setAttribute("data-depth", "0.4"); 
          
//////////////////////////////////////////////////////////////////////////

//CUSTOM PARALLAX STEP 4/6////////////////////////////////////////////////                 
                //Assign classname "layer" to each element. Note: The classname "layer" can not be changed.  
                spiderman_img.element.className = "layer"; 
          
//////////////////////////////////////////////////////////////////////////

			var bg_img = R.create("div").set({
				css:{
					backgroundImage: R.create("var").set({name:"bg_img", defaultValue:"bg_img.png", dataType:"String", required:false, exposed:true}).render().value(),
					backgroundSize: "contain",
					backgroundPosition: "center center",
					left: 0,
					top: 0,
					width: 300,
					height: 600,
					zIndex: 17,
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
                    zIndex: borders.l.zIndex+3,
					left: 0,
					top: 0,
					width: 300,
					height: 600,
					visibility: "hidden",
					pointerEvents: "none",
					opacity: 0.5,
					cursor: "auto"
				},
				rosetta:{
					parentNode: stage,
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
					textContent: R.create("var").set({name:"legal_text", defaultValue:"MARVEL and all related character names: © & ™ 2019 MARVEL. Spider-Man: Far From Home, the Movie ©2019 Columbia Pictures Industries, Inc. All Rights Reserved DR PEPPER is a registered trademark of Dr Pepper/Seven Up, Inc. ©2019 Dr Pepper/Seven Up, Inc. DP-810348_123119. Limit one deal per coupon. Customer is responsible for all applicable taxes. Reproduction or transfer of this coupon constitutes fraud. Offer good through 6/21/2019 at all Publix locations.", dataType:"String", required:false, exposed:true}).render().value()
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
					cursor: "auto",
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
					height: 600,
					backgroundColor: R.create("var").set({name:"legal_text_bg_color", defaultValue:"#000000", dataType:"Color", required:false, exposed:true}).render().value(),
					opacity: 0.8,
					cursor: "auto"
				},
				rosetta:{
					parentNode: legalTextContainer,
					}
		}).render();

//STAGE BLOCK//
//////////////////////////////////////////////////////////////////////////
		var stageBlock = R.create("div").set({
		  css:{
		    backgroundColor: "#FFFFFF",
		    left: 0,
		    top: 0,
		    width: width,
		    height: height,
		    zIndex:borders.l.zIndex - 1,
		    position: "absolute",
		    visibility: "hidden",
		    pointerEvents:"auto",
		    cursor:"pointer",		  },
		  rosetta:{
		    parentNode:stage,
		  },
		  attr:{
		    id: "stageBlock"
		  }
		}).render();

//////////////////////////////////////////////////////////////////////////

            //IF THERE IS NO LEGAL TEXT DISABLE TRIGGER
            if(!legal_text.element.textContent){
                details_text.element.style.pointerEvents = "none";
            };

            var hit_area = R.create("div").set({id:"ad_hit", width: width, height: height, top:0, left:0, pointerEvents: "auto", cursor: "pointer", zIndex:details_text.zIndex-5, parentNode:stage});
            hit_area.on("click", adHit);
                
            function displayLegal(){


                if(legalTextContainer.element.style.visibility == "hidden"){
                    TweenMax.to(legalTextContainer.element, .25, {autoAlpha: 1});
                    
                    hit_area.pointerEvents = "none"

                }else{
                    TweenMax.to(legalTextContainer.element, .25, {autoAlpha: 0});

                     hit_area.pointerEvents = "auto"
                }
            }

            /* [BATCH_LOADING] */
            var requiredArr = [];

//CUSTOM/////////////////////////////////////////////////////////////////////////

			if(cheezeIt){

				var allElementsArr = [
					details_text, 
					fg_img, 
					style_img, 
					spiderman_logo_img, 
					spiderman_img, 
					bg_img, 
					bg_color,
					cheezit_flavorlabel_img, 
					cheezit_drpepper_limitedpack_img, 
					cheezit_drpepper_regualarpack_img, 
					cheezit_img, 
					cheezit_cta_img, 
					cheezit_headline_img,
				];

			} else {

				var allElementsArr = [
					details_text, 
					fg_img, 
					style_img, 
					spiderman_logo_img, 
					spiderman_img, 
					bg_img, 
					bg_color,
					headline_copy_img,
					flavorlabel_img,
					pack_img, 
					bottle_img, 
					cta_img, 
				];

			}

//////////////////////////////////////////////////////////////////////////
			
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
			
				
			//ADDING CTT JUNK VARS
            /* var hit_area = R.create("div").set({id:"ad_hit", width: width, height: height, pointerEvents: "auto", cursor: "pointer", zIndex:100, parentNode:stage});
            hit_area.on("click", adHit); */

            /* [END_CREATE_ELEMENTS] */
            //creativeReady()

            // All Animation goes here
            function animateElements() {


//CUSTOM PARALLAX STEP 5/6/////////////////////////////////////////
              //Kickoff Parallax scene, select your parent DOM element and pass it to the Parallax constructor


              function startParallax(){

              	var cheezeIt;

              	var parallax = new Parallax(stage.element,{});

              }

                var main_timeline = new TimelineMax()

					// if(spidermanarm_img.element){main_timeline.from(spidermanarm_img.element, 1, {left: 300, ease: 'Power3.easeInOut'}, 0)};
					if(stageBlock.element){main_timeline.to(stageBlock.element, .25, {autoAlpha: 0, ease: 'Power1.easeInOut'}, 0)};
					if(details_text.element){main_timeline.from(details_text.element, 1, {autoAlpha: 0}, 0.6)};
					if(spiderman_logo_img.element){main_timeline.from(spiderman_logo_img.element, .35, {left: -200, ease: 'Back.easeOut', easeParams:[0.5]}, 0.6)};
					if(spiderman_img.element){main_timeline.from(spiderman_img.element, .5, {scale:0.5, left: 50, top:600, ease: 'Back.easeOut', easeParams:[0.7]}, 0.3)};						
					
					if (cheezeIt){


						if(cheezit_headline_img.element){main_timeline.from(cheezit_headline_img.element, .75, {top: 300, autoAlpha:0, ease: 'Back.easeOut', easeParams:[0.5]}, 0)};
						if(cheezit_cta_img.element){main_timeline.from(cheezit_cta_img.element, .5, {top: 300,autoAlpha: 0, ease: 'Back.easeOut', easeParams:[0.5], onComplete:startParallax}, 0.3)};							
						if(cheezit_flavorlabel_img.element){main_timeline.from(cheezit_flavorlabel_img.element, .5, {left: -235, ease: 'Back.easeOut', easeParams:[0.5]}, 0.3)};
						if(cheezit_img.element){main_timeline.from(cheezit_img.element, .5, {left: 300, ease: 'Back.easeOut', easeParams:[0.5]}, 0.4)};
						if(cheezit_drpepper_limitedpack_img.element){main_timeline.from(cheezit_drpepper_limitedpack_img.element, .5, {left: 300, ease: 'Back.easeOut', easeParams:[0.5]}, 0.5)};
						if(cheezit_drpepper_regualarpack_img.element){main_timeline.from(cheezit_drpepper_regualarpack_img.element, .5, {left: 300, ease: 'Back.easeOut', easeParams:[0.5]}, 0.5)};

					} else {

						if(headline_copy_img.element){main_timeline.from(headline_copy_img.element, .75, {top: 300, autoAlpha:0, ease: 'Back.easeOut', easeParams:[0.5]}, 0)};
						if(cta_img.element){main_timeline.from(cta_img.element, .5, {top: 300,autoAlpha: 0, ease: 'Back.easeOut', easeParams:[0.5], onComplete:startParallax}, 0.3)};							
						if(flavorlabel_img.element){main_timeline.from(flavorlabel_img.element, .5, {left: -235, ease: 'Back.easeOut', easeParams:[0.5]}, 0.3)};
						if(pack_img.element){main_timeline.from(pack_img.element, .5, {left: 300, ease: 'Back.easeOut', easeParams:[0.5]}, 0.4)};
						if(bottle_img.element){main_timeline.from(bottle_img.element, .5, {left: 300, ease: 'Back.easeOut', easeParams:[0.5]}, 0.5)};
					}


//CUSTOM//////////////////////////////////////////////////////////////////////////
					
				var tl = new TimelineMax()
					.add(main_timeline)

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

// CUSTOM PARALLAX STEP 6/6: Define Parallax////////////////////////////////////////////
            if (defined.Parallax) { Parallax = defined.Parallax;}
///////////////////////////////////////////////////////////////////////////////////////

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