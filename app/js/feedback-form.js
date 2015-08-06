var contactMe = (function () {

// Инициализирует наш модуль
    var init = function () {

         _setUpListners();

    };

// Прослушивает события
    var _setUpListners = function (){

        $('#contact-me').on('submit', _submitForm);

    };

    var _submitForm = function (ev){

        ev.preventDefault();

        var form = $(this),
        url = 'feedback-form.php',
        defObj = _ajaxForm(form, url);

        if(defObj){
            defObj.done(function(ans) {

                var successBox = form.find('.success-mes'),
                        errorBox = form.find('.error-mes');

                if(ans.status === 'OK'){

                    errorBox.hide();
                    form.trigger("reset");
                    successBox.text(ans.text).show();
                }else{
                    successBox.hide();
                    errorBox.text(ans.text).show();
                }
            });
        }
    };

    var _ajaxForm = function(form, url){
var valid = validation.validateForm(form);

        if (!valid) return false;

            data = form.serialize();

            var result = $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'json',
                    data: data
                }).fail( function(ans) {
            // console.log('Проблемы в PHP');
            // console.log(ans);
            //

            form.find('.error-mes').text('На сервере произошла ошибка').show();
            });

    return result;
    };

    return {
        init: init

    };

})();

contactMe.init();
