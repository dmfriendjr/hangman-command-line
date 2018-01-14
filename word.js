const Letter = require('./letter.js');

module.exports = class Word {
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
