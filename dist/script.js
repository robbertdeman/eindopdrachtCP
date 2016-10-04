!function t(e,i,n){function o(s,h){if(!i[s]){if(!e[s]){var a="function"==typeof require&&require;if(!h&&a)return a(s,!0);if(r)return r(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var c=i[s]={exports:{}};e[s][0].call(c.exports,function(t){var i=e[s][1][t];return o(i?i:t)},c,c.exports,t,e,i,n)}return i[s].exports}for(var r="function"==typeof require&&require,s=0;s<n.length;s++)o(n[s]);return o}({1:[function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),r=function(){function t(){n(this,t),this.c=document.getElementById("myCanvas"),this.ctx=this.c.getContext("2d")}return o(t,[{key:"clear",value:function(){this.ctx.clearRect(0,0,this.c.width,this.c.height)}},{key:"draw",value:function(t){this.ctx.fillStyle=t.color,this.ctx.fillRect(t.x,t.y,t.width,t.height)}}]),t}();e.exports=r},{}],2:[function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),r=function(){function t(){var e=this;n(this,t),this.left=!1,this.right=!1,this.up=!1,this.down=!1,this.space=!1,document.addEventListener("keydown",function(t){39==t.keyCode?e.right=!0:37==t.keyCode?e.left=!0:38==t.keyCode?e.up=!0:40==t.keyCode?e.down=!0:32==t.keyCode&&(e.space=!0)}),document.addEventListener("keyup",function(t){39==t.keyCode?e.right=!1:37==t.keyCode?e.left=!1:38==t.keyCode?e.up=!1:40==t.keyCode?e.down=!1:32==t.keyCode&&(e.space=!1)})}return o(t,[{key:"key",get:function(){return{left:this.left,right:this.right,up:this.up,down:this.down,space:this.space}}}]),t}();e.exports=r},{}],3:[function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),r=function(){function t(){n(this,t),this.width=10,this.height=10,this.x=300*Math.random()-1,this.y=0,this.xSpeed=.2,this.ySpeed=4,this.isDead=!1,this.color="rgba(23,44,56,1)"}return o(t,[{key:"move",value:function(){this.y+=this.ySpeed,this.x+=this.xSpeed}},{key:"die",value:function(){this.y>=500&&(this.isDead=!0)}},{key:"posPart",get:function(){return{width:this.width,height:this.height,x:this.x,y:this.y,color:this.color}}}]),t}();e.exports=r},{}],4:[function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),r=function(){function t(){n(this,t),this.width=20,this.height=20,this.xPos=165,this.yPos=449,this.life=5,this.color="rgba(67,234,12,1)"}return o(t,[{key:"mov",value:function(t){t.left&&!t.right&&(this.xPos-=10),t.right&&!t.left&&(this.xPos+=10),t.up&&!t.down&&(this.yPos-=10),t.down&&!t.up&&(this.yPos+=10),this.outline(),this.hit()}},{key:"outline",value:function(){this.xPos<=-10&&(this.xPos=this.xPos+10),this.yPos<=-10&&(this.yPos=this.yPos+10),this.xPos>=340&&(this.xPos=this.xPos-10),this.yPos>=481&&(this.yPos=this.yPos-10)}},{key:"hit",value:function(t){var e=this;if(t)return t.x+t.width>=this.xPos&&t.x<=this.xPos+this.width&&t.y>=this.yPos&&t.y<=this.yPos+this.height&&(this.life=this.life-1,this.color="rgba(255,0,0,1)",setTimeout(function(){e.color="rgba(0,254,0,1)"},100),console.log(this.life),!0)}},{key:"posMod",get:function(){return{width:this.width,height:this.height,x:this.xPos,y:this.yPos,color:this.color}}}]),t}();e.exports=r},{}],5:[function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),r=t("./module.es6"),s=t("./KeyView.es6"),h=t("./CanvasView.es6"),a=t("./Particle.es6"),u=function(){function t(){n(this,t),this.mod=new r,this.key=new s,this.canvas=new h,this.part=[]}return o(t,[{key:"loop",value:function(){var t=this;this.canvas.clear(),this.part.length<=20&&this.part.push(new a),this.part.forEach(function(e){e.move(),e.die(),t.canvas.draw(e.posPart);var i=t.mod.hit(e.posPart);i&&(e.isDead=!0)}),this.part=this.part.filter(function(t){return 0==t.isDead}),this.mod.mov(this.key.key),this.canvas.draw(this.mod.posMod),window.requestAnimationFrame(function(){t.loop()})}}]),t}(),c=new u;c.loop()},{"./CanvasView.es6":1,"./KeyView.es6":2,"./Particle.es6":3,"./module.es6":4}]},{},[5]);
//# sourceMappingURL=script.js.map
