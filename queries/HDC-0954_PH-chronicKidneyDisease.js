/**
* Query Title: HDC-0954
* Query Type:  Ratio
* Initiative:  Population Health
* Description: Percentage of adults with chronic kidney disease
*/
function map( patient ){

  // Query logic
  var query = {

    // Variables
    codeSet : dictionary.conditions.chronicKidneyDisease,

    // Active patient? Thing?
    denominator: function( patient, date ){
      return profile.active( patient, date );
    },
    // Other things?
    numerator: function( patient, date, denominator, errorContainer ) {
      return denominator && conditions.hasActiveCondition( patient, date, this.codeSet, errorContainer );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
