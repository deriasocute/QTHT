var BaseJs = {
    init: function () {
        BaseJs.onEvent();
        BaseJs.upEvent();
    },
    upEvent: function (container) {

    },
    onEvent: function () {
        jQuery(document).on("click", ".clickLoadHtml", function () {
            var obj = jQuery(this);
            if (!obj.hasClass("renderd"))
            {
                obj.addClass("renderd");
                var url = obj.attr("data-url");
                var target = obj.attr("data-target");
                jQuery(target).addClass('loading');
                jQuery.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    async: false,
                    url: url,
                    beforeSend: function () {
                    },
                    error: function () {
                        obj.removeClass("renderd");
                        jQuery(target).removeClass('loading');
                    },
                    complete: function () {
                        jQuery(target).removeClass('loading');
                        obj.removeClass("renderd");
                    },
                    success: function (data) {
                        jQuery(target).removeClass('loading');
                        obj.removeClass("renderd");
                        if (data.hasOwnProperty("isCust")) {
                            jQuery(target).html(data.htCust);
                        }
                    }
                });
            }
        });
    },
    activeLoading: function () {
        $(".overlay-loading").addClass("active");
    },
    inactiveLoading: function () {
        $(".overlay-loading").removeClass("active");
    }
};
jQuery(document).ready(function () {
    BaseJs.init();
});