$(document).ready(function(){
	$('ul#gallery li').on('mouseenter', function(){
		//Get data attribute values
		var title = $(this).children().data('title');

		var desc = $(this).children().data('desc');

		//Validation
		if(desc == null){
			desc ='Click To Enlarge';
		}

		if(title ==null){
			title ='';

		}

		//Create overlay div
		$(this).append('<div class="overlay"></div>');

		//Get the overlay div
		var overlay = $(this).children('.overlay');

		//Add html to overlay
		overlay.html('<h3>'+ title+ '</h3><p>'+desc+'</p>');

		//Fade in overlay
		overlay.fadeIn(800);

	});

	//Mouseleave overlay
	$('ul#gallery li').on('mouseleave', function(){
		//Create overlay div
		$(this).append('<div class="overlay"></div>');

		//Get the overlay div
		var overlay = $(this).children('.overlay');

		//Fade out overlay
		overlay.fadeOut(500);
	});


	$.getJSON("process?list=1", function(data){
	    $.each(data, function(key, value) {
	        $.each(value, function(key1, value1) {
						//$("#list_tv").append("<li>Test</li>");
						$( $.parseHTML('<li><a href="process?tv='+key1+'">'+value1+'</a></li>')).appendTo("#list_tv");
						$( $.parseHTML('<a href="process?tv='+key1+'">'+value1+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>')).appendTo("#heading");
					});
	    });
	});

});
