/**
* Query Title: HDC-0802
* Query Type:  Ratio
* Initiative:  End of Life
* Description: Of active patients, 55+,
*              how many of them are frail?
*/
function map( patient ){

  // Query logic
  var query = {

    // Variables
    ageMin  : 55,
    codeSet : dictionary.conditions.frailty,

    // Active patient? Age restraints?
    denominator: function( patient, date ){
      return profile.active( patient, date ) && profile.ages.isMin( patient, date, this.ageMin );
    },
    // Other things?
    numerator: function( patient, date, denominator, err ) {
      return denominator && conditions.hasActiveCondition( patient, date, this.codeSet, err );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
