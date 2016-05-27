/**
* Query Title: HDC-1932
* Query Type:  Ratio
* Initiative:  Practice Reflection
* Description: Of active patients with chronic pain,
*              how many receive opioids at 200+ mg/day?
*/
function map( patient ){

  // Query logic
  var query = {

    // Variables
    dailyDoseMin : 200,
    dailyDoseMax : 10000000000,
    measurement  : "mg",
    codeSet      : dictionary.conditions.painChronic,

    // Active patient? Thing?
    denominator: function( patient, date, err ){
      return true;  //profile.active( patient, date ) && conditions.hasActiveCondition( patient, date, this.codeSet, err );
    },
    // Other things?
    numerator: function( patient, date, denominator, err ) {
      return denominator ;
      // && medications.hasActiveMedRangeDaily(
      //         patient, date, this.codeSet, this.dailyDoseMin, this.measurement, err
      // );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
