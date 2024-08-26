
var ChatBox = {
    init: function () {
        this.initChart();
        this.onEvent();
        this.autocompleteUser();
        this.upEvent();
        this.getMsgCount();
        this.setMaxWidthText();
    },
    loadChatBox: function (target, obj, isReload) {

        if (!target)
            target = $("#box-chat");
        if (!obj)
            obj = $(".onOpenChatBox:first");

        let targetBody = obj.attr("data-target-body");
        $(target).find("[name='Term']").val("");
        $("#boxchat-data").removeClass("open");
        let url = obj.attr("data-href");
        $.ajax({
            type: "POST",
            data: {
                Type: ChatBox.currentChatType
            },
            async: true,
            url: url,
            beforeSend: function () {
                $(targetBody).html('').addClass("loadingchat");

                if (!isReload)
                    $(".tabs-chat").addClass("hidden");
            },
            success: function (response) {

                if (!isReload)
                    $(".tabs-chat").removeClass("hidden");
                if (response.hasOwnProperty("isCust")) {
                    $(targetBody).html(response.htCust).removeClass("loadingchat");
                    ChatBox.autocompleteUser();
                }
            }
        });
    },
    onEvent: function () {
        $(document).on("click", ".onOpenChatBox, .onReloadChatBox", function (e) {
            e.preventDefault();

            let obj = $(this);
            let target = obj.attr("data-target");

            if (obj.hasClass("onReloadChatBox"))
                $(target).addClass("open");
            else
                $(target).toggleClass("open");

            if ($(target).hasClass("open"))
                ChatBox.loadChatBox(target, obj);
        });

        $(document).on("click", ".onOpenChatInfo", function (e) {
            e.preventDefault();

            let obj = $(this);
            let id = obj.attr("data-id");
            let type = obj.attr("data-type");
            let idChat = obj.attr("data-id-chat");
            let target = $("#boxchat-info");
            let url = "/ChatBox/ChatInfo.html";
            target.toggleClass("open");
            if (target.hasClass("open")) {
                $(".overlay-chatbox").toggleClass("open");
            }
            let data = {
                ID: id,
                Type: type
            }
            var temp = $("#temp-boxchat-data");
            $.ajax({
                type: "POST",
                async: true,
                url: url,
                data: data,
                beforeSend: function () {
                    $(target).html(temp);
                },
                success: function (response) {
                    if (response.hasOwnProperty("isCust")) {
                        $(target).html(response.htCust);
                        ChatBox.upEvent($(target));
                        Utils.updateScrollBar($(target));
                    }
                }
            });
        });

        $(document).on("click", ".overlay-chatbox", function (e) {
            e.preventDefault();

            if ($("#boxchat-info").hasClass("open")) {
                $(this).removeClass("open");
                $("#boxchat-info").removeClass("open");
            }
        });

        $(document).on("keyup", ".onFilter", ChatBox.delay(function (e) {
            let obj = $(this);
            let target = obj.attr("data-target");
            let url = obj.attr("data-href");
            //$(target).toggleClass("open");
            var temp = $("#temp-box-chat");
            //var type = $("#box-chat").find(".btn-tabChat.active").attr("data-type");
            var data = {
                Term: obj.val(),
                Type: ChatBox.currentChatType
            };
            $.ajax({
                type: "POST",
                async: true,
                url: url,
                data: data,
                beforeSend: function () {
                    $(target).html(temp.html());
                },
                success: function (response) {
                    if (response.hasOwnProperty("isCust")) {
                        $(target).html(response.htCust);

                        ChatBox.autocompleteUser();
                    }
                }
            });
        }, 500));

        $(document).on("click", ".onChatDetail", function (e) {
            e.preventDefault();

            let obj = $(this);
            let id = obj.attr("data-id");
            let type = obj.attr("data-type");
            let idChat = obj.attr("data-id-chat");

            ChatBox.openChatDetail(id, type, idChat);
            Realtime.processer.server.messageRead({
                ReceiverId: ChatBox.currentuser.Uid,
                Type: type,
                ID: id,
                ChatID: idChat,
            });
        });

        $(document).on("click", ".onLoadMoreMsg", function (e) {
            e.preventDefault();
            let obj = $(this);
            let form = obj.closest("form");
            var idChat = form.find("input[name='IDChat']").val();
            var type = form.find("input[name='Type']").val();
            let target = form.find(".chat-box-body");
            let page = parseInt(target.attr("data-page")) + 1;

            $.ajax({
                type: "POST",
                async: true,
                url: obj.attr("href"),
                beforeSend: function () {
                },
                data: {
                    IDChat: idChat,
                    Type: type,
                    Page: page
                },
                success: function (response) {
                    obj.remove();
                    if (response.hasOwnProperty("isCust")) {
                        $(target).prepend(response.htCust);
                        target.attr("data-page", page);
                    }
                }
            });
        });

        $(document).on("keydown", ".onEnterSubmit", function (e) {
            let frm = $(this).closest("form");
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

            if (key === 13 && (e.ctrlKey || e.altKey)) {
                $(this).val($(this).val() + "\n");
                return true;
            }

            if (key === 13) {
                try {
                    frm.trigger("submit");
                } catch (ex) {
                }
                return false;
            }
            return true;
        });

        $(document).on("click", ".onAttachMsgFile", function (e) {
            let frm = $(this).closest("form");
            var file = frm.find($(this).attr("data-rel"));
            file.trigger("click");
        });

        $(document).on("click", ".onCloseChatBox", function (e) {

            $("#box-chat").removeClass("open");
            $("#boxchat-data").removeClass("open");
        });

        $(document).on("click", ".onCloseChatBoxInfo", function (e) {
            $("#boxchat-info").removeClass("open");
            $(".overlay-chatbox").removeClass("open");
        });

        $(document).on("submit", "form.formChatBox", function () {
            try {
                var form = jQuery(this);
                var message = form.find("textarea[name='Body']").val();
                if (message) {
                    ChatBox.sendMessage(form, message);
                }
                //Reset message text

                jQuery(this).find("textarea[name='Body']").val("");
            } catch (e) {
                console.log(e);
            }
            return false;
        });

        $(document).on("click", ".onSwitchTab", function () {
            var obj = $(this);
            ChatBox.currentChatType = obj.attr("data-type");

            ChatBox.loadChatBox(null, null, true);
        });

        /*Event thành viên trong nhóm*/
        $(document).on("click", ".onClickChatGroupMember", function () {
            var obj = $(this);
            obj.closest(".item-chat-member").find("input[type='checkbox']").trigger("click");
        });

        $(document).on("keyup", ".onFilterChatGroupMember", ChatBox.delay(function () {
            var obj = $(this);
            let form = obj.closest("form").find("#divUserNotSelect");
            let val = obj.val()?.trim().toLowerCase();
            if (val) {
                form.find(`.item-chat-member`).each(function () {
                    let name = $(this).attr("data-name").toLowerCase();
                    if (name.includes(val)) {
                        $(this).removeClass("hidden");
                    }
                    else {
                        $(this).addClass("hidden");
                    }
                });
            } else {
                form.find(`.item-chat-member`).removeClass("hidden");
            }

            var container = obj.closest(".useScrollBar");
            if (container.length > 0) {
                container[0].scrollTop = 0;
            }
        }, 100));

        $(document).on("click", ".onRemoveMsg", function (e) {
            let el = $(this);
            let msgItem = el.closest(".item-msg");
            let msg = msgItem.data("message");
            ChatBox.confirm(msg, function () {
                let frm = el.closest("form");
                ChatBox.removeMessage(frm, msgItem.data("id"));
            });
        });

        $(document).on("click", ".onExportChat", function (e) {
            e.preventDefault();

            let obj = $(this);
            let type = obj.attr("data-type");
            let exportType = obj.attr("data-export-type");
            let id = obj.attr("data-id");
            let url = `/ChatBox/ExportChat.html?ID=${id}&Type=${type}&ExportType=${exportType}`;
            window.location.href = url;
        });

        $(document).on("change", ".onCheckMember", function (e) {
            e.preventDefault();
            var obj = $(this);
            var dataid = obj.attr("data-id");
            var target = $(obj.data("target"));
            var item = obj.closest('.item-chat-member');
            var form = obj.closest('form');
            var isCheck = obj.is(":checked");
            if (target.length > 0) {
                let max = parseInt(target.data("max"));
                let total = target.find(`.onCheckMember`).length;
                if (total >= max) {
                    Utils.setError(target.data("max-msg"));
                    return false;
                }
                target.perfectScrollbar("destroy");

                let count = form.find("#spMemCounter");
                var ref = target.find(`.onCheckMember[data-id='${dataid}']`);
                if (isCheck) {
                    if (ref.length === 0) {
                        total++;
                        let clone = item.clone();
                        clone.find('.onCheckMember').attr("name", "SelectedID").prop("disabled", true);
                        target.append(clone);
                    }
                } else {
                    total--;
                    ref.closest('.item-chat-member').remove();
                }
                target.perfectScrollbar({
                    useBothWheelAxes: false, wheelPropagation: true
                });
                if (max > 0) {
                    count.html(`${total}/${count.data("max")}`);
                } else {
                    count.html(`${total}`);
                }
            }
        });

        $(document).on("click", ".onChangeAvatar", function (e) {
            e.preventDefault();
            var obj = $(this);
            $(obj.data('rel')).trigger("click")
        });

        jQuery(document).on("click", ".onCreateGroup", function () {
            try {
                var obj = jQuery(this);
                var target = jQuery(this).attr("data-target");
                var data = obj.getDataUppername();
                jQuery.ajax({
                    type: "POST",
                    async: true,
                    url: $("#onOpenChatBox").attr("data-create-group"),
                    data: data,
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
                            jQuery(target).html(response.htCust);
                        }
                        Utils.updateTab(jQuery(target));
                        Utils.updateInputDate(jQuery(target));
                        Utils.updateFormState(jQuery(target));
                        Utils.updateScrollBar(jQuery(target));
                        Autocomplete.init(jQuery(target));
                        ChatBox.upEvent(jQuery(target));
                        Main.upEvent();
                        Cust.check_required_input();
                        if (obj.hasClass("reloadOnSuccess")) {
                            location.reload();
                        }
                    }
                });
            } catch (e) {

            }
            return false;
        });

        jQuery(document).on("submit", ".onSaveGroup", function (e) {
            e.preventDefault();
            try {
                var form = jQuery(this);
                if (!form.hasClass("submiting")) {
                    form.addClass("submiting");

                    var url = form.attr("action");
                    var target = form.attr("data-target");
                    var targetDelete = form.attr("data-target-delete");
                    var type = form.attr("data-insert-type");
                    var data = Utils.getSerialize(form);
                    if (Utils.isEmpty(url)) {
                        form.removeClass("submiting");
                        return false;
                    }
                    if (!Utils.validateDataForm(form)) {
                        form.removeClass("submiting");
                        return false;
                    }
                    if (!form.hasClass("bootstrapValidator")) {
                        form.addClass("bootstrapValidator").bootstrapValidator();
                    }
                    var bootstrapValidator = form.data('bootstrapValidator');
                    bootstrapValidator.validate();
                    if (!bootstrapValidator.isValid()) {
                        jQuery(this).unbind();
                        form.removeClass("submiting");
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
                            form.removeClass("submiting");
                        },
                        error: function () {
                        },
                        success: function (response) {

                            form.removeClass("submiting");
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
                            Utils.updateScrollBar(jQuery(target));
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

                            //$(".onReloadChatBox").trigger("click");

                            ChatBox.loadChatBox(null, null, true);

                            form.find("[type='submit']").prop("disabled", false);
                        }
                    });
                }
            } catch (e) {
            }
            return false;
        });
            $('#box-chat').on('mouseover', function (e) {
                e.stopPropagation();    
            });
        $('#box-chat').on('mouseout', function () {
            $('#scrollable, html, body').unbind('scroll');
        });
    },

    upEvent: function (container) {
        if (Utils.isEmpty(container))
            container = jQuery(document);

        container.find(".onUpFileChatbox").each(function () {
            var obj = jQuery(this);
            var maxSizeMsg = obj.attr("data-max-size-msg");
            var maxSize = parseFloat(obj.attr("data-max-size"));
            var uploadType = obj.data("upload-type");
            var form = obj.closest("form");
            if (!obj.hasClass("setUpFiled")) {
                obj.hasClass("setUpFiled");
                obj.ajaxUploader({
                    name: "FileDocument",
                    uploadType: uploadType,
                    postUrl: /*Cdata.Storage.domain +*/ "/uploader/upfile",
                    //elTarget: obj.attr("data-target"),
                    onBegin: function (e, t) {

                        return true;
                    },
                    onChange: function (inputfile, files) {
                        if (maxSize > 0) {
                            for (var i = 0; i < files.length; i++) {
                                let file = files[i];
                                if (file.size > maxSize * 1024 * 1024) //MB
                                {
                                    Utils.setError(maxSizeMsg);
                                    return false;
                                }
                                //if (ChatBox.getFileExt(file.name)=="" ) //Check file ext
                            }
                        }
                        return true;
                    },
                    onClientLoadStart: function (e, file, t) {
                        obj.val(''); //Xóa file đ? ch?n
                    },
                    onClientProgress: function (e, file, t) {
                        jQuery(obj.attr("data-target")).addClass("loading");
                    },
                    onServerProgress: function (e, file, t) {
                        jQuery(obj.attr("data-target")).addClass("loading");
                    },
                    onClientAbort: function (e, file, t) {
                        jQuery(obj.attr("data-target")).removeClass("loading");
                    },
                    onClientError: function (e, file, t) {
                        jQuery(obj.attr("data-target")).removeClass("loading");
                    },
                    onServerAbort: function (e, file, t) {
                        jQuery(obj.attr("data-target")).removeClass("loading");
                    },
                    onServerError: function (e, file, t) {
                        jQuery(obj.attr("data-target")).removeClass("loading");
                    },
                    onSuccess: function (e, file, t, data) {

                        if ((data.hasOwnProperty("Status") && data.Status == 0) || !data.FilePath) {
                            if (data.hasOwnProperty("Messages"))
                                Utils.setError(data.Messages);
                            return false; //Check upload l?i
                        }

                        ChatBox.sendMessage(form, null, data.FileName, data.FilePath);

                    }
                });
            }
        });
        container.find(".onChangeAvatar").each(function () {
            var obj = jQuery(this);
            var rel = jQuery(obj.data('rel'));
            if (!rel.hasClass("setUpFiled")) {
                rel.ajaxUploader({
                    name: "FileDocument",
                    dragBox: "#AvatarDrager",
                    postUrl: "/uploader/upfile",
                    onBegin: function () {
                        jQuery("#AvatarDrager").addClass("loading");
                        return true;
                    },
                    onChange: function () {
                        var fileExtension = ['jpeg', 'jpg', 'png'];
                        if ($.inArray(rel.val().split('.').pop().toLowerCase(), fileExtension) == -1) {
                            alert("Chỉ hỗ trợ các định dạng ảnh " + fileExtension.join(', '));
                            return false;
                        } else {
                            return true;
                        }
                    },
                    onDrop: function () {
                        return true;
                    },
                    onClientLoadStart: function () {
                    },
                    onClientProgress: function () {
                    },
                    onClientAbort: function () {
                    },
                    onClientError: function () {
                    },
                    onSuccess: function (e, file, dragbox, data) {
                        var html = "";
                        var thumbPath = "/thumb/120xauto/" + data.FilePath;
                        //var thumbPath = data.FilePath;

                        if (rel.data("target"))
                            $(rel.data("target")).attr('src', thumbPath)

                        if (rel.data("input-target"))
                            $(rel.data("input-target")).val(data.FilePath)

                        if (rel.data("callback"))
                            eval(rel.data("callback"));

                    }
                });
            }
        });

    },
    setMaxWidthText: function (container) {
        let width = $("#text-truncation").parent().width();
        $("#text-truncation").css({ "max-width": width });
    },
    initChart: function () {
        try {
            ChatBox.setCurrentUser();
            Realtime.start(function () {
                // ChatBox.onlines();
            }, function () {
                ChatBox.chatEvents();
            });
            ChatBox.ntfs();
        } catch (e) {
            console.log(e);
        }
    },
    setCurrentUser: function () {
        ChatBox.currentuser = Cdata.CUser;
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
    chatEvents: function () {
        /*online listener*/
        Realtime.processer.client.online = function (uids) {
            //console.log(uids);
        };
        Realtime.processer.client.messageReceive = function (response) {

            var isChatOpen = false;
            //Hiển thị tin nhắn ở boxchat
            var form = $("#boxchat-data").find("form.formChatBox:visible");
            if (form.length > 0) {
                isChatOpen = true;

                ChatBox.appendmsg(response, form);
                Realtime.processer.server.messageRead({
                    ReceiverId: ChatBox.currentuser.Uid,
                    SenderId: response.Sender.Uid,
                    Type: response.Type,
                    ID: response.ID,
                    ChatID: response.ChatID,
                });
            }
            var isReceiver = (response.Receiver
                && response.Receiver.Uid == ChatBox.currentuser.Uid
                && response.Receiver.Uid != response.Sender.Uid)
                ||
                (response.Receivers && response.Receivers.findIndex(x => x.Uid == ChatBox.currentuser.Uid
                    && x.Uid != response.Sender.Uid) > -1);

            ; //Là người nhận
            if (isReceiver) {
                ChatBox.beep();
            }
            if (isReceiver && !isChatOpen) {
                ChatBox.upMsgCount();
            }
            //Hiển thị tin nhắn ở màn danh sách
            var container = $("#divMessages").find(".contacts[data-type='" + response.Type + "']");
            if (container.length > 0) {

                let chatItem = container.find(`.chatbox-item[data-id-chat="${response.ChatID}"]`);
                if (chatItem.length == 0) {
                    chatItem = $($("#tempChatItem").html());
                    if (chatItem.length > 0) {
                        chatItem.find(".msg-sender-avatar").attr("src", response.Sender.Avatar);
                        chatItem.find(".msg-sender").text(response.Sender.Name);
                        //chatItem.find(".msg-date").text(moment().format('HH:mm'));
                        chatItem.attr("data-id-chat", response.ChatID);
                        chatItem.attr("data-id", response.ID);
                        chatItem.attr("data-type", response.Type);
                        container.append(chatItem);
                    }
                }
                chatItem = container.find(`.chatbox-item[data-id-chat="${response.ChatID}"]`); //Get lại
                if (chatItem.length > 0) {


                    let body = response.Message;
                    if (body == "" && response.Files) {
                        body = response.Files.map((f) => f.Name).join();
                    }
                    chatItem.find(".msg-body").text(body);
                    chatItem.find(".msg-date").text(response.StrCreated);

                    var elTotal = chatItem.find(".msg-total");
                    if (elTotal.length > 0) {

                        let total = parseInt(elTotal.text());
                        if (isNaN(total))
                            total = 0;
                        chatItem.find(".msg-total").attr("data-value", total + 1).text(total + 1);

                        //Di chuyển lên đầu
                        if (container.find(".chatbox-item").length > 1) {
                            let cloneChatItem = chatItem.clone();
                            var firstChat = container.find(".chatbox-item:first");
                            if (firstChat.length > 0
                                && firstChat.attr("data-id-chat") != chatItem.attr("data-id-chat")
                                && firstChat.attr("data-id") != chatItem.attr("data-id")) {
                                firstChat.prepend(cloneChatItem);
                                chatItem.remove();
                            }
                        }
                    }
                }
            }
        };
        Realtime.processer.client.notificationReceiver = function (response) {

            var currTotal = jQuery("#NtfUnread").attr('data-value');
            if (currTotal == "") currTotal = 0;
            var unreadTotal = parseInt(currTotal) + parseInt(response.Total);
            jQuery("#NtfUnread").attr("data-value", unreadTotal).text("+ " + unreadTotal);
            jQuery("#NtfContainer").prepend(jQuery(response.Html).hide().delay(1000).fadeIn("2000")).scrollTop(0);
        };
        Realtime.processer.client.messageRemove = function (response) {
            if (response.ErrorMsg) {
                Utils.setError(response.ErrorMsg);

            } else {
                //Hiển thị tin nhắn ở boxchat
                var form = $("#boxchat-data").find("form.formChatBox:visible");
                if (form.length > 0) {
                    let chatId = form.find("input[name='IDChat']").val();
                    if (response.ChatID == chatId) {

                        let chatItem = form.find(`.item-msg[data-id='${response.IDMessage}']:not(.temp-msg)`);
                        if (chatItem.length > 0) {
                            var temp = $("#tempDeletedMsg").html();
                            chatItem.find(".msg_cotainer,.msg_cotainer_send").html(temp);
                            chatItem.find(".onRemoveMsg").remove();
                        }
                    }
                    return;
                }
            }
        };
    },
    confirm: function (text, callback) {
        if (confirm(text) == true && callback) {
            callback();
        }
    },
    sendMessage: function (form, message, fileName, filePath) {
        if (form && (message || (fileName || filePath))) {
            var receiverId = form.find("input[name='IDReceiver']").val();
            var chatId = form.find("input[name='IDChat']").val();
            var type = form.find("input[name='Type']").val();

            //Send msg
            var postData = {
                ChatID: chatId,
                Type: type,
                ReceiverId: receiverId,
                Message: message,
            }

            let msg = message;
            if (fileName && filePath) {
                postData.Files = [
                    {
                        Path: filePath,
                        Name: fileName
                    }
                ];
                msg = fileName;
            }

            var setting = {
                Message: msg,
                Sender: ChatBox.currentuser,
                ReceiverId: receiverId,
                IsTemp: true,
                ChatID: chatId
            };
            ChatBox.appendmsg(setting, form);

            Realtime.processer.server.messageSent(postData);
        }
    },
    removeMessage: function (form, idMsg) {
        if (form && idMsg) {
            var chatId = form.find("input[name='IDChat']").val();
            var type = form.find("input[name='Type']").val();
            //Send msg
            var postData = {
                ChatID: chatId,
                Type: type,
                IDMessage: idMsg,
            }
            Realtime.processer.server.removeMessage(postData);
        }
    },
    autocompleteUser: function (container) {
        if (!container)
            container = $(document);
        container.find(".autocompleteUserChat").each(function () {
            if (!jQuery(this).hasClass("inited")) {
                var obj = jQuery(this);
                obj.addClass("inited");
                obj.autocomplete({
                    appendTo: "body",
                    source: function (req, res) {
                        jQuery.ajax({
                            type: "POST",
                            async: true,
                            data: {
                                Term: req.term,
                                IDNotIn: ChatBox.currentuser.Uid
                            },
                            url: "/chatBox/searchUserChat.html",
                            success: function (response) {
                                Autocomplete._source(res, response);
                            }
                        });
                    },
                    open: function (event, ui) {
                        Autocomplete._open(event, ui);
                    },
                    select: function (a, b) {
                        ChatBox.openChatDetail(b.item.id, b.item.type, b.item.idChat);
                        obj.val('');
                    },
                    delay: 350,
                    minLength: 0
                }).click(function () {
                    jQuery(this).autocomplete("search", "");
                }).autocomplete("instance")._renderItem = function (ul, item) {
                    return Autocomplete._renderItem(ul, item, jQuery(this.element));
                };
            }
        });
    },
    openChatDetail: function (id, type) {
        let target = $("#boxchat-data");
        let url = "/ChatBox/ChatDetail.html";
        target.toggleClass("open");

        let data = {
            ID: id,
            Type: type
        }
        var temp = $("#temp-boxchat-data");
        $.ajax({
            type: "POST",
            async: true,
            url: url,
            data: data,
            beforeSend: function () {
                $(target).html(temp.html());
            },
            success: function (response) {
                if (response.hasOwnProperty("isCust")) {
                    $(target).html(response.htCust);
                    ChatBox.autocompleteUser();
                    ChatBox.scrollToBottom($(target).find(".chat-box-body"));
                    ChatBox.upEvent($(target));
                    ChatBox.setMaxWidthText();
                    ChatBox.getMsgCount();
                    ChatBox.upEvent($(target));
                }
            }
        });
    },
    getFileExt: function (fileName) {
        return fileName.substr(fileName.lastIndexOf('.') + 1);
    },
    beep: function () {

        var media = document.getElementById("AudioChat");
        media.play();
    },
    appendmsg: function (setting, form) {

        let chatId = form.find("input[name='IDChat']").val();
        if (setting.ChatID == chatId) {

            let isExists = form.find(`.item-msg[data-id='${setting.IDMessage}']:not(.temp-msg)`);
            if (isExists.length > 0)
                return false;

            var isMine = setting.Sender.Uid == ChatBox.currentuser.Uid;
            if (!isMine) {
                ChatBox.beep();
            }

            //lay mau html de append tin nhan
            var temp = isMine ? $("#tempMyMsg") : $("#tempTheirMsg");
            temp = $(temp.html());

            if (setting.IsTemp) {
                temp.addClass('temp-msg');
            }
            temp.attr("data-id", setting.IDMessage);
            temp.attr("data-id-sender", setting.Sender.Uid);

            var urls = ChatBox.getUrls(setting.Message);
            if (urls.length > 0) {
                var body = setting.Message;
                let pattern = /(\bhttps?:\/\/[^\s]+\b)/gi;
                let replacement = '<a href="$1" class="msg-file-link" target="_blank" title="$1">$1</a>';
                let output = body.replace(pattern, replacement);
                temp.find(".msg-body").html(output);
            }
            else {
                temp.find(".msg-body").html(setting.Message);

            }
            temp.find(".msg-avt").attr("src", setting.Sender.Avatar);
            temp.find(".msg-date").html(setting.StrCreated);

            if (urls.length === 0 && setting.Files && setting.Files.length > 0) {
                for (var i = 0; i < setting.Files.length; i++) {
                    let file = setting.Files[i];
                    let tempFile;
                    if (file.FileType == 1)
                        tempFile = $("#tempMsgLink");
                    else
                        tempFile = $("#tempMsgFile");

                    tempFile = $(tempFile.html());
                    tempFile.find(".msg-file-link").attr("href", file.Link);

                    if (file.FileType == 1)
                        tempFile.find(".msg-file-link").attr("title", file.Link);

                    tempFile.find(".msg-file-name").attr("title", file.Name).text(file.Name);
                    temp.find(".msg-body").replaceWith(tempFile);
                }
            }
            temp.find(".user_img").attr("src", setting.Sender.Avatar);

            var boxchat = form.find(".chat-box-body");
            if (boxchat.length > 0) {
                let dateId = moment().format('YYYYMMDD');
                let msgGroup = boxchat.find(`.msg-date-group[data-id='${dateId}']`);
                if (msgGroup.length == 0) {
                    msgGroup = $($("#tempDateGroup").html());
                    if (msgGroup.length > 0) {
                        msgGroup.attr("data-id", dateId);
                        msgGroup.find(".msg-breaker").text(moment().format('DD-MM-YYYY'));
                        boxchat.append(msgGroup);
                    }
                }

                let isFirstmsg = msgGroup.find(".item-msg:not(.temp-msg):last");
                if (isFirstmsg.length > 0 && isFirstmsg.attr("data-id-sender").toString() == setting.Sender.Uid.toString()) {
                    temp.removeClass("first-msg");
                    temp.find(".img_cont_msg").html('');
                }
                let tempMsg = msgGroup.find(".temp-msg:first");
                if (tempMsg.length > 0) {
                    tempMsg.replaceWith(temp);
                } else {
                    msgGroup.append(temp);
                }
            }
            //Scroll cuoi trang
            ChatBox.scrollToBottom(boxchat);
        }
        return;
    },
    scrollToBottom: function (boxchat) {
        //Scroll cu?i div
        if (boxchat && boxchat.length > 0)
            boxchat.scrollTop(boxchat[0].scrollHeight);
    },

    onlines: function () {

        //var uids = new Array();
        //jQuery(".user-online-status").each(function () {
        //    var uid = jQuery(this).attr("data-id");
        //    uids.push(uid);
        //});

        if (uids.length > 0) {
            Realtime.processer.server.online({
                Sender: ChatBox.currentuser,
                Uids: [Cdata.CUser.ID]
            });
        }
    },
    /*Notification*/
    ntfs: function () {

        jQuery(document).on('mouseover', ".ntfit.unread", function () {
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
    },
    getMsgCount: function () {
        var url = "/ChatBox/GetUserMessageCount.html";
        $.ajax({
            type: "POST",
            async: true,
            url: url,
            success: function (response) {
                let target = $("#userMsgCount");
                target.addClass("hidden");
                target.attr("data-value", response.data).text(response.data);
                setTimeout(function () {
                    target.removeClass("hidden");
                }, 10);
            }
        });
    },
    upMsgCount: function () {
        let target = $("#userMsgCount");
        let val = parseInt(target.attr("data-value"));
        if (isNaN(val))
            val = 0;
        val++;
        target.addClass("hidden");
        target.attr("data-value", val).text(val);
        setTimeout(function () {
            target.removeClass("hidden");
        }, 10);
    },
    getUrls: function (text) {
        // Regular expression to match URLs
        const urlRegex = /((http(s)?:\/\/)|(www\.))[^\s]+/gi;

        // Find all matches of the regex in the text
        const matches = text.match(urlRegex);

        // Return the matches as an array
        return matches ? matches : [];

    }

}

String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find, 'g'), replace);
};

$(document).ready(function (e) {
    ChatBox.init();
});