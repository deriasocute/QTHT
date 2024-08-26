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
jQuery(document).on("click", ".scrollItem_item_title .onToggle", function () {
    if ($(this).parents(".scrollItem_item").find('.scrollItem_content').is(":visible")) {
        $(this).parents(".scrollItem_item").find('.scrollItem_content').slideUp();
    } else {
        $(this).parents(".scrollItem_item").find('.scrollItem_content').slideDown();
    }
    $(this).parents(".scrollItem_item").toggleClass("open");
    $(this).toggleClass('fa-caret-right fa-caret-down');
    rule_check();
});
jQuery(document).on("click", ".scrollItem_content .checkbox .colored-success", function () {
    rule_check();
});
jQuery(document).on("click", ".ui-dialog .ui-dialog-titlebar-close", function () {
    $(".scrollItem_item_title").find(".fa_some").addClass("hidden");
    $(".scrollItem_item_title").find(".fa_all").addClass("hidden");
});
//JS DATAFILLTER SEARCH
jQuery(document).on('click', '.dataFilter_Dropdown .dropdown-toggle, dataFilter_Dropdown .dropdown-toggle i', function () {
    jQuery(this).parents(".dataFilter_Dropdown").toggleClass("open");
    jQuery(this).parents(".quickSearch ").find(".dataFilter_Dropdown_target").toggleClass("open");
});
jQuery(document).on('click', '.dataFilter_Dropdown_close', function (e) {
    e.preventDefault();
    jQuery(this).parents(".quickSearch").find(".dataFilter_Dropdown").toggleClass("open");
    jQuery(this).parents(".quickSearch").find(".dataFilter_Dropdown_target").toggleClass("open");
});
jQuery(document).on('click', '.dropdown-toggle', function (e) {
    if ($(e.target).attr('id') !== 'dataFilter_Dropdown'
        && $(e.target).parent().attr('id') !== 'dataFilter_Dropdown'
        && $(e.target).closest(".dataFilter_Dropdown_target").length == 0

    ) {
        $(".quickSearch").find(".dataFilter_Dropdown").removeClass("open");
        $(".quickSearch").find(".dataFilter_Dropdown_target").removeClass("open");
    }
});
jQuery(document).on('click', function (e) {
    var container = $(".dataFilter_Dropdown_target");
    if (!container.is(e.target) && container.has(e.target).length === 0
        && container.hasClass('open') && $(e.target).attr('id') !== 'dataFilter_Dropdown' && $(e.target).parent().attr('id') !== 'dataFilter_Dropdown') {
        $(".quickSearch").find(".dataFilter_Dropdown").toggleClass("open");
        $(".quickSearch").find(".dataFilter_Dropdown_target").toggleClass("open");
    }
});

