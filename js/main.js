// Noughts And Crosses

var playerChoice 				= "";
var computerChoice 				= "";
var gameArr 					= ["","","","","","","","",""];
var gameArrWinningCombinaison 	= [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

jQuery(function($) {
	Init();

	//Init
	function Init(){
		$('#splash').show();
		$('#game').hide();
		gameArr = ["","","","","","","","",""];
		playerChoice = "";
		computerChoice = "";
		$('.cell').text("");
		$('.btn-x').removeClass('active');
		$('.btn-o').removeClass('active');
		$('.btn-play').prop('disabled', true);
	}
	
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
			if(!checkIfGameOver()){
				computerPlay();
			}
		}
	});

	function computerPlay(){
		
	}

	function checkIfGameOver(){
		var isEnded = false;
		var isDraw = true;
		for(i = 0; i < gameArrWinningCombinaison.length; i++){
		   var a = gameArrWinningCombinaison[i][0];
		   var b = gameArrWinningCombinaison[i][1];
		   var c = gameArrWinningCombinaison[i][2];
		  
		   if(gameArr[a] == "" || gameArr[b] == "" || gameArr[c] == "") {
		   		isDraw = false;
		   	 	continue;
		   }

		   if(gameArr[a] == gameArr[b] && gameArr[b] == gameArr[c]) {
		   	  	isEnded = true;
		   	  	isDraw = false;
		   	  	swal({title: gameArr[a] + " won", text: "Do you want to play again? ", showCancelButton: false, confirmButtonText: "PLAY AGAIN", confirmButtonColor: "#e56d2b", closeOnConfirm: true}, function(){
					Init();
				});
		   }
		}

		if(isDraw){
			isEnded = true;
			swal({title: "No one won", text: "Do you want to play again? ", showCancelButton: false, confirmButtonText: "PLAY AGAIN", confirmButtonColor: "#e56d2b", closeOnConfirm: true}, function(){
					Init();
			});
		}
		return isEnded;
	} 


});