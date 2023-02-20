var commonJs = {};
this.commonJs = commonJs;
var ANIMATION_EASING = 'easeOutExpo';
var ACTIVE_CLASS = "active";
var headerFixH = 80;

$(document).ready(function(){
	commonJs.initFromToCalendar($('#datepickerFrom'), $('#datepickerTo'));
	commonJs.initResvCalendar($( ".calContainer" ), 30);
	commonJs.initPopSingleCalendar($('.calPopSingle'));
	commonJs.initPrintBtn('.btnPrint02');
	commonJs.initAllCheckForm('.frmAll' , '.allCheck');
	commonJs.initAllCheckForm('.listAllChk' , '.allCheck');
	commonJs.setFileTooltip('.file');
	commonJs.setFileUpload('.fileUpload');
	commonJs.setDropdownList('.dropdown_list');
	commonJs.setPopBanner('.mainPopLayer');

    commonJs.setHeader();
    commonJs.setNavigator();

    // 메뉴 호버시 서브 메뉴 펼치기
    $(document).on('mouseenter', '.nav-menu-list li', function () {
        $(this).children('.sub-menu').stop().slideDown();
        $(this).children('a').addClass('on');
    });
    // 메뉴 호버X 서브 메뉴 닫기
    $(document).on('mouseleave', '.nav-menu-list li', function () {
        $(this).children('.sub-menu').stop().slideUp();
        $(this).children('a').removeClass('on');
    });

    // 메뉴 호버시 헤더예약조회 펼치기
    $(document).on('mouseenter', '.util-menu__list li.re_check', function () {
	
        $(this).children('.util-subMenu').show();
        $(this).children('a').addClass('on');
		$(".util-menu__list").addClass('on');
    });
    // 메뉴 호버X 헤더예약조회 닫기
    $(document).on('mouseleave', '.util-menu__list li.re_check', function () {
        $(this).children('.util-subMenu').hide();
        $(this).children('a').removeClass('on');
		$(".util-menu__list").removeClass('on');
    });
    $('.js-sitemap').click(function() {
        $('.footer-siteMap').stop().slideDown();
    });
	$('.footer-siteMap .btn-close').click(function() {
        $('.footer-siteMap').stop().slideUp();
    });
	
	/* 오늘 하루닫기 */
    $(".todayClose").on("click", function(){
        $(".main_banner_wrap").hide();
    });

    // 메인 팝업 펼치기
    $(".btn-bell").on("click", function(){
        $("#main_pop_wrap").stop().slideDown();
    });
    // 메인 팝업 닫기
    $(".main_pop_close").on("click", function(){
        $("#main_pop_wrap").stop().slideUp();
    });

	$(document).on("click", ".btn-language", function(){
		$(this).siblings(".nav-lang-wrap").addClass("on");
	});

	// commonJs.initShowHideForm();
})


$(window).on('load', function(){
	commonJs.initAccordion($('.toggleList'));
	// commonJs.initComparison($('.comparison')); //오류로 인해 주석처리함 220610
	commonJs.initLayerPopup($('.layerPop'));
	commonJs.thumbFocusEvent($('.thum'));
	commonJs.initTab('.tabToggle');
	commonJs.initSwipe($('.swipeWrap'));
	// commonJs.initDesignScroll($('.scrollWrap'));
	commonJs.setScrollTransitionBtn($('.topViewCont'));
	commonJs.setWidthTranstionBtn('.promInt', '.btnPromo', '.promInt .btnLine', '.selectWrap button');
	commonJs.initFloatingContainer($('.rCont.floating'));
	commonJs.setParallax($('.parallaxUp'));
	commonJs.setKeywordBtnMore($('.keywordList .btnMore02'));
	commonJs.setHeadArea($('.header'));
	commonJs.setRevArea('.revArea');
	commonJs.initLayerSync($('.layerSync'));
	commonJs.setFixedBarArea($('.rsvInfor'));
	commonJs.attachRoomRsvClickEvent($('.roomRsv'));

	/**
	 * 직접호출 스크립트
	 * 
	 * commonJs.scrollingTo($('li:eq(0)'));
	 * commonJs.popShow($('#layerPop3'));
	 * commonJs.popClose($('#layerPop3'))
	 * setTimeout(function () {
	 * commonJs.focusAlert();
	 * }, 1000)
	 * 
	 */

})

commonJs.setHeader = function () {

    var header = $(".header");

    var didScroll; 
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = header.outerHeight();

    $(window).scroll(function(event){ 
        didScroll = true; 
    }); 

//     setInterval(function() { 
//         if (didScroll) { 
//             hasScrolled(); didScroll = false; 
//         } }, 250); 
//         function hasScrolled() { 
//             var st = $(this).scrollTop();

//             if(Math.abs(lastScrollTop - st) <= delta){return;}

//             if (st > lastScrollTop || st > navbarHeight){ 
//                 // Scroll Down 
//                 header.addClass('header-active');
//             } else { 
//                 if(st + $(window).height() < $(document).height() && $(document).scrollTop() === 0) {
                    
//                     header.removeClass("header-active"); 

//                 }

//             }

//             lastScrollTop = st;
//         }

}



commonJs.setNavigator = function() {

    var navBtn = $(".btn-main-menu");
    var navigator = $(".nav");
    var body = $("body");
    
    navBtn.click(function() {
        navigator.addClass("nav-active");

        // nav 오픈 시 body 스크롤 X
        body.addClass("scrollLock");
    })

    var navCloseBtn = navigator.find(".btn-close");

    navCloseBtn.click(function() {
        navigator.removeClass("nav-active");

        // nav 닫을시 body 스크롤 O
        body.removeClass('scrollLock');
    })
}

commonJs.openDetailView = function(element) {
    

    var el = $(element);

    if(!el.length){return}

    if((window.innerHeight / 2) - $(".header").outerHeight() < el.outerHeight()/2 ) {
        $(".header").removeClass("header-active")
    }

    el.addClass("show");
}

commonJs.closeDetailView = function(element) {
    

    var el = $(element);

    if(!el.length){return}

    el.removeClass("show");
}

/***********************************************************************************************************
 * document.Ready 시 호출 
 **********************************************************************************************************/


commonJs.setCookie = function (name, value) {
	var date = new Date();
	date.setHours(24, 0, 0, 0);
	document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};


commonJs.deleteCookie = function (name) {
	commonJs.setCookie(name, '', -1);
}

commonJs.getCookie = function (name) {
	var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return value ? value[2] : null;
};
/**
 * 메인 팝배너 적용
 * 
 * @param {String} popBanner
 */
commonJs.setPopBanner = function(popBanner){
	$(popBanner).each(function(idx){
		//배너 등록시 
		var ck = commonJs.getCookie("popBannerExpire_"+idx);
		if (ck == 'on') {
			commonJs.allowBodyScroll();
			$(this).hide();
			$('.dimmed').hide();

		} else {
			$(this).show();
		}
	})

	$(document).on('click', popBanner + ' .bannerClose', function () {
		var banner = $(this).closest(popBanner);
		var idx = $(popBanner).index(banner);
		if ($(this).closest(".fncArea").find('.frm.todayClose input:checkbox').is(':checked')) {
			//오늘 하루 열지 않기
			var ck = commonJs.getCookie("popBannerExpire_"+idx);
			if (ck == null || ck == undefined || ck == '') {
				commonJs.setCookie("popBannerExpire_"+idx, "on");
			}
		}
		commonJs.allowBodyScroll();
		banner.data('closed', true).hide();
		$('.dimmed').hide();

	})
}
/**
 * 기간조회 캘린더
 * 
 * @param from (Element)
 * @param to (Element)
 */
commonJs.initFromToCalendar = function (_from, _to) {
	
	// var currentDate = new Date();
	// var tommorowDate = new Date(currentDate);
	// tommorowDate.setDate(tommorowDate.getDate() + 1);
	// _from.val(currentDate.getFullYear() + '.' + lpad((currentDate.getMonth() + 1), 2, 0) + '.' + currentDate.getDate());
	// _to.val(tommorowDate.getFullYear() + '.' + lpad((tommorowDate.getMonth() + 1), 2, 0) + '.' + tommorowDate.getDate());
	
	var nowDate = new Date();
	var monthOfYear = nowDate.getMonth();
	var minDate = new Date();
	var maxDate = new Date();
	
	//1년전
	minDate.setMonth(monthOfYear - 12);
	//1년후
	maxDate.setMonth(monthOfYear + 12);
	from = _from
		.datepicker({
			// defaultDate: "+1w",
			numberOfMonths: 1,
			showMonthAfterYear: true,
			monthNames: ["01", "02", "03", "04", "05", "06",
				"07", "08", "09", "10", "11", "12"],
			dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
			dateFormat: 'yy.mm.dd',
			minDate : minDate,
			maxDate : maxDate,
			beforeShow: function () {
				$(this).datepicker("widget").addClass("datepickerFrom");
			},
			onClose: function () {
				$(this).datepicker("widget").removeClass("datepickerFrom");
			}
		})
		.on("change", function () {
			to.datepicker("option", "minDate", getDate(this));
		}),
		to = _to.datepicker({
			// defaultDate: "+1w",
			numberOfMonths: 1,
			showMonthAfterYear: true,
			monthNames: ["01", "02", "03", "04", "05", "06",
				"07", "08", "09", "10", "11", "12"],
			dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
			dateFormat: 'yy.mm.dd',
			minDate : minDate,
			maxDate : maxDate,
			beforeShow: function () {
				$(this).datepicker("widget").addClass("datepickerTo");
			},
			onClose: function () {
				$(this).datepicker("widget").removeClass("datepickerTo");
			}
		})
			.on("change", function () {
				from.datepicker("option", "maxDate", getDate(this));
			});
	$('#ui-datepicker-div').wrap('<div class="datepicker-wrapper"/>');
	
	function getDate(element) {
		var date;
		var dateFormat = 'yy.mm.dd';
		try {
			date = $.datepicker.parseDate(dateFormat, element.value);
		} catch (error) {
			date = null;
		}
		return date;
	}
}

 
/**
 * 예약 캘린더
 * https://api.jqueryui.com/datepicker/
 * 
 * @param calendarEl (Element)
 */
