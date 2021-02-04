/*!
 * jquery.drawPieChart.js
 * Version: 0.3(Beta)
 * Inspired by Chart.js(http://www.chartjs.org/)
 *
 * Copyright 2013 hiro
 * https://github.com/githiro/drawPieChart
 * Released under the MIT license.
 * 
 */
// ;(function($, undefined) {
  $.fn.drawPieChart = function(data, options) {
    $this = this;
    var $this = this,
      W = $this.width(),
      H = $this.height(),
      centerX = W/2,
      centerY = H/2,
      cos = Math.cos,
      sin = Math.sin,
      PI = Math.PI,
      settings = $.extend({
        segmentShowStroke : true,
        segmentStrokeColor : "#fff",
        segmentStrokeWidth : 0,
        baseColor: "#fff",
        baseOffset: 13,
        edgeOffset: 20,//offset from edge of $this
        pieSegmentGroupClass: "pieSegmentGroup",
        pieSegmentClass: "pieSegment",
        lightPiesOffset: 12,//lighten pie's width
        lightPiesOpacity: 0,//lighten pie's default opacity
        lightPieClass: "lightPie",
        animation : true,
        animationSteps : 90,
        animationEasing : "easeInOutExpo",
        tipOffsetX: -15,
        tipOffsetY: -45,
        tipClass: "pieTip",
        beforeDraw: function(){  },
        afterDrawed : function(){  },
        onPieMouseenter : function(e,data){  },
        onPieMouseleave : function(e,data){  },
        onPieClick : function(e,data){  }
      }, options),
      animationOptions = {
        linear : function (t){
          return t;
        },
        easeInOutExpo: function (t) {
          var v = t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t;
          return (v>1) ? 1 : v;
        }
      },
      requestAnimFrame = function(){
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback) {
            window.setTimeout(callback, 1000 / 60);
          };
      }();

    var $wrapper = $('<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>').appendTo($this);
    var $groups = [],
        $pies = [],
        $lightPies = [],
        $shadowPies = [],        
        $percents = [],        
        easingFunction = animationOptions[settings.animationEasing],
        pieRadius = Min([H/2,W/2]) - settings.edgeOffset,
        segmentTotal = 0,
        cachedDatas = {};

    settings.beforeDraw.call($this);
    //Draw base circle
    var drawBasePie = function(){
      var base = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      var $base = $(base).appendTo($wrapper);
      base.setAttribute("cx", centerX);
      base.setAttribute("cy", centerY);
      base.setAttribute("r", pieRadius+settings.baseOffset);
      base.setAttribute("fill", settings.baseColor);
    }();

    //Set up pie segments wrapper
    var pathGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    var $pathGroup = $(pathGroup).appendTo($wrapper);
    $pathGroup[0].setAttribute("opacity",0);

    //Set up tooltip
    var $tip = $('<div class="' + settings.tipClass + '" />').appendTo('body').hide(),
      tipW = $tip.width(),
      tipH = $tip.height();
      var shadow = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
      shadow.setAttribute('id', 'boxshadow');
      shadow.setAttribute('x', '-40%');
      shadow.setAttribute('y', '-40%');
      shadow.setAttribute('height', '200%');
      shadow.setAttribute('width', '200%');
      shadow.setAttribute('opacity', '0.25');

      var feOffset = document.createElementNS('http://www.w3.org/2000/svg', 'feOffset');
      feOffset.setAttribute('result', 'offOut');
      feOffset.setAttribute('in', 'SourceAlpha');
      feOffset.setAttribute('dx', '2');
      feOffset.setAttribute('dy', '4');
      $(feOffset).appendTo(shadow);

      var feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
      feGaussianBlur.setAttribute('result', 'blurOut');
      feGaussianBlur.setAttribute('in', 'offOut');
      feGaussianBlur.setAttribute('stdDeviation', '5');
      $(feGaussianBlur).appendTo(shadow);

      var feBlend = document.createElementNS('http://www.w3.org/2000/svg', 'feBlend');
      feBlend.setAttribute('in', 'SourceGraphic');
      feBlend.setAttribute('in2', 'blurOut');
      feBlend.setAttribute('mode', 'normal');
      $(feBlend).appendTo(shadow);


      var feComponentTransfer = document.createElementNS('http://www.w3.org/2000/svg', 'feComponentTransfer');
      var feFuncA = document.createElementNS('http://www.w3.org/2000/svg', 'feFuncA');
      feFuncA.setAttribute('type', 'linear');
      feFuncA.setAttribute('slope', '0.25');
      $(feFuncA).appendTo(feComponentTransfer);
      $(feComponentTransfer).appendTo(shadow);
      
      $(shadow).appendTo($wrapper);

      var rounded = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
      rounded.setAttribute('id', 'goo');

      var rfeGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
      rfeGaussianBlur.setAttribute('in', 'SourceGraphic');
      rfeGaussianBlur.setAttribute('stdDeviation', '3');
      rfeGaussianBlur.setAttribute('result', 'blur');

      $(rfeGaussianBlur).appendTo(rounded);


      var feColorMatrix = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
      feColorMatrix.setAttribute('in', 'blur');
      feColorMatrix.setAttribute('mode', 'matrix');
      feColorMatrix.setAttribute('values', '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7');
      feColorMatrix.setAttribute('result', 'goo');
      $(feColorMatrix).appendTo(rounded);
      $(rounded).appendTo($wrapper);

    for (var i = 0, len = data.length; i < len; i++){
      segmentTotal += parseInt(data[i].value);
      var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute("data-order", i);
      g.setAttribute("class", settings.pieSegmentGroupClass);
      var g2 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g2.setAttribute("data-order", i);
      g2.setAttribute("class", 'textSegment');
      $groups[i] = $(g).appendTo($pathGroup);
      $groups[i]
        .on("mouseenter", pathMouseEnter)
        .on("mouseleave", pathMouseLeave)
        .on("mousemove", pathMouseMove);
        // .on("click", pathClick);

      var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      var lp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      var shadowp = document.createElementNS('http://www.w3.org/2000/svg', 'path');

      settings.segmentStrokeWidth = 0;
      p.setAttribute("data-value", data[i].value);
      p.setAttribute("stroke-width", settings.segmentStrokeWidth);
      p.setAttribute("stroke", settings.segmentStrokeColor);
      p.setAttribute("stroke-miterlimit", 2);
      p.setAttribute("fill", data[i].color);
      p.setAttribute("class", settings.pieSegmentClass);
      $pies[i] = $(p).appendTo($groups[i]);

      lp.setAttribute("stroke-width", settings.segmentStrokeWidth);
      lp.setAttribute("stroke", settings.segmentStrokeColor);
      lp.setAttribute("stroke-miterlimit", 0);
      lp.setAttribute("fill", data[i].color);
      lp.setAttribute("opacity", settings.lightPiesOpacity);
      lp.setAttribute("class", settings.lightPieClass);
      $lightPies[i] = $(lp).appendTo($groups[i]);

      shadowp.setAttribute("stroke-width", settings.segmentStrokeWidth);
      shadowp.setAttribute("stroke", settings.segmentStrokeColor);
      shadowp.setAttribute("stroke-miterlimit", 0);
      shadowp.setAttribute("fill", data[i].color);
      shadowp.setAttribute("opacity", settings.lightPiesOpacity);
      shadowp.setAttribute("class", "shadowPie");
      $shadowPies[i] = $(shadowp).appendTo($groups[i]);

    }
    
    for (var i = 0, len = data.length; i < len; i++){
      $percents[i] = Math.round(data[i].value*(100/segmentTotal));
    }
    //Animation start
    triggerAnimation();

    function pathMouseEnter(e){
      var index = $(this).data().order;
      let tipText = 
      '<div class="tip-cont">'
      +'    <div class="label">'+ data[index].title +'</div>'
      +'    <div class="value">' + $percents[index] +'% / ' + data[index].value +'шт</div>'
      +'</div>';
      $tip.html(tipText);
      $tip.show();
      if ($groups[index][0].getAttribute("data-active") !== "active"){
        $lightPies[index].animate({opacity: 1}, 180);
        $shadowPies[index].animate({opacity: 1}, 180);
      }
      settings.onPieMouseenter.apply($(this),[e,data]);
    }
    function pathMouseLeave(e){
      var index = $(this).data().order;
      $tip.hide();
      if ($groups[index][0].getAttribute("data-active") !== "active"){
        $lightPies[index].animate({opacity: settings.lightPiesOpacity}, 100);
        $shadowPies[index].animate({opacity: settings.lightPiesOpacity}, 100);
      }
      settings.onPieMouseleave.apply($(this),[e,data]);
    }
    function pathMouseMove(e){
      $tip.css({
        top: e.pageY + settings.tipOffsetY,
        left: e.pageX - $tip.width() / 2 + settings.tipOffsetX
      });
    }
    function drawPieSegments (animationDecimal){
      var startRadius = -PI/2,//-90 degree
          rotateAnimation = 1;
      if (settings.animation) {
        rotateAnimation = animationDecimal;//count up between0~1
      }
      $pathGroup[0].setAttribute("opacity",animationDecimal);
      //draw each path
      let pieRadiusChange = pieRadius;
      for (var i = 0, len = data.length; i < len; i++){
        pieRadiusChange = pieRadius - pieRadius*0.05*i;
        var segmentAngle = rotateAnimation * ((data[i].value/segmentTotal) * (PI*2)),//start radian
        endRadius = startRadius + segmentAngle,
        largeArc = ((endRadius - startRadius) % (PI * 2)) > PI ? 1 : 0;
        var startX = centerX + cos(startRadius) * pieRadiusChange;
        var startY = centerY + sin(startRadius) * pieRadiusChange;
        var endX = centerX + cos(endRadius) * pieRadiusChange;
        var endY = centerY + sin(endRadius) * pieRadiusChange;
        var startX2 = centerX + cos(startRadius) * (pieRadiusChange + settings.lightPiesOffset),
        startY2 = centerY + sin(startRadius) * (pieRadiusChange + settings.lightPiesOffset),
        endX2 = centerX + cos(endRadius) * (pieRadiusChange + settings.lightPiesOffset),
        endY2 = centerY + sin(endRadius) * (pieRadiusChange + settings.lightPiesOffset);
        var mincxneterX = 0; 
        var mincxneterY = 0;     
        var cmd = [
          'M', startX, startY,//Move pointer
          'A', pieRadiusChange, pieRadiusChange , 0, largeArc, 1, endX, endY,//Draw outer arc path
          'L', centerX + mincxneterX , centerY + mincxneterY,//Draw line to the center.
          'Z'//Cloth path
        ];
        var cmd2 = [
          'M', startX2, startY2,
          'A', pieRadiusChange + settings.lightPiesOffset, pieRadiusChange + settings.lightPiesOffset, 0, largeArc, 1, endX2, endY2,//Draw outer arc path
          'L', centerX + mincxneterX , centerY + mincxneterY,//Draw line to the center.
          'Z'
        ];
        
        $pies[i][0].setAttribute("d",cmd.join(' '));
        $lightPies[i][0].setAttribute("d", cmd2.join(' '));
        $shadowPies[i][0].setAttribute("d", cmd2.join(' '));
        startRadius += segmentAngle;
      }
    }

    var animFrameAmount = (settings.animation)? 1/settings.animationSteps : 1,//if settings.animationSteps is 10, animFrameAmount is 0.1
        animCount =(settings.animation)? 0 : 1;
    function triggerAnimation(){
      if (settings.animation) {
        requestAnimFrame(animationLoop);
      } else {
        drawPieSegments(1);
      }
    }
    function animationLoop(){
      animCount += animFrameAmount;//animCount start from 0, after "settings.animationSteps"-times executed, animCount reaches 1.
      drawPieSegments(easingFunction(animCount));
      if (animCount < 1){
        requestAnimFrame(arguments.callee);
      } else {
        settings.afterDrawed.call($this);
      }
    }
    function Max(arr){
      return Math.max.apply(null, arr);
    }
    function Min(arr){
      return Math.min.apply(null, arr);
    }
    return $this;
  };
// })(jQuery);
