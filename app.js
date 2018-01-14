let inquirer = require('inquirer');
const randomWord = require('random-word');

class Word {
	constructor(word) {
		this.wordArray = [];
		this.wordComplete = false;
		for (let i = 0; i < word.length; i++) {
			this.wordArray.push(new Letter(word[i]));
		}

		this.displayWord();
	}

	displayWord() {
		let logString = '';
		this.wordArray.forEach( (letter) => {
			logString += letter.displayLetter + ' ';
		});

		console.log(logString);
	}

	checkGuess(guessedLetter) {
		let correctGuesses = 0;
		let lettersRemaining = this.wordArray.length;

		this.wordArray.forEach( (letter) => {
			correctGuesses += letter.checkGuess(guessedLetter);
			lettersRemaining -= letter.revealed;
		});

		this.displayWord();

		if (lettersRemaining <= 0) {
			this.wordComplete = true;
		}

		if (correctGuesses > 0) {
			return true;
		}

		return false;
	}

	revealWord() {
		let logString = '';
		this.wordArray.forEach( (letter) => {
			logString += letter.character;
		});
		console.log(`The word was ${logString}!`);
	}
}

class Letter {
	constructor(char) {
		this.character = char;
		this.revealed = false;
		this.displayLetter = '_';
	}

	checkGuess(guessedLetter) {
		if (!this.revealed) {
			if (this.character === guessedLetter) {
				this.revealed = true;
				this.displayLetter = this.character;
				return true;
			}
		}

		return false;
	}
}

let activeWord;
let guessedLetters;
let guesses;
let regexValidator = /^[a-zA-Z]+$/;

function startRound() {
	guessedLetters = [];
	guesses = 5;
	console.log('---New Round---');
	activeWord = new Word(randomWord());
	getGuessInput();
}

function getGuessInput() {
	inquirer.prompt([
		{
			type: 'input',
			message: 'Enter guess:',
			name: 'guess',
			validate: (input) => {
				let letter = input.trim();
				if (guessedLetters.indexOf(letter) !== -1) {
					return 'Already guessed! Enter a different letter';
				} 
				if (letter.length === 0 || letter.match(regexValidator) === null) {
					return 'Please only enter letters';
				}
				if (letter.length !== 1) {
					return 'Please enter only one letter at a time';
				}

				return true;
			}
		}
	]).then( (inquirerResponse) => {
		let guess = inquirerResponse.guess.trim();
		guessedLetters.push(guess);

		if (!activeWord.checkGuess(guess)) {
			guesses--;
			console.log(`Wrong! ${guesses} guesses left`);
		}
		
		if (activeWord.wordComplete || guesses <= 0) {
			activeWord.revealWord();
			inquirer.prompt([
				{
					type: 'confirm',
					message: `${guesses > 0 ? 'Congratulations, you won!' : 'Sorry, you lost!'} Play again?`,
					name: 'replay'
				}
			]).then( (replayResponse) => {
				if (replayResponse.replay) {
					startRound();
				}
			});
		} else {
			getGuessInput();
		}
	});
}

startRound();
