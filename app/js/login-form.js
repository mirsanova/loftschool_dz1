var loginForm = (function () {

// Инициализирует наш модуль
    var init = function () {

         _setUpListners();

    };
// Прослушивает события
    var _setUpListners = function (){

        $('#login-form').on('submit', _submitForm);

    };

    var _submitForm = function (ev){

        ev.preventDefault();

        var form = $(this),
        url = 'login-form.php',
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

loginForm.init();
