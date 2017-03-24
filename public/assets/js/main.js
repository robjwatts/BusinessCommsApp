//Log in modal
$( ".login" ).click(function() {
	$( ".loginModal" ).addClass( "is-active" );
	console.log("clicked")
});

$( ".is-success, .delete" ).click(function() {
	$( ".loginModal" ).removeClass( "is-active" );
	console.log("clicked")
});

//Signup Modal 
$( ".signup" ).click(function() {
	$( ".signupModal" ).addClass( "is-active" );
	console.log("clicked")
});

$( ".is-success, .delete" ).click(function() {
	$( ".signupModal" ).removeClass( "is-active" );
	console.log("clicked")
});


//Scrolls page
$(".features").click(function(){
	console.log("clicked")
	$('html,body').animate({
      scrollTop: $("#section2").offset().top
    },
    'slow');
      
})

$(".sect2btn").click(function(){
	console.log("clicked")
	$('html,body').animate({
      scrollTop: $("#section3").offset().top
    },
    'slow');
      
});

//Tweets formatting
$( ".reply" ).click(function() {
	if ($(".reply").hasClass("is-clicked")){
		$( ".reply" ).removeClass( "is-clicked" );
	} else {
		$( ".reply" ).addClass( "is-clicked" );
		console.log("clicked")
	}		
});

$( ".heart" ).click(function() {
	if ($(".heart").hasClass("is-clicked")){
		$( ".heart" ).removeClass( "is-clicked" );
	} else {
		$( ".heart" ).addClass( "is-clicked" );
		console.log("clicked")
	}		
});

$( ".retweet" ).click(function() {
	if ($(".retweet").hasClass("is-clicked")){
		$( ".retweet" ).removeClass( "is-clicked" );
	} else {
		$( ".retweet" ).addClass( "is-clicked" );
		console.log("clicked")
	}		
});

//Add Event Modal 
$( ".addEvent" ).click(function() {
	$( "#addEvent" ).addClass( "is-active" );
	console.log("clicked")
});

$( ".submitEvent, .delete" ).click(function() {
	$( "#addEvent" ).removeClass( "is-active" );
	console.log("clicked")
});

//Add blog Modal 
$( ".addBlog" ).click(function() {
	$( "#addBlog" ).addClass( "is-active" );
	console.log("clicked")
});

$( ".submitBlog, .delete" ).click(function() {
	$( "#addBlog" ).removeClass( "is-active" );
	console.log("clicked")
});


//Chat room
$( ".leaveChat" ).click(function() {
	$("div.localView").remove();
	console.log("clicked")
});

$( ".delete, .submitChat" ).click(function() {
	$("div.modal-background").remove();
	console.log("clicked")

	// $('<div class="column localView"><a><div class="leaveChat"><i class="fa fa-times-circle" aria-hidden="true"></i></div></a><div id="local-media"></div></div>').insertAfter(".remoteView");

});


