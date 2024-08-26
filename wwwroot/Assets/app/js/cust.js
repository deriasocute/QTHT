function rule_check() {
    if ($(".scrollItem_item").is(":visible")) {
        var item_length = 0;
        var item_ckecked = 0;
        $(".scrollItem_item").each(function () {
            item_length = $(this).find(".scrollItem").length;
            item_ckecked = $(this).find('.colored-success:checkbox:checked').length;
            if (parseInt(item_length) > 0) {
                if (parseInt(item_ckecked) == 0) {
                    $(this).find(".scrollItem_item_title").find(".fa_some").addClass("hidden");
                    $(this).find(".scrollItem_item_title").find(".fa_all").addClass("hidden");
                } else if (parseInt(item_ckecked) == parseInt(item_length)) {
                    $(this).find(".scrollItem_item_title").find(".fa_some").addClass("hidden");
                    $(this).find(".scrollItem_item_title").find(".fa_all").removeClass("hidden");
                } else {
                    $(this).find(".scrollItem_item_title").find(".fa_some").removeClass("hidden");
                    $(this).find(".scrollItem_item_title").find(".fa_all").addClass("hidden");
                }
            }
        });
    }
}
rule_check();
//Phân quyền
jQuery(document).on("click", ".scrollItem_item_title", function () {
    if ($(this).parents(".scrollItem_item").find('.scrollItem_content').is(":visible")) {
        $(this).parents(".scrollItem_item").find('.scrollItem_content').slideUp();
    } else {
        $(this).parents(".scrollItem_item").find('.scrollItem_content').slideDown();
    }
    $(this).parents(".scrollItem_item").toggleClass("open");
    $(this).find(".fa_left").toggleClass('fa-caret-right fa-caret-down');
    rule_check();
});
jQuery(document).on("click", ".scrollItem_content .checkbox .colored-success", function () {
    rule_check();
});
jQuery(document).on("click", ".ui-dialog .ui-dialog-titlebar-close", function () {
    $(".scrollItem_item_title").find(".fa_some").addClass("hidden");
    $(".scrollItem_item_title").find(".fa_all").addClass("hidden");
});
// JS Filter Thông Báo 
jQuery(document).on("click", ".quickSort", function () {
    try {
        var form = $("#noti_form");
        var url = form.attr("action");
        var target = form.attr("data-target");
        var sortType = $(this).attr("value");
        var data = Utils.getSerialize(form);
        data.Sort = sortType;
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
                    if (form.attr("data-state") != "0") {
                        window.history.pushState(null, response.title, url + Utils.builderQString(data));
                        jQuery(document).prop("title", response.title);
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
                Utils.updateChart(jQuery(target));
                Autocomplete.init(jQuery(target));
                Main.upEvent(jQuery(target));
                if (form.hasClass("auto_resize_table")) {
                    QLNS.onAutoResize();
                }
                // Main.registerSelect2(jQuery(target));
                jQuery(target).find(".selectpicker").selectpicker();
                var cancelSearch = jQuery(".cancelSearch").is(":visible");
                if (cancelSearch !== true) {
                    jQuery(".cancelSearch").show();
                }
            }
        });
    } catch (e) {

    }
    return false;
});

