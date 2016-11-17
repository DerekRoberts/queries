/**
* Query Title: HDC-0962
* Query Type:  Ratio
* Initiative:  Population Health
* Description: Percentage of adults with hypertension
*/
function map( patient ){

  // Query logic
  var query = {

    // Variables
    codeSet : dictionary.conditions.hypertension,

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
