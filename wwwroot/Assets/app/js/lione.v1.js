var MenuItems = [];

var CE = {
    togglePass: function(target) {
        var type = target.parents('.input-action').find('.show-hide-password').attr('type') == 'password' ? 'text' : 'password';
        target.parents('.input-action').find('.show-hide-password').attr('type', type);
        target.find('i').toggleClass('ce-icon-eye ce-icon-eye-slash');
    },
    QuickNavi: function(target, before) {
        for (var i = 0; i < target.children('.menu-item').length; i++) {
            var mTitle;
            mTitle = target.children('.menu-item').eq(i).children('.menu-link').find('.menu-text').text();
            mTitle = before != "" ? before + ' / ' + mTitle : mTitle;

            if (!target.children('.menu-item').eq(i).hasClass('menu-item-submenu')) {
                var mLink = target.children('.menu-item').eq(i).children('.menu-link').attr('href');
                MenuItems.push({ link: mLink, title: mTitle });
            } else {
                var parentTitle;
                if (!target.children('.menu-item').eq(i).parent().hasClass('menu-nav')) {
                    parentTitle = target.children('.menu-item').eq(i).parent().parent().parent().children('.menu-link').find('.menu-text').text();
                } else {
                    parentTitle = '';
                }
                var curentTitle = target.children('.menu-item').eq(i).children('.menu-link').find('.menu-text').text();
                finalTitle = parentTitle != '' ? parentTitle + ' / ' + curentTitle : curentTitle;
                var subdep = target.children('.menu-item').eq(i).children('.menu-submenu').children('.menu-subnav');
                CE.QuickNavi(subdep, finalTitle);
            }
        }
    },
    KeyPress: function(e) {
        var evtobj = window.event ? event : e;
        if (evtobj.keyCode == 191 && evtobj.ctrlKey) {
            jQuery('.quick-nav-input').focus();
        }
    }
};
var Utils = {
    notEmpty: function(val) {
        return !Utils.isEmpty(val);
    },
    isEmpty: function(val) {
        if (typeof val == "object")
            return false;
        if (typeof val == "function")
            return false;
        return val === undefined || jQuery.trim(val).length === 0;
    }
};

