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