class Word {
	constructor(word) {
		this.word = [];
		for (let i = 0; i < word.length; i++) {
			this.word.push(new Letter(word[i]));
		}

		this.displayWord();
	}

	displayWord() {
		let logString = '';
		this.word.forEach( (letter) => {
			logString += letter.displayLetter + ' ';
		});
		console.log(logString);
	}
}

class Letter {
	constructor(letter) {
		this.letter = letter;
		this.guessed = false;
		this.displayLetter = '_';
	}
}

let newWord = new Word('testing');
