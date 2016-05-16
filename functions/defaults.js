/*
* Defaults
*   JavaScript objects for standard values across queries.
*/

var defaults = defaults ||{
  // Active patient window (seconds)
  active : {
    // 3 years ~= 60*60*24*365*3 seconds
    window : 94608000
  },
  // Min and max ages supported by hQuery
  ages: {
    min : 0,
    max : 120
  },
  // Start and end dates for retroactive queries
  dates: {
    start : function(){
      // Remember months are zero indexed, but days aren't!
      return new Date( 2016, 4, 1 );
    },
    end   : function(){
      return new Date();
    }
  },
  // Min and max bounds for medication queries without bounds
  doses: {
    min : 0,
    max : Number.POSITIVE_INFINITY
  },
  // Min and max bounds for queries without lab value bounds
  labVals: {
    min : Number.NEGATIVE_INFINITY,
    max : Number.POSITIVE_INFINITY
  },
  // Min and max bounds for queries without dose bounds
  numbers: {
    min : 0,
    max : Number.POSITIVE_INFINITY
  },
  // Min and max bounds for observation/lab queries without bounds
  observations: {
    min : 0,
    max : Number.POSITIVE_INFINITY
  }
};
