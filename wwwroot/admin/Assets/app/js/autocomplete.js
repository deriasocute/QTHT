﻿var Autocomplete = {

    init: function (container) {
        Autocomplete.category(container);
        Autocomplete.user(container);
        Autocomplete.position(container);
        Autocomplete.dept(container);
        Autocomplete.team(container);
        Autocomplete.provider(container);
        Autocomplete.role(container);
        Autocomplete.channel(container);
        Autocomplete.organ(container);
        Autocomplete.link(container);
        Autocomplete.item(container);
        Autocomplete.person(container);
        Autocomplete.album(container);
        Autocomplete.ocrForm(container);
        Autocomplete.htmlOthers(container);
        Autocomplete.doctype(container);
    },
    channel: function (container) {

        container.find(".autocompleteChannel").each(function () {
            if (!jQuery(this).hasClass("inited")) {
                var obj = jQuery(this);
                obj.addClass("inited");
                obj.addClass("ui-autocomplete-input");

                var dt = new Date().getTime();
                //obj.nextAll().addBack().wrapAll("<div class='autocompleteChannel_parent" + dt + "'></div>");
                obj.click(function () {
                    obj.autocomplete({
                        appendTo: "body",
                        source: function (req, res) {
                            jQuery.ajax({
                                type: "POST",
                                async: true,
                                data: { Term: req.term },
                                url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/channel.html",
                                success: function (response) {
                                    Autocomplete._source(res, response);
                                }
                            });
                        },
                        close: function () {
                            Autocomplete._closeDialog(jQuery(this));
                        },
                        open: function (event, ui) {
                            Autocomplete._open(event, ui);
                        },
                        select: function (a, b) {
                            return Autocomplete._selectItem(a, b, jQuery(this));
                        },
                        delay: 350,
                        minLength: 0
                    });                    
                    obj.autocomplete("search", "");
                    obj.autocomplete("instance")._renderItem = function (ul, item) {
                        return Autocomplete._renderItem(ul, item, jQuery(this.element));
                    };                    
                });
            }
        });
    },

    role: function (container) {

        container.find(".autocompleteRole").each(function () {
            if (!jQuery(this).hasClass("inited")) {
                var obj = jQuery(this);
                obj.addClass("inited");
                obj.addClass("ui-autocomplete-input");

                var dt = new Date().getTime();
                //obj.nextAll().addBack().wrapAll("<div class='autocompleteRole_parent" + dt + "'></div>");
                obj.click(function () {
                    obj.autocomplete({
                        appendTo: "body",
                        source: function (req, res) {
                            jQuery.ajax({
                                type: "POST",
                                async: true,
                                data: { Term: req.term, IDNotIn: obj.attr("data-id-not-in") },
                                url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/role.html",
                                success: function (response) {
                                    Autocomplete._source(res, response);
                                }
                            });
                        },
                        close: function () {
                            Autocomplete._closeDialog(jQuery(this));
                        },
                        open: function (event, ui) {
                            Autocomplete._open(event, ui);
                        },
                        select: function (a, b) {
                            return Autocomplete._selectItem(a, b, jQuery(this));
                        },
                        delay: 350,
                        minLength: 0
                    });                    
                    obj.autocomplete("search", "");
                    obj.autocomplete("instance")._renderItem = function (ul, item) {
                        return Autocomplete._renderItem(ul, item, jQuery(this.element));
                    };                    
                });
            }
        });
    },

    provider: function (container) {

        container.find(".autocompleteProvider").each(function () {
            if (!jQuery(this).hasClass("inited")) {
                var obj = jQuery(this);
                obj.addClass("inited");
                obj.addClass("ui-autocomplete-input");

                var dt = new Date().getTime();
                //obj.nextAll().addBack().wrapAll("<div class='autocompleteProvider_parent" + dt + "'></div>");
                obj.click(function () {
                    obj.autocomplete({
                        appendTo: "body",
                        source: function (req, res) {
                            jQuery.ajax({
                                type: "POST",
                                async: true,
                                data: { Term: req.term },
                                url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/provider.html",
                                success: function (response) {
                                    Autocomplete._source(res, response);
                                }
                            });
                        },
                        close: function () {
                            Autocomplete._closeDialog(jQuery(this));
                        },
                        open: function (event, ui) {
                            Autocomplete._open(event, ui);
                        },
                        select: function (a, b) {
                            return Autocomplete._selectItem(a, b, jQuery(this));
                        },
                        delay: 350,
                        minLength: 0
                    });                    
                    obj.autocomplete("search", "");
                    obj.autocomplete("instance")._renderItem = function (ul, item) {
                        return Autocomplete._renderItem(ul, item, jQuery(this.element));
                    };                    
                });

            }
        });
    },

    dept: function (container) {
        container.find(".autocompleteDept").each(function () {
            if (!jQuery(this).hasClass("inited")) {
                var obj = jQuery(this);
                obj.addClass("inited");
                obj.addClass("ui-autocomplete-input");

                var dt = new Date().getTime();
                //obj.nextAll().addBack().wrapAll("<div class='autocompleteDept_parent" + dt + "'></div>");
                obj.click(function () {
                    obj.autocomplete({
                        appendTo: "body",
                        source: function (req, res) {
                            jQuery.ajax({
                                type: "POST",
                                async: true,
                                data: { Term: req.term, IDNotIn: obj.attr("data-id-not-in") },
                                url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/dept.html",
                                success: function (response) {
                                    Autocomplete._source(res, response);
                                }
                            });
                        },
                        close: function () {
                            Autocomplete._closeDialog(jQuery(this));
                        },
                        open: function (event, ui) {
                            Autocomplete._open(event, ui);
                        },
                        select: function (a, b) {
                            return Autocomplete._selectItem(a, b, jQuery(this));
                        },
                        delay: 350,
                        minLength: 0
                    });                    
                    obj.autocomplete("search", "");
                    obj.autocomplete("instance")._renderItem = function (ul, item) {
                        return Autocomplete._renderItem(ul, item, jQuery(this.element));
                    };                    
                });

            }
        });
    },

    team: function (container) {

        container.find(".autocompleteTeam").each(function () {
            if (!jQuery(this).hasClass("inited")) {
                var obj = jQuery(this);
                obj.addClass("inited");
                obj.addClass("ui-autocomplete-input");

                var dt = new Date().getTime();
                //obj.nextAll().addBack().wrapAll("<div class='autocompleteTeam_parent" + dt + "'></div>");
                obj.click(function () {
                    obj.autocomplete({
                        appendTo: "body",
                        source: function (req, res) {
                            jQuery.ajax({
                                type: "POST",
                                async: true,
                                data: { Term: req.term, IDNotIn: obj.attr("data-id-not-in") },
                                url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/team.html",
                                success: function (response) {
                                    Autocomplete._source(res, response);
                                }
                            });
                        },
                        close: function () {
                            Autocomplete._closeDialog(jQuery(this));
                        },
                        open: function (event, ui) {
                            Autocomplete._open(event, ui);
                        },
                        select: function (a, b) {
                            return Autocomplete._selectItem(a, b, jQuery(this));
                        },
                        delay: 350,
                        minLength: 0
                    });                    
                    obj.autocomplete("search", "");
                    obj.autocomplete("instance")._renderItem = function (ul, item) {
                        return Autocomplete._renderItem(ul, item, jQuery(this.element));
                    };                    
                });
            }
        });
    },
    position: function (container) {

        container.find(".autocompletePosition").each(function () {
            if (!jQuery(this).hasClass("inited")) {
                var obj = jQuery(this);
                obj.addClass("inited");
                obj.addClass("ui-autocomplete-input");

                var dt = new Date().getTime();
                //obj.nextAll().addBack().wrapAll("<div class='autocompletePosition_parent" + dt + "'></div>");
                obj.click(function () {
                    obj.autocomplete({
                        appendTo: "body",
                        source: function (req, res) {
                            jQuery.ajax({
                                type: "POST",
                                async: true,
                                data: { Term: req.term, IDNotIn: obj.attr("data-id-not-in") },
                                url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/position.html",
                                success: function (response) {
                                    Autocomplete._source(res, response);
                                }
                            });
                        },
                        close: function () {
                            Autocomplete._closeDialog(jQuery(this));
                        },
                        open: function (event, ui) {
                            Autocomplete._open(event, ui);
                        },
                        select: function (a, b) {
                            return Autocomplete._selectItem(a, b, jQuery(this));
                        },
                        delay: 350,
                        minLength: 0
                    });                    
                    obj.autocomplete("search", "");
                    obj.autocomplete("instance")._renderItem = function (ul, item) {
                        return Autocomplete._renderItem(ul, item, jQuery(this.element));
                    };                    
                });
            }
        });
    },

    user: function (container) {

        container.find(".autocompleteUser").each(function () {
            if (!jQuery(this).hasClass("inited")) {
                var obj = jQuery(this);
                obj.addClass("inited");
                obj.addClass("ui-autocomplete-input");

                var dt = new Date().getTime();
                //obj.nextAll().addBack().wrapAll("<div class='autocompleteUser_parent" + dt + "'></div>");
                obj.click(function () {
                    obj.autocomplete({
                        appendTo: "body",
                        source: function (req, res) {
                            jQuery.ajax({
                                type: "POST",
                                async: true,
                                data: { Term: req.term, IDNotIn: obj.attr("data-id-not-in") },
                                url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/auser.html",
                                success: function (response) {
                                    Autocomplete._source(res, response);
                                }
                            });
                        },
                        close: function () {
                            Autocomplete._closeDialog(jQuery(this));
                        },
                        open: function (event, ui) {
                            Autocomplete._open(event, ui);
                        },
                        select: function (a, b) {
                            return Autocomplete._selectItem(a, b, jQuery(this));
                        },
                        delay: 350,
                        minLength: 0
                    });                    
                    obj.autocomplete("search", "");
                    obj.autocomplete("instance")._renderItem = function (ul, item) {
                        return Autocomplete._renderItem(ul, item, jQuery(this.element));
                    };                    
                });
            }
        });
    },

    category: function (container) {

        container.find(".autocompleteCategory").each(function () {
            if (!jQuery(this).hasClass("inited")) {
                var obj = jQuery(this);
                obj.addClass("inited");
                obj.addClass("ui-autocomplete-input");

                var dt = new Date().getTime();
                //obj.nextAll().addBack().wrapAll("<div class='autocompleteCategory_parent" + dt + "'></div>");
                obj.click(function () {
                    obj.autocomplete({
                        appendTo: "body",
                        source: function (req, res) {
                            jQuery.ajax({
                                type: "POST",
                                async: true,
                                data: { Term: req.term, Type: obj.attr("data-type"), Code: obj.attr("data-code"), IDNotIn: obj.attr("data-id-not-id") },
                                url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/category.html",
                                success: function (response) {
                                    Autocomplete._source(res, response);
                                }
                            });
                        },
                        close: function () {
                            Autocomplete._closeDialog(jQuery(this));
                        },
                        open: function (event, ui) {
                            Autocomplete._open(event, ui);
                        },
                        select: function (a, b) {
                            return Autocomplete._selectItem(a, b, jQuery(this));
                        },
                        delay: 350,
                        minLength: 0
                    });                    
                    obj.autocomplete("search", "");
                    obj.autocomplete("instance")._renderItem = function (ul, item) {
                        return Autocomplete._renderItem(ul, item, jQuery(this.element));
                    };                    
                });
            }
        });
    },

    organ: function (container) {

        container.find(".autocompleteOrgan").each(function () {
            if (!jQuery(this).hasClass("inited")) {
                var obj = jQuery(this);
                obj.addClass("inited");
                obj.addClass("ui-autocomplete-input");

                var dt = new Date().getTime();
                //obj.nextAll().addBack().wrapAll("<div class='autocompleteOrgan_parent" + dt + "'></div>");
                obj.click(function () {
                    obj.autocomplete({
                        appendTo: "body",
                        source: function (req, res) {
                            jQuery.ajax({
                                type: "POST",
                                async: true,
                                data: { Term: req.term, IDNotIn: obj.attr("data-id-not-in") },
                                url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/organ.html",
                                success: function (response) {
                                    Autocomplete._source(res, response);
                                }
                            });
                        },
                        close: function () {
                            Autocomplete._closeDialog(jQuery(this));
                        },
                        open: function (event, ui) {
                            Autocomplete._open(event, ui);
                        },
                        select: function (a, b) {
                            return Autocomplete._selectItem(a, b, jQuery(this));
                        },
                        delay: 350,
                        minLength: 0
                    });                    
                    obj.autocomplete("search", "");
                    obj.autocomplete("instance")._renderItem = function (ul, item) {
                        return Autocomplete._renderItem(ul, item, jQuery(this.element));
                    };                    
                });
            }
        });
    },

    link: function (container) {

        container.find(".autocompleteLink").each(function () {
            if (!jQuery(this).hasClass("inited")) {
                var obj = jQuery(this);
                obj.addClass("inited");
                obj.addClass("ui-autocomplete-input");

                var dt = new Date().getTime();
                //obj.nextAll().addBack().wrapAll("<div class='autocompleteLink_parent" + dt + "'></div>");
                obj.click(function () {
                    obj.autocomplete({
                        appendTo: "body",
                        source: function (req, res) {
                            jQuery.ajax({
                                type: "POST",
                                async: true,
                                data: { Term: req.term, IDNotIn: obj.attr("data-id-not-in") },
                                url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/link.html",
                                success: function (response) {
                                    Autocomplete._source(res, response);
                                }
                            });
                        },
                        close: function () {
                            Autocomplete._closeDialog(jQuery(this));
                        },
                        open: function (event, ui) {
                            Autocomplete._open(event, ui);
                        },
                        select: function (a, b) {
                            return Autocomplete._selectItem(a, b, jQuery(this));
                        },
                        delay: 350,
                        minLength: 0
                    });                    
                    obj.autocomplete("search", "");
                    obj.autocomplete("instance")._renderItem = function (ul, item) {
                        return Autocomplete._renderItem(ul, item, jQuery(this.element));
                    };                    
                });

            }
        });
    },

    item: function (container) {

        container.find(".autocompleteItem").each(function () {
            var obj = jQuery(this);
            if (!obj.hasClass("inited")) {
                obj.addClass("inited");
                obj.addClass("ui-autocomplete-input");

                var dt = new Date().getTime();
                //obj.nextAll().addBack().wrapAll("<div class='autocompleteItem_parent" + dt + "'></div>");
                obj.click(function () {
                    obj.autocomplete({
                        appendTo: "body",
                        source: function (req, res) {
                            jQuery.ajax({
                                type: "POST",
                                async: true,
                                data: { Term: req.term, type: obj.attr("data-type"), IDNotIn: obj.attr("data-id-not-in") },
                                url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/item.html",
                                success: function (response) {
                                    Autocomplete._source(res, response);
                                }
                            });
                        },
                        close: function () {
                            Autocomplete._closeDialog(jQuery(this));
                        },
                        open: function (event, ui) {
                            Autocomplete._open(event, ui);
                        },
                        select: function (a, b) {
                            return Autocomplete._selectItem(a, b, jQuery(this));
                        },
                        delay: 350,
                        minLength: 0
                    });                    
                    obj.autocomplete("search", "");
                    obj.autocomplete("instance")._renderItem = function (ul, item) {
                        return Autocomplete._renderItem(ul, item, jQuery(this.element));
                    };                    
                });
            }
        });
    },

    person: function (container) {

        container.find(".autocompletePerson").each(function () {
            var obj = jQuery(this);
            if (obj.data('uiAutocomplete')) {
                jQuery(this).autocomplete("destroy");
            }
            if (!obj.hasClass("inited")) {
                obj.addClass("inited");
                obj.addClass("ui-autocomplete-input");

                var dt = new Date().getTime();
                //obj.nextAll().addBack().wrapAll("<div class='autocompletePerson_parent" + dt + "'></div>");
                obj.click(function () {  
                    obj.autocomplete({
                        appendTo: "body",
                        source: function (req, res) {
                            jQuery.ajax({
                                type: "POST",
                                async: true,
                                data: { Term: req.term, type: obj.attr("data-type"), IDNotIn: obj.attr("data-id-not-in") },
                                url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/person.html",
                                success: function (response) {
                                    Autocomplete._source(res, response);
                                }
                            });
                        },
                        close: function () {
                            Autocomplete._closeDialog(jQuery(this));
                        },
                        open: function (event, ui) {
                            Autocomplete._open(event, ui);
                        },
                        select: function (a, b) {
                            return Autocomplete._selectItem(a, b, jQuery(this));
                        },
                        delay: 350,
                        minLength: 0
                    });                         
                    obj.autocomplete("search", "");      
                    obj.autocomplete("instance")._renderItem = function (ul, item) {
                        return Autocomplete._renderItem(ul, item, jQuery(this.element));
                    };                          
                });
            }

        });
    },

    album: function (container) {

        container.find(".autocompleteAlbum").each(function () {
            var obj = jQuery(this);
            if (obj.data('uiAutocomplete')) {
                jQuery(this).autocomplete("destroy");
            }
            if (!obj.hasClass("inited")) {
                obj.addClass("inited");
                obj.addClass("ui-autocomplete-input");

                var dt = new Date().getTime();
                //obj.nextAll().addBack().wrapAll("<div class='autocompleteAlbum_parent" + dt + "'></div>");
                obj.click(function () {   
                    obj.autocomplete({
                        appendTo: "body",
                        source: function (req, res) {
                            jQuery.ajax({
                                type: "POST",
                                async: true,
                                data: { Term: req.term, type: obj.attr("data-type"), IDNotIn: obj.attr("data-id-not-in") },
                                url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/album.html",
                                success: function (response) {
                                    Autocomplete._source(res, response);
                                }
                            });
                        },
                        close: function () {
                            Autocomplete._closeDialog(jQuery(this));
                        },
                        open: function (event, ui) {
                            Autocomplete._open(event, ui);
                        },
                        select: function (a, b) {
                            return Autocomplete._selectItem(a, b, jQuery(this));
                        },
                        delay: 350,
                        minLength: 0
                    });                      
                    obj.autocomplete("search", "");   
                    obj.autocomplete("instance")._renderItem = function (ul, item) {
                        return Autocomplete._renderItem(ul, item, jQuery(this.element));
                    };                            
                });  
            }           
        });
    },
    ocrForm: function (container) {

        container.find(".autocompleteOcrForm").each(function () {
            var obj = jQuery(this);
            if (obj.data('uiAutocomplete')) {
                jQuery(this).autocomplete("destroy");
            }
            if (!obj.hasClass("inited")) {
                obj.addClass("inited");
                obj.addClass("ui-autocomplete-input");

                var dt = new Date().getTime();
                //obj.nextAll().addBack().wrapAll("<div class='autocompleteOcrForm_parent" + dt + "'></div>");
                obj.click(function () {
                    obj.autocomplete({
                        appendTo: "body",
                        source: function (req, res) {
                            jQuery.ajax({
                                type: "POST",
                                async: true,
                                data: { Term: req.term, IDNotIn: obj.attr("data-id-not-in") },
                                url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/ocr-form.html",
                                success: function (response) {
                                    Autocomplete._source(res, response);
                                }
                            });
                        },
                        close: function () {
                            Autocomplete._closeDialog(jQuery(this));
                        },
                        open: function (event, ui) {
                            Autocomplete._open(event, ui);
                        },
                        select: function (a, b) {
                            return Autocomplete._selectItem(a, b, jQuery(this));
                        },
                        delay: 350,
                        minLength: 0
                    });                           
                    obj.autocomplete("search", "");
                    obj.autocomplete("instance")._renderItem = function (ul, item) {
                        return Autocomplete._renderItem(ul, item, jQuery(this.element));
                    };                 
                }); 
            }  
        });
    },
    doctype: function (container) {

        container.find(".autocompleteDoctype").each(function () {
            if (!jQuery(this).hasClass("inited")) {
                var obj = jQuery(this);
                obj.addClass("inited");
                obj.addClass("ui-autocomplete-input");

                var dt = new Date().getTime();
                //obj.nextAll().addBack().wrapAll("<div class='autocompleteDoctype_parent" + dt + "'></div>");
                obj.click(function () {
                    obj.autocomplete({
                        appendTo: "body",
                        source: function (req, res) {
                            jQuery.ajax({
                                type: "POST",
                                async: true,
                                data: { Term: req.term, IDNotIn: obj.attr("data-id-not-in") },
                                url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/doctype.html",
                                success: function (response) {
                                    Autocomplete._source(res, response);
                                }
                            });
                        },
                        close: function () {
                            Autocomplete._closeDialog(jQuery(this));
                        },
                        open: function (event, ui) {
                            Autocomplete._open(event, ui);
                        },
                        select: function (a, b) {
                            return Autocomplete._selectItem(a, b, jQuery(this));
                        },
                        delay: 350,
                        minLength: 0
                    });                    
                    obj.autocomplete("search", "");
                    obj.autocomplete("instance")._renderItem = function (ul, item) {
                        return Autocomplete._renderItem(ul, item, jQuery(this.element));
                    };                    
                });
            }
        });
    },

    htmlOthers: function (container) {

        container.find(".autocompleteHtmlOther").each(function () {
            var obj = jQuery(this);
            if (obj.data('uiAutocomplete')) {
                jQuery(this).autocomplete("destroy");
            }
            if (!obj.hasClass("inited")) {
                obj.addClass("inited");
                obj.addClass("ui-autocomplete-input");

                var dt = new Date().getTime();
                //obj.nextAll().addBack().wrapAll("<div class='autocompleteHtmlOther_parent" + dt + "'></div>");
                obj.autocomplete({
                    appendTo: "body",
                    source: function (req, res) {
                        jQuery.ajax({
                            type: "POST",
                            async: true,
                            data: { Term: req.term, IDNotIn: obj.attr("data-id-not-in") },
                            url: Utils.getDomain() + "/" + obj.attr("data-href"),
                            success: function (response) {

                                Utils.sectionBuilder(response);
                                if (response.hasOwnProperty("isCust")) {
                                    jQuery(obj.attr("data-target")).html(response.htCust);
                                }

                                res();
                            }
                        });
                    },
                    close: function () {
                        Autocomplete._closeDialog(jQuery(this));
                    },
                    open: function (event, ui) {
                    },
                    select: function (a, b) {
                    },
                    delay: 350,
                    minLength: 0
                }); 
            }      
        });
    },

    _source: function (res, response) {
        if (Utils.notEmpty(response.data)) {
            var items = [];
            for (var i in response.data) {
                var item = response.data[i];
                var itemA = {
                    value: item.Name,
                    label: item.Name,
                    id: item.ID,
                    desc: ""
                };
                if (typeof item.Parents != "undefined")
                    itemA.desc = item.Parents;

                items.push(itemA);
            }
            res(items);
        } else {
            Utils.sectionBuilder(response);
            res();
        }
    },

    _open: function (event, ui) {
        var $input = jQuery(event.target),
        $results = $input.autocomplete("widget"),
        top = $input.offset().top,
        height = $results.css({ height: "auto" }).height(),
        inputHeight = $input.height(),
        bodyHeight = jQuery('body').height();
        if ((top + height + inputHeight) > bodyHeight) {
            var h = (bodyHeight - top + inputHeight - 50);
            if (h > 150)
                $results.css({ height: h + "px" });
        }
    },

    _closeDialog: function (el) {
        try {
            var v = el.val();
            var targetId = el.attr("data-targetid");
            if (!Utils.isEmpty(targetId)) {
                if (Utils.isEmpty(v)) {
                    jQuery(targetId).val("");
                }
                setTimeout(function () {
                    try {
                        var form = el.closest("form");
                        if (form.hasClass("bootstrapValidator")) {
                            form.bootstrapValidator('revalidateField', el.attr("name"));
                        }
                    } catch (e) { }
                }, 300);
            }
        } catch (e) {

        }
    },
    _selectItem: function (a, b, el){
        var name = el.attr("data-name");
        var target = el.attr("data-target");
        var targetId = el.attr("data-targetid");
        if (!Utils.isEmpty(targetId)) {
            jQuery(targetId).val(b.item.id);

            setTimeout(function () {
                try {
                    var form = el.closest("form");
                    if (form.hasClass("bootstrapValidator")) {
                        form.bootstrapValidator('revalidateField', el.attr("name"));
                    }
                } catch (e) { }
            }, 300);
        }
        if (!Utils.isEmpty(target))
        {
            var col = 12;
            var shareSetting = "";
            if (jQuery(target).hasClass("shareItems")) {

                col = 4;
                var data = jQuery(target).getDataUppername();
                shareSetting = '<div class="col-sm-8">' +
                                    '<div class="checkbox col-sm-2 nopadlr">' +
                                        '<label>' +
                                            '<input checked type="checkbox" value="1" class="colored-success tickItem" name="View' + name + b.item.id + '" id="Rand' + (new Date()).getTime() + '">' +
                                            '<span class="nowrap text">' + data.LabelView + '</span>' +
                                        '</label>' +
                                    '</div>' +
                                    '<div class="checkbox col-sm-2 nopadlr">' +
                                        '<label>' +
                                            '<input type="checkbox" value="1" class="colored-success tickItem" name="Update' + name + b.item.id + '" id="Rand' + (new Date()).getTime() + '">' +
                                            '<span class="nowrap text">' + data.LabelUpdate + '</span>' +
                                        '</label>' +
                                    '</div>' +
                                    '<div class="checkbox col-sm-2 nopadlr">' +
                                        '<label>' +
                                            '<input type="checkbox" value="1" class="colored-success tickItem" name="Delete' + name + b.item.id + '" id="Rand' + (new Date()).getTime() + '">' +
                                            '<span class="nowrap text">' + data.LabelDelete + '</span>' +
                                        '</label>' +
                                    '</div>' +
                                    '<div class="checkbox col-sm-2 nopadlr">' +
                                        '<label>' +
                                            '<input type="checkbox" value="1" class="colored-success tickItem" name="Create' + name + b.item.id + '" id="Rand' + (new Date()).getTime() + '">' +
                                            '<span class="nowrap text">' + data.LabelCreate + '</span>' +
                                        '</label>' +
                                    '</div>' +
                                    '<div class="checkbox col-sm-2 nopadlr">' +
                                        '<label>' +
                                            '<input type="checkbox" value="1" class="colored-success tickItem" name="Copy' + name + b.item.id + '" id="Rand' + (new Date()).getTime() + '">' +
                                            '<span class="nowrap text">' + data.LabelCopy + '</span>' +
                                        '</label>' +
                                    '</div>' +
                                    '<div class="checkbox col-sm-2 nopadlr">' +
                                        '<label>' +
                                            '<input type="checkbox" value="1" class="colored-success tickItem" name="Download' + name + b.item.id + '" id="Rand' + (new Date()).getTime() + '">' +
                                            '<span class="nowrap text">' + data.LabelDownload + '</span>' +
                                        '</label>' +
                                    '</div>' +
                                '</div>';
            }
            var item = jQuery(target).find(".scrollItem[data-id='" + b.item.id + "']");
            if (item.length == 0) {
                item = '<div class="scrollItem tickGroup" data-id="' + b.item.id + '" style="display: none">' +
                            '<div class="col-sm-' + col + '">' +
                                '<div class="checkbox">' +
                                    '<label>' +
                                        '<input checked type="checkbox" value="' + b.item.id + '" class="colored-success tickItem" name="' + name + '" id="Rand' + (new Date()).getTime() + '">' +
                                        '<span class="nowrap text">' + b.item.label + '</span>' +
                                    '</label>' +
                                '</div>' +
                            '</div>' +
                            shareSetting +
                        '</div>';
            }
            else
            {
                item.css('display', 'none').find("input[type='checkbox']").prop("checked", true);
            }
            jQuery(target).prepend(jQuery(item).fadeIn("1000"));

            jQuery(this).val("");
            return false;
        }
        return true;
    },

    _renderItem: function (ul, item, el) {
        return jQuery("<li class='itemf' style='width: " + el.width() + "px'>")
            .append("<div><a title='" + item.label + "'>" + item.label + "</a></div><div class='detail' title='" + item.desc + "'>" + item.desc + "</div>")
            .appendTo(ul);
    }
};