commonJs.initResvCalendar = function(calendarEl){
	if(!calendarEl.length){
		return;
	}
	var option = {};
	calendarEl.empty();
	
	if(calendarEl.hasClass('calSingle')){
		console.log('single calendar');

		var selectedDate = '';
		var promotionDate = [];
		
		option =  {
			defaultDate: new Date(2020,7,25),
			tDay: new Date(2020,7,25),
			chkInTitle : '선택 됨',
			numberOfMonths: 1,
			showMonthAfterYear:true,
			monthNames: [ "01","02","03","04","05","06",
			"07","08","09","10","11","12" ],
			dayNamesMin:[ "SUN","MON","TUE","WED","THU","FRI","SAT" ],
			// minDate: 0,
			minDate: new Date(2020,7,25),
			dateFormat:'yy.mm.dd',
			onChangeMonthYear: function(year, month, inst){
				setPromotionDate(year, month);
			},
			beforeShowDay: function(date){
				var calDate = dUtils.getToDate(date);
				// select
				if(selectedDate == calDate){
					$('.calNotiCont').hide();
					if(promotionDate.indexOf(calDate)!=-1 ){
						$('.calNotiCont').show();
						return [true, 'sel revOn promotion'];
					}
					return [true, 'sel revOn'];
				}

				//promotion
				if(promotionDate.indexOf(calDate)!=-1){
					return [true, 'promotion'];
				}
				
				
				return[true];
			},
			onSelect: function(date, inst){
				selectedDate = date;
			},
		};


		function setPromotionDate(year, month){

			//date push
			promotionDate= [];
			//test dummy
			var i = 20;
			while(i<30){
				promotionDate.push(year+'.'+lpad(month, 2, 0)+'.'+i);
				i++;
			}
		}

		calendarEl.datepicker(option);

		//초기 프로모션 데이트 설정
		setPromotionDate(calendarEl.datepicker('getDate').getFullYear(), calendarEl.datepicker('getDate').getMonth()+1);
		calendarEl.datepicker('refresh');

	}else{
		var chkInDate = '';
		var chkOutDate = '';
		var clickCnt = 0;
		var resved = false;
		var chkInTrIdx = '';
		
		//checkInOut calendar 
		option =  {
			defaultDate: new Date(2020,7,25),
			tDay: new Date(2020,7,25),
			chkInTitle: '체크인',
			chkOutTitle: '체크아웃',
			numberOfMonths: 2,
			showMonthAfterYear:true,
			monthNames: [ "01","02","03","04","05","06",
			"07","08","09","10","11","12" ],
			dayNamesMin:[ "SUN","MON","TUE","WED","THU","FRI","SAT" ],
			// minDate: 0,
			// maxDate : '+11m',
			minDate: new Date(2020,7,25),
			maxDate : new Date(2021,6,25),
			dateFormat:'yy.mm.dd',
			beforeShowDay: function(date){
				
				var calDate = dUtils.getToDate(date);
					
				// 체크인
				if(chkInDate == calDate){
					return [true, 'sel revOn ui-datepicker-unselectable ui-state-disabled'];
				}
				
				// 체크아웃
				if(chkOutDate == calDate){
					return [true, 'sel revOff'];
				}
				
				//중간 날짜 선택
				return [true, (calDate>chkInDate && calDate<chkOutDate)?'sel revIng':''];
			},
			onSelect: function(date, inst){
				
				var day = inst.selectedDay,
				mon = inst.selectedMonth,
				year = inst.selectedYear,
				drawMonth = inst.drawMonth;
				
				var weekOfDay = '';
				var selectPrevChkIn = false;

				var dateSplit = date.split('.');
				

				if(chkInDate!='' && date<chkInDate){
					selectPrevChkIn = true;
				}

				if(resved || (chkInDate!='' && date<chkInDate)){
					resved = false;
					clickCnt = 0;
					chkInDate = '';
					chkOutDate = '';
				}
				
				clickCnt++;

				var _startDate = new Date(2020, 7, 25);
				var _endDate = new Date(2021, 6, 25);

				if (clickCnt > 1) {
					
					chkOutDate = date;

					var ckinDay = dUtils.getDateToDay(chkInDate);
					var ckoutDay = dUtils.getDateToDay(chkOutDate);
					var nightCnt = dUtils.dateDiff(chkInDate, chkOutDate);
					$("#dateArea").html(chkInDate +" "+ ckinDay+" - " + chkOutDate +" "+ ckoutDay + "<span>"+nightCnt+"박</span>");
					$("#dateText").html(chkInDate +" "+ ckinDay+" - " + chkOutDate +" "+ ckoutDay + "<span>"+nightCnt+"박</span>");

					if ($("#night").length) {
						$("#night").val(nightCnt); // 체크인 날짜 
						$("#ckinDate").val(chkInDate); // 체크인 날짜 
						$("#ckoutDate").val(chkOutDate); // 체크아웃 날짜
					}

					var daysDiff = dUtils.dateDiff( chkInDate, chkOutDate);
					// var startDate = new Date();
					// var endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 12, 0);
					if(daysDiff>0){
						calendarEl.datepicker('setDate', chkOutDate);
						calendarEl.datepicker('option' , 'minDate', dUtils.getToDate(_startDate));
						calendarEl.datepicker('option' , 'maxDate', dUtils.getToDate(_endDate) );

						if(calendarEl.closest('.checkDate').length){
							calendarEl.closest('li').next('li').find('.btnToggle').trigger('click_checkDate');
						}
						
					}
				} else {
					chkInDate = date;
	
					chkInTrIdx = calendarEl.find('[data-year="'+year+'"][data-month="'+mon+'"]').filter(function(){
						return $(this).find('a').text().trim() == day;
					}).closest('tr').index();

					var _cid = new Date(dateSplit[0],dateSplit[1]-1,dateSplit[2]);
					_cid.setDate(_cid.getDate()+30);
					
					calendarEl.datepicker('setDate', chkInDate);
					// calendarEl.datepicker('option' , 'minDate', 0);
					calendarEl.datepicker('option' , 'minDate', _startDate);
					if(_cid > _endDate){
						calendarEl.datepicker('option' , 'maxDate', _endDate);
					}else{
						calendarEl.datepicker('option' , 'maxDate', _cid);
					}
				}

				if(drawMonth == new Date(dateSplit[0],dateSplit[1]-1,dateSplit[2]).getMonth()){
					gotoDate(calendarEl , mon , year);
				}else{
					gotoDate(calendarEl , mon-1 , year);
				}

				if(chkInDate!='' && chkOutDate!=''){
					resved = true;
				}
			},
			
		};
		
		calendarEl.datepicker(option);

		$(document).on('mouseover','.calendar tbody td', function(e){
			
			if (chkInDate != '') {
				var chkInCalendarIdx = $('.revOn').closest('.calInner').index();
	
				var calendarIdx = $(e.currentTarget).closest('.calInner').index();
				var currentTr = $(e.currentTarget).closest('tr');
				var currentTd = $(e.currentTarget);
				var startTr = $('.revOn').closest('tr');
				var startTd = $('.revOn');
				var chkInRightCalendar = false;
				
				if(chkOutDate!=''){
					return;
				}
				if((chkInCalendarIdx==calendarIdx && currentTd.index()<=startTd.index()) || (chkInCalendarIdx==calendarIdx &&currentTr.index() < startTr.index())){
					calendarEl.find('.calInner:eq('+calendarIdx+') tbody tr td').each(function(idx, itm){
						$(this).removeClass('sel revIng revIngEnd');
					})
					startTd.addClass('sel');
				}
			} else {
				return;
			}
	
			if (chkOutDate != '') {
				return;
			}
			if(chkInCalendarIdx==1){
				chkInRightCalendar = true; 
			}else if(currentTr.closest('.calRight').length && chkInCalendarIdx==0){
				calendarEl.find('.calLeft tbody tr').each(function(idx, itm){
					if(idx==startTr.index()){
						setTdState(startTr, startTd.index(), 6);
					}else if(idx>startTr.index()){
						setTdState($(itm), 0, 6);
					}
				})
	
				chkInRightCalendar = true; 
				startTr = $('.calRight tbody tr:eq(0)');
				startTd = startTr.find('td[data-handler="selectDay"]').eq(0);
				
			}else if(currentTr.closest('.calLeft').length && chkInCalendarIdx==0){
				calendarEl.find('.calRight tbody tr td').removeClass('revIng revIngEnd sel');
			}else{
				return;

			}
			
			
			if(chkInRightCalendar){
				
				calendarEl.find('.calRight .calendar tbody tr').each(function(){
					var _this = $(this);
					
					if (_this.index() < startTr.index() || _this.index() > currentTr.index() || calendarIdx==0) {
						return;
					}
		
					if (_this.index() == startTr.index() && _this.index() == currentTr.index()) {
						//start1
						if (currentTd.index() < startTd.index() || currentTr.index()< startTr.index()) { tdIdx = -1; } else { tdIdx = currentTd.index() };
						setTdState(startTr, startTd.index(), tdIdx, true );
						return;
					} else if (_this.index() == startTr.index() && _this.index() != currentTr.index()) {
						//start2
						setTdState(startTr, startTd.index(), startTr.find('td').length - 1);
						return;
					}
		
					if (_this.index() >= startTr.index() && _this.index() < currentTr.index()) {
						//ing
						setTdState(calendarEl.find('.calendar').eq(calendarIdx).find('tbody tr').eq(_this.index()), 0, 6);
						return;
					}
	
					if (_this.index() > startTr.index() && _this.index() == currentTr.index()) {
						//end
						setTdState(calendarEl.find('.calendar').eq(calendarIdx).find('tbody tr').eq(_this.index()), 0, currentTd.index(), true);
						return;
					}
		
				})
			}else{
				calendarEl.find('.calLeft .calendar tbody tr').each(function(){
					var _this = $(this);
					
					if (_this.index() < startTr.index() || _this.index() > currentTr.index()) {
						return;
					}
		
					if (_this.index() == startTr.index() && _this.index() == currentTr.index()) {
						if (currentTd.index() < startTd.index() || currentTr.index()< startTr.index()) { tdIdx = -1; } else { tdIdx = currentTd.index() };
						setTdState(startTr, startTd.index(), tdIdx, true );
						return;
					} else if (_this.index() == startTr.index() && _this.index() != currentTr.index()) {
						setTdState(startTr, startTd.index(), startTr.find('td').length - 1);
						return;
					}
	
					if (_this.index() >= startTr.index() && _this.index() < currentTr.index()) {
						setTdState(calendarEl.find('.calendar').eq(calendarIdx).find('tbody tr').eq(_this.index()), 0, _this.find('td').length - 1);
						return;
					}
	
					if (_this.index() > startTr.index() && _this.index() == currentTr.index()) {
						setTdState(calendarEl.find('.calendar').eq(calendarIdx).find('tbody tr').eq(_this.index()), 0, currentTd.index(), true);
	
						return;
					}
		
				})
			}
			
	
			function setTdState(trEl, start, end, _round) {
				var round = _round || false;
				// console.log('set', trEl.index(), start, end , round);
				trEl.find('td').filter(function () {
					var idx = $(this).index();
	
					if(end==-1){
						$(this).removeClass('revIngEnd');
						return;
					}
					if (idx >= start && idx < end) {
						$(this).removeClass('revIngEnd');
						$(this).addClass('sel revIng');
					} else {
						$(this).removeClass('sel revIng revIngEnd');
					}
					if (idx == end ) {
						$(this).addClass('sel revIng revIngEnd');
					}
					if(idx == 6 && !round){
						$(this).removeClass('revIngEnd');
					}
				})
				trEl.nextAll('tr').find('td').removeClass('sel revIng revIngEnd');
			}
	
		})
	
		$('.calWrap').css('width', '');

		function gotoDate($j, month, year) {
			$j.each(function (i, el) {
				var inst = $.datepicker._getInst(el);
				inst.drawMonth = inst.selectedMonth = month;
				inst.drawYear = inst.selectedYear = year;
				$.datepicker._notifyChange(inst);
				$.datepicker._adjustDate(el);
			});
		}

	}
  
}


