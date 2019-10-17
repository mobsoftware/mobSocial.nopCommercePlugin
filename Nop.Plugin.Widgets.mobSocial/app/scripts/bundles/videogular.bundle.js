webpackJsonp([16,17],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(93);
	__webpack_require__(94);
	__webpack_require__(95);
	__webpack_require__(96);
	__webpack_require__(97);
	__webpack_require__(98);
	__webpack_require__(99);
	__webpack_require__(100);
	module.exports = __webpack_require__(101);


/***/ }),

/***/ 93:
/***/ (function(module, exports) {

	"use strict";angular.module("com.2fdevs.videogular",["ngSanitize"]).run(["$templateCache",function(a){a.put("vg-templates/vg-media-video","<video></video>"),a.put("vg-templates/vg-media-audio","<audio></audio>"),Function.prototype.bind||(Function.prototype.bind=function(a){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var b=Array.prototype.slice.call(arguments,1),c=this,d=function(){},e=function(){return c.apply(this instanceof d?this:a,b.concat(Array.prototype.slice.call(arguments)))};return d.prototype=this.prototype,e.prototype=new d,e})}]),angular.module("com.2fdevs.videogular").constant("VG_STATES",{PLAY:"play",PAUSE:"pause",STOP:"stop"}).constant("VG_VOLUME_KEY","videogularVolume"),angular.module("com.2fdevs.videogular").controller("vgController",["$scope","$window","vgConfigLoader","vgFullscreen","VG_UTILS","VG_STATES","VG_VOLUME_KEY",function(a,b,c,d,e,f,g){var h=null,i=!1,j=!1;this.videogularElement=null,this.clearMedia=function(){this.mediaElement[0].src=""},this.onCanPlay=function(b){this.isBuffering=!1,a.$apply(a.vgCanPlay({$event:b}))},this.onVideoReady=function(){this.isReady=!0,this.autoPlay=a.vgAutoPlay,this.playsInline=a.vgPlaysInline,this.cuePoints=a.vgCuePoints,this.currentState=f.STOP,j=!0,e.supportsLocalStorage()&&this.setVolume(parseFloat(b.localStorage.getItem(g)||"1")),a.vgConfig?c.loadConfig(a.vgConfig).then(this.onLoadConfig.bind(this)):a.vgPlayerReady({$API:this})},this.onLoadConfig=function(b){this.config=b,a.vgTheme=this.config.theme,a.vgAutoPlay=this.config.autoPlay,a.vgPlaysInline=this.config.playsInline,a.vgCuePoints=this.config.cuePoints,a.vgPlayerReady({$API:this})},this.onLoadMetaData=function(a){this.isBuffering=!1,this.onUpdateTime(a)},this.onUpdateTime=function(b){this.currentTime=1e3*b.target.currentTime,b.target.duration!=1/0?(this.totalTime=1e3*b.target.duration,this.timeLeft=1e3*(b.target.duration-b.target.currentTime),this.isLive=!1):this.isLive=!0,this.cuePoints&&this.checkCuePoints(b.target.currentTime),a.vgUpdateTime({$currentTime:b.target.currentTime,$duration:b.target.duration}),a.$apply()},this.checkCuePoints=function(a){for(var b in this.cuePoints)for(var c=0,d=this.cuePoints[b].length;d>c;c++){var e=this.cuePoints[b][c];e.timeLapse.end||(e.timeLapse.end=e.timeLapse.start+1),a<e.timeLapse.end&&(e.$$isCompleted=!1),a>e.timeLapse.start?(e.$$isDirty=!0,a<e.timeLapse.end&&e.onUpdate&&e.onUpdate(a,e.timeLapse,e.params),a>=e.timeLapse.end&&e.onComplete&&!e.$$isCompleted&&(e.$$isCompleted=!0,e.onComplete(a,e.timeLapse,e.params))):(e.onLeave&&e.$$isDirty&&e.onLeave(a,e.timeLapse,e.params),e.$$isDirty=!1)}},this.onPlay=function(){this.setState(f.PLAY),a.$apply()},this.onPause=function(){0==this.mediaElement[0].currentTime?this.setState(f.STOP):this.setState(f.PAUSE),a.$apply()},this.onVolumeChange=function(){this.volume=this.mediaElement[0].volume,a.$apply()},this.onPlaybackChange=function(){this.playback=this.mediaElement[0].playbackRate,a.$apply()},this.seekTime=function(a,b){var c;b?(c=a*this.mediaElement[0].duration/100,this.mediaElement[0].currentTime=c):(c=a,this.mediaElement[0].currentTime=c),this.currentTime=1e3*c},this.playPause=function(){this.mediaElement[0].paused?this.play():this.pause()},this.setState=function(b){return b&&b!=this.currentState&&(a.vgUpdateState({$state:b}),this.currentState=b),this.currentState},this.play=function(){this.mediaElement[0].play(),this.setState(f.PLAY)},this.pause=function(){this.mediaElement[0].pause(),this.setState(f.PAUSE)},this.stop=function(){try{this.mediaElement[0].pause(),this.mediaElement[0].currentTime=0,this.currentTime=0,this.setState(f.STOP)}catch(a){return a}},this.toggleFullScreen=function(){!d.isAvailable||a.vgPlaysInline?(this.isFullScreen?(this.videogularElement.removeClass("fullscreen"),this.videogularElement.css("z-index","auto")):(this.videogularElement.addClass("fullscreen"),this.videogularElement.css("z-index",e.getZIndex())),this.isFullScreen=!this.isFullScreen):this.isFullScreen?e.isMobileDevice()||d.exit():e.isMobileDevice()?e.isiOSDevice()?j?this.enterElementInFullScreen(this.mediaElement[0]):(i=!0,this.play()):this.enterElementInFullScreen(this.mediaElement[0]):this.enterElementInFullScreen(this.videogularElement[0])},this.enterElementInFullScreen=function(a){d.request(a)},this.changeSource=function(b){a.vgChangeSource({$source:b})},this.setVolume=function(c){a.vgUpdateVolume({$volume:c}),this.mediaElement[0].volume=c,this.volume=c,e.supportsLocalStorage()&&b.localStorage.setItem(g,c.toString())},this.setPlayback=function(b){a.vgUpdatePlayback({$playBack:b}),this.mediaElement[0].playbackRate=b,this.playback=b},this.updateTheme=function(a){var b,c,d=document.getElementsByTagName("link");if(h)for(b=0,c=d.length;c>b;b++)if(d[b].outerHTML.indexOf(h)>=0){d[b].parentNode.removeChild(d[b]);break}if(a){var e=angular.element(document).find("head"),f=!1;for(b=0,c=d.length;c>b&&!(f=d[b].outerHTML.indexOf(a)>=0);b++);f||e.append("<link rel='stylesheet' href='"+a+"'>"),h=a}},this.onStartBuffering=function(b){this.isBuffering=!0,a.$apply()},this.onStartPlaying=function(b){this.isBuffering=!1,a.$apply()},this.onComplete=function(b){a.vgComplete(),this.setState(f.STOP),this.isCompleted=!0,a.$apply()},this.onVideoError=function(b){a.vgError({$event:b})},this.addListeners=function(){this.mediaElement[0].addEventListener("canplay",this.onCanPlay.bind(this),!1),this.mediaElement[0].addEventListener("loadedmetadata",this.onLoadMetaData.bind(this),!1),this.mediaElement[0].addEventListener("waiting",this.onStartBuffering.bind(this),!1),this.mediaElement[0].addEventListener("ended",this.onComplete.bind(this),!1),this.mediaElement[0].addEventListener("playing",this.onStartPlaying.bind(this),!1),this.mediaElement[0].addEventListener("play",this.onPlay.bind(this),!1),this.mediaElement[0].addEventListener("pause",this.onPause.bind(this),!1),this.mediaElement[0].addEventListener("volumechange",this.onVolumeChange.bind(this),!1),this.mediaElement[0].addEventListener("playbackchange",this.onPlaybackChange.bind(this),!1),this.mediaElement[0].addEventListener("timeupdate",this.onUpdateTime.bind(this),!1),this.mediaElement[0].addEventListener("error",this.onVideoError.bind(this),!1)},this.init=function(){this.isReady=!1,this.isCompleted=!1,this.currentTime=0,this.totalTime=0,this.timeLeft=0,this.isLive=!1,this.isFullScreen=!1,this.isConfig=void 0!=a.vgConfig,d.isAvailable&&(this.isFullScreen=d.isFullScreen()),this.updateTheme(a.vgTheme),this.addBindings(),d.isAvailable&&document.addEventListener(d.onchange,this.onFullScreenChange.bind(this))},this.onUpdateTheme=function(a){this.updateTheme(a)},this.onUpdateAutoPlay=function(a){a&&!this.autoPlay&&(this.autoPlay=a,this.play(this))},this.onUpdatePlaysInline=function(a){this.playsInline=a},this.onUpdateCuePoints=function(a){this.cuePoints=a,this.checkCuePoints(this.currentTime)},this.addBindings=function(){a.$watch("vgTheme",this.onUpdateTheme.bind(this)),a.$watch("vgAutoPlay",this.onUpdateAutoPlay.bind(this)),a.$watch("vgPlaysInline",this.onUpdatePlaysInline.bind(this)),a.$watch("vgCuePoints",this.onUpdateCuePoints.bind(this))},this.onFullScreenChange=function(b){this.isFullScreen=d.isFullScreen(),a.$apply()},a.$on("$destroy",this.clearMedia.bind(this)),a.$on("$routeChangeStart",this.clearMedia.bind(this)),this.init()}]),angular.module("com.2fdevs.videogular").directive("vgCrossorigin",[function(){return{restrict:"A",require:"^videogular",link:{pre:function(a,b,c,d){var e;a.setCrossorigin=function(a){a?d.mediaElement.attr("crossorigin",a):d.mediaElement.removeAttr("crossorigin")},d.isConfig?a.$watch(function(){return d.config},function(){d.config&&a.setCrossorigin(d.config.crossorigin)}):a.$watch(c.vgCrossorigin,function(b,c){e&&b==c||!b?a.setCrossorigin():(e=b,a.setCrossorigin(e))})}}}}]),angular.module("com.2fdevs.videogular").directive("vgLoop",[function(){return{restrict:"A",require:"^videogular",link:{pre:function(a,b,c,d){var e;a.setLoop=function(a){a?d.mediaElement.attr("loop",a):d.mediaElement.removeAttr("loop")},d.isConfig?a.$watch(function(){return d.config},function(){d.config&&a.setLoop(d.config.loop)}):a.$watch(c.vgLoop,function(b,c){e&&b==c||!b?a.setLoop():(e=b,a.setLoop(e))})}}}}]),angular.module("com.2fdevs.videogular").directive("vgMedia",["$timeout","VG_UTILS","VG_STATES",function(a,b,c){return{restrict:"E",require:"^videogular",templateUrl:function(a,b){var c=b.vgType||"video";return b.vgTemplate||"vg-templates/vg-media-"+c},scope:{vgSrc:"=?",vgType:"=?"},link:function(d,e,f,g){var h;f.vgType&&"video"!==f.vgType?f.vgType="audio":f.vgType="video",d.onChangeSource=function(a,b){h&&a==b||!a||(h=a,g.currentState!==c.PLAY&&(g.currentState=c.STOP),g.sources=h,d.changeSource())},d.changeSource=function(){var c="";if(g.mediaElement[0].canPlayType){for(var d=0,e=h.length;e>d;d++)if(c=g.mediaElement[0].canPlayType(h[d].type),"maybe"==c||"probably"==c){g.mediaElement.attr("src",h[d].src),g.mediaElement.attr("type",h[d].type),g.changeSource(h[d]);break}}else g.mediaElement.attr("src",h[0].src),g.mediaElement.attr("type",h[0].type),g.changeSource(h[0]);b.isMobileDevice()&&g.mediaElement[0].load(),a(function(){g.autoPlay&&!b.isMobileDevice()&&g.play()}),""==c&&g.onVideoError()},g.mediaElement=e.find(f.vgType),g.sources=d.vgSrc,g.addListeners(),g.onVideoReady(),d.$watch("vgSrc",d.onChangeSource),d.$watch(function(){return g.sources},d.onChangeSource),g.isConfig&&d.$watch(function(){return g.config},function(){g.config&&(d.vgSrc=g.config.sources)})}}}]),angular.module("com.2fdevs.videogular").directive("vgNativeControls",[function(){return{restrict:"A",require:"^videogular",link:{pre:function(a,b,c,d){var e;a.setControls=function(a){a?d.mediaElement.attr("controls",a):d.mediaElement.removeAttr("controls")},d.isConfig?a.$watch(function(){return d.config},function(){d.config&&a.setControls(d.config.controls)}):a.$watch(c.vgNativeControls,function(b,c){e&&b==c||!b?a.setControls():(e=b,a.setControls(e))})}}}}]),angular.module("com.2fdevs.videogular").directive("vgPreload",[function(){return{restrict:"A",require:"^videogular",link:{pre:function(a,b,c,d){var e;a.setPreload=function(a){a?d.mediaElement.attr("preload",a):d.mediaElement.removeAttr("preload")},d.isConfig?a.$watch(function(){return d.config},function(){d.config&&a.setPreload(d.config.preload)}):a.$watch(c.vgPreload,function(b,c){e&&b==c||!b?a.setPreload():(e=b,a.setPreload(e))})}}}}]),angular.module("com.2fdevs.videogular").directive("vgTracks",[function(){return{restrict:"A",require:"^videogular",link:{pre:function(a,b,c,d){var e,f,g;a.onLoadMetaData=function(){a.updateTracks()},a.updateTracks=function(){var b=d.mediaElement.children();for(f=0,g=b.length;g>f;f++)b[f].remove&&b[f].remove();if(e)for(f=0,g=e.length;g>f;f++){var c=document.createElement("track");for(var h in e[f])c[h]=e[f][h];c.addEventListener("load",a.onLoadTrack.bind(a,c)),d.mediaElement[0].appendChild(c)}},a.onLoadTrack=function(a){a.mode="showing",d.mediaElement[0].textTracks[0].mode="showing"},a.setTracks=function(b){e=b,d.tracks=b,d.mediaElement[0].addEventListener("loadedmetadata",a.onLoadMetaData.bind(a),!1)},d.isConfig?a.$watch(function(){return d.config},function(){d.config&&a.setTracks(d.config.tracks)}):a.$watch(c.vgTracks,function(b,c){e&&b==c||a.setTracks(b)})}}}}]),angular.module("com.2fdevs.videogular").directive("videogular",[function(){return{restrict:"EA",scope:{vgTheme:"=?",vgAutoPlay:"=?",vgPlaysInline:"=?",vgCuePoints:"=?",vgConfig:"@",vgCanPlay:"&",vgComplete:"&",vgUpdateVolume:"&",vgUpdatePlayback:"&",vgUpdateTime:"&",vgUpdateState:"&",vgPlayerReady:"&",vgChangeSource:"&",vgError:"&"},controller:"vgController",controllerAs:"API",link:{pre:function(a,b,c,d){d.videogularElement=angular.element(b)}}}}]),angular.module("com.2fdevs.videogular").service("vgConfigLoader",["$http","$q","$sce",function(a,b,c){this.loadConfig=function(d){var e=b.defer();return a({method:"GET",url:d}).then(function(a){for(var b=a.data,d=0,f=b.sources.length;f>d;d++)b.sources[d].src=c.trustAsResourceUrl(b.sources[d].src);e.resolve(b)},function(){e.reject()}),e.promise}}]),angular.module("com.2fdevs.videogular").service("vgFullscreen",["VG_UTILS",function(a){function b(){return null!=document[c.element]}var c=null,d={w3:{enabled:"fullscreenEnabled",element:"fullscreenElement",request:"requestFullscreen",exit:"exitFullscreen",onchange:"fullscreenchange",onerror:"fullscreenerror"},newWebkit:{enabled:"webkitFullscreenEnabled",element:"webkitFullscreenElement",request:"webkitRequestFullscreen",exit:"webkitExitFullscreen",onchange:"webkitfullscreenchange",onerror:"webkitfullscreenerror"},oldWebkit:{enabled:"webkitIsFullScreen",element:"webkitCurrentFullScreenElement",request:"webkitRequestFullScreen",exit:"webkitCancelFullScreen",onchange:"webkitfullscreenchange",onerror:"webkitfullscreenerror"},moz:{enabled:"mozFullScreen",element:"mozFullScreenElement",request:"mozRequestFullScreen",exit:"mozCancelFullScreen",onchange:"mozfullscreenchange",onerror:"mozfullscreenerror"},ios:{enabled:"webkitFullscreenEnabled",element:"webkitFullscreenElement",request:"webkitEnterFullscreen",exit:"webkitExitFullscreen",onchange:"webkitfullscreenchange",onerror:"webkitfullscreenerror"},ms:{enabled:"msFullscreenEnabled",element:"msFullscreenElement",request:"msRequestFullscreen",exit:"msExitFullscreen",onchange:"MSFullscreenChange",onerror:"MSFullscreenError"}};for(var e in d)if(d[e].enabled in document){c=d[e];break}a.isiOSDevice()&&(c=d.ios),this.isAvailable=null!=c,c&&(this.onchange=c.onchange,this.onerror=c.onerror,this.isFullScreen=b,this.exit=function(){document[c.exit]()},this.request=function(a){a[c.request]()})}]),angular.module("com.2fdevs.videogular").service("VG_UTILS",["$window",function(a){this.fixEventOffset=function(a){var b=navigator.userAgent.match(/Firefox\/(\d+)/i);if(b&&Number.parseInt(b.pop())<39){var c=a.currentTarget.currentStyle||window.getComputedStyle(a.target,null),d=parseInt(c.borderLeftWidth,10),e=parseInt(c.borderTopWidth,10),f=a.currentTarget.getBoundingClientRect(),g=a.clientX-d-f.left,h=a.clientY-e-f.top;a.offsetX=g,a.offsetY=h}return a},this.getZIndex=function(){for(var a,b=1,c=document.getElementsByTagName("*"),d=0,e=c.length;e>d;d++)a=parseInt(window.getComputedStyle(c[d])["z-index"]),a>b&&(b=a+1);return b},this.isMobileDevice=function(){return"undefined"!=typeof window.orientation||-1!==navigator.userAgent.indexOf("IEMobile")},this.isiOSDevice=function(){return navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/iPad/i)},this.supportsLocalStorage=function(){var b="videogular-test-key",c=a.sessionStorage;try{return c.setItem(b,"1"),c.removeItem(b),"localStorage"in a&&null!==a.localStorage}catch(d){return!1}}}]);

/***/ }),

