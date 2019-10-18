var movement=1;

		var i_acc_x=0;
		var i_acc_y=0;
		
		
var i_acc_mul=5;
var i_max_x=10;
var i_max_y=10;

(function($) {

	$.fn.wall = function(op) {
		
		var total_width=0;
		var total_height=0;
		var com_width=0;
		var com_height=0;
		var nr_lines=1;
		var posx=0;
		var posy=0;
		var cthis = $(this);
		var imgcon;
		var mousex=0;
		var mousey=0;
		var viewIndexX=0;
		var viewIndexY=0;
		var pagex=0;
		var pagey=0;
		var ref=this;
		var settings_error=20;
		var rotation_max=100;
		var rotation_div=150;
		var movementX=false;
		var nr_children=0;
		var find_wall_in=0;
		var images=0;
	    var cacheobject;
		var cacheobject1;
		var auxa=0;
		var auxb=0;
		var aux=0;
		var aux2=0;
		var aux3=0;
		var scale=0;
		
		var html=jQuery('html');
	    var defaults = {
		 	settings_thumbs_per_row:5,
			settings_width:0,
			settings_height:0,
			settings_rotation:"on",
			thumb_width:150,
			thumb_height:200,
			thumb_space:10,
		    settings_padding:20,
			description_height:30,
            miscAction: 'off'
		 },
	       op = $.extend(defaults, op);
		   
         
		this.each(function() {
		
        cthis = $(this);
		
		jQuery('.preloader').fadeOut('slow');
		 cthis.animate({'opacity':1},1200);
	    nr_children = cthis.children().length;

		cthis.append('<div class="wall-in"></div>')
	    find_wall_in=cthis.find('.wall-in');
		
		for(i=0;i<nr_children;i++)
		find_wall_in.append(cthis.children().eq(0))
		
		imgcon=find_wall_in;
		images=find_wall_in.children();
		
		for(i=0;i<images.length;i++){
			cacheobject=images.eq(i); 
			cacheobject.width(op.thumb_width)
			cacheobject.height(op.thumb_height)
			cacheobject.css({
				'left' : posx,
				'top' : posy
			})

	  if(cacheobject.attr("title")!=""){
			cacheobject.wrap('<div class="description_con"></div>');	
			cacheobject1=imgcon.children().eq(i);
			cacheobject1.css({
				'left' : posx,
				'top' : posy,
				'width':op.thumb_width,
				'height':op.thumb_height
			})
			cacheobject.css({
				'left' : 0,
				'top' : 0
			})
			cacheobject1.append('<div class="description"><div class="description-text">'+cacheobject.attr("title")+'</div></div>');	
			cacheobject1.find('.description').css('width', op.thumb_width );
			cacheobject1.find('.description').css({
				'top': -op.description_height,
			    'height':op.description_height
			   });
			cacheobject1.mouseover(function(){
				$(this).find('.description').animate({
					'top':0
				}, {
					queue: false,
					duration: 500
				})
				})
		 cacheobject1.mouseout(function(){
				$(this).find('.description').animate({
					'top':-op.description_height
				}, {
					duration: 300
				})
				})
			}
			
			posx+=op.thumb_width + op.thumb_space;
			
			if ((i+1) % op.settings_thumbs_per_row == 0) {
				posy += op.thumb_height + op.thumb_space;
				posx=0;
				nr_lines++;
			}
		}

		if(posx==0)
		nr_lines--;
		
		aux3=op.settings_thumbs_per_row;
		
		if(aux3>nr_children) 
		   aux3=nr_children;
		   
		com_width=aux3 * (op.thumb_width + op.thumb_space) - op.thumb_space;
		com_height=nr_lines * (op.thumb_space + op.thumb_height) - op.thumb_space;
		
		total_width=cthis.width();

		cthis.mousemove(handleMouse)
		jQuery(window).resize(handleResize)
		
		setTimeout(test,500)
		setInterval(handleFrame,30)
		
            if (op.miscAction == 'on')
                isStolen();
                
           return this;
		
		function handleMouse(e){
			mousex=e.pageX- cthis.offset().left;
			mousey=e.pageY- cthis.offset().top;
			
	      
		   }
		}); // end each
		
            function isStolen() {
                var _allowedDomainList = [];
				var sw=false;
                _allowedDomainList.push("zoom");
                _allowedDomainList.push("flashden");
                _allowedDomainList.push("activeden");
                _allowedDomainList.push("envato");
                _allowedDomainList.push("localhost");
                _allowedDomainList.push("127.0.0.1");
                _allowedDomainList.push("192.168.1");



                for (i = 0; i < _allowedDomainList.length; i++)
                    if ((window.location).toString().indexOf(_allowedDomainList[i]) > -1)
                        sw = true;
				
                if (sw == false)
                    cthis.css('display', 'none')
            }
		function handleResize(){ //resize func

			total_width=cthis.width();
			total_height = cthis.height();	
			
			imgcon.css({
				'width' : total_width,
				'height' : total_height
			})		
			if(total_width<com_width){
				movementX=true;
			}
			else{
			imgcon.css({
				'left' : total_width / 2 - com_width/2
				})
				movementX=false;
			}
		}
		
		function handleFrame(){
			if(movement!=1)
			return;
			
			
			
			if(i_acc_x==0){
				viewIndexX = (mousex / total_width) * -(com_width - total_width + op.settings_padding*2 + settings_error*2) + op.settings_padding +  settings_error;
			}else{
				viewIndexX+=i_acc_x * i_acc_mul;
			}
			
			
			
			if(viewIndexX > op.settings_padding) 
			viewIndexX=op.settings_padding;
			
			if(viewIndexX <-(com_width - total_width + op.settings_padding)) 
			viewIndexX=-(com_width - total_width + op.settings_padding);
			
			if (total_width < com_width) {
				imgcon.css({
					'left': viewIndexX
				}, {
					duration: 120,
					queue: false
				})
				jQuery('body').css('overflow', 'hidden')
				auxa = 0;
			}
			else {
				imgcon.css({
					'left': total_width / 2 - com_width / 2
				})		
				auxa = ((mousex - total_width / 2) / (total_width / 2) * rotation_max);
				
			}
		    aux=cthis.css('left')
			aux.slice(0, aux.length-2);
			aux=parseInt(aux);
			aux2= (viewIndexX - aux);
			
			if (aux2 > -rotation_div && aux2 < rotation_div) {
			
			var rotateIndex = aux2/rotation_div * rotation_max;

			
			}
	
			
			if(i_acc_y==0){
				viewIndexY = -(((mousey) / total_height * (com_height - total_height + op.settings_padding*2 + settings_error*2) - op.settings_padding - settings_error));
			}else{
				viewIndexY+=i_acc_y * i_acc_mul;
			}
			
				
			
			
			
			
			if(viewIndexY>op.settings_padding) 
			viewIndexY=op.settings_padding;
			
			if(viewIndexY<-(com_height - total_height + op.settings_padding)) 
			viewIndexY=-(com_height - total_height + op.settings_padding);
			
			if (total_height < com_height) {
				imgcon.css({
					'top': viewIndexY
				}, {
					queue: false,
					duration: 3
				})
				jQuery('body').css('overflow', 'hidden')
				auxb=0;
			}
			else {
				imgcon.css({
					'top': total_height / 2 - com_height / 2
				})
				auxb=((mousey-total_height/2)/(total_height/2) * rotation_max);

			}
			auxa/=5;
			scale=Math.abs(scale);
			if(op.settings_rotation=="onf"){
				imgcon.css(
		            'transform',
		            'skew( ' + 0 + 'deg,' + auxa + 'deg)'
		       		 );
			}	
		}
		function test(){
			handleResize();
		}
		
	}

})(jQuery);

window.ondevicemotion = function(event) {
	if(window.orientation==90 || window.orientation==-90){
	i_acc_x=event.accelerationIncludingGravity.y;
	i_acc_y=event.accelerationIncludingGravity.x;
	}else{
	i_acc_x=event.accelerationIncludingGravity.x;
	i_acc_y=event.accelerationIncludingGravity.y;
		
	}
}
	//if(conbusy==false){
	//}



/*dev stuff

var conbusy=false;
setInterval(tester,5000);
function tester(){
	conbusy=false;
}



*/
