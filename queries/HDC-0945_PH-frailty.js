/**
* Query Title: HDC-0945
* Query Type:  Ratio
* Initiative:  Population Health
* Description: Percentage of adults classified as frail
*/
function map( patient ){

  // Query logic
  var query = {

    // Variables
    codeSet : dictionary.conditions.frailty,

    // Active patient? Age restraints?
    denominator: function( patient, date ){
      return profile.active( patient, date );
    },
    // Other things?
    numerator: function( patient, date, denominator, err ) {
      return denominator &&
        conditions.hasActiveCondition( patient, date, this.codeSet, err );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