/**
 * 팝업 싱글캘린더
 * 
 * @param calendarEl (Element)
 */
commonJs.initPopSingleCalendar = function(calendarEl){
	calendarEl.datepicker({
		tDay: new Date(2020,7,25),
		defaultDate: new Date(2020,7,25),
		numberOfMonths: 1,
		showMonthAfterYear: true,
		monthNames: ["01", "02", "03", "04", "05", "06",
			"07", "08", "09", "10", "11", "12"],
		dayNamesMin: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
		dateFormat: 'yy.mm.dd',

		beforeShow: function (input) {
		},
		onClose: function () {
		},
		onChangeMonthYear: function () {
		}
	});
	$('#ui-datepicker-div').wrap('<div class="datepicker-wrapper"/>');
}


/**
 * 프로모션코드 입력 영역 show/hide 
 * 
 * @param shNode (String)
 * @param openBtn (String)
 * @param closeBtn (String)
 */
commonJs.initShowHideForm = function(shNode, openBtn, closeBtn){
	$(document).on('click', openBtn , function(){
		$(this).siblings(shNode).show();
	})
	$(document).on('click', closeBtn , function(){
		$(this).closest(shNode).hide();
	})
}


/**
 * HURE2400M.html
 * 인쇄버튼
 * 
 * @param node (String)
 */
commonJs.initPrintBtn = function(node){
	$(document).on('click', node ,function(){
		var printContent = ($('.printCont:visible').children('.designScroll').length)?$('.printCont:visible').find('.scrollWrap'):$('.printCont:visible');
		
		printContent.printThis({
			removeInline: false
		})
	})

}


/**
 * 전체동의 버튼
 * 
 * @param btnNode (String)
 * @param containerNode (String)
 */
commonJs.initAllCheckForm = function(btnNode , containerNode){
	if(!$(btnNode).length){
		return;
	}
	$(document).off('click.allCheck').on('click.allCheck', btnNode+' input', function(){
		var btnEl = $(this).closest(btnNode);
		if(btnEl.hasClass('allChecked')){
			btnEl.removeClass('allChecked');
			$(this).closest(containerNode).find('input').prop('checked', false);
		}else{
			btnEl.addClass('allChecked').closest(containerNode).find('input').prop('checked', true);
		}
	})

	$(document).off('click.unCheck').on('click.unCheck', containerNode + ' .frm input', function(){
		if($(this).closest('.frmAll').length){
			return;
		}
		var allCheckEl = $(this).closest(containerNode).find(btnNode);
		if(allCheckEl.hasClass('allChecked')){
			allCheckEl.find('input').prop('checked', false);
		}
				
	})
}


/**
 * HUME4220T.html
 * 파일네임 툴팁 show/hide 
 * 
 * @param tooltipNode (String)
 */
commonJs.setFileTooltip = function(tooltipNode){
	$(document).off('click.fileTooltip').on('click.fileTooltip' , tooltipNode+' button', function(){
		var tooltip =$(this).closest(tooltipNode);
		if(tooltip.hasClass('on')){
			tooltip.removeClass('on');
		}else{
			tooltip.addClass('on');
		}
	})
}


/**
 * 파일 업로드 
 * 
 * @param uploadNode(String)
 */
commonJs.setFileUpload = function (uploadNode) {

	/** 파일 선택 */
	$(document).on('change', uploadNode + ' .uploadBtn', function () {
		var fileNameEl = $(this).closest(uploadNode).find('.fileName');
		var filename;
		if (window.FileReader) {
			filename = this.files[0].name;
		} else {
			filename = $(this).val().split('/').pop().split('\\').pop();
		}
		fileNameEl.val(filename);
		$(this).closest(uploadNode).find('.btnDel').show();

	})

	/** 파일 삭제 */
	$(document).on('click', uploadNode + ' .btnDel', function () {
		$(this).closest(uploadNode).find('.fileName').val('');
		$(this).hide();
		$(this).closest(uploadNode).find('#uploadBtn').get(0).value="";
	})
}


/**
 * 드롭다운 리스트 정의
 * 
 * @param dropdownList(String)
 */
commonJs.setDropdownList = function(dropdownList){
	$(document).on('click', dropdownList, function (e) {
		if(!$(e.target).closest('.item_list')){
			e.preventDefault();
		}
		if ($(this).hasClass('active')) {
			$(this).removeClass('active').attr('aria-expanded', false);
		} else {
			$(this).addClass('active').attr('aria-expanded', true);
		}
	})

	$('html').click(function (e) {
		if (!$(e.target).closest(dropdownList).length) {
			$(dropdownList).removeClass('active').attr('aria-expanded', false);
		}
	});
}


