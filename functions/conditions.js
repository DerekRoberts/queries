/**
* Checks patient conditions for a regex match.
*
* @param patient - patient object
* @param system  - code system (e.g. ICD9)
* @param regex   - regex regex code (e.g. ^250.* for diabetes)
* @return        - true if match for regex, false otherwise or error.
*/

var conditions = conditions ||{};
conditions.hasRegex = function( patient, system, regex ){

  // Check for input and conditions
  var conds = patient.json.conditions;
  if(
    patient      !== undefined || patient      !== null ||
    patient.json !== undefined || patient.json !== null ||
    system       !== undefined || system       !== null ||
    regex        !== undefined || regex        !== null ||
    conds        !== undefined || conds        !== null ||
    conds.length !== 0
  ){
    // Look for ICD9 codes
    var i = 0,
        l = conds.length;
    for( ; i < l ; i++ ){
      if(
        conds[ i ] &&
        conds[ i ].codes &&
        conds[ i ].codes[ system ] &&
        conds[ i ].codes[ system ].length > 0
      ){
        // Check if any codes match regex
        var j = 0,
            m = conds[ i ].codes[ system ].length;
        for( ; j < m ; j++ ){
          if( conds[ i ].codes[ system ][ j ].match( regex )){
            return true;
          }
        }
      }
    }
  }

  // Still no match?  Return false.
  return false;
};
