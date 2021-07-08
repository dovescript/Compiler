export default class Operator {
	constructor(stringValue) {
		if (!Operator._constructable)
			throw new Error('Cannot construct Operator.');
		this._stringValue = stringValue;
	}

	get isUnary() {
		return Operator._unary.indexOf(this) != -1;
	}
	get resultsBoolean() {
		return Operator._resultsBoolean.indexOf(this) != -1;
	}

	toString() {
		return this._stringValue;
	}
}

Operator._constructable = true;
Operator.YIELD = new Operator('Yield');
Operator.AWAIT = new Operator('Await');
Operator.CLOSUREOF = new Operator('ClosureOf');
Operator.POSITIVE = new Operator('+');
Operator.NEGATE = new Operator('-');
Operator.NOT = new Operator('Not');
Operator.CONCAT = new Operator('&');
Operator.ADD = new Operator('+');
Operator.SUBTRACT = new Operator('-');
Operator.MULTIPLY = new Operator('*');
Operator.DIVIDE = new Operator('/');
Operator.MOD = new Operator('Mod');
Operator.EXP = new Operator('^');
Operator.AND = new Operator('And');
Operator.XOR = new Operator('Xor');
Operator.OR = new Operator('Or');
Operator.EQV = new Operator('Eqv');
Operator.IMP = new Operator('Imp');
Operator.LEFT_SHIFT = new Operator('<<');
Operator.RIGHT_SHIFT = new Operator('>>');
Operator.UNSIGNED_RIGHT_SHIFT = new Operator('>>>');
Operator.LT = new Operator('<');
Operator.GT = new Operator('>');
Operator.LTE = new Operator('<=');
Operator.GTE = new Operator('>=');
Operator.EQUALS = new Operator('=');
Operator.NOT_EQUALS = new Operator('<>');
Operator.GET_INDEX = new Operator('Get');
Operator.SET_INDEX = new Operator('Set');
Operator.ITERATOR = new Operator('Iterator');
Operator._constructable = false;

Operator._unary = [
	Operator.YIELD,
	Operator.AWAIT,
	Operator.POSITIVE,
	Operator.NEGATE,
	Operator.NOT,
	Operator.CLOSUREOF,
];
Operator._resultsBoolean = [
	Operator.IN,
	Operator.EQUALS,
	Operator.NOT_EQUALS,
	Operator.LT,
	Operator.GT,
	Operator.LTE,
	Operator.GTE,
];