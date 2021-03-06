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
    measurement  : "mg",
    condition    : dictionary.conditions.painChronic,
    medication   : dictionary.meds.opioid,

    // Active patient? Thing?
    denominator: function( patient, date, err ){
      return profile.active( patient, date ) && conditions.hasActiveCondition( patient, date, this.condition, err );
    },
    // Other things?
    numerator: function( patient, date, denominator, err ) {
      return denominator && medications.hasActiveMedMinDaily(
               patient, date, this.medication, this.dailyDoseMin, this.measurement, err
      );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
