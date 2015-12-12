// Noughts And Crosses

var playerChoice 				= "";
var computerChoice 				= "";
var gameArr 					= ["","","","","","","","",""];
var gameArrWinningCombinaison 	= [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
var gameArrBestMove 			= [4,0,2,6,8,1,3,5,7]; //Center / Side / Middle

//Todo: If player play 0,6 or 2,8 we need to block him by playing 1,3,5 or 7

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
			for(i = 0; i< gameArrWinningCombinaison.length; i++){
				var a = gameArrWinningCombinaison[i][0];
		   		var b = gameArrWinningCombinaison[i][1];
		   		var c = gameArrWinningCombinaison[i][2];

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
			for(i = 0; i< gameArrWinningCombinaison.length; i++){
				var a = gameArrWinningCombinaison[i][0];
		   		var b = gameArrWinningCombinaison[i][1];
		   		var c = gameArrWinningCombinaison[i][2];

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

		//Computer plays best Move possible.
		if(!computerPlayed){
		    for(i = 0; i < gameArr.length; i++)
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
			swal({title: "We have a Tie !", text: "Do you want to play again? ", showCancelButton: false, confirmButtonText: "PLAY AGAIN", confirmButtonColor: "#e56d2b", closeOnConfirm: true}, function(){
					Init();
			});
		}
		return isEnded;
	} 


});