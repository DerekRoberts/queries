/**
* Checks patient conditions for a regex match.
*
* @param patient - patient object
* @param system  - code system (e.g. ICD9)
* @param regex   - regex regex code (e.g. ^250.* for diabetes)
* @return        - true if match for regex, false otherwise or error.
*/

var conditions = conditions ||{};
conditions.hasRegex = function( patient, codeSet ){
  // Check input
  if(
    patient        !== undefined || patient      !== null ||
    patient.json   !== undefined || patient.json !== null ||
    codeSet        !== undefined || codeSet      !== null ||
    codeSet.length !== 0
  ){
    // Indexes and patient conditions array
    var i, j, l, m,
    ptConditions = patient.json.conditions;

    // Code sets stored as { system : regex }
    for( var system in codeSet ){
      var regex  = codeSet[ system ];

      // Look for ICD9 or SNOMEDCT codes
      l = ptConditions.length;
      for( i = 0; i < l ; i++ ){
        if(
          ptConditions[ i ] &&
          ptConditions[ i ].codes &&
          ptConditions[ i ].codes[ system ] &&
          ptConditions[ i ].codes[ system ].length > 0
        ){
          // Check if any codes match regex
          m = ptConditions[ i ].codes[ system ].length;
          for( j = 0; j < m ; j++ ){
            if( ptConditions[ i ].codes[ system ][ j ].match( regex )){
              return true;
            }
          }
        }
      }
    }
  }

  // Still no match?  Return false.
  return false;
};