$("#check_all_read").change(function () {
    if (this.checked) {
        try {
            var form = $("#noti_form");
            var data = Utils.getSerialize(form);
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
    }


});

jQuery(document).on("click", ".favourite", function (e) {
    e.preventDefault();
    var idService = $(this).attr("data-id");
    if ($(this).hasClass("far")) {
        $(this).toggleClass('far fas');
        $(this).addClass("yellow")
    }
    else {
        $(this).toggleClass('far fas');
        $(this).removeClass("yellow");
    }
    $.ajax({
        type: "POST",
        url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/Register/rating.html",
        async: true,
        data: {
            id: idService
        },
        error: function (e) {
            console.log(e);
        },
        success: function (data) {
            console.log(data.mesg);
        }
    });
})

jQuery(document).on("click", ".gb_Qe--form .gb_bf--caret", function () {
    $(".gb_bf--filter").toggleClass("open");
});
jQuery(document).on("click", ".gb_bf--filter ._button ._search", function () {
    $(".gb_bf--filter").removeClass("open");
});

jQuery(document).on('click', '.dataFilter_Dropdown .dropdown-toggle', function () {
    jQuery(this).parents(".dataFilter_Dropdown").toggleClass("open");
    jQuery(this).parents(".quickSearch ").find(".dataFilter_Dropdown_target").toggleClass("open");
});
jQuery(document).on('click', '.dataFilter_Dropdown_close', function (e) {
    e.preventDefault();
    jQuery(this).parents(".quickSearch").find(".dataFilter_Dropdown").toggleClass("open");
    jQuery(this).parents(".quickSearch").find(".dataFilter_Dropdown_target").toggleClass("open");
});



var Cust = {
    dataTables_filter_col: function () {
        //Fix col sm as col md
        if ($(document).find('.dataTables_filter > .quickSearch > div[class*="col"]').is(":visible")) {
            jQuery(document).find('.dataTables_filter > .quickSearch div[class*="col"]').each(function () {
                var obj = $(this);
                var arr = obj.attr('class').split(' ');
                for (var i = 0; i < arr.length; i++) {
                    var class_sm = arr[i];
                    var col_sm = 'col-sm-';
                    if (class_sm.indexOf(col_sm) !== -1) {
                        obj.removeClass(class_sm);
                    }
                }
                for (var j = 0; j < arr.length; j++) {
                    var class_md = arr[j];
                    var col_md = 'col-md-';
                    if (class_md.indexOf(col_md) !== -1) {
                        var res = class_md.replace("md", "sm");
                        obj.addClass(res);
                    }
                }

            });
        }
    },
    check_required_input: function () {
        jQuery(document).find(".form-control").each(function () {
            var attr = $(this).attr('data-bv-notempty');
            if (typeof attr !== typeof undefined && attr !== false && attr === 'true') {
                if (jQuery(this).parent().prev("label").is(":visible") && (jQuery(this).parent().prev("label").find(".red").size() === 0)) {
                    var label_text = jQuery(this).parent().prev("label").html();
                    jQuery(this).parent().prev("label").html(label_text + ' <span class="red">*</span>');
                }
            }
        });
    },
    

    updateSliderTitle: function (container) {
        try {
            if (!container)
                container = $(document);
                var bodyUseSlick = $('.useSlickSlider-title')
            if (bodyUseSlick == null || bodyUseSlick.length != 0) {
                $(bodyUseSlick).width($('.page_block-title').width());
            }
            container.find(".useSlickSlider-title").each(function () {
                var id = $(this).attr("id");
                if (!id) {
                    id = 'sl' + (new Date()).getTime();
                    obj.attr("id", id);
                }
                var slidesToShow = parseInt($(this).attr("data-slides-to-show"));
                if (isNaN(slidesToShow))
                    slidesToShow = 3;
                $(this).slick({
                    dots: true,
                    infinite: false,
                    slidesToShow: slidesToShow,
                    slidesToScroll: 1,
                    responsive: [
                        {
                            breakpoint: 770,
                            settings: {
                                slidesToShow: 3,
                            }
                        },{
                            breakpoint: 641,
                            settings: {
                                slidesToShow: 1.5,
                            }
                        },{
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                            }
                        },
                    ]

                });
            });
        } catch (e) {

        }
    },
    fileViewer_height_fn: function () {
        if ($("#FileViewer").is(":visible")) {
            if ($(window).width() > 991) {
                //fix FileViewer height
                $("#FileViewer").css("height", "auto");
                $("#FileViewer #outerContainer").css("height", "auto");
                $("#FileViewer .group-tab .tab-data").css("height", "auto");
                var window_height = $(window).outerHeight(true);
                var navbar_height = 0;
                if ($(".header_banner").is(":visible")) {
                    navbar_height = $(".navbar").outerHeight(true) + $(".header_banner").outerHeight(true);
                } else {
                    navbar_height = $(".navbar").outerHeight(true);
                }
                var breadcrumbs_height = $(".breadcrumb_page").outerHeight(true);
                var file_button_action_height = $("#FileViewer .file_button_action").outerHeight(true);
                var toolbarViewer_Scanfile_height = $("#FileViewer .toolbarViewer_Scanfile").outerHeight(true);
                var label_group_tab_custom_height = $("#FileViewer .label_group_tab_custom").outerHeight(true);
                var fileViewer_height = window_height - (navbar_height + breadcrumbs_height + 2);
                var outerContainer_height = fileViewer_height - (file_button_action_height + 2);
                var items_Scan_height = fileViewer_height - (toolbarViewer_Scanfile_height + 2);
                var tab_data_height = fileViewer_height - (label_group_tab_custom_height + 2);
                var sidebar_menu_height = window_height - (navbar_height + 2);
                var outerContainer_height_i = "height: " + outerContainer_height + "px !important";
                $("#FileViewer").css("height", fileViewer_height);
                $("#FileViewer .secrtc2 .widget").css("height", fileViewer_height);
                $("#FileViewer .secrtc1 .ScanResult").css("height", fileViewer_height);
                $("#FileViewer .secrtc1 .ScanResult .items_Scan").css("height", items_Scan_height);
                $("#FileViewer #outerContainer").css("height", outerContainer_height);
                $("#FileViewer #DocProIMGMap").attr('style', outerContainer_height_i);
                $("#FileViewer .doc-viewer").attr('style', outerContainer_height_i);
                $("#FileViewer .group-tab .tab-data").css("height", tab_data_height);
                $(".page-sidebar .sidebar-menu").css("height", sidebar_menu_height);
            } else {
                $("#FileViewer").css("height", "auto");
                $("#FileViewer .secrtc2 .widget").css("height", fileViewer_height);
                $("#FileViewer .secrtc1 .ScanResult").css("height", fileViewer_height);
                $("#FileViewer .secrtc1 .ScanResult .items_Scan").css("height", items_Scan_height);
                $("#FileViewer #outerContainer").css("height", outerContainer_height);
                $("#FileViewer #DocProIMGMap").attr('style', outerContainer_height_i);
                $("#FileViewer .doc-viewer").attr('style', outerContainer_height_i);
                $("#FileViewer .group-tab .tab-data").css("height", "auto");
                $(".page-sidebar .sidebar-menu").css("height", "auto");
            }
        }

    },
    newsfeedimg: function () {
        // NewsFeed image grid
        $(".timeline-body").each(function () {
            if ($(this).find(".card-image").is(":visible")) {
                var NewsFeed_Image_Count = $(this).find(".card-image").length;
                //alert(NewsFeed_Image_Count);
                if (parseInt(NewsFeed_Image_Count) > 2) {
                    $(this).find(".card-image").addClass("multi_card_img");
                    $(this).find(".card-image").addClass("hidden");
                    $(this).find(".card-image:eq(0)").removeClass("hidden");
                    $(this).find(".card-image:eq(1)").removeClass("hidden").addClass("equal_height");
                    $(this).find(".card-image:eq(2)").removeClass("hidden").addClass("equal_height");
                    var temp_img_heights = 0;
                    $(this).find(".card-image.equal_height img").each(function () {
                        var temp_img_height = jQuery(this).height();
                        if (parseInt(temp_img_height) > parseInt(temp_img_heights)) {
                            temp_img_heights = temp_img_height;
                        }
                    });
                    $(this).find(".card-image.equal_height").css("height", temp_img_heights);
                    $(this).find(".card-image.equal_height img").css("height", temp_img_heights);
                    $(this).find(".card-image.equal_height").addClass("fit_thumbnail");
                    if (parseInt(NewsFeed_Image_Count - 3) > 0) {
                        var other_img_count_msg = "<div class='other_img_count'>" + (NewsFeed_Image_Count - 3) + "<i class='ion-plus-round'></i></div>";
                        $(this).find(".card-image.equal_height:eq(1) img").after(other_img_count_msg);
                        var other_img_count = $(this).find(".other_img_count").width();
                        $(this).find(".other_img_count").css("margin-left", -(other_img_count / 2));
                    }
                } else if (parseInt(NewsFeed_Image_Count) == 2) {
                    $(this).find(".card-image").addClass("two_card_img");
                } else {
                    $(this).find(".card-image").addClass("one_card_img");
                }
            }

        });
    },
    Scroll_table: function () {
        //if ($("table.table").is(":visible")) {
        //    jQuery("table.table").each(function () {
        //        var obj = jQuery(this);
        //        if (!obj.parent().hasClass("over_auto")) {
        //            obj.wrapAll('<div class="over_auto"></div>');
        //        }
        //        obj.find("tbody tr").each(function () {
        //            $(this).find("td").each(function (index) {
        //                var data_title = $(this).parents("tbody").prev("thead").find("tr").find("th").eq(index).clone().children().remove().end().text();
        //                if (data_title.trim()) {
        //                    //$(this).attr("data-title",data_title);
        //                }
        //            });
        //        });
        //    });
        //}
    },
    Scroll_tab_group: function () {
        if ($(".group_tab_scroll").is(":visible")) {
            var group_tab_scroll_w = 0;
            group_tab_scroll_w = $(".group_tab_scroll").outerWidth(true);

            var group_tab_w = 0;
            $(".group_tab_scroll .tabitem:not(.hidden)").each(function () {
                var group_tab_item_w = $(this).outerWidth(true) + 2;
                $(this).addClass("tab_show");
                group_tab_w = group_tab_w + group_tab_item_w;
            });
            if (group_tab_w > group_tab_scroll_w) {
                jQuery(".group_tab_scroll_next").removeClass("hidden");
                var tab_each_itemt = 0;
                jQuery(".group_tab_scroll > .tab_show").each(function () {
                    var tab_show_w = jQuery(this).outerWidth(true);
                    if (parseInt(tab_show_w) > parseInt(tab_each_itemt)) {
                        tab_each_itemt = tab_show_w;
                    }
                });
                jQuery(".group_tab_scroll > .tab_show").css("width", tab_each_itemt);
                var tab_length = jQuery(".group_tab_scroll > .tab_show").length;
                $(".group_tab_scroll").css("width", tab_each_itemt * tab_length);
                var translate_css_px = 0;
                var tem_w = tab_each_itemt * tab_length;

                $(".group_tab_scroll_next").click(function () {
                    jQuery(".group_tab_scroll_prev").removeClass("hidden");
                    translate_css_px = translate_css_px - tab_each_itemt;
                    var translate_css = 'translateX(' + translate_css_px + 'px)';
                    $(".group_tab_scroll").css({ "transform": translate_css });
                    tem_w = tem_w - tab_each_itemt;
                    $(".group_tab_scroll_prev").show();
                    if (tem_w <= group_tab_scroll_w) {
                        $(this).hide();
                    }
                });
                $(".group_tab_scroll_prev").click(function () {
                    translate_css_px = translate_css_px + tab_each_itemt;
                    var translate_css = 'translateX(' + translate_css_px + 'px)';
                    $(".group_tab_scroll").css({ "transform": translate_css });
                    tem_w = tem_w + tab_each_itemt;
                    $(".group_tab_scroll_next").show();
                    if (tem_w >= (tab_each_itemt * tab_length)) {
                        $(this).hide();
                    }
                });
            }
        }
    },
    Table_sort: function () {
        if ($("table .sortitem").is(":visible")) {
            $(document).find(".sortitem").parents("th").addClass("sortitem_th");
        }
    },
    callAjax: function (data, url, obj, callback, isAsync = true, silent = false) {
        jQuery.ajax({
            type: "POST",
            async: isAsync,
            url: url,
            data: data,
            beforeSend: function () {
                if (!silent) {
                    if (obj != undefined && !obj.hasClass("not-overlay")) {
                        Utils.openOverlay();
                    }
                }
            },
            complete: function () {
                if (!silent) {
                    if (obj != undefined && !obj.hasClass("not-overlay")) {
                        Utils.openOverlay();
                    }
                }
            },
            error: function () {
                if (!silent) {
                    if (obj != undefined && !obj.hasClass("not-overlay")) {
                        Utils.openOverlay();
                    }
                }
            },
            success: function (response) {
                if (typeof callback === "function")
                    callback(response);
            }
        });
    },
};