jQuery(document).on('click', '.dataFilter_Dropdown_Section [type="submit"]', function () {
    jQuery(this).parents('form').find(".dataFilter_Dropdown").removeClass('open');
    jQuery(this).parents('form').find(".dataFilter_Dropdown_target").removeClass('open');
});
jQuery(document).on('change', '.checkboxchange', function (e) {
    var url = jQuery(this).attr("data-url");
    var ischeck = jQuery(this).prop('checked');
    var id = jQuery(this).attr('id');
    jQuery(this).closest('table').find('.checkboxchange').each(function () {
        console.log('dac');
        if (jQuery(this).attr('id') != id)
            jQuery(this).prop('checked', false);
    });
    jQuery.ajax({
        type: "POST",
        async: true,
        url: url,
        data: { IsCheck: ischeck },
        beforeSend: function () {

        },
        complete: function () {
        },
        error: function () {
        },
        success: function (response) {

        }
    });
});
$('body').keyup(function (e) {
    if (e.keyCode == '27') {
        if ($(this).is(":visible") == true) {
            $('.modal').modal('hide');
            $(this).removeClass('modal-open').css('padding-right', '0');
        }
        else {

        }
    }
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
        if ($("table.table").is(":visible")) {
            jQuery("table.table").each(function () {
                var obj = jQuery(this);
                if (!obj.parent().hasClass("over_auto")) {
                    obj.wrapAll('<div class="over_auto"></div>');
                }
                obj.find("tbody tr").each(function () {
                    $(this).find("td").each(function (index) {
                        var data_title = $(this).parents("tbody").prev("thead").find("tr").find("th").eq(index).clone().children().remove().end().text();
                        if (data_title.trim()) {
                            //$(this).attr("data-title",data_title);
                        }
                    });
                });
            });
        }
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
    fixDeplucateParam: function (url, key) {
        //Get first
        if (url.indexOf('&' + key + '=') > 0) {
            var urlparts = url.split('?');
            if (urlparts.length >= 2) {

                var stuff = urlparts[1];
                pars = stuff.split("&");
                var comps = {};
                for (i = pars.length - 1; i >= 0; i--) {
                    spl = pars[i].split("=");
                    comps[spl[0]] = spl[1];
                }
                pars = [];
                for (var a in comps)
                    pars.push(a + "=" + comps[a]);
                url = urlparts[0] + '?' + pars.join('&');
                return url;
            } else {
                return url;
            }
        }
        return url;
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
//--DOCUMENT READY FUNCTION BEGIN
$(document).ready(function () {
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
        //if (jQuery(document).find(".date").is(":visible")) {
        //    jQuery('.date').datetimepicker({
        //        format: 'd/m/Y',
        //        timepicker: false
        //    });
        //}
        if (jQuery(document).find('[data-toggle="popover"]').is(":visible")) {
            jQuery(document).find('[data-toggle="popover"]').popover();
        }
        if (jQuery(document).find(".selectpicker").is(":visible")) {
            $('.selectpicker').selectpicker();
        }
        if (jQuery(document).find(".autoSelect2").is(":visible")) {
            $("select.autoSelect2").select2();
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
        Utils.updateInputDate(jQuery(document));
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
    jQuery(document).mouseup(function (e) {
        var container = jQuery(".bootstrap-select");
        if (container.is(":visible")) {
            if (!container.is(e.target) // if the target of the click isn't the container...
                && container.has(e.target).length === 0) // ... nor a descendant of the container
            {
                container.removeClass("open");
            }
        }
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

    //Save current language for user
    $(document).on("click", ".switchLanguage", function (e) {
        e.preventDefault();
        var curLang = $(this).data("language");
        var href = $(this).attr("href");
        jQuery.ajax({
            type: "POST",
            async: true,
            url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/home/save-curent-lang.html",
            data: { "Language": curLang },
            success: function (response) {
                if (response) {
                    var domain = Utils.getDomain();
                    var strHref = domain + href;
                    window.location = strHref;
                }
            }
        });
    });

    $('.advanced_search_bar .btn-searchs .btn-group').on('shown.bs.dropdown', function () {
        $(this).find(".bootstrap-select > .dropdown-menu > .dropdown-menu.inner").addClass("useScrollbar");
        $(this).find(".bootstrap-select > .dropdown-menu > .dropdown-menu.inner.useScrollbar").perfectScrollbar();
    });
});
//--DOCUMENT READY FUNCTION END


//--WINDOW LOADED FUNCTION BEGIN

$(window).bind("load", function () {
    if ($(document).find('input[class*="autocomplete"]').length != 0) {
        $(document).find('input[class*="autocomplete"]').each(function () {
            jQuery(this).attr("autocomplete", "new-password");
        });
    }
    if ($("[data-fancybox]").length != 0) {
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
    }
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
    jQuery(document).on('change', '.select_change', function (e) {
        e.stopPropagation();
        var select = jQuery(this);
        var url = select.attr('data-url');
        var target = select.attr('data-target');
        var urlOther = select.attr('data-url-other');
        var targetOther = select.attr('data-target-other');
        if (select.hasClass("bootstrap-select")) {
            return false;
        }

        var ajaxRequests = [];
        var ajaxRequest1 = jQuery.ajax({
            type: "POST",
            async: true,
            url: url,
            data: {
                IDType: select.val() || 0,
                id: select.val() || 0
            },
            beforeSend: function () {
                //jQuery(target).addClass("loading").html("")
            },
            complete: function () {
                jQuery(target).removeClass("loading");
            },
            error: function () {
                jQuery(target).removeClass("loading");
            },
            success: function (data) {
                Utils.sectionBuilder(data);
                if (data.hasOwnProperty("isCust")) {
                    jQuery(target).html(data.htCust);
                    jQuery('.selectpicker').selectpicker('refresh');
                }
                //jQuery(target).removeClass("loading");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
        if (targetOther != undefined) {
            var ajaxRequest2 = jQuery.ajax({
                type: "POST",
                async: true,
                url: urlOther,
                data: {
                    IDType: select.val() || 0,
                    id: select.val() || 0
                },
                beforeSend: function () {
                    jQuery(targetOther).addClass("loading").html("")
                },
                complete: function () {
                    jQuery(targetOther).removeClass("loading");
                },
                error: function () {
                    jQuery(targetOther).removeClass("loading");
                },
                success: function (data) {
                    Utils.sectionBuilder(data);
                    if (data.hasOwnProperty("isCust")) {
                        jQuery(targetOther).html(data.htCust);
                        jQuery('.selectpicker').selectpicker('refresh');
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                }
            });
            ajaxRequests.push(ajaxRequest1, ajaxRequest2);
            Promise.all(ajaxRequests)
                .then(function (results) {
                    // Handle the results if needed
                })
                .catch(function (errors) {
                    // Handle errors if any
                });
        }
        else {
            Promise.all(ajaxRequest1)
                .then(function (results) {
                    // Handle the results if needed
                })
                .catch(function (errors) {
                    // Handle errors if any
                });
        }
    });

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
});
//--WINDOW LOADED FUNCTION END    

$(window).resize(function () {
    list_pagi(0, "resize");
    Cust.fileViewer_height_fn();
    Cust.Scroll_tab_group();
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
jQuery(function () {
    /**
     * TableSizing
     * @param {string} tableID
     */
    function TableSizing(tableID) {
        this.table = $(tableID);
        this.tableWrapper = this.table.closest('.dataTables_wrapper');

        this.getHeight = function () {
            var top = this.table.offset().top;
            var bottom = this.tableWrapper.find('.DTTTFooter').outerHeight();
            return top + bottom;
        };

        this.setHeight = function () {
            this.height = this.getHeight();
            this.table.parent('.table-responsive').css({ 'max-height': `calc(100vh - ${this.height}px)` }).perfectScrollbar();
        };
    }
    if (jQuery('#TblDepts').length != 0 || jQuery('#TblRoles').length != 0 || jQuery('#TblUsers').length != 0) {
        var tables = new TableSizing('#TblDepts, #TblRoles, #TblUsers');
        tables.setHeight();
    }
});
$(function () {
    var PlaceHoderElement = $('#PlaceHolderHere');
    $('button[data-toggle="ajax-modal"]').click(function (event) {
        var url = $(this).data('url');
        $.get(url).done(function (data) {
            PlaceHoderElement.html(data);
            PlaceHoderElement.find('.modal').modal('show');
        })
    })
    PlaceHoderElement.on('click', '[data-save="modal"]', function (event) {
        var form = $(this).parents('.modal').find('form');
        var actionUrl = form.attr('action');
        var sendData = form.serialize();
        console.log(toString(actionUrl));
        $.post(actionUrl, sendData).done(function (data) {
            PlaceHoderElement.find('.modal').modal('hide');
            window.location.reload();
        })
    })
    PlaceHoderElement.on('click', '[data-submit="modal"]', function (event) {
        var form = $(this).parents('.modal').find('form');
        var actionUrl = form.attr('action');
        var sendData = form.serialize();
        console.log(toString(actionUrl));
        $.post(actionUrl, sendData).done(function (data) {

            setTimeout(() => {
                PlaceHoderElement.find('.modal').modal('hide');
                window.location.reload();
            }, 5000);
        })
    })
})