/***/ 94:
/***/ (function(module, exports) {

	"use strict";angular.module("com.2fdevs.videogular.plugins.controls",[]).run(["$templateCache",function(a){a.put("vg-templates/vg-controls",'<div class="controls-container" ng-mousemove="onMouseMove()" ng-class="animationClass" ng-transclude></div>')}]).directive("vgControls",["$timeout","VG_STATES",function(a,b){return{restrict:"E",require:"^videogular",transclude:!0,templateUrl:function(a,b){return b.vgTemplate||"vg-templates/vg-controls"},scope:{vgAutohide:"=?",vgAutohideTime:"=?"},link:function(c,d,e,f){var g,h=2e3;c.API=f,c.onMouseMove=function(){c.vgAutohide&&c.showControls()},c.setAutohide=function(d){d&&f.currentState==b.PLAY?g=a(c.hideControls,h):(c.animationClass="",a.cancel(g),c.showControls())},c.setAutohideTime=function(a){h=a},c.hideControls=function(){c.animationClass="hide-animation"},c.showControls=function(){c.animationClass="show-animation",a.cancel(g),c.vgAutohide&&f.currentState==b.PLAY&&(g=a(c.hideControls,h))},f.isConfig?c.$watch("API.config",function(){if(c.API.config){var a=c.API.config.plugins.controls.autohide||!1,b=c.API.config.plugins.controls.autohideTime||2e3;c.vgAutohide=a,c.vgAutohideTime=b,c.setAutohideTime(b),c.setAutohide(a)}}):(void 0!=c.vgAutohide&&c.$watch("vgAutohide",c.setAutohide),void 0!=c.vgAutohideTime&&c.$watch("vgAutohideTime",c.setAutohideTime))}}}]),angular.module("com.2fdevs.videogular.plugins.controls").run(["$templateCache",function(a){a.put("vg-templates/vg-fullscreen-button",'<button class="iconButton" ng-click="onClickFullScreen()" ng-class="fullscreenIcon" aria-label="Toggle full screen" type="button"> </button>')}]).directive("vgFullscreenButton",[function(){return{restrict:"E",require:"^videogular",scope:{},templateUrl:function(a,b){return b.vgTemplate||"vg-templates/vg-fullscreen-button"},link:function(a,b,c,d){a.onChangeFullScreen=function(b){a.fullscreenIcon={enter:!b,exit:b}},a.onClickFullScreen=function(){d.toggleFullScreen()},a.fullscreenIcon={enter:!0},a.$watch(function(){return d.isFullScreen},function(b,c){b!=c&&a.onChangeFullScreen(b)})}}}]),angular.module("com.2fdevs.videogular.plugins.controls").run(["$templateCache",function(a){a.put("vg-templates/vg-play-pause-button",'<button class="iconButton" ng-click="onClickPlayPause()" ng-class="playPauseIcon" aria-label="Play/Pause" type="button"></button>')}]).directive("vgPlayPauseButton",["VG_STATES",function(a){return{restrict:"E",require:"^videogular",scope:{},templateUrl:function(a,b){return b.vgTemplate||"vg-templates/vg-play-pause-button"},link:function(b,c,d,e){b.setState=function(c){switch(c){case a.PLAY:b.playPauseIcon={pause:!0};break;case a.PAUSE:b.playPauseIcon={play:!0};break;case a.STOP:b.playPauseIcon={play:!0}}},b.onClickPlayPause=function(){e.playPause()},b.playPauseIcon={play:!0},b.$watch(function(){return e.currentState},function(a,c){b.setState(a)})}}}]),angular.module("com.2fdevs.videogular.plugins.controls").run(["$templateCache",function(a){a.put("vg-templates/vg-playback-button",'<button class="playbackValue iconButton" ng-click="onClickPlayback()">{{playback}}x</button>')}]).directive("vgPlaybackButton",["VG_UTILS",function(a){return{restrict:"E",require:"^videogular",templateUrl:function(a,b){return b.vgTemplate||"vg-templates/vg-playback-button"},link:function(a,b,c,d){a.playback="1.0",a.onClickPlayback=function(){var b=[".5","1.0","1.5","2.0"],c=b.indexOf(a.playback)+1;c>=b.length?a.playback=b[0]:a.playback=b[c],d.setPlayback(a.playback)},a.$watch(function(){return d.playback})}}}]),angular.module("com.2fdevs.videogular.plugins.controls").run(["$templateCache",function(a){a.put("vg-templates/vg-scrub-bar-cue-points",'<div class="cue-point-timeline" ng-style="timelineWidth"><div ng-repeat="cuePoint in vgCuePoints" class="cue-point" ng-style="cuePoint.$$style"></div></div>')}]).directive("vgScrubBarCuePoints",[function(){return{restrict:"E",require:"^videogular",templateUrl:function(a,b){return b.vgTemplate||"vg-templates/vg-scrub-bar-cue-points"},scope:{vgCuePoints:"="},link:function(a,b,c,d){a.onPlayerReady=function(){a.updateCuePoints(a.vgCuePoints)},a.updateCuePoints=function(a){var c;if(a){c=parseInt(b[0].clientWidth);for(var e=0,f=a.length;f>e;e++){var g=1e3*(a[e].timeLapse.end-a[e].timeLapse.start),h=100*a[e].timeLapse.start/d.totalTime*1e3+"%",i=0;"number"==typeof g&&d.totalTime&&(i=100*g/d.totalTime+"%"),a[e].$$style={width:i,left:h}}}},a.$watch("vgCuePoints",a.updateCuePoints),a.$watch(function(){return d.totalTime},function(b,c){b>0&&a.onPlayerReady()})}}}]),angular.module("com.2fdevs.videogular.plugins.controls").directive("vgScrubBarCurrentTime",[function(){return{restrict:"E",require:"^videogular",link:function(a,b,c,d){var e=0;a.onUpdateTime=function(a){"number"==typeof a&&d.totalTime?(e=100*(a/d.totalTime),b.css("width",e+"%")):b.css("width",0)},a.$watch(function(){return d.currentTime},function(b,c){a.onUpdateTime(b)})}}}]),angular.module("com.2fdevs.videogular.plugins.controls").run(["$templateCache",function(a){a.put("vg-templates/vg-scrub-bar",'<div role="slider" aria-valuemax="{{ariaTime(API.totalTime)}}" aria-valuenow="{{ariaTime(API.currentTime)}}" aria-valuemin="0" aria-label="Time scrub bar" tabindex="0" ng-transclude ng-keydown="onScrubBarKeyDown($event)"></div>')}]).directive("vgScrubBar",["VG_STATES","VG_UTILS",function(a,b){return{restrict:"E",require:"^videogular",transclude:!0,templateUrl:function(a,b){return b.vgTemplate||"vg-templates/vg-scrub-bar"},link:function(c,d,e,f){var g=!1,h=!1,i=!1,j=0,k=37,l=39,m=5;c.API=f,c.ariaTime=function(a){return Math.round(a/1e3)},c.onScrubBarTouchStart=function(a){var e,k=a.originalEvent||a,l=k.touches;j=b.isiOSDevice()?-1*(l[0].clientX-k.layerX):k.layerX,e=l[0].clientX+j-l[0].target.offsetLeft,g=!0,h&&(i=!0),f.pause(),f.seekTime(e*f.mediaElement[0].duration/d[0].scrollWidth),c.$apply()},c.onScrubBarTouchEnd=function(a){a.originalEvent||a;i&&(i=!1,f.play()),g=!1,c.$apply()},c.onScrubBarTouchMove=function(a){var b,e=a.originalEvent||a,h=e.touches;g&&(b=h[0].clientX+j-h[0].target.offsetLeft,f.seekTime(b*f.mediaElement[0].duration/d[0].scrollWidth)),c.$apply()},c.onScrubBarTouchLeave=function(a){g=!1,c.$apply()},c.onScrubBarMouseDown=function(a){a=b.fixEventOffset(a),g=!0,h&&(i=!0),f.pause(),f.seekTime(a.offsetX*f.mediaElement[0].duration/d[0].scrollWidth),c.$apply()},c.onScrubBarMouseUp=function(a){i&&(i=!1,f.play()),g=!1,c.$apply()},c.onScrubBarMouseMove=function(a){g&&(a=b.fixEventOffset(a),f.seekTime(a.offsetX*f.mediaElement[0].duration/d[0].scrollWidth)),c.$apply()},c.onScrubBarMouseLeave=function(a){g=!1,c.$apply()},c.onScrubBarKeyDown=function(a){var b=f.currentTime/f.totalTime*100;a.which===k||a.keyCode===k?(f.seekTime(b-m,!0),a.preventDefault()):(a.which===l||a.keyCode===l)&&(f.seekTime(b+m,!0),a.preventDefault())},c.setState=function(b){if(!g)switch(b){case a.PLAY:h=!0;break;case a.PAUSE:h=!1;break;case a.STOP:h=!1}},c.$watch(function(){return f.currentState},function(a,b){a!=b&&c.setState(a)}),b.isMobileDevice()?(d.bind("touchstart",c.onScrubBarTouchStart),d.bind("touchend",c.onScrubBarTouchEnd),d.bind("touchmove",c.onScrubBarTouchMove),d.bind("touchleave",c.onScrubBarTouchLeave)):(d.bind("mousedown",c.onScrubBarMouseDown),d.bind("mouseup",c.onScrubBarMouseUp),d.bind("mousemove",c.onScrubBarMouseMove),d.bind("mouseleave",c.onScrubBarMouseLeave))}}}]),angular.module("com.2fdevs.videogular.plugins.controls").directive("vgTimeDisplay",[function(){return{require:"^videogular",restrict:"E",link:function(a,b,c,d){a.currentTime=d.currentTime,a.timeLeft=d.timeLeft,a.totalTime=d.totalTime,a.isLive=d.isLive,a.$watch(function(){return d.currentTime},function(b,c){a.currentTime=b}),a.$watch(function(){return d.timeLeft},function(b,c){a.timeLeft=b}),a.$watch(function(){return d.totalTime},function(b,c){a.totalTime=b}),a.$watch(function(){return d.isLive},function(b,c){a.isLive=b})}}}]),angular.module("com.2fdevs.videogular.plugins.controls").run(["$templateCache",function(a){a.put("vg-templates/vg-mute-button",'<button type="button" class="iconButton" ng-class="muteIcon" ng-click="onClickMute()" ng-focus="onMuteButtonFocus()" ng-blur="onMuteButtonLoseFocus()" ng-keydown="onMuteButtonKeyDown($event)" aria-label="Mute"></button>')}]).directive("vgMuteButton",[function(){return{restrict:"E",require:"^videogular",templateUrl:function(a,b){return b.vgTemplate||"vg-templates/vg-mute-button"},link:function(a,b,c,d){var e=!1,f=38,g=40,h=.05;a.onClickMute=function(){e?a.currentVolume=a.defaultVolume:(a.currentVolume=0,a.muteIcon={mute:!0}),e=!e,d.setVolume(a.currentVolume)},a.onMuteButtonFocus=function(){a.volumeVisibility="visible"},a.onMuteButtonLoseFocus=function(){a.volumeVisibility="hidden"},a.onMuteButtonKeyDown=function(a){var b,c=null!=d.volume?d.volume:1;a.which===f||a.keyCode===f?(b=c+h,b>1&&(b=1),d.setVolume(b),a.preventDefault()):(a.which===g||a.keyCode===g)&&(b=c-h,0>b&&(b=0),d.setVolume(b),a.preventDefault())},a.onSetVolume=function(b){a.currentVolume=b,e=0===a.currentVolume,e?b>0&&(a.defaultVolume=b):a.defaultVolume=b;var c=Math.round(100*b);0==c?a.muteIcon={mute:!0}:c>0&&25>c?a.muteIcon={level0:!0}:c>=25&&50>c?a.muteIcon={level1:!0}:c>=50&&75>c?a.muteIcon={level2:!0}:c>=75&&(a.muteIcon={level3:!0})},a.defaultVolume=1,a.currentVolume=a.defaultVolume,a.muteIcon={level3:!0},a.onSetVolume(d.volume),a.$watch(function(){return d.volume},function(b,c){b!=c&&a.onSetVolume(b)})}}}]),angular.module("com.2fdevs.videogular.plugins.controls").run(["$templateCache",function(a){a.put("vg-templates/vg-volume-bar",'<div class="verticalVolumeBar">              <div class="volumeBackground" ng-click="onClickVolume($event)" ng-mousedown="onMouseDownVolume()" ng-mouseup="onMouseUpVolume()" ng-mousemove="onMouseMoveVolume($event)" ng-mouseleave="onMouseLeaveVolume()">                <div class="volumeValue"></div>                <div class="volumeClickArea"></div>              </div>            </div>')}]).directive("vgVolumeBar",["VG_UTILS",function(a){return{restrict:"E",require:"^videogular",templateUrl:function(a,b){return b.vgTemplate||"vg-templates/vg-volume-bar"},link:function(b,c,d,e){var f=!1,g=angular.element(c[0].getElementsByClassName("volumeBackground")),h=angular.element(c[0].getElementsByClassName("volumeValue"));b.onClickVolume=function(b){b=a.fixEventOffset(b);var c=parseInt(g.prop("offsetHeight")),d=100*b.offsetY/c,f=1-d/100;e.setVolume(f)},b.onMouseDownVolume=function(){f=!0},b.onMouseUpVolume=function(){f=!1},b.onMouseLeaveVolume=function(){f=!1},b.onMouseMoveVolume=function(b){if(f){b=a.fixEventOffset(b);var c=parseInt(g.prop("offsetHeight")),d=100*b.offsetY/c,h=1-d/100;e.setVolume(h)}},b.updateVolumeView=function(a){a=100*a,h.css("height",a+"%"),h.css("top",100-a+"%")},b.onChangeVisibility=function(a){c.css("visibility",a)},c.css("visibility",b.volumeVisibility),b.$watch("volumeVisibility",b.onChangeVisibility),b.updateVolumeView(e.volume),b.$watch(function(){return e.volume},function(a,c){a!=c&&b.updateVolumeView(a)})}}}]),angular.module("com.2fdevs.videogular.plugins.controls").directive("vgVolume",["VG_UTILS",function(a){return{restrict:"E",link:function(b,c,d){b.onMouseOverVolume=function(){b.$evalAsync(function(){b.volumeVisibility="visible"})},b.onMouseLeaveVolume=function(){b.$evalAsync(function(){b.volumeVisibility="hidden"})},a.isMobileDevice()?c.css("display","none"):(b.volumeVisibility="hidden",c.bind("mouseover",b.onMouseOverVolume),c.bind("mouseleave",b.onMouseLeaveVolume))}}}]);

/***/ }),

