!function(){"use strict";function e(e){function t(t){var r=e.externalURL.indexOf("https:")>-1,l={context:H,waitSeconds:5,paths:{},bundles:{Rosetta:["core.pack","ad.pack","cnvr.advantage.pack","cnvr.usweb.pack","filters.pack","tweenmax.pack","fontface.pack","alignmentgroup.pack"]}};l.bundles.Rosetta=function(t){if("function"!=typeof Object.create){for(var a=["static.pack"],r=0;r<t.length;r++)t[r].indexOf("cnvr.")>-1&&a.push(t[r]);"function"==typeof e.rosettaBundles&&(a=e.rosettaBundles(a));try{e&&e.logEvent&&"function"==typeof e.logEvent&&e.logEvent.call(e,210,"Object.create")}catch(e){}return a}return t}(l.bundles.Rosetta),e.atomSuffix=e.atomSuffix||"",l.paths.Rosetta=e.externalURL+"/atom/"+R+"/3.0.0/?scripts=wrapper_start,"+l.bundles.Rosetta.join(",")+",wrapper_end"+e.atomSuffix;var s=n.config(l);return s(["require"].concat(l.bundles.Rosetta),function(){var n=s("core/Core");if(m=s("platform/Platform"),h=s("display/settings/GlobalSettings"),x=s("core/analytics/Analytics"),_=s("core/analytics/AnalyticsContent"),S=s("core/eventforwarding/EventForwarding"),f=new n,"function"==typeof e.rosettaLoaded&&e.rosettaLoaded(s,f),t&&(h.overwrite({prefix:t+"_"}),V=document.getElementById(t)),V=V||document.body,m.overwrite({isSecure:r,rosettaVersion:R,placementWidth:Number(e.mediaWidth)||320,placementHeight:Number(e.mediaHeight)||50,clientID:e.companyId||"62046"}),f.setFallback(o),!0===f.isCompatible){if(f.parseParameters(e.flashVars,"flashvars"),m.overwrite({clientID:f.create("var").set({name:"company_id",dataType:"String",defaultValue:m.fetch().clientID}).render().value(),cacheBuster:f.create("var").set({name:"bypass_cache",dataType:"Boolean",defaultValue:!1,exposed:!1}).render().value(),subdirectory:f.create("var").set({name:"subdirectory",dataType:"String",defaultValue:"ADS_Global_HY_53562"}).render().value(),FOFVersion:f.create("var").set({name:"fof_version",dataType:"String",defaultValue:"2.1.6",exposed:!1}).render().value(),isSecure:f.create("var").set({name:"dtm_secure",dataType:"Boolean",defaultValue:m.fetch().isSecure,exposed:!1}).render().value(),analytics:e.logEvent,analyticsScope:e}),!1!==f.create("var").set({name:"disable_retina",dataType:"Boolean",defaultValue:!1,exposed:!1}).render().value()||!0!==f.environment.isRetina&&!f.create("var").set({name:"force_retina",dataType:"Boolean",defaultValue:!1,exposed:!1}).render().value()||h.overwrite({pixelDensity:2}),F=function(){var e=f.create("var").set({name:"fof_pixel_density",dataType:"Number",exposed:!1,defaultValue:h.fetch().pixelDensity}).render().value();return e=Math.round(e),1!==e&&2!==e&&(e=h.fetch().pixelDensity),e}(),z=function(){var e=f.create("var").set({name:"default_timeout",dataType:"Number",defaultValue:5,exposed:!1}).render().value();I=setTimeout(function(){var t={event:_.FALL_BACK,failReason:{type:_.TIMED_OUT,details:e}};f.fallback(t)},1e3*e)},D){x.fire({event:_.INIT,instance:$,details:"ADS_Global_HY_53562"});var d=V.style;d.marginTop=-.5*Number(m.fetch().placementHeight)+"px",d.marginLeft=-.5*Number(m.fetch().placementWidth)+"px",d.top="50%",d.left="50%",d.position="absolute"}L=f.create("var").set({name:"evergreen_img",dataType:"String",defaultValue:L}).render().value(),i(),a()}else{p("NOT_COMPATIBLE",!0);try{e&&e.logEvent&&"function"==typeof e.logEvent&&-1===l.bundles.Rosetta.join(",").indexOf("static.pack")&&e.logEvent.call(e,210,"R.isCompatible")}catch(e){}f.fallback()}},function(e){d(e)}),$}function a(){function e(){"hidden"==$.element.style.visibility?b.to($.element,.25,{autoAlpha:1}):b.to($.element,.25,{autoAlpha:0})}function t(e){for(var t=0;t<e.length;t++)for(var a=0;a<e[t].length;a++)e[t][a]&&e[t][a].element&&(e[t][a].visibility="")}function a(){function e(){b.to(N.element,.75,{rotation:"+=360"})}N.on("mouseover",e);var t=v.style.left,a=v.style.top,r=new w;r.set(l.element,{display:"block",autoAlpha:1}),r.to(l.element,.5,{autoAlpha:0}),A.element&&r.from(A.element,2,{x:-5,autoAlpha:0,ease:"Power1.easeOut"},0),E.element&&r.from(E.element,2,{x:-5,autoAlpha:0,ease:"Power1.easeOut"},0),O.element&&r.from(O.element,2,{x:-5,autoAlpha:0,ease:"Power1.easeOut"},0),_.element&&r.from(_.element,2,{x:-5,autoAlpha:0,ease:"Power1.easeOut"},.25),s.element&&r.from(s.element,2,{x:-5,autoAlpha:0,ease:"Power1.easeOut"},1),u.element&&r.from(u.element,2,{x:-5,autoAlpha:0,ease:"Power1.easeOut"},1.5),v.element&&r.from(v.element,2,{x:-5,autoAlpha:0,ease:"Power1.easeOut"},.5),P.element&&r.from(P.element,2,{x:-5,autoAlpha:0,ease:"Power1.easeOut"},.5),R.element&&r.from(R.element,2,{autoAlpha:0,ease:"Power1.easeOut"},0),L.element&&r.from(L.element,2,{x:-5,autoAlpha:0,ease:"Power1.easeOut"},.5),T.element&&r.from(T.element,2,{x:-5,autoAlpha:0,ease:"Power1.easeOut"},0),T.element&&r.from(H.element,2,{x:-5,autoAlpha:0,ease:"Power1.easeOut"},0),C.element&&r.from(C.element,2,{x:-5,autoAlpha:0,ease:"Power1.easeOut"},0);var n=new w;g.textContent&&v.element&&n.to(v.element,1,{autoAlpha:0,ease:"Power1.easeOut"},0);var o=new w;g.textContent&&o.from(g.element,2,{autoAlpha:0,ease:"Power1.easeOut"},0),x.element&&o.from(x.element,1,{autoAlpha:0,ease:"Power1.easeOut"},1),y.element&&o.from(y.element,1,{autoAlpha:0,ease:"Power1.easeOut"},1);var i=new w;g.element&&i.to(g.element,1,{autoAlpha:0,ease:"Power1.easeOut"},2.5),x.element&&i.to(x.element,1,{autoAlpha:0,ease:"Power1.easeOut"},2.5),y.element&&i.to(y.element,1,{autoAlpha:0,ease:"Power1.easeOut"},2.5);var d=new w;N.element&&d.from(N.element,1,{autoAlpha:0,ease:"Power1.easeOut"},.5),g.textContent&&v.element&&d.fromTo(v.element,1,{top:a,left:t,autoAlpha:0},{autoAlpha:1,ease:"Power1.easeOut",immediateRender:!1},0);var c=(new w).add(r).add(n).add(o).add(i).add(d),p=c.duration();c.duration(f.create("var").set({name:"duration",defaultValue:p,dataType:"Number",exposed:!0}).render().value()),N.on("click",function(){c.restart()})}q=a,p("createElements","start");var n=f.create("var").set({name:"width",dataType:"Number",defaultValue:m.fetch().placementWidth,exposed:!1}).render().value(),o=f.create("var").set({name:"height",dataType:"Number",defaultValue:m.fetch().placementHeight,exposed:!1}).render().value(),i=f.create("var").set({name:"border_color",dataType:"String",defaultValue:"#CCCCCC"}).render().value();k=f.create("div").set({id:"stage",width:n,height:o,backgroundColor:"#FFFFFF",className:"stage"}),V.appendChild(k.element),h.overwrite({stage:k}),(new S).init({stage:k});var d={l:f.create("div").set({width:"1px",height:o,backgroundColor:i,left:0,top:0,zIndex:750,pointerEvents:"none",parentNode:k}).render(),r:f.create("div").set({width:"1px",height:o,backgroundColor:i,right:0,top:0,zIndex:750,pointerEvents:"none",parentNode:k}).render(),t:f.create("div").set({width:n,height:"1px",backgroundColor:i,left:0,top:0,zIndex:750,pointerEvents:"none",parentNode:k}).render(),b:f.create("div").set({width:n,height:"1px",backgroundColor:i,left:0,bottom:0,zIndex:750,pointerEvents:"none",parentNode:k}).render()};f.applyCSSReset(".stage");var l=f.create("div").set({css:{backgroundColor:"#FFFFFF",left:0,top:0,width:n,height:o,zIndex:d.l.zIndex-1,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"visible"},rosetta:{parentNode:k},attr:{id:"stageBlock"}}).render(),s=f.create("div").set({css:{border:f.create("var").set({name:"cta_text_border",defaultValue:"",dataType:"String",required:!1,exposed:!0}).render().value(),color:f.create("var").set({name:"cta_text_color",defaultValue:"#000000",dataType:"Color",required:!1,exposed:!0}).render().value(),fontSize:f.create("var").set({name:"cta_text_font_size",defaultValue:"7",dataType:"String",required:!1,exposed:!0}).render().value(),fontFamily:f.create("var").set({name:"cta_text_font_id",defaultValue:"10747",dataType:"Number",required:!1,exposed:!0}).render().value(),fontStyle:"RomanFamily",lineHeight:f.create("var").set({name:"cta_text_line_height",defaultValue:"1",dataType:"String",required:!1,exposed:!0}).render().value(),letterSpacing:f.create("var").set({name:"cta_text_tracking",defaultValue:"0.175",dataType:"String",required:!1,exposed:!0}).render().value(),textAlign:"center",verticalAlign:"middle",marginTop:0,backgroundColor:f.create("var").set({name:"cta_text_bg_color",defaultValue:"",dataType:"Color",required:!1,exposed:!0}).render().value(),padding:f.create("var").set({name:"cta_text_padding",defaultValue:"4px 6px 4px 6px",dataType:"String",required:!1,exposed:!0}).render().value(),left:242,top:4,width:70,height:16,zIndex:319,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden",borderRadius:f.create("var").set({name:"cta_border_corner_radius",defaultValue:"",dataType:"Number",required:!1,exposed:!0}).render().value()},rosetta:{parentNode:k,pixelDensity:F,forceLineHeight:!1},attr:{id:"cta_text",textContent:f.create("var").set({name:"cta_text",defaultValue:"",dataType:"String",required:!1,exposed:!0}).render().value()}}),u=f.create("div").set({css:{color:f.create("var").set({name:"details_text_color",defaultValue:"#000000",dataType:"Color",required:!1,exposed:!0}).render().value(),fontSize:f.create("var").set({name:"details_text_font_size",defaultValue:"6",dataType:"String",required:!1,exposed:!0}).render().value(),fontFamily:f.create("var").set({name:"details_text_font_id",defaultValue:"10755",dataType:"Number",required:!1,exposed:!0}).render().value(),fontStyle:"Light",lineHeight:f.create("var").set({name:"details_text_line_height",defaultValue:"1.17",dataType:"String",required:!1,exposed:!0}).render().value(),letterSpacing:f.create("var").set({name:"details_text_tracking",defaultValue:"0",dataType:"String",required:!1,exposed:!0}).render().value(),textAlign:"center",verticalAlign:"middle",marginTop:4,backgroundColor:f.create("var").set({name:"details_text_bg_color",defaultValue:"",dataType:"Color",required:!1,exposed:!0}).render().value(),padding:f.create("var").set({name:"details_text_padding",defaultValue:"",dataType:"String",required:!1,exposed:!0}).render().value(),left:242,top:24,width:70,height:22,zIndex:318,pointerEvents:"auto",cursor:"pointer",position:"absolute",visibility:"hidden"},rosetta:{parentNode:k,pixelDensity:F,forceLineHeight:!0},attr:{id:"details_text",textContent:f.create("var").set({name:"details_text",defaultValue:"",dataType:"String",required:!1,exposed:!0}).render().value()}}).on("click",e),v=f.create("div").set({css:{color:f.create("var").set({name:"headline_text_color",defaultValue:"#000000",dataType:"Color",required:!1,exposed:!0}).render().value(),fontSize:f.create("var").set({name:"headline_text_font_size",defaultValue:"12",dataType:"String",required:!1,exposed:!0}).render().value(),fontFamily:f.create("var").set({name:"headline_text_font_id",defaultValue:"10747",dataType:"Number",required:!1,exposed:!0}).render().value(),fontStyle:"RomanFamily",lineHeight:f.create("var").set({name:"headline_text_line_height",defaultValue:"1.08",dataType:"String",required:!1,exposed:!0}).render().value(),letterSpacing:f.create("var").set({name:"headline_text_tracking",defaultValue:"0.3",dataType:"String",required:!1,exposed:!0}).render().value(),textAlign:"left",verticalAlign:"middle",marginTop:0,backgroundColor:f.create("var").set({name:"headline_text_bg_color",defaultValue:"",dataType:"Color",required:!1,exposed:!0}).render().value(),padding:f.create("var").set({name:"headline_text_padding",defaultValue:"",dataType:"String",required:!1,exposed:!0}).render().value(),left:99,top:6,width:88,height:38,zIndex:310,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},rosetta:{parentNode:k,pixelDensity:F,forceLineHeight:!0},attr:{id:"headline_text",textContent:f.create("var").set({name:"headline_text",defaultValue:"",dataType:"String",required:!0,exposed:!0}).render().value()}}).render(),g=f.create("div").set({css:{color:f.create("var").set({name:"subhead_text_color",defaultValue:"#000000",dataType:"Color",required:!1,exposed:!0}).render().value(),fontSize:f.create("var").set({name:"subhead_text_font_size",defaultValue:"9",dataType:"String",required:!1,exposed:!0}).render().value(),fontFamily:f.create("var").set({name:"subhead_text_font_id",defaultValue:"10755",dataType:"Number",required:!1,exposed:!0}).render().value(),fontStyle:"Light",lineHeight:f.create("var").set({name:"subhead_text_line_height",defaultValue:"1.33",dataType:"String",required:!1,exposed:!0}).render().value(),letterSpacing:f.create("var").set({name:"subhead_text_tracking",defaultValue:"0.225",dataType:"String",required:!1,exposed:!0}).render().value(),textAlign:"left",verticalAlign:"middle",marginTop:0,backgroundColor:f.create("var").set({name:"subhead_text_bg_color",defaultValue:"",dataType:"Color",required:!1,exposed:!0}).render().value(),padding:f.create("var").set({name:"subhead_text_padding",defaultValue:"",dataType:"String",required:!1,exposed:!0}).render().value(),left:99,top:6,width:88,height:38,zIndex:303,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},rosetta:{parentNode:k,pixelDensity:F,forceLineHeight:!0},attr:{id:"subhead_text",textContent:f.create("var").set({name:"subhead_text",defaultValue:"",dataType:"String",required:!1,exposed:!0}).render().value()}}).render(),x=f.create("div").set({css:{color:f.create("var").set({name:"badge_text_color",defaultValue:"#FFFFFF",dataType:"Color",required:!1,exposed:!0}).render().value(),fontSize:f.create("var").set({name:"badge_text_font_size",defaultValue:"7",dataType:"String",required:!1,exposed:!0}).render().value(),fontFamily:f.create("var").set({name:"badge_text_font_id",defaultValue:"10747",dataType:"Number",required:!1,exposed:!0}).render().value(),fontStyle:"RomanFamily",lineHeight:f.create("var").set({name:"badge_text_line_height",defaultValue:"1.29",dataType:"String",required:!1,exposed:!0}).render().value(),letterSpacing:f.create("var").set({name:"badge_text_tracking",defaultValue:"0",dataType:"String",required:!1,exposed:!0}).render().value(),textAlign:"center",verticalAlign:"middle",marginTop:0,backgroundColor:f.create("var").set({name:"badge_text_bg_color",defaultValue:"",dataType:"Color",required:!1,exposed:!0}).render().value(),padding:f.create("var").set({name:"badge_text_padding",defaultValue:"",dataType:"String",required:!1,exposed:!0}).render().value(),left:193,top:4,width:42,height:42,zIndex:295,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},rosetta:{parentNode:k,pixelDensity:F,forceLineHeight:!1},attr:{id:"badge_text",textContent:f.create("var").set({name:"badge_text",defaultValue:"",dataType:"String",required:!1,exposed:!0}).render().value()}}).render(),_=f.create("div").set({css:{left:94,top:7,zIndex:367,width:1,height:36,pointerEvents:"none",cursor:"auto",position:"absolute",backgroundColor:f.create("var").set({name:"line_color",defaultValue:"#000000",dataType:"Color",required:!1,exposed:!0}).render().value(),borderRadius:0,visibility:"hidden"},rosetta:{parentNode:k},attr:{id:"line_color"}}).render(),y=f.create("div").set({css:{left:191,top:3,zIndex:284,width:46,height:44,pointerEvents:"none",cursor:"auto",position:"absolute",backgroundColor:f.create("var").set({name:"badge_bg_color",defaultValue:"#000000",dataType:"Color",required:!1,exposed:!0}).render().value(),borderRadius:0,visibility:"hidden"},rosetta:{parentNode:k},attr:{id:"badge_bg_color"}}).render(),T=f.create("div").set({css:{left:0,top:0,zIndex:146,width:94,height:49,pointerEvents:"none",cursor:"auto",position:"absolute",backgroundColor:f.create("var").set({name:"logo_bg_color",defaultValue:"#ffffff",dataType:"Color",required:!1,exposed:!0}).render().value(),borderRadius:0,visibility:"hidden"},rosetta:{parentNode:k},attr:{id:"logo_bg_color"}}).render(),C=f.create("div").set({css:{left:3,top:3,zIndex:133,width:314,height:44,pointerEvents:"none",cursor:"auto",position:"absolute",backgroundColor:f.create("var").set({name:"frame_bg_color",defaultValue:"#ffffff",dataType:"Color",required:!1,exposed:!0}).render().value(),borderRadius:0,visibility:"hidden"},rosetta:{parentNode:k},attr:{id:"frame_bg_color"}}).render(),I=f.create("div").set({css:{left:0,top:0,zIndex:120,width:320,height:50,pointerEvents:"none",cursor:"auto",position:"absolute",backgroundColor:f.create("var").set({name:"overlay_color",defaultValue:"rgba(255,255,255,0.95)",dataType:"Color",required:!1,exposed:!0}).render().value(),borderRadius:0,border:f.create("var").set({name:"overlay_border",defaultValue:"0px solid rgba(undefined,0.95)",dataType:"String",required:!1,exposed:!0}).render().value(),visibility:"hidden"},rosetta:{parentNode:k},attr:{id:"overlay_color"}}).render(),z=f.create("div").set({css:{left:0,top:0,zIndex:6,width:320,height:50,pointerEvents:"none",cursor:"auto",position:"absolute",backgroundColor:f.create("var").set({name:"bg_color",defaultValue:"#ffffff",dataType:"String",required:!1,exposed:!0}).render().value(),borderRadius:0,visibility:"hidden"},rosetta:{parentNode:k},attr:{id:"bg_color"}}).render(),A=f.create("div").set({css:{backgroundImage:f.create("var").set({name:"fg_img",defaultValue:"",dataType:"String",required:!1,exposed:!0}).render().value(),backgroundSize:"contain",backgroundPosition:"center center",left:0,top:0,width:320,height:50,zIndex:740,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},rosetta:{parentNode:k,tint:f.create("var").set({name:"fg_img_tint",defaultValue:"",dataType:"Color",required:!1,exposed:!0}).render().value()},attr:{id:"fg_img"}}).render(),E=f.create("div").set({css:{backgroundImage:f.create("var").set({name:"style_img",defaultValue:"",dataType:"String",required:!1,exposed:!0}).render().value(),backgroundSize:"contain",backgroundPosition:"center center",left:0,top:0,width:320,height:50,zIndex:728,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},rosetta:{parentNode:k,tint:f.create("var").set({name:"style_img_tint",defaultValue:"",dataType:"Color",required:!1,exposed:!0}).render().value()},attr:{id:"style_img"}}).render(),N=f.create("div").set({css:{backgroundImage:f.create("var").set({name:"replay_img",defaultValue:"",dataType:"String",required:!1,exposed:!0}).render().value(),backgroundSize:"contain",backgroundPosition:"center center",left:0,top:0,width:21,height:21,zIndex:491,pointerEvents:"auto",cursor:"pointer",position:"absolute",visibility:"hidden"},rosetta:{parentNode:k,directoryType:"shared",tint:f.create("var").set({name:"replay_img_tint",defaultValue:"",dataType:"Color",required:!1,exposed:!0}).render().value()},attr:{id:"replay_img"}}).render(),O=f.create("div").set({css:{backgroundImage:f.create("var").set({name:"logo_img",defaultValue:"",dataType:"String",required:!0,exposed:!0}).render().value(),backgroundSize:"contain",backgroundPosition:"center center",left:7,top:8,width:82,height:34,zIndex:402,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},rosetta:{parentNode:k,tint:f.create("var").set({name:"logo_img_tint",defaultValue:"",dataType:"Color",required:!1,exposed:!0}).render().value()},attr:{id:"logo_img"}}).render(),P=f.create("div").set({css:{backgroundImage:f.create("var").set({name:"card_small_img",defaultValue:"",dataType:"String",required:!1,exposed:!0}).render().value(),backgroundSize:"contain",backgroundPosition:"center center",left:191,top:11,width:45,height:28,zIndex:254,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},rosetta:{parentNode:k,directoryType:"shared",tint:f.create("var").set({name:"card_small_img_tint",defaultValue:"",dataType:"Color",required:!1,exposed:!0}).render().value()},attr:{id:"card_small_img"}}).render(),R=f.create("div").set({css:{backgroundImage:f.create("var").set({name:"frame_img",defaultValue:"",dataType:"String",required:!1,exposed:!0}).render().value(),backgroundSize:"contain",backgroundPosition:"center center",left:0,top:0,width:320,height:50,zIndex:237,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},rosetta:{parentNode:k,tint:f.create("var").set({name:"frame_img_tint",defaultValue:"",dataType:"Color",required:!1,exposed:!0}).render().value()},attr:{id:"frame_img"}}).render(),H=f.create("div").set({css:{backgroundImage:f.create("var").set({name:"promo_style_img",defaultValue:"",dataType:"String",required:!1,exposed:!0}).render().value(),backgroundSize:"contain",backgroundPosition:"center center",left:0,top:0,width:320,height:50,zIndex:223,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},rosetta:{parentNode:k,tint:f.create("var").set({name:"promo_style_img_tint",defaultValue:"",dataType:"Color",required:!1,exposed:!0}).render().value()},attr:{id:"promo_style_img"}}).render(),L=f.create("div").set({css:{backgroundImage:f.create("var").set({name:"card_large_img",defaultValue:"",dataType:"String",required:!1,exposed:!0}).render().value(),backgroundSize:"contain",backgroundPosition:"center center",left:191,top:11,width:45,height:28,zIndex:202,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},rosetta:{parentNode:k,directoryType:"shared",tint:f.create("var").set({name:"card_large_img_tint",defaultValue:"",dataType:"Color",required:!1,exposed:!0}).render().value()},attr:{id:"card_large_img"}}).render(),D=f.create("div").set({css:{backgroundImage:f.create("var").set({name:"bg_img",defaultValue:"",dataType:"String",required:!1,exposed:!0}).render().value(),backgroundSize:"contain",backgroundPosition:"center center",left:0,top:0,width:320,height:50,zIndex:33,pointerEvents:"none",cursor:"auto",position:"absolute",visibility:"hidden"},rosetta:{parentNode:k,tint:f.create("var").set({name:"bg_img_tint",defaultValue:"",dataType:"Color",required:!1,exposed:!0}).render().value()},attr:{id:"bg_img"}}).render(),$=f.create("div").set({attr:{id:"legalTextContainer"},css:{name:"legalTextContainer",zIndex:749,left:0,top:0,width:320,height:50,visibility:"hidden",pointerEvents:"auto",opacity:.5,cursor:"pointer"},rosetta:{parentNode:k,data:{hitIndex:0}}}).render(),B=(f.create("div").set({attr:{id:"legal_closeX",textContent:"x"},css:{fontSize:12,fontFamily:"OpenSans, sans-serif",textType:"fontFaceText",lineHeight:1,letterSpacing:0,left:10,top:10,width:13,height:13,zIndex:1196,pointerEvents:"auto",cursor:"pointer",position:"absolute",borderRadius:"7px",backgroundColor:"#FFFFFF",color:f.create("var").set({name:"legal_text_bg_color",defaultValue:"#000000",dataType:"Color",required:!1,exposed:!0}).render().value(),textAlign:"center"},rosetta:{parentNode:$,resizeElement:!1}}).render().on("click",e),f.create("div").set({attr:{id:"legal_close",textContent:"close"},css:{fontSize:12,fontFamily:"OpenSans, sans-serif",textType:"fontFaceText",lineHeight:1,letterSpacing:0,left:26,top:10,width:290,height:14,zIndex:1196,pointerEvents:"auto",cursor:"pointer",position:"absolute",color:"#FFFFFF",textAlign:"left"},rosetta:{parentNode:$}}).render().on("click",e),f.create("div").set({attr:{id:"legal_text",textContent:f.create("var").set({name:"legal_text",defaultValue:"",dataType:"String",required:!1,exposed:!0}).render().value()},css:{fontSize:8,minFontSize:8,fontFamily:"Arial, Verdana, Helvetica, Sans",textType:"fontFaceText",lineHeight:1,letterSpacing:0,left:10,top:25,width:300,height:15,zIndex:1,pointerEvents:"auto",cursor:"pointer",position:"absolute",color:f.create("var").set({name:"legal_text_color",defaultValue:"#FFFFFF",dataType:"Color",required:!1,exposed:!0}).render().value(),textAlign:"left",overflowY:"auto",overflowWrap:"break-word",wordWrap:"break-word",wordBreak:"break-word"},rosetta:{parentNode:$,resizeElement:!1}}).render());f.create("div").set({attr:{id:"legal_text_bg_color"},css:{name:"legal_text_bg_color",zIndex:0,left:0,top:0,width:320,height:50,backgroundColor:f.create("var").set({name:"legal_text_bg_color",defaultValue:"#000000",dataType:"Color",required:!1,exposed:!0}).render().value(),opacity:.8,cursor:"pointer"},rosetta:{parentNode:$,data:{hitIndex:0}}}).render();B.element.textContent||(u.element.style.pointerEvents="none");var G=f.create("div").set({attr:{id:"replayContainer"},css:{name:"replayContainer",zIndex:492,left:0,top:0,width:21,height:21,pointerEvents:"none",visibility:"hidden"},rosetta:{parentNode:k}}).render(),W=[v,O],j=[s,u],M=[v,g,x,A,E,N,P,R,H,L,D,_,y,T,C,I,z,G];f.create("AlignmentGroup").set({verticalAlign:"middle"}).add(j).render(),f.create("batch").require(W).add(j).add(M).render({success:function(){t([f.filter.success(W),f.filter.success(j),f.filter.success(M)]),c()},fail:function(e){f.fallback(e)}});f.create("div").set({id:"ad_hit",width:n,height:o,pointerEvents:"auto",cursor:"pointer",zIndex:0,parentNode:k}).on("click",r)}function r(t){try{t.stopPropagation()}catch(e){}t=t||window.event;var a=f.get(t.target);x.fire({event:"click",instance:a,currentInstance:a,details:""});var r=0;a&&a.data&&a.data.hitIndex&&(r=a.data.hitIndex),e.handleCommand.call(e,"click",[r])}function o(){f.create("ImageIE7").set({src:L,subdirectory:"",directoryType:"evergreen",width:m.fetch().placementWidth,height:m.fetch().placementHeight,maxWidth:m.fetch().placementWidth,maxHeight:m.fetch().placementHeight,borderWidth:1,borderStyle:"solid",borderColor:"#CCCCCC",boxSizing:"border-box",position:"absolute",zIndex:500,display:"block"}).complete(function(e){if(k){h.overwrite({display:"none"});for(var t=f.get(""),a=t.length;--a>-1;)t[a]!==k&&t[a].element&&(t[a].display="none");k.appendChild(e),k.display="block"}else V.appendChild(e.element);e.element.onclick=r,q=null,c()}).render()}function i(){function e(e,t,a){if(t[a]&&!e[a]&&t[a].enable(),e[a])return e[a]}var t=n.s.contexts[H].defined,a=n.s.contexts[H].registry;b=e(t,a,"TweenMax"),b&&(b.selector=f.selector),y=e(t,a,"TweenLite"),y&&(h.overwrite({GSAPSelector:y.selector}),y.selector=f.selector),T=e(t,a,"TimelineLite"),w=e(t,a,"TimelineMax"),C=e(t,a,"Hammer")}function d(e){if(window&&window.console){try{window.console.debug&&"object"==typeof e?console.debug(e):window.console.log&&console.log("Creative: "+e)}catch(e){}}}function l(e,t,a){return A.push({evt:e,callback:t,scope:a}),$}function s(e,t){if(e)for(var a=A,r=0;r<a.length;r++)if(a[r].evt===e&&a[r].callback)try{a[r].callback.call(a[r].scope,t)}catch(e){d("Callback failed")}}function u(e){return!1===O&&(O=e,!0===e&&p("parentEnvironment",O)),$}function c(){if(!1===P){P=!0;var e=n.s.contexts[H].defined["platform/advantage/XMLPush"];e&&e.init(),s("creative_ready"),p("creative",P)}}function p(e,t){E.push({src:e,val:t}),E.length!==N&&v("parentEnvironment")&&!I&&z&&z(),E.length===N&&g()}function v(e){for(var t=0;t<E.length;t++)if(E[t].src===e)return E[t].val;return!1}function g(){I&&clearTimeout(I),s("creative_shown"),x&&x.fire({event:_.CREATIVE_SHOWN,instance:$}),q&&q()}var f,m,h,x,_,b,y,T,w,S,C,V,k,q,I,z,F,A=[],E=[],N=3,O=!1,P=!1,R="4.40",H=String(R+"_"+e.embedId).split("_").join("."),L="evergreen.jpg",D=!1,$={init:t,registerCallback:l,environmentReady:u,enviromentReady:u};return $}var t=window,a=(t._$OGO$_||(t._$OGO$_={}))&&(t._$OGO$_.Rosetta||(t._$OGO$_.Rosetta={}))&&(t._$OGO$_.Rosetta.creatives||(t._$OGO$_.Rosetta.creatives=[])),r=t._$OGO$_.Rosetta,n=r.requirejs||n;a.push(e)}();