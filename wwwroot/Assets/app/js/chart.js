var listColors = ['#27AE60CC', '#EB5757CC', '#F2994ACC']

var DashChart = {
    InitDountChart: function (obj) {
        var id = obj.attr("id");
        if (!id) {
            id = 'dountChart' + (new Date()).getTime();
            obj.attr("id", id);
        }
        var dataChart = JSON.parse(obj.attr("data-chart"));
        const total = dataChart.map(n => n.Value).reduce((a, b) => a + b, 0);
        Highcharts.chart(id, {
            chart: {
                animation: false,
                type: 'pie',
                height: obj.attr("data-height"),
                backgroundColor: "transparent",
            },
            plotOptions: {
                pie: {
                    animation: {
                        duration: 750,
                        easing: 'easeOutQuad'
                    },
                    shadow: false,
                    innerSize: '100%',
                    center: ['10%', '20%'],
                },

            },
            title: {
                text: obj.attr("data-title"),
                align: 'left',
                style: {
                    color: '#1A1A1A',
                    fontWeight: '600',
                    fontsize: '16px',
                    fontFamily: 'Roboto',
                    textTransform: 'uppercase',
                    width: "100%",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis"
                }
            },
            subtitle: {
                text: obj.attr("data-subtitle"),
                align: 'left',
                style: {
                    color: '#4F4F4F',
                    fontWeight: '400',
                    fontsize: '12px',
                    fontFamily: 'Roboto',
                    textTransform: 'uppercase',
                }
            },
            colors: dataChart.map((n) => n.Color),
            legend: {
                spacing: 50,
                margin: 6,
                itemMarginBottom: 8,
                labelFormatter: function () {
                    let name = this.name.length > 20 ? this.name.substr(0, 20) + '...' : this.name;
                    return `${parseFloat(this.percentage.toFixed(2))}% ${name} `
                },
                itemStyle: {
                    color: "#1A1A1A",
                    fontWeight: '100',
                    fontFamily: '"Roboto", sans-serif',
                },
            },

            tooltip: {
                formatter: function () {
                    return `<b>${this.point.name}:</b> ${this.y} <br/>${parseFloat(this.percentage.toFixed(2))}%`;
                }
            },
            exporting: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    dataLabels: {

                        enabled: true
                    },
                    showInLegend: true
                }

            },
            
            series: [{
                type: 'pie',
                size: '90%',
                innerSize: '80%',
                name: '',
                borderColor: 0,
                dataLabels: {
                    enabled: false,
                    formatter: function () {
                        const point = this.point;

                        if (point.y == 0)
                            return null;

                        //return '<i style="color: ' + point.color + '">' + point.name + ': ' + point.y + '%</i>';
                        return `<i style="color: '${point.color}'">${point.y}/${total}</i>`;
                    }
                },
                data: dataChart.map((n) => ({
                    name: n.Key,
                    y: n.Value,
                })),
            }]
        });
    },

    InitColumnChart: function (obj) {
        var id = obj.attr("id");
        if (!id) {
            id = 'columnChart' + (new Date()).getTime();
            obj.attr("id", id);
        }
        var dataChart = JSON.parse(obj.attr("data-chart"));
        Highcharts.chart(id, {
            chart: {
                type: 'column',
                height: obj.attr("data-height"),
                style: {
                    fontFamily: 'Roboto',
                    fontWeight: '600',
                },
                borderColor: '#1A1A1A'
            },
            title: {
                text: obj.attr("data-title"),
                align: 'left',
                style: {
                    color: '#1A1A1A',
                    fontWeight: '600',
                    fontSize: '16px',
                    width: "100%",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis"
                }
            },
            subtitle: {
                text: obj.attr("data-subtitle"),
                align: 'left',
                style: {
                    fontSize: '12px',
                    color: '#374151',
                    fontWeight: '500',
                    marginBottom:'20px' 
                }
            },
            colors: dataChart.map((n) => n.Color),
            xAxis: {
                categories: dataChart.map((n) => n.Key),
                //categories: false,
                labels: {
                    enabled : false
                }
            },
            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: obj.attr("data-unit")
                },

                //stackLabels: {
                //    enabled: true,
                //    style: {
                //        fontWeight: 'bold',
                //        color: ( // theme
                //            Highcharts.defaultOptions.title.style &&
                //            Highcharts.defaultOptions.title.style.color
                //        ) || 'gray',
                //        textOutline: 'none'
                //    }
                //}
            },
            //legend: {
            //    align: 'left',
            //    x: 70,
            //    verticalAlign: 'top',
            //    y: 70,
            //    floating: true,
            //    backgroundColor:
            //        Highcharts.defaultOptions.legend.backgroundColor || 'white',
            //    borderColor: '#CCC',
            //    borderWidth: 1,
            //    shadow: false
            //},

            legend: { enabled: false },
            tooltip: {
                headerFormat: '<b>{point.x}</b>',
                pointFormat: '{series.name}: {point.y}'
            },
            exporting: {
                enabled: false
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        style: {
                            textOutline: false
                        }
                    },
                    colorByPoint: true
                },
            },
            series: [{
                name: '',
                borderWidth: 1,
                data: dataChart.map((n) => n.Value),
            }]
        });
    },
    InitStackedChart: function (obj) {
        var id = obj.attr("id");
        if (!id) {
            id = 'columnChart' + (new Date()).getTime();
            obj.attr("id", id);
        }
        var dataChart = JSON.parse(obj.attr("data-chart"));
        Highcharts.chart(id, {
            chart: {
                type: 'column',
                height: obj.attr("data-height"),
                style: {
                    fontFamily: 'Roboto',
                    fontWeight: '600',
                },
                borderColor: '#1A1A1A'
            },
            title: {
                text: obj.attr("data-title"),
                align: 'left',
                style: {
                    color: '#1A1A1A',
                    fontWeight: '600',
                    fontSize: '16px',
                    textTransform: 'uppercase',
                    width: "100%",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis"
                }
            },
            subtitle: {
                text: obj.attr("data-subtitle"),
                align: 'left',
                style: {
                    fontSize: '13px',
                    color: '#f89e5c',
                    fontWeight: '500',
                }
            },
            column: {
                pointWidth: 10
            },
            xAxis: {
                categories: ['Kế hoạch A ', 'Kế hoạch B ', 'Kế hoạch C ', 'Kế hoạch D']
            },
            colors: ['#10B981', '#3B82F6'],
            xAxis: {
                categories: dataChart.map((n) => n.Key)
            },
            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: obj.attr("data-unit")
                },
                
            },
            legend: { enabled: true },
            tooltip: {
                headerFormat: '<b>{point.x}</b>',
                pointFormat: '{series.name}: {point.y}'
            },
            exporting: {
                enabled: false
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: 'Hoàn thành',
                data: [148, 133, 100, 20],
                stack: 'Europe'
            }, {
                name: 'Đang thu thập',
                data: [102, 98, 10, 100],
                stack: 'Europe'
            }]
            // series: [{
            //     name: '',
            //     borderWidth: 1,
            //     data: dataChart.map((n) => n.Value),
            // }]
        });
    },

    InitPieChart: function (obj) {
        var id = obj.attr("id");
        if (!id) {
            id = 'columnChart' + (new Date()).getTime();
            obj.attr("id", id);
        }
        var dataChart = JSON.parse(obj.attr("data-chart"));
        Highcharts.chart(id, {
            chart: {
                type: 'pie',
                height: obj.attr("data-height"),
                style: {
                    fontFamily: 'Roboto',
                    fontWeight: '100',
                }
            },
            title: {
                text: obj.attr("data-title"),
                align: 'left',
                style: {
                    color: '#fff',
                    fontWeight: '600',
                    fontsize: '16px',
                    textTransform: 'uppercase',
                    width: "100%",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis"
                }
            },
            subtitle: {
                text: obj.attr("data-subtitle"),
                align: 'left',
                style: {
                    fontWeight: '500',
                    fontsize: '13px',
                    color: '#F2F2F2',
                }
            },
            colors: dataChart.map((n) => n.Color),
            legend: {
                align: 'right',
                margin: 0,
                floating: false,
                layout: 'vertical',
                verticalAlign: 'middle',
                labelFormatter: function () {
                    let name = this.name.length > 20 ? this.name.substr(0, 20) + '...' : this.name;
                    return `${parseFloat(this.percentage.toFixed(2))}% ${name} `
                },
                itemStyle: {
                    color: "#fff",
                    fontWeight: '100',
                    fontFamily: '"Roboto", sans-serif',
                }
            },
            tooltip: {
                formatter: function () {
                    return `<b>${this.point.name}:</b> ${this.y} <br/>${parseFloat(this.percentage.toFixed(2))}%`;
                }
            },
            //exporting: {
            //    enabled: false
            //},
            plotOptions: {
                pie: {
                    dataLabels: {

                        enabled: true
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: '',
                //dataLabels: {
                //    formatter: function () {
                //        const point = this.point;
                //        //return '<i style="color: ' + point.color + '">' + point.name + ': ' + point.y + '%</i>';
                //        return '<i style="color: ' + point.color + '">' + point.y + '</i>';
                //    }
                //},
                data: dataChart.map((n) => ({
                    name: n.Key,
                    y: n.Value,
                })),
            }]
        });
    },

    init: function (container) {
        if (!container)
            container = $(document);

        container.find(".StackedColumn").each(function () {
            let obj = $(this);
            var id = obj.attr("id");
            if (!id) {
                id = 'columnChart' + (new Date()).getTime();
                obj.attr("id", id);
            }
            if (!obj.attr("data-chart") || obj.attr("data-chart") == '')
                return false;

            var dataChart = JSON.parse(obj.attr("data-chart"));
            var series = JSON.parse(obj.attr("data-series"));
            var colors = JSON.parse(obj.attr("data-colors"));
            var seriesData = [];

            for (var i = 0; i < series.length; i++) {
                seriesData.push({
                    name: series[i],
                    data: dataChart.map((n) => n.Values[i]),
                    borderWidth: 0
                });
            }

            Highcharts.chart(id, {
                chart: {
                    type: 'column',
                    marginBottom: 70,
                    style: {
                        fontFamily: 'Roboto',
                        fontSize: '13px',
                        fontWeight: '600',
                    },
                    borderWidth: 0
                },
                title: {
                    text: ' ',
                    align: 'left',
                },
                colors: colors || listColors,
                xAxis: {
                    categories: dataChart.map((n) => n.Key)
                },
                yAxis: {
                    allowDecimals: false,
                    min: 0,
                    title: {
                         text: ''
                     },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: ( // theme
                                Highcharts.defaultOptions.title.style &&
                                Highcharts.defaultOptions.title.style.color
                            ) || 'gray',
                            textOutline: 'none'
                        }
                    }
                },
                legend: {
                    enabled: false,
                    //floating: true,
                    //backgroundColor:
                    //    Highcharts.defaultOptions.legend.backgroundColor || 'white',
                    //borderColor: '#CCC',
                    //borderWidth: 1,
                    //shadow: false,
                    //align: 'center',
                    //verticalAlign: 'bottom',
                    //x: 0,
                    //y: 0
                },
                tooltip: {
                    shared: true,
                    positioner: function (x, y, point) {
                        return { x: point.plotX + 65, y: point.plotY + (-10) }
                    },
                    //shared: false,
                    headerFormat: '<b>{point.x}</b>: {point.stackTotal}<br/>',
                    //pointFormat: '{series.name}: {point.y}<br/>Tổng: {point.stackTotal}'
                },
                exporting: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        //pointWidth: series.length === 5 : 100 ?
                        maxPointWidth: 50
                    },
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: false,
                            style: {
                                textOutline: false
                            }
                        }
                    }
                },
                series: seriesData
            });

        });

        container.find(".BasicColumn").each(function () {
            try {
                DashChart.InitColumnChart($(this));
            } catch (e) {
                console.log(e);
            }
        });

        container.find(".PieColumn").each(function () {
            try {
                DashChart.InitPieChart($(this));
            } catch (e) {
                console.log(e);
            }
        });

        container.find(".DountChart").each(function () {
            try {
                DashChart.InitDountChart($(this));
            } catch (e) {
                console.log(e);
            }
        });

        container.find(".StackedChart").each(function () {
            try {
                DashChart.InitStackedChart($(this));
            } catch (e) {
                console.log(e);
            }
        });

        container.find(".dounutCHart").each(function () {
            var id = 'chart' + (new Date()).getTime();
            $(this).attr("id", id);
            Highcharts.chart(id, {
                chart: {
                    type: 'pie',
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },
                colors: listColors,
                title: {
                    text: '<p style="color: #fff">Dự án Oakwood Residence Hanoi</p> </br> <p style="color: #BDBDBD"> 20/03/2010 - 20/03/2022 </p>',
                    align: 'left',
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        innerSize: '60%',
                        allowPointSelect: false,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.data}</b>',
                            connectorColor: 'silver'
                        },
                        showInLegend: false
                    }
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: [{
                        name: 'FireFire',
                        data: '22/22',
                        y: 11.84
                    }, {
                        name: 'Fire',
                        data: '0/22',
                        y: 10.85
                    }]
                }]
            });
        });
    }
};


$(document).ready(function () {
    DashChart.init();
});

