import DynamicTypedArray from 'dynamic-typed-array';

export class Script {
	constructor(path, text) {
		this._path = path;
		this._text = text;
		this._comments = [];
		this._lineStarts = new DynamicTypedArray(Int32Array);
		this._lineStarts.push(0);
		this._lineStarts.push(0);
		this._problems = [];
		this._includesScripts = [];
		this._valid = true;
	}

	get path() {
		return this._path;
	}
	get text() {
		return this._text;
	}
	get problems() {
		return this._problems.slice(0);
	}
	get hasProblems() {
		return this._problems.length > 0;
	}
	get isValid() {
		return this._valid;
	}
	get includesScripts() {
		return this._includesScripts.slice(0);
	}
	get comments() {
		return this._comments.slice(0);
	}

	getLineStart(line) {
		if (line < this._lineStarts.size())
			return this._lineStarts.get(line);
		else return this._text.length;
	}

	getLineIndent(line) {
		let ls1 = this.getLineStart(line);
		let ls2 = this.getLineStart(line + 1);
		let i = 0;
		let lineStr = this._text.slice(ls1, ls2);
		while (SourceCharacter.isWhitespace(lineStr.charCodeAt(i)))
			i += 1;
		return i;
	}

	collect(problem) {
		this._valid = problem.tolerable ? this._valid : false;
		this._problems.push(problem);
		return problem;
	}

	sortProblemCollection() {
		this._problems.sort((a, b) => Span.compare(a.span, b.span));
	}
}

export class Comment {
	constructor(content, span) {
		this.content = content;
		this.span = span;
		Object.freeze(this);
	}
}

export class Span {
	static point(script, line, index) {
		return new Span(script, index, index, line, line);
	}
	static inline(script, line, start, end) {
		return new Span(script, start, end, line, line);
	}
	static indexesAndLines(script, start, end, firstLine, lastLine) {
		return new Span(script, start, end, firstLine, lastLine);
	}
	static compare(a, b) {
		return a.firstLine < b.firstLine || a.start < b.start ? -1 : a.start > b.start ? 1 : 0;
	}

	constructor(script, start, end, firstLine, lastLine) {
		this.script = script;
		this.start = start;
		this.end = end;
		this.firstLine = firstLine;
		this.lastLine = lastLine;
		Object.freeze(this);
	}

	get firstColumn() {
		return this.start - this.script.getLineStart(this.firstLine);
	}
	get lastColumn() {
		return this.end - this.script.getLineStart(this.lastLine);
	}
}

export const SourceCharacter = {
	isWhitespace(cv) {
		return cv == 32 || cv == 9;
	},
	isLineTerminator(cv) {
		return cv == 10 || cv == 13;
	},
	isDecimalDigit(cv) {
		return cv >= 48 && cv <= 57;
	},
	isDecDigit(cv) {
		return SourceCharacter.isDecimalDigit(cv);
	},
	isBinDigit(cv) {
		return cv == 48 || cv == 49;
	},
	isOctalDigit(cv) {
		return cv >= 48 && cv <= 55;
	},
	isHexDigit(cv) {
		return SourceCharacter.isDecimalDigit(cv) || SourceCharacter.isHexUppercaseLetter(cv) || SourceCharacter.isHexLowercaseLetter(cv);
	},
	isHexUppercaseLetter(cv) {
		return cv >= 65 && cv <= 70;
	},
	isHexLowercaseLetter(cv) {
		return cv >= 97 && cv <= 102;
	},
	hexDigitMV(cv) {
		return SourceCharacter.isHexLowercaseLetter(cv) ? cv - 87 : SourceCharacter.isDecimalDigit(cv) ? cv - 48 : SourceCharacter.isUppercaseLetter(cv) ? cv - 55 : -1;
	},
	isIdentifierStart(cv) {
		return (cv >= 97 && cv <= 122) || (cv >= 65 && cv <= 90);
	},
	isIdentifierPart(cv) {
		return SourceCharacter.isIdentifierStart(cv) || SourceCharacter.isDecimalDigit(cv) || cv == 95;
	},
};