var Main = {
    init: function() {
        Main.onEvent();
        Main.upEvent();
    },
    upEvent: function(container) {
        if (Utils.isEmpty(container)) {
            container = jQuery(document);
        }
        container.find('#id').click(function() {
            //Do something
        });
        container.find('.table-scroll-head').each(function() {
            jQuery(this).css('max-height', jQuery(this).attr('data-max-height') + 'px');

        });
        container.find('.upload-image-area').each(function() {
            var obj = jQuery(this);
            if (obj.find('.image-target-upload').attr('data-current-image') && obj.find('.image-target-upload').attr('data-current-image') != "") {
                obj.find('.image-target-upload').css('background-image', 'url(' + obj.find('.image-target-upload').attr('data-current-image') + ')');
                obj.find('.uploaded-image').attr('data-show-default', 'false');
            }
        });
        CE.QuickNavi(jQuery('#kt_aside_menu').children('.menu-nav'), '');
        jQuery('[data-sticky-head="true"]').each(function() {
            let theadOffset = jQuery(this).find('thead').offset().top;
            jQuery(this).find('thead tr th').each(function() {
                let thOffset = jQuery(this).offset().top;
                thOffset = thOffset - theadOffset;
                jQuery(this).css('top', thOffset);
            });

        });
        jQuery('[data-sticky-left="true"]').each(function() {
            var col = JSON.parse(jQuery(this).attr('data-sticky-left-column'));
            var theadVTr = jQuery(this).find('thead tr').length;
            var tbodyVTr = jQuery(this).find('tbody tr').length;

            let theadOffset = jQuery(this).offset().left;


            for (var i = 0; i < col.length; i++) {
                var eq = col[i] - 1;
                //Begin theadVTr
                for (var j = 0; j < theadVTr; j++) {
                    let column = jQuery(this).find('thead tr').eq(j).find('th').eq(eq);
                    column.attr('data-column-sticky', 'true');
                    let thOffset = column.offset().left;
                    thOffset = thOffset - theadOffset;
                    column.css('left', thOffset);
                    if (column.attr('rowspan')) {
                        let rowspan = parseInt(column.attr('rowspan'));
                        j = j + rowspan - 1;
                    }
                    if (column.attr('colspan')) {
                        let colspan = parseInt(column.attr('colspan'));
                        if (colspan > col.length) {
                            column.attr('data-column-sticky', 'false');
                        }
                    }
                }
                //End theadVTr
                //Begin tbodyVTr
                for (var t = 0; t < tbodyVTr; t++) {
                    let column = jQuery(this).find('tbody tr').eq(t).find('td').eq(eq);
                    column.attr('data-column-sticky', 'true');
                    let tdOffset = column.offset().left;
                    tdOffset = tdOffset - theadOffset;
                    column.css('left', tdOffset);
                    if (column.attr('rowspan')) {
                        let rowspan = parseInt(column.attr('rowspan'));
                        t = t + rowspan - 1;
                    }
                    if (column.attr('colspan')) {
                        let colspan = parseInt(column.attr('colspan'));
                        if (colspan > col.length) {
                            column.attr('data-column-sticky', 'false');
                        }
                    }
                }
                //End tbodyVTr
            }

        });

    },
    onEvent: function() {

        jQuery(document).on('click', '.scroll-more-module', function(e) {
            e.stopPropagation();
            var target = $(this).parent().find('[data-scroll-icon="true"]');
            var targetHeight = target.height();
            var y = target.scrollTop();
            target.scrollTop(y + targetHeight);
        });
        jQuery(document).on('change', '#id', function() {
            //Do something
        });

        jQuery(document).on('click', '.btn-cta-icon', function(e) {
            e.preventDefault();
            jQuery(this).parents('.btn-cta-subchild').toggleClass('active');
            jQuery(this).toggleClass('fa-angle-right fa-angle-down');
        });
        jQuery(".table-scroll-head").on('scroll', function() {
            var tableScrollTop = $(this).scrollTop();
            var css = 'translateY(' + tableScrollTop + 'px)';
            jQuery(this).find('thead tr th').css('transform', css);
        });
        jQuery('.upload-image-input').on('change', function(event) {
            for (var i = 0; i < event.target.files.length; i++) {
                var tmppath = URL.createObjectURL(event.target.files[i]);
                var obj = jQuery(this).parents(".upload-image-area");
                obj.find(".uploaded-image").attr('data-uploaded', 'true');
                obj.find('.image-target-upload').css('background-image', 'url(' + tmppath + ')');
                obj.find('.uploaded-image').attr('data-show-default', 'false')
            }
        });
        jQuery(document).on('click', '.re-upload-image', function() {
            var next = jQuery(this).next('.image-target-upload');
            if (next.attr('data-current-image') && next.attr('data-current-image') != "") {
                next.css('background-image', 'url(' + next.attr('data-current-image') + ')');
            } else {
                next.css('background-image', '');
                jQuery(this).parents('.upload-image-area').find('.uploaded-image').attr('data-show-default', 'true');
            }
            jQuery(this).closest('.uploaded-image').attr('data-uploaded', 'false');
            jQuery(this).parents('.upload-image-area').find('.upload-image-input').val('');
        });

        var li = $(document).find('.quick-nav-result-ul > li');
        var liSelected;
        var next;
        jQuery(document).on("keyup", ".quick-nav-input", function(e) {
            if (e.which !== 38 && e.which !== 40 && e.which !== 13) {
                var text = jQuery(this).val().toLowerCase();

                let resultTarget = jQuery('.quick-nav-result');
                let resultUl = jQuery('.quick-nav-result-ul');

                if (!text) {
                    resultUl.find('li').remove();
                    resultTarget.hide();
                } else {
                    resultUl.find('li').remove();
                    var count = 0;
                    for (var i = 0; i < MenuItems.length; i++) {
                        if (MenuItems[i].title.toLowerCase().indexOf(text) > -1) {
                            count = count + 1;
                            var txt = MenuItems[i].title.toLowerCase();
                            txt = txt.replaceAll(text, '<span class="nav-result-highlight">' + text + '</span>');
                            resultUl.append('<li><a href="' + MenuItems[i].link + '">' + txt + '</a></li>');
                        }
                    }
                    resultTarget.show();
                    if (count != 0) {
                        resultTarget.find('.quick-nav-result-title').text(resultTarget.find('.quick-nav-result-title').attr('data-result-title'));
                        let ulOffset = resultUl.offset().top;
                        resultUl.children('li').each(function() {
                            let liOffset = jQuery(this).offset().top;
                            liOffset = liOffset - ulOffset;
                            jQuery(this).attr('data-offset', liOffset);
                        });

                    } else {
                        resultTarget.find('.quick-nav-result-title').text(resultTarget.find('.quick-nav-result-title').attr('data-empty-result-title'));

                    }
                    KTUtil.scrollUpdate(resultUl[0]);
                }
                li = $(document).find('.quick-nav-result-ul > li');
                liSelected = $();
                next = $();
            }
        });

        function ScrollSearchResult(liSelected) {
            var liOffset = 0;
            var resultUl = jQuery('.quick-nav-result-ul');
            var ulOffset = resultUl.offset().top;
            var ulHeight = resultUl.height();
            liOffset = parseInt(liSelected.attr('data-offset'));
            var liHeight = liSelected.height();
            liOffset = liOffset + liHeight;
            var step = Math.floor(liOffset / ulHeight);
            step = step * ulHeight;
            resultUl.scrollTop(step);

        }
        jQuery(document).on("keydown", ".quick-nav-input", function(e) {
            if (e.which === 40) {
                if (liSelected.length != 0) {
                    liSelected.removeClass('keydown-selected');
                    next = liSelected.next('li');
                    if (next.length > 0) {
                        liSelected = next;
                        liSelected.addClass('keydown-selected');
                        ScrollSearchResult(liSelected);
                    } else {
                        liSelected = li.eq(0);
                        liSelected.addClass('keydown-selected');
                        ScrollSearchResult(liSelected);
                    }
                } else {
                    liSelected = li.eq(0);
                    liSelected.addClass('keydown-selected');
                    ScrollSearchResult(liSelected);

                }
            } else if (e.which === 38) {
                if (liSelected.length != 0) {
                    liSelected.removeClass('keydown-selected');
                    next = liSelected.prev('li');
                    if (next.length > 0) {
                        liSelected = next;
                        liSelected.addClass('keydown-selected');
                        ScrollSearchResult(liSelected);
                    } else {
                        liSelected = li.last();
                        liSelected.addClass('keydown-selected');
                        ScrollSearchResult(liSelected);
                    }
                } else {
                    liSelected = li.last();
                    liSelected.addClass('keydown-selected');
                    ScrollSearchResult(liSelected);
                }
            } else if (e.which === 13) {
                if (liSelected.length != 0) {
                    var url = $(liSelected).children('a').attr('href');
                    window.location.href = url;
                }
            }
        });
        jQuery('.quick-nav-input').on('search', function() {
            jQuery('.quick-nav-result-ul').find('li').remove();
            jQuery('.quick-nav-result').hide();
        });
        jQuery('.quick-nav-input').on('focus', function() {
            let val = jQuery(this).val();
            if (val != '') {
                jQuery('.quick-nav-result').show();
            }
        });
        jQuery(document).on("keydown", function() {
            CE.KeyPress();
        });
        jQuery('.dropdown[data-scroll-action="update"]').on('shown.bs.dropdown', function() {
            jQuery(this).children('.dropdown-menu').find('[data-scroll="true"]').each(function() {
                var el = jQuery(this)[0];
                KTUtil.scrollUpdate(el);
            });
        });
        jQuery('.modal').on('show.bs.modal', function(e) {
            let relatedTarget = jQuery(e.relatedTarget);
            let width = relatedTarget.data('width');
            // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
            // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
            let modal = jQuery(this);
            if (width) {
                modal.find('.modal-dialog').css('max-width', width + 'px');
            }
        });
        jQuery(document).on('mouseup', function(e) {
            //Quick Search
            let searchResult = jQuery(".quick-nav-result");
            let searchInput = jQuery(".quick-nav-input")
            if (!searchResult.is(e.target) && searchResult.has(e.target).length === 0 && !searchInput.is(e.target) && searchInput.has(e.target).length === 0) {
                searchResult.hide();
            }
        });

    }
};

jQuery(document).ready(function() {
    Main.init();
});