var validation = (function () {

// Инициализирует наш модуль
    var init = function () {

         _setUpListners();

        };
// Прослушивает события
    var _setUpListners = function (){
        $('form').on('keydown','.has-error', _removeError);
        $('form').on('reset', _clearForm);
        $('#upload').on('change', _changeInputFileCaption);

        };

//Очищает всю форму от ошибок с помощью reser
var  _clearForm = function (form){

        var form = $(this);
        form.find('input, textarea').trigger('hideTooltip');
        form.find('.has-error').removeClass('has-error');
        form.find('.error').removeClass('error');
    };

//Очищает поле от ошибок

    var  _removeError = function (){

        $(this).removeClass('has-error');
        $(this).parent('label').removeClass('error');

    };
//Создает тултипы
    var _createQtip = function (el, position){

        if (position === 'right') {
            position = {
                my: 'left center',
                at: 'right center'
            };
        }else{
            position = {
                my: 'right center',
                at: 'left center',
                adjust: {
                    method: 'shift none'
            }
        };
    }
    el.qtip({

        content: {
            text: function(){
                return $(this).attr('qtip-content');
            }
        },
        show:{
            event: 'show'
        },
        hide:{
            event: 'keydown hideTooltip'
        },
        position : position,
        style: {
            classes: 'qtip-red myCustomClass'
        }

    }).trigger('show');

    };

//Работает с полем для загрузки картинки

    var _changeInputFileCaption = function() {

        var inputUpload = form.find('input[type="file"]'),
            str  = $('#upload').val(),
            input = $(val),
            val = input.val(),
            i = str.lastIndexOf('\\')+1,
            valid;
            uploadImg = form.find('#upload-label');
            divUploadImg = form.find('.contact-item');

            var name = str.substring(i, str.length);

            if ((name.length === 0) & (inputUpload.attr('name') === 'upload')) {

                $('#upload-img').text('Загрузите изображение');
                uploadImg.addClass('has-error') & divUploadImg.addClass('error');
                _createQtip(inputUpload, pos);
                valid =false;

            } else {
                $('#upload-img').text(name);
                uploadImg.removeClass('has-error') & divUploadImg.removeClass('error');
                inputUpload.qtip('destroy');
                valid =true;
            }
    return valid;
    };

// Проверка url
    var _isValidURL = function (form){
    var valid,
        RegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
        inputURL = form.find('#url-project'),
        url = inputURL.val();

    if (RegExp.test(url)) {
        valid = true;

    } else {
         valid = false;
    }
    return valid;

    };
// Проверка email
    var _isValidEmail = function (form){
    var valid,
        RegExp = /\S+@\S+\.\S+/,
        inputEmail = form.find('#email'),
        email = inputEmail.val();

    if (RegExp.test(email)) {
        valid = true;
    } else {
         valid = false;
    }
    return valid;

    };
//Валидация формы

    var validateForm = function(form) {

        var inputs = form.find('input, textarea').not('input[type="file"]'),
            inputURL = form.find('#url-project'),
            inputCaptcha = form.find('#g-recaptcha'),
            url = inputURL.val(),
            inputEmail = form.find('#email'),
            email = inputEmail.val();


            var validForm = true,
                validUrl  = true,
                validEmail = true,
                validName = true;

            inputURL.attr("qtip-content", "введите название");

            $.each(inputs, function (index, val){

                var input = $(val),
                    val = input.val();
                    pos= input.attr('qtip-position');
                    uploadImg = form.find('#upload-label');
                    divUploadImg = form.find('.contact-item');
                    // console.log(input.attr('name'));
                if (input.attr('name') != 'g-recaptcha-response') {
                    if (val.length === 0) {

                        input.parent('label').addClass('error');
                        input.addClass('has-error');
                        _createQtip(input, pos);
                        validForm = false;

                    }   else if (url !== 0 && input.attr('name') === 'url-project' ) {
                            validUrl = _isValidURL(form);
                            if (validUrl === false) {
                                inputURL.attr("qtip-content", "некорректный url");
                                inputURL.parent('label').addClass('error');
                                inputURL.addClass('has-error');
                                _createQtip(input, pos);
                            }
                        }

                    else {
                        if (email !== 0 && input.attr('name') === 'email' ){
                            validEmail = _isValidEmail(form);

                            if (validEmail === false) {

                                inputEmail.attr("qtip-content", "некорректный email");
                                inputEmail.parent('label').addClass('error');
                                inputEmail.addClass('has-error');
                                _createQtip(input, pos);
                            }
                        }
                    }
                }
            });

        var upload = form.find('#upload');

        if ( upload.attr('name') != undefined ) {

            validName = _changeInputFileCaption();
        }

        return validForm && validName && validUrl;

     };

    return {
        init: init,
        validateForm:  validateForm
    };

})();

validation.init();
