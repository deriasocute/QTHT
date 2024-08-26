

gantt.attachEvent("onBeforeTaskUpdate", function (id, item) {
    //any custom logic here
    zoomToFit();
});
function toggleMode(toggle) {
    gantt.$zoomToFit = !gantt.$zoomToFit;
    if (gantt.$zoomToFit) {
        toggle.innerHTML = "Mặc định";
        //Saving previous scale state for future restore
        saveConfig();
        zoomToFit();
    } else {

        toggle.innerHTML = "Vừa màn hình";
        //Restore previous scale state
        restoreConfig();
        gantt.render();
    }
}

var cachedSettings = {};

function saveConfig() {
    var config = gantt.config;
    cachedSettings = {};
    cachedSettings.scales = config.scales;
    cachedSettings.start_date = config.start_date;
    cachedSettings.end_date = config.end_date;
    cachedSettings.scroll_position = gantt.getScrollState();
}

function restoreConfig() {
    applyConfig(cachedSettings);
}

function applyConfig(config, dates) {

    gantt.config.scales = config.scales;
    var lowest_scale = config.scales.reverse()[0];

    if (dates && dates.start_date && dates.end_date) {
        gantt.config.start_date = gantt.date.add(dates.start_date, -1, lowest_scale.unit);
        gantt.config.end_date = gantt.date.add(gantt.date[lowest_scale.unit + "_start"](dates.end_date), 2, lowest_scale.unit);
    } else {
        gantt.config.start_date = gantt.config.end_date = null;
    }

    // restore the previous scroll position
    if (config.scroll_position) {
        setTimeout(function () {
            gantt.scrollTo(config.scroll_position.x, config.scroll_position.y)
        }, 4)
    }
}


function zoomToFit() {
    var project = gantt.getSubtaskDates(),
        areaWidth = gantt.$task.offsetWidth,
        scaleConfigs = zoomConfig.levels;

    for (var i = 0; i < scaleConfigs.length; i++) {
        var columnCount = getUnitsBetween(project.start_date, project.end_date, scaleConfigs[i].scales[scaleConfigs[i].scales.length - 1].unit, scaleConfigs[i].scales[0].step);
        if ((columnCount + 2) * gantt.config.min_column_width <= areaWidth) {
            break;
        }
    }


    if (i == scaleConfigs.length) {
        i--;
    }

    gantt.ext.zoom.setLevel(scaleConfigs[i].name);
    applyConfig(scaleConfigs[i], project);
}

// get number of columns in timeline
function getUnitsBetween(from, to, unit, step) {
    var start = new Date(from),
        end = new Date(to);
    var units = 0;
    while (start.valueOf() < end.valueOf()) {
        units++;
        start = gantt.date.add(start, step, unit);
    }
    return units;
}

function zoom_in() {
    gantt.ext.zoom.zoomIn();
    gantt.$zoomToFit = false;
    document.querySelector(".zoom_toggle").innerHTML = "Vừa màn hình";
}
function zoom_out() {
    gantt.ext.zoom.zoomOut();
    gantt.$zoomToFit = false;
    document.querySelector(".zoom_toggle").innerHTML = "Vừa màn hình";
}


