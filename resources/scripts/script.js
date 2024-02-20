// script.js

// TODO: Line 48 -- why not appending???

class Game {
	
	static rollDie() {
		
		const number = Math.floor(Math.random() * 6) + 1;
		alert('You rolled a ' + number + '!');
		
	}
	
}



class Player {
	
	static playerNum = 0;
	
	constructor(name='', time=390) {
		
		Player.playerNum++;
		
		this.name      = name;
		this.time      = time;
		this.playerId = 'player-' + Player.playerNum;
		
		this.timerIntervalId = null;
		this.pause = 0;
		
	}
	
	createPlayerCard() {
		
		// Save the current context of 'this' to 'self'. This is so that functions have access to class methods.
		const self = this;
		
		const playersContainer = document.querySelector('#players-container');
		
		
		// Create 'player card ID' container div
		const playerCardId = document.createElement('div');
		playerCardId.setAttribute('id', this.playerId);
		playerCardId.classList.add('player-card');
		playersContainer.appendChild(playerCardId);
		
		// Create playerCardContent
		const playerCardContent = document.createElement('div');
		
		
		// Check if no name was given
		const playerName = document.createElement('p');
		playerName.classList.add('player-name');
		if (this.name === '') {
			this.name = 'Player';
			playerName.textContent = this.name;
		} else {
			playerName.textContent = this.name;
		}
		playerCardContent.appendChild(playerName);
		
		const playerControls = createPlayerControls()
		playerCardContent.appendChild(playerControls);

		playerCardId.appendChild(playerCardContent);
		
		// So that the timer is paused when the player card is created
		self.pauseTimer();
		
		
		function createPlayerControls() {
			
			const playerControls = document.createElement('div');
			playerControls.classList.add('player-controls');
			
			// Create display of player's time
			const playerTime = document.createElement('p');
			playerTime.classList.add('player-time-display');
			playerTime.innerHTML = 'Time left: <span class="time">' + self.time + '</span>';
			
			// Create 'pause timer' control button
			const pauseButton = document.createElement('button');
			pauseButton.classList.add('player-control-button');
			pauseButton.classList.add('pause-button');
			pauseButton.textContent = 'Pause';
			
			// Create button that adds 30 seconds to player's time
			const add30Button = document.createElement('button');
			add30Button.classList.add('player-control-button');
			add30Button.textContent = 'Add 30 Seconds';
			
			// Create button that subtracts 15 seconds to player's time
			const sub15Button = document.createElement('button');
			sub15Button.classList.add('player-control-button');
			sub15Button.textContent = 'Subtract 15 Seconds';
			
			// Create 'delete player' button
			const deletePlayerButton = document.createElement('button');
			deletePlayerButton.classList.add('delete-player-button');
			deletePlayerButton.textContent = 'Delete player';
			
			
			playerControls.appendChild(playerTime);
			playerControls.appendChild(pauseButton);
			playerControls.appendChild(add30Button);
			playerControls.appendChild(sub15Button);
			playerControls.appendChild(deletePlayerButton);


			// Add event listeners to the buttons
			addEventListenersToButtons()
			
			
			return playerControls;
			
			
			
			function addEventListenersToButtons() {
				
				pauseButton.addEventListener('click', function() {
					if (self.pause === 1) {
						
						self.pause = 0;
						
						self.pauseTimer();
						
					} else {
						
						self.pause = 1;
						
						self.startTimer();
						
					}
				});
				
				add30Button.addEventListener('click', function() {
					
					self.add30Seconds();
					
				});
				
				sub15Button.addEventListener('click', function() {
					
					self.sub15Seconds();
					
				});
				
				deletePlayerButton.addEventListener('click', function() {
					
					self.deletePlayer(self.playerId);
					
				});
				
				
			} // function addEventListenersToButtons()
			
		} // function playerControls()
		
	} // createPlayerCard()
	
	
    startTimer() {
		
		const self = this;
		
		const pauseButton = document.querySelector('#' + this.playerId + 
		' .pause-button'); // eg '#player-1 .pause-button'
		const playerTime = document.querySelector('#' + self.playerId + ' .time');
		
		pauseButton.classList.remove('active-pause-button');
		pauseButton.textContent = 'Pause';
		
		playerTime.textContent = this.time;
			
		
		this.timerIntervalId = setInterval(function() {
			
			if (self.time <= 0) {
				clearInterval(self.timerIntervalId);
				alert(self.name + '\'s time ran out!');
				
			}
			
			
			// Change the player time textContent of the current player ID
			self.time--;
			playerTime.textContent = self.time;		
				
		}, 1000);
			
	}
	
	pauseTimer() {
		
		clearInterval(this.timerIntervalId);
		
		const pauseButton = document.querySelector('#' + this.playerId +
		' .pause-button'); // eg '#player-1 .pause-button'
		pauseButton.classList.add('active-pause-button');
		pauseButton.textContent = 'Paused';
		
	}
	
	add30Seconds() {
		
		this.time += 30;
		document.querySelector('#' + this.playerId + ' .time').textContent = this.time;
		
	}
	
	sub15Seconds() {
		
		this.time -= 15;
		document.querySelector('#' + this.playerId + ' .time').textContent = this.time;
		
	}
	
	deletePlayer(playerId) {
		
		if (confirm('Are you sure you want to delete ' + this.name + '?')) {
			
			const playersContainer = document.querySelector('#players-container');
			const playerToDelete = document.querySelector('#players-container #' + playerId);
			
			playersContainer.removeChild(playerToDelete);
			clearInterval(this.timerIntervalId); // If statements are not objects, so 'this' refers to the class
			
		}
		
	}
	
}





const addPlayerButton = document.querySelector('#add-player-button');
addPlayerButton.addEventListener('click', createInstanceOfPlayer);

const playerNameInput = document.querySelector('#player-name-input');
playerNameInput.addEventListener('keypress', function(event) {
	if (event.keyCode === 13) {
		createInstanceOfPlayer();
	}
});


function createInstanceOfPlayer() {
	
	const name = playerNameInput.value;
	
	let player;
	
	if (name !== '') {
		player = new Player(name);
	} else {
		player = new Player();
	}
	
	playerNameInput.value = ''; // Clears out the text content of the text input
	
	player.createPlayerCard();
	
}


const rollDieButton = document.querySelector('#roll-die-button');
rollDieButton.addEventListener('click', function() {
	Game.rollDie();
});