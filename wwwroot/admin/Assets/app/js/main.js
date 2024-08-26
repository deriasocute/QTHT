var Main = {
    init: function () {
        let activeElement = null;

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
        container.find(".editorSummernote").each(function () {
            if (!jQuery(this).hasClass("setSummernote")) {
                jQuery(this).addClass("setSummernote").summernote({
                    lang: 'vi-VN',
                    height: '200px',
                    //focus: true,
                    callbacks: {
                        onFocus: function () {
                            activeElement = $(this);
                        },
                        //onBlur: function () {
                        //    if (!$(this).parent().hasClass('note-editor')) {
                        //        activeElement = null;
                        //    }
                        //}
                    }

                });
            }
        });

        container.find(".useTreegrid").each(function () {
            jQuery(this).treegrid();
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

        container.find(".areaspline-chart").each(function () {
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
                    shared: true,
                    valueSuffix: ''
                },
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
        });
        container.find(".realtime_chart").each(function () {
            //------------------------------Real-Time Chart-------------------------------------------//
            var data = [];
            var dataset;
            var totalPoints = 60;
            var updateInterval = 1000;
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


        });

        container.find(".realPer").each(function () {
            var dataChart = jQuery(this).attr('data-value');
            var title = jQuery(this).attr('data-title');
            var target = jQuery(this).attr('data-target');
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
                        percent: (dataChart[i].y / total * 100).toFixed(2),
                        plan: dataChart[i].plan,
                        color: dataChart[i].color
                    });

                    // add version data
                    var color1 = "#ccc";
                    var color2 = "#57b5e3";
                    var hide_text = '';
                    // Màu đen #444444: Tỷ lệ hoàn thành > 30%
                    // Màu đỏ #d43f3a: Tỷ lệ hoàn thành tu 30-50%
                    // Màu cam #ffc107: Tỷ lệ hoàn thành tu 50-80%
                    // Màu vàng #ffeb3b: Tỷ lệ hoàn thành tu 80-100%
                    // Màu xanh #5cb85c: Tỷ lệ hoàn thành tu 100%
                    drillDataLen = dataChart[i].drilldown.data.length;
                    var per = Math.round((dataChart[i].drilldown.data[j] / dataChart[i].y * 100), 3);
                    for (j = 0; j < drillDataLen; j += 1) {

                        brightness = 0.2 - (j / drillDataLen) / 5;
                        if (per < 30) {
                            color2 = "#444444"; // Màu đen
                        }
                        else if (per >= 30 && per < 50) {
                            color2 = "#d43f3a"; // Màu đỏ
                        }
                        else if (per >= 50 && per < 80) {
                            color2 = "#ff9800"; // Màu cam
                        }
                        else if (per >= 80 && per < 100) {
                            color2 = "#ffeb3b"; // Màu vàng
                        }
                        else {
                            color2 = "#5cb85c"; // Màu xanh
                        }
                        versionsData.push({
                            name: j > 0 ? hide_text : dataChart[i].drilldown.categories[j],
                            y: dataChart[i].drilldown.data[j],
                            percent: j > 0 ? hide_text : (dataChart[i].drilldown.data[j] / dataChart[i].y * 100).toFixed(2),
                            color: j % 2 == 0 ? color2 : color1

                        });
                        //Highcharts.Color('#3479b8').brighten(brightness).get()
                    }
                }
            }
            Highcharts.chart(target, {
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
                    formatter: function () {
                        return this.point.percent > 0 ? '' + this.point.name + '<br/><b>' + this.point.percent + '%</b>' : false;
                    }
                    //valueSuffix: '%'
                },
                series: [{
                    name: ' ',
                    data: browserData,
                    size: '60%',
                    dataLabels: {
                        formatter: function () {
                            return this.y > 5 ? this.point.percent + '%' : null;
                        },
                        color: '#ffffff',
                        distance: -40
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
                legendHTML += "<div class='Legend_item'><span style='display:inline-block;width:20px;background-color:" + dataChart[i].color + ";'>&nbsp;</span> " + dataChart[i].drilldown.name + "</div>";
            }
            if (jQuery(this).next(".DocproChart_legend").length != 0) { jQuery(this).next(".DocproChart_legend").remove(); }
            jQuery(this).after('<div class="DocproChart_legend">' + legendHTML + '</div>');
        });
        container.find(".hight-pie-chart").each(function () {
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
        });
        container.find(".QLHT-chart").each(function () {
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
        });
    },
    onEvent: function () {

        // Lắng nghe sự kiện focus trên tất cả các input và textarea
        jQuery(document).on('focus', 'input', function () {
            activeElement = this;
        });
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
                width: data_with,
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
                    if (typeof data.code != 'undefined') {
                        dialoger.find("[name='Code']").val(data.code);
                    }
                    if (typeof data.json != 'undefined') {
                        try {
                            var dataJson = jQuery.parseJSON(data.json);
                            for (var i in dataJson) {
                                dialoger.find("[name='" + i + "']").val(dataJson[i]);
                            }
                        }
                        catch (e) { }
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
            jQuery(this).closest(".form-group").find(".tickItem:visible").each(function () {
                if (!jQuery(this).prop("disabled")) {
                    if (jQuery(this).prop("tagName") == "SELECT") {
                        jQuery(this).find("option").each(function () {
                            jQuery(this).prop("selected", checked);
                        });
                        jQuery(this).trigger("change");
                        try {
                            jQuery(this).selectpicker('refresh');
                        } catch (e) {
                        }
                    }
                    else {
                        jQuery(this).prop("checked", checked);
                    }
                }
            });
            jQuery(this).closest(".form-group").find(".tickGroup").prop("checked", checked);
        });
        jQuery(document).on('change', '.tickAll', function () {
            var checked = jQuery(this).is(":checked");
            jQuery(this).closest(".tickGroup").find(".tickItem, .tickKey").each(function () {
                if (!jQuery(this).prop("disabled"))
                    jQuery(this).prop("checked", checked);
            });
        });
        jQuery(document).on('change', '.group-checkable', function () {

            var table = jQuery(this).closest("table");
            var set = table.find(".checkboxes:visible");
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
            jQuery(this).closest('tr').toggleClass("active");
            Utils.toggleMultiTicks(jQuery(this).closest('table'));
        });
        jQuery(document).on("change", ".changeRel", function () {
            var v = jQuery(this).prop("checked") ? 1 : 0;
            var data = jQuery(this).getDataUppername();
            jQuery(data.Rel).val(v);
            if (typeof data.RelVisible != 'undefined') {

                var tagName = jQuery(this).prop("tagName");
                if (tagName == "SELECT") {
                    var dataOptions = jQuery(this).find("option:selected").getDataUppername();
                    if (dataOptions.IsVisible.toLowerCase() == "true") {
                        jQuery(data.RelVisible).removeClass("hidden")
                    } else {
                        jQuery(data.RelVisible).addClass("hidden")
                    }
                }
                else {
                    if (jQuery(this).prop("checked") && data.IsVisible.toLowerCase() == "true") {
                        jQuery(data.RelVisible).removeClass("hidden");
                    } else {
                        jQuery(data.RelVisible).addClass("hidden");
                        jQuery(data.RelVisible).find("input,textarea").val("");
                    }
                }

            }
        });
        jQuery(".changeRel").trigger("change");
        jQuery(document).on("change", ".changeRels", function () {
            var val = jQuery(this).val();
            var data = jQuery(this).getDataUppername();
            jQuery(data.Rel).val(val);
            if (typeof data.RelVisible != 'undefined') {

                var tagName = jQuery(this).prop("tagName");
                if (tagName == "SELECT") {
                    var dataOptions = jQuery(this).find("option:selected").getDataUppername();
                    if (dataOptions.IsVisible.toLowerCase() == "true") {
                        jQuery(data.RelVisible).removeClass("hidden")
                    } else {
                        jQuery(data.RelVisible).addClass("hidden")
                    }
                }
                else {
                    if (jQuery(this).prop("checked") && data.IsVisible.toLowerCase() == "true") {
                        jQuery(data.RelVisible).removeClass("hidden");
                    } else {
                        jQuery(data.RelVisible).addClass("hidden");
                        jQuery(data.RelVisible).find("input,textarea").val("");
                    }
                }

            }
        });
        jQuery(".changeRels").trigger("change");
        jQuery(document).on("change", ".changePasswordSuppers", function () {
            var val = jQuery(this).val();
            $('#KieuXacThucVal').val(val);
            if (val === '1') {
                jQuery('.xathucthuong').removeClass("hidden");
            }
            else {
                jQuery('.xathucthuong').addClass("hidden");
            }
        });
        jQuery(".changePasswordSuppers").trigger("change");
        jQuery(document).on("change", ".changeOnOff", function (e) {
            e.preventDefault();
            var obj = jQuery(this);
            var data = obj.getDataUppername();
            data.Value = obj.prop("checked") ? 1 : 0;

            jQuery.ajax({
                type: "POST",
                async: true,
                url: data.Href,
                data: data,
                beforeSend: function () {
                },
                complete: function () {
                },
                error: function () {
                },
                success: function (response) {
                    Utils.sectionBuilder(response);
                }
            });
        });
        jQuery(document).on("change", ".changeOnOffConfigMail", function (e) {
            e.preventDefault();
            var obj = jQuery(this);
            if (obj.is(':checked')) {
                obj.val(1);
            } else {
                obj.val(0);
            }
        });

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
        jQuery(document).on("click", ".quickConfirmRestore", function () {
            try {
                var data = jQuery('#NameRestore').val();
                jQuery.ajax({
                    type: "POST",
                    async: true,
                    url: jQuery(this).attr('data-href'),
                    data: { Name: data },
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
                        else if (response.hasOwnProperty("isMsg")) {
                            Utils.closeOverlay();
                        }
                        if (!Utils.isEmpty(data.TargetDeleteClick)) {
                            jQuery(data.TargetDeleteClick).fadeOut("fast", function () {
                                jQuery(this).remove();
                            });
                        }
                        Utils.updateFormState(jQuery(target));
                        Utils.updateScrollBar(jQuery(target));
                    }
                });
            } catch (e) {

            }
            return false;
        });
        jQuery(document).on('change', '.checkboxrestore', function () {
            var obj = jQuery(this).closest('table');
            var nameDB = '';
            obj.find(".checkboxrestore").each(function () {
                if (jQuery(this).prop("checked")) {
                    nameDB += jQuery(this).attr("data-name") + ',';
                }
            });
            jQuery('#NameRestore').val(nameDB);
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
                        jQuery(target).addClass("loading").html("")
                    },
                    complete: function () {
                        jQuery(target).removeClass("loading");
                    },
                    error: function () {
                        jQuery(target).removeClass("loading");
                    },
                    success: function (response) {
                        try {
                            if (form.attr('data-state') != '0') {
                                window.history.pushState(null, response.title, Utils.builderQString(data, url));
                                jQuery(document).prop('title', response.title);
                            }
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
        jQuery(document).on("click", ".quickExport", function () {
            try {
                var obj = jQuery(jQuery(this));
                if (!obj.hasClass('exporting')) {
                    obj.addClass('exporting');
                    var form = jQuery(jQuery(this).attr("data-form"));
                    var url = jQuery(this).attr("href");
                    var data = Utils.getSerialize(form);
                    if (Utils.isEmpty(url)) {
                        return;
                    }
                    jQuery.ajax({
                        type: "POST",
                        async: true,
                        url: url,
                        data: data,
                        error: function () {
                            obj.removeClass('exporting');
                        },
                        complete: function () {
                            obj.removeClass('exporting');
                        },
                        success: function (rs) {
                            if (rs.success) {
                                Utils.SaveFileAs(rs.urlFile, rs.filename);
                            }
                            else {
                                Utils.setError(rs.message);
                            }
                            obj.removeClass('exporting');
                        }
                    });
                }

            } catch (e) {
                console.log(e);
            }
            return false;
        });
        jQuery(document).on("submit", ".quickSubmit", function (e) {
            e.preventDefault();
            try {
                var form = jQuery(this);
                if (!form.hasClass("submitting")) {
                    form.addClass("submitting");
                    var url = form.attr("action");
                    var target = form.attr("data-target");
                    var targetDelete = form.attr("data-target-delete");
                    var type = form.attr("data-insert-type");
                    var data = Utils.getSerialize(form);
                    if (Utils.isEmpty(url)) {
                        return false;
                    }
                    if (!Utils.validateDataForm(form)) {
                        return false;
                    }
                    if (!form.hasClass("bootstrapValidator")) {
                        form.addClass("bootstrapValidator").bootstrapValidator();
                    }
                    var bootstrapValidator = form.data('bootstrapValidator');
                    bootstrapValidator.validate();
                    if (!bootstrapValidator.isValid()) {
                        jQuery(this).unbind();
                        form.removeClass("submitting");
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
                            form.removeClass("submitting");
                        },
                        error: function () {
                            form.removeClass("submitting");
                        },
                        success: function (response) {
                            form.removeClass("submitting");
                            Utils.sectionBuilder(response, response.isErr);

                            if (form.hasClass("reloadOnSubmit") && !response.isErr) {
                                $('input[type="checkbox"]').prop('checked', false);
                                window.location.reload();
                            }

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
                            if (form.hasClass("closeOnSubmit") && !response.hasOwnProperty("isErr")) {
                                Utils.closeOverlay(true);
                            }
                            if (form.hasClass("reloadOnSubmit") && !response.hasOwnProperty("isDL")) {
                                window.location.reload();
                            }
                            if (!response.isErr)
                                form.reset();
                            form.find("[type='submit']").prop("disabled", false);
                        }
                    });
                }

            } catch (e) {
                console.log(e);
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
                if (url.indexOf('&np=') > 0) {
                    url = Cust.fixDeplucateParam(url, 'np'); //fix lỗi phân trang: thay đổi sl bản ghi trên trang
                }

                if (window.history.pushState) {
                    jQuery.ajax({
                        type: "POST",
                        async: true,
                        url: url,
                        data: { RedirectPath: Utils.getRedirect() },
                        beforeSend: function () {
                            jQuery(target).addClass("loading").html("")
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
                jQuery.ajax({
                    type: "POST",
                    async: true,
                    url: jQuery(this).attr("href"),
                    data: { RedirectPath: Utils.getRedirect() },
                    beforeSend: function () {
                        if (!obj.hasClass("not-overlay")) {
                            Utils.openOverlay();
                            BaseJs.activeLoading();
                        }
                    },
                    complete: function () {
                        if (!obj.hasClass("not-overlay")) {
                            Utils.openOverlay();
                            BaseJs.inactiveLoading();
                        }

                    },
                    error: function () {
                        if (!obj.hasClass("not-overlay")) {
                            Utils.openOverlay();
                            BaseJs.inactiveLoading();
                        }
                    },
                    success: function (response) {
                        BaseJs.inactiveLoading();
                        if (response.isErr && response.htMsg) {
                            Utils.closeOverlay();
                        }
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

                        var data = obj.getData();
                        if (response.status = 1 && data.hideAfterUpdate != undefined && data.hideAfterUpdate == "1") {
                            obj.addClass("hidden");
                        }
                    }
                });
            } catch (e) {

            }
            return false;
        });
        jQuery(document).on("click", ".quickUpdates", function () {
            try {
                var obj = jQuery(this);
                var data = jQuery(this).getDataUppername();
                var table = jQuery(this)
                    .closest(".dataTables_wrapper")
                    .find("table");

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
                data.ID = ids;
                data.IDFile = idFiles;
                data.RedirectPath = Utils.getRedirect();
                var target = jQuery(this).attr("data-target");
                jQuery.ajax({
                    type: "POST",
                    async: true,
                    url: jQuery(this).attr("href"),
                    data: data,
                    beforeSend: function () {
                        if (!obj.hasClass("not-overlay")) {
                            Utils.openOverlay();
                            BaseJs.activeLoading();
                        }
                    },
                    complete: function () {
                        if (!obj.hasClass("not-overlay")) {
                            Utils.openOverlay();
                            BaseJs.inactiveLoading();
                        }

                    },
                    error: function () {
                        if (!obj.hasClass("not-overlay")) {
                            Utils.openOverlay();
                            BaseJs.inactiveLoading();
                        }
                    },
                    success: function (response) {
                        BaseJs.inactiveLoading();
                        if (response.isErr && response.htMsg) {
                            Utils.closeOverlay();
                        }
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

                        var data = obj.getData();
                        if (response.status = 1 && data.hideAfterUpdate != undefined && data.hideAfterUpdate == "1") {
                            obj.addClass("hidden");
                        }
                    }
                });
            } catch (e) {

            }
            return false;
        });
        if (window.history.pushState) {
            $(window).on("popstate", function (event) {
                window.location = document.location;
            });
        }
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
                        if (response.isErr && response.htMsg) {
                            Utils.closeOverlay();
                        }
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
        jQuery(document).on("change", ".datetime, .date, .timepicker, .time", function (e) {
            try {
                var dateInput = jQuery(e.currentTarget);

                if (dateInput.attr("data-bv-field")) {
                    var form = dateInput.closest("form");
                    if (form.hasClass("bootstrapValidator")) {
                        form.bootstrapValidator('revalidateField', dateInput.attr("name"));
                    }

                }

            } catch (e) {
                console.log(e);
            }
        });
        jQuery(document).on("click", ".quickDeletes, .quickConfirms, .quickMoves", function () {

            try {
                var data = jQuery(this).getDataUppername();
                var table = jQuery(this)
                    .closest(".dataTables_wrapper")
                    .find("table");

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
                data.ID = ids;
                data.IDFile = idFiles;
                data.RedirectPath = Utils.getRedirect();

                var target = data.Target;
                if (jQuery(this).hasClass("quickMoves")) {
                    delete data.Target;
                }

                jQuery.ajax({
                    type: "POST",
                    async: true,
                    url: data.Href,
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
                        if (response.isErr && response.htMsg) {
                            Utils.closeOverlay();
                        }
                        if (response.hasOwnProperty("isCust")) {
                            Utils.closeOverlay();
                            jQuery(data.Target).html(response.htCust);
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

        jQuery(document).on("dblclick", ".insertTextAtCursor", function (event) {
            try {
                var obj = jQuery(this);
                var target = obj.attr("data-target");
                if (activeElement) {
                    // Lấy vị trí con trỏ
                    const cursorPosition = activeElement.selectionStart;
                    const labelText = obj.html();
                    
                    if ($(activeElement).closest(target).length && $(activeElement).is('input') ) {
                        // Nếu là input
                        const currentValue = $(activeElement).val();
                        const newValue = currentValue.slice(0, cursorPosition) + labelText + currentValue.slice(cursorPosition);
                        $(activeElement).val(newValue);
                        activeElement.selectionStart = activeElement.selectionEnd = cursorPosition + labelText.length;
                    } else {                        
                        // Summernote
                       // $(activeElement).summernote('insertText', labelText);
                        
                        activeElement.summernote('editor.saveRange');
                        activeElement.summernote('editor.restoreRange');
                        activeElement.summernote('editor.focus');
                        activeElement.summernote('editor.insertText', labelText);
                    }
                }
            } catch (e) {

            }
            return false;
        });

        jQuery(document).on("input", "#CrVerification", function (e) {
            let isWipeConfig = $("#CrWipeConfig").val();
            let isWipeData = $("#CrWipeData").val();

            let confirmationText = $(this).attr("data-verification");
            let val = $(this).val();
            if (val === confirmationText && (isWipeData || isWipeConfig))
                $('#btnConfirmation').removeClass("disabled");
            else
                $('#btnConfirmation').addClass("disabled");
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
    Cdata.init();
    Smile.init();
    Main.init();

    Utils.autoCloseFlash();
    Utils.updateChart(jQuery(document));
    Utils.updateFormState(jQuery(document));
    Utils.updateInputDate(jQuery(document));
    Utils.updateScrollBar(jQuery(document));
    Autocomplete.init(jQuery(document));
});