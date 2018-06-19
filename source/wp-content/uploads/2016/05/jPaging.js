; (function($) {
	$.extend($, {
		jPaging: function(elems,elem_li,perNum,elem_box) {
			var elems = $(elems);
			var pageIdx = Math.ceil(elems.length / perNum);
			elems.eq(perNum).prevAll(elem_li).show();
			if (pageIdx > 1) {
				var pages = '<div class="jPaging-page"><a class="first">首页</a>';
				for (var i = 0; i < pageIdx; i++) {
					var j = i + 1;
					pages += '<a>' + j + '</a>'
				}
				pages += '<a class="last">末页</a></div>';
				$(elem_box).append(pages);
				$('.jPaging-page a:eq(1)').addClass('jPaging-current');
				var pNum = $('.jPaging-page a').length;
				$('.jPaging-page a').bind('click',
				function() {
					var i = $('.jPaging-page a').index(this);
					elems.hide();
					$('.jPaging-page a:first').show();
					$('.jPaging-page a.jPaging-current').removeClass('jPaging-current');
					if (i == 0) {
						elems.eq(perNum).prevAll(elem_li).show();
						$('.jPaging-page a:eq(' + i + 1 + ')').addClass('jPaging-current')
					} else if (i == pNum - 1) {
						elems.eq(perNum * (pNum - 3) - 1).nextAll(elem_li).show();
						$('.jPaging-page a:eq(' + (pNum - 2) + ')').addClass('jPaging-current')
					} else {
						if (perNum * i < elems.length) elems.eq(perNum * i).prevAll(elem_li).show();
						else elems.show();
						elems.eq(perNum * (i - 1)).prevAll(elem_li).hide();
						$('.jPaging-page a:eq(' + i + ')').addClass('jPaging-current')
					}
					return false
				});
				$('.jPaging-page a:eq(0)').click()
			}
		}
	})
})(jQuery);