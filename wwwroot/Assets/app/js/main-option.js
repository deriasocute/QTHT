$('.list_module').slick({
    dots: true,
    infinite: true,
    //autoplay: false,
    //autoplaySpeed:5000,
    
    arrows: true,
    //speed: 300,
    slidesToShow: 8,
    slidesToScroll: 8,
    responsive: [{
        breakpoint: 1199,
        settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
            centerMode: false
        }
    },
    {
        breakpoint: 768,
        settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
            centerMode: false
        }
    },
    {
        breakpoint: 480,
        settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            centerMode: false
        }
    },
    {
            breakpoint: 480,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                centerMode: false
            }
        }
    ]

});

$('.click_caret-menu').click(function (event) {
    event.preventDefault();
    $('.drop_click_caret-menu').toggleClass('open');
});
$(document).click(function (e) {
    var target = e.target;
    if (!$(target).is('.click_caret-menu') && !$(target).is('.click_caret-menu')) {
        $('.drop_click_caret-menu').removeClass('open');
    }
});

jQuery(function () {
    var dropdown = $('#sort_dropdown');
    if (!dropdown) { return }
    var toggle = dropdown.find('.dropdown-toggle');
    var quickSort = dropdown.find('.quickSort');
    /**
     * Toggle check mark
     * @param {string} data
     */
    function toggleCheck(data) {
        if (data.indexOf('&') === 0) { data = data.slice(1) }
        if (data.indexOf('&') !== -1) { data = data.replace(/&/g, '","') }
        if (data.indexOf('=') !== -1) { data = data.replace(/=/g, '":"') }
        var dataObject = JSON.parse(`{"${data}"}`);
        dropdown.find('.dropdown-menu .selected').removeClass('selected');
        $(`[value=${dataObject.Sort || 'DESC'}]`).parent().addClass('selected')
    }
    quickSort && quickSort.on('click', function () {
        $(window).on('ajaxComplete', function (event, xhr, settings) {
            (settings.url === '/home/notification.html' && xhr.status === 200) && toggleCheck(settings.data);
        });
        toggle && toggle.dropdown('toggle');
    });
    $(window).on('load', function () {
        var url = $('.redirectauto').val();
        if (url && url.indexOf('?') !== -1) {
            url = url.slice(url.indexOf('?') + 1);
            toggleCheck(url)
        }
    });
});
jQuery(function () {
    var form = $('#noti_form');
    var reset_btn = form.find('._delete');
    if (form && reset_btn) {
        reset_btn.on('click', function () {
            //TODO: Reset form 
            form.find('[name="Term"], [name="StartDate"], [name="EndDate"]').val('');
            form.find('[name="IDSender"]').val(0).attr('value', '');
            form.find('[name="Type"]').val(0).selectpicker('deselectAll');
        })
    }
});

jQuery(function () {
    var tableWrapper = $('.dataTables_wrapper');
    var checkAll = tableWrapper.find('.check-all');
    var actionButtons = tableWrapper.find('.btn-mark_as_read');

    function checkboxStatus(table) {
        return {
            total: table.find('.check-one').length,
            available: table.find('.check-one:not(:disabled)').length,
            checked: table.find('.check-one:checked').length
        }
    }
    function toggleCheckAll(event) {
        var table = tableWrapper.find('table:visible');
        var checkboxes = table.find('.check-one:not(:disabled)');
        var $this = $(event.target);
        var status = $this.prop('checked');
        checkboxes.prop({ checked: status }).trigger('change');
    }
    function toggleCheckbox(event) {
        var target = $(event.target);
        var status = target.prop('checked');
        var table = target.closest('table');
        var row = target.closest('.tr-item');
        var sibling = checkboxStatus(table);

        event.data.target.prop({
            checked: sibling.checked == sibling.available,
            indeterminate: sibling.checked > 0 && sibling.checked != sibling.available
        });
        event.data.buttons.prop({ disabled: sibling.checked == 0 });
        row.toggleClass('active', status);
    }
    function markRead(event) {
        var table = tableWrapper.find('table:visible');
        var checkboxes = table.find('.check-one:not(:disabled)');
        var href = $(event.currentTarget).data('href');
        if (!href)
            return false;
        var ids = [];

        checkboxes.each(function () {
            if ($(this).prop('checked')) {
                var id = $(this).data('id');
                typeof (id) == "number" && ids.push(id);
            }
        });
        Utils.autoCloseAllFlash(100);
        jQuery.ajax({
            type: "POST",
            async: true,
            url: href,
            data: { ID: ids, IDFile: [], RedirectPath: Utils.getRedirect },
            beforeSend: Utils.openOverlay,
            error: Utils.closeOverlay,
            success: Utils.sectionBuilder
        });
    }
    function appendEvent() {
        var table = tableWrapper.find('table:visible');
        var checkboxes = table.find('.check-one:not(:disabled)');
        var status = checkboxStatus(table);
        actionButtons.prop({ disabled: true });
        checkAll.prop({ checked: false, indeterminate: false, disabled: status.available == 0 });
        checkboxes.on('change', { target: checkAll, buttons: actionButtons }, toggleCheckbox);
    }

    checkAll.on('change', { target: tableWrapper }, toggleCheckAll);
    actionButtons.on('click', { target: tableWrapper }, markRead);
    $(window).on('load ajaxComplete', appendEvent);
});