/*********************************************************************************************************
 *  window.onLoad 시 호출
 *********************************************************************************************************/

/**
 * 아코디언
 * @param AccordionEl (Element)
 */
commonJs.initAccordion = function(AccordionEl){
	var speed = 800;
	var GuidanceText = ['상세내용 보기' , '상세내용 닫기'];
	AccordionEl.each(function(){
		var accordionItm = $(this);
		var ofsTop = [];
		accordionItm.children('li').each(function (idx, itm) {
			var toggleCont = $(itm).find('.toggleCont');
			var btnToggle = $(itm).find('.btnToggle');

			toggleCont.hide();

			ofsTop.push((!$(itm).is(':visible') && $(itm).hasClass('noData'))?0:($(itm).find('.roomIntro').outerHeight() === undefined) ? $(itm).outerHeight() : $(itm).find('.roomIntro').outerHeight() + parseInt($(itm).css('paddingTop')) + parseInt($(itm).css('paddingBottom')));

			ofsTop[idx] = ofsTop[idx] + ((ofsTop[idx - 1] === undefined) ? 0 : ofsTop[idx - 1]);


			if ($(itm).hasClass('toggleOn')) {
				toggleCont.show();
			} else {
				toggleCont.hide();
			}

			btnToggle.off('click').on('click', function () {
				if (toggleCont.is(':animated')) {
					return;
				}
				$('.comparison').trigger('docHeightChange');

				if (toggleCont.is(':visible')) {

					//hide
					$(itm).removeClass('toggleOn');
					// accordionText.show();
					toggleCont.css({
						'overflow': 'hidden'
					}).stop().animate({
						height: 0
					}, speed, ANIMATION_EASING, function () {
						btnToggle.find('span.hidden').text(GuidanceText[0]);
						toggleCont.removeAttr('style');
					})

				} else {
					$(itm).siblings('li').find('.btnToggle').trigger('accordion_close');

					if ($(itm).prev('li').hasClass('noData')) {
						scrollOffset = accordionItm.offset().top + (ofsTop[idx - 1] === undefined ? 0 : ofsTop[idx - 1]) - headerFixH;
					} else if ($(itm).prev('li').length) {
						scrollOffset = accordionItm.offset().top + ofsTop[idx - 1] - headerFixH;
					} else {
						scrollOffset = $(itm).offset().top - headerFixH;
					}

					//show
					$(itm).addClass('toggleOn');
					// accordionText.hide();
					toggleCont.css({
						'display': 'block',
						'overflow': 'hidden'
					})

					if ($(itm).closest('.lCont').length) {
						$('.rCont').trigger('setPosition');
						$(window).scrollTop(scrollOffset);

					} else if ($(itm).closest('.layerCont').length) {
					} else if (!$(itm).closest('.floating').length && $(itm).siblings('li').length) {
						$(window).scrollTop(scrollOffset);
					}
					var h = toggleCont.outerHeight();
					toggleCont.css({
						'height': '0',
					}).stop().animate({
						height: h
					}, speed, ANIMATION_EASING, function () {
						btnToggle.find('span.hidden').text(GuidanceText[1]);
						toggleCont.css({
							'height': '',
							'overflow': ''
						})
						$('.comparison').trigger('docHeightChange');
					})
				}

			})

			btnToggle.on('click_checkDate', function () {
				$(itm).siblings('li').find('.btnToggle').trigger('accordion_close');

				if ($(itm).prev('li').hasClass('noData')) {
					scrollOffset = accordionItm.offset().top + (ofsTop[idx - 1] === undefined ? 0 : ofsTop[idx - 1]) - headerFixH;
				} else if ($(itm).prev('li').length) {
					scrollOffset = accordionItm.offset().top + ofsTop[idx - 1] - headerFixH;
				} else {
					scrollOffset = $(itm).offset().top - headerFixH;
				}

				//show
				$(itm).addClass('toggleOn');
				toggleCont.css({
					'display': 'block',
					'overflow': 'hidden'
				})

				if ($(itm).closest('.lCont').length) {
					$('.rCont').trigger('setPosition');
					$(window).scrollTop(scrollOffset);

				} else if ($(itm).closest('.layerCont').length) {
				} else if (!$(itm).closest('.floating').length && $(itm).siblings('li').length) {
					$(window).scrollTop($(itm).closest('ul').offset().top - $('.header').outerHeight());
				}
				var h = toggleCont.outerHeight();
				toggleCont.css({
					'height': '0',
				}).stop().animate({
					height: h
				}, speed, ANIMATION_EASING, function () {
					btnToggle.find('span.hidden').text(GuidanceText[1]);
					toggleCont.css({
						'height': '',
						'overflow': ''
					})
					$('.comparison').trigger('docHeightChange');
				})
			})

			btnToggle.on('accordion_close', function () {
				if (toggleCont.is(':visible')) {
					//hide
					$(itm).removeClass('toggleOn');
					toggleCont.css('height', 0);
					toggleCont.removeAttr('style');
					$('.comparison').trigger('docHeightChange');
				}
			})
		});
	})
}


/**
 * 레이어팝업 웹접근성관련 tab키 스크립트
 */
commonJs.initLayerPopup = function(layerPopEl){
	layerPopEl.each(function(idx, itm){
		$(itm).find('.btnClose').on('keydown', function(e) {
			// tab keydown
			if (e.shiftKey === false && e.keyCode === 9) {
				$(itm).find('.layerCont').focus();
				return false;
			}
		});
	})
}

/**
 * 팝업창 open
 * @param popupElement (Element)
 */
commonJs.popShow = function(popupElement){
	commonJs.initLayerPopup(popupElement);
	if(event!=undefined){
		popupElement.data('layerFocus' , $(event.toElement));
	}
	$('.dimmed').show();
	popupElement.css({
		'display' : 'block',
		'visibility' : 'hidden'
	})
	
	setTimeout(function(){
		popupElement.css('visibility' , '');
		var layerCont = popupElement.find('.layerCont');
		layerCont.attr('tabindex', 0).focus();
		
		layerCont.css({
			'top' : '50%',
			'left' : '50%',
			'margin-top': -(layerCont.outerHeight()/2),
			'margin-left' : -(layerCont.outerWidth()/2)
		})
	
		$('body').css({
			'overflow' : 'hidden'
		})
	},50)
}

/**
 * 팝업창 close
 * @param popupElement (Element)
 */
commonJs.popClose = function(popupElement){
	if(!popupElement.is(':visible')){
		return;
	}

	$('.dimmed').hide();
	popupElement.hide();
	popupElement.find('.layerCont').attr('tabindex', '');

	$('body').css({
		'overflow' : ''
	})

	var lf = popupElement.data('layerFocus');
	if(lf!=undefined){
		popupElement.data('layerFocus').focus();
	}
}


/**
 * 로딩이미지 show
 */
commonJs.showLoadingBar = function(){
	var st = $(window).scrollTop();
	var loadingImgUri=  "/static/home/images/ko/pc/common/img_loadingbar.gif";
	var html = '<div class="loadingBar">'
	+'<div class="img"><img src='+loadingImgUri+' alt=""></div>'
	+'<div class="dimmed" style="display:block;"></div></div>';

	commonJs.preventBodyScroll(function () {
		$('#container').css('margin-top', -st);
	});

	$('.wrapper').append(html);
}

/**
 * 로딩이미지 close
 */
commonJs.closeLoadingBar = function(){
	var mt = parseInt($('#container').css('margin-top'));

	commonJs.allowBodyScroll(function () {
		$('#container').css('margin-top', '');
		$(window).scrollTop(Math.abs(mt));
	});

	$('.loadingBar').remove();
}

/**
 * 부모화면 스크롤 prevent
 */
commonJs.preventBodyScroll = function(callback){
    $('body').css({
        'overflow-y': 'hidden',
		'position': 'fixed',
		'width' : '100%'
    })

    if(callback != undefined){
        callback();
    }
}

/**
 * 부모화면 스크롤 allow
 */
commonJs.allowBodyScroll = function(callback){
    $('body').css({
        'overflow-y': '',
		'position': '',
		'width' : ''
		
    })

    if(callback != undefined){
        callback();
    }
}

/**
 * 썸네일 마우스 오버 or 포커스시 viewMore show
 * HURE1200T.html#
 * @param thumbEl (Element)
 */
commonJs.thumbFocusEvent = function(thumbEl){
	var hoverConts = thumbEl.find('.hoverCont'); 
	hoverConts.each(function(idx, itm){
		var _itm = $(itm);
		_itm.mouseover(function(){
			hoverConts.removeClass('on').attr('tabindex','');
			_itm.addClass('on').attr('tabindex',0);
		}).mouseleave(function(){
			_itm.removeClass('on').attr('tabindex','');
		})

		_itm.find('a').focus(function(){
			hoverConts.attr('tabindex','');
			_itm.addClass('on').attr('tabindex',0);
			
		}).blur(function(){
			_itm.removeClass('on').attr('tabindex','');
		})
	})
}

