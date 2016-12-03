
//Start off with what passes the first test.
function KNN(kSize){
	this.kSize = kSize;
	this.points = [];
}

KNN.prototype.train = function(arr){
  this.points = this.points.concat(arr);
};

KNN.prototype._distance = function(vec1, vec2) {
  let total = 0;
  for (let i = 0; i < vec1.length; i++) {
    total += Math.pow((vec1[i] - vec2[i]), 2);
  }
  return Math.sqrt(total);
};

KNN.prototype._distances = function(vec, arrTrainingData) {
  let answer = [];
  for (let i = 0; i < arrTrainingData.length; i++) {
    let element = [];
    element.push(this._distance(vec, arrTrainingData[i][0]));
    element.push(arrTrainingData[i][1]);
    answer.push(element);
  }
  return answer;
};

KNN.prototype._sorted = function(arrDistances) {
  arrDistances.sort(function(a, b) {
    return a[0] - b[0];
  });
  return arrDistances.map(function(element) {
    return element[1];
  });
};

KNN.prototype._majority = function(k, sortedArr) {
  let kSortedArr = sortedArr.slice(0, k);
  let objNumElem = {};
  for (let i = 0; i < kSortedArr.length; i++) {
    if (objNumElem[kSortedArr[i]]) {
      objNumElem[kSortedArr[i]]++;
    } else {
      objNumElem[kSortedArr[i]] = 1;
    }
  }
  let arrNumElem = [];
  for (let key in objNumElem) {
    arrNumElem.push([key, objNumElem[key]]);
  }
  arrNumElem.sort(function(a, b) {
    return b[1] - a[1];
  });
  return +arrNumElem[0][0];
};

KNN.prototype.predictSingle = function(vector) {
  let arrDistances = this._distances(vector, this.points);
  let sortedArr = this._sorted(arrDistances);
  return this._majority(this.kSize, sortedArr);
};

KNN.prototype.predict = function(arrVectors) {
  return arrVectors.map((vector) => this.predictSingle(vector));
};

KNN.prototype.score = function(arrScoringData) {
  let counter = 0;
  for (let i = 0; i < arrScoringData.length; i++) {
    if (this.predictSingle(arrScoringData[i][0]) === arrScoringData[i][1]) counter++;
  }
  return counter / arrScoringData.length;
};























module.exports = KNN