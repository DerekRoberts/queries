/**
* Query Title: HDC-1933
* Query Type:  Ratio
* Initiative:  Practice Reflection
* Description: Of active patients with chronic pain,
*              how many receive opioids at 100 <= mg <=200 /day?
*/
function map( patient ){

  // Query logic
  var query = {

    // Variables
    dailyDoseMin : 100,
    dailyDoseMax : 200,
    measurement  : "mg",
    condition    : dictionary.conditions.painChronic,
    medication   : dictionary.meds.opioid,

    // Active patient? Thing?
    denominator: function( patient, date, err ){
      return profile.active( patient, date ) && conditions.hasActiveCondition( patient, date, this.condition, err );
    },
    // Other things?
    numerator: function( patient, date, denominator, err ) {
      return denominator && medications.hasActiveMedRangeDaily(
               patient, date, this.medication, this.dailyDoseMin, this.dailyDoseMax, this.measurement, err
      );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
