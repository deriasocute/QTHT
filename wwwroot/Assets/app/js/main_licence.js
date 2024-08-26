toastr.options = {
    "closeButton": true,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "50000",
    "hideDuration": "50000",
    "timeOut": "50000",
    "extendedTimeOut": "5000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

$(document).ready(function onDocumentReady() {

    if (Cdata.CUser && Cdata.CUser.Uid > 0) {
        jQuery.get("/license/GetExpired", function (data) {
            if (data.Status == 1) {
                toastr.warning(data.Messages, data.Title);
            }
        });
    }
   
});