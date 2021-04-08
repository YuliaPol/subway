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
        $('.reviews-table-wrapper').on('click', '.show-form', function(e){
            $(this).fadeOut(0);
            $(this).parents('.comment-wrapper').find('.hidden-form-wrapper').fadeIn(300);
        });
        $('.reviews-table-wrapper').on('click', '.hide-form', function(e){
            $(this).parents('.comment-wrapper').find('.show-form').fadeIn(300);
            $(this).parents('.comment-wrapper').find('.hidden-form-wrapper').fadeOut(0);
        });
        $('.reviews-table-wrapper').on('click', '.show-full-comment-wrapp .icon', function(e){
            let textarea = $(this).parents('.comment-wrapper').find('textarea')[0];
            textarea.style.height = 'auto';
            textarea.style.height =  (textarea.scrollHeight) + 20 + 'px';

        });
        $('.show-submenu').click(function(e){
            e.preventDefault();
            let menuItem = $(this).parents('.treeview');
            if(menuItem.hasClass('hidden-menu')){
                menuItem.removeClass('hidden-menu');
                console.log(menuItem.find('.treeview-menu'));
                menuItem.find('.treeview-menu').fadeIn(300);
            }
            else {
                menuItem.addClass('hidden-menu');
                menuItem.find('.treeview-menu').fadeOut(300);
            }
        });
        $('form').on('submit', function(e){
            let elements = $(this).find('.required-input')
            let arError = new Array();
            for (let index = 0; index < elements.length; index++) {
                if(!$(elements[index]).find('input').val()){
                    $(elements[index]).addClass('has-error');
                    arError.push($(elements[index]).find('input'));
                    $(elements[index]).find('input').on('focus', function(e){
                        $(this).parents('.required-input').removeClass('has-error');
                    })
                }
            }
            if(arError.length > 0) {
                return false;
            }
        });
        $('.show-password').click(function(e){
            if($(this).parent().find('input').attr('type') === 'password') {
                $(this).parent().find('input').attr('type', 'text')
            }
            else {
                $(this).parent().find('input').attr('type', 'password')
            }
        });
    });
});