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
    $(legendHtml).appendTo(legend);
    $(legendBottomHtml).appendTo(legendBottom);
}