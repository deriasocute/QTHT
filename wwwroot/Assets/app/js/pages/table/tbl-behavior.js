

var LioneCore = {
    init: function () {
        return LioneCore.onEvents();
    },

    //cai dat listener events trong documents
    //vd: event javascript, jquery default ...
    onEvents : function () {
        jQuery(document).on("change", ".lioneCheckboxAll", function () {
            var tblTarget = jQuery(this).closest("table");
            var checked = jQuery(this).is(":checked");
            var set = tblTarget.find('.lioneCheckboxSingle').each(function () {
                if (checked) {
                    jQuery(this).prop("checked", true);
                } else {
                    jQuery(this).prop("checked", false);
                }
            });
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
                            window.history.pushState(null, response.title, url + Utils.builderQString(data));
                            jQuery(document).prop("title", response.title);
                        } catch (e) {
                            console.log(e);
                        }

                        Utils.sectionBuilder(response);
                        if (response.hasOwnProperty("isCust")) {
                            jQuery(target).html(response.htCust);
                        }

                        Utils.updateInputDate(jQuery(target));
                        Utils.updateFormState(jQuery(target));
                        //Utils.updateScrollBar(jQuery(target));
                        Autocomplete.init(jQuery(target));
                        Main.upEvent();
                    }
                });
            } catch (e) {

            }
            return false;
        });
        jQuery(document).on("submit", ".quickSubmit", function (e) {
            e.preventDefault();
            try {
                var form = jQuery(this);
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
                    },
                    error: function () {
                    },
                    success: function (response) {

                        Utils.sectionBuilder(response);
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
                        //Utils.updateScrollBar(jQuery(target));
                        Autocomplete.init(jQuery(target));
                        Main.upEvent(jQuery(target));

                        if (!Utils.isEmpty(targetDelete)) {
                            jQuery(targetDelete).fadeOut("fast", function () {
                                jQuery(this).remove();
                            });
                        }
                        if (form.hasClass("closeOnSubmit")) {
                            Utils.closeOverlay(true);
                        }
                        if (form.hasClass("reloadOnSuccess")) {
                            location.reload();
                        }
                        form.reset();
                        form.find("[type='submit']").prop("disabled", false);
                    }
                });
            } catch (e) {
            }
            return false;
        });
    },

    //set event, builder cac element khi append va trong document
    //vd: builder datepicker, select2 ...
    upEvents: function () {
        if (Utils.isEmpty(container)) {
            container = jQuery(document);
        }
        container.find(".selectpicker").selectpicker();
    }
}

jQuery(document).ready(function () {
    LioneCore.init();
})
