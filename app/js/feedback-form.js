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
    };

    var _ajaxForm = function(form, url){

        if (!validation.validateForm(form)) return false;

             data = form.serialize();

                        var result = $.ajax({
                                url: url,
                                type: 'POST',
                                dataType: 'json',
                                data: data,
                            }).fail( function(ans) {
                        console.log('Проблемы в PHP');
                        form.find('.error-mes').text('На сервере произошла ошибка').show();
                      });

                        return result;
                    };








    return {
        init: init

    };

})();

contactMe.init();
