var Dash = {
    init: function () {
        this.onEvent();
        this.upEvent();
    },
    upEvent: function (container) {
        if (Utils.isEmpty(container))
            container = jQuery(document);

        container.find(".onLoadTabContent .itemOnload").each(function () {
            let tab = $(this);
            let parent = tab.closest(".onLoadTabContent");
            let itemCount = tab.parent().find(".count-item");
            let target = $(tab.attr("href"));
            if (target.length > 0) {
                let url = parent.attr("data-url");
                if (url) {
                    let data = tab.getDataUppername();
                    data.ViewType = parent.data("view-type");
                    Cust.callAjax(data, url, tab, function (response) {
                        Utils.sectionBuilder(response);
                        if (response.hasOwnProperty("isCust")) {
                            target.html(response.htCust);
                            tab.closest(".chart-container").removeClass("hidden");
                        }
                        if (itemCount.length > 0 && response.data) {
                            itemCount.text(response.data.TotalItem);
                        }

                    }, true, true);
                }
            }
        });

        container.find(".onLoadDiv").each(function () {
            let obj = $(this);
            let url = obj.attr("data-url");
            let target = obj.attr("data-target");
            let count = obj.attr("data-count");
            if (url) {
                let data = obj.getDataUppername();
                Cust.callAjax(data, url, obj, function (response) {
                    Utils.sectionBuilder(response);
                    if (response.hasOwnProperty("isCust")) {
                        obj.html(response.htCust);
                        Utils.updateScrollBar(obj);
                    }
                    if (target != undefined && count != undefined) {
                        let itemCount = $(target).find(count);
                        if (itemCount.length > 0 && response.data) {
                            itemCount.text(response.data.TotalItem);
                        }
                    }
                }, true, true);
            }
        });

        container.find(".onLoadChart").each(function () {
            let obj = $(this);
            if (obj.hasClass("loaded"))
                return false;
            obj.hasClass("loaded");

            let data = obj.getDataUppername();
            let url = obj.attr("data-url");
            let target = $(this);
            Cust.callAjax(data, url, obj, function (response) {
                Utils.sectionBuilder(response);
                if (response.hasOwnProperty("isCust")) {
                    target.html(response.htCust);
                    obj.closest(".chart-container").removeClass("hidden");
                    Utils.updateSlider(target);
                    target.find("select.autoSelect2").select2();
                    DashChart.init();
                }
            }, true, true);
        });

        container.find(".onLoadChartData").each(function () {
            Dash.onLoadChartData($(this));
        });
        container.find(".onLoadGanttChart").each(function () {
            Dash.onLoadGanttChart($(this));
        });
        container.find(".onLoadGanttChartData").each(function () {
            Dash.onLoadGanttChartData($(this));
        });
    },
    onEvent: function () {
        jQuery(document).on("click", ".onMovePage", function (e) {
            e.preventDefault();
            let obj = $(this);

            let wrapper = obj.closest(".data-wrapper");
            let data = Utils.getSerialize(wrapper);
            let target = obj.data("target");
            let url = obj.data("href");
            data.page = obj.data("page");
            data.ViewType = obj.data("view-type");
            data.Tab = obj.data("tab");
            jQuery.ajax({
                type: "POST",
                async: true,
                url: url,
                data: data,
                beforeSend: function () {
                    $(target).html('').addClass("loading");
                },
                complete: function () {
                    $(target).removeClass("loading");
                },
                error: function () {
                    $(target).removeClass("loading");
                },
                success: function (response) {
                    Utils.sectionBuilder(response);
                    if (response.hasOwnProperty("isCust")) {
                        $(target).html(response.htCust);
                        Utils.updateScrollBar($(target));
                    }
                }
            });

            return false;
        });
        jQuery(document).on("change", ".onGanttFilter", function (e) {

            Dash.onLoadGanttChart($(this).closest(".onEvent"), true);
        });
        jQuery(document).on("change", ".onFilter", function (e) {
            Dash.onLoadChartData($(this).closest(".onEvent"), true);
        });
        jQuery(document).on("click", ".onTrClick", function (e) {

            window.location.href = $(this).attr("href")
        });
        jQuery(document).on("change", ".onFilterDash", function (e) {
            Dash.onLoadChartDataDash($(this).closest(".onEvent"), true);
        });

    },
    onLoadGanttChart: function (obj, isReload) {
        if (obj.hasClass("loaded") && !isReload)
            return false;
        obj.hasClass("loaded");

        let data = Utils.getSerialize(obj);
        let url = obj.attr("data-url");
        let target = obj.find(".div-chart");


        Cust.callAjax(data, url, obj, function (response) {
            Utils.sectionBuilder(response);
            if (response.hasOwnProperty("isCust")) {
                obj.closest(".chart-container").removeClass("hidden");
                if (response.data)
                    obj.closest(".chart-container").find(".count-item").text(response.data.TotalTask);
                target.html(response.htCust);
                Utils.updateSlider();
                GanttChart.init(obj);
            }
        }, true, true);

    },
    onLoadGanttChartData: function (obj, isReload) {
        if (obj.hasClass("loaded") && !isReload)
            return false;
        obj.hasClass("loaded");

        let data = Utils.getSerialize(obj);
        let url = obj.attr("data-url");
        let target = obj.find(".div-chart");


        Cust.callAjax(data, url, obj, function (response) {
            Utils.sectionBuilder(response);
            if (response.hasOwnProperty("isCust")) {
                obj.closest(".chart-container").removeClass("hidden");
                if (response.data)
                    $("#SwitchTab").find(".count-item2").text(response.data.TotalTask);
                target.html(response.htCust);
                Utils.updateSlider();
                GanttChart.init(obj);
            }
        }, true, true);

    },
    onLoadChartData: function (obj, isReload) {
        if (obj.hasClass("loaded") && !isReload)

            return false;
        obj.hasClass("loaded");

        let data = Utils.getSerialize(obj);
        let url = obj.attr("data-url");
        let target = obj.attr("data-target");

        Cust.callAjax(data, url, obj, function (response) {
            Utils.sectionBuilder(response);
            if (response.hasOwnProperty("data")) {
                $(target).html('');
                obj.closest(".chart-container").removeClass("hidden");
                $(target).attr("data-chart", response.data);
                Utils.updateSlider();
                DashChart.init(obj);
            }
        }, true, true);


    },
    onLoadChartDataDash: function (obj, isReload) {
        if (obj.hasClass("loaded") && !isReload)

            return false;
        obj.hasClass("loaded");

        let data = Utils.getSerialize(obj);
        let url = obj.attr("data-url");
        let target = obj.attr("data-target");

        Cust.callAjax(data, url, obj, function (response) {
            Utils.sectionBuilder(response);
            if (response.hasOwnProperty("data")) {
                $(target).html(response.htCust);
                obj.closest(".chart-container").removeClass("hidden");
                $(target).attr("data-chart", response.data);

                $(target).removeClass("slick-initialized");
                Utils.updateSlider();
                DashChart.init(obj);
            }
        }, true, true);
    }
};
jQuery(document).ready(function () {
    Dash.init();
});