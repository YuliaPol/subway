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
        if(chartData[i].element){
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
            if(chartData[i].type == 'shadowLine2'){
                drawShadowLine2(chartData[i].element, chartData[i].data, chartData[i].borderColor);
            }
            if(chartData[i].type == 'shadowLineMultiple'){
                drawShadowLineMultiple(chartData[i].element, chartData[i].labels, chartData[i].datasets);
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
            if(chartData[i].type == 'Gender'){
                DrawGenderChart(chartData[i].element, chartData[i].data.female, chartData[i].data.male);
            }
            if(chartData[i].type == 'dougnatSimple'){
                drawDoughnatSimple(chartData[i].element, chartData[i].data);
                DrawDougnatLegend(chartData[i].element, chartData[i].data);
            }
            if(chartData[i].type == 'HorizontalBarCustom'){
                DrawHorizontalBarCustom(chartData[i].element, chartData[i].data);
            }
            if(chartData[i].type == 'TimeChart'){
                DrawTimeChart(chartData[i].element, chartData[i].data);
            }
            if(chartData[i].type == 'RatingsChart'){
                DrawRatingsChart(chartData[i].element, chartData[i].data);
            }
            if(chartData[i].type == 'socialChart'){
                DrawSocialChart(chartData[i].element, chartData[i].labels, chartData[i].datasets);
            }
            if(chartData[i].type == 'sourceChart'){
                DrawSourceChart(chartData[i].element, chartData[i].labels, chartData[i].datasets);
            }
        }
    }
}
function DrawSourceChart(element, labels, datasets){
    if($(element).length > 0 && datasets.length > 0 && labels.length > 0){
        let chartHtml = '<div class="vert-chart-flex">';
        
        chartHtml += '<div class="vert-chart">';
        chartHtml += '<div class="source-chart-list">';
        
        for (let index = 0; index < datasets.length; index++) {
            let summary = 0;
            for (let i = 0; i < datasets[index].data.length; i++) {
                summary += parseInt(datasets[index].data[i]);
            }

            chartHtml += '<div class="list-item">';
            chartHtml += '  <div class="name">' + datasets[index].name + '</div>';
            chartHtml += '  <div class="values-list">';
            for (let i = 0; i < datasets[index].data.length; i++) {
                if(parseInt(datasets[index].data[i]) > 0){
                    let percent = Math.ceil((100/summary)*parseInt(datasets[index].data[i]));
                    chartHtml += '<div class="value-item" style="background: ' + labels[i].color + ';width: ' + percent +'%;">';
                    chartHtml += '   <div class="progress">';
                    chartHtml += '       ' + datasets[index].data[i];
                    chartHtml += '   </div>';
                    chartHtml += '   <div class="tooltip">';
                    chartHtml += '       ' + percent +' %';
                    chartHtml += '   </div>';
                    chartHtml += '</div>';
                }
            }
            chartHtml += '  </div>';
            chartHtml += '</div>';
        }
        chartHtml += '</div>';
        chartHtml += '</div>';

        chartHtml += '<div class="circle-legend">';
        chartHtml += '  <div class="legend-list">';
        for (let index = 0; index < labels.length; index++) {
            chartHtml += '<div class="legend-item">';
            chartHtml += '   <div class="circle" style="background: ' + labels[index].color +'"></div>';
            chartHtml += '   <div class="label">';
            chartHtml += '       ' + labels[index].label; 
            chartHtml += '   </div>';
            chartHtml += '</div>';
        }
        chartHtml += '  </div>';
        chartHtml += '</div>';
        
        chartHtml += '</div>';
        $(chartHtml).appendTo($(element));
    }
}
function DrawSocialChart(element, labels, datasets){
    if($(element).length > 0 && datasets.length > 0 && labels.length > 0){
        let chartHtml = '<div class="vert-chart-flex">';
        
        chartHtml += '<div class="vert-chart">';
        chartHtml += '<div class="social-chart-list">';
        
        for (let index = 0; index < datasets.length; index++) {
            let summary = 0;
            for (let i = 0; i < datasets[index].data.length; i++) {
                summary += parseInt(datasets[index].data[i]);
            }

            chartHtml += '<div class="list-item">';
            chartHtml += '  <div class="name">' + datasets[index].name + '</div>';
            chartHtml += '  <div class="value-line">';
            for (let i = 0; i < datasets[index].data.length; i++) {
                if(parseInt(datasets[index].data[i]) > 0){
                    let percent = Math.ceil((100/summary)*parseInt(datasets[index].data[i]));
                    chartHtml += '<div class="value-item" style="background: ' + labels[i].color + ';width: ' + percent +'%;">';
                    chartHtml += '   <div class="percent">';
                    chartHtml += '       ' + percent + '%';
                    chartHtml += '   </div>';
                    chartHtml += '   <div class="tooltip">';
                    chartHtml += '       ' + datasets[index].data[i] +' шт';
                    chartHtml += '   </div>';
                    chartHtml += '</div>';
                }
            }
            chartHtml += '  </div>';
            chartHtml += '</div>';
        }
        chartHtml += '</div>';
        chartHtml += '</div>';

        chartHtml += '<div class="circle-legend">';
        chartHtml += '  <div class="legend-list">';
        for (let index = 0; index < labels.length; index++) {
            chartHtml += '<div class="legend-item">';
            chartHtml += '   <div class="circle" style="background: ' + labels[index].color +'"></div>';
            chartHtml += '   <div class="label">';
            chartHtml += '       ' + labels[index].label; 
            chartHtml += '   </div>';
            chartHtml += '</div>';
        }
        chartHtml += '  </div>';
        chartHtml += '</div>';
        
        chartHtml += '</div>';
        $(chartHtml).appendTo($(element));
    }
}
function DrawRatingsChart (element, data){
    if($(element).length > 0 && data.length > 0){
        let summary = 0;
        let maxvalue = 0;
        for (let i = 0; i < data.length; i++) {
            summary += parseInt(data[i].progress);
            if(maxvalue<parseInt(data[i].progress)){
                maxvalue = parseInt(data[i].progress);
            }
        }
        let maxScale;
        let stepScale;
        if(maxvalue <= 0.5) {
            stepScale = 0.1;
            maxScale = 0.5;
        }
        else if(maxvalue <= 1) {
            stepScale = 0.2;
            maxScale = 1;
        }
        else if(maxvalue <= 5) {
            stepScale = 1;
            maxScale = 5;
        } 
        else {
            let tempScale = Math.round((maxvalue/5)*2)/2;
            if(tempScale > 2) {
                tempScale = Math.round(tempScale);
            }
            if(tempScale > 2 && tempScale <= 10){
                tempScale =  Math.ceil(tempScale/5)*5;
            }
            if(tempScale > 10 && tempScale < 15){
                tempScale =  Math.ceil(tempScale/15)*15;
            }
            if(tempScale > 10 && tempScale < 50){
                tempScale =  Math.ceil(tempScale/10)*10;
            }
            if(tempScale > 50 && tempScale < 100){
                tempScale =  Math.ceil(tempScale/50)*50;
            }
            stepScale = tempScale;
        }
    
        let chartHtml = '<div class="vertical-ratings-bar-wrapper">';
        chartHtml += '<div class="scale-wrapper">';
        let currentScale = 0;
        while(currentScale <= maxvalue){
            chartHtml+= '<div class="scale-item">' + currentScale +' шт. </div>';
            currentScale += stepScale;
            currentScale =  Math.round(currentScale*10)/10
        }
        chartHtml += '</div>';
        chartHtml += '<div class="item-list">'
        for (let i = 0; i < data.length; i++) {
            let percentHeight = parseInt(data[i].progress)*(100/(currentScale));
            chartHtml += 
                '<div class="bar-item">'
                +'    <div class="bar-active" style="height: ' + percentHeight + '%; background: ' + data[i].background +'">'
                +'  </div>'
                +'  <div class="label">' + data[i].labelText + '</div>'
                +'</div>';
        }
        chartHtml += '</div>';
        chartHtml += '</div>';
        $(chartHtml).appendTo($(element));
        $(element).find('.scale-item').height();
        height = $(element).find('.scale-item').height();
        $('<style>.vertical-ratings-bar-wrapper .scale-wrapper .scale-item::after{margin-top:'+height+'px;}</style>').appendTo('head');
    }
}
function DrawTimeChart (element, data){
    if($(element).length > 0 && data.length > 0){
        let summary = 0;
        let maxvalue = 0;
        for (let i = 0; i < data.length; i++) {
            summary += parseInt(data[i].progress);
            if(maxvalue<parseInt(data[i].progress)){
                maxvalue = parseInt(data[i].progress);
            }
        }
        let maxScale;
        let stepScale;
        if(maxvalue <= 0.5) {
            stepScale = 0.1;
            maxScale = 0.5;
        }
        else if(maxvalue <= 1) {
            stepScale = 0.2;
            maxScale = 1;
        }
        else if(maxvalue <= 5) {
            stepScale = 1;
            maxScale = 5;
        } 
        else {
            let tempScale = Math.round((maxvalue/5)*2)/2;
            if(tempScale > 2) {
                tempScale = Math.round(tempScale);
            }
            if(tempScale > 2 && tempScale <= 10){
                tempScale =  Math.ceil(tempScale/5)*5;
            }
            if(tempScale > 10 && tempScale < 15){
                tempScale =  Math.ceil(tempScale/15)*15;
            }
            if(tempScale > 10 && tempScale < 50){
                tempScale =  Math.ceil(tempScale/10)*10;
            }
            if(tempScale > 50 && tempScale < 100){
                tempScale =  Math.ceil(tempScale/50)*50;
            }
            stepScale = tempScale;
        }
    
        let chartHtml = '<div class="vertical-time-bar-wrapper">';
        chartHtml += '<div class="scale-wrapper">';
        let currentScale = 0;
        while(currentScale <= maxvalue){
            chartHtml+= '<div class="scale-item">' + currentScale +' мин </div>';
            currentScale += stepScale;
            currentScale =  Math.round(currentScale*10)/10
        }
        chartHtml += '</div>';
        chartHtml += '<div class="item-list">'
        for (let i = 0; i < data.length; i++) {
            let percentHeight = parseInt(data[i].progress)*(100/(currentScale));
            chartHtml += 
                '<div class="bar-item">'
                +'    <div class="bar-active" style="height: ' + percentHeight + '%;">'
                +'      <div class="bar-hover">'
                +'          <div class="value">'
                +'              ' + data[i].progress + ' мин'
                +'          </div>'
                +'      </div>'
                +'  </div>'
                +'  <div class="label">' + data[i].labelText + '</div>'
                +'</div>';
        }
        chartHtml += '</div>';
        chartHtml += '</div>';
        $(chartHtml).appendTo($(element));
        $(element).find('.scale-item').height();
        height = $(element).find('.scale-item').height();
        $('<style>.vertical-time-bar-wrapper .scale-wrapper .scale-item::after{margin-top:'+height+'px;}</style>').appendTo('head');
    }
}
function DrawHorizontalBarCustom(element, data){
    if($(element).length > 0 && data.length > 0){
        let summary = 0;
        let maxvalue = 0;
        for (let i = 0; i < data.length; i++) {
            summary += parseInt(data[i].progress);
            if(maxvalue<parseInt(data[i].progress)){
                maxvalue = parseInt(data[i].progress);
            }
        }
        let maxScale;
        let stepScale;
        if(maxvalue <= 0.5) {
            stepScale = 0.1;
            maxScale = 0.5;
        }
        else if(maxvalue <= 1) {
            stepScale = 0.2;
            maxScale = 1;
        }
        else if(maxvalue <= 5) {
            stepScale = 1;
            maxScale = 5;
        } 
        else {
            let tempScale = Math.round((maxvalue/8)*2)/2;
            if(tempScale > 2) {
                tempScale = Math.round(tempScale);
            }
            if(tempScale > 2 && tempScale <= 10){
                tempScale =  Math.ceil(tempScale/5)*5;
            }
            if(tempScale > 10 && tempScale < 50){
                tempScale =  Math.ceil(tempScale/10)*10;
            }
            if(tempScale > 50 && tempScale < 100){
                tempScale =  Math.ceil(tempScale/50)*50;
            }
            if(tempScale > 1000) {
                tempScale =  Math.ceil(tempScale/100)*100;
            }
            stepScale = tempScale;
        }
    
        let chartHtml = '<div class="horizontal-chart-wrapper">';
        chartHtml += '<div class="vert-scale">';
        let currentScale = 0;
        while(currentScale <= maxvalue){
            if(currentScale+stepScale <= maxvalue && currentScale!== 0){
                chartHtml+= '<div class="scale-label">' + currentScale +'</div>';
            }
            else {
                chartHtml+= '<div class="scale-label"></div>';
            }
            currentScale += stepScale;
            currentScale =  Math.round(currentScale*10)/10
        }
        chartHtml += '</div>';
        chartHtml += '<div class="item-list">'
        for (let i = 0; i < data.length; i++) {
            let percent = Math.round(parseInt(data[i].progress)*(100/summary));
            let percentHeight = parseInt(data[i].progress)*(100/(currentScale - stepScale));
            chartHtml+= 
            '<div class="bar-item">'
            +'    <div class="label">' + data[i].labelText +'</div>'
            +'  <div class="bar" style="height: ' + percentHeight +'%">'
            +'      <div class="bar-item-tip">'
            +'          <div class="tip-cont">'
            +'              <div class="value">' + percent +'% / ' + data[i].progress +'шт</div>'
            +'          </div>'
            +'      </div>'
            +'  </div>'
            +'</div>';
        }
        chartHtml += '</div>';

        chartHtml += '</div>';
        $(chartHtml).appendTo($(element));
    }
}
function drawDoughnatSimple(element, data){
    if($(element).length==1 && data.length > 0){
        var newData = data;
        for (let i = 0; i < data.length; i++) {
            newData[i].title = data[i].labelText;
            newData[i].color = data[i].background;
            newData[i].value = parseInt(data[i].progress);
        }
        if(newData) {
            $(element).drawDoughnutChart(newData);
        }
    }
}
function DrawDougnatLegend(element, data){
    if($(element).length==1 && data.length > 0){
        let legend = $(element).parents('.dougnat').find('.legend');
        let legendHtml = '<div class="legend-list">';
        for (let i = 0; i < data.length; i++) {
            legendHtml += 
                '<div class="legend-item">'
                +'    <div class="square" style="background: ' + data[i].background +';"></div>'
                +'    <div class="label">' + data[i].labelText +'</div>'
                +'</div>';
        }
        legendHtml += '</div>';
        $(legendHtml).appendTo(legend);
    }
}
function DrawGenderChart(element, female, male) {
    if($(element).length>0){
        let chartHtml = '<div class="gender-chart-wrapper">';

        chartHtml += '<div class="woman-col">';
        chartHtml += '<div class="value">' + female + '%</div>';
        chartHtml += '<div class="chart-list">';
        chartHtml += '<div class="chart-row">';
        chartHtml += '<div class="item-list">';

        let femalePercent = 0;
        while (femalePercent<100){
            if(femalePercent<female){
                chartHtml +=
                '<div class="item-a">'
                +'    <div class="icon"></div>'
                +'</div>';
            }
            else {
                chartHtml +=
                '<div class="item">'
                +'    <div class="icon"></div>'
                +'</div>';
            }
            femalePercent += 10;
        }

        chartHtml += '</div>';
        chartHtml += '</div>';
        chartHtml += '</div>';
        chartHtml += '</div>';

        chartHtml += '<div class="man-col">';
        chartHtml += '<div class="value">' + male + '%</div>';
        chartHtml += '<div class="chart-list">';
        chartHtml += '<div class="chart-row">';
        chartHtml += '<div class="item-list">';

        let malePercent = 0;
        while (malePercent<100){
            if(malePercent<male){
                chartHtml +=
                '<div class="item-a">'
                +'    <div class="icon"></div>'
                +'</div>';
            }
            else {
                chartHtml +=
                '<div class="item">'
                +'    <div class="icon"></div>'
                +'</div>';
            }
            malePercent += 10;
        }

        chartHtml += '</div>';
        chartHtml += '</div>';
        chartHtml += '</div>';
        chartHtml += '</div>';

        chartHtml += '</div>';
        $(chartHtml).appendTo($(element));
    }
};
function drawShadowLineMultiple(element, labels,  data){
    if($(element).length==1 && data.length > 0){
        if(data[0].labelText !== '5') {
            data.reverse();
        }
        var id = element.split('.')[1];
        var width = 1000;
        var height = 300;
        if(window.screen.width > 1450 && window.screen.width <= 1600) {
            width = 1000;
            height = 350;
        }
        else if(window.screen.width > 1200 && window.screen.width <= 1450) {
            width = 1000;
            height = 350;
        }
        else if(window.screen.width > 992 && window.screen.width <= 1200) {
            width = 1000;
            height = 350;
        }
        else if(window.screen.width > 768 && window.screen.width <= 992){
            width = 1000;
            height = 400;
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
        var maxValue = data[0].progress;
        var shadowLineEl = document.getElementById(id).getContext('2d');
        var datasets = new Array(0);
        for (let index = 0; index < data.length; index++) {
            var dataTemp = new Array(data[index].data.length);
            for (let index2 = 0; index2 < data[index].data.length; index2++) {
                dataTemp[index2] = data[index].data[index2];
            }

            var gradient = shadowLineEl.createLinearGradient(0, 0, 0, height + 200);
            gradient.addColorStop(0, data[index].backgroundFrom);
            gradient.addColorStop(0.1, data[index].backgroundFrom);
            gradient.addColorStop(0.9, data[index].backgroundTo);
            gradient.addColorStop(1, data[index].backgroundTo);
            var datasetsTemp = {
                backgroundColor: gradient,
                data: dataTemp,
                borderColor: data[index].borderColor,
                label: "label"
            }
            datasets.push(datasetsTemp);
        }
        var ChartData = {
            labels: labels,
            datasets: datasets

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
                        fontSize: 10,
                        min: 0
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
                        min: 0,
                        padding: 10,
                        beginAtZero: true,
                    }
                }],
            },
            tooltips: {
                enabled: false,
            },
            elements: {
                line: {
                    tension: 0.4,
                }
            },
            legend: {
                display: false
            },
        };
        chartInstanceTeam = new Chart(shadowLineEl, {
            type: 'line',
			data: ChartData,
            responsive: true,
            options: optionsLine,
        });
    }
}
function drawShadowLine2(element, data, borderColor) {
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
        var shadowLineEl = document.getElementById(id).getContext('2d');
        gradient = shadowLineEl.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, borderColor);
        gradient.addColorStop(0.5, borderColor + '55');
        gradient.addColorStop(0.9, borderColor + '00');

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
                        fontSize: 10,
                        min: 0
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
                        min: 0,
                        padding: 10,
                        beginAtZero: true,
                        fontColor: "#fff",
                        callback: function(value, index, values) {
                            return value + ' шт';
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
                        if(parseInt(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index])>0){
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
            }
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
                        ctx.fillStyle = "#1E1E1E";
                        ctx.textBaseline = "middle";
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
                        ctx.fillStyle = "#1E1E1E";
                        ctx.textBaseline = "middle";
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
function drawPieSimple(element, data){
    if($(element).length==1 && data.length > 0){
        var newData = new Array();
        var total = 0;
        for (let i = 0; i < data.length; i++) {
            var temp = {
                title: data[i].labelText,
                color: data[i].background,
                value: parseInt(data[i].progress)
            }
            total = total + parseInt(data[i].progress);
            newData.push(temp);
        }
        if(newData[0].title !== '5') {
            newData.reverse();
        }
        if(newData) {
            if(total > 0) {
                $(element).drawPieChart(newData);
                drawPieSimpleLegend(element, data);
            }
        }
    }
}
function drawPieSimpleLegend(element, data){
    let legend = $(element).parents('.circle-chart-wrapper').find('.legend-wrapper')
    if(legend.length > 0){
        let addClass = " ";
        if(data.length < 4){
            addClass += " full-width";
        }
        let legendHtml = '<div class="legend-list ' + addClass +'">';
        for (let index = 0; index < data.length; index++) {
            legendHtml += 
            '<div class="legend-item">'
            +'    <div class="square" style="background: ' + data[index].background + ';"></div>'
            +'  <div class="label">'
            +'      ' + data[index].labelText
            +'  </div>'
            +'</div>';
        }
        legendHtml += '</div>';
        $(legendHtml).appendTo(legend);
    }
}
function drawHorizontalBar(element, data){
    if($(element).length==1 && data.length > 0){
        if(data[0].labelText !== '5') {
            data.reverse();
        }
        var id = element.split('.')[1];
        var width = 400;
        var height = 200;
        if(window.screen.width > 1500 && window.screen.width <= 1800){
            var width = 400;
            var height = 300;
        }
        else if(window.screen.width > 1200 && window.screen.width <= 1500){
            width = 400;
            height = 350;
        }
        else if(window.screen.width > 992 && window.screen.width <= 1200){
            width = 400;
            height = 400;
        }
        else if(window.screen.width > 767 && window.screen.width <= 992){
            width = 400;
            height = 300;
        }
        else if(window.screen.width > 600 && window.screen.width <= 767){
            width = 400;
            height = 200;
        }
        else if(window.screen.width > 400 && window.screen.width <= 600){
            width = 400;
            height = 300;
        }
        else if(window.screen.width  <= 400){
            width = 400;
            height = 600;
        }
        var canvas = '<canvas  id="' + id + '" style="height: '+ height + 'px; width: '+ width +'px;"></canvas>';
        $(canvas).appendTo($(element));        
        var newData = new Array(data.length);
        var backgroundColor = new Array(data.length);
        var labels = new Array(data.length);
        var maxValue = parseInt(data[0].progress);
        for (let i = 0; i < data.length; i++) {
            labels[i] = data[i].labelText;
            backgroundColor[i] = data[i].background;
            newData[i] = data[i].progress;
            if(maxValue<parseInt(data[i].progress)) {
                maxValue = parseInt(data[i].progress);
            }
        }
        maxValue = Math.round(maxValue + maxValue/5);
        if(maxValue>500){
            maxValue = Math.round(maxValue*100)/100;
        }
        else if(maxValue>100){
            maxValue = Math.round(maxValue*50)/50;
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

        var horizontal = document.getElementById(id).getContext('2d');
        var myBarChart = new Chart(horizontal, {
            type: 'horizontalBar',
            data: ChartData,
            options: {
                cornerRadius: 100,
                cornerposition: 'right', //right, left, bottom, top, all
                tooltips: {
                    enabled: false
                },
                hover: {mode: null},
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: '#D5D3D3',
                            lineWidth: 1,
                        },
                        ticks: {
                            fontSize: 10,
                            min: 0,
                            max: maxValue,
                            beginAtZero: true,
                            callback: function(value, index, values) {
                                var axesValue = Math.round(value*10)/10;
                                if(index==values.length-1){
                                    return ' ';
                                }
                                else {
                                    return [' ' , axesValue,  'шт'];
                                }
                            },
                        }
                    }],
                    yAxes: [{
                        barPercentage: 0.3,
                        gridLines: {
                            color: '#D5D3D3',
                            lineWidth: 1,
                        },
                        ticks: {
                            fontSize: 10,
                            mirror: true,//for text-align
                            padding: 0,//for text-align
                            callback: function(value, index, values) {
                                return ' ';
                            },
                        }
                    }],
                },
            },
            plugins: [{
                afterDraw: function(horizontal){    
                    var ctx = horizontal.chart.ctx; 
                    var yAxis = horizontal.scales['y-axis-0'];
                    var xAxis = horizontal.scales['x-axis-0'];
                    var bottom = yAxis.bottom;
                    var top = yAxis.top;
                    for (var index = 0; index < yAxis.ticks.length; index++) {
                        var y = yAxis.getPixelForTick(index);  
                        if (!window.document.documentMode) {
                            ctx.fillText(ChartData.labels[index],  10,  y + 15);
                            ctx.fillStyle = "#1E1E1E";
                            ctx.beginPath();
                            ctx.moveTo(0,  y + 0.5);
                            ctx.lineTo(yAxis.right,  y + 0.5);
                            ctx.lineWidth = 1;
                            ctx.strokeStyle = "#fff";
                            ctx.stroke();
                        }
                    }
                    ctx.beginPath();
                    ctx.moveTo(0,  top + 0.5);
                    ctx.lineTo(yAxis.right,  top + 0.5);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = "#fff";
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(0,  bottom + 0.5);
                    ctx.lineTo(yAxis.right,  bottom + 0.5);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = "#fff";
                    ctx.stroke();
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