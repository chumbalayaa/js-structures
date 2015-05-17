/**
	Tape
	input is an array
*/
var Tape = function(input) {
	this.alphabet = [0, 1];
	this.tape = input;
};
Tape.protoype.get = function(index) {
	return this.tape[index];
};
Tape.protoype.set = function(index, value) {
	this.tape[index] = value;
};


/**
	Can be one or n tape turing machine
*/
var TuringMachine = function(tape) {
	this.stepAlphabet = ["R", "L", "N"];

};