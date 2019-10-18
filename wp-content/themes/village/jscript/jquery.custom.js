jQuery(window).load(function () {

var content_open = true;
var lower_toggle = false;
var slideShowPlaying = true;
var header_width = jQuery("#header").width() + 65;
var open_space = jQuery(window).width() - header_width;
var floating_slideshow_nav_pos = header_width + ((open_space / 2) - ((jQuery("#floating_slideshow_nav").width()) / 2));
var window_height = jQuery(this).height();
var cfInterval = null;
var emailValResult = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
var top_object_height = jQuery("#logo img").height() + jQuery("#menu").height();
var bottom_object_height = jQuery("#cart_n_stuff").height();

jQuery("#contact_form #message").text("");

jQuery("#contact_form").submit(function () {

			jQuery("#result_box").html("Processing");

			jQuery("#name,#email,#message ").css("border-color", "#333333");
						
			if (jQuery("#contact_form #name").val() != cf_name && jQuery("#contact_form #email").val() != cf_email && emailValResult.test(jQuery("#contact_form #email").val()) && jQuery("#contact_form #message").val() != "") {

			jQuery("#contact_form input[type=submit]").fadeOut(0);
			
			if (cfInterval != null) clearInterval(cfInterval);
			
			jQuery("#result_box").fadeIn(200);

			var fieldsVal = jQuery(this).serialize();
							
			jQuery.ajax({
				type: "POST",
				url: ajaxurl,
				data: fieldsVal,
				success: function( result ){
					jQuery("#result_box").html(result);
					cfInterval = setInterval('jQuery("#result_box").fadeOut(200);', 3000);
					jQuery("#contact_form input[type=submit]").fadeIn(0);	
				}
			});
			
			} else {
			
			
				if (jQuery("#contact_form #name").val() == cf_name) {
				
					jQuery("#name").css("border-color", "#912e35");
				
				}
				
				if (jQuery("#contact_form #email").val() == cf_email || !emailValResult.test(jQuery("#contact_form #email").val())) {
				
					jQuery("#email").css("border-color", "#912e35");
				
				}

				if (jQuery("#contact_form #message").val() == "") {
				
					jQuery("#message").css("border-color", "#912e35");					
				
				}	
				
			}
			

return false;

});

// SLIDESHOW CONTENT AUTO HIDE

if (jQuery("#thumbs").size() > 0) {

	if (!checkVersion()) {
	
	var i = null;
	
    clearTimeout(i);
    jQuery("#thumbs, #header").fadeIn(400);
    i = setTimeout('jQuery("#thumbs, #header").fadeOut(400);', 3000);

	jQuery(window).mousemove(function() {
	    clearTimeout(i);
	    jQuery("#thumbs, #header").fadeIn(400);
	    i = setTimeout('jQuery("#thumbs, #header").fadeOut(400);', 3000);
	}).mouseleave(function() {
	    clearTimeout(i);
	    jQuery("#thumbs, #header").fadeIn(400);  
	});
	
	}

	jQuery("#thumbs ul li.play_stop_button").css("background-position", "-53px -30px");

	jQuery("#thumbs ul li.play_stop_button").click(function () {
	
		if (slideShowPlaying == true) {
		
			jQuery("#thumbs").stopSlideShow();	
			jQuery("#thumbs ul li.play_stop_button").css("background-position", "-53px 0px");
			
			slideShowPlaying = false;
		
		} else {
		
			jQuery("#thumbs").startSlideShow();				
			jQuery("#thumbs ul li.play_stop_button").css("background-position", "-53px -30px");
			
			slideShowPlaying = true;
		
		}	

	});
	
	jQuery("#thumbs ul li.forward_button").click(function () {
	
		jQuery("#thumbs").nextSlide();	
	
	});

	jQuery("#thumbs ul li.backward_button").click(function () {
	
		jQuery("#thumbs").prevSlide();	
	
	});	
	
	if (!jQuery("#slideshow_nav_portrait").length) {		

	var thumb_ypos = 0;
	
	jQuery("#thumb_vert_mousemove a").each(function (i) {
	
		jQuery(this).css("top", thumb_ypos);
		
		thumb_ypos += 62;
	
	});
	
	jQuery("#thumb_vert_mousemove").css("overflow", "hidden");
		
	jQuery("#thumb_vert_mousemove").mousemove(function(e){
		var thumb_container_height = (62 * jQuery("#thumb_vert_mousemove a").size());	
		var top = (e.pageY - jQuery(this).offset().top) * (thumb_container_height - (window_height - 140)) / (window_height - 140);
		jQuery(this).scrollTop(top);	
	});
	
	} else {
	
	var thumb_ypos = 0;
	
	jQuery("#thumb_vert_mousemove a").each(function (i) {
	
		jQuery(this).css("top", thumb_ypos);
		
		thumb_ypos += 104;
	
	});
	
	jQuery("#thumb_vert_mousemove").css("overflow", "hidden");
		
	jQuery("#thumb_vert_mousemove").mousemove(function(e){
		var thumb_container_height = (104 * jQuery("#thumb_vert_mousemove a").size());	
		var top = (e.pageY - jQuery(this).offset().top) * (thumb_container_height - (window_height - 140)) / (window_height - 140);
		jQuery(this).scrollTop(top);	
	});	
	
	}

}

if (jQuery("#floating_slideshow_nav").length) {

	lower_toggle = true;

	jQuery("#floating_slideshow_nav ul li.play_stop_button").css("background-position", "-53px -30px");

	jQuery("#floating_slideshow_nav ul li.play_stop_button").click(function () {
	
		if (slideShowPlaying == true) {
		
			jQuery("#floating_slideshow_nav").stopSlideShow();	
			jQuery("#floating_slideshow_nav ul li.play_stop_button").css("background-position", "-53px 0px");
			
			slideShowPlaying = false;
		
		} else {
		
			jQuery("#floating_slideshow_nav").startSlideShow();				
			jQuery("#floating_slideshow_nav ul li.play_stop_button").css("background-position", "-53px -30px");
			
			slideShowPlaying = true;
		
		}
	
	
	});

	jQuery("#floating_slideshow_nav ul li.forward_button").click(function () {
	
		jQuery("#floating_slideshow_nav").nextSlide();	
	
	});

	jQuery("#floating_slideshow_nav ul li.backward_button").click(function () {
	
		jQuery("#floating_slideshow_nav").prevSlide();	
	
	});
	
	if (!jQuery("#floating_slideshow_nav_portrait").length) {
	
	var thumb_xpos = 0;
	
	jQuery("#thumb_mousemove a").each(function (i) {
	
		jQuery(this).css("left", thumb_xpos);
		
		thumb_xpos += 102;
	
	});	
	
	jQuery("#thumb_mousemove").css("overflow", "hidden");
		
	jQuery("#thumb_mousemove").mousemove(function(e){
		var thumb_container_width = 102 * jQuery("#thumb_mousemove a").size();	
		var left = (e.pageX - jQuery(this).offset().left) * (thumb_container_width - 508) / 508;
		jQuery(this).scrollLeft(left);	
	});	
	
	} else {
	
	var thumb_xpos = 0;
	
	jQuery("#thumb_mousemove a").each(function (i) {
	
		jQuery(this).css("left", thumb_xpos);
		
		thumb_xpos += 82;
	
	});	
	
	jQuery("#thumb_mousemove").css("overflow", "hidden");
		
	jQuery("#thumb_mousemove").mousemove(function(e){
		var thumb_container_width = 82 * jQuery("#thumb_mousemove a").size();	
		var left = (e.pageX - jQuery(this).offset().left) * (thumb_container_width - 508) / 508;
		jQuery(this).scrollLeft(left);	
	});		
	
	}
	
}

// HEADER FUNCTIONS

if (jQuery("#wall").length || jQuery("#floating_slideshow_nav").length || jQuery("#hide_menu_toggle").length) {

content_open = false;

if (!jQuery("#wall_menu").length || jQuery("#hide_menu_toggle").length) {

var header_width = (-(jQuery("#header").width()) - 150).toString();

jQuery("#header").animate({"left": header_width + "px"}, "slow");

}

}

// SHOW/HIDE PAGE background

jQuery("#cross").hover(function () {

	jQuery(this).find("img").stop().fadeTo("slow", 1);
	
}, function () {

	jQuery(this).find("img").stop().fadeTo("slow", 0.3);

}).find("img").fadeTo(0, 0.3);

jQuery("#cross").click(function () {

	jQuery("#content, #header").animate({"left": "-740px"}, 800, "easeInOutExpo");
	jQuery("body").css("overflow", "hidden").resize();
	jQuery.fn.superbgResize();
		
	content_open = false;		
	
});


if (jQuery("#hide_menu_toggle_page").length) jQuery("#cross").click();	

// POSITION TOGGLE + TOGGLE FUNCTIONS + FLOATING SLIDESHOW FUNCTIONS

jQuery(window).resize(function () {
	
	window_height = jQuery(this).height();
	header_width = jQuery("#header").width() + 65;
	open_space = jQuery(window).width() - header_width;
	floating_slideshow_nav_pos = header_width + ((open_space / 2) - ((jQuery("#floating_slideshow_nav").width() + 20) / 2));
	
	if (lower_toggle == false) {
	
		jQuery("#show_hide").css("top", ((jQuery(window).height() / 2) - (jQuery("#show_hide").height() / 2) - 35) + "px");
	
	} else {
	
		jQuery("#show_hide").css("top", jQuery(window).height() - jQuery("#show_hide").height() - 90);	
	
	}
	
	if (content_open == true) {
	
	jQuery("#floating_slideshow_nav").css("left", floating_slideshow_nav_pos);
	
	} else {
	
	jQuery("#floating_slideshow_nav").css("left", (((open_space + header_width) / 2) - ((jQuery("#floating_slideshow_nav").width() + 20) / 2)));	
	
	}
	
	jQuery("#thumb_vert_mousemove").css("height", jQuery(window).height() - 60);
	
	if (jQuery("#wall_menu").length) {
	
		jQuery("body").css("overflow", "hidden");
		jQuery("#wall").css("width", jQuery(window).width() - header_width + 'px');
	
	}
	
	// overlap fix
	
	if (top_object_height + bottom_object_height + 110 > window_height) {
		jQuery("#cart_n_stuff").attr("style", 'top:' + (top_object_height + 90) + 'px;');
	} else {
		jQuery("#cart_n_stuff").attr("style", 'bottom: 60px;');
	}
	
	// gmaps
	
	jQuery("#map_canvas").css({"height": (window_height) + 'px'});
	
	
}).resize();

jQuery("#show_hide").click(function () {

	if (content_open == false) {
	
		jQuery("#header").animate({"left": "0px"}, 800, "easeInOutExpo");
		jQuery("#content").animate({"left": "255px"}, 800, "easeInOutExpo");
		jQuery("body").css("overflow", "auto").resize();		
		jQuery("#floating_slideshow_nav").animate({"left": floating_slideshow_nav_pos}, 800, "easeInOutExpo");	
	
		content_open = true;
	
	} else {
	
		content_open = false;		
	
	}

}).hover(function () {

	jQuery(this).find("img").stop().fadeTo("slow", 1);

}, function () {

	jQuery(this).find("img").stop().fadeTo("slow", 0.5);

}).find("img").fadeTo(0, 0.3);

// GALLERY THUMB FUNCTIONS

jQuery(".gallery_one_post, .gallery_two_post, .gallery_three_post, .gallery_four_post").hover(function () {

	jQuery(this).find(".gallery_item_info").fadeOut(200);
	jQuery(this).find("img").fadeTo("medium", 0.7);

}, function () {

	jQuery(this).find(".gallery_item_info").fadeIn(200);
	jQuery(this).find("img").fadeTo("medium", 1);

});

// MENU CONFIG

jQuery("#menu ul li").hover(function () {

	if (jQuery(this).find("ul")) {
	
	jQuery(this).find("ul").css("display", "block").fadeOut(0).fadeIn(300);
	jQuery(this).find("ul li ul").hide();
	
	}
	
}, function () {

	if (jQuery(this).find("ul")) jQuery(this).find("ul").fadeOut(300);

});

});


