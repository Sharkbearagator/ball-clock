let ballClock = function(ballNum) {
  // Global function variables
  let t0 = process.hrtime.bigint();
  let days = 0;
  let match = false;
  let ballArray = [];
  let controlArray = [];
  let minBalls = [];
  let fiveMinBalls = [];
  let hourBalls = [];
  // function for evaluting if two arrays are identical
  function evalArrays(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }
  // Build ball queue array and a control array based on argument
  for (let i = 1; i <= ballNum; i++) {
    ballArray.push(i);
    controlArray.push(i);
  }
  // Loop through ball clock logic until original array matches the queue
  while (!match) {
    // Move first ball in queue into ball clock
    var newBall = ballArray.shift();
    minBalls.unshift(newBall);
    // Minutes Track
    if (minBalls.length === 5) {
      let dropBall = minBalls.shift();
      ballArray = ballArray.concat(minBalls);
      minBalls = [];
      fiveMinBalls.unshift(dropBall);
      // Five Minute Track
      if (fiveMinBalls.length === 12) {
        let dropBall = fiveMinBalls.shift();
        ballArray = ballArray.concat(fiveMinBalls);
        fiveMinBalls = [];
        hourBalls.unshift(dropBall);
        // Hour Track
        if (hourBalls.length === 12) {
          let lastBall = hourBalls.shift();
          ballArray = ballArray.concat(hourBalls);
          hourBalls = [];
          ballArray.push(lastBall);
          // 12 hour 'day'
          days++;
          // check if queue array is back to original order
          match = evalArrays(ballArray, controlArray);
          if (match) {
            // calculate time of function execution
            let t1 = process.hrtime.bigint();
            let time = parseFloat(t1 - t0);
            // print final statistical output to console
            console.log(
              "\n--------------------------------------------------------------------\n" +
                ballNum +
                " balls took " +
                days / 2 +
                " days with a computation time of " +
                time / 1000000000.0 +
                " seconds \n--------------------------------------------------------------------\n"
            );
          }
        }
      }
    }
  }
};
module.exports = ballClock;
