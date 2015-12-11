// Noughts And Crosses

var playerChoice 	= "";
var computerChoice 	= "";
var gameArr = ["","","","","","","","",""];
var gameArrCombinaison = ["0,1,2","3,4,5","6,7,8","0,3,6","1,4,7","2,5,8","0,4,8","2,4,6"];

jQuery(function($) {
	//Init
	$('#splash').show();
	$('#game').hide();

	//Selection X or O
	$('.btn-x').click(function(e) {
		if(playerChoice == "X"){
			$(this).removeClass('active');
			playerChoice = ""; 
			computerChoice = "";
			$('.btn-play').prop('disabled', true);
		}
		else {
			$(this).addClass('active');
			$('.btn-o').removeClass('active');
			playerChoice = "X";
			computerChoice = "O";
			$('.btn-play').prop('disabled', false);
		}
	});

	$('.btn-o').click(function(e) {
		if(playerChoice == "O"){
			$(this).removeClass('active');
			playerChoice = ""; 
			computerChoice = "";
			$('.btn-play').prop('disabled', true);
		}
		else {
			$(this).addClass('active');
			$('.btn-x').removeClass('active');
			playerChoice = "O";
			computerChoice = "X";
			$('.btn-play').prop('disabled', false);
		}
	});

	//Start a game
	$('.btn-play').click(function(e) {
		$('#splash').hide();
		$('#game').show();
	});

	$('.cell').click(function(e) {
		if($(this).text() != ""){
			$('.alert').text("Can't play here. Please try again !");
		}
		else {
			$('.alert').text("");
			$(this).text(playerChoice);
			gameArr[$(this).attr('id')] = playerChoice;
		}
	});






});