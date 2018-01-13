let inquirer = require('inquirer');

class Word {
	constructor(word) {
		this.wordArray = [];
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

		this.wordArray.forEach( (letter) => {
			correctGuesses += letter.checkGuess(guessedLetter);
		});

		this.displayWord();

		if (correctGuesses > 0) {
			return true;
		}

		return false;
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


let newWord = new Word('testing');
let guessedLetters = [];
let guesses = 5;
newWord.displayWord();

function getGuessInput() {
	inquirer.prompt([
		{
			type: 'input',
			message: 'Enter guess:',
			name: 'guess',
			validate: (input) => {
				if (guessedLetters.indexOf(input.trim()) !== -1) {
					return 'Already guessed! Enter a different letter';
				} 

				return true;
			}
		}
	]).then( (inquirerResponse) => {
		guessedLetters.push(inquirerResponse.guess.trim());

		if (!newWord.checkGuess(inquirerResponse.guess.trim())) {
			guesses--;
			console.log(`Wrong! ${guesses} left`);
		}

		getGuessInput();
	});
}

getGuessInput();