/**
 * 탭
 * @param tabToggle (string) .tabToggle 클래스가 존재해야만 토글 스크립트 작동.
 */
commonJs.initTab = function(tabToggle){
	$(tabToggle).each(function(idx, itm){
		var _itm = $(itm);
		if(!_itm.hasClass('tabToggle')){
			return;
		}
		var contList = _itm.nextUntil($('.tabToggle') , '.tabCont');
		_itm.find('li>a').on('click', function(e){
			e.preventDefault();

			$(this).closest('li').addClass('on').siblings('li').removeClass('on');
			contList.hide();

			if($(this).attr('href')!='#'){
				$('.tabCont'+$(this).attr('href')).show();
			}

		})

	})
}

/**
 * 스와이프 영역 init 
 * @param swipeEl (El)
 */
commonJs.initSwipe = function(swipeEl){
	var speed = 400;
	swipeEl.each(function(idx, itm){
		var _itm = $(itm);
		var pageNow = _itm.find('.numPaging .num.now');
		var pageNum= _itm.find('.numPaging .num').not('.now');
		var slideLi = _itm.find('.swipeSlide');
		var slidesLength = _itm.find('.swipeSlide').length;
		var indicatorWrap = _itm.closest('.swipeWrapArea').find('.indicator');
		var indicator = _itm.closest('.swipeWrapArea').find('.indicator>button');
		var wrapContents = false;

		var wrapper = (_itm.closest('.swipeWrapArea').length)?_itm.closest('.swipeWrapArea'):_itm;

		if(!wrapper.is(':visible')){
			if(_itm.closest('.layerPop').length){
				_itm.closest('.layerPop').show();
				wrapContents = 'layerPop';
			}else if(_itm.closest('.tabCont').length){
				_itm.closest('.tabCont').show();
				wrapContents = 'tabCont';
			}
		}

		if(_itm.closest('.mainArea01').length){
			//메인페이지 페이드형식 오토 슬라이드
			_itm.find('.swipeCont').css('position', 'absolute');
			var btnPlay = _itm.closest('.mainInner').find('.btnAuto .btnPlay');
			var btnPause = _itm.closest('.mainInner').find('.btnAuto .btnPause');

			var mySlider = _itm.touchSlider({
				mode: 'fade',
				autoplay: {
					enable: true,
					pauseHover: false,
					addHoverTarget: '',
					interval: 5000},
				controls: false,
				// useMouse: false,
				paging: false,
				speed: speed,
				initComplete: function (e) {
					var _this = this;
					
					btnPause.on('click', function(){
						btnPlay.addClass('on');
						$(this).removeClass('on');
						_this.autoStop();

					})

					btnPlay.on('click', function(){
						btnPause.addClass('on');
						$(this).removeClass('on');
						_this.autoPlay();

					})

					setTimeout(function(){
						if(wrapContents === 'layerPop'){
							_itm.closest('.layerPop').hide();
						}
					})

				},
				counter: function (e) {
					var idx=  e.current-1;
					if (indicator.length) {
						indicator.find('em').remove();
						indicator.eq(idx).prepend('<em class="hidden">현재 이미지</em>').addClass('on').siblings().removeClass('on');
					}
				}
			})
			
			_itm.data('swiper', mySlider);

			var jess = new Jessture(_itm);

			jess.on('jsLeft jsRight', function (e) {
				e.stopPropagation();
				_itm[0].autoStop();
				btnPlay.addClass('on');
				btnPause.removeClass('on');

				return false;
			})

		}else if(_itm.closest('.mainArea04').length){

			_itm.find('.inSwipe').each(function(){
				var _inSwipe = $(this);
				var cn = 0;
				var inSlidesLength = _inSwipe.find('.inSwipeSlide').length;
				
				var jess = new Jessture(_inSwipe);

				jess.on('jsRight', function (e) {
					e.stopPropagation();
					
					if(cn>0){
						cn--;
					}else{
						//prev
						_itm.get(0).animate(1, true);
					}
					_inSwipe.find('.inSwipeCont').css('margin-left', -$('.inSwipeSlide').outerWidth() * cn);

					return false;
				})

				jess.on('jsLeft', function (e) {
					e.stopPropagation();
					
					if(cn<(inSlidesLength-1)){
						cn++;
					}else{
						//next
						cn = 0;
						_itm.find('.swipeSlide.on .inSwipeCont').css('margin-left' , '');
						if(_itm.find('.swipeSlide.on').index()>=slidesLength-1){
							_itm.get(0).go_page(0);
						}else{
							_itm.get(0).animate(-1, true);
						}
						
					}
					_inSwipe.find('.inSwipeCont').css('margin-left', -$('.inSwipeSlide').outerWidth() *cn );

					return false;
				})
				_inSwipe.data('inSwipe' , jess);
			})

			wrapper.find('.btnPrev').on('click', function(){
				$(_itm.find('.swipeSlide.on .inSwipe').data('inSwipe')).trigger('jsRight');
			});

			wrapper.find('.btnNext').on('click', function(){
				$(_itm.find('.swipeSlide.on .inSwipe').data('inSwipe')).trigger('jsLeft');
			});


			_itm.find('.swipeCont').css('position', 'absolute');

			var slideBtn = _itm.closest('.mainArea04').find('.slideBtn li');
			var mySlider = _itm.touchSlider({
				roll: true,
				// sidePage: true,
				range: 0.5,
				controls: false,
				paging: false,
				speed: speed, 
				useMouse: false,
				initComplete: function (e) {
					var _this = this;
					
					_itm.find('.inSwipeSlide').css({
						'width' : _itm.find('.swipeSlide').eq(0).outerWidth()
					})

					slideBtn.on('click', function(e){
						e.preventDefault();
						
						$(this).addClass('on').siblings('li').removeClass('on');
						var idx = $(this).index();
						_this.go_page(idx);

					})
					
					setTimeout(function(){
						if(wrapContents === 'layerPop'){
							_itm.closest('.layerPop').hide();
						}else if(wrapContents === 'tabCont'){
							_itm.closest('.tabCont').hide();
						}
					})

				},
				counter: function (e) {
					var idx=  e.current-1;
					slideLi.eq(idx).addClass('on').siblings('li').removeClass('on');
					slideBtn.eq(idx).addClass('on').siblings('li').removeClass('on');
				}
			})
			
			_itm.data('swiper', mySlider);
		}else if(_itm.hasClass('auto')){
			/**
			 * 자동롤링 swipe 
			 */
			_itm.find('.swipeCont').css('position', 'absolute');
			
			var mySlider = _itm.touchSlider({
				autoplay: {
					enable: true,
					pauseHover: true,
					addHoverTarget: '',
					interval: 3000},
				controls: false,
				paging: false,
				speed: speed,
				initComplete: function (e) {
					var _this = this;
					if (indicator.length) {
						indicator.remove();
						for (var i = 0; i < slidesLength; i++) {
							if (i == 0) {
								indicatorWrap.append("<button type='button' class='num on'>" + "<em class='hidden'>현재 이미지</em>" + lpad(i + 1, 2, 0) + "</button>");
							} else {
								indicatorWrap.append("<button type='button' class='num'>" + lpad(i + 1, 2, 0) + "</button>");
							}
						}
						indicator = wrapper.find('.indicator>button');
					}

					indicator.on('click', function (e) {
						e.preventDefault();
						var idx = $(this).index();
						_this.go_page(idx);
					});

					setTimeout(function(){
						if(wrapContents === 'layerPop'){
							_itm.closest('.layerPop').hide();
						}
					})

				},
				counter: function (e) {
					var idx=  e.current-1;
					
					if (indicator.length) {
						indicator.find('em').remove();
						indicator.eq(idx).prepend('<em class="hidden">현재 이미지</em>').addClass('on').siblings().removeClass('on');
					}
					
				}
			})
			
			_itm.data('swiper', mySlider);
		}else if (_itm.hasClass('gallery')) {
			
			_itm.find('.swipeCont').css('position', 'absolute');

			var mySlider = _itm.touchSlider({
				btn_prev: wrapper.find('.btnPrev'),
				btn_next: wrapper.find('.btnNext'),
				controls: false,
				paging: false,
				speed: speed,
				initComplete: function (e) {
					var _this = this;
					pageNum.text(lpad(_itm.find('.swipeSlide').length, 2, 0));
					pageNow.text(lpad(this.activeIndex + 1, 2, 0));

					setTimeout(function(){
						if(wrapContents === 'layerPop'){
							_itm.closest('.layerPop').hide();
						}else if(wrapContents === 'tabCont'){
							_itm.closest('.tabCont').hide();
						}
					})
				},
				counter: function (e) {
					var idx = e.current - 1;
					pageNum.text(lpad(slidesLength, 2, 0));
					pageNow.text(lpad(idx + 1, 2, 0));
				}
			})

			_itm.data('swiper', mySlider);
		}else {
			_itm.find('.swipeCont').css('position', 'absolute');
			
			var mySlider = _itm.touchSlider({
				btn_prev: wrapper.find('.btnPrev'),
				btn_next: wrapper.find('.btnNext'),
				controls: false,
				paging: false,
				speed: speed,
				initComplete: function (e) {
					
					var _this = this;
					
					if (indicator.length) {
						indicator.remove();
						for (var i = 0; i < slidesLength; i++) {
							if (i == 0) {
								indicatorWrap.append("<button type='button' class='num on'>" + "<em class='hidden'>현재 이미지</em>" + lpad(i + 1, 2, 0) + "</button>");
							} else {
								indicatorWrap.append("<button type='button' class='num'>" + lpad(i + 1, 2, 0) + "</button>");
							}
						}
						indicator = wrapper.find('.indicator>button');
					}

					indicator.on('click', function (e) {
						e.preventDefault();
						var idx = $(this).index();
						_this.go_page(idx);
					});

					setTimeout(function(){
						if(wrapContents === 'layerPop'){
							_itm.closest('.layerPop').hide();
						}else if(wrapContents === 'tabCont'){
							_itm.closest('.tabCont').hide();
						}
					})

				},
				counter: function (e) {
					var idx=  e.current-1;
					pageNum.text(lpad(slidesLength, 2, 0));
					pageNow.text(lpad(idx + 1, 2, 0));
					
					if (indicator.length) {
						indicator.find('em').remove();
						indicator.eq(idx).prepend('<em class="hidden">현재 이미지</em>').addClass('on').siblings().removeClass('on');
					}
				}
			})

			_itm.data('swiper', _itm.get(0));
		}
		
	})
}

