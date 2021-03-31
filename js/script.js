jQuery(function ($) {
    $(document).ready(function () {

        $('.show-user-dropdown').click( function(){
            if($('.dropdown-user').is(':visible')){
                $('.dropdown-user').fadeOut(300)
            }
            else {
                $('.dropdown-user').fadeIn(300)
            }
        });

        $('.toggle-sidebar').click( function(){
            $('.sidebar').toggleClass('hide');
            $('.header').toggleClass('full-width');
            $('.content').toggleClass('full-width');
        });

        $('.show-treeview-menu').click(function(){
            let treeMenu = $(this).parents('.treeview').find('.treeview-menu');
            $(this).parents('.treeview').toggleClass('hiddden-menu');
            if(treeMenu.is(":visible")) {
                treeMenu.fadeOut(300);
            }
            else {
                treeMenu.fadeIn(300);
            }
        });

        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 100) {
                $('.scrollup').fadeIn();
            } else {
                $('.scrollup').fadeOut();
            }
        });
    
        $('.scrollup').on('click', function () {
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        });

        $('.page-content').on('input', '.form-add-message textarea', function(e){
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });
});