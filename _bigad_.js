/*

广告大图切换

示例:

<div class="ai"></div>
<div class="bi"></div>

$(document).ready(function(e) {
    $(".ai").jq_BigAD({
		width:700,
		height: 300,//高度
		time:1000,
		url: ["/static/img/AD/zujuan_index_1.jpg","/static/img/AD/zujuan_index_2.jpg","/static/img/AD/zujuan_index_3.jpg","/static/img/AD/zujuan_index_4.jpg"],
		title: ["图片1","图片2","图片3","图片4"],
		link: ["#1","#2","#3","#4"],
		border:'1px solid #F30'
	});
    $(".bi").jq_BigAD({
		width:'300px',
		height: 300,//高度
		time:1000,
		url: ["/static/img/AD/zujuan_index_4.jpg","/static/img/AD/zujuan_index_3.jpg","/static/img/AD/zujuan_index_2.jpg","/static/img/AD/zujuan_index_1.jpg"],
		title: ["图片4","图片3","图片2","图片1"],
		link: ["#4","#3","#2","#1"],
		border:'1px solid #000'
	});
});

*/

(function($) {
	$.fn.jq_BigAD = function(options) {

		var defaluts = {
			width: '100%',
			height: 500,
			time: 5000,
			url: [],
			title: [],
			link: [],
			border:'1px solid #000'
		};
		var options =  $.extend(defaluts, options);  

		//JQuery select style
		if (!$('#jquery_BigAD_style').length) {
			var style ='<style id="jquery_select_style" type="text/css">'
			+'#Big__AD{ padding:0; margin:0 auto 0 auto; overflow:hidden;position:relative;}'
			+'#Big__AD ul{position:relative; overflow:hidden;}'
			+'#Big__AD ul,#Big__AD li{ padding:0; margin:0; }'
			+'#Big__AD li{ position:absolute; top:0; left:0; cursor:pointer; list-style:none; }'
			+'#Big__AD .AD_Num{ position:absolute; bottom:-2px; z-index:999;}'
			+'#Big__AD .AD_Num .Num_item{ width:100%; height:15px; text-align:center; }'
			+'#Big__AD .AD_Num .Num_item a{ display:inline-block; width:40px; height:6px; line-height:12px; '
			+'background:#CCC; font-size:1px; color:#F30; text-decoration:none; margin:2px 3px; }'
			+'#Big__AD .AD_Num .Num_item a:hover{ background:#FF3C09; color:#FFF; }'
			+'#Big__AD .AD_Num .Num_item .a_hover{ background:#FF3C09; color:#FFF; }</style>';
			$(document.body).append(style);
		}

		var _o = this;
		_o.html('<div id="Big__AD"><ul class="img_list"></ul><div class="AD_Num"><div class="Num_item"></div></div></div>');

		var a=options.url;
		var b=options.title;
		var c=options.link;
		
		var n=a.length;
		
		if(typeof(a)!=="object" || n==0){
			_o.find(".img_list").html("Parameter is not correct...");
			return false;
		}
		_o.find(".Num_item").css({"z-index":(n+2)});
		for(var i=0;i<n;i++){

			_o.find(".Num_item").append('<a href="javascript:void(0);" title="'+b[i]+'"></a>');
			if(c[i]){
			_o.find(".img_list").append('<li onclick="window.location.href=\''+c[i]+'\';" style="background:url('+a[i]+') no-repeat center top;z-index:1"></li>');
			}else{
			_o.find(".img_list").append('<li style="background:url('+a[i]+') no-repeat center top;z-index:1;cursor:default;"></li>');
				}
		}

		_o.find("#Big__AD").css({"width":options.width,"height":options.height+20});
		_o.find("#Big__AD ul").css({"height":options.height,"border":options.border});
		_o.find("#Big__AD ul li").css({"width":options.width,"height":options.height});
		_o.find("#Big__AD .AD_Num").css({"width":options.width});
		_o.find("#Big__AD ul").css({"width":_o.find("#Big__AD ul").width()-2});
		
		var p_img=null;
		var p_n=null;
		var p_t=options.time;
		var p_t_s=null;
		
		function aa(){
			if(p_n==n){
				p_n=0;
			}
			_o.find(".img_list li").stop();
			p_img=_o.find(".img_list li").eq(p_n);
			p_img.prevAll().css({"z-index":2,"opacity":1});
			p_img.nextAll().css({"z-index":1,"opacity":1});
			if((p_n+1)==n){
				_o.find(".img_list li").css({"z-index":1,"opacity":1});
				_o.find(".img_list li").eq(p_n).css({"z-index":2,"opacity":1});
			}
			p_img.stop().css({"z-index":3,"opacity":0}).animate({"opacity":1},200);
			_o.find(".Num_item a").removeClass();
			_o.find(".Num_item a").eq(p_n).addClass("a_hover");
			p_n++;
		}
		
		_o.find("#Big__AD ul li").hover(function(){
			window.clearInterval(p_t_s);
		},function(){
			p_t_s=window.setInterval(function(){
				aa();
			},p_t);
		});
		
		_o.find(".Num_item a").click(function(){
			window.clearInterval(p_t_s);
			p_n=$(this).index();
			p_img=_o.find(".img_list li").eq(p_n);
			_o.find(".img_list li").stop().css({"z-index":1});
			p_img.css({"z-index":3,"opacity":1});
			_o.find(".Num_item a").removeClass();
			_o.find(".Num_item a").eq(p_n).addClass("a_hover");
			p_n++;
			p_t_s=window.setInterval(function(){
				aa();
			},p_t);
		});
		
		_o.find(".Num_item a").eq(0).click();

	}
})(jQuery);