/***/ 95:
/***/ (function(module, exports) {

	"use strict";angular.module("com.2fdevs.videogular.plugins.overlayplay",[]).run(["$templateCache",function(a){a.put("vg-templates/vg-overlay-play",'<div class="overlayPlayContainer" ng-click="onClickOverlayPlay()">              <div class="iconButton" ng-class="overlayPlayIcon"></div>            </div>')}]).directive("vgOverlayPlay",["VG_STATES",function(a){return{restrict:"E",require:"^videogular",scope:{},templateUrl:function(a,b){return b.vgTemplate||"vg-templates/vg-overlay-play"},link:function(b,c,d,e){b.onChangeState=function(c){switch(c){case a.PLAY:b.overlayPlayIcon={};break;case a.PAUSE:b.overlayPlayIcon={play:!0};break;case a.STOP:b.overlayPlayIcon={play:!0}}},b.onClickOverlayPlay=function(a){e.playPause()},b.overlayPlayIcon={play:!0},b.$watch(function(){return e.currentState},function(a,c){b.onChangeState(a)})}}}]);

/***/ }),

/***/ 96:
/***/ (function(module, exports) {

	"use strict";angular.module("com.2fdevs.videogular.plugins.poster",[]).run(["$templateCache",function(a){a.put("vg-templates/vg-poster",'<img ng-src="{{vgUrl}}" ng-class="API.currentState">')}]).directive("vgPoster",[function(){return{restrict:"E",require:"^videogular",scope:{vgUrl:"=?"},templateUrl:function(a,b){return b.vgTemplate||"vg-templates/vg-poster"},link:function(a,b,c,d){a.API=d,d.isConfig&&a.$watch("API.config",function(){a.API.config&&(a.vgUrl=a.API.config.plugins.poster.url)})}}}]);

/***/ }),

