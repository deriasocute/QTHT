var Admin = {
    init: function () {

        Admin.upEvent();
        Admin.onEvent();
        Admin.triggers();
    },
    upEvent: function (container) {

    },
    onEvent: function () {


        jQuery(document).on("click", ".removeRoles", function () {
            var removefrom = jQuery(this).data("removefrom");
            var removeto = jQuery(this).data("removeto");
            var namerequest = jQuery(this).data("namerequest");
            var object = Admin.convertHtmlToObject(removefrom);
            Admin.renderObjectToHtml(object, removeto, namerequest);
        });

        jQuery(document).on("keyup", "#UpConfigValue", function () {
            var v = parseInt(jQuery(this).val());
            if (isNaN(v)) {
                v = 0;
            } else {
                v = v * 1024;
            }
            var sizeConvert = Utils.convertSize(v);
            jQuery("#UpConfigValueConvert").html(sizeConvert);
        });

        jQuery(document).on("change", ".changeSLUpdate", function () {
            var data = jQuery(this).getDataUppername();
            var url = jQuery(this).attr("data-url");
            if (!Utils.isEmpty(url)) {
                data["Value"] = jQuery(this).val();
                jQuery.ajax({
                    type: "POST",
                    async: true,
                    url: url,
                    data: data,
                    success: function (response) {

                    }
                });
            }
        });
        jQuery(document).on("change", "#UpBlockContentType, #CrBlockContentType", function () {
            var form = jQuery(this).closest("form");
            form.find(".gLoaiTin").addClass("hidden");
            form.find(".gChuyenMuc").addClass("hidden");
            form.find(".gSoLuongHienThi").addClass("hidden");
            form.find(".gKieuHienThi").addClass("hidden");
            form.find(".gBaiVietCuThe").addClass("hidden");
            form.find(".gNoiDung").addClass("hidden");
            form.find(".gBanner").addClass("hidden");
            form.find(".attachFile").addClass("hidden");

            var contentType = parseInt(jQuery(this).val());
            switch (contentType) {
                case 1: //Code
                    break;
                case 2: //Header
                case 3: //Footer
                    break;
                case 4: //Banner
                    form.find(".gBanner").removeClass("hidden");
                    form.find(".attachFile").removeClass("hidden");
                    break;
                case 5: //Html
                    form.find(".gNoiDung").removeClass("hidden");
                    break;
                default:
                    form.find(".gLoaiTin").removeClass("hidden");
                    form.find(".gChuyenMuc").removeClass("hidden");
                    form.find(".gSoLuongHienThi").removeClass("hidden");
                    form.find(".gKieuHienThi").removeClass("hidden");
                    form.find(".gBaiVietCuThe").removeClass("hidden");
                    form.find(".autocompleteItem").attr("data-type", contentType);
                    break;
            };
        });
        jQuery(document).on("click", ".addFormItem", function () {

            var form = jQuery(this).closest("form");
            var tpl = form.find(".tplFormItem").last().clone();
            tpl.removeClass("has-error");
            tpl.find(".form-control").each(function () {
                jQuery(this).val("");
                var orginName = jQuery(this).attr("data-originname");
                jQuery(this).attr("Name", orginName);
                jQuery(this).attr("data-bv-field", orginName);
            });
            tpl.find(".deleteAnswer").removeClass("hidden");
            tpl.find(".help-block").css("display", "none");
            tpl.find(".form-control-feedback").css("display", "none").removeClass("glyphicon").removeClass("glyphicon-remove");
            jQuery(tpl).insertAfter(form.find(".tplFormItem").last());
        });
        jQuery(document).on("click", ".deleteAnswer", function () {
            jQuery(this).closest(".answerItem").remove();
        });


        jQuery(document).on("keyup", ".onItemFilter", Admin.delay(function (e) {
            let obj = $(this);
            let target = $(obj.data('target'));
            let val = obj.val();
            if (val == '') {
                target.find(".item-group-filter").removeClass('hidden');
                target.find(".item-filter").removeClass('hidden');
                return false;
            }
            if (target.length > 0) {
                target.find(".item-filter").each(function () {
                    let tittle = $(this).data('title');
                    let group = $(this).closest(".item-group-filter");
                    let groupTittle = group.length > 0 ? group.data('title') : '';

                    if (Admin.compareText(tittle, val) || Admin.compareText(groupTittle, val)) {
                        $(this).removeClass('hidden'); //Hiện chính nó
                        group.removeClass('hidden'); //Hiện nhóm
                    }
                    else {
                        $(this).addClass('hidden');
                    }
                });


                target.find(".item-group-filter").each(function () {
                    let hasChild = $(this).find(".item-filter:not(.hidden)").length > 0;
                    if (hasChild) {
                        $(this).removeClass('hidden');
                    }
                    else {
                        $(this).addClass('hidden');
                    }
                });

                var container = target.closest(".useScrollBar");
                if (container.length > 0) {
                    container[0].scrollTop = 0;
                }
            }

        }, 300));

        $(document).on("change", ".onChangeIsAdmin", function (e) {
            var obj = $(this);
            var isCheck = obj.is(":checked");
            var target = $(obj.data('target'));
            if (target.length === 0)
                return false;

            if (isCheck)
                target.addClass("hidden");
            else
                target.removeClass("hidden");
        }),
            $(document).on("change", ".tickGroup", function (e) {
                e.preventDefault();
                var obj = $(this);
                var isCheck = obj.is(":checked");
                var val = obj.data("id");
                var form = obj.closest('form');
                var targets = form.find(`.tickItem[data-group='${val}']`);
                if (targets.length === 0)
                    return false;

                targets.prop("checked", isCheck); 
            })
    },

    triggers: function () {
        jQuery("#UpBlockContentType").trigger("change");
    },
    delay: function (callback, ms) {
        var timer = 0;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                callback.apply(context, args);
            }, ms || 0);
        };
    },
    compareText: function (str1, str2) {
        str1 = str1 || '';
        str2 = str2 || '';

        return str1.toLowerCase().trim().indexOf(str2.toLowerCase().trim()) > -1;
    },
    convertStringToTerm: function (str) {
        return str.replace(/[^a-zA-Z ]/g, "");
    },
    convertHtmlToObject: function (id) {
        var object = [];
        var table = jQuery(id);
        var set = table.find(".checkboxes");
        jQuery(set).each(function () {
            if (jQuery(this).is(":checked")) {
                var value = jQuery(this).data("value");
                if (value != null && value != "") {
                    var text = jQuery(this).closest('tr').find('td').last().find("span").text();
                    object.push({ IDRole: value, NameRole: text });
                    jQuery(this).closest('tr').remove(); // remove element
                }
            }
        });
        return object;
    },

    renderObjectToHtml: function (object, id, nameRequest) {
        if (object == null || object.length == 0) return;
        var table = jQuery(id);
        object.forEach(_element => {
            $(table).find('tbody').append('<tr><td class="center"><label><input class="checkboxes" type="checkbox" data-value="' + _element.IDRole + '"><span class="text"></span>' + (nameRequest != null && nameRequest != '' ? '<input type="hidden" name = "' + nameRequest + '" value="' + _element.IDRole + '"/>' : '') + '</label></td><td><span class="text">' + _element.NameRole + '</span></td></tr>');
        });
    }
};
jQuery(document).ready(function () {
    Admin.init();
});