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

        $('#message-file').change(function(event){
            if (window.File && window.FileList && window.FileReader) {
                var files = event.target.files; //FileList object
                if($(this).parents('.form-add-message').find('.download-files-wrapper').length == 0){
                    var fileContHtml = '<div class="download-files-wrapper"></div>';
                    $(fileContHtml).appendTo($(this).parents('.form-add-message'));
                }
                var filesCont = $(this).parents('.form-add-message').find('.download-files-wrapper');
                filesCont.html(' ');
                if(files.length == 0){
                    filesCont.remove();
                    return ;
                }
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    //Only pics
                    console.log(file.name);
                    if (file.type.match('image')){
                        var picReader = new FileReader();
                        picReader.addEventListener("load", function (event) {
                            var picFile = event.target;
                            let fileItemHtml = 
                                '<div class="download-file-item">'
                                +'    <div class="icon-file" style="background-image: url(' + picFile.result + ');"></div>'
                                +'   <div class="file-name">'+ file.name + '</div>'
                                +'</div>';
                            $(fileItemHtml).appendTo(filesCont);
                        });
                        //Read the image
                        picReader.readAsDataURL(file);
                    }
                    else {
                        let fileItemHtml = 
                            '<div class="download-file-item">'
                            +'    <div class="icon-file"></div>'
                            +'   <div class="file-name">'+ file.name + '</div>'
                            +'</div>';
                        $(fileItemHtml).appendTo(filesCont);
                    }
                }
            } else {
                console.log("Your browser does not support File API");
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

        $('.tabs-wrapper .tab-item').click(function(e){
            $(this).parents('.tabs-wrapper').find('.tab-item').removeClass('active');
            $(this).addClass('active');
            var openBlock = $(this).attr('data-open');
            $(this).parents('.tabs-wrapper').find('.tab-content').fadeOut(0);
            $('#' + openBlock).fadeIn(300);
        });
        
        $('.page-content').on('input', '.form-add-message textarea', function(e){
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });
});