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