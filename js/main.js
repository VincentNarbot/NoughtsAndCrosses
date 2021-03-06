// Noughts And Crosses

// Game Grid:
// 0 1 2
// 3 4 5
// 6 7 8

var playerChoice 				= "";
var computerChoice 				= "";
var gameArr 					= ["","","","","","","","",""];
var gameArrWinningCombination 	= [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
var gameArrStrategicCombination = [[2,6],[0,8]]; 
var gameArrBestMoveUp 			= [4,0,2,6,8,1,3,5,7]; //Center / Side / Middle
var gameArrBestMoveDown			= [4,6,8,0,2,5,7,1,3]; //Center / Side / Middle

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
		var computerPlayed = false;

		//Computer try to win first
		if(!computerPlayed){
			for(i = 0; i< gameArrWinningCombination.length; i++){
				var a = gameArrWinningCombination[i][0];
		   		var b = gameArrWinningCombination[i][1];
		   		var c = gameArrWinningCombination[i][2];

		   		if(gameArr[a] == gameArr[b] && gameArr[a] == computerChoice){
		   			if(gameArr[c] == "" && !computerPlayed){
		   				computerPlayed = true;
		    			gameArr[c] = computerChoice;
		    			$("#"+c).text(computerChoice);
		   			}
		   		}

		   		if(gameArr[b] == gameArr[c] && gameArr[b] == computerChoice) {
		   	  		if(gameArr[a] == "" && !computerPlayed){
		   	  			computerPlayed = true;
		    			gameArr[a] = computerChoice;
		    			$("#"+a).text(computerChoice);
		   	  		}
		   		}

		   		if(gameArr[a] == gameArr[c] && gameArr[a] == computerChoice) {
		   	  		if(gameArr[b] == "" && !computerPlayed){
		   	  			computerPlayed = true;
		    			gameArr[b] = computerChoice;
		    			$("#"+b).text(computerChoice);
		   	  		}
		   		}
			}
		}

		//Computer blocks player moves
		if(!computerPlayed){
			for(i = 0; i< gameArrWinningCombination.length; i++){
				var a = gameArrWinningCombination[i][0];
		   		var b = gameArrWinningCombination[i][1];
		   		var c = gameArrWinningCombination[i][2];

		   		if(gameArr[a] == gameArr[b] && gameArr[a] == playerChoice){
		   			if(gameArr[c] == "" && !computerPlayed){
		   				computerPlayed = true;
		    			gameArr[c] = computerChoice;
		    			$("#"+c).text(computerChoice);
		   			}
		   		}

		   		if(gameArr[b] == gameArr[c] && gameArr[b] == playerChoice) {
		   	  		if(gameArr[a] == "" && !computerPlayed){
		   	  			computerPlayed = true;
		    			gameArr[a] = computerChoice;
		    			$("#"+a).text(computerChoice);
		   	  		}
		   		}

		   		if(gameArr[a] == gameArr[c] && gameArr[a] == playerChoice) {
		   	  		if(gameArr[b] == "" && !computerPlayed){
		   	  			computerPlayed = true;
		    			gameArr[b] = computerChoice;
		    			$("#"+b).text(computerChoice);
		   	  		}
		   		}
			}
		}

		//Player is trying to win in 2 turns.
		if(!computerPlayed){
			for(i = 0; i< gameArrStrategicCombination.length; i++){
				var a = gameArrStrategicCombination[i][0];
		   		var b = gameArrStrategicCombination[i][1];

		   		if(gameArr[a] == gameArr[b] && gameArr[a] == playerChoice){
		   			if(gameArr[1] != computerChoice && gameArr[3] != computerChoice && gameArr[5] != computerChoice && gameArr[7] != computerChoice){
		   				if(gameArr[1] == "" && !computerPlayed){
		   					computerPlayed = true;
		    				gameArr[1] = computerChoice;
		    				$("#"+1).text(computerChoice);
		   				}
		   				if(gameArr[3] == "" && !computerPlayed){
		   					computerPlayed = true;
		    				gameArr[3] = computerChoice;
		    				$("#"+3).text(computerChoice);
		   				}
		   				if(gameArr[5] == "" && !computerPlayed){
		   					computerPlayed = true;
		    				gameArr[5] = computerChoice;
		    				$("#"+5).text(computerChoice);
		   				}
		   				if(gameArr[7] == "" && !computerPlayed){
		   					computerPlayed = true;
		    				gameArr[7] = computerChoice;
		    				$("#"+7).text(computerChoice);
		   				}
		   			}
		   		}
			}
		}

		//Computer plays best Move possible.
		if(!computerPlayed){
			var gameArrBestMove = [];
			if(gameArr[0] == playerChoice || gameArr[2] == playerChoice){
				 gameArrBestMove = gameArrBestMoveDown;
			}
			else {
				 gameArrBestMove = gameArrBestMoveUp;
			}
			
		    for(i = 0; i < gameArrBestMove.length; i++)
		    {
		    	var move = gameArrBestMove[i];
		    	if(gameArr[move] == "" && !computerPlayed){
		    		computerPlayed = true;
		    		gameArr[move] = computerChoice;
		    		$("#"+move).text(computerChoice);
		    	}
		     }
	 	}

	 	//Check if game is ended
	 	checkIfGameOver();
	}

	function checkIfGameOver(){
		var isEnded = false;
		var isDraw = true;
		for(i = 0; i < gameArrWinningCombination.length; i++){
		   var a = gameArrWinningCombination[i][0];
		   var b = gameArrWinningCombination[i][1];
		   var c = gameArrWinningCombination[i][2];
		  
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
			swal({title: "We have a Tie !", text: "Do you want to play again? ", showCancelButton: false, confirmButtonText: "PLAY AGAIN", confirmButtonColor: "#e56d2b", closeOnConfirm: true}, function(){
					Init();
			});
		}
		return isEnded;
	} 
});