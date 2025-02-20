$(document).ready(function(){
	// ie css 변수적용
    cssVars();

	// 개발 진행 시 삭제 panel INCLUDE 
	$('#panel').load('../layout/panel.html', function(){
		setPanel();
	}); 

	// 모달 버튼
	$('a[data-bs-target], button[data-bs-target]').on('click',function(e){
		e.preventDefault();

		$('.modal').find('.modal-content:first').show().siblings().hide();
		$('.modal').find('input').prop('checked',false);
	});

	// 모달 체크박스 전체 선택
	$('#modalTermCheckAll').on('click',function(){
		var checked = $(this).is(':checked');

		if(checked){
			$('input[name="modalTermCheck"]').prop('checked',true);
		}else{
			$('input[name="modalTermCheck"]').prop('checked',false);
		}
	});

	// 리스트 토글
	var toggleWrap = $('.depth-list')
		, t = toggleWrap.find('.depth-head')
		, q = toggleWrap.find('.question')
		, a = toggleWrap.find('.answer');

	t.each(function(){
		var $this = $(this)
			, trigger = $this.children('a')
			, answer = $this.next('.depth-body')

		trigger.on('click',function(e){
			e.preventDefault();
			if (trigger.parent().hasClass('on')) {
				trigger.parent().removeClass('on');
				answer.stop().slideUp(200);
			} else {
				trigger.parent().addClass('on');
				answer.stop().slideDown(200);
			}
		});
	});

	q.each(function(){
		var $this = $(this)
			, trigger = $this.children('a')
			, answer = $this.next('.answer')

		trigger.on('click',function(e){
			e.preventDefault();
			if (trigger.parent().hasClass('on')) {
				trigger.parent().removeClass('on');
				answer.stop().slideUp(200);
			} else {
				q.not($this).removeClass('on');
				trigger.parent().addClass('on');

				a.not(answer).stop().slideUp(200);
				answer.stop().slideDown(200);
			}
		});
	});

	// 커스텀 셀렉트박스
	var customSelect = $('.custom-select');
    var selectStyled = customSelect.find('.current');
    var selectOptions = customSelect.find('.options li');

	selectStyled.on('click', function(){
		customSelect.toggleClass('open');
	});
	selectOptions.on('click', function(){
		var selectOptionsTxt = $(this).find('.tit').text();

		selectStyled.find('span').text(selectOptionsTxt);
		customSelect.removeClass("open");
	});
});

// panel
function setPanel(){
	var panel = $('#panel');
    var panelOpen = $('#header .user-btn');
    var panelClose = $("#panel .panel-close");

    panelOpen.on('click',function(e){
        e.preventDefault();

		if($(this).hasClass('on')){
			$(this).siblings('.user-menu').slideToggle(300,'easeOutExpo');
		}else{
			panel.addClass('on');
			$('body').addClass('open-panel');
		}
    });

    panelClose.on('click',function(e){
        e.preventDefault();
        panel.removeClass('on');
        $('body').removeClass('open-panel');
    });

	// 로그인 & 회원가입 탭 버튼
	$('.tab-btn a').on('click',function(){
		var activeTab  = $(this).attr('data-tab');
		$('.tab-btn a').removeClass('active');
		$('.tab-cont').removeClass('active');
		$(this).addClass('active');
		$('#'+activeTab).addClass('active');
		$('.tab-cont').find('.panel-cont:first').show().siblings().hide();
	});

	$('.tab-btn a').each(function(i){
		if($(this).hasClass('active')){
			$(this).trigger('click');
		}
	});

	// 학생 & 학부모 탭 버튼
	$('#tab-login .tab-wrap a').on('click',function(){
		var activeTab  = $(this).attr('data-tab');
		$('#'+activeTab).show().siblings('[id*="tab-"]').hide();
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

	// 체크박스 전체 선택
	$('#termCheckAll').on('click',function(){
		var checked = $(this).is(':checked');

		if(checked){
			$('input[name="termCheck"]').prop('checked',true);
		}else{
			$('input[name="termCheck"]').prop('checked',false);
		}
	});
}

// 학생 로그인 탭
function setTabStudent(el){
	$(el).parents('.panel-cont').hide();
	$('#tab-student').show();
}

// 학부모 로그인 탭
function setTabParent(el){
	$(el).parents('.panel-cont').hide();
	$('#tab-parent').show();
}

// 아이디 찾기
function setFindId(el){
	$(el).parents('.panel-cont').hide();
	$('.find-id').show();
}

// 비밀번호 찾기
function setFindPw(el){
	$(el).parents('.panel-cont').hide();
	$('.find-pw').show();
}

// 비밀번호 재설정
function setResetPw(el){
	$(el).parents('.panel-cont').hide();
	$('.reset-pw').show();
}

// 회원가입
function setJoin(el){
	$('.tab-btn a:last').trigger('click');
}

// 회원가입 이전
function setJoinPrev(el){
	$(el).parents('.panel-cont').hide().prev().show();
}

// 회원가입 다음
function setJoinNext(el){
	$(el).parents('.panel-cont').hide().next().show();
}

// 자녀 추가 등록
function setAddRegister(el){
	var cloned = $(el).parents('.basic-form').clone();
	var cont = $(el).parents('.cont-body');
	cloned.appendTo(cont);
	cloned.find('.btn-add').hide().next().show();
	cloned.find('input').val('');
	cloned.find('input[type="radio"]').prop('checked',false);
	cloned.addClass('mt-30');
	cont.find('.custom-radio').each(function(idx){
		$(this).find('input[name="gender01"]').prop('name','gender0' + (idx+1));
		$(this).find('input[id="male01"]').prop('id','male0' + (idx+1));
		$(this).find('label[for="male01"]').prop('for','male0' + (idx+1));
		$(this).find('input[id="female01"]').prop('id','female0' + (idx+1));
		$(this).find('label[for="female01"]').prop('for','female0' + (idx+1));
	});
}

// 자녀 추가 등록 삭제
function setDeleteRegister(el){
	$(el).parents('.basic-form').remove();
}

// 모달 이전
function setModalPrev(el){
	$(el).parents('.modal-content').hide().prev().show();
}

// 모달 다음
function setModalNext(el){
	$(el).parents('.modal-content').hide().next().show();
}

// 자녀 추가 등록 모달
function setModalAddChild(el){
	$(el).parents('.modal').modal('hide');
	$('#addChild').modal('show');
}

// 자녀 추가 등록 모달 - 추가 등록 버튼
function setModalAddRegister(el){
	var cloned = $(el).parents('.basic-form').clone();
	var cont = $(el).parents('.modal-body');
	cloned.appendTo(cont);
	cloned.find('.btn-add').hide().next().show();
	cloned.find('input').val('');
	cloned.find('input[type="radio"]').prop('checked',false);
	cloned.addClass('mt-30');
	cont.find('.custom-radio').each(function(idx){
		$(this).find('input[name="modalGender01"]').prop('name','modalGender0' + (idx+1));
		$(this).find('input[id="modalMale01"]').prop('id','modalMale0' + (idx+1));
		$(this).find('label[for="modalMale01"]').prop('for','modalMale0' + (idx+1));
		$(this).find('input[id="modalFemale01"]').prop('id','modalFemale0' + (idx+1));
		$(this).find('label[for="modalFemale01"]').prop('for','modalFemale0' + (idx+1));
	});
}