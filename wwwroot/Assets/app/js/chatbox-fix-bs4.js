
$(document).on("click", ".onSwitchTab", function () {
    let obj = $(this);
    let container = obj.closest("#box-chat");
    let nav = obj.closest(".nav-tabs");
    nav.find(".btn-tabChat.active").removeClass("active");
    obj.addClass("active");
    if (container.length > 0) {
        let target = $(container).find(".tab-content").find(obj.attr("href"));
        if (target.length > 0) {
            container.find(".tab-content").find(".tab-pane").removeClass("in active show");
            target.addClass("in active show");
        }
    }
});

$(document).on("click", ".onSwitchTabLink", function () {
    let obj = $(this);
    let container = obj.closest("#box-chat,#boxchat-info");
    let nav = obj.closest(".nav-tabs");
    nav.find(".header-info__tool__button-item.active").removeClass("active");
    obj.addClass("active");
    if (container.length > 0) {
        let target = $(container).find(".tab-content").find(obj.attr("href"));
        if (target.length > 0) {
            container.find(".tab-content").find(".tab-pane").removeClass("in active show");
            target.addClass("in active show");
        }
    }
});