/**
 * 로그인 버튼 클릭시 미입력 서식에 focus및 서식 입력 감지
 */
commonJs.focusAlert = function(){
	var marginTop = 300;
	$('.error').each(function(){
		var _error = $(this);
		var input = $(this).find('.intArea');
		var isRadioType = input[0].type=='radio';
		
		var errorInp = input.filter(function(){
			return $(this).find('input').val() == ''
		}).first();

		var alertMsg = errorInp.find('.alertMessage , .alertMessage2');
		
		if(errorInp.length){
			$(window).scrollTop(errorInp.offset().top-marginTop);
			alertMsg.show();
		}

		if(!isRadioType){
			errorInp.addClass('errorFocus');
		}else{
			_error.attr('tabindex', 0);
		}
		
		errorInp.find('input').off('keyup.focusAlert').on('keyup.focusAlert', function(){
			if($(this).val()!=''){
				_error.removeClass('error');
				errorInp.removeClass('errorFocus');
				$(this).closest('.intInner').find('.alertMessage').hide();
			}
		})
	})
}

// /**
//  * 디자인 스크롤 적용 
//  * 
//  * @param scrollEl (Element)
//  */
// commonJs.initDesignScroll = function(scrollEl){
	
// 	scrollEl.each(function(idx, itm){
// 		var scrollWrap = $(this);
// 		var menuPanArea = scrollWrap.closest('.menuPanArea');
// 		var type = (scrollWrap.parents('.toggleCont , .layerPop').length == 2)?'both':(scrollWrap.parents('.toggleCont').eq(0).length)? 'accordion': 'layer';
		
// 		if(!scrollWrap.parent('.designScroll').length){
// 			scrollWrap.wrap('<div class="designScroll"></div>');
// 		}
// 		scrollWrap.css({
// 			'margin-right' : '-25px',
// 			'overflow-y': 'scroll',
// 			'width': '100%',
// 			'padding-right':'40px',
// 			'box-sizing': 'border-box'
// 		});
		
// 		if(!scrollWrap.find('.customScrollBox').length){
// 			scrollWrap.wrapInner('<div class="customScrollBox"></div>');
// 			scrollWrap.append(
// 				'<div class="scrollbar-wrap">' +
// 				'<div class="scrollbar"></div>' +
// 				'</div>'
// 			)
// 		}
// 		var contentH = 0 , screenH = 0;
// 		if(!scrollWrap.is(':visible')){
			
// 			if(type === 'both'){
// 				var contParent = scrollWrap.parents('.toggleCont , .layerPop');
// 			}else if(type === 'layer'){
// 				var contParent = scrollWrap.closest('.layerPop');
// 			}else{
// 				var contParent = scrollWrap.closest('.toggleCont');
// 			}
			
// 			contParent.css({
// 				'display': 'block',
// 				'visibility': 'hidden',
// 				'height': '0'
// 			})
// 			contentH = scrollWrap.get(0).scrollHeight;
// 			screenH = scrollWrap.outerHeight();
			
// 			//menuPanArea 내의 탭메뉴+마진값 scrollbar-wrap 에 top적용
// 			if (menuPanArea.length) {
// 				scrollWrap.children('.scrollbar-wrap').css({
// 					'top': 130 + menuPanArea.children('.tabToggle').outerHeight()
// 				})
// 			}
// 			contParent.each(function(){
// 				if($(this).closest('.toggleOn').length){
// 					$(this).css({
// 						'visibility': '',
// 						'height': ''
// 					})
// 				}else{
// 					$(this).css({
// 						'display': '',
// 						'visibility': '',
// 						'height': ''
// 					})
// 				}
// 			})
			
// 		}else{
// 			if (menuPanArea.length) {
// 				scrollWrap.children('.scrollbar-wrap').css({
// 					'top': 130 + menuPanArea.children('.tabToggle').outerHeight()
// 				})
// 			}
// 			contentH = scrollWrap.get(0).scrollHeight;
// 			screenH = scrollWrap.outerHeight();
// 		}
// 		var cScrollH = contentH - screenH;
// 		if(cScrollH<10){
// 			scrollWrap.find('div.scrollbar-wrap').remove();
// 			scrollWrap.css({
// 				'margin-right': '',
// 				'overflow-y': '',
// 				'width': '',
// 				'padding-right': '',
// 				'box-sizing': ''
// 			});
// 			return;
// 		}
// 		$('.designScroll').eq(idx).css({
// 			'height': screenH,
// 			'width': '100%',
// 			'overflow': 'hidden'
// 		})
		
// 		scrollWrap.css('width' , '').attr('tabindex' , 0);
// 		scrollWrap.find('div.scrollbar-wrap').css('height', screenH);
		
// 		var bar = scrollWrap.find('div.scrollbar');
// 		var bgH = scrollWrap.find('div.scrollbar-wrap').height();
// 		bar.height(bgH / 3);
// 		var barH = bar.height();
// 		var n = bgH - barH;
// 		scrollWrap.off("mousewheel DOMMouseScroll").on("mousewheel DOMMouseScroll", function(e, delta) {
// 			e.stopPropagation();
// 			var E = e.originalEvent;
// 			delta = 0;
// 			if (E.detail) {
// 				delta = E.detail * -40;
// 			} else {
// 				delta = E.wheelDelta;
// 			};
// 			var scrollTop = $(this).scrollTop() + (Math.round(delta * -1)) / 2;
			
// 			$(this).scrollTop(scrollTop);
// 			if (scrollTop < 0) {
// 				scrollTop = 0;
// 			} else if (scrollTop > cScrollH) {
// 				scrollTop = cScrollH;
// 			}
// 			var m = (scrollTop / cScrollH) * n;
// 			bar.css({
// 				'top': m + 'px'
// 			});
// 			e.preventDefault();
// 		});
// 		var scrollTop =0;
// 		scrollWrap.off('scroll').on('scroll', function() {
			
// 			if(scrollWrap.prop('scrollHeight')!=contentH){
// 				cScrollH = scrollWrap.prop('scrollHeight') - screenH;
// 			}
// 			scrollTop = ($(this).scrollTop() / cScrollH) * n;
// 			bar.css({
// 				'top': scrollTop + 'px'
// 			})
// 		});
// 		var y1 = 0;
// 		bar.off('mousedown').on('mousedown', function (e) {
// 			y1 = e.pageY - parseInt(bar.css('top'));
// 			$(document).on('mousemove', moveHandler);
// 			$(document).on('mouseleave , mouseup', mouseLeave);
// 		});
// 		function mouseLeave() {
// 			$(document).off('mousemove', moveHandler);
// 			$(document).off('mouseleave , mouseup , mouseout', mouseLeave);
// 		}
// 		function moveHandler(e) {
// 			var y2 = e.pageY - y1;
// 			if (y2 < 0) {
// 				y2 = 0;
// 			} else if (y2 >= n) {
// 				y2 = n;
// 			}
// 			bar.css('top', y2);
// 			var cc = (y2 / n) * (cScrollH);
// 			scrollWrap.scrollTop(cc);
// 		}
// 	})
// }

/**
 * 스크롤 트랜지션 애니메이션 버튼
 * 
 * @param topEl(Element)
 */
