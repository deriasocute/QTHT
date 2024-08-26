var Dashboard = {
    init: function() {
        Dashboard.onEvent();
        Dashboard.upEvent();
    },
    upEvent: function(container) {
        if (Utils.isEmpty(container))
            container = jQuery(document);

        container.find(".ce-pie-chart.custom-drilldown").each(function() {
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
                    bgColor = "#fff";
                    labelColor = "#212121";
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
                        formatter: function() {
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
                            formatter: function() {
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
                            formatter: function() {
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
        container.find(".ce-column-chart").each(function() {
            var useDemoData = jQuery(this).attr('data-demo');
            var datas;
            if (useDemoData == "true") {
                datas = ce_column_chart;
            } else {
                datas = jQuery(this).attr('data-categories');
                datas = jQuery.parseJSON(datas);
            }
            var target = $(this).attr("data-target");
            var dataStacking = $(this).attr("data-stacking");
            var theme = jQuery(this).attr('data-theme');
            var background_Color,
                plot_Border_Color,
                title_Color;
            if (theme == "dark-transparent") {
                background_Color = "transparent";
                plot_Border_Color = "transparent";
                title_Color = "#fff";
            } else if (theme == "dark") {
                background_Color = "#212121";
                plot_Border_Color = "#fff";
                title_Color = "#212121";
            } else if (theme == "light-transparent") {
                background_Color = "transparent";
                plot_Border_Color = "transparent";
                title_Color = "#fff";
            } else {
                background_Color = "#fff";
                plot_Border_Color = "#212121";
                title_Color = "#212121";
            }
            Highcharts.chart(target, {
                chart: {
                    type: 'column',
                    style: {
                        fontFamily: 'sans-serif'
                    },
                    backgroundColor: background_Color,
                    plotBorderWidth: null,
                    plotBorderColor: plot_Border_Color
                },
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: datas.text,
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
                }, ],
                xAxis: {
                    categories: datas.categories,
                    crosshair: true,
                    labels: {
                        style: {
                            color: title_Color
                        }
                    }
                },
                tooltip: {
                    shared: true,
                    useHTML: true,
                    formatter: function() {
                        if (dataStacking != "false") {
                            var points = '<table class="tip"><caption style="color: #222"><b>' + this.x + '</b></caption>' +
                                '<tbody>';
                            $.each(this.points, function(i, point) {
                                points += '<tr><td><i class="fa fa-circle" aria-hidden="true" style="color: ' + point.series.color + '"></i> ' + point.series.name + ': </td>' +
                                    '<td style="text-align: right;color:#222"><b>' + point.y + '</b></td></tr>'
                            });
                            points += '<tr><td>Tổng: </td>' +
                                '<td style="text-align:right;color:#222"><b>' + this.points[0].total + '</b></td></tr>' +
                                '</tbody></table>';
                            return points;

                        } else {
                            var points = '<table class="tip"><caption style="color: #222"><b>' + this.x + '</b></caption>' +
                                '<tbody>';
                            $.each(this.points, function(i, point) {
                                points += '<tr><td><i class="fa fa-circle" aria-hidden="true" style="color: ' + point.series.color + '"></i> ' + point.series.name + ': </td>' +
                                    '<td style="text-align: right;color:#222"><b>' + point.y + '</b></td></tr>'
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
                        pointWidth: dataStacking == "false" ? 25 : 25
                    }
                },
                legend: {
                    itemStyle: {
                        color: title_Color
                    },
                    itemHoverStyle: {
                        color: '#FFF'
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
                series: datas.series
            });
        });
        container.find('.module-items').slick({
            dots: false,
            infinite: true,
            arrows: true,
            dots: true,
            slidesToShow: 8,
            slidesToScroll: 8,
            responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 6
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]

        });
    },
    onEvent: function() {

    }

};
jQuery(document).ready(function() {
    Dashboard.init();
});