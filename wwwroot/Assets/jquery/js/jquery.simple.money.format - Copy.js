(function ($) {
	$.fn.simpleMoneyFormat = function() {
		this.each(function(index, el) {		
			var elType = null; // input or other
			var value = null;
			// get value
			if($(el).is('input') || $(el).is('textarea')){
				value = $(el).val().replace(/,/g, '');
				elType = 'input';
			} else {
				value = $(el).text().replace(/,/g, '');
				elType = 'other';
			}
            // if value changes
            $(el).on('keydown', function (e) {
                var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
                if (key == 110 || key == 8)
                    return;

                if (key < 48 || (key > 57 && key < 96) || key > 105) {

                    if (key >= 37 && key <= 40)
                        return;

                    if (e.ctrlKey && key == 65)
                        return;

                    return false;
                }
            });
            $(el).on('paste keyup', function (e) {
                var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
                if (key != 110 && key != 8) {

                    if (key < 48 || (key > 57 && key < 96) || key > 105) {
                        if (key >= 37 && key <= 40)
                            return;

                        if (e.ctrlKey && key == 65)
                            return;

                        return false;
                    }
                }

				value = $(el).val().replace(/,/g, '');
				formatElement(el, elType, value, e); // format element
			});
			formatElement(el, elType, value); // format element
		});
        function formatElement(el, elType, value, event) {

			//var result = '';
			//var valueArray = value.split('');
			//var resultArray = [];
			//var counter = 0;
			//var temp = '';
			//for (var i = valueArray.length - 1; i >= 0; i--) {
			//	temp += valueArray[i];
			//	counter++
			//	if(counter == 3){
			//		resultArray.push(temp);
			//		counter = 0;
			//		temp = '';
			//	}
			//};
			//if(counter > 0){
			//	resultArray.push(temp);				
			//}
			//for (var i = resultArray.length - 1; i >= 0; i--) {
			//	var resTemp = resultArray[i].split('');
			//	for (var j = resTemp.length - 1; j >= 0; j--) {
			//		result += resTemp[j];
			//	};
			//	if(i > 0){
			//		result += ','
			//	}
			//};

            var p = -1;
            var s1 = "";
            var s2 = "";
            var s3 = "";
            if (event) {
                p = event.target.selectionStart;
                s1 = value ? value.substring(p) : "";
            }

            //var result = formatAmount(value);

            var isp = false;
            var nchars = [];
            var pchars = [];

            var chars = value.split('');
            for (var k in chars) {

                var v = chars[k];
                if (!isp && v == '.') {
                    isp = true;
                    continue;
                }
                if (!isNaN(v)) {
                    if (isp) {
                        pchars.push(v);
                    }
                    else {
                        nchars.push(v);
                    }
                }
            }

            var revert_nchars = nchars.reverse();
            var nchars = [];
            var nstr = '';
            for (var k in revert_nchars) {

                var v = revert_nchars[k];

                if (k > 0 && nstr.length % 3 == 0) {
                    nchars.push(',');
                }
                nstr += v;
                nchars.push(v);
            }

            var result = nchars.reverse().join('');
            if (isp) {
                result += ('.' + pchars.join(''));
            }

			if(elType == 'input'){
				$(el).val(result);
			} else {
				$(el).empty().text(result);
            }

            if (p > -1) {

                s3 = result ? result.substring(p) : "";
                s2 = s2.replace(/[^0-9]/g, '');
                s3 = s3.replace(/[^0-9]/g, '');

                var diff = s3.length - s2.length - s1.length;
                $(el).caretTo(p + diff);
            }
        };

        function formatAmountNoDecimals(number) {
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(number)) {
                number = number.replace(rgx, '$1' + '.' + '$2');
            }
            return number;
        };

        function formatAmount(number) {

            var s = number < 0 ? "-" : "";
            // remove all the characters except the numeric values
            number = number.replace(/[^0-9]/g, '');

            // set the default value
            if (number.length == 0) number = "0.00";
            else if (number.length == 1) number = "0.0" + number;
            else if (number.length == 2) number = "0." + number;
            else number = number.substring(0, number.length - 2) + '.' + number.substring(number.length - 2, number.length);

            // set the precision
            number = new Number(number);
            number = number.toFixed(2);    // only works with the "."

            // change the splitter to ","
            number = number.replace(/\./g, ',');

            // format the amount
            x = number.split(',');
            x1 = x[0];
            x2 = x.length > 1 ? ',' + x[1] : '';

            return s + formatAmountNoDecimals(x1) + x2;
        }
	};
}(jQuery));


(function ($) {
    // Behind the scenes method deals with browser
    // idiosyncrasies and such
    $.caretTo = function (el, index) {
        if (el.createTextRange) {
            var range = el.createTextRange();
            range.move("character", index);
            range.select();
        } else if (el.selectionStart != null) {
            el.focus();
            el.setSelectionRange(index, index);
        }
    };

    // The following methods are queued under fx for more
    // flexibility when combining with $.fn.delay() and
    // jQuery effects.

    // Set caret to a particular index
    $.fn.caretTo = function (index, offset) {
        return this.queue(function (next) {
            if (isNaN(index)) {
                var i = $(this).val().indexOf(index);

                if (offset === true) {
                    i += index.length;
                } else if (offset) {
                    i += offset;
                }

                $.caretTo(this, i);
            } else {
                $.caretTo(this, index);
            }

            next();
        });
    };

    // Set caret to beginning of an element
    $.fn.caretToStart = function () {
        return this.caretTo(0);
    };

    // Set caret to the end of an element
    $.fn.caretToEnd = function () {
        return this.queue(function (next) {
            $.caretTo(this, $(this).val().length);
            next();
        });
    };
}(jQuery));