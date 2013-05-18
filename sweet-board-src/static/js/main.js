var message_ids = [];
var slider;
var animating = false;

function getSlider(){
	$.ajax({
		url: "/archive"
	}).done(function(data){
		$('.slider').html(data);
		$('.slider li').width($('body').innerWidth());
		$('.slider').emoji(64);
		slider = $('.slider').slider({
			pager: false,
			controls: false,
			speed: 500,
			adaptiveHeight: true,
			auto: true,
			pause: 5000,
			startSlide: 0,
			infiniteLoop: true,
			mode: 'horizontal'
		});
		
		// make vintage texts hide if mobile and landscape
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
			if (animating == false){
				if (window.orientation==90 || window.orientation==-90){
					hideVintage();
				} else {
					$('.vintage').css('visibility', 'visible');
				}
			} else {
				$('.vintage').css('visibility', 'visible');
			}
		} else {
			$('.vintage').css('visibility', 'visible');
		}
	});
}

function updateSlider(){
	$('.slider').html('');
	getSlider();
}

function getMessage(isLast, message_id){
	$.ajax({
		url: "/message/" + message_id
	}).done(function(data){
		$('.wrapper').prepend(data);
		$('article.new').emoji(64);
		$('article.new').find("abbr.timeago").timeago();
		message_ids.push(message_id);
		playSound("/static/sounds/smb_coin.mp3");
		$('article:not(.hidden)').last().addClass('hidden');
		setTimeout(function(){
			$('article.new').removeClass('new');
		},100);
		if (isLast){
			update();
		} else {
			$('article:not(.hidden)').last().addClass('hidden');
			updateSlider();
		}
	});
}
function update(){
	$.ajax({
		url: "/message_sid_list"
	}).done(function(data){
		var new_ids = data.split(',');
		var index = 0;
		
		for (var i=0; i<message_ids.length; i++) {
			index = new_ids.indexOf(message_ids[i]);
			if (index > -1) {
				new_ids.splice(index, 1);
			}
		}

		if (new_ids.length === 0){
			update();
		} else {
			for (var j=0; j<new_ids.length; j++) {
				var newid=new_ids[j];
				if (j==(new_ids.length-1)){
					getMessage(true, newid);
				} else {
					getMessage(false, newid);
				}
			}
		}
	});
}

function hideVintage(){
	animating = true;
	$('.vintage').animate({marginBottom: -($('.vintage').outerHeight() -($('.vintage h3').outerHeight()/2)) }, 500, function(){
		animating = false;
		$('.vintage').addClass('hiding');
		$('.vintage').css('visibility', 'visible');
	});
}

function showVintage(){
	animating = true;
	$('.vintage').animate({marginBottom: 0 }, 500, function(){
		animating = false;
		$('.vintage').removeClass('hiding');
	});
}

function playSound(sound_file) {
	var aud_con = jQuery(document.createElement("audio"));
	aud_con.attr("autoplay", "true");
	aud_con.prop("id", "audio_control");

	var aud_src = jQuery(document.createElement("source"));
	aud_src.attr("src", sound_file);
	aud_src.attr("type", "audio/mpeg");

	aud_con.append(aud_src);
	jQuery(document).append(aud_con)

	aud_con.onEnded = function() {
		aud_con.remove();
	}
}

jQuery(document).ready(function() {
	$('article').each(function(){
		var id = $(this).attr('data-sid');
		message_ids.push(id);
	});
	
	// make vintage texts hide if mobile and landscape
	window.addEventListener("orientationchange", function() {
		if (animating == false){
			if (window.orientation==90 || window.orientation==-90){
				hideVintage();
			}
		}
	}, false);
	
	$('.vintage h3').click(function(){
		if (animating == false){
			if ($('.vintage').hasClass('hiding')){
				showVintage();
			} else {
				hideVintage();
			}
		}
	})
	
	
	$("abbr.timeago").timeago();
	$('article').emoji(64);
	setTimeout(function(){
		update();
	},1000);

	getSlider();
});