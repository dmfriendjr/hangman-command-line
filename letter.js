module.exports = class Letter {
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
