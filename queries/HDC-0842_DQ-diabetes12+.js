/**
* Query Title: HDC-0842
* Query Type:  Ratio
* Initiative:  Practice Reflection
* Description: Of active patients, 12+,
*              how many have diabetes?
*/
function map( patient ){

  // Query logic
  var query = {

    // Variables
    ageMin  : 12,
    codeSet : dictionary.conditions.diabetes,

    // Active? Age?
    denominator: function( patient, date ){
      return profile.active( patient, date )&&
        profile.ages.isMin( patient, date, this.ageMin );
    },
    // condition?
    numerator: function( patient, date, denominator, err ) {
      return denominator &&
        conditions.hasActiveCondition( patient, date, this.codeSet, err );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