$(document).on('DOMNodeInserted', function (e) {
    if ($(e.target).hasClass('flash')) {
        Utils.flash_position();
    }
});
// avcfn:    Advanced Click Function
// avfn:     Advanced Function
// bfn:         Basic Function
// jsb:         Begin Js
// bte:         Boostrap Tabs Event
// cfn:         Click function
// rfn:         Document Ready function
// sbc:         Sys Browser code
// wcs:         Warning console



//--DOCUMENT READY FUNCTION BEGIN
$(document).ready(function () {
    var $window = $(window);
    var breakpoint = 768;
    var last = $window.width() < breakpoint;

    var wWwidth = $window.width();

    if (last == true ) {
        if ($('.useSlickSlider-title') != null || $('.useSlickSlider-title').length != 0 ) {
            Cust.updateSliderTitle()
        }
    }
    Utils.flash_position();
    if ($(".fsi_group_tabs .nav-tabs").length != 0) {
        $(".fsi_group_tabs .nav-tabs").each(function () {
            var length = $(this).children("li:not(.hidden)").length;
            if (length > 1) {
                $(this).css("display", "block");
            }
        });
    }
    
    list_pagi(0, "");
    jQuery(document).on('click', '.more_slide_next', function () {
        var target = $("#" + $(this).parent(".useMoreSlide").attr("data-target"));
        var index = parseInt($(this).attr("data-index"));
        list_pagi(index, "");
    });
    jQuery(document).on('click', '.more_slide_prev', function () {
        var target = $("#" + $(this).parent(".useMoreSlide").attr("data-target"));
        var index = parseInt($(this).attr("data-index"));
        list_pagi(index, "");
    });

    Cust.dataTables_filter_col();
    Cust.check_required_input();
    $(document).on("dialogopen", function (event, ui) {
        if (jQuery(document).find(".date").is(":visible")) {
            jQuery('.date').datetimepicker({
                format: 'd/m/Y',
                timepicker: false
            });
        }
        if (jQuery(document).find('[data-toggle="popover"]').is(":visible")) {
            jQuery(document).find('[data-toggle="popover"]').popover();
        }
        if (jQuery(document).find(".selectpicker").is(":visible")) {
            $('.selectpicker').selectpicker();
        }
        if (jQuery(document).find(".autoSelect2").is(":visible")) {
            $("select.autoSelect2").select2();
        }
        if (jQuery(document).find(".autoSelect2Ajax").is(":visible")) {
            var select2Ajaxs = jQuery(document).find(".autoSelect2Ajax");
            select2Ajaxs.each(function (s) {

                var self = jQuery(s);
                var url = self.attr("data-url");
                var token = self.attr("data-token");
                if (url) {
                    var config = {
                        url: url,
                        dataType: 'json',
                        data: {
                            Token: token
                        }
                    }
                    self.select2({
                        ajax: config
                    });
                }
            });
        }



        // lock scroll position, but retain settings for later
        // var scrollPosition = [
        //   self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        //   self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
        // ];
        // var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
        // html.data('scroll-position', scrollPosition);
        // html.data('previous-overflow', html.css('overflow'));
        // html.css('overflow', 'hidden');
        // window.scrollTo(scrollPosition[0], scrollPosition[1]);
        if ((jQuery(document).find("#Overlay").is(":visible")) && (jQuery(document).find("#Overlay").hasClass("loadingc"))) {
            jQuery(document).find("#Overlay").removeClass("loadingc");
        }
        Cust.check_required_input();
    });
    $(document).on("dialogclose", function (event, ui) {
        // un-lock scroll position
        // var html = jQuery('html');
        // var scrollPosition = html.data('scroll-position');
        // html.css('overflow', html.data('previous-overflow'));
        // window.scrollTo(scrollPosition[0], scrollPosition[1]);
    });
    jQuery('.widget-buttons > [data-toggle="maximize"]').on("click", function () {
        jQuery("body").toggleClass("maximize");
    });

    function display_dock() {
        //dock
        var dock = $(".dock #dockWrapper");
        dock.css("margin-top", "0px");
        dock.css("opacity", "1");
        //toggle_dock
        var toggle_dock = $(".toggle_dock");
        toggle_dock.css("opacity", "0");
        $(".dock").css("visibility", "visible");
        jQuery(".toggle_dock").addClass("is_hidden");
        jQuery(".toggle_dock").removeClass("is_show");
        localStorage.setItem('toggle_dock_stt', 'dock_is_show');
    }
    function hide_dock() {
        //dock
        var dock = $(".dock #dockWrapper");
        dock.css("margin-top", "100px");
        dock.css("opacity", "0");
        //toggle_dock
        var toggle_dock = $(".toggle_dock");
        toggle_dock.css("opacity", "1");

        $(".dock").css("visibility", "hidden");
        jQuery(".toggle_dock").removeClass("is_hidden");
        jQuery(".toggle_dock").addClass("is_show");
        localStorage.setItem('toggle_dock_stt', 'dock_is_hide');
    }
    jQuery(".btn_show_dock").click(function (e) {
        e.preventDefault();
        //dock
        var dock = $(".dock #dockWrapper");
        dock.animate({ "opacity": "1", "margin-top": "0px" }, 300);

        //toggle_dock
        var toggle_dock = $(".toggle_dock");
        toggle_dock.animate({ "opacity": "0" }, 300);
        toggle_dock.css({
            'transition': 'all .3s',
            'transform': 'scale(0)',
        });

        jQuery(".toggle_dock").addClass("is_hidden");
        jQuery(".toggle_dock").removeClass("is_show");
        $(".dock").css("visibility", "visible");
        localStorage.setItem('toggle_dock_stt', 'dock_is_show');
    });
    jQuery(".btn_hide_dock").click(function (e) {
        e.preventDefault();
        //dock
        var dock = $(".dock #dockWrapper");
        dock.animate({ "margin-top": "100px", "opacity": "0" }, 300);

        //toggle_dock
        var toggle_dock = $(".toggle_dock");
        toggle_dock.animate({ "opacity": "1" }, 300);


        toggle_dock.css({
            'transition': 'all .3s',
            'transform': 'scale(1)',
        });

        jQuery(".toggle_dock").removeClass("is_hidden");
        jQuery(".toggle_dock").addClass("is_show");
        $(".dock").css("visibility", "hidden");
        localStorage.setItem('toggle_dock_stt', 'dock_is_hide');
    });
    if (localStorage.getItem('toggle_dock_stt') == 'dock_is_show') {
        display_dock();
    } else {
        hide_dock();
    }
    $('.multi-action .action-button').on('click', function () {
        $(this).toggleClass('active');
        if ($(this).parents().attr("data-original-title") == "") {
            $(this).parents().attr("data-original-title", "Danh sách ghim");
            $(this).parents().next(".tooltip").show();
        } else {
            $(this).parents().attr("data-original-title", "");
            $(this).parents().next(".tooltip").hide();
        }
    });


    if (jQuery(".databox .databox-right > .databox-text > a").is(":visible")) {
        jQuery(".databox .databox-right > .databox-text > a").each(function () {
            var databox_text = jQuery(this).find("span").text();
            jQuery(this).attr("title", databox_text);
            jQuery(this).attr("data-toggle", "tooltip");
            jQuery(this).attr("data-placement", "top");
        });
        $('[data-toggle="tooltip"]').tooltip();
    }
    if (jQuery(".databox span.databox-text").is(":visible")) {
        jQuery(".databox span.databox-text").each(function () {
            var databox_text = jQuery(this).text();
            jQuery(this).attr("title", databox_text);
        });
    }
    if (jQuery(".sidebar-menu .menu-text").is(":visible")) {
        jQuery(".sidebar-menu .menu-text").each(function () {
            var menu_text = jQuery(this).text();
            jQuery(this).attr("title", menu_text);
        });
    }
    Cust.fileViewer_height_fn();
    $('[data-toggle="tooltip"]').tooltip();
    //advanced_search_bar
    $(".advanced_search_bar .show_form_btn").focus(function () {
        $(this).parents(".advanced_search_bar").addClass("active");
        $(this).parents(".advanced_search_bar").find(".option_search").fadeIn();
    });
    $(".advanced_search_bar .hide_form_btn").click(function () {
        $(this).parents(".advanced_search_bar").removeClass("active");
        $(this).parents(".option_search").fadeOut();
    });

    //notification
    jQuery(document).on("click", ".notifies-dropdown-toggle", function () {
        var self = jQuery(this);
        var target = jQuery(self.data("target"));
        if (target.is(":hidden"))
            if (!self.hasClass("renderd")) {
                self.addClass("renderd");
                var url = self.attr("data-url");
                var target = self.attr("data-target");
                jQuery(target).addClass('loading');

                self.parents('li').addClass('open');
             
                Cust.callAjax({},
                    url,
                    self,
                    function (data) {
                        jQuery(target).removeClass('loading');
                        if (data.hasOwnProperty("isCust")) {
                            jQuery(target).html(data.htCust);
                            //Utils.closeOverlay();

                            jQuery(target).html(data.htCust);
                            Utils.updateScrollBar(jQuery(target));
                            jQuery(target).find(".selectpicker").selectpicker();
                            jQuery(target).on('mouseover',
                                ".ntfit.unread",
                                function () {
                                    try {
                                        var data = jQuery(this).removeClass("unread").getData();
                                        var currTotal = jQuery("#NtfUnread").attr('data-value');
                                        if (currTotal == "" || currTotal == "0")
                                            return;

                                        var unreadTotal = parseInt(currTotal) - 1;
                                        jQuery("#NtfUnread").attr("data-value", unreadTotal).text(unreadTotal);
                                        Realtime.processer.server.notificationRead({
                                            Id: data.id
                                        });
                                    } catch (e) {
                                        console.log(e);
                                    }
                                });
                        }
                    });
            } else {
                self.parents('li').addClass('open');
            }
        else
            $(".notifies-dropdown-toggle").parents("li").removeClass("open");
    });


    jQuery(document).mouseup(function (e) {
        var container = jQuery(".notifies-dropdown-toggle").parents("li");
        if (container.is(":visible")) {
            if (!container.is(e.target) // if the target of the click isn't the container...
                && container.has(e.target).length === 0) // ... nor a descendant of the container
            {
                $(".notifies-dropdown-toggle").parents("li").removeClass("open");
            }
        }
    });
    jQuery(".navbar .navbar-inner .navbar-header .navbar-account .account-area li.dropdown-hover a .dropdown-expand").click(function (event) {
        event.stopPropagation();
        event.preventDefault();
        jQuery(this).toggleClass("inited");
        jQuery(".navbar .navbar-inner .navbar-header .navbar-account .account-area li.dropdown-hover a .dropdown-expand:not('.inited')").removeClass("active");
        jQuery(this).toggleClass("active");
        jQuery(this).removeClass("inited");

        jQuery(this).parents(".dropdown-hover").toggleClass("inited");
        jQuery(".navbar .navbar-inner .navbar-header .navbar-account .account-area li.dropdown-hover:not('.inited')").find(".dropdown-menu").slideUp(300);
        jQuery(this).parents(".dropdown-hover").find(".dropdown-menu").slideToggle(300);
        jQuery(this).parents(".dropdown-hover").removeClass("inited");
    });
    $(".mgtitle").click(function (e) {
        e.preventDefault();
        return false;
    });
    //Sidebar Menu Handle
    $(".menu-expand").on('click', function (e) {
        e.preventDefault();
        if ($(this).parents(".has_mgtitle").hasClass("open")) {
            $(this).parents(".has_mgtitle").removeClass("open").nextUntil(".has_mgtitle", "li:not(.hidden)").slideUp();
        } else {
            $(this).parents(".has_mgtitle").addClass("open").nextUntil(".has_mgtitle", "li:not(.hidden)").slideDown();
        }
    });
    //End Sidebar Menu Handle

    var dragTimer;
    $(window).on('dragenter', function () {
        $(this).preventDefault();
    });
    $(document).on('dragover', function (e) {
        var dt = e.originalEvent.dataTransfer;
        if (dt.types && (dt.types.indexOf ? dt.types.indexOf('Files') != -1 : dt.types.contains('Files'))) {
            $("#drap_drop_fixed").addClass("active");
            $(".drap_drop_fixed_ov").addClass("active");
            window.clearTimeout(dragTimer);
        }
    });
    $(".sup_header .btn_sup").click(function () {
        jQuery(".support_id").toggleClass("active");
    });


    // JS click user
    $('.click_caret').click(function (event) {
        event.preventDefault();
        $('.drop_click_caret').toggleClass('open');
    });
    $(document).click(function (e) {
        var target = e.target;
        if (!$(target).is('.click_caret') && !$(target).is('.click_caret')) {
            $('.drop_click_caret').removeClass('open');
        }
    });
    // JS ADV SEARCH
    $(document).on("click", ".AdvSearchLink", function (e) {
        e.preventDefault();
        var url = $(this).attr("myhref");
        window.location = url;
    });

});
//--DOCUMENT READY FUNCTION END
//--WINDOW resize FUNCTION BEGIN

