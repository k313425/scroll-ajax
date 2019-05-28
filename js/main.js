// page-scroller
jQuery(function(){
  jQuery(document).on('click','a[href*=\\#]:not([href=\\#])',function(){
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'')
      && location.hostname === this.hostname) {
      var jQuerytarget = jQuery(this.hash);
      jQuerytarget = jQuerytarget.length && jQuerytarget || jQuery('[name=' + this.hash.slice(1) +']');
      if (jQuerytarget.length) {
        var targetOffset = jQuerytarget.offset().top;
        jQuery('html,body').animate({scrollTop: targetOffset}, 1000);
        return false;
      }
    }
  });
});

/**
 * Ajax相关操作
 * Created by XX on XX/XX/XX.
 */
// { url: pageUrl, cb: cb, sucess: function (data, cb) {}
jQuery.fn.ajaxInfo = function (obj) {
	// 已经全部加载完毕
	if (isHaveNot)
		return false;
	jQuery.ajax({
		type: "post",
		data: {},
		dataType: "json",
		url: obj.url,
		success: function (data) {
			obj.sucess(data, obj.cb);
		},
		error: function () {
			obj.cb.error();
			isLoading = false;
		}
	});
};

jQuery.fn.shopCallBack = function (data, cb) {
	var that = jQuery(this);
	if (parseInt(data.code) === 200) {
		if (data.data.length < 1) {
			isHaveNot = true;
			cb && cb.end(); // 没有数据了
			isLoading = false;
		}else {
			jQuery.each(data.data, function (i, item) {
				var html = '<div class="item"><a href="' + item.linkUrl +
					'">\n' +
					'<div class="row info">\n' +
					'<div class="pho"><img src="' + item.logoUrl +
					'" alt=""></div>\n' +
					'<div class="txt">\n' +
					'<h2 class="ttl">' +  item.name +
					'\n';
				if (item.renz === true) {
					html += '<span class="renz">认证</span>\n';
				}
				html += '</h2>\n' +
					'<p>设计案例：<i>' + item.anli +
					'</i>\n' +
					'<span>已有 <i>' + item.zixun +
					'</i> 人咨询</span>\n' +
					'</p>\n' +
					'</div>\n' +
					'</div>\n' +
					'<div class="row">\n' +
					'<div class="col-sm-4"><img src="' + item.imgUrl[0] +
					'" alt=""></div>\n' +
					'<div class="col-sm-4"><img src="' + item.imgUrl[1] +
					'" alt=""></div>\n' +
					'<div class="col-sm-4"><img src="' + item.imgUrl[2] +
					'" alt=""></div>\n' +
					'</div>\n' +
					'</a></div>';
				that.append(html);
			});
			page++;
			cb && cb.success();
			isLoading = false;
		}
	}
	if (parseInt(data.code) === 400) {
		cb && cb.error();
		isLoading = false;
	}
};

jQuery.fn.shopDetailCallBack = function (data, cb) {
	var that = jQuery(this).find('.row');
	if (parseInt(data.code) === 200) {
		if (data.data.length < 1) {
			isHaveNot = true;
			cb && cb.end(); // 没有数据了
			isLoading = false;
		}else {
			jQuery.each(data.data, function (i, item) {
				var html = '<div class="col-sm-6">\n' +
					'<a href="' + item.linkUrl +
					'" class="item">\n' +
					'<div class="pho"><img src="' + item.photoUrl +
					'" alt="">\n' +
					'<div class="num">' + item.num +
					'张</div>\n' +
					'</div>\n' +
					'<p>' + item.photoName +
					'</p>\n' +
					'</a>\n' +
					'</div>';
				that.append(html);
			});
			page++;
			cb && cb.success();
			isLoading = false;
		}
	}
	if (parseInt(data.code) === 400) {
		cb && cb.error();
		isLoading = false;
	}
};

jQuery.fn.albumCallBack = function (data, cb) {
	var that = jQuery(this);
	if (parseInt(data.code) === 200) {
		if (data.data.length < 1) {
			isHaveNot = true;
			cb && cb.end(); // 没有数据了
			isLoading = false;
		}else {
			jQuery.each(data.data, function (i, item) {
				var html = '<div class="item">\n' +
					'<a href="' + item.albumUrl +
					'">\n' +
					'<div class="row">\n' +
					'<div class="col-sm-12"><img src="' + item.photoUrl +
					'" alt="">\n' +
					'<p>' + item.photoName +
					'</p>\n' +
					'</div>\n' +
					'</div>\n' +
					'</a>\n' +
					'<a href="' + item.linkUrl +
					'">\n' +
					'<div class="row info">\n' +
					'<div class="pho"><img src="' + item.logoUrl +
					'" alt=""></div>\n' +
					'<div class="txt">\n' +
					'<h2 class="ttl">' +  item.name +
					'\n';
				if (item.renz === true) {
					html += '<span class="renz">认证</span>\n';
				}
				html += '</h2>\n' +
					'<p>设计案例：<i>' + item.anli +
					'</i></p>\n' +
					'</div>\n' +
					'</div>\n' +
					'</a>\n' +
					'</div>';
				that.append(html);
			});
			page++;
			cb && cb.success();
			isLoading = false;
		}
	}
	if (parseInt(data.code) === 400) {
		cb && cb.error();
		isLoading = false;
	}
};

jQuery.fn.albumDetailCallBack = function (data, cb) {
	var that = jQuery(this);
	if (parseInt(data.code) === 200) {
		if (data.data.length < 1) {
			isHaveNot = true;
			cb && cb.end(); // 没有数据了
			isLoading = false;
		}else {
			jQuery.each(data.imgPhoto, function (i, item) {
				var html = '<div class="swiper-slide item"><img src="' + item +
					'" alt=""></div>';
				that.append(html);
			});
			page++;
			cb && cb.success();
			isLoading = false;
		}
	}
	if (parseInt(data.code) === 400) {
		cb && cb.error();
		isLoading = false;
	}
};
