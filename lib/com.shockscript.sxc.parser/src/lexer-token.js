export class TokenInfo {
	constructor() {
		this.type = Token.EMPTY;
		this.stringValue = '';
		this.decimalValue = null;
		this.bigIntValue = 0n;
		this.booleanValue = false;
		this.operator = null;
		this.firstLine = 1;
		this.lastLine = 1;
		this.start = 0;
		this.end = 0;
	}

	isKeyword(stringValue) {
		return this.type == Token.KEYWORD ? this.stringValue.toLowerCase() == stringValue.toLowerCase() : false;
	}
	isContextKeyword(stringValue) {
		return this.type == Token.IDENTIFIER ? this.stringValue.toLowerCase() == stringValue.toLowerCase() && (this.end - this.start) == stringValue.length : false;
	}
	isOperator(operatorType) {
		return this.type == Token.OPERATOR ? this.operator == operatorType : false;
	}

	assign(info) {
		this.type = info.type;
		this.stringValue = info.stringValue;
		this.decimalValue = info.decimalValue;
		this.bigIntValue = info.bigIntValue;
		this.booleanValue = info.booleanValue;
		this.operator = info.operator;
		this.firstLine = info.firstLine;
		this.lastLine = info.lastLine;
		this.start = info.start;
		this.end = info.end;
	}
}

export const Token = {
	EMPTY: 0,
	IDENTIFIER: 1,
	STRING_LITERAL: 2,
	NUMERIC_LITERAL: 3,
	LONG_LITERAL: 4,
	BOOLEAN_LITERAL: 5,
	KEYWORD: 6,
	OPERATOR: 7,
	ASSIGNMENT_OR_EQUALS: 8,
	COMPOUND_ASSIGNMENT: 9,
	LPAREN: 10,
	RPAREN: 11,
	LBRACE: 12,
	RBRACE: 13,
	COLON: 14,
	DOT: 15,
	ELLIPSIS: 16,
	COMMA: 17,
	QMARK: 18,
	AMP: 19,
	UNDERSCORE: 20,
};