commonJs.setScrollTransitionBtn = function(topEl){
	if(!topEl.length){
		return;
	}
	topEl.find('button').off('click').on('click', function(){
		var h = topEl.next().offset().top - $('.header').outerHeight();
		$('html, body').animate({
			scrollTop: h
		}, 800 , ANIMATION_EASING , function(){

		})	
	})
}


/**
 * 가로사이즈 트랜지션 버튼
 * @param inner (String)
 * @param openBtn (String)
 * @param closeBtn (String)
 * @param focus (String)
 */
commonJs.setWidthTranstionBtn = function(inner, openBtn, closeBtn, focus){
	var speed = 300;

	//open
	$(openBtn).on('click', function () {
		var innerW = $(this).siblings(inner).width();
		var LastEl = $(this).siblings(inner).find('input,button').last();

		$(this).css('visibility', 'hidden');
		$(this).siblings(inner).css({
			'overflow': 'hidden',
			'display': 'block',
			'width': 0
		}).animate({
			'width': innerW
		}, speed, function () {
			$(this).css({
				'overflow': '',
			})
			$(this).find(focus).focus();
		})

		LastEl.off('.widthTransition').on('keydown.widthTransition', function (e) {
			if (e.keyCode === 9 && !e.shiftKey) {
				$(this).trigger('click');
			}
		})

		$(this).siblings(inner).find('input,button').first().off('.widthTransition').on('keydown.widthTransition', function (e) {
			if (e.keyCode == 9 && e.shiftKey) {
				LastEl.trigger('click');
				return;
			}
		})
	})

	//close
	$(closeBtn).on('click', function () {
		var openBtn = $(this).closest(inner).siblings(openBtn);
		$(this).closest(inner).animate({
			'width': openBtn.outerWidth()
		}, speed, function () {
			$(this).css({
				'width': '',
				'display': 'none',
			})
			openBtn.css('visibility', 'visible');
		})
	})


	$('html').click(function (e) {
		if ($(e.target).hasClass(openBtn.substring(1, openBtn.length))) {
			return;
		}

		if (!$(e.target).closest(inner).length) {
			if ($(inner).is(':visible')) {
				$(closeBtn).trigger('click');
			}
		}
	});

}

/**
 * 스크롤시 해당영역 플로팅 
 * @param floatingEl(Element)
 */
commonJs.initFloatingContainer = function(floatingEl){
	if(!floatingEl.length){
		return;
	}
	
	var originalMarinTop = floatingEl.css('margin-top', '').offset().top;
	var offset = 0;
	var headerH = $('.header').outerHeight()+offset||offset;
	var isTriggered = false; 
	
	$(window).off('scroll.floating').on('scroll.floating', function(){
		var st = $(window).scrollTop();
		var elH = floatingEl.height();
		var lContBottom = $('.lCont').offset().top + $('.lCont').height();
		
		if(isTriggered){
			var st = $(window).scrollTop();
			floatingEl.css({
				'margin-top': st + headerH - originalMarinTop
			})
			return;
		}
		//start
		if (st < originalMarinTop-headerH || lContBottom < floatingEl.offset().top + elH) {
			floatingEl.css({
				'margin-top': ''
			})
			return;
		}
		//end
		if(elH + st + headerH>= lContBottom){
			if(isTriggered){
				return;
			}
			console.log('엔드');
			
			floatingEl.css({
				'margin-top': lContBottom-originalMarinTop - elH
			})
			return;
		}

		//ing
		if(st>=originalMarinTop-headerH){
			floatingEl.css({
				'margin-top': st - (originalMarinTop - headerH)
			})
		}

	})

	$(floatingEl).on('setPosition', function(){

		isTriggered = true;
		setTimeout(function(){
			isTriggered = false;
		}, 500);
	})
}


/**
 * 패럴렉스 정의
 * @param parallaxContainer (Element)
 */
commonJs.setParallax = function (parallaxContainer) {
	if(!parallaxContainer.length){
		return;
	}
	var ctl = new ScrollMagic.Controller();
	var speed = 400;
	var direction;
	if (parallaxContainer.hasClass('parallaxUp')) {
		direction = 'up';
	}

	parallaxContainer.find('>li').each(function (idx, itm) {
		if($(itm).hasClass('noData') || $(itm).hasClass('on')){
			return;
		}
		
		$(itm).addClass('on');
		var tl = new TimelineMax();
		if (direction === 'up') {
			tl.delay(0.2*idx).fromTo(itm, 1.2, { opacity: 0, y: "+50px" }, { opacity: 1, y: "0px" });
		}
		var scene = new ScrollMagic.Scene({
			triggerElement: itm,
			offset : 0,
			triggerHook: '1',
			reverse : false
		})
			.setTween(tl)
			.addTo(ctl);
	})
}


/**
 * 키워드리스트 더보기 버튼 정의 
 * 
 * @param moreBtn (Element)
 */
commonJs.setKeywordBtnMore = function(moreBtn){
	moreBtn.each(function(){
		var keywordListH = $(this).closest('.keywordList');
		keywordListH.data('orgH', parseInt(keywordListH.css('height')));
		$(this).on('click', function(){
			var frmList = keywordListH.find('.frmList');
			if($(this).hasClass('open')){
				//close
				$(this).removeClass('open');
				keywordListH.stop().animate({
					height: keywordListH.data('orgH')
				}, 400, ANIMATION_EASING, function(){
					keywordListH.removeAttr('style');
				})
			}else{
				//open
				$(this).addClass('open');
				keywordListH.stop().animate({
					height: frmList.outerHeight() + 32
				}, 400, ANIMATION_EASING)
			}
		})
	})
}


/**
 * 스크롤시 on클래스 add
 * 
 * @param header(Element)
 */
commonJs.setHeadArea = function(headerEl){
	var stCheck = function(){
		if($(window).scrollTop()<5){
			headerEl.removeClass('on');
		}else{
			headerEl.addClass('on');
		}
	}
	stCheck();

	$(window).on('scroll', stCheck);
}


/**
 * 메인 예약영역
 * 
 * @param revArea(String)
 */
commonJs.setRevArea = function(revArea){

	//open
	var easeFunc = function(e){
				
		if($(this).siblings('.mainRoom, .mainCalendar').is(':animated')){
			return;
		}
		
		$(this).closest(revArea).find('.mainRoom, .mainCalendar').hide();

		var con = ($(this).closest('.chkInout').length) ? $(this).closest(revArea).find('.mainCalendar') : $(this).closest(revArea).find('.mainRoom');
		var h = con.outerHeight();

		$(this).siblings('.mainRoom, .mainCalendar').show();
		$(this).closest(revArea).css('margin-top', 200);

		con.css({
			'overflow': 'hidden',
			'height': 0
		}).stop().animate({
			height: h,

		}, 800, ANIMATION_EASING, function () {
			con.css({
				'overflow': '',
				'height': ''
			})
		})
	}

	$(document).on('click', revArea + '>.chkInout>a', easeFunc);
	$(document).on('click', revArea + '>.roomWrap>a', easeFunc);

	//close
	$(document).on('click', revArea + ' .btnClose, .btnSC', function(){

		if($(this).closest(revArea).find('.mainCalendar , .mainRoom').is(':animated')){
			return;
		}
		if($(this).closest('.mainRoom, .mainCalendar').is(':animated')){
			return;
		}
		
		$(this).closest(revArea).css('margin-top', '');
		$(this).closest(revArea).find('.mainCalendar , .mainRoom').css({
			'overflow' : 'hidden'
		}).stop().animate({
			'height' : 0,
			'padding-top' : 0,
			'padding-bottom' : 0
		}, 400, ANIMATION_EASING, function(){
			$(this).closest(revArea).find('.mainCalendar , .mainRoom').css({
				'height': '',
				'padding-top': '',
				'padding-bottom': ''
			}).hide();
		})

	})

	$('html').click(function (e) {
		if($(e.target).hasClass('btnMonth')){
			return;
		}
		if (!$(e.target).closest('.mainCalendar , .mainRoom').length && !$(e.target).closest('.chkInout , .roomWrap').length) {
			$(revArea).find('.btnClose').trigger('click');
		}
	});
}

/**
 * 갤러리 레이어팝업 적용
 * 갤러리 선택 시 마크업속성 pop에 정의되어있는 팝업 open 및 해당 갤러리 인덱스로 이동.
 * 
 * @param layerSync(Element)
 */
commonJs.initLayerSync = function(layerSync){
	layerSync.each(function(){
		
		var popupId = $(this).attr('pop');
		var swiper = $('#'+popupId+' .swipeWrap').data('swiper');
		$(this).find('.thum button').on('click', function(){
			var _this = $(this);
			swiper.go_page(_this.closest('li').index());
			
			setTimeout(function(){
				commonJs.popShow($('#'+popupId));
			},160)
		})
	})
}


/**
 * 스크롤시 고정영역 적용
 * 
 * @param fixedArea(Element)
 */