$(window).resize(function () {
    list_pagi(0, "resize");
    Cust.fileViewer_height_fn();
    Cust.Scroll_tab_group();

});
//--WINDOW resize FUNCTION END



jQuery(document).ready(function () {

    if (document.getElementById("licenseDemo")) {

        Highcharts.chart('licenseDemo', {
            chart: {
                type: "line"
            },
            title: {
                text: 'THỐNG KÊ SỐ LƯỢNG YÊU CẦU CẤP LICENSE THEO THÁNG'
            },

            subtitle: {
                text: ''
            },

            yAxis: {
                title: {
                    text: 'Số lượng'
                }
            },
            xAxis: {
                categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']
            },
            exporting: {
                enabled: false
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    }
                }
            },

            series: [{
                name: 'Tất cả',
                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175, 119931, 137133, 154175, 154175]
            }, {
                name: 'Docpro',
                data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434, 32490, 30282, 38121, 40434]
            }, {
                name: 'Ione SDK',
                data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387, 20185, 24377, 32147, 39387]
            }, {
                name: 'Ione API',
                data: [7988, 7988, 7988, 12169, 15112, 22452, 34400, 34227, 15112, 22452, 34400, 34227]
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        });

    }
});





function list_gen(container, resize, n, width) {
    container.find(".more_slide_item.curent_slide").last().nextAll().addClass("temp_next");
    container.find(".more_slide_item.temp_next").css("opacity", ".01");
    var temp_next_length = container.find(".more_slide_item.temp_next").length;
    var next_index = container.children(".more_slide").children(".more_slide_item").index(container.children(".more_slide").children(".more_slide_item.temp_next").first());
    if (!container.attr("data-first-index") && resize != "resize") {
        container.attr("data-first-index", next_index);
    } else if (container.attr("data-first-index") && resize == "resize") {
        container.attr("data-first-index", next_index);
    }
    var first_index = container.attr("data-first-index");
    container.find(".more_slide_next").attr("data-index", next_index);
    container.find(".more_slide_prev").attr("data-index", n - first_index);
    if (temp_next_length != 0) {
        container.find(".more_slide_next").show();
        container.find(".next_count").html("+" + temp_next_length);

    } else {
        container.find(".more_slide_next").hide();
    }
    container.find(".more_slide_item.curent_slide").first().prevAll().addClass("temp_prev");
    container.find(".more_slide_item.temp_prev").css("opacity", ".01");
    var temp_prev_length = container.find(".more_slide_item.temp_prev").length;
    if (temp_prev_length != 0) {
        container.find(".more_slide_prev").show();
        container.find(".prev_count").html("+" + temp_prev_length);

    } else {
        container.find(".more_slide_prev").hide();
    }
    var translate_x = 0;
    for (i = 0, len = temp_prev_length; i < len; i++) {
        translate_x = translate_x + parseInt(container.find(".more_slide_item.temp_prev").eq(i).attr("data-width"));
    }
    var curent_x = 0;
    for (i = 0, len = container.find(".more_slide_item.curent_slide").length; i < len; i++) {
        curent_x = curent_x + parseInt(container.find(".more_slide_item.curent_slide").eq(i).attr("data-width"));
    }
    var half_x = 0;
    if (temp_next_length != 0 || temp_prev_length != 0) {
        half_x = (width - curent_x) / 2;
    }
    container.children(".more_slide").css("transform", "translateX(" + -(translate_x - half_x) + "px)");
}
function list_pagi(n, resize) {
    var width = 0,
        more_slide_width = 0,
        item_width = 0,
        page_width = 0,
        next_count = 0;
    jQuery(document).find(".useMoreSlide").each(function () {
        var target = $("#" + $(this).attr("data-target"));
        target.attr("data-width", target.outerWidth(true));
        target.children(".more_slide").attr("data-width", target.children(".more_slide").outerWidth(true));
        target.find(".more_slide_item").each(function () {
            $(this).attr("data-width", $(this).outerWidth(true));
        });
        width = parseInt(target.attr("data-width"));
        more_slide_width = parseInt(target.children(".more_slide").attr("data-width"));
        target.find(".more_slide_item").removeClass("temp_prev");
        target.find(".more_slide_item").removeClass("temp_next");
        target.find(".more_slide_item").removeClass("curent_slide");
        var length = target.find(".more_slide_item").length;
        for (i = n, len = length; i < len; i++) {
            item_width = parseInt(target.find(".more_slide_item").eq(i).attr("data-width"));
            if (page_width + item_width < width) {
                page_width = page_width + item_width;
                target.find(".more_slide_item").eq(i).addClass("curent_slide");
                target.find(".more_slide_item").eq(i).css("opacity", "1");
                if (i == len - 1) {
                    list_gen(target, resize, n, width);
                }
            } else {
                list_gen(target, resize, n, width);
                break
            }
        }
    });
}

