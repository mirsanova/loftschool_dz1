var myModule = (function () {

    var init = function () {

         _setUpListners();

        };

    var _setUpListners = function (){

            $('#add-new-item').on('click', _showModal);

        };

    var _showModal = function (ev){

        console.log('Вызов модального окна')

        ev.preventDefault();
        $('#add-project-popup').bPopup({
            speed: 650,
            transition: 'slideDown'});


        };

    return {
        init: init
    };

})();

myModule.init();
