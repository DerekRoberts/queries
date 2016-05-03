/**
* Query Title: HDC-0960
* Query Type:  Ratio
* Initiative:  Population Health
* Description: Percentage of adults (20+) with diabetes
*/
function map( patient ){

  // Query logic
  var query = {

    // Variables
    ageMin  : 20,
    codeSet : dictionary.conditions.diabetes,

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
