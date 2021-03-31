jQuery(function ($) {
    $(document).ready(function () {

        $('.tabs-container .tab-label').click(function(e){
            $(this).parents('.tabs-label-wrapper').find('.tab-label').removeClass('active');
            $(this).addClass('active');
            if($('.changed-breadcrumps').length > 0) {
                let label = $(this).html();
                $('.changed-breadcrumps').html(label);
            }
            
            var openBlock = $(this).attr('data-open');
            $(this).parents('.tabs-container').find('.tab-content').fadeOut(0);
            $(this).parents('.tabs-container').find('.tab-content').removeClass('active');
            $('.' + openBlock).fadeIn(300);
            $('.' + openBlock).addClass('active');
        });
        
        $('.page-content').on('input', '.form-add-message textarea', function(e){
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
        $('.upload-image').change(function(e){
            var thisEl = this;
            if (e.target.files && e.target.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $(thisEl).parents('.form-group').find('.picture-example-wrapper img').attr('src', e.target.result );
                }
                reader.readAsDataURL(e.target.files[0]);
            }
        });
        $('.upload-images').click(function(e){
            $('.input-images .image-uploader').click();
        });
    });
});