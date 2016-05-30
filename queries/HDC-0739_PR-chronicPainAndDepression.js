/**
* Query Title: HDC-739
* Query Type:  Ratio
* Initiative:  Practice Reflection
* Description: Of active patients,
*              how many have chronic pain and depression?
*/
function map( pt ){

  // Query logic
  var query = {

    // Variables
    conditionA  : dictionary.conditions.painChronic,
    conditionB  : dictionary.conditions.depression,

    // Active patient? Thing?
    denominator: function( pt, date, err ){
      return profile.active( pt, date );
    },
    // Other things?
    numerator: function( pt, date, denominator, err ) {
      return denominator &&
        conditions.hasActiveCondition( pt, date, this.conditionA, err )&&
        conditions.hasActiveCondition( pt, date, this.conditionB, err );
    }
  };
  // Emit results based on query above
  emitter.ratio( pt, query );
}