/***/ 97:
/***/ (function(module, exports) {

	"use strict";angular.module("com.2fdevs.videogular.plugins.buffering",[]).run(["$templateCache",function(a){a.put("vg-templates/vg-buffering",'<div class="bufferingContainer">              <div ng-class="spinnerClass" class="loadingSpinner"></div>            </div>')}]).directive("vgBuffering",["VG_STATES","VG_UTILS",function(a,b){return{restrict:"E",require:"^videogular",templateUrl:function(a,b){return b.vgTemplate||"vg-templates/vg-buffering"},link:function(c,d,e,f){c.showSpinner=function(){c.spinnerClass={stop:f.isBuffering},d.css("display","block")},c.hideSpinner=function(){c.spinnerClass={stop:f.isBuffering},d.css("display","none")},c.setState=function(a){a?c.showSpinner():c.hideSpinner()},c.onStateChange=function(b){b==a.STOP&&c.hideSpinner()},c.onPlayerReady=function(a){a&&c.hideSpinner()},c.showSpinner(),b.isMobileDevice()?c.hideSpinner():c.$watch(function(){return f.isReady},function(a,b){(1==f.isReady||a!=b)&&c.onPlayerReady(a)}),c.$watch(function(){return f.currentState},function(a,b){a!=b&&c.onStateChange(a)}),c.$watch(function(){return f.isBuffering},function(a,b){a!=b&&c.setState(a)})}}}]);

/***/ }),

/***/ 98:
/***/ (function(module, exports) {

	"use strict";angular.module("com.2fdevs.videogular.plugins.imaads",[]).directive("vgImaAds",["$window","VG_STATES",function(a,b){return{restrict:"E",require:"^videogular",scope:{vgNetwork:"=?",vgUnitPath:"=?",vgCompanion:"=?",vgCompanionSize:"=?",vgAdTagUrl:"=?",vgSkipButton:"=?"},link:function(c,d,e,f){var g,h,i=new google.ima.AdDisplayContainer(d[0]),j=new google.ima.AdsLoader(i),k=null,l=!1,m=function(){j.contentComplete()},n=0,o=angular.element(c.vgSkipButton);c.API=f,c.onPlayerReady=function(a){a&&(f.mediaElement[0].addEventListener("ended",m),j.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,c.onAdsManagerLoaded,!1,this),j.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,c.onAdError,!1,this),c.loadAds())},c.onUpdateAds=function(a,b){a!=b&&(c.loadAds(),f.pause(),i.initialize(),c.requestAds(c.vgAdTagUrl))},c.loadAds=function(){c.vgCompanion&&googletag.cmd.push(function(){googletag.defineSlot("/"+c.vgNetwork+"/"+c.vgUnitPath,c.vgCompanionSize,c.vgCompanion).addService(googletag.companionAds()).addService(googletag.pubads()),googletag.companionAds().setRefreshUnfilledSlots(!0),googletag.pubads().enableVideoAds(),googletag.enableServices()})},c.onUpdateState=function(a){switch(a){case b.PLAY:l||(f.pause(),i.initialize(),c.requestAds(c.vgAdTagUrl),l=!0);break;case b.STOP:j.contentComplete()}},c.requestAds=function(b){c.show();var e=new google.ima.AdsRequest,f=a.getComputedStyle(d[0]);e.adTagUrl=b,e.linearAdSlotWidth=parseInt(f.width,10),e.linearAdSlotHeight=parseInt(f.height,10),e.nonLinearAdSlotWidth=parseInt(f.width,10),e.nonLinearAdSlotHeight=parseInt(f.height,10),j.requestAds(e)},c.onAdsManagerLoaded=function(a){c.show(),k=a.getAdsManager(f.mediaElement[0]),c.processAdsManager(k)},c.processAdsManager=function(a){g=f.videogularElement[0].offsetWidth,h=f.videogularElement[0].offsetHeight,a.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,c.onContentPauseRequested,!1,this),a.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,c.onContentResumeRequested,!1,this),a.addEventListener(google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED,c.onSkippableStateChanged,!1,this),a.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED,c.onAllAdsComplete,!1,this),a.addEventListener(google.ima.AdEvent.Type.COMPLETE,c.onAdComplete,!1,this),a.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,c.onAdError,!1,this),a.init(g,h,google.ima.ViewMode.NORMAL),a.start()},c.onSkippableStateChanged=function(){var a=k.getAdSkippableState();a?o.css("display","block"):o.css("display","none")},c.onClickSkip=function(){k.skip()},c.onContentPauseRequested=function(){c.show(),f.mediaElement[0].removeEventListener("ended",m),f.pause()},c.onContentResumeRequested=function(){f.mediaElement[0].addEventListener("ended",m),f.play(),c.hide()},c.onAdError=function(){k&&k.destroy(),c.hide(),f.play()},c.onAllAdsComplete=function(){c.hide(),k.getCuePoints().join().indexOf("-1")>=0&&f.stop()},c.onAdComplete=function(){n++},c.show=function(){d.css("display","block")},c.hide=function(){d.css("display","none")},o.bind("click",c.onClickSkip),d.prepend(o),angular.element(a).bind("resize",function(){g=f.videogularElement[0].offsetWidth,h=f.videogularElement[0].offsetHeight,k&&(f.isFullScreen?k.resize(g,h,google.ima.ViewMode.FULLSCREEN):k.resize(g,h,google.ima.ViewMode.NORMAL))}),f.isConfig?c.$watch("API.config",function(){c.API.config&&(c.vgNetwork=c.API.config.plugins["ima-ads"].network,c.vgUnitPath=c.API.config.plugins["ima-ads"].unitPath,c.vgCompanion=c.API.config.plugins["ima-ads"].companion,c.vgCompanionSize=c.API.config.plugins["ima-ads"].companionSize,c.vgAdTagUrl=c.API.config.plugins["ima-ads"].adTagUrl,c.vgSkipButton=c.API.config.plugins["ima-ads"].skipButton,c.onPlayerReady(!0))}):c.$watch("vgAdTagUrl",c.onUpdateAds.bind(c)),c.$watch(function(){return f.isReady},function(a,b){(1==f.isReady||a!=b)&&c.onPlayerReady(a)}),c.$watch(function(){return f.currentState},function(a,b){a!=b&&c.onUpdateState(a)})}}}]);