commonJs.setFixedBarArea = function(fixedArea){
	fixedArea.each(function(){
		var itm = $(this);
		var itmNext = itm.next('div');
		var orgOffset = itm.offset().top;
		var headerH = $('.header').outerHeight();
		var itmH = itm.outerHeight();
		var itmBottom = parseInt(itm.css('marginBottom'));
		
		$(window).on('scroll', function(){
			var st = $(this).scrollTop();
			
			if(st >= (orgOffset - headerH)){
				itm.css({
					'position' : 'fixed',
					'z-index' : 999,
					'top' : headerH
				})
				itmNext.css('marginTop' , itmBottom+itmH);
				itm.css('marginBottom',0);
			}else{
				itm.css({
					'position' : '',
					'z-index' : '',
					'top' : ''
				})
				itmNext.css('marginTop', '');
				itm.css('marginBottom','');
			}
		});
		

	})
}


/**
 * 윈도우 스크롤 이동 스크립트
 * 
 * @param scrollToEl (Element)
 */
commonJs.scrollingTo = function (scrollToEl) {
	if (scrollToEl.length) {

		$('html, body').stop().animate({
			'scrollTop': scrollToEl.offset().top
		}, 300, ANIMATION_EASING);

	}
}


/**
 * 예약자 정보입력 페이지의 객실 아코디언 선택시 해당 객실의 요금아코디언 show
 * 
 * @param roomRsvAcdEl(Element)
 */
commonJs.attachRoomRsvClickEvent = function(roomRsvAcdEl){
	roomRsvAcdEl.children('li').find('.btnToggle').on('click', function(){
		var idx = $(this).closest('li').index();
		var rContFloatEl = $(this).closest('.lCont').next('.rCont').find('.toggleList');
		var rLi = rContFloatEl.children('li:eq('+idx+')');
		var isrLiToggledOn = rLi.hasClass('toggleOn');
		
		if(!$(this).closest('.roomRsv').find('li').hasClass('toggleOn')){
			rContFloatEl.children('li.toggleOn').find('button.btnToggle').trigger('click');
		}
		if(isrLiToggledOn && !$(this).closest('li').hasClass('toggleOn')){
			rLi.find('button.btnToggle').trigger('click');
		}
		if(!isrLiToggledOn && $(this).closest('li').hasClass('toggleOn')){
			rLi.find('button.btnToggle').trigger('click');
		}

	})
}

/**
 * 좌측문자열채우기
 * @params
 *  - str : 원 문자열
 *  - padLen : 최대 채우고자 하는 길이
 *  - padStr : 채우고자하는 문자(char)
 */
function lpad(str, padLen, padStr) {
    if (padStr.length > padLen) {
        return str;
    }
    str += ""; // 문자로
    padStr += ""; // 문자로
    while (str.length < padLen)
        str = padStr + str;
    str = str.length >= padLen ? str.substring(0, padLen) : str;
    return str;
}

var dUtils = {
	sep: '.', //구분자
	format: 'yy.mm.dd', //포맷

	/**
	 * 현재 조회년월 가져오기 (YYYYMM)
	 * @returns {number}
	 */
	getToYearMonth : function(){
		var varDate = new Date();

		var varYear = varDate.getFullYear();
		var varMonth = varDate.getMonth() + 1;

		if(varMonth < 10){
			varMonth = '0' + varMonth;
		}

		return varYear +''+ varMonth;
	},

	/**
	* yyyy-mm-dd 형식 변환
	* @param date (Date)
	* @return {string}
	*/
	getToDate: function(date){
		var varDate = date ? date : new Date();

		var varYear = varDate.getFullYear();
		var varMonth = (varDate.getMonth() + 1) < 10 ? '0'+(varDate.getMonth()+1) : (varDate.getMonth()+1);
		var varDay = varDate.getDate() < 10 ? '0'+varDate.getDate() : varDate.getDate();
		var varFullDate = varYear + this.sep + varMonth + this.sep + varDay;

		return varFullDate;
	},

	/**
	 * 날짜사이 간격 (1, 2, 3일)
	 * @param startDate
	 * @param endDate
	 * @returns {number}
	 */
	dateDiff : function(startDate, endDate){
		var d1 = dUtils.parseDate(startDate);
		var d2 = dUtils.parseDate(endDate);
		var count = d2 - d1;
		return Math.floor(count/(24*3600*1000));
	},

	/**
	 * 날 더하기
	 * @param strDate (string)
	 * @param days (number)
	 * @returns {string}
	 */
	addDays: function(strDate, days) {
		var tempDate = new Date(strDate);		
		return tempDate.setDate(tempDate.getDate() + days);
		//return this.getToDate(tempDate);
	},

	/**
	 * Date 변환
	 * @param format
	 * @param date
	 * @returns {Date}
	 */
	parseDate : function(date, format){
		var newDate = new Date();
		if(/*'yy-mm-dd' === format && */date !== '') {
			var parts = date.split(this.sep);
			newDate = new Date(parts[0], parts[1]-1, parts[2]);
		}
		return newDate;
	},

	/**
    * 요일 구하기
    * @param date
    * @returns (string)
    */
	getDateToDay: function (dateStr) {
		var date = new Date(dateStr.replace(/\./gi,"-"));
		var week = ['일', '월', '화', '수', '목', '금', '토'];
		
		var dayOfWeek = week[date.getDay()];
		return dayOfWeek;
	}

};

function Jessture( target )
    {
        var startX = 0;
        var startY = 0;
        var _this = $(this);
        var UP = this.UP = 'jsUp';
        var DOWN = this.DOWN = 'jsDown';
        var RIGHT = this.RIGHT = 'jsRight';
		var LEFT = this.LEFT = 'jsLeft';
		var MOUSEDOWN = this.MOUSEDOWN = 'jsMouseDown'
		
        target.on('touchstart , mousedown' , function(e)
        {
			if(e.type == 'mousedown'){
                // input 필드 체크
                if( $(e.target).filter('input').length == 0){
                    e.preventDefault();
                }
                startX = e.pageX;
                startY = e.pageY;
            }else{
                startX = e.originalEvent.touches[0].pageX;
                startY = e.originalEvent.touches[0].pageY;
            }
        });

        target.on( 'touchmove , mousemove' , function(e)
        {			
            var endX = 0;
            var endY = 0;
            e.preventDefault();
            if(e.type != 'mousemove'){}
        });
        target.on('touchend , mouseup' , function(e)
        {
            var endX = 0;
            var endY = 0;
            if(e.type == 'mouseup'){
                endX = Number(e.pageX);
                endY = Number(e.pageY);
                e.preventDefault();
            }else{
                endX = Number(e.originalEvent.changedTouches[0].pageX);
                endY = Number(e.originalEvent.changedTouches[0].pageY);
            }
            var disX = Math.abs((startX*startX)-(endX*endX));
            var disY = Math.abs((startY*startY)-(endY*endY));
			
            if( disX > disY)
            {
				if( Math.abs(startX-endX) > 70)
                {
					if(startX < endX)
                    {
						_this.trigger( RIGHT );
                    }else{
                        _this.trigger( LEFT );
                    }
                }
            }else{
                if( disY > 70)
                {
                    if(startY < endY)
                    {
                        _this.trigger( DOWN );
                    }else{
                        _this.trigger( UP );
                    }
                }
            }
            startX = 0;
            startY = 0;
		});
		
		target.on('mousedown', function(e){
			e.preventDefault();
		})

        this.on = function( evt , func)
        {
            _this.on(evt , func );
        };
	};
	










	$(document).ready(function(){   

    // 플로팅 버튼 floating btn 
    $(window).scroll(function(){  
        var $floating = $('#floating').hasClass("active");
        if ($(this).scrollTop() > 516 ) {
            $('#floating').show();
        }else if($('#floating').hasClass("active")) { //220615 추가
            $('#floating').show();
        }else {
            $('#floating').fadeOut();
        }
    });  

    //220615 수정
    $("#floating .floating__btn.more").on("click",function(){   
        var $active = $('.floating__more').hasClass("active");             
        if($active == false){ 
            $('#floating').addClass("active");
            $('#floating .floating__more').addClass("active"); 
            $('.floating__dimed').addClass("active"); 
			$('.header').addClass("floatActive");
            $('.floating__btn.more').addClass("active");
        } else { 
            $('#floating').removeClass("active");
            $('#floating .floating__more').removeClass("active");
            $('.floating__dimed').removeClass("active");
			$('.header').removeClass("floatActive");
            $('.floating__btn.more').removeClass('active');
        }

        //220615 추가
        $('.floating__dimed').on("click", function(){
            $('#floating').removeClass("active");
            $('.floating__dimed').removeClass("active");
			$('.header').removeClass("floatActive");
            $('#floating .floating__more').removeClass("active");
            $('.floating__btn.more').removeClass('active');
        });

    });

    $('#floating .top').on("click", function() {
        $('html, body').animate({scrollTop : 0 }, 500);
        return false;
    });
});
