function changeDateFormat(inputDate) {
    var day = inputDate.split('/')[0];
    var month = inputDate.split('/')[1];
    var year = inputDate.split('/')[2];
    var newFormat = year + '/' + month + '/' + day;
    return newFormat;
}
jQuery(document).ready(function() {
    $.datetimepicker.setLocale('vi');
    jQuery(document).find('.datetimepicker').each(function() {
        var obj = jQuery(this);
        var dayOfWeekStart = 1,
            timepicker = false,
            datepicker,
            mask = false,
            format = 'd/m/Y',
            inline = false,
            startDate,
            minDate, //yesterday is minimum date use -1970/01/02 (for today use 0 or -1970/01/01)
            maxDate, //tomorrow is maximum date calendar use +1970/01/02
            targetMinDate,
            targetMaxDate,
            rangerPoint;

        if (obj.attr('data-time-picker')) {
            timepicker = (obj.attr('data-time-picker') == "true");
        }
        if (obj.attr('data-date-picker')) {
            datepicker = (obj.attr('data-date-picker') == "true");
        }
        if (obj.attr('data-mask')) {
            mask = (obj.attr('data-mask') == "true");
        }
        if (obj.attr('data-format')) {
            format = obj.attr('data-format');
        }
        if (obj.attr('data-inline')) {
            inline = (obj.attr('data-inline') == "true");
        }
        if (obj.attr('data-start-date')) {
            startDate = obj.attr('data-start-date');
        }
        obj.datetimepicker({
            dayOfWeekStart: dayOfWeekStart,
            timepicker: timepicker,
            datepicker: datepicker,
            mask: mask,
            format: format,
            inline: inline,
            startDate: startDate,
            onShow: function(ct) {
                if (obj.attr('data-min-date-target')) {
                    minDate = jQuery(obj.attr('data-min-date-target')).val() ? changeDateFormat(jQuery(obj.attr('data-min-date-target')).val()) : false;
                } else if (obj.attr('data-min-date')) {
                    minDate = obj.attr('data-min-date');
                } else {
                    minDate = false;
                }

                if (obj.attr('data-max-date-target')) {
                    maxDate = jQuery(obj.attr('data-max-date-target')).val() ? changeDateFormat(jQuery(obj.attr('data-max-date-target')).val()) : false;
                } else if (obj.attr('data-max-date')) {
                    maxDate = obj.attr('data-max-date');
                } else {
                    maxDate = false;
                }
                this.setOptions({
                    minDate: minDate,
                    maxDate: maxDate
                })
            }
        });
    });
});