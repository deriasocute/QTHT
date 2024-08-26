var Main = {
    init: function () {
        Main.onEvent();
        Main.upEvent();
        Main.backLink();
    },
    upEvent: function (container) {
        if (Utils.isEmpty(container))
            container = jQuery(document);

        container.find(".useDragable").draggable({
            cursorAt: { left: 5 }
        });
        Cust.dataTables_filter_col();
        container.find('.dataTables_wrapper .table:not(.useTreegrid)').each(function () {
            if (!$(this).hasClass("stacktable_inited") && !$(this).hasClass("not_js_responsive")) {
                $(this).addClass("stacktable_inited");
                $(this).stacktable();
            }
        });
        container.find(".selectpicker").selectpicker();
        container.find(".autoSelect2").each(function () {
            let custDropDown = $(this).attr("data-dropdown-css-class");
            let closeOnSelect = $(this).attr("data-close-on-select") == "true";
            $(this).select2(
                {
                    language: "vi",
                    dropdownCssClass: custDropDown,
                    closeOnSelect: closeOnSelect
                }
            )
        });
        container.find(".editorSummernote").each(function () {
            if (!jQuery(this).hasClass("setSummernote")) {
                jQuery(this).addClass("setSummernote").summernote({
                    lang: 'vi-VN',
                    height: '200px'
                });
            }
        });
        container.find(".useTreegrid").each(function () {

            var state = jQuery(this).data("initial-state");

            jQuery(this).treegrid(
                {
                    initialState: state
                });

        });
        container.find(".nestable").each(function () {
            if (!jQuery(this).hasClass("setNestabled")) {
                var obj = jQuery(this);
                var maxDepth = obj.attr("data-max-depth") || 0;
                obj.addClass("setNestabled").nestable({
                    maxDepth: maxDepth
                }).on('change', function (e) {

                    var ids = [];
                    var idTheme = obj.attr("data-theme-id");
                    var idRegion = obj.attr("data-region-id");
                    var idPage = obj.attr("data-page-id");
                    var url = obj.attr("data-url");
                    var data = obj.nestable('serialize');

                    for (var i in data) {
                        var item = data[i];
                        ids.push(item.id);
                    }
                    if (!Utils.isEmpty(url)) {
                        var dataPost = {};
                        if (obj.hasClass("regions")) {
                            dataPost = {
                                IDTheme: idTheme,
                                IDPage: idPage || 0,
                                IDRegions: JSON.stringify(ids)
                            };
                        }
                        else {
                            dataPost = {
                                IDTheme: idTheme,
                                IDRegion: idRegion,
                                IDPage: idPage || 0,
                                IDBlocks: JSON.stringify(ids)
                            };
                        }

                        jQuery.ajax({
                            type: "POST",
                            async: true,
                            url: url,
                            data: dataPost,
                            success: function (response) {
                                obj.closest(".ui-dialog").addClass("refresh");
                            }
                        });
                    }
                });
            }
        });
        container.find(".useSortable").each(function () {
            if (jQuery(this).hasClass("inited")) {
                jQuery(this).sortable("destroy");
            }
            jQuery(this).sortable({
                items: ".sortitem"
            });
        });
        container.find(".morris-donut-chart").each(function () {
            if ($(this).is(":visible")) {
                try {
                    var mrdata = JSON.parse(jQuery(this).find('#txtdata').val());
                    Morris.Donut({
                        element: jQuery(this),
                        data: mrdata.data,
                        colors: mrdata.colors
                    });
                } catch (e) {

                }
            }
        });
        container.find(".morris-bar-chart").each(function () {
            var useDemoData = jQuery(this).attr('data-demo');
            var datas;
            if (useDemoData == "true") {
                datas = ce_column_chart;
            } else {
                datas = JSON.parse(jQuery(this).find('#txtdata').val());
                //datas = jQuery.parseJSON(datas);
            }

            var newData = [];
            var categories = [];
            for (i = 0; i < datas.data.length; i++) {
                categories.push(datas.data[i].Title);
            }
            var series = [];
            for (i = 0; i < datas.labels.length; i++) {
                var dataNew = [];
                for (j = 0; j < datas.data.length; j++) {
                    if (datas.labels[i] == "Dự kiến") {
                        dataNew.push(datas.data[j].plan);
                    } else if (datas.labels[i] == "Thực tế") {
                        dataNew.push(datas.data[j].now);
                    }
                }
                series.push({
                    'name': datas.labels[i],
                    'color': datas.labels[i] == "Thực tế" ? '#5DB2FF' : '#A0D468',
                    'data': dataNew
                });
            }
            newData.push({
                "categories": categories,
                "series": series
            });







            //var target = $(this).attr("data-target");
            var target = $(this)[0];
            //var dataStacking = $(this).attr("data-stacking");
            var dataStacking = 'false';
            var theme = jQuery(this).attr('data-theme');
            var background_Color,
                plot_Border_Color,
                title_Color,
                title_Hover_Color;
            if (theme == "dark-transparent") {
                background_Color = "transparent";
                plot_Border_Color = "transparent";
                title_Color = "#fff";
                title_Hover_Color = "#fff";
            } else if (theme == "dark") {
                background_Color = "#212121";
                plot_Border_Color = "#fff";
                title_Color = "#212121";
                title_Hover_Color = "#212121";
            } else if (theme == "light-transparent") {
                background_Color = "transparent";
                plot_Border_Color = "transparent";
                title_Color = "#fff";
                title_Hover_Color = "#fff";
            } else {
                background_Color = "transparent";
                plot_Border_Color = "transparent";
                title_Color = "#fff";
                title_Hover_Color = "#fff";
            }
            Highcharts.chart(target, {
                chart: {
                    type: 'column',
                    style: {
                        fontFamily: 'sans-serif'
                    },
                    backgroundColor: background_Color,
                    plotBorderWidth: null,
                    plotBorderColor: plot_Border_Color,
                    marginBottom: 80
                },
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: newData[0].text,
                    style: {
                        fontFamily: 'Segoe UI',
                        fontSize: '14px',
                        color: title_Color,
                        fontWeight: '400 !important',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                    }
                },
                yAxis: [{
                    gridLineColor: 'rgba(255,255,255,.35)',
                    labels: {
                        style: {
                            color: title_Color,
                        }
                    },
                    title: {
                        text: '',
                        style: {
                            color: title_Color,
                        }
                    },
                    minPadding: 0,
                }, {
                    gridLineWidth: 0,
                    title: {
                        text: '',
                        style: {
                            //color: '#006600',
                        }
                    },
                    labels: {
                        style: {
                            //color: '#006600',
                        }
                    },
                    opposite: true
                },],
                xAxis: {
                    categories: newData[0].categories,
                    crosshair: true,
                    labels: {
                        style: {
                            color: title_Color
                        }
                    }
                },
                tooltip: {
                    shared: true
                    // useHTML: true,
                    // formatter: function() {
                    //     if (dataStacking != "false") {
                    //         var points = '<table class="tip"><caption style="color: #222"><b>' + this.x + '</b></caption>' +
                    //             '<tbody>';
                    //         $.each(this.points, function(i, point) {
                    //             points += '<tr><td><i class="fa fa-circle" aria-hidden="true" style="color: ' + point.series.color + '"></i> ' + point.series.name + ': </td>' +
                    //                 '<td style="text-align: right;color:#222"><b>' + point.y + '</b></td></tr>'
                    //         });
                    //         points += '<tr><td>Tổng: </td>' +
                    //             '<td style="text-align:right;color:#222"><b>' + this.points[0].total + '</b></td></tr>' +
                    //             '</tbody></table>';
                    //         return points;

                    //     } else {
                    //         var points = '<table class="tip"><caption style="color: #222"><b>' + this.x + '</b></caption>' +
                    //             '<tbody>';
                    //         $.each(this.points, function(i, point) {
                    //             points += '<tr><td><i class="fa fa-circle" aria-hidden="true" style="color: ' + point.series.color + '"></i> ' + point.series.name + ': </td>' +
                    //                 '<td style="text-align: right;color:#222"><b>' + point.y + '</b></td></tr>'
                    //         });
                    //         points += '</tbody></table>';
                    //         return points;

                    //     }
                    // }
                },
                plotOptions: {
                    column: {
                        stacking: dataStacking == "false" ? false : "normal",
                        //borderRadiusTopLeft: 10,
                        //borderRadiusTopRight: 10
                        borderWidth: 0
                    },
                    series: {
                        pointWidth: dataStacking == "false" ? 25 : 25
                    }
                },
                legend: {
                    //align: 'right',
                    //verticalAlign: 'top',
                    //x: 0,
                    y: 12,
                    itemStyle: {
                        color: title_Color
                    },
                    itemHoverStyle: {
                        color: title_Hover_Color
                    },
                    itemHiddenStyle: {
                        color: '#ccc'
                    },
                    title: {
                        style: {
                            color: '#C0C0C0'
                        }
                    }
                },
                series: newData[0].series
            });
        });
        container.find(".pie-chart-plot").each(function () {
            try {
                function labelFormatter(label, series) {
                    return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
                }
                var data = jQuery(this).attr('data-value');
                if (typeof data != "undefined") {
                    var data = JSON.parse(jQuery(this).attr('data-value'));
                    jQuery(this).unbind();
                    $.plot(jQuery(this), data, {
                        series: {
                            pie: {
                                show: true,
                                radius: 1,
                                label: {
                                    show: true,
                                    radius: 0.55,
                                    formatter: labelFormatter,
                                    threshold: 0.1
                                }
                            }
                        },
                        legend: {
                            show: false
                        }
                    });
                    var legendHTML = "";
                    for (var i = 0; i < data.length; i++) {
                        legendHTML += "<div class='Legend_item'><span style='display:inline-block;width:20px;background-color:" + data[i].color + ";'>&nbsp;</span> " + data[i].label + "</div>";
                    }
                    if (jQuery(this).next(".DocproChart_legend").length != 0) { jQuery(this).next(".DocproChart_legend").remove(); }

                    jQuery(this).after('<div class="DocproChart_legend">' + legendHTML + '</div>');
                }
            } catch (e) {
                console.log(e);
            }
        });
        container.find(".chartBeyondMorris").each(function () {
            if (!jQuery(this).hasClass("builded")) {
                jQuery(this).addClass("builded");
                try {
                    var data = jQuery(this).find(".dataChart").val();
                    if (typeof data != "undefined") {
                        var jsData = jQuery(this).find(".dataChart");
                        var xkey = jsData.data('xkey');
                        var ykeys = jsData.data('ykeys');
                        var labels = jsData.data('labels');
                        var colors = jsData.data('color');
                        var typeChart = jsData.data('typechart');
                        var isFormat = jsData.data('format');
                        var options = {
                            parseTime: false,
                            element: jQuery(this),
                            data: jQuery.parseJSON(data),
                            xkey: xkey,
                            ykeys: ykeys.split(','),
                            labels: labels.split(','),
                            lineColors: colors.split(','),
                            lineWidth: [0, 0],
                            fillOpacity: 1,
                            gridTextColor: '#999',
                            gridIntegers: true,
                            resize: true,
                            behaveLikeLine: true,
                            hideHover: 'auto',
                            barColors: ["#a0d468", "#5db2ff", "#e75b8d", "#fb6e52", "#ffce55", "#1eb39d", "#3b7d9d", "#91b8e1", "#e74c3c", "#ffcd02", "#64ddbb", "#1dabb8", "#d8335b", "#e76b6b", "#a58bd5", "#3172d6", "#8f3fb0", "#c33825", "#9f5b44", "#ff6766"],
                            yLabelFormat: function (y) {
                                if (typeof isFormat == "undefined")
                                    return y != Math.round(y) ? '' : y;
                                else return y;
                            },
                        };
                        if (typeof data != "undefined" && data.length > 0) {
                            switch (typeChart) {
                                case "Bar": Morris.Bar(options);
                                    break;
                                case "Area": Morris.Area(options);
                                    break;
                                default: Morris.Line(options);
                                    break;
                            }
                        };
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        });
        container.find(".semi-circle-donut").each(function () {
            try {
                var target = $(this).attr("data-target");
                var chart_data = JSON.parse(jQuery(this).attr("data-value"));
                var chart_title = jQuery(this).attr("data-title");
                var chart_colors = JSON.parse(jQuery(this).attr("data-color"));
                Highcharts.chart(target, {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: 0,
                        plotShadow: false
                    },
                    title: {
                        text: chart_title,
                        align: 'center',
                        verticalAlign: 'middle',
                        y: 40
                    },
                    tooltip: {
                        pointFormat: '<b>{point.percentage:.2f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            dataLabels: {
                                enabled: false,
                                distance: -50,
                                style: {
                                    fontWeight: 'bold',
                                    color: 'white'
                                }
                            },
                            startAngle: -90,
                            endAngle: 90,
                            center: ['50%', '70%']
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: '',
                        innerSize: '70%',
                        data: chart_data
                    }],
                    colors: chart_colors,
                    exporting: {
                        "enabled": false
                    },
                    legend: {
                        "enabled": false
                    },
                    credits: {
                        "enabled": false
                    }
                });
                var legendHTML = "";
                for (var i = 0; i < chart_data.length; i++) {
                    legendHTML += "<div class='Legend_item'><span style='display:inline-block;width:20px;background-color:" + chart_colors[i] + ";'>&nbsp;</span> " + chart_data[i].name + "</div>";
                }
                if (jQuery(this).next(".DocproChart_legend").length != 0) { jQuery(this).next(".DocproChart_legend").remove(); }
                jQuery(this).after('<div class="DocproChart_legend">' + legendHTML + '</div>');

            } catch (e) { }
        });
        container.find(".realtime_chart").each(function () {

            try {
                //------------------------------Real-Time Chart-------------------------------------------//
                var data = [];
                var dataset;
                var totalPoints = 60;
                var updateInterval = 100000;
                var now = new Date().getTime();
                var check = true;

                function GetData() {
                    //data.shift();
                    if (data.length >= totalPoints)
                        data.shift();
                    // Do a random walk
                    while (data.length < totalPoints - 1 & check == true) {
                        var temp = [now - (totalPoints * 1000) + updateInterval + data.length]; //data format [x, y]
                        data.push(temp);
                    }
                    check = false;
                    if (data.length < totalPoints) {
                        try {
                            jQuery.ajax({
                                type: "POST",
                                async: true,
                                url: "/autocomplete/userrealtime.html",
                                success: function (response) {
                                    now = new Date().getTime();
                                    var temp = [now += updateInterval, response.data.Amount];
                                    data.push(temp);
                                }
                            });
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
                var options = {
                    series: {
                        lines: {
                            show: true,
                            lineWidth: 1,
                            fill: true
                        }
                    },
                    xaxis: {
                        mode: "time",
                        tickSize: [1, "second"],
                        tickFormatter: function (v, axis) {
                            var date = new Date(v);
                            //if (date.getSeconds() == 0) {
                            //    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                            //    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                            //    return hours + ":" + minutes;
                            //} else {
                            return "";
                            //}
                        },
                        axisLabel: "Time",
                        axisLabelUseCanvas: true,
                        axisLabelFontSizePixels: 12,
                        axisLabelFontFamily: 'Verdana, Arial',
                        axisLabelPadding: 6
                    },
                    yaxis: {
                        tickSize: 1,
                        //tickFormatter: function (v, axis) {
                        //    if (v % 5 == 0) {
                        //        return v;// trục y
                        //    } else {
                        //        return "";
                        //    }
                        //},
                        tickFormatter: function (v, axis) {
                            return v;// trục y
                        },
                        axisLabel: "Số lượng người truy cập",
                        axisLabelUseCanvas: true,
                        axisLabelFontSizePixels: 12,
                        axisLabelFontFamily: 'Verdana, Arial',
                        axisLabelPadding: 6
                    },
                    legend: {
                        labelBoxBorderColor: "#fff"
                    },
                    grid: {
                        backgroundColor: "#ffffff",
                        tickColor: "#c8daea"
                    }
                };

                GetData();

                dataset = [{ label: "", data: data, color: "#167edc" }];
                $.plot($(".realtime_chart"), dataset, options);

                function update() {
                    GetData();
                    $.plot($(".realtime_chart"), dataset, options)
                    setTimeout(update, updateInterval);
                }
                update();

            } catch (e) { }

        });
        container.find(".sparkline_chart").each(function () {
            try {

                var obj = $(this);
                var barwidth = obj.data('barwidth');
                if ($(window).width() < 1440) {
                    barwidth = "20px";
                }
                $.each(obj, function () {
                    obj.sparkline('html', {
                        type: 'bar',
                        disableHiddenCheck: true,
                        height: obj.data('height'),
                        width: obj.data('width'),
                        barColor: getcolor(obj.data('barcolor')),
                        negBarColor: getcolor(obj.data('negbarcolor')),
                        zeroColor: getcolor(obj.data('zerocolor')),
                        barWidth: obj.data('barwidth'),
                        barSpacing: obj.data('barspacing'),
                        stackedBarColor: getcolor(obj.data('stackedbarcolor'))
                    });
                    obj.sparkline(jQuery.parseJSON(obj.attr("data-composite")), {
                        type: 'line',
                        height: obj.data('height'),
                        disableHiddenCheck: true,
                        width: obj.data('width'),
                        lineColor: getcolor(obj.data('linecolor')),
                        fillColor: getcolor(obj.data('fillcolor')),
                        spotRadius: obj.data('spotradius'),
                        lineWidth: obj.data('linewidth'),
                        spotRadius: obj.data('spotradius'),
                        spotColor: getcolor(obj.data('spotcolor')),
                        minSpotColor: getcolor(obj.data('minspotcolor')),
                        maxSpotColor: getcolor(obj.data('maxspotcolor')),
                        highlightSpotColor: getcolor(obj.data('highlightspotcolor')),
                        highlightLineColor: getcolor(obj.data('highlightlinecolor')),
                        composite: true
                    });

                });
            } catch (e) { }
        });
        container.find(".TKKDChart").each(function () {

            try {
                var target = jQuery(this).attr('data-target');
                var categories = new Array();
                var plans = new Array();
                var actuals = new Array();
                var title = jQuery(this).attr('data-title');
                var subtitle = jQuery(this).attr('data-sub-title');
                var dataChart = jQuery(this).attr('data-value');
                if (typeof dataChart != "undefined") {
                    dataChart = jQuery.parseJSON(dataChart);
                    for (var i = 0; i < dataChart.length; i++) {
                        categories.push(dataChart[i].Category);
                        plans.push(dataChart[i].Plan);
                        actuals.push(dataChart[i].Actual);
                    }

                    Highcharts.chart(target, {
                        chart: {
                            type: 'bar'
                        },
                        title: {
                            text: ''
                        },
                        subtitle: {
                            text: ''
                        },
                        xAxis: {
                            categories: categories,
                            title: {
                                text: null
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: title,
                                align: 'high'
                            },
                            labels: {
                                overflow: 'justify'
                            }
                        },
                        tooltip: {
                            valueSuffix: subtitle
                        },
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'top',
                            x: -40,
                            y: -10,
                            floating: true,
                            borderWidth: 0,
                            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0)'),
                            shadow: false,
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: 'Thực tế',
                            data: actuals,
                            color: "#ffce55"
                        }, {
                            name: 'Kế hoạch',
                            data: plans,
                            color: "#5db2ff"
                        }]
                    });
                    var actuals_color = "#5db2ff",
                        percent = 0;
                    var cIndex = 0;
                    for (var i = 0; i < dataChart.length; i++) {
                        //percent = Math.round(dataChart[i].Actual / dataChart[i].Plan * 100, 3);
                        //if (percent < 30) {
                        //    actuals_color = "#444444"; // Màu đen
                        //}
                        //else if (percent >= 30 && percent < 50) {
                        //    actuals_color = "#d43f3a"; // Màu đỏ
                        //}
                        //else if (percent >= 50 && percent < 80) {
                        //    actuals_color = "#ff9800"; // Màu cam
                        //}
                        //else if (percent >= 80 && percent < 100) {
                        //    actuals_color = "#ffeb3b"; // Màu vàng
                        //}
                        //else {
                        //    actuals_color = "#5cb85c"; // Màu xanh
                        //}
                        //jQuery("#planChart .highcharts-series-0.highcharts-bar-series rect").each(function () {
                        //    var size = jQuery("#planChart .highcharts-series-0.highcharts-bar-series rect").length;
                        //    var index = jQuery(this).index();
                        //    if (index === i) {
                        //        jQuery(this).css("fill", actuals_color);
                        //    }
                        //});
                        jQuery("#planChart .highcharts-axis-labels.highcharts-xaxis-labels text tspan").each(function () {
                            jQuery(this).html(categories[cIndex]);
                            cIndex++;
                        });
                    }

                }
            } catch (e) { }
        });
        container.find(".quyChart").each(function () {

            try {
                var dataChart = jQuery(this).attr('data-value');
                var title = jQuery(this).attr('data-title');
                var datalabel = [],
                    browserData = [],
                    versionsData = [],
                    j,
                    k,
                    drillDataLen,
                    brightness;
                if (typeof dataChart != "undefined") {
                    dataChart = jQuery.parseJSON(dataChart);
                    var total = 0;
                    for (var i = 0; i < dataChart.length; i++) {
                        total += dataChart[i].y;
                    }
                    for (var i = 0; i < dataChart.length; i++) {
                        // add browser data
                        browserData.push({
                            name: dataChart[i].drilldown.name,
                            y: dataChart[i].y,
                            percent: '',
                            plan: dataChart[i].plan,
                            color: dataChart[i].color
                        });

                        // add version data
                        var color1 = "#ccc";
                        var color2 = "#57b5e3";
                        var hide_text = "";
                        // Màu đen #444444: Tỷ lệ hoàn thành > 30%
                        // Màu đỏ #d43f3a: Tỷ lệ hoàn thành tu 30-50%
                        // Màu cam #ff9800: Tỷ lệ hoàn thành tu 50-80%
                        // Màu vàng #ffeb3b: Tỷ lệ hoàn thành tu 80-100%
                        // Màu xanh #5cb85c: Tỷ lệ hoàn thành tu 100%
                        drillDataLen = dataChart[i].drilldown.data.length;
                        for (j = 0; j < drillDataLen; j += 1) {
                            brightness = 0.2 - (j / drillDataLen) / 5;
                            if (Math.round((dataChart[i].drilldown.data[j] / dataChart[i].y * 100), 3) < 30) {
                                color2 = "#444444"; // Màu đen
                            }
                            else if (Math.round((dataChart[i].drilldown.data[j] / dataChart[i].y * 100), 3) >= 30 && Math.round((dataChart[i].drilldown.data[j] / dataChart[i].y * 100), 3) < 50) {
                                color2 = "#d43f3a"; // Màu đỏ
                            }
                            else if (Math.round((dataChart[i].drilldown.data[j] / dataChart[i].y * 100), 3) >= 50 && Math.round((dataChart[i].drilldown.data[j] / dataChart[i].y * 100), 3) < 80) {
                                color2 = "#ff9800"; // Màu cam
                            }
                            else if (Math.round((dataChart[i].drilldown.data[j] / dataChart[i].y * 100), 3) >= 80 && Math.round((dataChart[i].drilldown.data[j] / dataChart[i].y * 100), 3) < 100) {
                                color2 = "#ffeb3b"; // Màu vàng
                            }
                            else {
                                color2 = "#5cb85c"; // Màu xanh
                            }
                            versionsData.push({
                                name: j > 0 ? hide_text : dataChart[i].drilldown.categories[j],
                                y: dataChart[i].drilldown.data[j],
                                percent: j > 0 ? hide_text : dataChart[i].drilldown.money_data[j] / dataChart[i].plan * 100,
                                color: j % 2 == 0 ? color2 : color1

                            });
                        }
                    }
                }
                Highcharts.chart('QuyChartcontainer', {
                    chart: {
                        type: 'pie'
                    },
                    title: {
                        text: title
                    },
                    subtitle: {
                        text: ''
                    },
                    yAxis: {
                        title: {
                            text: ''
                        }
                    },
                    plotOptions: {
                        pie: {
                            shadow: false,
                            center: ['50%', '50%'],
                            borderWidth: 3

                        }
                    },
                    tooltip: {
                        useHTML: true,
                        formatter: function () {
                            return this.point.percent > 0 ? '' + this.point.name + '<br/><b>' + this.point.percent.toFixed(2) + '%</b>' : this.point.name != "" ? this.point.name : false;
                        }
                        //valueSuffix: '%'
                    },
                    series: [{
                        name: ' ',
                        data: browserData,
                        size: '60%',
                        dataLabels: {
                            formatter: function () {
                                return this.point.plan > 0 ? this.point.plan + ' tỷ' : null;
                            },
                            color: '#ffffff',
                            distance: -30
                        }
                    }, {
                        name: ' ',
                        data: versionsData,
                        size: '80%',
                        innerSize: '60%',
                        dataLabels: {
                            formatter: function () {
                                // display only if larger than 1
                                return this.point.percent > 0 ? '<b>' + this.point.name + ':</b> ' +
                                    this.point.percent.toFixed(2) + '%' : null;
                            }
                        },
                        id: 'versions'
                    }],
                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 400
                            },
                            chartOptions: {
                                series: [{
                                    id: 'versions',
                                    dataLabels: {
                                        enabled: false
                                    }
                                }]
                            }
                        }]
                    }
                });
                //Legend
                var legendHTML = "";
                for (var i = 0; i < dataChart.length; i++) {
                    legendHTML += "<div class='Legend_item'><span style='display:inline-block;width:20px;background-color:" + dataChart[i].color + ";'>&nbsp;</span> " + dataChart[i].drilldown.name + "</div>";
                }
                if (jQuery(this).next(".DocproChart_legend").length != 0) { jQuery(this).next(".DocproChart_legend").remove(); }
                jQuery(this).after('<div class="DocproChart_legend">' + legendHTML + '</div>');

            } catch (e) { }
        });
        container.find(".main-chart").each(function () {

            try {
                var target = $(this).attr("data-target");
                var dataStacking = $(this).attr("data-stacking");
                var datas = jQuery.parseJSON($("#" + target).attr("data-categories"));
                Highcharts.chart(target, {
                    chart: {
                        type: 'column',
                        style: {
                            fontFamily: 'sans-serif'
                        }
                    },

                    title: {
                        text: datas.text,
                        style: {
                            fontFamily: 'Segoe UI',
                            fontSize: '14px',
                            color: '#444',
                            fontWeight: '400 !important',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                        }
                    },

                    xAxis: {
                        categories: datas.categories,
                        crosshair: true,
                    },

                    yAxis: {
                        allowDecimals: false,
                        min: 0,
                        title: {
                            text: '',
                            style: {
                                fontFamily: 'Segoe UI',
                                fontSize: '13px',
                                color: '#444',
                                fontWeight: '400 !important',
                                textAlign: 'center',
                                // textTransform: 'uppercase',
                            }
                        },
                    },
                    tooltip: {
                        shared: true,
                        useHTML: true,
                        formatter: function () {
                            if (dataStacking != "false") {
                                var points = '<table class="tip"><caption><b style="color: #222">' + this.x + '</b></caption>'
                                    + '<tbody>';
                                $.each(this.points, function (i, point) {
                                    points += '<tr><td><i class="fa fa-circle" aria-hidden="true" style="color: ' + point.series.color + '"></i> ' + point.series.name + ': </td>'
                                        + '<td style="text-align: right"><b>' + point.y + '</b></td></tr>'
                                });
                                points += '<tr><td>Tổng: </td>'
                                    + '<td style="text-align:right"><b>' + this.points[0].total + '</b></td></tr>'
                                    + '</tbody></table>';
                                return points;

                            } else {
                                var points = '<table class="tip"><caption><b>' + this.x + '</b></caption>'
                                    + '<tbody>';
                                $.each(this.points, function (i, point) {
                                    points += '<tr><td><i class="fa fa-circle" aria-hidden="true" style="color: ' + point.series.color + '"></i> ' + point.series.name + ': </td>'
                                        + '<td style="text-align: right"><b>' + point.y + '</b></td></tr>'
                                });
                                points += '</tbody></table>';
                                return points;

                            }
                        }
                    },
                    plotOptions: {
                        column: {
                            stacking: dataStacking == "false" ? false : "normal"
                        },
                        series: {
                            pointWidth: dataStacking == "false" ? null : 30
                        }
                    },
                    series: datas.series
                });
            } catch (e) { }

        });
        container.find(".areaspline-chart").each(function () {

            try {
                var target = $(this).attr("data-target");
                var mdata = jQuery.parseJSON($(this).children("#" + target).attr("data-value"));
                Highcharts.chart(target, {
                    chart: {
                        type: 'areaspline'
                    },
                    title: {
                        text: mdata.title
                    },
                    legend: {
                        enabled: false
                    },
                    xAxis: {
                        categories: mdata.categories
                    },
                    yAxis: {
                        title: {
                            text: ''
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    //tooltip: {
                    //    shared: true,
                    //    valueSuffix: ''
                    //},
                    credits: {
                        enabled: false
                    },
                    exporting: {
                        "enabled": false
                    },
                    plotOptions: {
                        areaspline: {
                            fillOpacity: 0.5
                        }
                    },
                    series: [{
                        name: mdata.label,
                        data: mdata.data
                    }]
                });

            } catch (e) { }

        });

        container.find(".realPer").each(function () {
            try {
                var useDemoData = jQuery(this).attr('data-demo');
                var dataChart;
                if (useDemoData == "true") {
                    dataChart = chart_custom_drilldown;
                } else {
                    dataChart = jQuery(this).attr('data-value');
                    dataChart = jQuery.parseJSON(dataChart);
                }
                var title = jQuery(this).attr('data-title');
                var target = jQuery(this).attr('data-target');
                var theme = jQuery(this).attr('data-theme');
                var bgColor,
                    labelColor;
                if (theme == "dark-transparent") {
                    bgColor = "transparent";
                    labelColor = "#fff";
                } else if (theme == "dark") {
                    bgColor = "#212121";
                    labelColor = "#fff";
                } else if (theme == "light-transparent") {
                    bgColor = "transparent";
                    labelColor = "#212121";
                } else {
                    bgColor = "transparent";
                    labelColor = "#fff";
                }
                var datalabel = [],
                    browserData = [],
                    versionsData = [],
                    j,
                    k,
                    drillDataLen,
                    brightness;
                if (typeof dataChart != "undefined") {

                    var total = 0;
                    for (var i = 0; i < dataChart.length; i++) {
                        total += dataChart[i].y;
                    }
                    for (var i = 0; i < dataChart.length; i++) {
                        // add browser data
                        browserData.push({
                            name: dataChart[i].drilldown.name,
                            y: dataChart[i].y,
                            percent: (dataChart[i].y / total * 100).toFixed(2),
                            plan: dataChart[i].plan,
                            color: dataChart[i].color
                        });

                        // add version data
                        var color1 = "#ccc";
                        var color2 = "#57b5e3";
                        var hide_text = '';
                        //Mau den #444444: Hoan thanh > 30%
                        //Mau do #d43f3a: Hoan thanh tu 30-50%
                        //Mau cam #ffc107: Hoan thanh tu 50-80%
                        //Mau vang #ffeb3b: Hoan thanh tu 80-100%
                        //Mau xanh #5cb85c: Hoan thanh tu 100%
                        drillDataLen = dataChart[i].drilldown.data.length;
                        var per = Math.round((dataChart[i].drilldown.data[j] / dataChart[i].y * 100), 3);
                        for (j = 0; j < drillDataLen; j += 1) {

                            brightness = 0.2 - (j / drillDataLen) / 5;
                            if (per < 30) {
                                color2 = "#444444"; //Mau den
                            } else if (per >= 30 && per < 50) {
                                color2 = "#d43f3a"; //Mau do
                            } else if (per >= 50 && per < 80) {
                                color2 = "#ff9800"; //Mau cam
                            } else if (per >= 80 && per < 100) {
                                color2 = "#ffeb3b"; //Mau vang
                            } else {
                                color2 = "#5cb85c"; //Mau xanh
                            }
                            versionsData.push({
                                name: j > 0 ? hide_text : dataChart[i].drilldown.categories[j],
                                y: dataChart[i].drilldown.data[j],
                                percent: j > 0 ? hide_text : (dataChart[i].drilldown.data[j] / dataChart[i].y * 100).toFixed(2),
                                color: j % 2 == 0 ? color2 : color1

                            });
                        }

                    }
                }
                Highcharts.chart(target, {
                    chart: {
                        type: 'pie',
                        backgroundColor: bgColor
                    },
                    exporting: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: title
                    },
                    subtitle: {
                        text: ''
                    },
                    yAxis: {
                        title: {
                            text: ''
                        }
                    },
                    plotOptions: {
                        series: {
                            dataLabels: {
                                style: {
                                    color: labelColor,
                                    textOutline: "0px 0px contrast"
                                },
                                enabled: true
                            }
                        },
                        pie: {
                            shadow: false,
                            center: ['50%', '50%'],
                            borderWidth: 2
                        }
                    },
                    tooltip: {
                        formatter: function () {
                            return this.point.percent > 0 ? '' + this.point.name + '<br/><b>' + this.point.percent + '%</b>' : false;
                        },
                        hideDelay: 50
                        //valueSuffix: '%'
                    },
                    series: [{
                        name: '',
                        data: browserData,
                        size: '60%',
                        dataLabels: {
                            formatter: function () {
                                return this.y > 5 ? this.point.percent + '%' : null;
                            },
                            color: labelColor,
                            distance: -40
                        }
                    }, {
                        name: '',
                        data: versionsData,
                        size: '80%',
                        innerSize: '60%',
                        dataLabels: {
                            formatter: function () {
                                // display only if larger than 1
                                return this.point.percent > 0 ? '<b>' + this.point.name + ':</b> ' +
                                    this.point.percent + '%' : null;
                            }
                        },
                        id: 'versions'
                    }],
                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 400
                            },
                            chartOptions: {
                                series: [{
                                    id: 'versions',
                                    dataLabels: {
                                        enabled: false
                                    }
                                }]
                            }
                        }]
                    }
                });
                //Legend
                var legendHTML = "";
                for (var i = 0; i < dataChart.length; i++) {
                    legendHTML += "<div class='legend-item'><span class='legend-dot' style='display:inline-block;width:20px;background-color:" + dataChart[i].color + ";'>&nbsp;</span><span class='legend-title'>" + dataChart[i].drilldown.name + "</span></div>";
                }
                if (jQuery(this).next(".ce-chart-legend").length != 0) { jQuery(this).next(".ce-chart-legend").remove(); }
                jQuery(this).after('<div class="ce-chart-legend">' + legendHTML + '</div>');


            } catch (e) {
                console.log(e);
            }
        });
        container.find(".hight-pie-chart").each(function () {

            try {
                var datas = JSON.parse($(this).attr('data-value'));
                var title = $(this).attr('data-title');
                var id = $(this).attr('id');
                var height = $(this).attr('data-height');
                if (height == '')
                    height = '900px'
                var pieColors = datas.colors;
                // Build the chart
                Highcharts.chart(id, {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: title,
                        type: 'column'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
                        // pointFormat: '<b>{point.percentage:.2f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '{point.percentage:.2f} %',
                                distance: -50,
                                filter: {
                                    property: 'percentage',
                                    operator: '>',
                                    value: 4
                                }
                            },
                            showInLegend: true
                        }
                    },
                    legend: {
                        alignColumns: false,
                        maxHeight: 60
                    },
                    series: [{
                        colorByPoint: true,
                        name: 'Tỉ lệ',
                        data: datas.data,
                    }]
                });
            } catch (e) {
            }
        });
        container.find(".QLHT-chart").each(function () {
            try {

                var datas = JSON.parse($(this).attr('data-value'));
                var id = $(this).attr('id');
                var title = $(this).attr('data-title');
                var height = $(this).attr('data-height');
                if (height == '')
                    height = '900px'
                var pieColors = datas.colors;
                // Build the chart
                Highcharts.chart(id, {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: title
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        categories: datas.categories,
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: datas.ykey
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: [
                        {
                            name: datas.label,
                            data: datas.data,//[49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
                        }
                    ]
                });


            } catch (e) {
                console.log(e);
            }
        });

        container.find(".QLTL-LTL-chart").each(function () {

            try {

                var data = JSON.parse($(this).attr('data-value'));
                var title = $(this).attr('data-title');
                var id = $(this).attr('id');
                // Build the chart
                Highcharts.chart(id, {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie',
                        height: '450px'
                    },
                    title: {
                        text: title
                    },
                    tooltip: {
                        pointFormat: '<b>{point.percentage:.2f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '{point.percentage:.2f} %',
                                distance: -50,
                                filter: {
                                    property: 'percentage',
                                    operator: '>',
                                    value: 4
                                }
                            },
                            showInLegend: true
                        }
                    },
                    legend: {
                        alignColumns: false,
                        maxHeight: 60
                    },
                    series: [{
                        name: 'Brands',
                        colorByPoint: true,

                        data: data
                    }]
                });


            } catch (e) {
                console.log(e);
            }
        });
        container.find(".QLTL-DL-chart").each(function () {

            try {

                var data = JSON.parse($(this).attr('data-value'));
                var title = $(this).attr('data-title');
                var id = $(this).attr('id');
                // Build the chart
                Highcharts.chart(id, {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: title
                    },
                    tooltip: {
                        pointFormat: '<b>{point.percentage:.2f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '{point.percentage:.2f} %',
                                distance: -50,
                                filter: {
                                    property: 'percentage',
                                    operator: '>',
                                    value: 4
                                }
                            },
                            showInLegend: true
                        }
                    },
                    series: [{
                        name: 'Brands',
                        colorByPoint: true,
                        data: data
                    }]
                });


            } catch (e) {
                console.log(e);
            }
        });
        container.find(".QLTL-NDDL-chart").each(function () {

            try {

                var datas = JSON.parse($(this).attr('data-value'));
                var id = $(this).attr('id');
                var title = $(this).attr('data-title');
                // Build the chart
                Highcharts.chart(id, {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: title//'THỐNG KÊ NGƯỜI DÙNG/DUNG LƯỢNG'
                    },
                    xAxis: {
                        categories: datas.categories// ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Bốn', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai']
                    },
                    yAxis: {
                        title: {
                            text: ''
                        }
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true
                            },
                            enableMouseTracking: false
                        }
                    },
                    series: datas.series
                    //    [{
                    //    name: 'Dung lượng',
                    //    data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                    //}, {
                    //    name: 'Người sử dụng',
                    //    data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                    //}]
                });


            } catch (e) {
                console.log(e);
            }
        });

    },
    onEvent: function () {

        jQuery(document).on("click", ".close-flash", function () {
            jQuery(this).closest(".flash").fadeOut("fast");
            jQuery(this).closest(".flash").remove();
            Utils.flash_position();
        });
        jQuery(document).on("click", ".closeDialog", function () {
            Utils.closeOverlay(true);
        });
        jQuery(document).on("click", ".deleteItem", function () {
            jQuery(this).closest(".item").remove();
        });
        jQuery(document).on("click", ".openDialog", function () {
            var data = jQuery(this).getData();
            var dialoger = jQuery(data.target);
            var maxH = jQuery(window).height();
            if (!dialoger.hasClass("ui-dialog-content")) {
                jQuery(".ui-dialog[aria-describedby='" + dialoger.attr("id") + "']").remove();
            }
            var data_with = 600;
            if (data.width != null && data.width != "") {
                data_with = data.width;
            }
            dialoger.dialog({
                width: data.width,
                resizable: false,
                open: function () {
                    if (maxH < dialoger.height()) {
                        dialoger.css("height", maxH - 50);
                    }
                    if (typeof data.formTarget != 'undefined') {
                        dialoger.attr("data-target", data.formTarget);
                    }
                    if (typeof data.formInsertType != 'undefined') {
                        dialoger.attr("data-insert-type", data.formInsertType);
                    }
                    if (typeof data.formClass != 'undefined') {
                        dialoger.addClass(data.formClass);
                    }
                    if (dialoger.hasClass("uhf50d")) {
                        dialoger.closest(".ui-dialog").addClass("hf50d");
                    }
                    if (dialoger.hasClass("bootstrapValidator")) {
                        dialoger
                            .bootstrapValidator('disableSubmitButtons', false)
                            .bootstrapValidator('resetForm', true);
                        dialoger.reset();

                        if (dialoger.hasClass("quickSubmit") && dialoger.hasClass("bootstrapValidator")) {
                            dialoger.removeClass("bootstrapValidator").bootstrapValidator('destroy');
                            dialoger.unbind();
                        }
                    }

                    Utils.openOverlay();
                    Utils.updateFormState(dialoger);
                    Utils.updateScrollBar(dialoger);
                    Autocomplete.init(dialoger);

                    if (typeof data.id != 'undefined') {
                        dialoger.find("input[name='ID']").val(data.id);
                    }
                    if (typeof data.parentId != 'undefined') {
                        dialoger.find("input[name='Parent']").val(data.parentId);
                    }
                    if (typeof data.parentName != 'undefined') {
                        dialoger.find("input[name='ParentName']").val(data.parentName);
                    }
                },
                close: function () {
                    Utils.closeOverlay();
                }
            });
            return false;
        });
        jQuery(document).on("click", ".clickViewer", function () {
            var data = jQuery(this).getDataUppername();
            if (jQuery(this).hasClass("tabOpen")) {
                jQuery("[href='" + data.TabOpen + "']").trigger("click");
            }

            Utils.viewer(data);
            return false;
        });
        jQuery(document).on('change', '.tickAllFormGroup', function () {
            var checked = jQuery(this).is(":checked");
            jQuery(this).closest(".form-group").find(".tickItem").each(function () {
                if (!jQuery(this).prop("disabled"))
                    jQuery(this).prop("checked", checked);
            });
        });
        jQuery(document).on('change', '.tickAll', function () {
            var checked = jQuery(this).is(":checked");
            jQuery(this).closest(".tickGroup").find(".tickItem, .tickKey").each(function () {
                if (!jQuery(this).prop("disabled"))
                    jQuery(this).prop("checked", checked);
            });
        });
        //jQuery(document).on('change', '.group-checkable', function () {

        //    var table = jQuery(this).closest("table");
        //    var set = table.find(".checkboxes");
        //    var checked = jQuery(this).is(":checked");
        //    jQuery(set).each(function () {
        //        if (checked) {
        //            jQuery(this).prop("checked", true);
        //            jQuery(this).closest('tr').addClass("active");
        //        } else {
        //            jQuery(this).prop("checked", false);
        //            jQuery(this).closest('tr').removeClass("active");
        //        }
        //    });
        //    Utils.toggleMultiTicks(table);
        //});
        //jQuery(document).on('change', '.checkboxes', function () {
        //    jQuery(this).closest('tr').toggleClass("active");
        //    Utils.toggleMultiTicks(jQuery(this).closest('table'));
        //});
        jQuery(document).on('change', '.group-checkable', function () {
            var table = jQuery(this).closest("table, ._main--page");
            var set = table.find(".checkboxes");
            var checked = jQuery(this).is(":checked");
            jQuery(set).each(function () {
                if (checked) {
                    jQuery(this).prop("checked", true);
                    jQuery(this).closest('tr').addClass("active");
                } else {
                    jQuery(this).prop("checked", false);
                    jQuery(this).closest('tr').removeClass("active");
                }
            });
            Utils.toggleMultiTicks(table);
        });
        jQuery(document).on('change', '.checkboxes', function () {
            jQuery(this).closest('tr, .tr-item').toggleClass("active");
            Utils.toggleMultiTicks(jQuery(this).closest('table, .table'));
        });
        $(document).on("change", ".checkboxes", function () {
            var chk = $(this);
            var table = chk.closest("table,.table");
            var wrapper = table.closest(".dataTables_wrapper");
            var actions = wrapper.find(".actMultiTicks");
            var chkAll = table.find(".group-checkable");
            var checkedAll = true;
            if (chk.prop("checked")) {
                table.find(".checkboxes").each(function () {
                    if (!$(this).prop("checked") && !$(this).prop('disabled')) {
                        actions.removeClass("hidden");
                        checkedAll = false;
                        return;
                    }
                });
                if (checkedAll)
                    chkAll.prop("checked", true);
            } else {
                chkAll.prop("checked", false);
            }
        });
        jQuery(document).on("change", ".changeRel", function () {
            var v = jQuery(this).prop("checked") ? 1 : 0;
            var data = jQuery(this).getDataUppername();
            jQuery(data.Rel).val(v);
            if (typeof data.RelVisible != 'undefined') {
                var dataOptions = jQuery(this).find("option:selected").getDataUppername();
                if (dataOptions.IsVisible.toLowerCase() == "true") {
                    jQuery(data.RelVisible).removeClass("hidden")
                } else {
                    jQuery(data.RelVisible).addClass("hidden")
                }
            }
        });
        jQuery(".changeRel").trigger("change");

        jQuery(document).on("change", ".fieldRadio", function () {
            var obj = jQuery(this);
            if (obj.prop("checked")) {
                var data = obj.getDataUppername();
                obj.closest("form").find(".fieldRadio").each(function () {
                    if (obj.attr("name") != jQuery(this).attr("name")) {
                        if (data.Label == jQuery(this).attr("data-label")) {
                            jQuery(this).prop("checked", false);
                        }
                    }
                });
            }
        });
        jQuery(document).on("keydown", ".pressSubmit", function (e) {
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key === 13) {
                try {
                    jQuery(this).closest("form").trigger("submit");
                } catch (ex) {
                }
                return false;
            }
            return true;
        });
        jQuery(document).on("submit", ".quickSearch", function () {
            try {
                var form = jQuery(this);
                var url = form.attr("action");
                var target = form.attr("data-target");
                var data = Utils.getSerialize(form);
                if (Utils.isEmpty(url)) {
                    return;
                }

                jQuery.ajax({
                    type: "POST",
                    async: true,
                    url: url,
                    data: data,
                    beforeSend: function () {
                        jQuery(target).addClass("loading").html("");
                    },
                    complete: function () {
                        jQuery(target).removeClass("loading");
                    },
                    error: function () {
                        jQuery(target).removeClass("loading");
                    },
                    success: function (response) {
                        try {
                            window.history.pushState(null, response.title, url + Utils.builderQString(data));
                            jQuery(document).prop("title", response.title);
                        } catch (e) {
                            console.log(e);
                        }

                        Utils.sectionBuilder(response);
                        if (response.hasOwnProperty("isCust")) {
                            jQuery(target).html(response.htCust);
                        }

                        Utils.updateInputDate(jQuery(target));
                        Utils.updateFormState(jQuery(target));
                        Utils.updateScrollBar(jQuery(target));
                        Autocomplete.init(jQuery(target));
                        Main.upEvent();
                    }
                });
            } catch (e) {

            }
            return false;
        });
        jQuery(document).on("submit", ".quickSubmit", function (e) {
            e.preventDefault();
            try {
                var form = jQuery(this);
                if (!form.hasClass("submiting")) {
                    form.addClass("submiting");

                    var url = form.attr("action");
                    var target = form.attr("data-target");
                    var targetDelete = form.attr("data-target-delete");
                    var type = form.attr("data-insert-type");
                    var data = Utils.getSerialize(form);
                    if (Utils.isEmpty(url)) {
                        form.removeClass("submiting");
                        return false;
                    }
                    if (!Utils.validateDataForm(form)) {
                        form.removeClass("submiting");
                        return false;
                    }
                    if (!form.hasClass("bootstrapValidator")) {
                        form.addClass("bootstrapValidator").bootstrapValidator();
                    }
                    var bootstrapValidator = form.data('bootstrapValidator');
                    bootstrapValidator.validate();
                    if (!bootstrapValidator.isValid()) {
                        jQuery(this).unbind();
                        form.removeClass("submiting");
                        return false;
                    }
                    jQuery.ajax({
                        type: "POST",
                        async: true,
                        url: url,
                        data: data,
                        beforeSend: function () {
                        },
                        complete: function () {
                            form.removeClass("submiting");
                        },
                        error: function () {
                        },
                        success: function (response) {

                            form.removeClass("submiting");
                            Utils.sectionBuilder(response);
                            if (response.hasOwnProperty("isCust")) {
                                if (type == "append") {
                                    jQuery(target).append(response.htCust);
                                }
                                else if (type == "prepend") {
                                    jQuery(target).prepend(response.htCust);
                                }
                                else if (type == "replaceWith") {
                                    jQuery(target).replaceWith(response.htCust);
                                }
                                else {
                                    jQuery(target).html(response.htCust);
                                }
                            }

                            Utils.updateInputDate(jQuery(target));
                            Utils.updateFormState(jQuery(target));
                            Utils.updateScrollBar(jQuery(target));
                            Autocomplete.init(jQuery(target));
                            Main.upEvent(jQuery(target));

                            if (!Utils.isEmpty(targetDelete)) {
                                jQuery(targetDelete).fadeOut("fast", function () {
                                    jQuery(this).remove();
                                });
                            }
                            if (form.hasClass("closeOnSubmit")) {
                                Utils.closeOverlay(true);
                            }
                            if (form.hasClass("reloadOnSuccess")) {
                                location.reload();
                            }
                            form.reset();
                            form.find("[type='submit']").prop("disabled", false);
                        }
                    });
                }
            } catch (e) {
            }
            return false;
        });
        jQuery(document).on("click", ".quickMore", function () {
            try {
                var node = jQuery(this);
                var data = jQuery(this).getDataUppername();
                if (typeof data.Skip == 'undefined') {
                    data.Skip = 0;
                }
                if (typeof data.Take == 'undefined') {
                    data.Take = 10;
                }
                data.Skip = parseInt(data.Skip) + parseInt(data.Take);

                var target = data.Target;
                var type = data.InsertType;
                var url = node.attr("href").replace("#", "");
                if (Utils.isEmpty(url)) {
                    return;
                }
                jQuery.ajax({
                    type: "POST",
                    async: true,
                    url: url,
                    data: data,
                    beforeSend: function () {
                        node.addClass("loading");
                    },
                    complete: function () {
                        node.removeClass("loading");
                    },
                    error: function () {
                        node.removeClass("loading");
                    },
                    success: function (response) {
                        Utils.sectionBuilder(response);
                        if (response.hasOwnProperty("isCust")) {
                            if (type == "prepend") {
                                jQuery(target).prepend(response.htCust);
                            }
                            else {
                                jQuery(target).append(response.htCust);
                            }
                        }
                        node.attr("data-skip", data.Skip);
                        node.attr("data-take", data.Take);
                        if (response.htCust == "" || jQuery(response.htCust).find(".itemMore").length < data.Take) {
                            node.addClass("hidden")
                        }
                    }
                });
            } catch (e) {

            }
            return false;
        });
        jQuery(document).on("click", ".quickLike", function () {
            try {
                var node = jQuery(this);
                var data = jQuery(this).getDataUppername();
                var target = data.Target;
                jQuery.ajax({
                    type: "POST",
                    async: true,
                    url: node.attr("href"),
                    data: data,
                    beforeSend: function () {
                        node.addClass("loading");
                    },
                    complete: function () {
                        node.removeClass("loading");
                    },
                    error: function () {
                        node.removeClass("loading");
                    },
                    success: function (response) {
                        Utils.sectionBuilder(response);
                        node.toggleClass("active");
                        if (response.hasOwnProperty("isCust")) {
                            jQuery(target).html(response.htCust);
                        }
                    }
                });
            } catch (e) {

            }
            return false;
        });

        jQuery(document).on("click", ".quickView", function () {
            try {
                var node = jQuery(this);
                var url = node.attr("href").replace("#", "");
                var target = node.attr("data-target");
                if (Utils.isEmpty(url)) {
                    return;
                }
                if (window.history.pushState) {
                    jQuery.ajax({
                        type: "POST",
                        async: true,
                        url: url,
                        data: { RedirectPath: Utils.getRedirect() },
                        beforeSend: function () {
                            jQuery(target).addClass("loading").html("");
                        },
                        complete: function () {
                            jQuery(target).removeClass("loading");
                        },
                        error: function () {
                            jQuery(target).removeClass("loading");
                        },
                        success: function (response) {
                            window.history.pushState(null, response.title, url);
                            jQuery(document).prop("title", response.title);

                            Utils.sectionBuilder(response);
                            if (response.hasOwnProperty("isCust")) {
                                jQuery(target).html(response.htCust);
                            }

                            Utils.updatePDFViewer(response);
                            Utils.updateChart(jQuery(target));
                            Utils.updateInputDate(jQuery(target));
                            Utils.updateFormState(jQuery(target));
                            Utils.updateScrollBar(jQuery(target));
                            Autocomplete.init(jQuery(target));
                            Main.upEvent();
                            Main.backLink();

                            //window.webViewerLoad(true);
                            //jQuery("#viewerContainer").scrollTop(0);
                            Cust.fileViewer_height_fn();
                            //Cust.prev_next_group_button();
                            Cust.Scroll_table();
                            Cust.Scroll_tab_group();
                            Cust.Table_sort();
                            Cust.dataTables_filter_col(); //Responsive dataTables_filter Col
                        }
                    });
                } else {
                    window.location.href = url;
                }
            } catch (e) {

            }
            return false;
        });
        jQuery(document).on("click", ".quickUpdate", function () {
            try {
                var obj = jQuery(this);
                var target = jQuery(this).attr("data-target");
                var data = obj.getDataUppername();
                jQuery.ajax({
                    type: "POST",
                    async: true,
                    url: jQuery(this).attr("href"),
                    data: data,
                    beforeSend: function () {
                        if (!obj.hasClass("not-overlay")) {
                            Utils.openOverlay();
                        }
                    },
                    complete: function () {
                        if (!obj.hasClass("not-overlay")) {
                            Utils.openOverlay();
                        }
                    },
                    error: function () {
                        if (!obj.hasClass("not-overlay")) {
                            Utils.openOverlay();
                        }
                    },
                    success: function (response) {
                        Utils.sectionBuilder(response);
                        if (response.hasOwnProperty("isCust")) {
                            Utils.closeOverlay();
                            jQuery(target).html(response.htCust);
                        }
                        Utils.updateTab(jQuery(target));
                        Utils.updateInputDate(jQuery(target));
                        Utils.updateFormState(jQuery(target));
                        Utils.updateScrollBar(jQuery(target));
                        Autocomplete.init(jQuery(target));
                        Main.upEvent();
                        Cust.check_required_input();

                        if (obj.hasClass("reloadOnSuccess")) {
                            location.reload();
                        }
                    }
                });
            } catch (e) {

            }
            return false;
        });

        jQuery(document).on("click", ".quickAppend", function () {
            try {
                var obj = jQuery(this);
                var target = jQuery(this)
                    .attr("data-target");
                jQuery.ajax({
                    type: "POST",
                    async: true,
                    url: jQuery(this).attr("href"),
                    beforeSend: function () {
                        if (!obj.hasClass("not-overlay")) {
                            Utils.openOverlay();
                        }
                    },
                    complete: function () {
                        if (!obj.hasClass("not-overlay")) {
                            Utils.openOverlay();
                        }
                    },
                    error: function () {
                        if (!obj.hasClass("not-overlay")) {
                            Utils.openOverlay();
                        }
                    },
                    success: function (response) {
                        Utils.sectionBuilder(response);
                        if (response.hasOwnProperty("isCust")) {
                            Utils.closeOverlay();
                            jQuery(target).append(response.htCust);
                        }
                        Utils.updateTab(jQuery(target));
                        Utils.updateInputDate(jQuery(target));
                        Utils.updateFormState(jQuery(target));
                        Utils.updateScrollBar(jQuery(target));
                        Autocomplete.init(jQuery(target));
                        Main.upEvent();
                    }
                });
            } catch (e) {

            }
            return false;
        });
        jQuery(document).on("click", ".quickDelete", function () {
            try {
                var data = jQuery(this).getDataUppername();
                if (typeof data.RedirectPath == "undefined")
                    data.RedirectPath = Utils.getRedirect();

                jQuery.ajax({
                    type: "POST",
                    async: true,
                    url: jQuery(this).attr("href"),
                    data: data,
                    beforeSend: function () {
                        Utils.openOverlay();
                    },
                    complete: function () {
                        Utils.openOverlay();
                    },
                    error: function () {
                        Utils.openOverlay();
                    },
                    success: function (response) {
                        Utils.sectionBuilder(response);
                        if (response.hasOwnProperty("isCust")) {
                            Utils.closeOverlay();
                            jQuery(data.Target).html(response.htCust);
                        }
                        if (!Utils.isEmpty(data.TargetDeleteClick)) {
                            jQuery(data.TargetDeleteClick).fadeOut("fast", function () {
                                jQuery(this).remove();
                            });
                        }
                        Utils.updateFormState(jQuery(data.Target));
                        Utils.updateScrollBar(jQuery(data.Target));
                    }
                });
            } catch (e) {

            }
            return false;
        });
        jQuery(document).on("click", ".quickDeletes, .quickConfirms", function () {
            try {
                var target = jQuery(this).attr("data-target");
                var href = jQuery(this).attr("data-href");
                var table = jQuery(this).closest(".dataTables_wrapper").find("table:not(.small-only), div.table");

                var ids = [];
                var idFiles = [];
                table.find(".checkboxes").each(function () {
                    if (jQuery(this).prop("checked")) {
                        var id = jQuery(this).attr("data-id");
                        var idFile = jQuery(this).attr("data-id-file");
                        if (Utils.isInteger(id))
                            ids.push(id);
                        if (!Utils.isEmpty(idFile))
                            idFiles.push(idFile);
                    }
                });
                jQuery.ajax({
                    type: "POST",
                    async: true,
                    url: href,
                    data: { ID: ids, IDFile: idFiles, RedirectPath: Utils.getRedirect() },
                    beforeSend: function () {
                        Utils.openOverlay();
                    },
                    complete: function () {
                        Utils.openOverlay();
                    },
                    error: function () {
                        Utils.openOverlay();
                    },
                    success: function (response) {
                        Utils.sectionBuilder(response);
                        if (response.hasOwnProperty("isCust")) {
                            Utils.closeOverlay();
                            jQuery(target).html(response.htCust);
                        }
                        Utils.updateFormState(jQuery(target));
                        Utils.updateScrollBar(jQuery(target));
                    }
                });
            } catch (e) {

            }
            return false;
        });
        jQuery(document).on("submit", ".quickCmt", function (e) {
            try {
                var form = jQuery(this);
                var attrs = jQuery(this).getDataUppername();
                var container = form.closest(".container-cmts");
                var target = container.find(".cmts").first();
                var data = Utils.getSerialize(form);
                if (Utils.isEmpty(data.Body))
                    return false;

                jQuery.ajax({
                    type: "POST",
                    async: true,
                    url: form.attr("action"),
                    data: data,
                    beforeSend: function () {
                    },
                    complete: function () {
                        form.reset();
                    },
                    error: function () {
                    },
                    success: function (response) {
                        Utils.sectionBuilder(response);
                        if (response.hasOwnProperty("isCust")) {
                            Utils.closeOverlay();
                            jQuery(target).append(response.htCust);
                            var dataInc = jQuery(attrs.IncTarget).getData();

                            var v = parseInt(dataInc.value) + 1;
                            jQuery(attrs.IncTarget).attr("data-value", v).val(v);
                        }
                        Utils.updateFormState(jQuery(target));
                        Utils.updateScrollBar(jQuery(target));
                        jQuery(target).scrollTop(jQuery(target).scrollHeight());
                    }
                });
            } catch (e) {
                console.log(e);
            }

            return false;
        });

        jQuery(document).on("click", ".nextChart", function () {

            var chartViewer = jQuery(this).closest(".chartViewer");
            var chart = chartViewer.highcharts();
            var data = chartViewer.getData();
            var from = parseInt(data.from);
            var to = parseInt(data.to);
            var max = parseInt(data.max);
            var step = parseInt(data.step);

            chart.xAxis[0].setExtremes(from + step, to + step);
            chartViewer.attr("data-from", from + step);
            chartViewer.attr("data-to", to + step);

            if (to + step >= max) {
                chartViewer.find(".nextChart").addClass("hidden");
            } else {
                chartViewer.find(".nextChart").removeClass("hidden");
            }
        });

        jQuery(document).on("click", ".prevChart", function () {
            var chartViewer = jQuery(this).closest(".chartViewer");
            var chart = chartViewer.highcharts();
            var data = chartViewer.getData();
            var from = parseInt(data.from);
            var to = parseInt(data.to);
            var max = parseInt(data.max);
            var step = parseInt(data.step);

            chart.xAxis[0].setExtremes(from - step, to - step);
            chartViewer.attr("data-from", from - step);
            chartViewer.attr("data-to", to - step);

            if (to - step >= max) {
                chartViewer.find(".nextChart").addClass("hidden");
            } else {
                chartViewer.find(".nextChart").removeClass("hidden");
            }
        });

        jQuery(document).on("keydown", ".txtNumberOfPageCustom", function (e) {
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key === 13) {
                var np = jQuery(this).val();
                if (!Utils.isInteger(np) || parseInt(np) < 1) {
                    return false;
                }
                else {
                    var href = (jQuery(this).attr("data-href") + "&page=" + jQuery(this).val()).replace('&&', '&').replace('?&', '?');
                    window.location.href = href.replace('&&', '&').replace('?&', '?');
                }
            }
        });

        jQuery(document).on("click", ".onSwitchTabDashboard", function () {
            let obj = $(this);
            let target = obj.data('target');
            let container = $(target);
            let nav = obj.closest(".nav-tabs");
            nav.find(".btn-tabChat.active").removeClass("active");
            obj.addClass("active");
            if (container.length > 0) {
                let target = $(container).find(".tab-content").find(obj.attr("href"));
                if (target.length > 0) {
                    container.find(".tab-content").find(".tab-pane").removeClass("in active show");
                    target.addClass("in active show");
                    Utils.updateScrollBar(target)
                }
            }
        });

        $(document).on("change", ".onReloadColumnChart", function (e) {
            e.preventDefault();
            var obj = $(this);
            let data = obj.getDataUppername();
            data[obj.attr("name")] = obj.val();

            let chart = $(obj.attr("data-chart"));

            Cust.callAjax(data, data.Url, $(this), function (res) {
                chart.attr("data-chart", JSON.stringify(res.data));
                DashChart.InitColumnChart(chart);
            });

        });

        jQuery(document).on('change', '.select_change', function (e) {
            var obj = jQuery(this);

            var data = {};

            if (obj.val()) {
                var target = jQuery(obj.attr("data-target"));
                var url = obj.attr("data-url");
                if (url == undefined)
                    return;
                data.ID = obj.val();

                Cust.callAjax(data, url, target, function (res) {
                    var html = res.htCust;
                    target.html(html);

                    Utils.autoResize();
                    if (target.prop('tagName').toLowerCase() == "select") {
                        var container = obj.closest("form,.form");
                        if (container.length == 0)
                            container = obj.closest(".ui-dialog");
                        if (container.length == 0)
                            container = document;

                        container.find(".selectpicker").selectpicker("refresh");
                    }
                    $(".selectpicker").selectpicker("refresh");
                });
            }
        });
    },
    backLink: function () {
        try {
            var bcItems = jQuery(".breadcrumb").find("li");
            var len = bcItems.length;
            if (len > 2) {

                var a = jQuery(bcItems[len - 2]).find("a");
                var attr_href = a.attr("href");
                var data_target = a.attr("data-target");
                jQuery(".widget_back_btn")
                    .removeClass("hidden")
                    .attr("href", attr_href)
                    .attr("data-target", data_target);
                if (a.hasClass("quickView")) {
                    jQuery(".widget_back_btn").addClass("quickView");
                }
                else {
                    jQuery(".widget_back_btn").removeClass("quickView");
                }
            } else {
                jQuery(".widget_back_btn").addClass("hidden");
            }
        } catch (e) { }
    }
};
jQuery(document).ready(function () {
    //Cdata.init();
    //Smile.init();
    Main.init();

    Utils.autoCloseFlash();
    Utils.updateChart(jQuery(document));
    Utils.updateFormState(jQuery(document));
    Utils.updateInputDate(jQuery(document));
    Utils.updateScrollBar(jQuery(document));
    Autocomplete.init(jQuery(document));
});