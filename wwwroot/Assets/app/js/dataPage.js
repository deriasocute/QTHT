
var DataPage = {
    init: function () {
        DataPage.upEvent();
        DataPage.onEvent();
    },
    upEvent: function () {
        jQuery(document).on("click", ".removeItem", function () {

            var obj = jQuery(this);
            var form = obj.closest("form");
            var table = obj.closest("table");

            Utils.destroyValidator(form);
            var target = obj.closest("tbody");


            var icIndex = jQuery(obj.attr("data-increase-index"));
            if (!icIndex) {
                icIndex = form.find("#fieldIndex");
            }
            //Reset về empty
            obj.closest(".item").find(".f_change, .f_change_row, .onRecipeChange, .onRecipeChangeRow, .isUnique ").each(function () {
                var tagName = jQuery(this).prop("tagName").toLowerCase();
                jQuery(this).val("");
                if (tagName == "input") {
                    jQuery(this).trigger("blur");
                    if (jQuery(this).hasClass("onRecipeChange") || jQuery(this).hasClass("onRecipeChangeRow"))
                        jQuery(this).trigger("change");
                }
                else if (tagName == "select" && jQuery(this).hasClass("isUnique")) {
                    jQuery(this).trigger("change");
                    Utils.autoCloseAllFlash();
                }

                //else
                //    jQuery(this).trigger("change");
            });
            //Xoas dong
            obj.closest(".item").remove();

            Utils.bootstrapValidator(target.closest("form"));

            if (icIndex) {
                var count = target.find("tr.item").length;
                icIndex.val(count);
            }
            var uploadFileGroups = table.find(".uploadFile-group");
            if (uploadFileGroups.length > 0) {
                uploadFileGroups.each(function (i) {
                    var n = jQuery(this).data("name");

                    var btn = jQuery(this).find(".attachFile");
                    var target = jQuery(this).find(btn.attr("data-target"));

                    var tfileName = btn.attr("data-file-name");
                    if (tfileName)
                        tfileName = tfileName.substring(0, tfileName.lastIndexOf("_")) + "_" + (i + 1);

                    var tfilePath = btn.attr("data-file-path");
                    if (tfilePath)
                        tfilePath = tfilePath.substring(0, tfilePath.lastIndexOf("_")) + "_" + (i + 1);

                    var ttarget = btn.attr("data-target");
                    if (ttarget)
                        ttarget = ttarget.substring(0, ttarget.lastIndexOf("_")) + "_" + (i + 1);


                    var tid = target.attr("id");
                    if (tid)
                        tid = tid.substring(0, tid.lastIndexOf("_")) + "_" + (i + 1);

                    var tdfid = target.attr("data-df-id");
                    if (tdfid)
                        tdfid = tdfid.substring(0, tdfid.lastIndexOf("_")) + "_" + (i + 1);


                    btn.attr("data-file-name", tfileName).attr("data-file-path", tfilePath).attr("data-target", ttarget);
                    target.attr("id", tid).attr("data-df-id", tdfid);
                    jQuery(this).find("[name^='" + n + "_N_" + "']").attr("name", n + "_N_" + (i + 1));
                    jQuery(this).find("[name^='" + n + "_P_" + "']").attr("name", n + "_P_" + (i + 1));
                });
            }
            ////Tự động tính lại
            //table.find("tbody > tr:not(.group-item):first").find(".f_change, .f_change_row").each(function () {
            //    var tagName = jQuery(this).prop("tagName").toLowerCase();
            //    if (tagName == "input") {
            //        jQuery(this).trigger("blur");
            //        if (jQuery(this).hasClass("onRecipeChange") || jQuery(this).hasClass("onRecipeChangeRow"))
            //            jQuery(this).trigger("change");
            //    }
            //    else
            //        jQuery(this).trigger("change");
            //});
            Main.autoIndex(target);
        });
    },
    onEvent: function () {
        jQuery(document).on('click', ".add_row", function () {
            var obj = jQuery(this);
            var form = jQuery(this).closest("form");
            var temp = jQuery(obj.attr("data-temp"));
            var tempPlate = $(temp.html());
            var cId = parseFloat(obj.attr("data-cid"));
            if (isNaN(cId))
                cId = 1;
            var target = form.find(obj.attr("data-target"));
            if (obj.hasClass("autoindex")) {
                var html = Utils.replaceAll(tempPlate.html(), "{autoindex}", cId);
                tempPlate.html(html);
            }
            try {

                $(tempPlate).find(".selectpicker").selectpicker("destroy");
                $(tempPlate).find("select.autoSelect2").select2("destroy");

            } catch (e) {

            }
            obj.attr("data-cid", cId + 1);
            //Init lại bs validate
            Utils.destroyValidator(form);
            form = jQuery(this).closest("form");
            target.append(tempPlate);
            Utils.bootstrapValidator(jQuery(this).closest("form"));
            Utils.updateInputDate(form);
            Utils.autoResize();
            form.find(".selectpicker").not(".inited").selectpicker();
            $("select.autoSelect2").not(".select2-hidden-accessible").each(function () {
                $(this).bindSelect2();
            });
            Utils.updateIsNumber(form);
            Main.autoIndex(form);
            Main.upEvent();
        });
    }
}
jQuery(document).ready(function () {
    DataPage.init();
});