var zoomConfig = {
    levels: [
        // hours
        {
            name: "hour",
            scale_height: 27,
            scales: [
                { unit: "day", step: 1, format: "%d %M" },
                { unit: "hour", step: 1, format: "%H:%i" },
            ]
        },
        // days
        {
            name: "day",
            scale_height: 27,
            scales: [
                { unit: "day", step: 1, format: "%d %M" }
            ]
        },
        // weeks
        {
            name: "week",
            scale_height: 50,
            scales: [
                {
                    unit: "week", step: 1, format: function (date) {
                        var dateToStr = gantt.date.date_to_str("%d %M");
                        var endDate = gantt.date.add(date, -6, "day");
                        var weekNum = gantt.date.date_to_str("%W")(date);
                        return "#" + weekNum + ", " + dateToStr(date) + " - " + dateToStr(endDate);
                    }
                },
                { unit: "day", step: 1, format: "%j %D" }
            ]
        },
        // months
        {
            name: "month",
            scale_height: 50,
            scales: [
                { unit: "month", step: 1, format: "%F, %Y" },
                {
                    unit: "week", step: 1, format: function (date) {
                        var dateToStr = gantt.date.date_to_str("%d %M");
                        var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
                        return dateToStr(date) + " - " + dateToStr(endDate);
                    }
                }
            ]
        },
        // years
        {
            name: "year",
            scale_height: 50,
            scales: [
                { unit: "year", step: 1, format: "%Y" }
            ]
        },
        {
            name: "year",
            scale_height: 50,
            scales: [
                {
                    unit: "year", step: 5, format: function (date) {
                        var dateToStr = gantt.date.date_to_str("%Y");
                        var endDate = gantt.date.add(gantt.date.add(date, 5, "year"), -1, "day");
                        return dateToStr(date) + " - " + dateToStr(endDate);
                    }
                }
            ]
        },
        // decades
        {
            name: "year",
            scale_height: 50,
            scales: [
                {
                    unit: "year", step: 100, format: function (date) {
                        var dateToStr = gantt.date.date_to_str("%Y");
                        var endDate = gantt.date.add(gantt.date.add(date, 100, "year"), -1, "day");
                        return dateToStr(date) + " - " + dateToStr(endDate);
                    }
                },
                {
                    unit: "year", step: 10, format: function (date) {
                        var dateToStr = gantt.date.date_to_str("%Y");
                        var endDate = gantt.date.add(gantt.date.add(date, 10, "year"), -1, "day");
                        return dateToStr(date) + " - " + dateToStr(endDate);
                    }
                },
            ]
        },
    ],
    element: function () {
        return gantt.$root.querySelector(".gantt_task");
    }
};


gantt.ext.zoom.init(zoomConfig);

gantt.ext.zoom.setLevel("day");

gantt.$zoomToFit = false;


gantt.i18n.setLocale({
    date: {
        month_full: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
            "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
        month_short: ["T1", "T2", "T3", "T4", "T5", "T6",
            "T7", "T8", "T9", "T10", "T11", "T12"],
        day_full: ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5",
            "Thứ 6", "Thứ 7"],
        day_short: ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5",
            "Thứ 6", "Thứ 7"],
    }
});



var GanttChart = {
    resetData: function () {
        gantt.clearAll();
    },
    init: function () {

        $(".GanttChart").each(function () {
            var obj = $(this);
            var id = 'ganttchart' + (new Date()).getTime();
            $(this).attr("id", id);
            var dataChart = JSON.parse(obj.attr("data-chart"));
            var dataColumn = JSON.parse(obj.attr("data-column"));
            obj.attr("data-chart", "");
            obj.attr("data-column", "");
            gantt.plugins({
                marker: true
            });

            gantt.clearAll();
            gantt.plugins({
                tooltip: true
            });

            gantt.templates.task_text = function (start, end, task) {
                return "";// "<b>Text:</b> " + task.text + ",<b> Holders:</b> " + task.users;
            };
            gantt.init(id);
            gantt.templates.tooltip_text = function (start, end, task) {
                return `<b>Tên:</b> ${task.text}`
                    + `<br/><b>Thời hạn:</b> ${moment(task.start_date).format("DD/MM/YYYY")} - ${moment(task.end_date).format("DD/MM/YYYY")}`
                    + `<br/><b>Tiến độ:</b> ${task.progress * 100}%`
                    + `<br/><b>Người thực hiện:</b>: ${task.executor ?? ''}`;
            };
            gantt.attachEvent("onTaskDblClick", function (id, e) {
                try {
                    //any custom logic here
                    let task = dataChart.find((n) => n.id == id);
                    if (task.link)
                        window.location.href = task.link;
                } catch (e) {
                }
                return true;
            });
            var now = new Date();
            var markerId = gantt.addMarker({
                start_date: new Date(), //a Date object that sets the marker's date
                css: "today", //a CSS class applied to the marker
                text: obj.data("today"), //the marker title
                title: moment(now).format("DD/MM/YYYY HH:mm")
            });
            var data = {
                "data": dataChart,
            };
            gantt.config.columns = dataColumn;
            gantt.config.readonly = true;
            //gantt.config.resize_rows = false;
            //gantt.config.drag_move = false;//di chuyển datetime
            //gantt.config.drag_resize = false; //thay đổi datetime
            //gantt.config.drag_progress = false; //thay đổi tiến độ
            gantt.parse(data);
            gantt.templates.task_class = function (start, end, task) {
                if (!task.showTimeLine)
                    return "hideTask";
                return "";
            };

            //Scroll đến ngày hiện tại
            var scrollX = gantt.posFromDate(moment().subtract(10, "d").toDate());
            gantt.scrollTo(scrollX, 0);

        });
    }
}
$(document).ready(function () {
    GanttChart.init();
});

