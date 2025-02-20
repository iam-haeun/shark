$(document).ready(function(){
    // ie css 변수적용
    cssVars();

    initGnbSwiper();
    initTabNavSwiper();


    // SNB toggle
    $('.btn-menu').on('click',function(){
        $('#snb').toggleClass('on');
    });


    // SNB resize
    $(window).resize(function(){ 
        if (window.innerWidth <= 1400){ 
            $('#snb').addClass('on');
        }else{ 
            $('#snb').removeClass('on');
        }
    }).resize();


    // tab nav
    var TabNav = $('.tab-nav li a');
    TabNav.on('click', function() {
        var activeTab  = $(this).attr('data-tab');
        $(this).addClass('active').parent().siblings('li').find('a').removeClass('active');
        $("#" + activeTab).addClass('active').siblings('.tab-cont').removeClass('active');
    });

    var activeChk = 0;
    TabNav.each(function(i) {
        if ($(this).hasClass('active')) {
            $(this).addClass('active');
            $(this).trigger('click');
            activeChk++
        }
    });


    // input file custom
    $('input[type=file]').on('change',function(){
        var $this = $(this);
        var oFile = $this[0].files;
        var fileName = $this.val().split('\\').pop();
        
        $this.parent().siblings('.file-name').html(fileName + '<button type="button" class="file-delete"></button>');

        if (oFile.length < 1) {
            $this.parent().siblings('.file-name').empty();
        }

        $('.file-delete').on('click', function() {
            $(this).parent().empty();
        });
    });


    // 비밀번호 input
	$('.pw-input i').on('click',function(){
		var input = $(this).prev('input');
		input.toggleClass('active');
		if(input.hasClass('active')){
			$(this).attr('class','ri-eye-off-line')
			.prev('input').attr('type','text');
		}else{
			$(this).attr('class','ri-eye-line')
			.prev('input').attr('type','password');
		}
	});


    // 팝업
    $('.popup-open').on('click',function(e){
        e.preventDefault();
        $('.popup-wrap').fadeIn();
    });

    $('.popup-close').on('click',function(e){
        e.preventDefault();
        $('.popup-wrap').fadeOut();
    });
    
    $('.popup-wrap').on('click',function(e){
		var target = $(e.target);
		if(! target.closest('.popup-wrap .popup').length){
			$('.popup-wrap').fadeOut();
		}
	});


    // datepicker
    $('.date-input').datepicker({
        closeText: '닫기',
        currentText: '오늘',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        weekHeader: '주',
        yearSuffix: '년',
        changeYear : true,//년도 선택 박스 활성
        changeMonth : true,//월 선택 박스 활성
        dateFormat : 'yy-mm-dd',//입력값 포맷
        showButtonPanel : true,//오늘,닫기 버튼 활성
        yearRange : '2024:2024',//선택연도범위지정
        showWeek : false,//주차 표기
    });


    // progressbar
    $('.progressbar .gauge').each(function() {
        var $this = $(this);
        var per = $this.attr('per');
        $this.css('width', per + '%');
        $this.parent().before('<span>' + per + '%' + '</span>');
    });
});

// gnb 
function initGnbSwiper(){
    $('.gnb').each(function() {
        var $container = $(this);

        var gnb = new Swiper('.gnb', {
            slidesPerView: 'auto',
            observer: true,
            observeParents: true,
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true,
            },
        });

        var $activeItem = $container.find('.swiper-slide.on');
        if ($activeItem.length > 0) {
            centerTabItem($activeItem);
        }

        function centerTabItem($target) {
            var $wrapper = $container.find('.swiper-wrapper');
            var targetPos = $target.position();
            var containerWidth = $container.width();
            let newPosition = 0;
            let listWidth = 0;

            $wrapper.find('.swiper-slide').each(function() {
                listWidth += $(this).outerWidth();
            });

            var selectTargetPos = targetPos.left + $target.outerWidth() / 2;
            if (containerWidth < listWidth) {
                if (selectTargetPos <= containerWidth / 2) {
                    newPosition = 0; // 왼쪽
                } else if ((listWidth - selectTargetPos) <= containerWidth / 2) {
                    newPosition = listWidth - containerWidth; // 오른쪽
                } else {
                    newPosition = selectTargetPos - containerWidth / 2;
                }
            }

            setTimeout(function() {
                $wrapper.css({
                    'transform': 'translate3d(' + (-newPosition) + 'px, 0, 0)',
                });
            });
        }
    });
}

// tab nav
function initTabNavSwiper(){
    $('.tab-nav').each(function() {
        var $container = $(this);

        // tab nav
        var tabNav = new Swiper('.tab-nav', {
            slidesPerView: 'auto',
            preventClicks: true,
            preventClicksPropagation: false,
            observer: true, 
            observeParents: true 
        });

        $container.on('click', '.swiper-slide a', function() {
            var $item = $(this).parent();

            $container.find('.swiper-slide').removeClass('on');
            $item.addClass('on');

            centerTabItem($item);
        });

        var $activeItem = $container.find('.swiper-slide.on');
        if ($activeItem.length > 0) {
            centerTabItem($activeItem);
        }

        function centerTabItem($target) {
            var $wrapper = $container.find('.swiper-wrapper');
            var targetPos = $target.position();
            var containerWidth = $container.width();
            let newPosition = 0;
            let listWidth = 0;

            $wrapper.find('.swiper-slide').each(function() {
                listWidth += $(this).outerWidth();
            });

            var selectTargetPos = targetPos.left + $target.outerWidth() / 2;
            if (containerWidth < listWidth) {
                if (selectTargetPos <= containerWidth / 2) {
                    newPosition = 0; // 왼쪽
                } else if ((listWidth - selectTargetPos) <= containerWidth / 2) {
                    newPosition = listWidth - containerWidth; // 오른쪽
                } else {
                    newPosition = selectTargetPos - containerWidth / 2;
                }
            }

            setTimeout(function() {
                $wrapper.css({
                    'transform': 'translate3d(' + (-newPosition) + 'px, 0, 0)',
                    'transition-duration': '500ms'
                });
            }, 200);
        }
    });
}

