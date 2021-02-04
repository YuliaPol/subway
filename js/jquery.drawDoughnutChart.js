/*!
 * jquery.drawDoughnutChart.js
 * Version: 0.2(Beta)
 * Inspired by Chart.js(http://www.chartjs.org/)
 *
 * Copyright 2013 hiro
 * https://github.com/githiro/drawDoughnutChart
 * Released under the MIT license.
 * 
 */

// ;(function($, undefined) {
//   $(document).ready(function () {
    $.fn.drawDoughnutChart = function(data, options) {
      var $this = this;
      var width = $this.width();
      var height = $this.width();
      // if($( document ).width() > 900){
      //   height =  $this.width() + 50;
      // }
      var W = width,
        H = height,
        centerX = W/2,
        centerY = H/2,
        cos = Math.cos,
        sin = Math.sin,
        PI = Math.PI,
        settings = $.extend({
          segmentShowStroke : true,
          segmentStrokeColor : "#fff",
          segmentStrokeWidth : 0,
          baseColor: "rgba(255,255,255,0)",
          baseOffset: 0,
          edgeOffset : 10,//offset from edge of $this
          percentageInnerCutout : 75,
          animation : true,
          animationSteps : 90,
          animationEasing : "easeInOutExpo",
          animateRotate : true,
          tipOffsetX: -8,
          tipOffsetY: -45,
          tipClass: "doughnutTip",
          summaryClass: "doughnutSummary",
          summaryTitle: "TOTAL:",
          summaryTitleClass: "doughnutSummaryTitle",
          summaryNumberClass: "doughnutSummaryNumber",
          beforeDraw: function(){  },
          afterDrawed : function(){  },
          onPathEnter : function(e,data){  },
          onPathLeave : function(e,data){  }
        }, options),
        animationOptions = {
          linear : function (t){
            return t;
          },
          easeInOutExpo: function (t) {
            var v = t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t;
            return (v>1) ? 1 : v;
          }
        };
        //set height
      var requestAnimFrame = function(){
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback) {
            window.setTimeout(callback, 1000 / 60);
          };
      }();

      settings.beforeDraw.call($this);

      var $svg = $('<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>').appendTo($this),
        $paths = [],
        easingFunction = animationOptions[settings.animationEasing],
        doughnutRadius = Min([H/2,W/2]) - settings.edgeOffset,
        cutoutRadius = doughnutRadius * (settings.percentageInnerCutout/100),
        segmentTotal = 0;

        //add shadow
        var shadow = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        shadow.setAttribute('id', 'boxshadow');


        var feDropShadow = document.createElementNS('http://www.w3.org/2000/svg', 'feDropShadow');
        feDropShadow.setAttribute('dx', '0');
        feDropShadow.setAttribute('dy', '4');
        feDropShadow.setAttribute('stdDeviation', '4');
        feDropShadow.setAttribute('flood-color', 'black');
        feDropShadow.setAttribute('flood-opacity', '0.25');
        $(feDropShadow).appendTo(shadow);
        $(shadow).appendTo($svg);

      //Draw base doughnut
      var baseDoughnutRadius = doughnutRadius + settings.baseOffset,
        baseCutoutRadius = cutoutRadius - settings.baseOffset;
      var drawBaseDoughnut = function(){
        var svgBase = document.createElementNS('http://www.w3.org/2000/svg', 'path'),
          $svgBase = $(svgBase).appendTo($svg);
        //Calculate values for the path.
        //We needn't calculate startRadius, segmentAngle and endRadius, because base doughnut doesn't animate.
        var startRadius = -1.570,// -Math.PI/2
          segmentAngle = 6.2831,// 1 * ((99.9999/100) * (PI*2)),
          endRadius = 4.7131,// startRadius + segmentAngle
          startX = centerX + cos(startRadius) * baseDoughnutRadius,
          startY = centerY + sin(startRadius) * baseDoughnutRadius,
          endX2 = centerX + cos(startRadius) * baseCutoutRadius,
          endY2 = centerY + sin(startRadius) * baseCutoutRadius,
          endX = centerX + cos(endRadius) * baseDoughnutRadius,
          endY = centerY + sin(endRadius) * baseDoughnutRadius,
          startX2 = centerX + cos(endRadius) * baseCutoutRadius,
          startY2 = centerY + sin(endRadius) * baseCutoutRadius;
        var cmd = [
          'M', startX, startY,
          'A', baseDoughnutRadius, baseDoughnutRadius, 0, 1, 1, endX, endY,
          'L', startX2, startY2,
          'A', baseCutoutRadius, baseCutoutRadius, 0, 1, 0, endX2, endY2,//reverse
          'Z'
        ];
        $svgBase[0].setAttribute("d", cmd.join(' '));
        $svgBase[0].setAttribute("fill", settings.baseColor);
      }();

      //Set up pie segments wrapper
      var pathGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      var $pathGroup = $(pathGroup).appendTo($svg);
      $pathGroup[0].setAttribute("opacity",0);

      //Set up tooltip
      if($this.attr('data-tooltip') == 'expand'){
        var $tip = $('<div class="doughnutTipExpand" />').appendTo('body').hide(),
        tipW = $tip.width(),
        tipH = $tip.height();
      }
      else {
        var $tip = $('<div class="' + settings.tipClass + '" />').appendTo('body').hide(),
        tipW = $tip.width(),
        tipH = $tip.height();
      }

      //Set up center text area
      var summarySize = (cutoutRadius - (doughnutRadius - cutoutRadius)) * 2,
        // $summary = $('<div class="' + settings.summaryClass + '" />').appendTo($this)
        //             .css({ 
        //               width: summarySize + "px",
        //               height: summarySize + "px",
        //               "margin-left": -(summarySize / 2) + "px",
        //               "margin-top": -(summarySize / 2) + "px"
        //             });
        $summary = "";
      var $summaryTitle = $('<p class="' + settings.summaryTitleClass + '">' + settings.summaryTitle + '</p>').appendTo($summary);
      var $summaryNumber = $('<p class="' + settings.summaryNumberClass + '"></p>').appendTo($summary).css({opacity: 0});

      for (var i = 0, len = data.length; i < len; i++){
        if( data[i].value) {
          segmentTotal += data[i].value;
          var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          p.setAttribute("stroke-width", settings.segmentStrokeWidth);
          p.setAttribute("stroke", settings.segmentStrokeColor);
          p.setAttribute("fill", data[i].color);
          p.setAttribute("data-order", i);
          $paths[i] = $(p).appendTo($pathGroup);
          $paths[i]
            .on('mouseenter', pathMouseEnter)
            .on('mouseleave', pathMouseLeave)
            .on('mousemove', pathMouseMove);
            setTimeout(addHover( $paths[i]), 1000);
        }
      }

      function addHover(el){
        el.hover(pathHover, pathUnHover);
      }
      //percent for each value
      for (var i = 0, len = data.length; i < len; i++){
        if( data[i].value) {
          data[i].percent = Math.round((100/segmentTotal)*data[i].value);
        }
      }
      //Animation start
      animationLoop(drawPieSegments);
      function pathHover(e){
        if($(this).parents('svg').parent().attr('data-increase') && !$(this).hasClass('increase') ){
          var newD = $(this).attr('data-increase');
          var oldD = $(this).attr('d');
          $(this).attr('data-increase', oldD)
          $(this).attr('d', newD);
          $(this).addClass('increase');
        }
      }
      function pathUnHover(e){
        if($(this).parents('svg').parent().attr('data-increase') && $(this).hasClass('increase')){
          var newD = $(this).attr('data-increase');
          var oldD = $(this).attr('d');
          $(this).attr('data-increase', oldD)
          $(this).attr('d', newD);
          $(this).removeClass('increase');
        }
      }
      function pathMouseEnter(e){
        var order = $(this).data().order;
        if($this.attr('data-tooltip') == 'expand'){
          var str = 
          '<div class="tip-cont">'
          +'  <div class="label"> Оценка - ' + data[order].labelText + '</div>'
          +'  <div class="value">' + data[order].percent + '% / ' + data[order].progress + 'шт</div>'
          +'</div>';
          $tip.html(str);
          $tip.fadeIn(200);
        }
        else {
          $tip.text(data[order].percent + '%')
          .fadeIn(200);
        }
        settings.onPathEnter.apply($(this),[e,data]);
      }
      function pathMouseLeave(e){
        $tip.hide();
        settings.onPathLeave.apply($(this),[e,data]);
      }
      function pathMouseMove(e){
        if($this.attr('data-tooltip') == 'expand'){
          $tip.css({
            top: e.pageY - 50,
            left: e.pageX - $tip.width() / 2 + settings.tipOffsetX
          });
        }
        else {
          $tip.css({
            top: e.pageY + settings.tipOffsetY,
            left: e.pageX - $tip.width() / 2 + settings.tipOffsetX
          });
        }
      }
      function drawPieSegments (animationDecimal){
        var startRadius = -Math.PI/2,//-90 degree
          rotateAnimation = 1;
        if (settings.animation && settings.animateRotate) {
          rotateAnimation = animationDecimal;//count up between0~1
        }

        drawDoughnutText(animationDecimal,segmentTotal);

        $pathGroup[0].setAttribute("opacity",animationDecimal);

        for (var i = 0, len = data.length; i < len; i++){
          if(data[i].value){

            //path for each segment
            var segmentAngle = rotateAnimation * ((data[i].value/segmentTotal) * (PI*2)),
            endRadius = startRadius + segmentAngle,
            largeArc = ((endRadius - startRadius) % (PI * 2)) > PI ? 1 : 0,
            startX = centerX + cos(startRadius) * doughnutRadius,
            startY = centerY + sin(startRadius) * doughnutRadius,
            endX2 = centerX + cos(startRadius) * cutoutRadius,
            endY2 = centerY + sin(startRadius) * cutoutRadius,
            endX = centerX + cos(endRadius) * doughnutRadius,
            endY = centerY + sin(endRadius) * doughnutRadius,
            startX2 = centerX + cos(endRadius) * cutoutRadius,
            startY2 = centerY + sin(endRadius) * cutoutRadius;
          var cmd = [
            'M', startX, startY,//Move pointer
            'A', doughnutRadius, doughnutRadius, 0, largeArc, 1, endX, endY,//Draw outer arc path
            'L', startX2, startY2,//Draw line path(this line connects outer and innner arc paths)
            'A', cutoutRadius, cutoutRadius, 0, largeArc, 0, endX2, endY2,//Draw inner arc path
            'Z'//Cloth path
          ];
          $paths[i][0].setAttribute("d",cmd.join(' '));
 
          //increace path for each segment
          var cutoutRadius2 = cutoutRadius*0.9;
          var doughnutRadiusIncrease = doughnutRadius*1.1;
          var startRadiusIncrease = startRadius;
          var segmentAngle = rotateAnimation * ((data[i].value/segmentTotal) * (PI*2));
          var endRadiusIncrease = startRadiusIncrease + segmentAngle;
          largeArcIncrease = ((endRadiusIncrease - startRadius) % (PI * 2)) > PI ? 1 : 0,
          startXIncrease = centerX + cos(startRadiusIncrease) * doughnutRadiusIncrease,
          startYIncrease = centerY + sin(startRadiusIncrease) * doughnutRadiusIncrease,
          endX2Increase = centerX + cos(startRadiusIncrease) * cutoutRadius2,
          endY2Increase = centerY + sin(startRadiusIncrease) * cutoutRadius2,
          endXIncrease = centerX + cos(endRadiusIncrease) * doughnutRadiusIncrease,
          endYIncrease = centerY + sin(endRadiusIncrease) * doughnutRadiusIncrease,
          startX2Increase = centerX + cos(endRadiusIncrease) * cutoutRadius2,
          startY2Increase = centerY + sin(endRadiusIncrease) * cutoutRadius2;
          var cmd2 = [
            'M', startXIncrease, startYIncrease,//Move pointer
            'A', doughnutRadiusIncrease, doughnutRadiusIncrease, 0, largeArcIncrease, 1, endXIncrease, endYIncrease,//Draw outer arc path
            'L', startX2Increase, startY2Increase,//Draw line path(this line connects outer and innner arc paths)
            'A', cutoutRadius2, cutoutRadius2, 0, largeArcIncrease, 0, endX2Increase, endY2Increase,//Draw inner arc path
            'Z'//Cloth path
          ];

          $($paths[i][0]).attr("data-increase",cmd2.join(' '));
          startRadius += segmentAngle;
          }
        }
      }

      function drawDoughnutText(animationDecimal, segmentTotal){
        $summaryNumber
          .css({opacity: animationDecimal})
          .text((segmentTotal * animationDecimal).toFixed(1));
      }
      function animateFrame(cnt, drawData){
        var easeAdjustedAnimationPercent =(settings.animation)? CapValue(easingFunction(cnt),null,0) : 1;
        drawData(easeAdjustedAnimationPercent);
      }
      function animationLoop(drawData){
        var animFrameAmount = (settings.animation)? 1/CapValue(settings.animationSteps,Number.MAX_VALUE,1) : 1,
          cnt =(settings.animation)? 0 : 1;
        requestAnimFrame(function(){
            cnt += animFrameAmount;
            animateFrame(cnt, drawData);
            if (cnt <= 1){
              requestAnimFrame(arguments.callee);
            } else {
              settings.afterDrawed.call($this);
            }
        });
      }
      function Max(arr){
        return Math.max.apply(null, arr);
      }
      function Min(arr){
        return Math.min.apply(null, arr);
      }
      function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
      function CapValue(valueToCap, maxValue, minValue){
        if(isNumber(maxValue)) {
          if( valueToCap > maxValue ) {
            return maxValue;
          }
        }
        if(isNumber(minValue)){
          if ( valueToCap < minValue ){
            return minValue;
          }
        }
        return valueToCap;
      }
      return $this;
    };
//   });
// })(jQuery);