/***/ }),

/***/ 99:
/***/ (function(module, exports) {

	"use strict";
	angular.module("info.vietnamcode.nampnq.videogular.plugins.youtube", [])
	    .run(['$rootScope', '$window',
	        function ($rootScope, $window) {
	            $rootScope.youtubeApiReady = false;
	            $window.onYouTubeIframeAPIReady = function () {
	                $rootScope.$apply(function () {
	                    $rootScope.youtubeApiReady = true;
	                });
	            };
	            var tag = document.createElement('script');
	            tag.src = "https://www.youtube.com/iframe_api";
	            var firstScriptTag = document.getElementsByTagName('script')[0];
	            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	        }
	    ])
	    .directive(
	        "vgYoutube", ["$rootScope", "$window", "$timeout", "$interval", "VG_STATES",
	            function ($rootScope, $window, $timeout, $interval, VG_STATES) {
	                return {
	                    restrict: "A",
	                    require: "^videogular",
	                    link: function (scope, elem, attr, API) {
	                        var ytplayer, updateTimer, optionsArr, playerVars;

	                        var youtubeReg = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	                        optionsArr = attr.vgYoutube !== null ? attr.vgYoutube.split(";") : null;
	                        playerVars = {
	                            'controls': 0,
	                            'showinfo': 0,
	                            'rel': 0,
	                            'autoplay': 0, //Switch autoplay to 1 to autoplay videos
	                            'start': 0
	                        };

	                        if (optionsArr !== null) {
	                            optionsArr.forEach(function (item) {
	                                var keyValuePair = item.split("=");
	                                if (playerVars.hasOwnProperty(keyValuePair[0])) {
	                                    playerVars[keyValuePair[0]] = keyValuePair[1] || 0;
	                                }
	                            });
	                        }

	                        function getYoutubeId(url) {
	                            return url.match(youtubeReg)[2];
	                        }

	                        function initYoutubePlayer(url) {
	                            if (ytplayer) {
	                                ytplayer.cueVideoById({
	                                    videoId: getYoutubeId(url)
	                                });
	                            } else {
	                                $rootScope.$watch('youtubeApiReady', function (value) {
	                                    if (value) {
	                                        ytplayer = new YT.Player(API.mediaElement[0], {
	                                            videoId: getYoutubeId(url),
	                                            playerVars: playerVars,
	                                            events: {
	                                                'onReady': onVideoReady,
	                                                'onStateChange': onVideoStateChange
	                                            }
	                                        });
	                                    }
	                                });
	                            }
	                        }

	                        function destroyYoutubePlayer() {
	                            ytplayer.destroy();
	                        }

	                        function onVideoReady() {
	                            //Define some property, method for player
	                            API.mediaElement[0].__defineGetter__("currentTime", function () {
	                                return ytplayer.getCurrentTime();
	                            });
	                            API.mediaElement[0].__defineSetter__("currentTime", function (seconds) {
	                                return ytplayer.seekTo(seconds, true);
	                            });
	                            API.mediaElement[0].__defineGetter__("duration", function () {
	                                return ytplayer.getDuration();
	                            });
	                            API.mediaElement[0].__defineGetter__("paused", function () {
	                                return ytplayer.getPlayerState() != YT.PlayerState.PLAYING;
	                            });
	                            API.mediaElement[0].__defineGetter__("videoWidth", function () {
	                                return ytplayer.a.width;
	                            });
	                            API.mediaElement[0].__defineGetter__("videoHeight", function () {
	                                return ytplayer.a.height;
	                            });
	                            API.mediaElement[0].__defineGetter__("volume", function () {
	                                return ytplayer.getVolume() / 100.0;
	                            });
	                            API.mediaElement[0].__defineSetter__("volume", function (volume) {
	                                return ytplayer.setVolume(volume * 100.0);
	                            });
	                            API.mediaElement[0].play = function () {
	                                ytplayer.playVideo();
	                            };
	                            API.mediaElement[0].pause = function () {
	                                ytplayer.pauseVideo();
	                            };
	                            updateTime(); // Initial time update
	                            angular.element(ytplayer.getIframe()).css({ 'width': '100%', 'height': '100%' });

	                            // Trigger canplay event
	                            var event = new CustomEvent("canplay");
	                            API.mediaElement[0].dispatchEvent(event);
	                        }

	                        function updateTime() {
	                            API.onUpdateTime({
	                                target: API.mediaElement[0]
	                            });
	                        }

	                        function startUpdateTimer(interval) {
	                            if (updateTimer) {
	                                stopUpdateTimer();
	                            }
	                            updateTimer = setInterval(updateTime, interval);
	                        }

	                        function stopUpdateTimer() {
	                            if (updateTimer) {
	                                clearInterval(updateTimer);
	                            }
	                        }

	                        function onVideoStateChange(event) {
	                            var player = event.target;

	                            switch (event.data) {
	                                case YT.PlayerState.ENDED:
	                                    stopUpdateTimer();
	                                    API.onComplete();
	                                    break;

	                                case YT.PlayerState.PLAYING:
	                                    // Trigger onStartPlaying event
	                                    var event = new CustomEvent("playing");
	                                    API.mediaElement[0].dispatchEvent(event);
	                                    API.setState(VG_STATES.PLAY);
	                                    startUpdateTimer(600);
	                                    break;

	                                case YT.PlayerState.PAUSED:
	                                    // NB Videogular calls pause() on the YouTube player to actually stop a video.
	                                    // Avoid jumping from the desired "stop" status to "pause" status:
	                                    if (API.currentState == VG_STATES.PLAY) {
	                                        API.setState(VG_STATES.PAUSE);
	                                    }
	                                    stopUpdateTimer();
	                                    break;

	                                case YT.PlayerState.BUFFERING:
	                                    // Trigger onStartBuffering event
	                                    var event = new CustomEvent("waiting");
	                                    API.mediaElement[0].dispatchEvent(event);
	                                    break;

	                                case YT.PlayerState.CUED:
	                                    //No appropriate state
	                                    break;
	                            }
	                        }

	                        function isYoutube(url) {
	                            if (url) {
	                                return url.match(youtubeReg);
	                            }
	                            return false;
	                        }

	                        function onSourceChange(url) {
	                            if (isYoutube(url)) {
	                                initYoutubePlayer(url);
	                            } else {
	                                if (ytplayer) {
	                                    destroyYoutubePlayer();
	                                }
	                            }
	                        }
	                        scope.$watch(
	                            function () {
	                                return API.sources;
	                            },
	                            function (newVal, oldVal) {
	                                if (newVal && newVal.length > 0 && newVal[0].src) {
	                                    onSourceChange(newVal[0].src.toString());
	                                }
	                                else {
	                                    onSourceChange(null);
	                                }
	                            }
	                        );
	                        scope.$on('$destroy', function () {
	                            stopUpdateTimer();
	                        });
	                    }
	                };
	            }
	        ]);

/***/ }),

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// HumanizeDuration.js - http://git.io/j0HgmQ

	(function() {

	  var UNITS = {
	    year: 31557600000,
	    month: 2629800000,
	    week: 604800000,
	    day: 86400000,
	    hour: 3600000,
	    minute: 60000,
	    second: 1000,
	    millisecond: 1
	  };

	  var languages = {
	    ar: {
	      year: function(c) { return ((c === 1) ? "سنة" : "سنوات"); },
	      month: function(c) { return ((c === 1) ? "شهر" : "أشهر"); },
	      week: function(c) { return ((c === 1) ? "أسبوع" : "أسابيع"); },
	      day: function(c) { return ((c === 1) ? "يوم" : "أيام"); },
	      hour: function(c) { return ((c === 1) ? "ساعة" : "ساعات"); },
	      minute: function(c) { return ((c === 1) ? "دقيقة" : "دقائق"); },
	      second: function(c) { return ((c === 1) ? "ثانية" : "ثواني"); },
	      millisecond: function(c) { return ((c === 1) ? "جزء من الثانية" : "أجزاء من الثانية"); }
	    },
	    ca: {
	      year: function(c) { return "any" + ((c !== 1) ? "s" : ""); },
	      month: function(c) { return "mes" + ((c !== 1) ? "os" : ""); },
	      week: function(c) { return "setman" + ((c !== 1) ? "es" : "a"); },
	      day: function(c) { return "di" + ((c !== 1) ? "es" : "a"); },
	      hour: function(c) { return "hor" + ((c !== 1) ? "es" : "a"); },
	      minute: function(c) { return "minut" + ((c !== 1) ? "s" : ""); },
	      second: function(c) { return "segon" + ((c !== 1) ? "s" : ""); },
	      millisecond: function(c) { return "milisegon" + ((c !== 1) ? "s" : "" ); }
	    },
	    da: {
	      year: "år",
	      month: function(c) { return "måned" + ((c !== 1) ? "er" : ""); },
	      week: function(c) { return "uge" + ((c !== 1) ? "r" : ""); },
	      day: function(c) { return "dag" + ((c !== 1) ? "e" : ""); },
	      hour: function(c) { return "time" + ((c !== 1) ? "r" : ""); },
	      minute: function(c) { return "minut" + ((c !== 1) ? "ter" : ""); },
	      second: function(c) { return "sekund" + ((c !== 1) ? "er" : ""); },
	      millisecond: function(c) { return "millisekund" + ((c !== 1) ? "er" : ""); }
	    },
	    de: {
	      year: function(c) { return "Jahr" + ((c !== 1) ? "e" : ""); },
	      month: function(c) { return "Monat" + ((c !== 1) ? "e" : ""); },
	      week: function(c) { return "Woche" + ((c !== 1) ? "n" : ""); },
	      day: function(c) { return "Tag" + ((c !== 1) ? "e" : ""); },
	      hour: function(c) { return "Stunde" + ((c !== 1) ? "n" : ""); },
	      minute: function(c) { return "Minute" + ((c !== 1) ? "n" : ""); },
	      second: function(c) { return "Sekunde" + ((c !== 1) ? "n" : ""); },
	      millisecond: function(c) { return "Millisekunde" + ((c !== 1) ? "n" : ""); }
	    },
	    en: {
	      year: function(c) { return "year" + ((c !== 1) ? "s" : ""); },
	      month: function(c) { return "month" + ((c !== 1) ? "s" : ""); },
	      week: function(c) { return "week" + ((c !== 1) ? "s" : ""); },
	      day: function(c) { return "day" + ((c !== 1) ? "s" : ""); },
	      hour: function(c) { return "hour" + ((c !== 1) ? "s" : ""); },
	      minute: function(c) { return "minute" + ((c !== 1) ? "s" : ""); },
	      second: function(c) { return "second" + ((c !== 1) ? "s" : ""); },
	      millisecond: function(c) { return "millisecond" + ((c !== 1) ? "s" : ""); }
	    },
	    es: {
	      year: function(c) { return "año" + ((c !== 1) ? "s" : ""); },
	      month: function(c) { return "mes" + ((c !== 1) ? "es" : ""); },
	      week: function(c) { return "semana" + ((c !== 1) ? "s" : ""); },
	      day: function(c) { return "día" + ((c !== 1) ? "s" : ""); },
	      hour: function(c) { return "hora" + ((c !== 1) ? "s" : ""); },
	      minute: function(c) { return "minuto" + ((c !== 1) ? "s" : ""); },
	      second: function(c) { return "segundo" + ((c !== 1) ? "s" : ""); },
	      millisecond: function(c) { return "milisegundo" + ((c !== 1) ? "s" : "" ); }
	    },
	    fr: {
	      year: function(c) { return "an" + ((c !== 1) ? "s" : ""); },
	      month: "mois",
	      week: function(c) { return "semaine" + ((c !== 1) ? "s" : ""); },
	      day: function(c) { return "jour" + ((c !== 1) ? "s" : ""); },
	      hour: function(c) { return "heure" + ((c !== 1) ? "s" : ""); },
	      minute: function(c) { return "minute" + ((c !== 1) ? "s" : ""); },
	      second: function(c) { return "seconde" + ((c !== 1) ? "s" : ""); },
	      millisecond: function(c) { return "milliseconde" + ((c !== 1) ? "s" : ""); }
	    },
	    hu: {
	      year: "év",
	      month: "hónap",
	      week: "hét",
	      day: "nap",
	      hour: "óra",
	      minute: "perc",
	      second: "másodperc",
	      millisecond: "ezredmásodperc"
	    },
	    it: {
	      year: function(c) { return "ann" + ((c !== 1) ? "i" : "o"); },
	      month: function(c) { return "mes" + ((c !== 1) ? "i" : "e"); },
	      week: function(c) { return "settiman" + ((c !== 1) ? "e" : "a"); },
	      day: function(c) { return "giorn" + ((c !== 1) ? "i" : "o"); },
	      hour: function(c) { return "or" + ((c !== 1) ? "e" : "a"); },
	      minute: function(c) { return "minut" + ((c !== 1) ? "i" : "o"); },
	      second: function(c) { return "second" + ((c !== 1) ? "i" : "o"); },
	      millisecond: function(c) { return "millisecond" + ((c !== 1) ? "i" : "o" ); }
	    },
	    ja: {
	      year: "年",
	      month: "月",
	      week: "週",
	      day: "日",
	      hour: "時間",
	      minute: "分",
	      second: "秒",
	      millisecond: "ミリ秒"
	    },
	    ko: {
	      year: "년",
	      month: "개월",
	      week: "주일",
	      day: "일",
	      hour: "시간",
	      minute: "분",
	      second: "초",
	      millisecond: "밀리 초"
	    },
	    nl: {
	      year: "jaar",
	      month: function(c) { return (c === 1) ? "maand" : "maanden"; },
	      week: function(c) { return (c === 1) ? "week" : "weken"; },
	      day: function(c) { return (c === 1) ? "dag" : "dagen"; },
	      hour: "uur",
	      minute: function(c) { return (c === 1) ? "minuut" : "minuten"; },
	      second: function(c) { return (c === 1) ? "seconde" : "seconden"; },
	      millisecond: function(c) { return (c === 1) ? "milliseconde" : "milliseconden"; }
	    },
	    nob: {
	      year: "år",
	      month: function(c) { return "måned" + ((c !== 1) ? "er" : ""); },
	      week: function(c) { return "uke" + ((c !== 1) ? "r" : ""); },
	      day: function(c) { return "dag" + ((c !== 1) ? "er" : ""); },
	      hour: function(c) { return "time" + ((c !== 1) ? "r" : ""); },
	      minute: function(c) { return "minutt" + ((c !== 1) ? "er" : ""); },
	      second: function(c) { return "sekund" + ((c !== 1) ? "er" : ""); },
	      millisecond: function(c) { return "millisekund" + ((c !== 1) ? "er" : ""); }
	    },
	    pl: {
	      year: function(c) { return ["rok", "roku", "lata", "lat"][getPolishForm(c)]; },
	      month: function(c) { return ["miesiąc", "miesiąca", "miesiące", "miesięcy"][getPolishForm(c)]; },
	      week: function(c) { return ["tydzień", "tygodnia", "tygodnie", "tygodni"][getPolishForm(c)]; },
	      day: function(c) { return ["dzień", "dnia", "dni", "dni"][getPolishForm(c)]; },
	      hour: function(c) { return ["godzina", "godziny", "godziny", "godzin"][getPolishForm(c)]; },
	      minute: function(c) { return ["minuta", "minuty", "minuty", "minut"][getPolishForm(c)]; },
	      second: function(c) { return ["sekunda", "sekundy", "sekundy", "sekund"][getPolishForm(c)]; },
	      millisecond: function(c) { return ["milisekunda", "milisekundy", "milisekundy", "milisekund"][getPolishForm(c)]; }
	    },
	    pt: {
	      year: function(c) { return "ano" + ((c !== 1) ? "s" : ""); },
	      month: function(c) { return (c !== 1) ? "meses" : "mês"; },
	      week: function(c) { return "semana" + ((c !== 1) ? "s" : ""); },
	      day: function(c) { return "dia" + ((c !== 1) ? "s" : ""); },
	      hour: function(c) { return "hora" + ((c !== 1) ? "s" : ""); },
	      minute: function(c) { return "minuto" + ((c !== 1) ? "s" : ""); },
	      second: function(c) { return "segundo" + ((c !== 1) ? "s" : ""); },
	      millisecond: function(c) { return "milissegundo" + ((c !== 1) ? "s" : ""); }
	    },
	    ru: {
	      year: function(c) { return ["лет", "год", "года"][getRussianForm(c)]; },
	      month: function(c) { return ["месяцев", "месяц", "месяца"][getRussianForm(c)]; },
	      week: function(c) { return ["недель", "неделя", "недели"][getRussianForm(c)]; },
	      day: function(c) { return ["дней", "день", "дня"][getRussianForm(c)]; },
	      hour: function(c) { return ["часов", "час", "часа"][getRussianForm(c)]; },
	      minute: function(c) { return ["минут", "минута", "минуты"][getRussianForm(c)]; },
	      second: function(c) { return ["секунд", "секунда", "секунды"][getRussianForm(c)]; },
	      millisecond: function(c) { return ["миллисекунд", "миллисекунда", "миллисекунды"][getRussianForm(c)]; }
	    },
	    sv: {
	      year: "år",
	      month: function(c) { return "månad" + ((c !== 1) ? "er" : ""); },
	      week: function(c) { return "veck" + ((c !== 1) ? "or" : "a"); },
	      day: function(c) { return "dag" + ((c !== 1) ? "ar" : ""); },
	      hour: function(c) { return "timm" + ((c !== 1) ? "ar" : "e"); },
	      minute: function(c) { return "minut" + ((c !== 1) ? "er" : ""); },
	      second: function(c) { return "sekund" + ((c !== 1) ? "er" : ""); },
	      millisecond: function(c) { return "millisekund" + ((c !== 1) ? "er" : ""); }
	    },
	    tr: {
	      year: "yıl",
	      month: "ay",
	      week: "hafta",
	      day: "gün",
	      hour: "saat",
	      minute: "dakika",
	      second: "saniye",
	      millisecond: "milisaniye"
	    },
	    "zh-CN": {
	      year: "年",
	      month: "个月",
	      week: "周",
	      day: "天",
	      hour: "小时",
	      minute: "分钟",
	      second: "秒",
	      millisecond: "毫秒"
	    },
	    "zh-TW": {
	      year: "年",
	      month: "個月",
	      week: "周",
	      day: "天",
	      hour: "小時",
	      minute: "分鐘",
	      second: "秒",
	      millisecond: "毫秒"
	    }
	  };

	  // You can create a humanizer, which returns a function with defaults
	  // parameters.
	  function humanizer(passedOptions) {

	    var result = function humanizer(ms, humanizerOptions) {
	      var options = extend({}, result, humanizerOptions || {});
	      return doHumanization(ms, options);
	    };

	    return extend(result, {
	      language: "en",
	      delimiter: ", ",
	      spacer: " ",
	      units: ["year", "month", "week", "day", "hour", "minute", "second"],
	      languages: {},
	      halfUnit: true,
	      round: false
	    }, passedOptions);

	  }

	  // The main function is just a wrapper around a default humanizer.
	  var defaultHumanizer = humanizer({});
	  function humanizeDuration() {
	    return defaultHumanizer.apply(defaultHumanizer, arguments);
	  }

	  // doHumanization does the bulk of the work.
	  function doHumanization(ms, options) {

	    // Make sure we have a positive number.
	    // Has the nice sideffect of turning Number objects into primitives.
	    ms = Math.abs(ms);

	    if (ms === 0) {
	      return "0";
	    }

	    var dictionary = options.languages[options.language] || languages[options.language];
	    if (!dictionary) {
	      throw new Error("No language " + dictionary + ".");
	    }

	    var result = [];

	    // Start at the top and keep removing units, bit by bit.
	    var unitName, unitMS, unitCount, mightBeHalfUnit;
	    for (var i = 0, len = options.units.length; i < len; i ++) {

	      unitName = options.units[i];
	      if (unitName[unitName.length - 1] === "s") { // strip plurals
	        unitName = unitName.substring(0, unitName.length - 1);
	      }
	      unitMS = UNITS[unitName];

	      // If it's a half-unit interval, we're done.
	      if (result.length === 0 && options.halfUnit) {
	        mightBeHalfUnit = (ms / unitMS) * 2;
	        if (mightBeHalfUnit === Math.floor(mightBeHalfUnit)) {
	          return render(mightBeHalfUnit / 2, unitName, dictionary, options.spacer);
	        }
	      }

	      // What's the number of full units we can fit?
	      if ((i + 1) === len) {
	        unitCount = ms / unitMS;
	        if (options.round) {
	          unitCount = Math.round(unitCount);
	        }
	      } else {
	        unitCount = Math.floor(ms / unitMS);
	      }

	      // Add the string.
	      if (unitCount) {
	        result.push(render(unitCount, unitName, dictionary, options.spacer));
	      }

	      // Remove what we just figured out.
	      ms -= unitCount * unitMS;

	    }

	    return result.join(options.delimiter);

	  }

	  function render(count, type, dictionary, spacer) {
	    var dictionaryValue = dictionary[type];
	    var word;
	    if (typeof dictionaryValue === "function") {
	      word = dictionaryValue(count);
	    } else {
	      word = dictionaryValue;
	    }
	    return count + spacer + word;
	  }

	  function extend(destination) {
	    var source;
	    for (var i = 1; i < arguments.length; i ++) {
	      source = arguments[i];
	      for (var prop in source) {
	        if (source.hasOwnProperty(prop)) {
	          destination[prop] = source[prop];
	        }
	      }
	    }
	    return destination;
	  }

	  // Internal helper function for Polish language.
	  function getPolishForm(c) {
	    if (c === 1) {
	      return 0;
	    } else if (Math.floor(c) !== c) {
	      return 1;
	    } else if (2 <= c % 10 && c % 10 <= 4 && !(10 < c % 100 && c % 100 < 20)) {
	      return 2;
	    } else {
	      return 3;
	    }
	  }

	  // Internal helper function for Russian language.
	  function getRussianForm(c) {
	    if (Math.floor(c) !== c) {
	      return 2;
	    } else if (c === 0 || (c >= 5 && c <= 20) || (c % 10 >= 5 && c % 10 <= 9) || (c % 10 === 0)) {
	      return 0;
	    } else if (c === 1 || c % 10 === 1) {
	      return 1;
	    } else if (c > 1) {
	      return 2;
	    } else {
	      return 0;
	    }
	  }

	  function getSupportedLanguages() {
	    var result = [];
	    for (var language in languages) {
	      if (languages.hasOwnProperty(language)) {
	        result.push(language);
	      }
	    }
	    return result;
	  }

	  humanizeDuration.humanizer = humanizer;
	  humanizeDuration.getSupportedLanguages = getSupportedLanguages;

	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return humanizeDuration;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof module !== "undefined" && module.exports) {
	    module.exports = humanizeDuration;
	  } else {
	    this.humanizeDuration = humanizeDuration;
	  }

	})();


