/**
* Query Title: HDC-0761B
* Query Type:  Ratio
* Initiative:  End of Life
* Description: Of active patients,
*              how many of them are frail, 55+?
*/
function map( patient ){

  // Query logic
  var query = {

    // Variables
    ageMin  : 55,
    codeSet : dictionary.conditions.frailty,

    // Active patient? Age restraints?
    denominator: function( patient, date ){
      return profile.active( patient, date );
    },
    // Other things?
    numerator: function( patient, date, denominator, err ) {
      return denominator &&
        profile.ages.isMin( patient, date, this.ageMin )&&
        conditions.hasActiveCondition( patient, date, this.codeSet, err );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
