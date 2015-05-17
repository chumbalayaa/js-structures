/**
	Doing come cool stuff with HyperCubes.

	Initial reason for doing this is that 
	finding densley populated clusters is
	hard. Imagine the following (3x3x3) 
	structure:
		[[[6,0,0],[0,2,1],[1,0,4]],
		 [[0,0,2],[2,4,2],[1,0,0]],
		 [[2,0,2],[2,2,1],[1,0,5]]]
	If we wanted to assign a set of clusters
	(say k = 1), where do we put it? It's not 
	obvious. In a 1 dimensional data structure,
	we can just iterate through, find the maximum,
	and that might be a good starting point. That
	gets less and less of a good starting point
	as we increase the number of dimensions.
	A few approaches are considered here:
		(1) - Take the idea of a histogram,
		it first cuts up the data into buckets.
		We can assign those buckets in different
		ways, but the general idea is to abstract
		out little differences and group the data.

		(2) - Assign a distance metric. We can
		assign some sort of score for each data 
		point. Maybe combine its weight with the
		weights of the data around it scaled by some 
		amount. I don't know. Something like that. 

	We'll test a few ideas and just see what happens. 
	We'll test our results against algorithms like 
	k-means and k-medoids. 

	@param - input
		n dimensional array
*/
function HyperCube(input) {
	this._data = input;

	//Hacky - better way to do this?
	this.dimensions = [];
	var currentScope = this._data;
	for (var i = 0; i < this._data.length; i++) {
		if (typeof currentScope == 'object') {
			this.dimensions.push(currentScope.length);
			currentScope = currentScope[0];
		} else {
			break;
		}
	} 
};
/**
	Use idea (2) from above. Lets' just try
		value + 
			average (all adjacent data)

	@param - k 
		number of clusters
*/
HyperCube.prototype.initalClusterCentersMetric = function(k) {
	var scoreBoard = {}; //{index: score}
	var zeros = [];
	for (var i = 0; i < this.dimensions.length; i++) {
		zeros.push(0);
	}
	newScoreBoard = assignScores(zeros, scoreBoard, this, function(newScoreBoard) {
		console.log(newScoreBoard);
	});
};

/**
	Assigns scores that are equal to data value
*/
function assignScores(indexes, scoreBoard, hc, cb) {
	console.log(indexes);
	var currentScope = hc._data;
	for (var i = 0; i < indexes.length; i++) {
		currentScope = currentScope[indexes[i]];
	}
	scoreBoard[indexes] = currentScope;
	var lastIndex = indexes[indexes.length - 1];
	var indexOfLast = indexes.indexOf(lastIndex);

	//Populate end condition
	var endCondition = [];
	for (var i = 0; i < hc.dimensions.length; i++) {
		endCondition.push(hc.dimensions[i]-1)
	}
	if (arraysEqual(endCondition, indexes)) { //End Condition
		return cb(scoreBoard);
	}
	//End of end condition

	//Recursive Cases
	if (indexes[indexOfLast] < hc.dimensions[indexOfLast] - 1) { //Keep Going 000 -> 001, 010 -> 011
		console.log("Keep going");
		indexes[indexes.length - 1] += 1;
		arguments.callee(indexes, scoreBoard, hc, cb);
	}
	else if (indexes[indexes.length - 1] >= hc.dimensions[indexes.length - 1] - 1) { //Move stuff around then keep going 002 -> 010, 022 -> 100
		console.log("Do some moving");
		indexes[indexes.length - 1] = 0;
		for (var i = indexes.length - 2; i >= 0; i--) {
			indexes[i] += 1;
			console.log(indexes[i]);
			console.log(hc.dimensions[i]);
			if (indexes[i] >= hc.dimensions[i]) {
				indexes[i] = 0;
				continue;
			} else {
				break;
			}
		}
		arguments.callee(indexes, scoreBoard, hc, cb);
	}
};
/**
	k-medoids algorithm
*/
HyperCube.prototype.medoids = function(k) {

};
/**
	k-means algorithm
*/
HyperCube.prototype.kmeans = function(k) {

};

function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    console.log("TRUE!");
    return true;
};