/***/ }),

/***/ 101:
/***/ (function(module, exports) {

	/**
	 * angular-timer - v1.3.3 - 2015-06-15 3:07 PM
	 * https://github.com/siddii/angular-timer
	 *
	 * Copyright (c) 2015 Siddique Hameed
	 * Licensed MIT <https://github.com/siddii/angular-timer/blob/master/LICENSE.txt>
	 */
	var timerModule = angular.module('timer', [])
	  .directive('timer', ['$compile', function ($compile) {
	    return  {
	      restrict: 'EA',
	      replace: false,
	      scope: {
	        interval: '=interval',
	        startTimeAttr: '=startTime',
	        endTimeAttr: '=endTime',
	        countdownattr: '=countdown',
	        finishCallback: '&finishCallback',
	        autoStart: '&autoStart',
	        language: '@?',
	        fallback: '@?',
	        maxTimeUnit: '='
	      },
	      controller: ['$scope', '$element', '$attrs', '$timeout', 'I18nService', '$interpolate', 'progressBarService', function ($scope, $element, $attrs, $timeout, I18nService, $interpolate, progressBarService) {

	        // Checking for trim function since IE8 doesn't have it
	        // If not a function, create tirm with RegEx to mimic native trim
	        if (typeof String.prototype.trim !== 'function') {
	          String.prototype.trim = function () {
	            return this.replace(/^\s+|\s+$/g, '');
	          };
	        }

	        //angular 1.2 doesn't support attributes ending in "-start", so we're
	        //supporting both "autostart" and "auto-start" as a solution for
	        //backward and forward compatibility.
	        $scope.autoStart = $attrs.autoStart || $attrs.autostart;


	        $scope.language = $scope.language || 'en';
	        $scope.fallback = $scope.fallback || 'en';

	        //allow to change the language of the directive while already launched
	        $scope.$watch('language', function(newVal, oldVal) {
	          if(newVal !== undefined) {
	            i18nService.init(newVal, $scope.fallback);
	          }
	        });

	        //init momentJS i18n, default english
	        var i18nService = new I18nService();
	        i18nService.init($scope.language, $scope.fallback);

	        //progress bar
	        $scope.displayProgressBar = 0;
	        $scope.displayProgressActive = 'active'; //Bootstrap active effect for progress bar

	        if ($element.html().trim().length === 0) {
	          $element.append($compile('<span>' + $interpolate.startSymbol() + 'millis' + $interpolate.endSymbol() + '</span>')($scope));
	        } else {
	          $element.append($compile($element.contents())($scope));
	        }

	        $scope.startTime = null;
	        $scope.endTime = null;
	        $scope.timeoutId = null;
	        $scope.countdown = $scope.countdownattr && parseInt($scope.countdownattr, 10) >= 0 ? parseInt($scope.countdownattr, 10) : undefined;
	        $scope.isRunning = false;

	        $scope.$on('timer-start', function () {
	          $scope.start();
	        });

	        $scope.$on('timer-resume', function () {
	          $scope.resume();
	        });

	        $scope.$on('timer-stop', function () {
	          $scope.stop();
	        });

	        $scope.$on('timer-clear', function () {
	          $scope.clear();
	        });

	        $scope.$on('timer-reset', function () {
	          $scope.reset();
	        });

	        $scope.$on('timer-set-countdown', function (e, countdown) {
	          $scope.countdown = countdown;
	        });

	        function resetTimeout() {
	          if ($scope.timeoutId) {
	            clearTimeout($scope.timeoutId);
	          }
	        }

	        $scope.$watch('startTimeAttr', function(newValue, oldValue) {
	          if (newValue !== oldValue && $scope.isRunning) {
	            $scope.start();
	          }
	        });

	        $scope.$watch('endTimeAttr', function(newValue, oldValue) {
	          if (newValue !== oldValue && $scope.isRunning) {
	            $scope.start();
	          }
	        });

	        $scope.start = $element[0].start = function () {
	          $scope.startTime = $scope.startTimeAttr ? moment($scope.startTimeAttr) : moment();
	          $scope.endTime = $scope.endTimeAttr ? moment($scope.endTimeAttr) : null;
	          if (!$scope.countdown) {
	            $scope.countdown = $scope.countdownattr && parseInt($scope.countdownattr, 10) > 0 ? parseInt($scope.countdownattr, 10) : undefined;
	          }
	          resetTimeout();
	          tick();
	          $scope.isRunning = true;
	        };

	        $scope.resume = $element[0].resume = function () {
	          resetTimeout();
	          if ($scope.countdownattr) {
	            $scope.countdown += 1;
	          }
	          $scope.startTime = moment().diff((moment($scope.stoppedTime).diff(moment($scope.startTime))));
	          tick();
	          $scope.isRunning = true;
	        };

	        $scope.stop = $scope.pause = $element[0].stop = $element[0].pause = function () {
	          var timeoutId = $scope.timeoutId;
	          $scope.clear();
	          $scope.$emit('timer-stopped', {timeoutId: timeoutId, millis: $scope.millis, seconds: $scope.seconds, minutes: $scope.minutes, hours: $scope.hours, days: $scope.days});
	        };

	        $scope.clear = $element[0].clear = function () {
	          // same as stop but without the event being triggered
	          $scope.stoppedTime = moment();
	          resetTimeout();
	          $scope.timeoutId = null;
	          $scope.isRunning = false;
	        };

	        $scope.reset = $element[0].reset = function () {
	          $scope.startTime = $scope.startTimeAttr ? moment($scope.startTimeAttr) : moment();
	          $scope.endTime = $scope.endTimeAttr ? moment($scope.endTimeAttr) : null;
	          $scope.countdown = $scope.countdownattr && parseInt($scope.countdownattr, 10) > 0 ? parseInt($scope.countdownattr, 10) : undefined;
	          resetTimeout();
	          tick();
	          $scope.isRunning = false;
	          $scope.clear();
	        };

	        $element.bind('$destroy', function () {
	          resetTimeout();
	          $scope.isRunning = false;
	        });


	        function calculateTimeUnits() {
	          var timeUnits = {}; //will contains time with units

	          if ($attrs.startTime !== undefined){
	            $scope.millis = moment().diff(moment($scope.startTimeAttr));
	          }

	          timeUnits = i18nService.getTimeUnits($scope.millis);

	          // compute time values based on maxTimeUnit specification
	          if (!$scope.maxTimeUnit || $scope.maxTimeUnit === 'day') {
	            $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
	            $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
	            $scope.hours = Math.floor((($scope.millis / (3600000)) % 24));
	            $scope.days = Math.floor((($scope.millis / (3600000)) / 24));
	            $scope.months = 0;
	            $scope.years = 0;
	          } else if ($scope.maxTimeUnit === 'second') {
	            $scope.seconds = Math.floor($scope.millis / 1000);
	            $scope.minutes = 0;
	            $scope.hours = 0;
	            $scope.days = 0;
	            $scope.months = 0;
	            $scope.years = 0;
	          } else if ($scope.maxTimeUnit === 'minute') {
	            $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
	            $scope.minutes = Math.floor($scope.millis / 60000);
	            $scope.hours = 0;
	            $scope.days = 0;
	            $scope.months = 0;
	            $scope.years = 0;
	          } else if ($scope.maxTimeUnit === 'hour') {
	            $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
	            $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
	            $scope.hours = Math.floor($scope.millis / 3600000);
	            $scope.days = 0;
	            $scope.months = 0;
	            $scope.years = 0;
	          } else if ($scope.maxTimeUnit === 'month') {
	            $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
	            $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
	            $scope.hours = Math.floor((($scope.millis / (3600000)) % 24));
	            $scope.days = Math.floor((($scope.millis / (3600000)) / 24) % 30);
	            $scope.months = Math.floor((($scope.millis / (3600000)) / 24) / 30);
	            $scope.years = 0;
	          } else if ($scope.maxTimeUnit === 'year') {
	            $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
	            $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
	            $scope.hours = Math.floor((($scope.millis / (3600000)) % 24));
	            $scope.days = Math.floor((($scope.millis / (3600000)) / 24) % 30);
	            $scope.months = Math.floor((($scope.millis / (3600000)) / 24 / 30) % 12);
	            $scope.years = Math.floor(($scope.millis / (3600000)) / 24 / 365);
	          }
	          // plural - singular unit decision (old syntax, for backwards compatibility and English only, could be deprecated!)
	          $scope.secondsS = ($scope.seconds === 1) ? '' : 's';
	          $scope.minutesS = ($scope.minutes === 1) ? '' : 's';
	          $scope.hoursS = ($scope.hours === 1) ? '' : 's';
	          $scope.daysS = ($scope.days === 1)? '' : 's';
	          $scope.monthsS = ($scope.months === 1)? '' : 's';
	          $scope.yearsS = ($scope.years === 1)? '' : 's';


	          // new plural-singular unit decision functions (for custom units and multilingual support)
	          $scope.secondUnit = timeUnits.seconds;
	          $scope.minuteUnit = timeUnits.minutes;
	          $scope.hourUnit = timeUnits.hours;
	          $scope.dayUnit = timeUnits.days;
	          $scope.monthUnit = timeUnits.months;
	          $scope.yearUnit = timeUnits.years;

	          //add leading zero if number is smaller than 10
	          $scope.sseconds = $scope.seconds < 10 ? '0' + $scope.seconds : $scope.seconds;
	          $scope.mminutes = $scope.minutes < 10 ? '0' + $scope.minutes : $scope.minutes;
	          $scope.hhours = $scope.hours < 10 ? '0' + $scope.hours : $scope.hours;
	          $scope.ddays = $scope.days < 10 ? '0' + $scope.days : $scope.days;
	          $scope.mmonths = $scope.months < 10 ? '0' + $scope.months : $scope.months;
	          $scope.yyears = $scope.years < 10 ? '0' + $scope.years : $scope.years;

	        }

	        //determine initial values of time units and add AddSeconds functionality
	        if ($scope.countdownattr) {
	          $scope.millis = $scope.countdownattr * 1000;

	          $scope.addCDSeconds = $element[0].addCDSeconds = function (extraSeconds) {
	            $scope.countdown += extraSeconds;
	            $scope.$digest();
	            if (!$scope.isRunning) {
	              $scope.start();
	            }
	          };

	          $scope.$on('timer-add-cd-seconds', function (e, extraSeconds) {
	            $timeout(function () {
	              $scope.addCDSeconds(extraSeconds);
	            });
	          });

	          $scope.$on('timer-set-countdown-seconds', function (e, countdownSeconds) {
	            if (!$scope.isRunning) {
	              $scope.clear();
	            }

	            $scope.countdown = countdownSeconds;
	            $scope.millis = countdownSeconds * 1000;
	            calculateTimeUnits();
	          });
	        } else {
	          $scope.millis = 0;
	        }
	        calculateTimeUnits();

	        var tick = function tick() {
	          var typeTimer = null; // countdown or endTimeAttr
	          $scope.millis = moment().diff($scope.startTime);
	          var adjustment = $scope.millis % 1000;

	          if ($scope.endTimeAttr) {
	            typeTimer = $scope.endTimeAttr;
	            $scope.millis = moment($scope.endTime).diff(moment());
	            adjustment = $scope.interval - $scope.millis % 1000;
	          }

	          if ($scope.countdownattr) {
	            typeTimer = $scope.countdownattr;
	            $scope.millis = $scope.countdown * 1000;
	          }

	          if ($scope.millis < 0) {
	            $scope.stop();
	            $scope.millis = 0;
	            calculateTimeUnits();
	            if($scope.finishCallback) {
	              $scope.$eval($scope.finishCallback);
	            }
	            return;
	          }
	          calculateTimeUnits();

	          //We are not using $timeout for a reason. Please read here - https://github.com/siddii/angular-timer/pull/5
	          $scope.timeoutId = setTimeout(function () {
	            tick();
	            $scope.$digest();
	          }, $scope.interval - adjustment);

	          $scope.$emit('timer-tick', {timeoutId: $scope.timeoutId, millis: $scope.millis});

	          if ($scope.countdown > 0) {
	            $scope.countdown--;
	          }
	          else if ($scope.countdown <= 0) {
	            $scope.stop();
	            if($scope.finishCallback) {
	              $scope.$eval($scope.finishCallback);
	            }
	          }

	          if(typeTimer !== null){
	            //calculate progress bar
	            $scope.progressBar = progressBarService.calculateProgressBar($scope.startTime, $scope.millis, $scope.endTime, $scope.countdownattr);

	            if($scope.progressBar === 100){
	              $scope.displayProgressActive = ''; //No more Bootstrap active effect
	            }
	          }
	        };

	        if ($scope.autoStart === undefined || $scope.autoStart === true) {
	          $scope.start();
	        }
	      }]
	    };
	    }]);

	/* commonjs package manager support (eg componentjs) */
	if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
	  module.exports = timerModule;
	}

	var apps = angular.module('timer');

	apps.factory('I18nService', function() {

	    var I18nService = function() {};

	    I18nService.prototype.language = 'en';
	    I18nService.prototype.fallback = 'en';
	    I18nService.prototype.timeHumanizer = {};

	    I18nService.prototype.init = function init(lang, fallback) {
	        var supported_languages = humanizeDuration.getSupportedLanguages();

	        this.fallback = (fallback !== undefined) ? fallback : 'en';
	        if (supported_languages.indexOf(fallback) === -1) {
	            this.fallback = 'en';
	        }

	        this.language = lang;
	        if (supported_languages.indexOf(lang) === -1) {
	            this.language = this.fallback;
	        }

	        //moment init
	        moment.locale(this.language); //@TODO maybe to remove, it should be handle by the user's application itself, and not inside the directive

	        //human duration init, using it because momentjs does not allow accurate time (
	        // momentJS: a few moment ago, human duration : 4 seconds ago
	        this.timeHumanizer = humanizeDuration.humanizer({
	            language: this.language,
	            halfUnit:false
	        });
	    };

	    /**
	     * get time with units from momentJS i18n
	     * @param {int} millis
	     * @returns {{millis: string, seconds: string, minutes: string, hours: string, days: string, months: string, years: string}}
	     */
	    I18nService.prototype.getTimeUnits = function getTimeUnits(millis) {
	        var diffFromAlarm = Math.round(millis/1000) * 1000; //time in milliseconds, get rid of the last 3 ms value to avoid 2.12 seconds display

	        var time = {};

	        if (typeof this.timeHumanizer != 'undefined'){
	            time = {
	                'millis' : this.timeHumanizer(diffFromAlarm, { units: ["milliseconds"] }),
	                'seconds' : this.timeHumanizer(diffFromAlarm, { units: ["seconds"] }),
	                'minutes' : this.timeHumanizer(diffFromAlarm, { units: ["minutes", "seconds"] }) ,
	                'hours' : this.timeHumanizer(diffFromAlarm, { units: ["hours", "minutes", "seconds"] }) ,
	                'days' : this.timeHumanizer(diffFromAlarm, { units: ["days", "hours", "minutes", "seconds"] }) ,
	                'months' : this.timeHumanizer(diffFromAlarm, { units: ["months", "days", "hours", "minutes", "seconds"] }) ,
	                'years' : this.timeHumanizer(diffFromAlarm, { units: ["years", "months", "days", "hours", "minutes", "seconds"] })
	            };
	        }
	        else {
	            console.error('i18nService has not been initialized. You must call i18nService.init("en") for example');
	        }

	        return time;
	    };

	    return I18nService;
	});

	var apps = angular.module('timer');

	apps.factory('progressBarService', function() {

	  var ProgressBarService = function() {};

	  /**
	   * calculate the remaining time in a progress bar in percentage
	   * @param {momentjs} startValue in seconds
	   * @param {integer} currentCountdown, where are we in the countdown
	   * @param {integer} remainingTime, remaining milliseconds
	   * @param {integer} endTime, end time, can be undefined
	   * @param {integer} coutdown, original coutdown value, can be undefined
	   *
	   * joke : https://www.youtube.com/watch?v=gENVB6tjq_M
	   * @return {float} 0 --> 100
	   */
	  ProgressBarService.prototype.calculateProgressBar = function calculateProgressBar(startValue, remainingTime, endTimeAttr, coutdown) {
	    var displayProgressBar = 0,
	      endTimeValue,
	      initialCountdown;

	    remainingTime = remainingTime / 1000; //seconds


	    if(endTimeAttr !== null){
	      endTimeValue = moment(endTimeAttr);
	      initialCountdown = endTimeValue.diff(startValue, 'seconds');
	      displayProgressBar = remainingTime * 100 / initialCountdown;
	    }
	    else {
	      displayProgressBar = remainingTime * 100 / coutdown;
	    }

	    displayProgressBar = 100 - displayProgressBar; //To have 0 to 100 and not 100 to 0
	    displayProgressBar = Math.round(displayProgressBar * 10) / 10; //learn more why : http://stackoverflow.com/questions/588004/is-floating-point-math-broken

	    if(displayProgressBar > 100){ //security
	      displayProgressBar = 100;
	    }

	    return displayProgressBar;
	  };

	  return new ProgressBarService();
	});


/***/ })

});