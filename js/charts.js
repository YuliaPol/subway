jQuery(function ($) {
    $(document).ready(function () {
        if(typeof chartData != 'undefined'){
            if(chartData.length > 0){
                DrawCharts(chartData);
            }
        }
    });
});
$( window ).resize(function() {
    if(typeof chartData != 'undefined'){
        if(chartData.length > 0){
            ClearChart(chartData);
            DrawCharts(chartData);
        }
    }
});
function DrawCharts(chartData){
    for(let i = 0; i < chartData.length; i++){
        if(chartData[i].element && chartData[i].data){
            if(chartData[i].type == 'radialbar'){
                var Radialdata = new Array(chartData[i].data.length);
                for (let index = 0; index < chartData[i].data.length; index++) {
                    Radialdata[index] = chartData[i].data[index]
                }
                Radialdata.reverse();
                RadilaBar  = $(chartData[i].element).radialBar({
                    data: Radialdata,
                    width: "215",
                    height: "215",
                    padding: 10,
                    centerText: chartData[i].centerText
                });
                RadilaLegend($(chartData[i].element), Radialdata);
            }
            if(chartData[i].type == 'radialBar2'){
                var Radialdata = chartData[i].data;
                Radialdata.reverse();
                RadilaBar  = $(chartData[i].element).radialBar({
                    data: Radialdata,
                    width: "250",
                    height: "250",
                    padding: 10,
                    strokeCloneCircle: 1,
                    round: false,
                    tooltip: false,
                });
                RadilaLegend($(chartData[i].element), Radialdata);
            }
            if(chartData[i].type == 'simpleBar'){
                drawSimpleBar($(chartData[i].element), chartData[i].data);
            }
            if(chartData[i].type == 'horizontalbar'){
                drawHorizontalBar(chartData[i].element, chartData[i].data);
            }
            if(chartData[i].type == 'pieSimple'){
                drawPieSimple(chartData[i].element, chartData[i].data);
            }
            if(chartData[i].type == 'pieRound'){
                drawPieRound(chartData[i].element, chartData[i].data);
            }
            if(chartData[i].type == 'verticalBar'){
                drawVerticalBar(chartData[i].element, chartData[i].data);
            }
            if(chartData[i].type == 'shadowLine'){
                drawShadowLine(chartData[i].element, chartData[i].data, chartData[i].borderColor);
            }
            if(chartData[i].type == 'lineDot'){
                drawLineDot(chartData[i].element, chartData[i].data, chartData[i].dotColor);
            }
            if(chartData[i].type == 'varticalBarShadow'){
                DrawVerticalBarShadow(chartData[i].element, chartData[i].data);
            }
            if(chartData[i].type == 'HorizontalLines'){
                DrawHorizontalLines(chartData[i].element, chartData[i].data);
            }
        }
    }
}
function drawShadowLine(element, data, borderColor) {
    //type shadowLine
    (function()
    {
        var ShadowLineElement = Chart.elements.Line.extend({
            draw: function()
            {
                var ctx = this._chart.ctx;
                var vm = this._view;
                var borderColor = vm.borderColor;
                var originalStroke = ctx.stroke;
                ctx.stroke = function()
                {
                    ctx.save();
                    ctx.shadowColor = borderColor;
                    ctx.shadowBlur = 4;
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;
                    originalStroke.apply(this, arguments);
                    ctx.restore();
                };
                Chart.elements.Line.prototype.draw.apply(this, arguments);
                ctx.stroke = originalStroke;
            }
        });
        Chart.defaults.ShadowLine = Chart.defaults.line;
        Chart.controllers.ShadowLine = Chart.controllers.line.extend({
            datasetElementType: ShadowLineElement
        });
    })();
    if($(element).length==1 && data.length > 0){
        if(data[0].labelText !== '5') {
            data.reverse();
        }
        var id = element.split('.')[1];
        var width = 500;
        var height = 200;
        if(window.screen.width > 1450 && window.screen.width <= 1600) {
            width = 600;
            height = 300;
        }
        else if(window.screen.width > 1200 && window.screen.width <= 1450) {
            width = 600;
            height = 350;
        }
        else if(window.screen.width > 992 && window.screen.width <= 1200) {
            width = 600;
            height = 350;
        }
        else if(window.screen.width > 768 && window.screen.width <= 992){
            width = 600;
            height = 200;
        }
        else if(window.screen.width > 500 && window.screen.width <= 768) {
            width = 750;
            height = 250;
        }
        else if(window.screen.width <= 500) {
            width = 350;
            height = 200;
        }
        var canvas = '<canvas  id="' + id + '" style="height: '+ height + 'px; width: '+ width +'px;"></canvas>';
        $(canvas).appendTo($(element));
        data.reverse();   
        var newData = new Array(data.length);
        var backgroundColor = new Array(data.length);
        var labels = new Array(data.length);
        var maxValue = data[0].progress;
        for (let i = 0; i < data.length; i++) {
            labels[i] = data[i].labelText;
            backgroundColor[i] = data[i].background;
            newData[i] = data[i].progress;
            if(maxValue<data[i].progress){
                maxValue = data[i].progress;
            }
        }
        maxValue = parseInt(maxValue) + 10;
        let heightBackground = height + 150;
        var shadowLineEl = document.getElementById(id).getContext('2d');
        gradient = shadowLineEl.createLinearGradient(0, 0, 0, heightBackground);
        gradient.addColorStop(0, borderColor);
        gradient.addColorStop(0.5, borderColor + '55');
        gradient.addColorStop(0.7, borderColor + '00');

        var ChartData = {
            labels: labels,
            datasets: [{
                data: newData,
                backgroundColor: gradient,
                pointBackgroundColor: 'white',
                borderWidth: 2,
                borderColor: borderColor,
            }]
        };

        var optionsLine = {
            responsive: true,
            maintainAspectRatio: true,
            cutoutPercentage: 70,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            hover: {mode: null},
            scales: {
                xAxes: [{
                    gridLines: {
                        color: '#D5D3D3',
                        lineWidth: 1
                    },
                    ticks: {
                        fontSize: 8,
                    }
                }],
                yAxes: [{
                    barPercentage: 1.0,
                    weight: 100,
                    gridLines: {
                        color: '#D5D3D3',
                        lineWidth: 1
                    },
					ticks: {
						min: 1,
						max: 6,
                        stepSize: 1,
                        fontColor: "#fff",
						callback: function(value, index, values) {
                                if(value == 6){
                                    return '                  ';
                                }
								else if(value == 5){
									return 'Индекс CSI';
                                }
                                else if(value == 1){
									return value + ' балл';
                                }
                                else {
									return value + ' балла';
                                }
						
						}
					}
                }],
            },
            elements: {
                line: {
                    tension: 0.4,
                }
            },
            legend: {
                display: false
            },
            point: {
                backgroundColor: 'white'
            },
            tooltips: {
                mode: 'nearest',
                backgroundColor: borderColor,
                titleFontSize: 8,
                titleAlign: 'center',
                position: 'average',
                xPadding: 30,
                yPadding: 5,
                cornerRadius: 10,
                displayColors: false,
                callbacks: {
                    title: function() {},
                    label: function(tooltipItem, data) {
                        var values = data.datasets[tooltipItem.datasetIndex].data;
                        var label = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || '';
                        label =  label;
                        return label;
                    }
                }
            },
        };
        chartInstanceTeam = new Chart(shadowLineEl, {
            type: 'ShadowLine',
            data: ChartData,
            responsive: true,
            options: optionsLine,
            plugins: [{
                afterDraw: function(chartTeam){      
                var ctx = chartTeam.chart.ctx; 
                var yAxis = chartTeam.scales['y-axis-0'];
                for (var index = 0; index < yAxis.ticks.length; index++) {
                    var y = yAxis.getPixelForTick(index);  
                    if (!window.document.documentMode) {
                        ctx.fillText(yAxis.ticks[index],  0,  y - 15);
                        ctx.fillStyle = "#1E1E1E"
                        ctx.beginPath();
                        ctx.moveTo(0,  y + 0.5);
                        ctx.lineTo(yAxis.right,  y + 0.5);
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = "#D5D3D3";
                        ctx.stroke();
                    }
                    }
                }
            }],
        });

    }
}
function drawLineDot(element, data, dotColor) {
    if(data.length > 0 && $(element).length>0) {
        var maxValue = parseInt(data[0].progress);
        var minValue = parseInt(data[0].progress);
        var total = 0;
        for (let i = 0; i < data.length; i++) {
            total += parseInt(data[i].progress);
            if(maxValue<data[i].progress){
                maxValue = parseInt(data[i].progress);
            }
            if(minValue>data[i].progress){
                minValue = parseInt(data[i].progress);
            }
        }
        var maxAxes = 1;
        var minAxes = 0;
        var axes = new Array();
        var step = 1;
        if(maxValue < 1) {
            maxAxes = Math.round(maxValue*10)/10 + 0.1;
            step = 0.1;
        }
        else if(maxValue < 10) {
            maxAxes = Math.round(maxValue)/ + 1;
            step = 1;
        }
        else {
            step = 5;
            while ((maxValue + step)/step > 9 || step>10000){
                if(step >=200) {
                    step += 100;
                }
                else if(step >=50) {
                    step += 50;
                }
                else if(step >=30) {
                    step += 10;
                }
                else {
                    step += 5;
                }
            }
            maxAxes = maxValue + step;
            if(minValue > step && maxAxes > 100){
                minAxes = step;
            }
        }
        var axesValue = minAxes;
        for (let i = 0; axesValue < maxAxes + step; i++) {
            axes.push(axesValue);
            axesValue = axesValue + step;
        }
    
        var percentValue = new Array(data.length);
        var percentPosition = new Array(data.length);
    
        var minValuePosition = axes[0];
        var maxValuePosition = axes[axes.length-1];
        var axesRange = maxValuePosition - minValuePosition;
        var positionPercent = 100/axesRange;
        var valuePercent = 100/total;
    
        for (let i = 0; i < data.length; i++) {
            if(parseInt(data[i].progress) > 0){
                percentValue[i] = Math.round(valuePercent*parseInt(data[i].progress));
                percentPosition[i] = Math.round(positionPercent*(parseInt(data[i].progress) - minValuePosition));
            }
            else {
                percentValue[i] = 0;
                percentPosition[i] = 0;
            }
        }
    
        var str = '<div class="lineDotcont">';
        str += '<div class="lineDotlist">';
        for (let i = 0; i < data.length; i++) {
            str += 
            '<div class="lineDotRow">'
            +'    <div class="label">' + data[i].labelText + '</div>'
            +'  <div class="line-col">'
            +'      <div class="line" style="background: linear-gradient(90deg, '+ data[i].backgroundStart + ' 0%, '+ data[i].backgroundEnd + ' 100%);">'
            +'          <div class="dot" style="left: calc('+ percentPosition[i] + '% - 7px);border-color: '+ dotColor +'"></div>'
            +'          <div class="tooltip" style="left: calc('+ percentPosition[i] + '% - 37px);">' + percentValue[i] + '% / ' + data[i].progress + ' шт</div>'
            +'      </div>'
            +'  </div>'
            +'</div>';
        }
        str += '</div>';
        str += '<div class="y-axis">';
        for (let i = 0; i < axes.length; i++) {
            str +=
            '<div class="axis-item">'
            +'    ' + axes[i] + '<br>'
            +'  шт'
            +'</div>';
        }
        str += '</div>';
        str += '</div>';
        $(element).append(str);
    }
}
function ClearChart(chartData){
    $('.doughnutTipExpand').remove();
    $('.pyraamidTip').remove();
    $('.doughnutTip').remove();
    $('.pieTip').remove();

    $('.chart-legend').html(' ');
    for(let i = 0; i < chartData.length; i++){
        if(chartData[i].type !== 'radialbar' && chartData[i].type !== 'radialBar2'){
            $(chartData[i].element).html(' ');
            $(chartData[i].element).parents('.chart-content').find('.legend .legend-list').html(' ');
        }
    }
}
function RadilaLegend(el, Radialdata){
    let data = new Array(Radialdata.length);
    let summary = 0;
    for (let index = 0; index < Radialdata.length; index++) {
        data[index] = Radialdata[index];
        summary += parseInt(Radialdata[index].progress);
    }
    data.reverse();
    let percent = new Array(data.length);
    for (let index = 0; index < data.length; index++) {
        percent[index] = Math.round((parseInt(data[index].progress)*100)/summary);
    }
    let legend = $(el).parents('.radial-wrapper').find('.radial-legend');
    let legendBottom = $(el).parents('.radial-wrapper').find('.radial-bottom-leggend');
    let legendHtml = '<div class="legend-list">';
    
    let legendBottomHtml = '<div class="legend-list">';
    for (let index = 0; index < data.length; index++) {
        let addClass = ' ';
        if(percent[index] < 17) {
            addClass += 'dark-color';
        }
        legendHtml += 
        '<div class="legend-item ' + addClass + '">'
        +'    <div class="label">'
        +'       ' + data[index].labelText
        +'  </div>'
        +'  <div class="line-wrapper">'
        +'      <div class="active-line" style="width: ' + percent[index] + '%;background-color: ' + data[index].background + ';"></div>'
        +'      <div class="value">' + percent[index] + ' %</div>'
        +'  </div>'
        +'</div>';

        legendBottomHtml += 
        '<div class="legend-item">'
        +'    <div class="label">'+ data[index].labelText + '</div>'
        +'   <div class="value">' + data[index].progress + '</div>'
        +'</div>';
    }
    legendHtml += '</div>';
    legendBottomHtml += '</div>';
    if(legend.length > 0){
        $(legendHtml).appendTo(legend);
    }
    if(legendBottomHtml.length > 0){
        $(legendBottomHtml).appendTo(legendBottom);
    }
}
function drawVerticalBar(element, data) {
    if($(element).length==1 && data.length > 0){
        var id = element.split('.')[1];
        var width = 300;
        var height = 200;
        if(window.screen.width > 768 && window.screen.width < 992){
            width = 350;
            height = 200;
        }
        else if(window.screen.width > 500 && window.screen.width <= 768) {
            width = 750;
            height = 250;
        }
        else if(window.screen.width <= 500) {
            width = 350;
            height = 200;
        }
        var canvas = '<canvas  id="' + id + '" style="height: '+ height + 'px; width: '+ width +'px;"></canvas>';
        $(canvas).appendTo($(element));
        var newData = new Array(data.length);
        var backgroundColor = new Array(data.length);
        var labels = new Array(data.length);
        for (let i = 0; i < data.length; i++) {
            labels[i] = data[i].labelText;
            backgroundColor[i] = data[i].background;
            newData[i] = data[i].progress;
        }

        var ChartData = {
            labels: labels,
            datasets: [{
                data: newData,
                backgroundColor: backgroundColor,
                hoverBackgroundColor: backgroundColor,
                borderWidth: 0
            }]
        };

        var vertical = document.getElementById(id).getContext('2d');
        let fontSizeTicks = 8;
        var myBarChart = new Chart(vertical, {
            type: 'bar',
            data: ChartData,
            options: {
                tooltips: {
                    enabled: true,
                    mode: 'point',
                    backgroundColor: '#C9C9C9',
                    titleFontSize: 8,
                    titleAlign: 'center',
                    xPadding: 10,
                    yPadding: 5,
                    cornerRadius: 10,
                    displayColors: false,
                    callbacks: {
                        title: function() {},
                        label: function(tooltipItem, data) {
                            var values = data.datasets[tooltipItem.datasetIndex].data;
                            var total = 0;
                            for(let i = 0; i < values.length; i++){
                                total += parseInt(values[i]);
                            }
                            var percent;
                            if(parseInt(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index])) {
                                percent = Math.round((100/total)*data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
                            }
                            else {
                                percent = 0;
                            }
                            var label = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || '';
                            label =  percent + '% / '+ label + ' шт';
                            return label;
                        }
                    }
                },
                hover: {mode: null},
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: '#fff',
                            lineWidth: 0
                        },
                        ticks: {
                            fontSize: fontSizeTicks,
                            min: 0
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: '#D5D3D3',
                            lineWidth: 1
                        },
                        ticks: {
                            fontSize: fontSizeTicks,
                            padding: 5,
                            beginAtZero: true
                        }
                    }],
                },
            }
        });
    }
}