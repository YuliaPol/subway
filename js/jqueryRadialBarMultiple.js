/*--------------------------------------------------------------------
 *JAVASCRIPT "jquery.radialBar.js"
 *Version:    0.1.0 - 2020
 *author:     Ahed Kabalan
 *Licensed MIT 
-----------------------------------------------------------------------*/

"use strict";

var pluginName = 'radialBar';

var svgNS = "http://www.w3.org/2000/svg";
var data;
var RadialBar = function (element, options) {
    var self = this;
    self.element = element;
    self.$element = $(element);
    self._init(options);
};

RadialBar.prototype = {
    constructor: RadialBar,
    _init: function (options) {
        var self = this, $el = self.$element.addClass('');
        self.options = options;
        $.each(options, function (key, value) {
            self[key] = value;
        });
        data = self.options["data"];
        self._dataPercent();
        self._build();
        var $container = self.$container = $(document.createElement("div")).appendTo($el);
        $(document.createElement("div")).attr('class', 'radia-bar-container').appendTo($container)
            .append(self.svgContainer);

        return $el.removeClass('radia-bar-loading');
    },
    _dataPercent: function(){
        var self = this;
        var length = self.options["data"].length;
        var data = self.options["data"];
        if(length>0){
            var percent = new Array(length);
            var summary = 0;
            for (let i = 0; i < length; i++) {
                summary = summary + parseInt(data[i].progress);
            }
            var relative = 100 / summary;
            for (let i = 0; i < length; i++) {
                if(parseInt(data[i].progress)>0){
                    percent[i] = Math.round(relative*parseInt(data[i].progress));
                }
                else {
                    percent[i] = 0;
                }
            }
            self.options["percent"] = percent;
        }
    },
    _build: function(){
        var self = this;
        
        var w = typeof self.options.width === 'undefined' ? "200" : self.options.width,
            h = typeof self.options.height === 'undefined' ? "200" : self.options.height;

        if (w > $(window).width()) {
            w = $(window).width();
        }

        var r = self.radius = w / 3, paddingLabel = r + 20;
        var scale = "-"+ (r * 1.5) +" -"+ (r * 1.5) +" "+ w +" "+ h +"";
        
        var strokeWidth = self.strokeWidth = self.options.strokeWidth || 12;

        self._buildSvg(w, h, scale);
        var length = self.options["data"].length;
        var padding = self.options.padding || 20;
        var division = (r - padding) / length;
        var strokeCloneCircle = self.strokeWidth - 3;
        if(self.options["strokeCloneCircle"]){
            strokeCloneCircle = self.options["strokeCloneCircle"];
        }
        
        var maxValue = 0;
        for (let i = 0; i < length; i++) {
            if(parseInt(data[i].progress) > maxValue){
                maxValue = parseInt(data[i].progress);
            }
        }
        var raiusCircle = w / 2;
        for(var i = 0; i < length; i++){
            var object = self.options["data"][i];
            var percent = self.options["percent"][i];
            var stroreWidth = 12;
            if(i<6){
                stroreWidth = 12 - i;
            }
            else {
                stroreWidth = 12 - 6;
            }
            self._buildCircle(object, raiusCircle, stroreWidth, maxValue, strokeCloneCircle, percent);
            paddingLabel += 20;
            r = r - division;
            raiusCircle = raiusCircle - division;
        }
        if(self.options.centerText){
            self._buildCenterCircle(self.options.centerText, raiusCircle);
        }
        // self._addShadow();
    },

    
    _buildSvg: function(width, height, scale){
        var self = this;
        var svgElem = self.svgContainer = document.createElementNS(svgNS, "svg");
        svgElem.setAttributeNS(null, "width", width);
        svgElem.setAttributeNS(null, "height", height);
        svgElem.setAttributeNS(null, "viewBox", scale);

        
    },

    _addShadow: function(){
        var self = this;
        //add shadow
        var shadow = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        shadow.setAttribute('id', 'boxshadow');
        var feDropShadow = document.createElementNS('http://www.w3.org/2000/svg', 'feDropShadow');
        feDropShadow.setAttribute('dx', '0');
        feDropShadow.setAttribute('dy', '2');
        feDropShadow.setAttribute('stdDeviation', '2');
        feDropShadow.setAttribute('flood-color', 'black');
        feDropShadow.setAttribute('flood-opacity', '0.25');
        $(feDropShadow).appendTo(shadow);
        $(shadow).appendTo(self.svgContainer);
    },
    _buildCircle: function(object, r, stroreWidth, maxValue, strokeCloneCircle, percent){
        var self = this;
        var radius = r - 10;
        var circumference = radius * 2 * Math.PI;
        // var offset = circumference - object.progress / 100 * circumference;
        var offset = circumference - percent / 100 * circumference;
        // var offset;
        // if(parseInt(object.progress) > 0){
        //     offset = circumference - object.progress / maxValue * 0.9 * circumference;
        // }
        // else {
        //     offset = 0;
        // }
        var circle = document.createElementNS(svgNS,"circle");
        circle.setAttribute("cy", 0);
        circle.setAttribute("cx", 0);
        circle.setAttribute("r", radius);
        circle.setAttribute("stroke-width", strokeCloneCircle);
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", '#F3F3F3');
        circle.setAttribute("data-value", object.progress);
        circle.setAttribute("data-percent", percent);

        var clonedCircle = $(circle).clone()[0];
        if(parseInt(object.progress) > 0){
            clonedCircle.setAttribute("stroke-width", stroreWidth);
        }
        else {
            clonedCircle.setAttribute("stroke-width", 0);
        }
        clonedCircle.setAttribute("stroke", object.background);
        clonedCircle.setAttribute("transform", "rotate(-90 0 0)")
        clonedCircle.setAttribute("stroke-dasharray", circumference+" "+circumference);
        clonedCircle.setAttribute("stroke-dashoffset", offset);
        
        if(self.options["round"] !== false){
            clonedCircle.setAttribute("stroke-linecap", "round");
        }
        // clonedCircle.setAttribute("style", "transition: stroke-dashoffset 1s ease-out 0s; filter: url(#boxshadow);");
        clonedCircle.setAttribute("style", "transition: stroke-dashoffset 1s ease-out 0s;");
        self.svgContainer.appendChild(circle);
        self.svgContainer.appendChild(clonedCircle);
    },
    _buildCenterCircle: function(textLabel, raiusCircle){
        var self = this;
        var radius = raiusCircle - 10;
        var circle = document.createElementNS(svgNS,"circle");
        circle.setAttribute("cy", 0);
        circle.setAttribute("cx", 0);
        circle.setAttribute("r", radius);
        circle.setAttribute("fill", "#8CC292");
        circle.setAttribute("stroke", '#F3F3F3');

        var text = document.createElementNS(svgNS,"text");
        text.setAttribute("x", "0");
        text.setAttribute("y", "6");
        text.setAttribute("text-anchor", "middle");
        text.style.fill = 'white';
        text.style.fontFamily = 'Helvetica';
        text.style.fontSize = '18';
        text.style.fontWeight = 'bold';
        text.innerHTML = textLabel;
        self.svgContainer.appendChild(circle);
        self.svgContainer.appendChild(text);

    },
    destroy: function() {
    },

};

$.fn[pluginName] = function (options) {

    var args = arguments;

    if (options === undefined || typeof options === 'object') {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.extend({}, $.fn[pluginName].defaults, options);
                $.data(this, 'plugin_' + pluginName, new RadialBar(this, options));
            }
        });
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
        return this.each(function() {
            var instance = $.data(this, 'plugin_' + pluginName);
            if (instance instanceof Progressing && typeof instance[options] === 'function') {
                instance[options].apply(instance, Array.prototype.slice.call(args, 1));
            }
        });
    }
};

$.fn[pluginName].defaults = {
    
};

$.fn[pluginName].Constructor = RadialBar;
