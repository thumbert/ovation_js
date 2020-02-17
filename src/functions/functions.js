/**
 * Add two numbers
 * @customfunction 
 * @param {number} first First number
 * @param {number} second Second number
 * @returns {number} The sum of the two numbers.
 */
function add(first, second) {
  return first + second;
}

/**
 * Displays the current time once a second
 * @customfunction 
 * @param {CustomFunctions.StreamingInvocation<string>} invocation Custom function invocation
 */
function clock(invocation) {
  const timer = setInterval(() => {
    const time = currentTime();
    invocation.setResult(time);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}

/**
 * Returns the current time
 * @returns {string} String with the current time formatted for the current locale.
 */
function currentTime() {
  return new Date().toLocaleTimeString();
}

/**
 * Increments a value once a second.
 * @customfunction 
 * @param {number} incrementBy Amount to increment
 * @param {CustomFunctions.StreamingInvocation<number>} invocation
 */
function increment(incrementBy, invocation) {
  let result = 0;
  const timer = setInterval(() => {
    result += incrementBy;
    invocation.setResult(result);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}

/**
 * Writes a message to console.log().
 * @customfunction LOG
 * @param {string} message String to write.
 * @returns String to write.
 */
function logMessage(message) {
  console.log(message);

  return message;
}


/**
 * Get the marks for a given curveId.
 * @param curveId {string}  name of the curve
 * @param bucket {string} a valid bucket name, e.g. '5x16', etc.
 * @param asOfDate {string} the date in format yyyy-mm-dd
 * @returns {string[][]} a two column dynamic array, first column date, second column value
 */
async function futCurve(curveId, bucket, asOfDate) {
  let url = 'http://localhost:8080/forward_marks/v1/curveId/elec_isone_hub_lmp_da/bucket/5x16/asOfDate/20180301';
  let response = await fetch(url);
  let aux = await response.json();
  let data = JSON.parse(aux.result);
  const months = Object.keys(data);

  const out = [];
  for (var i in months) {
    out.push([months[i], data[months[i]]]);
  }

  return out;
}

module.exports = {add: add, futCurve: futCurve};