//--WINDOW LOADED FUNCTION BEGIN
$(window).bind("load", function () {
    if ($(document).find('input[class*="autocomplete"]').length != 0) {
        $(document).find('input[class*="autocomplete"]').each(function () {
            jQuery(this).attr("autocomplete", "new-password");
        });
    }

    jQuery(document).find(".js_line_chart").each(function () {
        //container.find(".js_line_chart").each(function () {
        if ($(this).is(":visible")) {
            var mrdata = JSON.parse(jQuery(this).attr("data-value"));
            var target = jQuery(this).attr("data-target");
            new Chart(document.getElementById("user_count_chart").getContext("2d")).Line(mrdata);
            //new Chart(target.getContext("2d")).Line(mrdata);
        }
    });

    $("[data-fancybox]").fancybox({
        margin: [44, 0, 22, 0],
        loop: true,
        buttons: [
            "zoom",
            //"share",
            //"slideShow",
            "fullScreen",
            "download",
            //"thumbs",
            "close"
        ],
    });
    $(".jobFile_Fancybox").click(function () {
        $(this).parents(".jobFile_Attach").find(".jobFile_Name").click();
    });
    $(document).find('.dataTables_wrapper .table:not(.useTreegrid)').each(function () {
        if (!$(this).hasClass("stacktable_inited") && !$(this).hasClass("not_js_responsive")) {
            $(this).addClass("stacktable_inited");
            $(this).stacktable();
        }
    });
    Cust.newsfeedimg();
    Cust.Scroll_table();
    Cust.Scroll_tab_group();
    Cust.Table_sort();


    $('.toggle_notifications').on('click', function () {
        if (!$(this).hasClass("inited")) {
            $(this).addClass("inited");
            var Ntf_less_count = 0;
            jQuery(document).find("#NtfContainer").find(".user_item").each(function () {
                Ntf_less_count = Ntf_less_count + 1;
                var obj = $(this);
                obj.find(".user_item_info > em").attr("id", "Ntf_less_" + Ntf_less_count);
                var elm = document.getElementById("Ntf_less_" + Ntf_less_count);
                if (elm.offsetHeight < elm.scrollHeight) {
                    obj.find(".user_item_info > em").addClass("active");
                    obj.find(".user_item_info > em").append('<a class="icon_show_full_content" href="#" alt="Xem đầy đủ nội dung" title="Xem đầy đủ nội dung"><i class="fa fa-plus-square" aria-hidden="true"></i></a>');
                }
            });
        }
    });
    jQuery(document).on('click', '#NtfContainer .icon_show_full_content', function (e) {
        e.preventDefault();
        $(this).parent("em").toggleClass("open");
    });
    //Header right dropdown menu
    $('.header_mainMenu').on('show.bs.dropdown', function () {
        var length = $(this).find(".dropdown-notifications>li").length;
        if (!$(this).hasClass("inited") && length > 5) {
            $(this).addClass("inited");
            $(this).addClass("is_full");
            $(this).parents(".account-area").addClass("is_full");

        }
    });
    //Header left menu when sidebar is empty
    if (!$(".page-sidebar").size() == 0) {
        $("#sidebar-collapse").addClass("is_show");
    }

    /*---------CHART----------*/
    /*---QLNS---*/
    if ($("#TKNSold").length > 0) {
        Highcharts.chart('TKNSold', {

            chart: {
                type: 'column',
            },

            title: {
                text: 'THỐNG KÊ NHÂN SỰ THEO ĐỘ TUỔI'
            },
            colors: ['#FCF54C', '#9CE076'],

            xAxis: {
                categories: ['< 20', '20 - 30', '30 - 45', '> 45']
            },

            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: ''
                }
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + this.y + '<br/>' +
                        'Tổng: ' + this.point.stackTotal;
                }
            },

            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },

            series: [{
                name: 'Nam',
                data: [27, 9, 5, 1],
                stack: 'male'
            }, {
                name: 'Nữ',
                data: [3, 13, 2, 0],
                stack: 'male'
            }]
        });
    }

    if ($("#TKNSBC").length > 0) {
        Highcharts.chart('TKNSBC', {

            chart: {
                type: 'column',
                height: '450px',
            },

            title: {
                text: 'THỐNG KÊ NHÂN SỰ THEO BẰNG CẤP'
            },
            colors: ['#FCF54C', '#9CE076'],

            xAxis: {
                categories: ['Chưa xác định', 'Thạc sĩ', 'Cử nhân', 'Trợ giảng', 'Tiến sĩ', 'Thạc sỹ', 'Kỹ sư', 'Tiến sĩ', 'acb', 'BC 1 không có', 'Thạc sĩ']
            },

            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: ''
                }
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + this.y + '<br/>' +
                        'Tổng: ' + this.point.stackTotal;
                }
            },

            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },

            series: [{
                name: 'Nam',
                data: [4, 9, 8, 2, 2, 2, 3, 1, 2, 1, 0],
                stack: 'male'
            }, {
                name: 'Nữ',
                data: [0, 1, 2, 0, 2, 0, 3, 1, 1, 0, 1],
                stack: 'male'
            }]
        });
    }

    if ($("#TKNSHD").length > 0) {
        Highcharts.chart('TKNSHD', {

            chart: {
                type: 'column',
                height: '430px'
            },

            title: {
                text: 'THỐNG KÊ NHÂN SỰ THEO HỢP ĐỒNG'
            },
            colors: ['#FCF54C', '#9CE076'],

            xAxis: {
                categories: ['Học việc', 'Chính thức', 'Hợp đồng không xác định thời hạn', 'Hợp đồng cộng tác viên', 'Hợp đồng thử việc']
            },

            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: ''
                }
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + this.y + '<br/>' +
                        'Tổng: ' + this.point.stackTotal;
                }
            },

            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },

            series: [{
                name: 'Nam',
                data: [4, 7, 1, 1, 2],
                stack: 'male'
            }, {
                name: 'Nữ',
                data: [0, 3, 0, 0, 1],
                stack: 'male'
            }]
        });
    }

    // Build the chart
    if ($("#TKNNPBacontainer").length > 0) {
        Highcharts.chart('TKNNPBacontainer', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
            },

            legend: {
                enabled: true,
                layout: 'vertical',
                maxHeight: 100
            },
            title: {
                text: 'THỐNG KÊ NHÂN SỰ THEO PHÒNG BAN'
            },
            colors: ['#FCF54C', '#9CE076'],
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

                data: [
                    { name: 'Nam', y: 70 },
                    { name: 'Nữ', y: 30 }
                ]
            }]
        });
    }

    if ($("#TKNNPBacontainer1").length > 0) {
        Highcharts.chart('TKNNPBacontainer1', {

            chart: {
                type: 'column',
                height: '480',
            },

            title: {
                text: 'THỐNG KÊ GIỚI TÍNH THEO PHÒNG BAN'
            },
            colors: ['#FCF54C', '#9CE076'],

            xAxis: {
                // allowDecimals: true,
                categories: ['Chuyên môn', 'Số hóa', 'Tiếp nhận', 'Tiếp nhận TT', 'Chánh VP', 'Chuyên viên', 'CSS', 'DEV', 'Chuyên môn', 'Số hóa', 'Tiếp nhận', 'Tiếp nhận TT', 'Chánh VP', 'Chuyên viên', 'CSS', 'DEV', 'FSISoft', 'Phó Tránh VP', 'Chính sách CB', 'Sale', 'Test', 'Test1', 'Trưởng BP chuyên môn', 'Văn phòng'],
                min: 0,
                max: 5,
                scrollbar: {
                    enabled: true,
                    barBackgroundColor: 'gray',
                    barBorderRadius: 7,
                    barBorderWidth: 0,
                    button: 'none',
                    buttonBorderWidth: 0,
                    buttonBorderRadius: 7,
                    trackBackgroundColor: 'none',
                    trackBorderWidth: 1,
                    trackBorderRadius: 8,
                    trackBorderColor: '#CCC'
                }
            },

            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: ''
                }
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + this.y + '<br/>' +
                        'Tổng: ' + this.point.stackTotal;
                }
            },

            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },

            series: [{
                name: 'Nam',
                data: [0, 3, 1, 4, 7, 2, 1, 1, 1, 5, 1, 1, 2, 2, 0, 3, 1, 5, 1, 1, 2, 2, 0, 3],
                stack: 'male'
            }, {
                name: 'Nữ',
                data: [7, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 5, 1, 1, 2, 2, 0, 3],
                stack: 'male'
            }]
        });
    }

    $('.TQAdmin2Bith').owlCarousel({
        animateOut: 'slideOutDown',
        animateIn: 'flipInX',
        items: 1,
        margin: 30,
        stagePadding: 30,
        smartSpeed: 450,
        navigation: true,
        navigationText: ['<', '>'],
    });

    //-----Quản lý nhân sự 
    //-- KT

    if ($("#KTpiecontainer").length > 0) {
        Highcharts.chart('KTpiecontainer', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'THỐNG KÊ KHEN THƯỞNG NHÂN SỰ'
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

                data: [
                    { name: 'Thưởng tiền', y: 20 },
                    { name: 'Tuyên dương toàn cty', y: 20 },
                    { name: 'Bằng khen', y: 30 },
                    { name: 'Thưởng tiền', y: 15 },
                    { name: 'Tuyên dương', y: 15 }
                ]
            }]
        });
    }

    // -- KL

    if ($("#KLpiecontainer").length > 0) {
        Highcharts.chart('KLpiecontainer', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'THỐNG KÊ KỶ LUẬT NHÂN SỰ'
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

                data: [
                    { name: 'Phạt tiền', y: 20 },
                    { name: 'Cảnh cáo', y: 20 },
                    { name: 'Đuổi việc', y: 30 },
                    { name: 'Trừ lương', y: 15 },
                    { name: 'Tuyên dương', y: 15 }
                ]
            }]
        });
    }

    // - KT-KL

    if ($("#KTKLpiecontainer").length > 0) {
        Highcharts.chart('KTKLpiecontainer', {

            chart: {
                type: 'column'
            },

            title: {
                text: 'THỐNG KÊ KHEN THƯỞNG - KỶ LUẬT NHÂN SỰ'
            },
            colors: ['#FCF54C', '#9CE076'],

            xAxis: {
                categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'THáng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
            },

            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: ''
                }
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + this.y + '<br/>' +
                        'Tổng: ' + this.point.stackTotal;
                }
            },

            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },

            series: [{
                name: 'Khen thưởng',
                data: [0, 3, 1, 4, 7, 2, 1, 1, 1, 5, 1, 1],
                stack: 'male'
            }, {
                name: 'Kỷ luật',
                data: [7, 1, 2, 4, 3, 0, 7, 3, 0, 3, 4, 10],
                stack: 'male'
            }]
        });
    }


    //---------KHAC
    //-Nghỉ phép

    if ($("#NGHPHcontainer").length > 0) {
        Highcharts.chart('NGHPHcontainer', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'THỐNG KÊ NGHỈ PHÉP'
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

                data: [
                    { name: 'Nghỉ không lương', y: 20 },
                    { name: 'Xin đi muộn', y: 20 },
                    { name: 'Xin về sớm', y: 10 },
                    { name: 'Nghỉ phép năm', y: 30 },
                    { name: 'Nghỉ bù năm trước', y: 20 },
                ]
            }]
        });
    }

    // Thống kê nghỉ phép theo tháng
    if ($("#NGHPHnumcontainer").length > 0) {
        Highcharts.chart('NGHPHnumcontainer', {

            chart: {
                type: 'column'
            },

            title: {
                text: 'THỐNG KÊ NGHỈ PHÉP THEO THÁNG'
            },
            // colors: ['#FCF54C', '#9CE076', '#ff4d4d', '#3333cc', '#ff9900'],

            xAxis: {
                categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'THáng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
            },

            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: ''
                }
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + this.y + '<br/>' +
                        'Tổng: ' + this.point.stackTotal;
                }
            },

            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },

            series: [{
                name: 'Nghỉ không lương',
                data: [8, 3, 1, 4, 7, 2, 1, 1, 1, 5, 1, 1],
                stack: 'male'
            }, {
                name: 'Xin đi muộn',
                data: [7, 1, 2, 4, 3, 0, 7, 3, 2, 3, 4, 10],
                stack: 'male'
            }, {
                name: 'Xin về sớm',
                data: [7, 1, 2, 4, 3, 0, 7, 3, 3, 3, 4, 10],
                stack: 'male'
            }, {
                name: 'Nghỉ phép năm',
                data: [7, 1, 2, 4, 3, 0, 7, 3, 4, 3, 4, 10],
                stack: 'male'
            }, {
                name: 'Nghỉ bù năm trước',
                data: [7, 1, 2, 4, 3, 0, 7, 3, 5, 3, 4, 10],
                stack: 'male'
            }]
        });
    }



    if ($("#QLTL_TTND").length != 0) {
        /*QLTL_TTND*/
        Highcharts.chart('QLTL_TTND', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: '450px'
            },
            title: {
                text: 'THỐNG KÊ LOẠI TÀI LIỆU'
            },
            // colors: ['#5db2ff', '#fb6e52', '#e75b8d', '#a0d468', '#ffce55', '#5db2ff', '#fb6e52', '#e75b8d', '#a0d468', '#ffce55', '#5db2ff', '#fb6e52', '#e75b8d', '#a0d468', '#ffce55', '#5db2ff', '#fb6e52', '#e75b8d', '#a0d468', '#ffce55', '#5db2ff', '#fb6e52', '#e75b8d', '#a0d468', '#a0d468', '#5db2ff', '#fb6e52', '#e75b8d', '#a0d468'],
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

                data: [
                    { name: 'Văn bản hành chính', y: 5.63 },
                    { name: 'Hợp đồng', y: 0.78 },
                    { name: 'CMND', y: 0.53 },
                    { name: 'Tờ trình', y: 0 },
                    { name: 'Thí sinh dự thi', y: 0.19 },
                    { name: 'Tài liệu Hoshino', y: 2.52 },
                    { name: 'Công văn đi', y: 0 },
                    { name: 'Sổ đỏ', y: 0 },
                    { name: 'Phiếu thu thập ý kiến phản hồi', y: 0 },
                    { name: 'Phiếu yêu cầu chuyển tiền', y: 0 },

                    { name: 'Phiếu yêu cầu phát hành thư tín dụng', y: 0 },
                    { name: 'Chứng nhận PCCC', y: 0.78 },
                    { name: 'Công văn đến', y: 0 },
                    { name: 'Tài liệu Vinamilk', y: 0 },
                    { name: 'Văn bản hành chính (mộc đỏ)', y: 0.19 },
                    { name: 'Bộ Tài Chính - Hợp đồng', y: 0 },
                    { name: 'Bộ Tài Chính - Báo giá', y: 0 },
                    { name: 'Bảo Việt - Giấy yêu cầu bảo hiểm', y: 1.55 },
                    { name: 'Thông tư bộ y tế', y: 0 },
                    { name: 'Kế hoạch trung', y: 0 },

                    { name: 'Tài liệu thống kê', y: 0.19 },
                    { name: 'Video', y: 0.58 },
                    { name: 'Biểu mẫu báo cáo', y: 0 },
                    { name: 'Văn bản ngành Tư pháp', y: 1.94 },
                    { name: 'Hợp đồng mua', y: 1.36 },
                    { name: 'Hợp đồng bán', y: 6.8 },

                    { name: 'VB', y: 0.39 },
                    { name: 'Tài liệu tín dụng', y: 0.39 },
                    { name: 'Khác', y: 76.12 },
                ]
            }]
        });
    }


    if ($("#QLTL_TTBT").length != 0) {
        /*QLTL_TTBT*/
        Highcharts.chart('QLTL_TTBT', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'THỐNG KÊ DUNG LƯỢNG'
            },
            // colors: ['#53a93f', '#fb6e52', '#8cc474', '#fb6e52', '#fb6e52'],
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

                data: [
                    { name: 'Đã dùng', y: 50 },
                    { name: 'Còn trống', y: 50 },

                ]
            }]
        });
    }


    if ($("#QLTL_NDTM").length != 0) {
        Highcharts.chart('QLTL_NDTM', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'THỐNG KÊ NGƯỜI DÙNG/THƯ MỤC'
            },
            xAxis: {
                categories: ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Bốn', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai']
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
            series: [{
                name: 'Dung lượng',
                data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
                name: 'Người sử dụng',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]
        });
    }


    if ($("#QTHT_TKkiemDuyet").length != 0) {
        /*QLTL_TTND*/
        Highcharts.chart('QTHT_TKkiemDuyet', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: '380px'
            },
            title: {
                text: 'THỐNG KÊ MỨC ĐỘ THỦ TỤC'
            },
            colors: ['#8cc474', '#df5138'],
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

                data: [
                    { name: 'Đã kiểm duyệt', y: 50 },
                    { name: 'Từ chối kiểm duyệt', y: 50 },
                ]
            }]
        });
    }


    if ($("#QTHT_TKxuatBan").length != 0) {
        /*QLTL_TTND*/
        Highcharts.chart('QTHT_TKxuatBan', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: '380px'
            },
            title: {
                text: 'THỐNG KÊ ĐĂNG KÝ HỒ SƠ'
            },
            // colors: ['#8cc474', '#df5138'],
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

                data: [
                    { name: 'Đăng ký mới', y: 20 },
                    { name: 'Đã đăng ký', y: 20 },
                    { name: 'Hồ sơ thiếu', y: 10 },
                    { name: 'Hồ sơ không hợp lệ', y: 10 },
                    { name: 'Hồ sơ quá hạn', y: 10 },
                    { name: 'Hồ sơ gần đến hạn', y: 20 },
                    { name: 'Hồ sơ hoàn thành', y: 10 }
                ]
            }]
        });
    }


    if ($("#QTHT_TKkiemDuyet").length != 0) {
        /*QLTL_TTND*/
        Highcharts.chart('QTHT_TKkiemDuyet', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: '380px'
            },
            title: {
                text: 'THỐNG KÊ KIỂM DUYỆT'
            },
            colors: ['#8cc474', '#df5138'],
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

                data: [
                    { name: 'Thông thường', y: 50 },
                    { name: 'Quan trọng', y: 50 },
                ]
            }]
        });
    }

    if ($("#QTHT_TKgiaiQuyet").length != 0) {
        /*QLTL_TTND*/
        Highcharts.chart('QTHT_TKgiaiQuyet', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: '380px'
            },
            title: {
                text: 'THỐNG KÊ GIẢI QUYẾT HỒ SƠ'
            },
            // colors: ['#8cc474', '#df5138'],
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

                data: [
                    { name: 'Hồ sơ mới', y: 20 },
                    { name: 'Hồ sơ thiếu', y: 30 },
                    { name: 'Hồ sơ không hợp lệ', y: 10 },
                    { name: 'Hồ sơ quá hạn', y: 5 },
                    { name: 'Hồ sơ gần đến hạn', y: 15 },
                    { name: 'Hồ sơ hoàn thành', y: 10 },
                ]
            }]
        });
    }
    // if ($(".first_active").length != 0) {
    //     $('ul.first_active li:first-child').addClass('active');
    //}
});

//--WINDOW LOADED FUNCTION END    



