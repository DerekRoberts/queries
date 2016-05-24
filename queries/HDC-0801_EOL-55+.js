/**
* Query Title: HDC-0801
* Query Type:  Ratio
* Initiative:  End of Life
* Description: Of active patients, 55+,
*              how many of them are end of life?
*/
function map( patient ){

  // Query logic
  var query = {

    // Variables
    ageMin  : 55,
    codeSet : dictionary.conditions.endOfLife,

    // Active patient? Thing?
    denominator: function( patient, date ){
      return profile.active( patient, date ) && profile.ages.isMin( patient, date, this.ageMin );
    },
    // Other things?
    numerator: function( patient, date, denominator, errorContainer ) {
      return denominator && conditions.hasActiveCondition( patient, date, this.codeSet, errorContainer );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
