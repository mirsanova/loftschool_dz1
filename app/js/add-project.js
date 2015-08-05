var myModule = (function () {

// Инициализирует наш модуль
    var init = function () {

         _setUpListners();

        };
// Прослушивает события
    var _setUpListners = function (){

            $('#add-new-item').on('click', _showModal);
            $('#add-new-project').on('submit', _addProject);


        };

//Работает с модальным окном
    var _showModal = function (ev){

        ev.preventDefault();
        var divPopup = $('#add-project-popup');
            form = divPopup.find('.form-new-project');
        divPopup.bPopup({
            speed: 250,
            transition: 'slideDown',
            onClose: function () {
                $(".qtip").remove();
                form.find('.server-mes').text('').hide();
                form.find('.error').removeClass('error');
                form.find('.has-error').removeClass('has-error');
            }
            });
        };






// Добавляет проект
    var _addProject = function (e) {

                e.preventDefault();


                var form = $(this),
                        url = 'add-project.php',
                        defObj = _ajaxForm(form, url);


                    if(defObj){
                        defObj.done(function(ans) {

                            var successBox = form.find('.success-mes'),
                                    errorBox = form.find('.error-mes');

                            if(ans.status === 'OK'){
                                errorBox.hide();
                                successBox.text(ans.text).show();
                            }else{
                                successBox.hide();
                                errorBox.text(ans.text).show();
                            }
                        });
                    }
    };
// Универсальная функция
// 1. Собирает данные из формы
// 2. Проверяет форму
// 3. Делает запрос на сервер и возвращает ответ с сервера
//
    var _ajaxForm = function (form, url) {

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

myModule.init();

